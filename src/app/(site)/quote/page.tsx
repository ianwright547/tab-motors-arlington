import type { Metadata } from "next";
import { Suspense } from "react";
import { BadgeCheck, Clock, Lock, MapPin, Phone, Receipt } from "lucide-react";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { uploadsEnabled } from "@/lib/uploads";
import { formatHoursSummary, site } from "@/lib/site";
import { telHref } from "@/lib/format";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description:
    "Tell us about your vehicle and what it needs, and we'll come back with a quote. " +
    "Free, no obligation. AAA Approved auto repair in Arlington, VA.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  const hours = formatHoursSummary();

  return (
    <>
      <section className="bg-ink-950 text-white">
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow text-brand-400">Free quote</p>
          <h1 className="mt-2 max-w-3xl font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Tell us what's going on with your car
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-300">
            Four short steps, about two minutes. We'll review the details and come back with a
            price and a time we can take it, with no obligation either way.
          </p>
        </div>
        <div aria-hidden className="hazard-stripe h-1.5" />
      </section>

      <div className="container-page grid gap-10 py-12 md:py-16 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
        {/* The form reads ?service= to preselect a service, which needs a
            Suspense boundary. With one, this page still prerenders as static. */}
        <Suspense fallback={<div className="min-h-[32rem]" />}>
          <QuoteForm
            uploadsEnabled={uploadsEnabled()}
            turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? null}
          />
        </Suspense>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-xl border border-ink-200 bg-ink-50 p-5">
            <h2 className="font-display text-lg font-semibold">What you can expect</h2>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex gap-3">
                <Receipt className="mt-0.5 size-4.5 shrink-0 text-brand-600" aria-hidden />
                <span className="text-ink-600">
                  <strong className="font-semibold text-ink-900">A real quote, not a range.</strong>{" "}
                  If we need to see the car before we can price it accurately, we'll say so
                  instead of guessing.
                </span>
              </li>
              <li className="flex gap-3">
                <BadgeCheck className="mt-0.5 size-4.5 shrink-0 text-brand-600" aria-hidden />
                <span className="text-ink-600">
                  <strong className="font-semibold text-ink-900">No pressure.</strong> A quote is a
                  quote. Plenty of people get one and decide to wait, and that's fine.
                </span>
              </li>
              <li className="flex gap-3">
                <Lock className="mt-0.5 size-4.5 shrink-0 text-brand-600" aria-hidden />
                <span className="text-ink-600">
                  <strong className="font-semibold text-ink-900">Your details stay here.</strong>{" "}
                  We use them to reply about this request. No marketing lists, no reselling.
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl bg-ink-900 p-5 text-white">
            <h2 className="font-display text-lg font-semibold">Rather call?</h2>
            <p className="mt-1.5 text-sm text-ink-300">
              During shop hours a phone call is always the fastest way to get an answer.
            </p>
            <a
              href={telHref(site.phone.e164)}
              className="mt-3 flex items-center gap-2.5 font-display text-2xl font-semibold text-white hover:text-brand-400"
            >
              <Phone className="size-5 text-brand-500" aria-hidden />
              {site.phone.display}
            </a>
          </div>

          <div className="rounded-xl border border-ink-200 p-5">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Clock className="size-4.5 text-brand-600" aria-hidden />
              Shop hours
            </h2>
            <dl className="mt-3 space-y-1 text-sm">
              {hours.map((entry) => (
                <div key={entry.label} className="flex gap-3">
                  <dt className="w-20 shrink-0 font-medium text-ink-800">{entry.label}</dt>
                  <dd className="text-ink-600">{entry.value}</dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-5 flex items-center gap-2 font-display text-lg font-semibold">
              <MapPin className="size-4.5 text-brand-600" aria-hidden />
              Address
            </h2>
            <p className="mt-2 text-sm text-ink-600">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${site.address.mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-semibold text-brand-700 underline underline-offset-2"
            >
              Get directions
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
