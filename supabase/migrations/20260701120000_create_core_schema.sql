create extension if not exists pgcrypto;
create extension if not exists citext;

create type public.currency_code as enum ('EUR', 'USD', 'GBP');
create type public.payment_method_type as enum ('card', 'bank_transfer', 'paypal', 'crypto');
create type public.installment_frequency as enum ('weekly', 'monthly', 'quarterly');
create type public.subscription_status as enum ('active', 'paused', 'archived');
create type public.funding_plan_status as enum ('on_track', 'behind', 'ready', 'paused', 'cancelled');
create type public.ledger_entry_type as enum ('planned_contribution', 'manual_adjustment', 'renewal_checkpoint', 'missed_checkpoint');
create type public.reminder_event_type as enum ('upcoming_renewal', 'behind_plan', 'payment_method_expiring', 'manual');
create type public.reminder_event_status as enum ('pending', 'sent', 'skipped', 'failed');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email citext not null,
  full_name text,
  avatar_url text,
  default_currency public.currency_code not null default 'EUR',
  locale text not null default 'en-US',
  region text not null default 'EU/EEA',
  accepted_terms_at timestamptz,
  onboarding_completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.payment_methods (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type public.payment_method_type not null default 'card',
  stripe_payment_method_id text,
  display_name text not null,
  brand text,
  last4 text,
  exp_month smallint check (exp_month is null or exp_month between 1 and 12),
  exp_year smallint check (exp_year is null or exp_year >= 2026),
  billing_name text,
  is_default boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service_name text not null check (char_length(service_name) between 1 and 140),
  service_url text,
  logo_url text,
  renewal_amount_minor integer not null check (renewal_amount_minor > 0),
  currency public.currency_code not null default 'EUR',
  renewal_date date not null,
  billing_interval_months smallint not null default 12 check (billing_interval_months > 0),
  status public.subscription_status not null default 'active',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.funding_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subscription_id uuid not null references public.subscriptions(id) on delete cascade,
  payment_method_id uuid references public.payment_methods(id) on delete set null,
  target_amount_minor integer not null check (target_amount_minor > 0),
  tracked_balance_minor integer not null default 0 check (tracked_balance_minor >= 0),
  currency public.currency_code not null default 'EUR',
  frequency public.installment_frequency not null default 'monthly',
  installment_amount_minor integer not null check (installment_amount_minor > 0),
  starts_on date not null default current_date,
  target_date date not null,
  status public.funding_plan_status not null default 'on_track',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (target_date >= starts_on)
);

create table public.ledger_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  funding_plan_id uuid not null references public.funding_plans(id) on delete cascade,
  subscription_id uuid not null references public.subscriptions(id) on delete cascade,
  entry_type public.ledger_entry_type not null,
  amount_minor integer not null check (amount_minor <> 0),
  currency public.currency_code not null default 'EUR',
  effective_on date not null default current_date,
  description text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.reminder_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subscription_id uuid references public.subscriptions(id) on delete cascade,
  funding_plan_id uuid references public.funding_plans(id) on delete cascade,
  event_type public.reminder_event_type not null,
  status public.reminder_event_status not null default 'pending',
  scheduled_for timestamptz not null,
  sent_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.stripe_customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  stripe_customer_id text not null unique,
  livemode boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.stripe_events (
  stripe_event_id text primary key,
  event_type text not null,
  api_version text,
  livemode boolean not null default false,
  payload jsonb not null,
  processed_at timestamptz,
  processing_error text,
  received_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_table text,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create table public.mvp_signups (
  id uuid primary key default gen_random_uuid(),
  email citext not null,
  user_id uuid references auth.users(id) on delete set null,
  source text not null default 'landing_page',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create unique index profiles_email_key on public.profiles (email);
create unique index payment_methods_stripe_payment_method_id_key
  on public.payment_methods (stripe_payment_method_id)
  where stripe_payment_method_id is not null;
create unique index payment_methods_one_default_per_user
  on public.payment_methods (user_id)
  where is_default;
create unique index mvp_signups_email_key on public.mvp_signups (email);

create index payment_methods_user_id_idx on public.payment_methods (user_id);
create index subscriptions_user_id_idx on public.subscriptions (user_id);
create index subscriptions_renewal_date_idx on public.subscriptions (renewal_date);
create index funding_plans_user_id_idx on public.funding_plans (user_id);
create index funding_plans_subscription_id_idx on public.funding_plans (subscription_id);
create index ledger_entries_user_id_idx on public.ledger_entries (user_id);
create index ledger_entries_funding_plan_id_effective_on_idx on public.ledger_entries (funding_plan_id, effective_on);
create index reminder_events_user_id_scheduled_for_idx on public.reminder_events (user_id, scheduled_for);
create index reminder_events_status_scheduled_for_idx on public.reminder_events (status, scheduled_for);
create index stripe_events_received_at_idx on public.stripe_events (received_at);
create index audit_logs_user_id_created_at_idx on public.audit_logs (user_id, created_at desc);
create index audit_logs_actor_user_id_created_at_idx on public.audit_logs (actor_user_id, created_at desc);

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger set_payment_methods_updated_at
before update on public.payment_methods
for each row execute function public.set_updated_at();

create trigger set_subscriptions_updated_at
before update on public.subscriptions
for each row execute function public.set_updated_at();

create trigger set_funding_plans_updated_at
before update on public.funding_plans
for each row execute function public.set_updated_at();

create trigger set_reminder_events_updated_at
before update on public.reminder_events
for each row execute function public.set_updated_at();

create trigger set_stripe_customers_updated_at
before update on public.stripe_customers
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = coalesce(public.profiles.full_name, excluded.full_name),
        avatar_url = coalesce(public.profiles.avatar_url, excluded.avatar_url),
        updated_at = now();

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.payment_methods enable row level security;
alter table public.subscriptions enable row level security;
alter table public.funding_plans enable row level security;
alter table public.ledger_entries enable row level security;
alter table public.reminder_events enable row level security;
alter table public.stripe_customers enable row level security;
alter table public.stripe_events enable row level security;
alter table public.audit_logs enable row level security;
alter table public.mvp_signups enable row level security;

create policy "Users can read own profile"
on public.profiles for select
to authenticated
using (id = auth.uid());

create policy "Users can update own profile"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create policy "Users can insert own profile"
on public.profiles for insert
to authenticated
with check (id = auth.uid());

create policy "Users can manage own payment methods"
on public.payment_methods for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "Users can manage own subscriptions"
on public.subscriptions for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "Users can manage own funding plans"
on public.funding_plans for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "Users can manage own ledger entries"
on public.ledger_entries for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "Users can manage own reminder events"
on public.reminder_events for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "Users can read own stripe customer"
on public.stripe_customers for select
to authenticated
using (user_id = auth.uid());

create policy "Users can read own audit logs"
on public.audit_logs for select
to authenticated
using (user_id = auth.uid() or actor_user_id = auth.uid());

create policy "Anyone can join the MVP tester list"
on public.mvp_signups for insert
to anon, authenticated
with check (email is not null);

create policy "Users can read own MVP signup"
on public.mvp_signups for select
to authenticated
using (user_id = auth.uid());
