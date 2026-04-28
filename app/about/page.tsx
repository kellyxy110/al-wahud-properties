import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'About Us – Al-Wajud Properties',
  description: 'Building Dreams Since 2013 — Nigeria\'s most trusted real estate network built on integrity, excellence and passion.',
};

const PATTERN_BG = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/svg%3E")`;

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* ── Page Banner (PC) ── */}
      <div className="hidden lg:block" style={{ background: 'linear-gradient(135deg,#2D7A76 0%,#2D7A76 52%,#FBC598 52%,#FBC598 100%)', padding: '64px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: PATTERN_BG }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, position: 'relative', zIndex: 1 }}>
          <Link href="/" style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,.7)' }}>Home</Link>
          <span style={{ color: 'rgba(255,255,255,.4)' }}>›</span>
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#fff', fontWeight: 600 }}>About Us</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 44, color: '#fff', marginBottom: 10, position: 'relative', zIndex: 1 }}>About Al-Wajud Properties</h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(255,255,255,.85)', position: 'relative', zIndex: 1, maxWidth: 560 }}>
          Building Dreams Since 2013 — Nigeria&apos;s most trusted real estate network built on integrity, excellence and passion.
        </p>
      </div>

      {/* ── Mobile Banner ── */}
      <div className="lg:hidden" style={{ background: 'linear-gradient(135deg,#2D7A76,#0F5E36)', padding: '24px 16px 32px' }}>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,.7)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 6 }}>Who We Are</p>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 24, color: '#fff', marginBottom: 8 }}>About Al-Wajud<br />Properties</h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,.8)' }}>Building trust in Nigerian real estate since 2013.</p>
      </div>

      {/* ── Our Story (PC) ── */}
      <section className="hidden lg:block" style={{ padding: '80px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div style={{ borderRadius: 24, overflow: 'hidden', height: 520, background: `url('/images/businessinfo2.jpeg') center/cover, linear-gradient(135deg,#2D7A76,#0F5E36)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 24, right: 24, background: '#FFB703', color: '#111', fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 12, padding: '6px 14px', borderRadius: 99 }}>Est. 2013</div>
            <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, background: 'rgba(255,255,255,.95)', borderRadius: 16, padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[{ num: '500+', lbl: 'Happy Clients' }, { num: '₦50B+', lbl: 'Transacted' }, { num: '14+', lbl: 'Years of Trust' }, { num: '3', lbl: 'States Active' }].map(s => (
                <div key={s.lbl}>
                  <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 22, color: '#0F5E36' }}>{s.num}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#6B7280', marginTop: 2 }}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>Our Story</div>
            <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 36, color: '#111827', lineHeight: 1.2, marginBottom: 20 }}>
              Nigeria&apos;s Most <span style={{ color: '#1B9954' }}>Trusted</span> Property Company
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#6B7280', lineHeight: 1.8, marginBottom: 16 }}>Al-Wajud Properties was founded in 2013 with a single, powerful vision: to make finding a premium property in Nigeria an experience built on trust, transparency and excellence.</p>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#6B7280', lineHeight: 1.8, marginBottom: 16 }}>From humble beginnings in Ikeja, Lagos, we have grown to serve clients across Nigeria and the diaspora — connecting families, investors and businesses with the properties of their dreams.</p>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#6B7280', lineHeight: 1.8, marginBottom: 16 }}>Today, Al-Wajud is recognised as one of Nigeria&apos;s most reputable real estate firms, handling transactions worth billions of Naira annually while maintaining the personal touch that sets us apart.</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, margin: '24px 0' }}>
              {['Fully licensed, NIESV certified and REDAN registered company', 'Every property is personally verified before listing', 'End-to-end service: search, valuation, legal and post-sale support', 'Dedicated diaspora investment desk for overseas buyers'].map(p => (
                <li key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontFamily: 'var(--font-inter)', fontSize: 14, color: '#374151', lineHeight: 1.6 }}>
                  <span style={{ width: 22, height: 22, background: '#1B9954', color: '#fff', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                  {p}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/contact" style={{ display: 'inline-block', background: 'linear-gradient(135deg,#E63946,#FF6B9D)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, padding: '16px 36px', borderRadius: 99, boxShadow: '0 8px 24px rgba(230,57,70,.4)', textDecoration: 'none' }}>Work With Us</Link>
              <Link href="/ceo" style={{ display: 'inline-block', background: 'linear-gradient(135deg,#1B9954,#0F5E36)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, padding: '16px 36px', borderRadius: 99, textDecoration: 'none' }}>Meet the CEO</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div style={{ background: 'linear-gradient(135deg,#0F5E36,#2D7A76)', padding: '56px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', textAlign: 'center' }}>
          {[{ icon: '🏠', num: '500+', lbl: 'Properties Sold' }, { icon: '👥', num: '1,000+', lbl: 'Happy Clients' }, { icon: '🏆', num: '10+', lbl: 'Years Experience' }, { icon: '📍', num: '15+', lbl: 'Locations Covered' }].map((s, i) => (
            <div key={s.lbl} style={{ padding: 24, borderRight: i < 3 ? '1px solid rgba(255,255,255,.15)' : 'none' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 44, color: '#fff', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,.75)', marginTop: 8 }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mission / Vision / Values (PC) ── */}
      <section className="hidden lg:block" style={{ background: '#fff', padding: '80px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>What Drives Us</div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 36, color: '#111827', lineHeight: 1.2 }}>
            Our Mission, <span style={{ color: '#1B9954' }}>Vision</span> &amp; Values
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          <div style={{ borderRadius: 20, padding: '32px 28px', background: 'linear-gradient(135deg,#0F5E36,#2D7A76)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><polyline points="12 16 12.01 16"/></svg>
            </div>
            <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 10 }}>Our Mission</h3>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,.85)', lineHeight: 1.7 }}>To connect Nigerians and diaspora investors with premium verified properties through a process built on complete transparency, integrity and excellence.</p>
          </div>
          <div style={{ borderRadius: 20, padding: '32px 28px', background: 'linear-gradient(135deg,#E63946,#FF6B9D)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M1 6l5 5 6-7 6 7 5-5"/></svg>
            </div>
            <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 10 }}>Our Vision</h3>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,.85)', lineHeight: 1.7 }}>To be the number one most trusted real estate brand in West Africa — setting the gold standard for property transactions across the continent.</p>
          </div>
          <div style={{ borderRadius: 20, padding: '32px 28px', background: '#F9FAFB', border: '1.5px solid #E5E7EB' }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, background: 'linear-gradient(135deg,#FFB703,#E63946)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 18, color: '#111827', marginBottom: 10 }}>Our Values</h3>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>Integrity · Transparency · Excellence · Client-First Service · Innovation in Real Estate Technology.</p>
          </div>
        </div>
      </section>

      {/* ── Meet the CEO (PC) ── */}
      <section className="hidden lg:block" style={{ padding: '80px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>Leadership</div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 36, color: '#111827', lineHeight: 1.2 }}>Meet <span style={{ color: '#1B9954' }}>The CEO</span></h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: '#6B7280', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>The visionary driving Nigeria&apos;s most trusted real estate brand.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: 64, alignItems: 'center' }}>
          <div style={{ borderRadius: 24, overflow: 'hidden', height: 480, position: 'relative', boxShadow: '0 16px 48px rgba(0,0,0,.15)', background: 'linear-gradient(135deg,#0F5E36,#2D7A76)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 72, color: 'rgba(255,255,255,.25)' }}>AS</div>
            <div style={{ position: 'absolute', bottom: 20, left: 20, background: 'rgba(255,255,255,.96)', borderRadius: 99, padding: '8px 18px', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: '#0F5E36', boxShadow: '0 4px 16px rgba(0,0,0,.1)' }}>✦ 14+ Years Experience</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>Chief Executive Officer</div>
            <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 34, color: '#111827', lineHeight: 1.15, marginBottom: 14 }}>Alhaji Sheu<br /><span style={{ color: '#1B9954' }}>Olamide Isiaq</span></h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              {['🏛️ NIESV Certified', '📋 REDAN Registered', '🌍 Global Reach'].map(tag => (
                <span key={tag} style={{ background: '#F0FDF4', color: '#1B9954', fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 99, border: '1px solid #D1FAE5' }}>{tag}</span>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#6B7280', lineHeight: 1.85, marginBottom: 14 }}>With over <strong style={{ color: '#111827' }}>14 years</strong> at the helm of Al-Wajud Properties, Alhaji Sheu Olamide Isiaq has built one of Nigeria&apos;s most trusted real estate brands from the ground up. His unwavering commitment to integrity and client satisfaction has made him a recognised name across Nigeria&apos;s property industry.</p>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#6B7280', lineHeight: 1.85, marginBottom: 28 }}>From Lagos to London, Toronto to Texas — his expertise spans global markets, guiding diaspora investors to own property safely and profitably in Nigeria.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
              {[{ num: '500+', lbl: 'Clients Served' }, { num: '14+', lbl: 'Years Experience' }, { num: '₦50B+', lbl: 'Transacted' }].map(s => (
                <div key={s.lbl} style={{ background: '#F9FAFB', borderRadius: 16, padding: 16, textAlign: 'center', border: '1px solid #E5E7EB' }}>
                  <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 22, color: '#0F5E36' }}>{s.num}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#6B7280', marginTop: 2 }}>{s.lbl}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/ceo" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#1B9954,#0F5E36)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, padding: '14px 28px', borderRadius: 99, textDecoration: 'none', boxShadow: '0 8px 24px rgba(27,153,84,.35)' }}>
                View Full Profile →
              </Link>
              <a href="https://wa.me/2347035374592?text=Hello%20Alhaji%20Sheu%2C%20I%20found%20you%20on%20Al-Wajud%20Properties." target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, padding: '14px 24px', borderRadius: 99, textDecoration: 'none', boxShadow: '0 8px 24px rgba(37,211,102,.3)' }}>
                WhatsApp CEO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline (PC) ── */}
      <section className="hidden lg:block" style={{ background: '#fff', padding: '80px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>Our Journey</div>
            <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 36, color: '#111827', lineHeight: 1.2, marginBottom: 16 }}>A Decade of <span style={{ color: '#1B9954' }}>Excellence</span></h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: '#6B7280', lineHeight: 1.7, maxWidth: 600 }}>From a small Lagos office to Nigeria&apos;s most trusted real estate company.</p>
            <div style={{ position: 'relative', padding: '0 0 0 32px', marginTop: 40 }}>
              <div style={{ position: 'absolute', left: 8, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom,#1B9954,#2D7A76)' }} />
              {[
                { year: '2013', title: 'Al-Wajud Properties Founded', desc: 'Started operations in Ikeja, Lagos with a team of 3 and a vision of honest real estate.' },
                { year: '2015', title: 'NIESV Certification Obtained', desc: 'Became fully certified by the Nigerian Institution of Estate Surveyors & Valuers.' },
                { year: '2017', title: 'Expanded to Abuja FCT', desc: 'Opened our Abuja office and began serving clients in the FCT and surrounding areas.' },
                { year: '2020', title: 'Launched Diaspora Desk', desc: 'Created dedicated service for Nigerians abroad looking to invest in Nigeria real estate.' },
                { year: '2023', title: '₦50 Billion Milestone', desc: 'Crossed ₦50B in total property transactions. 500+ happy families served nationwide.' },
                { year: '2025', title: 'ISO 9001:2015 Certified', desc: 'Achieved international quality management certification — the first in our sector in Nigeria.' },
              ].map(item => (
                <div key={item.year} style={{ position: 'relative', marginBottom: 40, paddingLeft: 24 }}>
                  <div style={{ position: 'absolute', left: -28, top: 4, width: 16, height: 16, borderRadius: '50%', background: '#1B9954', border: '3px solid #fff', boxShadow: '0 0 0 3px #1B9954' }} />
                  <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 13, color: '#1B9954', marginBottom: 4 }}>{item.year}</div>
                  <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>Our Certifications</div>
            <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 36, color: '#111827', lineHeight: 1.2, marginBottom: 16 }}>Trusted & <span style={{ color: '#1B9954' }}>Certified</span></h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: '#6B7280', lineHeight: 1.7 }}>Every client is protected by our industry certifications and legal registrations.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginTop: 40 }}>
              {[
                { icon: '🏅', title: 'NIESV Certified', sub: 'Nigerian Institution of Estate Surveyors & Valuers member firm.', badge: 'Since 2015' },
                { icon: '📋', title: 'CAC Registered', sub: 'Fully registered with the Corporate Affairs Commission.', badge: 'RC No. 1234567' },
                { icon: '🌍', title: 'ISO 9001:2015', sub: 'International quality management system certification.', badge: 'Since 2025' },
              ].map(c => (
                <div key={c.title} style={{ background: '#fff', borderRadius: 20, padding: '32px 24px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,.07)', borderTop: '4px solid #1B9954', transition: 'transform .3s' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#FFB703,#E63946)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 28 }}>{c.icon}</div>
                  <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 6 }}>{c.title}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.6 }}>{c.sub}</div>
                  <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#1B9954,#0F5E36)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 10, padding: '4px 12px', borderRadius: 99, marginTop: 10 }}>{c.badge}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Content ── */}
      <div className="lg:hidden" style={{ padding: '28px 16px 120px' }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: '24px 20px', boxShadow: '0 4px 20px rgba(0,0,0,.07)', marginBottom: 16 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, color: '#1B9954', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>Our Story</div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 20, color: '#111827', marginBottom: 12 }}>Nigeria&apos;s Most Trusted Property Company</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>Founded in 2013 in Ikeja, Lagos with a vision of honest real estate. Today, we&apos;re recognised across Nigeria and the diaspora.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {[{ num: '500+', lbl: 'Happy Clients' }, { num: '₦50B+', lbl: 'Transacted' }, { num: '14+', lbl: 'Years' }, { num: '3', lbl: 'States' }].map(s => (
            <div key={s.lbl} style={{ background: '#fff', borderRadius: 16, padding: 16, textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,.06)' }}>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 22, color: '#1B9954' }}>{s.num}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#6B7280', marginTop: 2 }}>{s.lbl}</div>
            </div>
          ))}
        </div>
        <Link href="/contact" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', background: 'linear-gradient(135deg,#E63946,#FF6B9D)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, borderRadius: '1.5rem', padding: 16, boxShadow: '0 8px 24px rgba(230,57,70,.4)', textDecoration: 'none' }}>
          Work With Us
        </Link>
      </div>

      <Footer />
    </>
  );
}
