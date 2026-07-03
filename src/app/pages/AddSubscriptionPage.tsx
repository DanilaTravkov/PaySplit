"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calculator, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select } from "../components/ui/select"
import { formatCurrency } from "../lib/utils"
import { calculateInstallmentAmount } from "../lib/calculations"
import { InstallmentFrequency } from "../lib/types"

export function AddSubscriptionPage() {
  const router = useRouter()
  const [annualPrice, setAnnualPrice] = useState<number>(120)
  const [frequency, setFrequency] = useState<InstallmentFrequency>("monthly")

  // Calculate installment based on entered price and frequency
  const installmentAmount = calculateInstallmentAmount(annualPrice, frequency)

  return (
    <div className="max-w-2xl mx-auto pb-12">
      <Button
        variant="ghost"
        className="mb-6 -ml-2 text-muted-foreground hover:text-foreground gap-1"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">New Subscription</h1>
        <p className="text-muted-foreground text-sm mt-1">Set up a tracked plan for an upcoming annual renewal.</p>
      </div>

      <div className="grid gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
            <CardDescription>Which subscription are you planning for?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="service">Service Name</Label>
              <Input id="service" placeholder="e.g. Adobe Creative Cloud, Figma…" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Annual Price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">€</span>
                  <Input
                    id="price"
                    type="number"
                    className="pl-7"
                    value={annualPrice}
                    onChange={(e) => setAnnualPrice(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Renewal Date</Label>
                <Input id="date" type="date" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Planning Schedule</CardTitle>
            <CardDescription>Choose how to track the renewal cost across installments.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="frequency">Installment Frequency</Label>
              <Select
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as InstallmentFrequency)}
                className="bg-input-background border-border text-foreground"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </Select>
            </div>

            {/* Installment preview */}
            <div className="rounded-xl border border-primary/25 bg-primary/8 p-5">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                  <Calculator className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Your tracked installment</p>
                  <div className="text-3xl font-bold text-foreground">
                    {formatCurrency(installmentAmount)}
                    <span className="text-base font-normal text-muted-foreground ml-1">/ {frequency}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                    <Zap className="h-3 w-3 text-primary" />
                    Used to plan the installment schedule that will fund your renewal balance once money movement is enabled.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment">Payment Method</Label>
              <Select id="payment" className="bg-input-background border-border text-foreground">
                <option value="pm_1">Personal Visa ···· 4242</option>
                <option value="pm_2">PayPal Account</option>
                <option value="new">+ Add new payment method</option>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="border-t border-border flex justify-end gap-3">
            <Button variant="ghost" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 px-8">
              Confirm Plan
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
