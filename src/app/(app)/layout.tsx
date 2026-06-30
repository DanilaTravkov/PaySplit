import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "../components/layout/AppShell";

export const metadata: Metadata = {
  title: "App",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function PrivateAppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <AppShell>{children}</AppShell>;
}
