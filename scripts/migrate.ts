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

  // No DATABASE_URL (e.g. a Vercel build before the database is wired, or a
  // preview build). Skip cleanly rather than failing the build — production
  // always has DATABASE_URL set, and local dev migrates PGlite on first use in
  // src/lib/db/index.ts. Running PGlite here would try to write to the build
  // sandbox and is pointless, so we simply no-op.
  console.log("No DATABASE_URL set — skipping migration (build continues).");
}

main().catch((error) => {
  console.error("Migration failed:");
  console.error(error);
  process.exit(1);
});
