Create a scaffold for a modern React project.

Project theme:
A payment and subscription web application.

Core idea:
Many online services only allow annual payments, even though users would prefer to pay monthly. This app acts as an intermediate subscription payment layer. A user chooses a service they want to subscribe to, selects a preferred payment schedule, and the app splits the total annual price into smaller recurring payments such as monthly or weekly installments. The user pays these smaller installments into the platform using a saved payment method such as bank card, PayPal, crypto, or another payment source. When the annual subscription payment is due, the platform uses the accumulated balance to pay the external service.

Important:
This is only a frontend scaffold/prototype. Do not implement real payment processing, real custody of funds, banking logic, crypto transactions, or legal/compliance logic. Use mocked data and placeholder flows only.

Tech stack:
- Next.js
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Radix UI
- lucide-react
- App Router
- Responsive design
- Component-based architecture

Design direction:
Create a clean fintech SaaS interface. The style should feel modern, trustworthy, minimal, and polished. Use a light theme by default with subtle gradients, cards, soft borders, financial dashboard patterns, and clear CTAs.

Application name:
PaySplit

Main user flow:
1. User lands on the marketing page.
2. User understands the problem: services force annual payments.
3. User sees the solution: PaySplit converts annual subscriptions into smaller recurring payments.
4. User opens the dashboard.
5. User adds a subscription.
6. User enters:
   - Service name
   - Annual subscription price
   - Billing date
   - Preferred payment frequency: monthly, weekly, or custom
   - Payment method: card, PayPal, crypto, bank transfer
7. The app calculates the installment amount.
8. The subscription appears in the dashboard.
9. User can see:
   - Total annual price
   - Amount already saved
   - Next installment date
   - Installment amount
   - Payment progress
   - Risk/warning if the user is behind schedule
10. User can open subscription details.

Pages to create:
- Landing page
- Dashboard page
- Add subscription page
- Subscription details page
- Payment methods page
- Settings page

Suggested routes:
- /
- /dashboard
- /subscriptions/new
- /subscriptions/[id]
- /payment-methods
- /settings

Landing page sections:
- Hero section with headline and CTA
- Problem section
- How it works section
- Example calculation section
- Supported payment methods section
- Security/trust section
- Pricing placeholder section
- FAQ section

Example hero copy:
“Turn annual subscriptions into manageable monthly payments.”

Example subheading:
“PaySplit helps you prepare for expensive annual renewals by collecting smaller recurring payments throughout the year.”

Dashboard features:
- Summary cards:
  - Active subscriptions
  - Total saved
  - Upcoming annual payments
  - Monthly commitment
- Subscription list/table
- Progress bars for each subscription
- Upcoming payments timeline
- Alerts for subscriptions that are underfunded

Add subscription form:
Use shadcn/ui form components where appropriate. The form should be visually polished and usable. Include validation-style UI, but the validation can be mocked.

Subscription calculation examples:
- Annual price: €120
- Monthly plan: €10/month
- Weekly plan: approximately €2.31/week
- Quarterly plan: €30/quarter

Mock data:
Create realistic mock subscriptions:
- Adobe Creative Cloud
- Notion
- GitHub Copilot
- Spotify
- Figma
- JetBrains

Components to create:
- AppShell
- Sidebar
- Topbar
- StatCard
- SubscriptionCard
- SubscriptionTable
- SubscriptionProgress
- PaymentMethodCard
- AddSubscriptionForm
- InstallmentCalculator
- EmptyState
- AlertBanner
- PricingCard
- FAQItem
- StepCard

UI requirements:
- Use Tailwind for layout and styling.
- Use shadcn/ui components for buttons, cards, forms, inputs, selects, tabs, dialogs, badges, progress bars, and tables.
- Use Radix UI primitives where useful.
- Use lucide-react icons.
- Make the app responsive for desktop and mobile.
- Use realistic spacing, typography, hover states, and disabled states.
- Include loading/empty/error placeholder states where relevant.

Data/model requirements:
Create TypeScript types for:
- Subscription
- PaymentMethod
- InstallmentFrequency
- InstallmentPlan
- DashboardStats

Example subscription type:
```ts
type Subscription = {
  id: string;
  serviceName: string;
  annualPrice: number;
  currency: "EUR" | "USD" | "GBP";
  billingDate: string;
  frequency: "weekly" | "monthly" | "quarterly";
  installmentAmount: number;
  savedAmount: number;
  paymentMethod: "card" | "paypal" | "crypto" | "bank_transfer";
  status: "on_track" | "behind" | "funded";
};
