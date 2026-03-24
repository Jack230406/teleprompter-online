import { copy as localizedCopy } from "@/content/copy";
import { type Locale } from "@/lib/site";

import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { TeleprompterWorkspace } from "../teleprompter/teleprompter-workspace";

type TeleprompterPageProps = {
  locale: Locale;
};

export function TeleprompterPage({ locale }: TeleprompterPageProps) {
  const copy = localizedCopy[locale];

  return (
    <main className="px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SiteHeader
          locale={locale}
          currentPath="/teleprompter"
          labels={copy.navigation}
        />

        <section className="grid gap-8 py-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <div className="inline-flex rounded-full border border-brand/20 bg-brand-soft px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-brand-deep">
              {copy.teleprompterPage.eyebrow}
            </div>
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[0.96] tracking-[-0.03em] text-ink sm:text-6xl">
              {copy.teleprompterPage.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {copy.teleprompterPage.description}
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Teleprompter Online
            </div>
            <div className="mt-3 font-display text-3xl text-ink">
              {copy.tool.localBadge}
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {copy.tool.localHint}
            </p>
          </div>
        </section>

        <TeleprompterWorkspace locale={locale} copy={copy} mode="reader" />

        <SiteFooter locale={locale} copy={copy} currentPath="/teleprompter" />
      </div>
    </main>
  );
}
