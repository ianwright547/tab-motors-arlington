import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { QuoteCta } from "@/components/site/QuoteCta";
import { BlogTeasers } from "@/components/site/BlogTeasers";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { areas, getArea } from "@/lib/areas";
import { services } from "@/lib/services";
import { ratingValue, reviewCount } from "@/lib/reviews";
import { site } from "@/lib/site";
import { telHref } from "@/lib/format";

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: { canonical: `/service-areas/${area.slug}` },
  };
}

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const popular = services.slice(0, 6);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {area.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <PageHero
        eyebrow="Service Area"
        title={area.h1}
        intro={area.blurb}
        breadcrumbs={[
          { label: "Service Areas", href: "/service-areas" },
          { label: area.name },
        ]}
      />

      <div className="container-page grid gap-10 py-14 md:py-16 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <div>
          <article
            className="prose-shop"
            dangerouslySetInnerHTML={{ __html: area.bodyHtml }}
          />

          {area.faq.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                {area.name} questions
              </h2>
              <dl className="mt-5 divide-y divide-ink-200 border-y border-ink-200">
                {area.faq.map((f) => (
                  <div key={f.q} className="py-5">
                    <dt className="font-semibold text-ink-900">{f.q}</dt>
                    <dd className="mt-2 leading-relaxed text-ink-600">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
              What we do for {area.name}
            </h2>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {popular.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-center gap-3 rounded-lg border border-ink-200 bg-white p-3.5 transition-colors hover:border-ink-400 hover:bg-ink-50"
                  >
                    <service.icon className="size-5 shrink-0 text-brand-600" aria-hidden />
                    <span className="min-w-0 flex-1 text-sm font-semibold text-ink-800">
                      {service.name}
                    </span>
                    <ArrowRight
                      className="size-4 shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-card">
            <h2 className="font-display text-lg font-semibold">{area.name} drivers</h2>
            <p className="mt-2 text-sm text-ink-600">
              {area.drive}. Honest, upfront pricing and same-day service in most cases.
            </p>
            <ButtonLink href="/quote" size="lg" className="mt-4 w-full">
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
            <ul className="mt-4 space-y-2 text-sm text-ink-700">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
                {site.address.street}, {site.address.city}
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
                AAA Approved · VA inspection &amp; emissions
              </li>
              <li className="flex items-start gap-2">
                <Star className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
                {ratingValue} stars · {reviewCount} reviews
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <BlogTeasers heading="Car care, explained" className="border-t border-ink-200" />

      <QuoteCta heading={`Auto repair for ${area.name}?`} />
    </>
  );
}
