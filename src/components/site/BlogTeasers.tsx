import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { posts } from "@/lib/blog";

/**
 * "From our blog" — three educational articles. Keeps the storytelling /
 * teaching thread running through every page, and feeds internal links to the
 * blog for SEO.
 */
export function BlogTeasers({
  excludeSlug,
  heading = "Car care, explained",
  eyebrow = "Advice & guides",
  count = 3,
  className = "",
}: {
  excludeSlug?: string;
  heading?: string;
  eyebrow?: string;
  count?: number;
  className?: string;
}) {
  const list = posts.filter((p) => p.slug !== excludeSlug).slice(0, count);
  if (!list.length) return null;

  return (
    <section className={`container-page py-16 md:py-20 ${className}`}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-brand-700">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-[1.02] tracking-tight sm:text-4xl">
            {heading}
          </h2>
        </div>
        <Link
          href="/blog"
          className="shrink-0 text-sm font-semibold text-brand-700 underline underline-offset-2"
        >
          All articles
        </Link>
      </div>

      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {list.map((post) => (
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
    </section>
  );
}
