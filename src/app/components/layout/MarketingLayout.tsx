import type { ReactNode } from "react"
import Link from "next/link"
import { LogoMark } from "../brand/LogoMark"
import { buttonVariants } from "../ui/button"
import { cn } from "../../lib/utils"

export function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <LogoMark />
            <span className="text-base font-bold tracking-tight text-foreground">PaySplit</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              How it works
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "ghost" }), "hidden sm:inline-flex text-muted-foreground hover:text-foreground")}
            >
              Log in
            </Link>
            <Link
              href="/dashboard"
              className={cn(buttonVariants(), "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25")}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-7 w-7" />
            <span className="font-semibold text-foreground">PaySplit</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Copyright {new Date().getFullYear()} PaySplit. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

