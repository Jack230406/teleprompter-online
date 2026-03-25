import type { Metadata } from "next";

import {
  type Locale,
  getLocalizedAlternates,
  getLocalizedPath,
  localeConfig,
  siteConfig
} from "@/lib/site";

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
  const alternateLanguages = getLocalizedAlternates(path);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: alternateLanguages
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: localeConfig[locale].ogLocale,
      alternateLocale: siteConfig.locales
        .filter((candidate) => candidate !== locale)
        .map((candidate) => localeConfig[candidate].ogLocale),
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
