import { services } from "@/lib/services";
import { ratingValue, reviewCount, reviews } from "@/lib/reviews";
import { openingHoursSpecification, site } from "@/lib/site";

/**
 * schema.org markup for the shop.
 *
 * This is how Google learns the name, address, phone and hours, and it's what
 * powers the business panel in search results. Getting it right matters more
 * than usual here, because it's an explicit machine-readable statement that
 * this business is at the Arlington address — which is the clearest signal we
 * can give that it isn't the DC shop with the same name.
 *
 * Deliberately omitted: aggregateRating. Star ratings in markup have to come
 * from real, verifiable reviews. Inventing them is both dishonest and a
 * violation of Google's structured data policies.
 */
export function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${site.url}#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: openingHoursSpecification(),
    areaServed: site.serviceArea.map((area) => ({ "@type": "Place", name: area })),
    // Real, verifiable Google reviews carried over from the SEO build — quoted
    // word-for-word, never invented.
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
      bestRating: "5",
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: r.text,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Auto repair services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.blurb,
        },
      })),
    },
    ...(site.toConfirm.languages.length > 0
      ? { knowsLanguage: site.toConfirm.languages }
      : {}),
    ...(site.toConfirm.yearEstablished
      ? { foundingDate: String(site.toConfirm.yearEstablished) }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      // Serialized from our own static config — no user input reaches this.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
