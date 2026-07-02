"use client"

import { ReactNode } from "react"
import ReactBitsSpotlightCard from "../SpotlightCard"
import { cn } from "../../lib/utils"

type SpotlightCardProps = {
  children: ReactNode
  className?: string
}

export function SpotlightCard({ children, className }: SpotlightCardProps) {
  return (
    <ReactBitsSpotlightCard
      spotlightColor="rgba(34, 211, 238, 0.18)"
      className={cn(
        "animated-spotlight-card cursor-default rounded-2xl border-white/10 !bg-transparent p-8 backdrop-blur-[2px]",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </ReactBitsSpotlightCard>
  )
}
