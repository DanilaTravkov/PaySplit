"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { ArrowRight, Users } from "lucide-react"
import CountUp from "../CountUp"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { APP_NAME } from "../../lib/constants"
import { cn } from "../../lib/utils"
import { MvpSuccessBurst } from "../reactbits/MvpSuccessBurst"
import { subscribeToMvpAction } from "./actions"

const STORAGE_KEY = "paysplit:mvp-tester-signup"

type MvpSignupSectionProps = {
  initialTesterCount: number
  className?: string
  variant?: "section" | "compact"
}

export function MvpSignupSection({
  initialTesterCount,
  className,
  variant = "section",
}: MvpSignupSectionProps) {
  const [email, setEmail] = useState("")
  const [isJoined, setIsJoined] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testerCount, setTesterCount] = useState(initialTesterCount)
  const [error, setError] = useState("")
  const [showSuccessBurst, setShowSuccessBurst] = useState(false)
  const hasTriggeredSuccessBurstRef = useRef(false)
  const submitInFlightRef = useRef(false)
  const successBurstTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const storedSignup = window.localStorage.getItem(STORAGE_KEY)

    if (storedSignup) {
      setIsJoined(true)
      setEmail(storedSignup)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (successBurstTimeoutRef.current) {
        clearTimeout(successBurstTimeoutRef.current)
      }
    }
  }, [])

  function triggerSuccessBurst() {
    if (successBurstTimeoutRef.current) {
      clearTimeout(successBurstTimeoutRef.current)
    }

    setShowSuccessBurst(false)
    window.requestAnimationFrame(() => {
      setShowSuccessBurst(true)
      successBurstTimeoutRef.current = setTimeout(() => {
        setShowSuccessBurst(false)
      }, 11000)
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (submitInFlightRef.current || isSubmitting || isJoined) {
      return
    }

    const trimmedEmail = email.trim()
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Enter a valid email to join the MVP test.")
      return
    }

    submitInFlightRef.current = true
    setError("")
    setIsSubmitting(true)

    try {
      const result = await subscribeToMvpAction(trimmedEmail)
      // const result = {
      //   count: 1,
      //   ok: true,
      //   message: "test message"
      // } use only in dev

      setTesterCount(result.count)

      if (!result.ok) {
        setError(result.message)
        return
      }

      window.localStorage.setItem(STORAGE_KEY, trimmedEmail)
      setIsJoined(true)
      if (!hasTriggeredSuccessBurstRef.current) {
        hasTriggeredSuccessBurstRef.current = true
        triggerSuccessBurst()
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      submitInFlightRef.current = false
      setIsSubmitting(false)
    }
  }

  const signupCard = (
    <div
      className={cn(
        "cursor-default rounded-2xl border border-white/10 bg-transparent p-5 backdrop-blur-[2px]",
        variant === "section" && "md:p-6",
        variant === "compact" && "text-left"
      )}
    >
      <MvpSuccessBurst active={showSuccessBurst} />

      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Already subscribed
          </p>
          <div className="mt-1 flex items-baseline gap-1 text-4xl font-extrabold text-white">
            <CountUp key={testerCount} to={testerCount} duration={1.1} separator="," />
            <span className="text-xl text-primary">+</span>
          </div>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Users className="h-5 w-5" />
        </div>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          disabled={isJoined || isSubmitting}
          className="h-12 rounded-xl bg-transparent"
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
        <Button
          type="submit"
          size="lg"
          disabled={isJoined || isSubmitting}
          className="animated-primary-link h-12 w-full bg-primary text-white shadow-xl shadow-primary/25 hover:bg-primary/90"
        >
          {isSubmitting ? (
            "Joining..."
          ) : isJoined ? (
            "You've joined! Thank you!"
          ) : (
            <>
              Subscribe to test
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  )

  if (variant === "compact") {
    return (
      <div className={className}>
        <div className="mb-5 text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">MVP access</p>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-white">
            Test {APP_NAME} before launch.
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Join the tester list and help shape subscription planning before the production release.
          </p>
        </div>
        {signupCard}
      </div>
    )
  }

  return (
    <section id="mvp-test" className={cn("px-6 py-20 md:py-24", className)}>
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_0.85fr] md:items-center">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">MVP access</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
            Test {APP_NAME} before launch.
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Join the tester list and help shape subscription planning before the production release.
          </p>
        </div>

        {signupCard}
      </div>
    </section>
  )
}
