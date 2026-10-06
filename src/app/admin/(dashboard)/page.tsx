import type { Metadata } from "next";
import Link from "next/link";
import { and, count, desc, eq, ilike, isNull, lt, or, type SQL } from "drizzle-orm";
import { Inbox, Paperclip, Phone, Search } from "lucide-react";
import { getDb } from "@/lib/db";
import { leadAttachments, leads, type LeadStatus } from "@/lib/db/schema";
import { StatusBadge, statusLabels, statusOrder } from "@/components/admin/StatusBadge";
import { serviceLabel } from "@/lib/services";
import { formatPhone, relativeTime } from "@/lib/format";
import { urgencyLabels } from "@/lib/validation";

export const dynamic = "force-dynamic";

/**
 * The unread count goes in the page title, so an open tab acts as an ambient
 * notification. The owner chose to work from the dashboard rather than get
 * emails, which makes this the only nudge the system gives him.
 */
export async function generateMetadata(): Promise<Metadata> {
  const db = await getDb();
  const [{ value: unread } = { value: 0 }] = await db
    .select({ value: count() })
    .from(leads)
    .where(isNull(leads.readAt));

  const unreadCount = Number(unread);
  return {
    title: unreadCount > 0 ? `(${unreadCount}) Leads` : "Leads",
    robots: { index: false, follow: false },
  };
}

type SearchParams = { status?: string; q?: string };

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const activeStatus = statusOrder.includes(params.status as LeadStatus)
    ? (params.status as LeadStatus)
    : null;
  const query = (params.q ?? "").trim();

  const db = await getDb();

  const filters: SQL[] = [];
  if (activeStatus) filters.push(eq(leads.status, activeStatus));
  if (query) {
    const like = `%${query}%`;
    const digits = query.replace(/\D/g, "");
    const clauses = [
      ilike(leads.name, like),
      ilike(leads.vehicleMake, like),
      ilike(leads.vehicleModel, like),
      ilike(leads.email, like),
    ];
    if (digits.length >= 3) clauses.push(ilike(leads.phoneNormalized, `%${digits}%`));
    const combined = or(...clauses);
    if (combined) filters.push(combined);
  }

  const [rows, statusCounts, attachmentCounts, overdueCounts] = await Promise.all([
    db
      .select()
      .from(leads)
      .where(filters.length > 0 ? and(...filters) : undefined)
      .orderBy(desc(leads.createdAt))
      .limit(200),
    db.select({ status: leads.status, value: count() }).from(leads).groupBy(leads.status),
    db
      .select({ leadId: leadAttachments.leadId, value: count() })
      .from(leadAttachments)
      .groupBy(leadAttachments.leadId),
    db.select({ value: count() }).from(leads).where(and(
      eq(leads.status, "new"),
      lt(leads.createdAt, new Date(Date.now() - 24 * 60 * 60 * 1000)),
    )),
  ]);

  const countByStatus = new Map(statusCounts.map((row) => [row.status, Number(row.value)]));
  const total = statusCounts.reduce((sum, row) => sum + Number(row.value), 0);
  const photosByLead = new Map(attachmentCounts.map((row) => [row.leadId, Number(row.value)]));
  const overdue = Number(overdueCounts[0]?.value ?? 0);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight">
            Quote requests
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            {total === 0
              ? "No requests yet."
              : `${total} total · ${countByStatus.get("new") ?? 0} still marked new`}
          </p>
        </div>

        <form method="get" className="flex items-center gap-2">
          {activeStatus && <input type="hidden" name="status" value={activeStatus} />}
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-400"
              aria-hidden
            />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Name, phone, vehicle…"
              aria-label="Search leads"
              className="w-full min-w-0 rounded-md border border-ink-300 bg-white py-2 pl-9 pr-3 text-sm sm:w-64"
            />
          </div>
          <button
            type="submit"
            className="min-h-10 rounded-md bg-ink-900 px-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink-800"
          >
            Search
          </button>
        </form>
      </div>

      {overdue > 0 && (
        <aside aria-label="Follow-up reminder" className="mt-5 rounded-xl border border-warn-300 bg-warn-100 p-4 text-warn-700">
          <h2 className="font-semibold">{overdue} {overdue === 1 ? "request is" : "requests are"} still marked new after 24 hours</h2>
          <p className="mt-1 text-sm">Check whether these customers received a reply. Contact anyone still waiting, then update their status so the next shift knows what happened.</p>
          <Link href="/admin?status=new" className="mt-2 inline-flex min-h-10 items-center font-semibold underline">Review new requests</Link>
        </aside>
      )}

      <nav aria-label="Filter by status" className="mt-5 flex flex-wrap gap-2">
        <FilterPill href={buildHref(null, query)} active={!activeStatus} label="All" count={total} />
        {statusOrder.map((status) => (
          <FilterPill
            key={status}
            href={buildHref(status, query)}
            active={activeStatus === status}
            label={statusLabels[status]}
            count={countByStatus.get(status) ?? 0}
          />
        ))}
      </nav>

      {rows.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-ink-300 bg-white p-10 text-center">
          <Inbox className="mx-auto size-8 text-ink-400" aria-hidden />
          <h2 className="mt-3 font-display text-lg font-semibold">
            {query || activeStatus ? "Nothing matches that filter" : "No quote requests yet"}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-600">
            {query || activeStatus ? (
              <Link href="/admin" className="font-semibold text-brand-700 underline">
                Clear the filters
              </Link>
            ) : (
              <>
                When someone fills in the form on the website, it lands here. Try it yourself from{" "}
                <Link href="/quote" className="font-semibold text-brand-700 underline">
                  the quote page
                </Link>
                .
              </>
            )}
          </p>
        </div>
      ) : (
        <ul className="mt-5 space-y-2.5">
          {rows.map((lead) => {
            const unread = lead.readAt === null;
            const photos = photosByLead.get(lead.id) ?? 0;

            return (
              <li key={lead.id}>
                <Link
                  href={`/admin/leads/${lead.id}`}
                  className={[
                    "block rounded-xl border bg-white p-4 transition-shadow hover:shadow-lift",
                    unread ? "border-brand-300 ring-1 ring-brand-200" : "border-ink-200",
                  ].join(" ")}
                >
                  <div className="flex flex-wrap items-start gap-x-4 gap-y-2 sm:flex-nowrap">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        {unread && (
                          <span
                            aria-label="Unread"
                            className="size-2 shrink-0 rounded-full bg-brand-600"
                          />
                        )}
                        <p
                          className={[
                            "truncate",
                            unread ? "font-bold text-ink-900" : "font-semibold text-ink-800",
                          ].join(" ")}
                        >
                          {lead.name}
                        </p>
                        {lead.aaaMember && (
                          <span className="shrink-0 rounded bg-ink-100 px-1.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-wide text-ink-600">
                            AAA
                          </span>
                        )}
                      </div>

                      <p className="mt-1 truncate text-sm text-ink-700">
                        {lead.vehicleYear} {lead.vehicleMake} {lead.vehicleModel}
                      </p>

                      <p className="mt-1 line-clamp-1 text-sm text-ink-500">
                        {lead.services.map(serviceLabel).join(" · ")}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-col items-start gap-1.5 sm:items-end">
                      <StatusBadge status={lead.status} />
                      <span className="flex items-center gap-1.5 text-xs text-ink-500">
                        <Phone className="size-3" aria-hidden />
                        {formatPhone(lead.phone)}
                      </span>
                      <span className="text-xs text-ink-400">
                        {relativeTime(lead.createdAt)}
                        {lead.urgency === "asap" && (
                          <span className="ml-1.5 font-semibold text-brand-700">
                            · {urgencyLabels.asap}
                          </span>
                        )}
                        {photos > 0 && (
                          <span className="ml-1.5 inline-flex items-center gap-0.5">
                            <Paperclip className="size-3" aria-hidden />
                            {photos}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {rows.length === 200 && (
        <p className="mt-4 text-center text-xs text-ink-500">
          Showing the 200 most recent. Use search, or export the CSV for the full history.
        </p>
      )}
    </div>
  );
}

function buildHref(status: LeadStatus | null, query: string): string {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (query) params.set("q", query);
  const search = params.toString();
  return search ? `/admin?${search}` : "/admin";
}

function FilterPill({
  href,
  active,
  label,
  count: total,
}: {
  href: string;
  active: boolean;
  label: string;
  count: number;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold transition-colors",
        active
          ? "border-ink-900 bg-ink-900 text-white"
          : "border-ink-300 bg-white text-ink-700 hover:border-ink-400 hover:bg-ink-50",
      ].join(" ")}
    >
      {label}
      <span className={active ? "text-ink-300" : "text-ink-400"}>{total}</span>
    </Link>
  );
}
