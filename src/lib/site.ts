/**
 * Single source of truth for every business fact shown on the site.
 *
 * Facts tagged UNCONFIRMED came from public listings (AAA, fuel-station
 * directories) rather than from the owner. Grep for "UNCONFIRMED" before
 * launch — each one is a claim we would be publishing on his behalf.
 */

/**
 * Master switch for search engines. Off unless explicitly turned on.
 *
 * The site can be deployed and shared for review long before it's finished. Any
 * URL Google can reach, Google will index — including a Vercel preview link —
 * and a half-built page with placeholder photos is a bad first impression that
 * takes weeks to clear out of the index.
 *
 * So: nothing is indexable until `SITE_INDEXABLE=true` is set. Flipping it is
 * the last step of launch, not the first. Until then the admin dashboard shows a
 * standing reminder whenever the site is running against the real database.
 */
export const searchEngineIndexingEnabled = process.env.SITE_INDEXABLE === "true";

export const site = {
  /**
   * Always "TAB Motors Arlington", never bare "TAB Motors".
   *
   * There is an unrelated shop in Washington DC also called TAB Motors
   * (tabmotors.net) which already ranks for the bare name. Keeping "Arlington"
   * attached everywhere is what stops Google — and customers — from merging
   * the two businesses.
   */
  name: "TAB Motors Arlington",
  shortName: "TAB Motors",

  tagline: "Straight answers and honest repairs in North Arlington",

  description:
    "TAB Motors Arlington is a full-service auto repair shop and Exxon station on " +
    "Old Dominion Dr. Virginia state inspections, emissions, brakes, diagnostics and " +
    "honest service for every make, including hybrids and EVs.",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tabmotorsarlington.com",

  /** Confirmed by the owner: the 703 number is the one the shop answers.
   *  The 571-506-4452 found in another directory is not used — ignore it. */
  phone: {
    display: "(703) 243-3080",
    e164: "+17032433080",
  },

  /** Public contact email, provided by the owner (Oct 2026). Mail for the
   *  domain is hosted on Microsoft 365. */
  email: "support@tabmotorsarlington.com",

  /** Agency owner confirmed Google address on October 6, 2026. Supersedes the earlier Langston address. */
  address: {
    street: "4035 Old Dominion Dr",
    city: "Arlington",
    state: "VA",
    zip: "22207",
    country: "US",
    /** Google Maps resolves this reliably, so we don't need to hardcode
     *  coordinates we haven't verified. */
    get oneLine() {
      return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
    },
    get mapsQuery() {
      return encodeURIComponent(`${site.name}, ${this.street}, ${this.city}, ${this.state} ${this.zip}`);
    },
  },

  /**
   * Confirmed by the owner.
   *
   * Note these are considerably better than the AAA directory claims (it says
   * Mon–Fri 8–5, closed Saturday). Eleven-hour weekdays and an open Saturday
   * are a genuine selling point against shops that close at 5 — so they're
   * surfaced on the home page, not buried in the footer.
   *
   * The AAA listing needs correcting; see PLAN.md section 7.
   */
  hours: [
    { day: "Monday", open: "7:00 AM", close: "6:00 PM" },
    { day: "Tuesday", open: "7:00 AM", close: "6:00 PM" },
    { day: "Wednesday", open: "7:00 AM", close: "6:00 PM" },
    { day: "Thursday", open: "7:00 AM", close: "6:00 PM" },
    { day: "Friday", open: "7:00 AM", close: "6:00 PM" },
    { day: "Saturday", open: "7:00 AM", close: "3:00 PM" },
    { day: "Sunday", open: null, close: null },
  ] as const,

  /** Confirmed via the AAA Approved Auto Repair directory. */
  aaa: {
    approved: true,
    memberBenefit: "AAA members get 10% off labor, up to $75",
  },

  /** Neighborhoods and towns within a realistic drive. Used on the service
   *  area section and in local SEO copy. */
  serviceArea: [
    "Arlington",
    "North Arlington",
    "Cherrydale",
    "Lyon Village",
    "Ballston",
    "Clarendon",
    "Rosslyn",
    "Falls Church",
    "McLean",
    "Washington, DC",
  ],

  /** Shown in the footer and on the About page. Protects him from reviews,
   *  complaints and phone calls meant for the DC shop with the same name. */
  disclaimer:
    "TAB Motors Arlington is an independently owned and operated repair shop at " +
    "4035 Old Dominion Dr, Arlington, VA. We are not affiliated with any similarly " +
    "named business at another location.",

  /** Confirmed by the owner: this is an official Virginia inspection station,
   *  so we can say so plainly rather than hedging. */
  officialInspectionStation: true,

  /**
   * Confirmed by the owner: 1 year, covering both parts and labor.
   *
   * This is a strong claim and worth stating in full wherever there's room.
   * Most independents offer 90 days, so a year on both is a genuine reason to
   * choose this shop over the one down the road.
   */
  warranty: {
    length: "1 year",
    label: "1-year warranty on parts and labor",
    short: "1-year warranty",
  },

  /**
   * In-shop financing. Spotted on the door in the shop photos and confirmed by
   * the owner.
   *
   * Worth surfacing: on a four-figure repair, "can I actually pay for this"
   * decides plenty of jobs. Deliberately worded so it never promises anyone
   * approval, because that isn't ours to promise.
   */
  financing: {
    available: true,
    /** Per the owner: advertise this only as "payment plans available".
     *  Do not name a provider or use the word "financing" anywhere public-facing. */
    blurb: "Payment plans available in the shop for larger repairs, including options for customers still building credit. Subject to approval.",
    short: "Payment plans available",
  },

  /**
   * STILL TO GATHER. Left empty on purpose — the components hide themselves
   * when a value is missing rather than inventing one. See PLAN.md section 8.
   */
  toConfirm: {
    /** e.g. 1998 */
    yearEstablished: null as number | null,
    /** e.g. ["English", "Spanish", "Urdu"] — a real advantage in Arlington. */
    languages: [] as string[],
    /** e.g. ["ASE Certified technicians"] */
    certifications: [] as string[],
    /** Waiting room, shuttle, loaner, after-hours key drop. */
    amenities: [] as string[],
    /** Official review link read from the verified Google profile, October 6, 2026. */
    googleReviewUrl: "https://g.page/r/CeUomxbux335EBM/review" as string | null,
  },
} as const;

export type Hours = (typeof site.hours)[number];

/** Compact hours for display: collapses identical consecutive days. */
export function formatHoursSummary(): { label: string; value: string }[] {
  const groups: { days: string[]; value: string }[] = [];

  for (const entry of site.hours) {
    const value = entry.open && entry.close ? `${entry.open} – ${entry.close}` : "Closed";
    const last = groups.at(-1);
    if (last && last.value === value) {
      last.days.push(entry.day);
    } else {
      groups.push({ days: [entry.day], value });
    }
  }

  return groups.map((group) => {
    const first = group.days[0].slice(0, 3);
    const last = group.days.at(-1)!.slice(0, 3);
    return {
      label: group.days.length > 1 ? `${first} – ${last}` : first,
      value: group.value,
    };
  });
}

/** schema.org opening hours, e.g. "Mo-Fr 08:00-17:00". */
export function openingHoursSpecification() {
  const dayCodes: Record<string, string> = {
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
    Sunday: "Sunday",
  };

  return site.hours
    .filter((entry) => entry.open && entry.close)
    .map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${dayCodes[entry.day]}`,
      opens: to24Hour(entry.open!),
      closes: to24Hour(entry.close!),
    }));
}

function to24Hour(time: string): string {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return time;
  const [, rawHour, minutes, meridiem] = match;
  let hour = Number(rawHour) % 12;
  if (meridiem.toUpperCase() === "PM") hour += 12;
  return `${String(hour).padStart(2, "0")}:${minutes}`;
}
