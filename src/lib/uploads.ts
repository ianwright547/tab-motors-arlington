/**
 * Photo uploads for the quote form.
 *
 * A picture of a dashboard light or a leak lets the owner quote accurately
 * instead of guessing, and it's a real trust signal for the customer.
 *
 * The whole feature is gated on BLOB_READ_WRITE_TOKEN: with no storage
 * configured the upload UI simply doesn't render, rather than showing the
 * customer a button that throws.
 */

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB — a phone photo, comfortably
export const MAX_UPLOADS_PER_LEAD = 5;

export const ACCEPTED_UPLOAD_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
] as const;

export const ACCEPT_ATTRIBUTE = ".jpg,.jpeg,.png,.webp,.heic,.heif,image/*";

export function uploadsEnabled(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function isAcceptedUploadType(contentType: string): boolean {
  return (ACCEPTED_UPLOAD_TYPES as readonly string[]).includes(contentType.toLowerCase());
}

/**
 * Only accept attachment URLs that came from our own blob store.
 *
 * The browser sends back the URLs that /api/upload handed it, and a hostile
 * client could just as easily send back a link to anywhere. Without this check
 * the admin dashboard would happily render an arbitrary remote image on the
 * owner's screen.
 */
export function isTrustedUploadUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      parsed.hostname.endsWith(".public.blob.vercel-storage.com")
    );
  } catch {
    return false;
  }
}

/** Strips directory components and anything awkward out of a client filename. */
export function safeFilename(filename: string): string {
  const base = filename.split(/[\\/]/).pop() ?? "photo";
  return base.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120) || "photo";
}
