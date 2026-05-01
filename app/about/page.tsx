import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'About Us – Al-Wajud Properties',
  description: 'Building Dreams Since 2013 — Nigeria\'s most trusted real estate network built on integrity, excellence and passion.',
};

const PATTERN_BG = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/svg%3E")`;

const WA_SVG = <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;

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
          Building Dreams Since 2010 — Nigeria&apos;s most trusted real estate network built on integrity, excellence and passion.
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
          <div style={{ borderRadius: 24, overflow: 'hidden', height: 520, background: `url('/images/businessinfo2.jpeg') center/cover, linear-gradient(135deg,#2D7A76,#0F5E36)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
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
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ textAlign: 'center' }}>
          {[{ icon: '🏠', num: '500+', lbl: 'Properties Sold' }, { icon: '👥', num: '1,000+', lbl: 'Happy Clients' }, { icon: '🏆', num: '10+', lbl: 'Years Experience' }, { icon: '📍', num: '15+', lbl: 'Locations Covered' }].map((s, i, arr) => (
            <div key={s.lbl} style={{ padding: 24, borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,.15)' : 'none' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 'clamp(28px,4vw,44px)', color: '#fff', lineHeight: 1 }}>{s.num}</div>
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

      {/* ── Meet The CEO (PC) ── */}
      <section className="hidden lg:block" style={{ padding: '80px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>Leadership</div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 36, color: '#111827', lineHeight: 1.2 }}>Meet <span style={{ color: '#1B9954' }}>The CEO</span></h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: '#6B7280', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>The visionary driving Nigeria&apos;s most trusted real estate brand.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: 64, alignItems: 'center' }}>
          <div style={{ borderRadius: 24, overflow: 'hidden', height: 480, position: 'relative', boxShadow: '0 16px 48px rgba(0,0,0,.15)' }}>
            <Image src="/images/profileimage.jpeg" alt="Alhaji Sheu Olamide Isiaq" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
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
                View Full Profile
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <a href="https://wa.me/2347035374592?text=Hello%20Alhaji%20Sheu%2C%20I%20found%20you%20on%20Al-Wajud%20Properties." target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, padding: '14px 24px', borderRadius: 99, textDecoration: 'none', boxShadow: '0 8px 24px rgba(37,211,102,.3)' }}>
                {WA_SVG} WhatsApp CEO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline + Awards (PC) ── */}
      <section className="hidden lg:block" style={{ background: '#fff', padding: '80px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>Our Journey</div>
            <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 36, color: '#111827', lineHeight: 1.2, marginBottom: 16 }}>A Decade of <span style={{ color: '#1B9954' }}>Excellence</span></h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: '#6B7280', lineHeight: 1.7 }}>From a small Lagos office to Nigeria&apos;s most trusted real estate company.</p>
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
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>Awards & Recognition</div>
            <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 36, color: '#111827', lineHeight: 1.2, marginBottom: 16 }}>Industry <span style={{ color: '#1B9954' }}>Recognition</span></h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: '#6B7280', lineHeight: 1.7, marginBottom: 32 }}>Recognised by Nigeria&apos;s most respected real estate and business bodies.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { bg: 'linear-gradient(135deg,#FFB703,#E63946)', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, title: 'Best Real Estate Agency 2023', sub: 'Nigerian Real Estate Excellence Awards' },
                { bg: 'linear-gradient(135deg,#1B9954,#2D7A76)', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: 'Top 10 Property Companies Nigeria 2024', sub: 'BusinessDay Nigeria Annual Rankings' },
                { bg: 'linear-gradient(135deg,#E63946,#FF6B9D)', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>, title: 'Most Trusted Brand Award 2024', sub: 'Lagos Chamber of Commerce & Industry' },
              ].map(a => (
                <div key={a.title} style={{ background: '#fff', borderRadius: 16, padding: 20, display: 'flex', gap: 16, alignItems: 'center', boxShadow: '0 4px 16px rgba(0,0,0,.06)' }}>
                  <div style={{ width: 48, height: 48, background: a.bg, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{a.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: '#111827' }}>{a.title}</div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280' }}>{a.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Certifications (PC) ── */}
      <section className="hidden lg:block" style={{ background: '#fff', padding: '80px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10, textAlign: 'center' }}>Licensed &amp; Certified</div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 36, color: '#111827', lineHeight: 1.2, textAlign: 'center' }}>Our <span style={{ color: '#1B9954' }}>Credentials</span></h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: '#6B7280', lineHeight: 1.7, maxWidth: 600, margin: '12px auto 0', textAlign: 'center' }}>Fully registered, licensed and recognised by Nigeria&apos;s foremost real estate and corporate bodies.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginTop: 40 }}>
          {[
            { iconBg: 'linear-gradient(135deg,#FFB703,#E63946)', icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>, title: 'CAC Registered', sub: 'Corporate Affairs Commission of Nigeria — officially incorporated and registered', badge: '📜 RC: 3395264' },
            { iconBg: 'linear-gradient(135deg,#1B9954,#2D7A76)', icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: 'NIESV Member', sub: 'Nigerian Institution of Estate Surveyors & Valuers — certified professional members', badge: '🏅 Full Member' },
            { iconBg: 'linear-gradient(135deg,#2D7A76,#0F5E36)', icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>, title: 'REDAN Member', sub: 'Real Estate Developers Association of Nigeria — accredited real estate developer member', badge: '🏅 Accredited' },
          ].map(c => (
            <div key={c.title} style={{ background: '#fff', borderRadius: 20, padding: '32px 24px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,.07)', borderTop: '4px solid #1B9954', transition: 'transform .3s' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: c.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>{c.icon}</div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.6 }}>{c.sub}</div>
              <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#1B9954,#0F5E36)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 10, padding: '4px 12px', borderRadius: 99, marginTop: 10 }}>{c.badge}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Offices (PC) ── */}
      <section className="hidden lg:block" style={{ padding: '80px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10, textAlign: 'center' }}>Our Locations</div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 36, color: '#111827', lineHeight: 1.2, textAlign: 'center' }}>Find <span style={{ color: '#1B9954' }}>Our Offices</span></h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: '#6B7280', lineHeight: 1.7, maxWidth: 600, margin: '12px auto 0', textAlign: 'center' }}>Two convenient Lagos locations ready to serve you.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 40 }}>
          {[
            { tag: '📍 Head Office', name: 'Ikeja, Lagos', addr: '112, Adeniyi Jones Avenue, Ikeja, Lagos State, Nigeria', phone: 'tel:07035374592', phoneTxt: '📞 0703 537 4592', waTxt: 'Hello%20Al-Wajud!%20I%20want%20to%20visit%20your%20Ikeja%20office.' },
            { tag: '📍 Branch Office', name: 'Ajala Ijaiye, Lagos', addr: '27, Taiwo Oguntona Street, Ajala Ijaiye, Lagos State, Nigeria', phone: 'tel:07016727604', phoneTxt: '📞 0701 672 7604', waTxt: 'Hello%20Al-Wajud!%20I%20want%20to%20visit%20your%20Ijaiye%20branch.' },
          ].map(o => (
            <div key={o.name} style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,.07)' }}>
              <div style={{ height: 220, overflow: 'hidden' }}>
                <iframe src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.2!2d3.3375!3d6.5800!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(o.addr)}!5e0!3m2!1sen!2sng!4v1`} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ width: '100%', height: '100%', border: 'none', display: 'block' }} />
              </div>
              <div style={{ padding: '20px 24px' }}>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 600, color: '#1B9954', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 6 }}>{o.tag}</div>
                <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 6 }}>{o.name}</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{o.addr}</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                  <a href={o.phone} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 12, color: '#1B9954', background: '#F0FDF4', borderRadius: 99, padding: '7px 14px', textDecoration: 'none' }}>{o.phoneTxt}</a>
                  <a href={`https://wa.me/2347035374592?text=${o.waTxt}`} target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 12, color: '#fff', background: '#25D366', borderRadius: 99, padding: '7px 14px', textDecoration: 'none' }}>💬 WhatsApp</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Strip (PC) ── */}
      <section className="hidden lg:block" style={{ background: '#0F5E36', padding: '80px 60px' }}>
        <div style={{ background: 'linear-gradient(135deg,#0F5E36,#2D7A76)', borderRadius: 24, padding: 48, textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 30, color: '#fff', marginBottom: 12 }}>Let&apos;s Work Together</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(255,255,255,.8)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>Talk to our team today for a free, no-obligation consultation. We&apos;ll guide you every step of the way.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/2347035374592?text=Hello%20Al-Wajud!%20I%27d%20like%20a%20free%20consultation." target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, padding: '16px 32px', borderRadius: 99, textDecoration: 'none', boxShadow: '0 8px 24px rgba(37,211,102,.4)' }}>
              {WA_SVG} 📱 WhatsApp Us
            </a>
            <a href="tel:07035374592" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.15)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, padding: '16px 32px', borderRadius: 99, textDecoration: 'none', border: '2px solid rgba(255,255,255,.5)' }}>
              📞 Call Us Now
            </a>
          </div>
        </div>
      </section>

      {/* ── Mobile Content ── */}
      <div className="lg:hidden" style={{ padding: '28px 16px 120px' }}>

        {/* Story card */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '24px 20px', boxShadow: '0 4px 20px rgba(0,0,0,.07)', marginBottom: 16 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, color: '#1B9954', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>Our Story</div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 20, color: '#111827', marginBottom: 12 }}>Nigeria&apos;s Most Trusted Property Company</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>Founded in 2013 in Ikeja, Lagos with a vision of honest real estate. Today, we&apos;re recognised across Nigeria and the diaspora.</p>
        </div>

        {/* Stats 2×2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {[{ num: '500+', lbl: 'Happy Clients' }, { num: '₦50B+', lbl: 'Transacted' }, { num: '14+', lbl: 'Years' }, { num: '3', lbl: 'States' }].map(s => (
            <div key={s.lbl} style={{ background: '#fff', borderRadius: 16, padding: 16, textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,.06)' }}>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 22, color: '#1B9954' }}>{s.num}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#6B7280', marginTop: 2 }}>{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* CEO section */}
        <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,.07)', marginBottom: 16 }}>
          <div style={{ height: 220, position: 'relative' }}>
            <Image src="/images/profileimage.jpeg" alt="Alhaji Sheu Olamide Isiaq" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
            <div style={{ position: 'absolute', bottom: 12, left: 12, background: '#FFB703', color: '#111', fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 10, padding: '4px 10px', borderRadius: 99 }}>✦ 14+ Years Experience</div>
          </div>
          <div style={{ padding: '16px 20px' }}>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, color: '#1B9954', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 4 }}>Chief Executive Officer</div>
            <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 18, color: '#111827', lineHeight: 1.2, marginBottom: 10 }}>
              Alhaji Sheu<br /><span style={{ color: '#1B9954' }}>Olamide Isiaq</span>
            </div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.7, marginBottom: 14 }}>
              14+ years building Nigeria&apos;s most trusted real estate brand. NIESV certified · REDAN registered · serving clients from Lagos to London.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <Link href="/ceo" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'linear-gradient(135deg,#1B9954,#0F5E36)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 12, padding: '11px 14px', borderRadius: 99, textDecoration: 'none' }}>
                View Full Profile →
              </Link>
              <a href="https://wa.me/2347035374592?text=Hello%20Alhaji%20Sheu%2C%20I%20found%20you%20on%20Al-Wajud%20Properties." target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#25D366', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 12, padding: '11px 14px', borderRadius: 99, textDecoration: 'none' }}>
                {WA_SVG} CEO
              </a>
            </div>
          </div>
        </div>

        {/* Mission / Vision / Values */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '20px 18px', boxShadow: '0 4px 12px rgba(0,0,0,.06)', marginBottom: 16 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, color: '#1B9954', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 6 }}>What Drives Us</div>
          <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 16, color: '#111827', marginBottom: 14 }}>Mission, Vision &amp; Values</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Mission', color: '#1B9954', text: 'To connect Nigerians and diaspora investors with premium verified properties through transparency and excellence.' },
              { label: 'Vision', color: '#E63946', text: 'To be the #1 most trusted real estate brand in West Africa.' },
              { label: 'Values', color: '#FFB703', text: 'Integrity · Transparency · Excellence · Client-First Service.' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, flexShrink: 0, marginTop: 4 }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: item.color, marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.6 }}>{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credentials */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '20px 18px', boxShadow: '0 4px 12px rgba(0,0,0,.06)', marginBottom: 20 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, color: '#1B9954', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>Licensed &amp; Certified</div>
          {[
            { title: 'CAC Registered', badge: 'RC: 3395264', badgeBg: 'linear-gradient(135deg,#FFB703,#E63946)' },
            { title: 'NIESV Member', badge: '🏅 Full Member', badgeBg: 'linear-gradient(135deg,#1B9954,#2D7A76)' },
            { title: 'REDAN Member', badge: '🏅 Accredited', badgeBg: 'linear-gradient(135deg,#2D7A76,#0F5E36)' },
          ].map((c, i, arr) => (
            <div key={c.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 13, color: '#111827' }}>{c.title}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: '#fff', background: c.badgeBg, padding: '4px 10px', borderRadius: 99 }}>{c.badge}</div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a href="https://wa.me/2347035374592?text=Hello%20Al-Wajud!%20I%27d%20like%20a%20free%20consultation." target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', background: '#25D366', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, borderRadius: '1.5rem', padding: 16, boxShadow: '0 8px 24px rgba(37,211,102,.4)', textDecoration: 'none' }}>
            {WA_SVG} WhatsApp Us
          </a>
          <Link href="/contact" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', background: 'linear-gradient(135deg,#E63946,#FF6B9D)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, borderRadius: '1.5rem', padding: 16, boxShadow: '0 8px 24px rgba(230,57,70,.4)', textDecoration: 'none' }}>
            Work With Us
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
