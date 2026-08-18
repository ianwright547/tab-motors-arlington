import Link from "next/link";
import { Star } from "lucide-react";
import { ratingValue, reviewCount, reviews as allReviews } from "@/lib/reviews";

/**
 * Real Google reviews, quoted word-for-word. Shown on the home page and anywhere
 * else social proof helps. The aggregate rating + review schema lives once in
 * StructuredData, so this block is presentational only.
 */
export function ReviewsSection({
  count = 6,
  heading = "What Arlington drivers say",
  className = "",
}: {
  count?: number;
  heading?: string;
  className?: string;
}) {
  const list = allReviews.slice(0, count);

  return (
    <section id="reviews" className={`border-y border-ink-200 bg-ink-50 py-20 md:py-24 ${className}`}>
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow text-brand-700">Reviews</p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-[0.98] tracking-tight sm:text-5xl">
              {heading}
            </h2>
            <div className="mt-4 flex items-center gap-2.5">
              <span className="flex items-center gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-brand-500 text-brand-500" />
                ))}
              </span>
              <span className="font-display text-lg font-bold uppercase tracking-tight text-ink-900">
                {ratingValue} · {reviewCount}+ Google reviews
              </span>
            </div>
          </div>
          <Link
            href="/reviews"
            className="text-sm font-semibold text-brand-700 underline underline-offset-2"
          >
            Read all reviews
          </Link>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((review) => (
            <li
              key={`${review.author}-${review.text.slice(0, 12)}`}
              className="flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6 shadow-card"
            >
              <span className="flex items-center gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-brand-500 text-brand-500" />
                ))}
              </span>
              <p className="mt-3 flex-1 leading-relaxed text-ink-700">&ldquo;{review.text}&rdquo;</p>
              <div className="mt-4 border-t border-ink-100 pt-3">
                <p className="text-sm font-semibold text-ink-900">{review.author}</p>
                <p className="text-xs text-ink-500">{review.city}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
