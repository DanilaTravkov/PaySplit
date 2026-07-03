import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { signInAction, signInWithGoogleAction } from "../actions";
import { AuthFloatingLinesBackground } from "../../components/auth/AuthFloatingLinesBackground";
import { LogoMark } from "../../components/brand/LogoMark";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { SubmitButton } from "../../components/ui/submit-button";
import { APP_NAME } from "../../lib/constants";
import { getCurrentUser } from "../../lib/supabase/server";

type LoginPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getSearchParam(
  searchParams: Record<string, string | string[] | undefined>,
  key: string
) {
  const value = searchParams[key];

  return Array.isArray(value) ? value[0] : value;
}

function getSafeNextPath(value: string | undefined) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }

  if (value.startsWith("/login") || value.startsWith("/register")) {
    return "/dashboard";
  }

  return value;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const user = await getCurrentUser();
  const params = (await searchParams) ?? {};
  const next = getSafeNextPath(getSearchParam(params, "next"));
  const error = getSearchParam(params, "error");
  const message = getSearchParam(params, "message");

  if (user) {
    redirect(next);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12 text-foreground">
      <AuthFloatingLinesBackground />
      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
          <LogoMark />
          <span className="text-lg font-bold tracking-tight">{APP_NAME}</span>
        </Link>

        <div className="rounded-2xl bg-transparent p-6 shadow-2xl backdrop-blur-[2px]">
          <div className="mb-6 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Welcome back</p>
            <h1 className="text-3xl font-bold tracking-tight text-white">Log in to your account</h1>
            <p className="mt-2 text-sm text-muted-foreground">Access your tracked renewal plans and payment methods.</p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
              {message}
            </div>
          )}

          <form action={signInWithGoogleAction}>
            <input type="hidden" name="next" value={next} />
            <SubmitButton
              variant="outline"
              size="lg"
              pendingText="Opening Google..."
              className="h-11 w-full border-white/10 bg-background/20 text-foreground backdrop-blur-md hover:bg-background/30"
            >
              <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-950">
                G
              </span>
              Continue with Google
            </SubmitButton>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-px flex-1 bg-white/10" />
            Or use email
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <form action={signInAction} className="space-y-4">
            <input type="hidden" name="next" value={next} />

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="h-11 border-white/10 bg-background/20 backdrop-blur-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="h-11 border-white/10 bg-background/20 backdrop-blur-md"
              />
            </div>

            <SubmitButton size="lg" pendingText="Logging in..." className="h-11 w-full">
              Log in
              <ArrowRight className="ml-2 h-4 w-4" />
            </SubmitButton>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to {APP_NAME}?{" "}
            <Link href={`/register?next=${encodeURIComponent(next)}`} className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
