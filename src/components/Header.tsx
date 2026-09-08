'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/types';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Equipment', href: '/products' },
  { label: 'Categories', href: '/categories' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/[0.86] backdrop-blur-[16px] border-b border-[rgba(30,58,95,0.10)]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-[72px] flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-[11px] bg-gradient-to-br from-primary-500 to-accent-500 grid place-items-center shadow-[0_6px_16px_rgba(30,58,95,0.24)]">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14" /><path d="M5 12h14" /></svg>
          </span>
          <span className="flex flex-col items-start leading-none">
            <span className="font-serif text-[19px] font-bold tracking-tight text-[#12293f]">MSA Traders</span>
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-accent-500 mt-0.5">Medical Imports</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="ml-auto hidden md:flex items-center gap-1">
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 rounded-[9px] text-[14.5px] font-medium text-[#5b7285] hover:bg-accent-50 hover:text-accent-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-accent-500 text-white text-sm font-semibold shadow-[0_8px_20px_rgba(13,148,136,0.26)] hover:bg-accent-600 transition-colors"
          >
            <MessageCircle size={15} />
            WhatsApp
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="ml-auto md:hidden p-2 rounded-lg border border-[rgba(30,58,95,0.14)] bg-white text-primary-500"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex-none px-4 py-2 rounded-full text-[13.5px] font-semibold text-[#5b7285] bg-gray-50 hover:bg-accent-50 hover:text-accent-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
