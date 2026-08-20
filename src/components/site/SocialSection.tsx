import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import {
  platformMeta,
  socialPosts,
  socialProfiles,
  type SocialPlatform,
} from "@/lib/social";

/**
 * "Latest from the shop" — a curated row of real Instagram and Facebook posts.
 *
 * Each tile is the actual post image (self-hosted, see lib/social.ts) linking
 * out to the live post. No Meta embed script, so it loads fast, matches the
 * site, and doesn't advertise a follower count while the accounts are young.
 */

type IconProps = { className?: string };

// lucide-react 1.x dropped its brand logos (trademark), so the platform marks
// are inline SVG. fill="currentColor" lets the accent classes below color them.
function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38 3.7 3.7 0 0 1-1.38.9c-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.12 1.38C1.36 2.67.95 3.34.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.47 1.38 2.13.66.66 1.33 1.07 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.8-.31 1.47-.72 2.13-1.38.66-.66 1.07-1.33 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.12A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0z" />
      <path d="M12 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
      <circle cx="18.41" cy="5.59" r="1.44" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.49 0-1.96.93-1.96 1.89v2.25h3.32l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}

const platformIcon = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
};

const platformAccent: Record<SocialPlatform, string> = {
  instagram: "text-[#d6249f]",
  facebook: "text-[#1877f2]",
};

export function SocialSection() {
  return (
    <section
      id="social"
      className="border-t border-ink-200 bg-white py-20 md:py-24"
    >
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow text-brand-700">Follow along</p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-[0.98] tracking-tight sm:text-5xl">
              Latest from the shop
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-ink-600">
              Specials, real work in the bays, and reminders when your Virginia
              inspection is due. Follow{" "}
              <span className="font-semibold text-ink-800">
                @{socialProfiles.instagram.handle}
              </span>{" "}
              on Instagram and Facebook.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="flex flex-wrap gap-3">
              <FollowButton
                platform="instagram"
                href={socialProfiles.instagram.url}
                label="Follow on Instagram"
              />
              <FollowButton
                platform="facebook"
                href={socialProfiles.facebook.url}
                label="Like on Facebook"
              />
            </div>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {socialPosts.map((post, index) => {
            const { label } = platformMeta[post.platform];
            const Icon = platformIcon[post.platform];
            return (
              <li key={post.url}>
                <Reveal delay={index * 70} className="h-full">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${post.caption} — view on ${label}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-ink-100">
                      <Image
                        src={post.image}
                        alt={post.caption}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <span className="absolute right-2.5 top-2.5 inline-flex size-8 items-center justify-center rounded-lg bg-white/90 shadow-card backdrop-blur-sm">
                        <Icon className={`size-4 ${platformAccent[post.platform]}`} />
                      </span>
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-ink-950/70 to-transparent px-3.5 pb-3 pt-10 text-sm font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        View on {label}
                        <ArrowUpRight className="size-4" aria-hidden />
                      </span>
                    </div>
                    <p className="flex-1 px-4 py-3.5 text-sm leading-snug text-ink-600">
                      {post.caption}
                    </p>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function FollowButton({
  platform,
  href,
  label,
}: {
  platform: SocialPlatform;
  href: string;
  label: string;
}) {
  const Icon = platformIcon[platform];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink-900 hover:shadow-card"
    >
      <Icon className={`size-4 ${platformAccent[platform]}`} />
      {label}
    </a>
  );
}
