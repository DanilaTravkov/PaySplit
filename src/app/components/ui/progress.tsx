"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: number | null
    max?: number
    indicatorClassName?: string
  }
>(({ className, value = 0, max = 100, indicatorClassName, ...props }, ref) => {
  const safeMax = max > 0 ? max : 100
  const safeValue = Math.min(Math.max(value ?? 0, 0), safeMax)
  const percent = (safeValue / safeMax) * 100

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={safeValue}
      ref={ref}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-white/10", className)}
      {...props}
    >
      <div
        className={cn("h-full bg-primary transition-[width]", indicatorClassName)}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
})
Progress.displayName = "Progress"

export { Progress }
