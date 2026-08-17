import type { Metadata } from "next";
import { site } from "@/lib/site";
import { telHref } from "@/lib/format";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles the information you send through this website.`,
  alternates: { canonical: "/privacy" },
  // No robots override here on purpose — it inherits the launch switch from the
  // root layout. Setting index:true here would quietly defeat it.
};

/**
 * Required, not optional: the quote form collects names, phone numbers and email
 * addresses. This describes what actually happens to that data in this codebase
 * — it isn't boilerplate, so keep it truthful if the implementation changes.
 */
export default function PrivacyPage() {
  return (
    <>
      <section className="bg-ink-950 text-white">
        <div className="container-page py-12 md:py-14">
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            Privacy policy
          </h1>
          <p className="mt-3 text-ink-400">Last updated: July 2026</p>
        </div>
        <div aria-hidden className="hazard-stripe h-1.5" />
      </section>

      <div className="container-page py-12 md:py-16">
        <div className="max-w-2xl space-y-8 text-ink-700 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink-900 [&_p]:mt-3 [&_p]:leading-relaxed">
          <section>
            <h2>The short version</h2>
            <p>
              When you send a quote request, we collect what you type in the form and use it to
              get back to you about that request. We don't sell it, we don't rent it, and we don't
              add you to a marketing list.
            </p>
          </section>

          <section>
            <h2>What we collect</h2>
            <p>From the quote form:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>Your name, phone number, and email address if you give one</li>
              <li>Which way you'd prefer to be contacted</li>
              <li>Your vehicle's year, make, model and mileage</li>
              <li>The services you selected and anything you wrote describing the problem</li>
              <li>Any photos you chose to attach</li>
              <li>When you'd like to come in, and whether you'll wait or leave the car</li>
              <li>Whether you're a AAA member, so we can apply the member discount</li>
              <li>How you heard about us, if you tell us</li>
            </ul>
            <p>
              We also store a one-way scrambled version of your IP address and your browser's user
              agent string. The scrambled IP lets us block spam and abuse; it can't be turned back
              into your actual address.
            </p>
          </section>

          <section>
            <h2>What we do with it</h2>
            <p>
              We use it to prepare your quote, contact you about it, and keep a record of the work
              if you become a customer. That's the whole list. We don't use it for advertising and
              we don't share it with anyone for their own purposes.
            </p>
          </section>

          <section>
            <h2>Who else touches it</h2>
            <p>
              A few service providers process data on our behalf, and only to run this website:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>Our website host, which serves these pages</li>
              <li>Our database provider, which stores quote requests</li>
              <li>Our file storage provider, if you attach photos</li>
              <li>Cloudflare, if bot protection is enabled on the form</li>
            </ul>
            <p>
              None of them are permitted to use your information for their own purposes.
            </p>
          </section>

          <section>
            <h2>Cookies and tracking</h2>
            <p>
              This site sets no advertising cookies and runs no third-party tracking or analytics
              scripts. The only cookie the site uses is a login cookie for the shop's own staff
              dashboard, which is never set for customers.
            </p>
            <p>
              The map on our contact page is embedded from Google Maps, and the fonts are served
              from our own domain rather than from Google.
            </p>
          </section>

          <section>
            <h2>How long we keep it</h2>
            <p>
              We keep quote requests as long as they're useful for serving you and keeping records
              of work performed. If you'd like your information deleted, ask us and we'll remove
              it, apart from anything we're required to retain for tax or warranty reasons.
            </p>
          </section>

          <section>
            <h2>Your choices</h2>
            <p>
              You can ask us what we hold about you, ask us to correct it, or ask us to delete it.
              Call the shop or send an email and we'll take care of it.
            </p>
          </section>

          <section>
            <h2>Children</h2>
            <p>
              This site isn't directed at children and we don't knowingly collect information from
              anyone under 13.
            </p>
          </section>

          <section>
            <h2>Changes</h2>
            <p>
              If we change how we handle information, we'll update this page and the date at the
              top.
            </p>
          </section>

          <section>
            <h2>Contact us</h2>
            <p>
              {site.name}
              <br />
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
              <br />
              <a
                href={telHref(site.phone.e164)}
                className="font-semibold text-brand-700 underline underline-offset-2"
              >
                {site.phone.display}
              </a>
            </p>
          </section>

          <p className="border-t border-ink-200 pt-6 text-sm text-ink-500">{site.disclaimer}</p>
        </div>
      </div>
    </>
  );
}
