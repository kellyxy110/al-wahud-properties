'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatPrice, type Property } from '@/app/lib/supabase/types';

function badge(status: Property['status']) {
  switch (status) {
    case 'FOR SALE':      return { bg: '#0F5E36', color: '#fff', label: 'For Sale' };
    case 'FOR RENT':      return { bg: '#E63946', color: '#fff', label: 'For Rent' };
    case 'SHORT LET':     return { bg: '#2D7A76', color: '#fff', label: 'Short Let' };
    case 'OFF-PLAN':      return { bg: '#FFB703', color: '#111', label: 'Off-Plan' };
    case 'LAND FOR SALE': return { bg: '#7C3AED', color: '#fff', label: 'Land For Sale' };
  }
}

// ── Gallery ───────────────────────────────────────────────────────────────────

function Gallery({ images, gradient, tiktok_id }: { images: string[]; gradient: string; tiktok_id: string }) {
  const [idx, setIdx] = useState(0);
  const imgs = images.length > 0 ? images : [''];
  const img  = imgs[idx] ?? '';

  return (
    <div>
      {/* Main image */}
      <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: 'clamp(240px,42vw,520px)', background: gradient, backgroundImage: img ? `url(${img})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {imgs.length > 1 && (
          <>
            <button onClick={() => setIdx(i => (i - 1 + imgs.length) % imgs.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white text-2xl font-bold"
              style={{ background: 'rgba(0,0,0,0.45)', border: 'none', cursor: 'pointer' }}>‹</button>
            <button onClick={() => setIdx(i => (i + 1) % imgs.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white text-2xl font-bold"
              style={{ background: 'rgba(0,0,0,0.45)', border: 'none', cursor: 'pointer' }}>›</button>
          </>
        )}
        {/* Counter */}
        {imgs.length > 1 && (
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-white text-xs font-semibold"
            style={{ background: 'rgba(0,0,0,0.55)', fontFamily: 'var(--font-inter)' }}>
            {idx + 1} / {imgs.length}
          </div>
        )}
      </div>

      {/* Thumbnails — show max 4, then "+N more" */}
      {imgs.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {imgs.slice(0, 4).map((src, j) => (
            <button key={j} onClick={() => setIdx(j)}
              style={{ width: 72, height: 54, borderRadius: 10, flexShrink: 0, cursor: 'pointer',
                backgroundImage: src ? `url(${src})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center',
                background: src ? undefined : gradient,
                border: `2.5px solid ${j === idx ? 'var(--primary)' : 'transparent'}`,
                transition: 'border-color 0.2s' }} />
          ))}
          {imgs.length > 4 && (
            <button onClick={() => setIdx(4)}
              style={{ width: 72, height: 54, borderRadius: 10, flexShrink: 0, cursor: 'pointer',
                background: 'rgba(0,0,0,0.6)', border: '2.5px solid transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13 }}>
              +{imgs.length - 4}
            </button>
          )}
        </div>
      )}

      {/* Action links */}
      <div className="flex gap-3 mt-4 flex-wrap">
        {tiktok_id && (
          <a href={`https://www.tiktok.com/@alwajudproperties/video/${tiktok_id}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold"
            style={{ fontFamily: 'var(--font-poppins)', background: '#010101', color: '#fff', textDecoration: 'none' }}>
            🎥 View Video Tour
          </a>
        )}
        <a href="https://wa.me/2347035374592?text=Hello!%20I'd%20like%20to%20see%20the%20floor%20plan."
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold"
          style={{ fontFamily: 'var(--font-poppins)', background: '#F3F4F6', color: '#374151', textDecoration: 'none' }}>
          📐 View Floor Plan
        </a>
        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold"
          style={{ fontFamily: 'var(--font-poppins)', background: '#F3F4F6', color: '#374151', textDecoration: 'none' }}>
          📍 View on Google Maps
        </a>
      </div>
    </div>
  );
}

// ── Inquiry Form ──────────────────────────────────────────────────────────────

function InquiryForm({ title }: { title: string }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', interest: [] as string[], message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = encodeURIComponent(`Hello! I'm interested in "${title}".\n\nName: ${form.name}\nPhone: ${form.phone}\nInterest: ${form.interest.join(', ')}\n\n${form.message}`);
    window.open(`https://wa.me/2347035374592?text=${text}`, '_blank');
    setSent(true);
  }

  function toggleInterest(v: string) {
    setForm(f => ({
      ...f,
      interest: f.interest.includes(v) ? f.interest.filter(i => i !== v) : [...f.interest, v],
    }));
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', borderRadius: 12, border: '1.5px solid #E5E7EB',
    fontFamily: 'var(--font-inter)', fontSize: 13, outline: 'none', boxSizing: 'border-box',
  };

  if (sent) return (
    <div className="text-center py-10">
      <div style={{ fontSize: '3rem', marginBottom: 12 }}>✅</div>
      <p style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 18, color: 'var(--dark-text)', marginBottom: 6 }}>Inquiry Sent!</p>
      <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: 'var(--gray)' }}>We'll get back to you on WhatsApp shortly.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input required placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} />
        <input type="email" required placeholder="Email Address" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} />
        <input placeholder="Phone Number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={inputStyle} />
        <select value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} style={{ ...inputStyle, background: '#fff', cursor: 'pointer' }}>
          <option value="">Select Country</option>
          {['Nigeria', 'United Kingdom', 'United States', 'Canada', 'UAE', 'Ghana', 'South Africa', 'Other'].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151', marginBottom: 10 }}>I&apos;m interested in:</p>
        <div className="flex gap-4 flex-wrap">
          {['Buying', 'Renting', 'Investment'].map(opt => (
            <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.interest.includes(opt)} onChange={() => toggleInterest(opt)}
                style={{ accentColor: 'var(--primary)', width: 15, height: 15 }} />
              {opt}
            </label>
          ))}
        </div>
      </div>
      <textarea rows={4} placeholder="Your Message" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
        style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
      <button type="submit"
        style={{ padding: '13px 0', borderRadius: 99, background: 'var(--primary)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}>
        Submit Inquiry
      </button>
      <div style={{ textAlign: 'center', fontFamily: 'var(--font-inter)', fontSize: 12, color: 'var(--gray)' }}>OR</div>
      <a href={`https://wa.me/2347035374592?text=${encodeURIComponent(`Hello! I'm interested in "${title}".`)}`}
        target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-3 rounded-full font-bold text-[14px] text-white transition-opacity hover:opacity-90"
        style={{ fontFamily: 'var(--font-poppins)', background: '#25D366', textDecoration: 'none' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Chat on WhatsApp Now
      </a>
    </form>
  );
}

// ── Similar Property Mini-Card ────────────────────────────────────────────────

function SimilarCard({ p }: { p: Property }) {
  const b = badge(p.status);
  const img = p.images[0] ?? '';
  return (
    <Link href={`/properties/${p.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div className="bg-white rounded-[18px] overflow-hidden transition-transform duration-300 hover:-translate-y-1" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
        <div className="relative h-[160px]" style={{ background: p.gradient, backgroundImage: img ? `url(${img})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ fontFamily: 'var(--font-poppins)', background: b.bg, color: b.color }}>{p.status}</span>
        </div>
        <div className="p-4">
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 15, color: 'var(--dark)', marginBottom: 3 }}>
            {formatPrice(p.price, p.price_period)}
          </div>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 12, color: 'var(--dark-text)', marginBottom: 4 }}>{p.title}</div>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'var(--gray)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="#E63946"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/></svg>
            {p.location}
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

interface Props { property: Property; similar: Property[]; }

export default function PropertyDetailClient({ property: p, similar }: Props) {
  const [saved, setSaved] = useState(false);
  const b = badge(p.status);
  const waText = encodeURIComponent(p.whatsapp_text || `Hello! I am interested in "${p.title}". Please send more details.`);

  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-16 py-10">

        {/* Breadcrumb */}
        <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'var(--gray)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Link href="/" style={{ color: 'var(--gray)', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href="/properties" style={{ color: 'var(--gray)', textDecoration: 'none' }}>Properties</Link>
          <span>›</span>
          <span style={{ color: 'var(--dark-text)', fontWeight: 600 }}>{p.title}</span>
        </div>

        {/* ── Top: gallery + info sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 mb-10">

          {/* Gallery */}
          <div>
            <Gallery images={p.images} gradient={p.gradient} tiktok_id={p.tiktok_id} />
          </div>

          {/* Info sidebar */}
          <div>
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)', position: 'sticky', top: 90 }}>
              {/* Price */}
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 'clamp(22px,3vw,28px)', color: 'var(--dark)', marginBottom: 6 }}>
                {formatPrice(p.price, p.price_period)}
              </div>
              {/* Title */}
              <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 'clamp(16px,2vw,20px)', color: 'var(--dark-text)', marginBottom: 8, lineHeight: 1.3 }}>
                {p.title}
              </h1>
              {/* Location */}
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'var(--gray)', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 16 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E63946"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/></svg>
                {p.location}
              </div>
              {/* Specs */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {p.bedrooms  > 0 && <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50" style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151' }}>🛏️ <span><strong>{p.bedrooms}</strong> Bedroom{p.bedrooms > 1 ? 's' : ''}</span></div>}
                {p.bathrooms > 0 && <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50" style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151' }}>🛁 <span><strong>{p.bathrooms}</strong> Bathroom{p.bathrooms > 1 ? 's' : ''}</span></div>}
                {p.sqm       > 0 && <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50" style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151' }}>📐 <span><strong>{p.sqm}</strong> sqm</span></div>}
                <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50" style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151' }}>🚗 <span><strong>2</strong> Parking</span></div>
              </div>
              {/* Status */}
              <div className="mb-5 flex items-center gap-2">
                <span style={{ background: b.bg, color: b.color, fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 11, padding: '4px 12px', borderRadius: 99 }}>{b.label}</span>
                <span style={{ background: '#ECFDF5', color: 'var(--primary)', fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: 11, padding: '4px 12px', borderRadius: 99 }}>✅ Available</span>
              </div>
              {/* CTA buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <a href={`https://wa.me/2347035374592?text=${waText}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-full font-bold text-[13px] text-white hover:opacity-90 transition-opacity"
                  style={{ fontFamily: 'var(--font-poppins)', background: '#25D366', textDecoration: 'none' }}>
                  📱 Inquire on WhatsApp
                </a>
                <a href="tel:07035374592"
                  className="flex items-center justify-center gap-2 py-3 rounded-full font-bold text-[13px] text-white hover:opacity-90 transition-opacity"
                  style={{ fontFamily: 'var(--font-poppins)', background: '#E63946', textDecoration: 'none' }}>
                  📞 Call Now
                </a>
                <a href={`https://wa.me/2347035374592?text=${encodeURIComponent(`Hello! I'd like to schedule a viewing for "${p.title}".`)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-full font-bold text-[13px] text-white hover:opacity-90 transition-opacity"
                  style={{ fontFamily: 'var(--font-poppins)', background: '#2563EB', textDecoration: 'none' }}>
                  📅 Schedule Viewing
                </a>
                <button onClick={() => setSaved(s => !s)}
                  className="flex items-center justify-center gap-2 py-3 rounded-full font-bold text-[13px] w-full transition-colors"
                  style={{ fontFamily: 'var(--font-poppins)', border: `1.5px solid ${saved ? '#E63946' : '#E5E7EB'}`, background: '#fff', color: saved ? '#E63946' : '#374151', cursor: 'pointer' }}>
                  {saved ? '❤️' : '🤍'} {saved ? 'Saved Property' : 'Save Property'}
                </button>
                <button onClick={() => { if (navigator.share) navigator.share({ title: p.title, url: window.location.href }); else navigator.clipboard.writeText(window.location.href); }}
                  className="flex items-center justify-center gap-2 py-3 rounded-full font-bold text-[13px] w-full transition-colors"
                  style={{ fontFamily: 'var(--font-poppins)', border: '1.5px solid #E5E7EB', background: '#fff', color: '#374151', cursor: 'pointer' }}>
                  📤 Share
                </button>
              </div>
              {/* Agent card */}
              <div className="mt-5 pt-5 border-t border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/alwajudlogo.jpeg" alt="Al-Wajud Properties" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid #F3F4F6' }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: 'var(--dark-text)' }}>Al-Wajud Properties</div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'var(--gray)' }}>⭐ 4.9 (127 reviews)</div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'var(--gray)' }}>📞 0703 537 4592</div>
                  </div>
                </div>
                <Link href="/properties"
                  className="flex items-center justify-center w-full py-2 rounded-full font-bold text-[12px] transition-opacity hover:opacity-80"
                  style={{ fontFamily: 'var(--font-poppins)', border: '1.5px solid var(--primary)', color: 'var(--primary)', background: '#fff', textDecoration: 'none' }}>
                  View All Listings
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Description & Features ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 mb-8">
          <div>
            <Section title="About This Property">
              {p.description && (
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#374151', lineHeight: 1.85, marginBottom: p.features.length > 0 ? 20 : 0 }}>
                  {p.description}
                </p>
              )}
              {p.features.length > 0 && (
                <>
                  <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, color: 'var(--dark-text)', marginBottom: 14 }}>Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {p.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 700 }}>✓</span> {f}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Section>

            {/* Amenities */}
            {p.amenities.length > 0 && (
              <Section title="Property Amenities">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {p.amenities.map((a, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textAlign: 'center' }}>
                      <span style={{ fontSize: 28 }}>{a.i}</span>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'var(--gray)' }}>{a.l}</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Neighborhood */}
            <Section title="Neighborhood">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15854.68!2d3.35!3d6.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1"
                height={220} style={{ width: '100%', border: 0, borderRadius: 14, marginBottom: 16 }}
                allowFullScreen loading="lazy" />
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '🏫', label: 'Schools', time: '5 min drive' },
                  { icon: '🏥', label: 'Hospitals', time: '10 min drive' },
                  { icon: '🛒', label: 'Shopping', time: '3 min drive' },
                  { icon: '✈️', label: 'Airport', time: '15 min drive' },
                ].map(n => (
                  <div key={n.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, background: '#F9FAFB' }}>
                    <span style={{ fontSize: 20 }}>{n.icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 12, color: 'var(--dark-text)' }}>{n.label}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'var(--gray)' }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* TikTok */}
            {p.tiktok_id && (
              <Section title="Video Tour">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <iframe
                    src={`https://www.tiktok.com/embed/v2/${p.tiktok_id}`}
                    height={480} style={{ width: '100%', maxWidth: 340, border: 0, borderRadius: 14 }}
                    allow="autoplay; encrypted-media" allowFullScreen />
                </div>
              </Section>
            )}

            {/* Inquiry form */}
            <Section title="Interested? Get in Touch">
              <InquiryForm title={p.title} />
            </Section>
          </div>

          {/* Right spacer on desktop — sidebar is sticky so nothing needed here */}
          <div className="hidden lg:block" />
        </div>

        {/* ── Similar Properties ── */}
        {similar.length > 0 && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 24, color: 'var(--dark-text)', marginBottom: 20 }}>
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {similar.map(s => <SimilarCard key={s.id} p={s} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-6 mb-6" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
      <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 18, color: 'var(--dark-text)', marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid #F3F4F6' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
