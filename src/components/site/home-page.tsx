import Link from "next/link";
import Script from "next/script";
import type { ReactNode } from "react";

import { copy as localizedCopy } from "@/content/copy";
import {
  type Locale,
  siteConfig,
  teleprompterToolAnchor
} from "@/lib/site";

import { LandingPageLinks } from "./landing-page-links";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { TeleprompterWorkspace } from "../teleprompter/teleprompter-workspace";

type HomePageProps = {
  locale: Locale;
};

export function HomePage({ locale }: HomePageProps) {
  const copy = localizedCopy[locale];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.home.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires a modern browser",
    isAccessibleForFree: true,
    url: siteConfig.url,
    description: copy.home.metaDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <main className="px-3 pb-12 pt-2 sm:px-6 sm:pb-16 sm:pt-3 lg:px-8">
      <Script
        id={`faq-schema-${locale}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id={`app-schema-${locale}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <div className="mx-auto max-w-[90rem]">
        <SiteHeader
          locale={locale}
          currentPath="/"
          labels={copy.navigation}
        />

        <section className="pb-4 pt-4 sm:pb-6 sm:pt-6 lg:pb-8 lg:pt-8">
          <div className="grid gap-4 sm:gap-6 xl:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] xl:items-start">
            <div className="xl:sticky xl:top-28">
              <div className="rounded-[1.5rem] border border-white/80 bg-white/78 p-5 shadow-soft backdrop-blur sm:rounded-[2rem] sm:p-6">
                <div className="inline-flex rounded-full border border-brand/20 bg-brand-soft px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-brand-deep sm:px-4 sm:py-2 sm:text-xs">
                  {copy.home.eyebrow}
                </div>
                <h1 className="mt-4 max-w-xl font-display text-[2.35rem] leading-[0.98] tracking-[-0.03em] text-ink sm:mt-5 sm:text-5xl lg:text-[3.5rem]">
                  {copy.home.title}
                </h1>
                <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
                  {copy.home.description}
                </p>
              </div>
            </div>

            <div
              id={teleprompterToolAnchor}
              className="scroll-mt-24"
            >
              <div className="mb-2 flex flex-wrap items-center justify-between gap-3 sm:mb-3">
                <SectionLabel>{copy.home.toolLabel}</SectionLabel>
                <Link
                  href="#how-it-works"
                  className="text-xs font-medium text-slate-600 transition hover:text-ink sm:text-sm"
                >
                  {copy.home.secondaryCta}
                </Link>
              </div>

              <div className="relative">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-8 -top-6 h-20 rounded-full bg-brand/15 blur-3xl sm:inset-x-12 sm:-top-8 sm:h-28"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-8 right-8 h-24 w-24 rounded-full bg-accent/10 blur-3xl sm:bottom-10 sm:right-12 sm:h-32 sm:w-32"
                />
                <div className="relative rounded-[1.5rem] border border-white/80 bg-white/76 p-1 shadow-panel backdrop-blur sm:rounded-[2rem] sm:p-2 md:rounded-[2.5rem] md:p-3">
                  <TeleprompterWorkspace locale={locale} copy={copy} mode="reader" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-3 sm:pb-4 lg:pb-6">
          <div className="rounded-[1.5rem] border border-slate-900/90 bg-slate-950 px-4 py-4 text-white shadow-panel sm:rounded-[2rem] sm:px-5 sm:py-5 md:px-6">
            <p className="max-w-4xl text-sm leading-7 text-slate-200 sm:text-base">
              {copy.home.definition}
            </p>
            <div className="my-5 h-px bg-white/10" />
            <div className="grid gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
              <div>
                <SectionLabel className="border-white/10 bg-white/5 text-slate-300">
                  {copy.home.trustLabel}
                </SectionLabel>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {copy.home.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-100 sm:gap-3 sm:px-4 sm:py-2 sm:text-sm"
                    >
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white sm:h-7 sm:w-7">
                        <CheckIcon />
                      </span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {copy.home.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.1rem] border border-white/10 bg-white/5 px-3 py-3 sm:rounded-[1.35rem] sm:px-4 sm:py-4"
                  >
                    <div className="text-[0.6rem] uppercase tracking-[0.18em] text-slate-400 sm:text-[0.7rem] sm:tracking-[0.22em]">
                      {stat.label}
                    </div>
                    <div className="mt-1.5 font-display text-lg leading-tight text-white sm:mt-2 sm:text-2xl sm:leading-none">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="scroll-mt-24 py-8 sm:py-10 lg:py-16"
        >
          <div className="max-w-3xl">
            <SectionLabel>{copy.home.featuresLabel}</SectionLabel>
            <h2 className="mt-3 max-w-4xl font-display text-3xl leading-tight text-ink sm:mt-4 sm:text-4xl lg:text-5xl">
              {copy.home.featuresTitle}
            </h2>
          </div>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-3">
            {copy.home.sections.map((section, index) => (
              <article
                key={section.title}
                className="rounded-[1.5rem] border border-slate-200 bg-white/88 p-5 shadow-soft backdrop-blur sm:rounded-[2rem] sm:p-7"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-xs font-medium text-brand-deep sm:h-10 sm:w-10 sm:rounded-2xl sm:text-sm">
                  {index + 1}
                </div>
                <h3 className="mt-4 font-display text-2xl leading-tight text-ink sm:mt-5 sm:text-3xl">
                  {section.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 sm:mt-4 sm:leading-7">
                  {section.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-8 sm:py-10 lg:py-16">
          <div className="max-w-3xl">
            <SectionLabel>Who this teleprompter is for</SectionLabel>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:mt-4 sm:text-4xl lg:text-5xl">
              Use one browser-based teleprompter across creator, meeting, and speech workflows.
            </h2>
          </div>

          <div className="mt-6 grid gap-4 sm:mt-8 lg:grid-cols-3">
            {copy.home.audiences.map((audience) => (
              <article
                key={audience.title}
                className="rounded-[1.5rem] border border-slate-200 bg-white/88 p-5 shadow-soft backdrop-blur sm:rounded-[2rem] sm:p-7"
              >
                <h3 className="font-display text-2xl leading-tight text-ink sm:text-3xl">
                  {audience.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 sm:mt-4 sm:leading-7">
                  {audience.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-8 sm:py-10 lg:py-16">
          <div className="max-w-3xl">
            <SectionLabel>Browser teleprompter advantages</SectionLabel>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:mt-4 sm:text-4xl lg:text-5xl">
              Why many teams choose a browser teleprompter over an app-based setup.
            </h2>
          </div>

          <div className="mt-6 grid gap-4 sm:mt-8 lg:grid-cols-2">
            {copy.home.reasons.map((reason) => (
              <article
                key={reason.title}
                className="rounded-[1.5rem] border border-slate-200 bg-white/88 p-5 shadow-soft backdrop-blur sm:rounded-[2rem] sm:p-7"
              >
                <h3 className="font-display text-2xl leading-tight text-ink sm:text-3xl">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 sm:mt-4 sm:leading-7">
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-8 sm:py-10 lg:py-16">
          <div className="max-w-3xl">
            <SectionLabel>Browser vs app teleprompter</SectionLabel>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:mt-4 sm:text-4xl lg:text-5xl">
              Compare an app-based teleprompter with a browser-first workflow.
            </h2>
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft">
            <div className="grid grid-cols-[1.1fr_1fr_1fr] border-b border-slate-200 bg-slate-50/80 text-sm font-medium text-slate-700">
              <div className="px-4 py-4">Category</div>
              <div className="px-4 py-4">App-based teleprompter</div>
              <div className="px-4 py-4">Teleprompter Online</div>
            </div>
            {copy.home.comparisonRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1.1fr_1fr_1fr] border-b border-slate-200 last:border-b-0"
              >
                <div className="px-4 py-4 text-sm font-medium text-ink">{row.label}</div>
                <div className="px-4 py-4 text-sm leading-6 text-slate-600">{row.appBased}</div>
                <div className="px-4 py-4 text-sm leading-6 text-slate-600">{row.browserBased}</div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="how-it-works"
          className="scroll-mt-24 py-8 sm:py-10 lg:py-16"
        >
          <div className="rounded-[1.75rem] border border-slate-200/90 bg-white/82 p-5 shadow-soft backdrop-blur sm:rounded-[2.25rem] sm:p-6 md:p-8">
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
              <div className="lg:pr-6">
                <SectionLabel>{copy.home.workflowLabel}</SectionLabel>
                <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight text-ink sm:mt-4 sm:text-4xl lg:text-5xl">
                  {copy.home.workflowTitle}
                </h2>
              </div>

              <div className="grid gap-3 sm:gap-4">
                {copy.home.steps.map((step, index) => (
                  <article
                    key={step.title}
                    className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 px-4 py-4 sm:rounded-[1.75rem] sm:px-5 sm:py-5"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink text-xs font-medium text-white sm:h-10 sm:w-10 sm:rounded-2xl sm:text-sm">
                        {index + 1}
                      </span>
                      <div>
                        <div className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-500 sm:text-xs sm:tracking-[0.24em]">
                          {copy.home.stepLabel} {index + 1}
                        </div>
                        <h3 className="mt-2.5 font-display text-2xl leading-tight text-ink sm:mt-3 sm:text-3xl">
                          {step.title}
                        </h3>
                        <p className="mt-2.5 text-sm leading-6 text-slate-600 sm:mt-3 sm:leading-7">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-10 lg:py-16">
          <div className="max-w-3xl">
            <SectionLabel>{copy.home.toolsLabel}</SectionLabel>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:mt-4 sm:text-4xl lg:text-5xl">
              {copy.home.toolsTitle}
            </h2>
          </div>

          <div className="mt-6 sm:mt-8">
            <LandingPageLinks locale={locale} />
          </div>
        </section>

        <section
          id="faq"
          className="scroll-mt-24 py-8 sm:py-10 lg:py-16"
        >
          <div className="max-w-3xl">
            <SectionLabel>{copy.home.faqLabel}</SectionLabel>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:mt-4 sm:text-4xl lg:text-5xl">
              {copy.home.faqTitle}
            </h2>
          </div>

          <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-2">
            {copy.home.faq.map((faq) => (
              <article
                key={faq.question}
                className="rounded-[1.5rem] border border-slate-200 bg-white/90 px-5 py-5 shadow-soft sm:rounded-[1.75rem] sm:px-6 sm:py-6"
              >
                <h3 className="font-display text-[1.6rem] leading-tight text-ink sm:text-[2rem]">
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 sm:mt-4 sm:leading-7">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="pt-4 sm:pt-6 lg:pt-8">
          <SiteFooter locale={locale} copy={copy} currentPath="/" />
        </div>
      </div>
    </main>
  );
}

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
};

function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div
      className={[
        "inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-slate-500 sm:px-4 sm:py-2 sm:text-xs",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
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
