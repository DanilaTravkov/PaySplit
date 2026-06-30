import Link from "next/link"
import { ArrowRight, CheckCircle2, RefreshCw, ShieldCheck, TrendingUp, Users, Wallet, Zap } from "lucide-react"
import { AnimatedCta } from "../components/reactbits/AnimatedCta"
import { AnimatedHeadline } from "../components/reactbits/AnimatedHeadline"
import { CountUpStats } from "../components/reactbits/CountUpStats"
import { HeroMotionField } from "../components/reactbits/HeroMotionField"
import { Reveal } from "../components/reactbits/Reveal"
import { SpotlightCard } from "../components/reactbits/SpotlightCard"
import { buttonVariants } from "../components/ui/button"
import { cn } from "../lib/utils"

const stats = [
  { value: "Coming soon", numericValue: 0, suffix: "+", label: "Active users" },
  { value: "Coming soon", numericValue: 0, prefix: "EUR ", suffix: "M", compact: true, label: "Saved this year" },
  { value: "50+", numericValue: 50, suffix: "+", label: "Services supported" },
]

const features = [
  {
    icon: Wallet,
    title: "The problem",
    step: "01",
    description: "You need a tool that demands EUR 300 upfront. A brutal cash-flow hit that forces tough choices.",
    color: "text-amber-300",
    bg: "bg-amber-500/10",
  },
  {
    icon: RefreshCw,
    title: "PaySplit steps in",
    step: "02",
    description: "We split that EUR 300 into 12 predictable payments of EUR 25/month for the second subscription check.",
    color: "text-teal-300",
    bg: "bg-teal-500/10",
  },
  {
    icon: CheckCircle2,
    title: "Renewal day",
    step: "03",
    description: "When the bill drops, your PaySplit plan has you ready. Choose your own payment plans, we'll take care of the rest.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
]

const trustPoints = [
  { icon: ShieldCheck, label: "Bank-grade encryption" },
  { icon: TrendingUp, label: "Non-custodial planning" },
  { icon: Users, label: "GDPR compliant" },
]

const pricingPoints = [
  "Unlimited tracked subscriptions",
  "Weekly, monthly, and quarterly installment plans",
  "Renewal reminders and funding progress",
]

const faqs = [
  {
    question: "What does PaySplit do?",
    answer:
      "PaySplit helps users save toward regular subscription renewals through predictable installments and subscribe to notification about your payments",
  },
  {
    question: "Who is PaySplit for?",
    answer:
      "PaySplit is designed for professionals, freelancers, and small teams that want smoother cash flow around regular subscription renewals.",
  },
    {
    question: "Can I choose my own payment plan?",
    answer:
      "Yes, Paysplit allows you to choose when and how often payments will be made, for example you could split your monthly payment into weekly or daily payments, or weekly payment into daily payments.",
  },
]

export function LandingPage() {
  return (
    <div className="flex flex-col">
      <section className="relative flex items-start justify-center overflow-hidden px-4 pb-6 pt-5 sm:px-6 md:min-h-[92vh] md:items-center md:px-6 md:py-0">
        <HeroMotionField />

        <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
          <Reveal className="animated-pill mb-6 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-teal-400/25 bg-teal-400/10 px-4 py-1.5 text-sm text-teal-200 md:mb-8">
            {/* <span className="flex h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" /> */}
            Now supporting 50+ subscription services
          </Reveal>

          <AnimatedHeadline />

          <Reveal delayMs={240}>
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg md:mb-10">
              PaySplit turns annual subscription costs into small, predictable payments - so renewal day is never a surprise again.
            </p>
          </Reveal>

          <Reveal delayMs={360}>
            <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:mb-16">
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "animated-primary-link h-12 px-8 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30 w-full sm:w-auto"
                )}
              >
                Start for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href="#how-it-works"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-12 px-8 w-full sm:w-auto")}
              >
                See how it works
              </a>
            </div>
          </Reveal>

          <Reveal delayMs={480} threshold={0}>
            <CountUpStats stats={stats} />
          </Reveal>
        </div>
      </section>

      <section id="how-it-works" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">How it works</p>
            <h2 className="text-4xl font-bold tracking-tight text-white mb-4">
              Three steps to manage your heavy subscriptions.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              No more cash-flow shocks. PaySplit handles the math so you can focus on what you build.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon

              return (
                <Reveal key={feature.title} delayMs={index * 120}>
                  <SpotlightCard>
                    <div className="absolute top-6 right-6 text-9xl font-black text-white/3 select-none">
                      {feature.step}
                    </div>
                    <div className={`h-11 w-11 ${feature.bg} ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </SpotlightCard>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-border">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="rounded-2xl bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-amber-500/5 p-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 mx-auto mb-6">
                <ShieldCheck className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Security first.</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-10">
                PaySplit protects payment details and planning data while keeping renewal savings transparent and non-custodial in the MVP.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                {trustPoints.map((point) => {
                  const Icon = point.icon
                  return (
                    <div key={point.label} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <Icon className="h-4 w-4 text-primary shrink-0" />
                      {point.label}
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="pricing" className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Pricing</p>
            <h2 className="text-4xl font-bold tracking-tight text-white mb-4">
              Start free, upgrade when your renewals grow.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Plan your subscription cash flow before committing to a paid workspace.
            </p>
          </Reveal>

          <Reveal delayMs={140}>
            <SpotlightCard className="p-8 md:p-10">
              <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-white">Free plan</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    For individuals validating their annual subscription budget.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {pricingPoints.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:text-right">
                  <p className="text-3xl font-extrabold text-white">EUR 0</p>
                  <p className="mt-1 text-xs text-muted-foreground">No paid subscription. We only use you card details for actuall split payments.</p>
                  <Link
                    href="/dashboard"
                    className={cn(
                      buttonVariants(),
                      "animated-primary-link mt-6 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30"
                    )}
                  >
                    Start planning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </section>

      <section id="faq" className="py-24 px-6 border-y border-border">
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">FAQ</p>
            <h2 className="text-4xl font-bold tracking-tight text-white mb-4">
              Questions before renewal day.
            </h2>
          </Reveal>
          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <Reveal key={faq.question} delayMs={index * 90}>
                <div className="rounded-2xl border border-white/10 bg-transparent p-6 backdrop-blur-[2px]">
                  <h3 className="font-semibold text-white">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6 text-center">
        <AnimatedCta>
          {/* <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary mx-auto mb-8 shadow-xl shadow-primary/30">
            <Zap className="h-7 w-7 text-white fill-white" />
          </div> */}
          <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Ready to take control?</h2>
          <p className="text-muted-foreground mb-8 text-md">
            Join thousands of professionals who never stress about annual renewal bills.
          </p>
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ size: "lg" }),
              "animated-primary-link h-12 px-10 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30"
            )}
          >
            Get started free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </AnimatedCta>
      </section>
    </div>
  )
}
