import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "../components/layout/AppShell";
import { privateAppMetadata } from "../lib/seo";

export const metadata: Metadata = privateAppMetadata;

export default function PrivateAppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <AppShell>{children}</AppShell>;
}
