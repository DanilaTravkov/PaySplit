export type Currency = "EUR" | "USD" | "GBP";
export type InstallmentFrequency = "weekly" | "monthly" | "quarterly";
export type PaymentMethodType = "card" | "paypal" | "crypto" | "bank_transfer";
export type SubscriptionStatus = "on_track" | "behind" | "funded";

export interface Subscription {
  id: string;
  serviceName: string;
  logoUrl?: string;
  annualPrice: number;
  currency: Currency;
  billingDate: string; // ISO date string
  frequency: InstallmentFrequency;
  installmentAmount: number;
  savedAmount: number;
  paymentMethod: PaymentMethodType;
  status: SubscriptionStatus;
}

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  last4?: string;
  name: string;
  expiry?: string;
  isDefault: boolean;
}

export interface DashboardStats {
  activeSubscriptions: number;
  totalSaved: number;
  upcomingAnnualPayments: number;
  monthlyCommitment: number;
}
