import { Phone } from "lucide-react";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { telHref } from "@/lib/format";

/**
 * Closing call-to-action for interior pages.
 *
 * Always offers both the form and the phone number. A good number of people
 * would simply rather call a garage than type into a form, and making them hunt
 * for the number is a good way to lose them.
 */
export function QuoteCta({
  heading = "Want a price before you commit?",
  body = "Tell us what's going on and we'll come back with a quote. Takes about two minutes, and there's no obligation.",
  serviceSlug,
}: {
  heading?: string;
  body?: string;
  /** Preselects this service on the quote form. */
  serviceSlug?: string;
}) {
  const href = serviceSlug ? `/quote?service=${serviceSlug}` : "/quote";

  return (
    <section className="container-page pb-16 md:pb-20">
      <div className="rounded-xl bg-ink-900 p-6 text-white md:p-9">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
            {heading}
          </h2>
          <p className="mt-3 text-ink-300">{body}</p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonAnchor href={telHref(site.phone.e164)} size="lg">
            <Phone className="size-4" aria-hidden />
            Call {site.phone.display}
          </ButtonAnchor>
          <ButtonLink href={href} variant="outlineOnDark" size="lg" className="sm:min-w-52">
            Request a quote online
          </ButtonLink>
        </div>

        <p className="mt-5 text-sm text-ink-400">
          {site.aaa.memberBenefit} · {site.warranty.label} · {site.financing.short}
        </p>
      </div>
    </section>
  );
}
