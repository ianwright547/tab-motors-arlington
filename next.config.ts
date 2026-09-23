import type { NextConfig } from "next";

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
