import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

/**
 * The shop's logo.
 *
 * The source artwork is a square badge on a solid black field. It's been
 * cropped to its content and given an alpha channel derived from luminance, so
 * it composites onto any dark surface without a visible black rectangle behind
 * it. That alpha is built for dark backgrounds only — don't place this on a
 * light surface.
 *
 * The badge already contains the business name, so there's no text wordmark
 * alongside it. The accessible name lives on the image's alt text instead.
 */
export function Logo({
  size = "header",
  className = "",
}: {
  /** "header" for the nav bar, "footer" for the larger footer lockup. */
  size?: "header" | "footer";
  className?: string;
}) {
  const dimensions =
    size === "footer" ? "h-20 w-auto md:h-24" : "h-11 w-auto sm:h-12 md:h-16";

  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label={`${site.name} home page`}
    >
      <Image
        src="/images/logo.png"
        alt={site.name}
        width={900}
        height={644}
        // The header logo is above the fold on every page.
        priority={size === "header"}
        className={dimensions}
      />
    </Link>
  );
}
