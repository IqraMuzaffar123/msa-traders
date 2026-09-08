-- MSA Traders - Database Setup
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  price NUMERIC DEFAULT NULL,
  price_label TEXT DEFAULT 'Contact for Price',
  category TEXT NOT NULL,
  brand TEXT DEFAULT '',
  condition TEXT DEFAULT 'refurbished' CHECK (condition IN ('new', 'refurbished', 'used')),
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster category queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anyone can view products)
CREATE POLICY "Public can view products" ON products
  FOR SELECT USING (true);

-- Allow authenticated and anon users to insert/update/delete (admin uses anon key with password protection in the app)
-- For a simple setup, we allow all operations with the anon key
-- In production, you'd use service_role key or proper auth
CREATE POLICY "Allow all operations" ON products
  FOR ALL USING (true) WITH CHECK (true);

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to product images
CREATE POLICY "Public can view product images" ON storage.objects
  FOR SELECT USING (bucket_id = 'products');

-- Allow uploads to product images bucket
CREATE POLICY "Allow product image uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'products');

-- Allow deletes from product images bucket
CREATE POLICY "Allow product image deletes" ON storage.objects
  FOR DELETE USING (bucket_id = 'products');

-- Insert sample product (optional - delete after testing)
INSERT INTO products (name, description, price, category, brand, condition, featured, in_stock, stock_quantity)
VALUES
  ('Toshiba Aplio 500 Platinum', 'High-performance ultrasound system with advanced imaging capabilities. Features 4D imaging, elastography, and superior image quality for comprehensive diagnostic imaging.', 2500000, 'ultrasound', 'Toshiba', 'refurbished', true, true, 3),
  ('Canon Aplio i600', 'Next-generation ultrasound platform with intelligent imaging technology. Offers exceptional image clarity and advanced clinical applications.', 3500000, 'ultrasound', 'Canon', 'refurbished', true, true, 2),
  ('Drager Fabius Plus XL', 'Premium anesthesia workstation with integrated monitoring. Suitable for all types of surgical procedures.', 1800000, 'anesthesia', 'Drager', 'refurbished', true, true, 5),
  ('Mindray HyLED 9 Series', 'Surgical LED light system with excellent color rendering and shadow management. Energy efficient with long lifespan.', 800000, 'ot-lights', 'Mindray', 'new', true, true, 10),
  ('Siemens Arcadis Avantic', 'Mobile C-arm system with flat panel detector for excellent image quality in surgical and interventional procedures.', 4500000, 'c-arms', 'Siemens', 'refurbished', true, true, 1),
  ('Philips IntelliVue MX800', 'Advanced patient monitoring system for ICU and critical care. Multi-parameter monitoring with touchscreen interface.', 1200000, 'patient-monitors', 'Philips', 'refurbished', false, true, 0);
