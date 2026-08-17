/**
 * Applies the SQL files in ./drizzle to whichever database is configured.
 *
 *   npm run db:migrate
 *
 * Production runs this at build time. On Vercel, set the Build Command to:
 *   npm run db:migrate && next build
 *
 * Local development doesn't need it — src/lib/db/index.ts migrates PGlite on
 * first use — but running it by hand is harmless and idempotent.
 */

const databaseUrl = process.env.DATABASE_URL;

async function main() {
  if (databaseUrl) {
    const { neon } = await import("@neondatabase/serverless");
    const { drizzle } = await import("drizzle-orm/neon-http");
    const { migrate } = await import("drizzle-orm/neon-http/migrator");

    const db = drizzle(neon(databaseUrl));
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations applied to Neon.");
    return;
  }

  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle } = await import("drizzle-orm/pglite");
  const { migrate } = await import("drizzle-orm/pglite/migrator");

  const client = new PGlite(".pglite");
  const db = drizzle(client);
  await migrate(db, { migrationsFolder: "./drizzle" });
  await client.close();
  console.log("Migrations applied to local PGlite database (./.pglite).");
}

main().catch((error) => {
  console.error("Migration failed:");
  console.error(error);
  process.exit(1);
});
