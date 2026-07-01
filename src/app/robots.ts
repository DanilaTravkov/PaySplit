import type { MetadataRoute } from "next";
import { PRIVATE_APP_ROUTES } from "./lib/constants";
import { siteConfig } from "./lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...PRIVATE_APP_ROUTES],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
