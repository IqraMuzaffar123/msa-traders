# MSA Traders — Project TODO

## Current Status
The site is **fully functional with mock data** (12 products, 12 categories). All pages render, search works, admin dashboard works (read-only with mock data). No database needed to demo the UI.

**Live preview:** `npm run dev` → http://localhost:3001

---

## Phase 1: UI Polish (Before Demo) — Priority: HIGH

- [ ] Add real product images (currently all show `/placeholder.jpg` or gradient fallback)
  - Option A: Add actual `.jpg` images to `/public/products/` folder
  - Option B: Use free stock images from Unsplash/Pexels for each product category
- [ ] Replace placeholder testimonials with real client quotes (or remove section)
- [ ] Verify company stats are accurate (15+ years, 500+ hospitals, 6+ cities)
- [ ] Verify client names on About page (Hameed Latif Hospital, Dr. Ihsan Mumtaz, Dr. Iffat Anwar)
- [ ] Add MSA Traders logo image (currently text-only in Header)
- [ ] Add favicon (currently Next.js default)

## Phase 2: Connect Supabase (Make Dynamic) — Priority: MEDIUM

- [ ] Create Supabase project at https://supabase.com (free tier)
- [ ] Run `supabase-setup.sql` in Supabase SQL Editor
- [ ] Add env vars to `.env.local`:
  ```
  NEXT_PUBLIC_SUPABASE_URL=your_project_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
  ```
- [ ] Test admin dashboard CRUD (add, edit, delete products)
- [ ] Upload real product images via admin dashboard (stored in Supabase Storage)
- [ ] Add category management to admin dashboard (add/edit/delete categories)

## Phase 3: Deploy (Go Live) — Priority: MEDIUM

- [ ] Deploy to Vercel (free) — repo already on GitHub: https://github.com/IqraMuzaffar123/msa-traders
- [ ] Add Supabase env vars on Vercel dashboard
- [ ] Set custom domain (msatraders.pk or subdomain)
- [ ] Change `NEXT_PUBLIC_ADMIN_PASSWORD` to a strong password on Vercel env vars
- [ ] Change `NEXT_PUBLIC_WHATSAPP_NUMBER` to actual business number
- [ ] Test all pages on mobile + desktop after deploy

## Phase 4: Security & Production Hardening — Priority: LOW

- [ ] Move admin auth to server-side (currently client-side password check)
- [ ] Tighten Supabase RLS policies (currently allows all operations with anon key)
- [ ] Add proper Supabase Auth for admin (email/password login)
- [ ] Add rate limiting on admin operations
- [ ] Set up Supabase backups

## Phase 5: Feature Additions — Priority: LOW

- [ ] Add product image gallery (multiple images per product, lightbox viewer)
- [ ] Add "Request Quote" form (collect name, phone, email, product interest)
- [ ] Add WhatsApp chat widget (instead of just redirect)
- [ ] Add product comparison feature
- [ ] Add analytics (Vercel Analytics or Google Analytics)
- [ ] Add blog/news section for SEO
- [ ] Add Urdu language toggle

---

## Pages Overview

| Route | Status | Notes |
|---|---|---|
| `/` (Homepage) | Done | Hero, search, categories, featured products, testimonials, CTA |
| `/products` | Done | Full catalogue with category filter + search |
| `/products/[id]` | Done | Product detail with specs, related products, WhatsApp CTA |
| `/categories` | Done | Category overview grid |
| `/about` | Done | Company story, values, CTA |
| `/contact` | Done | Phone, WhatsApp, email, Instagram, location/hours |
| `/admin` | Done | Password-protected login |
| `/admin/dashboard` | Done | Product CRUD, stats, search, category filter |
| `/not-found` (404) | Done | Branded error page with navigation |
| `/sitemap.xml` | Done | Auto-generated for SEO |
| `/robots.txt` | Done | Allows crawlers, blocks `/admin/` |

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL + Storage) — falls back to mock data when not configured
- **Icons:** Lucide React
- **Fonts:** Inter, Playfair Display, IBM Plex Mono
- **Notifications:** react-hot-toast
- **Deployment:** Vercel (free tier)
