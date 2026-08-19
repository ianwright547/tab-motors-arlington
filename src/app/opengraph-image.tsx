import { OG_CONTENT_TYPE, OG_SIZE, renderLogoOg } from "@/lib/og";

/**
 * Default share image for the whole site — the shop's logo, centred on the
 * brand field. Any route that doesn't define its own inherits this one, so the
 * home page (and /about, /contact, /quote, etc.) share as the logo. Service
 * pages override it with their own service name.
 */
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "TAB Motors Arlington";

export default async function Image() {
  return renderLogoOg();
}
