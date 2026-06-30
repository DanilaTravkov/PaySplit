"use client"

import SplitText from "../SplitText"
import { cn } from "../../lib/utils"

type AnimatedHeadlineProps = {
  className?: string
}

export function AnimatedHeadline({ className }: AnimatedHeadlineProps) {
  return (
    <h1 className={cn("mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight text-white md:text-7xl", className)}>
      <SplitText
        text="Stop paying big bills"
        tag="span"
        splitType="words"
        delay={80}
        duration={0.8}
        rootMargin="0px"
        className="inline-block"
      />
      <br />
      <span className="relative inline-block">
        <SplitText
          text="all at once."
          tag="span"
          splitType="words"
          delay={80}
          duration={0.8}
          rootMargin="0px"
          className="hero-gradient-split animated-gradient-text inline-block bg-gradient-to-r from-teal-200 via-cyan-200 to-amber-200 bg-[length:220%_100%] bg-clip-text text-transparent"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-2 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent animate-[headline-glow_1800ms_ease-in-out_infinite]"
        />
      </span>
    </h1>
  )
}
