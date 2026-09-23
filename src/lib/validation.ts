import { z } from "zod";
import { isValidServiceValue } from "./services";
import { isValidUsPhone } from "./format";

/**
 * One schema definition, three consumers:
 *
 *   - the browser, per step, for instant feedback as the customer moves through
 *   - the browser, in full, before submitting
 *   - the API route, in full, before touching the database
 *
 * The last one is the only one that counts. Client validation is a courtesy;
 * the server never trusts the payload.
 */

const currentYear = new Date().getFullYear();

/** Trims, and turns "" into undefined so optional text fields stay clean. */
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => (value === "" ? undefined : value))
    .optional();

/**
 * Number-in-a-text-box, with a distinct message for each way it can be wrong.
 *
 * `z.coerce.number()` can't do this on its own: it turns "" into 0, so leaving
 * the year blank produced "That year seems too old" instead of "Enter the
 * vehicle year". Accepts a real number too, so the API stays usable by anything
 * that isn't our own form.
 */
function requiredInteger(messages: {
  missing: string;
  invalid: string;
  min: [number, string];
  max: [number, string];
}) {
  // `undefined` is accepted here so that a payload which omits the key gets the
  // same human "Enter the vehicle year" as one that sends an empty string,
  // rather than Zod's raw union error.
  return z.union([z.string(), z.number(), z.undefined()]).transform((raw, ctx) => {
    const text = raw === undefined ? "" : typeof raw === "number" ? String(raw) : raw.trim();

    if (text === "") {
      ctx.addIssue({ code: "custom", message: messages.missing });
      return z.NEVER;
    }
    if (!/^\d+$/.test(text)) {
      ctx.addIssue({ code: "custom", message: messages.invalid });
      return z.NEVER;
    }

    const value = Number(text);
    if (value < messages.min[0]) {
      ctx.addIssue({ code: "custom", message: messages.min[1] });
      return z.NEVER;
    }
    if (value > messages.max[0]) {
      ctx.addIssue({ code: "custom", message: messages.max[1] });
      return z.NEVER;
    }
    return value;
  });
}

/** Same, but blank is allowed and becomes null. */
function optionalInteger(messages: { invalid: string; max: [number, string] }) {
  return z
    .union([z.string(), z.number()])
    .optional()
    .transform((raw, ctx) => {
      if (raw === undefined) return null;
      const text = typeof raw === "number" ? String(raw) : raw.trim();
      if (text === "") return null;

      if (!/^\d+$/.test(text)) {
        ctx.addIssue({ code: "custom", message: messages.invalid });
        return z.NEVER;
      }

      const value = Number(text);
      if (value > messages.max[0]) {
        ctx.addIssue({ code: "custom", message: messages.max[1] });
        return z.NEVER;
      }
      return value;
    });
}

export const urgencyValues = ["asap", "this_week", "next_week", "flexible"] as const;
export const dropOffValues = ["wait", "leave", "unsure"] as const;
export const contactMethodValues = ["call", "text", "email"] as const;

export const urgencyLabels: Record<(typeof urgencyValues)[number], string> = {
  asap: "As soon as possible",
  this_week: "Sometime this week",
  next_week: "Next week",
  flexible: "I'm flexible",
};

export const urgencyHints: Record<(typeof urgencyValues)[number], string> = {
  asap: "Car is undriveable or unsafe",
  this_week: "Needs attention soon",
  next_week: "Planning ahead",
  flexible: "Whenever suits you",
};

export const dropOffLabels: Record<(typeof dropOffValues)[number], string> = {
  wait: "I'll wait at the shop",
  leave: "I'll leave the car",
  unsure: "Not sure yet",
};

export const contactMethodLabels: Record<(typeof contactMethodValues)[number], string> = {
  call: "Phone call",
  text: "Text message",
  email: "Email",
};

export const attachmentSchema = z.object({
  url: z.string().url().max(2000),
  filename: z.string().trim().min(1).max(255),
  contentType: z.string().trim().min(1).max(120),
  size: z.number().int().min(1).max(15 * 1024 * 1024),
});

/**
 * The plain object shape. Kept separate from the refined schema below so that
 * `.pick()` still works — once you attach a `superRefine`, the result is no
 * longer a ZodObject and can't be narrowed to a single step.
 */
export const quoteBaseSchema = z.object({
  // ---- Step 1: vehicle ----
  vehicleYear: requiredInteger({
    missing: "Enter the vehicle year",
    invalid: "Enter the year as 4 digits, like 2016",
    min: [1900, "That year looks too old. Please check it"],
    max: [currentYear + 2, `Year can't be later than ${currentYear + 2}`],
  }),
  vehicleMake: z.string({ error: "Enter the make" }).trim().min(1, "Enter the make").max(60),
  vehicleModel: z.string({ error: "Enter the model" }).trim().min(1, "Enter the model").max(60),
  vehicleMileage: optionalInteger({
    invalid: "Enter the mileage using numbers only",
    max: [2_000_000, "That mileage looks too high. Please check it"],
  }),

  // ---- Step 2: what they need ----
  services: z
    .array(z.string(), { error: "Pick at least one, or choose “Something else”" })
    .min(1, "Pick at least one, or choose “Something else”")
    .max(20)
    .refine((values) => values.every(isValidServiceValue), {
      message: "One of those services isn't recognized",
    }),
  problemDescription: optionalText(4000),

  // ---- Step 3: timing ----
  urgency: z.enum(urgencyValues, { message: "Let us know how soon you need it" }),
  preferredDate: z
    .union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use the date picker"), z.literal("")])
    .optional()
    .transform((value) => (value ? value : null)),
  dropOff: z.enum(dropOffValues).default("unsure"),

  // ---- Step 4: contact ----
  name: z.string({ error: "Enter your name" }).trim().min(2, "Enter your name").max(100),
  phone: z
    .string({ error: "Enter a 10-digit US phone number" })
    .trim()
    .refine(isValidUsPhone, { message: "Enter a 10-digit US phone number" }),
  email: z
    .union([z.string().trim().pipe(z.email("Enter a valid email address")), z.literal("")])
    .optional()
    .transform((value) => (value ? value : null)),
  contactMethod: z.enum(contactMethodValues).default("call"),
  aaaMember: z.boolean().default(false),
  referralSource: optionalText(200),

  attachments: z.array(attachmentSchema).max(5).default([]),

  // ---- Anti-spam, never shown to a human ----
  /** A hidden field real users can't see and therefore never fill in. */
  honeypot: z.string().max(0, "Submission rejected").optional(),
  /** Milliseconds between the form rendering and being submitted. */
  elapsedMs: z.coerce.number().int().min(0).optional(),
  turnstileToken: z.string().max(4000).optional(),
});

type BaseOutput = z.output<typeof quoteBaseSchema>;

/**
 * Cross-field rules. Split out so each one can be attached to the single step
 * it belongs to as well as to the whole-form schema.
 */

function emailRequiredForEmailContact(
  data: Pick<BaseOutput, "contactMethod" | "email">,
  ctx: z.RefinementCtx,
) {
  // Asking to be emailed without giving an email address is the most common way
  // a lead arrives uncontactable.
  if (data.contactMethod === "email" && !data.email) {
    ctx.addIssue({
      code: "custom",
      path: ["email"],
      message: "Add your email address, or pick a different way to reach you",
    });
  }
}

function otherRequiresDescription(
  data: Pick<BaseOutput, "services" | "problemDescription">,
  ctx: z.RefinementCtx,
) {
  // "Something else" with no explanation leaves the owner nothing to quote.
  if (data.services.includes("other") && !data.problemDescription) {
    ctx.addIssue({
      code: "custom",
      path: ["problemDescription"],
      message: "Tell us a little about what you need so we can quote it",
    });
  }
}

function preferredDateNotInPast(
  data: Pick<BaseOutput, "preferredDate">,
  ctx: z.RefinementCtx,
) {
  if (!data.preferredDate) return;
  const chosen = new Date(`${data.preferredDate}T12:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (chosen < today) {
    ctx.addIssue({
      code: "custom",
      path: ["preferredDate"],
      message: "Pick a date that hasn't passed yet",
    });
  }
}

/** The authoritative schema. This is what the API route runs. */
export const quoteFormSchema = quoteBaseSchema.superRefine((data, ctx) => {
  emailRequiredForEmailContact(data, ctx);
  otherRequiresDescription(data, ctx);
  preferredDateNotInPast(data, ctx);
});

/** Per-step schemas, so "Continue" only complains about the step you're on. */
export const stepSchemas = {
  1: quoteBaseSchema.pick({
    vehicleYear: true,
    vehicleMake: true,
    vehicleModel: true,
    vehicleMileage: true,
  }),
  2: quoteBaseSchema
    .pick({ services: true, problemDescription: true })
    .superRefine(otherRequiresDescription),
  3: quoteBaseSchema
    .pick({ urgency: true, preferredDate: true, dropOff: true })
    .superRefine(preferredDateNotInPast),
  4: quoteBaseSchema
    .pick({
      name: true,
      phone: true,
      email: true,
      contactMethod: true,
      aaaMember: true,
      referralSource: true,
    })
    .superRefine(emailRequiredForEmailContact),
} as const;

export const TOTAL_STEPS = 4;

export const stepMeta = [
  { step: 1, label: "Vehicle", heading: "What are you bringing in?" },
  { step: 2, label: "Service", heading: "What do you need done?" },
  { step: 3, label: "Timing", heading: "When works for you?" },
  { step: 4, label: "Contact", heading: "Where should we send the quote?" },
] as const;

export type QuoteFormInput = z.input<typeof quoteBaseSchema>;
export type QuoteFormValues = z.output<typeof quoteFormSchema>;

export const adminLeadUpdateSchema = z.object({
  status: z.enum(["new", "contacted", "quoted", "won", "lost"]).optional(),
  notes: z.string().max(10_000).nullable().optional(),
  markRead: z.boolean().optional(),
});
