import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { isAdminAuthenticated } from "@/lib/auth";
import { serviceLabel } from "@/lib/services";
import { formatDateTime, formatPhone } from "@/lib/format";
import { contactMethodLabels, dropOffLabels, urgencyLabels } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * CSV of every lead.
 *
 * The point is portability: the contact list belongs to the shop, not to this
 * website. He can open it in Excel, import it into whatever he uses next, or
 * keep it as a backup, without asking anyone for a database dump.
 */
export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }

  const db = await getDb();
  const rows = await db.select().from(leads).orderBy(desc(leads.createdAt));

  const headers = [
    "ID",
    "Submitted",
    "Status",
    "Name",
    "Phone",
    "Email",
    "Prefers contact by",
    "Year",
    "Make",
    "Model",
    "Mileage",
    "Services",
    "Problem description",
    "How soon",
    "Preferred date",
    "Drop-off",
    "AAA member",
    "Heard about us via",
    "Notes",
  ];

  const lines = [
    headers.map(csvCell).join(","),
    ...rows.map((lead) =>
      [
        lead.id,
        formatDateTime(lead.createdAt),
        lead.status,
        lead.name,
        formatPhone(lead.phone),
        lead.email ?? "",
        contactMethodLabels[lead.contactMethod],
        lead.vehicleYear,
        lead.vehicleMake,
        lead.vehicleModel,
        lead.vehicleMileage ?? "",
        lead.services.map(serviceLabel).join("; "),
        lead.problemDescription ?? "",
        urgencyLabels[lead.urgency],
        lead.preferredDate ?? "",
        dropOffLabels[lead.dropOff],
        lead.aaaMember ? "Yes" : "No",
        lead.referralSource ?? "",
        lead.notes ?? "",
      ]
        .map(csvCell)
        .join(","),
    ),
  ];

  const today = new Date().toISOString().slice(0, 10);

  return new NextResponse(
    // A BOM so Excel opens it as UTF-8 instead of mangling accented names.
    `﻿${lines.join("\r\n")}\r\n`,
    {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="tab-motors-arlington-leads-${today}.csv"`,
        "Cache-Control": "no-store",
      },
    },
  );
}

/**
 * Quotes a CSV value, and defuses formula injection.
 *
 * A customer could type "=HYPERLINK(...)" into the description field; Excel
 * would happily treat it as a formula when the owner opens the export. Prefixing
 * with an apostrophe makes it inert text.
 */
function csvCell(value: unknown): string {
  let text = value === null || value === undefined ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}
