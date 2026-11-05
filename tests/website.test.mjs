import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { registerHooks } from "node:module";
import { test } from "node:test";

// Node 24 strips types; resolve the extensionless imports used by Next.js.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith(".") && context.parentURL) {
      const candidate = new URL(`${specifier}.ts`, context.parentURL);
      if (existsSync(candidate)) return nextResolve(candidate.href, context);
    }
    return nextResolve(specifier, context);
  },
});

const { default: config } = await import("../next.config.ts");
const { services } = await import("../src/lib/services.ts");
const { areas } = await import("../src/lib/areas.ts");
const { posts } = await import("../src/lib/blog.ts");
const { quoteFormSchema, stepSchemas, TOTAL_STEPS } =
  await import("../src/lib/validation.ts");

const contact = {
  name: "Website QA",
  phone: "202-555-0142",
  email: "",
  contactMethod: "call",
};
const request = {
  vehicleYear: "2018",
  vehicleMake: "Honda",
  vehicleModel: "Accord",
  vehicleMileage: "",
  services: ["brake-repair"],
  problemDescription: "",
  urgency: "flexible",
  preferredDate: "",
  dropOff: "unsure",
  aaaMember: false,
  referralSource: "",
  attachments: [],
};

test("all former static URLs permanently redirect to existing current routes", async () => {
  const rules = (await config.redirects()).filter((rule) => !rule.has);
  const current = new Set([
    "/",
    "/quote",
    "/services",
    "/service-areas",
    "/blog",
    "/contact",
    "/about",
    "/reviews",
    "/privacy",
    ...services.map((service) => `/services/${service.slug}`),
    ...areas.map((area) => `/service-areas/${area.slug}`),
    ...posts.map((post) => `/blog/${post.slug}`),
  ]);
  assert.equal(rules.length, 38);
  assert.equal(new Set(rules.map((rule) => rule.source)).size, rules.length);
  for (const rule of rules) {
    assert.equal(rule.permanent, true);
    assert(current.has(rule.destination), `Missing target for ${rule.source}`);
    assert(
      !rule.source.includes(":"),
      "Unknown paths must not be redirected by a broad wildcard",
    );
  }
  assert(
    rules.some(
      (rule) =>
        rule.source === "/services/fuel-system-service.html" &&
        rule.destination === "/services/fuel-system-service",
    ),
  );
});

test("contact can be completed first without vehicle or scheduling details", () => {
  assert.equal(TOTAL_STEPS, 2);
  assert.equal(stepSchemas[1].safeParse(contact).success, true);
});

test("email preference requires an email and invalid phone numbers stay blocked", () => {
  assert.equal(
    stepSchemas[1].safeParse({ ...contact, contactMethod: "email" }).success,
    false,
  );
  assert.equal(
    stepSchemas[1].safeParse({
      ...contact,
      contactMethod: "email",
      email: "qa@example.com",
    }).success,
    true,
  );
  assert.equal(
    stepSchemas[1].safeParse({ ...contact, phone: "123" }).success,
    false,
  );
});

test("minimal service details produce the same valid normalized API payload", () => {
  assert.equal(stepSchemas[2].safeParse(request).success, true);
  const result = quoteFormSchema.parse({
    ...contact,
    ...request,
    honeypot: "",
    elapsedMs: 5000,
  });
  assert.equal(result.vehicleYear, 2018);
  assert.equal(result.vehicleMileage, null);
  assert.equal(result.preferredDate, null);
  assert.equal(result.email, null);
  assert.deepEqual(result.services, ["brake-repair"]);
});

test("other service still requires a useful explanation", () => {
  assert.equal(
    stepSchemas[2].safeParse({ ...request, services: ["other"] }).success,
    false,
  );
  assert.equal(
    stepSchemas[2].safeParse({
      ...request,
      services: ["other"],
      problemDescription: "Car stalls at traffic lights",
    }).success,
    true,
  );
});

test("optional fields still reject invalid mileage, dates and service values", () => {
  assert.equal(
    stepSchemas[2].safeParse({ ...request, vehicleMileage: "abc" }).success,
    false,
  );
  assert.equal(
    stepSchemas[2].safeParse({ ...request, preferredDate: "2000-01-01" })
      .success,
    false,
  );
  assert.equal(
    stepSchemas[2].safeParse({ ...request, services: ["unknown"] }).success,
    false,
  );
  assert.equal(
    stepSchemas[2].safeParse({ ...request, vehicleYear: "" }).success,
    false,
  );
});

test("server validation still rejects invalid contact and a filled spam trap", () => {
  assert.equal(
    quoteFormSchema.safeParse({ ...contact, ...request, name: "" }).success,
    false,
  );
  assert.equal(
    quoteFormSchema.safeParse({ ...contact, ...request, honeypot: "spam" })
      .success,
    false,
  );
});

test("inspection checker matches the emissions statute and agency examples", async () => {
  const { checkVehicle, oldestCoveredModelYear, qualifiedHybridMpg, addDays } =
    await import("../src/lib/inspection-rules.ts");
  const base = {
    inProgramArea: true,
    vehicleType: "car",
    fuel: "gasoline",
    modelYear: 2015,
    weightClass: "up-to-8500",
    titledNewInVirginia: true,
    hybridMeetsMpg: false,
  };
  const emissions = (overrides, year = 2026) =>
    checkVehicle({ ...base, ...overrides }, year).emissions.status;

  // DMV's worked example: a 1994 model year is exempt on January 1, 2019.
  assert.equal(emissions({ modelYear: 1994 }, 2019), "exempt");
  assert.equal(emissions({ modelYear: 1995 }, 2019), "required");
  assert.equal(oldestCoveredModelYear(2026), 2002);
  assert.equal(emissions({ modelYear: 2001 }), "exempt");
  assert.equal(emissions({ modelYear: 2002 }), "required");

  // Current model year plus the three before it, unless titled elsewhere first.
  assert.equal(emissions({ modelYear: 2023 }), "exempt");
  assert.equal(emissions({ modelYear: 2022 }), "required");
  assert.equal(emissions({ modelYear: 2024, titledNewInVirginia: false }), "check-dmv");

  assert.equal(emissions({ fuel: "electric" }), "exempt");
  assert.equal(emissions({ fuel: "hybrid" }), "required");
  assert.equal(emissions({ fuel: "hybrid", hybridMeetsMpg: true }), "exempt");
  assert.equal(qualifiedHybridMpg(2008), 48);
  assert.equal(qualifiedHybridMpg(2015), 50);

  assert.equal(emissions({ fuel: "diesel", modelYear: 1996 }), "exempt");
  assert.equal(emissions({ fuel: "diesel", modelYear: 2010 }), "required");
  assert.equal(emissions({ fuel: "diesel", modelYear: 2010, weightClass: "8501-10000" }), "exempt");
  assert.equal(emissions({ weightClass: "8501-10000" }), "required");
  assert.equal(emissions({ weightClass: "over-10000" }), "exempt");
  assert.equal(emissions({ vehicleType: "motorcycle" }), "exempt");
  assert.equal(emissions({ inProgramArea: false }), "exempt");

  // Safety applies to everything, including an exempt EV.
  assert.equal(checkVehicle({ ...base, fuel: "electric" }, 2026).safety.feeCap, "$20");
  assert.equal(checkVehicle({ ...base, vehicleType: "motorcycle" }, 2026).safety.feeCap, "$12");

  assert.equal(addDays("2026-11-04", 30), "2026-12-04");
  assert.equal(addDays("2026-12-15", 60), "2027-02-13");
});

test("every article has a valid date, and related articles exist", () => {
  const iso = /^\d{4}-\d{2}-\d{2}$/;
  for (const post of posts) {
    assert.match(post.published, iso, post.slug);
    if (post.updated) assert.match(post.updated, iso, post.slug);
  }
  assert.equal(new Set(posts.map((post) => post.slug)).size, posts.length);
  const slugs = new Set(posts.map((post) => post.slug));
  for (const service of services) {
    for (const slug of service.relatedPosts) assert.ok(slugs.has(slug), `${service.slug}: ${slug}`);
  }
});
