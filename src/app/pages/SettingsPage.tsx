"use client"

import { useState } from "react"
import { User, Bell, Shield, Wallet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

const navItems = [
  { icon: User, label: "Profile", id: "profile" },
  { icon: Bell, label: "Notifications", id: "notifications" },
  { icon: Shield, label: "Security", id: "security" },
  { icon: Wallet, label: "Billing", id: "billing" },
]

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="max-w-4xl pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-56 shrink-0">
          <nav className="flex flex-col gap-0.5">
            {navItems.map(({ icon: Icon, label, id }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                  activeTab === id
                    ? "bg-primary/15 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-teal-500 to-cyan-700 flex items-center justify-center text-white text-xl font-bold shrink-0">
                  JD
                </div>
                <div>
                  <Button variant="outline" size="sm">Change photo</Button>
                  <p className="text-xs text-muted-foreground mt-1.5">JPG or PNG, max 2MB</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="Jane" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="jane.doe@example.com" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customise your dashboard experience.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-medium text-foreground">Currency</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Default currency shown across the dashboard.</p>
                </div>
                <select className="h-9 rounded-lg border border-border bg-input-background text-foreground px-3 py-1 text-sm">
                  <option>EUR (€)</option>
                  <option>USD ($)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="ghost" className="text-muted-foreground">Discard</Button>
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
