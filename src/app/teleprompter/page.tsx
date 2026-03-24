import type { Metadata } from "next";

import { TeleprompterPage } from "@/components/site/teleprompter-page";
import { copy } from "@/content/copy";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "/teleprompter",
  title: copy.en.teleprompterPage.metaTitle,
  description: copy.en.teleprompterPage.metaDescription,
  keywords: [
    "teleprompter reader",
    "teleprompter online",
    "mirror teleprompter",
    "free online teleprompter"
  ]
});

export default function EnglishTeleprompterPage() {
  return <TeleprompterPage locale="en" />;
}
