import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquareQuote, Star } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { QuoteCta } from "@/components/site/QuoteCta";
import { ButtonAnchor } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews",
  description: `Customer reviews for ${site.name}, AAA Approved auto repair in Arlington, VA.`,
  alternates: { canonical: "/reviews" },
};

/**
 * Empty until there are real reviews to show.
 *
 * The obvious thing to do with a reviews page on a new site is write four
 * plausible testimonials and attribute them to first names. That is inventing
 * quotes from customers who never said them — and on top of being dishonest,
 * fake review content breaches Google's policies and can cost the business its
 * Business Profile, which is the single most valuable thing it will own.
 *
 * Once the Google Business Profile is claimed, set site.toConfirm.googleReviewUrl
 * and this page starts pointing customers at the real thing.
 */
export default function ReviewsPage() {
  const reviewUrl = site.toConfirm.googleReviewUrl;

  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What customers say"
        intro="We'd rather show you real reviews than write our own. Here's where they'll live."
        breadcrumbs={[{ label: "Reviews" }]}
      />

      <section className="container-page py-14 md:py-16">
        <div className="rounded-xl border border-dashed border-ink-300 bg-white p-8 text-center md:p-12">
          <MessageSquareQuote className="mx-auto size-9 text-ink-400" aria-hidden />
          <h2 className="mt-4 font-display text-2xl font-semibold">
            Real reviews are on the way
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-ink-600">
            This page is waiting on the shop&apos;s Google Business Profile. When it&apos;s live,
            genuine customer reviews appear here, along with a link to leave your own.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">
            We&apos;re deliberately not filling this space with testimonials we wrote ourselves.
            If a review here doesn&apos;t come from an actual customer, it isn&apos;t worth
            reading.
          </p>

          {reviewUrl && (
            <ButtonAnchor
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="mt-6"
            >
              <Star className="size-4" aria-hidden />
              Leave us a Google review
            </ButtonAnchor>
          )}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-ink-200 bg-ink-50 p-5">
            <h2 className="font-display text-lg font-semibold">In the meantime</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              We&apos;re an{" "}
              <strong className="font-semibold text-ink-900">AAA Approved Auto Repair</strong>{" "}
              facility. That approval isn&apos;t self-awarded. AAA inspects shops on workmanship,
              facilities, technician training and community reputation, and re-checks to keep it.
              It&apos;s the most meaningful third-party signal we can point at today.
            </p>
          </div>

          <div className="rounded-xl border border-ink-200 bg-ink-50 p-5">
            <h2 className="font-display text-lg font-semibold">Already a customer?</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              A review genuinely helps a small shop more than anything else. It&apos;s most of
              what decides whether someone nearby finds us at all. If we did right by you,{" "}
              {reviewUrl ? "the button above takes a minute." : "ask us for the review link next time you're in."}
            </p>
            <p className="mt-3 text-sm text-ink-600">
              If we got something wrong, we&apos;d rather hear it directly.{" "}
              <Link
                href="/contact"
                className="font-semibold text-brand-700 underline underline-offset-2"
              >
                get in touch
              </Link>{" "}
              and we&apos;ll put it right.
            </p>
          </div>
        </div>
      </section>

      <QuoteCta />
    </>
  );
}
