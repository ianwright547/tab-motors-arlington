import Image from "next/image";

/**
 * A real photograph of the shop.
 *
 * Drop-in replacement for PhotoPlaceholder — same className contract, so
 * swapping one for the other doesn't disturb the surrounding layout.
 *
 * Uses next/image so each photo is served as AVIF/WebP at the size the viewport
 * actually needs. The source files are ~2000px JPEGs; without this they'd be a
 * multi-megabyte download on a phone, which is where most of this traffic is.
 */
export function ShopPhoto({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: {
  /** Path under /public, e.g. "/images/shop-exterior.jpg" */
  src: string;
  /** Describe what's actually in the frame — screen readers and image search
   *  both read this. Never leave it generic. */
  alt: string;
  className?: string;
  /** Set on the above-the-fold hero image only. */
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-ink-100 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
