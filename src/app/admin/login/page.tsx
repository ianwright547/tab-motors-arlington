import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Wrench } from "lucide-react";
import { LoginForm } from "@/components/admin/LoginForm";
import { adminAuthConfigured, isAdminAuthenticated } from "@/lib/auth";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect("/admin");

  const configured = adminAuthConfigured();

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-100 px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center gap-2.5">
          <span aria-hidden className="flex size-10 items-center justify-center rounded-md bg-ink-900">
            <Wrench className="size-5 text-brand-500" />
          </span>
          <div>
            <p className="font-display text-lg font-bold uppercase leading-none tracking-tight text-ink-900">
              {site.shortName}
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
              Leads dashboard
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-ink-200 bg-white p-6 shadow-card">
          <h1 className="font-display text-xl font-semibold">Sign in</h1>
          <p className="mt-1 text-sm text-ink-500">
            This area holds customer contact details. It isn&apos;t linked from the public site.
          </p>

          <div className="mt-5">
            {configured ? (
              <LoginForm />
            ) : (
              <div className="rounded-md border border-warn-100 bg-warn-50 p-4 text-sm text-warn-700">
                <p className="font-semibold">Not set up yet</p>
                <p className="mt-1.5 leading-relaxed">
                  Copy <code className="font-mono text-xs">.env.example</code> to{" "}
                  <code className="font-mono text-xs">.env.local</code>, then fill in{" "}
                  <code className="font-mono text-xs">ADMIN_PASSWORD</code> and{" "}
                  <code className="font-mono text-xs">SESSION_SECRET</code> and restart the server.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
