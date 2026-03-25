import type { MetadataRoute } from "next";

import { getLocalizedPath, siteConfig, toAbsoluteUrl } from "@/lib/site";

const pagePaths = ["/"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pagePaths.flatMap((path) =>
    siteConfig.locales.map((locale) => ({
      url: toAbsoluteUrl(getLocalizedPath(locale, path)),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: locale === "en" ? 1 : locale === "es" ? 0.95 : 0.93
    }))
  );
}
