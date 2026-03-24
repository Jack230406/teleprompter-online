import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LandingPage } from "@/components/site/landing-page";
import {
  getLandingPage,
  isLandingPageSlug,
  landingPageSlugs
} from "@/content/landing-pages";
import { buildMetadata } from "@/lib/seo";

type LandingPageRouteProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return landingPageSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({
  params
}: LandingPageRouteProps): Metadata {
  if (!isLandingPageSlug(params.slug)) {
    notFound();
  }

  const page = getLandingPage("es", params.slug);

  return buildMetadata({
    locale: "es",
    path: `/${page.slug}`,
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: [page.label, page.metaTitle, "Teleprompter Online"]
  });
}

export default function SpanishLandingPage({ params }: LandingPageRouteProps) {
  if (!isLandingPageSlug(params.slug)) {
    notFound();
  }

  return <LandingPage locale="es" page={getLandingPage("es", params.slug)} />;
}
