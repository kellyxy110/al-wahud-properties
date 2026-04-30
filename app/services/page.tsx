import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Services – Al-Wajud Properties',
  description: 'End-to-end real estate solutions for buyers, sellers, landlords, tenants and investors across Nigeria.',
};

const PATTERN_BG = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E")`;

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      {/* ── Page Banner (PC) ── */}
      <div className="hidden lg:block" style={{ background: 'linear-gradient(135deg,#2D7A76 0%,#2D7A76 52%,#FBC598 52%,#FBC598 100%)', padding: '64px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: PATTERN_BG }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, position: 'relative', zIndex: 1 }}>
          <Link href="/" style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,.7)' }}>Home</Link>
          <span style={{ color: 'rgba(255,255,255,.4)' }}>›</span>
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#fff', fontWeight: 600 }}>Services</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 44, color: '#fff', marginBottom: 10, position: 'relative', zIndex: 1 }}>Our Premium Services</h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(255,255,255,.85)', position: 'relative', zIndex: 1, maxWidth: 560 }}>
          End-to-end real estate solutions for buyers, sellers, landlords, tenants and investors across Nigeria.
        </p>
      </div>

      {/* ── Mobile Banner ── */}
      <div className="lg:hidden" style={{ background: 'linear-gradient(135deg,#2D7A76,#0F5E36)', padding: '24px 16px 32px' }}>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,.7)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 6 }}>What We Offer</p>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 24, color: '#fff', marginBottom: 8 }}>Premium Real Estate<br />Services</h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,.8)' }}>End-to-end property solutions in Nigeria</p>
      </div>

      {/* ── Mobile Service Cards ── */}
      <div className="lg:hidden" style={{ padding: '24px 16px 120px', background: '#F9FAFB' }}>
        {[
          {
            iconBg: 'linear-gradient(135deg,#1B9954,#0F5E36)',
            title: 'Property Sales',
            desc: 'We match buyers with premium verified properties. Full transaction management from search to keys.',
            tag: 'Commission-based · No upfront fees',
            tagColor: '#1B9954',
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            ),
          },
          {
            iconBg: 'linear-gradient(135deg,#E63946,#FF6B9D)',
            title: 'Property Rentals',
            desc: 'Short-let & long-term rentals. We screen tenants & verify landlords for a safe experience.',
            tag: 'Short-let & Long-term Available',
            tagColor: '#E63946',
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            ),
          },
          {
            iconBg: 'linear-gradient(135deg,#FFB703,#E63946)',
            title: 'Property Valuation',
            desc: 'NIESV certified valuations for sales, mortgages and investment decisions.',
            tag: 'From ₦150,000 per valuation',
            tagColor: '#FFB703',
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
              </svg>
            ),
          },
          {
            iconBg: 'linear-gradient(135deg,#2D7A76,#0F5E36)',
            title: 'Investment Advisory',
            desc: 'Portfolio management & strategic advisory for local and diaspora investors.',
            tag: 'Free 30-min Initial Consultation',
            tagColor: '#2D7A76',
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
              </svg>
            ),
          },
        ].map((s) => (
          <div key={s.title} style={{ background: '#fff', borderRadius: 16, padding: '16px', marginBottom: 12, boxShadow: '0 2px 12px rgba(0,0,0,.06)', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{ width: 50, height: 50, background: s.iconBg, borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {s.icon}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 3 }}>{s.title}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.6, marginBottom: 6 }}>{s.desc}</div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontSize: 11, fontWeight: 700, color: s.tagColor }}>{s.tag}</div>
            </div>
          </div>
        ))}
        <a
          href="https://wa.me/2347035374592?text=Hello!%20I%20would%20like%20to%20enquire%20about%20your%20services."
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', background: 'linear-gradient(135deg,#E63946,#FF6B9D)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, borderRadius: '1.5rem', padding: 16, boxShadow: '0 8px 24px rgba(230,57,70,.4)', textDecoration: 'none', marginTop: 8 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          WhatsApp to Enquire
        </a>
      </div>

      {/* ── Services Overview (PC) ── */}
      <section className="hidden lg:block" style={{ padding: '80px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>What We Offer</div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 36, color: '#111827', lineHeight: 1.2, marginBottom: 16 }}>
            Everything You Need in <span style={{ color: '#1B9954' }}>One Place</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: '#6B7280', lineHeight: 1.7, maxWidth: 540, margin: '0 auto' }}>
            From finding your perfect property to handling all legal documentation — we&apos;re with you every step.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          {[
            { borderColor: '#1B9954', iconBg: 'linear-gradient(135deg,#1B9954,#0F5E36)', linkColor: '#1B9954', title: 'Property Sales', desc: 'We match buyers with premium verified properties and manage the transaction from offer to completion.' },
            { borderColor: '#E63946', iconBg: 'linear-gradient(135deg,#E63946,#FF6B9D)', linkColor: '#E63946', title: 'Property Rentals', desc: 'Short-let and long-term rental solutions. We connect verified landlords with quality, screened tenants.' },
            { borderColor: '#FFB703', iconBg: 'linear-gradient(135deg,#FFB703,#E63946)', linkColor: '#FFB703', title: 'Property Valuation', desc: 'Certified, data-backed property valuations for sales, mortgages, insurance and investment decisions.' },
            { borderColor: '#2D7A76', iconBg: 'linear-gradient(135deg,#2D7A76,#0F5E36)', linkColor: '#2D7A76', title: 'Investment Advisory', desc: 'Strategic real estate investment advice to build and grow your property portfolio with maximum ROI.' },
          ].map((s) => (
            <div key={s.title} style={{ background: '#fff', borderRadius: 20, padding: '28px 22px', boxShadow: '0 4px 20px rgba(0,0,0,.07)', cursor: 'pointer', borderTop: `4px solid ${s.borderColor}`, transition: 'transform .3s, box-shadow .3s' }}>
              <div style={{ width: 60, height: 60, borderRadius: 18, background: s.iconBg, marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {s.title === 'Property Sales' && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                )}
                {s.title === 'Property Rentals' && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                )}
                {s.title === 'Property Valuation' && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                )}
                {s.title === 'Investment Advisory' && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                )}
              </div>
              <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#6B7280', lineHeight: 1.7, marginBottom: 16 }}>{s.desc}</p>
              <div style={{ fontFamily: 'var(--font-poppins)', fontSize: 12, fontWeight: 700, color: s.linkColor, display: 'flex', alignItems: 'center', gap: 4 }}>Learn More <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Detailed Service Rows (PC) ── */}
      <section className="hidden lg:block" style={{ background: '#fff', padding: '80px 60px' }}>
        {[
          { dir: 'ltr' as const, visualBg: 'linear-gradient(135deg,#2D7A76,#0F5E36)', badgeText: '✓ 200+ Properties Sold Successfully', badgeColor: '#0F5E36', eyebrow: 'Service 01', title: 'Property Sales & Purchase', desc: 'Our property sales service is fully managed, from the initial search to final handover. We handle pricing strategy, negotiations, legal due diligence and documentation — so you can focus on making the right decision.', points: ['Personalised property search tailored to your exact requirements', 'Professional negotiation to achieve the best market price', 'Full legal and documentation support with trusted solicitors', 'Post-purchase handover and after-sales support'], tag: 'Commission-based — no upfront fees', btn: 'Enquire Now' },
          { dir: 'rtl' as const, visualBg: 'linear-gradient(135deg,#E63946,#FBC598)', badgeText: '✓ 300+ Tenants Placed Successfully', badgeColor: '#E63946', eyebrow: 'Service 02', title: 'Property Rentals & Lettings', desc: "Whether you're a landlord seeking quality tenants or a family looking for the perfect rental, our lettings service covers every angle. We screen all tenants and verify all landlords for a safe, stress-free experience.", points: ['Comprehensive tenant screening and background verification', 'Professional photography and marketing for landlords', 'Rental agreement drafting and legal compliance', 'Ongoing property management support available'], tag: 'Short-let & long-term options available', btn: 'List Your Property' },
          { dir: 'ltr' as const, visualBg: 'linear-gradient(135deg,#FFB703,#E63946)', badgeText: '✓ NIESV Certified Valuers', badgeColor: '#FFB703', eyebrow: 'Service 03', title: 'Property Valuation & Appraisal', desc: 'Accurate property valuation is the foundation of every good real estate decision. Our NIESV-certified valuers use current market data, comparable sales and local expertise to deliver precise, reliable valuations.', points: ['Residential and commercial property valuations', 'NIESV certified reports accepted by banks & courts', 'Fast turnaround — reports delivered within 5 working days', 'Market trend analysis and investment opportunity assessment'], tag: 'Starting from ₦150,000 per valuation', btn: 'Book a Valuation' },
          { dir: 'rtl' as const, visualBg: 'linear-gradient(135deg,#2D7A76,#0F5E36)', badgeText: '✓ ₦10B+ Investment Portfolio Managed', badgeColor: '#2D7A76', eyebrow: 'Service 04', title: 'Investment Advisory & Portfolio Management', desc: "Whether you're a first-time investor or an experienced portfolio holder, our advisory team identifies high-yield opportunities and manages your real estate investments for maximum returns.", points: ['Personalised investment strategy based on your goals & budget', 'Off-plan property and land banking opportunities', 'Diaspora investment desk — invest safely from abroad', 'Annual portfolio reviews and performance reporting'], tag: 'Free initial 30-minute consultation', btn: 'Book Advisory Session' },
        ].map((row, i) => (
          <div key={row.eyebrow} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginBottom: i < 3 ? 80 : 0, direction: row.dir }}>
            <div style={{ borderRadius: 24, height: 380, position: 'relative', overflow: 'hidden', background: row.visualBg, direction: 'ltr' }}>
              <span style={{ position: 'absolute', bottom: 20, left: 20, right: 20, background: 'rgba(255,255,255,.95)', borderRadius: 14, padding: 14, fontFamily: 'var(--font-poppins)', fontSize: 13, fontWeight: 700, color: row.badgeColor, display: 'block' }}>
                {row.badgeText}
              </span>
            </div>
            <div style={{ direction: 'ltr' }}>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>{row.eyebrow}</div>
              <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 28, color: '#111827', marginBottom: 14 }}>{row.title}</h3>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#6B7280', lineHeight: 1.8, marginBottom: 16 }}>{row.desc}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, margin: '16px 0 24px' }}>
                {row.points.map(p => (
                  <li key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151', lineHeight: 1.6 }}>
                    <span style={{ width: 20, height: 20, background: '#1B9954', color: '#fff', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                    {p}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#ECFDF5', borderRadius: 99, padding: '8px 16px' }}>
                <span style={{ fontFamily: 'var(--font-poppins)', fontSize: 13, fontWeight: 700, color: '#1B9954' }}>{row.tag}</span>
              </div>
              <div style={{ marginTop: 20 }}>
                <Link href="/contact" style={{ display: 'inline-block', background: 'linear-gradient(135deg,#E63946,#FF6B9D)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, padding: '16px 36px', borderRadius: 99, boxShadow: '0 8px 24px rgba(230,57,70,.4)', textDecoration: 'none' }}>
                  {row.btn}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Process (PC) ── */}
      <section className="hidden lg:block" style={{ padding: '80px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>How It Works</div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 36, color: '#111827', lineHeight: 1.2 }}>
            Our Simple <span style={{ color: '#1B9954' }}>5-Step Process</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 32, left: '10%', right: '10%', height: 2, background: 'linear-gradient(to right,#1B9954,#2D7A76)' }} />
          {[
            { num: '1', title: 'Initial Consultation', desc: 'Free call to understand your needs, budget and timeline.' },
            { num: '2', title: 'Property Search', desc: 'We curate a shortlist of verified properties matching your criteria.' },
            { num: '3', title: 'Viewings & Offers', desc: 'Guided property viewings and professional negotiation support.' },
            { num: '4', title: 'Legal & Documentation', desc: 'Full legal due diligence, contracts and title verification handled.' },
            { num: '5', title: 'Keys & Handover', desc: 'Smooth handover and post-purchase support from our team.' },
          ].map(s => (
            <div key={s.num} style={{ textAlign: 'center', padding: '0 12px', position: 'relative', zIndex: 1 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#1B9954,#0F5E36)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 16px rgba(27,153,84,.35)' }}>{s.num}</div>
              <h4 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 6 }}>{s.title}</h4>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA (PC) ── */}
      <section className="hidden lg:block" style={{ background: '#fff', padding: '80px 60px' }}>
        <div style={{ background: 'linear-gradient(135deg,#0F5E36,#2D7A76)', borderRadius: 24, padding: 48, textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 30, color: '#fff', marginBottom: 12 }}>Ready to Get Started?</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(255,255,255,.8)', marginBottom: 28, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            Book a free consultation with our expert team today. No obligation, no hidden fees.
          </p>
          <Link href="/contact" style={{ display: 'inline-block', background: 'linear-gradient(135deg,#E63946,#FF6B9D)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, padding: '16px 36px', borderRadius: 99, boxShadow: '0 8px 24px rgba(230,57,70,.4)', textDecoration: 'none' }}>
            Book Free Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
