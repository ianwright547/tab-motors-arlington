"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks } from "./nav";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { telHref } from "@/lib/format";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

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

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/95 backdrop-blur supports-[backdrop-filter]:bg-ink-950/85">
      <div className="container-page flex h-20 items-center justify-between gap-4 md:h-24">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-ink-200 transition-colors hover:bg-white/10 hover:text-white group-focus-within:text-white"
                >
                  {link.label}
                  <ChevronDown
                    className="size-3.5 opacity-70 transition-transform duration-200 group-hover:rotate-180"
                    aria-hidden
                  />
                </Link>
                {/* pt-2 keeps a hover bridge between the trigger and the panel */}
                <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="w-[min(30rem,80vw)] rounded-xl border border-white/10 bg-ink-900 p-2 shadow-2xl">
                    <div className="grid grid-cols-2 gap-0.5">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="rounded-md px-3 py-2 text-sm text-ink-200 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                    <Link
                      href={link.href}
                      className="mt-1 block rounded-md px-3 py-2 text-sm font-semibold text-brand-300 transition-colors hover:bg-white/10"
                    >
                      All {link.label.toLowerCase()} →
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink-200 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ),
          )}
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
          className="-mr-2 flex size-11 items-center justify-center rounded-md text-white lg:hidden"
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
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
          />
          <div className="relative ml-auto flex h-full w-[min(22rem,88vw)] flex-col bg-ink-950 shadow-2xl">
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

            <nav aria-label="Mobile" className="flex flex-col gap-1 overflow-y-auto p-4">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.href}>
                    <div className="flex items-center">
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="flex-1 rounded-md px-3 py-3 text-base font-medium text-ink-100 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenSection(openSection === link.href ? null : link.href)
                        }
                        className="flex size-11 items-center justify-center rounded-md text-ink-300 hover:bg-white/10 hover:text-white"
                        aria-label={`Toggle ${link.label}`}
                        aria-expanded={openSection === link.href}
                      >
                        <ChevronDown
                          className={`size-5 transition-transform duration-200 ${
                            openSection === link.href ? "rotate-180" : ""
                          }`}
                          aria-hidden
                        />
                      </button>
                    </div>
                    {openSection === link.href && (
                      <div className="mb-1 ml-3 flex flex-col border-l border-white/10 pl-3">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeMenu}
                            className="rounded-md px-3 py-2 text-sm text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="rounded-md px-3 py-3 text-base font-medium text-ink-100 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ),
              )}
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
              <p className="text-center text-xs text-ink-400">{site.address.oneLine}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
