import type { LucideIcon } from "lucide-react";
import { BatteryCharging, CircleDot, ClipboardCheck, Cog, Disc3, Droplet, Gauge, Search, Snowflake, Waves, Wind, Wrench, Zap } from "lucide-react";

/** Auto-generated from our SEO content build. Do not hand-edit slugs, H1s,
 *  metadata or body copy — that is the SEO work we are preserving. */
export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  /** Short label for cards, nav and grids. */
  name: string;
  /** Our SEO H1 headline for the service page. */
  h1: string;
  navLabel: string;
  formLabel: string;
  blurb: string;
  heroText: string;
  metaTitle: string;
  metaDescription: string;
  features: string[];
  faq: Faq[];
  /** 1 = Inspections & Maintenance, 2 = Repairs & Diagnostics, 3 = Tires & Fleet */
  group: number;
  featured: boolean;
  icon: LucideIcon;
  /** Our SEO body copy (educational article, HTML). */
  bodyHtml: string;
};

export const serviceGroups: Record<number, string> = {
  1: "Inspections & Maintenance",
  2: "Repairs & Diagnostics",
  3: "Tires & Fleet",
};

export const services: Service[] = [
  {
    slug: "virginia-state-inspection",
    name: "VA State Inspection",
    h1: "Virginia State Safety Inspection in Arlington",
    navLabel: "VA State Inspection",
    formLabel: "VA State Inspection",
    blurb: "Your Virginia State Safety Inspection, done right the first time.",
    heroText: "Your Virginia State Safety Inspection, done right the first time. TAB Motors is an official inspection station on Langston Blvd in Arlington, most cars are in and out the same day.",
    metaTitle: "Virginia State Inspection in Arlington, VA | TAB Motors Exxon",
    metaDescription: "Official Virginia State Safety Inspection in Arlington, VA at TAB Motors | Exxon on Old Dominion Dr. Fast, honest, while-you-wait. Call (703) 243-3080.",
    features: ["Official VA inspection station", "Honest pass/fail, no scare tactics", "While-you-wait, most vehicles"],
    faq: [{"q": "How long does a Virginia state inspection take?", "a": "Most passenger vehicles are done while you wait, typically under an hour when we're not backed up. Call ahead at (703) 243-3080 and we'll tell you the best time to come in."}, {"q": "How much is a Virginia safety inspection?", "a": "Virginia sets the maximum inspection fee, so it's a small, fixed cost. We charge the standard state rate, call for the current amount."}, {"q": "What happens if my car fails inspection?", "a": "You get a rejection sticker and 15 days to repair the failed items. We'll show you exactly what failed and can usually fix it the same day so you leave with a passing sticker."}, {"q": "Do I need an appointment?", "a": "Walk-ins are welcome for inspections, but calling ahead means less waiting. Mornings are usually the quickest."}, {"q": "Do you do emissions inspection too?", "a": "Yes. Arlington is in the Northern Virginia emissions region, and we handle both the safety inspection and the emissions test in one visit."}],
    group: 1,
    featured: true,
    icon: ClipboardCheck,
    bodyHtml: "<p>Every vehicle registered in Virginia needs a valid <strong>state safety inspection</strong> sticker, and TAB Motors on Langston Blvd is an official inspection station right here in Arlington. Our certified inspectors run the full Virginia State Police checklist, brakes, steering and suspension, tires, lights, wipers, horn, mirrors, seat belts, and exhaust, and give you a straight answer on what passes and what doesn't.</p>\n<h2>What a Virginia safety inspection covers</h2>\n<p>The inspection is about one thing: is the car safe to be on the road. Our technicians check the items the Commonwealth requires and document each one:</p>\n<ul>\n<li>Brake pads, rotors, lines and parking brake operation</li>\n<li>Steering, ball joints, tie rods and suspension play</li>\n<li>Tire tread depth, sidewall condition and matching</li>\n<li>Headlights, brake lights, turn signals and markers</li>\n<li>Wipers, washer, horn, mirrors and windshield condition</li>\n<li>Seat belts, fuel system integrity and exhaust security</li>\n</ul>\n<h2>Honest results, no manufactured failures</h2>\n<p>Plenty of Arlington drivers worry an inspection is a sales pitch in disguise. It isn't here. If your car passes, you get the sticker and you're on your way. If something fails, we show you the actual worn or broken part, explain why it's a safety issue, and give you an upfront price to fix it, you're never pressured, and you're free to take the repair elsewhere. That \"honest diagnostics, quality work, and fair pricing\" is exactly what our reviews keep pointing to.</p>\n<h2>Inspection + repair in one stop</h2>\n<p>Because we're a full-service shop, anything that fails inspection can usually be corrected the same day, a <a href=\"/services/brake-repair\">brake repair</a>, a <a href=\"/services/suspension-steering\">suspension or steering</a> part, a burned-out bulb, or a fresh set of <a href=\"/services/tire-wheel-service\">tires</a>. You don't have to drive to a second shop and come back. Need your emissions done too? We handle <a href=\"/services/virginia-emissions-inspection\">Virginia emissions inspection</a> as well, so both requirements are covered in one visit.</p>\n<h2>When is my sticker due?</h2>\n<p>Your Virginia inspection sticker shows the month it expires in the center and the year around the edge; it's due by the end of that month. Driving on an expired sticker is a ticketable offense in Arlington and across Northern Virginia, so if yours is close, swing by or call (703) 243-3080 and we'll get you in.</p>",
  },
  {
    slug: "virginia-emissions-inspection",
    name: "Emissions Inspection",
    h1: "Virginia Emissions Inspection in Arlington",
    navLabel: "Emissions Inspection",
    formLabel: "Emissions Inspection",
    blurb: "Arlington sits in the Northern Virginia emissions region, so most vehicles need an emissions test to renew registration.",
    heroText: "Arlington sits in the Northern Virginia emissions region, so most vehicles need an emissions test to renew registration. TAB Motors handles it quickly and honestly on Langston Blvd.",
    metaTitle: "Virginia Emissions Inspection in Arlington, VA | TAB Motors Exxon",
    metaDescription: "Northern Virginia emissions test in Arlington at TAB Motors | Exxon. Fast OBD emissions inspection, honest results, same-day repairs. Call (703) 243-3080.",
    features: ["Northern VA emissions testing", "OBD & tailpipe as required", "Fix-and-retest under one roof"],
    faq: [{"q": "Does my car need a Virginia emissions test?", "a": "Most gas vehicles 1996 and newer registered in Arlington and the Northern Virginia region need an emissions test every two years. Brand-new cars (first four model years) and some others are exempt. Call (703) 243-3080 if you're unsure."}, {"q": "My check engine light is on, will I fail emissions?", "a": "Almost certainly, yes. An illuminated check engine light is an automatic emissions failure. Bring it in and we'll diagnose the cause and fix it so you can pass."}, {"q": "How long does the emissions test take?", "a": "The test itself is quick. If your car passes, you're in and out. If it fails, we'll walk you through the repair options right away."}, {"q": "Can you fix my car if it fails and then re-test it?", "a": "Yes, that's the advantage of testing at a full-service shop. We diagnose, repair, and re-run the test without sending you elsewhere."}, {"q": "Do I need emissions AND a safety inspection?", "a": "In Arlington, yes. We can do both in the same visit to save you time."}],
    group: 1,
    featured: false,
    icon: Search,
    bodyHtml: "<p>If you live in Arlington, Fairfax, Alexandria or most of Northern Virginia, your vehicle is part of the Commonwealth's <strong>emissions inspection program</strong> and needs to pass an emissions test every two years to renew its registration. TAB Motors | Exxon is set up to run that test right here on Langston Blvd and get you back on the road fast.</p>\n<h2>How the Virginia emissions test works</h2>\n<p>Most vehicles from 1996 and newer get an OBD (on-board diagnostics) emissions check, we plug into your car's computer and confirm the emissions systems are working and that there are no active fault codes. Older or specialty vehicles may get a tailpipe-style test instead. Either way, the goal is the same: making sure your car isn't polluting more than it should.</p>\n<h2>Why cars fail emissions, and how we fix it</h2>\n<p>The most common reason a car fails is a <strong>check engine light</strong> or a \"not ready\" monitor status. That's rarely a mystery to us, our technicians run full <a href=\"/services/engine-diagnostics\">engine diagnostics</a>, find the real cause (a bad oxygen sensor, a loose gas cap, a failing catalytic converter, a misfire), and repair it. Because we're a complete repair shop, we can fix the failure and re-test without sending you across town.</p>\n<ul>\n<li>Check engine light on or recent battery disconnect (\"not ready\")</li>\n<li>Failing oxygen (O2) sensor or air-fuel ratio sensor</li>\n<li>Catalytic converter efficiency below threshold</li>\n<li>Evaporative (EVAP) leaks, often just the gas cap</li>\n<li>Engine misfire from worn spark plugs or coils</li>\n</ul>\n<h2>Emissions + safety inspection together</h2>\n<p>Virginia requires both a <a href=\"/services/virginia-state-inspection\">safety inspection</a> and, in our region, an emissions test. Doing them together at TAB Motors saves you a second trip. Come in, get both handled, and if anything needs attention we'll give you an upfront price before touching a thing.</p>",
  },
  {
    slug: "oil-change",
    name: "Oil Change",
    h1: "Oil Change in Arlington, VA",
    navLabel: "Oil Change",
    formLabel: "Oil Change",
    blurb: "A clean, honest oil change from a shop that isn't trying to upsell you.",
    heroText: "A clean, honest oil change from a shop that isn't trying to upsell you. Conventional, synthetic blend, or full synthetic, with a fresh filter and a look-over every time.",
    metaTitle: "Oil Change in Arlington, VA | Full Synthetic | TAB Motors Exxon",
    metaDescription: "Fast, fair oil change in Arlington, VA at TAB Motors | Exxon on Old Dominion Dr. Conventional, synthetic blend or full synthetic. Call (703) 243-3080.",
    features: ["Conventional, blend or full synthetic", "New filter & fluid top-off", "Free multi-point look-over"],
    faq: [{"q": "How much does an oil change cost?", "a": "It depends on your engine's oil capacity and whether you need conventional, blend, or full synthetic. Call (703) 243-3080 with your year, make and model for an upfront price."}, {"q": "How long does an oil change take?", "a": "Usually about 30 minutes when you have an appointment. It's a great one to pair with your inspection or a tire rotation."}, {"q": "Do I really need full synthetic?", "a": "If your manufacturer specifies it, many turbocharged and newer engines do, then yes. For older engines a blend may be fine. We'll tell you honestly what your car actually needs."}, {"q": "Can you reset my oil-life light?", "a": "Yes, we reset the oil-life monitor as part of the service."}, {"q": "Should I get my oil changed before a road trip?", "a": "If you're within about 1,000 miles of due, yes, fresh oil before a long highway drive is cheap insurance."}],
    group: 1,
    featured: true,
    icon: Droplet,
    bodyHtml: "<p>The oil change is the single most important thing you can do to keep an engine alive, and at TAB Motors we treat it that way, not as a loss-leader to bait you into a list of add-ons. Our technicians drain the old oil, replace the filter, refill to your manufacturer's exact spec, and top off the fluids that need it. One of our regulars put it simply: \"fast, fair pricing, and I could feel the difference.\"</p>\n<h2>The right oil for your car</h2>\n<p>We stock conventional, synthetic blend, and full synthetic in the common grades and match what your owner's manual calls for. For most late-model cars in the DC area, lots of stop-and-go on I-66, GW Parkway and Route 50, full synthetic is the smart choice: it holds up to heat and short-trip driving far better and protects the turbochargers that are now on so many engines.</p>\n<h2>What's included every time</h2>\n<ul>\n<li>Drain old oil and replace with the correct grade and quantity</li>\n<li>Install a new quality oil filter</li>\n<li>Top off washer fluid, coolant and other reservoirs as needed</li>\n<li>Check tire pressures and set to spec</li>\n<li>Quick multi-point look-over, belts, hoses, brakes, fluids</li>\n<li>Reset the oil-life monitor where applicable</li>\n</ul>\n<h2>The look-over that catches problems early</h2>\n<p>While your car is up, our technicians glance at the things that strand people: a cracking serpentine belt, a weeping <a href=\"/services/cooling-ac-service\">coolant hose</a>, thin <a href=\"/services/brake-repair\">brake pads</a>, a battery on its last legs. We tell you what we see and what can wait, no pressure to fix anything today. That's the \"honest recommendations\" our customers mention again and again.</p>\n<h2>How often should you change your oil?</h2>\n<p>On full synthetic, most vehicles go 5,000–7,500 miles between changes; conventional oil is closer to 3,000–5,000. Heavy short-trip city driving, towing, and lots of idling shorten that interval. We log your mileage and oil type so your next service is right on schedule.</p>",
  },
  {
    slug: "fuel-system-service",
    name: "Fuel System Service",
    h1: "Fuel System Service in Arlington",
    navLabel: "Fuel System Service",
    formLabel: "Fuel System Service",
    blurb: "Rough idle, hesitation, or falling gas mileage?",
    heroText: "Rough idle, hesitation, or falling gas mileage? A proper fuel system service cleans the injectors, intake and combustion chambers so the engine runs the way it should.",
    metaTitle: "Fuel System Service in Arlington, VA | TAB Motors Exxon",
    metaDescription: "Fuel system and injection cleaning service in Arlington, VA at TAB Motors | Exxon. Restore power, smooth idle and MPG. Call (703) 243-3080.",
    features: ["Injector & intake cleaning", "Smoother idle, better MPG", "Restores lost power"],
    faq: [{"q": "How often should I get a fuel system service?", "a": "Roughly every 30,000 miles is a good guideline, or sooner if you're feeling rough idle, hesitation, or dropping fuel economy."}, {"q": "Will this really improve my gas mileage?", "a": "When deposits are the cause of lost MPG, yes, a clean fuel system lets the engine burn fuel efficiently again. We'll be honest if we think something else is going on."}, {"q": "Is fuel injector cleaner from the store the same thing?", "a": "A bottle in the tank helps a little for maintenance, but it can't match a professional service that cleans the injectors, intake and combustion chambers directly."}, {"q": "My check engine light is on, could it be the fuel system?", "a": "It can be. We'll scan the codes and diagnose the real cause before recommending a service."}],
    group: 1,
    featured: false,
    icon: Droplet,
    bodyHtml: "<p>Over tens of thousands of miles, carbon and varnish build up on fuel injectors, intake valves and throttle bodies. The result creeps up slowly, a rougher idle, a little hesitation off the line, a drop in fuel economy you blame on the gas. A professional <strong>fuel system service</strong> at TAB Motors clears that build-up and brings the engine back. As one customer told us after his service: \"I could actually feel the difference.\"</p>\n<h2>What a fuel system service does</h2>\n<ul>\n<li>Cleans fuel injectors so they spray in a fine, even pattern</li>\n<li>Clears carbon from the throttle body and intake</li>\n<li>Removes combustion-chamber deposits that cause knock</li>\n<li>Restores smooth idle, crisp throttle response and MPG</li>\n<li>Helps direct-injection engines that are prone to valve carbon</li>\n</ul>\n<h2>Signs your fuel system needs attention</h2>\n<p>If you're noticing a rough or surging idle, hesitation when you accelerate, harder cold starts, or a check engine light for a lean condition or misfire, the fuel system is a common culprit. We'll confirm with <a href=\"/services/engine-diagnostics\">engine diagnostics</a> before recommending anything, so you're only paying for a service you actually need.</p>\n<h2>Part of smart maintenance</h2>\n<p>A fuel system service pairs naturally with an <a href=\"/services/oil-change\">oil change</a> and a <a href=\"/services/timing-belt-ignition\">tune-up</a> with fresh spark plugs. Together they keep a higher-mileage engine running clean and efficient, often for far less than people expect.</p>",
  },
  {
    slug: "brake-repair",
    name: "Brake Repair",
    h1: "Brake Repair in Arlington, VA",
    navLabel: "Brake Repair",
    formLabel: "Brake Repair",
    blurb: "Squealing, grinding, or a soft pedal?",
    heroText: "Squealing, grinding, or a soft pedal? Our technicians handle pads, rotors, calipers and fluid, and we show you the worn parts before we replace anything.",
    metaTitle: "Brake Repair in Arlington, VA | Pads & Rotors | TAB Motors Exxon",
    metaDescription: "Brake repair in Arlington, VA at TAB Motors | Exxon, pads, rotors, calipers and brake fluid. Free brake inspection, honest pricing. Call (703) 243-3080.",
    features: ["Free brake inspection", "Pads, rotors, calipers & fluid", "We show you the worn parts"],
    faq: [{"q": "Is the brake inspection really free?", "a": "Yes. We'll inspect your brakes and give you an honest assessment at no charge. If they're fine, we'll tell you."}, {"q": "How much does a brake job cost?", "a": "It depends on your vehicle and whether you need pads only or pads and rotors. We give you an upfront price after the free inspection, no surprises."}, {"q": "Can I just replace the pads and keep my rotors?", "a": "Sometimes, if the rotors are within spec and not warped. We measure them and tell you honestly whether they can be reused or resurfaced."}, {"q": "How long does a brake job take?", "a": "Most pad-and-rotor jobs are done the same day. Call ahead at (703) 243-3080 so we have the right parts ready."}, {"q": "My car pulls or vibrates when braking, what is that?", "a": "Usually warped rotors or uneven pad wear. Bring it in and we'll pinpoint it during the free inspection."}],
    group: 2,
    featured: true,
    icon: Disc3,
    bodyHtml: "<p>Brakes are the one system you never gamble on. At TAB Motors we start every brake job with a <strong>free brake inspection</strong>, we pull the wheels, measure pad thickness, check the rotors for scoring and warping, and look at the calipers, hoses and fluid. Then we show you what we found before recommending a single part. That transparency is why Arlington drivers keep coming back for \"honest diagnostics, quality work, and fair pricing.\"</p>\n<h2>Complete brake service</h2>\n<ul>\n<li>Front and rear brake pad replacement</li>\n<li>Rotor resurfacing or replacement</li>\n<li>Caliper service and replacement</li>\n<li>Brake fluid flush and bleed</li>\n<li>Brake line and hose inspection and repair</li>\n<li>Parking brake adjustment</li>\n</ul>\n<h2>Signs it's time for brakes</h2>\n<p>Don't wait for the grind. Come in if you notice a high-pitched squeal that comes and goes, a grinding sound (that's metal on metal, rotor damage territory), a brake pedal that feels soft or pulses, a longer stopping distance, or a vibration in the wheel when you slow down. Catching worn pads early usually saves the rotors, which keeps the repair smaller and cheaper.</p>\n<h2>Quality parts, fair price</h2>\n<p>We install quality pads and rotors matched to your vehicle and how you drive, daily commuter, family SUV, or something that sees the highway hard. Brakes often fail a <a href=\"/services/virginia-state-inspection\">Virginia safety inspection</a>, so if yours are marginal we can handle both at once and send you out with a fresh sticker and a firm pedal.</p>",
  },
  {
    slug: "engine-diagnostics",
    name: "Engine Diagnostics",
    h1: "Engine Diagnostics & Check Engine Light",
    navLabel: "Engine Diagnostics",
    formLabel: "Engine Diagnostics",
    blurb: "A check engine light isn't a mystery to us.",
    heroText: "A check engine light isn't a mystery to us. Our technicians read the codes, then actually diagnose the cause, so you fix the real problem, not a guess.",
    metaTitle: "Engine Diagnostics in Arlington, VA | Check Engine Light | TAB Motors",
    metaDescription: "Check engine light diagnostics in Arlington, VA at TAB Motors | Exxon. Real diagnosis, not guesswork, for all makes. Call (703) 243-3080.",
    features: ["Real diagnosis, not part-swapping", "All makes, foreign & domestic", "Clear explanation before any repair"],
    faq: [{"q": "Why is my check engine light on?", "a": "It could be anything from a loose gas cap to a failing sensor or misfire. The only way to know is to diagnose it properly, which is exactly what we do."}, {"q": "Do you charge for a diagnostic?", "a": "There's a diagnostic fee that covers the time to actually find the fault (not just read a code). If you have us do the repair, we'll tell you upfront how that's handled. Call (703) 243-3080."}, {"q": "Is it safe to drive with the check engine light on?", "a": "If the light is steady and the car drives normally, usually short-term yes, but get it checked soon. A flashing light means stop driving; that's an active misfire that can damage the catalytic converter."}, {"q": "Can you diagnose foreign cars?", "a": "Yes, we work on foreign and domestic vehicles, including European makes. One of our technicians is a master on BMWs."}, {"q": "Will a diagnostic help me pass emissions?", "a": "Yes. If your car failed or has a warning light, we diagnose the cause so the repair gets you a pass."}],
    group: 2,
    featured: true,
    icon: Gauge,
    bodyHtml: "<p>A glowing check engine light sends most people straight to worry. At TAB Motors it's just the starting point. Reading a trouble code is easy, anyone with a $20 scanner can do it. The skill is in <strong>diagnosis</strong>: knowing that a \"P0420\" might be a catalytic converter, but might just as easily be an upstream oxygen sensor or an exhaust leak. Our technicians test to find the actual cause so you're not paying to replace parts that were never bad.</p>\n<h2>What we diagnose</h2>\n<ul>\n<li>Check engine, ABS, airbag and warning lights</li>\n<li>Misfires, rough idle and stalling</li>\n<li>Emissions failures and \"not ready\" monitors</li>\n<li>Electrical gremlins, no-starts, dead accessories, parasitic drains</li>\n<li>Overheating, poor fuel economy and loss of power</li>\n<li>Noises, vibrations and drivability complaints</li>\n</ul>\n<h2>Honest diagnosis saves money</h2>\n<p>One Arlington customer came to us after a dealer quoted \"thousands of dollars\" for an electrical problem, our technician Jose found the real fault quickly and fixed it for a fraction of the price. That's the whole point of a proper diagnosis: it protects you from the shotgun approach of throwing parts at a problem until something works.</p>\n<h2>From light to fix, in one shop</h2>\n<p>Once we know what's wrong, we give you an upfront price and, in most cases, fix it the same day, whether that's a sensor, an ignition <a href=\"/services/timing-belt-ignition\">coil or spark plug</a>, a <a href=\"/services/cooling-ac-service\">cooling</a> component, or a <a href=\"/services/fuel-system-service\">fuel system</a> repair. If the light was standing between you and passing <a href=\"/services/virginia-emissions-inspection\">emissions</a>, we'll clear that path too.</p>",
  },
  {
    slug: "battery-alternator-starter",
    name: "Battery, Alternator & Starter",
    h1: "Battery, Alternator & Starter Service",
    navLabel: "Battery, Alternator & Starter",
    formLabel: "Battery & Charging",
    blurb: "Slow crank, dashboard flicker, or a no-start?",
    heroText: "Slow crank, dashboard flicker, or a no-start? We test the whole charging system, battery, alternator and starter, and replace what's actually failing.",
    metaTitle: "Battery, Alternator & Starter Repair in Arlington, VA | TAB Motors",
    metaDescription: "Battery, alternator and starter service in Arlington, VA at TAB Motors | Exxon. Free battery test, same-day replacement. Call (703) 243-3080.",
    features: ["Free battery & charging test", "Same-day replacement", "We test before we replace"],
    faq: [{"q": "Is my problem the battery or the alternator?", "a": "That's exactly what our free test tells us. A battery that keeps dying after a jump often points to a failing alternator, we confirm it before replacing anything."}, {"q": "How long do car batteries last around here?", "a": "In the DC-area climate, usually 3–4 years. If yours is older and cranking slowly, have it tested."}, {"q": "Can you replace my battery the same day?", "a": "Yes, we stock common batteries and can usually swap it on the spot after testing."}, {"q": "My car clicks but won't start, what is that?", "a": "A rapid clicking is often a dead battery or bad connection; a single click can be the starter. We'll test to be sure."}, {"q": "Do you check the charging system, not just the battery?", "a": "Always. Replacing a battery without checking the alternator is how people end up stranded twice."}],
    group: 2,
    featured: false,
    icon: BatteryCharging,
    bodyHtml: "<p>Nothing ruins a morning like a car that won't start. The cause is almost always one of three things, the <strong>battery</strong>, the <strong>alternator</strong>, or the <strong>starter</strong>, and telling them apart takes a proper test, not a guess. TAB Motors tests the whole system for free, so you replace the part that's actually dead instead of the one someone guessed at.</p>\n<h2>How we find the real culprit</h2>\n<ul>\n<li>Load-test the battery to see if it still holds a charge</li>\n<li>Test alternator output to confirm it's charging correctly</li>\n<li>Check the starter draw and connections on a no-start</li>\n<li>Inspect terminals, grounds and cables for corrosion</li>\n<li>Scan for charging-system fault codes</li>\n</ul>\n<h2>Virginia weather is hard on batteries</h2>\n<p>Between humid DC summers and cold winter mornings, car batteries around Arlington rarely make it much past three or four years. Heat cooks the internals; cold hides a weak battery until the one morning it won't turn over. If yours is on the older side or you've noticed a slow crank, a quick test now beats a jump-start in a parking lot later.</p>\n<h2>Same-day fix</h2>\n<p>We stock quality batteries and can replace an alternator or starter the same day on most vehicles. A weak battery can also throw off <a href=\"/services/engine-diagnostics\">electronics and warning lights</a> and even affect an <a href=\"/services/virginia-emissions-inspection\">emissions \"readiness\" check</a>, so it's worth handling before it snowballs.</p>",
  },
  {
    slug: "suspension-steering",
    name: "Suspension & Steering",
    h1: "Suspension & Steering Repair",
    navLabel: "Suspension & Steering",
    formLabel: "Suspension & Steering",
    blurb: "Clunks over bumps, a wandering wheel, or uneven tire wear?",
    heroText: "Clunks over bumps, a wandering wheel, or uneven tire wear? We handle struts, shocks, control arms, tie rods and alignment so your car tracks straight and rides smooth.",
    metaTitle: "Suspension & Steering Repair in Arlington, VA | TAB Motors Exxon",
    metaDescription: "Suspension and steering repair in Arlington, VA at TAB Motors | Exxon, struts, shocks, control arms, tie rods and alignment. Call (703) 243-3080.",
    features: ["Struts, shocks & control arms", "Tie rods, ball joints & bushings", "Alignment to restore straight tracking"],
    faq: [{"q": "Why does my car clunk over bumps?", "a": "Usually worn struts, sway bar links, or control arm bushings. We'll pinpoint which one on a lift."}, {"q": "My steering wheel isn't centered / the car pulls, do I need an alignment?", "a": "Very likely. A pull or off-center wheel points to alignment, though we'll also check for a worn part causing it first."}, {"q": "Can worn suspension fail Virginia inspection?", "a": "Yes. Excessive play in ball joints, tie rods or steering components is a safety failure. We can inspect and repair in one visit."}, {"q": "How do I know if I need shocks or struts?", "a": "Bouncing after bumps, nose-diving when braking, or cupped tire wear are classic signs. We'll confirm before recommending replacement."}, {"q": "Will fixing this stop my tires wearing out?", "a": "If bad alignment or a worn part is eating your tires, yes, that's exactly why we align after suspension work."}],
    group: 2,
    featured: false,
    icon: Waves,
    bodyHtml: "<p>Arlington's roads, potholes on the side streets, expansion joints on 66, the odd curb in a tight garage, are tough on suspension and steering parts. When those parts wear, you feel it: a clunk over bumps, a steering wheel that won't settle, a pull to one side, or tires wearing out on one edge. TAB Motors diagnoses and repairs the whole front and rear end so the car drives tight and safe again.</p>\n<h2>What we repair</h2>\n<ul>\n<li>Struts and shock absorbers</li>\n<li>Control arms, ball joints and bushings</li>\n<li>Tie rod ends and inner tie rods</li>\n<li>Sway bar links and bushings</li>\n<li>Wheel bearings and hub assemblies</li>\n<li>Power steering pumps, racks and hoses</li>\n<li>Wheel alignment</li>\n</ul>\n<h2>Why it matters for inspection and tires</h2>\n<p>Worn steering and suspension parts are a common <a href=\"/services/virginia-state-inspection\">Virginia safety inspection</a> failure, a loose tie rod or ball joint won't pass, and for good reason. They also chew through <a href=\"/services/tire-wheel-service\">tires</a> by throwing off your alignment. Fixing the worn part and setting a proper alignment protects the expensive tires you just bought.</p>\n<h2>A smooth, straight ride</h2>\n<p>After a suspension repair and alignment, the difference is immediate, the wheel is centered, the car stops darting, the ride settles, and one customer's exact words fit: the car \"feels a lot better now.\" We'll show you the worn components so you know why the repair was needed.</p>",
  },
  {
    slug: "cooling-ac-service",
    name: "Cooling System & AC",
    h1: "Cooling System & AC Service",
    navLabel: "Cooling System & AC",
    formLabel: "Cooling & AC",
    blurb: "Overheating in traffic or an AC that only blows warm?",
    heroText: "Overheating in traffic or an AC that only blows warm? We service radiators, water pumps, thermostats and the full air-conditioning system so summer stays comfortable.",
    metaTitle: "Cooling System & AC Repair in Arlington, VA | TAB Motors Exxon",
    metaDescription: "Radiator, coolant and car AC repair in Arlington, VA at TAB Motors | Exxon. Beat overheating and DC summer heat. Call (703) 243-3080.",
    features: ["Radiator, pump & thermostat", "AC recharge & repair", "Coolant flush to spec"],
    faq: [{"q": "My AC blows warm, is it just low on refrigerant?", "a": "Sometimes a recharge fixes it, but if it leaked out there's a leak to find. We check for leaks first so you're not paying to refill a system that'll empty again."}, {"q": "My car overheats in traffic but not on the highway, why?", "a": "That often points to a failing cooling fan or a weak water pump. We'll test the system to be sure."}, {"q": "How often should coolant be flushed?", "a": "Many vehicles call for a coolant service around 60,000–100,000 miles, but it varies. We'll check your coolant's condition and your manufacturer's schedule."}, {"q": "Is it safe to keep driving if my temperature gauge is high?", "a": "No. Continuing to drive an overheating engine risks serious, expensive damage. Pull over safely and call us."}, {"q": "Do you repair AC compressors?", "a": "Yes, compressor, condenser, evaporator and the rest of the system."}],
    group: 2,
    featured: true,
    icon: Snowflake,
    bodyHtml: "<p>DC-area summers are hot and humid, and stop-and-go traffic on 66 and the GW Parkway is exactly when a marginal cooling system or AC gives up. TAB Motors handles both, the <strong>engine cooling system</strong> that keeps you from overheating and the <strong>air conditioning</strong> that keeps the cabin livable. One customer summed up a recent visit: we \"got it working again pretty quickly. No issues since then.\"</p>\n<h2>Cooling system service</h2>\n<ul>\n<li>Radiator repair and replacement</li>\n<li>Water pump replacement</li>\n<li>Thermostat and coolant temperature sensors</li>\n<li>Coolant flush and fill to manufacturer spec</li>\n<li>Hoses, belts and cooling fans</li>\n<li>Overheating diagnosis</li>\n</ul>\n<h2>Air conditioning service</h2>\n<ul>\n<li>AC performance check and leak detection</li>\n<li>Refrigerant recharge</li>\n<li>Compressor, condenser and evaporator service</li>\n<li>Blend door and blower motor repair</li>\n</ul>\n<h2>Don't ignore the temperature gauge</h2>\n<p>An overheating engine is one of the fastest ways to turn a small repair into a blown head gasket or a cracked block. If your temp gauge climbs in traffic, you smell sweet coolant, or you see puddles under the car, get it looked at now. We'll pressure-test the system, find the leak, and fix it before it costs you an engine. Low coolant can also trigger a <a href=\"/services/engine-diagnostics\">warning light</a> we can diagnose at the same time.</p>",
  },
  {
    slug: "transmission-service",
    name: "Transmission Service",
    h1: "Transmission Service in Arlington",
    navLabel: "Transmission Service",
    formLabel: "Transmission Service",
    blurb: "Rough shifts, slipping, or just due for maintenance?",
    heroText: "Rough shifts, slipping, or just due for maintenance? A proper transmission fluid service with the correct fluid is one of the cheapest ways to protect an expensive part.",
    metaTitle: "Transmission Fluid Service in Arlington, VA | TAB Motors Exxon",
    metaDescription: "Transmission fluid service and diagnosis in Arlington, VA at TAB Motors | Exxon. Protect your transmission with the right fluid. Call (703) 243-3080.",
    features: ["Fluid service to exact spec", "Shift & slip diagnosis", "Save a costly rebuild"],
    faq: [{"q": "How often should I change my transmission fluid?", "a": "It varies widely, some vehicles call for it around 60,000 miles, others longer. We'll check your fluid's condition and your manufacturer's schedule and give you a straight recommendation."}, {"q": "Will a fluid change fix my slipping transmission?", "a": "Sometimes, if it's caught early and the fluid is the issue. If there's internal wear, fluid alone won't fix it, and we'll tell you that honestly."}, {"q": "Does using the right transmission fluid really matter?", "a": "Very much. Modern transmissions are specific about fluid type. The wrong fluid can cause shifting problems and damage, so we always use the correct spec."}, {"q": "My transmission shifts hard, is that serious?", "a": "It can be. Bring it in; we'll check fluid level and condition and scan for codes to find the cause."}, {"q": "I see red fluid under my car, what is it?", "a": "That's likely a transmission fluid leak. Come in before the level drops enough to cause damage."}],
    group: 2,
    featured: false,
    icon: Cog,
    bodyHtml: "<p>The transmission is one of the most expensive components in your car, and the cheapest insurance for it is clean, correct fluid changed on schedule. Old, burnt transmission fluid loses its ability to lubricate and cool, which is how good transmissions turn into rebuild quotes. TAB Motors services your transmission with the exact fluid your vehicle requires, using the wrong fluid does real harm, so this is not a place to cut corners.</p>\n<h2>What we do</h2>\n<ul>\n<li>Transmission fluid and filter service</li>\n<li>Fluid condition inspection (color, smell, level)</li>\n<li>Diagnosis of rough, delayed or slipping shifts</li>\n<li>Leak inspection and repair</li>\n<li>Correct manufacturer-spec fluid for your vehicle</li>\n</ul>\n<h2>Signs your transmission needs attention</h2>\n<p>Catch problems early: a delay before the car engages when you shift into drive or reverse, hard or jerky shifts, a slipping feeling where the engine revs but the car doesn't accelerate, a burnt smell, or red fluid on your driveway. Any of these is worth a look before it becomes a major repair. We'll check the fluid and, if needed, run <a href=\"/services/engine-diagnostics\">diagnostics</a> to read transmission fault codes.</p>\n<h2>Honest advice</h2>\n<p>If a fluid service will help, we'll do it and you'll feel smoother shifts. If your transmission is beyond what fluid can fix, we'll tell you that honestly rather than sell you a service that won't solve the problem, the same straight talk our customers count on.</p>",
  },
  {
    slug: "exhaust-repair",
    name: "Exhaust Repair",
    h1: "Exhaust Repair in Arlington",
    navLabel: "Exhaust Repair",
    formLabel: "Exhaust Repair",
    blurb: "A sudden roar, a rattle, or a rotten-egg smell means the exhaust needs attention.",
    heroText: "A sudden roar, a rattle, or a rotten-egg smell means the exhaust needs attention. We repair pipes, mufflers, catalytic converters and hangers, and cure the noise at the source.",
    metaTitle: "Exhaust Repair in Arlington, VA | Muffler & Catalytic | TAB Motors",
    metaDescription: "Exhaust, muffler and catalytic converter repair in Arlington, VA at TAB Motors | Exxon. Fix the noise and the emissions. Call (703) 243-3080.",
    features: ["Muffler & pipe repair", "Catalytic converter service", "Fixes noise & emissions"],
    faq: [{"q": "Why is my car suddenly so loud?", "a": "Usually a hole in the exhaust, a rusted-through pipe, or a failed muffler. We'll find the leak and repair it."}, {"q": "Do I need a whole new exhaust or just one part?", "a": "Often just one section or component. We repair what's failed rather than replacing the entire system when we don't have to."}, {"q": "Can a bad catalytic converter be fixed?", "a": "A clogged or failed converter is replaced, not repaired, but first we confirm it's actually the converter and not a sensor, so you don't overspend."}, {"q": "Is an exhaust leak dangerous?", "a": "It can be, especially if fumes reach the cabin. It's worth fixing promptly."}, {"q": "Will an exhaust problem fail inspection?", "a": "Yes, both the safety inspection (insecure or leaking exhaust) and emissions (bad converter/sensor) can fail. We handle both."}],
    group: 2,
    featured: false,
    icon: Wind,
    bodyHtml: "<p>When the exhaust starts getting loud, it's not just annoying, it can mean a leak that's letting fumes escape, a failing catalytic converter, or a component that will fail your next inspection. TAB Motors repairs the whole exhaust system, from the manifold back to the tailpipe, and finds the leak so the fix actually lasts.</p>\n<h2>Exhaust work we handle</h2>\n<ul>\n<li>Muffler and resonator replacement</li>\n<li>Exhaust pipe and flex-pipe repair</li>\n<li>Catalytic converter diagnosis and replacement</li>\n<li>Oxygen sensor replacement</li>\n<li>Exhaust manifold and gasket leaks</li>\n<li>Loose hangers and rattles</li>\n</ul>\n<h2>Loud, smelly, or rattling?</h2>\n<p>A deep roar usually means a hole or a bad muffler. A rattle under the car is often a loose heat shield or hanger. A sulfur / rotten-egg smell can point to a failing catalytic converter. And a droning exhaust leak near the engine can let exhaust into the cabin, that one's a safety issue worth handling promptly.</p>\n<h2>Exhaust, emissions and inspection</h2>\n<p>Exhaust problems and <a href=\"/services/virginia-emissions-inspection\">emissions</a> go hand in hand, a bad catalytic converter or O2 sensor will fail the emissions test, and a leaking or insecure exhaust will fail the <a href=\"/services/virginia-state-inspection\">safety inspection</a>. We can diagnose the exhaust, repair it, and get you through both requirements in one stop.</p>",
  },
  {
    slug: "timing-belt-ignition",
    name: "Timing Belt & Ignition",
    h1: "Timing Belt & Ignition Service",
    navLabel: "Timing Belt & Ignition",
    formLabel: "Timing Belt & Ignition",
    blurb: "A snapped timing belt can wreck an engine.",
    heroText: "A snapped timing belt can wreck an engine. We replace belts on schedule and handle ignition tune-ups, spark plugs, coils and wires, to keep it starting and running strong.",
    metaTitle: "Timing Belt & Ignition Repair in Arlington, VA | TAB Motors Exxon",
    metaDescription: "Timing belt replacement and ignition / tune-up service in Arlington, VA at TAB Motors | Exxon. Avoid a broken-belt disaster. Call (703) 243-3080.",
    features: ["Timing belt on schedule", "Spark plugs, coils & wires", "Prevent major engine damage"],
    faq: [{"q": "How do I know if my car has a timing belt or chain?", "a": "Tell us your year, make and model and we'll tell you exactly. Belts need scheduled replacement; chains last longer but aren't forever."}, {"q": "What happens if my timing belt breaks?", "a": "On an interference engine, a broken belt can bend valves and cause major internal damage. That's why replacing it on schedule is so important."}, {"q": "When should I replace my timing belt?", "a": "Follow your manufacturer's interval, commonly 60,000 to 100,000 miles. If you're near it or don't know its history, have it checked."}, {"q": "Why is my engine misfiring or running rough?", "a": "Often worn spark plugs or a failing ignition coil. We diagnose the misfire and replace only what's needed."}, {"q": "Should I replace the water pump with the timing belt?", "a": "Usually yes, it's driven by the same belt, so doing both at once saves a lot of labor down the road."}],
    group: 2,
    featured: false,
    icon: Zap,
    bodyHtml: "<p>Two systems, one goal: keeping your engine turning smoothly. The <strong>timing belt</strong> keeps the engine's internals in sync, and on many engines a broken belt means bent valves and a repair bill several times the cost of the belt. The <strong>ignition system</strong>, spark plugs, coils and wires, is what lights the fire; when it's tired you get misfires, rough running and wasted fuel. TAB Motors handles both.</p>\n<h2>Timing belt replacement</h2>\n<p>If your vehicle uses a timing belt (many four-cylinders and some V6s do), the manufacturer sets a replacement interval, often around 60,000–100,000 miles. Replacing it on time is non-negotiable on an \"interference\" engine, where a snapped belt lets the pistons hit the valves. While the belt is off, it's the smart time to replace the water pump and tensioner too, since the labor overlaps.</p>\n<h2>Ignition & tune-up</h2>\n<ul>\n<li>Spark plug replacement</li>\n<li>Ignition coil and coil-pack service</li>\n<li>Spark plug wires and connectors</li>\n<li>Misfire diagnosis</li>\n<li>Rough idle and hard-start repair</li>\n</ul>\n<h2>Timing chain vs. belt</h2>\n<p>Not sure which you have? Many newer engines use a timing <em>chain</em> that's designed to last much longer but still isn't maintenance-free. We'll tell you what your engine uses and what it actually needs, no upselling a belt job on a car that doesn't have one. A fresh <a href=\"/services/oil-change\">oil change</a> and a <a href=\"/services/fuel-system-service\">fuel system service</a> round out a proper tune-up.</p>",
  },
  {
    slug: "tire-wheel-service",
    name: "Tire & Wheel Service",
    h1: "Tire & Wheel Service in Arlington",
    navLabel: "Tire & Wheel Service",
    formLabel: "Tires & Wheels",
    blurb: "Flat, worn, or a TPMS light nagging you?",
    heroText: "Flat, worn, or a TPMS light nagging you? We inspect, rotate, repair, replace and balance tires, and diagnose the tire-pressure system that trips that dashboard light.",
    metaTitle: "Tire & Wheel Service in Arlington, VA | TPMS & Flat Repair | TAB Motors",
    metaDescription: "Tire service in Arlington, VA at TAB Motors | Exxon, inspection, rotation, flat repair, replacement, balancing and TPMS. Call (703) 243-3080.",
    features: ["Flat repair & replacement", "Rotation & wheel balancing", "TPMS diagnostics"],
    faq: [{"q": "Can you repair my flat or do I need a new tire?", "a": "If the puncture is in the tread area and within size limits, we can safely repair it. Sidewall damage or a large hole means replacement, we'll show you which it is."}, {"q": "How often should I rotate my tires?", "a": "Roughly every oil change, or 5,000–7,500 miles. It's cheap and it noticeably extends tire life."}, {"q": "Why is my tire-pressure (TPMS) light on?", "a": "Often low pressure from cold weather, sometimes a slow leak or a dead sensor. We'll diagnose it and get the light off."}, {"q": "Do you sell tires?", "a": "Yes, we sell and install new tires, then balance them for a smooth ride. Call for a quote on your size."}, {"q": "My steering wheel shakes at highway speed, why?", "a": "Usually a tire that's out of balance or a bent wheel. Balancing fixes most of these."}],
    group: 3,
    featured: true,
    icon: CircleDot,
    bodyHtml: "<p>Your tires are the only thing connecting your car to the road, and TAB Motors covers the full range of <strong>tire and wheel services</strong>, the same \"tire and wheel services including tire inspection, tire rotation, flat repair, replacement, wheel balancing, and TPMS diagnostics\" our customers rely on. Early one morning we've even changed a flat before the driver's coffee had kicked in, fast, professional, no fuss.</p>\n<h2>Complete tire services</h2>\n<ul>\n<li>Tire inspection, tread depth, wear pattern, sidewall condition</li>\n<li>Tire rotation to even out wear and extend tire life</li>\n<li>Flat repair (patch/plug where safe and legal)</li>\n<li>New tire sales and installation</li>\n<li>Wheel balancing to eliminate vibration</li>\n<li>TPMS (tire pressure monitoring) diagnostics and sensor service</li>\n</ul>\n<h2>That TPMS light</h2>\n<p>The tire-pressure warning light trips for a reason, often just cold weather dropping your pressure, but sometimes a slow leak or a failing sensor. We diagnose why it's on, set your pressures to spec, and repair or replace sensors when needed, so the light goes off and stays off. Correct pressure also improves fuel economy and tire life.</p>\n<h2>Wear patterns tell a story</h2>\n<p>Tires wearing on one edge, cupping, or feathering usually means an alignment or <a href=\"/services/suspension-steering\">suspension</a> issue, not just \"bad tires.\" When we install new tires we check for the cause so your new set doesn't wear out the same way. Bald or damaged tires are also a <a href=\"/services/virginia-state-inspection\">Virginia inspection</a> failure, so if yours are marginal we can sort tires and the sticker together.</p>",
  },
  {
    slug: "fleet-service",
    name: "Fleet Service",
    h1: "Fleet Service in Arlington, VA",
    navLabel: "Fleet Service",
    formLabel: "Fleet Service",
    blurb: "Keep your work vehicles on the road.",
    heroText: "Keep your work vehicles on the road. TAB Motors handles inspections, maintenance and repairs for local Arlington fleets, scheduled around your business, not the other way around.",
    metaTitle: "Fleet Vehicle Service in Arlington, VA | TAB Motors Exxon",
    metaDescription: "Fleet maintenance and repair in Arlington, VA at TAB Motors | Exxon, inspections, oil, brakes and tires for local business vehicles. Call (703) 243-3080.",
    features: ["One shop for the whole fleet", "Inspections, PM & repairs", "Less downtime, honest pricing"],
    faq: [{"q": "How many vehicles do I need for a fleet account?", "a": "There's no hard minimum, even a few vehicles benefit from having one shop that knows them and keeps them on schedule. Call and we'll set it up."}, {"q": "Can you handle our state inspections and emissions?", "a": "Yes, we're an official inspection station and can keep your whole fleet's stickers current."}, {"q": "Do you keep maintenance records for our vehicles?", "a": "Yes, we track service history so preventive maintenance and inspections stay on schedule."}, {"q": "Can you minimize downtime for our vehicles?", "a": "That's the goal. We schedule around your operations and fix things right the first time so vehicles aren't back in next week."}],
    group: 3,
    featured: false,
    icon: Wrench,
    bodyHtml: "<p>Downtime costs your business money. TAB Motors keeps Arlington-area work vehicles rolling with dependable <strong>fleet service</strong>, from state inspections and routine maintenance to brakes, tires and diagnostics, all from one shop your drivers already know on Langston Blvd.</p>\n<h2>What we handle for fleets</h2>\n<ul>\n<li>Virginia state safety and emissions inspections</li>\n<li>Scheduled oil changes and preventive maintenance</li>\n<li>Brakes, tires and suspension</li>\n<li>Diagnostics and drivability repairs</li>\n<li>Batteries, charging and no-start service</li>\n</ul>\n<h2>Why local businesses use us</h2>\n<p>Contractors, service companies, delivery vehicles and small fleets around Arlington, Falls Church and McLean use TAB Motors because we're straightforward: honest diagnostics, fair pricing, and work done right the first time so vehicles aren't back in the shop next week. We keep records on your vehicles so maintenance stays on schedule and inspections never lapse.</p>\n<h2>Set up a fleet account</h2>\n<p>Whether it's three vans or a dozen, call (703) 243-3080 and we'll set up a service plan that fits how your business runs. Same honest pricing our retail customers get, just organized around your fleet's schedule.</p>",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function otherServices(slug: string, limit = 6): Service[] {
  return services.filter((s) => s.slug !== slug).slice(0, limit);
}

export const featuredServices = services.filter((s) => s.featured);

export function servicesInGroup(group: number): Service[] {
  return services.filter((s) => s.group === group);
}

export const quoteServiceOptions: { value: string; label: string }[] = [
  ...services.map((s) => ({ value: s.slug, label: s.formLabel })),
  { value: "other", label: "Something else" },
];

const validServiceValues = new Set<string>([...services.map((s) => s.slug), "other"]);
export function isValidServiceValue(value: string): boolean {
  return validServiceValues.has(value);
}

/** Turns a stored slug back into a readable label for the admin dashboard. */
export function serviceLabel(value: string): string {
  return quoteServiceOptions.find((o) => o.value === value)?.label ?? value;
}
