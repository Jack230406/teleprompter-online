import type { Metadata } from "next";

import { TeleprompterPage } from "@/components/site/teleprompter-page";
import { copy } from "@/content/copy";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  path: "/teleprompter",
  title: copy.es.teleprompterPage.metaTitle,
  description: copy.es.teleprompterPage.metaDescription,
  keywords: [
    "teleprompter online",
    "teleprompter gratis",
    "teleprompter espejo",
    "lector de teleprompter"
  ]
});

export default function SpanishTeleprompterPage() {
  return <TeleprompterPage locale="es" />;
}
