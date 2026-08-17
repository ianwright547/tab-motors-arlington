import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

/**
 * Default share image for the whole site.
 *
 * Any route that doesn't define its own inherits this one, so /about, /contact,
 * /quote and the rest are covered without extra files. The service pages
 * override it with their own service name.
 */
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "TAB Motors Arlington, AAA Approved auto repair in Arlington, VA";

export default async function Image() {
  return renderOgImage({ title: "Straight answers. Honest repairs." });
}
