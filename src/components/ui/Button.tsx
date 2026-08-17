import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "outline" | "outlineOnDark" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-md " +
  "transition-colors duration-150 select-none " +
  "disabled:opacity-55 disabled:cursor-not-allowed " +
  // A generous tap target. Anything smaller is a frustration on a phone, and
  // most of this site's traffic will be on a phone.
  "min-h-11";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-card",
  secondary: "bg-ink-900 text-white hover:bg-ink-800 active:bg-ink-950",
  outline: "border border-ink-300 bg-white text-ink-800 hover:bg-ink-50 hover:border-ink-400",
  /* A real variant rather than passing overrides to `outline` via className.
     Overriding bg/text that way is a coin flip: Tailwind resolves conflicting
     utilities by stylesheet order, not by the order of the class attribute, so
     "bg-white" could beat "bg-transparent" and leave white text on white. */
  outlineOnDark:
    "border border-white/25 bg-transparent text-white hover:border-white/40 hover:bg-white/10",
  ghost: "text-ink-700 hover:bg-ink-100 hover:text-ink-900",
  danger: "bg-bad-600 text-white hover:bg-bad-700",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-3 py-2",
  md: "text-[0.9375rem] px-4 py-2.5",
  lg: "text-base px-6 py-3.5 md:text-lg",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}): string {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={buttonClasses({ variant, size, className })} {...props} />;
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
};

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses({ variant, size, className })} {...props} />;
}

/** For tel: and other external hrefs, where next/link adds nothing. */
export function ButtonAnchor({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"a"> & { variant?: Variant; size?: Size }) {
  return <a className={buttonClasses({ variant, size, className })} {...props} />;
}
