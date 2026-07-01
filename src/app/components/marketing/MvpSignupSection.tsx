"use client"

import { FormEvent, useEffect, useState } from "react"
import { ArrowRight, CheckCircle2, Users } from "lucide-react"
import CountUp from "../CountUp"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { APP_NAME, MVP_ACCESS_COUNT } from "../../lib/constants"

const STORAGE_KEY = "splitsub:mvp-tester-signup"

export function MvpSignupSection() {
  const [email, setEmail] = useState("")
  const [isJoined, setIsJoined] = useState(false)
  const [testerCount, setTesterCount] = useState(MVP_ACCESS_COUNT)
  const [error, setError] = useState("")

  useEffect(() => {
    const storedSignup = window.localStorage.getItem(STORAGE_KEY)

    if (storedSignup) {
      setIsJoined(true)
      setEmail(storedSignup)
      setTesterCount(MVP_ACCESS_COUNT + 1)
    }
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedEmail = email.trim()
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Enter a valid email to join the MVP test.")
      return
    }

    window.localStorage.setItem(STORAGE_KEY, trimmedEmail)
    setIsJoined(true)
    setTesterCount(MVP_ACCESS_COUNT + 1)
    setError("")
  }

  return (
    <section id="mvp-test" className="px-6 py-20 md:py-24">
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

        <div className="rounded-2xl border border-white/10 bg-transparent p-5 backdrop-blur-[2px] md:p-6">
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
              disabled={isJoined}
              className="h-12 rounded-xl bg-transparent"
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
            <Button
              type="submit"
              size="lg"
              disabled={isJoined}
              className="animated-primary-link h-12 w-full bg-primary text-white shadow-xl shadow-primary/25 hover:bg-primary/90"
            >
              {isJoined ? (
                <>
                  Joined the MVP test
                  <CheckCircle2 className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Subscribe to test
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
