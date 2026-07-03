"use client"

import * as React from "react"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"
import { Button, type ButtonProps } from "./button"
import { cn } from "../../lib/utils"

type SubmitButtonProps = ButtonProps & {
  pendingText?: string
}

export function SubmitButton({
  children,
  className,
  disabled,
  pendingText,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className={cn("gap-2", className)}
      disabled={disabled || pending}
      aria-busy={pending}
      {...props}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {pendingText ?? "Working..."}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
