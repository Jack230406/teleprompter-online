import type { Metadata } from "next";

import { HomePage } from "@/components/site/home-page";
import { copy } from "@/content/copy";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  path: "/",
  title: copy.es.home.metaTitle,
  description: copy.es.home.metaDescription,
  keywords: [
    "teleprompter",
    "teleprompter online",
    "teleprompter gratis",
    "app de teleprompter",
    "teleprompter espejo",
    "teleprompter mirror"
  ]
});

export default function SpanishHomePage() {
  return <HomePage locale="es" />;
}
