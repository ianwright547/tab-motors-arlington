/**
 * The shop's social profiles and a small, curated set of real posts shown on
 * the home page.
 *
 * The post images are self-hosted under /public/images (pulled from the live
 * Instagram and Facebook posts) rather than embedded through a Meta widget.
 * That keeps the section fast, keeps it on-brand, and means it never breaks
 * when Meta rotates its CDN URLs or a viewer is logged out.
 *
 * To feature a new post: drop its image in /public/images, then add an entry to
 * `socialPosts` below — newest first. Four reads as a clean row on desktop.
 */

export const socialProfiles = {
  instagram: {
    handle: "tab_motors.arlington",
    url: "https://www.instagram.com/tab_motors.arlington/",
  },
  facebook: {
    /** Listed on Facebook as "Tabb Motors Exxon Arlington". */
    url: "https://www.facebook.com/people/Tabb-Motors-Exxon-Arlington/61587645325941/",
  },
} as const;

export type SocialPlatform = "instagram" | "facebook";

export const platformMeta: Record<SocialPlatform, { label: string }> = {
  instagram: { label: "Instagram" },
  facebook: { label: "Facebook" },
};

export type SocialPost = {
  platform: SocialPlatform;
  /** Path under /public. */
  image: string;
  /** Describe what's actually in the frame — used as alt text and caption. */
  caption: string;
  /** Permalink to the live post. */
  url: string;
};

export const socialPosts: SocialPost[] = [
  {
    platform: "instagram",
    image: "/images/social-oil-change.jpg",
    caption: "Limited-time oil change special, $49.99",
    url: "https://www.instagram.com/p/DbMbYZ7x0UN/",
  },
  {
    platform: "instagram",
    image: "/images/social-storefront.jpg",
    caption: "German and European car specialists in Arlington",
    url: "https://www.instagram.com/p/DbMesENxQfv/",
  },
  {
    platform: "facebook",
    image: "/images/social-free-air.jpg",
    caption: "Free air for our Arlington neighbors",
    url: "https://www.facebook.com/permalink.php?story_fbid=pfbid0ANba7f3tRZS7aacg2m45meqHaSFspmtgsbC44k29eK6uUhijHzHVtPSdiAenBrWAl&id=61587645325941",
  },
  {
    platform: "facebook",
    image: "/images/social-exxon.jpg",
    caption: "Your neighborhood Exxon and full-service shop",
    url: "https://www.facebook.com/permalink.php?story_fbid=pfbid08NqLLq2nMF72vHRXv8pnAERMoa1G62eXMk9XRqLMMsoabcvs4onmnV7yfeVLoULXl&id=61587645325941",
  },
];
