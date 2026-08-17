"use client";

import { useActionState } from "react";
import { CircleAlert, Loader2, LogIn } from "lucide-react";
import { loginAction, type LoginState } from "@/lib/admin-actions";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(loginAction, {});

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink-800">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="w-full rounded-md border border-ink-300 bg-white px-3.5 py-2.5 text-ink-900 transition-colors hover:border-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
        />
      </div>

      {state.error && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-md border border-bad-100 bg-bad-50 p-3 text-sm text-bad-700"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>{state.error}</span>
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Signing in…
          </>
        ) : (
          <>
            <LogIn className="size-4" aria-hidden />
            Sign in
          </>
        )}
      </Button>
    </form>
  );
}
