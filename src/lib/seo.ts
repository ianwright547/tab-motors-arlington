import type { Metadata } from "next";
import { site } from "./site";

/**
 * Per-page Open Graph and Twitter tags.
 *
 * Without these every page inherits the root layout's tags, so a shared service
 * or article link previews as the home page and declares the home page as its
 * og:url. Next replaces (rather than merges) `openGraph`, so siteName, locale and
 * type have to be restated here, and so does the share image: a page-level
 * `openGraph` also drops the image inherited from the root opengraph-image file.
 * Service pages pass `ownImage` so their own opengraph-image file is used instead.
 */
export function socialTags(
  title: string,
  description: string,
  path: string,
  type: "website" | "article" = "website",
  ownImage = false,
): Pick<Metadata, "openGraph" | "twitter"> {
  // Left out entirely when `ownImage`: a present-but-undefined key hides the file.
  const image = ownImage
    ? {}
    : { images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }] };
  return {
    openGraph: {
      type,
      locale: "en_US",
      siteName: site.name,
      url: `${site.url}${path}`,
      title,
      description,
      ...image,
    },
    twitter: { card: "summary_large_image", title, description, ...image },
  };
}
