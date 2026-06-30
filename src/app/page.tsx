import type { Metadata } from "next";
import { MarketingLayout } from "./components/layout/MarketingLayout";
import { LandingPage } from "./pages/LandingPage";
import { absoluteUrl, siteConfig } from "./lib/seo";

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
      priceCurrency: "EUR",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does PaySplit do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PaySplit helps users save toward annual software subscription renewals through predictable installments.",
        },
      },
      {
        "@type": "Question",
        name: "Who is PaySplit for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PaySplit is designed for professionals, freelancers, and small teams that want smoother cash flow around annual subscription renewals.",
        },
      },
    ],
  },
];

export default function HomePage() {
  return (
    <MarketingLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPage />
    </MarketingLayout>
  );
}
