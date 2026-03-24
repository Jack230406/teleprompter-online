import type { Metadata } from "next";

import { LegacyToolRedirect } from "@/components/site/legacy-tool-redirect";

export const metadata: Metadata = {
  title: "Teleprompter movido",
  description: "El teleprompter principal ahora vive en la home.",
  robots: {
    index: false,
    follow: false
  }
};

export default function SpanishTeleprompterPage() {
  return <LegacyToolRedirect locale="es" />;
}
