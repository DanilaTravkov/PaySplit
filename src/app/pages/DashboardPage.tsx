"use client"

import Link from "next/link"
import { Plus, CreditCard, TrendingUp, Calendar, Layers, AlertTriangle, ArrowRight } from "lucide-react"
import { formatCurrency, formatDate } from "../lib/utils"
import { calculateProgress } from "../lib/calculations"
import { buttonVariants } from "../components/ui/button"
import { Progress } from "../components/ui/progress"
import { Badge } from "../components/ui/badge"
import { SpotlightCard } from "../components/reactbits/SpotlightCard"
import { PRODUCT_COPY } from "../lib/constants"
import { cn } from "../lib/utils"
import type { Currency, InstallmentFrequency, PaymentMethodType, SubscriptionStatus } from "../lib/types"

export type DashboardSubscription = {
  id: string
  serviceName: string
  annualPrice: number
  currency: Currency
  billingDate: string
  frequency: InstallmentFrequency
  installmentAmount: number
  savedAmount: number
  paymentMethod: PaymentMethodType
  status: SubscriptionStatus
}

export type DashboardStats = {
  activeSubscriptions: number
  totalSaved?: number
  upcomingAnnualPayments?: number
  monthlyCommitment?: number
  currency: Currency
}

type DashboardPageProps = {
  displayName: string
  subscriptions: DashboardSubscription[]
  stats: DashboardStats
}

type StatCard = {
  label: string
  value: string
  icon: typeof TrendingUp
  iconBg: string
  iconColor: string
  change: string
  changeColor: string
}

function formatStatCurrency(amount: number | undefined, currency: Currency) {
  return formatCurrency(amount ?? 0, currency)
}

const statCards = (stats: DashboardStats): StatCard[] => [
  {
    label: PRODUCT_COPY.trackedBalanceLabel,
    value: formatStatCurrency(stats.totalSaved, stats.currency),
    icon: TrendingUp,
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    change: typeof stats.totalSaved === "number" ? "Tracked across active plans" : "your tracked balances displayed here",
    changeColor: typeof stats.totalSaved === "number" ? "text-emerald-400" : "text-muted-foreground",
  },
  {
    label: "Monthly Commitment",
    value: formatStatCurrency(stats.monthlyCommitment, stats.currency),
    icon: CreditCard,
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-300",
    change: typeof stats.monthlyCommitment === "number" ? "Estimated monthly equivalent" : "your monthly commitment displayed here",
    changeColor: "text-muted-foreground",
  },
  {
    label: "Upcoming Renewals",
    value: formatStatCurrency(stats.upcomingAnnualPayments, stats.currency),
    icon: Calendar,
    iconBg: "bg-sky-500/15",
    iconColor: "text-sky-300",
    change: typeof stats.upcomingAnnualPayments === "number" ? "Total renewal value" : "your upcoming renewals displayed here",
    changeColor: typeof stats.upcomingAnnualPayments === "number" ? "text-sky-300" : "text-muted-foreground",
  },
  {
    label: "Active Plans",
    value: String(stats.activeSubscriptions),
    icon: Layers,
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-300",
    change: stats.activeSubscriptions === 1 ? "1 configured plan" : `${stats.activeSubscriptions} configured plans`,
    changeColor: "text-muted-foreground",
  },
]

export function DashboardPage({ displayName, subscriptions, stats }: DashboardPageProps) {
  const behindSubscriptions = subscriptions.filter(s => s.status === "behind")
  const cards = statCards(stats)

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Welcome back,</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{displayName}</h1>
        </div>
        <Link
          href="/subscriptions/new"
          className={cn(buttonVariants(), "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 shrink-0")}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Subscription
        </Link>
      </div>

      {/* Alert */}
      {behindSubscriptions.length > 0 && (
        <div className="flex items-start gap-3 rounded-xl bg-red-500/8 p-4">
          <div className="h-8 w-8 rounded-lg bg-red-500/15 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-red-300">Action Required</h4>
            <p className="text-sm text-red-400/80 mt-0.5">
              {behindSubscriptions.length} subscription(s) are falling behind schedule. Update your tracked plan to stay on track.
            </p>
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => {
          const Icon = c.icon
          return (
            <SpotlightCard key={c.label} className="p-5">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm text-muted-foreground">{c.label}</p>
                <div className={`h-8 w-8 ${c.iconBg} ${c.iconColor} rounded-lg flex items-center justify-center`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mb-1 text-2xl font-bold text-foreground">{c.value}</p>
              <p className={`text-xs ${c.changeColor}`}>{c.change}</p>
            </SpotlightCard>
          )
        })}
      </div>

      {/* Subscriptions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Your Subscriptions</h2>
          <span className="text-sm text-muted-foreground">{subscriptions.length} plans</span>
        </div>
        {subscriptions.length === 0 ? (
          <SpotlightCard className="p-8 text-center">
            <p className="text-sm font-medium text-muted-foreground">Your subscriptions will be shown here</p>
          </SpotlightCard>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {subscriptions.map(sub => {
              const progress = calculateProgress(sub.savedAmount, sub.annualPrice)
              const isBehind = sub.status === "behind"

              return (
                <SpotlightCard
                  key={sub.id}
                  className={cn("p-6", isBehind && "border-red-500/20")}
                >
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center text-lg font-bold text-muted-foreground">
                        {sub.serviceName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{sub.serviceName}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Renews {formatDate(sub.billingDate)}
                        </p>
                      </div>
                    </div>
                    <Badge variant={isBehind ? "destructive" : "success"}>
                      {isBehind ? "Behind" : "On Track"}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-muted-foreground">
                          {formatCurrency(sub.savedAmount, sub.currency)} tracked
                        </span>
                        <span className="font-medium text-foreground">
                          {Math.round(progress)}% - goal {formatCurrency(sub.annualPrice, sub.currency)}
                        </span>
                      </div>
                      <Progress
                        value={progress}
                        className="h-1.5"
                        indicatorClassName={isBehind ? "bg-red-400" : "bg-emerald-400"}
                      />
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="text-sm">
                        <span className="text-muted-foreground text-xs block">Installment</span>
                        <span className="font-semibold text-foreground text-sm">
                          {formatCurrency(sub.installmentAmount, sub.currency)}
                          <span className="font-normal text-muted-foreground text-xs ml-1">/ {sub.frequency}</span>
                        </span>
                      </div>
                      <Link
                        href={`/subscriptions/${sub.id}`}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "sm" }),
                          "text-muted-foreground hover:text-foreground gap-1"
                        )}
                      >
                        Details <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </SpotlightCard>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
