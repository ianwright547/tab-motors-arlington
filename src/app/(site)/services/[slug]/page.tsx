import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Check, CreditCard, Phone, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { QuoteCta } from "@/components/site/QuoteCta";
import { BreadcrumbSchema, ServiceSchema } from "@/components/site/StructuredData";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { getService, otherServices, services } from "@/lib/services";
import { getPost } from "@/lib/blog";
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

  // Our SEO title + description, preserved verbatim from the SEO build.
  return {
    // metaTitle already ends with the business name, so opt out of the root
    // layout's `%s | TAB Motors Arlington` template instead of doubling it.
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = otherServices(service.slug, 6);

  // Articles chosen for THIS service, not the three most recent posts.
  const articles = service.relatedPosts
    .map((slug) => getPost(slug))
    .filter((post) => post !== undefined);

  const trail = [{ label: "Services", href: "/services" }, { label: service.name }];

  return (
    <>
      <BreadcrumbSchema trail={trail} />
      <ServiceSchema name={service.name} description={service.blurb} slug={service.slug} />

      <PageHero
        eyebrow="Service"
        title={service.h1}
        intro={service.heroText}
        breadcrumbs={trail}
      >
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonAnchor href={telHref(site.phone.e164)} size="lg">
            <Phone className="size-4" aria-hidden />
            {service.inspection ? "Call about inspection availability" : "Call to discuss your repair"}
          </ButtonAnchor>
          <ButtonLink href={`/quote?service=${service.slug}`} variant="outlineOnDark" size="lg">
            Request a quote online
          </ButtonLink>
        </div>
        <p className="mt-4 text-sm text-ink-300">
          {site.phone.display} · Mon–Fri 7–6 · Sat 7–3
          {service.inspection && ". Call to confirm an inspector is available before travelling."}
        </p>
      </PageHero>

      <div className="container-page grid gap-10 py-14 md:py-16 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <div>
          {/* What you get — our service highlights */}
          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
              What you get
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.features.map((feat) => (
                <li
                  key={feat}
                  className="flex items-start gap-2.5 rounded-lg border border-ink-200 bg-white p-3.5"
                >
                  <Check className="mt-0.5 size-4.5 shrink-0 text-good-600" strokeWidth={3} aria-hidden />
                  <span className="text-[0.9375rem] text-ink-700">{feat}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Symptoms first: most people arrive describing a noise, not a part. */}
          {service.symptoms.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                Come in if you have
              </h2>
              <ul className="mt-5 space-y-2.5">
                {service.symptoms.map((symptom) => (
                  <li key={symptom} className="flex items-start gap-2.5 text-ink-700">
                    <Check
                      className="mt-1 size-4 shrink-0 text-brand-600"
                      strokeWidth={3}
                      aria-hidden
                    />
                    <span className="leading-relaxed">{symptom}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Our SEO educational article, styled in his design */}
          <article
            className="prose-shop mt-12"
            dangerouslySetInnerHTML={{ __html: service.bodyHtml }}
          />

          {/* Inspection pages only: the regulated test, separated from repairs. */}
          {service.inspection && (
            <section className="mt-12 space-y-10">
              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                  What the inspection costs
                </h2>
                <p className="mt-4 leading-relaxed text-ink-700">
                  {service.inspection.feeNote}
                </p>
                <ul className="mt-5 space-y-2.5 rounded-lg border border-ink-200 bg-ink-50 p-5 text-[0.9375rem] text-ink-700">
                  <li>
                    <strong className="text-ink-900">The test fee</strong>{" "}
                    {service.slug === "virginia-emissions-inspection"
                      ? "is capped at $30 by Virginia law. Call to confirm the shop’s fee."
                      : "is regulated by Virginia. The standard passenger-vehicle safety inspection fee is $20; other vehicle classes have different fees."}
                  </li>
                  <li>
                    <strong className="text-ink-900">Any repair</strong> is a separate job,
                    quoted separately, and only after you approve it.
                  </li>
                  <li>
                    <strong className="text-ink-900">Optional work</strong> we notice while the
                    car is here is exactly that. We will mention it and leave it to you.
                  </li>
                  <li>
                    <strong className="text-ink-900">The reinspection or retest</strong> has its
                    own rules, set out below.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                  Who needs this
                </h2>
                <p className="mt-4 leading-relaxed text-ink-700">
                  {service.inspection.whoNeeds}
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                  What gets checked
                </h2>
                <ul className="mt-5 space-y-2.5">
                  {service.inspection.whatsChecked.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-ink-700">
                      <Check
                        className="mt-1 size-4 shrink-0 text-brand-600"
                        strokeWidth={3}
                        aria-hidden
                      />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                  What to bring
                </h2>
                <ul className="mt-5 space-y-2.5">
                  {service.inspection.whatToBring.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-ink-700">
                      <Check
                        className="mt-1 size-4 shrink-0 text-brand-600"
                        strokeWidth={3}
                        aria-hidden
                      />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                  Walk in or book ahead
                </h2>
                <p className="mt-4 leading-relaxed text-ink-700">
                  {service.inspection.scheduling}
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                  If your vehicle fails
                </h2>
                <p
                  className="prose-shop mt-4 leading-relaxed text-ink-700"
                  dangerouslySetInnerHTML={{ __html: service.inspection.ifItFails }}
                />
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                  Reinspection and retest
                </h2>
                <p className="mt-4 leading-relaxed text-ink-700">
                  {service.inspection.reinspection}
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                  Talk to the shop
                </h2>
                <p className="mt-4 leading-relaxed text-ink-700">
                  Call{" "}
                  <a
                    href={telHref(site.phone.e164)}
                    className="font-semibold text-brand-700 underline underline-offset-2"
                  >
                    {site.phone.display}
                  </a>{" "}
                  or come by {site.address.street}, {site.address.city}, {site.address.state}{" "}
                  {site.address.zip}. You can also{" "}
                  <Link
                    href={`/quote?service=${service.slug}`}
                    className="font-semibold text-brand-700 underline underline-offset-2"
                  >
                    send us the details online
                  </Link>{" "}
                  and we will get back to you.
                </p>
              </div>
            </section>
          )}

          {/* The same process on every job, because it is the same process. */}
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
              What happens next
            </h2>
            <ol className="mt-5 space-y-4">
              {[
                {
                  step: "Tell us what it is doing",
                  detail: `Call ${site.phone.display}, start a quote online, or stop in. What you hear or feel, and when, narrows things down before anything comes apart.`,
                },
                {
                  step: "We look at the car",
                  detail:
                    "We check the actual parts rather than guessing from the symptom, and we tell you if the cause turns out to be something other than what you came in for.",
                },
                {
                  step: "You get the price first",
                  detail:
                    "We show you what we found, explain what is urgent and what can wait, and quote the work before we start. You are free to think it over or take the quote elsewhere.",
                },
                {
                  step: "We do the work",
                  detail: `Once you approve it, the job goes ahead, backed by our ${site.warranty.label.toLowerCase()}. ${site.financing.short} for larger repairs.`,
                },
                {
                  step: "You get the car back",
                  detail:
                    "Road tested where it matters, with a plain explanation of what was done and anything worth keeping an eye on.",
                },
              ].map((item, index) => (
                <li key={item.step} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink-900 font-display text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink-900">{item.step}</h3>
                    <p className="mt-1 leading-relaxed text-ink-600">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* What it costs — his trust cards, payment-plans wording.
              Skipped on the inspection pages: the fee there is set by statute,
              so "it depends on your vehicle" would be flatly untrue. Those pages
              get the regulated-fee block above instead. */}
          <section className="mt-12">
            {!service.inspection && (
              <>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                  What it costs
                </h2>
                <div className="mt-4 space-y-3 text-ink-700">
                  <p className="leading-relaxed">
                    We don&apos;t publish a flat price for this, because an honest number depends
                    on your specific vehicle and what we find. What we will do is tell you the
                    price before we start, and not change it without talking to you first.
                  </p>
                  <p className="leading-relaxed">
                    If we need to see the car before we can quote accurately, we&apos;ll say so
                    rather than throw out a number we can&apos;t stand behind.
                  </p>
                </div>
              </>
            )}

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
              <div className="rounded-lg border border-ink-200 bg-ink-50 p-4">
                <CreditCard className="size-5 text-ink-700" aria-hidden />
                <h3 className="mt-2 text-sm font-bold text-ink-900">Payment plans available</h3>
                <p className="mt-1 text-sm text-ink-700">
                  Spread the cost of a bigger job. Ask us in the shop.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ — our SEO Q&A */}
          {service.faq.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                Frequently asked questions
              </h2>
              <dl className="mt-5 divide-y divide-ink-200 border-y border-ink-200">
                {service.faq.map((f) => (
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
            {service.inspection ? "Check inspection availability" : `Talk to us about ${service.name.toLowerCase()}`}
            </h2>
            <p className="mt-2 text-sm text-ink-600">
              {service.inspection
                ? "Call to check the current queue, inspector availability and fee before you set off."
                : "Tell us your vehicle and what you have noticed. We will explain the next step and quote repairs before work starts."}
            </p>
            <ButtonAnchor
              href={telHref(site.phone.e164)}
              className="mt-4 w-full"
            >
              <Phone className="size-4" aria-hidden />
              {site.phone.display}
            </ButtonAnchor>
            <ButtonLink href={`/quote?service=${service.slug}`} variant="outline" className="mt-2.5 w-full">
              Request a quote online
            </ButtonLink>
          </div>

          <div className="rounded-xl border border-ink-200 bg-ink-50 p-5">
            <h2 className="font-display text-lg font-semibold">Where to find us</h2>
            <p className="mt-2 text-sm text-ink-600">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </p>
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

      {articles.length > 0 && (
        <section className="border-t border-ink-200">
          <div className="container-page py-14 md:py-16">
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
              More on {service.name.toLowerCase()}
            </h2>
            <ul className="mt-6 grid gap-5 md:grid-cols-2">
              {articles.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                      {post.category}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-semibold leading-tight">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">
                      {post.teaser}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                      Read the guide
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <QuoteCta heading={`Need ${service.name.toLowerCase()}?`} serviceSlug={service.slug} />
    </>
  );
}
