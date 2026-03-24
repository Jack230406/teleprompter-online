import type { MetadataRoute } from "next";

import { getLocalizedPath, toAbsoluteUrl } from "@/lib/site";

const pagePaths = ["/", "/teleprompter"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pagePaths.flatMap((path) => [
    {
      url: toAbsoluteUrl(getLocalizedPath("en", path)),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: path === "/" ? 1 : 0.9
    },
    {
      url: toAbsoluteUrl(getLocalizedPath("es", path)),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: path === "/" ? 0.95 : 0.85
    }
  ]);
}
