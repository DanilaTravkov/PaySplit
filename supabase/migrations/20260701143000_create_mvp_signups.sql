create extension if not exists pgcrypto;
create extension if not exists citext;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.mvp_signups (
  id uuid primary key default gen_random_uuid(),
  email citext not null,
  status text not null default 'subscribed',
  source text not null default 'landing_page',
  converted_user_id uuid references auth.users(id) on delete set null,
  invited_at timestamptz,
  unsubscribed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint mvp_signups_status_check
    check (status in ('subscribed', 'invited', 'converted', 'unsubscribed'))
);

alter table public.mvp_signups
  add column if not exists status text not null default 'subscribed',
  add column if not exists source text not null default 'landing_page',
  add column if not exists converted_user_id uuid references auth.users(id) on delete set null,
  add column if not exists invited_at timestamptz,
  add column if not exists unsubscribed_at timestamptz,
  add column if not exists metadata jsonb not null default '{}'::jsonb,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'mvp_signups'
      and column_name = 'user_id'
  ) then
    update public.mvp_signups
    set converted_user_id = user_id
    where converted_user_id is null
      and user_id is not null;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'mvp_signups_status_check'
  ) then
    alter table public.mvp_signups
      add constraint mvp_signups_status_check
      check (status in ('subscribed', 'invited', 'converted', 'unsubscribed'));
  end if;
end $$;

create unique index if not exists mvp_signups_email_key
  on public.mvp_signups (email);

create index if not exists mvp_signups_status_created_at_idx
  on public.mvp_signups (status, created_at desc);

create index if not exists mvp_signups_converted_user_id_idx
  on public.mvp_signups (converted_user_id)
  where converted_user_id is not null;

drop trigger if exists set_mvp_signups_updated_at on public.mvp_signups;
create trigger set_mvp_signups_updated_at
before update on public.mvp_signups
for each row execute function public.set_updated_at();

alter table public.mvp_signups enable row level security;

drop policy if exists "Anyone can join the MVP tester list" on public.mvp_signups;
create policy "Anyone can join the MVP tester list"
on public.mvp_signups for insert
to anon, authenticated
with check (
  email is not null
  and status = 'subscribed'
);

drop policy if exists "Users can read own MVP signup" on public.mvp_signups;
create policy "Users can read own MVP signup"
on public.mvp_signups for select
to authenticated
using (converted_user_id = auth.uid());
