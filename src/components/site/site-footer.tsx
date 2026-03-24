import Link from "next/link";

import { LocalizedCopy } from "@/content/copy";
import { type Locale, getLocalizedPath } from "@/lib/site";

type SiteFooterProps = {
  locale: Locale;
  copy: LocalizedCopy;
};

export function SiteFooter({ locale, copy }: SiteFooterProps) {
  return (
    <footer className="border-t border-slate-200/80 py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl text-sm leading-7 text-slate-600">
          {copy.footer.summary}
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <Link href={getLocalizedPath(locale, "/")} className="hover:text-ink">
            {copy.navigation.home}
          </Link>
          <Link
            href={getLocalizedPath(locale, "/teleprompter")}
            className="hover:text-ink"
          >
            {copy.navigation.teleprompter}
          </Link>
          <Link
            href={locale === "en" ? "/es" : "/"}
            className="hover:text-ink"
          >
            {copy.navigation.switchLanguage}
          </Link>
        </div>
      </div>
    </footer>
  );
}
