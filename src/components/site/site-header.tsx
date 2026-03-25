import Link from "next/link";
import type { ReactNode } from "react";

import {
  type Locale,
  getLocaleSwitchOptions,
  getLocalizedPath,
  getLocalizedToolPath,
  normalizePath,
  teleprompterToolAnchor
} from "@/lib/site";
import { cn } from "@/lib/utils";

import { BrandWordmark } from "./brand-wordmark";

type SiteHeaderProps = {
  locale: Locale;
  currentPath: string;
  labels: {
    home: string;
    teleprompter: string;
    features: string;
    faq: string;
    switchLanguage: string;
    launch: string;
    subtitle: string;
  };
};

export function SiteHeader({
  locale,
  currentPath,
  labels
}: SiteHeaderProps) {
  const normalizedPath = normalizePath(currentPath);
  const isHome = normalizedPath === "";
  const homePath = getLocalizedPath(locale, "/");
  const teleprompterPath =
    isHome ? `#${teleprompterToolAnchor}` : getLocalizedToolPath(locale);
  const navLinks = isHome
    ? [
        { href: teleprompterPath, label: labels.teleprompter, active: false },
        { href: "#features", label: labels.features, active: false },
        { href: "#faq", label: labels.faq, active: false }
      ]
    : [
        { href: homePath, label: labels.home, active: false },
        { href: teleprompterPath, label: labels.teleprompter, active: false }
      ];
  const localeOptions = getLocaleSwitchOptions(normalizedPath || "/");
  const activeLocale = localeOptions.find((option) => option.locale === locale);

  return (
    <header
      data-teleprompter-chrome
      className="sticky top-0 z-40 pt-0.5 sm:pt-1"
    >
      <div className="rounded-[1.5rem] border border-white/80 bg-white/88 px-3 py-2.5 shadow-soft backdrop-blur-xl sm:rounded-[1.9rem] sm:px-4 sm:py-3 md:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href={homePath} className="inline-flex min-w-0 items-center gap-2.5 sm:gap-3">
            <BrandWordmark subtitle={labels.subtitle} size="sm" />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="order-3 hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50/90 p-1 md:order-none md:flex"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                active={Boolean(link.active)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900 sm:px-4 sm:py-2 sm:text-sm">
                <span>{activeLocale?.label ?? labels.switchLanguage}</span>
                <ChevronDownIcon />
              </summary>
              <div className="absolute right-0 top-full z-20 mt-2 min-w-[11rem] rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                <div className="mb-1 px-2 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                  Languages
                </div>
                <div className="flex flex-col gap-1">
                  {localeOptions.map((option) => (
                    <Link
                      key={option.locale}
                      href={option.href}
                      className={cn(
                        "rounded-xl px-3 py-2 text-sm transition",
                        option.locale === locale
                          ? "bg-slate-900 text-white"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      )}
                    >
                      {option.label}
                    </Link>
                  ))}
                </div>
              </div>
            </details>
            <Link
              href={teleprompterPath}
              className="inline-flex items-center rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-800 sm:px-4 sm:py-2 sm:text-sm"
            >
              {labels.launch}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

type NavLinkProps = {
  href: string;
  active: boolean;
  children: ReactNode;
};

function NavLink({ href, active, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition",
        active
          ? "bg-white text-ink shadow-sm"
          : "text-slate-600 hover:bg-white hover:text-ink"
      )}
    >
      {children}
    </Link>
  );
}

function ChevronDownIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-current">
      <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.1 1.02l-4.25 4.5a.75.75 0 0 1-1.1 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" />
    </svg>
  );
}
