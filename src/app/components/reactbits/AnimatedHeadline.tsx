"use client"

import SplitText from "../SplitText"
import { cn } from "../../lib/utils"

type AnimatedHeadlineProps = {
  className?: string
}

export function AnimatedHeadline({ className }: AnimatedHeadlineProps) {
  return (
    <h1 className={cn("mb-5 text-[2.85rem] font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl md:mb-6 md:text-7xl md:leading-[1.12]", className)}>
      <SplitText
        text="Stop paying big bills"
        tag="span"
        splitType="words"
        delay={80}
        duration={0.8}
        rootMargin="0px"
        className="inline-block"
        clip={false}
      />
      <br />
      <span className="relative mt-1 inline-block md:mt-0">
        <SplitText
          text="all at once."
          tag="span"
          splitType="words"
          delay={80}
          duration={0.8}
          rootMargin="0px"
          className="hero-gradient-split animated-gradient-text inline-block bg-gradient-to-r from-cyan-100 via-teal-200 to-violet-200 bg-[length:220%_100%] bg-clip-text text-transparent"
          clip={false}
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-2 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent animate-[headline-glow_1800ms_ease-in-out_infinite]"
        />
      </span>
    </h1>
  )
}
