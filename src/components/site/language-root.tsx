"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function LanguageRoot() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = pathname.startsWith("/es") ? "es" : "en";
  }, [pathname]);

  return null;
}
