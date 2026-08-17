import { notFound } from "next/navigation";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";
import { getService, services } from "@/lib/services";

/**
 * Per-service share image, so a link to the brakes page previews as "Brake
 * Repair & Replacement" rather than a generic shop card.
 */
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "TAB Motors Arlington, AAA Approved auto repair in Arlington, VA";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return renderOgImage({
    eyebrow: "Arlington, VA",
    // The name already carries the location via the eyebrow, so drop the
    // suffix and give the headline room to breathe.
    title: service.name,
  });
}
