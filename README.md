# Barracade Website

Minimal, app-inspired marketing site for Barracade — an application security platform.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** (dark theme, no component libraries)
- **Prisma 7** (SQLite)
- **NextAuth 4** (Credentials provider, JWT)
- **Stripe** (one-time checkout)
- **Framer Motion** (minimal animation, purposeful only)
- **Lucide React** (icons)
- **Fonts:** Inter + JetBrains Mono

## Getting Started

```bash
npm install
```

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Run the Prisma migration and start the dev server:

```bash
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `src/app/` — Pages and API routes
- `src/components/` — UI components
- `src/lib/` — Utilities (auth, prisma, rate-limit, license, cn)
- `prisma/` — Database schema
- `public/` — Static assets

## Environment Variables

See `.env.example` for all required variables. At minimum you need:

- `NEXTAUTH_SECRET` — Random 32+ character string
- `STRIPE_SECRET_KEY` — From Stripe Dashboard
- `STRIPE_WEBHOOK_SECRET` — From Stripe webhook endpoint config
- `DOWNLOAD_URL_WINDOWS` / `DOWNLOAD_URL_MACOS` / `DOWNLOAD_URL_LINUX` — Hosted installer URLs

## Deployment

Optimized for **Vercel**. Push to GitHub and connect to Vercel for auto-deploys.

```bash
npm run build
```

## Note for Maintainers

This project contains an embedded cryptographic puzzle system.
See `src/puzzle/PUZZLE-DEV-DOC.md` for full documentation.
**Do not expose this file publicly.**

## License

Proprietary. All rights reserved.
