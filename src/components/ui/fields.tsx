"use client";

import { AlertCircle, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { useId } from "react";

/**
 * Form primitives shared by the quote form and the admin dashboard.
 *
 * Every field wires up its own label, hint and error via generated ids, so
 * screen readers announce the error text along with the input instead of the
 * customer hitting a silent wall.
 */

const inputBase =
  "w-full rounded-md border bg-white px-3.5 py-2.5 text-ink-900 " +
  "placeholder:text-ink-400 transition-colors " +
  "focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500";

const inputNormal = "border-ink-300 hover:border-ink-400";
const inputInvalid = "border-bad-600 bg-bad-50/40 focus:ring-bad-600/30 focus:border-bad-600";

function fieldClasses(invalid: boolean, extra = "") {
  return `${inputBase} ${invalid ? inputInvalid : inputNormal} ${extra}`.trim();
}

export function FieldError({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-sm text-bad-700">
      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

type CommonFieldProps = {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
};

export function TextField({
  label,
  hint,
  error,
  optional,
  className,
  ...props
}: CommonFieldProps & ComponentProps<"input">) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink-800">
        {label}
        {optional && <span className="ml-1.5 font-normal text-ink-500">(optional)</span>}
      </label>
      {hint && (
        <p id={hintId} className="mb-1.5 text-sm text-ink-500">
          {hint}
        </p>
      )}
      <input
        id={id}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={[hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined}
        className={fieldClasses(Boolean(error))}
        {...props}
      />
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
}

export function TextAreaField({
  label,
  hint,
  error,
  optional,
  className,
  ...props
}: CommonFieldProps & ComponentProps<"textarea">) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink-800">
        {label}
        {optional && <span className="ml-1.5 font-normal text-ink-500">(optional)</span>}
      </label>
      {hint && (
        <p id={hintId} className="mb-1.5 text-sm text-ink-500">
          {hint}
        </p>
      )}
      <textarea
        id={id}
        rows={4}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={[hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined}
        className={fieldClasses(Boolean(error), "resize-y leading-relaxed")}
        {...props}
      />
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
}

export function SelectField({
  label,
  hint,
  error,
  optional,
  className,
  children,
  ...props
}: CommonFieldProps & ComponentProps<"select">) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink-800">
        {label}
        {optional && <span className="ml-1.5 font-normal text-ink-500">(optional)</span>}
      </label>
      {hint && (
        <p id={hintId} className="mb-1.5 text-sm text-ink-500">
          {hint}
        </p>
      )}
      <select
        id={id}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={[hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined}
        className={fieldClasses(Boolean(error), "appearance-none bg-[length:1.1rem] bg-[right_0.85rem_center] bg-no-repeat pr-10")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7480' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        }}
        {...props}
      >
        {children}
      </select>
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
}

/**
 * A large tappable card used for both checkbox groups (services) and radio
 * groups (urgency, drop-off). Deliberately big: on a phone these are far
 * easier to hit than a native 16px control, and they let us show an icon and a
 * hint line alongside the label.
 */
export function ChoiceCard({
  type,
  name,
  value,
  checked,
  onChange,
  label,
  hint,
  icon: Icon,
}: {
  type: "checkbox" | "radio";
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string, checked: boolean) => void;
  label: string;
  hint?: string;
  icon?: LucideIcon;
}) {
  return (
    <label
      className={[
        "group relative flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 transition-colors",
        "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-500/50",
        checked
          ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500"
          : "border-ink-200 bg-white hover:border-ink-400 hover:bg-ink-50",
      ].join(" ")}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={(event) => onChange(value, event.target.checked)}
        // Visually hidden but still focusable, so keyboard and screen-reader
        // users get the real control while everyone sees the card.
        className="absolute size-0 opacity-0"
      />

      <span
        aria-hidden
        className={[
          "mt-0.5 flex size-5 shrink-0 items-center justify-center border transition-colors",
          type === "radio" ? "rounded-full" : "rounded-sm",
          checked ? "border-brand-600 bg-brand-600 text-white" : "border-ink-300 bg-white",
        ].join(" ")}
      >
        {checked &&
          (type === "radio" ? (
            <span className="size-2 rounded-full bg-white" />
          ) : (
            <Check className="size-3.5" strokeWidth={3} />
          ))}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          {Icon && (
            <Icon
              aria-hidden
              className={`size-4 shrink-0 ${checked ? "text-brand-700" : "text-ink-400"}`}
            />
          )}
          <span
            className={`text-[0.9375rem] font-semibold leading-snug ${checked ? "text-brand-900" : "text-ink-800"}`}
          >
            {label}
          </span>
        </span>
        {hint && <span className="mt-0.5 block text-sm text-ink-500">{hint}</span>}
      </span>
    </label>
  );
}

/** A single inline checkbox, for things like "I'm a AAA member". */
export function InlineCheckbox({
  label,
  hint,
  checked,
  onChange,
}: {
  label: ReactNode;
  hint?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-sm border-ink-300 accent-brand-600"
      />
      <span className="min-w-0">
        <span className="text-[0.9375rem] font-medium text-ink-800">{label}</span>
        {hint && <span className="mt-0.5 block text-sm text-ink-500">{hint}</span>}
      </span>
    </label>
  );
}

export function Fieldset({
  legend,
  hint,
  error,
  children,
  className = "",
}: {
  legend: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  const id = useId();
  return (
    <fieldset className={className}>
      <legend className="mb-1.5 text-sm font-semibold text-ink-800">{legend}</legend>
      {hint && <p className="mb-3 text-sm text-ink-500">{hint}</p>}
      {children}
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </fieldset>
  );
}
