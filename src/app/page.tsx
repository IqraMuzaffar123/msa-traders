import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, Shield, Building2, Clock, MessageCircle } from 'lucide-react';
import { CATEGORIES } from '@/lib/types';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/lib/products';
import AnimatedStats from '@/components/AnimatedStats';

const SearchBar = dynamic(() => import('@/components/SearchBar'));

export const revalidate = 60;

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2440] via-primary-500 to-[#0f5f5c] py-16 md:py-24 lg:py-32">
        {/* Dot pattern */}
        <div className="absolute inset-0 dot-pattern" />
        {/* Floating orbs */}
        <div className="absolute -top-[90px] left-[6%] w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(13,148,136,0.42),transparent_68%)] animate-floaty" />
        <div className="absolute -bottom-[150px] right-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.20),transparent_66%)] animate-floaty-slow" />
        <div className="absolute top-[15%] right-[13%] w-[140px] h-[140px] rounded-[36px] border border-white/[0.13] rotate-[22deg] animate-floaty" />

        <div className="relative max-w-[900px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-6">
          {/* Pill */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-[10px]">
            <span className="w-[7px] h-[7px] rounded-full bg-accent-300 shadow-[0_0_10px_#2dd4bf]" />
            <span className="text-xs font-semibold tracking-[0.13em] uppercase text-white/[0.86]">Importing since 2010 · Lahore</span>
          </div>

          {/* Heading */}
          <h1 className="animate-fade-up font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.07] tracking-tight text-white" style={{ animationDelay: '120ms' }}>
            Hospital-grade equipment, sourced and verified.
          </h1>

          {/* Subtext */}
          <p className="animate-fade-up max-w-[620px] text-base md:text-lg leading-relaxed text-white/[0.76]" style={{ animationDelay: '240ms' }}>
            Ultrasound, anaesthesia, C-arms and critical-care systems from Siemens, Philips, GE, Dräger, Mindray and Toshiba — imported direct, installed and serviced across Pakistan.
          </p>

          {/* Search */}
          <div className="animate-fade-up w-full max-w-[660px]" style={{ animationDelay: '340ms' }}>
            <SearchBar variant="glass" />
          </div>

          {/* Trust Badges */}
          <div className="animate-fade-up flex flex-wrap justify-center gap-2.5" style={{ animationDelay: '460ms' }}>
            {[
              { icon: Shield, text: '100% genuine imports' },
              { icon: Building2, text: '500+ hospitals served' },
              { icon: Clock, text: '15+ years in trade' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.07] border border-white/[0.14] backdrop-blur-[10px]">
                <Icon size={16} className="text-accent-300" />
                <span className="text-[13.5px] font-medium text-white/90">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-[rgba(30,58,95,0.08)] py-10 md:py-11">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedStats />
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-500">Categories</span>
        <h2 className="mt-2.5 mb-7 font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#12293f]">Browse by department</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3.5">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} name={cat.name} slug={cat.slug} description={cat.description} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="flex items-end justify-between gap-4 mb-7">
            <div>
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-500">Featured</span>
              <h2 className="mt-2.5 font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#12293f]">Top equipment picks</h2>
            </div>
            <Link href="/products" className="text-sm font-semibold text-accent-500 hover:text-accent-600 transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-500">References</span>
        <h2 className="mt-2.5 mb-7 font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#12293f]">Trusted by hospitals nationwide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { quote: 'The refurbished Acuson arrived calibrated and probe-tested. Two of our radiologists could not tell it from new — and the price let us open a second OPD room.', name: 'Dr. Aisha Rehman', role: 'Head of Radiology · Karachi' },
            { quote: 'Four Dräger ventilators delivered to Lahore in eleven days with customs cleared. Their biomed team stayed two days for staff training.', name: 'Muhammad Tariq', role: 'Procurement Director · Lahore' },
            { quote: 'We buy our monitors and OT lights only through MSA now. Genuine parts, real warranty papers, and someone answers the phone on a Sunday.', name: 'Dr. Faisal Mehmood', role: 'Medical Superintendent · Peshawar' },
          ].map((t) => (
            <figure key={t.name} className="m-0 flex flex-col gap-4 p-6 rounded-[18px] bg-white border border-[rgba(30,58,95,0.10)] shadow-[0_2px_12px_rgba(30,58,95,0.05)]">
              <blockquote className="m-0 text-[15.5px] leading-relaxed text-[#26445f]">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="flex flex-col gap-0.5 pt-3.5 border-t border-[rgba(30,58,95,0.09)]">
                <span className="text-sm font-semibold text-[#12293f]">{t.name}</span>
                <span className="text-[12.5px] text-[#5b7285]">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="relative overflow-hidden max-w-[1240px] mx-auto rounded-[26px] bg-gradient-to-br from-[#0f2440] via-primary-500 to-[#0d5d59] px-6 py-14 md:py-20 text-center shadow-[0_30px_70px_rgba(15,36,64,0.26)]">
          <div className="absolute inset-0 dot-pattern" />
          <div className="absolute -top-[140px] left-1/2 w-[520px] h-[340px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(13,148,136,0.40),transparent_66%)] animate-floaty" />
          <div className="relative flex flex-col items-center gap-5">
            <h2 className="max-w-[660px] font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.14] tracking-tight text-white">
              Tell us what your department needs — we quote in 24 hours.
            </h2>
            <p className="max-w-[500px] text-sm md:text-base text-white/70 leading-relaxed">
              Can&apos;t find what you need? Describe your requirements and our sourcing team will find it from our international network.
            </p>
            <a
              href="https://wa.me/923238844661?text=Hi%2C%20I%20need%20help%20finding%20specific%20medical%20equipment."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-7 py-4 rounded-xl bg-accent-500 text-white text-base md:text-lg font-semibold shadow-[0_10px_26px_rgba(13,148,136,0.3)] hover:bg-accent-600 transition-all animate-pulse-cta"
            >
              <MessageCircle size={20} />
              Get a Quote on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
