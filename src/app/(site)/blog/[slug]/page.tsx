import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { BreadcrumbSchema } from "@/components/site/StructuredData";
import { QuoteCta } from "@/components/site/QuoteCta";
import { FaqSection } from "@/components/site/FaqSection";
import { formatPostDate, getPost, otherPosts, posts } from "@/lib/blog";
import { generalFaq } from "@/lib/faq";
import { socialTags } from "@/lib/seo";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { telHref } from "@/lib/format";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";

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
  // Long headlines would have the brand cut off mid-word in results anyway.
  const branded = `${post.title} | ${site.name}`;
  return {
    title: branded.length > 62 ? { absolute: post.title } : post.title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    ...socialTags(post.title, post.metaDescription, `/blog/${post.slug}`, "article"),
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
  const relatedServices = ["Inspections", "Brakes", "Diagnostics"].includes(
    post.category,
  )
    ? services.filter((service) => service.relatedPosts.includes(post.slug)).slice(0, 3)
    : [];
  const quoteService =
    relatedServices.find((service) => service.slug === "engine-diagnostics") ??
    (relatedServices.length === 1 ? relatedServices[0] : undefined);
  const quoteHref = quoteService
    ? `/quote?service=${quoteService.slug}`
    : "/quote";

  const trail = [{ label: "Blog", href: "/blog" }, { label: post.title }];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    articleSection: post.category,
    datePublished: post.published,
    dateModified: post.updated ?? post.published,
    image: `${site.url}/opengraph-image`,
    author: { "@id": `${site.url}#business` },
    // Reference the single business node published on the home page rather
    // than restating the business here. One entity, one place it can drift.
    publisher: { "@id": `${site.url}#business` },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <BreadcrumbSchema trail={trail} />

      <PageHero eyebrow={post.category} title={post.title} breadcrumbs={trail} />

      <div className="container-page grid gap-10 py-14 md:py-16 lg:grid-cols-[1.7fr_1fr] lg:gap-14">
        <div>
          <p className="text-sm font-semibold text-ink-600">
            {post.updated ? "Updated" : "Published"} {formatPostDate(post.updated ?? post.published)}
            {" · "}By the team at {site.name}
          </p>
          <p className="mt-4 text-lg font-medium leading-relaxed text-ink-700">{post.teaser}</p>
          {relatedServices.length > 0 && (
            <section
              aria-labelledby="local-repair-help"
              className="mt-7 rounded-xl border border-brand-200 bg-brand-50 p-5 sm:p-6"
            >
              <h2
                id="local-repair-help"
                className="font-display text-xl font-bold uppercase tracking-tight"
              >
                Need help with your car in Arlington?
              </h2>
              <p className="mt-3 leading-relaxed text-ink-700">
                TAB Motors is at {site.address.street} in North Arlington.
                Tell us your vehicle and the symptom, or what your inspection
                report says. We review requests during shop hours and confirm
                the next step before any repair work.
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {relatedServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="font-semibold text-brand-700 underline underline-offset-4"
                    >
                      {service.name} in Arlington
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <ButtonAnchor href={telHref(site.phone.e164)}>
                  <Phone className="size-4" aria-hidden />
                  Call the shop
                </ButtonAnchor>
                <ButtonLink href={quoteHref} variant="outline">
                  {quoteService
                    ? `Request ${quoteService.name.toLowerCase()}`
                    : "Describe what your car needs"}
                </ButtonLink>
              </div>
              <p className="mt-3 text-sm text-ink-600">
                A request is not a confirmed appointment. Call before travelling
                for an inspection to check inspector availability.
              </p>
            </section>
          )}
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

      <FaqSection
        items={generalFaq}
        heading="Good to know before you come in"
        className="border-t border-ink-200"
        withSchema={false}
      />

      <QuoteCta
        heading="Rather have us take a look?"
        serviceSlug={quoteService?.slug}
      />
    </>
  );
}
