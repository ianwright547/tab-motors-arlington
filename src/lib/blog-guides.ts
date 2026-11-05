import { site } from "./site";
import type { BlogPost } from "./blog";

/**
 * Long-form local guides. Every legal or numeric claim here traces to the
 * source list at the bottom of its post, checked November 4, 2026. When a rule
 * changes, update the post and bump `updated`, and keep it in step with
 * src/lib/inspection-rules.ts.
 */
function sources(items: [label: string, href: string][]) {
  const rows = items
    .map(([label, href]) => `<li><a href="${href}" rel="noopener">${label}</a></li>`)
    .join("\n");
  return `<h2>Sources</h2>\n<ul>\n${rows}\n</ul>\n<p><em>General information, checked November 4, 2026. Rules change, so confirm anything that matters with the agency involved. This is not legal advice.</em></p>`;
}

const CHECKER = `<a href="/tools/virginia-inspection-checker">Virginia inspection and emissions checker</a>`;

export const guides: BlogPost[] = [
  {
    slug: "winter-car-checklist-arlington",
    category: "Maintenance",
    title: "Winter Car Checklist for Arlington Drivers",
    metaDescription:
      "A practical winter checklist for Arlington and Northern Virginia drivers: battery, tires, coolant, wipers, brakes, EV range, and what to keep in the car before the first cold snap.",
    teaser:
      "Northern Virginia winters are short on snow and long on freeze-thaw, salt and dead batteries. Here is what to check before the first hard cold, in the order it tends to bite.",
    published: "2026-11-04",
    bodyHtml: `<p>Winter in Arlington rarely looks like winter in Buffalo. What we get instead is a season of swings: a mild week, an overnight freeze, a dusting that shuts down half of Langston Blvd, then road treatment that sits on the underside of your car for days. That pattern finds weak parts. A battery that was fine in October will not turn the engine over at 20°F. A tire that was a little low in September is properly low by January.</p>
<p>Here is the checklist we would run on our own cars, roughly in order of what strands people first. Most of it takes minutes, and the rest is easiest to knock out alongside an oil change or your <a href="/services/virginia-state-inspection">state inspection</a>.</p>
<h2>1. Battery: test it before the cold does</h2>
<p>The cold gets the blame, but the damage usually happens earlier. Summer heat wears a battery down, and the first hard freeze exposes it, because cold slows the chemistry inside the battery at the same moment thick oil makes the engine harder to turn. We cover the full story in <a href="/blog/car-battery-life-virginia">why car batteries die early in Virginia</a>.</p>
<p>What to do:</p>
<ul>
<li>If your battery is around three years old or more, have it load tested now rather than waiting for a slow start.</li>
<li>Look at the terminals. White or green crust adds resistance and is simple to clean.</li>
<li>Take a slower crank as a warning. Batteries often give you a few days of notice before they quit.</li>
<li>If the car sits for a week or more, or only does short hops around Arlington, the alternator never gets a chance to fully recharge the battery. A longer drive each week helps.</li>
</ul>
<p>If you need one tested or replaced, our <a href="/services/battery-alternator-starter">battery, alternator and starter service</a> checks the whole charging system. A new battery will not last long on a failing alternator.</p>
<h2>2. Tire pressure and tread</h2>
<p>Air contracts as it cools, and the usual rule of thumb is roughly one PSI lost for every 10°F drop. That is why the tire pressure light tends to come on during the first cold morning of the season, then go off after a few miles of driving. Our <a href="/blog/tpms-tire-pressure-light">TPMS guide</a> explains what the light is really telling you.</p>
<ul>
<li><strong>Set pressure cold.</strong> Check before you have driven far, and use the number on the driver's door jamb, not the maximum printed on the tire sidewall.</li>
<li><strong>Check tread depth.</strong> Virginia's inspection standard rejects tires below 2/32 of an inch, but that is a legal floor, not a winter target. Tires near that depth lose their grip on wet and slushy roads well before they fail inspection.</li>
<li><strong>Do not forget the spare,</strong> if your car has one. Plenty of newer cars carry a repair kit instead, and those sealant kits expire.</li>
</ul>
<p>Our shop has free air at the pumps, so topping off costs you nothing but a stop.</p>
<h2>3. Coolant and heater</h2>
<p>Coolant protects your engine against freezing as well as overheating, and it does not last forever. Look at the overflow tank with the engine cold and make sure the level sits between the marks. Never open a hot radiator cap.</p>
<p>Pay attention to the heater, too. A heater that blows lukewarm air can mean low coolant, a stuck thermostat, or a blend door problem, and a sluggish temperature gauge in winter often points at the thermostat. Either way, you want to find out before a long drive, and our <a href="/services/cooling-ac-service">cooling and AC service</a> covers both ends of the system.</p>
<h2>4. Wipers, washer fluid and glass</h2>
<p>Wipers are cheap, and they matter most in exactly the conditions when you can least afford streaks.</p>
<ul>
<li>Replace blades that chatter, streak or have split rubber.</li>
<li>Run a washer fluid rated for freezing temperatures. Summer fluid can freeze in the lines and on the glass.</li>
<li>Never pour hot water on an icy windshield. A sudden temperature change can turn a small chip into a long crack.</li>
<li>Get chips looked at early. Under the 2026 State Police manual, a pit, chip or star crack larger than 1-1/2 inches above the three-inch line at the bottom of the windshield is grounds for rejection, and cold makes chips spread.</li>
</ul>
<p>One Virginia rule worth knowing: your headlights must be on whenever your wipers are in use because of fog, rain, sleet or snow, apart from intermittent use in a light mist. Automatic headlights do not always catch this on a gray morning, so check the switch.</p>
<h2>5. Brakes</h2>
<p>Wet and slick roads give you less margin, so a brake problem that is merely annoying in August matters more in January. Road treatment also speeds up rust on rotors, calipers and brake lines, and a car that sits in the cold can develop a light surface rust that clears after a few stops. Rust that does not clear, or a car that pulls, grinds or pulses, needs a look. See <a href="/blog/brake-warning-signs">six signs your brakes need attention</a>, or stop by for a <a href="/services/brake-repair">free brake inspection</a>.</p>
<h2>6. Oil and the small stuff</h2>
<p>Modern synthetic oils flow well in cold weather, but only if they are the viscosity your manufacturer specifies and in decent condition. If your car is close to its oil change interval, do it before winter rather than after. Short trips are harder on oil than highway miles, and they describe most driving around Arlington. Our <a href="/blog/how-often-oil-change">oil change guide</a> explains how to find your real interval.</p>
<p>While you are there, have someone check the serpentine belt and hoses. Rubber goes brittle in the cold, and a belt that was glazing in the fall can let go in January.</p>
<h2>7. Wash off the road treatment</h2>
<p>Road salt and treatment chemicals are hard on the underside of a car. After a treated storm, a wash that reaches the undercarriage is cheap protection for brake lines, fuel lines and the floor pan. It matters for inspection as well: the State Police manual rejects vehicles with a floor pan rusted through.</p>
<h2>If you drive an EV or a hybrid</h2>
<p>Cold affects electrified cars more than most owners expect. In testing published in May 2026, AAA found that at 20°F with the cabin heated to 72°F, electric vehicles lost about 39% of their calculated driving range compared with 75°F, and hybrids lost about 22.8% of their fuel economy.</p>
<p>AAA's advice comes down to a few habits:</p>
<ul>
<li>Warm the cabin while the car is still plugged in.</li>
<li>Use heated seats and the heated steering wheel instead of full cabin heat.</li>
<li>Keep tires properly inflated.</li>
<li>Plan for shorter range and extra charging stops on winter road trips.</li>
</ul>
<p>Every EV and hybrid still has a 12-volt battery that runs the computers and door locks, and that battery can fail the same way it does on any other car. We cover the rest in our <a href="/blog/hybrid-ev-maintenance-virginia">hybrid and EV maintenance guide</a>.</p>
<h2>What to keep in the car</h2>
<ul>
<li>Phone charger and a small flashlight</li>
<li>Ice scraper and snow brush</li>
<li>Gloves, a warm layer and a blanket</li>
<li>Jumper cables or a charged jump pack</li>
<li>Water and a snack, because I-66 can turn a 20-minute drive into a very long one</li>
<li>A small bag of sand or cat litter for traction</li>
</ul>
<p>Keep the gas tank from running near empty when a storm is forecast. It gives you a reserve if you get stuck in traffic with the heater running.</p>
<h2>The short version</h2>
<p>Battery, tire pressure, wipers. If you only do three things before the first freeze, do those. If you would like someone to go through the list for you, call ${site.name} at ${site.phone.display} or stop by ${site.address.street}. We are open Monday to Friday 7 to 6 and Saturday 7 to 3.</p>
${sources([
  ["AAA: Study Reveals Temperature Impacts on EV and Hybrid Efficiencies and Costs (May 2026)", "https://newsroom.aaa.com/2026/05/aaa-study-reveals-temperature-impacts-on-ev-and-hybrid-performance-efficiency-and-costs/"],
  ["Virginia State Police: Official Motor Vehicle Safety Inspection Manual 2026", "https://vsp.virginia.gov/wp-content/uploads/2026/05/Official-Motor-Vehicle-Safety-Inspection-Manual-2026.pdf"],
  ["Code of Virginia 46.2-1030: When lights must be used", "https://law.lis.virginia.gov/vacode/title46.2/chapter10/section46.2-1030/"],
])}`,
  },
  {
    slug: "moving-to-arlington-car-checklist",
    category: "Local Guides",
    title: "Moving to Arlington With a Car: Your 60-Day Virginia Checklist",
    metaDescription:
      "Moving to Arlington, VA? The order to do everything for your car: insurance, title, emissions, DMV registration, safety inspection, and the county personal property tax deadline.",
    teaser:
      "New to Arlington? You have two clocks running, one for the state and one for the county, and the order of the steps matters. Here is the whole sequence in one place.",
    published: "2026-11-04",
    bodyHtml: `<p>Arlington gets a steady flow of new residents, from federal employees and military families to graduate students and people relocating for work at Crystal City and Rosslyn offices. Almost all of them hit the same confusion: Virginia has several separate car requirements run by different agencies, with different deadlines, and no single office walks you through them.</p>
<p>This guide does. For a personal version, enter your move-in date in our free ${CHECKER} and it will give you the actual dates.</p>
<h2>The deadlines at a glance</h2>
<ul>
<li><strong>30 days:</strong> title and register your vehicle with the Virginia DMV.</li>
<li><strong>60 days:</strong> get a Virginia driver's license (30 days if you hold a commercial license).</li>
<li><strong>60 days:</strong> register the vehicle with Arlington County for personal property tax.</li>
<li><strong>Before you register:</strong> have insurance in place, and deal with emissions if your vehicle needs it.</li>
<li><strong>Before you drive it around Virginia:</strong> DMV says your vehicle must pass the safety inspection and display a valid sticker.</li>
</ul>
<h2>Step 1: Line up Virginia insurance</h2>
<p>Do this first, because you need it to register. DMV requires at least minimum liability coverage from a company authorized in Virginia, and that coverage has to stay in force for the whole registration period, even if the car is not being driven. Skipping it carries a real penalty. DMV lists a $600 noncompliance fee, suspension of your license and registration with a $145 reinstatement fee, and higher premiums for three years.</p>
<h2>Step 2: Sort out emissions</h2>
<p>This is the step that catches people out. Arlington is inside the Northern Virginia emissions program, so most gasoline vehicles need a passing test before DMV will register them.</p>
<p>There are three common situations:</p>
<ul>
<li><strong>You recently passed an emissions test elsewhere.</strong> DMV says a vehicle being registered in Virginia for the first time can skip the Virginia test if it has a current emissions certificate from the last 12 months. Bring your paperwork.</li>
<li><strong>Your car is newer.</strong> Vehicles manufactured and titled for the current model year or the three before it are normally exempt, but DEQ warns that DMV may require a test for newer vehicles originally titled in another state. Do not assume. Check before you head to the DMV.</li>
<li><strong>Your car is exempt.</strong> Fully electric cars, qualified hybrids and gasoline vehicles 25 model years old or more do not need the test. In 2026, that means model year 2001 and older for gasoline vehicles.</li>
</ul>
<p>Our ${CHECKER} runs through these exceptions in about 20 seconds. If your car does need a test, the state caps the fee at $30, and our <a href="/services/virginia-emissions-inspection">emissions inspection</a> is here on ${site.address.street}.</p>
<p>One tip for a car that was recently moved: if the battery was disconnected or the car has just had work done, its computer may show "not ready" and the station cannot complete the test. A week of normal driving usually sorts it out. Our guide to <a href="/blog/failed-virginia-emissions">failed emissions tests</a> explains how that works.</p>
<h2>Step 3: Title and register with DMV</h2>
<p>Titling comes before registration, and DMV wants both done within 30 days of your move. You will need your out-of-state title. If a lender holds it, check with DMV first, because the process is different. Fees depend on your vehicle's weight, plate type and whether you register for one, two or three years.</p>
<p>Fuel-efficient cars rated at 25 mpg or more and electric vehicles may also owe Virginia's Highway Use Fee at registration, which surprises many people arriving from other states. There is more on that in our <a href="/blog/hybrid-ev-maintenance-virginia">hybrid and EV guide</a>.</p>
<p>While you are at DMV, take care of your license too. You have 60 days, and Arlington's county guidance lists exemptions for military personnel, out-of-state students and temporary nonresidents.</p>
<h2>Step 4: Get the Virginia safety inspection</h2>
<p>Virginia requires a safety inspection every 12 months, with a sticker on the windshield. The maximum fee is $20 for most vehicles. Out-of-state vehicles are inspected to the same standards as cars that have always lived here, which means a car that passed easily elsewhere, or came from a state with no inspection at all, can still fail.</p>
<p>Before you come in, check the things that most often trip up cars from out of state:</p>
<ul>
<li><strong>Window tint.</strong> Virginia law requires at least 50% light transmittance on the front side windows and 35% on the rear side and back windows, though pickups and multipurpose vehicles have more leeway at the rear. Film on the windshield is generally not allowed below the top sunshield area. Tint that was legal in a warmer state may not be legal here.</li>
<li><strong>Tires.</strong> The minimum is 2/32 of an inch of tread.</li>
<li><strong>Windshield.</strong> Damage above the three-inch line can be a rejection, depending on size and type.</li>
<li><strong>Old stickers.</strong> The manual allows stickers required by another state only if the car is still registered there and the sticker has not expired. An expired windshield sticker needs to come off, so ask us to remove it rather than picking at it with a razor blade.</li>
<li><strong>Bulbs.</strong> Every required light has to work, including the rear license plate light.</li>
</ul>
<p>More detail is in our <a href="/blog/virginia-state-inspection-guide">Virginia state inspection guide</a>, and if the car does not pass, our guide on <a href="/blog/failed-virginia-inspection">what happens after a failed inspection</a> covers your 15-day window. To get yours done, see our <a href="/services/virginia-state-inspection">state inspection service</a>. We take walk-ins, and calling ahead at ${site.phone.display} helps you avoid a wait.</p>
<h2>Step 5: Register with Arlington County</h2>
<p>This is the one nobody tells you about until the bill or the penalty arrives. Virginia localities tax vehicles as personal property, and Arlington's rule is separate from DMV. You must register the vehicle with the Commissioner of Revenue within 60 days of moving in or acquiring it.</p>
<ul>
<li><strong>How:</strong> online through the county's CAPP portal, or in person at the Bozman Government Center, 2100 Clarendon Blvd, Window 218.</li>
<li><strong>Late penalty:</strong> 10% of the assessed tax or $10, whichever is greater, up to the amount of the tax itself.</li>
<li><strong>Out-of-state plates:</strong> a vehicle garaged in Arlington but displaying out-of-state plates can owe a $100 annual fee on top.</li>
<li><strong>How it is calculated:</strong> the tax year runs January 1 to December 31, and vehicles are assessed by the months they have taxable status here. A half month or more counts as a full month.</li>
<li><strong>No decal:</strong> Arlington stopped requiring a county windshield decal on July 1, 2019, so ignore older advice telling you to buy one.</li>
</ul>
<p>Questions go to the county's Vehicle Personal Property Division at 703-228-3135. Military members and students should ask specifically about their situation, because the rules for those groups are different from the general ones.</p>
<h2>Moving to Arlington from elsewhere in Virginia?</h2>
<p>The list is shorter. Update your address with DMV within 30 days, register with Arlington within 60 days, and close your account with your old locality's Commissioner of the Revenue so it stops assessing you. The catch is emissions: if you moved from a part of Virginia outside the program, your next renewal will need a test. DMV's renewal notice will say so.</p>
<h2>Keep your paperwork together</h2>
<p>Save your emissions result, your safety inspection receipt and your service history in one folder. It makes every future renewal easier, and if your car is still under warranty, those records protect you, too. Read why in <a href="/blog/dealer-vs-independent-warranty">our dealer versus independent shop guide</a>.</p>
<h2>Need a mechanic now that you are here?</h2>
<p>${site.name} is an independent, AAA Approved shop and Exxon station at ${site.address.oneLine}, and an official Virginia inspection station. Welcome to the neighborhood. Call us at ${site.phone.display} with any question about your car, even if it is just which of these steps applies to you.</p>
${sources([
  ["Virginia DMV: New to Virginia", "https://www.dmv.virginia.gov/moving/new-virginia"],
  ["Virginia DMV: Emissions Inspections", "https://www.dmv.virginia.gov/vehicles/registration/emissions"],
  ["Virginia DEQ: How do I get an inspection?", "https://www.deq.virginia.gov/air-energy/vehicle-emissions-air-check/how-do-i-get-an-inspection"],
  ["Arlington County: Vehicle and driver's license information for people new to Arlington", "https://www.arlingtonva.us/Government/Topics/Arlington-Welcome-Kit/Moved-Virginia"],
  ["Arlington County: Registering a Vehicle", "https://www.arlingtonva.us/Government/Programs/Taxes/Vehicles/Registering-a-Vehicle"],
  ["Arlington County: No Decals Needed", "https://www.arlingtonva.us/Government/Programs/Taxes/Other/Decals"],
  ["Code of Virginia 46.2-1052: Tinting films and window treatments", "https://law.lis.virginia.gov/vacode/title46.2/chapter10/section46.2-1052/"],
  ["Virginia State Police: Official Motor Vehicle Safety Inspection Manual 2026", "https://vsp.virginia.gov/wp-content/uploads/2026/05/Official-Motor-Vehicle-Safety-Inspection-Manual-2026.pdf"],
])}`,
  },
  {
    slug: "failed-virginia-inspection",
    category: "Inspections",
    title: "Failed Your Virginia Inspection? What the Rejection Sticker Means",
    metaDescription:
      "What to do after failing a Virginia safety inspection: how the 15-day rejection sticker works, the $1 reinspection, your right to repair anywhere, and the exact standards cars fail on.",
    teaser:
      "A rejection sticker gives you 15 days, a $1 reinspection and the right to fix the car wherever you like. Here is how it works, and the real pass and fail limits from the State Police manual.",
    published: "2026-11-04",
    bodyHtml: `<p>A rejection sticker feels like a bigger deal than it is. Most failures come down to a specific, fixable item, and the State Police rules give you a clear window to deal with it. Here is exactly what happens next, what your rights are, and what inspectors are measuring.</p>
<h2>What a rejection sticker means</h2>
<p>If your vehicle fails, the inspector puts a rejection sticker on the windshield and notes the defects. From there:</p>
<ul>
<li><strong>You have 15 days.</strong> The rejection sticker is valid for 15 calendar days beyond the day it was issued.</li>
<li><strong>A reinspection costs $1</strong> at the same station during that window.</li>
<li><strong>The reinspection is limited.</strong> The same station only needs to recheck the items that failed, unless there is an obvious new equipment defect.</li>
<li><strong>You get two reinspections.</strong> The rules allow no more than two reinspections by the rejecting station while the sticker is valid.</li>
<li><strong>Going elsewhere means starting over.</strong> A different station has to perform a complete inspection.</li>
</ul>
<h2>Can you still drive the car?</h2>
<p>A rejection sticker does not restrict where you can drive. It also does not protect you. The rules are clear that it gives no exception to the laws on defective equipment, and the State Police warn that a driver can receive a summons for any defect still present on the road. If the car failed for bald tires or bad brakes, it is unsafe regardless of what the sticker says, so get it fixed before you put miles on it.</p>
<h2>You do not have to repair the car where it was inspected</h2>
<p>Nothing in the inspection rules requires you to buy the repair from the station that rejected your car. You can take it to another shop, or do the work yourself, and bring it back within the 15 days for the $1 recheck. We would like your business, of course, but we would rather you know your options. If you want a second opinion on a failure, we are happy to look at it.</p>
<p>When you get a repair quoted, Virginia law gives you the right to a written estimate. See <a href="/blog/virginia-repair-shop-rights">your rights at a Virginia repair shop</a>.</p>
<h2>The actual limits, from the 2026 manual</h2>
<p>Most articles tell you that cars fail for "worn tires" or "bad brakes". The State Police manual is more specific, and knowing the real number helps you judge whether a failure makes sense. These are some of the most useful rejection standards for ordinary passenger vehicles.</p>
<h3>Tires</h3>
<ul>
<li>Tread below 2/32 of an inch, measured in two adjacent grooves where the tread is thinnest.</li>
<li>Tread wear indicators in contact with the road in two adjacent grooves.</li>
<li>Plugs or patches outside the tread area. Repairs in the sidewall are not allowed.</li>
<li>Exposed cord, or tread separating from the tire.</li>
</ul>
<p>You can check most of this yourself. Find the small raised bars across the bottom of the tread grooves. If the tread is level with those bars, the tire is done. Our <a href="/services/tire-wheel-service">tire and wheel service</a> can measure it for you.</p>
<h3>Brakes</h3>
<ul>
<li>Bonded, molded or riveted linings or disc pads worn below 2/32 of an inch.</li>
</ul>
<p>Inspectors also check the pedal, the parking brake and the lines and hoses. If you have been hearing a squeal, our <a href="/blog/brake-warning-signs">brake warning signs</a> post will help, and we offer a <a href="/services/brake-repair">free brake inspection</a>.</p>
<h3>Windshield and glass</h3>
<ul>
<li>A pit, chip or star crack larger than 1-1/2 inches in diameter anywhere above the three-inch line at the bottom of the windshield.</li>
<li>More than one crack from the same point above that line, if at least one is longer than 1-1/2 inches.</li>
<li>A driver's side scratch more than 1/4 inch wide and six inches long inside the wiper path.</li>
<li>A crack that lets one piece of glass move against another.</li>
<li>Any sticker on the windshield that is not official or permitted, and any expired sticker you will not authorize the inspector to remove.</li>
</ul>
<p>Plenty of windshields with a small crack down low pass without a problem. The three-inch line, measured up from where the dash meets the glass, matters a lot, and a repaired chip can pass if the windshield meets the standard afterward.</p>
<h3>Lights</h3>
<p>Every required light has to work, including the bulb that lights the rear license plate. Rear lamps built from multiple LEDs get some allowance and pass if more than 50% of the diodes are lit.</p>
<h3>Body and floor</h3>
<ul>
<li>A floor pan rusted through, or holes that could let exhaust gases into the cabin.</li>
<li>Rust holes or weakened sections in the frame or unibody.</li>
</ul>
<h3>Horn and exhaust</h3>
<ul>
<li>A horn that does not work.</li>
<li>Exhaust leaks. The exhaust check does not concern noise level, so a loud car is not an automatic failure, but a leaking one can be. See our <a href="/services/exhaust-repair">exhaust repair</a> page.</li>
</ul>
<h3>One that surprises people</h3>
<p>The airbag warning light is advisory. The manual tells inspectors to let the customer know, but not to reject the vehicle for the light alone. A deployed airbag that has not been replaced, a removed airbag component or an obvious defect in the system is a different story. Either way, an airbag light means the system may not protect you in a crash, so have it checked.</p>
<h2>What about the check engine light?</h2>
<p>Safety and emissions are separate tests. A check engine light is an emissions matter, and it is a failure on that test. Our guide to <a href="/blog/failed-virginia-emissions">failed emissions tests</a> covers that side. For help finding the cause, see <a href="/blog/check-engine-light-meaning">what a check engine light actually means</a>.</p>
<h2>What if the 15 days run out?</h2>
<p>Once the rejection sticker expires, you are back to a full inspection and the regular fee. Budget your time. If a part needs ordering, tell your shop about your deadline up front.</p>
<h2>How to avoid the failure next year</h2>
<p>Take five minutes in your driveway a week before your sticker expires:</p>
<ol>
<li>Walk around the car with someone working the lights, including brake lights, signals, reverse lights and the license plate bulb.</li>
<li>Run the wipers and washers, and look for streaks.</li>
<li>Honk the horn.</li>
<li>Check the tread with the wear bars.</li>
<li>Look at the windshield from outside for chips above the bottom edge.</li>
<li>Clear off expired parking and old registration stickers.</li>
</ol>
<p>If something fails at ${site.name}, we show you the problem, quote the repair up front and leave the decision with you. Bring it in during our regular hours at ${site.address.street}, or call ${site.phone.display}. Wondering whether you are due for emissions as well? Our free ${CHECKER} will tell you.</p>
${sources([
  ["19VAC30-70-60: Rejection stickers", "https://law.lis.virginia.gov/admincode/title19/agency30/chapter70/section60/"],
  ["Virginia State Police: Official Motor Vehicle Safety Inspection Manual 2026", "https://vsp.virginia.gov/wp-content/uploads/2026/05/Official-Motor-Vehicle-Safety-Inspection-Manual-2026.pdf"],
  ["Virginia State Police: Vehicle Safety Inspection", "https://vsp.virginia.gov/public-safety-programs-center/vehicle-safety-inspection/"],
  ["Code of Virginia 46.2-1158: Inspection interval", "https://law.lis.virginia.gov/vacode/title46.2/chapter10/section46.2-1158/"],
])}`,
  },
  {
    slug: "failed-virginia-emissions",
    category: "Inspections",
    title: "Failed Virginia Emissions? Retests, Not Ready and Waivers Explained",
    metaDescription:
      "Failed a Northern Virginia emissions test? How the free 14-day retest works, what 'not ready' really means, the monitor limits, repair waivers, and how to get a DMV extension.",
    teaser:
      "A failure, a rejection and a 'not ready' are three different things, and each has a different fix. Here is how to tell which one you have, and what the state lets you do about it.",
    published: "2026-11-04",
    bodyHtml: `<p>You went in to renew your registration and came out with a report you did not expect. Before you do anything else, work out which of three outcomes you actually got, because the Northern Virginia program treats them very differently.</p>
<h2>Failed, rejected or not ready?</h2>
<ul>
<li><strong>Failed</strong> means the vehicle was tested and did not meet the standard. You get a Vehicle Emissions Inspection Report showing what failed, and you need a repair and a retest, or a waiver.</li>
<li><strong>Rejected from testing</strong> means the test could not be safely or properly completed. DEQ is explicit that a rejection is not the same as a failed test, and you are not charged the inspection fee. Reasons include unsafe tires, fluid or exhaust leaks, visible smoke, a missing gas cap and engine or drivetrain problems.</li>
<li><strong>Not ready</strong> is a type of rejection. The car's computer has not finished its self-checks, so there is nothing to grade yet.</li>
</ul>
<h2>If it failed: the free retest</h2>
<p>A failing vehicle gets one free retest at the station that did the original test, within 14 calendar days of the initial inspection. Take that window seriously. Book the repair quickly, and leave enough time to drive the car before the retest, because the repair itself often clears the computer's readiness data. That is one of the most common ways people get caught: the repair is good, but the car goes back too soon and comes up not ready.</p>
<h2>The check engine light rule</h2>
<p>On most 1996-and-newer vehicles, the test reads the on-board diagnostic (OBD) system rather than measuring the tailpipe. Under Virginia's regulation, emissions-related fault codes that command the check engine light on are a failure. A light that does not work at all is also a failure.</p>
<p>Which means clearing the code yourself will not help. Erasing codes also resets the readiness monitors, so you trade a failure for a not-ready result, and the fault comes straight back if the cause is still there.</p>
<p>The usual causes are oxygen or air-fuel sensors, catalytic converter efficiency, evaporative system leaks, misfires and mass airflow problems. A code only tells you where to start looking, which is why we covered <a href="/blog/check-engine-light-meaning">the difference between a code and a diagnosis</a> in its own post. Our <a href="/services/engine-diagnostics">engine diagnostics</a> service exists to stop you buying parts you did not need.</p>
<h2>Not ready: how many monitors are allowed?</h2>
<p>Your car's computer runs a set of self-checks called readiness monitors. Battery disconnections, some repairs and cleared codes wipe them, and they only reset after the car has been driven through the right conditions. Virginia's rule sets a specific limit:</p>
<ul>
<li><strong>Model year 2001 and newer:</strong> rejected if two or more monitors are not ready.</li>
<li><strong>Model years 1996 to 2000:</strong> rejected if three or more monitors are not ready.</li>
<li><strong>Catalyst repairs:</strong> a car that failed on a catalytic converter code is rejected at reinspection if its catalyst monitor is not ready.</li>
</ul>
<p>So one incomplete monitor on a 2015 car is fine. Two is not. A car that is at the limit is exactly the sort of thing a good shop can check with a scan tool before you pay for a test.</p>
<h3>How to get monitors to finish</h3>
<p>There is no universal recipe, because each manufacturer has its own conditions, but this works for most cars:</p>
<ol>
<li>Start the car cold, ideally after it has sat overnight.</li>
<li>Drive a normal mix of city and highway for several days. Some monitors need steady highway speed, and others need stop-and-go.</li>
<li>Keep the fuel level between about a quarter and three quarters, since evaporative system monitors often will not run on a nearly full or empty tank.</li>
<li>Avoid disconnecting the battery or clearing codes during this time.</li>
</ol>
<p>Very cold weather can slow some monitors down, so allow extra time in January. If a monitor refuses to finish after a week or two of normal driving, something may be stopping it, and that is worth a <a href="/services/engine-diagnostics">diagnostic</a>.</p>
<h2>Running out of time before your registration expires</h2>
<p>You have a few options, and timing matters:</p>
<ul>
<li><strong>Test early.</strong> You can have the test done up to 90 days before your registration expires and still qualify for a two-year registration. Test any earlier and you may only be eligible for one year.</li>
<li><strong>Ask DMV for an extension.</strong> DMV offers a one-month extension for vehicles that need a test, at a customer service center or DMV Select office. It costs $10 plus prorated registration fees for that month, your registration has to be valid and expiring in the month you ask for, and it is allowed once per registration period.</li>
<li><strong>Check your history.</strong> DEQ has an online lookup that shows a vehicle's emissions inspection history, which helps if you are not sure when it was last tested.</li>
</ul>
<h2>What about a waiver?</h2>
<p>Virginia offers a waiver for vehicles that still cannot pass after a real repair effort, but the conditions are strict:</p>
<ul>
<li>The car must have failed an initial test and failed a retest.</li>
<li>Emissions-related diagnostic and repair costs must meet or exceed the current waiver threshold. DEQ reviews that figure annually and adjusts it based on the Consumer Price Index, so check with DEQ or your inspection report for today's number.</li>
<li>Only work done by or under a Certified Emissions Repair Technician at a Certified Emissions Repair Facility counts.</li>
</ul>
<p>That last point is the expensive one. You are free to have repairs done anywhere you like, but money spent elsewhere does not count toward a waiver. If your car has a hard problem and you think a waiver is a possibility, ask whether a shop is certified before you pay for work. DEQ can confirm who is. Keep every receipt.</p>
<h2>Is your car even supposed to be tested?</h2>
<p>Not every vehicle is in the program. Fully electric cars, qualified hybrids, motorcycles and gasoline vehicles 25 model years old or more are exempt, among others, and in 2026 that means model year 2001 and older for gasoline cars. Newer cars get four years before the first test, unless they were first titled in another state. Our free ${CHECKER} will work out where you stand.</p>
<p>Your renewal notice has the final word. Look for the line that says "Emissions Inspection Required."</p>
<h2>What it costs</h2>
<p>State law caps the emissions test at $30. Repairs are separate, and they range from a gas cap to a catalytic converter. A proper diagnosis comes first, so you pay for the fix your car needs, and under Virginia law you can ask for a <a href="/blog/virginia-repair-shop-rights">written estimate</a> before work begins.</p>
<h2>Bring it to us</h2>
<p>${site.name} handles <a href="/services/virginia-emissions-inspection">emissions testing</a>, diagnosis and repair under one roof at ${site.address.street} in Arlington. If you are not sure whether your car is ready to test, call ${site.phone.display} before you come in and we will tell you what to look for.</p>
${sources([
  ["Virginia DEQ: How do I get an inspection?", "https://www.deq.virginia.gov/air-energy/vehicle-emissions-air-check/how-do-i-get-an-inspection"],
  ["9VAC5-91-420: Emissions inspection procedure", "https://law.lis.virginia.gov/admincode/title9/agency5/chapter91/section420/"],
  ["Code of Virginia 46.2-1182: Inspection fee", "https://law.lis.virginia.gov/vacode/title46.2/chapter10/section46.2-1182/"],
  ["Virginia DMV: Emissions Inspections", "https://www.dmv.virginia.gov/vehicles/registration/emissions"],
])}`,
  },
  {
    slug: "virginia-repair-shop-rights",
    category: "Local Guides",
    title: "Your Rights at a Virginia Repair Shop: Estimates, the 10% Rule and Old Parts",
    metaDescription:
      "Virginia's Automobile Repair Facilities Act gives you written estimates, a 10 percent cap on overruns, your old parts back and a detailed invoice. Here is what it says in plain English.",
    teaser:
      "Virginia has a specific law covering auto repair, and most drivers have never heard of it. Here is what any shop in the state owes you, including us.",
    published: "2026-11-04",
    bodyHtml: `<p>A repair bill that comes in higher than you expected is one of the most common reasons people distrust mechanics. Virginia has an actual law about this, the Automobile Repair Facilities Act, and it applies to any business that fixes cars for profit in the Commonwealth. Here is what it says, in plain English.</p>
<h2>You can ask for a written estimate</h2>
<p>If a job may cost you more than $25, the shop must give you a written estimate on request, before work starts. It has to cover:</p>
<ul>
<li>The estimated cost of labor</li>
<li>The estimated cost of parts</li>
<li>A description of the work</li>
<li>The estimated completion time</li>
</ul>
<p>Two small details from the statute: a shop does not have to provide estimates before 10:00 a.m. or after 4:00 p.m. on a working day, and it does not have to give an estimate for work it is unwilling to do. The key words are "on request," so ask.</p>
<h2>Nothing starts until you say so</h2>
<p>Aside from the diagnostic work needed to prepare the estimate, repair work cannot begin until you have received the estimate and authorized the job.</p>
<h2>The 10 percent rule</h2>
<p>This is the part worth remembering. Once you have approved an estimate, the shop cannot charge more than 10 percent over it without your authorization. For a vehicle at least 25 model years old, the limit is 20 percent. Your authorization can be written or verbal, and the same rule applies if the shop wants more time than the estimate said.</p>
<p>So on a $600 estimate, the shop needs to call you before the bill goes past $660. When a repair uncovers something new, that is a legitimate reason for the call. A good shop will stop, show you and ask.</p>
<h2>A shop can charge for the estimate</h2>
<p>A shop may set reasonable conditions on estimates, including a reasonable fee for the estimate and related diagnostic work, as long as it tells you when you ask, in writing or on a sign posted at the entrance.</p>
<p>This surprises people, but it is fair. Finding an intermittent electrical fault can take a technician real time, and that time has value whether or not you buy the repair. The law only asks for the fee to be disclosed in advance, so there should be no surprises. A shop's own offers may go further. For example, we offer a free brake inspection.</p>
<h2>You can have your old parts</h2>
<p>When you authorize the work, the shop must offer to return the parts it replaces. There are exceptions for parts that have to go back to a manufacturer or distributor under a warranty, trade-in or core charge arrangement. If you want one of those, you may have to pay the core or trade-in fee. Even when a shop keeps a part for that reason, you can still inspect it.</p>
<p>Asking to see the old part is the simplest honesty check in car repair, and no good mechanic will be bothered by it.</p>
<h2>You get an itemized invoice</h2>
<p>When the job is done, including warranty work, you are entitled to a written invoice that:</p>
<ul>
<li>Describes the work performed</li>
<li>States parts and labor charges separately</li>
<li>Distinguishes warranty parts from non-warranty parts</li>
<li>Identifies used, rebuilt or reconditioned parts</li>
</ul>
<p>This does not apply to work done at an advertised single price, like a set-price oil change. Keep these invoices. They are your proof of maintenance if a warranty question comes up, as we explain in <a href="/blog/dealer-vs-independent-warranty">our guide to dealer and independent service</a>.</p>
<h2>Look for the "Customer Rights" sign</h2>
<p>The law requires shops to post a sign headed "Customer Rights" that spells out your right to an estimate, the 10 percent limit, any estimate conditions, the offer to return parts and where to send complaints. If you are wondering what a particular shop's terms are, that sign is where to start.</p>
<h2>What can you do if a shop ignores this?</h2>
<p>Start with the shop. Most disputes come down to a misunderstanding, and a calm conversation with the manager, estimate in hand, often settles it. Put your complaint in writing if it does not.</p>
<p>If that goes nowhere, a violation of the Act is treated as a prohibited practice under the Virginia Consumer Protection Act. The statute directs complaints to the Division of Consumer Counsel in the Department of Law. Today, complaints go to the Consumer Protection Unit of the Virginia Attorney General's office. If you paid by card, your card issuer may also have a dispute process. For anything sizable, talk to a lawyer, since this article is general information and not legal advice.</p>
<h2>What this does not cover</h2>
<ul>
<li>A shop that is honest about an estimate can still be wrong about a diagnosis. The law protects your right to information, not the quality of the opinion, so a second opinion is always reasonable on a big repair.</li>
<li>The estimate section does not apply to cars listed in the Antique Automobile Club of America's Official Judging Manual.</li>
<li>A shop is not liable for missing an estimated completion date because of an act of God, an unexpected shortage of parts or labor, or other causes beyond its control.</li>
</ul>
<h2>Five questions to ask any shop</h2>
<ol>
<li>Can I get that estimate in writing?</li>
<li>Is there a diagnostic fee, and does it go toward the repair?</li>
<li>Which items are urgent, and which can wait?</li>
<li>Will you call me before going over the estimate?</li>
<li>Can I see the old parts?</li>
</ol>
<p>Those are good questions anywhere in Arlington. They are also the way we prefer to work: we explain what we found, quote it before we start and leave the decision to you. Our repairs come with a ${site.warranty.label.toLowerCase()}, and customers who want to compare can read <a href="/reviews">what our customers say</a>.</p>
<p>Got an estimate from another shop that does not feel right? Bring it to ${site.address.street} or call ${site.phone.display}. We will look at the car and tell you straight.</p>
${sources([
  ["Code of Virginia, Automobile Repair Facilities Act (59.1-207.1 and following)", "https://law.lis.virginia.gov/vacode/title59.1/chapter17.1/"],
  ["59.1-207.3: Written estimates, overruns and the Customer Rights sign", "https://law.lis.virginia.gov/vacode/title59.1/chapter17.1/section59.1-207.3/"],
  ["59.1-207.4: Offer to return replaced parts", "https://law.lis.virginia.gov/vacode/title59.1/chapter17.1/section59.1-207.4/"],
  ["Virginia Attorney General: Consumer Protection", "https://www.oag.state.va.us/consumer-protection"],
])}`,
  },
  {
    slug: "dealer-vs-independent-warranty",
    category: "Local Guides",
    title: "Do You Have to Use the Dealer? Warranty Rules for Arlington Drivers",
    metaDescription:
      "Federal law says an independent shop can service your car without voiding the warranty. What the rule covers, when the dealer really is the right call, and which records to keep.",
    teaser:
      "No, you do not have to use the dealer to keep your warranty. But there are a few jobs the dealer should still do. Here is an honest breakdown, from an independent shop.",
    published: "2026-11-04",
    bodyHtml: `<p>Northern Virginia has dealer service departments on every major road, and a lot of people keep going to them for one reason: they believe that using anyone else will void the warranty. It will not. Here is what the law says, along with the cases where we would send you to the dealer ourselves.</p>
<h2>The short answer</h2>
<p>The Federal Trade Commission's guidance is direct. You do not need to use the dealer for maintenance or repairs to keep your warranty in effect. An independent mechanic, a retail chain or you yourself can do the work. The Magnuson-Moss Warranty Act makes it illegal for a manufacturer or dealer to claim a warranty is void, or to deny coverage, simply because someone other than the dealer did the work.</p>
<p>The FTC has acted on this. In 2015 it took action against BMW over claims tying MINI warranties to the use of MINI parts and service, and in July 2024 FTC staff sent warning letters to eight companies in other industries, from air purifiers to PC hardware, over similar warranty terms.</p>
<h2>Using non-dealer parts</h2>
<p>The same principle applies to parts. Using an aftermarket or recycled part does not by itself void your warranty. A manufacturer can only require a specific brand of part if it provides that part for free or gets a waiver from the FTC, and that waiver is a narrow exception.</p>
<h2>The catch: damage from a bad repair</h2>
<p>A warranty is not a shield for bad work. If a repair is done wrong and damages something else, the manufacturer can deny coverage for that damage. The FTC's example is a belt installed improperly that ruins an engine. The manufacturer has to be able to show that the belt work, and not some other defect, caused the damage, and the rest of the warranty stays in effect for the other parts of the car.</p>
<p>The lesson is simple: the question is who does the work well, not whose name is on the building.</p>
<h2>What to do to stay protected</h2>
<ul>
<li><strong>Follow your maintenance schedule</strong> in the owner's manual. A claim can be denied if it looks like the car was not maintained.</li>
<li><strong>Keep every receipt,</strong> whoever does the work. Virginia law requires shops to give you a written invoice, as we cover in <a href="/blog/virginia-repair-shop-rights">your rights at a Virginia repair shop</a>.</li>
<li><strong>Make sure the invoice shows</strong> the date, your mileage, and the parts and fluids used.</li>
<li><strong>Use the fluid specifications</strong> in your manual. Ask your shop to confirm they match, especially on European cars with specific oil approvals.</li>
</ul>
<h2>When the dealer is the right call</h2>
<p>An independent shop will not tell you this enough, so we will:</p>
<ul>
<li><strong>Repairs covered by your warranty.</strong> If the repair is free under warranty, the manufacturer can require you to use one of its authorized facilities. Do not pay us for something the dealer will fix at no charge.</li>
<li><strong>Safety recalls.</strong> Recall repairs are done at no cost at the dealer. Check your VIN at NHTSA's recall lookup. It takes a minute and is worth doing on any used car.</li>
<li><strong>Some software updates.</strong> Certain manufacturer updates and programming can only be done through dealer systems.</li>
<li><strong>Service contracts.</strong> If you bought an extended service contract, read it. These are separate agreements and can set their own rules on where you go and which approvals you need.</li>
</ul>
<h2>When an independent shop tends to make sense</h2>
<ul>
<li><strong>Routine maintenance.</strong> Oil changes, brakes, tires, batteries, fluids and filters are all work an independent can do under the rule above.</li>
<li><strong>Cars out of warranty.</strong> The warranty question no longer applies, so you are simply choosing on price, trust and convenience.</li>
<li><strong>A second opinion.</strong> A big dealer quote is worth checking before you approve it.</li>
<li><strong>Having one place for everything.</strong> The same people see your car year after year and remember its history. We also do <a href="/services/virginia-state-inspection">state inspections</a> and <a href="/services/virginia-emissions-inspection">emissions tests</a> in the same visit as repairs.</li>
</ul>
<p>Here is how one customer described it in a Google review: "I brought my car in with an electrical issue after the dealership told me it would cost thousands of dollars to repair. Jose quickly diagnosed the problem, and had it fixed very quickly." That is one customer's experience and not a promise about any particular repair, but it shows why a second opinion is worth getting.</p>
<h2>What about leased cars?</h2>
<p>Lease contracts are private agreements, and they often spell out maintenance requirements and how the car has to look when you return it. The warranty rule still applies to the warranty, but check your lease terms for anything specific about service records, tires and repairs.</p>
<h2>Does a shop have to be "certified" for this?</h2>
<p>No. The federal rule is not tied to a particular certification. That said, certifications and affiliations can tell you something about how a shop operates. ${site.name} is an AAA Approved Auto Repair facility, which AAA says involves a comprehensive investigation and meeting its quality standards. AAA members can get a labor discount here, subject to AAA's terms.</p>
<h2>If someone tells you your warranty is void</h2>
<p>Ask them to explain, in writing, exactly what caused the failure and why the outside work is responsible. Remember that they have to show the link. If you think a dealer or manufacturer has wrongly refused coverage, you can complain to the FTC or the Virginia Attorney General's Consumer Protection Unit.</p>
<h2>Come see us</h2>
<p>We work on all makes at ${site.address.oneLine}, and we give you a detailed invoice to keep with your records. Call ${site.phone.display} or <a href="/quote">request a quote</a>. If your car needs to go to the dealer, we will say so.</p>
${sources([
  ["FTC: Auto Warranties & Routine Maintenance (archived consumer alert)", "https://web.archive.org/web/20260131210228/https://www.consumer.ftc.gov/articles/auto-warranties-routine-maintenance"],
  ["FTC: Businessperson's Guide to Federal Warranty Law", "https://www.ftc.gov/business-guidance/resources/businesspersons-guide-federal-warranty-law"],
  ["FTC: Warns Companies to Stop Warranty Practices (July 2024)", "https://www.ftc.gov/news-events/news/press-releases/2024/07/ftc-warns-companies-stop-warranty-practices-harm-consumers-right-repair"],
  ["FTC: Don't MINImize Mag-Moss warranty compliance (2015)", "https://www.ftc.gov/business-guidance/blog/2015/03/ftc-bmw-dont-minimize-mag-moss-warranty-compliance"],
  ["NHTSA: Check for recalls by VIN", "https://www.nhtsa.gov/recalls"],
])}`,
  },
  {
    slug: "hybrid-ev-maintenance-virginia",
    category: "Local Guides",
    title: "Hybrid and EV Care in Northern Virginia: Inspections, Fees and Maintenance",
    metaDescription:
      "What hybrid and electric car owners in Northern Virginia need to know: which vehicles need emissions tests, the safety inspection, the Highway Use Fee, and what maintenance still matters.",
    teaser:
      "EVs still need a Virginia safety inspection. Most hybrids still need an emissions test. And neither gets out of maintenance. Here is what actually applies to your car.",
    published: "2026-11-04",
    bodyHtml: `<p>Northern Virginia has plenty of hybrids and electric cars, and most of what owners read about them comes from the people selling them. "No maintenance" is a popular pitch. It is also wrong. Here is what Virginia requires, and what your car really needs.</p>
<h2>Do EVs need a Virginia inspection?</h2>
<p>Yes. There are two separate programs, and an EV is exempt from only one of them.</p>
<ul>
<li><strong>Safety inspection: required.</strong> Every vehicle registered in Virginia needs one every 12 months, whatever powers it. The state caps the fee at $20 for most vehicles. Tires, brakes, lights, steering, suspension, glass and seat belts all still get checked. Our <a href="/services/virginia-state-inspection">state inspection</a> covers this.</li>
<li><strong>Emissions inspection: exempt.</strong> Vehicles powered exclusively by electricity are outside the emissions program.</li>
</ul>
<h2>Do hybrids need an emissions test?</h2>
<p>Usually yes, which surprises a lot of owners. A hybrid is only exempt if it is a "qualified hybrid," meaning it has an EPA city rating of at least 50 mpg, or 48 mpg for model years 2008 and 2009. Most hybrids, including many hybrid SUVs and trucks, do not reach that figure and go through the normal two-year test if garaged in the Northern Virginia program area.</p>
<p>Three things to keep in mind:</p>
<ul>
<li>Qualified hybrids pay a small annual emissions fee at renewal instead. DMV lists this at $2 a year.</li>
<li>All hybrids stay subject to DEQ's on-road emissions program, so a car flagged by roadside sensors can be called in for a test.</li>
<li>Plug-in hybrids have an engine, so they are not "powered exclusively by electricity." Check your specific model's EPA city rating, or use our free ${CHECKER}.</li>
</ul>
<h2>The Highway Use Fee</h2>
<p>Because efficient cars buy less gas, they pay less fuel tax, so Virginia charges a Highway Use Fee at registration. It applies to electric vehicles and to vehicles rated at 25 mpg or more, and it varies by fuel economy, with EVs at the top of the scale. The amounts change with the fuel tax, so look at DMV's current fee chart rather than a number you read in an article. Owners of qualifying vehicles can also look into DMV's per-mile alternative, which is set up so you do not pay more than the annual fee.</p>
<p>If you are moving here from another state, read our <a href="/blog/moving-to-arlington-car-checklist">Arlington moving checklist</a>, since this fee comes up at registration.</p>
<h2>What hybrid maintenance looks like</h2>
<p>A hybrid has a full gasoline engine as well as an electric system. It needs nearly everything a regular car needs, on a schedule set by your owner's manual:</p>
<ul>
<li><strong>Oil changes,</strong> using the specified oil. The engine stops and starts constantly and often runs for short periods, so do not stretch the interval. See <a href="/blog/how-often-oil-change">how often you really need an oil change</a>.</li>
<li><strong>Coolant,</strong> sometimes for both the engine and the inverter.</li>
<li><strong>Spark plugs, belts and filters.</strong> Depending on your model, the timing system may be on a schedule as well. See our <a href="/blog/timing-belt-vs-chain">timing belt guide</a>.</li>
<li><strong>Hybrid battery cooling.</strong> Many hybrids have a small fan and filter that keep the high-voltage battery cool. If that intake clogs with dust or pet hair, the battery runs hotter. It is easy to overlook and usually simple to clean.</li>
</ul>
<h2>What EV maintenance looks like</h2>
<p>EVs drop oil changes, spark plugs and exhaust work. What is left matters more than people assume.</p>
<h3>Tires</h3>
<p>Tires are the main wear item on an EV. These cars tend to be heavy, with instant torque, and many owners go through tires sooner than they expected. Rotate on schedule, check alignment if you see uneven wear, and buy tires with the right load rating for your car. Virginia's 2/32 inch tread minimum applies the same as on any car. Our <a href="/services/tire-wheel-service">tire and wheel service</a> can help.</p>
<h3>Brakes</h3>
<p>Regenerative braking does much of the slowing down, so pads can last a long time. The risk runs the other way: brakes that rarely work hard can stick or rust, particularly in a Virginia winter. The fluid still ages, too. Follow the manufacturer's interval for brake fluid, and if you hear grinding, have it looked at. The inspection still measures pad thickness and condition.</p>
<h3>The 12-volt battery</h3>
<p>This trips up a lot of EV and hybrid owners. Alongside the big traction battery, almost all of these cars have a small 12-volt battery that powers the computers, lights and door locks. If it dies, the car may not start, even with a full main battery. Our <a href="/blog/car-battery-life-virginia">battery guide</a> applies here, and a slow-to-wake car is a good reason to get it tested. Our <a href="/services/battery-alternator-starter">battery service</a> can check it.</p>
<h3>Cooling and cabin systems</h3>
<p>EVs use coolant loops for the battery and electronics, and their air conditioning does extra work to condition the cabin and, on many models, the battery. Follow your manual's schedule, and replace the cabin air filter.</p>
<h3>Suspension and steering</h3>
<p>Added weight is hard on bushings, ball joints and shocks, especially on Northern Virginia roads. Those parts are part of the safety inspection. See <a href="/services/suspension-steering">suspension and steering</a>.</p>
<h2>Cold weather</h2>
<p>AAA's 2026 testing found that at 20°F, with the cabin heated to 72°F, EVs lost about 39% of their calculated range compared with 75°F, and hybrids lost about 22.8% of their fuel economy. Heat matters less, at about 8.5% EV range loss at 95°F. Warming the cabin while plugged in and using heated seats both help. Our <a href="/blog/winter-car-checklist-arlington">winter checklist</a> has the rest.</p>
<h2>A word on high-voltage safety</h2>
<p>High-voltage systems are usually marked with orange cables. Do not touch them or try to work on them yourself. They can seriously injure you, and that risk does not go away when the car is switched off. If you have been in a crash, make sure the car is checked before anyone works on it.</p>
<h2>Where to get service</h2>
<p>The general rules on warranties apply here too, so routine maintenance does not have to go to the dealer. The manufacturer's battery warranty is its own coverage, so read it before anyone works on the high-voltage battery. See <a href="/blog/dealer-vs-independent-warranty">our warranty guide</a>.</p>
<p>${site.name} services hybrids and EVs along with gas and diesel cars. Because high-voltage work varies a lot by model, call ${site.phone.display} with your make, model and what is going on, and we will tell you straight whether it is a job for us. Find us at ${site.address.oneLine}.</p>
${sources([
  ["Virginia DEQ: How do I get an inspection?", "https://www.deq.virginia.gov/air-energy/vehicle-emissions-air-check/how-do-i-get-an-inspection"],
  ["Code of Virginia 46.2-1178: Qualified hybrids", "https://law.lis.virginia.gov/vacode/title46.2/chapter10/section46.2-1178/"],
  ["Virginia DMV: Emissions Inspections", "https://www.dmv.virginia.gov/vehicles/registration/emissions"],
  ["Code of Virginia 46.2-772: Highway use fee", "https://law.lis.virginia.gov/vacode/title46.2/chapter7/section46.2-772/"],
  ["Virginia DMV: New to Virginia (registration and fees)", "https://www.dmv.virginia.gov/moving/new-virginia"],
  ["AAA: Study Reveals Temperature Impacts on EV and Hybrid Efficiencies and Costs (May 2026)", "https://newsroom.aaa.com/2026/05/aaa-study-reveals-temperature-impacts-on-ev-and-hybrid-performance-efficiency-and-costs/"],
])}`,
  },
];
