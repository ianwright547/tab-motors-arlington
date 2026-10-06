import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * Shared dark header for interior pages, with breadcrumbs.
 *
 * Breadcrumbs earn their place twice over here: they orient the visitor, and
 * Google renders them in search results in place of a raw URL, which measurably
 * improves click-through on service pages.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-ink-950 text-white">
      <div className="container-page py-14 md:py-20">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-400">
              <li className="flex items-center gap-1">
                <Link href="/" className="hover:text-white hover:underline">
                  Home
                </Link>
                <ChevronRight className="size-3.5" aria-hidden />
              </li>
              {breadcrumbs.map((crumb, index) => {
                const last = index === breadcrumbs.length - 1;
                return (
                  <li key={crumb.label} className="flex items-center gap-1">
                    {crumb.href && !last ? (
                      <>
                        <Link href={crumb.href} className="hover:text-white hover:underline">
                          {crumb.label}
                        </Link>
                        <ChevronRight className="size-3.5" aria-hidden />
                      </>
                    ) : (
                      <span aria-current="page" className="text-ink-200">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        {eyebrow && <p className="eyebrow text-brand-400">{eyebrow}</p>}

        <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-300 sm:text-xl">{intro}</p>
        )}
        {children}
      </div>
      <div aria-hidden className="hazard-stripe h-1.5" />
    </section>
  );
}
