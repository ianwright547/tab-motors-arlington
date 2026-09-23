import { services } from "@/lib/services";
import { areas } from "@/lib/areas";

/**
 * Navigation targets in one place, so the header, mobile drawer and footer can
 * never disagree with each other.
 *
 * Items with `children` render as a dropdown in the header (and an expandable
 * section in the mobile drawer). The parent label still links to the hub page.
 */
export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const navLinks: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
    })),
  },
  {
    label: "Service Areas",
    href: "/service-areas",
    children: areas.map((a) => ({
      // Washington, DC already carries its region in the name, so appending
      // `region` again produced "Washington, DC, DC" in the dropdown on every
      // page of the site. Only append when it adds something.
      label: a.name.endsWith(a.region) ? a.name : `${a.name}, ${a.region}`,
      href: `/service-areas/${a.slug}`,
    })),
  },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];
