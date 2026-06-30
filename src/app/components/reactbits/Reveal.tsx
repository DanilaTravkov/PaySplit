"use client"

import { ReactNode } from "react"
import FadeContent from "../FadeContent"

type RevealProps = {
  children: ReactNode
  className?: string
  delayMs?: number
  threshold?: number
}

export function Reveal({ children, className, delayMs = 0, threshold = 0.18 }: RevealProps) {
  return (
    <FadeContent blur duration={700} delay={delayMs} threshold={threshold} className={className}>
      {children}
    </FadeContent>
  )
}
