import type { LucideIcon } from "lucide-react";
import {
  BatteryCharging,
  CircleDot,
  ClipboardCheck,
  Cog,
  Disc3,
  Droplet,
  Gauge,
  Search,
  Snowflake,
  Thermometer,
  Waves,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";

/**
 * The canonical service list. Everything else derives from it: the services grid
 * on the home page, the /services hub, each /services/[slug] page, the sitemap,
 * and the checkboxes in the quote form. Add a service here and it appears
 * everywhere.
 *
 * Sourced from the shop's AAA Approved Auto Repair listing. Confirm with the
 * owner and delete anything he doesn't actually do. Publishing a service he
 * can't deliver is worse than omitting it.
 *
 * Deliberately NOT included: towing, roadside assistance, and detailing. The
 * shop does repair work only.
 */

export type Service = {
  slug: string;
  /** Used in navigation and as the page <h1>. */
  name: string;
  /** Shorter label for the quote form checkboxes. */
  formLabel: string;
  /** One line for the services grid. */
  blurb: string;
  /** Opening paragraph of the service page. */
  intro: string;
  /** What the job actually involves. */
  whatWeDo: string[];
  /**
   * Common customer symptoms. These are the words people actually type into
   * Google, which is exactly why they belong in the page copy.
   */
  symptoms: string[];
  icon: LucideIcon;
  /** Featured on the home page grid. */
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "virginia-state-inspection",
    name: "Virginia State Inspection & Emissions",
    formLabel: "Virginia state inspection or emissions",
    blurb: "Annual safety inspection and Northern Virginia emissions testing, done while you wait.",
    intro:
      "Virginia requires a safety inspection every year, and Arlington County requires an " +
      "emissions test every two years. We're an official Virginia inspection station, so both " +
      "happen here in one visit instead of two.",
    whatWeDo: [
      "Full annual Virginia safety inspection",
      "Northern Virginia emissions testing",
      "Tell you exactly what failed and what it takes to pass",
      "Fix failures on the spot where we can, so there's no second trip",
      "New sticker on the windshield before you leave",
    ],
    symptoms: [
      "Inspection sticker expiring this month",
      "Registration renewal needs an emissions test",
      "Just moved to Virginia and need the car inspected",
      "Already failed somewhere else",
    ],
    icon: ClipboardCheck,
    featured: true,
  },
  {
    slug: "brake-repair",
    name: "Brake Repair & Replacement",
    formLabel: "Brakes",
    blurb: "Pads, rotors, calipers, brake fluid and ABS faults, inspected and quoted before we touch anything.",
    intro:
      "Brakes are the one system where putting it off until next month isn't really an option. " +
      "We inspect the whole system, show you what we found, and quote it before anything comes apart.",
    whatWeDo: [
      "Measure pad thickness and rotor condition rather than guessing",
      "Pads, rotors, calipers, hoses and hardware",
      "Brake fluid flush and ABS fault diagnosis",
      "Parking brake adjustment",
      "Road test before we hand the keys back",
    ],
    symptoms: [
      "Squealing or grinding when stopping",
      "Brake pedal feels soft or goes to the floor",
      "Steering wheel shakes when braking",
      "Brake warning light is on",
    ],
    icon: Disc3,
    featured: true,
  },
  {
    slug: "check-engine-light-diagnostics",
    name: "Check Engine Light & Diagnostics",
    formLabel: "Check engine light / something's wrong, not sure what",
    blurb: "We read the codes, then actually diagnose the cause instead of guessing at parts.",
    intro:
      "A trouble code tells you which circuit noticed a problem, not what's wrong. Plenty of " +
      "shops read the code and start replacing the parts it names. We diagnose the cause first, " +
      "because the cheap version of this usually turns out to be the expensive one.",
    whatWeDo: [
      "Scan every module, not just the engine",
      "Live data and electrical testing to confirm the actual cause",
      "Explain in plain language what's failing and why",
      "Separate what's urgent from what can wait",
      "Clear the code and verify the repair held",
    ],
    symptoms: [
      "Check engine light is on or flashing",
      "Car runs rough, hesitates or stalls",
      "Failed an emissions test",
      "Strange noise and no idea what it is",
    ],
    icon: Gauge,
    featured: true,
  },
  {
    slug: "oil-change-maintenance",
    name: "Oil Change & Scheduled Maintenance",
    formLabel: "Oil change or scheduled maintenance",
    blurb: "Conventional and full synthetic oil changes, plus factory-scheduled service that keeps your warranty intact.",
    intro:
      "Conventional, synthetic blend and full synthetic, plus the factory-scheduled service " +
      "intervals that keep a manufacturer warranty valid. You don't have to use a dealer to " +
      "stay covered. You just need the work done to specification and documented.",
    whatWeDo: [
      "Oil and filter to your manufacturer's specification",
      "30k / 60k / 90k scheduled maintenance",
      "Fluid, filter, belt and hose check while it's on the lift",
      "Tire pressure and tread check",
      "Documented service records for your warranty",
    ],
    symptoms: [
      "Oil change due or maintenance light on",
      "30k / 60k / 90k mile service coming up",
      "Need service records kept up for the warranty",
      "Just bought a used car and want a baseline service",
    ],
    icon: Droplet,
    featured: true,
  },
  {
    slug: "ac-heating-repair",
    name: "A/C & Heating Repair",
    formLabel: "Air conditioning or heat",
    blurb: "Recharge, leak detection, compressors and blower motors, before the DC summer arrives.",
    intro:
      "A DC summer makes a weak A/C obvious fast. Most cars that \"just need a recharge\" are " +
      "actually leaking, and topping up the refrigerant without finding the leak means paying " +
      "for the same job twice.",
    whatWeDo: [
      "Find the leak before adding refrigerant",
      "Recharge to specification",
      "Compressors, condensers, evaporators and blower motors",
      "Heater cores, thermostats and cabin air filters",
      "Fix the fan that only works on some settings",
    ],
    symptoms: [
      "A/C blows warm air",
      "Heat doesn't work",
      "Musty smell from the vents",
      "Fan works on some settings only",
    ],
    icon: Snowflake,
    featured: true,
  },
  {
    slug: "hybrid-ev-service",
    name: "Hybrid & EV Service",
    formLabel: "Hybrid or electric vehicle service",
    blurb: "Independent service for hybrids and EVs: brakes, tires, suspension, diagnostics and cooling.",
    intro:
      "Hybrids and EVs still need brakes, tires, suspension, alignment, coolant and cabin " +
      "filters. What they don't need is dealer pricing for it. We service them as an " +
      "independent shop, which is rarer than it should be.",
    whatWeDo: [
      "Routine service for hybrids, plug-in hybrids and full EVs",
      "Brakes, tires, suspension and alignment",
      "Battery cooling systems and cabin filters",
      "Diagnostics on hybrid and EV system warnings",
      "Tesla, Rivian, Lucid, Toyota, Honda, Hyundai, Kia and more",
    ],
    symptoms: [
      "Hybrid or EV needs routine service without dealer prices",
      "Warning light on a hybrid system",
      "Reduced range or a charging complaint",
      "Dealer quoted more than the job seems worth",
    ],
    icon: Zap,
    featured: true,
  },
  {
    slug: "engine-repair",
    name: "Engine Repair & Replacement",
    formLabel: "Engine repair",
    blurb: "From timing belts and gaskets to full engine replacement, with the diagnosis explained first.",
    intro:
      "Engine work is where an honest diagnosis matters most, because the gap between a repair " +
      "and a replacement is thousands of dollars. We'll tell you which one you're actually " +
      "looking at, and show you how we got there.",
    whatWeDo: [
      "Timing belts and chains, gaskets and seals",
      "Oil and coolant leak diagnosis and repair",
      "Compression and leak-down testing",
      "Head gasket work",
      "Full engine replacement when it's genuinely the better option",
    ],
    symptoms: [
      "Engine knocking or ticking",
      "Losing oil or coolant",
      "Smoke from the exhaust",
      "Engine won't start or won't turn over",
    ],
    icon: Cog,
  },
  {
    slug: "transmission-repair",
    name: "Transmission Repair",
    formLabel: "Transmission",
    blurb: "Automatic and manual transmission service, clutches and driveline work.",
    intro:
      "Slipping, hard shifts and a clunk going into gear are all worth looking at early. " +
      "Transmission problems very rarely get cheaper by waiting.",
    whatWeDo: [
      "Automatic and manual transmission diagnosis",
      "Fluid and filter service to specification",
      "Clutch replacement",
      "Driveline, CV joints and axles",
      "Leak diagnosis and repair",
    ],
    symptoms: [
      "Slipping or hard shifting",
      "Clunk when going into gear",
      "Clutch pedal feels wrong",
      "Red or brown fluid leaking underneath",
    ],
    icon: Wrench,
  },
  {
    slug: "electrical-battery",
    name: "Electrical & Battery Service",
    formLabel: "Battery, starter, alternator or electrical",
    blurb: "Batteries, starters, alternators, and the electrical gremlins other shops give up on.",
    intro:
      "Electrical faults are the ones other shops hand back. Intermittent problems need " +
      "patience and proper testing rather than swapping parts until the symptom disappears.",
    whatWeDo: [
      "Batteries, starters and alternators",
      "Charging system and parasitic draw testing",
      "Wiring, fuses, relays and ground faults",
      "Power windows, locks and lighting",
      "Diagnose the car that keeps killing batteries",
    ],
    symptoms: [
      "Car won't start, or just clicks",
      "Battery keeps dying",
      "Lights or windows stopped working",
      "Battery or charging warning light on",
    ],
    icon: BatteryCharging,
  },
  {
    slug: "steering-suspension",
    name: "Steering & Suspension",
    formLabel: "Steering, suspension or alignment",
    blurb: "Shocks, struts, ball joints, power steering and alignment, for streets that aren't getting smoother.",
    intro:
      "Arlington roads are not getting smoother. Worn suspension usually shows up as uneven " +
      "tire wear and a car that wanders, well before it starts making noise.",
    whatWeDo: [
      "Shocks, struts, springs and mounts",
      "Ball joints, tie rods, bushings and control arms",
      "Power steering pumps, racks and leaks",
      "Wheel alignment",
      "Track down the clunk over bumps",
    ],
    symptoms: [
      "Car pulls to one side",
      "Bouncy or clunky over bumps",
      "Uneven tire wear",
      "Steering feels loose or heavy",
    ],
    icon: Waves,
  },
  {
    slug: "cooling-radiator",
    name: "Cooling System & Radiator",
    formLabel: "Overheating, radiator or coolant",
    blurb: "Radiators, water pumps, thermostats, hoses and coolant leaks.",
    intro:
      "Overheating goes from an inconvenience to a ruined engine quickly. A sweet coolant " +
      "smell or a puddle under the car is worth a same-week appointment, not a wait-and-see.",
    whatWeDo: [
      "Radiators, water pumps, thermostats and hoses",
      "Pressure test to find the leak",
      "Coolant flush and refill to specification",
      "Cooling fans and temperature sensors",
      "Head gasket testing when the symptoms point that way",
    ],
    symptoms: [
      "Temperature gauge running hot",
      "Coolant puddle under the car",
      "Sweet smell or steam from the hood",
      "Heater blows cold",
    ],
    icon: Thermometer,
  },
  {
    slug: "exhaust-muffler",
    name: "Muffler & Exhaust",
    formLabel: "Exhaust or muffler",
    blurb: "Mufflers, pipes, catalytic converters and exhaust leaks. Quieter, and legal for inspection.",
    intro:
      "A car that suddenly got loud is usually a car with an exhaust leak. Beyond the noise, a " +
      "leak can fail you on inspection and put fumes in the cabin, so it's not one to live with.",
    whatWeDo: [
      "Mufflers, pipes, flanges and hangers",
      "Catalytic converters",
      "Exhaust leak and rattle diagnosis",
      "Weld repairs where they make sense instead of full replacement",
      "Get you through emissions",
    ],
    symptoms: [
      "Car got noticeably louder",
      "Rattle from underneath",
      "Exhaust smell inside the cabin",
      "Failed inspection on emissions",
    ],
    icon: Wind,
  },
  {
    slug: "tires-wheels",
    name: "Tires & Wheel Service",
    formLabel: "Tires or wheels",
    blurb: "Rotation, balancing, flat repair, TPMS sensors and new tire installation.",
    intro:
      "Rotation, balancing, flat repair and new tires. Also the tire pressure light that won't " +
      "go out, which more often than not is a dead sensor rather than a soft tire.",
    whatWeDo: [
      "New tire supply and installation",
      "Rotation and computer balancing",
      "Flat and puncture repair where the tire is safe to repair",
      "TPMS sensor diagnosis and replacement",
      "An honest answer on how much life is left",
    ],
    symptoms: [
      "Flat or a slow leak",
      "Tire pressure light won't go off",
      "Vibration at highway speed",
      "Tires are worn and need replacing",
    ],
    icon: CircleDot,
  },
  {
    slug: "pre-purchase-inspection",
    name: "Pre-Purchase Inspection",
    formLabel: "Pre-purchase inspection (used car I'm buying)",
    blurb: "Thinking of buying a used car? We'll put it on the lift and tell you what it really needs.",
    intro:
      "An hour of our time before you buy a used car is the cheapest money on this entire " +
      "page. We put it on the lift and tell you what it actually needs, including what it's " +
      "likely to cost you over the next year.",
    whatWeDo: [
      "Full inspection on the lift, not a walk-around",
      "Frame, rust and accident-damage check",
      "Engine, transmission, brakes and suspension condition",
      "Scan for stored fault codes a seller may have cleared",
      "A written list of what it needs, with our estimate",
    ],
    symptoms: [
      "About to buy a used car",
      "Private sale you want checked first",
      "Want to know what a car will cost to run",
      "Dealer says it's been inspected already",
    ],
    icon: Search,
  },
];

export const featuredServices = services.filter((service) => service.featured);

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** Everything except the given slug, for the "other services" section. */
export function otherServices(slug: string, limit = 6): Service[] {
  return services.filter((service) => service.slug !== slug).slice(0, limit);
}

/**
 * Options for the quote form. "Something else" isn't a real service page, but it
 * matters: plenty of people genuinely don't know what's wrong, and forcing them
 * to pick a category is a good way to lose the lead.
 */
export const quoteServiceOptions: { value: string; label: string }[] = [
  ...services.map((service) => ({ value: service.slug, label: service.formLabel })),
  { value: "other", label: "Something else" },
];

const validServiceValues = new Set(quoteServiceOptions.map((option) => option.value));

export function isValidServiceValue(value: string): boolean {
  return validServiceValues.has(value);
}

/** Turns stored slugs back into readable labels for the admin dashboard. */
export function serviceLabel(value: string): string {
  return quoteServiceOptions.find((option) => option.value === value)?.label ?? value;
}
