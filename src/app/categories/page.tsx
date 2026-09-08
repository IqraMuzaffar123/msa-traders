import { CATEGORIES } from '@/lib/types';
import CategoryCard from '@/components/CategoryCard';

export const metadata = {
  title: 'Equipment Categories | MSA Traders',
  description: 'Browse medical equipment by category - ultrasound, anesthesia, OT lights, C-arms, and more.',
};

export default function CategoriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2440] via-primary-500 to-[#0f5f5c] py-12 md:py-16">
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute top-10 right-0 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(13,148,136,0.3),transparent_68%)]" />
        <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-300 mb-2 block">Browse By Type</span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
            Equipment Categories
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-xl">
            Browse our complete range of imported medical equipment organised by category
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-10 md:py-16 bg-[#eef2f6]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-500 mb-2 block">Our Range</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#12293f]">All Categories</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} {...cat} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
