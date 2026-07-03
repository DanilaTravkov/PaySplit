import { InDevelopmentNotice } from "../components/dashboard/InDevelopmentNotice"

export function PaymentMethodsPage() {
  return (
    <div className="max-w-4xl pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Payment Methods</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage where your installment funds come from.</p>
      </div>

      <InDevelopmentNotice />
    </div>
  )
}
