import React from 'react';

type Cert = {
  icon: React.ReactNode;
  sealBg: string;
  title: string;
  shortTitle: string;
  shortSub: string;
  desc: string;
};

const CERTS: Cert[] = [
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    sealBg: 'linear-gradient(135deg,#FFB703,#E63946)',
    title: 'NIESV Certified',
    shortTitle: 'NIESV',
    shortSub: 'Certified Member',
    desc: 'Nigerian Institution of Estate Surveyors & Valuers Full Member',
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
    sealBg: 'linear-gradient(135deg,#1B9954,#2D7A76)',
    title: 'REDAN Member',
    shortTitle: 'REDAN',
    shortSub: 'Registered Member',
    desc: 'Real Estate Developers Association of Nigeria Registered',
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
    sealBg: 'linear-gradient(135deg,#E63946,#FF6B9D)',
    title: 'CAC Registered',
    shortTitle: 'CAC',
    shortSub: 'Incorporated',
    desc: 'Corporate Affairs Commission Nigeria — Fully Incorporated Business',
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    sealBg: 'linear-gradient(135deg,#2D7A76,#0F5E36)',
    title: 'ISO 9001:2015',
    shortTitle: 'ISO 9001',
    shortSub: 'Quality Certified',
    desc: 'International Quality Management Standard Certified Operations',
  },
];

export default function HomeCertifications() {
  return (
    <section id="certs" className="py-20 px-4 lg:px-[60px]" style={{ background: 'var(--bg)' }}>
      <div>
        <div className="text-center" style={{ marginBottom: '56px' }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 600, color: 'var(--primary)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>
            Accredited &amp; Trusted
          </div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 'clamp(28px,4vw,36px)', color: 'var(--dark-text)', lineHeight: 1.2 }}>
            Our <span style={{ color: 'var(--primary)' }}>Certifications</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '15px', color: 'var(--gray)', maxWidth: '560px', margin: '12px auto 0', lineHeight: 1.7 }}>
            Fully licensed, accredited and certified by Nigeria&apos;s leading real estate regulatory bodies.
          </p>
        </div>

        {/* Desktop 4-column grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {CERTS.map((c) => (
            <div key={c.title} className="cert-card">
              <div className="cert-seal" style={{ background: c.sealBg }}>{c.icon}</div>
              <h4 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '14px', color: 'var(--dark-text)', marginBottom: '6px' }}>{c.title}</h4>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--gray)' }}>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile 2-column grid */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          {CERTS.map((c) => (
            <div key={c.title} style={{ background: '#fff', borderRadius: '16px', padding: '20px', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,.06)' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: c.sealBg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '12px', color: '#111827', marginBottom: '4px' }}>{c.shortTitle}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: '#6B7280' }}>{c.shortSub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
