'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const DOT28 = 'radial-gradient(circle at 1px 1px,rgba(255,255,255,.05) 1px,transparent 0)';
const DOT22 = 'radial-gradient(circle at 1px 1px,rgba(255,255,255,.04) 1px,transparent 0)';
const WA_LEGAL = 'https://wa.me/2347035374592?text=Hello%20Al-Wajud!%20I%20have%20a%20legal%20question%20about%20buying%20property%20in%20Nigeria.';
const WA_LEGAL_FULL = 'https://wa.me/2347035374592?text=Hello%20Al-Wajud!%20I%20have%20a%20legal%20question%20about%20buying%20property%20in%20Nigeria%20and%20would%20like%20to%20speak%20with%20your%20legal%20consultant.';
const WA_DOCS = 'https://wa.me/2347035374592?text=Hello!%20I%20need%20legal%20document%20assistance.';

const CHECK_ICON = (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const CHECK_ICON_SM = (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

function AccItem({ num, question, open, onToggle, children }: {
  num: string; question: string; open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div style={{ background: '#fff', border: `1.5px solid ${open ? '#1B9954' : '#E5E7EB'}`, borderRadius: 18, overflow: 'hidden', boxShadow: open ? '0 4px 28px rgba(27,153,84,.1)' : 'none', transition: 'border-color .3s,box-shadow .3s' }}>
      <div onClick={onToggle} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 22px', cursor: 'pointer', userSelect: 'none' }}>
        <div style={{ width: 32, height: 32, background: open ? '#1B9954' : '#F3F4F6', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 11, color: open ? '#fff' : '#6B7280', flexShrink: 0, transition: 'background .3s,color .3s' }}>{num}</div>
        <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, color: '#111827', flex: 1, lineHeight: 1.4 }}>{question}</div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={open ? '#1B9954' : '#9CA3AF'} strokeWidth="2.5" style={{ flexShrink: 0, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .3s' }}>
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </div>
      {open && <div style={{ padding: '4px 22px 24px 70px' }}>{children}</div>}
    </div>
  );
}

function CheckList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, margin: '12px 0' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151', lineHeight: 1.65 }}>
          <span style={{ width: 18, height: 18, background: '#1B9954', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>{CHECK_ICON}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <div style={{ background: '#F0FDF4', border: '1px solid #D1FAE5', borderRadius: 10, padding: '12px 16px', fontFamily: 'var(--font-inter)', fontSize: 12, color: '#065F46', lineHeight: 1.7, marginTop: 8 }}>{children}</div>;
}
function Warn({ children, mt }: { children: React.ReactNode; mt?: number }) {
  return <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 10, padding: '12px 16px', fontFamily: 'var(--font-inter)', fontSize: 12, color: '#78350F', lineHeight: 1.7, marginTop: mt ?? 8 }}>{children}</div>;
}

function MobCheckList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7, margin: '8px 0' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontFamily: 'var(--font-inter)', fontSize: 12, color: '#374151', lineHeight: 1.6 }}>
          <span style={{ width: 16, height: 16, background: '#1B9954', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>{CHECK_ICON_SM}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
function MobNote({ children }: { children: React.ReactNode }) {
  return <div style={{ background: '#F0FDF4', border: '1px solid #D1FAE5', borderRadius: 8, padding: '10px 12px', fontFamily: 'var(--font-inter)', fontSize: 11, color: '#065F46', lineHeight: 1.7, marginTop: 6 }}>{children}</div>;
}
function MobWarn({ children }: { children: React.ReactNode }) {
  return <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, padding: '10px 12px', fontFamily: 'var(--font-inter)', fontSize: 11, color: '#78350F', lineHeight: 1.7, marginTop: 6 }}>{children}</div>;
}

const WA_SVG = (size = 16) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M11.997 2C6.477 2 2 6.477 2 12c0 1.99.574 3.846 1.565 5.408L2.046 22l4.72-1.49A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.52 2 11.997 2z"/>
  </svg>
);

const DL_ICON_SVG = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
  </svg>
);

export default function LegalContent() {
  const [openAcc, setOpenAcc] = useState<string | null>(null);
  const [openMob, setOpenMob] = useState<string | null>(null);
  const toggle = (id: string) => setOpenAcc(p => p === id ? null : id);
  const toggleMob = (id: string) => setOpenMob(p => p === id ? null : id);

  return (
    <>
      <Navbar />

      {/* ═══════════════════ PC ═══════════════════ */}
      <div className="hidden lg:block">

        {/* BANNER */}
        <div style={{ background: 'linear-gradient(150deg,#061710 0%,#0a2919 40%,#0F5E36 100%)', padding: '80px 60px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: DOT28, backgroundSize: '28px 28px', pointerEvents: 'none' }} />
          <svg style={{ position: 'absolute', right: 60, top: '50%', transform: 'translateY(-50%)', opacity: .06, pointerEvents: 'none' }} width="420" height="480" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth=".4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, position: 'relative', zIndex: 1 }}>
            <Link href="/" style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,.6)' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,.3)' }}>›</span>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#fff', fontWeight: 600 }}>Legal &amp; Documentation</span>
          </div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 48 }}>
            {/* Left */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(27,153,84,.25)', border: '1px solid rgba(27,153,84,.4)', borderRadius: 99, padding: '6px 14px', marginBottom: 18 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6EE7A4" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 600, color: '#6EE7A4', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Verified &amp; Compliant</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 46, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
                Legal <span style={{ color: '#6EE7A4' }}>&amp; Documentation</span><br/>You Can Trust
              </h1>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(255,255,255,.75)', lineHeight: 1.8, maxWidth: 520 }}>
                Everything a foreign investor or first-time buyer needs to know about property law, title verification and secure transactions in Nigeria — explained clearly.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                <button onClick={() => document.getElementById('accordions')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1B9954', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, padding: '13px 26px', borderRadius: 99, border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(27,153,84,.4)' }}>
                  Read the FAQs
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
                </button>
                <button onClick={() => document.getElementById('downloads')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.25)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, padding: '13px 26px', borderRadius: 99, cursor: 'pointer' }}>
                  Download Samples
                </button>
              </div>
            </div>

            {/* Right — Trust Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
              {[
                { bg: 'rgba(27,153,84,.3)', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6EE7A4" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, label: 'Member Body', val: 'NIESV Certified' },
                { bg: 'rgba(255,183,3,.2)', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFB703" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>, label: 'Documents', val: 'Court-Admissible' },
                { bg: 'rgba(45,122,118,.3)', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7DD3D0" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>, label: 'Transactions', val: 'Escrow Protected' },
                { bg: 'rgba(230,57,70,.2)', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FCA5A5" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label: 'Experience', val: '14+ Years Practice' },
              ].map(c => (
                <div key={c.val} style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, backdropFilter: 'blur(8px)', minWidth: 220 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,.5)', marginBottom: 2 }}>{c.label}</div>
                    <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: '#fff' }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TRUST STRIP */}
        <div style={{ background: '#fff', borderBottom: '1px solid #E5E7EB', padding: '0 60px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {[
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B9954" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, label: 'NIESV Certified', sub: 'Nigerian Inst. of Estate Surveyors' },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B9954" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, label: 'REDAN Member', sub: 'Real Estate Devs. Assoc. Nigeria' },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B9954" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>, label: 'Escrow Services', sub: 'Funds held safely until title clears' },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B9954" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label: '7–14 Day Due Diligence', sub: 'Full title search before any payment' },
            ].map((b, i, arr) => (
              <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 28px', borderRight: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none', flex: 1, justifyContent: 'center' }}>
                {b.icon}
                <div>
                  <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 12, color: '#111827' }}>{b.label}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#6B7280', marginTop: 1 }}>{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACCORDION SECTION */}
        <section id="accordions" style={{ padding: '80px 60px' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>Legal FAQs</div>
            <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 36, color: '#111827', lineHeight: 1.2, marginBottom: 16 }}>Common Questions <span style={{ color: '#1B9954' }}>Answered Clearly</span></h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: '#6B7280', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>Property law in Nigeria is navigable — you just need the right guide. We&apos;ve answered the questions our clients ask most.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 56, alignItems: 'start' }}>
            {/* Accordions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

              <AccItem num="01" question="What documents are required to buy property in Nigeria as a foreigner?" open={openAcc === 'acc1'} onToggle={() => toggle('acc1')}>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#6B7280', lineHeight: 1.8, marginBottom: 12 }}>Foreign nationals can legally acquire property in Nigeria, though there are specific documentation requirements and some ownership structures (e.g. leasehold vs freehold) to be aware of. Here is what you will need:</p>
                <CheckList items={[
                  'Valid international passport and Nigerian entry visa (or proof of residency)',
                  'Tax Identification Number (TIN) registered with the Federal Inland Revenue Service (FIRS)',
                  'Proof of address — utility bill or bank statement dated within 3 months',
                  'Source of funds documentation (bank reference letter or notarised statement)',
                  'Notarised Power of Attorney if purchasing through a proxy or legal representative',
                  'BVN (Bank Verification Number) for naira-denominated transactions',
                  'Completed property acquisition forms (CAC-approved where applicable)',
                ]} />
                <Note>⚖ <strong>Important:</strong> Under Nigeria&apos;s Land Use Act 1978, all land is vested in the State Governor. Foreigners cannot hold outright freehold — instead, you acquire a leasehold right (typically 99 years) via a Certificate of Occupancy. Our legal team handles all of this on your behalf.</Note>
              </AccItem>

              <AccItem num="02" question={`Understanding "Governor's Consent" vs. "Certificate of Occupancy (C of O)"`} open={openAcc === 'acc2'} onToggle={() => toggle('acc2')}>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#6B7280', lineHeight: 1.8, marginBottom: 12 }}>These are the two most important title instruments in Nigerian real estate. Understanding the difference protects you from fraud and incomplete transactions.</p>
                <table style={{ width: '100%', borderCollapse: 'collapse', margin: '12px 0', fontFamily: 'var(--font-inter)', fontSize: 12 }}>
                  <thead>
                    <tr>
                      {['Document', 'What It Means', 'When It Applies'].map(h => (
                        <th key={h} style={{ background: '#F3F4F6', textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: '#111827', borderBottom: '2px solid #E5E7EB' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { doc: <><strong>C of O</strong><br/>(Certificate of Occupancy)</>, meaning: 'Issued by the State Government. Grants exclusive right to occupy & use land for 99 years. The highest title form in Nigeria.', when: 'First-time issuance for a plot of land' },
                      { doc: <><strong>Governor&apos;s Consent</strong></>, meaning: 'When C of O land is sold, the new owner must obtain the Governor\'s formal approval to transfer rights. Without it, the sale is legally incomplete.', when: 'Every subsequent resale of a C of O property' },
                      { doc: <><strong>Deed of Assignment</strong></>, meaning: 'A contract transferring ownership rights between seller and buyer. Must be perfected with Governor\'s Consent to be fully valid.', when: 'Used alongside C of O transfers' },
                      { doc: <><strong>Registered Survey Plan</strong></>, meaning: 'Official survey confirming the land\'s boundaries and coordinates. Required for all title applications.', when: 'All property types' },
                    ].map((row, i, arr) => (
                      <tr key={i}>
                        <td style={{ padding: '8px 12px', borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none', color: '#374151', verticalAlign: 'top', lineHeight: 1.5 }}>{row.doc}</td>
                        <td style={{ padding: '8px 12px', borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none', color: '#374151', verticalAlign: 'top', lineHeight: 1.5 }}>{row.meaning}</td>
                        <td style={{ padding: '8px 12px', borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none', color: '#374151', verticalAlign: 'top', lineHeight: 1.5 }}>{row.when}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Warn>⚠ <strong>Risk Alert:</strong> A property sold with only a Deed of Assignment and no Governor&apos;s Consent is legally vulnerable. The State Government can theoretically reclaim such land. Always insist on seeing — and perfecting — Governor&apos;s Consent before final payment.</Warn>
                <Note>✓ All Al-Wajud Properties listings are verified for clear title before we list them. We will not market a property with an unresolved title issue.</Note>
              </AccItem>

              <AccItem num="03" question="Our Process for Verification and Due Diligence" open={openAcc === 'acc3'} onToggle={() => toggle('acc3')}>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#6B7280', lineHeight: 1.8, marginBottom: 12 }}>Before we recommend any property to a client, it passes through a structured verification process. For diaspora and foreign buyers, we handle every step — you simply review and approve.</p>
                <CheckList items={[
                  <><strong>Step 1 — Title Search at the Land Registry:</strong> We conduct an official search at the State Land Registry to confirm the seller&apos;s ownership and check for any existing encumbrances, court orders or government acquisition notices.</>,
                  <><strong>Step 2 — Survey Plan Verification:</strong> The survey plan is cross-checked with the Office of the Surveyor-General to confirm boundaries and ensure the land is not under a government layout or gazette area.</>,
                  <><strong>Step 3 — Physical Inspection:</strong> Our team conducts an on-site inspection to verify the property matches its description, check for encroachments or disputes with neighbours, and assess structural integrity.</>,
                  <><strong>Step 4 — Legal Opinion:</strong> Our qualified solicitor issues a formal Legal Opinion confirming the title is clean, the seller is who they claim to be, and the property is safe to purchase.</>,
                  <><strong>Step 5 — Contract Drafting &amp; Review:</strong> We prepare or review the Contract of Sale / Deed of Assignment to protect your interests, including payment schedules and penalty clauses.</>,
                  <><strong>Step 6 — Escrow &amp; Payment:</strong> Funds are held in escrow by a licensed third party until all documentation is verified, signed and delivered. No money changes hands on a handshake.</>,
                  <><strong>Step 7 — Title Perfection:</strong> We handle the Governor&apos;s Consent application and registration to ensure your ownership is fully perfected at the Land Registry.</>,
                ]} />
                <Note>⏱ <strong>Timeline:</strong> The full process typically takes 14–45 days depending on the State Land Registry&apos;s processing speed. We keep you updated at every stage via WhatsApp or email.</Note>
              </AccItem>

              <AccItem num="04" question="Multi-Currency Payment Options & Escrow Services" open={openAcc === 'acc4'} onToggle={() => toggle('acc4')}>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#6B7280', lineHeight: 1.8, marginBottom: 12 }}>We understand that diaspora investors and foreign buyers need flexible, secure ways to transact across borders. Here is how we make payments safe and straightforward from anywhere in the world.</p>
                <CheckList items={[
                  <><strong>Currencies Accepted:</strong> Nigerian Naira (NGN), US Dollar (USD), British Pound (GBP), Euro (EUR), Canadian Dollar (CAD), Australian Dollar (AUD)</>,
                  <><strong>Payment Methods:</strong> Direct bank transfer to a domiciliary account, SWIFT wire transfer, escrow service, or agent-facilitated payment in your country of residence</>,
                  <><strong>Escrow Protection:</strong> We partner with licensed Nigerian escrow providers. Your funds are held securely in a dedicated account and only released when all title documents have been verified, signed and handed over.</>,
                  <><strong>Installment Plans:</strong> Select off-plan properties are available on structured payment plans — typically 30% deposit, balance spread over 12–24 months.</>,
                  <><strong>Exchange Rate Guidance:</strong> We advise on CBN-approved exchange rates and the most cost-effective transfer method to minimise conversion losses.</>,
                ]} />
                <Warn>⚠ Never send money to an individual&apos;s personal account. All Al-Wajud transactions go through a registered company account or licensed escrow. Request written confirmation of account details from us directly via the WhatsApp number on this page.</Warn>
              </AccItem>

            </div>

            {/* Sidebar */}
            <div>
              {/* Verified Seal */}
              <div style={{ background: 'linear-gradient(135deg,#0F5E36,#2D7A76)', borderRadius: 18, padding: 24, textAlign: 'center', marginBottom: 16 }}>
                <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'rgba(255,255,255,.15)', border: '3px solid rgba(255,255,255,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                </div>
                <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 14, color: '#fff', marginBottom: 6 }}>Speak to Our Legal Team</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,.7)', lineHeight: 1.6, marginBottom: 16 }}>Have a question not covered above? Chat directly with our legal consultant — available Monday to Saturday, 8 am – 6 pm.</div>
                <button onClick={() => window.open(WA_LEGAL, '_blank')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', background: '#25D366', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, padding: 12, borderRadius: 12, border: 'none', cursor: 'pointer' }}>
                  {WA_SVG(16)} Chat on WhatsApp
                </button>
              </div>

              {/* Related Pages */}
              <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E5E7EB', padding: 24, marginBottom: 16 }}>
                <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1B9954" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  Related Pages
                </div>
                {[
                  { href: '/services', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>, label: 'Our Services Overview' },
                  { href: '/ceo', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, label: 'Meet the CEO' },
                  { href: '/contact', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>, label: 'Book a Consultation' },
                  { href: '/properties', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>, label: 'Browse Verified Properties' },
                ].map((lnk, i, arr) => (
                  <Link key={lnk.href} href={lnk.href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none', fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151', textDecoration: 'none' }}>
                    {lnk.icon}{lnk.label}
                  </Link>
                ))}
              </div>

              {/* Quick Facts */}
              <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E5E7EB', padding: 24 }}>
                <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1B9954" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Quick Facts
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Title search duration', val: '7–14 days', color: '#111827' },
                    { label: 'Gov. Consent processing', val: '30–90 days', color: '#111827' },
                    { label: 'Leasehold term (C of O)', val: '99 years', color: '#111827' },
                    { label: 'Foreigners can buy', val: '✓ Yes', color: '#1B9954' },
                  ].map((f, i, arr) => (
                    <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280' }}>{f.label}</span>
                      <span style={{ fontFamily: 'var(--font-poppins)', fontSize: 12, fontWeight: 700, color: f.color }}>{f.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DOWNLOADS */}
        <section id="downloads" style={{ padding: '72px 60px', background: '#fff', borderTop: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>Resources</div>
              <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 36, color: '#111827', lineHeight: 1.2, marginBottom: 16 }}>Download Sample <span style={{ color: '#1B9954' }}>Documents</span></h2>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#6B7280', maxWidth: 480, lineHeight: 1.7 }}>Review our sample legal documents before entering any transaction. These templates reflect standard Nigerian real estate practice and are provided for your reference.</p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', marginBottom: 4 }}>Need custom documents?</div>
              <button onClick={() => window.open(WA_DOCS, '_blank')} style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: '#1B9954', background: 'none', border: '1.5px solid #1B9954', borderRadius: 99, padding: '9px 20px', cursor: 'pointer' }}>Ask Our Legal Team →</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 36 }}>
            {[
              { href: '/documents/sample-contract-of-sale.pdf', iconBg: 'linear-gradient(135deg,#E63946,#FF6B9D)', iconSvg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>, name: 'Sample Contract of Sale', sub: 'Standard residential property sale agreement' },
              { href: '/documents/sample-deed-of-assignment.pdf', iconBg: 'linear-gradient(135deg,#0F5E36,#2D7A76)', iconSvg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6M9 15l3 3 3-3"/></svg>, name: 'Sample Deed of Assignment', sub: 'Template for transfer of property ownership rights' },
            ].map(card => (
              <a key={card.href} href={card.href} download style={{ background: '#F9FAFB', border: '1.5px solid #E5E7EB', borderRadius: 20, padding: 24, display: 'flex', alignItems: 'center', gap: 18, textDecoration: 'none', color: 'inherit' }}>
                <div style={{ width: 52, height: 52, background: card.iconBg, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{card.iconSvg}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 3 }}>{card.name}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', marginBottom: 8 }}>{card.sub}</div>
                  <span style={{ display: 'inline-block', background: '#F0FDF4', color: '#1B9954', fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 99, border: '1px solid #D1FAE5' }}>PDF · For Reference Only</span>
                </div>
                <div style={{ width: 36, height: 36, background: '#1B9954', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{DL_ICON_SVG}</div>
              </a>
            ))}
          </div>

          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 12, marginTop: 20 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.7 }}><strong style={{ color: '#111827' }}>Disclaimer:</strong> These sample documents are provided for educational and reference purposes only. They do not constitute legal advice and should not be used as final legal instruments without review by a qualified Nigerian solicitor. Al-Wajud Properties can connect you with trusted legal professionals for your specific transaction.</p>
          </div>
        </section>

        {/* CTA */}
        <div style={{ padding: '80px 60px', background: 'linear-gradient(150deg,#061710,#0a2919,#0F5E36)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: DOT22, backgroundSize: '28px 28px', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#6EE7A4', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>Get Personal Guidance</div>
            <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 36, color: '#fff', marginBottom: 14, lineHeight: 1.2 }}>Have Specific Legal Questions?</h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(255,255,255,.75)', lineHeight: 1.8, marginBottom: 32 }}>Our legal consultant handles property law queries from local and diaspora buyers daily. Get clear, straightforward answers — no jargon, no long waits.</p>
            <button onClick={() => window.open(WA_LEGAL_FULL, '_blank')} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#25D366', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, padding: '16px 32px', borderRadius: 99, border: 'none', cursor: 'pointer', boxShadow: '0 8px 32px rgba(37,211,102,.35)' }}>
              {WA_SVG(20)} Chat with Our Legal Consultant
            </button>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,.4)', marginTop: 16 }}>Available Mon–Sat · 8 am – 6 pm WAT · Typically responds within 30 minutes</div>
          </div>
        </div>

      </div>{/* end PC */}

      {/* ═══════════════════ MOBILE ═══════════════════ */}
      <div className="lg:hidden">

        {/* Mobile Hero */}
        <div style={{ background: 'linear-gradient(150deg,#061710,#0a2919,#0F5E36)', padding: '28px 16px 32px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: DOT22, backgroundSize: '22px 22px', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(27,153,84,.25)', border: '1px solid rgba(27,153,84,.4)', borderRadius: 99, padding: '5px 12px', marginBottom: 14 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6EE7A4" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, color: '#6EE7A4', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Verified &amp; Compliant</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 26, color: '#fff', lineHeight: 1.15, marginBottom: 10 }}>Legal &amp; Documentation<br/><span style={{ color: '#6EE7A4' }}>Explained Clearly</span></h1>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,.7)', lineHeight: 1.7, marginBottom: 20 }}>Everything foreign investors and first-time buyers need to know about property law in Nigeria.</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6EE7A4" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, label: 'NIESV Certified' },
                { icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6EE7A4" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>, label: 'Escrow Protected' },
                { icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6EE7A4" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, label: 'REDAN Member' },
              ].map(pill => (
                <div key={pill.label} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,.1)', borderRadius: 99, padding: '5px 10px' }}>
                  {pill.icon}
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,.85)', fontWeight: 600 }}>{pill.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Content */}
        <div style={{ padding: '20px 16px 140px' }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, color: '#1B9954', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 6 }}>Legal FAQs</div>
            <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 20, color: '#111827', marginBottom: 6 }}>Common Questions <span style={{ color: '#1B9954' }}>Answered</span></div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.7 }}>Clear, jargon-free answers from our legal team.</div>
          </div>

          {/* Mobile Accordion 1 */}
          <div style={{ background: '#fff', borderRadius: 16, marginBottom: 10, overflow: 'hidden', border: `1.5px solid ${openMob === 'macc1' ? '#1B9954' : '#E5E7EB'}` }}>
            <div onClick={() => toggleMob('macc1')} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 16, cursor: 'pointer', userSelect: 'none' }}>
              <div style={{ width: 26, height: 26, background: openMob === 'macc1' ? '#1B9954' : '#F3F4F6', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 10, color: openMob === 'macc1' ? '#fff' : '#6B7280', flexShrink: 0, marginTop: 1 }}>01</div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: '#111827', flex: 1, lineHeight: 1.4 }}>Documents required to buy as a foreigner?</div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={openMob === 'macc1' ? '#1B9954' : '#9CA3AF'} strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2, transform: openMob === 'macc1' ? 'rotate(45deg)' : 'none', transition: 'transform .3s' }}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
            {openMob === 'macc1' && (
              <div style={{ padding: '0 16px 16px 54px' }}>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.8, marginBottom: 10 }}>Foreign nationals can legally buy property in Nigeria. You&apos;ll need:</p>
                <MobCheckList items={['Valid international passport & Nigerian visa', 'Tax Identification Number (TIN) from FIRS', 'Proof of address (utility bill or bank statement)', 'Source of funds documentation', 'Notarised Power of Attorney (if buying by proxy)', 'BVN for naira transactions']} />
                <MobNote>⚖ Foreigners acquire a 99-year leasehold (not freehold) under Nigeria&apos;s Land Use Act. We handle all paperwork on your behalf.</MobNote>
              </div>
            )}
          </div>

          {/* Mobile Accordion 2 */}
          <div style={{ background: '#fff', borderRadius: 16, marginBottom: 10, overflow: 'hidden', border: `1.5px solid ${openMob === 'macc2' ? '#1B9954' : '#E5E7EB'}` }}>
            <div onClick={() => toggleMob('macc2')} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 16, cursor: 'pointer', userSelect: 'none' }}>
              <div style={{ width: 26, height: 26, background: openMob === 'macc2' ? '#1B9954' : '#F3F4F6', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 10, color: openMob === 'macc2' ? '#fff' : '#6B7280', flexShrink: 0, marginTop: 1 }}>02</div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: '#111827', flex: 1, lineHeight: 1.4 }}>Governor&apos;s Consent vs. Certificate of Occupancy (C of O)</div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={openMob === 'macc2' ? '#1B9954' : '#9CA3AF'} strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2, transform: openMob === 'macc2' ? 'rotate(45deg)' : 'none', transition: 'transform .3s' }}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
            {openMob === 'macc2' && (
              <div style={{ padding: '0 16px 16px 54px' }}>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.8, marginBottom: 10 }}><strong style={{ color: '#111827' }}>C of O</strong> — Issued by the State Government. Grants exclusive right to use land for 99 years. Highest title form in Nigeria.</p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.8, marginBottom: 10 }}><strong style={{ color: '#111827' }}>Governor&apos;s Consent</strong> — Required every time C of O land is resold. Without it, the transfer is legally incomplete — even if money has changed hands.</p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.8, marginBottom: 10 }}><strong style={{ color: '#111827' }}>Deed of Assignment</strong> — The contract between buyer and seller. Must be perfected with Governor&apos;s Consent.</p>
                <MobWarn>⚠ A property sold without Governor&apos;s Consent is legally at risk. Always insist on perfection before final payment.</MobWarn>
                <div style={{ background: '#F0FDF4', border: '1px solid #D1FAE5', borderRadius: 8, padding: '10px 12px', fontFamily: 'var(--font-inter)', fontSize: 11, color: '#065F46', lineHeight: 1.7, marginTop: 8 }}>✓ All our listings are verified for clear title before we market them.</div>
              </div>
            )}
          </div>

          {/* Mobile Accordion 3 */}
          <div style={{ background: '#fff', borderRadius: 16, marginBottom: 10, overflow: 'hidden', border: `1.5px solid ${openMob === 'macc3' ? '#1B9954' : '#E5E7EB'}` }}>
            <div onClick={() => toggleMob('macc3')} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 16, cursor: 'pointer', userSelect: 'none' }}>
              <div style={{ width: 26, height: 26, background: openMob === 'macc3' ? '#1B9954' : '#F3F4F6', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 10, color: openMob === 'macc3' ? '#fff' : '#6B7280', flexShrink: 0, marginTop: 1 }}>03</div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: '#111827', flex: 1, lineHeight: 1.4 }}>Our Verification &amp; Due Diligence Process</div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={openMob === 'macc3' ? '#1B9954' : '#9CA3AF'} strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2, transform: openMob === 'macc3' ? 'rotate(45deg)' : 'none', transition: 'transform .3s' }}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
            {openMob === 'macc3' && (
              <div style={{ padding: '0 16px 16px 54px' }}>
                <MobCheckList items={[
                  <><strong>1.</strong> Title search at the State Land Registry</>,
                  <><strong>2.</strong> Survey plan verification with Surveyor-General</>,
                  <><strong>3.</strong> Physical site inspection &amp; encroachment check</>,
                  <><strong>4.</strong> Formal legal opinion from qualified solicitor</>,
                  <><strong>5.</strong> Contract drafting &amp; review</>,
                  <><strong>6.</strong> Escrow &amp; secure payment arrangement</>,
                  <><strong>7.</strong> Governor&apos;s Consent &amp; title perfection</>,
                ]} />
                <MobNote>⏱ Full process: 14–45 days. We update you at every stage on WhatsApp.</MobNote>
              </div>
            )}
          </div>

          {/* Mobile Accordion 4 */}
          <div style={{ background: '#fff', borderRadius: 16, marginBottom: 10, overflow: 'hidden', border: `1.5px solid ${openMob === 'macc4' ? '#1B9954' : '#E5E7EB'}` }}>
            <div onClick={() => toggleMob('macc4')} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 16, cursor: 'pointer', userSelect: 'none' }}>
              <div style={{ width: 26, height: 26, background: openMob === 'macc4' ? '#1B9954' : '#F3F4F6', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 10, color: openMob === 'macc4' ? '#fff' : '#6B7280', flexShrink: 0, marginTop: 1 }}>04</div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: '#111827', flex: 1, lineHeight: 1.4 }}>Multi-Currency Payments &amp; Escrow Services</div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={openMob === 'macc4' ? '#1B9954' : '#9CA3AF'} strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2, transform: openMob === 'macc4' ? 'rotate(45deg)' : 'none', transition: 'transform .3s' }}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
            {openMob === 'macc4' && (
              <div style={{ padding: '0 16px 16px 54px' }}>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.8, marginBottom: 10 }}><strong style={{ color: '#111827' }}>Currencies:</strong> NGN, USD, GBP, EUR, CAD, AUD</p>
                <MobCheckList items={['Bank transfer, SWIFT wire, domiciliary account', 'Escrow: funds held until all docs verified & delivered', 'Instalment plans on select off-plan properties', 'CBN-approved exchange rate guidance']} />
                <MobWarn>⚠ Never send funds to a personal account. All Al-Wajud transactions use our registered company account or licensed escrow only.</MobWarn>
              </div>
            )}
          </div>

          {/* Mobile Downloads */}
          <div style={{ marginTop: 32, marginBottom: 24 }}>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, color: '#1B9954', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>Resources</div>
            <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 18, color: '#111827', marginBottom: 16 }}>Sample <span style={{ color: '#1B9954' }}>Documents</span></div>
            {[
              { href: '/documents/sample-contract-of-sale.pdf', iconBg: 'linear-gradient(135deg,#E63946,#FF6B9D)', iconSvg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, name: 'Sample Contract of Sale', sub: 'Standard sale agreement · PDF' },
              { href: '/documents/sample-deed-of-assignment.pdf', iconBg: 'linear-gradient(135deg,#0F5E36,#2D7A76)', iconSvg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6M9 15l3 3 3-3"/></svg>, name: 'Sample Deed of Assignment', sub: 'Ownership transfer template · PDF' },
            ].map(card => (
              <a key={card.href} href={card.href} download style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 14, padding: 14, border: '1.5px solid #E5E7EB', marginBottom: 10, textDecoration: 'none', color: 'inherit' }}>
                <div style={{ width: 44, height: 44, background: card.iconBg, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{card.iconSvg}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: '#111827', marginBottom: 2 }}>{card.name}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#6B7280' }}>{card.sub}</div>
                </div>
                <div style={{ width: 32, height: 32, background: '#1B9954', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
                </div>
              </a>
            ))}
          </div>

          {/* Mobile CTA */}
          <div style={{ background: 'linear-gradient(150deg,#061710,#0a2919,#0F5E36)', borderRadius: 20, padding: 24, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: DOT22, backgroundSize: '22px 22px', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ width: 52, height: 52, background: 'rgba(255,255,255,.1)', borderRadius: '50%', border: '2px solid rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6EE7A4" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              </div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 18, color: '#fff', marginBottom: 8 }}>Have Specific Legal Questions?</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,.7)', marginBottom: 18, lineHeight: 1.7 }}>Chat directly with our legal consultant. Clear answers, no jargon.</div>
              <button onClick={() => window.open(WA_LEGAL, '_blank')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', background: '#25D366', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, padding: 14, borderRadius: 14, border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(37,211,102,.35)' }}>
                {WA_SVG(16)} Chat with Legal Consultant
              </button>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,.4)', marginTop: 10 }}>Mon–Sat · 8 am – 6 pm · Usually replies in 30 min</div>
            </div>
          </div>
        </div>

      </div>{/* end Mobile */}

      <Footer />
    </>
  );
}
