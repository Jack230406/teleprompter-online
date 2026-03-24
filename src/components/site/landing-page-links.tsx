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
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
      {pages.map((page) => (
        <Link
          key={page.slug}
          href={getLocalizedPath(locale, `/${page.slug}`)}
          className="group rounded-[1.5rem] border border-slate-200 bg-white/88 p-5 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white sm:rounded-[2rem] sm:p-6"
        >
          <div className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-500 sm:text-xs">
            {page.eyebrow}
          </div>
          <h3 className="mt-3 font-display text-2xl leading-tight text-ink sm:mt-4 sm:text-3xl">
            {page.label}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:leading-7">
            {page.metaDescription}
          </p>
          <div className="mt-4 text-sm font-medium text-brand-deep sm:mt-6">
            {locale === "es" ? "Ver pagina" : "View page"}
          </div>
        </Link>
      ))}
    </div>
  );
}
