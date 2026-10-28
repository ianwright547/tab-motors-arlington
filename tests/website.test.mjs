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
