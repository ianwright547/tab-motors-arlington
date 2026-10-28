# Unpublished website update — October 27, 2026

Base: main commit 9956327e65f50255d628510b2d1e31305aeec472. Changes are in this local working copy only. No branch was pushed, no Vercel deployment was created, and no Google or social posts were made. No tracking or analytics was added.

## Changes

- Added permanent redirects for all 38 HTML pages inventoried in the previous static website. Existing query strings survive. Unknown paths still receive a 404 rather than a broad redirect.
- Reduced quote intake from four steps to two: contact details, then vehicle and service. Replaced the initial service-choice grid with a compact main-service selector. Mileage, timing, date, AAA membership, referral source and photos remain available as optional details.
- Preserved the server payload and validation, phone/email preferences, spam protection, uploads, service preselection and error handling. Advancing a step or pressing Enter on the contact step cannot submit the request.
- Added versioned, tab-local written draft recovery with a 24-hour inactivity limit. Photos, honeypot fields and bot-verification tokens are excluded. Clear form and successful submission remove the draft. Storage failure does not block the form. The privacy page explains drafts.
- Clarified that online requests are reviewed during shop hours and do not reserve an appointment. No unsupported reply deadline was introduced.
- Added an inspection visit summary with fee limits, preparation, hours, queue and inspector-availability guidance. Inspection pages prioritize phone and directions; detailed requirements remain accessible in expandable sections. Removed the generic repair process, warranty and payment-plan pitch from the regulated-test journey.
- Corrected the safety inspection fee description to identify state maximums rather than implying an identical fixed charge at every shop. Distinguished emissions monitors that are not ready from a failed emissions test.
- Updated the shared Google review snapshot to 4.9 stars and 75 reviews, checked October 27, 2026. Review text was not rewritten or invented.
- Removed the floating Google preferred-source promotion from the public layout and stopped featuring the undated $49.99 oil-change social offer. Original social posts and historical assets were not deleted or edited externally.
- Shortened repeated homepage benefits, removed a duplicate photo band, reduced featured review cards to three and kept all articles accessible from the blog.
- Added shared AAA discount exclusions and a link to the official benefit listing. Staff notification wording no longer assumes every AAA request qualifies for the labor discount.
- Removed sitemap modification dates that previously changed for every page on every build, regardless of whether that page was edited.

## Verification

- Production build passed, including TypeScript and static generation.
- Seven Node regression tests passed. Run with Node 24 or newer: npm test.
- All 45 public sitemap routes returned 200, with one H1 and the expected canonical path. No missing internal page targets were found in the inspected main content.
- All 38 old HTML URLs returned 308 to the correct current path, preserving a test query string. An unknown service URL returned 404. Robots and sitemap XML were checked locally.
- Desktop homepage inspected at 1280 × 800; mobile homepage inspected at 390 × 844. No horizontal overflow appeared in those views. The inspection visit guidance was checked on mobile and desktop.
- Browser checks verified contact-first intake, no premature validation/submission while advancing, Back navigation, written draft recovery after refresh, and one successful synthetic request through the local API into the disposable embedded database. The success state explains that an appointment still needs confirmation.
- The local preview was started with production database, upload, bot-verification, notification and admin credentials unset. No request was sent to the live shop, and no email or SMS was sent.

## External item left unchanged

The AAA directory still needs the confirmed address and repair-shop hours corrected through the shop's account/contact. That directory cannot be fixed by editing this website. No directory changes were submitted.

Confirmed facts for that future correction: 4035 Old Dominion Dr, Arlington, VA 22207; (703) 243-3080; Monday–Friday 7 AM–6 PM; Saturday 7 AM–3 PM; Sunday closed; https://tabmotorsarlington.com. Repair-shop hours are separate from gas-station hours.

## Sources for factual updates

- Google profile observed October 27: https://www.google.com/maps?cid=17977745112928299237
- AAA benefit and exclusions: https://www.aaa.com/autorepair/shop/arlington-exxon-tab-motors-116496
- Safety inspection maximum fees: https://vsp.virginia.gov/public-safety-programs-center/vehicle-safety-inspection/
- Emissions fee and free-retest rule: https://law.lis.virginia.gov/vacode/title46.2/chapter10/section46.2-1182/
- Emissions testing/readiness distinction: https://law.lis.virginia.gov/admincode/title9/agency5/chapter91/section420/

## Local preview

Install locked dependencies with npm ci, run npm run build, then npm run start -- --hostname 127.0.0.1 --port 3018. For a disposable local test, leave DATABASE_URL and notification/upload credentials unset. Existing production settings and the production database were not changed by this update.

The archive excludes dependencies, generated build files, Git metadata, developer-specific Claude settings, live environment files and the local test database. Publication remains a separate action.
