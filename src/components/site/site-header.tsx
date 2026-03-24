import Link from "next/link";
import type { ReactNode } from "react";

import {
  type Locale,
  getLocalizedPath,
  getLocalizedToolPath,
  normalizePath,
  teleprompterToolAnchor
} from "@/lib/site";
import { cn } from "@/lib/utils";

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
  const alternateLocale = locale === "en" ? "es" : "en";
  const switchPath = getLocalizedPath(alternateLocale, normalizedPath || "/");
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

  return (
    <header className="sticky top-0 z-40 pt-1">
      <div className="rounded-[1.9rem] border border-white/80 bg-white/88 px-4 py-3 shadow-soft backdrop-blur-xl md:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href={homePath} className="inline-flex min-w-0 items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-ink text-sm font-semibold tracking-[0.16em] text-white">
              TO
            </span>
            <div className="min-w-0">
              <div className="truncate font-display text-2xl leading-none text-ink">
                Teleprompter Online
              </div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                {labels.subtitle}
              </div>
            </div>
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
            <Link
              href={switchPath}
              className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
            >
              {labels.switchLanguage}
            </Link>
            <Link
              href={teleprompterPath}
              className="inline-flex items-center rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
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
