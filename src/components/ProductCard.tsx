import Link from 'next/link';
import { Product } from '@/lib/types';
import { getWhatsAppLink, CATEGORIES } from '@/lib/types';
import { MessageCircle } from 'lucide-react';

const GRADIENTS = [
  'linear-gradient(135deg, #1e3a5f 0%, #0d9488 100%)',
  'linear-gradient(135deg, #0f2440 0%, #1e5f5c 100%)',
  'linear-gradient(135deg, #12293f 0%, #2dd4bf 100%)',
  'linear-gradient(135deg, #1a3355 0%, #0f766e 100%)',
  'linear-gradient(135deg, #0d1b35 0%, #115e59 100%)',
];

function getGradient(id: string) {
  const num = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return GRADIENTS[num % GRADIENTS.length];
}

function conditionStyle(condition: string) {
  switch (condition) {
    case 'new': return 'text-emerald-700';
    case 'refurbished': return 'text-blue-700';
    case 'used': return 'text-amber-700';
    default: return 'text-gray-700';
  }
}

export default function ProductCard({ product }: { product: Product }) {
  const category = CATEGORIES.find((c) => c.slug === product.category);

  return (
    <div className="group flex flex-col rounded-[18px] bg-white/[0.78] backdrop-blur-lg border border-[rgba(30,58,95,0.10)] shadow-[0_2px_10px_rgba(30,58,95,0.05)] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_rgba(30,58,95,0.16)] hover:border-[rgba(13,148,136,0.36)]">
      {/* Brand Gradient Header */}
      <Link href={`/products/${product.id}`} className="relative h-44 overflow-hidden" style={{ background: getGradient(product.id) }}>
        <div className="absolute inset-0 grid place-items-center transition-transform duration-500 group-hover:scale-110">
          <span className="font-serif text-[30px] font-bold text-white/90">{product.brand}</span>
        </div>
        {/* Condition Badge */}
        <span className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-[10.5px] font-bold tracking-[0.1em] uppercase bg-white/[0.92] ${conditionStyle(product.condition)}`}>
          {product.condition}
        </span>
        {/* Stock Badge */}
        <span className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-[11px] font-bold ${
          product.stock_quantity > 3
            ? 'bg-emerald-500/90 text-white'
            : product.stock_quantity > 0
              ? 'bg-amber-500/90 text-white animate-pulse'
              : 'bg-red-500/80 text-white line-through'
        }`}>
          {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Sold out'}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-2 p-[18px] flex-1">
        <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-accent-500">
          {product.brand} · {category?.name || product.category}
        </span>
        <Link href={`/products/${product.id}`} className="text-[16px] font-semibold leading-snug text-[#12293f] hover:text-accent-600 transition-colors">
          {product.name}
        </Link>
        <span className="font-serif text-[22px] font-bold tracking-tight text-primary-500">
          {product.price ? `PKR ${product.price.toLocaleString()}` : product.price_label || 'Contact for Price'}
        </span>
        <a
          href={getWhatsAppLink(product.name, product.id)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 h-[46px] rounded-[10px] bg-accent-500 text-white text-[14.5px] font-semibold hover:bg-accent-600 transition-colors"
        >
          <MessageCircle size={16} />
          {product.stock_quantity > 0 ? 'Inquire on WhatsApp' : 'Request Availability'}
        </a>
      </div>
    </div>
  );
}
