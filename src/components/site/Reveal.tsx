import type { CSSProperties } from "react";

/**
 * Fades and lifts its children into view as they're scrolled to.
 *
 * Pure CSS, using a scroll-driven animation timeline. There is deliberately no
 * JavaScript here.
 *
 * The earlier version used IntersectionObserver: it hid the content on mount
 * and revealed it when the observer fired. That is a bad trade. It makes
 * content visibility depend on a script running correctly, and when the
 * observer didn't fire (which is exactly what happened during testing) whole
 * sections of the page stayed invisible with no way to recover.
 *
 * With this approach the animation lives entirely in `@supports
 * (animation-timeline: view())`. A browser that doesn't support scroll-driven
 * animations, or a reader who prefers reduced motion, simply gets the content,
 * fully visible, with no animation at all. There is no state in which the text
 * is hidden and stays hidden.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  /** Rough stagger for siblings, in milliseconds. Keep it under ~200. */
  delay?: number;
  className?: string;
}) {
  // Scroll-driven animations have no notion of a delay, since progress is tied
  // to scroll position rather than time. Staggering is done by letting later
  // items finish a little further up the scroll range instead.
  const style =
    delay > 0 ? ({ "--reveal-end": `${22 + delay / 20}%` } as CSSProperties) : undefined;

  return (
    <div className={`reveal ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
