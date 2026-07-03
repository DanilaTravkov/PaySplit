import { InDevelopmentNotice } from "../components/dashboard/InDevelopmentNotice"

export function SettingsPage() {
  return (
    <div className="max-w-4xl pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account preferences.</p>
      </div>

      <InDevelopmentNotice />
    </div>
  )
}
