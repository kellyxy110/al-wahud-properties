'use client';

import { useState } from 'react';
import { formatPrice, type Property } from '@/app/lib/supabase/types';

function badgeBg(status: Property['status']) {
  switch (status) {
    case 'FOR SALE':      return '#0F5E36';
    case 'FOR RENT':      return '#E63946';
    case 'SHORT LET':     return '#2D7A76';
    case 'OFF-PLAN':      return '#FFB703';
    case 'LAND FOR SALE': return '#7C3AED';
  }
}

interface Props {
  property: Property;
  onClose: () => void;
}

export default function PropertyDetail({ property: p, onClose }: Props) {
  const [imgIdx, setImgIdx] = useState(0);
  const img = p.images[imgIdx] ?? '';

  return (
    <div style={{ fontFamily: 'var(--font-inter)', color: 'var(--dark-text)' }}>

      {/* ── Close row ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 10px' }}>
        <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: 'var(--dark-text)' }}>
          {p.title}
        </span>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ width: 32, height: 32, borderRadius: '50%', background: '#F3F4F6', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* ── Gallery ── */}
      <div style={{ position: 'relative', width: '100%', height: 240, background: p.gradient, overflow: 'hidden', flexShrink: 0 }}>
        {img && (
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        )}
        {/* Status badge */}
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <span style={{ fontFamily: 'var(--font-poppins)', fontSize: 10, fontWeight: 700, background: badgeBg(p.status), color: p.status === 'OFF-PLAN' ? '#111' : '#fff', padding: '4px 10px', borderRadius: 99 }}>
            {p.status}
          </span>
        </div>
        {/* Dot indicators */}
        {p.images.length > 1 && (
          <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 5 }}>
            {p.images.map((_, j) => (
              <button key={j} onClick={() => setImgIdx(j)} aria-label={`Image ${j + 1}`}
                style={{ width: j === imgIdx ? 18 : 7, height: 7, borderRadius: 99, background: j === imgIdx ? '#fff' : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', transition: 'width 0.2s' }} />
            ))}
          </div>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      {p.images.length > 1 && (
        <div style={{ display: 'flex', gap: 7, padding: '10px 16px', background: '#fff', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {p.images.map((src, j) => (
            <button key={j} onClick={() => setImgIdx(j)} aria-label={`Thumbnail ${j + 1}`}
              style={{ width: 58, height: 44, borderRadius: 9, border: `2px solid ${j === imgIdx ? 'var(--primary)' : 'transparent'}`, cursor: 'pointer', backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0, transition: 'border-color 0.2s' }} />
          ))}
        </div>
      )}

      {/* ── Body sections ── */}
      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Price + specs */}
        <Section>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: 'var(--primary)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>
            {p.status}
          </div>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 22, color: 'var(--dark)' }}>
            {formatPrice(p.price, p.price_period)}
          </div>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: 'var(--dark-text)', margin: '4px 0' }}>
            {p.title}
          </div>
          <div style={{ fontSize: 12, color: 'var(--gray)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#E63946"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /></svg>
            {p.location}
          </div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {p.bedrooms > 0  && <Chip>🛏 {p.bedrooms} Bed{p.bedrooms > 1 ? 's' : ''}</Chip>}
            {p.bathrooms > 0 && <Chip>🚿 {p.bathrooms} Bath{p.bathrooms > 1 ? 's' : ''}</Chip>}
            {p.sqm > 0       && <Chip>📐 {p.sqm} sqm</Chip>}
            <Chip>✅ Verified</Chip>
          </div>
        </Section>

        {/* Action buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <ActionBtn
            href={`https://wa.me/2347035374592?text=${p.whatsapp_text || encodeURIComponent(`Hello! I am interested in ${p.title}.`)}`}
            bg="#25D366" color="#fff"
          >📱 WhatsApp</ActionBtn>
          <ActionBtn href="tel:07035374592" bg="var(--primary)" color="#fff">📞 Call Now</ActionBtn>
        </div>

        {/* Description */}
        {p.description && (
          <Section title="Description">
            <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.75 }}>{p.description}</p>
          </Section>
        )}

        {/* Key Features */}
        {p.features.length > 0 && (
          <Section title="Key Features">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {p.features.map((f, i) => (
                <div key={i} style={{ fontSize: 12, background: '#F0FDF4', color: 'var(--dark)', padding: '6px 10px', borderRadius: 8, fontWeight: 500 }}>
                  ✓ {f}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Amenities */}
        {p.amenities.length > 0 && (
          <Section title="Amenities">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
              {p.amenities.map((a, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--gray)', textAlign: 'center' }}>
                  <span style={{ fontSize: 20 }}>{a.i}</span>
                  <span>{a.l}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* TikTok video tour */}
        {p.tiktok_id && (
          <Section title="🎬 Video Tour">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <iframe
                src={`https://www.tiktok.com/embed/v2/${p.tiktok_id}`}
                height={480}
                style={{ width: '100%', border: 0, borderRadius: 12 }}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </Section>
        )}

        {/* Map */}
        <Section title="Neighbourhood Map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15854.68!2d3.35!3d6.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1"
            height={180}
            style={{ width: '100%', border: 0, borderRadius: 12 }}
            allowFullScreen
            loading="lazy"
          />
        </Section>

        {/* Agent */}
        <Section title="Agent">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg,#FFB703,#E63946)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 13, color: '#fff', flexShrink: 0 }}>
              AW
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: 'var(--dark-text)' }}>Al-Wajud Team</div>
              <div style={{ fontSize: 11, color: 'var(--gray)' }}>Licensed Property Agent</div>
              <div style={{ color: 'var(--gold)', fontSize: 11 }}>★★★★★ 5.0</div>
            </div>
          </div>
          <a href="https://wa.me/2347035374592" target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', background: '#F0FDF4', color: 'var(--primary)', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 12, padding: 10, borderRadius: 10, border: '1.5px solid var(--primary)', textDecoration: 'none' }}>
            💬 Chat with Agent
          </a>
        </Section>

        {/* Spacer so last section isn't flush against bottom */}
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

// ── Small shared sub-components ────────────────────────────────────────────────

function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
      {title && (
        <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: 'var(--dark-text)', marginBottom: 12 }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 11, background: '#F3F4F6', color: '#374151', padding: '4px 10px', borderRadius: 99, fontFamily: 'var(--font-inter)' }}>
      {children}
    </span>
  );
}

function ActionBtn({ href, bg, color, children }: { href: string; bg: string; color: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, background: bg, color, fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 12, padding: '10px 8px', borderRadius: 10, textDecoration: 'none' }}>
      {children}
    </a>
  );
}
