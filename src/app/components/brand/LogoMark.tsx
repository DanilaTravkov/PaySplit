import { cn } from "../../lib/utils"

type LogoMarkProps = {
  className?: string
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <img
      src="/paysplit-logo.png"
      alt=""
      aria-hidden="true"
      className={cn("h-8 w-8 shrink-0 rounded-lg object-cover", className)}
    />
  )
}
