import type { Metadata } from "next";
import { MarketingLayout } from "./components/layout/MarketingLayout";
import { LandingPage } from "./pages/LandingPage";
import { absoluteUrl, siteConfig } from "./lib/seo";
import { DEFAULT_CURRENCY, PRODUCT_COPY } from "./lib/constants";
import { getMvpSignupCount } from "./lib/mvp-signups";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Split Annual Subscription Bills Into Predictable Payments",
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    sameAs: [],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: absoluteUrl("/"),
    description: siteConfig.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: DEFAULT_CURRENCY,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What does ${siteConfig.name} do?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${siteConfig.name} helps users track planned reserves for annual software subscription renewals through predictable installments.`,
        },
      },
      {
        "@type": "Question",
        name: `Who is ${siteConfig.name} for?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: PRODUCT_COPY.longDescription,
        },
      },
    ],
  },
];

export default async function HomePage() {
  const mvpSignupCount = await getMvpSignupCount();

  return (
    <MarketingLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPage mvpSignupCount={mvpSignupCount} />
    </MarketingLayout>
  );
}
