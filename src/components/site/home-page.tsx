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
    <main className="px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SiteHeader
          locale={locale}
          currentPath="/"
          labels={copy.navigation}
        />

        <section className="py-4 lg:py-6">
          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex rounded-full border border-brand/20 bg-brand-soft px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-brand-deep">
              {copy.home.eyebrow}
            </div>
            <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl">
              {copy.home.title}
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {copy.home.description}
            </p>
          </div>

          <div
            id={teleprompterToolAnchor}
            className="mx-auto mt-6 scroll-mt-24"
          >
            <TeleprompterWorkspace locale={locale} copy={copy} mode="reader" />
          </div>
        </section>

        <section className="py-6">
          <div className="mx-auto max-w-6xl rounded-[1.75rem] border border-slate-200 bg-white/80 p-5 shadow-soft backdrop-blur md:p-6">
            <div className="flex flex-wrap items-center gap-3">
              {copy.home.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <CheckIcon />
                  </span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {copy.home.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 px-5 py-4"
                >
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                    {stat.label}
                  </div>
                  <div className="mt-2 font-display text-2xl text-ink">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
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

        <section className="py-12">
          <div className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
            More free teleprompter tools
          </div>
          <div className="mt-8">
            <LandingPageLinks locale={locale} />
          </div>
        </section>

        <section className="py-12">
          <h2 className="font-display text-4xl text-ink">
            Frequently asked questions about this free online teleprompter
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {copy.home.faq.map((faq) => (
              <article
                key={faq.question}
                className="rounded-[1.75rem] border border-slate-200 bg-white px-6 py-6 shadow-soft"
              >
                <h3 className="font-display text-3xl text-ink">{faq.question}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <SiteFooter locale={locale} copy={copy} currentPath="/" />
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
