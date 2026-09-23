import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { BreadcrumbSchema } from "@/components/site/StructuredData";
import { QuoteCta } from "@/components/site/QuoteCta";
import { Reveal } from "@/components/site/Reveal";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: { absolute: "Car Care Advice & Guides | TAB Motors Arlington" },
  description:
    "Straight, jargon-free advice on Virginia inspection, oil changes, brakes, check-engine " +
    "lights, batteries and tires from the team at TAB Motors in Arlington, VA.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ label: "Blog" }]} />

      <PageHero
        eyebrow="Advice & guides"
        title="Car care, explained without the jargon"
        intro="No upsells, no scare tactics — just clear answers to the questions Arlington drivers actually ask us in the bay."
        breadcrumbs={[{ label: "Blog" }]}
      />

      <section className="container-page py-16 md:py-20">
        <ul className="grid gap-6 md:grid-cols-2">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Reveal delay={Math.min(index, 5) * 60} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                    {post.category}
                  </span>
                  <h2 className="mt-3 font-display text-xl font-semibold leading-tight">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-600">{post.teaser}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    Read the guide
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
      </section>

      <QuoteCta />
    </>
  );
}
