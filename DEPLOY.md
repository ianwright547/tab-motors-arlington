# Go-live runbook — tabmotorsarlington.com

Everything is built, stress-tested and points at `tabmotorsarlington.com`. Going
live needs the items below. Steps 1–2 are the only ones that need **you**; I can
do the rest once step 1 is provided.

## 1. Production database (REQUIRED — only you can provide this)
The lead dashboard is designed to run on **Neon Postgres** in production
(`src/lib/db/index.ts` → `@neondatabase/serverless`). Locally it uses embedded
PGlite; that does **not** work on Vercel (read-only, ephemeral filesystem), so
without a real Postgres URL the quote form and `/admin` dashboard will error in
production.

**Give me the Neon connection string** (from your existing Neon project, or a new
free one at neon.tech) and I'll wire it up. It looks like:
`postgresql://user:pass@ep-xxxx.us-east-1.aws.neon.tech/neondb?sslmode=require`

Then migrations run once against it: `DATABASE_URL=... npm run db:migrate`.

## 2. Confirm the domain cutover
`tabmotorsarlington.com` currently serves the **old static SEO site** (Vercel
project `tab-motors`). Going live points the domain at this new app instead —
i.e. it **replaces the current live site**. That's the intended end state, but
it's your call to greenlight the switch.

## 3. Environment variables (I set these on Vercel)
| Var | Value |
|---|---|
| `DATABASE_URL` | your Neon string (step 1) |
| `ADMIN_PASSWORD` | dashboard password (generate a fresh one for prod) |
| `SESSION_SECRET` | random 32+ char secret |
| `NEXT_PUBLIC_SITE_URL` | `https://tabmotorsarlington.com` |
| `SITE_INDEXABLE` | `true` (flip ON only at go-live) |
| `BLOB_READ_WRITE_TOKEN` | optional — only if photo-upload on the form is wanted |

## 4. Deploy
New Vercel project from this repo → build `next build` → migrate → attach domain.
No git remote yet, so this deploys either by connecting the repo to Vercel or via
the Vercel CLI/integration.

## Status
- ✅ Site built, merged, stress-tested (43 pages, all 200, 1 H1 each, no broken links/images)
- ✅ Lead pipeline + spam defenses verified; dashboard/CSV working; data persists
- ✅ Canonical/sitemap/robots/schema all → tabmotorsarlington.com
- ⛔ **Blocked on:** your Neon `DATABASE_URL` (step 1) + your OK on the domain cutover (step 2)
