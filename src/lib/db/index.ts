import * as schema from "./schema";

/**
 * Database access with two interchangeable backends:
 *
 *   - No DATABASE_URL  -> PGlite, an embedded Postgres stored in ./.pglite.
 *                         No server to install, so the site runs on a fresh
 *                         laptop with zero setup.
 *   - DATABASE_URL set  -> Neon over HTTP, which is what production uses.
 *
 * Both speak real Postgres and share one Drizzle schema, so nothing about the
 * queries changes between them. Going live is one environment variable.
 */

type Database = Awaited<ReturnType<typeof createDatabase>>;

/**
 * Cached on globalThis rather than in a module variable so Next.js hot reload
 * doesn't spin up a second PGlite instance — the second one would fail to take
 * the file lock on ./.pglite.
 */
const globalForDb = globalThis as unknown as {
  __tabMotorsDb?: Promise<Database>;
};

export function getDb(): Promise<Database> {
  globalForDb.__tabMotorsDb ??= createDatabase();
  return globalForDb.__tabMotorsDb;
}

export const usingNeon = Boolean(process.env.DATABASE_URL);

async function createDatabase() {
  if (process.env.DATABASE_URL) {
    const { neon } = await import("@neondatabase/serverless");
    const { drizzle } = await import("drizzle-orm/neon-http");
    return drizzle(neon(process.env.DATABASE_URL), { schema });
  }

  // ---- Local development ----
  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle } = await import("drizzle-orm/pglite");

  const client = new PGlite(".pglite");
  const db = drizzle(client, { schema });

  // In development the schema is brought up to date automatically, so there is
  // never a step between "git pull" and a working app. Production applies
  // migrations at build time instead (see scripts/migrate.ts) so that a
  // concurrent cold start can't race another instance mid-migration.
  const { migrate } = await import("drizzle-orm/pglite/migrator");
  await migrate(db, { migrationsFolder: "./drizzle" });

  return db;
}

export { schema };
export * from "./schema";
