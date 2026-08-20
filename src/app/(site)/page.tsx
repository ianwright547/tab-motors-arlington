import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Car,
  ClipboardCheck,
  Clock,
  CreditCard,
  MapPin,
  Phone,
  Receipt,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { ShopPhoto } from "@/components/site/ShopPhoto";
import { IconPlate } from "@/components/site/IconPlate";
import { Reveal } from "@/components/site/Reveal";
import { LocalBusinessSchema } from "@/components/site/StructuredData";
import { ReviewsSection } from "@/components/site/ReviewsSection";
import { SocialSection } from "@/components/site/SocialSection";
import { BlogTeasers } from "@/components/site/BlogTeasers";
import { services } from "@/lib/services";
import { formatHoursSummary, site } from "@/lib/site";
import { telHref } from "@/lib/format";

/**
 * The three services that lead the page: the highest-intent local search
 * (inspection), the most common urgent repair (brakes), and the one people
 * arrive with no idea how to name (check engine light).
 */
const LEAD_SERVICE_SLUGS = [
  "virginia-state-inspection",
  "brake-repair",
  "engine-diagnostics",
];

export default function HomePage() {
  const hours = formatHoursSummary();
  const leadServices = LEAD_SERVICE_SLUGS.map(
    (slug) => services.find((service) => service.slug === slug),
  ).filter((service): service is (typeof services)[number] => Boolean(service));
  const otherServices = services.filter(
    (service) => !LEAD_SERVICE_SLUGS.includes(service.slug),
  );

  return (
    <>
      <LocalBusinessSchema />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative isolate overflow-hidden bg-ink-950">
        <Image
          src="/images/shop-exterior.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          // Biased upward so the roofline signage stays in frame when the 4:3
          // photo is cropped to a wide banner.
          className="object-cover object-[50%_38%]"
        />
        <div aria-hidden className="photo-scrim absolute inset-0" />

        <div className="container-page relative py-20 md:py-28 lg:py-36">
          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-ink-950/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-brand-300 backdrop-blur-sm">
                <BadgeCheck className="size-3.5" aria-hidden />
                AAA Approved
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-ink-950/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
                <ClipboardCheck className="size-3.5" aria-hidden />
                Official VA inspection station
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-ink-950/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
                <Clock className="size-3.5" aria-hidden />
                Open Saturdays
              </span>
            </div>

            <p className="mt-7 font-display text-sm font-bold uppercase tracking-[0.18em] text-brand-300">
              Straight answers. Honest repairs.
            </p>
            {/* Our SEO H1, preserved verbatim from the SEO build. */}
            <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-[0.9] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl">
              Auto repair in <span className="text-brand-500">Arlington, VA</span>.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200 sm:text-xl">
              Full-service auto repair on Langston Blvd in North Arlington. Inspections,
              diagnostics and everything in between, for domestic, Asian, European, hybrid and
              electric vehicles.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/quote" size="lg" className="sm:min-w-56">
                Get a free quote
              </ButtonLink>
              <ButtonAnchor
                href={telHref(site.phone.e164)}
                variant="outlineOnDark"
                size="lg"
                className="bg-ink-950/50 backdrop-blur-sm"
              >
                <Phone className="size-4" aria-hidden />
                {site.phone.display}
              </ButtonAnchor>
            </div>

            <p className="mt-6 text-sm text-ink-300">
              Open 7:00 AM to 6:00 PM weekdays, until 3:00 PM Saturdays. No obligation, no
              pressure.
            </p>
          </div>
        </div>

        <div aria-hidden className="hazard-stripe absolute inset-x-0 bottom-0 h-1.5" />
      </section>

      {/* ----------------------------------------------------------- Trust bar */}
      <section className="border-b border-ink-200 bg-white">
        <div className="container-page grid gap-x-10 gap-y-7 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:py-12">
          <TrustItem icon={BadgeCheck} title="AAA Approved" body={site.aaa.memberBenefit} />
          <TrustItem
            icon={ShieldCheck}
            title={site.warranty.label}
            body="If something we repaired isn't right, bring it back. Most shops give you 90 days."
          />
          <TrustItem
            icon={Receipt}
            title="Quoted before we start"
            body="You approve the price before any work begins. No surprise invoices."
          />
          <TrustItem
            icon={ClipboardCheck}
            title="Inspections and emissions"
            body="An official Virginia station, so both happen in a single visit."
          />
          <TrustItem
            icon={Car}
            title="Every make, including EVs"
            body="Domestic, Asian and European, plus hybrids, Tesla, Rivian and Lucid."
          />
          <TrustItem
            icon={CreditCard}
            title="Payment plans available"
            body="Spread the cost of a bigger repair. Ask us about a plan that works for you."
          />
        </div>
      </section>

      {/* ----------------------------------------------------------- Services */}
      <section id="services" className="container-page py-20 md:py-28">
        <Reveal>
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-700">What we do</p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              Repairs and maintenance,
              <br className="hidden sm:block" /> all under one roof
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-600 sm:text-xl">
              We&apos;re a repair shop, not a chain. The person who diagnoses your car is the
              person who fixes it.
            </p>
          </div>
        </Reveal>

        {/* Three lead services get room to breathe; the rest sit below as a
            compact index. Fourteen identical cards read as a wall. */}
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {leadServices.map((service, index) => (
            <li key={service.slug}>
              <Reveal delay={index * 80}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
                >
                  <IconPlate icon={service.icon} size="lg" />
                  <h3 className="mt-5 font-display text-2xl font-semibold leading-tight">
                    {service.name}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-600">{service.blurb}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
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

        <Reveal>
          <h3 className="mt-16 font-display text-sm font-bold uppercase tracking-[0.14em] text-ink-500">
            Everything else we handle
          </h3>
          <ul className="mt-5 grid gap-x-8 border-t border-ink-200 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((service) => (
              <li key={service.slug} className="border-b border-ink-200">
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex items-center gap-3.5 py-4 transition-colors hover:text-brand-700"
                >
                  <service.icon
                    className="size-5 shrink-0 text-ink-400 transition-colors group-hover:text-brand-600"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1 font-medium text-ink-800 transition-colors group-hover:text-brand-800">
                    {service.name}
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 text-ink-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-600"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* -------------------------------------------------- VA inspection band */}
      <section id="inspection" className="bg-ink-900 text-white">
        <div className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow text-brand-400">Virginia drivers</p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white sm:text-5xl">
              Inspection & emissions, same visit
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-300">
              We&apos;re an{" "}
              <strong className="font-semibold text-white">
                official Virginia inspection station
              </strong>
              . Virginia requires a safety inspection every year and Arlington County requires
              emissions testing every two. We handle both, so keeping your registration valid
              doesn&apos;t mean two trips.
            </p>

            <ul className="mt-8 space-y-3.5">
              {[
                "Annual Virginia safety inspection",
                "Northern Virginia emissions testing",
                "If something fails, we can usually fix it the same visit",
                "We'll tell you what's required versus what can wait",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink-200">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/quote?service=virginia-state-inspection" size="lg">
                Book an inspection
              </ButtonLink>
              <ButtonAnchor
                href={telHref(site.phone.e164)}
                variant="outlineOnDark"
                size="lg"
              >
                Call about walk-ins
              </ButtonAnchor>
            </div>

            <p className="mt-6">
              <Link
                href="/services/virginia-state-inspection"
                className="text-sm font-semibold text-brand-400 underline underline-offset-4 hover:text-brand-300"
              >
                What&apos;s checked, and what to bring
              </Link>
            </p>
          </Reveal>

          <Reveal delay={100}>
            <ShopPhoto
              src="/images/inspection-lift.jpg"
              alt="An SUV raised on the lift with a wheel removed for inspection, beside an official Virginia state inspection station banner"
              className="min-h-80 lg:min-h-[30rem]"
            />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------- Full-bleed photo band */}
      <section aria-hidden className="relative h-52 md:h-72">
        <Image
          src="/images/customer-cars.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_60%]"
        />
        <div className="absolute inset-0 bg-ink-950/25" />
      </section>

      {/* ------------------------------------------------------------- Why us */}
      <section id="why-us" className="container-page py-20 md:py-28">
        <Reveal>
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-700">Why bring it here</p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              An independent shop
              <br className="hidden sm:block" /> that explains itself
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:gap-14">
          <ul className="grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: Receipt,
                title: "You see the price first",
                body: "We diagnose, then quote, then wait for your yes. Nothing gets added to the bill without a conversation.",
              },
              {
                icon: Wrench,
                title: "Diagnosis, not parts roulette",
                body: "Reading a trouble code isn't a diagnosis. We find the actual cause instead of replacing parts until the light goes out.",
              },
              {
                icon: BadgeCheck,
                title: "AAA held us to a standard",
                body: "AAA Approved shops are inspected on workmanship, facilities, technician training and reputation, then re-checked to keep it.",
              },
              {
                icon: Car,
                title: "We don't turn cars away",
                body: "German, Japanese, domestic, hybrid or fully electric, including the makes most independents won't touch.",
              },
            ].map((card, index) => (
              <li key={card.title}>
                <Reveal delay={index * 70} className="h-full">
                  <div className="h-full rounded-2xl border border-ink-200 bg-white p-6 transition-shadow hover:shadow-card">
                    <IconPlate icon={card.icon} />
                    <h3 className="mt-4 font-display text-xl font-semibold leading-tight">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 leading-relaxed text-ink-600">{card.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={120}>
            {/* No staff photos, by the shop's own preference. The bays and the
                equipment carry the trust signal instead. */}
            <ShopPhoto
              src="/images/shop-interior.jpg"
              alt="Inside the TAB Motors Arlington workshop: an Audi raised on a Rotary lift, another on the bay floor, in a clean, well-lit shop"
              className="min-h-80 lg:min-h-[34rem]"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ Gallery */}
      <section className="border-t border-ink-200 bg-white py-20 md:py-24">
        <div className="container-page">
          <p className="eyebrow text-brand-700">Inside the shop</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold uppercase leading-[0.98] tracking-tight sm:text-5xl">
            A real shop on Langston Blvd
          </h2>
          <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <ShopPhoto
              src="/images/shop-exterior.jpg"
              alt="TAB Motors shop and Exxon station on Langston Blvd in Arlington"
              className="col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto"
            />
            <ShopPhoto
              src="/images/inspection-lift.jpg"
              alt="A vehicle up on the lift for a full inspection"
              className="aspect-[4/3]"
            />
            <ShopPhoto
              src="/images/porsche-service.jpg"
              alt="European and luxury vehicle service in the bay"
              className="aspect-[4/3]"
            />
            <ShopPhoto
              src="/images/shop-interior.jpg"
              alt="Inside the TAB Motors service bays"
              className="aspect-[4/3]"
            />
            <ShopPhoto
              src="/images/customer-cars.jpg"
              alt="Customer vehicles of all makes at the shop"
              className="aspect-[4/3]"
            />
          </div>
          <p className="mt-5 max-w-2xl text-ink-600">
            Free air, free coffee, and an AAA-approved team that works on everything from daily
            commuters to European and electric vehicles.
          </p>
        </div>
      </section>

      {/* ------------------------------------------- Latest social posts */}
      <SocialSection />

      {/* ------------------------------------------------------------ Reviews */}
      <ReviewsSection count={6} />

      {/* --------------------------------------------------------- From the blog */}
      <BlogTeasers />

      {/* ------------------------------------------------------------ Contact */}
      <section id="contact" className="container-page py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow text-brand-700">Find us</p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] sm:text-5xl">
              On Langston Blvd
              <br className="hidden sm:block" /> in North Arlington
            </h2>

            <dl className="mt-10 space-y-8">
              <div className="flex gap-4">
                <IconPlate icon={MapPin} />
                <div>
                  <dt className="font-semibold text-ink-900">Address</dt>
                  <dd className="mt-1 text-ink-600">
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </dd>
                  <dd className="mt-2">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${site.address.mapsQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-brand-700 underline underline-offset-4"
                    >
                      Get directions
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <IconPlate icon={Phone} />
                <div>
                  <dt className="font-semibold text-ink-900">Phone</dt>
                  <dd className="mt-1">
                    <a
                      href={telHref(site.phone.e164)}
                      className="font-display text-3xl font-semibold tracking-tight text-ink-900 hover:text-brand-700"
                    >
                      {site.phone.display}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <IconPlate icon={Clock} />
                <div>
                  <dt className="font-semibold text-ink-900">Shop hours</dt>
                  <dd className="mt-2 space-y-1 text-ink-600">
                    {hours.map((entry) => (
                      <div key={entry.label} className="flex gap-3">
                        <span className="w-20 shrink-0 font-medium text-ink-800">
                          {entry.label}
                        </span>
                        <span>{entry.value}</span>
                      </div>
                    ))}
                  </dd>
                  <dd className="mt-3 text-sm text-ink-500">
                    The gas station on the property keeps longer hours than the repair shop. For
                    service, come during the times above.
                  </dd>
                </div>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={100} className="space-y-5">
            <div className="overflow-hidden rounded-2xl border border-ink-200">
              <iframe
                title={`Map showing ${site.name}`}
                src={`https://maps.google.com/maps?q=${site.address.mapsQuery}&z=15&output=embed`}
                className="h-80 w-full border-0 lg:h-[26rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="rounded-2xl bg-ink-900 p-7 text-white">
              <h3 className="font-display text-2xl font-semibold">Ready to get it sorted?</h3>
              <p className="mt-2.5 text-ink-300">
                Send us the details and we&apos;ll come back with a quote. Takes about two
                minutes.
              </p>
              <ButtonLink href="/quote" size="lg" className="mt-5 w-full">
                Get a free quote
              </ButtonLink>
              <p className="mt-4 text-center text-xs text-ink-400">
                {site.warranty.label} · {site.financing.short}
              </p>
            </div>
          </Reveal>
        </div>

        <p className="mt-14 max-w-3xl text-sm leading-relaxed text-ink-500">
          <strong className="font-semibold text-ink-700">Note:</strong> {site.disclaimer}
        </p>
      </section>
    </>
  );
}

function TrustItem({
  icon,
  title,
  body,
}: {
  icon: typeof BadgeCheck;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-4">
      <IconPlate icon={icon} size="sm" />
      <div>
        <h3 className="font-semibold text-ink-900">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-600">{body}</p>
      </div>
    </div>
  );
}
