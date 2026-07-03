import { Wrench } from "lucide-react"
import { Card, CardContent } from "../ui/card"

export function InDevelopmentNotice() {
  return (
    <Card className="bg-primary/5 border-none">
      <CardContent className="flex items-start gap-4 p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Wrench className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">This section is still in development</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Functionality here is a work in progress and may not save changes yet.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
