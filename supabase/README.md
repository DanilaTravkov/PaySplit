# Supabase Workflow

This folder contains Supabase migrations and generated seed data for the SplitSub MVP.

The baseline schema creates:

- `profiles`
- `subscriptions`
- `payment_methods`
- `funding_plans`
- `ledger_entries`
- `reminder_events`
- `stripe_customers`
- `stripe_events`
- `audit_logs`
- `mvp_signups`

## Migrations

Create migrations with:

```powershell
pnpm supabase:migration:new <migration_name>
```

Apply local or linked-project migrations with:

```powershell
pnpm supabase:db:push
```

Pull remote schema changes only when reconciling an existing Supabase project:

```powershell
pnpm supabase:db:pull
```

## Generated Types

After tables exist, regenerate TypeScript database types:

```powershell
pnpm supabase:types
```

The output target is `src/app/lib/supabase/database.types.ts`.

## CSV Seed Data

Generated CSV data should live under `supabase/seed/csv/`, one file per table. The current files are header-only templates. Do not add production user data or secrets.
