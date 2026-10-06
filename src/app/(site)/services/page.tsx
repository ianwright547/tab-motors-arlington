import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { BreadcrumbSchema } from "@/components/site/StructuredData";
import { QuoteCta } from "@/components/site/QuoteCta";
import { IconPlate } from "@/components/site/IconPlate";
import { Reveal } from "@/components/site/Reveal";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Auto Repair Services in Arlington, VA",
  description:
    "Brakes, diagnostics, Virginia state inspection, emissions, A/C, transmission, " +
    "electrical, hybrid and EV service. AAA Approved auto repair on Old Dominion Dr in Arlington.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ label: "Services" }]} />

      <PageHero
        eyebrow="What we do"
        title="Auto repair services in Arlington"
        intro="Everything below happens in our own bays on Old Dominion Dr. We diagnose first, quote second, and don't start work until you've said yes to the price."
        breadcrumbs={[{ label: "Services" }]}
      />

      <section className="container-page py-16 md:py-20">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.slug}>
              <Reveal delay={Math.min(index, 5) * 60} className="h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
                >
                  <IconPlate icon={service.icon} />
                  <h2 className="mt-4 font-display text-xl font-semibold leading-tight">
                    {service.name}
                  </h2>
                  <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">
                    {service.blurb}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    Learn more
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

        <div className="mt-10 rounded-xl border border-ink-200 bg-ink-50 p-6">
          <h2 className="font-display text-xl font-semibold">Don&apos;t see it listed?</h2>
          <p className="mt-2 max-w-2xl text-ink-600">
            We service domestic, Asian and European vehicles, including hybrids and EVs. If
            you&apos;re not sure whether something is in our wheelhouse, call{" "}
            <a
              href={`tel:${site.phone.e164}`}
              className="font-semibold text-brand-700 underline underline-offset-2"
            >
              {site.phone.display}
            </a>{" "}
            and ask. We&apos;ll tell you straight if it&apos;s not a job for us.
          </p>
          <p className="mt-3 text-sm text-ink-500">
            We don&apos;t offer towing or detailing. Repair work only.
          </p>
        </div>
      </section>

      <QuoteCta />
    </>
  );
}
