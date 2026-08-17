# TAB Motors Arlington — Website Plan

**Status:** phases 1–4, 6 and 7 built and tested. Remaining work is photos and launch.
**Last updated:** 2026-07-30

> 📋 **Non-code tasks live in [ACTION-ITEMS.md](ACTION-ITEMS.md)** — phone calls, listings,
> photos, launch steps. Top item: the AAA directory publishes the wrong hours and is
> telling members the shop is closed on Saturdays when it isn't.

> **Decisions locked in**
> - The DC shop at `tabmotors.net` is **unrelated** despite the shared name → see the
>   naming strategy in section 2. Recommended domain: **`tabmotorsarlington.com`**
>   (available, $11.25/yr).
> - Full site, ~8–10 pages.
> - **Dashboard-only** notifications, no email or SMS. The email path is written and
>   tested but switched off behind an env var, so turning it on later is config, not code.
> - Hosting and email accounts already exist; only the domain still needs buying.
> - **Domain deferred.** Nothing in the build depends on it. The site runs locally and
>   can be deployed for review on a Vercel URL first, then made public. Search engines
>   are blocked until `SITE_INDEXABLE=true` is set as the final launch step — so an
>   unfinished version can never get indexed. See the launch switch in README.md.
>
> **Built so far:** the whole lead-capture engine — quote form, database, spam
> defenses, admin dashboard with the status pipeline, notes and CSV export. See
> [README.md](README.md) to run it. Local admin password is in `.env.local`.

---

## 1. The business

| Field | Value | Confirmed? |
|---|---|---|
| Shop name | TAB Motors Arlington (AAA lists it as "Arlington Exxon / Tab Motors") | ⚠️ confirm preferred public name |
| Address | 4035 Langston Blvd, Arlington, VA 22207 | ✅ AAA |
| Phone | **(703) 243-3080** | ✅ owner — the 571 number is not used |
| Hours | **Mon–Fri 7:00am–6:00pm · Sat 7:00am–3:00pm · Sun closed** | ✅ owner |
| Credential | AAA Approved Auto Repair Facility | ✅ AAA |
| AAA benefit | 10% off labor for AAA members, max $75 | ✅ AAA |
| VA inspection station | **Official Virginia inspection station** | ✅ owner |
| Warranty | **1 year on parts and labor** | ✅ owner |
| Financing | **Available in shop (Snap Finance)** | ✅ owner |
| Staff photos | **Not wanted on the website** | ✅ owner |
| Existing website | none | ✅ |

> **The warranty is a bigger deal than it looks.** Most independents give 90 days. A full
> year covering both parts and labor is a genuine reason to pick this shop over the one
> down the road, so it now appears in the home page trust bar, on every service page next
> to the pricing, on the contact page, and in the closing call to action.
>
> **Financing** was spotted on the shop door in the photos and confirmed. It matters on
> four-figure repairs, where "can I pay for this" is the real objection. Worded so it
> never promises anyone approval.
>
> **No staff photos** by the shop's choice. The trust signals are the bays, the
> equipment, the AAA approval and the inspection-station status instead.

### Services (from the AAA listing — confirm and prune)

Air conditioning · Brakes · Clutch & driveline · Electrical · Engine overhaul & replacement ·
Gas engine diagnostics · **Hybrid & EV powertrains** · Oil, lube & filter · Manual transmission ·
Automatic transmission · Minor engine repair · Muffler & exhaust · Cooling & radiator ·
**Virginia emissions inspection** · **Virginia safety inspection** · Steering & suspension ·
Tire & wheel service

Vehicles: domestic, Asian, and European makes, including EVs (Tesla, Rivian, Lucid listed).

**Explicitly NOT offering** (unlike the DC shop): towing, roadside assistance, detailing.

### The three strongest assets to lead with

1. **AAA Approved** — an independent trust signal most local shops don't have.
2. **Virginia state safety inspection + emissions** — very high-intent local searches. People search for this by name and need it annually.
3. **Hybrid & EV service** — rare among independents, and Arlington has a lot of them.

---

## 2. Naming & domain strategy

There is an unrelated shop in DC also called TAB Motors (`tabmotors.net`, 4861 Massachusetts
Ave NW). It already owns the `.net` and has an established web presence. This shapes the plan:

- **Domain: `tabmotorsarlington.com`** (available, $11.25/yr). Keeps the real business name while
  the "arlington" separates it from the DC shop and reinforces local SEO.
- **Never present the brand as bare "TAB Motors"** in titles, headings, or the Google Business
  Profile. Always **"TAB Motors Arlington"**. Consistency here is what stops the two businesses
  from being conflated by Google and by customers.
- **Don't fight for the keyword "tab motors."** Target the searches that actually convert:
  - `auto repair arlington va`
  - `virginia state inspection arlington`
  - `emissions test arlington va`
  - `brake repair arlington va`
  - `mechanic near me` (won via Google Business Profile, not the website)
  - `AAA approved auto repair arlington`
- Add a short, factual line in the footer and About page: *"TAB Motors Arlington is an
  independently owned shop at 4035 Langston Blvd and is not affiliated with any similarly named
  business."* This prevents review/complaint mix-ups from landing on him.

---

## 3. Tech stack

| Layer | Choice | Why | Cost |
|---|---|---|---|
| Framework | Next.js (App Router) + TypeScript | Server-rendered = good SEO; frontend and backend in one app | free |
| Styling | Tailwind CSS | fast to build, easy to keep consistent | free |
| Database | Postgres on Neon | stores leads; generous free tier | $0 |
| ORM | Drizzle | typed queries, tiny, simple migrations | free |
| Hosting | Vercel | zero-config Next.js deploys, free SSL, global CDN | $0 (hobby) |
| Images | `next/image` + Vercel Blob for customer uploads | automatic compression, fast mobile load | ~$0 |
| Spam | Cloudflare Turnstile + honeypot + rate limit | keeps the leads table clean, no annoying puzzles | free |
| Admin auth | password login, HTTP-only session cookie | one owner, no need for a user system | free |
| Email | Resend, **coded but disabled** (`NOTIFY_EMAIL` env var off) | one line to enable later if he starts missing leads | $0 |

**Total running cost: the $11.25/yr domain.** Everything else fits in free tiers at this traffic
level.

---

## 4. Pages

1. **Home** — hero photo + "Get a Free Quote" and a tap-to-call button · trust bar (AAA Approved,
   years in business, all makes, EV/hybrid) · services grid · why-choose-us · VA inspection
   callout · reviews · service area · hours + map · quote form at the bottom
2. **Services hub** — all services with links to individual pages
3. **Service detail pages** (one each, this is what ranks on Google) — Brakes · Oil Change &
   Maintenance · Engine Diagnostics · A/C & Heating · Transmission · Electrical · Steering &
   Suspension · Exhaust · Cooling & Radiator · Tires & Wheels · Hybrid & EV · Pre-Purchase
   Inspection
4. **Virginia State Inspection & Emissions** — its own page. What it costs, what's checked, what
   to bring, how long it takes, walk-ins accepted or not. High-intent traffic.
5. **About** — the owner, the techs, years in business, certifications, the not-affiliated note
6. **Reviews** — real reviews only, with a "leave us a review" link to the Google profile
7. **Contact** — map, directions, hours, phone, after-hours key drop if offered
8. **Get a Free Quote** — the main conversion page (form spec below)
9. **Privacy Policy** — required; we're collecting names, phones, and emails

### Every page also gets
- Mobile-first layout — **most local auto-repair traffic is on a phone**
- A sticky tap-to-call bar on mobile (many people would rather call than fill a form — give them
  both, always)
- `AutoRepair` schema.org JSON-LD with address, hours, phone, geo, services
- Unique title + meta description
- `sitemap.xml` and `robots.txt`

---

## 5. The quote form (core feature)

Four short steps with a progress bar. Short steps convert much better than one long form.

**Step 1 — Your vehicle**
- Year *(required)*
- Make *(required)*
- Model *(required)*
- Mileage *(optional)*

**Step 2 — What do you need?**
- Checkboxes of service categories *(multi-select)*
- "Not sure — please diagnose it" option
- Free-text box: "Describe the problem — any noises, warning lights, when it happens"
- **Optional photo/video upload** (dashboard light, damage, leak). Helps him quote accurately
  and is a strong trust signal.

**Step 3 — Timing**
- How soon: ASAP / this week / next week / flexible
- Preferred drop-off date *(optional)*
- Wait at the shop, or leave the car?

**Step 4 — Your contact info**
- Name *(required)*
- Phone *(required)*
- Email *(optional)*
- Best way to reach you: call / text / email
- AAA member? *(yes → show the 10% labor discount)*
- How did you hear about us? *(optional — tells us what marketing is working)*

On submit: save to database → show a thank-you screen stating **when to expect a reply** (e.g.
"we'll get back to you by the end of the next business day") and repeat the phone number for
anyone who's in a hurry.

---

## 6. Admin dashboard (`/admin`)

Owner logs in with a password. Built to be usable on a phone, since he'll often be in the bay.

- **Leads list** — newest first; date, name, phone, vehicle, services, status. Unread leads bold,
  with a count in the browser tab title so an open tab acts as an ambient notification.
- **Lead detail** — everything submitted, uploaded photos, tap-to-call and tap-to-text links on
  the phone number, private notes field
- **Status pipeline** — New → Contacted → Quoted → Won → Lost
- **Filter** by status, **search** by name/phone/vehicle
- **CSV export** — so the contact list is his and portable, never trapped in the site
- Email notification code present but disabled by default

---

## 7. Beyond the website (this will drive more calls than the site will)

For a local repair shop, the map listing usually outperforms the website. Worth doing in parallel:

1. **Google Business Profile** — claim/verify it, exact category "Auto Repair Shop", correct hours,
   the new website URL, real photos, and the services list. Free, and the highest-leverage item
   on this entire page.
2. **Ask every happy customer for a Google review.** We'll generate a short review link and can
   print it on a small card for the counter. Review count and recency drive map rankings more
   than anything on the website.
3. **Consistent name/address/phone** everywhere — AAA, Yelp, Apple Maps, Bing Places — always
   "TAB Motors Arlington" with the same phone number.
4. **Fix the AAA listing — it is actively costing him business.** It publishes
   **Mon–Fri 8:00–5:00, closed Saturday**. The real hours are **Mon–Fri 7:00–6:00 and
   Saturday until 3:00**. So AAA is telling members he's shut at times he's open, including
   all day Saturday — which is exactly when someone with a weekday job wants to bring a car
   in. Also add the website URL once it's live.
5. **Check every other directory for the same wrong hours** — Yelp, Apple Maps, Bing Places,
   and the Google Business Profile. Whatever those say now, they were probably seeded from
   the same bad data.

---

## 8. What we need from him

### Facts to confirm
- [ ] Public-facing business name — "TAB Motors Arlington"?
- [ ] The one phone number customers should call
- [ ] Exact hours, including whether Saturdays happen
- [ ] Year established / years in business
- [ ] ASE certifications? How many technicians?
- [ ] Warranty on parts and labor — how long? *(the DC shop advertises 3 years; if his is
      comparable it belongs on the homepage)*
- [ ] Is he an official Virginia inspection station? Safety, emissions, or both? Station number?
- [ ] Languages spoken in the shop *(a real advantage in Arlington — worth saying out loud)*
- [ ] Amenities: waiting room, wifi, shuttle, loaner car, after-hours key drop?
- [ ] Free diagnostics or a diagnostic fee? Fee waived if they do the repair?
- [ ] Show "starting at" prices, or quote-only?
- [ ] Any services on the AAA list he does **not** actually do
- [ ] Existing logo file? Brand colors?
- [ ] Is the Google Business Profile claimed? Current review count?
- [ ] Business email address for the site's contact info

### Photos to take (phone camera is fine — daylight, landscape orientation)
1. Shop exterior with the sign, from across the lot
2. The service bays with the doors open
3. A tech working on a car — hands and tools, close up
4. A car on the lift
5. Diagnostic equipment / scan tool in use
6. The waiting area and the front counter
7. The owner and the crew — a real group photo, faces visible
8. The AAA Approved decal or certificate
9. Any ASE certificates on the wall
10. A clean, finished car leaving the lot

Faces and real equipment beat stock photography every time for a local shop — people are
choosing who to trust with their car.

**Do not use** photos from `tabmotors.net`, Google Maps, or stock sites without a license.

---

## 9. Build order

| Phase | Work | Status |
|---|---|---|
| 0 | Buy the domain, create the Neon database, confirm the facts above, collect photos | ⬜ blocked on him |
| 1 | Next.js project setup, design system, layout, header/footer, mobile nav | ✅ done |
| 2 | Quote form UI (all 4 steps) + validation | ✅ done |
| 3 | Database schema, submit endpoint, spam protection, uploads | ✅ done |
| 4 | Admin login + leads dashboard + statuses + CSV export | ✅ done |
| 5 | Home page with real content and photos | 🟡 built; photos pending |
| 6 | Service pages, VA inspection page, About, Reviews, Contact | ✅ done — 20 pages |
| 7 | SEO: schema markup, sitemap, meta tags, Open Graph images | ✅ done |
| 8 | Mobile/tablet/desktop QA, Lighthouse pass, accessibility check | 🟡 mobile + desktop checked; full pass after content |
| 9 | Deploy to Vercel, connect the domain, submit to Search Console | ⬜ needs the domain |
| 10 | Google Business Profile, review-request card, AAA listing update | ⬜ highest-value remaining item |

---

## Phase 11 — visual design pass ✅ done

1. ✅ **Full-bleed photo hero.** Shop exterior behind a two-layer scrim, headline on top,
   replacing the text-left / image-right split.
2. ✅ **Full-bleed image band** between the inspection and why-us sections.
3. ✅ Photo placeholders replaced with real photography.
4. ✅ **Service hierarchy.** Three lead services as large cards (inspection, brakes,
   diagnostics), the other eleven as a compact index below. No more wall of fourteen
   identical cards.
5. ✅ **Bigger, tighter type.** Section headings up to `text-6xl` with `-0.02em` tracking,
   larger lead paragraphs, more generous section padding.
6. ✅ **Section rhythm.** dark hero → white trust strip → white services → dark inspection
   band → full-bleed photo → white why-us → tinted reviews → white contact.
7. ✅ **Motion.** Scroll reveals via CSS scroll-driven animations. See the note below.
8. ✅ **Icons.** All service and feature icons now sit on a consistent tinted plate
   (`IconPlate`).

### Note on the scroll reveals

Built first with IntersectionObserver: hide on mount, reveal when the observer fires.
Testing showed the observer never fired in the preview browser at all, which left nine
sections of the page permanently invisible. Content whose visibility depends on a script
running correctly is a bad trade for a marketing site.

Rewritten as pure CSS (`animation-timeline: view()`), wrapped in `@supports` and a
reduced-motion guard. Nothing is hidden by default, there is no JavaScript involved, and
`Reveal` is no longer a client component. A browser without scroll-driven animation
support simply gets a static page.

Verified: 16 reveal wrappers, zero hidden content anywhere on the page.

### Still outstanding

No real logo file. The site uses a typographic wordmark in
`src/components/site/Logo.tsx`. See [ACTION-ITEMS.md](ACTION-ITEMS.md) item 6 for why the
supplied logo wasn't used.

---

### What's verified working

Tested end to end against a real database, not just typechecked:

- All four form steps advance, with per-step validation and correct error messages
- Full submission saves and shows the confirmation screen
- Honeypot rejects, sub-3-second submissions rejected, 5/hour + 15/day per-IP limits enforced
- Rate-limit and server errors surface in the UI **without** discarding what the customer typed
- Forged and unsigned admin cookies rejected; unauthenticated CSV export returns 401
- Wrong password rejected with a deliberately vague message
- Dashboard lists leads newest-first, filters by status, searches name/phone/vehicle
- Unread count appears in the browser tab title and clears when a lead is opened
- Status pipeline and private notes save and persist
- CSV export carries the right headers and neutralises spreadsheet formula injection
- Production build succeeds: marketing pages static, admin and API server-rendered

### Two bugs found and fixed during that pass

- Headings and outline buttons rendered invisible on dark sections. Root cause was a
  base CSS rule pinning heading colour, plus overriding a button variant's background
  through `className` — Tailwind resolves conflicting utilities by stylesheet order, not
  by the order you write the classes. Fixed by letting headings inherit colour and
  adding a real `outlineOnDark` variant.
- A blank vehicle year reported "That year seems too old" because `z.coerce.number()`
  turns `""` into `0`. Replaced with a validator that distinguishes blank, non-numeric,
  too-low and too-high.
