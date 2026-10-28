"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CircleAlert,
  Loader2,
  Phone,
  Send,
} from "lucide-react";
import type { z } from "zod";
import { Button, ButtonAnchor } from "@/components/ui/Button";
import {
  ChoiceCard,
  Fieldset,
  InlineCheckbox,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/ui/fields";
import { PhotoUpload, type UploadedAttachment } from "./PhotoUpload";
import { Turnstile } from "./Turnstile";
import {
  isValidServiceValue,
  quoteServiceOptions,
  serviceLabel,
} from "@/lib/services";
import { formatHoursSummary, site } from "@/lib/site";
import { formatPhone, telHref } from "@/lib/format";
import {
  TOTAL_STEPS,
  contactMethodLabels,
  contactMethodValues,
  dropOffLabels,
  dropOffValues,
  stepMeta,
  stepSchemas,
  urgencyLabels,
  urgencyValues,
} from "@/lib/validation";

/** Makes common enough in Arlington to be worth autocompleting. */
const COMMON_MAKES = [
  "Acura",
  "Audi",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Ford",
  "Genesis",
  "GMC",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Jaguar",
  "Jeep",
  "Kia",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Lucid",
  "Mazda",
  "Mercedes-Benz",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Porsche",
  "Ram",
  "Rivian",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

const REFERRAL_OPTIONS = [
  "Google search",
  "Google Maps",
  "AAA",
  "Friend or family",
  "Drove past the shop",
  "Returning customer",
  "Yelp",
  "Other",
];

type FormState = {
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleMileage: string;
  services: string[];
  problemDescription: string;
  urgency: string;
  preferredDate: string;
  dropOff: string;
  name: string;
  phone: string;
  email: string;
  contactMethod: string;
  aaaMember: boolean;
  referralSource: string;
  attachments: UploadedAttachment[];
  honeypot: string;
};

const initialState: FormState = {
  vehicleYear: "",
  vehicleMake: "",
  vehicleModel: "",
  vehicleMileage: "",
  services: [],
  problemDescription: "",
  urgency: "flexible",
  preferredDate: "",
  dropOff: "unsure",
  name: "",
  phone: "",
  email: "",
  contactMethod: "call",
  aaaMember: false,
  referralSource: "",
  attachments: [],
  honeypot: "",
};

type Errors = Partial<Record<keyof FormState | "form", string>>;

/** First message per field — showing five errors for one input is noise. */
function collectErrors(issues: z.core.$ZodIssue[]): Errors {
  const errors: Errors = {};
  for (const issue of issues) {
    const key = (issue.path[0] ?? "form") as keyof Errors;
    if (!(key in errors)) errors[key] = issue.message;
  }
  return errors;
}

const DRAFT_KEY = "tab-motors-quote-draft-v1";
const DRAFT_LIFETIME_MS = 24 * 60 * 60 * 1000;

export function QuoteForm({
  uploadsEnabled,
  turnstileSiteKey,
}: {
  uploadsEnabled: boolean;
  turnstileSiteKey: string | null;
}) {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [draftReady, setDraftReady] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const searchParams = useSearchParams();

  // Keep unfinished written details in this tab, never in the shop database.
  // Photos, bot fields and verification tokens are deliberately not persisted.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw);
        const age = Date.now() - draft.savedAt;
        if (
          typeof draft.savedAt === "number" &&
          age >= 0 &&
          age < DRAFT_LIFETIME_MS &&
          draft.values &&
          typeof draft.values === "object"
        ) {
          const restored = { ...initialState };
          for (const key of Object.keys(initialState) as (keyof FormState)[]) {
            if (
              key === "honeypot" ||
              key === "attachments" ||
              key === "services"
            )
              continue;
            const value = draft.values[key];
            if (key === "aaaMember") {
              restored.aaaMember = value === true;
            } else if (typeof value === "string" && value.length <= 4000) {
              restored[key] = value;
            }
          }
          restored.services = Array.isArray(draft.values.services)
            ? draft.values.services
                .filter(
                  (value: unknown): value is string =>
                    typeof value === "string" && isValidServiceValue(value),
                )
                .slice(0, 20)
            : [];
          setValues(restored);
          setStep(
            draft.step === 2 && stepSchemas[1].safeParse(restored).success
              ? 2
              : 1,
          );
          if (
            typeof draft.startedAt === "number" &&
            draft.startedAt <= Date.now() &&
            Date.now() - draft.startedAt < DRAFT_LIFETIME_MS
          ) {
            startedAtRef.current = draft.startedAt;
          }
        } else {
          sessionStorage.removeItem(DRAFT_KEY);
        }
      }
    } catch {
      // Storage may be blocked or a saved draft may be malformed. The form still works.
    }
    setDraftReady(true);
  }, []);

  useEffect(() => {
    if (!draftReady || submitted) return;
    const hasDetails = [
      values.name,
      values.phone,
      values.email,
      values.vehicleYear,
      values.vehicleMake,
      values.vehicleModel,
      values.problemDescription,
    ].some((value) => value.trim());
    try {
      if (hasDetails) {
        const {
          attachments: _attachments,
          honeypot: _honeypot,
          ...writtenDetails
        } = values;
        sessionStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({
            savedAt: Date.now(),
            startedAt: startedAtRef.current,
            step,
            values: writtenDetails,
          }),
        );
      } else {
        sessionStorage.removeItem(DRAFT_KEY);
      }
      setDraftSaved(Boolean(hasDetails));
    } catch {
      setDraftSaved(false);
    }
  }, [values, step, draftReady, submitted]);

  // Arriving from a service page (/quote?service=brake-repair) preselects that
  // service, so someone who already told us what they need doesn't have to say
  // it twice. Applied in an effect rather than in the initial state so the
  // server-rendered HTML and the first client render still match.
  useEffect(() => {
    const requested = searchParams.get("service");
    if (!requested || !isValidServiceValue(requested)) return;
    setValues((current) =>
      current.services.includes(requested)
        ? current
        : { ...current, services: [requested] },
    );
  }, [searchParams]);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);
  /** Used as a bot signal: a complete quote request takes more than three seconds. */
  const startedAtRef = useRef<number>(Date.now());

  // On step change, move focus to the new heading so keyboard and screen reader
  // users land in the right place instead of at the top of the document.
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    (submitted
      ? formTopRef.current?.querySelector<HTMLHeadingElement>("h2")
      : headingRef.current
    )?.focus();
  }, [step, submitted]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    // Clear the error as soon as the customer starts fixing it.
    setErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function stepPayload(target: number): Record<string, unknown> {
    if (target === 1) {
      return {
        name: values.name,
        phone: values.phone,
        email: values.email,
        contactMethod: values.contactMethod,
      };
    }
    return {
      vehicleYear: values.vehicleYear,
      vehicleMake: values.vehicleMake,
      vehicleModel: values.vehicleModel,
      vehicleMileage: values.vehicleMileage,
      services: values.services,
      problemDescription: values.problemDescription,
      urgency: values.urgency,
      preferredDate: values.preferredDate,
      dropOff: values.dropOff,
      aaaMember: values.aaaMember,
      referralSource: values.referralSource,
      attachments: values.attachments,
    };
  }

  function clearForm() {
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      /* Storage can be unavailable. */
    }
    const requested = searchParams.get("service");
    setValues({
      ...initialState,
      services: requested && isValidServiceValue(requested) ? [requested] : [],
    });
    setStep(1);
    setErrors({});
    setDetailsOpen(false);
    setDraftSaved(false);
    startedAtRef.current = Date.now();
    headingRef.current?.focus();
  }

  function validateStep(target: number): boolean {
    const schema = stepSchemas[target as 1 | 2];
    const result = schema.safeParse(stepPayload(target));
    if (result.success) {
      setErrors({});
      return true;
    }
    const nextErrors = collectErrors(result.error.issues);
    setErrors(nextErrors);
    if (
      nextErrors.vehicleMileage ||
      nextErrors.preferredDate ||
      nextErrors.urgency ||
      nextErrors.dropOff ||
      nextErrors.referralSource ||
      nextErrors.attachments
    )
      setDetailsOpen(true);
    return false;
  }

  function goNext(event: React.MouseEvent<HTMLButtonElement>) {
    // The next render replaces this control with a submit button. Cancel the
    // original click's default action so advancing never submits the form.
    event.preventDefault();
    if (!validateStep(step)) return;
    setStep((current) => Math.min(TOTAL_STEPS, current + 1));
  }

  function goBack() {
    setErrors({});
    setStep((current) => Math.max(1, current - 1));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting) return;
    if (step < TOTAL_STEPS) {
      if (validateStep(step)) setStep((current) => current + 1);
      return;
    }

    // Re-check every step, not just the last one. Someone could have reached
    // the service step and then gone back and emptied a contact field.
    for (let target = 1; target <= TOTAL_STEPS; target += 1) {
      if (!validateStep(target)) {
        setStep(target);
        return;
      }
    }

    if (turnstileSiteKey && !turnstileToken) {
      setErrors({
        form: "Please wait for the verification check to finish, then try again.",
      });
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          elapsedMs: Date.now() - startedAtRef.current,
          turnstileToken: turnstileToken ?? undefined,
        }),
      });

      const result = (await response.json()) as
        | { ok: true; leadId: number }
        | { ok: false; error: string; fieldErrors?: Record<string, string> };

      if (!response.ok || !result.ok) {
        const message =
          "error" in result
            ? result.error
            : "Something went wrong. Please try again.";
        const fieldErrors =
          "fieldErrors" in result ? result.fieldErrors : undefined;

        if (fieldErrors && Object.keys(fieldErrors).length > 0) {
          setErrors({ ...(fieldErrors as Errors), form: message });
          if (
            [
              "vehicleMileage",
              "preferredDate",
              "urgency",
              "dropOff",
              "referralSource",
              "attachments",
            ].some((key) => key in fieldErrors)
          )
            setDetailsOpen(true);
          // Send them back to the earliest step that has a problem.
          for (let target = 1; target <= TOTAL_STEPS; target += 1) {
            const keys = Object.keys(stepPayload(target));
            if (keys.some((key) => key in fieldErrors)) {
              setStep(target);
              break;
            }
          }
        } else {
          setErrors({ form: message });
        }
        return;
      }

      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* Submission succeeds even without storage. */
      }
      setSubmitted(true);
    } catch {
      setErrors({
        form: `We couldn't send that. Please check your connection, or call us at ${site.phone.display}.`,
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div ref={formTopRef} className="scroll-mt-24">
        <SuccessPanel values={values} />
      </div>
    );
  }

  const current = stepMeta[step - 1];

  return (
    <div ref={formTopRef} className="scroll-mt-24">
      <ol className="mb-7 flex items-center gap-1.5" aria-label="Progress">
        {stepMeta.map((meta) => {
          const state =
            meta.step < step
              ? "done"
              : meta.step === step
                ? "current"
                : "upcoming";
          return (
            <li key={meta.step} className="flex-1">
              <div
                className={[
                  "h-1.5 rounded-full transition-colors",
                  state === "upcoming" ? "bg-ink-200" : "bg-brand-500",
                ].join(" ")}
              />
              <p
                className={[
                  "mt-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide",
                  state === "upcoming" ? "text-ink-400" : "text-brand-700",
                ].join(" ")}
              >
                {state === "done" && (
                  <Check className="size-3.5" strokeWidth={3} aria-hidden />
                )}
                <span className="truncate">{meta.label}</span>
                {state === "current" && (
                  <span className="sr-only">(current step)</span>
                )}
              </p>
            </li>
          );
        })}
      </ol>

      <div className="mb-5 flex flex-wrap items-start justify-between gap-3 text-sm text-ink-600">
        <p className="max-w-lg">
          {draftSaved
            ? "Written draft saved in this tab for up to 24 hours. Photos are not saved in the draft."
            : "Your request is sent only when you choose “Send my request.”"}
        </p>
        <button
          type="button"
          onClick={clearForm}
          className="min-h-11 shrink-0 font-semibold text-brand-700 underline underline-offset-4"
        >
          Clear form
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-card sm:p-7">
          <p className="eyebrow text-brand-700">
            Step {step} of {TOTAL_STEPS}
          </p>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="mt-1.5 text-2xl font-bold sm:text-3xl focus:outline-none"
          >
            {current.heading}
          </h2>

          <div className="mt-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField
                    label="Your name"
                    autoComplete="name"
                    placeholder="Jordan Reyes"
                    value={values.name}
                    onChange={(event) => update("name", event.target.value)}
                    error={errors.name}
                  />
                  <TextField
                    label="Phone number"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(703) 555-0142"
                    value={values.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    // Tidy it up once they're done, rather than fighting the
                    // cursor while they type.
                    onBlur={(event) => {
                      const formatted = formatPhone(event.target.value);
                      if (formatted !== event.target.value)
                        update("phone", formatted);
                    }}
                    error={errors.phone}
                  />
                  <TextField
                    label="Email"
                    optional={values.contactMethod !== "email"}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="sm:col-span-2"
                    value={values.email}
                    onChange={(event) => update("email", event.target.value)}
                    error={errors.email}
                  />
                </div>

                <Fieldset
                  legend="Best way to reach you"
                  error={errors.contactMethod}
                >
                  <div className="grid gap-2.5 sm:grid-cols-3">
                    {contactMethodValues.map((value) => (
                      <ChoiceCard
                        key={value}
                        type="radio"
                        name="contactMethod"
                        value={value}
                        checked={values.contactMethod === value}
                        onChange={(selected) =>
                          update("contactMethod", selected)
                        }
                        label={contactMethodLabels[value]}
                      />
                    ))}
                  </div>
                </Fieldset>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-ink-900">
                    Your vehicle
                  </h3>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField
                      label="Year"
                      inputMode="numeric"
                      placeholder="2016"
                      maxLength={4}
                      value={values.vehicleYear}
                      onChange={(event) =>
                        update("vehicleYear", event.target.value)
                      }
                      error={errors.vehicleYear}
                    />
                    <TextField
                      label="Make"
                      placeholder="Honda"
                      list="vehicle-makes"
                      autoComplete="off"
                      value={values.vehicleMake}
                      onChange={(event) =>
                        update("vehicleMake", event.target.value)
                      }
                      error={errors.vehicleMake}
                    />
                    <datalist id="vehicle-makes">
                      {COMMON_MAKES.map((make) => (
                        <option key={make} value={make} />
                      ))}
                    </datalist>
                    <TextField
                      label="Model"
                      placeholder="Accord"
                      value={values.vehicleModel}
                      onChange={(event) =>
                        update("vehicleModel", event.target.value)
                      }
                      error={errors.vehicleModel}
                    />
                  </div>
                </div>

                <SelectField
                  label="Main service"
                  error={errors.services}
                  value={values.services[0] ?? ""}
                  onChange={(event) =>
                    update(
                      "services",
                      event.target.value ? [event.target.value] : [],
                    )
                  }
                  hint="Choose the closest match. Describe any additional work or concerns below."
                >
                  <option value="">Choose a service…</option>
                  {quoteServiceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </SelectField>

                {values.services.some(
                  (value) =>
                    value === "virginia-state-inspection" ||
                    value === "virginia-emissions-inspection",
                ) && (
                  <p className="rounded-lg bg-ink-50 p-4 text-sm leading-relaxed text-ink-700">
                    For inspection availability or the current queue,{" "}
                    <a
                      href={telHref(site.phone.e164)}
                      className="font-semibold text-brand-700 underline"
                    >
                      call {site.phone.display}
                    </a>
                    . This online request does not reserve an inspection time.
                  </p>
                )}

                <TextAreaField
                  label="What have you noticed?"
                  optional={!values.services.includes("other")}
                  hint="Tell us about noises, warning lights, when the issue happens or any other work you need."
                  placeholder="Grinding from the front right when I brake, started about a week ago…"
                  value={values.problemDescription}
                  onChange={(event) =>
                    update("problemDescription", event.target.value)
                  }
                  error={errors.problemDescription}
                  rows={4}
                />

                <details
                  open={detailsOpen}
                  onToggle={(event) => setDetailsOpen(event.currentTarget.open)}
                  className="rounded-lg border border-ink-200 p-4 sm:p-5"
                >
                  <summary className="cursor-pointer py-1 font-semibold text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600">
                    Optional details: mileage, timing, photos and AAA membership
                  </summary>
                  <div className="mt-5 space-y-6">
                    <TextField
                      label="Mileage"
                      optional
                      inputMode="numeric"
                      placeholder="86000"
                      value={values.vehicleMileage}
                      onChange={(event) =>
                        update("vehicleMileage", event.target.value)
                      }
                      error={errors.vehicleMileage}
                      hint="Helps us know what maintenance is due."
                    />

                    <p className="text-sm text-ink-600">
                      If you do not have a date in mind, leave timing as “I’m
                      flexible.” We will discuss the visit when we reply.
                    </p>
                    <div className="space-y-6">
                      <Fieldset
                        legend="Timing preference"
                        error={errors.urgency}
                      >
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {urgencyValues.map((value) => (
                            <ChoiceCard
                              key={value}
                              type="radio"
                              name="urgency"
                              value={value}
                              checked={values.urgency === value}
                              onChange={(selected) =>
                                update("urgency", selected)
                              }
                              label={urgencyLabels[value]}
                            />
                          ))}
                        </div>
                      </Fieldset>

                      <Fieldset
                        legend="Will you wait, or leave the car?"
                        error={errors.dropOff}
                      >
                        <div className="grid gap-2.5 sm:grid-cols-3">
                          {dropOffValues.map((value) => (
                            <ChoiceCard
                              key={value}
                              type="radio"
                              name="dropOff"
                              value={value}
                              checked={values.dropOff === value}
                              onChange={(selected) =>
                                update("dropOff", selected)
                              }
                              label={dropOffLabels[value]}
                            />
                          ))}
                        </div>
                      </Fieldset>

                      <TextField
                        label="Preferred drop-off date"
                        optional
                        type="date"
                        className="sm:max-w-xs"
                        value={values.preferredDate}
                        min={new Date().toISOString().slice(0, 10)}
                        onChange={(event) =>
                          update("preferredDate", event.target.value)
                        }
                        error={errors.preferredDate}
                        hint="This is a preference, not a confirmed booking. We will discuss availability when we reply."
                      />
                    </div>
                    <div className="rounded-lg border border-brand-200 bg-brand-50 p-4">
                      <InlineCheckbox
                        checked={values.aaaMember}
                        onChange={(checked) => update("aaaMember", checked)}
                        label="I'm a AAA member"
                        hint="10% off eligible labor, up to $75. Excludes scheduled maintenance, tires and tire service; other terms apply."
                      />
                    </div>

                    <SelectField
                      label="How did you hear about us?"
                      optional
                      className="sm:max-w-sm"
                      value={values.referralSource}
                      onChange={(event) =>
                        update("referralSource", event.target.value)
                      }
                      error={errors.referralSource}
                    >
                      <option value="">Select one…</option>
                      {REFERRAL_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </SelectField>

                    <a
                      href="#aaa-member-terms"
                      className="inline-block text-sm font-semibold text-brand-700 underline underline-offset-4"
                    >
                      AAA discount exclusions and terms
                    </a>
                    {uploadsEnabled && (
                      <PhotoUpload
                        attachments={values.attachments}
                        onChange={(attachments) =>
                          update("attachments", attachments)
                        }
                      />
                    )}
                  </div>
                </details>
                {turnstileSiteKey && (
                  <Turnstile
                    siteKey={turnstileSiteKey}
                    onToken={setTurnstileToken}
                  />
                )}

                <p className="text-sm leading-relaxed text-ink-500">
                  We use your details only to get back to you about this
                  request. No marketing lists, no sharing.{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-brand-700 underline"
                  >
                    Privacy policy
                  </Link>
                  .
                </p>

                <p className="text-sm leading-relaxed text-ink-600">
                  We review requests during shop hours. A request is not a
                  confirmed appointment. For an urgent question, call{" "}
                  {site.phone.display}.
                </p>
              </div>
            )}
          </div>

          {/* Honeypot. Hidden from people, tempting to bots. Not display:none,
              because some bots skip those; positioned off-screen instead. */}
          <div
            aria-hidden
            className="absolute left-[-9999px] top-auto size-px overflow-hidden"
          >
            <label htmlFor="company-website">Company website</label>
            <input
              id="company-website"
              name="company_website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.honeypot}
              onChange={(event) => update("honeypot", event.target.value)}
            />
          </div>

          {errors.form && (
            <p
              role="alert"
              className="mt-6 flex items-start gap-2 rounded-md border border-bad-100 bg-bad-50 p-3.5 text-sm text-bad-700"
            >
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>{errors.form}</span>
            </p>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-ink-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            {step > 1 ? (
              <Button type="button" variant="ghost" onClick={goBack}>
                <ArrowLeft className="size-4" aria-hidden />
                Back
              </Button>
            ) : (
              <span className="hidden sm:block" />
            )}

            {step < TOTAL_STEPS ? (
              <Button
                type="button"
                size="lg"
                onClick={goNext}
                className="sm:min-w-44"
              >
                Continue to vehicle & service
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            ) : (
              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="sm:min-w-56"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="size-4" aria-hidden />
                    Send my request
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </form>

      <p className="mt-5 text-center text-sm text-ink-500">
        Would rather just talk to someone?{" "}
        <a
          href={telHref(site.phone.e164)}
          className="font-semibold text-brand-700 underline underline-offset-2"
        >
          Call {site.phone.display}
        </a>
      </p>
    </div>
  );
}

function SuccessPanel({ values }: { values: FormState }) {
  // Format here rather than trusting what's in state: the field only tidies
  // itself on blur, and someone who submits straight from the phone input
  // (or via autofill) never triggers that.
  const prettyPhone = formatPhone(values.phone);

  const contactLine =
    values.contactMethod === "email" && values.email
      ? `email you at ${values.email}`
      : values.contactMethod === "text"
        ? `text you at ${prettyPhone}`
        : `call you at ${prettyPhone}`;

  return (
    <div className="rounded-xl border border-good-100 bg-white p-6 shadow-card sm:p-9">
      <div className="flex size-14 items-center justify-center rounded-full bg-good-100">
        <BadgeCheck className="size-7 text-good-700" aria-hidden />
      </div>

      <h2
        tabIndex={-1}
        className="mt-5 text-2xl font-bold sm:text-3xl focus:outline-none"
      >
        Got it, your request is in
      </h2>

      <p className="mt-3 text-ink-600">
        Thanks, {values.name.split(" ")[0]}. We'll look over the details for
        your{" "}
        <strong className="font-semibold text-ink-900">
          {values.vehicleYear} {values.vehicleMake} {values.vehicleModel}
        </strong>{" "}
        and {contactLine} with a quote.
      </p>

      <p className="mt-3 text-sm leading-relaxed text-ink-600">
        We review requests during shop hours. Your appointment is confirmed only
        after we agree a time with you.
      </p>

      <div className="mt-6 rounded-lg border border-ink-200 bg-ink-50 p-4">
        <h3 className="font-display text-sm font-bold uppercase tracking-[0.1em] text-ink-700">
          What happens next
        </h3>
        <ol className="mt-3 space-y-2.5 text-sm text-ink-600">
          <li className="flex gap-2.5">
            <span className="font-bold text-brand-700">1.</span>
            We review what you sent and check parts availability for your
            vehicle.
          </li>
          <li className="flex gap-2.5">
            <span className="font-bold text-brand-700">2.</span>
            We get back to you with a quote and a time we can take the car.
          </li>
          <li className="flex gap-2.5">
            <span className="font-bold text-brand-700">3.</span>
            Nothing gets worked on until you've approved the price.
          </li>
        </ol>
      </div>

      <div className="mt-6 rounded-lg bg-ink-900 p-4 text-ink-200">
        <p className="text-sm">
          Need it sooner, or remembered something? Call the shop directly.
          During business hours that&apos;s always the fastest route.
        </p>
        <dl className="mt-3 space-y-1 text-sm text-ink-400">
          {formatHoursSummary().map((entry) => (
            <div key={entry.label} className="flex gap-3">
              <dt className="w-20 shrink-0 font-medium text-ink-300">
                {entry.label}
              </dt>
              <dd>{entry.value}</dd>
            </div>
          ))}
        </dl>
        <ButtonAnchor
          href={telHref(site.phone.e164)}
          className="mt-3 w-full sm:w-auto"
        >
          <Phone className="size-4" aria-hidden />
          {site.phone.display}
        </ButtonAnchor>
      </div>

      <div className="mt-6 border-t border-ink-100 pt-5">
        <h3 className="text-sm font-semibold text-ink-800">What you sent us</h3>
        <dl className="mt-2.5 space-y-1.5 text-sm">
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-ink-500">Vehicle</dt>
            <dd className="text-ink-800">
              {values.vehicleYear} {values.vehicleMake} {values.vehicleModel}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-ink-500">Service</dt>
            <dd className="text-ink-800">
              {values.services.map(serviceLabel).join(", ") || "—"}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-ink-500">Timing</dt>
            <dd className="text-ink-800">
              {urgencyLabels[
                values.urgency as (typeof urgencyValues)[number]
              ] ?? "—"}
              {values.preferredDate ? ` · prefers ${values.preferredDate}` : ""}
            </dd>
          </div>
          {values.attachments.length > 0 && (
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-ink-500">Photos</dt>
              <dd className="text-ink-800">
                {values.attachments.length} attached
              </dd>
            </div>
          )}
        </dl>
      </div>

      <p className="mt-6 text-sm">
        <Link
          href="/"
          className="font-semibold text-brand-700 underline underline-offset-2"
        >
          Back to the home page
        </Link>
      </p>
    </div>
  );
}
