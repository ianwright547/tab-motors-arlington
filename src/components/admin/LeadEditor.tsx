"use client";

import { useActionState } from "react";
import { Check, CircleAlert, Loader2 } from "lucide-react";
import { updateLeadAction, type UpdateLeadState } from "@/lib/admin-actions";
import { statusLabels, statusOrder } from "./StatusBadge";
import type { LeadStatus } from "@/lib/db/schema";

/**
 * Status pipeline and private notes.
 *
 * Status is a row of one-tap buttons rather than a dropdown plus save — the
 * owner is often standing in a bay with a phone in one hand, and "tap Contacted"
 * should be one action, not three.
 */
export function LeadEditor({
  leadId,
  status,
  notes,
}: {
  leadId: number;
  status: LeadStatus;
  notes: string | null;
}) {
  const [statusState, statusAction, statusPending] = useActionState<UpdateLeadState, FormData>(
    updateLeadAction,
    {},
  );
  const [notesState, notesAction, notesPending] = useActionState<UpdateLeadState, FormData>(
    updateLeadAction,
    {},
  );

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-ink-200 bg-white p-4">
        <h2 className="font-display text-base font-semibold uppercase tracking-wide">
          Where is this at?
        </h2>

        <form action={statusAction} className="mt-3">
          <input type="hidden" name="leadId" value={leadId} />
          <div className="flex flex-wrap gap-2">
            {statusOrder.map((option) => {
              const active = option === status;
              return (
                <button
                  key={option}
                  type="submit"
                  name="status"
                  value={option}
                  disabled={statusPending || active}
                  aria-pressed={active}
                  className={[
                    "min-h-10 rounded-md border px-3.5 text-sm font-semibold transition-colors",
                    active
                      ? "cursor-default border-ink-900 bg-ink-900 text-white"
                      : "border-ink-300 bg-white text-ink-700 hover:border-ink-400 hover:bg-ink-50 disabled:opacity-50",
                  ].join(" ")}
                >
                  {statusLabels[option]}
                </button>
              );
            })}
          </div>

          <Feedback state={statusState} pending={statusPending} pendingLabel="Updating…" />
        </form>
      </section>

      <section className="rounded-xl border border-ink-200 bg-white p-4">
        <h2 className="font-display text-base font-semibold uppercase tracking-wide">
          Private notes
        </h2>
        <p className="mt-1 text-sm text-ink-500">
          Only visible here. What you quoted, what you told them, when to follow up.
        </p>

        <form action={notesAction} className="mt-3">
          <input type="hidden" name="leadId" value={leadId} />
          <textarea
            name="notes"
            rows={6}
            defaultValue={notes ?? ""}
            placeholder="Quoted $340 for front pads and rotors. Called 7/30, left voicemail. Follow up Friday."
            className="w-full resize-y rounded-md border border-ink-300 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-ink-900 transition-colors hover:border-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
          />

          <div className="mt-3 flex items-center gap-3">
            <button
              type="submit"
              disabled={notesPending}
              className="min-h-10 rounded-md bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
            >
              {notesPending ? "Saving…" : "Save notes"}
            </button>
            <Feedback state={notesState} pending={notesPending} pendingLabel="Saving…" inline />
          </div>
        </form>
      </section>
    </div>
  );
}

function Feedback({
  state,
  pending,
  pendingLabel,
  inline = false,
}: {
  state: UpdateLeadState;
  pending: boolean;
  pendingLabel: string;
  inline?: boolean;
}) {
  const wrapper = inline ? "" : "mt-3";

  if (pending) {
    return (
      <p className={`${wrapper} flex items-center gap-1.5 text-sm text-ink-500`}>
        <Loader2 className="size-3.5 animate-spin" aria-hidden />
        {pendingLabel}
      </p>
    );
  }

  if (state.error) {
    return (
      <p role="alert" className={`${wrapper} flex items-center gap-1.5 text-sm text-bad-700`}>
        <CircleAlert className="size-3.5" aria-hidden />
        {state.error}
      </p>
    );
  }

  if (state.saved) {
    return (
      <p role="status" className={`${wrapper} flex items-center gap-1.5 text-sm text-good-700`}>
        <Check className="size-3.5" strokeWidth={3} aria-hidden />
        Saved
      </p>
    );
  }

  return null;
}
