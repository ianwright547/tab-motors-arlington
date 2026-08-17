import { NextResponse } from "next/server";
import {
  MAX_UPLOAD_BYTES,
  isAcceptedUploadType,
  safeFilename,
  uploadsEnabled,
} from "@/lib/uploads";
import { checkLeadRateLimit, clientIp, hashIp } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Accepts one photo from the quote form and stores it in Vercel Blob.
 *
 * This endpoint is unauthenticated by necessity — the customer hasn't submitted
 * anything yet. It's kept narrow instead: images only, size capped, filename
 * sanitised, random suffix on the stored name, and the same per-IP rate limit
 * as the form itself so it can't be used as free file hosting.
 */
export async function POST(request: Request) {
  if (!uploadsEnabled()) {
    return NextResponse.json(
      { ok: false, error: "Photo uploads aren't enabled." },
      { status: 503 },
    );
  }

  const ipHash = await hashIp(clientIp(request));
  const rateCheck = await checkLeadRateLimit(ipHash);
  if (!rateCheck.ok) {
    return NextResponse.json({ ok: false, error: rateCheck.reason }, { status: rateCheck.status });
  }

  let file: File | null = null;
  try {
    const formData = await request.formData();
    const value = formData.get("file");
    if (value instanceof File) file = value;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid upload." }, { status: 400 });
  }

  if (!file) {
    return NextResponse.json({ ok: false, error: "No file received." }, { status: 400 });
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      {
        ok: false,
        error: `That photo is too large (max ${Math.round(MAX_UPLOAD_BYTES / (1024 * 1024))} MB).`,
      },
      { status: 413 },
    );
  }

  if (!isAcceptedUploadType(file.type)) {
    return NextResponse.json(
      { ok: false, error: "Please attach a photo (JPG, PNG, WEBP or HEIC)." },
      { status: 415 },
    );
  }

  try {
    const { put } = await import("@vercel/blob");
    const filename = safeFilename(file.name || "photo.jpg");

    const blob = await put(`quote-photos/${filename}`, file, {
      access: "public",
      // Appends a random suffix so two customers uploading "IMG_1234.jpg"
      // don't overwrite each other.
      addRandomSuffix: true,
      contentType: file.type,
    });

    return NextResponse.json({
      ok: true,
      url: blob.url,
      filename,
      contentType: file.type,
      size: file.size,
    });
  } catch (error) {
    console.error("Blob upload failed:", error);
    return NextResponse.json(
      { ok: false, error: "Upload failed. You can send the photo later instead." },
      { status: 500 },
    );
  }
}
