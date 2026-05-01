'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { ALL_PROPERTIES, type Property as SP } from '@/app/lib/data';
import { formatPrice, type Property as DBP } from '@/app/lib/supabase/types';

// ── helpers ──────────────────────────────────────────────────────────────────

const TIKTOK_SVG = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.54V6.78a4.84 4.84 0 01-1.07-.09z"/>
  </svg>
);

const PIN_SVG = (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="#E63946">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
  </svg>
);

function statusBg(status: string) {
  switch (status) {
    case 'FOR SALE':      return '#0F5E36';
    case 'FOR RENT':      return '#E63946';
    case 'SHORT LET':     return '#2D7A76';
    case 'OFF-PLAN':      return '#FFB703';
    case 'LAND FOR SALE': return '#7C3AED';
    default:              return '#374151';
  }
}
function statusTxt(status: string) {
  return (status === 'OFF-PLAN') ? '#111' : '#fff';
}

// ── Desktop Static Card ───────────────────────────────────────────────────────

function StaticCard({ p, onOpen }: { p: SP; onOpen: (p: SP) => void }) {
  const [saved, setSaved] = useState(false);
  const bg = statusBg(p.status);
  const tx = statusTxt(p.status);

  return (
    <div className="prop-card" onClick={() => onOpen(p)}>
      <div className="prop-img" style={{ backgroundImage: `url(${p.img}),${p.gradient}`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="prop-badge-wrap">
          <span className="prop-badge" style={{ background: bg, color: tx }}>{p.status}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <a href="https://www.tiktok.com/@alwajudproperties" target="_blank" rel="noopener"
              onClick={e => e.stopPropagation()}
              style={{ width: 28, height: 28, background: 'rgba(0,0,0,.65)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {TIKTOK_SVG}
            </a>
            <button onClick={e => { e.stopPropagation(); setSaved(s => !s); }} className="prop-fav" style={{ fontSize: 13 }}>
              {saved ? '❤️' : '♡'}
            </button>
          </div>
        </div>
        {p.featured && (
          <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(255,183,3,.95)', color: '#111', fontFamily: 'var(--font-poppins)', fontSize: 9, fontWeight: 800, padding: '3px 10px', borderRadius: 99, letterSpacing: 1, whiteSpace: 'nowrap' }}>
            ⭐ FEATURED
          </span>
        )}
        <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5 }}>
          {p.imgs.slice(0, 3).map((_, j) => (
            <span key={j} style={{ width: 6, height: 6, borderRadius: '50%', background: j === 0 ? '#fff' : 'rgba(255,255,255,.5)', display: 'block' }} />
          ))}
        </div>
      </div>
      <div className="prop-body">
        <div className="prop-price">{p.price}{p.period && <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--gray)' }}> {p.period}</span>}</div>
        <div className="prop-title">{p.title}</div>
        <div className="prop-loc">{PIN_SVG}{p.location}</div>
        <div className="prop-specs">
          {p.beds > 0 && <span className="spec-chip">🛏 {p.beds} Bed{p.beds !== 1 ? 's' : ''}</span>}
          {p.baths > 0 && <span className="spec-chip">🚿 {p.baths} Bath{p.baths !== 1 ? 's' : ''}</span>}
          {p.sqm > 0 && <span className="spec-chip">📐 {p.sqm} sqm</span>}
          {(p.extraChips ?? []).map(c => <span key={c} className="spec-chip">{c}</span>)}
        </div>
        <div className="prop-footer">
          <div className="agent-mini">
            <div className="agent-av">AW</div>
            <div>
              <div className="agent-nm">Al-Wajud Team</div>
              <div className="stars">★★★★★ 5.0</div>
            </div>
          </div>
          <button className="view-btn" onClick={e => { e.stopPropagation(); onOpen(p); }}>View Details</button>
        </div>
      </div>
    </div>
  );
}

// ── Desktop Supabase Card ─────────────────────────────────────────────────────

function DBCard({ p }: { p: DBP }) {
  const [saved, setSaved] = useState(false);
  const bg = statusBg(p.status);
  const tx = statusTxt(p.status);
  const img = p.images[0] ?? '';

  return (
    <Link href={`/properties/${p.id}`} className="prop-card" style={{ display: 'block', textDecoration: 'none' }}>
      <div className="prop-img" style={{ backgroundImage: img ? `url(${img}),${p.gradient}` : p.gradient, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="prop-badge-wrap">
          <span className="prop-badge" style={{ background: bg, color: tx }}>{p.status}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {p.tiktok_id && (
              <a href={`https://www.tiktok.com/@alwajudproperties/video/${p.tiktok_id}`} target="_blank" rel="noopener"
                onClick={e => e.stopPropagation()}
                style={{ width: 28, height: 28, background: 'rgba(0,0,0,.65)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {TIKTOK_SVG}
              </a>
            )}
            <button onClick={e => { e.preventDefault(); e.stopPropagation(); setSaved(s => !s); }} className="prop-fav" style={{ fontSize: 13 }}>
              {saved ? '❤️' : '♡'}
            </button>
          </div>
        </div>
        {p.featured && (
          <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(255,183,3,.95)', color: '#111', fontFamily: 'var(--font-poppins)', fontSize: 9, fontWeight: 800, padding: '3px 10px', borderRadius: 99, letterSpacing: 1 }}>
            ⭐ FEATURED
          </span>
        )}
      </div>
      <div className="prop-body">
        <div className="prop-price">{formatPrice(p.price, p.price_period)}</div>
        <div className="prop-title">{p.title}</div>
        <div className="prop-loc">{PIN_SVG}{p.location}</div>
        <div className="prop-specs">
          {p.bedrooms > 0 && <span className="spec-chip">🛏 {p.bedrooms} Bed{p.bedrooms !== 1 ? 's' : ''}</span>}
          {p.bathrooms > 0 && <span className="spec-chip">🚿 {p.bathrooms} Bath{p.bathrooms !== 1 ? 's' : ''}</span>}
          {p.sqm > 0 && <span className="spec-chip">📐 {p.sqm} sqm</span>}
          <span className="spec-chip">🔒 24/7</span>
        </div>
        <div className="prop-footer">
          <div className="agent-mini">
            <div className="agent-av">AW</div>
            <div><div className="agent-nm">Al-Wajud Team</div><div className="stars">★★★★★ 5.0</div></div>
          </div>
          <span className="view-btn">View →</span>
        </div>
      </div>
    </Link>
  );
}

// ── Mobile Static Card ────────────────────────────────────────────────────────

function MobStaticCard({ p, onOpen }: { p: SP; onOpen: (p: SP) => void }) {
  const [saved, setSaved] = useState(false);
  const bg = statusBg(p.status);
  const tx = statusTxt(p.status);

  return (
    <div className="mob-prop-card" onClick={() => onOpen(p)}>
      <div className="mob-prop-img" style={{ backgroundImage: `url(${p.img}),${p.gradient}`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <span style={{ position: 'absolute', top: 12, left: 12, background: bg, color: tx, fontFamily: 'var(--font-poppins)', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 99 }}>{p.status}</span>
        {p.featured && (
          <span style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,183,3,.95)', color: '#111', fontFamily: 'var(--font-poppins)', fontSize: 9, fontWeight: 800, padding: '3px 10px', borderRadius: 99 }}>⭐ FEATURED</span>
        )}
        <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 5, alignItems: 'center' }}>
          <a href="https://www.tiktok.com/@alwajudproperties" target="_blank" rel="noopener"
            onClick={e => e.stopPropagation()}
            style={{ width: 26, height: 26, background: 'rgba(0,0,0,.6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.54V6.78a4.84 4.84 0 01-1.07-.09z"/></svg>
          </a>
          <div onClick={e => { e.stopPropagation(); setSaved(s => !s); }}
            style={{ width: 26, height: 26, background: 'rgba(255,255,255,.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, cursor: 'pointer' }}>
            {saved ? '❤️' : '♡'}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5 }}>
          {p.imgs.slice(0, 3).map((_, j) => (
            <span key={j} style={{ width: 6, height: 6, borderRadius: '50%', background: j === 0 ? '#fff' : 'rgba(255,255,255,.5)', display: 'block' }} />
          ))}
        </div>
      </div>
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 16, color: '#0F5E36' }}>
          {p.price}{p.period && <span style={{ fontSize: 10, fontWeight: 400, color: '#6B7280' }}> {p.period}</span>}
        </div>
        <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 13, color: '#111827', margin: '3px 0 4px' }}>{p.title}</div>
        <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#6B7280', display: 'flex', alignItems: 'center', gap: 4 }}>
          {PIN_SVG}{p.location}
        </div>
        <div style={{ display: 'flex', gap: 5, marginTop: 7, flexWrap: 'wrap' as const }}>
          {p.beds > 0 && <span className="spec-chip">🛏 {p.beds} Bed{p.beds !== 1 ? 's' : ''}</span>}
          {p.baths > 0 && <span className="spec-chip">🚿 {p.baths} Bath{p.baths !== 1 ? 's' : ''}</span>}
          {p.sqm > 0 && <span className="spec-chip">📐 {p.sqm} sqm</span>}
          {(p.extraChips ?? []).map(c => <span key={c} className="spec-chip">{c}</span>)}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <button onClick={e => { e.stopPropagation(); onOpen(p); }}
            style={{ flex: 1, background: 'linear-gradient(135deg,#1B9954,#0F5E36)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 12, border: 'none', borderRadius: 10, padding: 10, cursor: 'pointer' }}>
            View Details
          </button>
          <a href={`https://wa.me/2347035374592?text=${p.wa}`} target="_blank" rel="noopener"
            onClick={e => e.stopPropagation()}
            style={{ flex: 1, background: '#25D366', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 12, border: 'none', borderRadius: 10, padding: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Desktop Detail Panel ──────────────────────────────────────────────────────

function DetailPanel({ p, allProps, onClose, onOpenOther }: { p: SP; allProps: SP[]; onClose: () => void; onOpenOther: (p: SP) => void }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [saved, setSaved] = useState(false);
  const [scrollY] = useState(0);
  const idx = allProps.findIndex(x => x.id === p.id);
  const similar = [1, 2, 3, 4].map(d => allProps[(idx + d) % allProps.length]);

  const goImg = useCallback((j: number) => setImgIdx(j), []);
  const navImg = (dir: number) => setImgIdx(i => (i + dir + p.imgs.length) % p.imgs.length);

  return (
    <>
      <div className="detail-overlay open" onClick={onClose} />
      <div className="detail-panel open">
        <div className="detail-close">
          <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: 'var(--dark-text)' }}>{p.title}</span>
          <button className="detail-close-btn" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="detail-gallery" style={{ backgroundImage: `url(${p.imgs[imgIdx]})` }}>
          <button className="gallery-nav gallery-prev" onClick={() => navImg(-1)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button className="gallery-nav gallery-next" onClick={() => navImg(1)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <div className="gallery-dots">
            {p.imgs.map((_, j) => <button key={j} className={`gallery-dot${j === imgIdx ? ' active' : ''}`} onClick={() => goImg(j)} />)}
          </div>
        </div>
        <div className="thumb-strip">
          {p.imgs.map((src, j) => (
            <div key={j} className={`thumb${j === imgIdx ? ' active' : ''}`} style={{ backgroundImage: `url(${src})` }} onClick={() => goImg(j)} />
          ))}
        </div>
        <div className="detail-body">
          {/* Left column */}
          <div>
            <div className="detail-section">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-poppins)', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 99, background: statusBg(p.status) === '#FFB703' ? 'rgba(255,183,3,.15)' : 'rgba(27,153,84,.12)', color: statusBg(p.status) === '#FFB703' ? '#92610A' : statusBg(p.status), marginBottom: 10 }}>{p.status}</span>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 26, color: 'var(--dark)' }}>
                {p.price}{p.period && <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--gray)' }}>{p.period}</span>}
              </div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 16, color: 'var(--dark-text)', margin: '6px 0' }}>{p.title}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'var(--gray)', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 12 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E63946"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/></svg>{p.location}
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const, marginBottom: 12 }}>
                {p.beds > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-inter)', fontSize: 12, color: '#374151', background: '#F3F4F6', padding: '5px 10px', borderRadius: 8 }}>🛏 {p.beds} Bed{p.beds !== 1 ? 's' : ''}</span>}
                {p.baths > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-inter)', fontSize: 12, color: '#374151', background: '#F3F4F6', padding: '5px 10px', borderRadius: 8 }}>🚿 {p.baths} Bath{p.baths !== 1 ? 's' : ''}</span>}
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-inter)', fontSize: 12, color: '#374151', background: '#F3F4F6', padding: '5px 10px', borderRadius: 8 }}>📐 {p.sqm} sqm</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-inter)', fontSize: 12, color: '#374151', background: '#F3F4F6', padding: '5px 10px', borderRadius: 8 }}>✅ Verified</span>
              </div>
            </div>
            <div className="detail-section"><h3>Description</h3><p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151', lineHeight: 1.75 }}>{p.desc}</p></div>
            {p.tiktok && (
              <div className="detail-section">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#111"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.54V6.78a4.84 4.84 0 01-1.07-.09z"/></svg>
                  Property Video Tour
                </h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <iframe src={`https://www.tiktok.com/embed/v2/${p.tiktok}`} width="325" height="580" frameBorder="0" allow="autoplay;encrypted-media" allowFullScreen style={{ borderRadius: 12, maxWidth: '100%' }} />
                </div>
              </div>
            )}
            <div className="detail-section"><h3>Key Features</h3><div className="feat-grid">{p.features.map(f => <div key={f} className="feat-item">{f}</div>)}</div></div>
            <div className="detail-section"><h3>Amenities</h3><div className="amenity-grid">{p.propAmenities.map(a => <div key={a.l} className="amenity-item"><span>{a.i}</span><span>{a.l}</span></div>)}</div></div>
            <div className="detail-section"><h3>Neighbourhood Map</h3>
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15854.68!2d3.35!3d6.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1" width="100%" height="220" style={{ border: 0, borderRadius: 12 }} allowFullScreen loading="lazy" />
            </div>
            <div className="detail-section"><h3>Inquiry Form</h3>
              <form className="inq-form" onSubmit={e => { e.preventDefault(); window.open(`https://wa.me/2347035374592?text=${p.wa}`, '_blank'); }}>
                <div className="inq-row">
                  <input className="inq-input" placeholder="Your Name" required />
                  <input className="inq-input" placeholder="Phone Number" required />
                </div>
                <input className="inq-input" type="email" placeholder="Email Address" required />
                <textarea className="inq-input" rows={3} placeholder="Your message..." style={{ resize: 'vertical' }} defaultValue={`I am interested in ${p.title}. Please contact me with more details.`} />
                <button type="submit" style={{ background: 'linear-gradient(135deg,#1B9954,#0F5E36)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, padding: 12, borderRadius: 12, border: 'none', cursor: 'pointer', width: '100%' }}>Send Inquiry</button>
              </form>
            </div>
            <div className="detail-section"><h3>Similar Properties</h3>
              <div className="sim-grid">
                {similar.map(s => (
                  <div key={s.id} className="sim-card" onClick={() => onOpenOther(s)}>
                    <div className="sim-img" style={{ backgroundImage: `url(${s.imgs[0]})` }} />
                    <div className="sim-body"><div className="sim-price">{s.price}</div><div className="sim-title">{s.title}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right column */}
          <div>
            <div className="detail-price-box">
              <div style={{ fontFamily: 'var(--font-poppins)', fontSize: 11, fontWeight: 700, color: 'var(--primary)', letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: 6 }}>{p.status}</div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 26, color: 'var(--dark)' }}>{p.price}<span style={{ fontSize: 12, fontWeight: 400, color: 'var(--gray)' }}>{p.period}</span></div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'var(--gray)', margin: '6px 0 14px' }}>{p.location}</div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                <a href={`https://wa.me/2347035374592?text=${p.wa}`} target="_blank" rel="noopener" className="action-btn" style={{ background: '#25D366', color: '#fff' }}>📱 Inquire on WhatsApp</a>
                <a href="tel:07035374592" className="action-btn" style={{ background: 'var(--primary)', color: '#fff' }}>📞 Call Now</a>
                <button onClick={() => alert('Booking request sent! Our team will call you within 24 hours.')} className="action-btn" style={{ background: 'var(--teal)', color: '#fff' }}>📅 Schedule Viewing</button>
                <button onClick={() => setSaved(s => !s)} className="action-btn" style={{ background: '#F3F4F6', color: '#374151', border: '1.5px solid #E5E7EB' }}>{saved ? '❤️' : '🤍'} {saved ? 'Saved' : 'Save Property'}</button>
              </div>
            </div>
            <div className="agent-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div className="agent-av-lg">AW</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: 'var(--dark-text)' }}>Al-Wajud Team</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'var(--gray)' }}>Licensed Property Agent</div>
                  <div style={{ color: 'var(--gold)', fontSize: 11 }}>★★★★★ 5.0</div>
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#374151', lineHeight: 1.6, marginBottom: 12 }}>Nigeria&apos;s most trusted real estate professionals with 15+ years of experience in premium property transactions.</div>
              <a href="https://wa.me/2347035374592" target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', background: '#F0FDF4', color: 'var(--primary)', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 12, padding: 10, borderRadius: 10, border: '1.5px solid var(--primary)', textDecoration: 'none' }}>💬 Chat with Agent</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Mobile Detail Panel ───────────────────────────────────────────────────────

function MobDetailPanel({ p, allProps, onClose, onOpenOther }: { p: SP; allProps: SP[]; onClose: () => void; onOpenOther: (p: SP) => void }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [saved, setSaved] = useState(false);
  const idx = allProps.findIndex(x => x.id === p.id);
  const similar = [1, 2, 3, 4].map(d => allProps[(idx + d) % allProps.length]);

  return (
    <>
      <div className="mob-detail-overlay open" onClick={onClose} />
      <div className="mob-detail-panel open">
        <div className="mob-detail-drag"><span /></div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 12px' }}>
          <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: 'var(--dark-text)' }}>{p.title}</span>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', background: '#F3F4F6', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="mob-detail-gallery" style={{ backgroundImage: `url(${p.imgs[imgIdx]})` }}>
          <button className="gallery-nav gallery-prev" onClick={() => setImgIdx(i => (i - 1 + p.imgs.length) % p.imgs.length)}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button className="gallery-nav gallery-next" onClick={() => setImgIdx(i => (i + 1) % p.imgs.length)}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <div className="gallery-dots">
            {p.imgs.map((_, j) => <button key={j} className={`gallery-dot${j === imgIdx ? ' active' : ''}`} onClick={() => setImgIdx(j)} />)}
          </div>
        </div>
        <div className="mob-thumb-strip">
          {p.imgs.map((src, j) => <div key={j} className={`mob-thumb${j === imgIdx ? ' active' : ''}`} style={{ backgroundImage: `url(${src})` }} onClick={() => setImgIdx(j)} />)}
        </div>
        <div className="mob-detail-body">
          <div className="mob-detail-sec">
            <div style={{ fontFamily: 'var(--font-poppins)', fontSize: 10, fontWeight: 700, color: 'var(--primary)', letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: 4 }}>{p.status}</div>
            <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 22, color: 'var(--dark)' }}>{p.price}<span style={{ fontSize: 11, fontWeight: 400, color: 'var(--gray)' }}>{p.period}</span></div>
            <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: 'var(--dark-text)', margin: '4px 0' }}>{p.title}</div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'var(--gray)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>{PIN_SVG}{p.location}</div>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' as const }}>
              {p.beds > 0 && <span className="spec-chip">🛏 {p.beds} Bed{p.beds !== 1 ? 's' : ''}</span>}
              {p.baths > 0 && <span className="spec-chip">🚿 {p.baths} Bath{p.baths !== 1 ? 's' : ''}</span>}
              {p.sqm > 0 && <span className="spec-chip">📐 {p.sqm} sqm</span>}
              <span className="spec-chip">✅ Verified</span>
            </div>
          </div>
          <div className="mob-action-btns">
            <a href={`https://wa.me/2347035374592?text=${p.wa}`} target="_blank" rel="noopener" className="mob-action-btn" style={{ background: '#25D366', color: '#fff' }}>📱 WhatsApp</a>
            <a href="tel:07035374592" className="mob-action-btn" style={{ background: 'var(--primary)', color: '#fff' }}>📞 Call Now</a>
            <button onClick={() => alert('Booking request sent! Our team will call you within 24 hours.')} className="mob-action-btn" style={{ background: 'var(--teal)', color: '#fff', border: 'none', cursor: 'pointer' }}>📅 Schedule</button>
            <button onClick={() => setSaved(s => !s)} className="mob-action-btn" style={{ background: '#F3F4F6', color: '#374151', border: '1.5px solid #E5E7EB', cursor: 'pointer' }}>{saved ? '❤️' : '🤍'} Save</button>
          </div>
          <div className="mob-detail-sec"><h3>Description</h3><p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#374151', lineHeight: 1.75 }}>{p.desc}</p></div>
          <div className="mob-detail-sec"><h3>Key Features</h3><div className="mob-feat-grid">{p.features.map(f => <div key={f} className="mob-feat-item">{f}</div>)}</div></div>
          <div className="mob-detail-sec"><h3>Amenities</h3><div className="mob-amenity-grid">{p.propAmenities.map(a => <div key={a.l} className="mob-amenity-item"><span>{a.i}</span><span>{a.l}</span></div>)}</div></div>
          {p.tiktok && (
            <div className="mob-detail-sec">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#111"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.54V6.78a4.84 4.84 0 01-1.07-.09z"/></svg>
                Video Tour
              </h3>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <iframe src={`https://www.tiktok.com/embed/v2/${p.tiktok}`} height="480" frameBorder="0" allow="autoplay;encrypted-media" allowFullScreen style={{ width: '100%', borderRadius: 12 }} />
              </div>
            </div>
          )}
          <div className="mob-detail-sec"><h3>Neighbourhood Map</h3>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15854.68!2d3.35!3d6.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1" height="180" style={{ width: '100%', border: 0, borderRadius: 12 }} allowFullScreen loading="lazy" />
          </div>
          <div className="mob-detail-sec"><h3>Agent</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div className="agent-av-lg">AW</div>
              <div>
                <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: 'var(--dark-text)' }}>Al-Wajud Team</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'var(--gray)' }}>Licensed Property Agent</div>
                <div style={{ color: 'var(--gold)', fontSize: 11 }}>★★★★★ 5.0</div>
              </div>
            </div>
            <a href="https://wa.me/2347035374592" target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', background: '#F0FDF4', color: 'var(--primary)', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 12, padding: 10, borderRadius: 10, border: '1.5px solid var(--primary)', textDecoration: 'none' }}>💬 Chat with Agent</a>
          </div>
          <div className="mob-detail-sec"><h3>Inquiry</h3>
            <form onSubmit={e => { e.preventDefault(); window.open(`https://wa.me/2347035374592?text=${p.wa}`, '_blank'); }}>
              <input className="mob-inq-input" placeholder="Your Name" required />
              <input className="mob-inq-input" placeholder="Phone Number" required />
              <input className="mob-inq-input" type="email" placeholder="Email Address" required />
              <textarea className="mob-inq-input" rows={3} placeholder="Your message..." style={{ resize: 'vertical' }} defaultValue={`I am interested in ${p.title}. Please contact me.`} />
              <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg,#1B9954,#0F5E36)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, padding: 12, borderRadius: 12, border: 'none', cursor: 'pointer' }}>Send Inquiry</button>
            </form>
          </div>
          <div className="mob-detail-sec"><h3>Similar Properties</h3>
            <div className="mob-sim-grid">
              {similar.map(s => (
                <div key={s.id} className="mob-sim-card" onClick={() => onOpenOther(s)}>
                  <div className="mob-sim-img" style={{ backgroundImage: `url(${s.imgs[0]})` }} />
                  <div className="mob-sim-body"><div className="mob-sim-price">{s.price}</div><div className="mob-sim-title">{s.title}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: 20 }} />
        </div>
      </div>
    </>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

interface SidebarFilters {
  search: string; setSearch: (v: string) => void;
  txTypes: Set<string>; toggleTx: (v: string) => void;
  propTypes: Set<string>; togglePropType: (v: string) => void;
  maxPrice: number; setMaxPrice: (v: number) => void;
  selLocs: Set<string>; toggleLoc: (v: string) => void;
  selBeds: Set<number>; toggleBed: (v: number) => void;
  selAmenities: Set<string>; toggleAmenity: (v: string) => void;
  onApply: () => void; onReset: () => void;
}

const PRICE_MAX = 500_000_000;
function fmtSlider(v: number) {
  if (v >= PRICE_MAX) return 'Any';
  if (v >= 1_000_000) return `₦${(v / 1_000_000).toFixed(0)}M`;
  return `₦${(v / 1_000).toFixed(0)}K`;
}

function Sidebar(f: SidebarFilters) {
  const ck: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-inter)', fontSize: 12, color: '#374151', cursor: 'pointer' };
  const sec: React.CSSProperties = { marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid #F3F4F6' };
  const ttl: React.CSSProperties = { fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: 'var(--dark-text)', marginBottom: 12 };
  return (
    <div className="prop-sidebar">
      <div style={sec}><div style={ttl}>Search</div>
        <input className="sidebar-search" placeholder="🔍 Search by location..." value={f.search} onChange={e => f.setSearch(e.target.value)} />
      </div>
      <div style={sec}><div style={ttl}>Transaction Type</div><div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
        {[['For Sale','FOR SALE'],['For Rent','FOR RENT'],['Short Let','SHORT LET'],['Off-Plan','OFF-PLAN']].map(([l, v]) => (
          <label key={v} style={ck}><input type="checkbox" checked={f.txTypes.has(v)} onChange={() => f.toggleTx(v)} style={{ accentColor: 'var(--primary)', width: 14, height: 14, flexShrink: 0, cursor: 'pointer' }} />{l}</label>
        ))}
      </div></div>
      <div style={sec}><div style={ttl}>Property Type</div><div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
        {[['Apartment / Flat','apartment'],['Duplex / House','duplex'],['Land / Plot','land'],['Short Let','shortlet']].map(([l, v]) => (
          <label key={v} style={ck}><input type="checkbox" checked={f.propTypes.has(v)} onChange={() => f.togglePropType(v)} style={{ accentColor: 'var(--primary)', width: 14, height: 14, flexShrink: 0, cursor: 'pointer' }} />{l}</label>
        ))}
      </div></div>
      <div style={sec}><div style={ttl}>Price Range</div><div style={{ padding: '0 4px' }}>
        <input type="range" min={0} max={PRICE_MAX} step={5_000_000} value={f.maxPrice} onChange={e => f.setMaxPrice(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary)', margin: '10px 0 6px', cursor: 'pointer' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-inter)', fontSize: 11, color: 'var(--gray)' }}><span>₦0</span><span>{fmtSlider(f.maxPrice)}</span></div>
      </div></div>
      <div style={sec}><div style={ttl}>Location</div><div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
        {[['Lagos','lagos'],['Abuja','abuja'],['Port Harcourt','port harcourt']].map(([l, v]) => (
          <label key={v} style={ck}><input type="checkbox" checked={f.selLocs.has(v)} onChange={() => f.toggleLoc(v)} style={{ accentColor: 'var(--primary)', width: 14, height: 14, flexShrink: 0, cursor: 'pointer' }} />{l}</label>
        ))}
      </div></div>
      <div style={sec}><div style={ttl}>Bedrooms</div><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
        {[1,2,3,4,5].map(n => (
          <button key={n} onClick={() => f.toggleBed(n)} style={{ padding: '5px 11px', borderRadius: 8, border: `1.5px solid ${f.selBeds.has(n) ? 'var(--primary)' : '#E5E7EB'}`, background: f.selBeds.has(n) ? 'var(--primary)' : '#fff', color: f.selBeds.has(n) ? '#fff' : '#374151', fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>{n === 5 ? '5+' : n}</button>
        ))}
      </div></div>
      <div style={sec}><div style={ttl}>Amenities</div><div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
        {['Swimming Pool','Gym','24/7 Security','Parking','Generator'].map(am => (
          <label key={am} style={ck}><input type="checkbox" checked={f.selAmenities.has(am)} onChange={() => f.toggleAmenity(am)} style={{ accentColor: 'var(--primary)', width: 14, height: 14, flexShrink: 0, cursor: 'pointer' }} />{am}</label>
        ))}
      </div></div>
      <div><button onClick={f.onApply} className="sidebar-apply">Apply Filters</button><button onClick={f.onReset} className="sidebar-reset">Reset All</button></div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function PropertiesClient({ initialProperties }: { initialProperties: DBP[] }) {
  const isStatic = initialProperties.length === 0;
  const allStatic = ALL_PROPERTIES;

  // shared filter state
  const [search,    setSearch]    = useState('');
  const [txTypes,   setTxTypes]   = useState<Set<string>>(new Set());
  const [propTypes, setPropTypes] = useState<Set<string>>(new Set());
  const [maxPrice,  setMaxPrice]  = useState(PRICE_MAX);
  const [selLocs,   setSelLocs]   = useState<Set<string>>(new Set());
  const [selBeds,   setSelBeds]   = useState<Set<number>>(new Set());
  const [selAm,     setSelAm]     = useState<Set<string>>(new Set());
  const [sort,      setSort]      = useState('newest');
  const [page,      setPage]      = useState(1);

  // mobile state
  const [mobLoc,    setMobLoc]    = useState('');
  const [mobStat,   setMobStat]   = useState('');
  const [mobTyp,    setMobTyp]    = useState('');
  const [mobSidebar, setMobSidebar] = useState(false);
  const [detailProp, setDetailProp] = useState<SP | null>(null);
  const [mobDetailProp, setMobDetailProp] = useState<SP | null>(null);

  function tog<T>(set: Set<T>, val: T): Set<T> { const n = new Set(set); n.has(val) ? n.delete(val) : n.add(val); return n; }
  function resetAll() { setSearch(''); setTxTypes(new Set()); setPropTypes(new Set()); setMaxPrice(PRICE_MAX); setSelLocs(new Set()); setSelBeds(new Set()); setSelAm(new Set()); setPage(1); }

  const openDetail    = (p: SP) => { setDetailProp(p); document.body.style.overflow = 'hidden'; };
  const closeDetail   = () => { setDetailProp(null); document.body.style.overflow = ''; };
  const openMobDetail = (p: SP) => { setMobDetailProp(p); document.body.style.overflow = 'hidden'; };
  const closeMobDetail = () => { setMobDetailProp(null); document.body.style.overflow = ''; };

  // ── Desktop filter (static) ──
  const filteredStatic = useMemo(() => {
    let r = [...allStatic];
    if (search.trim()) { const q = search.toLowerCase(); r = r.filter(p => p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)); }
    if (txTypes.size > 0)   r = r.filter(p => txTypes.has(p.status));
    if (propTypes.size > 0) r = r.filter(p => propTypes.has(p.ptype) || (propTypes.has('shortlet') && p.statusKey === 'shortlet'));
    if (maxPrice < PRICE_MAX) {
      r = r.filter(p => {
        const num = parseFloat(p.price.replace(/[^0-9.]/g, ''));
        return num <= maxPrice;
      });
    }
    if (selLocs.size > 0) r = r.filter(p => selLocs.has(p.locationKey));
    if (selBeds.size > 0) r = r.filter(p => selBeds.has(5) && p.beds >= 5 ? true : selBeds.has(p.beds));
    switch (sort) {
      case 'price_asc':  r.sort((a, b) => parseFloat(a.price.replace(/[^0-9]/g,'')) - parseFloat(b.price.replace(/[^0-9]/g,''))); break;
      case 'price_desc': r.sort((a, b) => parseFloat(b.price.replace(/[^0-9]/g,'')) - parseFloat(a.price.replace(/[^0-9]/g,''))); break;
    }
    return r;
  }, [allStatic, search, txTypes, propTypes, maxPrice, selLocs, selBeds, sort]);

  // ── Desktop filter (DB) ──
  const filteredDB = useMemo(() => {
    let r = [...initialProperties];
    if (search.trim()) { const q = search.toLowerCase(); r = r.filter(p => p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)); }
    if (txTypes.size > 0)   r = r.filter(p => txTypes.has(p.status));
    if (propTypes.size > 0) r = r.filter(p => propTypes.has(p.property_type) || (propTypes.has('shortlet') && p.status === 'SHORT LET'));
    if (maxPrice < PRICE_MAX) r = r.filter(p => p.price <= maxPrice);
    if (selLocs.size > 0) r = r.filter(p => Array.from(selLocs).some(l => p.location.toLowerCase().includes(l)));
    if (selBeds.size > 0) r = r.filter(p => selBeds.has(5) && p.bedrooms >= 5 ? true : selBeds.has(p.bedrooms));
    switch (sort) {
      case 'price_asc':  r.sort((a, b) => a.price - b.price); break;
      case 'price_desc': r.sort((a, b) => b.price - a.price); break;
    }
    return r;
  }, [initialProperties, search, txTypes, propTypes, maxPrice, selLocs, selBeds, sort]);

  const resultCount = isStatic ? filteredStatic.length : filteredDB.length;

  // ── Mobile filter (static) ──
  const filteredMob = useMemo(() => {
    let r = [...allStatic];
    if (mobLoc)  r = r.filter(p => p.locationKey === mobLoc);
    if (mobStat) r = r.filter(p => p.statusKey === mobStat);
    if (mobTyp)  r = r.filter(p => p.ptype === mobTyp || (mobTyp === 'shortlet' && p.statusKey === 'shortlet'));
    return r;
  }, [allStatic, mobLoc, mobStat, mobTyp]);

  const sidebarProps: SidebarFilters = {
    search, setSearch, txTypes, toggleTx: v => { setTxTypes(s => tog(s, v)); setPage(1); },
    propTypes, togglePropType: v => { setPropTypes(s => tog(s, v)); setPage(1); },
    maxPrice, setMaxPrice: v => { setMaxPrice(v); setPage(1); },
    selLocs, toggleLoc: v => { setSelLocs(s => tog(s, v)); setPage(1); },
    selBeds, toggleBed: v => { setSelBeds(s => tog(s, v)); setPage(1); },
    selAmenities: selAm, toggleAmenity: v => { setSelAm(s => tog(s, v)); setPage(1); },
    onApply: () => setPage(1), onReset: resetAll,
  };

  const PAGE_SIZE = 24;
  const totalPages = Math.max(1, Math.ceil(resultCount / PAGE_SIZE));

  return (
    <>
      {/* ── PC Banner (desktop only) ── */}
      <div className="prop-page-banner hidden lg:block">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Link href="/" style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>›</span>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#fff', fontWeight: 600 }}>Properties</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 44, color: '#fff', marginBottom: 10 }}>Our Property Listings</h1>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(255,255,255,0.85)', maxWidth: 520, lineHeight: 1.7 }}>
            Browse verified luxury and premium properties across Lagos, Abuja and Port Harcourt. Every listing is inspected and title-checked before it reaches you.
          </p>
        </div>
      </div>

      {/* ── Desktop detail overlay ── */}
      {detailProp && <DetailPanel p={detailProp} allProps={allStatic} onClose={closeDetail} onOpenOther={p => { closeDetail(); setTimeout(() => openDetail(p), 50); }} />}

      {/* ── Desktop layout ── */}
      <div className="hidden lg:block">
        <div className="prop-layout">
          <aside><Sidebar {...sidebarProps} /></aside>
          <div className="prop-main">
            <div className="sort-bar">
              <div>
                <div className="eyebrow">Verified Listings</div>
                <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 28, color: 'var(--dark-text)' }}>All <span style={{ color: 'var(--primary)' }}>Properties</span></h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-end', gap: 8 }}>
                <span className="result-count"><strong>{resultCount}</strong> properties found</span>
                <div className="sort-tabs">
                  {[['Newest','newest'],['Price ↑','price_asc'],['Price ↓','price_desc']].map(([l, v]) => (
                    <button key={v} onClick={() => { setSort(v); setPage(1); }} className={`sort-tab${sort === v ? ' active' : ''}`}>{l}</button>
                  ))}
                </div>
              </div>
            </div>

            {isStatic ? (
              filteredStatic.length > 0 ? (
                <div className="listings-grid">
                  {filteredStatic.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE).map(p => <StaticCard key={p.id} p={p} onOpen={openDetail} />)}
                </div>
              ) : (
                <div className="no-results"><p>No properties match your filters</p><span>Try adjusting your search criteria or <button onClick={resetAll} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-inter)', fontSize: 14 }}>clear all filters</button></span></div>
              )
            ) : (
              filteredDB.length > 0 ? (
                <div className="listings-grid">
                  {filteredDB.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE).map(p => <DBCard key={p.id} p={p} />)}
                </div>
              ) : (
                <div className="no-results"><p>No properties match your filters</p><span>Try adjusting your search criteria or <button onClick={resetAll} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-inter)', fontSize: 14 }}>clear all filters</button></span></div>
              )
            )}

            {totalPages > 1 && (
              <div style={{ display: 'flex', gap: 8, marginTop: 32, flexWrap: 'wrap' as const, alignItems: 'center' }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button key={n} onClick={() => { setPage(n); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{ width: 40, height: 40, borderRadius: 10, border: n === page ? 'none' : '1.5px solid #E5E7EB', background: n === page ? 'var(--primary)' : '#fff', color: n === page ? '#fff' : '#374151', fontFamily: 'var(--font-poppins)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{n}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA strip */}
        <div style={{ padding: '0 60px' }}>
          <div className="cta-strip">
            <h2>Can&apos;t Find What You&apos;re Looking For?</h2>
            <p>Tell us exactly what you need — location, budget, size — and our team will source it for you personally.</p>
            <button className="btn-primary" onClick={() => window.open('https://wa.me/2347035374592?text=Hello%20Al-Wajud!%20I%20am%20looking%20for%20a%20property%20and%20would%20like%20some%20help.','_blank')}>
              WhatsApp Our Property Team
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════ MOBILE ══════════════ */}

      {/* Mobile sidebar overlay */}
      {mobSidebar && (
        <>
          <div className="mob-sidebar-overlay open" onClick={() => setMobSidebar(false)} />
          <aside className="mob-sidebar open">
            <div className="mob-sidebar-top">
              <div className="mob-sidebar-logo" style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 19, color: '#fff' }}>Al-<span style={{ color: 'var(--gold)' }}>Wajud</span></div>
              <div className="mob-sidebar-tagline">Nigeria&apos;s Trusted Real Estate</div>
              <button className="mob-sidebar-close" onClick={() => setMobSidebar(false)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
              <svg className="mob-sidebar-wave" viewBox="0 0 32 800" preserveAspectRatio="none"><path d="M0,0 C20,100 0,200 20,300 C40,400 0,500 20,600 C40,700 10,750 0,800 L32,800 L32,0 Z" fill="#fff"/></svg>
            </div>
            <nav className="mob-sidebar-nav">
              <Link href="/" className="mob-sidebar-item"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>Home</Link>
              <Link href="/properties" className="mob-sidebar-item active"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>Properties</Link>
              <Link href="/services" className="mob-sidebar-item"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>Services</Link>
              <Link href="/about" className="mob-sidebar-item"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>About Us</Link>
              <Link href="/blog" className="mob-sidebar-item"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2"/></svg>Blog</Link>
              <Link href="/contact" className="mob-sidebar-item"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Contact</Link>
            </nav>
            <div className="mob-sidebar-footer">
              <a href="https://wa.me/2347035374592?text=Hello%20Al-Wajud!" target="_blank" rel="noopener" className="mob-sidebar-wa">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </aside>
        </>
      )}

      {/* Mobile detail panel */}
      {mobDetailProp && <MobDetailPanel p={mobDetailProp} allProps={allStatic} onClose={closeMobDetail} onOpenOther={p => { closeMobDetail(); setTimeout(() => openMobDetail(p), 50); }} />}

      {/* Mobile layout */}
      <div className="lg:hidden" style={{ maxWidth: 430, margin: '0 auto', minHeight: '100vh', background: '#F9FAFB' }}>
        {/* Mobile header */}
        <header className="mob-header">
          <Link href="/"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></Link>
          <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 16, color: '#0F5E36' }}>Properties</span>
          <button className="mob-hamburger" onClick={() => setMobSidebar(true)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </header>

        {/* Mobile mini-banner */}
        <div style={{ background: 'linear-gradient(135deg,var(--teal) 0%,var(--teal) 52%,var(--peach) 52%,var(--peach) 100%)', padding: '24px 16px 32px' }}>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,.75)', letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: 6 }}>Verified Listings</p>
          <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 24, color: '#fff', marginBottom: 6 }}>Our <span style={{ color: 'var(--gold)' }}>Properties</span></h1>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,.8)' }}>Every listing inspected &amp; title-checked</p>
        </div>

        {/* Mobile filter — overlaps banner */}
        <div style={{ margin: '-16px 14px 0', position: 'relative', zIndex: 10 }}>
          <div className="mob-filter">
            <select value={mobLoc} onChange={e => setMobLoc(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-inter)', fontSize: 12, color: '#374151', background: '#F9FAFB', outline: 'none' }}>
              <option value="">📍 All Locations</option>
              <option value="lagos">Lagos</option>
              <option value="abuja">Abuja</option>
              <option value="port harcourt">Port Harcourt</option>
            </select>
            <div className="mob-filter-row">
              <select value={mobStat} onChange={e => setMobStat(e.target.value)} style={{ padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-inter)', fontSize: 12, color: '#374151', background: '#F9FAFB', outline: 'none' }}>
                <option value="">🏷 All Status</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
                <option value="shortlet">Short Let</option>
                <option value="offplan">Off-Plan</option>
              </select>
              <select value={mobTyp} onChange={e => setMobTyp(e.target.value)} style={{ padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-inter)', fontSize: 12, color: '#374151', background: '#F9FAFB', outline: 'none' }}>
                <option value="">🏠 All Types</option>
                <option value="duplex">Duplex</option>
                <option value="apartment">Apartment</option>
                <option value="land">Land</option>
                <option value="shortlet">Short Let</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 2 }}>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'var(--gray)' }}>
                <strong style={{ color: 'var(--primary)' }}>{filteredMob.length}</strong> properties
              </span>
              <button onClick={() => { setMobLoc(''); setMobStat(''); setMobTyp(''); }} style={{ fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 600, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}>Clear filters</button>
            </div>
          </div>
        </div>

        {/* Mobile listings */}
        <div style={{ padding: '20px 14px 130px' }}>
          {filteredMob.length > 0
            ? filteredMob.map(p => <MobStaticCard key={p.id} p={p} onOpen={openMobDetail} />)
            : (
              <div style={{ textAlign: 'center', padding: '40px 20px', background: '#fff', borderRadius: 16, border: '1.5px dashed #E5E7EB' }}>
                <p style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 6 }}>No properties match</p>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#6B7280' }}>Try adjusting your filters</span>
              </div>
            )
          }
        </div>

        {/* Wavy bottom nav */}
        <nav className="wavy-nav">
          <Link href="/" className="nav-item"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg><span className="nav-label">Home</span></Link>
          <div className="nav-item active">
            <div className="nav-active-bubble"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></div>
            <span className="nav-label" style={{ color: 'var(--primary)' }}>Property</span>
          </div>
          <Link href="/about" className="nav-item"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg><span className="nav-label">About</span></Link>
          <Link href="/contact" className="nav-item" style={{ position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              <span style={{ position: 'absolute', top: -3, right: -3, width: 8, height: 8, background: '#E63946', borderRadius: '50%', border: '2px solid #fff', display: 'block' }} />
            </div>
            <span className="nav-label">Contact</span>
          </Link>
          <Link href="/blog" className="nav-item"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2"/></svg><span className="nav-label">Blog</span></Link>
        </nav>
      </div>
    </>
  );
}
