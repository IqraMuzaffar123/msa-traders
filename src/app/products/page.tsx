import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/products';
import { CATEGORIES } from '@/lib/types';
import Link from 'next/link';
import { Search, X, SlidersHorizontal } from 'lucide-react';

const SearchBar = dynamic(() => import('@/components/SearchBar'));

export const revalidate = 60;

export const metadata = {
  title: 'Equipment | MSA Traders',
  description: 'Browse our complete range of imported medical equipment.',
};

async function ProductGrid({ category, search }: { category?: string; search?: string }) {
  const products = await getProducts(category, search);

  if (products.length === 0) {
    return (
      <div className="text-center py-16 md:py-20">
        <div className="w-20 h-20 bg-white/60 rounded-[18px] flex items-center justify-center mx-auto mb-5 border border-[rgba(30,58,95,0.10)]">
          <Search size={32} className="text-gray-300" />
        </div>
        <h3 className="font-serif text-xl font-bold text-[#12293f] mb-2">No Equipment Found</h3>
        <p className="text-[#5b7285] text-sm max-w-md mx-auto mb-6">
          {search
            ? `No results for "${search}". Try a different search term or browse all equipment.`
            : category
            ? `No equipment in this category yet. Check back soon!`
            : 'No equipment listed yet. Products will appear here once added.'}
        </p>
        {search && (
          <Link href="/products" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors">
            <X size={16} /> Clear Search
          </Link>
        )}
      </div>
    );
  }

  return (
    <>
      {search && (
        <div className="flex items-center justify-between mb-6 bg-accent-50 rounded-[14px] px-4 py-3 border border-accent-100">
          <p className="text-sm text-[#5b7285]">
            Showing <span className="font-bold text-accent-600">{products.length}</span> result{products.length !== 1 ? 's' : ''} for &quot;<span className="font-semibold text-[#12293f]">{search}</span>&quot;
          </p>
          <Link href="/products" className="text-xs text-accent-500 hover:text-accent-600 flex items-center gap-1 font-semibold bg-white px-3 py-1.5 rounded-lg border border-accent-200 hover:border-accent-300 transition-colors">
            <X size={12} /> Clear
          </Link>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default async function ProductsPage(props: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const searchParams = await props.searchParams;
  const activeCategory = searchParams.category;
  const searchQuery = searchParams.search;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2440] via-primary-500 to-[#0f5f5c] py-12 md:py-16">
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute top-10 right-0 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(13,148,136,0.3),transparent_68%)]" />
        <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-300 mb-2 block">Catalogue</span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
            {searchQuery
              ? 'Search Results'
              : activeCategory
              ? CATEGORIES.find((c) => c.slug === activeCategory)?.name || 'Equipment'
              : 'All Equipment'}
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-xl mb-6">
            Browse our range of premium imported medical equipment from top global brands
          </p>
          <div className="max-w-[660px]">
            <SearchBar initialQuery={searchQuery} variant="glass" />
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="py-4 bg-white/80 backdrop-blur-md border-b border-[rgba(30,58,95,0.08)] sticky top-16 md:top-[72px] z-30 shadow-sm">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 text-[#5b7285] mr-2 shrink-0">
              <SlidersHorizontal size={14} />
              <span className="text-xs font-medium">Filter:</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide flex-1">
              <Link
                href="/products"
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  !activeCategory && !searchQuery
                    ? 'bg-accent-500 text-white shadow-md'
                    : 'bg-white/60 text-[#5b7285] hover:bg-accent-50 border border-[rgba(30,58,95,0.12)]'
                }`}
              >
                All
              </Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/products?category=${cat.slug}`}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat.slug
                      ? 'bg-accent-500 text-white shadow-md'
                      : 'bg-white/60 text-[#5b7285] hover:bg-accent-50 border border-[rgba(30,58,95,0.12)]'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 md:py-12">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-[18px] bg-white/60 animate-pulse overflow-hidden border border-[rgba(30,58,95,0.10)]">
                  <div className="h-44 bg-gray-200" />
                  <div className="p-[18px] space-y-3">
                    <div className="h-2.5 bg-gray-200 rounded-full w-20" />
                    <div className="h-4 bg-gray-200 rounded-full w-3/4" />
                    <div className="h-6 bg-gray-200 rounded-full w-28" />
                    <div className="h-[46px] bg-gray-200 rounded-[10px]" />
                  </div>
                </div>
              ))}
            </div>
          }>
            <ProductGrid category={activeCategory} search={searchQuery} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
