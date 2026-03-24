import Link from "next/link";

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
  const homePath = getLocalizedPath(locale, "/");
  const teleprompterPath =
    normalizedPath === "" ? `#${teleprompterToolAnchor}` : getLocalizedToolPath(locale);
  const alternateLocale = locale === "en" ? "es" : "en";
  const switchPath = getLocalizedPath(alternateLocale, normalizedPath || "/");

  return (
    <header className="sticky top-0 z-40">
      <div className="rounded-[2rem] border border-slate-200/70 bg-white/80 px-4 py-3 shadow-soft backdrop-blur md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link href={homePath} className="inline-flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-sm font-semibold tracking-[0.16em] text-white">
              TO
            </span>
            <div>
              <div className="font-display text-2xl leading-none text-ink">
                Teleprompter Online
              </div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                {labels.subtitle}
              </div>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <NavLink href={homePath} active={normalizedPath === ""}>
              {labels.home}
            </NavLink>
            <NavLink href={teleprompterPath} active={false}>
              {labels.teleprompter}
            </NavLink>
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
  children: React.ReactNode;
};

function NavLink({ href, active, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition",
        active
          ? "bg-brand-soft text-brand-deep"
          : "text-slate-600 hover:bg-slate-100 hover:text-ink"
      )}
    >
      {children}
    </Link>
  );
}
