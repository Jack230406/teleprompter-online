export const siteConfig = {
  name: "Teleprompter Online",
  description:
    "Free teleprompter online with instant browser-based prompting, teleprompter mirror mode, local script storage, fullscreen controls, and no signup.",
  url: "https://teleprompteronline.net",
  domain: "teleprompteronline.net",
  locales: ["en", "es", "fil"] as const,
  defaultLocale: "en" as const
};

export const teleprompterToolAnchor = "teleprompter-tool";

export type Locale = (typeof siteConfig.locales)[number];

export const localeConfig: Record<
  Locale,
  {
    label: string;
    pathPrefix: string;
    htmlLang: string;
    ogLocale: string;
    numberLocale: string;
  }
> = {
  en: {
    label: "English",
    pathPrefix: "",
    htmlLang: "en",
    ogLocale: "en_US",
    numberLocale: "en-US"
  },
  es: {
    label: "Espanol",
    pathPrefix: "/es",
    htmlLang: "es",
    ogLocale: "es_ES",
    numberLocale: "es-ES"
  },
  fil: {
    label: "Filipino",
    pathPrefix: "/fil",
    htmlLang: "fil",
    ogLocale: "fil_PH",
    numberLocale: "fil-PH"
  }
};

export function isLocale(value: string): value is Locale {
  return siteConfig.locales.includes(value as Locale);
}

export function normalizePath(path = "/") {
  if (!path || path === "/") {
    return "";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function getLocalizedPath(locale: Locale, path = "/") {
  const normalizedPath = normalizePath(path);
  const prefix = localeConfig[locale].pathPrefix;

  return `${prefix}${normalizedPath || ""}` || "/";
}

export function getLocalizedToolPath(locale: Locale) {
  const localizedHomePath = getLocalizedPath(locale, "/");

  return `${localizedHomePath}#${teleprompterToolAnchor}`;
}

export function getLocalizedAlternates(path = "/") {
  return siteConfig.locales.reduce<Record<string, string>>((alternates, locale) => {
    alternates[locale] = getLocalizedPath(locale, path);
    return alternates;
  }, {
    "x-default": getLocalizedPath(siteConfig.defaultLocale, path)
  });
}

export function getLocaleFromPathname(pathname = "/"): Locale {
  const normalizedPath = normalizePath(pathname);

  const localizedMatch = siteConfig.locales.find(
    (locale) =>
      locale !== siteConfig.defaultLocale &&
      (normalizedPath === localeConfig[locale].pathPrefix ||
        normalizedPath.startsWith(`${localeConfig[locale].pathPrefix}/`))
  );

  return localizedMatch ?? siteConfig.defaultLocale;
}

export function stripLocalePrefix(pathname = "/") {
  const normalizedPath = normalizePath(pathname);
  const locale = getLocaleFromPathname(normalizedPath);

  if (locale === siteConfig.defaultLocale) {
    return normalizedPath || "/";
  }

  const withoutPrefix = normalizedPath.slice(localeConfig[locale].pathPrefix.length);

  return withoutPrefix || "/";
}

export function getLocaleSwitchOptions(path = "/") {
  const normalizedPath = normalizePath(path) || "/";

  return siteConfig.locales.map((locale) => ({
    locale,
    label: localeConfig[locale].label,
    href: getLocalizedPath(locale, normalizedPath)
  }));
}

export function toAbsoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}
