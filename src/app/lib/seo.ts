export const siteConfig = {
  name: "PaySplit",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "PaySplit | Split Annual Subscription Bills Into Predictable Payments",
  description:
    "PaySplit helps professionals and small teams turn annual software subscription renewals into predictable weekly, monthly, or quarterly installments.",
  keywords: [
    "subscription budgeting",
    "annual subscription payments",
    "fintech SaaS",
    "cash flow management",
    "installment payments",
    "software renewal planning",
  ],
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
