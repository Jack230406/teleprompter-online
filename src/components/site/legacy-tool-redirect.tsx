"use client";

import Link from "next/link";
import { useEffect } from "react";

import { type Locale, getLocalizedPath, getLocalizedToolPath } from "@/lib/site";

type LegacyToolRedirectProps = {
  locale: Locale;
};

export function LegacyToolRedirect({ locale }: LegacyToolRedirectProps) {
  const homePath = getLocalizedPath(locale, "/");
  const toolPath = getLocalizedToolPath(locale);

  useEffect(() => {
    window.location.replace(toolPath);
  }, [toolPath]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-soft">
        <h1 className="font-display text-4xl text-ink">Teleprompter moved</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          The main teleprompter now lives on the homepage.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href={toolPath}
            className="inline-flex items-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Open teleprompter
          </Link>
          <Link
            href={homePath}
            className="inline-flex items-center rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
          >
            Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
