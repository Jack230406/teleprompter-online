import type { Metadata } from "next";

import { HomePage } from "@/components/site/home-page";
import { copy } from "@/content/copy";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  locale: "fil",
  path: "/",
  title: copy.fil.home.metaTitle,
  description: copy.fil.home.metaDescription,
  keywords: [
    "teleprompter",
    "teleprompter online",
    "libreng teleprompter",
    "online teleprompter",
    "teleprompter mirror",
    "teleprompter app"
  ]
});

export default function FilipinoHomePage() {
  return <HomePage locale="fil" />;
}
