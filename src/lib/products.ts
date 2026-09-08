import { supabase, isSupabaseConfigured } from './supabase';
import { Product } from './types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Toshiba Aplio 500 Platinum',
    description: 'Premium diagnostic ultrasound system with advanced imaging capabilities. Features iBeam forming technology, Differential Tissue Harmonics, and Precision Imaging for exceptional image quality. Ideal for radiology, cardiology, and OB/GYN departments.\n\n• 21.5" high-resolution LED monitor\n• Advanced 4D imaging capability\n• Multiple transducer compatibility\n• DICOM connectivity\n• Ergonomic design for operator comfort',
    price: 2500000,
    price_label: 'PKR 2,500,000',
    category: 'ultrasound',
    brand: 'Toshiba / Canon Medical',
    condition: 'refurbished',
    images: ['/placeholder.jpg'],
    featured: true,
    in_stock: true,
    stock_quantity: 3,
    created_at: '2024-12-01T00:00:00Z',
    updated_at: '2024-12-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Canon Aplio i600',
    description: 'Next-generation ultrasound platform with intelligent imaging. The Aplio i600 delivers exceptional clinical performance with advanced automation and AI-powered features.\n\n• SMI (Superb Micro-vascular Imaging)\n• Shear Wave Elastography\n• 23.8" widescreen LED monitor\n• iBeam+ forming technology\n• Excellent penetration and resolution',
    price: 3200000,
    price_label: 'PKR 3,200,000',
    category: 'ultrasound',
    brand: 'Canon Medical',
    condition: 'refurbished',
    images: ['/placeholder.jpg'],
    featured: true,
    in_stock: true,
    stock_quantity: 2,
    created_at: '2024-11-15T00:00:00Z',
    updated_at: '2024-11-15T00:00:00Z',
  },
  {
    id: '3',
    name: 'Drager Fabius Plus XL',
    description: 'Versatile anesthesia workstation designed for high-performance ventilation in the OR. Features electronic gas mixing, integrated monitoring, and an intuitive user interface.\n\n• Electronic fresh gas mixer\n• Integrated ventilator with multiple modes\n• 15" color touchscreen display\n• Low-flow anesthesia capability\n• Comprehensive safety features',
    price: 1800000,
    price_label: 'PKR 1,800,000',
    category: 'anesthesia',
    brand: 'Dräger',
    condition: 'refurbished',
    images: ['/placeholder.jpg'],
    featured: true,
    in_stock: true,
    stock_quantity: 4,
    created_at: '2024-11-20T00:00:00Z',
    updated_at: '2024-11-20T00:00:00Z',
  },
  {
    id: '4',
    name: 'Mindray HyLED 9 Series',
    description: 'High-end surgical LED light system providing shadow-free illumination for operating theaters. Advanced LED technology ensures cool, bright, and uniform light output.\n\n• 160,000 lux center illuminance\n• Color temperature: 3,700–5,000K adjustable\n• 50,000+ hours LED lifespan\n• Shadow dilution with multi-point source design\n• HD camera integration option',
    price: 950000,
    price_label: 'PKR 950,000',
    category: 'ot-lights',
    brand: 'Mindray',
    condition: 'new',
    images: ['/placeholder.jpg'],
    featured: true,
    in_stock: true,
    stock_quantity: 6,
    created_at: '2024-12-05T00:00:00Z',
    updated_at: '2024-12-05T00:00:00Z',
  },
  {
    id: '5',
    name: 'Siemens Arcadis Avantic',
    description: 'Mobile C-arm system with flat-panel detector for superior intraoperative imaging. Perfect for orthopedic, trauma, and vascular surgery applications.\n\n• 30 x 30 cm flat detector\n• 1k x 1k image matrix\n• Motorized C-arm positioning\n• CINE loop and DSA capability\n• Low-dose imaging protocols',
    price: 4500000,
    price_label: 'PKR 4,500,000',
    category: 'c-arms',
    brand: 'Siemens Healthineers',
    condition: 'refurbished',
    images: ['/placeholder.jpg'],
    featured: true,
    in_stock: true,
    stock_quantity: 1,
    created_at: '2024-10-28T00:00:00Z',
    updated_at: '2024-10-28T00:00:00Z',
  },
  {
    id: '6',
    name: 'Philips IntelliVue MX800',
    description: 'Advanced patient monitoring system for critical care environments. Combines a large display with comprehensive monitoring capabilities for ICU and OR use.\n\n• 19" high-resolution touchscreen\n• 12-lead ECG with ST analysis\n• SpO2, IBP, CO2, cardiac output\n• Integrated clinical decision support\n• HL7 & DICOM connectivity',
    price: 1200000,
    price_label: 'PKR 1,200,000',
    category: 'patient-monitors',
    brand: 'Philips Healthcare',
    condition: 'refurbished',
    images: ['/placeholder.jpg'],
    featured: true,
    in_stock: true,
    stock_quantity: 5,
    created_at: '2024-11-10T00:00:00Z',
    updated_at: '2024-11-10T00:00:00Z',
  },
  {
    id: '7',
    name: 'Hamilton C6 Ventilator',
    description: 'Intelligent ICU ventilator with Adaptive Support Ventilation (ASV). Automates lung-protective ventilation and simplifies weaning from mechanical ventilation.\n\n• ASV — automated protective ventilation\n• IntelliSync+ for patient synchrony\n• Dynamic Lung panel visualization\n• Neonatal to adult range\n• Compact, portable design',
    price: null,
    price_label: 'Contact for Price',
    category: 'ventilators',
    brand: 'Hamilton Medical',
    condition: 'new',
    images: ['/placeholder.jpg'],
    featured: false,
    in_stock: true,
    stock_quantity: 2,
    created_at: '2024-11-25T00:00:00Z',
    updated_at: '2024-11-25T00:00:00Z',
  },
  {
    id: '8',
    name: 'GE MAC 2000 ECG',
    description: 'Resting 12-lead ECG system designed for accurate diagnostics in clinics and hospitals. Simple interface with powerful interpretation algorithms.\n\n• 12-lead simultaneous acquisition\n• Marquette 12SL interpretation\n• 7" color LCD display\n• Built-in thermal printer\n• USB & LAN connectivity',
    price: 350000,
    price_label: 'PKR 350,000',
    category: 'ecg',
    brand: 'GE Healthcare',
    condition: 'refurbished',
    images: ['/placeholder.jpg'],
    featured: false,
    in_stock: true,
    stock_quantity: 8,
    created_at: '2024-10-15T00:00:00Z',
    updated_at: '2024-10-15T00:00:00Z',
  },
  {
    id: '9',
    name: 'Maquet Magnus Surgical Table',
    description: 'Versatile electro-hydraulic operating table for a wide range of surgical disciplines. Exceptional stability and patient positioning flexibility.\n\n• 500 kg patient weight capacity\n• Carbon fiber tabletop (radiolucent)\n• Memory positions for quick setup\n• Trendelenburg / reverse Trendelenburg\n• Compatible with all imaging systems',
    price: 1600000,
    price_label: 'PKR 1,600,000',
    category: 'surgical-tables',
    brand: 'Maquet / Getinge',
    condition: 'refurbished',
    images: ['/placeholder.jpg'],
    featured: false,
    in_stock: true,
    stock_quantity: 3,
    created_at: '2024-09-20T00:00:00Z',
    updated_at: '2024-09-20T00:00:00Z',
  },
  {
    id: '10',
    name: 'Tuttnauer 3870EA Autoclave',
    description: 'Fully automatic tabletop sterilizer for clinics, dental offices, and small hospitals. Reliable steam sterilization with fast cycle times.\n\n• 85-liter chamber capacity\n• Pre-vacuum and gravity cycles\n• Built-in printer for documentation\n• Automatic door lock system\n• Stainless steel chamber construction',
    price: 420000,
    price_label: 'PKR 420,000',
    category: 'sterilizers',
    brand: 'Tuttnauer',
    condition: 'new',
    images: ['/placeholder.jpg'],
    featured: false,
    in_stock: true,
    stock_quantity: 5,
    created_at: '2024-10-05T00:00:00Z',
    updated_at: '2024-10-05T00:00:00Z',
  },
  {
    id: '11',
    name: 'Shimadzu MobileDaRt Evolution',
    description: 'Premium mobile digital X-ray system for bedside imaging. High image quality with a compact, maneuverable design for ICU and ward use.\n\n• 17x17" flat panel detector\n• 32 kW high-frequency generator\n• Wireless FPD operation\n• Anti-collision system\n• DICOM 3.0 compatible',
    price: 3800000,
    price_label: 'PKR 3,800,000',
    category: 'x-ray',
    brand: 'Shimadzu',
    condition: 'refurbished',
    images: ['/placeholder.jpg'],
    featured: false,
    in_stock: true,
    stock_quantity: 1,
    created_at: '2024-09-15T00:00:00Z',
    updated_at: '2024-09-15T00:00:00Z',
  },
  {
    id: '12',
    name: 'ZOLL R Series Defibrillator',
    description: 'Professional-grade defibrillator/monitor for emergency departments and critical care. Real CPR Help technology guides rescuers for better outcomes.\n\n• Manual + AED defibrillation modes\n• Real CPR Help feedback\n• 12-lead ECG display\n• SpO2 & EtCO2 monitoring\n• See-Thru CPR filter technology',
    price: 780000,
    price_label: 'PKR 780,000',
    category: 'defibrillators',
    brand: 'ZOLL Medical',
    condition: 'refurbished',
    images: ['/placeholder.jpg'],
    featured: false,
    in_stock: true,
    stock_quantity: 4,
    created_at: '2024-11-05T00:00:00Z',
    updated_at: '2024-11-05T00:00:00Z',
  },
];

export async function getProducts(category?: string, search?: string): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    let products = [...MOCK_PRODUCTS];
    if (category) {
      products = products.filter(p => p.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    return products;
  }

  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  if (search) {
    query = query.or(`name.ilike.%${search}%,brand.ilike.%${search}%,description.ilike.%${search}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data || [];
}

export async function getProduct(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return MOCK_PRODUCTS.find(p => p.id === id) || null;
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }
  return data;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_PRODUCTS.filter(p => p.featured).slice(0, 6);
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
  return data || [];
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    return null;
  }
  return data;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    return null;
  }
  return data;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }
  return true;
}

export async function uploadImage(file: File): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

  const { error } = await supabase.storage
    .from('products')
    .upload(fileName, file);

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  return fileName;
}

export async function deleteImage(path: string): Promise<boolean> {
  const { error } = await supabase.storage
    .from('products')
    .remove([path]);

  if (error) {
    console.error('Error deleting image:', error);
    return false;
  }
  return true;
}
