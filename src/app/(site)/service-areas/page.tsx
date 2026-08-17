import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { QuoteCta } from "@/components/site/QuoteCta";
import { Reveal } from "@/components/site/Reveal";
import { areas } from "@/lib/areas";

export const metadata: Metadata = {
  title: "Service Areas | Auto Repair Across Arlington & Northern Virginia",
  description:
    "TAB Motors serves Arlington, McLean, Falls Church, Alexandria, Vienna, Fairfax and " +
    "Washington, DC with AAA Approved auto repair, Virginia inspection, tires and diagnostics.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Where we work"
        title="Auto repair across Arlington & Northern Virginia"
        intro="We're on Langston Blvd in North Arlington, an easy trip from the neighborhoods and towns below. Same honest pricing and same-day service, whichever side of the county you're on."
        breadcrumbs={[{ label: "Service Areas" }]}
      />

      <section className="container-page py-16 md:py-20">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, index) => (
            <li key={area.slug}>
              <Reveal delay={Math.min(index, 5) * 60} className="h-full">
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-lg bg-ink-900 text-white">
                    <MapPin className="size-5" aria-hidden />
                  </span>
                  <h2 className="mt-4 font-display text-xl font-semibold leading-tight">
                    {area.name}, {area.region}
                  </h2>
                  <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">
                    {area.blurb}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    {area.name} auto repair
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <QuoteCta />
    </>
  );
}
