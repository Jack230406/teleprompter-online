import Link from "next/link";

import type {
  LandingPageEntry,
  LandingPageSlug
} from "@/content/landing-pages";
import { copy as localizedCopy } from "@/content/copy";
import { type Locale, getLocalizedPath, getLocalizedToolPath } from "@/lib/site";
import { cn } from "@/lib/utils";

import { LandingTeleprompterTool } from "../teleprompter/landing-teleprompter-tool";
import { LandingPageLinks } from "./landing-page-links";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type LandingPageProps = {
  locale: Locale;
  page: LandingPageEntry;
};

const pageStyles: Record<
  LandingPageSlug,
  {
    eyebrow: string;
    highlight: string;
    factAccent: string;
    stepAccent: string;
    sectionAccent: string;
    mainAccent: string;
  }
> = {
  "online-teleprompter": {
    eyebrow: "border-brand/20 bg-brand-soft text-brand-deep",
    highlight: "border-brand/20 bg-white text-brand-deep",
    factAccent: "bg-brand-soft/40",
    stepAccent: "bg-brand-soft text-brand-deep",
    sectionAccent: "hover:border-brand/30",
    mainAccent: "hover:border-brand/30"
  },
  "free-teleprompter": {
    eyebrow: "border-accent/20 bg-accent-soft text-orange-700",
    highlight: "border-orange-200 bg-white text-orange-700",
    factAccent: "bg-accent-soft/50",
    stepAccent: "bg-accent-soft text-orange-700",
    sectionAccent: "hover:border-orange-300",
    mainAccent: "hover:border-orange-300"
  },
  "teleprompter-for-youtube": {
    eyebrow: "border-slate-900/10 bg-slate-900 text-white",
    highlight: "border-slate-300 bg-white text-slate-700",
    factAccent: "bg-slate-900/5",
    stepAccent: "bg-slate-900 text-white",
    sectionAccent: "hover:border-slate-400",
    mainAccent: "hover:border-slate-400"
  }
};

export function LandingPage({ locale, page }: LandingPageProps) {
  const copy = localizedCopy[locale];
  const teleprompterPath = getLocalizedToolPath(locale);
  const homePath = getLocalizedPath(locale, "/");
  const styles = pageStyles[page.slug];

  return (
    <main className="px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SiteHeader
          locale={locale}
          currentPath={`/${page.slug}`}
          labels={copy.navigation}
        />

        <section className="grid gap-10 py-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:py-16">
          <div className="space-y-8 lg:pt-6">
            <div>
              <div
                className={cn(
                  "inline-flex rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.22em]",
                  styles.eyebrow
                )}
              >
                {page.eyebrow}
              </div>
              <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[0.95] tracking-[-0.03em] text-ink sm:text-6xl xl:text-7xl">
                {page.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                {page.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {page.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm leading-6 shadow-soft",
                    styles.highlight
                  )}
                >
                  {highlight}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
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
                {copy.landing.faqLabel}
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {page.heroFacts.map((fact) => (
                <article
                  key={fact.label}
                  className={cn(
                    "rounded-[1.75rem] border border-slate-200 bg-white/80 px-5 py-5 shadow-soft backdrop-blur",
                    styles.sectionAccent
                  )}
                >
                  <div
                    className={cn(
                      "inline-flex rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600",
                      styles.factAccent
                    )}
                  >
                    {fact.label}
                  </div>
                  <div className="mt-4 font-display text-3xl leading-none text-ink">
                    {fact.value}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <LandingTeleprompterTool locale={locale} copy={copy} page={page} />
          </div>
        </section>

        <section className="grid gap-10 border-y border-slate-200/80 py-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
              {copy.landing.workflowLabel}
            </div>
            <h2 className="mt-5 max-w-2xl font-display text-5xl leading-none text-ink">
              {page.workflow.title}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
              {page.workflow.description}
            </p>
          </div>

          <div className="grid gap-4">
            {page.workflow.steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-medium",
                      styles.stepAccent
                    )}
                  >
                    {index + 1}
                  </span>
                  <h3 className="font-display text-3xl text-ink">{step.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 py-12 md:grid-cols-3">
          {page.sections.map((section) => (
            <article
              key={section.title}
              className={cn(
                "rounded-[1.75rem] border border-slate-200 bg-white/80 p-6 shadow-soft backdrop-blur transition",
                styles.sectionAccent
              )}
            >
              <h2 className="font-display text-3xl text-ink">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {section.description}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-8 border-y border-slate-200/80 py-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <div className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
              {copy.landing.productPagesLabel}
            </div>
            <h2 className="mt-5 max-w-3xl font-display text-5xl leading-none text-ink">
              {copy.landing.productPagesTitle}
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600">
              {copy.landing.productPagesDescription}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href={homePath}
              className={cn(
                "rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft transition",
                styles.mainAccent
              )}
            >
              <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                {copy.navigation.home}
              </div>
              <h3 className="mt-4 font-display text-3xl text-ink">
                Teleprompter Online
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {copy.landing.homeCardDescription}
              </p>
            </Link>
            <Link
              href={teleprompterPath}
              className={cn(
                "rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft transition",
                styles.mainAccent
              )}
            >
              <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                {copy.navigation.teleprompter}
              </div>
              <h3 className="mt-4 font-display text-3xl text-ink">
                {copy.navigation.teleprompter}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {copy.landing.readerCardDescription}
              </p>
            </Link>
          </div>
        </section>

        <section className="py-12">
          <div className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
            {copy.landing.relatedPagesLabel}
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
