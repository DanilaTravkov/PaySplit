"use client"

import React from "react"
import { CreditCard, Plus, MoreHorizontal, Wallet } from "lucide-react"
import { MOCK_PAYMENT_METHODS } from "../lib/mockData"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

export function PaymentMethodsPage() {
  const methods = MOCK_PAYMENT_METHODS

  return (
    <div className="max-w-4xl pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Payment Methods</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage where your installment funds come from.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          Add Method
        </Button>
      </div>

      <div className="grid gap-3">
        {methods.map((pm) => (
          <Card
            key={pm.id}
            className={pm.isDefault ? "border-primary/30 bg-primary/5" : ""}
          >
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-accent flex items-center justify-center">
                  {pm.type === "card" ? (
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Wallet className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{pm.name}</h3>
                    {pm.isDefault && (
                      <Badge variant="default" className="text-xs">Default</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {pm.type === "card" && pm.last4 ? `···· ${pm.last4}` : "Connected Account"}
                    {pm.expiry && ` · Expires ${pm.expiry}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!pm.isDefault && (
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground text-xs">
                    Set as Default
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add new method placeholder */}
        <button className="flex items-center gap-3 rounded-xl border border-dashed border-border p-5 text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors group">
          <div className="h-11 w-11 rounded-xl border border-dashed border-border flex items-center justify-center group-hover:border-primary/40 transition-colors">
            <Plus className="h-4 w-4" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium">Add payment method</p>
            <p className="text-xs text-muted-foreground">Card, bank transfer, or PayPal</p>
          </div>
        </button>
      </div>
    </div>
  )
}
