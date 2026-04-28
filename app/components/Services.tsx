import Link from 'next/link';

const SERVICES = [
  {
    cssClass: 'sc-sales',
    iconBg: 'linear-gradient(135deg,#1B9954,#0F5E36)',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    title: 'Property Sales',
    desc: 'We match buyers with premium properties and guide every step of the transaction to completion.',
  },
  {
    cssClass: 'sc-rentals',
    iconBg: 'linear-gradient(135deg,#E63946,#FF6B9D)',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
    title: 'Property Rentals',
    desc: 'Short-let and long-term rentals. We connect landlords with verified, quality tenants seamlessly.',
  },
  {
    cssClass: 'sc-valuation',
    iconBg: 'linear-gradient(135deg,#FFB703,#E63946)',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    title: 'Property Valuation',
    desc: 'Get accurate market valuations backed by data and years of local expertise across Nigerian markets.',
  },
  {
    cssClass: 'sc-advisory',
    iconBg: 'linear-gradient(135deg,#2D7A76,#0F5E36)',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
    title: 'Investment Advisory',
    desc: 'Strategic real estate investment advice to grow your portfolio and maximise returns in Nigeria.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 lg:px-16" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center" style={{ marginBottom: '56px' }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 600, color: 'var(--primary)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>
            What We Offer
          </div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 'clamp(28px,4vw,36px)', color: 'var(--dark-text)', lineHeight: 1.2 }}>
            Our <span style={{ color: 'var(--primary)' }}>Premium</span> Services
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '15px', color: 'var(--gray)', maxWidth: '560px', margin: '12px auto 0', lineHeight: 1.7 }}>
            End-to-end real estate solutions tailored to buyers, sellers, landlords and investors across Nigeria.
          </p>
        </div>

        {/* Desktop 4-column grid */}
        <div className="hidden lg:grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }}>
          {SERVICES.map((s) => (
            <div key={s.title} className={`service-card ${s.cssClass}`}>
              <div className="service-icon" style={{ background: s.iconBg }}>{s.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '16px', color: 'var(--dark-text)', marginBottom: '10px' }}>{s.title}</h3>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--gray)', lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile list */}
        <div className="lg:hidden flex flex-col gap-3">
          {SERVICES.map((s) => (
            <div key={s.title} style={{ background: '#fff', borderRadius: '20px', padding: '22px', boxShadow: '0 4px 16px rgba(0,0,0,.06)', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '52px', height: '52px', background: s.iconBg, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '14px', color: '#111827', marginBottom: '4px' }}>{s.title}</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: '#6B7280', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/services"
            className="inline-block font-bold text-sm px-8 py-4 rounded-full transition-all hover:-translate-y-0.5"
            style={{ fontFamily: 'var(--font-poppins)', background: 'linear-gradient(135deg,var(--accent),#FF6B9D)', color: '#fff', boxShadow: '0 8px 24px rgba(230,57,70,.4)' }}>
            Explore All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
