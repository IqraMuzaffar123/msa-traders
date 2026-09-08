import Link from 'next/link';
import { MessageCircle, Home, Package, ArrowRight } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/types';

export const metadata = {
  title: 'Page Not Found | MSA Traders',
  description: 'The page you are looking for could not be found. Browse our medical equipment catalogue or contact us on WhatsApp.',
};

export default function NotFound() {
  const whatsappLink = getWhatsAppLink();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2440] via-primary-500 to-[#0f5f5c] min-h-[calc(100vh-64px)] flex items-center justify-center py-20 px-4">
      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern" />

      {/* Floating orbs */}
      <div className="absolute -top-[90px] left-[6%] w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(13,148,136,0.42),transparent_68%)] animate-floaty" />
      <div className="absolute -bottom-[150px] right-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.20),transparent_66%)] animate-floaty-slow" />
      <div className="absolute top-[15%] right-[13%] w-[140px] h-[140px] rounded-[36px] border border-white/[0.13] rotate-[22deg] animate-floaty" />

      <div className="relative max-w-[640px] mx-auto flex flex-col items-center text-center gap-6">
        {/* 404 label */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-[10px]">
          <span className="w-[7px] h-[7px] rounded-full bg-accent-300 shadow-[0_0_10px_#2dd4bf]" />
          <span className="text-xs font-semibold tracking-[0.13em] uppercase text-white/[0.86]">Error 404</span>
        </div>

        {/* Big 404 */}
        <p className="font-serif text-[100px] sm:text-[140px] font-bold leading-none tracking-tight text-white/[0.08] select-none -mb-4">
          404
        </p>

        {/* Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-bold leading-[1.1] tracking-tight text-white -mt-2">
          Page not found
        </h1>

        {/* Sub-text */}
        <p className="max-w-[480px] text-base md:text-lg leading-relaxed text-white/[0.72]">
          The page you&apos;re looking for may have moved or no longer exists. Browse our equipment catalogue or reach us directly on WhatsApp — we respond fast.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full sm:w-auto">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/[0.10] border border-white/[0.18] backdrop-blur-[10px] text-white text-sm font-semibold hover:bg-white/[0.17] transition-all w-full sm:w-auto justify-center"
          >
            <Home size={16} />
            Back to Home
          </Link>

          <Link
            href="/products"
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/[0.10] border border-white/[0.18] backdrop-blur-[10px] text-white text-sm font-semibold hover:bg-white/[0.17] transition-all w-full sm:w-auto justify-center"
          >
            <Package size={16} />
            Browse Products
            <ArrowRight size={14} className="opacity-70" />
          </Link>
        </div>

        {/* Divider */}
        <div className="w-full max-w-[320px] border-t border-white/[0.12] my-1" />

        {/* WhatsApp CTA */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-7 py-4 rounded-xl bg-accent-500 text-white text-base font-semibold shadow-[0_10px_26px_rgba(13,148,136,0.30)] hover:bg-accent-600 transition-all animate-pulse-cta"
        >
          <MessageCircle size={20} />
          Get a Quote on WhatsApp
        </a>

        <p className="text-[12.5px] text-white/40">
          Can&apos;t find what you need? Our sourcing team will help.
        </p>
      </div>
    </section>
  );
}
