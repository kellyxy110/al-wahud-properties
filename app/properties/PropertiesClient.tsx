'use client';

import { useState, useMemo, useCallback } from 'react';
import { formatPrice, type Property } from '@/app/lib/supabase/types';
import BottomSheet from '@/app/components/BottomSheet';
import PropertyDetail from '@/app/components/PropertyDetail';

const STATUS_OPTIONS = ['All', 'FOR SALE', 'FOR RENT', 'SHORT LET', 'OFF-PLAN', 'LAND FOR SALE'] as const;
const TYPE_OPTIONS   = ['All', 'duplex', 'apartment', 'penthouse', 'land', 'bungalow', 'terrace', 'commercial'] as const;
const LOCATION_OPTIONS = ['All', 'lagos', 'abuja', 'port-harcourt'] as const;
const LOCATION_LABELS: Record<string, string> = {
  lagos: 'Lagos', abuja: 'Abuja', 'port-harcourt': 'Port Harcourt',
};

function badgeStyle(status: Property['status']): { bg: string; color: string } {
  switch (status) {
    case 'FOR SALE':      return { bg: '#0F5E36', color: '#fff' };
    case 'FOR RENT':      return { bg: '#E63946', color: '#fff' };
    case 'SHORT LET':     return { bg: '#2D7A76', color: '#fff' };
    case 'OFF-PLAN':      return { bg: '#FFB703', color: '#111' };
    case 'LAND FOR SALE': return { bg: '#7C3AED', color: '#fff' };
  }
}

interface CardProps {
  p: Property;
  onClick: (p: Property) => void;
}

function PropertyCard({ p, onClick }: CardProps) {
  const badge = badgeStyle(p.status);
  const img   = p.images[0] ?? '';

  return (
    <button
      className="block w-full text-left group"
      onClick={() => onClick(p)}
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
    >
      <div
        className="bg-white rounded-[20px] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1.5"
        style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}
      >
        {/* Image */}
        <div
          className="relative w-full h-[210px]"
          style={{
            backgroundImage: img ? `url(${img}), ${p.gradient}` : p.gradient,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
            <span
              className="text-[10px] font-bold px-2.5 py-1 rounded-full"
              style={{ fontFamily: 'var(--font-poppins)', background: badge.bg, color: badge.color }}
            >
              {p.status}
            </span>
            {p.featured && (
              <span
                className="text-[9px] font-extrabold px-2.5 py-1 rounded-full"
                style={{ fontFamily: 'var(--font-poppins)', background: 'rgba(255,183,3,0.95)', color: '#111' }}
              >
                ⭐ FEATURED
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 17, color: 'var(--dark)' }}>
            {formatPrice(p.price, p.price_period)}
          </div>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 13, color: 'var(--dark-text)', margin: '4px 0 6px' }}>
            {p.title}
          </div>
          <div className="flex items-center gap-1" style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'var(--gray)' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#E63946"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /></svg>
            {p.location}
          </div>
          <div className="flex gap-1.5 mt-2.5 flex-wrap">
            {p.bedrooms  > 0 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700" style={{ fontFamily: 'var(--font-inter)' }}>🛏 {p.bedrooms} Beds</span>}
            {p.bathrooms > 0 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700" style={{ fontFamily: 'var(--font-inter)' }}>🚿 {p.bathrooms} Baths</span>}
            {p.sqm       > 0 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700" style={{ fontFamily: 'var(--font-inter)' }}>📐 {p.sqm} sqm</span>}
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700" style={{ fontFamily: 'var(--font-inter)' }}>✅ Verified</span>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#FFB703,#E63946)' }}>AW</div>
              <div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, color: '#374151' }}>Al-Wajud Team</div>
                <div style={{ color: 'var(--gold)', fontSize: 10 }}>★★★★★</div>
              </div>
            </div>
            <span
              className="text-[10px] font-bold text-white px-3.5 py-1.5 rounded-full"
              style={{ fontFamily: 'var(--font-poppins)', background: 'var(--primary)' }}
            >
              View →
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

interface Props {
  initialProperties: Property[];
}

export default function PropertiesClient({ initialProperties }: Props) {
  const [search,   setSearch]   = useState('');
  const [status,   setStatus]   = useState<string>('All');
  const [type,     setType]     = useState<string>('All');
  const [location, setLocation] = useState<string>('All');
  const [selected, setSelected] = useState<Property | null>(null);

  const filtered = useMemo(() => initialProperties.filter(p => {
    if (status   !== 'All' && p.status        !== status)   return false;
    if (type     !== 'All' && p.property_type !== type)     return false;
    if (location !== 'All' && p.location_key  !== location) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!p.title.toLowerCase().includes(q) && !p.location.toLowerCase().includes(q)) return false;
    }
    return true;
  }), [initialProperties, search, status, type, location]);

  function clearFilters() {
    setSearch(''); setStatus('All'); setType('All'); setLocation('All');
  }

  const openSheet  = useCallback((p: Property) => setSelected(p), []);
  const closeSheet = useCallback(() => setSelected(null), []);

  const hasFilters = search || status !== 'All' || type !== 'All' || location !== 'All';

  return (
    <>
      <div>
        {/* ── Page Header ── */}
        <div className="py-16 px-4 lg:px-16 text-center"
          style={{ background: 'linear-gradient(135deg,var(--dark) 0%,var(--teal) 100%)' }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 10 }}>
            Our Portfolio
          </div>
          <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 'clamp(28px,5vw,44px)', color: '#fff', lineHeight: 1.15, marginBottom: 12 }}>
            Browse All <span style={{ color: 'var(--gold)' }}>Properties</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(255,255,255,0.75)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Verified listings across Lagos, Abuja and Port Harcourt. Every property title-checked by our team.
          </p>
        </div>

        {/* ── Filters ── */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-100" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div className="max-w-7xl mx-auto px-4 lg:px-16 py-4 flex flex-col sm:flex-row gap-3 flex-wrap items-center">
            <div className="relative flex-1 min-w-[200px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input type="text" placeholder="Search title or location…" value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-4 py-2 rounded-full border border-gray-200 text-[13px] outline-none focus:border-[var(--primary)] transition-colors"
                style={{ fontFamily: 'var(--font-inter)' }} />
            </div>
            <select value={status} onChange={e => setStatus(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-200 text-[13px] outline-none focus:border-[var(--primary)] bg-white transition-colors cursor-pointer"
              style={{ fontFamily: 'var(--font-inter)' }}>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s === 'All' ? 'All Status' : s}</option>)}
            </select>
            <select value={type} onChange={e => setType(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-200 text-[13px] outline-none focus:border-[var(--primary)] bg-white transition-colors cursor-pointer"
              style={{ fontFamily: 'var(--font-inter)' }}>
              {TYPE_OPTIONS.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
            <select value={location} onChange={e => setLocation(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-200 text-[13px] outline-none focus:border-[var(--primary)] bg-white transition-colors cursor-pointer"
              style={{ fontFamily: 'var(--font-inter)' }}>
              {LOCATION_OPTIONS.map(l => <option key={l} value={l}>{l === 'All' ? 'All Locations' : LOCATION_LABELS[l]}</option>)}
            </select>
            {hasFilters && (
              <button onClick={clearFilters}
                className="px-4 py-2 rounded-full text-[13px] font-semibold transition-opacity hover:opacity-80"
                style={{ fontFamily: 'var(--font-poppins)', background: '#FEE2E2', color: '#E63946' }}>
                Clear ✕
              </button>
            )}
          </div>
        </div>

        {/* ── Results ── */}
        <div className="max-w-7xl mx-auto px-4 lg:px-16 py-10">
          <div className="mb-6" style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'var(--gray)' }}>
            {filtered.length === 0
              ? 'No properties match your filters'
              : `Showing ${filtered.length} propert${filtered.length === 1 ? 'y' : 'ies'}`}
            {hasFilters && ' (filtered)'}
          </div>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(p => <PropertyCard key={p.id} p={p} onClick={openSheet} />)}
            </div>
          ) : (
            <div className="text-center py-24" style={{ color: 'var(--gray)', fontFamily: 'var(--font-inter)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, color: 'var(--dark-text)' }}>No results found</p>
              <p style={{ fontSize: 14 }}>Try adjusting your filters or{' '}
                <button onClick={clearFilters} style={{ color: 'var(--primary)', fontWeight: 600 }}>clear all</button>
                {' '}to see all listings.</p>
            </div>
          )}
        </div>

        {/* ── WhatsApp CTA ── */}
        <div className="py-14 px-4 text-center" style={{ background: 'linear-gradient(135deg,var(--primary),var(--dark))' }}>
          <p style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 'clamp(18px,3vw,24px)', color: '#fff', marginBottom: 12 }}>
            Can&apos;t find what you&apos;re looking for?
          </p>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 24 }}>
            Tell us your budget and requirements. We&apos;ll find the right match for you.
          </p>
          <a href="https://wa.me/2347035374592?text=Hello!%20I%20need%20help%20finding%20a%20property."
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold text-[15px] px-8 py-3.5 rounded-full transition-transform hover:-translate-y-0.5"
            style={{ fontFamily: 'var(--font-poppins)', background: '#25D366', color: '#fff', boxShadow: '0 6px 20px rgba(37,211,102,0.4)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat with Us on WhatsApp
          </a>
        </div>
      </div>

      {/* ── Bottom Sheet ── */}
      <BottomSheet open={selected !== null} onClose={closeSheet}>
        {selected && <PropertyDetail property={selected} onClose={closeSheet} />}
      </BottomSheet>
    </>
  );
}
