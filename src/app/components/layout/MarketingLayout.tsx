import type { ReactNode } from "react"
import { LogoMark } from "../brand/LogoMark"
import { APP_LEGAL_NAME, APP_NAME } from "../../lib/constants"
import { MarketingHeader } from "./MarketingHeader"

export function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <MarketingHeader />

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-7 w-7" />
            <span className="font-semibold text-foreground">{APP_NAME}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Copyright {new Date().getFullYear()} {APP_LEGAL_NAME}. All rights reserved.
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
