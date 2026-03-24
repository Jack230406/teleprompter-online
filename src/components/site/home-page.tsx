import Link from "next/link";
import type { ReactNode } from "react";

import { copy as localizedCopy } from "@/content/copy";
import {
  type Locale,
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

  return (
    <main className="px-4 pb-16 pt-3 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[90rem]">
        <SiteHeader
          locale={locale}
          currentPath="/"
          labels={copy.navigation}
        />

        <section className="pb-6 pt-6 lg:pb-8 lg:pt-8">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] xl:items-start">
            <div className="xl:sticky xl:top-28">
              <div className="rounded-[2rem] border border-white/80 bg-white/78 p-6 shadow-soft backdrop-blur">
                <div className="inline-flex rounded-full border border-brand/20 bg-brand-soft px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-brand-deep">
                  {copy.home.eyebrow}
                </div>
                <h1 className="mt-5 max-w-xl font-display text-4xl leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.5rem]">
                  {copy.home.title}
                </h1>
                <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
                  {copy.home.description}
                </p>
              </div>
            </div>

            <div
              id={teleprompterToolAnchor}
              className="scroll-mt-24"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <SectionLabel>{copy.home.toolLabel}</SectionLabel>
                <Link
                  href="#how-it-works"
                  className="text-sm font-medium text-slate-600 transition hover:text-ink"
                >
                  {copy.home.secondaryCta}
                </Link>
              </div>

              <div className="relative">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-12 -top-8 h-28 rounded-full bg-brand/15 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-10 right-12 h-32 w-32 rounded-full bg-accent/10 blur-3xl"
                />
                <div className="relative rounded-[2.5rem] border border-white/80 bg-white/76 p-2 shadow-panel backdrop-blur md:p-3">
                  <TeleprompterWorkspace locale={locale} copy={copy} mode="reader" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-4 lg:pb-6">
          <div className="rounded-[2rem] border border-slate-900/90 bg-slate-950 px-5 py-5 text-white shadow-panel md:px-6">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
              <div>
                <SectionLabel className="border-white/10 bg-white/5 text-slate-300">
                  {copy.home.trustLabel}
                </SectionLabel>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {copy.home.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100"
                    >
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white">
                        <CheckIcon />
                      </span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {copy.home.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <div className="text-[0.7rem] uppercase tracking-[0.22em] text-slate-400">
                      {stat.label}
                    </div>
                    <div className="mt-2 font-display text-2xl leading-none text-white">
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
          className="scroll-mt-24 py-12 lg:py-16"
        >
          <div className="max-w-3xl">
            <SectionLabel>{copy.home.featuresLabel}</SectionLabel>
            <h2 className="mt-4 max-w-4xl font-display text-4xl leading-tight text-ink sm:text-5xl">
              {copy.home.featuresTitle}
            </h2>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {copy.home.sections.map((section, index) => (
              <article
                key={section.title}
                className="rounded-[2rem] border border-slate-200 bg-white/88 p-7 shadow-soft backdrop-blur"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-soft text-sm font-medium text-brand-deep">
                  {index + 1}
                </div>
                <h3 className="mt-5 font-display text-3xl leading-tight text-ink">
                  {section.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {section.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="how-it-works"
          className="scroll-mt-24 py-12 lg:py-16"
        >
          <div className="rounded-[2.25rem] border border-slate-200/90 bg-white/82 p-6 shadow-soft backdrop-blur md:p-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
              <div className="lg:pr-6">
                <SectionLabel>{copy.home.workflowLabel}</SectionLabel>
                <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-ink sm:text-5xl">
                  {copy.home.workflowTitle}
                </h2>
              </div>

              <div className="grid gap-4">
                {copy.home.steps.map((step, index) => (
                  <article
                    key={step.title}
                    className="rounded-[1.75rem] border border-slate-200 bg-slate-50/80 px-5 py-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-ink text-sm font-medium text-white">
                        {index + 1}
                      </span>
                      <div>
                        <div className="text-xs uppercase tracking-[0.24em] text-slate-500">
                          {copy.home.stepLabel} {index + 1}
                        </div>
                        <h3 className="mt-3 font-display text-3xl leading-tight text-ink">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600">
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

        <section className="py-12 lg:py-16">
          <div className="max-w-3xl">
            <SectionLabel>{copy.home.toolsLabel}</SectionLabel>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
              {copy.home.toolsTitle}
            </h2>
          </div>

          <div className="mt-8">
            <LandingPageLinks locale={locale} />
          </div>
        </section>

        <section
          id="faq"
          className="scroll-mt-24 py-12 lg:py-16"
        >
          <div className="max-w-3xl">
            <SectionLabel>{copy.home.faqLabel}</SectionLabel>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
              {copy.home.faqTitle}
            </h2>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {copy.home.faq.map((faq) => (
              <article
                key={faq.question}
                className="rounded-[1.75rem] border border-slate-200 bg-white/90 px-6 py-6 shadow-soft"
              >
                <h3 className="font-display text-[2rem] leading-tight text-ink">
                  {faq.question}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="pt-6 lg:pt-8">
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
        "inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-slate-500",
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
