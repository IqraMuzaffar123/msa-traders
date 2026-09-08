# MSA Traders - Medical Equipment Website

A modern product catalog website for MSA Traders, a medical equipment importing company in Pakistan.

## Features

- **Product Catalog** — Browse equipment by category with images, prices, and descriptions
- **Category Pages** — Organized categories: Ultrasound, Anesthesia, OT Lights, C-Arms, etc.
- **WhatsApp Integration** — One-tap inquiry via WhatsApp on every product
- **Admin Dashboard** — Upload products with images, manage inventory
- **Mobile Responsive** — Works perfectly on all devices
- **SEO Optimized** — Meta tags, Open Graph, fast loading

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Image Storage**: Supabase Storage
- **Deployment**: Vercel (Free)

## Setup Instructions

### 1. Create a Supabase Project (Free)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **SQL Editor** and run the contents of `supabase-setup.sql`
4. Copy your project URL and anon key from **Settings > API**

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_WHATSAPP_NUMBER=923001234567  # WhatsApp number (with country code, no +)
NEXT_PUBLIC_ADMIN_PASSWORD=your-admin-password
```

### 3. Install & Run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the website and `http://localhost:3000/admin` for the dashboard.

### 4. Deploy to Vercel (Free)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Add environment variables in Vercel dashboard
4. Deploy!

## Admin Dashboard

- Access: `/admin`
- Default password: `msa2024admin` (change via NEXT_PUBLIC_ADMIN_PASSWORD env var)
- Features: Add/edit/delete products, upload images, manage categories

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero, categories, featured products |
| Products | `/products` | All products with category filter |
| Product Detail | `/products/[id]` | Full product page with WhatsApp inquiry |
| Categories | `/categories` | All equipment categories |
| About | `/about` | Company information |
| Contact | `/contact` | Contact details + WhatsApp CTA |
| Admin Login | `/admin` | Admin authentication |
| Dashboard | `/admin/dashboard` | Product management |

## Instagram

Follow MSA Traders on Instagram: [@msa_traders](https://www.instagram.com/msa_traders)
