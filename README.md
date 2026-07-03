# PaySplit

Next.js App Router implementation of the PaySplit fintech SaaS MVP.

PaySplit is an EU/EEA-first fintech SaaS MVP for turning annual subscription renewals into smaller installments. The product direction is a virtual piggybank: users add subscriptions and cards, PaySplit collects installments into a regulated stored balance, then pays renewal charges through PaySplit-managed virtual cards. The MVP may launch planning-first while regulated wallet and issuing partners are completed.

## Running the code

Install dependencies:

```powershell
pnpm install
```

Start the development server:

```powershell
pnpm dev
```

Build for production:

```powershell
pnpm build
```

## SEO configuration

Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs, `robots.txt`, and `sitemap.xml` use the deployed domain:

```powershell
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Environment variables

Copy `.env.example` and fill provider credentials before connecting Supabase or Stripe. Production deployments validate the required public and server-side variables through `src/app/lib/env.ts`.
