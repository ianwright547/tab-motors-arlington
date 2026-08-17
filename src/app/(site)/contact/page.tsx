import type { Metadata } from "next";
import { BadgeCheck, Clock, CreditCard, MapPin, Phone, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { formatHoursSummary, site } from "@/lib/site";
import { telHref } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contact & Directions",
  description:
    `${site.name}, ${site.address.oneLine}. Call ${site.phone.display}. ` +
    `Open Monday to Friday 7:00 AM to 6:00 PM, and Saturday 7:00 AM to 3:00 PM.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const hours = formatHoursSummary();
  const amenities = site.toConfirm.amenities;

  return (
    <>
      <PageHero
        eyebrow="Find us"
        title="Contact & directions"
        intro="We're on Langston Blvd in North Arlington. Call during shop hours for the fastest answer, or send us the details any time."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <div className="container-page grid gap-10 py-14 md:py-16 lg:grid-cols-2 lg:gap-14">
        <div>
          <dl className="space-y-7">
            <div className="flex gap-3.5">
              <Phone className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
              <div>
                <dt className="font-semibold text-ink-900">Phone</dt>
                <dd className="mt-1">
                  <a
                    href={telHref(site.phone.e164)}
                    className="font-display text-3xl font-semibold text-ink-900 hover:text-brand-700"
                  >
                    {site.phone.display}
                  </a>
                </dd>
                <dd className="mt-1.5 text-sm text-ink-500">
                  During shop hours this is always the quickest way to reach us.
                </dd>
              </div>
            </div>

            <div className="flex gap-3.5">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
              <div>
                <dt className="font-semibold text-ink-900">Address</dt>
                <dd className="mt-1 text-ink-700">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </dd>
                <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${site.address.mapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-brand-700 underline underline-offset-2"
                  >
                    Get directions
                  </a>
                  <a
                    href={`https://maps.apple.com/?q=${site.address.mapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-brand-700 underline underline-offset-2"
                  >
                    Open in Apple Maps
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex gap-3.5">
              <Clock className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
              <div>
                <dt className="font-semibold text-ink-900">Shop hours</dt>
                <dd className="mt-1.5 space-y-1 text-ink-700">
                  {hours.map((entry) => (
                    <div key={entry.label} className="flex gap-3">
                      <span className="w-20 shrink-0 font-medium text-ink-900">{entry.label}</span>
                      <span>{entry.value}</span>
                    </div>
                  ))}
                </dd>
                <dd className="mt-2.5 rounded-md border border-warn-100 bg-warn-50 p-3 text-sm text-warn-700">
                  The gas station on the property keeps longer hours than the repair shop. For
                  service, please come during the hours above.
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-brand-200 bg-brand-50 p-4">
              <BadgeCheck className="size-5 text-brand-700" aria-hidden />
              <h2 className="mt-2 text-sm font-bold text-brand-900">AAA Approved</h2>
              <p className="mt-1 text-sm text-brand-800">{site.aaa.memberBenefit}.</p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-ink-50 p-4">
              <ShieldCheck className="size-5 text-ink-700" aria-hidden />
              <h2 className="mt-2 text-sm font-bold text-ink-900">Warranted work</h2>
              <p className="mt-1 text-sm text-ink-700">{site.warranty.label}.</p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-ink-50 p-4">
              <CreditCard className="size-5 text-ink-700" aria-hidden />
              <h2 className="mt-2 text-sm font-bold text-ink-900">Financing available</h2>
              <p className="mt-1 text-sm text-ink-700">{site.financing.blurb}</p>
            </div>
          </div>

          {amenities.length > 0 && (
            <div className="mt-6">
              <h2 className="font-display text-lg font-semibold">While you&apos;re here</h2>
              <ul className="mt-2 space-y-1.5 text-sm text-ink-700">
                {amenities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-ink-200">
            <iframe
              title={`Map showing ${site.name}`}
              src={`https://maps.google.com/maps?q=${site.address.mapsQuery}&z=15&output=embed`}
              className="h-80 w-full border-0 lg:h-[26rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="rounded-xl bg-ink-900 p-6 text-white">
            <h2 className="font-display text-xl font-semibold">Send us the details instead</h2>
            <p className="mt-2 text-sm text-ink-300">
              Tell us about the vehicle and what it needs, and we&apos;ll come back with a quote.
              Works outside shop hours too.
            </p>
            <ButtonLink href="/quote" size="lg" className="mt-4 w-full">
              Get a free quote
            </ButtonLink>
            <ButtonAnchor
              href={telHref(site.phone.e164)}
              variant="outlineOnDark"
              className="mt-2.5 w-full"
            >
              <Phone className="size-4" aria-hidden />
              {site.phone.display}
            </ButtonAnchor>
          </div>

          <div className="rounded-xl border border-ink-200 bg-white p-5">
            <h2 className="font-display text-lg font-semibold">Areas we serve</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              {site.serviceArea.join(" · ")}
            </p>
          </div>
        </div>
      </div>

      <section className="container-page pb-14 md:pb-16">
        <p className="max-w-3xl text-sm leading-relaxed text-ink-500">
          <strong className="font-semibold text-ink-700">Please note:</strong> {site.disclaimer}
        </p>
      </section>
    </>
  );
}
