import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { QuoteCta } from "@/components/site/QuoteCta";
import { InspectionChecker } from "@/components/site/InspectionChecker";
import { BreadcrumbSchema } from "@/components/site/StructuredData";
import {
  emissionsLocalities,
  moveDeadlines,
  oldestCoveredModelYear,
} from "@/lib/inspection-rules";
import { socialTags } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/tools/virginia-inspection-checker";
const title = "Virginia Inspection & Emissions Checker";
const description =
  "Free checker for Virginia drivers: find out if your vehicle needs a safety inspection, an emissions test, or both, and get your deadlines after a move to Arlington.";

/** Rebuilt on each deploy, which is often enough for a yearly boundary. */
const year = new Date().getFullYear();

export const metadata: Metadata = {
  title: { absolute: `${title} | Free Tool` },
  description,
  alternates: { canonical: path },
  ...socialTags(title, description, path),
};

const sources = [
  ["Code of Virginia 46.2-1158: safety inspection interval", "https://law.lis.virginia.gov/vacode/title46.2/chapter10/section46.2-1158/"],
  ["Code of Virginia 46.2-1178: emissions coverage and qualified hybrids", "https://law.lis.virginia.gov/vacode/title46.2/chapter10/section46.2-1178/"],
  ["Virginia DEQ: How do I get an inspection?", "https://www.deq.virginia.gov/air-energy/vehicle-emissions-air-check/how-do-i-get-an-inspection"],
  ["Virginia DMV: Emissions Inspections", "https://www.dmv.virginia.gov/vehicles/registration/emissions"],
  ["Virginia State Police: Vehicle Safety Inspection", "https://vsp.virginia.gov/public-safety-programs-center/vehicle-safety-inspection/"],
  ["Arlington County: Registering a Vehicle", "https://www.arlingtonva.us/Government/Programs/Taxes/Vehicles/Registering-a-Vehicle"],
] as const;

export default function InspectionCheckerPage() {
  const trail = [{ label: title }];

  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description,
    url: `${site.url}${path}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": `${site.url}#business` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }}
      />
      <BreadcrumbSchema trail={trail} />

      <PageHero
        eyebrow="Free tool"
        title={title}
        intro="Answer a few questions to see what your vehicle needs in Virginia. Checked against state law and agency guidance on November 4, 2026."
        breadcrumbs={trail}
      />

      <section className="container-page py-12 md:py-16">
        <InspectionChecker year={year} />
      </section>

      <section className="border-t border-ink-200 bg-ink-50">
        <div className="container-page max-w-3xl py-12 md:py-16">
          <div className="prose-shop">
            <h2>The rules this checker uses</h2>
            <p>
              Virginia has two separate programs, and most Arlington drivers fall under both. They
              run on different schedules and are overseen by different agencies, which is why so
              many people mix them up.
            </p>

            <h3>Safety inspection</h3>
            <p>
              Every vehicle registered in Virginia needs a safety inspection every 12 months. The
              Virginia State Police set the checklist and the fee caps: $20 for most vehicles and
              $12 for motorcycles. If your car is rejected, read{" "}
              <Link href="/blog/failed-virginia-inspection">
                what happens after you fail a Virginia inspection
              </Link>
              .
            </p>

            <h3>Emissions inspection</h3>
            <p>
              Vehicles garaged in these localities need a passing emissions test or a waiver every
              two years to register or renew:
            </p>
            <ul>
              {emissionsLocalities.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
            <p>The main exemptions are:</p>
            <ul>
              <li>
                Gasoline vehicles at 25 model years old. In {year}, that means model year{" "}
                {oldestCoveredModelYear(year) - 1} and older.
              </li>
              <li>
                Vehicles manufactured and titled for the current model year or the three before it.
                DMV may still require a test for newer vehicles first titled in another state.
              </li>
              <li>Vehicles powered exclusively by electricity or another clean fuel.</li>
              <li>
                Qualified hybrids rated at 50 mpg or better in EPA city testing, or 48 mpg for model
                years 2008 and 2009.
              </li>
              <li>Motorcycles and registered antique vehicles.</li>
              <li>
                Diesels older than model year 1997 or rated over 8,500 pounds gross vehicle weight,
                and gasoline vehicles rated over 10,000 pounds.
              </li>
            </ul>
            <p>
              Exempt vehicles can still be pulled into DEQ&apos;s on-road program if roadside sensors
              flag them. The full picture is in our guide to{" "}
              <Link href="/blog/failed-virginia-emissions">failed emissions tests and waivers</Link>.
            </p>

            <h3>Deadlines after moving to Arlington</h3>
            <ul>
              {moveDeadlines.map((deadline) => (
                <li key={deadline.label}>
                  <strong>{deadline.days} days:</strong> {deadline.label}.
                </li>
              ))}
            </ul>
            <p>
              Our <Link href="/blog/moving-to-arlington-car-checklist">moving guide</Link> walks
              through each step in order.
            </p>

            <h2>Need one done?</h2>
            <p>
              {site.name} is an official Virginia inspection station at {site.address.oneLine}, with
              both <Link href="/services/virginia-state-inspection">safety inspections</Link> and{" "}
              <Link href="/services/virginia-emissions-inspection">emissions testing</Link>. Call{" "}
              {site.phone.display} for today&apos;s availability.
            </p>

            <h2>Sources</h2>
            <ul>
              {sources.map(([label, href]) => (
                <li key={href}>
                  <a href={href} rel="noopener">
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <h2>Link to this tool</h2>
            <p>
              Neighborhood associations, relocation teams and realtors are welcome to link to this
              page or share it with new residents. It is free, needs no sign-up and stores nothing
              you enter.
            </p>
          </div>
        </div>
      </section>

      <QuoteCta heading="Rather have us take a look?" />
    </>
  );
}
