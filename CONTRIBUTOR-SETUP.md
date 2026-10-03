# MSA Traders - Contributor Setup Guide

Complete guide to get the project running locally and access all services.

## Prerequisites

- **Node.js** 18+ — [download](https://nodejs.org/)
- **Git** — [download](https://git-scm.com/)
- **VS Code** (recommended) — [download](https://code.visualstudio.com/)

## 1. Clone & Install

```bash
git clone https://github.com/IqraMuzaffar123/msa-traders.git
cd msa-traders
npm install
```

## 2. Environment Setup

Copy the example env file and fill in the real values (ask the project owner for credentials):

```bash
cp .env.example .env.local
```

Edit `.env.local` with the actual values:

| Variable | Where to Find |
|----------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → anon/public key |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Business WhatsApp number (country code, no +) |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Admin panel login password |

## 3. Run Locally

```bash
npm run dev
```

- Website: http://localhost:3000
- Admin Panel: http://localhost:3000/admin

## 4. Supabase Access

### Dashboard Login

- **URL**: https://supabase.com/dashboard
- **Project**: MSA Traders (project ref: `ngjensttvovbhbiicsvv`)
- Login with the Supabase account credentials (ask project owner)

### Database Tables

| Table | Purpose |
|-------|---------|
| `products` | All product listings (name, price, category, images, stock) |
| `storage.objects` | Product images stored in `products` bucket |

### SQL Editor

If you need to reset or modify the database, run `supabase-setup.sql` in Supabase Dashboard → SQL Editor.

### Storage (Product Images)

- Bucket name: `products`
- Public access: Yes (images are publicly viewable)
- Upload via: Admin dashboard at `/admin/dashboard`

## 5. Admin Dashboard

- **URL**: `/admin`
- **Password**: Set via `NEXT_PUBLIC_ADMIN_PASSWORD` env var (default: `msa2024admin`)
- **Features**:
  - Add new products with images
  - Edit existing products
  - Delete products
  - Mark products as featured
  - Manage stock/inventory

## 6. Project Structure

```
msa-traders/
├── src/
│   ├── app/              # Next.js pages (App Router)
│   │   ├── page.tsx      # Home page
│   │   ├── products/     # Product listing & detail pages
│   │   ├── categories/   # Category pages
│   │   ├── about/        # About page
│   │   ├── contact/      # Contact page
│   │   └── admin/        # Admin login + dashboard
│   ├── components/       # Reusable UI components
│   └── lib/
│       ├── supabase.ts   # Supabase client config
│       └── types.ts      # TypeScript types & constants
├── public/               # Static assets (logo, images)
├── supabase-setup.sql    # Database schema (run in SQL Editor)
├── .env.example          # Environment variable template
└── package.json
```

## 7. Deployment (Vercel)

The site deploys on Vercel:

1. Push changes to `main` branch on GitHub
2. Vercel auto-deploys from the `main` branch
3. Env vars must be set in Vercel Dashboard → Project → Settings → Environment Variables

## 8. Common Tasks

### Add a new product category
1. Add products via Admin Dashboard with the new category name
2. Update category list in `src/lib/types.ts` if needed
3. Add category image in `public/` folder

### Update WhatsApp number
Change `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` and Vercel env vars.

### Modify database schema
1. Edit `supabase-setup.sql`
2. Run the new SQL in Supabase Dashboard → SQL Editor

## 9. Useful Links

| Resource | URL |
|----------|-----|
| GitHub Repo | https://github.com/IqraMuzaffar123/msa-traders |
| Supabase Dashboard | https://supabase.com/dashboard |
| Vercel Dashboard | https://vercel.com/dashboard |
| Next.js Docs | https://nextjs.org/docs |
| Supabase Docs | https://supabase.com/docs |
| Tailwind CSS Docs | https://tailwindcss.com/docs |

## Need Help?

Contact the project owner for:
- Supabase account credentials
- Vercel access
- `.env.local` file with real values
