"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { telHref } from "@/lib/format";

/**
 * Fixed call/quote bar at the bottom of the screen on phones.
 *
 * Hidden on first paint so it doesn't cover the hero's own buttons — it slides
 * up once the visitor starts scrolling, then stays within thumb reach on every
 * screen after that.
 */
export function MobileCallBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink-800 bg-ink-950/95 backdrop-blur transition-transform duration-300 ease-out lg:hidden print:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-2 gap-2 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        <a
          href={telHref(site.phone.e164)}
          className="flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/20 text-[0.9375rem] font-semibold text-white transition-colors active:bg-white/10"
        >
          <Phone className="size-4 text-brand-400" aria-hidden />
          Call now
        </a>
        <Link
          href="/quote"
          className="flex min-h-12 items-center justify-center rounded-md bg-brand-600 text-[0.9375rem] font-semibold text-white transition-colors active:bg-brand-700"
        >
          Free quote
        </Link>
      </div>
    </div>
  );
}

/**
 * Spacer so the fixed bar never covers the last of the page content once it's
 * visible. Rendered at the end of the page body, mobile only.
 */
export function MobileCallBarSpacer() {
  return <div aria-hidden className="h-20 lg:hidden" />;
}
