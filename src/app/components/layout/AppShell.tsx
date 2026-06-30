"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditCard, LayoutDashboard, Settings, Plus, Menu, X, Bell } from "lucide-react"
import { LogoMark } from "../brand/LogoMark"

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const pathname = usePathname()

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Payment Methods", href: "/payment-methods", icon: CreditCard },
    { label: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col border-r border-border bg-sidebar transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <span className="text-base font-bold tracking-tight text-foreground">PaySplit</span>
          </div>
          <button
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 p-4 space-y-6">
          <Link
            href="/subscriptions/new"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center w-full justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 shadow-lg shadow-primary/25"
          >
            <Plus className="h-4 w-4" />
            New Subscription
          </Link>

          <nav className="space-y-0.5">
            <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
              Menu
            </p>
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary/15 text-primary border border-primary/20"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* User section at bottom */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-accent cursor-pointer transition-colors">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
              JD
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Jane Doe</p>
              <p className="text-xs text-muted-foreground truncate">jane@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-sidebar px-6">
          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3 ml-auto">
            <button className="relative h-9 w-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary"></span>
            </button>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-teal-500 to-cyan-700 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
              JD
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-background p-6 md:p-8">
          <div className="mx-auto max-w-5xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
