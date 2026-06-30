"use client"

import { ReactNode } from "react"
import FadeContent from "../FadeContent"
import { cn } from "../../lib/utils"

type AnimatedCtaProps = {
  children: ReactNode
  className?: string
}

export function AnimatedCta({ children, className }: AnimatedCtaProps) {
  return (
    <FadeContent
      blur
      duration={700}
      threshold={0.2}
      className={cn("relative mx-auto max-w-2xl", className)}
    >
      {children}
    </FadeContent>
  )
}
