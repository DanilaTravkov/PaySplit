import Link from "next/link";
import { buttonVariants } from "./components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="max-w-md text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
          404
        </p>
        <h1 className="mb-4 text-3xl font-bold tracking-tight">Page not found</h1>
        <p className="mb-8 text-sm text-muted-foreground">
          The page you requested does not exist or has moved.
        </p>
        <Link href="/" className={buttonVariants()}>
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
