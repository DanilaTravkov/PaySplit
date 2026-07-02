import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { signOutAction } from "../(auth)/actions";
import { AppShell } from "../components/layout/AppShell";
import { privateAppMetadata } from "../lib/seo";
import { getCurrentUser } from "../lib/supabase/server";

export const metadata: Metadata = privateAppMetadata;

export default async function PrivateAppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <AppShell
      user={{
        email: user.email ?? "",
        fullName: typeof user.user_metadata.full_name === "string" ? user.user_metadata.full_name : null,
      }}
      signOutAction={signOutAction}
    >
      {children}
    </AppShell>
  );
}
