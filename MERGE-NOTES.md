# TAB Motors — site merge (his design + our SEO)

**What this is:** the client's Next.js app (his preferred design + the working
lead dashboard) with our full SEO site merged in. Nothing is deployed.

## Run / preview locally
```bash
npm install
npm run dev        # http://localhost:3000
```
- Public site: http://localhost:3000
- Leads dashboard: http://localhost:3000/admin  (password in `.env.local` → `grep ADMIN_PASSWORD .env.local`)
- No database setup needed — uses embedded PGlite locally. Nothing is indexable
  until `SITE_INDEXABLE=true` (launch gate, unchanged).

## Decisions applied (from the brief)
| Element | Source kept |
|---|---|
| Design, layout, quote form, **admin dashboard/CRM** | Client app (untouched) |
| Educational tone + section rhythm | Client app |
| Financing | Reworded to **"Payment plans available"** — "financing"/"Snap Finance" removed from all public text |
| Real shop **photos** | Ours (in `public/images/`, mapped onto his slots + extras) |
| **H1s, meta titles/descriptions, body copy, FAQs, slugs** | Ours (SEO) |
| **Reviews** (12 real Google reviews, 4.9 · 60) | Ours — now on `/reviews` + in schema |
| Address | **4035 Langston Blvd** (AAA-confirmed; our old "Old Dominion Dr" was a flagged placeholder and was normalized) |

## What was added (his app had none of these)
- **14 service pages** — our slugs/H1/SEO copy/FAQs in his design: `src/lib/services.ts`, `src/app/(site)/services/[slug]/page.tsx`
- **12 service-area pages** — new route `src/app/(site)/service-areas/`, data `src/lib/areas.ts`
- **Blog (index + 8 posts)** — new route `src/app/(site)/blog/`, data `src/lib/blog.ts`
- **Reviews** wired to real data `src/lib/reviews.ts`
- FAQ + Article + AggregateRating/Review JSON-LD; sitemap + robots cover every URL
- Nav updated (`src/components/site/nav.ts`) to include Service Areas + Blog

## Data provenance
Service/area/blog/review content was generated from our SEO build's
`generate.py` data (single source of truth) into `src/lib/*.ts`. Internal links
were rewritten to Next routes; "Old Dominion Dr" → "Langston Blvd" for NAP
consistency.

## Verified
- `npm run build` → 63 routes prerender clean (14 services, 12 areas, 8 blogs, indexes)
- Quote form → `/api/leads` → PGlite → `/admin` dashboard tested (leads show with
  our service labels, status pipeline, CSV export). **Dashboard untouched and working.**
- Desktop + mobile (375px) checked.

## Still to confirm before any launch (not blockers for review)
- Confirm the public street address: **Langston Blvd** vs Old Dominion Dr.
- Google Business Profile review URL (set `site.toConfirm.googleReviewUrl`) to enable the "Leave a review" button.
- Flip `SITE_INDEXABLE=true` only at launch.
