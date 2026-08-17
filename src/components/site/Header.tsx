"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks } from "./nav";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { telHref } from "@/lib/format";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // The drawer is an overlay; letting the page scroll behind it feels broken.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/95 backdrop-blur supports-[backdrop-filter]:bg-ink-950/85">
      <div className="container-page flex h-20 items-center justify-between gap-4 md:h-24">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={telHref(site.phone.e164)}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-white transition-colors hover:bg-white/10"
          >
            <Phone className="size-4 text-brand-400" aria-hidden />
            <span className="font-display text-lg font-semibold tracking-tight">
              {site.phone.display}
            </span>
          </a>
          <ButtonLink href="/quote" size="sm">
            Get a free quote
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="-mr-2 flex size-11 items-center justify-center rounded-md text-white md:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <Menu className="size-6" aria-hidden />
        </button>
      </div>

      {/* Thin brand band. Reads as shop signage and separates the dark header
          from whatever section follows it. */}
      <div aria-hidden className="hazard-stripe h-1 opacity-90" />

      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
          />
          <div className="relative ml-auto flex h-full w-[min(20rem,85vw)] flex-col bg-ink-950 shadow-2xl">
            <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
              <Logo />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="-mr-2 flex size-11 items-center justify-center rounded-md text-white"
                aria-label="Close menu"
              >
                <X className="size-6" aria-hidden />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-ink-100 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto space-y-3 border-t border-white/10 p-5">
              <ButtonLink href="/quote" size="lg" className="w-full" onClick={() => setMenuOpen(false)}>
                Get a free quote
              </ButtonLink>
              <ButtonAnchor
                href={telHref(site.phone.e164)}
                variant="outlineOnDark"
                size="lg"
                className="w-full"
              >
                <Phone className="size-4" aria-hidden />
                {site.phone.display}
              </ButtonAnchor>
              <p className="text-center text-xs text-ink-400">
                {site.address.oneLine}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
