import { defineConfig } from "drizzle-kit";

/**
 * Only used by `npm run db:generate`, which turns src/lib/db/schema.ts into SQL
 * files in ./drizzle. Generating doesn't touch a database, so no credentials
 * are needed here — applying the SQL is scripts/migrate.ts's job.
 */
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  strict: true,
  verbose: true,
});
