import { Loader2 } from "lucide-react"

export default function PrivateAppLoading() {
  return (
    <div className="flex min-h-[240px] items-center justify-center">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        Loading section...
      </div>
    </div>
  )
}
