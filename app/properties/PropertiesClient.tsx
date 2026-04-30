'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { formatPrice, type Property } from '@/app/lib/supabase/types';

// ── Constants ────────────────────────────────────────────────────────────────

const TX_TYPES = [
  { label: 'For Sale',  value: 'FOR SALE' },
  { label: 'For Rent',  value: 'FOR RENT' },
  { label: 'Short Let', value: 'SHORT LET' },
  { label: 'Off-Plan',  value: 'OFF-PLAN' },
];

const PROP_TYPES = [
  { label: 'Apartment / Flat', ptype: 'apartment' as string | null, smatch: null as string | null },
  { label: 'Duplex / House',   ptype: 'duplex',    smatch: null },
  { label: 'Land / Plot',      ptype: 'land',      smatch: null },
  { label: 'Short Let',        ptype: null,        smatch: 'SHORT LET' },
];

const LOCS = ['Lagos', 'Abuja', 'Port Harcourt'];

const AMENITY_OPTS = ['Swimming Pool', 'Gym', '24/7 Security', 'Parking', 'Generator'];

const SORT_OPTS = [
  { label: 'Newest',  value: 'newest' },
  { label: 'Price ↑', value: 'price_asc' },
  { label: 'Price ↓', value: 'price_desc' },
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
  if (v >= PRICE_MAX) return 'Any';
  if (v >= 1_000_000) return `₦${(v / 1_000_000).toFixed(0)}M`;
  return `₦${(v / 1_000).toFixed(0)}K`;
}

function badge(status: Property['status']): { bg: string; color: string } {
  switch (status) {
    case 'FOR SALE':      return { bg: '#0F5E36', color: '#fff' };
    case 'FOR RENT':      return { bg: '#E63946', color: '#fff' };
    case 'SHORT LET':     return { bg: '#2D7A76', color: '#fff' };
    case 'OFF-PLAN':      return { bg: '#FFB703', color: '#111' };
    case 'LAND FOR SALE': return { bg: '#7C3AED', color: '#fff' };
    default:              return { bg: '#374151', color: '#fff' };
  }
}

// TikTok SVG path
const TikTokPath = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.54V6.78a4.84 4.84 0 01-1.07-.09z"/>
  </svg>
);

// ── Property Card ─────────────────────────────────────────────────────────────

function PropertyCard({ p }: { p: Property }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [saved,  setSaved]  = useState(false);
  const imgs = p.images.length > 0 ? p.images : [''];
  const img  = imgs[imgIdx] ?? '';
  const b    = badge(p.status);

  const tiktokHref = p.tiktok_id
    ? `https://www.tiktok.com/@alwajudproperties/video/${p.tiktok_id}`
    : 'https://www.tiktok.com/@alwajudproperties';

  return (
    <div className="prop-card">
      {/* ── Image ── */}
      <div className="prop-img"
        style={{
          background: p.gradient,
          backgroundImage: img ? `url(${img})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>

        {/* Prev / Next */}
        {imgs.length > 1 && (
          <>
            <button onClick={e => { e.preventDefault(); setImgIdx(i => (i - 1 + imgs.length) % imgs.length); }}
              style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', width: 28, height: 28, borderRadius: '50%', background: 'rgba(0,0,0,0.45)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 700, opacity: 0, transition: 'opacity 0.2s' }}
              className="card-nav-prev">‹</button>
            <button onClick={e => { e.preventDefault(); setImgIdx(i => (i + 1) % imgs.length); }}
              style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', width: 28, height: 28, borderRadius: '50%', background: 'rgba(0,0,0,0.45)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 700, opacity: 0, transition: 'opacity 0.2s' }}
              className="card-nav-next">›</button>
          </>
        )}

        {/* Badge row */}
        <div className="prop-badge-wrap">
          <span className="prop-badge" style={{ background: b.bg, color: b.color }}>
            {p.status}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {p.tiktok_id && (
              <a href={tiktokHref} target="_blank" rel="noopener"
                onClick={e => e.stopPropagation()}
                style={{ width: 28, height: 28, background: 'rgba(0,0,0,.65)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TikTokPath />
              </a>
            )}
            <button onClick={e => { e.preventDefault(); e.stopPropagation(); setSaved(s => !s); }}
              className="prop-fav" style={{ fontSize: 13 }}>
              {saved ? '♥' : '♡'}
            </button>
          </div>
        </div>

        {/* Featured badge — centered in image */}
        {p.featured && (
          <span style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            background: 'rgba(255,183,3,.95)', color: '#111',
            fontFamily: 'var(--font-poppins)', fontSize: 9, fontWeight: 800,
            padding: '3px 10px', borderRadius: 99, letterSpacing: 1,
            whiteSpace: 'nowrap',
          }}>⭐ FEATURED</span>
        )}

        {/* Dot indicators */}
        {imgs.length > 1 && (
          <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5 }}>
            {imgs.map((_, j) => (
              <button key={j} onClick={e => { e.preventDefault(); setImgIdx(j); }}
                style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: j === imgIdx ? '#fff' : 'rgba(255,255,255,0.5)',
                  border: 'none', cursor: 'pointer', padding: 0,
                }} />
            ))}
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="prop-body">
        <div className="prop-price">{formatPrice(p.price, p.price_period)}</div>
        <div className="prop-title">{p.title}</div>
        <div className="prop-loc">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#E63946">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
          </svg>
          {p.location}
        </div>
        <div className="prop-specs">
          {p.bedrooms  > 0 && <span className="spec-chip">🛏 {p.bedrooms} Bed{p.bedrooms !== 1 ? 's' : ''}</span>}
          {p.bathrooms > 0 && <span className="spec-chip">🚿 {p.bathrooms} Bath{p.bathrooms !== 1 ? 's' : ''}</span>}
          {p.sqm       > 0 && <span className="spec-chip">📐 {p.sqm} sqm</span>}
        </div>
        <div className="prop-footer">
          <div className="agent-mini">
            <div className="agent-av">AW</div>
            <div>
              <div className="agent-nm">Al-Wajud Team</div>
              <div className="stars">★★★★★ 5.0</div>
            </div>
          </div>
          <Link href={`/properties/${p.id}`} className="view-btn" onClick={e => e.stopPropagation()}>
            View Details
          </Link>
        </div>
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

  const sidebarStyle: React.CSSProperties = {
    background: '#fff',
    borderRadius: 20,
    boxShadow: '0 4px 24px rgba(0,0,0,.07)',
    padding: 24,
    position: 'sticky',
    top: 70,
    maxHeight: 'calc(100vh - 90px)',
    overflowY: 'auto',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: 24,
    paddingBottom: 20,
    borderBottom: '1px solid #F3F4F6',
  };

  const lastSectionStyle: React.CSSProperties = {
    marginBottom: 0,
    paddingBottom: 0,
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-poppins)',
    fontWeight: 700,
    fontSize: 13,
    color: 'var(--dark-text)',
    marginBottom: 12,
  };

  const checkItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: 'var(--font-inter)',
    fontSize: 12,
    color: '#374151',
    cursor: 'pointer',
  };

  return (
    <div style={sidebarStyle}>

      {/* Search */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Search</div>
        <input
          type="text"
          className="sidebar-search"
          placeholder="🔍 Search by location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Transaction Type */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Transaction Type</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TX_TYPES.map(t => (
            <label key={t.value} style={checkItemStyle}>
              <input type="checkbox" checked={txTypes.has(t.value)} onChange={() => toggleTx(t.value)}
                style={{ accentColor: 'var(--primary)', width: 14, height: 14, flexShrink: 0, cursor: 'pointer' }} />
              {t.label}
            </label>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Property Type</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {PROP_TYPES.map(pt => (
            <label key={pt.label} style={checkItemStyle}>
              <input type="checkbox" checked={propTypeLabels.has(pt.label)} onChange={() => togglePropType(pt.label)}
                style={{ accentColor: 'var(--primary)', width: 14, height: 14, flexShrink: 0, cursor: 'pointer' }} />
              {pt.label}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Price Range</div>
        <div style={{ padding: '0 4px' }}>
          <input type="range" min={0} max={PRICE_MAX} step={5_000_000} value={maxPrice}
            onChange={e => setMaxPrice(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)', margin: '10px 0 6px', cursor: 'pointer' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-inter)', fontSize: 11, color: 'var(--gray)' }}>
            <span>₦0</span>
            <span>{fmtSlider(maxPrice)}</span>
          </div>
        </div>
      </div>

      {/* Location */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Location</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {LOCS.map(loc => (
            <label key={loc} style={checkItemStyle}>
              <input type="checkbox" checked={selLocs.has(loc)} onChange={() => toggleLoc(loc)}
                style={{ accentColor: 'var(--primary)', width: 14, height: 14, flexShrink: 0, cursor: 'pointer' }} />
              {loc}
            </label>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Bedrooms</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} onClick={() => toggleBed(n)}
              style={{
                padding: '5px 11px', borderRadius: 8,
                border: `1.5px solid ${selBeds.has(n) ? 'var(--primary)' : '#E5E7EB'}`,
                background: selBeds.has(n) ? 'var(--primary)' : '#fff',
                color: selBeds.has(n) ? '#fff' : '#374151',
                fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: 12,
                cursor: 'pointer', transition: 'all .2s',
              }}>
              {n === 5 ? '5+' : n}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Amenities</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {AMENITY_OPTS.map(am => (
            <label key={am} style={checkItemStyle}>
              <input type="checkbox" checked={selAmenities.has(am)} onChange={() => toggleAmenity(am)}
                style={{ accentColor: 'var(--primary)', width: 14, height: 14, flexShrink: 0, cursor: 'pointer' }} />
              {am}
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div style={lastSectionStyle}>
        <button onClick={onApply} className="sidebar-apply">Apply Filters</button>
        <button onClick={onReset} className="sidebar-reset">Reset All</button>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function PropertiesClient({ initialProperties }: { initialProperties: Property[] }) {
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

  const filtered = useMemo(() => {
    let r = [...initialProperties];

    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(p => p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q));
    }
    if (txTypes.size > 0) r = r.filter(p => txTypes.has(p.status));
    if (propTypeLabels.size > 0) {
      r = r.filter(p => Array.from(propTypeLabels).some(label => {
        const pt = PROP_TYPES.find(t => t.label === label);
        if (!pt) return false;
        if (pt.smatch) return p.status === pt.smatch;
        return p.property_type === pt.ptype;
      }));
    }
    if (maxPrice < PRICE_MAX) r = r.filter(p => p.price <= maxPrice);
    if (selLocs.size > 0) {
      r = r.filter(p => Array.from(selLocs).some(loc =>
        p.location.toLowerCase().includes(loc.toLowerCase())
      ));
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
      default: r.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    return r;
  }, [initialProperties, search, txTypes, propTypeLabels, maxPrice, selLocs, selBeds, selAmenities, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const sidebarProps: SidebarProps = {
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
      {/* ── Page Banner ── */}
      <div className="prop-page-banner">
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Link href="/" style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>›</span>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#fff', fontWeight: 600 }}>Properties</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 44, color: '#fff', marginBottom: 10 }}>
            Our Property Listings
          </h1>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(255,255,255,0.85)', maxWidth: 520, lineHeight: 1.7 }}>
            Browse verified luxury and premium properties across Lagos, Abuja and Port Harcourt. Every listing is inspected and title-checked before it reaches you.
          </p>
        </div>
      </div>

      {/* ── Mobile filter bar ── */}
      <div className="lg:hidden sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between"
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'var(--gray)' }}>
          {filtered.length} propert{filtered.length === 1 ? 'y' : 'ies'}
        </span>
        <button onClick={() => setShowMobFilters(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 99, background: 'var(--primary)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
          </svg>
          Filters
        </button>
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden lg:grid prop-layout">
        {/* Sidebar */}
        <aside>
          <Sidebar {...sidebarProps} />
        </aside>

        {/* Main content */}
        <div className="prop-main">
          {/* Sort bar */}
          <div className="sort-bar">
            <div>
              <div className="eyebrow">Verified Listings</div>
              <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 28, color: 'var(--dark-text)' }}>
                All <span style={{ color: 'var(--primary)' }}>Properties</span>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
              <span className="result-count">
                <strong>{filtered.length}</strong> properties found
              </span>
              <div className="sort-tabs">
                {SORT_OPTS.map(s => (
                  <button key={s.value} onClick={() => { setSort(s.value); setPage(1); }}
                    className={`sort-tab${sort === s.value ? ' active' : ''}`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          {paginated.length > 0 ? (
            <div className="listings-grid">
              {paginated.map(p => <PropertyCard key={p.id} p={p} />)}
            </div>
          ) : (
            <div className="no-results" style={{ display: 'block' }}>
              <p>No Properties Found</p>
              <span>Try adjusting your filters or{' '}
                <button onClick={resetAll} style={{ color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>clear all</button>.
              </span>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', gap: 8, marginTop: 32, flexWrap: 'wrap', alignItems: 'center' }}>
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

      {/* ── Mobile content ── */}
      <div className="lg:hidden px-4 py-6">
        {/* Mobile sort */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {SORT_OPTS.map(s => (
            <button key={s.value} onClick={() => { setSort(s.value); setPage(1); }}
              style={{
                padding: '6px 12px', borderRadius: 10, fontSize: 12,
                fontFamily: 'var(--font-inter)', fontWeight: 500,
                background: sort === s.value ? 'var(--primary)' : '#fff',
                color: sort === s.value ? '#fff' : '#374151',
                border: sort === s.value ? 'none' : '1.5px solid #E5E7EB',
                cursor: 'pointer',
              }}>
              {s.label}
            </button>
          ))}
        </div>

        {paginated.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
            {paginated.map(p => <PropertyCard key={p.id} p={p} />)}
          </div>
        ) : (
          <div className="no-results" style={{ display: 'block' }}>
            <p>No Properties Found</p>
            <span>Try adjusting your filters or{' '}
              <button onClick={resetAll} style={{ color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>clear all</button>.
            </span>
          </div>
        )}

        {totalPages > 1 && (
          <div style={{ display: 'flex', gap: 8, marginTop: 24, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
            {getPaginationPages(page, totalPages).map((n, i) =>
              n === '...' ? (
                <span key={`dots-${i}`} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray)' }}>…</span>
              ) : (
                <button key={n} onClick={() => { setPage(n as number); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{
                    width: 36, height: 36, borderRadius: 8,
                    border: n === page ? 'none' : '1.5px solid #E5E7EB',
                    background: n === page ? 'var(--primary)' : '#fff',
                    color: n === page ? '#fff' : '#374151',
                    fontFamily: 'var(--font-poppins)', fontSize: 12, fontWeight: 600,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                  {n}
                </button>
              )
            )}
          </div>
        )}
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
