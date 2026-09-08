import Link from 'next/link';
import { CATEGORIES, WHATSAPP_NUMBER } from '@/lib/types';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0f2440] text-white/80">
      {/* WhatsApp CTA Strip */}
      <div className="bg-gradient-to-r from-accent-600 to-accent-500">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white font-semibold text-sm">Need a quote? We respond within 24 hours.</p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I need a quote for medical equipment.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-accent-600 text-sm font-bold hover:bg-gray-50 transition-colors"
          >
            <MessageCircle size={16} /> Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-9 h-9 rounded-[11px] bg-gradient-to-br from-primary-400 to-accent-500 grid place-items-center">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14" /><path d="M5 12h14" /></svg>
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-lg font-bold text-white">MSA Traders</span>
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-accent-400 mt-0.5">Medical Imports</span>
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Pakistan&apos;s trusted source for imported medical equipment. Serving hospitals and clinics since 2010.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'All Equipment', href: '/products' },
                { label: 'Categories', href: '/categories' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-accent-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Categories */}
          <div>
            <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-4">Equipment</h4>
            <ul className="space-y-2.5">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/products?category=${cat.slug}`} className="text-sm text-white/60 hover:text-accent-400 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="text-accent-400 mt-0.5 shrink-0" />
                <span className="text-sm text-white/60">+92 323 8844661</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={14} className="text-accent-400 mt-0.5 shrink-0" />
                <span className="text-sm text-white/60">tamoor.muhammad1@gmail.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-accent-400 mt-0.5 shrink-0" />
                <span className="text-sm text-white/60">Lahore, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} MSA Traders. All rights reserved.</p>
          <p className="text-xs text-white/40">Premium Medical Equipment Importers</p>
        </div>
      </div>
    </footer>
  );
}
