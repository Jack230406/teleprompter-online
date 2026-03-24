import Link from "next/link";

import { copy as localizedCopy } from "@/content/copy";
import { type Locale, getLocalizedPath } from "@/lib/site";

import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { TeleprompterWorkspace } from "../teleprompter/teleprompter-workspace";

type HomePageProps = {
  locale: Locale;
};

export function HomePage({ locale }: HomePageProps) {
  const copy = localizedCopy[locale];

  return (
    <main className="px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SiteHeader
          locale={locale}
          currentPath="/"
          labels={copy.navigation}
        />

        <section className="grid gap-12 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-16">
          <div className="order-2 lg:order-1">
            <div className="inline-flex rounded-full border border-brand/20 bg-brand-soft px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-brand-deep">
              {copy.home.eyebrow}
            </div>
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[0.95] tracking-[-0.03em] text-ink sm:text-6xl xl:text-7xl">
              {copy.home.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {copy.home.description}
            </p>

            <div className="mt-8 grid gap-3">
              {copy.home.highlights.map((highlight) => (
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
                href={getLocalizedPath(locale, "/teleprompter")}
                className="inline-flex items-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                {copy.home.readerCta}
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
              >
                {copy.home.secondaryCta}
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {copy.home.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.75rem] border border-slate-200 bg-white/70 px-5 py-5 shadow-soft backdrop-blur"
                >
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                    {stat.label}
                  </div>
                  <div className="mt-3 font-display text-3xl text-ink">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <TeleprompterWorkspace locale={locale} copy={copy} mode="landing" />
          </div>
        </section>

        <section
          id="how-it-works"
          className="grid gap-6 border-y border-slate-200/80 py-12 md:grid-cols-3"
        >
          {copy.home.sections.map((section) => (
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

        <section className="grid gap-10 py-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
              {copy.home.workflowLabel}
            </div>
            <h2 className="mt-5 font-display text-5xl leading-none text-ink">
              {copy.home.workflowTitle}
            </h2>
          </div>
          <div className="grid gap-4">
            {copy.home.steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft"
              >
                <div className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  {copy.home.stepLabel} {index + 1}
                </div>
                <h3 className="mt-3 font-display text-3xl text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 py-12 md:grid-cols-3">
          {copy.home.faq.map((faq) => (
            <article
              key={faq.question}
              className="rounded-[1.75rem] border border-slate-200 bg-white px-6 py-6 shadow-soft"
            >
              <h3 className="font-display text-3xl text-ink">{faq.question}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </section>

        <SiteFooter locale={locale} copy={copy} />
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
