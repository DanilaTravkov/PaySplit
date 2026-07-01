"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Edit2, Calendar, CreditCard, Clock, CheckCircle, Pause } from "lucide-react"
import { MOCK_SUBSCRIPTIONS } from "../lib/mockData"
import { formatCurrency, formatDate } from "../lib/utils"
import { calculateProgress } from "../lib/calculations"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { Badge } from "../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { PRODUCT_COPY } from "../lib/constants"

export function SubscriptionDetailsPage({ subscriptionId }: { subscriptionId: string }) {
  const router = useRouter()

  const subscription = MOCK_SUBSCRIPTIONS.find(s => s.id === subscriptionId) || MOCK_SUBSCRIPTIONS[0]
  const progress = calculateProgress(subscription.savedAmount, subscription.annualPrice)
  const isBehind = subscription.status === "behind"

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <Button
        variant="ghost"
        className="mb-6 -ml-2 text-muted-foreground hover:text-foreground gap-1"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{subscription.serviceName}</h1>
            <Badge variant={isBehind ? "destructive" : "success"}>
              {isBehind ? "Behind" : "On Track"}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            {formatCurrency(subscription.annualPrice)} annual renewal · Due {formatDate(subscription.billingDate)}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Pause className="h-3.5 w-3.5" />
            Pause
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Edit2 className="h-3.5 w-3.5" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{PRODUCT_COPY.plannedReserveLabel} Progress</CardTitle>
            <CardDescription>Track your readiness toward the annual goal. Funds remain outside SplitSub.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end mb-5">
              <div>
                <p className="text-xs text-muted-foreground mb-1">{PRODUCT_COPY.trackedBalanceLabel}</p>
                <div className="text-4xl font-bold text-foreground">{formatCurrency(subscription.savedAmount)}</div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">Goal</p>
                <div className="text-xl font-semibold text-muted-foreground">{formatCurrency(subscription.annualPrice)}</div>
              </div>
            </div>

            <Progress
              value={progress}
              className="h-2.5 mb-2"
              indicatorClassName={isBehind ? "bg-red-400" : "bg-primary"}
            />

            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>{Math.round(progress)}% ready</span>
              <span>{formatCurrency(subscription.annualPrice - subscription.savedAmount)} remaining</span>
            </div>

            {isBehind && (
              <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/8 p-4 flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-red-500/15 flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-300">Slightly behind schedule</h4>
                  <p className="text-sm text-red-400/80 mt-0.5">
                    A missed checkpoint has put you off track. Update your plan to catch up.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3 border-red-500/30 text-red-400 hover:bg-red-500/10">
                    Update Plan
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { icon: Calendar, label: "Frequency", value: subscription.frequency },
              { icon: CreditCard, label: "Per Installment", value: formatCurrency(subscription.installmentAmount) },
              { icon: CheckCircle, label: "Funding Source", value: subscription.paymentMethod },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium text-foreground capitalize">{value}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Tracked activity for this subscription.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[0, 1, 2].map((i) => (
                <TableRow key={i}>
                  <TableCell className="text-muted-foreground text-sm">
                    {formatDate(new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString())}
                  </TableCell>
                  <TableCell className="text-sm">Scheduled Checkpoint</TableCell>
                  <TableCell>
                    <Badge variant="success">Completed</Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-emerald-400 text-sm">
                    +{formatCurrency(subscription.installmentAmount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
