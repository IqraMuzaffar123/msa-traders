import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/lib/products';
import { getWhatsAppLink, CATEGORIES } from '@/lib/types';
import { getImageUrl } from '@/lib/supabase';
import { MessageCircle, Phone, ArrowLeft, Tag, CheckCircle, Package, Shield, Truck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';

export const revalidate = 60;

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = (await getProducts(product.category))
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const conditionColors = {
    new: 'bg-emerald-500 text-white',
    refurbished: 'bg-accent-500 text-white',
    used: 'bg-amber-500 text-white',
  };

  const stockPercent = Math.min((product.stock_quantity / 10) * 100, 100);
  const stockColor = product.stock_quantity > 3 ? 'bg-emerald-500' : product.stock_quantity > 0 ? 'bg-amber-500' : 'bg-red-500';

  return (
    <>
      <section className="py-6 md:py-10 bg-[#eef2f6]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#5b7285] mb-6 overflow-x-auto">
            <Link href="/products" className="hover:text-accent-500 flex items-center gap-1 shrink-0 font-medium transition-colors">
              <ArrowLeft size={14} /> Equipment
            </Link>
            <span className="text-[#5b7285]/40">/</span>
            <Link href={`/products?category=${product.category}`} className="hover:text-accent-500 shrink-0 transition-colors">
              {CATEGORIES.find((c) => c.slug === product.category)?.name || product.category}
            </Link>
            <span className="text-[#5b7285]/40">/</span>
            <span className="text-[#12293f] truncate font-medium">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
            {/* Brand Header / Image */}
            <div>
              <div className="relative aspect-[4/3] rounded-[18px] overflow-hidden mb-3 border border-[rgba(30,58,95,0.10)]">
                {product.images?.[0] ? (
                  <Image
                    src={getImageUrl(product.images[0])}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0f2440] via-primary-500 to-[#0f5f5c] flex flex-col items-center justify-center p-8">
                    <div className="absolute inset-0 dot-pattern" />
                    <div className="absolute top-6 right-6 w-40 h-40 rounded-full bg-[radial-gradient(circle,rgba(13,148,136,0.35),transparent_68%)]" />
                    <div className="relative text-center">
                      <Package size={48} className="text-accent-300 mx-auto mb-4" />
                      <p className="font-serif text-xl md:text-2xl font-bold text-white mb-1">{product.name}</p>
                      {product.brand && (
                        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-300">{product.brand}</span>
                      )}
                    </div>
                  </div>
                )}
                <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.12em] shadow-md ${conditionColors[product.condition]}`}>
                  {product.condition}
                </span>
              </div>
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(1, 5).map((img, idx) => (
                    <div key={idx} className="relative aspect-square bg-white/[0.78] backdrop-blur-lg rounded-[12px] overflow-hidden border border-[rgba(30,58,95,0.10)] hover:border-accent-400 transition-colors cursor-pointer">
                      <Image
                        src={getImageUrl(img)}
                        alt={`${product.name} ${idx + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info Panel */}
            <div>
              {/* Badges */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={`px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-[0.12em] ${conditionColors[product.condition]}`}>
                  {product.condition}
                </span>
                {product.stock_quantity > 0 ? (
                  <span className={`px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider ${product.stock_quantity <= 3 ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
                    {product.stock_quantity} left in stock
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-500 border border-red-200">Out of Stock</span>
                )}
              </div>

              <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#12293f] mb-2 leading-tight">{product.name}</h1>

              {product.brand && (
                <p className="flex items-center gap-2 text-[#5b7285] mb-4 text-sm">
                  <Tag size={14} className="text-accent-500" />
                  <span className="font-mono text-[11px] tracking-wider uppercase">Brand:</span>
                  <span className="font-semibold text-[#12293f]">{product.brand}</span>
                </p>
              )}

              {/* Stock Progress Bar */}
              <div className="bg-white/[0.78] backdrop-blur-lg rounded-[18px] p-4 mb-4 border border-[rgba(30,58,95,0.10)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#5b7285]">Stock Level</span>
                  <span className={`text-xs font-bold ${product.stock_quantity > 3 ? 'text-emerald-600' : product.stock_quantity > 0 ? 'text-amber-600' : 'text-red-500'}`}>
                    {product.stock_quantity > 0 ? `${product.stock_quantity} remaining` : 'Out of stock'}
                  </span>
                </div>
                <div className="h-2 bg-[#eef2f6] rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${stockColor}`} style={{ width: `${stockPercent}%` }} />
                </div>
              </div>

              {/* Price Card */}
              <div className="bg-white/[0.78] backdrop-blur-lg rounded-[18px] p-5 mb-5 border border-[rgba(30,58,95,0.10)]">
                {product.price ? (
                  <p className="font-serif text-2xl md:text-3xl font-bold text-primary-500">
                    PKR {product.price.toLocaleString()}
                  </p>
                ) : (
                  <p className="font-serif text-lg font-semibold text-[#5b7285]">
                    {product.price_label || 'Contact for Price'}
                  </p>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <h3 className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#5b7285] mb-2">Description</h3>
                  <div className="text-sm text-[#5b7285] leading-relaxed whitespace-pre-line">
                    {product.description}
                  </div>
                </div>
              )}

              {/* Trust indicators */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { icon: Shield, label: 'Genuine Import' },
                  { icon: Truck, label: 'Nationwide Delivery' },
                  { icon: CheckCircle, label: 'Quality Checked' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 p-3 bg-white/[0.78] backdrop-blur-lg rounded-[14px] border border-[rgba(30,58,95,0.10)] text-center">
                    <Icon size={16} className="text-accent-500" />
                    <span className="text-[10px] font-semibold text-[#5b7285]">{label}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <a
                  href={getWhatsAppLink(product.name, product.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1fb855] text-white font-bold text-base md:text-lg py-4 rounded-[14px] transition-all shadow-lg shadow-[#25D366]/20 hover:shadow-xl hover:shadow-[#25D366]/25"
                >
                  <MessageCircle size={20} />
                  Inquire on WhatsApp
                </a>
                <a
                  href="tel:+923238844661"
                  className="w-full flex items-center justify-center gap-2 bg-white/[0.78] backdrop-blur-lg text-[#12293f] font-semibold text-sm py-3.5 rounded-[14px] border border-[rgba(30,58,95,0.10)] hover:border-accent-500/30 hover:text-accent-500 transition-all"
                >
                  <Phone size={16} />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-10 md:py-16 bg-[#eef2f6]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-500 mb-1 block">More Options</span>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-[#12293f]">Related Equipment</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
