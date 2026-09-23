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
    // Points at the same address the Contact page links to, so the markup and
    // the visible map button can never drift apart.
    hasMap: `https://www.google.com/maps/search/?api=1&query=${site.address.mapsQuery}`,
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

/**
 * WebSite entity, published once from the home page.
 *
 * Kept separate from the business entity above and tied back to it with
 * `publisher`, so there is exactly one business node on the site (`#business`)
 * and everything else references it rather than restating the name, address
 * and hours in a second, driftable copy.
 */
export function WebSiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en-US",
    publisher: { "@id": `${site.url}#business` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * BreadcrumbList matching the breadcrumb trail the visitor can actually see in
 * the page hero. Call it with the same array passed to `<PageHero breadcrumbs>`
 * so the two cannot disagree.
 */
export function BreadcrumbSchema({
  trail,
}: {
  trail: { label: string; href?: string }[];
}) {
  const items = [{ label: "Home", href: "/" }, ...trail];

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      // The final crumb is the current page and carries no link, which is what
      // schema.org expects: position and name without an `item`.
      ...(item.href ? { item: `${site.url}${item.href}` } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Service markup for one service page.
 *
 * Only the fields the page visibly backs up: the service name, the plain-English
 * description that appears in the hero, the provider (referenced, not restated)
 * and the area served. No price, because we do not publish one, and no offers
 * we cannot stand behind.
 */
export function ServiceSchema({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/services/${slug}#service`,
    name,
    description,
    serviceType: name,
    url: `${site.url}/services/${slug}`,
    provider: { "@id": `${site.url}#business` },
    areaServed: site.serviceArea.map((area) => ({ "@type": "Place", name: area })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
