# Action items — things that aren't code

Tasks that need a phone call, an account login, or a camera. None of these are
blocked by the website build, and none of them require me. Kept separate from
[PLAN.md](PLAN.md) so the build plan stays about the build.

Order below is roughly by value.

---

## 1. Fix the AAA listing hours ⚠️ costing business today

**The problem.** AAA's Approved Auto Repair directory publishes:

> Monday–Friday 8:00 AM – 5:00 PM · Saturday **Closed** · Sunday Closed

The real hours are:

> Monday–Friday **7:00 AM – 6:00 PM** · Saturday **7:00 AM – 3:00 PM** · Sunday Closed

So AAA is telling its own members the shop is shut during hours it's open — two extra
hours every weekday, and **all day Saturday**. Saturday is precisely when someone with a
weekday job can bring a car in, and AAA members are exactly the customers who'd come for
the 10% labour discount.

**What to do.** Contact AAA through whoever handles the shop's Approved Auto Repair
membership and have them correct the hours. While the listing is open, also ask them to
add the website URL once it's live.

**Where the correct hours live in the code:** `src/lib/site.ts` → `hours`.

---

## 2. Check the other directories for the same wrong hours

Whatever these say now was likely seeded from the same bad data. Worth ten minutes each:

- [ ] Google Business Profile
- [ ] Yelp
- [ ] Apple Maps (Apple Business Connect)
- [ ] Bing Places

While you're in each one, make the name, address and phone **identical everywhere** —
always "TAB Motors Arlington", always `(703) 243-3080`. Inconsistent listings split the
business's identity in Google's eyes and hold down map rankings.

---

## 3. Google Business Profile — highest-value item on this whole page

For a local repair shop the map listing usually brings in more calls than the website
does. It decides who wins "mechanic near me".

- [ ] Claim / verify the profile
- [ ] Category: **Auto Repair Shop**
- [ ] Correct hours (see item 1)
- [ ] Add the website URL once live
- [ ] Upload the real photos (item 5)
- [ ] List the services
- [ ] Get the review link, then paste it into `site.toConfirm.googleReviewUrl` in
      `src/lib/site.ts` — that switches on the "leave us a review" button on `/reviews`

Then: **ask every happy customer for a review.** Review count and recency move map
rankings more than anything on the website. A printed card at the counter with the review
link works better than remembering to ask.

---

## 4. Optional details, whenever convenient

Nothing here blocks launch. Each section hides itself when the value is empty, so the
pages look finished without them. In `src/lib/site.ts` under `toConfirm`:

- [ ] Year established
- [ ] ASE certifications, if any
- [ ] Languages spoken in the shop (a real advantage in Arlington)
- [ ] Waiting room, shuttle, after-hours key drop

---

## 5. Photos ✅ done

Six photos received and live on the site: shop exterior, workshop interior, a car on the
lift beside the inspection banner, the storefront, a Porsche mid-service, and the
customer lot. All resized, re-encoded and stripped of metadata (one carried the phone
model and timestamp).

Two are held in reserve for the design pass: `porsche-service.jpg` and
`customer-cars.jpg`.

**No staff photos**, by the shop's own preference. Settled, not outstanding.

More photos are still worth taking for the **Google Business Profile**, which rewards a
well-stocked gallery: the waiting area, the front counter, the diagnostic scanner in use,
the AAA decal, a finished car leaving.

Don't use images from `tabmotors.net`, Google Maps, or unlicensed stock. It's a copyright
problem, and given the identically named DC shop, using their photos would actively
confuse the two businesses.

---

## 6. The logo needs work before it can be used ⚠️

The supplied logo file is **not on the site**, for three reasons:

1. **It contains a redrawn Exxon logo.** Exxon is a registered ExxonMobil trademark and
   the version in the file is visibly distorted. Even a genuine Exxon-branded dealer is
   normally required to use the official artwork rather than a redrawing.
2. **It reads "TABB MOTORS"** with two B's.
3. It appears AI-generated, and next to the real shop photos it looks less credible than
   they do.

Options, in order of preference:

- [ ] Ask the Exxon rep for the official co-branding artwork
- [ ] Or have a simple mark drawn that doesn't include the Exxon trademark at all
- [ ] Meanwhile the site uses a clean typographic wordmark
      (`src/components/site/Logo.tsx`), which spells the name correctly

---

## 7. Launch mechanics

- [ ] Buy the domain (`tabmotorsarlington.com`, ~$11/yr, was available as of 2026-07-30)
- [ ] Create the free Neon Postgres database
- [ ] Deploy to Vercel — full steps in [README.md](README.md)
- [ ] Send a real test quote request on the live site, confirm it lands in `/admin`
- [ ] **Last:** set `SITE_INDEXABLE=true` so Google can finally see it
- [ ] Submit the sitemap in Google Search Console
