import type { MetadataRoute } from "next";
import { searchEngineIndexingEnabled, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Before launch, keep every crawler out entirely — including from a preview or
  // staging URL. See searchEngineIndexingEnabled in src/lib/site.ts.
  if (!searchEngineIndexingEnabled) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The dashboard holds customer contact details. It's password protected,
      // but there's no reason for it to appear in an index either.
      disallow: ["/admin", "/admin/", "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
