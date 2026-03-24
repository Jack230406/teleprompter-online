import type { MetadataRoute } from "next";

import { getLocalizedPath, toAbsoluteUrl } from "@/lib/site";

const pagePaths = ["/"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pagePaths.flatMap((path) => [
    {
      url: toAbsoluteUrl(getLocalizedPath("en", path)),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: toAbsoluteUrl(getLocalizedPath("es", path)),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95
    }
  ]);
}
