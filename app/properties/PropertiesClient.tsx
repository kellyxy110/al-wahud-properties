'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { formatPrice, type Property } from '@/app/lib/supabase/types';

// ── Constants ────────────────────────────────────────────────────────────────

const TX_TYPES = [
  { label: 'For Sale',  value: 'FOR SALE' },
  { label: 'For Rent',  value: 'FOR RENT' },
  { label: 'For Lease', value: 'SHORT LET' },
];

const PROP_TYPES = [
  { label: '2-Bedroom Flat',  type: 'apartment' },
  { label: 'Mini Flat',       type: 'apartment' },
  { label: 'Duplex',          type: 'duplex' },
  { label: 'Bungalow',        type: 'bungalow' },
  { label: 'Room/Parlour',    type: 'apartment' },
  { label: 'Land/Plot',       type: 'land' },
  { label: 'Warehouse',       type: 'commercial' },
  { label: 'Car Wash',        type: 'commercial' },
  { label: 'Filling Station', type: 'commercial' },
];

const LOCS = ['Ikeja', 'Lekki', 'Victoria Island', 'Ajah', 'Ibadan', 'Abuja'];

const AMENITY_OPTS = ['Swimming Pool', 'Gym', '24/7 Security', 'Parking', 'Generator'];

const SORT_OPTS = [
  { label: 'Newest',           value: 'newest' },
  { label: 'Price: Low–High',  value: 'price_asc' },
  { label: 'Price: High–Low',  value: 'price_desc' },
  { label: 'Most Viewed',      value: 'featured' },
];

const PRICE_MAX = 500_000_000;
const PAGE_SIZE = 24;

function getPaginationPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

function fmtSlider(v: number) {
  if (v >= PRICE_MAX) return '₦500M+';
  if (v >= 1_000_000) return `₦${(v / 1_000_000).toFixed(0)}M`;
  return `₦${(v / 1_000).toFixed(0)}K`;
}

function badge(status: Property['status']) {
  switch (status) {
    case 'FOR SALE':      return { bg: '#0F5E36', color: '#fff' };
    case 'FOR RENT':      return { bg: '#E63946', color: '#fff' };
    case 'SHORT LET':     return { bg: '#2D7A76', color: '#fff' };
    case 'OFF-PLAN':      return { bg: '#FFB703', color: '#111' };
    case 'LAND FOR SALE': return { bg: '#7C3AED', color: '#fff' };
  }
}

// ── Property Card ─────────────────────────────────────────────────────────────

function PropertyCard({ p }: { p: Property }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [saved,  setSaved]  = useState(false);
  const imgs = p.images.length > 0 ? p.images : [''];
  const img  = imgs[imgIdx] ?? '';
  const b    = badge(p.status);

  return (
    <div className="group bg-white rounded-[20px] overflow-hidden transition-transform duration-300 hover:-translate-y-1.5"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>

      {/* ── Image ── */}
      <div className="relative w-full h-[210px]"
        style={{ background: p.gradient, backgroundImage: img ? `url(${img})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}>

        {/* Prev / Next */}
        {imgs.length > 1 && (
          <>
            <button onClick={e => { e.preventDefault(); setImgIdx(i => (i - 1 + imgs.length) % imgs.length); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(0,0,0,0.45)', border: 'none', cursor: 'pointer' }}>‹</button>
            <button onClick={e => { e.preventDefault(); setImgIdx(i => (i + 1) % imgs.length); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(0,0,0,0.45)', border: 'none', cursor: 'pointer' }}>›</button>
          </>
        )}

        {/* Badges row */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ fontFamily: 'var(--font-poppins)', background: b.bg, color: b.color }}>
            {p.status}
          </span>
          <div className="flex gap-1.5 items-center">
            {p.tiktok_id && (
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                style={{ background: 'rgba(0,0,0,0.55)' }}>🎥</span>
            )}
            <button onClick={e => { e.preventDefault(); e.stopPropagation(); setSaved(s => !s); }}
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.92)', border: 'none', cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 24 24"
                fill={saved ? '#E63946' : 'none'} stroke="#E63946" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Dot indicators */}
        {imgs.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {imgs.map((_, j) => (
              <button key={j} onClick={e => { e.preventDefault(); setImgIdx(j); }}
                style={{ width: j === imgIdx ? 16 : 6, height: 6, borderRadius: 99,
                  background: j === imgIdx ? '#fff' : 'rgba(255,255,255,0.5)',
                  border: 'none', cursor: 'pointer', transition: 'width 0.2s' }} />
            ))}
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="p-4">
        <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 18, color: 'var(--dark)' }}>
          {formatPrice(p.price, p.price_period)}
        </div>
        <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 13, color: 'var(--dark-text)', margin: '4px 0 6px' }}>
          {p.title}
        </div>
        <div className="flex items-center gap-1 mb-2.5" style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'var(--gray)' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#E63946"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/></svg>
          {p.location}
        </div>
        <div className="flex gap-2 flex-wrap mb-2">
          {p.bedrooms  > 0 && <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600" style={{ fontFamily: 'var(--font-inter)' }}>🛏️ {p.bedrooms}</span>}
          {p.bathrooms > 0 && <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600" style={{ fontFamily: 'var(--font-inter)' }}>🛁 {p.bathrooms}</span>}
          {p.sqm       > 0 && <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600" style={{ fontFamily: 'var(--font-inter)' }}>📐 {p.sqm}sqm</span>}
        </div>
        {p.featured && (
          <div className="mb-3">
            <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,183,3,0.15)', color: '#92400E', fontFamily: 'var(--font-inter)' }}>⭐ Featured</span>
          </div>
        )}
        <Link href={`/properties/${p.id}`}
          className="flex items-center justify-center w-full py-2.5 rounded-full font-bold text-[12px] text-white transition-opacity hover:opacity-90"
          style={{ fontFamily: 'var(--font-poppins)', background: 'var(--primary)', textDecoration: 'none' }}>
          View Details →
        </Link>
      </div>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

interface SidebarProps {
  search: string; setSearch: (v: string) => void;
  txTypes: Set<string>; toggleTx: (v: string) => void;
  propTypeLabels: Set<string>; togglePropType: (v: string) => void;
  maxPrice: number; setMaxPrice: (v: number) => void;
  selLocs: Set<string>; toggleLoc: (v: string) => void;
  selBeds: Set<number>; toggleBed: (v: number) => void;
  selAmenities: Set<string>; toggleAmenity: (v: string) => void;
  onApply: () => void; onReset: () => void;
}

function Sidebar(props: SidebarProps) {
  const { search, setSearch, txTypes, toggleTx, propTypeLabels, togglePropType,
          maxPrice, setMaxPrice, selLocs, toggleLoc, selBeds, toggleBed,
          selAmenities, toggleAmenity, onApply, onReset } = props;

  const label14: React.CSSProperties = { fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: '#111827', marginBottom: 12, display: 'block' };
  const sect: React.CSSProperties = { marginBottom: 24 };

  return (
    <div style={{ background: '#fff', borderRadius: 20, padding: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.07)', position: 'sticky', top: 90 }}>

      {/* Search */}
      <div style={sect}>
        <span style={label14}>Search</span>
        <div style={{ position: 'relative' }}>
          <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input type="text" placeholder="Search by location…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: 30, paddingRight: 12, paddingTop: 9, paddingBottom: 9, borderRadius: 99, border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-inter)', fontSize: 12, outline: 'none', boxSizing: 'border-box' }} />
        </div>
      </div>

      {/* Transaction Type */}
      <div style={sect}>
        <span style={label14}>Transaction Type</span>
        {TX_TYPES.map(t => (
          <label key={t.value} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151' }}>
            <input type="checkbox" checked={txTypes.has(t.value)} onChange={() => toggleTx(t.value)}
              style={{ accentColor: 'var(--primary)', width: 15, height: 15, cursor: 'pointer' }} />
            {t.label}
          </label>
        ))}
      </div>

      {/* Property Type */}
      <div style={sect}>
        <span style={label14}>Property Type</span>
        {PROP_TYPES.map(pt => (
          <label key={pt.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151' }}>
            <input type="checkbox" checked={propTypeLabels.has(pt.label)} onChange={() => togglePropType(pt.label)}
              style={{ accentColor: 'var(--primary)', width: 15, height: 15, cursor: 'pointer' }} />
            {pt.label}
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div style={sect}>
        <span style={label14}>Price Range</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-inter)', fontSize: 11, color: 'var(--gray)', marginBottom: 8 }}>
          <span>₦0</span>
          <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{fmtSlider(maxPrice)}</span>
        </div>
        <input type="range" min={0} max={PRICE_MAX} step={5_000_000} value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }} />
      </div>

      {/* Location */}
      <div style={sect}>
        <span style={label14}>Location</span>
        {LOCS.map(loc => (
          <label key={loc} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151' }}>
            <input type="checkbox" checked={selLocs.has(loc)} onChange={() => toggleLoc(loc)}
              style={{ accentColor: 'var(--primary)', width: 15, height: 15, cursor: 'pointer' }} />
            {loc}
          </label>
        ))}
      </div>

      {/* Bedrooms */}
      <div style={sect}>
        <span style={label14}>Bedrooms</span>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} onClick={() => toggleBed(n)}
              style={{ width: 36, height: 36, borderRadius: 10, border: `1.5px solid ${selBeds.has(n) ? 'var(--primary)' : '#E5E7EB'}`,
                background: selBeds.has(n) ? 'var(--primary)' : '#fff',
                color: selBeds.has(n) ? '#fff' : '#374151',
                fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
              {n === 5 ? '5+' : n}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div style={sect}>
        <span style={label14}>Amenities</span>
        {AMENITY_OPTS.map(am => (
          <label key={am} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151' }}>
            <input type="checkbox" checked={selAmenities.has(am)} onChange={() => toggleAmenity(am)}
              style={{ accentColor: 'var(--primary)', width: 15, height: 15, cursor: 'pointer' }} />
            {am}
          </label>
        ))}
      </div>

      {/* Buttons */}
      <button onClick={onApply}
        style={{ width: '100%', padding: '11px 0', borderRadius: 12, background: 'linear-gradient(135deg,var(--primary),var(--dark))', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', marginBottom: 8 }}>
        Apply Filters
      </button>
      <button onClick={onReset}
        style={{ width: '100%', padding: '9px 0', borderRadius: 12, border: '1.5px solid #E5E7EB', background: 'none', fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: 'var(--gray)', cursor: 'pointer' }}>
        Reset
      </button>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function PropertiesClient({ initialProperties }: { initialProperties: Property[] }) {
  // Filter state
  const [search,         setSearch]         = useState('');
  const [txTypes,        setTxTypes]        = useState<Set<string>>(new Set());
  const [propTypeLabels, setPropTypeLabels] = useState<Set<string>>(new Set());
  const [maxPrice,       setMaxPrice]       = useState(PRICE_MAX);
  const [selLocs,        setSelLocs]        = useState<Set<string>>(new Set());
  const [selBeds,        setSelBeds]        = useState<Set<number>>(new Set());
  const [selAmenities,   setSelAmenities]   = useState<Set<string>>(new Set());
  const [sort,           setSort]           = useState('newest');
  const [page,           setPage]           = useState(1);
  const [showMobFilters, setShowMobFilters] = useState(false);

  function toggle<T>(set: Set<T>, val: T): Set<T> {
    const next = new Set(set);
    next.has(val) ? next.delete(val) : next.add(val);
    return next;
  }

  function resetAll() {
    setSearch(''); setTxTypes(new Set()); setPropTypeLabels(new Set());
    setMaxPrice(PRICE_MAX); setSelLocs(new Set()); setSelBeds(new Set());
    setSelAmenities(new Set()); setPage(1);
  }

  // Filtering + sorting
  const filtered = useMemo(() => {
    let r = [...initialProperties];

    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(p => p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q));
    }
    if (txTypes.size > 0) r = r.filter(p => txTypes.has(p.status));
    if (propTypeLabels.size > 0) {
      const types = new Set(
        PROP_TYPES.filter(pt => propTypeLabels.has(pt.label)).map(pt => pt.type)
      );
      r = r.filter(p => types.has(p.property_type));
    }
    if (maxPrice < PRICE_MAX) r = r.filter(p => p.price <= maxPrice);
    if (selLocs.size > 0) {
      r = r.filter(p => Array.from(selLocs).some(loc => p.location.toLowerCase().includes(loc.toLowerCase())));
    }
    if (selBeds.size > 0) {
      r = r.filter(p => selBeds.has(5) && p.bedrooms >= 5 ? true : selBeds.has(p.bedrooms));
    }
    if (selAmenities.size > 0) {
      r = r.filter(p => Array.from(selAmenities).every(am =>
        p.amenities.some(a => a.l.toLowerCase().includes(am.toLowerCase()))
      ));
    }

    switch (sort) {
      case 'price_asc':  r.sort((a, b) => a.price - b.price); break;
      case 'price_desc': r.sort((a, b) => b.price - a.price); break;
      case 'featured':   r.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
      default: r.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    return r;
  }, [initialProperties, search, txTypes, propTypeLabels, maxPrice, selLocs, selBeds, selAmenities, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const sidebarProps = {
    search, setSearch,
    txTypes, toggleTx: (v: string) => { setTxTypes(s => toggle(s, v)); setPage(1); },
    propTypeLabels, togglePropType: (v: string) => { setPropTypeLabels(s => toggle(s, v)); setPage(1); },
    maxPrice, setMaxPrice: (v: number) => { setMaxPrice(v); setPage(1); },
    selLocs, toggleLoc: (v: string) => { setSelLocs(s => toggle(s, v)); setPage(1); },
    selBeds, toggleBed: (v: number) => { setSelBeds(s => toggle(s, v)); setPage(1); },
    selAmenities, toggleAmenity: (v: string) => { setSelAmenities(s => toggle(s, v)); setPage(1); },
    onApply: () => setShowMobFilters(false),
    onReset: resetAll,
  };

  return (
    <>
      {/* ── Page Header ── */}
      <div className="prop-page-banner">
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Link href="/" style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>›</span>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#fff', fontWeight: 600 }}>Properties</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 44, color: '#fff', marginBottom: 10 }}>All Properties</h1>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(255,255,255,0.85)', maxWidth: 520, lineHeight: 1.7 }}>
            Browse verified luxury and premium properties across Lagos, Abuja and Port Harcourt. Every listing is inspected and title-checked before it reaches you.
          </p>
        </div>
      </div>

      {/* ── Mobile filter toggle ── */}
      <div className="lg:hidden sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between"
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'var(--gray)' }}>
          {filtered.length} propert{filtered.length === 1 ? 'y' : 'ies'}
        </span>
        <button onClick={() => setShowMobFilters(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-[13px]"
          style={{ fontFamily: 'var(--font-poppins)', background: 'var(--primary)', color: '#fff', border: 'none', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
          </svg>
          Filters
        </button>
      </div>

      {/* ── Main layout ── */}
      <div className="max-w-7xl mx-auto px-4 lg:px-16 py-8">
        <div className="flex gap-8 items-start">

          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block flex-shrink-0" style={{ width: 260 }}>
            <Sidebar {...sidebarProps} />
          </aside>

          {/* ── Content ── */}
          <div className="flex-1 min-w-0">

            {/* Sort bar */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: 12, color: 'var(--gray)' }}>Sort By:</span>
                {SORT_OPTS.map(s => (
                  <button key={s.value} onClick={() => { setSort(s.value); setPage(1); }}
                    style={{
                      padding: '7px 14px', borderRadius: 10,
                      background: sort === s.value ? 'var(--primary)' : '#fff',
                      color: sort === s.value ? '#fff' : '#374151',
                      border: sort === s.value ? 'none' : '1.5px solid #E5E7EB',
                      fontFamily: 'var(--font-poppins)', fontWeight: 500, fontSize: 12,
                      cursor: 'pointer',
                    }}>
                    {s.label}
                  </button>
                ))}
              </div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'var(--gray)' }}>
                {filtered.length === 0
                  ? 'No properties match your filters'
                  : <>Results: <strong style={{ color: 'var(--primary)' }}>Showing {paginated.length} of {filtered.length} properties</strong></>}
              </div>
            </div>

            {/* Grid */}
            {paginated.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {paginated.map(p => <PropertyCard key={p.id} p={p} />)}
              </div>
            ) : (
              <div className="text-center py-24" style={{ color: 'var(--gray)', fontFamily: 'var(--font-inter)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, color: 'var(--dark-text)' }}>No results found</p>
                <p style={{ fontSize: 14 }}>Try adjusting your filters or{' '}
                  <button onClick={resetAll} style={{ color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>clear all</button>.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex gap-2 mt-8 flex-wrap items-center">
                {getPaginationPages(page, totalPages).map((n, i) =>
                  n === '...' ? (
                    <span key={`dots-${i}`} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-poppins)', fontSize: 13, color: 'var(--gray)' }}>…</span>
                  ) : (
                    <button key={n} onClick={() => { setPage(n as number); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      style={{
                        width: 40, height: 40, borderRadius: 10,
                        border: n === page ? 'none' : '1.5px solid #E5E7EB',
                        background: n === page ? 'var(--primary)' : '#fff',
                        color: n === page ? '#fff' : '#374151',
                        fontFamily: 'var(--font-poppins)', fontSize: 13, fontWeight: 600,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                      {n}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile filter drawer ── */}
      {showMobFilters && (
        <div className="fixed inset-0 z-[800]" aria-modal="true">
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setShowMobFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl overflow-y-auto" style={{ maxHeight: '90dvh' }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 16, color: 'var(--dark-text)' }}>Filters</span>
              <button onClick={() => setShowMobFilters(false)}
                style={{ width: 32, height: 32, borderRadius: '50%', background: '#F3F4F6', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="px-5 py-5">
              <Sidebar {...sidebarProps} />
              <button onClick={() => setShowMobFilters(false)}
                style={{ width: '100%', marginTop: 12, padding: '12px 0', borderRadius: 99, background: 'var(--primary)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
