import type { MetadataRoute } from "next";

import { landingPageSlugs } from "@/content/landing-pages";
import { getLocalizedPath, toAbsoluteUrl } from "@/lib/site";

const pagePaths = [
  "/",
  "/teleprompter",
  ...landingPageSlugs.map((slug) => `/${slug}`)
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pagePaths.flatMap((path) => [
    {
      url: toAbsoluteUrl(getLocalizedPath("en", path)),
      lastModified: new Date(),
      changeFrequency: path === "/" || path === "/teleprompter" ? "daily" : "weekly",
      priority:
        path === "/"
          ? 1
          : path === "/teleprompter"
            ? 0.95
            : 0.8
    },
    {
      url: toAbsoluteUrl(getLocalizedPath("es", path)),
      lastModified: new Date(),
      changeFrequency: path === "/" || path === "/teleprompter" ? "daily" : "weekly",
      priority:
        path === "/"
          ? 0.95
          : path === "/teleprompter"
            ? 0.9
            : 0.75
    }
  ]);
}
