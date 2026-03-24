import Link from "next/link";

import {
  getLandingPage,
  landingPageSlugs,
  type LandingPageSlug
} from "@/content/landing-pages";
import { type Locale, getLocalizedPath } from "@/lib/site";

type LandingPageLinksProps = {
  locale: Locale;
  currentSlug?: LandingPageSlug;
  variant?: "grid" | "list";
};

export function LandingPageLinks({
  locale,
  currentSlug,
  variant = "grid"
}: LandingPageLinksProps) {
  const pages = landingPageSlugs
    .filter((slug) => slug !== currentSlug)
    .map((slug) => getLandingPage(locale, slug));

  if (pages.length === 0) {
    return null;
  }

  if (variant === "list") {
    return (
      <div className="flex flex-col gap-3 text-sm text-slate-600">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={getLocalizedPath(locale, `/${page.slug}`)}
            className="hover:text-ink"
          >
            {page.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {pages.map((page) => (
        <Link
          key={page.slug}
          href={getLocalizedPath(locale, `/${page.slug}`)}
          className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-slate-300"
        >
          <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
            {page.eyebrow}
          </div>
          <h3 className="mt-4 font-display text-3xl leading-tight text-ink">
            {page.label}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {page.metaDescription}
          </p>
          <div className="mt-6 text-sm font-medium text-brand-deep">
            {locale === "es" ? "Ver pagina" : "View page"}
          </div>
        </Link>
      ))}
    </div>
  );
}
