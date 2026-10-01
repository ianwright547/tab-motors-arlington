import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks } from "./nav";
import { services } from "@/lib/services";
import { formatHoursSummary, site } from "@/lib/site";
import { telHref } from "@/lib/format";

export function Footer() {
  const hours = formatHoursSummary();

  return (
    <footer className="bg-ink-950 text-ink-300">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo size="footer" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              {site.tagline}. Serving Arlington and Northern Virginia.
            </p>
            {site.aaa.approved && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-md border border-brand-500/30 bg-brand-500/10 px-3 py-1.5 text-xs font-semibold text-brand-300">
                AAA Approved Auto Repair
              </p>
            )}
          </div>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-white">
              Visit the shop
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${site.address.mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline"
                >
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden />
                <a href={telHref(site.phone.e164)} className="hover:text-white hover:underline">
                  {site.phone.display}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden />
                <a href={`mailto:${site.email}`} className="break-all hover:text-white hover:underline">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden />
                <div>
                  {hours.map((entry) => (
                    <div key={entry.label} className="flex gap-2">
                      <span className="w-16 shrink-0 text-ink-400">{entry.label}</span>
                      <span>{entry.value}</span>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-white">
              Services
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {services.slice(0, 8).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-white hover:underline"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="font-semibold hover:text-white hover:underline">
                  All services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-white">
              Company
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/quote" className="font-semibold text-brand-400 hover:text-brand-300">
                  Get a free quote
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white hover:underline">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          {/* Kept prominent on purpose. The similarly named DC shop means
              misdirected calls, reviews and complaints are a real risk. */}
          <p className="max-w-3xl text-xs leading-relaxed text-ink-500">{site.disclaimer}</p>
          <p className="mt-4 text-xs text-ink-500">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
