import Link from "next/link";

import type { LocalizedCopy } from "@/content/copy";
import type { LandingPageSlug } from "@/content/landing-pages";
import {
  type Locale,
  getLocalizedPath,
  getLocalizedToolPath,
  normalizePath
} from "@/lib/site";

import { BrandMark } from "./brand-mark";
import { LandingPageLinks } from "./landing-page-links";

type SiteFooterProps = {
  locale: Locale;
  copy: LocalizedCopy;
  currentPath?: string;
  currentLandingPageSlug?: LandingPageSlug;
};

export function SiteFooter({
  locale,
  copy,
  currentPath = "/",
  currentLandingPageSlug
}: SiteFooterProps) {
  const alternateLocale = locale === "en" ? "es" : "en";
  const switchPath = getLocalizedPath(alternateLocale, normalizePath(currentPath));

  return (
    <footer className="border-t border-slate-200/80 py-10">
      <div className="rounded-[2rem] border border-white/80 bg-white/76 px-6 py-8 shadow-soft backdrop-blur">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-3">
              <BrandMark className="h-10 w-10 rounded-2xl" />
              <div>
                <div className="font-display text-2xl leading-none text-ink">
                  Teleprompter Online
                </div>
                <div className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-slate-500">
                  {copy.navigation.subtitle}
                </div>
              </div>
            </div>
            <div className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              {copy.footer.summary}
            </div>
          </div>
          <nav aria-label={copy.footer.quickLinksLabel}>
            <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
              {copy.footer.quickLinksLabel}
            </div>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600">
              <Link href={getLocalizedPath(locale, "/")} className="hover:text-ink">
                {copy.navigation.home}
              </Link>
              <Link
                href={getLocalizedToolPath(locale)}
                className="hover:text-ink"
              >
                {copy.navigation.teleprompter}
              </Link>
              <Link
                href={switchPath}
                className="hover:text-ink"
              >
                {copy.navigation.switchLanguage}
              </Link>
            </div>
          </nav>
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
              {copy.footer.popularPagesLabel}
            </div>
            <div className="mt-4">
              <LandingPageLinks
                locale={locale}
                currentSlug={currentLandingPageSlug}
                variant="list"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
