import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCallBar, MobileCallBarSpacer } from "@/components/site/MobileCallBar";
import { GoogleReviewBadge } from "@/components/site/GoogleReviewBadge";
import { PreferredSourceButton } from "@/components/site/PreferredSourceButton";

/**
 * Chrome for the public site. The admin dashboard sits outside this group so it
 * doesn't inherit the marketing header, footer or call bar.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2.5 focus:font-semibold focus:text-ink-900 focus:shadow-lift"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <MobileCallBarSpacer />
      <Footer />
      <MobileCallBar />
      <GoogleReviewBadge />
      <PreferredSourceButton />
    </>
  );
}
