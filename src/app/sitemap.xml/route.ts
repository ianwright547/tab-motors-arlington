import { services } from "@/lib/services";
import { areas } from "@/lib/areas";
import { posts } from "@/lib/blog";
import { site } from "@/lib/site";

/**
 * Sitemap as a hand-built route rather than Next's MetadataRoute helper, so we
 * can attach an XSL stylesheet. Crawlers read the raw XML and ignore the
 * stylesheet; a human opening /sitemap.xml gets a formatted, branded page.
 */
export const dynamic = "force-static";

type Entry = { path: string; priority: number; changefreq: string };

export function GET() {
  const now = new Date().toISOString();

  const entries: Entry[] = [
    { path: "/", priority: 1.0, changefreq: "monthly" },
    { path: "/quote", priority: 0.9, changefreq: "monthly" },
    { path: "/services", priority: 0.8, changefreq: "monthly" },
    ...services.map((s) => ({
      path: `/services/${s.slug}`,
      priority: s.slug === "virginia-state-inspection" ? 0.9 : 0.7,
      changefreq: "monthly",
    })),
    { path: "/service-areas", priority: 0.7, changefreq: "monthly" },
    ...areas.map((a) => ({
      path: `/service-areas/${a.slug}`,
      priority: a.slug === "arlington" ? 0.8 : 0.6,
      changefreq: "monthly",
    })),
    { path: "/blog", priority: 0.6, changefreq: "weekly" },
    ...posts.map((p) => ({ path: `/blog/${p.slug}`, priority: 0.5, changefreq: "monthly" })),
    { path: "/about", priority: 0.5, changefreq: "yearly" },
    { path: "/contact", priority: 0.6, changefreq: "yearly" },
    { path: "/reviews", priority: 0.4, changefreq: "monthly" },
    { path: "/privacy", priority: 0.2, changefreq: "yearly" },
  ];

  const urls = entries
    .map(
      (e) => `  <url>
    <loc>${site.url}${e.path === "/" ? "" : e.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
