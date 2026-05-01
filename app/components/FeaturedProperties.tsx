import Link from 'next/link';
import { createClient } from '@/app/lib/supabase/server';
import { formatPrice, type Property } from '@/app/lib/supabase/types';
import { FEATURED_PROPERTIES, type Property as StaticProperty } from '@/app/lib/data';

function badgeStyle(status: Property['status']): { bg: string; color: string } {
  switch (status) {
    case 'FOR SALE':      return { bg: '#0F5E36', color: '#fff' };
    case 'FOR RENT':      return { bg: '#E63946', color: '#fff' };
    case 'SHORT LET':     return { bg: '#2D7A76', color: '#fff' };
    case 'OFF-PLAN':      return { bg: '#FFB703', color: '#111' };
    case 'LAND FOR SALE': return { bg: '#7C3AED', color: '#fff' };
  }
}

function PropertyCard({ p }: { p: Property }) {
  const badge = badgeStyle(p.status);
  const img = p.images[0] ?? '';

  return (
    <Link href={`/properties/${p.id}`} className="block group">
      <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.07)] transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
        <div
          className="relative w-full h-[210px]"
          style={{
            backgroundImage: img ? `url(${img}), ${p.gradient}` : p.gradient,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{ fontFamily: 'var(--font-poppins)', background: badge.bg, color: badge.color }}
              >
                {p.status}
              </span>
              {p.featured && (
                <span
                  className="text-[9px] font-extrabold px-2.5 py-1 rounded-full self-start"
                  style={{ fontFamily: 'var(--font-poppins)', background: 'rgba(255,183,3,0.95)', color: '#111' }}
                >
                  ⭐ FEATURED
                </span>
              )}
            </div>
            <button className="prop-fav" aria-label="Save property">❤️</button>
          </div>
        </div>
        <div className="p-4">
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: '17px', color: 'var(--dark)' }}>
            {formatPrice(p.price, p.price_period)}
          </div>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: '13px', color: 'var(--dark-text)', margin: '4px 0 6px' }}>
            {p.title}
          </div>
          <div className="flex items-center gap-1" style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--gray)' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#E63946"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /></svg>
            {p.location}
          </div>
          <div className="flex gap-1.5 mt-2.5 flex-wrap">
            {p.bedrooms > 0 && <span className="spec-chip" style={{ fontFamily: 'var(--font-inter)' }}>🛏 {p.bedrooms} Beds</span>}
            {p.bathrooms > 0 && <span className="spec-chip" style={{ fontFamily: 'var(--font-inter)' }}>🚿 {p.bathrooms} Baths</span>}
            {p.sqm > 0 && <span className="spec-chip" style={{ fontFamily: 'var(--font-inter)' }}>📐 {p.sqm} sqm</span>}
            <span className="spec-chip" style={{ fontFamily: 'var(--font-inter)' }}>✅ Verified</span>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#FFB703,#E63946)' }}>AW</div>
              <div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', fontWeight: 600, color: '#374151' }}>Al-Wajud Team</div>
                <div style={{ color: 'var(--gold)', fontSize: '10px' }}>★★★★★</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-white px-3.5 py-1.5 rounded-full"
              style={{ fontFamily: 'var(--font-poppins)', background: 'var(--primary)' }}>View →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function StaticBadgeStyle(status: StaticProperty['status']): { bg: string; color: string } {
  switch (status) {
    case 'FOR SALE':      return { bg: '#0F5E36', color: '#fff' };
    case 'FOR RENT':      return { bg: '#E63946', color: '#fff' };
    case 'SHORT LET':     return { bg: '#2D7A76', color: '#fff' };
    case 'OFF-PLAN':      return { bg: '#FFB703', color: '#111' };
    case 'LAND FOR SALE': return { bg: '#7C3AED', color: '#fff' };
  }
}

function renderStars(rating: number) {
  const full = Math.floor(rating);
  const hasPartial = rating < 5;
  return (
    <>
      <span style={{ color: 'var(--gold)' }}>{'★'.repeat(full)}</span>
      {hasPartial && <span style={{ color: '#D1D5DB' }}>★</span>}
      <span style={{ color: 'var(--gold)' }}> {rating.toFixed(1)}</span>
    </>
  );
}

function StaticPropertyCard({ p }: { p: StaticProperty }) {
  const badge = StaticBadgeStyle(p.status);
  const agentGradient = p.agentGradient ?? 'linear-gradient(135deg,#FFB703,#E63946)';
  const agentInitials = p.agentInitials ?? 'AW';
  const agentName = p.agentName ?? 'Al-Wajud Team';
  const agentRating = p.agentRating ?? 5.0;

  return (
    <Link href="/properties" className="block group">
      <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.07)] transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
        <div
          className="relative w-full h-[210px]"
          style={{
            backgroundImage: p.img ? `url(${p.img}), ${p.gradient}` : p.gradient,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{ fontFamily: 'var(--font-poppins)', background: badge.bg, color: badge.color }}>
                {p.status}
              </span>
              {p.featured && (
                <span className="text-[9px] font-extrabold px-2.5 py-1 rounded-full self-start"
                  style={{ fontFamily: 'var(--font-poppins)', background: 'rgba(255,183,3,0.95)', color: '#111' }}>
                  ⭐ FEATURED
                </span>
              )}
            </div>
            <button className="prop-fav" aria-label="Save property">❤️</button>
          </div>
        </div>
        <div className="p-4">
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: '17px', color: 'var(--dark)' }}>
            {p.price}{p.period}
          </div>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: '13px', color: 'var(--dark-text)', margin: '4px 0 6px' }}>
            {p.title}
          </div>
          <div className="flex items-center gap-1" style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--gray)' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#E63946"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /></svg>
            {p.location}
          </div>
          <div className="flex gap-1.5 mt-2.5 flex-wrap">
            {p.beds > 0 && <span className="spec-chip" style={{ fontFamily: 'var(--font-inter)' }}>🛏 {p.beds} Beds</span>}
            {p.baths > 0 && <span className="spec-chip" style={{ fontFamily: 'var(--font-inter)' }}>🚿 {p.baths} Baths</span>}
            {p.sqm > 0 && <span className="spec-chip" style={{ fontFamily: 'var(--font-inter)' }}>📐 {p.sqm} sqm</span>}
            <span className="spec-chip" style={{ fontFamily: 'var(--font-inter)' }}>✅ Verified</span>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{
                  background: agentGradient,
                  border: p.agentBorderColor ? `2px solid ${p.agentBorderColor}` : undefined,
                }}>
                {agentInitials}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', fontWeight: 600, color: '#374151' }}>{agentName}</div>
                <div style={{ fontSize: '10px' }}>{renderStars(agentRating)}</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-white px-3.5 py-1.5 rounded-full"
              style={{ fontFamily: 'var(--font-poppins)', background: 'var(--primary)' }}>View →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function FeaturedProperties() {
  const supabase = await createClient();
  let properties: unknown[] | null = null;
  try {
    const { data } = await supabase
      .from('properties')
      .select('*')
      .eq('featured', true)
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(6);
    properties = data;
  } catch {
    // network/config error — fall through to static fallback below
  }

  const hasSupabaseData = properties && properties.length >= 3;

  return (
    <section id="listings" className="pt-7 pb-8 px-4 lg:py-20 lg:px-[60px] bg-[var(--bg)] lg:bg-white">
      <div>
        <div className="text-center mb-6 lg:mb-14">
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 600, color: 'var(--primary)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>
            Premium Selection
          </div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 'clamp(28px,4vw,36px)', color: 'var(--dark-text)', lineHeight: 1.2, marginBottom: '12px' }}>
            Featured <span style={{ color: 'var(--primary)' }}>Listings</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '15px', color: 'var(--gray)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Hand-picked luxury properties verified by our expert team. All prices in Nigerian Naira.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasSupabaseData
            ? (properties as Property[]).map(p => <PropertyCard key={p.id} p={p} />)
            : FEATURED_PROPERTIES.slice(0, 3).map(p => <StaticPropertyCard key={p.id} p={p} />)
          }
        </div>

        <div className="text-center mt-1 lg:mt-10">
          <Link
            href="/properties"
            className="inline-block font-bold text-[15px] px-10 py-4 rounded-full text-white transition-transform hover:-translate-y-0.5"
            style={{ fontFamily: 'var(--font-poppins)', background: 'linear-gradient(135deg,var(--accent),#FF6B9D)', boxShadow: '0 8px 24px rgba(230,57,70,0.4)' }}
          >
            View All Properties →
          </Link>
        </div>
      </div>
    </section>
  );
}
