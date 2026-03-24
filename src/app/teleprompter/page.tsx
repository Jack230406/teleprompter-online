import type { Metadata } from "next";

import { LegacyToolRedirect } from "@/components/site/legacy-tool-redirect";

export const metadata: Metadata = {
  title: "Teleprompter moved",
  description: "The main teleprompter now lives on the homepage.",
  robots: {
    index: false,
    follow: false
  }
};

export default function EnglishTeleprompterPage() {
  return <LegacyToolRedirect locale="en" />;
}
