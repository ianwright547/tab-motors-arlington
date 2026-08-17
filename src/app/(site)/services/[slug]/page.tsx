import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Check, CreditCard, Phone, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { QuoteCta } from "@/components/site/QuoteCta";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { getService, otherServices, services } from "@/lib/services";
import { formatHoursSummary, site } from "@/lib/site";
import { telHref } from "@/lib/format";

/** One static page per service, generated at build time. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    // Locality in the title is what makes these pages rank — nobody searches
    // "brake repair", they search "brake repair arlington va".
    title: `${service.name} in Arlington, VA`,
    description: `${service.blurb} AAA Approved auto repair at ${site.address.street}, Arlington VA. Free quotes.`,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = otherServices(service.slug, 6);

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={`${service.name} in Arlington, VA`}
        intro={service.intro}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      />

      <div className="container-page grid gap-10 py-14 md:py-16 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <div>
          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
              Signs you might need this
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.symptoms.map((symptom) => (
                <li
                  key={symptom}
                  className="flex items-start gap-2.5 rounded-lg border border-ink-200 bg-white p-3.5"
                >
                  <ShieldCheck className="mt-0.5 size-4.5 shrink-0 text-brand-600" aria-hidden />
                  <span className="text-[0.9375rem] text-ink-700">{symptom}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-ink-600">
              Recognise any of these? Send us the details and we&apos;ll tell you what&apos;s
              likely going on and what it costs to put right.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
              What we actually do
            </h2>
            <ul className="mt-5 space-y-3">
              {service.whatWeDo.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 size-4.5 shrink-0 text-good-600" strokeWidth={3} aria-hidden />
                  <span className="text-[0.9375rem] leading-relaxed text-ink-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
              What it costs
            </h2>
            <div className="mt-4 space-y-3 text-ink-700">
              <p className="leading-relaxed">
                We don&apos;t publish a flat price for this, because an honest number depends on
                your specific vehicle and what we find. What we will do is tell you the price
                before we start, and not change it without talking to you first.
              </p>
              <p className="leading-relaxed">
                If we need to see the car before we can quote accurately, we&apos;ll say so
                rather than throw out a number we can&apos;t stand behind.
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-brand-200 bg-brand-50 p-4">
                <BadgeCheck className="size-5 text-brand-700" aria-hidden />
                <h3 className="mt-2 text-sm font-bold text-brand-900">AAA members save</h3>
                <p className="mt-1 text-sm text-brand-800">{site.aaa.memberBenefit}. Bring your card.</p>
              </div>
              <div className="rounded-lg border border-ink-200 bg-ink-50 p-4">
                <ShieldCheck className="size-5 text-ink-700" aria-hidden />
                <h3 className="mt-2 text-sm font-bold text-ink-900">Backed for a year</h3>
                <p className="mt-1 text-sm text-ink-700">{site.warranty.label}.</p>
              </div>
              {/* Whether the customer can pay decides plenty of four-figure
                  repairs, so it belongs next to the price, not buried. */}
              <div className="rounded-lg border border-ink-200 bg-ink-50 p-4">
                <CreditCard className="size-5 text-ink-700" aria-hidden />
                <h3 className="mt-2 text-sm font-bold text-ink-900">Payment plans available</h3>
                <p className="mt-1 text-sm text-ink-700">
                  Spread the cost of a bigger job. Ask us in the shop.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
              Other services
            </h2>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {related.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/services/${other.slug}`}
                    className="group flex items-center gap-3 rounded-lg border border-ink-200 bg-white p-3.5 transition-colors hover:border-ink-400 hover:bg-ink-50"
                  >
                    <other.icon className="size-5 shrink-0 text-brand-600" aria-hidden />
                    <span className="min-w-0 flex-1 text-sm font-semibold text-ink-800">
                      {other.name}
                    </span>
                    <ArrowRight
                      className="size-4 shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              <Link
                href="/services"
                className="text-sm font-semibold text-brand-700 underline underline-offset-2"
              >
                See all services
              </Link>
            </p>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-card">
            <h2 className="font-display text-lg font-semibold">
              Get a quote for {service.name.toLowerCase()}
            </h2>
            <p className="mt-2 text-sm text-ink-600">
              We&apos;ll have this service already selected for you. Just tell us about the
              vehicle.
            </p>
            <ButtonLink href={`/quote?service=${service.slug}`} size="lg" className="mt-4 w-full">
              Start my free quote
            </ButtonLink>
            <ButtonAnchor
              href={telHref(site.phone.e164)}
              variant="outline"
              className="mt-2.5 w-full"
            >
              <Phone className="size-4" aria-hidden />
              {site.phone.display}
            </ButtonAnchor>
          </div>

          <div className="rounded-xl border border-ink-200 bg-ink-50 p-5">
            <h2 className="font-display text-lg font-semibold">Where to find us</h2>
            <p className="mt-2 text-sm text-ink-600">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </p>
            {/* Read from the shared config — hours were hardcoded here once and
                silently went stale the moment the real ones came in. */}
            <dl className="mt-3 space-y-1 text-sm">
              {formatHoursSummary().map((entry) => (
                <div key={entry.label} className="flex gap-3">
                  <dt className="w-16 shrink-0 font-semibold text-ink-900">{entry.label}</dt>
                  <dd className="text-ink-600">{entry.value}</dd>
                </div>
              ))}
            </dl>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${site.address.mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-brand-700 underline underline-offset-2"
            >
              Get directions
            </a>
          </div>
        </aside>
      </div>

      <QuoteCta
        heading={`Need ${service.name.toLowerCase()}?`}
        serviceSlug={service.slug}
      />
    </>
  );
}
