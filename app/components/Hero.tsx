'use client';
import { useState } from 'react';
import Link from 'next/link';

const LOCATIONS = ['Ikeja, Lagos', 'Lekki, Lagos', 'Victoria Island, Lagos', 'Abuja FCT', 'Port Harcourt', 'Ibeju-Lekki'];
const TYPES = ['Duplex', 'Flat / Apartment', 'Land', 'Penthouse', 'Commercial'];
const BUDGETS = ['Under ₦50M', '₦50M – ₦120M', '₦120M – ₦300M', '₦300M+'];
const STATUSES = ['For Rent', 'For Sale', 'Short Let', 'Off-Plan'];

export default function Hero() {
  const [location, setLocation] = useState('');
  const [propType, setPropType] = useState('');
  const [budget, setBudget] = useState('');
  const [status, setStatus] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (propType) params.set('type', propType);
    if (budget) params.set('budget', budget);
    if (status) params.set('status', status);
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <>
      <section
        id="hero"
        className="relative overflow-hidden flex items-center lg:min-h-[92vh]"
        style={{
          background: 'linear-gradient(135deg,var(--teal) 0%,var(--teal) 52%,var(--peach) 52%,var(--peach) 100%)',
        }}
      >
        {/* dot pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/svg%3E\")"
        }} />

        {/* ── Desktop layout ── */}
        <div className="hidden lg:flex items-center w-full relative z-10" style={{ padding: '0 60px', gap: '60px' }}>

          {/* Left */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB703"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: '#fff', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>
                Nigeria&apos;s #1 Premium Real Estate
              </span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: '52px', color: '#fff', lineHeight: 1.1, marginBottom: '20px' }}>
              Find Your<br/>
              <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>Dream Home</em><br/>
              in Nigeria
            </h1>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '16px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, maxWidth: '480px', marginBottom: '36px' }}>
              Discover luxury properties across Lagos, Abuja, Port Harcourt and beyond. Trusted by 500+ happy families and investors.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/properties"
                className="inline-block text-white font-bold text-[15px] px-9 py-4 rounded-full transition-transform hover:-translate-y-0.5"
                style={{ fontFamily: 'var(--font-poppins)', background: 'linear-gradient(135deg,var(--accent),#FF6B9D)', boxShadow: '0 8px 24px rgba(230,57,70,0.4)' }}>
                Browse Properties
              </Link>
              <Link href="/ceo"
                className="inline-block font-semibold text-[15px] px-9 py-4 rounded-full transition-colors"
                style={{ fontFamily: 'var(--font-poppins)', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: '#fff', border: '2px solid rgba(255,255,255,0.5)' }}>
                Meet the CEO
              </Link>
            </div>
            <div className="flex gap-8 mt-10">
              {[['500+', 'Happy Clients'], ['₦50B+', 'Properties Sold'], ['14+', 'Years Experience']].map(([val, lbl]) => (
                <div key={lbl}>
                  <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: '28px', color: '#fff' }}>{val}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex-1 flex flex-col gap-4 items-center">
            {/* Featured card */}
            <div className="w-full max-w-[380px] rounded-3xl p-5"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.25)' }}>
              <div className="relative w-full h-[180px] rounded-2xl mb-3.5 overflow-hidden flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,rgba(15,94,54,.6),rgba(27,153,84,.4))' }}>
                <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="1">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span className="absolute top-2.5 left-2.5 text-white text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{ fontFamily: 'var(--font-poppins)', background: 'var(--accent)' }}>FOR RENT</span>
              </div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: '18px', color: '#fff' }}>
                ₦120,000,000 <span style={{ fontSize: '12px', fontWeight: 400, opacity: 0.7 }}>/yr</span>
              </div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'rgba(255,255,255,0.8)', marginTop: '2px' }}>
                Classical Lagos House · Ikeja GRA
              </div>
              <div className="flex gap-2 mt-2.5 flex-wrap">
                {['🛏 3 Beds', '🚿 3 Baths', '🔒 24/7'].map(s => (
                  <span key={s} style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '10px', padding: '3px 8px', borderRadius: '99px', fontFamily: 'var(--font-inter)' }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Search widget */}
            <div style={{ background: 'rgba(255,255,255,0.95)', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', borderRadius: '20px', padding: '16px', width: '100%', maxWidth: '380px' }}>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '14px', color: 'var(--dark-text)', marginBottom: '12px' }}>
                Quick Property Search
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <select value={location} onChange={e => setLocation(e.target.value)} style={{ padding: '10px 12px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-inter)', fontSize: '12px', color: '#374151', background: '#F9FAFB', outline: 'none' }}>
                  <option value="">📍 Location</option>
                  {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                </select>
                <select value={propType} onChange={e => setPropType(e.target.value)} style={{ padding: '10px 12px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-inter)', fontSize: '12px', color: '#374151', background: '#F9FAFB', outline: 'none' }}>
                  <option value="">🏠 Property Type</option>
                  {TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <select value={budget} onChange={e => setBudget(e.target.value)} style={{ padding: '10px 12px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-inter)', fontSize: '12px', color: '#374151', background: '#F9FAFB', outline: 'none' }}>
                  <option value="">💰 Budget Range</option>
                  {BUDGETS.map(b => <option key={b}>{b}</option>)}
                </select>
                <select value={status} onChange={e => setStatus(e.target.value)} style={{ padding: '10px 12px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-inter)', fontSize: '12px', color: '#374151', background: '#F9FAFB', outline: 'none' }}>
                  <option value="">📋 Status</option>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <button onClick={handleSearch} style={{ width: '100%', background: 'linear-gradient(135deg,var(--accent),#FF6B9D)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '13px', border: 'none', borderRadius: '12px', padding: '12px', cursor: 'pointer' }}>
                🔍 Search Properties
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile hero (gradient section only) ── */}
        <div className="lg:hidden w-full px-4 pt-8 pb-11 relative z-10 text-center">
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'rgba(255,255,255,.8)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
            Nigeria&apos;s #1 Premium Real Estate
          </p>
          <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: '28px', color: '#fff', lineHeight: 1.15, marginBottom: '10px' }}>
            Find Your<br/><span style={{ color: 'var(--gold)' }}>Dream Home</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'rgba(255,255,255,.85)', marginBottom: '20px' }}>
            Luxury listings across Lagos &amp; beyond
          </p>
          <Link href="/properties"
            className="inline-block text-white font-bold rounded-full"
            style={{ fontFamily: 'var(--font-poppins)', fontSize: '14px', padding: '14px 28px', background: 'linear-gradient(135deg,var(--accent),#FF6B9D)', boxShadow: '0 6px 20px rgba(230,57,70,.4)' }}>
            Browse Properties
          </Link>
          <div className="flex justify-center gap-7 mt-6">
            <div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: '22px', color: '#fff' }}>500+</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'rgba(255,255,255,.7)' }}>Clients</div>
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,.3)' }} />
            <div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: '22px', color: '#fff' }}>₦50B+</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'rgba(255,255,255,.7)' }}>Transacted</div>
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,.3)' }} />
            <div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: '22px', color: '#fff' }}>14+</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'rgba(255,255,255,.7)' }}>Years</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile search (floats below hero with overlap) ── */}
      <div className="lg:hidden" style={{ margin: '-18px 16px 0', position: 'relative', zIndex: 10 }}>
        <div style={{ background: '#fff', borderRadius: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,.12)', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#374151', background: '#F9FAFB', outline: 'none' }}>
            <option value="">📍 Location</option>
            {LOCATIONS.map(l => <option key={l}>{l}</option>)}
          </select>
          <div style={{ display: 'flex', gap: '8px' }}>
            <select value={propType} onChange={e => setPropType(e.target.value)} style={{ flex: 1, padding: '10px 12px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-inter)', fontSize: '12px', color: '#374151', background: '#F9FAFB', outline: 'none' }}>
              <option value="">🏠 Type</option>
              {TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
            <select value={budget} onChange={e => setBudget(e.target.value)} style={{ flex: 1, padding: '10px 12px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-inter)', fontSize: '12px', color: '#374151', background: '#F9FAFB', outline: 'none' }}>
              <option value="">💰 Budget</option>
              {BUDGETS.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <button onClick={handleSearch} style={{ background: 'linear-gradient(135deg,var(--accent),#FF6B9D)', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
            🔍 Search Now
          </button>
        </div>
      </div>
    </>
  );
}
