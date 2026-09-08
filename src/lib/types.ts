export interface Product {
  id: string;
  name: string;
  description: string;
  price: number | null;
  price_label: string;
  category: string;
  brand: string;
  condition: 'new' | 'refurbished' | 'used';
  images: string[];
  featured: boolean;
  in_stock: boolean;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  image: string;
  product_count?: number;
}

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Ultrasound Machines', slug: 'ultrasound', icon: 'Monitor', description: 'Diagnostic ultrasound systems from top brands', image: '' },
  { id: '2', name: 'Anesthesia Machines', slug: 'anesthesia', icon: 'Wind', description: 'Advanced anesthesia delivery systems', image: '' },
  { id: '3', name: 'OT Lights', slug: 'ot-lights', icon: 'Lightbulb', description: 'Surgical & examination LED lights', image: '' },
  { id: '4', name: 'C-Arms', slug: 'c-arms', icon: 'Scan', description: 'Fluoroscopy & imaging C-arm systems', image: '' },
  { id: '5', name: 'Patient Monitors', slug: 'patient-monitors', icon: 'Activity', description: 'Vital signs & multi-parameter monitors', image: '' },
  { id: '6', name: 'Ventilators', slug: 'ventilators', icon: 'Waves', description: 'ICU & portable ventilation systems', image: '' },
  { id: '7', name: 'ECG Machines', slug: 'ecg', icon: 'HeartPulse', description: 'Electrocardiograph machines', image: '' },
  { id: '8', name: 'Surgical Tables', slug: 'surgical-tables', icon: 'BedDouble', description: 'Operation theater tables & accessories', image: '' },
  { id: '9', name: 'Defibrillators', slug: 'defibrillators', icon: 'Zap', description: 'AED & manual defibrillators', image: '' },
  { id: '10', name: 'Sterilizers', slug: 'sterilizers', icon: 'Shield', description: 'Autoclaves & sterilization equipment', image: '' },
  { id: '11', name: 'X-Ray Machines', slug: 'x-ray', icon: 'RadioTower', description: 'Digital & portable X-ray systems', image: '' },
  { id: '12', name: 'Other Equipment', slug: 'other', icon: 'Package', description: 'Miscellaneous medical equipment', image: '' },
];

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923238844661';

export const getWhatsAppLink = (productName?: string, productId?: string) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msatraders.pk';
  let message: string;
  if (productName && productId) {
    message = `Hi, I'm interested in "${productName}" listed on your website.\n\nProduct link: ${siteUrl}/products/${productId}\n\nPlease share pricing, availability, and delivery details.`;
  } else if (productName) {
    message = `Hi, I'm interested in "${productName}" listed on MSA Traders website. Please share pricing and availability details.`;
  } else {
    message = `Hi, I'm visiting the MSA Traders website and I'm interested in your medical equipment. Please share your latest catalogue and pricing.`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
