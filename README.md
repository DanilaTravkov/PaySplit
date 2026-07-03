# PaySplit

Next.js App Router implementation of the PaySplit fintech SaaS MVP.

PaySplit is a non-custodial EU/EEA-first MVP. It tracks planned reserves and renewal readiness for subscription bills, but it does not hold, reserve, or store user funds.

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
