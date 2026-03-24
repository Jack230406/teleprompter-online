import type { Metadata } from "next";

import { HomePage } from "@/components/site/home-page";
import { copy } from "@/content/copy";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "/",
  title: copy.en.home.metaTitle,
  description: copy.en.home.metaDescription,
  keywords: [
    "teleprompter",
    "teleprompter online",
    "online teleprompter",
    "teleprompter app",
    "free teleprompter",
    "teleprompter mirror"
  ]
});

export default function EnglishHomePage() {
  return <HomePage locale="en" />;
}
