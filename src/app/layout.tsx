import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { searchEngineIndexingEnabled, site } from "@/lib/site";

/**
 * Fonts are self-hosted by next/font at build time — no request to Google at
 * runtime, no layout shift, and nothing to leak about the visitor.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Auto Repair, Inspection & Tires in Arlington, VA`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "auto repair Arlington VA",
    "mechanic Arlington VA",
    "Virginia state inspection Arlington",
    "emissions test Arlington VA",
    "brake repair Arlington",
    "AAA approved auto repair Arlington",
    "hybrid EV repair Arlington VA",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  // Belt and braces alongside robots.txt: a `noindex` meta tag also covers
  // pages reached by a direct link, which robots.txt alone does not.
  robots: searchEngineIndexingEnabled
    ? { index: true, follow: true }
    : { index: false, follow: false },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
