import type { LeadStatus } from "@/lib/db/schema";

export const statusOrder: LeadStatus[] = ["new", "contacted", "quoted", "won", "lost"];

export const statusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  quoted: "Quoted",
  won: "Won",
  lost: "Lost",
};

const statusStyles: Record<LeadStatus, string> = {
  new: "bg-brand-100 text-brand-800 border-brand-200",
  contacted: "bg-ink-100 text-ink-700 border-ink-200",
  quoted: "bg-warn-50 text-warn-700 border-warn-100",
  won: "bg-good-100 text-good-800 border-good-100",
  lost: "bg-ink-50 text-ink-500 border-ink-200",
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
