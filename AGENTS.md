# Production Plan: SplitSub Fintech SaaS

Implement the following in a sequential manner, according to user instructions regarding a part of this plan that will be implemented in a branch that the user should provide.

If there's no clear information about what bit of this plan should be implemented in the current prompt, return with a stop message and do no continue work.

## Summary
- Build v1 as a non-custodial EU/EEA MVP: SplitSub tracks planned savings and renewal readiness, but does not hold, reserve, or store user funds.
- Use Next.js on Vercel, Supabase for Auth/Postgres/RLS, Google OAuth via Supabase, and Stripe for payment method setup, billing, and future paid plans.
- Do not use card holds as the “money safe”; Stripe/card authorization windows are days, not months. Real stored balances become a later regulated-provider phase.

## Key Changes
- Replace mock data with Supabase tables: profiles, subscriptions, payment_methods, funding_plans, ledger_entries, reminder_events, stripe_customers, stripe_events, audit_logs.
- Rename user-facing “saved amount” semantics to a clear non-custodial concept like Planned reserve or Tracked balance, with copy stating funds are not held by SplitSub.
- Add Supabase SSR clients for Next.js, middleware session refresh, Google OAuth callback route, protected app layout, and RLS policies scoped by user_id.
- Add Stripe server routes for SetupIntent/Checkout session creation, saved payment method sync, webhook verification, idempotent webhook storage, and optional app subscription billing.
- Add production env vars: NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, SUPABASE_SECRET_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.

## Implementation Plan
- Auth and data foundation: create Supabase project, migrations, generated TS types, RLS policies, Google OAuth, profile creation on first login, and server-only admin helpers.
- Subscription planning: convert dashboard/new/details/settings pages to read/write Supabase data; store all money as integer minor units plus currency; calculate installment schedules server-side.
- Virtual safe workaround: implement a ledger of expected contributions and renewal targets only; support reminders, progress tracking, and missed-plan detection without charging or holding renewal funds.
- Stripe v1: save payment methods with SetupIntents, sync card metadata, handle SCA-ready flows, and optionally charge only SplitSub SaaS fees. Do not charge users “toward” renewal balances until a regulated custody model exists.
- Scheduling: use Vercel Cron to run reminder jobs for upcoming renewals, behind-plan alerts, and payment method expiry checks.
- Production hardening: add audit logs, rate limiting on auth/payment routes, webhook idempotency, error monitoring, GDPR delete/export flows, CSP/security headers, preview/prod environment separation, and backup policy.

## Regulated Money Phase
- Treat real user balances as a separate phase requiring legal review and a regulated partner.
- Evaluate EU/EEA-compatible partners for wallets/virtual accounts/segregated funds before implementation.
- Only then add actual stored balances, reconciliation, KYC/KYB, statements, refunds, disputes, and financial ledger controls.

## Test Plan
- Unit test installment calculations, renewal status, ledger projections, and currency rounding.
- Integration test Supabase RLS so users cannot read/write each other’s data.
- E2E test Google OAuth login, subscription CRUD, payment method setup, dashboard states, and settings.
- Stripe test webhooks for setup success/failure, duplicate events, expired cards, and failed billing.
- Production checks: pnpm build, sitemap/robots/canonical metadata, private app noindex, Vercel preview deploy, Supabase migration replay.

## Assumptions
- First launch is EU/EEA and EUR-first.
- v1 uses Supabase, Stripe, and Vercel.
- v1 does not hold user funds or claim funds are secured in a SplitSub wallet.
- Google OAuth is required; email magic link can remain as fallback.
- Official references: Stripe manual capture limits, Stripe save/reuse payments, Supabase Next.js SSR, Supabase Google OAuth, and Vercel environment variables.