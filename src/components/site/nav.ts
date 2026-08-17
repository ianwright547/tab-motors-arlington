/**
 * Navigation targets in one place, so the header, mobile drawer and footer can
 * never disagree with each other.
 */
export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "VA Inspection", href: "/services/virginia-state-inspection" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
] as const;
