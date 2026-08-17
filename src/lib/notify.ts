import type { Lead } from "./db/schema";
import { serviceLabel } from "./services";
import { site } from "./site";
import { formatDateTime, formatMileage, formatPhone } from "./format";
import { contactMethodLabels, dropOffLabels, urgencyLabels } from "./validation";

/**
 * Email notification for new leads.
 *
 * Switched OFF by default: the owner chose to work from the dashboard. The code
 * is here so turning it on later is two environment variables and a redeploy,
 * with no code change — because the moment he notices he's missed a lead, he'll
 * want it immediately.
 *
 * Uses Resend's REST API directly rather than the SDK, so an unused feature
 * doesn't carry a dependency.
 */

export function emailNotificationsEnabled(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL);
}

export async function notifyNewLead(lead: Lead): Promise<void> {
  if (!emailNotificationsEnabled()) return;

  const subject = `New quote request: ${lead.vehicleYear} ${lead.vehicleMake} ${lead.vehicleModel} (${lead.name})`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${site.name} Website <leads@${new URL(site.url).hostname}>`,
        to: [process.env.NOTIFY_EMAIL],
        reply_to: lead.email ?? undefined,
        subject,
        text: plainTextBody(lead),
        html: htmlBody(lead),
      }),
    });

    if (!response.ok) {
      console.error("Lead notification email failed:", response.status, await response.text());
    }
  } catch (error) {
    // A failed email must never fail the customer's submission — the lead is
    // already saved by the time we get here.
    console.error("Lead notification email threw:", error);
  }
}

function lines(lead: Lead): [string, string][] {
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Phone", formatPhone(lead.phone)],
    ["Email", lead.email ?? "—"],
    ["Prefers", contactMethodLabels[lead.contactMethod]],
    ["Vehicle", `${lead.vehicleYear} ${lead.vehicleMake} ${lead.vehicleModel}`],
    ["Mileage", formatMileage(lead.vehicleMileage) ?? "—"],
    ["Services", lead.services.map(serviceLabel).join(", ")],
    ["How soon", urgencyLabels[lead.urgency]],
    ["Drop-off", dropOffLabels[lead.dropOff]],
  ];

  if (lead.preferredDate) rows.push(["Preferred date", lead.preferredDate]);
  if (lead.aaaMember) rows.push(["AAA member", "Yes, 10% off labor applies"]);
  if (lead.referralSource) rows.push(["Heard about us", lead.referralSource]);
  if (lead.problemDescription) rows.push(["Describes the problem", lead.problemDescription]);
  rows.push(["Submitted", formatDateTime(lead.createdAt)]);

  return rows;
}

function plainTextBody(lead: Lead): string {
  const body = lines(lead)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return `${body}\n\nOpen in dashboard: ${site.url}/admin/leads/${lead.id}\nCall back: ${formatPhone(lead.phone)}`;
}

function htmlBody(lead: Lead): string {
  const rows = lines(lead)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#6e6e6e;font-size:13px;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 0;color:#171717;font-size:14px">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px">
  <h2 style="margin:0 0 4px;font-size:18px;color:#171717">New quote request</h2>
  <p style="margin:0 0 18px;color:#6e6e6e;font-size:13px">${escapeHtml(site.name)}</p>
  <table style="border-collapse:collapse;width:100%">${rows}</table>
  <p style="margin:22px 0 0">
    <a href="tel:${encodeURIComponent(lead.phone)}" style="display:inline-block;background:#d01f26;color:#fff;text-decoration:none;padding:10px 18px;border-radius:6px;font-size:14px;font-weight:600">Call ${escapeHtml(formatPhone(lead.phone))}</a>
    <a href="${site.url}/admin/leads/${lead.id}" style="display:inline-block;margin-left:8px;color:#ae1b21;text-decoration:none;padding:10px 4px;font-size:14px">Open in dashboard</a>
  </p>
</div>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
