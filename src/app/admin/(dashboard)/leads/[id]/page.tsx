import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { ArrowLeft, Mail, MessageSquare, Phone } from "lucide-react";
import { getDb } from "@/lib/db";
import { leadAttachments, leads } from "@/lib/db/schema";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { LeadEditor } from "@/components/admin/LeadEditor";
import { serviceLabel } from "@/lib/services";
import {
  formatBytes,
  formatDateTime,
  formatMileage,
  formatPhone,
  smsHref,
  telHref,
} from "@/lib/format";
import { contactMethodLabels, dropOffLabels, urgencyLabels } from "@/lib/validation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lead",
  robots: { index: false, follow: false },
};

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const leadId = Number(id);
  if (!Number.isInteger(leadId) || leadId < 1) notFound();

  const db = await getDb();

  const [lead] = await db.select().from(leads).where(eq(leads.id, leadId)).limit(1);
  if (!lead) notFound();

  const photos = await db
    .select()
    .from(leadAttachments)
    .where(eq(leadAttachments.leadId, leadId))
    .orderBy(asc(leadAttachments.id));

  // Opening the lead marks it read, which clears it from the unread count in the
  // tab title. Done inline rather than through a server action because it's
  // idempotent and the list page is force-dynamic, so it re-reads on return.
  if (lead.readAt === null) {
    await db.update(leads).set({ readAt: new Date() }).where(eq(leads.id, leadId));
  }

  const details: [string, string | null][] = [
    ["Vehicle", `${lead.vehicleYear} ${lead.vehicleMake} ${lead.vehicleModel}`],
    ["Mileage", formatMileage(lead.vehicleMileage)],
    ["Services requested", lead.services.map(serviceLabel).join(" · ")],
    ["How soon", urgencyLabels[lead.urgency]],
    ["Preferred date", lead.preferredDate],
    ["Drop-off", dropOffLabels[lead.dropOff]],
    ["Prefers contact by", contactMethodLabels[lead.contactMethod]],
    ["AAA member", lead.aaaMember ? "Yes, 10% off labor up to $75" : "No"],
    ["Heard about us via", lead.referralSource],
    ["Submitted", formatDateTime(lead.createdAt)],
  ];

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-600 hover:text-ink-900"
      >
        <ArrowLeft className="size-4" aria-hidden />
        All requests
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">{lead.name}</h1>
          <p className="mt-1 text-sm text-ink-500">
            {lead.vehicleYear} {lead.vehicleMake} {lead.vehicleModel} · submitted{" "}
            {formatDateTime(lead.createdAt)}
          </p>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      {/* Contact actions first and large. Speed of callback is the whole game
          with a lead like this. */}
      <div className="mt-5 flex flex-wrap gap-2.5">
        <a
          href={telHref(lead.phone)}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:flex-none"
        >
          <Phone className="size-4" aria-hidden />
          Call {formatPhone(lead.phone)}
        </a>
        <a
          href={smsHref(lead.phone)}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md border border-ink-300 bg-white px-4 text-sm font-semibold text-ink-800 transition-colors hover:bg-ink-50 sm:flex-none"
        >
          <MessageSquare className="size-4" aria-hidden />
          Text
        </a>
        {lead.email && (
          <a
            href={`mailto:${lead.email}?subject=${encodeURIComponent(`Your quote from TAB Motors Arlington: ${lead.vehicleYear} ${lead.vehicleMake} ${lead.vehicleModel}`)}`}
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md border border-ink-300 bg-white px-4 text-sm font-semibold text-ink-800 transition-colors hover:bg-ink-50 sm:flex-none"
          >
            <Mail className="size-4" aria-hidden />
            Email
          </a>
        )}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-5">
          {lead.problemDescription && (
            <section className="rounded-xl border border-ink-200 bg-white p-4">
              <h2 className="font-display text-base font-semibold uppercase tracking-wide">
                In their words
              </h2>
              <p className="mt-2 whitespace-pre-wrap text-[0.9375rem] leading-relaxed text-ink-800">
                {lead.problemDescription}
              </p>
            </section>
          )}

          <section className="rounded-xl border border-ink-200 bg-white p-4">
            <h2 className="font-display text-base font-semibold uppercase tracking-wide">
              Request details
            </h2>
            <dl className="mt-3 divide-y divide-ink-100">
              {details
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label} className="flex flex-wrap gap-x-4 gap-y-0.5 py-2.5">
                    <dt className="w-44 shrink-0 text-sm text-ink-500">{label}</dt>
                    <dd className="min-w-0 flex-1 text-sm font-medium text-ink-900">{value}</dd>
                  </div>
                ))}
              <div className="flex flex-wrap gap-x-4 gap-y-0.5 py-2.5">
                <dt className="w-44 shrink-0 text-sm text-ink-500">Phone</dt>
                <dd className="min-w-0 flex-1 text-sm font-medium text-ink-900">
                  <a href={telHref(lead.phone)} className="hover:text-brand-700 hover:underline">
                    {formatPhone(lead.phone)}
                  </a>
                </dd>
              </div>
              {lead.email && (
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 py-2.5">
                  <dt className="w-44 shrink-0 text-sm text-ink-500">Email</dt>
                  <dd className="min-w-0 flex-1 break-all text-sm font-medium text-ink-900">
                    <a
                      href={`mailto:${lead.email}`}
                      className="hover:text-brand-700 hover:underline"
                    >
                      {lead.email}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </section>

          {photos.length > 0 && (
            <section className="rounded-xl border border-ink-200 bg-white p-4">
              <h2 className="font-display text-base font-semibold uppercase tracking-wide">
                Photos they sent ({photos.length})
              </h2>
              <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {photos.map((photo) => (
                  <li key={photo.id}>
                    <a
                      href={photo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-md border border-ink-200 bg-ink-50">
                        <Image
                          src={photo.url}
                          alt={photo.filename}
                          fill
                          sizes="(max-width: 640px) 45vw, 200px"
                          className="object-cover transition-transform group-hover:scale-105"
                          unoptimized
                        />
                      </div>
                      <p className="mt-1 truncate text-xs text-ink-500">
                        {formatBytes(photo.size)}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <LeadEditor leadId={lead.id} status={lead.status} notes={lead.notes} />
      </div>
    </div>
  );
}
