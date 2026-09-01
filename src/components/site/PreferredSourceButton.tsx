"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

interface PreferredSourceClient {
  init: (options: { theme: "light" | "dark"; lang?: string }) => void;
  addPreferredSource: () => void;
}

declare global {
  interface Window {
    PREFERRED_SOURCE?: Array<(client: PreferredSourceClient) => void>;
  }
}

const scriptId = "google-preferred-sources-script";

export function PreferredSourceButton() {
  const clientRef = useRef<PreferredSourceClient | null>(null);
  const domain = new URL(site.url).hostname.replace(/^www\./, "");

  useEffect(() => {
    window.PREFERRED_SOURCE = window.PREFERRED_SOURCE || [];
    window.PREFERRED_SOURCE.push((client) => {
      clientRef.current = client;
      client.init({ theme: "light", lang: "en" });
    });

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = "https://news.google.com/swg/js/v1/publisher.js";
      script.setAttribute("preferred-sources-control", "manual");
      document.head.appendChild(script);
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!clientRef.current) return;
    event.preventDefault();
    clientRef.current.addPreferredSource();
  };

  return (
    <a
      href={`https://www.google.com/preferences/source?q=${domain}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={`Add ${site.name} as a preferred source on Google`}
      title="Add TAB Motors Arlington as a preferred source on Google"
      className="fixed bottom-[calc(9.25rem+env(safe-area-inset-bottom))] right-4 z-40 inline-flex h-10 items-center gap-2 rounded-full border border-ink-200 bg-white/95 px-3 text-xs font-bold text-ink-900 shadow-lg shadow-ink-950/10 backdrop-blur transition-colors hover:border-brand-400 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 lg:bottom-[5.5rem] lg:right-5 print:hidden"
    >
      <svg className="size-4 shrink-0" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09A6.3 6.3 0 0 1 5.49 12c0-.73.13-1.43.35-2.09V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84Z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
        />
      </svg>
      <span className="lg:hidden">Google</span>
      <span className="hidden lg:inline">Preferred on Google</span>
    </a>
  );
}
