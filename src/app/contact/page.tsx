import { Phone, Mail, MapPin, Instagram, MessageCircle, Clock, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | MSA Traders',
  description: 'Get in touch with MSA Traders for medical equipment inquiries.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2440] via-primary-500 to-[#0f5f5c] py-12 md:py-16">
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute top-10 left-0 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(13,148,136,0.3),transparent_68%)]" />
        <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-300 mb-2 block">Get In Touch</span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">Contact Us</h1>
          <p className="text-sm md:text-base text-white/70 max-w-2xl">
            Reach out for equipment inquiries, quotes, or technical consultation
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-[#eef2f6]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-3">
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-500 mb-2 block">Reach Out</span>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-[#12293f] mb-6">How to Reach Us</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  {
                    icon: Phone,
                    title: 'Phone',
                    detail: '+92 323 8844661',
                    href: 'tel:+923238844661',
                    iconBg: 'bg-primary-500/10',
                    iconColor: 'text-primary-500',
                  },
                  {
                    icon: MessageCircle,
                    title: 'WhatsApp',
                    detail: 'Chat with us instantly',
                    href: 'https://wa.me/923238844661?text=Hi%2C%20I%27m%20interested%20in%20your%20medical%20equipment.',
                    iconBg: 'bg-[#25D366]/10',
                    iconColor: 'text-[#25D366]',
                    external: true,
                  },
                  {
                    icon: Mail,
                    title: 'Email',
                    detail: 'tamoor.muhammad1@gmail.com',
                    href: 'mailto:tamoor.muhammad1@gmail.com',
                    iconBg: 'bg-accent-500/10',
                    iconColor: 'text-accent-500',
                  },
                  {
                    icon: Instagram,
                    title: 'Instagram',
                    detail: '@msa_traders',
                    href: 'https://www.instagram.com/msa_traders',
                    iconBg: 'bg-pink-500/10',
                    iconColor: 'text-pink-500',
                    external: true,
                  },
                ].map(({ icon: Icon, title, detail, href, iconBg, iconColor, external }) => (
                  <a
                    key={title}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="bg-white/[0.78] backdrop-blur-lg rounded-[18px] border border-[rgba(30,58,95,0.10)] p-5 group hover:-translate-y-1 transition-all duration-300 flex items-start gap-4"
                  >
                    <div className={`w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0 ${iconBg}`}>
                      <Icon size={20} className={iconColor} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-[#12293f] mb-0.5">{title}</h3>
                      <p className="text-sm text-[#5b7285] group-hover:text-accent-500 transition-colors">{detail}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Location & Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/[0.78] backdrop-blur-lg rounded-[18px] border border-[rgba(30,58,95,0.10)] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={16} className="text-accent-500" />
                    <h3 className="font-semibold text-sm text-[#12293f]">Location</h3>
                  </div>
                  <p className="text-sm text-[#5b7285]">Lahore, Pakistan</p>
                  <p className="font-mono text-[10px] tracking-wider uppercase text-[#5b7285]/60 mt-1">Serving nationwide -- 6+ cities across Pakistan</p>
                </div>
                <div className="bg-white/[0.78] backdrop-blur-lg rounded-[18px] border border-[rgba(30,58,95,0.10)] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={16} className="text-accent-500" />
                    <h3 className="font-semibold text-sm text-[#12293f]">Business Hours</h3>
                  </div>
                  <p className="text-sm text-[#5b7285]">Mon -- Sat: 9:00 AM -- 7:00 PM</p>
                  <p className="font-mono text-[10px] tracking-wider uppercase text-[#5b7285]/60 mt-1">WhatsApp available 24/7</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA Card */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-[#25D366] to-[#1da851] rounded-[18px] p-6 md:p-8 text-white text-center sticky top-32 shadow-xl shadow-[#25D366]/15">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-[16px] flex items-center justify-center mx-auto mb-5 border border-white/10">
                  <MessageCircle size={28} />
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-bold mb-3">
                  Prefer WhatsApp?
                </h3>
                <p className="text-white/80 mb-6 text-sm leading-relaxed">
                  Most of our customers prefer WhatsApp for quick responses.
                  We typically reply within minutes during business hours!
                </p>
                <a
                  href="https://wa.me/923238844661?text=Hi%2C%20I%27m%20interested%20in%20your%20medical%20equipment.%20Please%20share%20details."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-[#25D366] px-6 py-3.5 rounded-[14px] font-bold text-base hover:bg-gray-50 transition-all shadow-lg inline-flex items-center gap-2 w-full justify-center"
                >
                  Start WhatsApp Chat <ArrowRight size={16} />
                </a>
                <p className="font-mono text-[10px] tracking-wider uppercase text-white/50 mt-4">Free consultation -- no obligations</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
