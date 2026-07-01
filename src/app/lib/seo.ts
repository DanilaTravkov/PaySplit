import type { Metadata } from "next";
import { APP_NAME, PRODUCT_COPY } from "./constants";

export const siteConfig = {
  name: APP_NAME,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: `${APP_NAME} | Split Annual Subscription Bills Into Predictable Plans`,
  description: PRODUCT_COPY.longDescription,
  keywords: [
    "subscription budgeting",
    "annual subscription planning",
    "fintech SaaS",
    "cash flow management",
    "tracked renewal plans",
    "software renewal planning",
  ],
};

export const privateAppMetadata: Metadata = {
  title: "App",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
