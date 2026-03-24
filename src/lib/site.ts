export const siteConfig = {
  name: "Teleprompter Online",
  description:
    "Free teleprompter online with instant browser-based prompting, teleprompter mirror mode, local script storage, fullscreen controls, and no signup.",
  url: "https://teleprompteronline.net",
  domain: "teleprompteronline.net",
  locales: ["en", "es"] as const,
  defaultLocale: "en" as const
};

export const teleprompterToolAnchor = "teleprompter-tool";

export type Locale = (typeof siteConfig.locales)[number];

export function normalizePath(path = "/") {
  if (!path || path === "/") {
    return "";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function getLocalizedPath(locale: Locale, path = "/") {
  const normalizedPath = normalizePath(path);

  if (locale === "en") {
    return normalizedPath || "/";
  }

  return `/es${normalizedPath || ""}`;
}

export function getLocalizedToolPath(locale: Locale) {
  const localizedHomePath = getLocalizedPath(locale, "/");

  return `${localizedHomePath}#${teleprompterToolAnchor}`;
}

export function toAbsoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}
