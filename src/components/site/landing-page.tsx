import Link from "next/link";

import type { LandingPageEntry } from "@/content/landing-pages";
import { copy as localizedCopy } from "@/content/copy";
import { type Locale, getLocalizedPath } from "@/lib/site";

import { LandingPageLinks } from "./landing-page-links";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { TeleprompterWorkspace } from "../teleprompter/teleprompter-workspace";

type LandingPageProps = {
  locale: Locale;
  page: LandingPageEntry;
};

export function LandingPage({ locale, page }: LandingPageProps) {
  const copy = localizedCopy[locale];
  const teleprompterPath = getLocalizedPath(locale, "/teleprompter");

  return (
    <main className="px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SiteHeader
          locale={locale}
          currentPath={`/${page.slug}`}
          labels={copy.navigation}
        />

        <section className="grid gap-12 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-16">
          <div>
            <div className="inline-flex rounded-full border border-brand/20 bg-brand-soft px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-brand-deep">
              {page.eyebrow}
            </div>
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[0.95] tracking-[-0.03em] text-ink sm:text-6xl xl:text-7xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {page.description}
            </p>

            <div className="mt-8 grid gap-3">
              {page.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-3 text-sm text-slate-700"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <CheckIcon />
                  </span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href={teleprompterPath}
                className="inline-flex items-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                {copy.navigation.launch}
              </Link>
              <Link
                href="#faq"
                className="inline-flex items-center rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
              >
                {locale === "es" ? "Preguntas frecuentes" : "FAQ"}
              </Link>
            </div>
          </div>

          <div>
            <TeleprompterWorkspace locale={locale} copy={copy} mode="landing" />
          </div>
        </section>

        <section className="grid gap-6 border-y border-slate-200/80 py-12 md:grid-cols-3">
          {page.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[1.75rem] bg-white/70 p-6 shadow-soft backdrop-blur"
            >
              <h2 className="font-display text-3xl text-ink">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {section.description}
              </p>
            </article>
          ))}
        </section>

        <section className="py-12">
          <div className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
            {copy.footer.popularPagesLabel}
          </div>
          <div className="mt-8">
            <LandingPageLinks locale={locale} currentSlug={page.slug} />
          </div>
        </section>

        <section id="faq" className="grid gap-6 py-12 md:grid-cols-3">
          {page.faq.map((faq) => (
            <article
              key={faq.question}
              className="rounded-[1.75rem] border border-slate-200 bg-white px-6 py-6 shadow-soft"
            >
              <h2 className="font-display text-3xl text-ink">{faq.question}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </section>

        <SiteFooter
          locale={locale}
          copy={copy}
          currentPath={`/${page.slug}`}
          currentLandingPageSlug={page.slug}
        />
      </div>
    </main>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 fill-current"
    >
      <path d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.5 7.563a1 1 0 0 1-1.421 0L3.29 9.767a1 1 0 0 1 1.414-1.414L8.5 12.148l6.79-6.852a1 1 0 0 1 1.414-.006Z" />
    </svg>
  );
}
