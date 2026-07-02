# Production Plan: SplitSub Fintech SaaS

Implement the following in a sequential manner, according to user instructions regarding a part of this plan that will be implemented in a branch that the user should provide.

If there's no clear information about what bit of this plan should be implemented in the current prompt, return with a stop message and do not continue work.

## Product Direction

- SplitSub's core product is not a reminder-only planner. The product must collect user installments and make annual subscription renewals feel weekly, monthly, or quarterly.
- The target experience is: user adds a subscription, adds a card, SplitSub charges installments, funds accumulate in a regulated stored balance, and the subscription is paid through a SplitSub-managed virtual card on renewal day.
- The MVP is card-first. PayPal, crypto, open banking, bank transfers, and other wallets can be added later.
- Do not use card authorization holds as the money-safe mechanism. Card and PayPal holds are short-window tools and do not solve annual renewal funding.
- Do not represent customer renewal funds as SplitSub business revenue or hold them casually in SplitSub's own operating bank account. Customer funds require a regulated wallet/EMI/issuing partner or equivalent legal structure.
- Stripe can be used for card collection, SetupIntents, customer/payment-method management, webhooks, and optional SplitSub SaaS billing. Stored user renewal balances and virtual-card issuance must be modeled through a regulated money/issuing provider abstraction until a partner is selected.

## Architecture Principles

- Money is always stored as integer minor units plus currency.
- Renewal balances are real collected customer funds once money movement is enabled, not "planned reserve" placeholders.
- Every money movement must have an append-only ledger entry and an idempotent provider event record.
- User balances, installment charges, provider transfers, virtual card authorizations, captures, refunds, disputes, and reconciliation events must be auditable.
- User-owned application rows must be protected by Supabase RLS scoped by `user_id`.
- Provider webhooks must be signature-verified, idempotent, and safe to replay.
- Payment/custody/issuing provider code must sit behind local abstractions so Stripe, a wallet provider, and an issuing provider can be swapped or combined without rewriting product flows.

## Branch Roadmap

1. `chore/project-foundation` - DONE
   Set production naming and baseline config: app name/copy cleanup, env schema, security headers, private app metadata rules, shared constants, money minor-unit utilities.

2. `feat/supabase-foundation` - DONE
   Add Supabase packages, SSR clients, server/admin helpers, middleware session refresh, generated DB types setup, and migration workflow.

3. `feat/database-schema-rls`
   Create migrations for profiles, subscriptions, payment_methods, funding_plans, ledger_entries, reminder_events, stripe_customers, stripe_events, audit_logs, wallet_accounts, wallet_balances, installment_charges, provider_events, virtual_cards, card_authorizations, renewal_payments, refunds, disputes, and reconciliation_runs. Add RLS policies scoped by `user_id`.

4. `feat/auth-google-oauth`
   Implement Supabase Google OAuth, email/password auth, callback route, profile creation on first login, protected app layout, logout, auth loading/error states, and route redirects.

5. `feat/money-provider-abstraction`
   Add server-side interfaces and database mappings for payment collection, stored balances, virtual card issuing, provider events, reconciliation, and idempotency. Keep implementations stubbed until providers are selected.

6. `feat/subscription-crud-supabase`
   Replace mock subscriptions with Supabase-backed CRUD for dashboard, new subscription, subscription details, and delete/update flows.

7. `feat/installment-planning-engine`
   Move installment calculations into shared/server-safe logic. Store money as integer minor units plus currency. Add renewal status, behind-plan detection, charge schedule projection, catch-up charge calculation, and renewal readiness logic.

8. `feat/stripe-customer-setup`
   Add Stripe server helpers, customer creation/sync, stripe_customers, env validation for Stripe keys, and audit logs for customer/payment setup actions.

9. `feat/stripe-setup-intents`
   Implement card setup with SetupIntents, SCA-ready client flow, card metadata sync, and payment method list/remove/default behavior.

10. `feat/installment-charge-engine`
    Implement scheduled card charges for weekly/monthly/quarterly installments, failed-payment states, retry windows, catch-up charge attempts, and ledger entries for collected funds.

11. `feat/provider-wallet-balances`
    Integrate the selected regulated wallet/EMI partner or a provider adapter stub. Record wallet accounts, real balances, balance holds, provider transfer IDs, and reconciliation-safe ledger events.

12. `feat/virtual-card-issuing`
    Integrate the selected issuing provider or a provider adapter stub. Create subscription-specific virtual cards, spending controls, merchant/category limits where supported, freeze/unfreeze flows, and card status sync.

13. `feat/renewal-payment-flow`
    Route vendor renewal charges through SplitSub-managed virtual cards. Track card authorizations, captures, declines, short-balance handling, user notifications, and renewal completion states.

14. `feat/provider-webhooks`
    Add webhook routes for Stripe and money/issuing providers, signature verification, idempotent provider_events storage, setup success/failure handling, charge lifecycle handling, virtual card event handling, and audit logging.

15. `feat/reconciliation-engine`
    Add reconciliation jobs for Stripe payments, wallet balances, virtual card transactions, ledger entries, refunds, disputes, and provider settlement reports.

16. `feat/optional-saas-billing`
    Add optional SplitSub paid-plan billing via Stripe Checkout/subscriptions. Keep SaaS revenue strictly separate from customer renewal balances.

17. `feat/reminders-cron`
    Add Vercel Cron routes for upcoming renewals, failed installment charges, behind-plan alerts, renewal-day events, and expiring payment methods. Store reminder_events.

18. `feat/audit-logs-rate-limits`
    Add audit logs for sensitive actions and basic rate limiting on auth/payment/server mutation routes.

19. `feat/gdpr-export-delete`
    Add user data export and delete/account closure flows, including safe cleanup behavior for Supabase, Stripe metadata, wallet provider metadata, and issuing provider metadata.

20. `test/unit-finance-logic`
    Unit tests for installment calculations, renewal status, charge schedules, ledger projections, minor-unit rounding, currency handling, retry logic, and catch-up charge calculation.

21. `test/integration-supabase-rls`
    Integration tests proving users cannot read/write each other's rows.

22. `test/integration-money-ledger`
    Integration tests for provider event idempotency, ledger balancing, wallet balance read models, virtual card events, refunds, disputes, and reconciliation invariants.

23. `test/e2e-auth-crud-payments`
    E2E coverage for Google OAuth, subscription CRUD, card setup, installment charge states, dashboard balances, virtual card states, renewal payment states, and settings.

24. `chore/production-vercel`
    Finalize Vercel env separation, preview/prod config, sitemap/robots/canonical checks, private app noindex rules, cron configuration, webhook URLs, and deployment checklist.

25. `docs/regulatory-provider-selection`
    Document custody/wallet/issuing partner requirements, EU/EEA licensing assumptions, KYC/KYB responsibilities, safeguarding/segregation expectations, statements, refunds, disputes, and legal review gates.

## Current Assumptions

- First launch is EU/EEA and EUR-first.
- MVP is card-first for user funding.
- Google OAuth is required; email/password can remain as fallback.
- Real renewal-money collection requires a regulated money/issuing provider before production launch.
- Stripe alone is not the long-term stored-balance provider for customer renewal funds.
