import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  slug: string;
  description: string;
}

const CATEGORY_CODES: Record<string, string> = {
  ultrasound: 'US',
  anesthesia: 'AN',
  'ot-lights': 'OT',
  'c-arms': 'CA',
  'patient-monitors': 'PM',
  ventilators: 'VT',
  ecg: 'EC',
  'surgical-tables': 'ST',
  defibrillators: 'DF',
  sterilizers: 'SZ',
  'x-ray': 'XR',
  other: '++',
};

export default function CategoryCard({ name, slug, description }: CategoryCardProps) {
  return (
    <Link
      href={`/products?category=${slug}`}
      className="group text-left flex flex-col gap-3 p-5 rounded-[18px] bg-white/[0.72] backdrop-blur-lg border border-[rgba(30,58,95,0.10)] shadow-[0_2px_10px_rgba(30,58,95,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_38px_rgba(30,58,95,0.14)] hover:border-[rgba(13,148,136,0.42)]"
    >
      <span className="w-11 h-11 rounded-[13px] bg-accent-500/10 grid place-items-center font-mono text-[15px] font-medium text-accent-500">
        {CATEGORY_CODES[slug] || '++'}
      </span>
      <span className="text-[16px] font-semibold text-[#12293f]">{name}</span>
      <span className="text-[13.5px] leading-relaxed text-[#5b7285]">{description}</span>
    </Link>
  );
}
