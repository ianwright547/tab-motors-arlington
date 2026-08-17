import Link from "next/link";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { telHref } from "@/lib/format";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink-950 px-5 py-16 text-center text-white">
      <p className="font-display text-6xl font-bold text-brand-500">404</p>
      <h1 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight">
        That page isn&apos;t here
      </h1>
      <p className="mt-3 max-w-md text-ink-300">
        The link may be out of date. The shop is still very much open, and here&apos;s the way back.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">
          Go to the home page
        </ButtonLink>
        <ButtonAnchor
          href={telHref(site.phone.e164)}
          variant="outlineOnDark"
          size="lg"
        >
          Call {site.phone.display}
        </ButtonAnchor>
      </div>

      <p className="mt-8 text-sm text-ink-400">
        Looking for a quote?{" "}
        <Link href="/quote" className="font-semibold text-brand-400 underline">
          Start here
        </Link>
      </p>
    </div>
  );
}
