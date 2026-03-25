import Link from "next/link";

import type { LocalizedCopy } from "@/content/copy";
import {
  type Locale,
  getLocaleSwitchOptions,
  getLocalizedPath,
  getLocalizedToolPath,
  normalizePath
} from "@/lib/site";

type SiteFooterProps = {
  locale: Locale;
  copy: LocalizedCopy;
  currentPath?: string;
};

export function SiteFooter({
  locale,
  copy,
  currentPath = "/"
}: SiteFooterProps) {
  const localeOptions = getLocaleSwitchOptions(normalizePath(currentPath) || "/");

  return (
    <footer
      data-teleprompter-chrome
      className="border-t border-slate-200/80 py-10"
    >
      <div className="rounded-[2rem] border border-white/80 bg-white/76 px-6 py-8 shadow-soft backdrop-blur">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <div className="text-lg font-semibold text-ink">Teleprompter Online</div>
            <div className="mt-1 text-sm text-slate-500">{copy.navigation.subtitle}</div>
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
              <div className="pt-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                Languages
              </div>
              <div className="flex flex-wrap gap-2">
                {localeOptions.map((option) => (
                  <Link
                    key={option.locale}
                    href={option.href}
                    className={option.locale === locale
                      ? "rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white"
                      : "rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-900 hover:text-slate-900"}
                  >
                    {option.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
