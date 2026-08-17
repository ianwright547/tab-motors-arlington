import { Camera } from "lucide-react";

/**
 * Stands in for shop photography we don't have yet.
 *
 * It names the shot it's waiting for, so the page doubles as the photo brief
 * (see PLAN.md section 8). Using stock photos or lifting images from another
 * shop's site would be both a copyright problem and a worse page — for a local
 * repair shop, real faces and real bays are the whole point.
 *
 * To fill one in: replace the component with next/image pointing at the real
 * file.
 */
export function PhotoPlaceholder({
  shot,
  className = "",
  tone = "light",
}: {
  /** Which photo belongs here, in plain language. */
  shot: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const styles =
    tone === "dark"
      ? "border-white/15 bg-white/5 text-ink-400"
      : "border-ink-200 bg-ink-100 text-ink-500";

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-6 text-center ${styles} ${className}`}
    >
      <Camera className="size-7 opacity-70" aria-hidden />
      <p className="text-xs font-semibold uppercase tracking-[0.1em] opacity-80">Photo needed</p>
      <p className="max-w-[22ch] text-sm leading-snug opacity-90">{shot}</p>
    </div>
  );
}
