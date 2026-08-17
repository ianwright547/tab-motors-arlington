import Link from "next/link";
import { Download, LogOut, Wrench } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "@/lib/admin-actions";
import { searchEngineIndexingEnabled, site } from "@/lib/site";
import { usingNeon } from "@/lib/db";

/**
 * Shell for the signed-in dashboard.
 *
 * The auth check lives here so every page in this group inherits it. Route
 * handlers and server actions repeat the check themselves — a layout guard
 * protects pages, not endpoints.
 */
export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-ink-100">
      <header className="border-b border-ink-800 bg-ink-950">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-5 py-3.5">
          <Link href="/admin" className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="flex size-9 items-center justify-center rounded-md bg-white/10"
            >
              <Wrench className="size-4.5 text-brand-500" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-bold uppercase tracking-tight text-white">
                {site.shortName}
              </span>
              <span className="mt-0.5 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-ink-400">
                Leads dashboard
              </span>
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <a
              href="/api/admin/leads/export"
              className="flex min-h-10 items-center gap-2 rounded-md border border-white/20 px-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Download className="size-4" aria-hidden />
              <span className="hidden sm:inline">Export CSV</span>
            </a>
            <Link
              href="/"
              className="hidden min-h-10 items-center rounded-md px-3 text-sm font-medium text-ink-300 transition-colors hover:bg-white/10 hover:text-white sm:flex"
            >
              View site
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex min-h-10 items-center gap-2 rounded-md px-3 text-sm font-medium text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <LogOut className="size-4" aria-hidden />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {!usingNeon && (
        <p className="bg-warn-100 px-5 py-2 text-center text-xs font-medium text-warn-700">
          Local development database (./.pglite). Leads saved here are not the live ones.
        </p>
      )}

      {/* A standing reminder in the one place the owner actually looks. The
          launch switch is easy to forget, and forgetting it means the site never
          shows up in Google at all. Disappears once it's flipped. */}
      {usingNeon && !searchEngineIndexingEnabled && (
        <p className="bg-warn-100 px-5 py-2 text-center text-xs font-medium text-warn-700">
          The site is running on the live database but is still hidden from Google. Set{" "}
          <code className="font-mono">SITE_INDEXABLE=true</code> when you&apos;re ready to launch.
        </p>
      )}

      <div className="mx-auto max-w-6xl px-5 py-6 md:py-8">{children}</div>
    </div>
  );
}
