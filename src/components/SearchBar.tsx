'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  variant?: 'glass' | 'solid';
  initialQuery?: string;
}

const PHRASES = [
  'Search ultrasound machines…',
  'Search Siemens equipment…',
  'Search C-arms…',
  'Search patient monitors…',
  'Search anesthesia systems…',
  'Search OT lights…',
];

const POPULAR_TAGS = [
  'Ultrasound', 'C-Arm', 'Anesthesia', 'OT Lights', 'Patient Monitor',
  'Ventilator', 'ECG', 'Defibrillator', 'X-Ray', 'Surgical Table',
];

const SUGGESTIONS = [
  { term: 'Ultrasound', aliases: ['ultra', 'sono', 'sonography', 'diagnostic'] },
  { term: 'C-Arm', aliases: ['c arm', 'carm', 'fluoroscopy', 'fluoro'] },
  { term: 'Anesthesia', aliases: ['anaesthesia', 'anest', 'anaest'] },
  { term: 'OT Lights', aliases: ['ot light', 'surgical light', 'operation light', 'led light', 'light'] },
  { term: 'Patient Monitor', aliases: ['monitor', 'vital', 'vitals', 'multi-parameter'] },
  { term: 'Ventilator', aliases: ['vent', 'ventilation', 'icu vent'] },
  { term: 'ECG', aliases: ['ecg machine', 'electrocardiograph', 'ekg'] },
  { term: 'Defibrillator', aliases: ['defib', 'aed', 'defibrillation'] },
  { term: 'X-Ray', aliases: ['xray', 'x ray', 'radiograph', 'digital x-ray'] },
  { term: 'Surgical Table', aliases: ['surgical', 'operation table', 'ot table'] },
  { term: 'Sterilizer', aliases: ['steril', 'autoclave', 'sterilization'] },
  { term: 'Siemens', aliases: ['siemen'] },
  { term: 'Philips', aliases: ['philip'] },
  { term: 'GE', aliases: ['general electric'] },
  { term: 'Mindray', aliases: ['mind'] },
  { term: 'Dräger', aliases: ['drager', 'draeger'] },
  { term: 'Toshiba', aliases: ['toshi'] },
];

export default function SearchBar({ variant = 'solid', initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [focused, setFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => setPhraseIdx((i) => i + 1), 2800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filteredSuggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return SUGGESTIONS.filter(s =>
      s.term.toLowerCase().includes(q) ||
      s.aliases.some(a => a.includes(q))
    ).map(s => s.term).slice(0, 6);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelectSuggestion = (term: string) => {
    setQuery(term);
    setShowDropdown(false);
    router.push(`/products?search=${encodeURIComponent(term)}`);
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
    setShowDropdown(false);
    router.push(`/products?search=${encodeURIComponent(tag)}`);
  };

  const isGlass = variant === 'glass';

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div
          className={`flex items-center gap-3 w-full px-4 h-[58px] rounded-[14px] border backdrop-blur-[14px] transition-all duration-200 ${
            isGlass
              ? focused
                ? 'bg-white/10 border-accent-400/75 shadow-[0_0_0_4px_rgba(13,148,136,0.22),0_18px_40px_rgba(4,18,32,0.35)]'
                : 'bg-white/10 border-white/[0.22] shadow-[0_18px_40px_rgba(4,18,32,0.28)]'
              : focused
                ? 'bg-white border-accent-500/65 shadow-[0_0_0_4px_rgba(13,148,136,0.14),0_10px_26px_rgba(30,58,95,0.10)]'
                : 'bg-white border-[rgba(30,58,95,0.14)] shadow-[0_6px_18px_rgba(30,58,95,0.07)]'
          }`}
        >
          <Search size={19} className={isGlass ? 'text-white/70 shrink-0' : 'text-[#5b7285] shrink-0'} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowDropdown(true); }}
            onFocus={() => { setFocused(true); }}
            onBlur={() => setFocused(false)}
            placeholder={PHRASES[phraseIdx % PHRASES.length]}
            className={`flex-1 min-w-0 bg-transparent border-none outline-none text-[15.5px] tracking-tight ${
              isGlass ? 'text-white placeholder:text-white/50' : 'text-[#12293f] placeholder:text-gray-400'
            }`}
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => { setQuery(''); setShowDropdown(false); }}
              className={`shrink-0 w-[26px] h-[26px] grid place-items-center rounded-full ${
                isGlass ? 'bg-white/[0.16] text-white/70' : 'bg-[rgba(30,58,95,0.08)] text-[#5b7285]'
              }`}
            >
              <X size={13} />
            </button>
          )}
          {query.length === 0 && (
            <div className={`shrink-0 flex items-center gap-1 px-2 py-1.5 rounded-lg border text-[11.5px] font-semibold tracking-wide ${
              isGlass
                ? 'bg-white/[0.08] border-white/[0.22] text-white/70'
                : 'bg-[rgba(30,58,95,0.04)] border-[rgba(30,58,95,0.14)] text-[#5b7285]'
            }`}>
              Ctrl K
            </div>
          )}
        </div>
      </form>

      {/* Dropdown: suggestions or popular tags */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className={`absolute left-0 right-0 top-[calc(100%+6px)] z-50 rounded-[14px] border shadow-xl overflow-hidden ${
            isGlass
              ? 'bg-[#0f2440]/95 backdrop-blur-xl border-white/[0.15]'
              : 'bg-white border-[rgba(30,58,95,0.12)]'
          }`}
        >
          {/* Typed suggestions */}
          {query.trim() && filteredSuggestions.length > 0 && (
            <div className="p-2">
              {filteredSuggestions.map((term) => (
                <button
                  key={term}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelectSuggestion(term)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-left text-sm transition-colors ${
                    isGlass
                      ? 'text-white/90 hover:bg-white/[0.08]'
                      : 'text-[#12293f] hover:bg-accent-50'
                  }`}
                >
                  <Search size={14} className={isGlass ? 'text-accent-300 shrink-0' : 'text-accent-500 shrink-0'} />
                  <span className="font-medium">{term}</span>
                </button>
              ))}
            </div>
          )}

          {/* Popular tags when empty or no matches */}
          {(!query.trim() || (query.trim() && filteredSuggestions.length === 0)) && (
            <div className="p-3">
              <div className={`flex items-center gap-1.5 mb-2.5 px-1 ${isGlass ? 'text-white/50' : 'text-[#5b7285]'}`}>
                <TrendingUp size={12} />
                <span className="text-[11px] font-semibold tracking-wider uppercase">
                  {query.trim() ? 'No matches — try popular searches' : 'Popular searches'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1.5 rounded-lg text-[12.5px] font-semibold transition-colors ${
                      isGlass
                        ? 'bg-white/[0.08] text-white/80 border border-white/[0.12] hover:bg-accent-500/30 hover:text-accent-200 hover:border-accent-400/40'
                        : 'bg-gray-50 text-[#5b7285] border border-[rgba(30,58,95,0.10)] hover:bg-accent-50 hover:text-accent-600 hover:border-accent-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
