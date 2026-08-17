# TAB Motors Arlington — website

Marketing site plus a lead-capture backend for an independent auto repair shop at
4035 Langston Blvd, Arlington VA.

Next.js 16 · React 19 · TypeScript · Tailwind 4 · Drizzle ORM · Postgres

---

## Run it locally

```bash
npm install && npm run dev
```

Then open http://localhost:3000.

**No database setup is needed.** With `DATABASE_URL` empty the app uses PGlite — an
embedded Postgres stored in `./.pglite` — and migrates it on first use. Production
points at Neon by setting that one variable; the schema and every query are identical.

`.env.local` was generated on first setup with a random admin password and session
secret. To see the admin password:

```bash
grep ADMIN_PASSWORD .env.local
```

The dashboard is at http://localhost:3000/admin — not linked from the public site.

To wipe local test leads and start clean, stop the dev server and delete `.pglite`.

---

## How it fits together

```
src/
  app/
    (site)/              Public pages — share the header/footer/mobile call bar
      page.tsx           Home
      quote/             The quote form page
      privacy/           Privacy policy
    admin/
      login/             Password form
      (dashboard)/       Leads list + detail. Auth-guarded by its layout.
    api/
      leads/             POST — receives a quote request
      upload/            POST — one photo to blob storage
      admin/leads/export GET  — CSV of every lead
  components/
    site/                Header, footer, logo, schema.org markup, photo placeholders
    quote/               The multi-step form, photo upload, Turnstile
    admin/               Login form, status pipeline + notes editor, status badge
    ui/                  Button and form field primitives
  lib/
    site.ts              ← every business fact lives here
    services.ts          ← the service list; drives the grid, form and sitemap
    validation.ts        Zod schemas, shared by browser and server
    auth.ts              Password check + HMAC-signed session cookie
    security.ts          Honeypot, timing, rate limits, Turnstile, IP hashing
    db/                  Drizzle schema and the two-driver connection
    notify.ts            Email on new lead (off by default)
drizzle/                 Generated SQL migrations
```

### Two files worth knowing

**`src/lib/site.ts`** holds the name, phone, address, hours and service area. Change a
fact there and it updates the header, footer, contact section, schema.org markup and
metadata at once. Facts taken from public listings rather than from the owner are
tagged `UNCONFIRMED` — search for that before launch.

**`src/lib/services.ts`** is the canonical service list. Adding an entry adds it to the
home page grid *and* the quote form checkboxes.

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:generate` | Turn schema changes into SQL in `drizzle/`. Needs no database. |
| `npm run db:migrate` | Apply `drizzle/` to whichever database is configured |

After editing `src/lib/db/schema.ts`, run `db:generate`. Local development applies the
new migration automatically on next request; production applies it at build time.

---

## The launch switch

The site is **hidden from search engines until you say otherwise**. With
`SITE_INDEXABLE` unset, `robots.txt` disallows everything and every page carries a
`noindex` tag.

That's deliberate: any URL Google can reach, Google will index — a Vercel preview link
included — and an unfinished page with placeholder photos is a bad first impression that
takes weeks to clear out of the index. So the site can be deployed, shared and reviewed
for as long as you like before it's discoverable.

Setting `SITE_INDEXABLE=true` is the **last** step of launch. Until it's set, the admin
dashboard shows a standing reminder whenever the site is running against the live
database, so it can't be quietly forgotten.

Nothing else depends on the domain. `NEXT_PUBLIC_SITE_URL` is just the base for canonical
tags and the sitemap; locally it's `http://localhost:3000`.

---

## Going live on Vercel

1. **Database** — create a free Postgres at [neon.tech](https://neon.tech), copy the
   connection string.
2. **Import the repo** into Vercel.
3. **Build Command** — set it to:
   ```
   npm run db:migrate && next build
   ```
   Migrations run at build time rather than on first request, so two cold starts can't
   race each other mid-migration.
4. **Environment variables** — set at minimum:

   | Variable | Value |
   |---|---|
   | `DATABASE_URL` | the Neon connection string |
   | `ADMIN_PASSWORD` | long and random — this is all that protects customer contact details |
   | `SESSION_SECRET` | long and random; changing it signs everyone out |
   | `NEXT_PUBLIC_SITE_URL` | `https://tabmotorsarlington.com` |

   Generate the two secrets with:
   ```bash
   node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"
   ```
   Leave `SITE_INDEXABLE` unset for now — see the launch switch above.
5. **Domain** — add `tabmotorsarlington.com` in Vercel and point the nameservers. Can be
   done at any point; until then the Vercel URL works fine for review.

### Launch day, in order

1. Real photos in place, and every `UNCONFIRMED` fact in `src/lib/site.ts` confirmed
2. Domain connected, `NEXT_PUBLIC_SITE_URL` set to the real `https://` address
3. Submit a test quote request on the live site and confirm it lands in `/admin`
4. **Then** set `SITE_INDEXABLE=true` and redeploy
5. Google Search Console — add the property, submit `/sitemap.xml`
6. Google Business Profile — claim it, add the website URL, upload the photos
   (see [PLAN.md](PLAN.md) section 7 — this is the highest-value item on the whole list)

`.env.local` is gitignored. Never commit real secrets.

---

## Optional features, all off by default

Each one is dormant until its environment variables exist — the app doesn't render UI
for a feature it can't deliver.

**Photo uploads on the quote form.** Set `BLOB_READ_WRITE_TOKEN` (Vercel → Storage →
Blob → connect to project). The upload control appears once it's set. Images only, 10 MB
cap, max 5 per request, and the API rejects any attachment URL that didn't come from our
own blob store.

**Cloudflare Turnstile.** Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and
`TURNSTILE_SECRET_KEY`. Without them the form still has the honeypot, timing check and
per-IP rate limit. Turnstile is invisible to almost every real visitor, which is why
it's the only bot challenge used here — a picture CAPTCHA on a quote form costs real
customers.

**Email on new leads.** Deliberately off: the owner works from the dashboard. To turn it
on, set `RESEND_API_KEY` and `NOTIFY_EMAIL` and redeploy. No code change. Worth doing
the first time a lead gets missed — response speed is the single biggest factor in
whether a quote request turns into a customer.

---

## Security notes

- Admin password compared in constant time; sessions are HMAC-signed cookies
  (HttpOnly, SameSite=Lax, Secure in production) bound to a fingerprint of the current
  password, so rotating the password invalidates every existing session.
- 8 failed logins per IP in 15 minutes triggers a lockout, tracked in the database
  rather than in memory — serverless instances don't share memory, so an in-memory
  limiter is bypassed by retrying until you hit a cold instance.
- The layout guard protects admin *pages*; every admin route handler and server action
  re-checks authentication itself, because those endpoints are reachable directly.
- Quote form: honeypot + minimum fill time + 5/hour and 15/day per IP.
- IP addresses are stored only as a salted SHA-256 digest, never in the clear.
- CSV export escapes leading `=`, `+`, `-`, `@` so a value typed into the form can't
  execute as a spreadsheet formula when the owner opens the file.
- `/admin` and `/api` are `noindex` and excluded in `robots.txt`, and admin responses
  are sent `no-store`.

---

## Still to do

Non-code tasks — listings, photos, launch steps — are tracked in
[ACTION-ITEMS.md](ACTION-ITEMS.md).


Photos, the individual service pages, and the Google Business Profile work are tracked
in [PLAN.md](PLAN.md) — sections 8 and 9. The photo shot list is section 8.

Do not use images from `tabmotors.net`, Google Maps, or unlicensed stock. Besides the
copyright problem, there's an unrelated shop in DC with the same name, so using their
photos would actively confuse the two businesses.
