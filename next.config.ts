import type { NextConfig } from "next";

// Explicit former static URLs; unknown URLs still receive a proper 404.
const legacyRedirects = [
  { source: "/blog/brake-warning-signs.html", destination: "/blog/brake-warning-signs", permanent: true },
  { source: "/blog/car-battery-life-virginia.html", destination: "/blog/car-battery-life-virginia", permanent: true },
  { source: "/blog/check-engine-light-meaning.html", destination: "/blog/check-engine-light-meaning", permanent: true },
  { source: "/blog/how-often-oil-change.html", destination: "/blog/how-often-oil-change", permanent: true },
  { source: "/blog/index.html", destination: "/blog", permanent: true },
  { source: "/blog/timing-belt-vs-chain.html", destination: "/blog/timing-belt-vs-chain", permanent: true },
  { source: "/blog/tpms-tire-pressure-light.html", destination: "/blog/tpms-tire-pressure-light", permanent: true },
  { source: "/blog/virginia-emissions-test-explained.html", destination: "/blog/virginia-emissions-test-explained", permanent: true },
  { source: "/blog/virginia-state-inspection-guide.html", destination: "/blog/virginia-state-inspection-guide", permanent: true },
  { source: "/index.html", destination: "/", permanent: true },
  { source: "/service-areas/alexandria.html", destination: "/service-areas/alexandria", permanent: true },
  { source: "/service-areas/arlington.html", destination: "/service-areas/arlington", permanent: true },
  { source: "/service-areas/ballston.html", destination: "/service-areas/ballston", permanent: true },
  { source: "/service-areas/cherrydale.html", destination: "/service-areas/cherrydale", permanent: true },
  { source: "/service-areas/clarendon.html", destination: "/service-areas/clarendon", permanent: true },
  { source: "/service-areas/fairfax.html", destination: "/service-areas/fairfax", permanent: true },
  { source: "/service-areas/falls-church.html", destination: "/service-areas/falls-church", permanent: true },
  { source: "/service-areas/great-falls.html", destination: "/service-areas/great-falls", permanent: true },
  { source: "/service-areas/index.html", destination: "/service-areas", permanent: true },
  { source: "/service-areas/mclean.html", destination: "/service-areas/mclean", permanent: true },
  { source: "/service-areas/rosslyn.html", destination: "/service-areas/rosslyn", permanent: true },
  { source: "/service-areas/vienna.html", destination: "/service-areas/vienna", permanent: true },
  { source: "/service-areas/washington-dc.html", destination: "/service-areas/washington-dc", permanent: true },
  { source: "/services/battery-alternator-starter.html", destination: "/services/battery-alternator-starter", permanent: true },
  { source: "/services/brake-repair.html", destination: "/services/brake-repair", permanent: true },
  { source: "/services/cooling-ac-service.html", destination: "/services/cooling-ac-service", permanent: true },
  { source: "/services/engine-diagnostics.html", destination: "/services/engine-diagnostics", permanent: true },
  { source: "/services/exhaust-repair.html", destination: "/services/exhaust-repair", permanent: true },
  { source: "/services/fleet-service.html", destination: "/services/fleet-service", permanent: true },
  { source: "/services/fuel-system-service.html", destination: "/services/fuel-system-service", permanent: true },
  { source: "/services/index.html", destination: "/services", permanent: true },
  { source: "/services/oil-change.html", destination: "/services/oil-change", permanent: true },
  { source: "/services/suspension-steering.html", destination: "/services/suspension-steering", permanent: true },
  { source: "/services/timing-belt-ignition.html", destination: "/services/timing-belt-ignition", permanent: true },
  { source: "/services/tire-wheel-service.html", destination: "/services/tire-wheel-service", permanent: true },
  { source: "/services/transmission-service.html", destination: "/services/transmission-service", permanent: true },
  { source: "/services/virginia-emissions-inspection.html", destination: "/services/virginia-emissions-inspection", permanent: true },
  { source: "/services/virginia-state-inspection.html", destination: "/services/virginia-state-inspection", permanent: true },
];

const nextConfig: NextConfig = {
  // PGlite ships a wasm binary that must not be bundled by the server compiler.
  // It is only ever loaded in local development (see src/lib/db/index.ts).
  serverExternalPackages: ["@electric-sql/pglite"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      ...legacyRedirects,
      {
        // One canonical host: https://tabmotorsarlington.com.
        //
        // The www host used to be attached to the superseded static build,
        // which still advertised the old Old Dominion Dr address. Once www is
        // pointed at this project, this rule sends it to the apex instead of
        // serving a second copy of the site. `/:path*` keeps the path, and
        // Next carries the query string across automatically, so a deep link
        // with UTM tags lands on the same page with its tags intact.
        source: "/:path*",
        has: [{ type: "host", value: "www.tabmotorsarlington.com" }],
        destination: "https://tabmotorsarlington.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        // The admin area holds customer contact details. Keep it out of caches
        // and out of search engines entirely.
        source: "/admin/(.*)",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
    ];
  },
};

export default nextConfig;
