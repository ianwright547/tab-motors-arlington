import type { Faq } from "@/lib/services";

/**
 * Reusable FAQ block. Renders the questions and emits FAQPage structured data
 * so the answers can show directly in search results.
 */
export function FaqSection({
  items,
  heading = "Frequently asked questions",
  eyebrow = "Questions",
  className = "",
  withSchema = true,
}: {
  items: Faq[];
  heading?: string;
  eyebrow?: string;
  className?: string;
  /** Set false if another block on the same page already emits FAQ schema. */
  withSchema?: boolean;
}) {
  if (!items.length) return null;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className={`container-page py-16 md:py-20 ${className}`}>
      {withSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <p className="eyebrow text-brand-700">{eyebrow}</p>
      <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold uppercase leading-[1.02] tracking-tight sm:text-4xl">
        {heading}
      </h2>
      <dl className="mt-8 grid gap-x-12 gap-y-7 md:grid-cols-2">
        {items.map((f) => (
          <div key={f.q} className="border-t border-ink-200 pt-5">
            <dt className="font-display text-lg font-semibold text-ink-900">{f.q}</dt>
            <dd className="mt-2 leading-relaxed text-ink-600">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
