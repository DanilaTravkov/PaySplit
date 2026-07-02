import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { signInWithGoogleAction, signUpAction } from "../actions";
import { AuthFloatingLinesBackground } from "../../components/auth/AuthFloatingLinesBackground";
import { LogoMark } from "../../components/brand/LogoMark";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { APP_NAME, NON_CUSTODIAL_DISCLOSURE } from "../../lib/constants";
import { getCurrentUser } from "../../lib/supabase/server";

type RegisterPageProps = {
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

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const user = await getCurrentUser();
  const params = (await searchParams) ?? {};
  const next = getSafeNextPath(getSearchParam(params, "next"));
  const error = getSearchParam(params, "error");

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
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Create account</p>
            <h1 className="text-3xl font-bold tracking-tight text-white">Start planning renewals</h1>
            <p className="mt-2 text-sm text-muted-foreground">{NON_CUSTODIAL_DISCLOSURE}</p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <form action={signInWithGoogleAction}>
            <input type="hidden" name="next" value={next} />
            <Button
              type="submit"
              variant="outline"
              size="lg"
              className="h-11 w-full border-white/10 bg-background/20 text-foreground backdrop-blur-md hover:bg-background/30"
            >
              <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-950">
                G
              </span>
              Sign up with Google
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-px flex-1 bg-white/10" />
            Or use email
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <form action={signUpAction} className="space-y-4">
            <input type="hidden" name="next" value={next} />

            <div className="space-y-2">
              <Label htmlFor="fullName">Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                className="h-11 border-white/10 bg-background/20 backdrop-blur-md"
              />
            </div>

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
                autoComplete="new-password"
                minLength={8}
                required
                className="h-11 border-white/10 bg-background/20 backdrop-blur-md"
              />
            </div>

            <Button type="submit" size="lg" className="h-11 w-full">
              Create account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href={`/login?next=${encodeURIComponent(next)}`} className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
