# Patinax — Watch Comparison & Discovery Platform

**Live:** [patinax.com](https://patinax.com)

Patinax is an SEO-driven watch encyclopedia. Users can browse watches by brand, compare any two models side by side, and find a watch that fits them through a short quiz. Every page is generated from a structured watch database, so new models automatically get their own detail, comparison and listing pages.

## Features

- **Watch database:** case size, thickness, water resistance, movement, caliber, power reserve, materials and price range for each model
- **Head-to-head comparisons:** `/compare/[a]-vs-[b]` pages generated from any pair of watches, with view tracking
- **"Find your watch" quiz:** recommends models based on the user's answers
- **Content hubs:** brands, brand tiers, movements, materials, sizes, styles, glossary, guides and "top" lists
- **SEO:** dynamic sitemap, structured metadata, canonical URLs and IndexNow pings so search engines pick up new pages quickly

## Tech stack

| Layer | Tools |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, Framer Motion |
| Data | PostgreSQL on Supabase, Prisma ORM |
| Charts | Chart.js |
| Hosting | Vercel |

## Data pipeline

The catalog is built by scripts in [`prisma/`](prisma) and [`scripts/`](scripts) that pull specs from a watch API, open datasets and Wikipedia, enrich images through the eBay Browse API, and fill in missing descriptions. All API credentials are read from environment variables.

## Running locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npx prisma generate
npm run dev
```

Required environment variables:

```
DATABASE_URL=            # Supabase pooled connection
DIRECT_URL=              # Supabase direct connection (migrations)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
WATCH_API_KEY=           # only for the seed scripts
EBAY_CLIENT_ID=          # only for image scripts
EBAY_CLIENT_SECRET=
```

## Project structure

```
src/
  app/          routes: watch/[brand], compare/[slug], find-your-watch, brands, guides, ...
  components/   brands, comparison, quiz, seo, layout and UI components
  lib/          content modules, comparison logic, SEO helpers, Prisma & Supabase clients
prisma/         schema and data import scripts
scripts/        one-off maintenance scripts
```
