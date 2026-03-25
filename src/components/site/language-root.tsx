"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { getLocaleFromPathname, localeConfig } from "@/lib/site";

export function LanguageRoot() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang =
      localeConfig[getLocaleFromPathname(pathname)].htmlLang;
  }, [pathname]);

  return null;
}
