import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { QuoteCta } from "@/components/site/QuoteCta";
import { getPost, otherPosts, posts } from "@/lib/blog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = otherPosts(post.slug, 3);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    articleSection: post.category,
    publisher: { "@type": "AutoRepair", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <div className="container-page grid gap-10 py-14 md:py-16 lg:grid-cols-[1.7fr_1fr] lg:gap-14">
        <div>
          <p className="text-lg font-medium leading-relaxed text-ink-700">{post.teaser}</p>
          <article
            className="prose-shop mt-8"
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />

          <p className="mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 underline underline-offset-2"
            >
              <ArrowLeft className="size-4" aria-hidden />
              All articles
            </Link>
          </p>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          {related.length > 0 && (
            <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-card">
              <h2 className="font-display text-lg font-semibold uppercase tracking-tight">
                Keep reading
              </h2>
              <ul className="mt-4 space-y-4">
                {related.map((other) => (
                  <li key={other.slug}>
                    <Link href={`/blog/${other.slug}`} className="group block">
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">
                        {other.category}
                      </span>
                      <span className="mt-1 flex items-start gap-1.5 font-semibold leading-snug text-ink-900">
                        {other.title}
                        <ArrowRight
                          className="mt-1 size-4 shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <QuoteCta heading="Rather have us take a look?" />
    </>
  );
}
