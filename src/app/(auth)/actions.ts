"use server";

import { redirect } from "next/navigation";
import { absoluteUrl } from "../lib/seo";
import { createSupabaseServerClient } from "../lib/supabase/server";

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function getSafeNextPath(value: FormDataEntryValue | string | null) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }

  if (value.startsWith("/login") || value.startsWith("/register")) {
    return "/dashboard";
  }

  return value;
}

function withAuthMessage(path: string, key: "error" | "message", message: string, next?: string) {
  const params = new URLSearchParams({ [key]: message });

  if (next) {
    params.set("next", next);
  }

  return `${path}?${params.toString()}`;
}

export async function signInAction(formData: FormData) {
  const email = getStringValue(formData, "email");
  const password = getStringValue(formData, "password");
  const next = getSafeNextPath(formData.get("next"));

  if (!email || !password) {
    redirect(withAuthMessage("/login", "error", "Email and password are required.", next));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(withAuthMessage("/login", "error", error.message, next));
  }

  redirect(next);
}

export async function signUpAction(formData: FormData) {
  const fullName = getStringValue(formData, "fullName");
  const email = getStringValue(formData, "email");
  const password = getStringValue(formData, "password");
  const next = getSafeNextPath(formData.get("next"));

  if (!email || !password) {
    redirect(withAuthMessage("/register", "error", "Email and password are required.", next));
  }

  if (password.length < 8) {
    redirect(withAuthMessage("/register", "error", "Password must be at least 8 characters.", next));
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName || null,
      },
      emailRedirectTo: absoluteUrl(`/auth/callback?next=${encodeURIComponent(next)}`),
    },
  });

  if (error) {
    redirect(withAuthMessage("/register", "error", error.message, next));
  }

  if (data.session) {
    redirect(next);
  }

  redirect(withAuthMessage("/login", "message", "Check your email to confirm your account.", next));
}

export async function signInWithGoogleAction(formData: FormData) {
  const next = getSafeNextPath(formData.get("next"));
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: absoluteUrl(`/auth/callback?next=${encodeURIComponent(next)}`),
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error || !data.url) {
    redirect(withAuthMessage("/login", "error", error?.message ?? "Unable to start Google sign-in.", next));
  }

  redirect(data.url);
}

export async function signOutAction(_formData?: FormData) {
  const supabase = await createSupabaseServerClient();

  await supabase.auth.signOut();

  redirect("/login");
}
