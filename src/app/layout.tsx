import type { Metadata } from "next";
import Script from "next/script";
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
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  },
  openGraph: {
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Teleprompter Online"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.svg"]
  },
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
        <Script
          defer
          data-domain="teleprompteronline.net"
          src="https://app.pageview.app/js/script.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8W0LZYG5VX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-8W0LZYG5VX');`}
        </Script>
        <LanguageRoot />
        {children}
      </body>
    </html>
  );
}
