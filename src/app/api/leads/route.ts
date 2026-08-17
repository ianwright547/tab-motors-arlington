import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { leadAttachments, leads } from "@/lib/db/schema";
import { quoteFormSchema } from "@/lib/validation";
import { normalizePhone } from "@/lib/format";
import { isTrustedUploadUrl, uploadsEnabled } from "@/lib/uploads";
import { notifyNewLead } from "@/lib/notify";
import {
  checkHoneypotAndTiming,
  checkLeadRateLimit,
  clientIp,
  hashIp,
  verifyTurnstile,
} from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Receives a quote request.
 *
 * Ordering is deliberate: the cheap local checks run first, then validation,
 * then the database-backed rate limit, and only then the network call to
 * Cloudflare. A flood of junk gets rejected before it costs us a round trip.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  // 1. Honeypot + submission timing.
  const cheapCheck = checkHoneypotAndTiming({
    honeypot: typeof raw.honeypot === "string" ? raw.honeypot : undefined,
    elapsedMs: typeof raw.elapsedMs === "number" ? raw.elapsedMs : undefined,
  });
  if (!cheapCheck.ok) {
    return NextResponse.json(
      { ok: false, error: cheapCheck.reason },
      { status: cheapCheck.status },
    );
  }

  // 2. Full validation. The client ran the same schema, but that's a courtesy
  //    to the customer, not a guarantee to us.
  const parsed = quoteFormSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!(key in fieldErrors)) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const ip = clientIp(request);
  const ipHash = await hashIp(ip);

  // 3. Per-IP rate limit.
  const rateCheck = await checkLeadRateLimit(ipHash);
  if (!rateCheck.ok) {
    return NextResponse.json({ ok: false, error: rateCheck.reason }, { status: rateCheck.status });
  }

  // 4. Turnstile, if it's configured at all.
  const botCheck = await verifyTurnstile(data.turnstileToken, ip);
  if (!botCheck.ok) {
    return NextResponse.json({ ok: false, error: botCheck.reason }, { status: botCheck.status });
  }

  // Only keep attachments that actually came from our own blob store.
  const attachments = uploadsEnabled()
    ? data.attachments.filter((attachment) => isTrustedUploadUrl(attachment.url))
    : [];

  try {
    const db = await getDb();

    const [lead] = await db
      .insert(leads)
      .values({
        vehicleYear: data.vehicleYear,
        vehicleMake: data.vehicleMake,
        vehicleModel: data.vehicleModel,
        vehicleMileage: data.vehicleMileage,
        services: data.services,
        problemDescription: data.problemDescription ?? null,
        urgency: data.urgency,
        preferredDate: data.preferredDate,
        dropOff: data.dropOff,
        name: data.name,
        phone: data.phone,
        phoneNormalized: normalizePhone(data.phone),
        email: data.email,
        contactMethod: data.contactMethod,
        aaaMember: data.aaaMember,
        referralSource: data.referralSource ?? null,
        ipHash,
        userAgent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
      })
      .returning();

    if (attachments.length > 0) {
      await db.insert(leadAttachments).values(
        attachments.map((attachment) => ({
          leadId: lead.id,
          url: attachment.url,
          filename: attachment.filename,
          contentType: attachment.contentType,
          size: attachment.size,
        })),
      );
    }

    // The lead is safely stored by this point. Notification is best-effort and
    // swallows its own errors — a mail outage must not tell the customer their
    // request failed when it didn't.
    await notifyNewLead(lead);

    return NextResponse.json({ ok: true, leadId: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to save lead:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't save your request. Please call the shop and we'll take the details.",
      },
      { status: 500 },
    );
  }
}
