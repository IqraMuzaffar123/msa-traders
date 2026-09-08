import { Target, Users, Globe, Award, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | MSA Traders',
  description: 'Learn about MSA Traders - Pakistan\'s trusted medical equipment importers.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2440] via-primary-500 to-[#0f5f5c] py-12 md:py-16">
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(13,148,136,0.3),transparent_68%)]" />
        <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-300 mb-2 block">Our Story</span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">About MSA Traders</h1>
          <p className="text-sm md:text-base text-white/70 max-w-2xl">
            Your trusted partner for premium imported medical equipment across Pakistan
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 md:py-20 bg-[#eef2f6]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/[0.78] backdrop-blur-lg rounded-[18px] border border-[rgba(30,58,95,0.10)] p-6 md:p-10">
              <div className="inline-flex items-center gap-2 bg-accent-500/10 text-accent-500 px-4 py-2 rounded-xl text-xs font-semibold mb-6">
                <CheckCircle size={14} /> Trusted Since Day One
              </div>
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-500 mb-2 block">Who We Are</span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#12293f] mb-6">Our Company</h2>
              <div className="space-y-4 text-[#5b7285] leading-relaxed text-sm md:text-base">
                <p>
                  MSA Traders is a leading medical equipment importing company based in Lahore, Pakistan.
                  We specialize in sourcing and supplying high-quality medical machines and equipment
                  from renowned international manufacturers including Siemens, Philips, GE, Toshiba, Mindray, and Drager.
                </p>
                <p>
                  Our extensive product range includes ultrasound machines, anesthesia systems,
                  OT lights, C-arms, patient monitors, ventilators, and much more. We serve hospitals,
                  clinics, diagnostic centers, and medical institutions across 6+ cities in Pakistan --
                  from Lahore to Peshawar, Multan to Kashmir.
                </p>
                <p>
                  With our deep industry knowledge and international sourcing network, we ensure
                  that healthcare providers get access to the latest medical technology at competitive prices.
                  Our clients include leading institutions like Hameed Latif Hospital and respected practitioners
                  like Dr. Ihsan Mumtaz and Dr. Iffat Anwar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-20 bg-[#eef2f6]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-500 mb-2 block">Our Strengths</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#12293f] mb-4">Why Choose MSA Traders</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              { icon: Globe, title: 'International Network', desc: 'Direct imports from top manufacturers worldwide -- Siemens, Philips, GE, Toshiba and more.' },
              { icon: Award, title: 'Quality Assurance', desc: 'Every machine is thoroughly inspected and tested before delivery to ensure peak performance.' },
              { icon: Users, title: 'Expert Consultation', desc: 'Our technical team provides guidance to help you choose the right equipment for your facility.' },
              { icon: Target, title: 'Competitive Pricing', desc: 'Direct importing means better prices without compromising on quality or service.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/[0.78] backdrop-blur-lg rounded-[18px] border border-[rgba(30,58,95,0.10)] p-5 md:p-6 text-center group hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-accent-500/10 rounded-[14px] flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-500 transition-all duration-300">
                  <Icon size={24} className="text-accent-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-serif font-bold text-base mb-2 text-[#12293f]">{title}</h3>
                <p className="text-sm text-[#5b7285] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-[#eef2f6]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/[0.78] backdrop-blur-lg rounded-[18px] border border-[rgba(30,58,95,0.10)] p-8 md:p-12 text-center">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-500 mb-2 block">Get Started</span>
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#12293f] mb-3">Ready to equip your facility?</h3>
            <p className="text-[#5b7285] mb-6 max-w-lg mx-auto text-sm">Browse our catalog or get in touch for a personalized quote</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/products" className="inline-flex items-center gap-2 justify-center px-6 py-3 rounded-[14px] bg-accent-500 text-white font-semibold text-sm hover:bg-accent-600 transition-colors shadow-lg shadow-accent-500/20">
                Browse Equipment <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/923238844661?text=Hi%2C%20I%20want%20to%20discuss%20medical%20equipment%20requirements."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 justify-center px-6 py-3 rounded-[14px] bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1fb855] transition-colors shadow-lg shadow-[#25D366]/20"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
