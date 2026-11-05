import { services } from "@/lib/services";
import { areas } from "@/lib/areas";
import { posts } from "@/lib/blog";
import { formatHoursSummary, site } from "@/lib/site";

/**
 * Plain-text summary for AI assistants, built from the same data as the pages
 * so the facts here can never drift from what the site says.
 */
export const dynamic = "force-static";

export function GET() {
  const hours = formatHoursSummary()
    .map((row) => `${row.label}: ${row.value}`)
    .join("; ");

  const list = (rows: { label: string; path: string; note: string }[]) =>
    rows.map((r) => `- [${r.label}](${site.url}${r.path}): ${r.note}`).join("\n");

  const text = `# ${site.name}

> ${site.description}

- Address: ${site.address.oneLine}
- Phone: ${site.phone.display}
- Email: ${site.email}
- Hours: ${hours}
- Official Virginia inspection station. AAA Approved Auto Repair. ${site.warranty.label}.

## Services

${list(services.map((s) => ({ label: s.name, path: `/services/${s.slug}`, note: s.blurb })))}

## Tools

- [Virginia Inspection & Emissions Checker](${site.url}/tools/virginia-inspection-checker): Free checker for whether a vehicle needs a safety inspection, an emissions test or both, with deadlines after a move to Arlington.

## Guides

${list(posts.map((p) => ({ label: p.title, path: `/blog/${p.slug}`, note: p.metaDescription })))}

## Areas served

${list(areas.map((a) => ({ label: a.name, path: `/service-areas/${a.slug}`, note: a.blurb })))}
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
