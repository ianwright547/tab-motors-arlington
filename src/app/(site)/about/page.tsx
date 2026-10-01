import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, Car, ClipboardCheck, Receipt, ShieldCheck, Wrench } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { BreadcrumbSchema } from "@/components/site/StructuredData";
import { QuoteCta } from "@/components/site/QuoteCta";
import { ShopPhoto } from "@/components/site/ShopPhoto";
import { ReviewsSection } from "@/components/site/ReviewsSection";
import { FaqSection } from "@/components/site/FaqSection";
import { BlogTeasers } from "@/components/site/BlogTeasers";
import { generalFaq } from "@/lib/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Our Shop",
  description:
    "An independent, AAA Approved auto repair shop on Langston Blvd in Arlington, VA. " +
    "Official Virginia inspection station serving all makes, including hybrids and EVs.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const { yearEstablished, certifications, languages, amenities } = site.toConfirm;

  return (
    <>
      <BreadcrumbSchema trail={[{ label: "About" }]} />

      <PageHero
        eyebrow="About us"
        title="An independent shop that explains itself"
        intro="We're a full-service repair shop on Langston Blvd in North Arlington. Not a chain, not a dealer, which means the person who diagnoses your car is the person who fixes it."
        breadcrumbs={[{ label: "About" }]}
      />

      <section className="container-page py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div className="space-y-5 text-[1.0625rem] leading-relaxed text-ink-700">
            <p>
              Most people don&apos;t enjoy taking a car in. The worry isn&apos;t really the
              repair. It&apos;s not knowing whether you&apos;re being told the truth about what
              needs doing, and what it should cost.
            </p>
            <p>
              We try to remove that. We diagnose the problem properly, explain what we found in
              language that makes sense, and give you the price before we start. If something can
              safely wait, we say so instead of adding it to the bill. If a repair isn&apos;t
              worth it on a particular car, we&apos;ll tell you that too.
            </p>
            <p>
              We work on domestic, Asian and European vehicles, including hybrids and fully
              electric cars, Tesla, Rivian and Lucid included. As an{" "}
              <strong className="font-semibold text-ink-900">
                official Virginia inspection station
              </strong>
              , we handle annual safety inspections and Northern Virginia emissions testing in the
              same visit, so keeping your registration valid doesn&apos;t mean two trips.
            </p>
            {yearEstablished && (
              <p>We&apos;ve been serving Arlington drivers since {yearEstablished}.</p>
            )}
          </div>

          {/* No staff photos by the shop's own preference. The storefront does
              the work instead: it shows the address, the signage and an open
              bay, so a first-time customer knows what to look for. */}
          <ShopPhoto
            src="/images/storefront.jpg"
            alt="The TAB Motors Arlington front entrance at 4035 Langston Blvd, with the TAB Motors window sign, an open service bay and a car on the lift"
            className="min-h-72 lg:min-h-[28rem]"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
      </section>

      <section className="border-y border-ink-200 bg-ink-50 py-14 md:py-16">
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
            How we work
          </h2>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Principle
              icon={Receipt}
              title="The price comes first"
              body="We diagnose, we quote, we wait for your yes. Nothing gets added to the invoice without a conversation."
            />
            <Principle
              icon={Wrench}
              title="Diagnosis, not parts roulette"
              body="Reading a fault code isn't a diagnosis. We find the actual cause instead of replacing parts until the light goes out."
            />
            <Principle
              icon={ShieldCheck}
              title="Our work is warranted"
              body={`${site.warranty.label}. If something we repaired isn't right, bring it back.`}
            />
            <Principle
              icon={BadgeCheck}
              title="AAA holds us to a standard"
              body="AAA Approved shops are inspected on workmanship, facilities, technician training and community reputation, then re-checked to keep the approval."
            />
            <Principle
              icon={ClipboardCheck}
              title="Inspections done here"
              body="An official Virginia inspection station, so safety and emissions happen in one visit."
            />
            <Principle
              icon={Car}
              title="We don't turn cars away"
              body="German, Japanese, Korean, domestic, hybrid or fully electric, including the makes many independents won't touch."
            />
          </ul>
        </div>
      </section>

      <section className="container-page py-14 md:py-16">
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
          How a diagnosis and an estimate actually work here
        </h2>
        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4 text-[1.0625rem] leading-relaxed text-ink-700">
            <p>
              A fault code is a starting point, not an answer. It tells us which circuit or
              system reported a problem, not which part failed. So we test the thing the code
              points at before anyone orders a part, which is why we would rather have the car
              for an hour than guess over the phone.
            </p>
            <p>
              Once we know what is wrong, you get a price for the work and a plain explanation
              of what is urgent and what can wait. Nothing else goes on the invoice without a
              conversation first. If we find something while the car is open, we call you.
            </p>
            <p>
              If we cannot quote accurately without seeing the car, we say that instead of
              throwing out a number we cannot stand behind. And you are free to take the
              estimate somewhere else. We would rather you did that than felt cornered.
            </p>
          </div>
          <div className="space-y-4 text-[1.0625rem] leading-relaxed text-ink-700">
            <p>
              <strong className="font-semibold text-ink-900">On the warranty:</strong>{" "}
              {site.warranty.label}. If something we repaired is not right, bring it back and we
              will look at it.
            </p>
            <p>
              <strong className="font-semibold text-ink-900">On inspections:</strong> we are an
              official Virginia safety inspection and emissions station. That is a credential
              issued by the Commonwealth, and it is why a failed item can be repaired and the
              sticker issued in the same visit rather than across two shops.
            </p>
            <p>
              <strong className="font-semibold text-ink-900">On paying for it:</strong>{" "}
              {site.financing.blurb}
            </p>
            <p>
              Ready to start?{" "}
              <Link
                href="/quote"
                className="font-semibold text-brand-700 underline underline-offset-2"
              >
                Send us the details
              </Link>
              , call {site.phone.display}, or email{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-brand-700 underline underline-offset-2"
              >
                {site.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {(certifications.length > 0 || languages.length > 0 || amenities.length > 0) && (
        <section className="container-page py-14 md:py-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.length > 0 && (
              <DetailList title="Certifications" items={certifications} />
            )}
            {languages.length > 0 && <DetailList title="Languages spoken" items={languages} />}
            {amenities.length > 0 && <DetailList title="While you're here" items={amenities} />}
          </div>
        </section>
      )}

      {/*
        Prominent by design. There is an unrelated shop in Washington DC using
        the same name, so misdirected calls, reviews and complaints are a real
        risk for him, and a customer who arrives at the wrong shop blames the
        website.
      */}
      <section className="container-page pb-14 md:pb-16">
        <div className="rounded-xl border border-ink-200 bg-white p-6">
          <h2 className="font-display text-xl font-semibold">One important clarification</h2>
          <p className="mt-2.5 leading-relaxed text-ink-700">{site.disclaimer}</p>
          <p className="mt-3 text-sm text-ink-600">
            If you were looking for a differently located business with a similar name, this
            isn&apos;t it, and we can&apos;t help with bookings or billing for them. Our shop is
            at {site.address.oneLine}, reachable on{" "}
            <Link
              href="/contact"
              className="font-semibold text-brand-700 underline underline-offset-2"
            >
              {site.phone.display}
            </Link>
            .
          </p>
        </div>
      </section>

      <ReviewsSection count={6} />

      <FaqSection items={generalFaq} heading="Questions we hear a lot" withSchema={false} />

      <BlogTeasers className="border-t border-ink-200" />

      <QuoteCta />
    </>
  );
}

function Principle({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof BadgeCheck;
  title: string;
  body: string;
}) {
  return (
    <li className="rounded-xl border border-ink-200 bg-white p-5">
      <Icon className="size-6 text-brand-600" aria-hidden />
      <h3 className="mt-3.5 font-display text-lg font-semibold leading-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-600">{body}</p>
    </li>
  );
}

function DetailList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <ul className="mt-3 space-y-1.5 text-sm text-ink-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
