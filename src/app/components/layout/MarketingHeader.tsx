"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogoMark } from "../brand/LogoMark";
import { buttonVariants } from "../ui/button";
import { APP_NAME } from "../../lib/constants";
import { cn } from "../../lib/utils";

export function MarketingHeader() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const mutedLinkClass = hasScrolled
    ? "text-white/85 hover:text-white"
    : "text-muted-foreground hover:text-foreground";

  useEffect(() => {
    function handleScroll() {
      setHasScrolled(window.scrollY > 2);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-700 ease-out",
        hasScrolled
          ? "border-none bg-background/30 shadow-sm shadow-black/10 backdrop-blur-md"
          : "bg-transparent shadow-none backdrop-blur-0"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="text-base font-bold tracking-tight text-foreground">{APP_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#pricing"
            className={cn("text-sm font-medium transition-colors duration-700 ease-out", mutedLinkClass)}
          >
            Pricing
          </a>
                    <a
            href="#how-it-works"
            className={cn("text-sm font-medium transition-colors duration-700 ease-out", mutedLinkClass)}
          >
            How it works
          </a>
          <a
            href="#faq"
            className={cn("text-sm font-medium transition-colors duration-700 ease-out", mutedLinkClass)}
          >
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "hidden transition-colors duration-700 ease-out sm:inline-flex",
              mutedLinkClass
            )}
          >
            Log in
          </Link>
          <Link
            href="/register?next=/dashboard"
            className={cn(
              buttonVariants(),
              "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary/90"
            )}
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
