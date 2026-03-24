import type { Metadata } from "next";
import { Newsreader, Roboto } from "next/font/google";
import type { ReactNode } from "react";

import { HostRobotsTag } from "@/components/site/host-robots-tag";
import { LanguageRoot } from "@/components/site/language-root";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap"
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    languages: {
      en: "/",
      es: "/es",
      "x-default": "/"
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${newsreader.variable} ${roboto.variable} bg-paper font-body text-ink antialiased`}
      >
        <HostRobotsTag />
        <LanguageRoot />
        {children}
      </body>
    </html>
  );
}
