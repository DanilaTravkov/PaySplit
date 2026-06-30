import { Subscription, PaymentMethod, DashboardStats } from "./types";

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "sub_1",
    serviceName: "Adobe Creative Cloud",
    annualPrice: 600,
    currency: "EUR",
    billingDate: "2026-11-15T00:00:00Z",
    frequency: "monthly",
    installmentAmount: 50,
    savedAmount: 350,
    paymentMethod: "card",
    status: "on_track",
  },
  {
    id: "sub_2",
    serviceName: "Notion",
    annualPrice: 120,
    currency: "EUR",
    billingDate: "2026-08-01T00:00:00Z",
    frequency: "monthly",
    installmentAmount: 10,
    savedAmount: 20,
    paymentMethod: "card",
    status: "behind",
  },
  {
    id: "sub_3",
    serviceName: "GitHub Copilot",
    annualPrice: 100,
    currency: "EUR",
    billingDate: "2026-10-10T00:00:00Z",
    frequency: "weekly",
    installmentAmount: 1.92,
    savedAmount: 60,
    paymentMethod: "paypal",
    status: "on_track",
  },
  {
    id: "sub_4",
    serviceName: "JetBrains All Products",
    annualPrice: 289,
    currency: "EUR",
    billingDate: "2026-12-05T00:00:00Z",
    frequency: "monthly",
    installmentAmount: 24.08,
    savedAmount: 120,
    paymentMethod: "card",
    status: "on_track",
  },
];

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pm_1",
    type: "card",
    name: "Personal Visa",
    last4: "4242",
    expiry: "12/28",
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "paypal",
    name: "PayPal Account",
    isDefault: false,
  },
];

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  activeSubscriptions: 4,
  totalSaved: 550,
  upcomingAnnualPayments: 1109,
  monthlyCommitment: 92.4, // rough approx
};
