import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { QuoteCta } from "@/components/site/QuoteCta";
import { ButtonAnchor } from "@/components/ui/Button";
import { ratingValue, reviewCount, reviews } from "@/lib/reviews";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Reviews | ${ratingValue} Stars · ${reviewCount}+ Google Reviews | TAB Motors Arlington`,
  description: `Real Google reviews for ${site.name}, AAA Approved auto repair in Arlington, VA. ${ratingValue} stars from ${reviewCount}+ customers.`,
  alternates: { canonical: "/reviews" },
};

/**
 * Real Google reviews, quoted word-for-word from the shop's Google Business
 * Profile. Nothing here is written by us.
 */
export default function ReviewsPage() {
  const reviewUrl = site.toConfirm.googleReviewUrl;

  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What Arlington drivers say"
        intro={`${ratingValue} stars from ${reviewCount}+ Google reviews. Every word below is a real customer's — quoted exactly as they wrote it.`}
        breadcrumbs={[{ label: "Reviews" }]}
      />

      <section className="container-page py-14 md:py-16">
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-ink-200 bg-ink-50 p-5">
          <div className="flex items-center gap-1" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-5 fill-brand-500 text-brand-500" />
            ))}
          </div>
          <p className="font-display text-lg font-bold uppercase tracking-tight text-ink-900">
            {ratingValue} · {reviewCount}+ Google reviews
          </p>
          {reviewUrl && (
            <ButtonAnchor
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto"
            >
              <Star className="size-4" aria-hidden />
              Leave a review
            </ButtonAnchor>
          )}
        </div>

        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <li
              key={`${review.author}-${review.text.slice(0, 12)}`}
              className="flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6 shadow-card"
            >
              <div className="flex items-center gap-1" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-brand-500 text-brand-500" />
                ))}
              </div>
              <p className="mt-3 flex-1 leading-relaxed text-ink-700">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-4 border-t border-ink-100 pt-3">
                <p className="text-sm font-semibold text-ink-900">{review.author}</p>
                <p className="text-xs text-ink-500">
                  {review.city} · {review.when}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-xl border border-ink-200 bg-ink-50 p-5">
          <h2 className="font-display text-lg font-semibold">Already a customer?</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">
            A review genuinely helps a small shop more than anything else. If we did right by
            you,{" "}
            {reviewUrl ? "leave one above — it takes a minute." : "ask us for the review link next time you're in."}{" "}
            If we got something wrong, we&apos;d rather hear it directly —{" "}
            <Link
              href="/contact"
              className="font-semibold text-brand-700 underline underline-offset-2"
            >
              get in touch
            </Link>{" "}
            and we&apos;ll put it right.
          </p>
        </div>
      </section>

      <QuoteCta />
    </>
  );
}
