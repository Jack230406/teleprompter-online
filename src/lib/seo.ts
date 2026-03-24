import type { Metadata } from "next";

import { Locale, getLocalizedPath, siteConfig } from "@/lib/site";

type BuildMetadataInput = {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  keywords?: string[];
};

export function buildMetadata({
  locale,
  path = "/",
  title,
  description,
  keywords = []
}: BuildMetadataInput): Metadata {
  const canonical = getLocalizedPath(locale, path);
  const englishPath = getLocalizedPath("en", path);
  const spanishPath = getLocalizedPath("es", path);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        en: englishPath,
        es: spanishPath,
        "x-default": englishPath
      }
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: siteConfig.name
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.svg"]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}
