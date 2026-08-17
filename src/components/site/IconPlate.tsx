import type { LucideIcon } from "lucide-react";

/**
 * A service icon on a tinted plate.
 *
 * Bare line icons floating on white read as generic. Giving every one the same
 * plate makes the icon set feel deliberate rather than picked from a library,
 * and gives the eye a consistent anchor point down a column of cards.
 */
export function IconPlate({
  icon: Icon,
  tone = "brand",
  size = "md",
  className = "",
}: {
  icon: LucideIcon;
  tone?: "brand" | "dark" | "onDark";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const tones = {
    brand: "bg-brand-50 text-brand-700 ring-1 ring-brand-100",
    dark: "bg-ink-900 text-brand-400",
    onDark: "bg-white/10 text-brand-400 ring-1 ring-white/10",
  };

  const sizes = {
    sm: "size-9 rounded-lg [&>svg]:size-4",
    md: "size-11 rounded-lg [&>svg]:size-5",
    lg: "size-14 rounded-xl [&>svg]:size-6",
  };

  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center ${tones[tone]} ${sizes[size]} ${className}`}
    >
      <Icon strokeWidth={1.75} />
    </span>
  );
}
