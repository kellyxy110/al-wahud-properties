import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Meet the CEO – Al-Wajud Properties',
  description: 'Alhaji Sheu Olamide Isiaq — Founder & CEO of Al-Wajud Properties, Nigeria\'s most trusted real estate firm.',
};

const PATTERN_BG = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E")`;

export default function CeoPage() {
  return (
    <>
      <Navbar />

      {/* ── CEO Hero (PC) — matches static ceo-hero layout ── */}
      <div className="hidden lg:grid" style={{
        background: 'linear-gradient(135deg,#2D7A76 0%,#2D7A76 52%,#FBC598 52%,#FBC598 100%)',
        padding: '80px 60px',
        gridTemplateColumns: '1fr 440px',
        gap: 64,
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: PATTERN_BG }} />

        {/* Left — text */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Link href="/" style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,.7)' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,.4)' }}>›</span>
            <Link href="/about" style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,.7)' }}>About</Link>
            <span style={{ color: 'rgba(255,255,255,.4)' }}>›</span>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#fff', fontWeight: 600 }}>The CEO</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.2)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 99, padding: '6px 16px', marginBottom: 20, fontFamily: 'var(--font-inter)', fontSize: 12, color: '#fff', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#FFB703"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Nigeria&apos;s Trusted Real Estate Leader
          </div>
          <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 46, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
            Alhaji Sheu<br /><span style={{ color: '#FFB703' }}>Olamide Isiaq</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(255,255,255,.85)', lineHeight: 1.7, maxWidth: 480, marginBottom: 28 }}>
            CEO &amp; Founder of Al-Wajud Properties Ltd. — with over 14 years of transforming Nigeria&apos;s real estate landscape through integrity, discipline, and a deep understanding of the property market.
          </p>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {[{ num: '14+', lbl: 'Years Experience' }, { num: '500+', lbl: 'Clients Served' }, { num: '₦50B+', lbl: 'Deals Closed' }, { num: '5.0★', lbl: 'Client Rating' }].map(s => (
              <div key={s.lbl}>
                <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 28, color: '#fff' }}>{s.num}</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,.7)', marginTop: 2 }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — CEO avatar card */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(16px)', border: '2px solid rgba(255,255,255,.25)', borderRadius: 28, padding: 28, textAlign: 'center' }}>
            <div style={{ width: 180, height: 180, borderRadius: '50%', background: 'linear-gradient(135deg,#0F5E36,#2D7A76)', margin: '0 auto 16px', border: '5px solid rgba(255,255,255,.4)', boxShadow: '0 12px 40px rgba(0,0,0,.25)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image src="/images/profileimage.jpeg" alt="Alhaji Sheu Olamide Isiaq" width={180} height={180} style={{ objectFit: 'cover', objectPosition: 'top', borderRadius: '50%', width: '100%', height: '100%' }} />
            </div>
            <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 20, color: '#fff', marginBottom: 4 }}>Alhaji Sheu Olamide Isiaq</div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,.8)', marginBottom: 16 }}>CEO &amp; Founder · Al-Wajud Properties Ltd.</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'rgba(255,255,255,.15)', borderRadius: 99, padding: '8px 16px', marginBottom: 20 }}>
              <span style={{ color: '#FFB703', fontSize: 18 }}>★★★★★</span>
              <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: '#fff' }}>5.0 — 500+ Satisfied Clients</span>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 18 }}>
              {['Real Estate Expert', 'Business Leader', 'Community Builder'].map(tag => (
                <span key={tag} style={{ background: 'rgba(255,255,255,.2)', color: '#fff', fontFamily: 'var(--font-inter)', fontSize: 11, padding: '4px 12px', borderRadius: 99 }}>{tag}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <a href="https://wa.me/2347035374592?text=Hello%20Alhaji%20Olamide!%20I%20would%20like%20to%20speak%20with%20you%20directly." target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="mailto:alwajudproperties75@gmail.com"
                style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Banner ── */}
      <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
      <div className="lg:hidden" style={{ background: 'linear-gradient(160deg,#0F5E36,#2D7A76)', padding: '36px 16px 56px', textAlign: 'center' }}>
        <div style={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 14px', border: '4px solid rgba(255,255,255,.5)', boxShadow: '0 12px 40px rgba(0,0,0,.25)', animation: 'float 3.5s ease-in-out infinite' }}>
          <Image src="/images/profileimage.jpeg" alt="Alhaji Sheu Olamide Isiaq" width={120} height={120} style={{ objectFit: 'cover', objectPosition: 'top', width: '100%', height: '100%' }} />
        </div>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,.65)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 6 }}>CEO &amp; Founder</p>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 22, color: '#fff', marginBottom: 6 }}>Alhaji Sheu Olamide Isiaq</h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,.75)', marginBottom: 18 }}>Al-Wajud Properties Ltd. · Lagos, Nigeria</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 12, color: '#fff' }}>14+ Yrs Exp.</span>
          <span style={{ width: 1, height: 14, background: 'rgba(255,255,255,.25)', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 12, color: '#fff' }}>500+ Clients</span>
          <span style={{ width: 1, height: 14, background: 'rgba(255,255,255,.25)', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 12, color: '#FFB703' }}>5.0★ Rating</span>
        </div>
      </div>

      {/* ── Biography (PC) ── */}
      <section className="hidden lg:block" style={{ background: '#fff', padding: '80px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>Biography</div>
            <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 36, color: '#111827', lineHeight: 1.2, marginBottom: 20 }}>
              A Pioneer of <span style={{ color: '#1B9954' }}>Honest Real Estate</span> in Nigeria
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#6B7280', lineHeight: 1.8, marginBottom: 16 }}>
              Alhaji Sheu Olamide Isiaq is a respected businessman and real estate entrepreneur with over 14 years of experience in the industry. His journey is built on discipline, trust, and a deep understanding of the Nigerian property market.
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#6B7280', lineHeight: 1.8, marginBottom: 16 }}>
              He has earned a reputation for integrity, professionalism, and consistent results — qualities that have positioned him as a trusted name among clients both locally and internationally, with a growing client base spanning the UK, Canada, the United States, and Europe.
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#6B7280', lineHeight: 1.8, marginBottom: 24 }}>
              Under his leadership, Al-Wajud Properties has grown from a small Ikeja office into a recognized and reliable brand across Lagos — helping families buy safely, investors grow wealth, and landlords manage assets for maximum ROI.
            </p>
            <div style={{ background: 'linear-gradient(135deg,#0F5E36,#2D7A76)', borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden', marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 100, color: 'rgba(255,255,255,.1)', position: 'absolute', top: -16, left: 14, lineHeight: 1 }}>&ldquo;</div>
              <p style={{ fontFamily: 'var(--font-poppins)', fontSize: 16, fontWeight: 600, color: '#fff', lineHeight: 1.6, fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
                &ldquo;To make property ownership accessible, profitable, and secure for every client.&rdquo;
              </p>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,.7)', marginTop: 12, position: 'relative', zIndex: 1 }}>— Alhaji Sheu Olamide Isiaq, CEO &amp; Founder</div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/contact" style={{ display: 'inline-block', background: 'linear-gradient(135deg,#E63946,#FF6B9D)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, padding: '16px 36px', borderRadius: 99, boxShadow: '0 8px 24px rgba(230,57,70,.4)', textDecoration: 'none' }}>Book a Meeting</Link>
              <a href="https://wa.me/2347035374592?text=Hello%20Alhaji%20Olamide!%20I%20would%20like%20to%20speak%20with%20you%20directly." target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-block', background: 'linear-gradient(135deg,#1B9954,#0F5E36)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, padding: '16px 36px', borderRadius: 99, textDecoration: 'none', boxShadow: '0 8px 24px rgba(27,153,84,.4)' }}>
                WhatsApp Directly
              </a>
            </div>
          </div>

          {/* Profile snapshot */}
          <div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>Profile Snapshot</div>
            <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 36, color: '#111827', lineHeight: 1.2, marginBottom: 20 }}>Quick <span style={{ color: '#1B9954' }}>Overview</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {[
                { lbl: 'Full Name', val: 'Alhaji Sheu Olamide Isiaq' },
                { lbl: 'Title', val: 'CEO & Founder' },
                { lbl: 'Company', val: 'Al-Wajud Properties Ltd.' },
                { lbl: 'Founded', val: '2013' },
                { lbl: 'Location', val: 'Lagos, Nigeria' },
                { lbl: 'Certification', val: 'NIESV Member' },
                { lbl: 'Experience', val: '14+ Years' },
                { lbl: 'Markets', val: 'Lagos, Abuja, PHC' },
              ].map(item => (
                <div key={item.lbl} style={{ background: '#F9FAFB', borderRadius: 14, padding: '14px 16px', borderLeft: '3px solid #1B9954' }}>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, color: '#1B9954', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 4 }}>{item.lbl}</div>
                  <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: '#111827', lineHeight: 1.4 }}>{item.val}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { title: 'Residential Sales', desc: 'Expert in Lagos luxury homes — Lekki, GRA, Ikeja.' },
                { title: 'Investment Strategy', desc: 'Guides diaspora investors to high-ROI Nigerian properties.' },
                { title: 'Property Valuation', desc: 'NIESV-certified valuations accepted by all major banks.' },
                { title: 'Legal & Title', desc: 'Deep expertise in C of O, Governor\'s Consent, and deeds.' },
              ].map(c => (
                <div key={c.title} style={{ background: '#F9FAFB', borderRadius: 16, padding: 18, borderLeft: '4px solid #1B9954' }}>
                  <h4 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: '#111827', marginBottom: 5 }}>{c.title}</h4>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Expertise (PC) ── */}
      <section className="hidden lg:block" style={{ background: 'var(--bg)', padding: '80px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>What He Does Best</div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 36, color: '#111827', lineHeight: 1.2 }}>Core Areas of <span style={{ color: '#1B9954' }}>Expertise</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          {[
            { title: 'Residential Sales', desc: 'Luxury and mid-range residential property transactions across Lagos, Abuja and Port Harcourt.', borderColor: '#1B9954' },
            { title: 'Property Investment', desc: 'Strategic advisory for local and diaspora investors seeking maximum long-term returns in Nigerian real estate.', borderColor: '#E63946' },
            { title: 'Asset Management', desc: 'Full property management for landlords — tenant sourcing, rent collection, maintenance and annual inspections.', borderColor: '#FFB703' },
            { title: 'Diaspora Services', desc: 'Specialist in safely facilitating property purchases for Nigerians in the UK, USA, Canada, and Europe.', borderColor: '#2D7A76' },
            { title: 'Legal & Documentation', desc: 'C of O verification, deed of assignment, property title search and full conveyancing advisory.', borderColor: '#8B5CF6' },
            { title: 'Commercial Property', desc: 'Grade A office spaces, retail outlets and industrial property transactions across Lagos State.', borderColor: '#EC4899' },
          ].map(card => (
            <div key={card.title} style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', borderLeft: `4px solid ${card.borderColor}`, boxShadow: '0 2px 12px rgba(0,0,0,.05)' }}>
              <h4 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 6 }}>{card.title}</h4>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Community Impact (PC) ── */}
      <section className="hidden lg:block" style={{ background: '#fff', padding: '80px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>Beyond Business</div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 36, color: '#111827', lineHeight: 1.2 }}>Community <span style={{ color: '#1B9954' }}>Impact</span></h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: '#6B7280', maxWidth: 520, margin: '12px auto 0', lineHeight: 1.7 }}>Beyond real estate, Alhaji Olamide is deeply committed to developing the communities around him.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          {[
            { icon: '💼', iconBg: '#ECFDF5', title: 'Youth Employment', desc: 'Empowering youth through direct job opportunities within the company and its partner network.' },
            { icon: '🏘️', iconBg: '#FFF3CD', title: 'Social Amenities', desc: 'Supporting local communities through contributions to infrastructure and social development projects.' },
            { icon: '🕌', iconBg: '#E0F2FE', title: 'Mosque Building', desc: 'Contributing to the construction and maintenance of community mosques across Lagos.' },
            { icon: '🤲', iconBg: '#FCE7F3', title: 'Helping the Less Privileged', desc: 'Assisting vulnerable individuals and families through charitable giving and direct support.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,.06)', textAlign: 'center', border: '1px solid #F3F4F6' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: card.iconBg, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>{card.icon}</div>
              <h4 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 6 }}>{card.title}</h4>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Philosophy (PC) ── */}
      <section className="hidden lg:block" style={{ padding: '80px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>His Principles</div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 36, color: '#111827', lineHeight: 1.2 }}>
            What <span style={{ color: '#1B9954' }}>Drives</span> Alhaji Sheu
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {[
            { icon: '🤝', title: 'Integrity First', desc: 'Every deal, every client, every day — honesty is non-negotiable. No hidden fees, no shortcuts, no compromises.' },
            { icon: '🏆', title: 'Excellence Always', desc: 'From the first phone call to the final handover, every interaction must exceed client expectations.' },
            { icon: '🌍', title: 'Community Impact', desc: 'Real estate is about more than transactions — it\'s about building communities and generational wealth for Nigerians.' },
          ].map(v => (
            <div key={v.title} style={{ background: '#fff', borderRadius: 20, padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,.06)', textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{v.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 8 }}>{v.title}</h3>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA (PC) ── */}
      <section className="hidden lg:block" style={{ background: '#fff', padding: '0 60px 80px' }}>
        <div style={{ background: 'linear-gradient(135deg,#0F5E36,#2D7A76)', borderRadius: 24, padding: '56px 48px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 30, color: '#fff', marginBottom: 12 }}>Ready to Work with Alhaji Sheu?</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(255,255,255,.8)', marginBottom: 32, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            Book a free consultation and experience the Al-Wajud difference first-hand.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ display: 'inline-block', background: 'linear-gradient(135deg,#E63946,#FF6B9D)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, padding: '16px 36px', borderRadius: 99, boxShadow: '0 8px 24px rgba(230,57,70,.4)', textDecoration: 'none' }}>
              Book Free Consultation
            </Link>
            <a href="https://wa.me/2347035374592?text=Hello%20Alhaji%20Sheu%2C%20I%20found%20you%20on%20Al-Wajud%20Properties." target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', background: 'rgba(255,255,255,.15)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, padding: '16px 36px', borderRadius: 99, border: '2px solid rgba(255,255,255,.5)', textDecoration: 'none' }}>
              WhatsApp CEO
            </a>
          </div>
        </div>
      </section>

      {/* ── Mobile CEO ── */}
      <div className="lg:hidden" style={{ padding: '0 16px 120px' }}>
        {/* Quote card — overlaps banner */}
        <div style={{ background: 'linear-gradient(135deg,#0F5E36,#2D7A76)', borderRadius: 20, padding: '20px 20px 20px 24px', margin: '-28px 0 14px', position: 'relative', zIndex: 10, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,.15)' }}>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 80, color: 'rgba(255,255,255,.1)', position: 'absolute', top: -10, left: 12, lineHeight: 1 }}>&ldquo;</div>
          <p style={{ fontFamily: 'var(--font-poppins)', fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.6, fontStyle: 'italic', position: 'relative', zIndex: 1, marginBottom: 8 }}>
            &ldquo;To make property ownership accessible, profitable, and secure for every client.&rdquo;
          </p>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,.7)', position: 'relative', zIndex: 1 }}>— Alhaji Sheu Olamide Isiaq, CEO &amp; Founder</div>
        </div>

        {/* Profile Snapshot */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,.07)', marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, color: '#1B9954', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14 }}>Profile Snapshot</div>
          {[
            { lbl: 'Profession', val: 'CEO & Founder, Al-Wajud Properties Ltd.' },
            { lbl: 'Marital Status', val: 'Married · 3 Daughters' },
            { lbl: 'Education', val: 'OND Business Admin / Moshood Abiola Poly' },
            { lbl: 'Global Clients', val: 'UK · USA · Canada · EU' },
          ].map(item => (
            <div key={item.lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#6B7280', flexShrink: 0, marginRight: 8 }}>{item.lbl}</span>
              <span style={{ fontFamily: 'var(--font-poppins)', fontSize: 12, fontWeight: 600, color: '#111827', textAlign: 'right' }}>{item.val}</span>
            </div>
          ))}
        </div>

        {/* About CEO */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,.07)', marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, color: '#1B9954', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12 }}>About the CEO</div>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151', lineHeight: 1.75, marginBottom: 10 }}>
            Alhaji Sheu Olamide Isiaq is a respected businessman and real estate entrepreneur with over 14 years of experience. His journey is built on discipline, trust, and a deep understanding of the Nigerian property market.
          </p>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151', lineHeight: 1.75 }}>
            He has earned a reputation for integrity and consistent results — qualities that have positioned him as a trusted name among clients locally and internationally across the UK, Canada, USA, and Europe.
          </p>
        </div>

        {/* Global Reach */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,.07)', marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, color: '#1B9954', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 10 }}>Global Reach</div>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151', lineHeight: 1.7, marginBottom: 12 }}>
            Al-Wajud Properties serves diaspora clients worldwide, helping Nigerians abroad invest safely back home.
          </p>
          {['Verified property transactions for UK-based Nigerians', 'Trusted by investors in the USA, Canada & Europe', 'Fully remote buying process — no need to travel'].map(pt => (
            <div key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1B9954', flexShrink: 0, marginTop: 4 }} />
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#374151', lineHeight: 1.6 }}>{pt}</span>
            </div>
          ))}
        </div>

        {/* Expertise */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,.07)', marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, color: '#1B9954', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14 }}>Areas of Expertise</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              { label: 'Residential Sales', color: '#1B9954', bg: '#ECFDF5' },
              { label: 'Property Investment', color: '#E63946', bg: '#FEE2E2' },
              { label: 'Asset Management', color: '#92400E', bg: '#FEF3C7' },
              { label: 'Diaspora Services', color: '#1D4ED8', bg: '#EFF6FF' },
              { label: 'Legal & Documentation', color: '#6D28D9', bg: '#EDE9FE' },
              { label: 'Commercial Property', color: '#BE185D', bg: '#FCE7F3' },
            ].map(chip => (
              <span key={chip.label} style={{ background: chip.bg, color: chip.color, fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 99 }}>{chip.label}</span>
            ))}
          </div>
        </div>

        {/* Community & Impact */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,.07)', marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, color: '#1B9954', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14 }}>Community &amp; Impact</div>
          {[
            { icon: '💼', iconBg: '#ECFDF5', title: 'Youth Employment', desc: 'Empowering youth through direct job opportunities within the company and its partner network.' },
            { icon: '🏘️', iconBg: '#FFF3CD', title: 'Social Amenities', desc: 'Supporting local communities through contributions to infrastructure development projects.' },
            { icon: '🕌', iconBg: '#E0F2FE', title: 'Mosque Building', desc: 'Contributing to the construction and maintenance of community mosques across Lagos.' },
            { icon: '🤲', iconBg: '#FCE7F3', title: 'Helping the Less Privileged', desc: 'Assisting vulnerable individuals and families through charitable giving and direct support.' },
          ].map(item => (
            <div key={item.title} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: item.iconBg, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: '#111827', marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Leadership Philosophy */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,.07)', marginBottom: 20 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, color: '#1B9954', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14 }}>Leadership Philosophy</div>
          {[
            { icon: '🤝', iconBg: '#ECFDF5', title: 'Integrity First', desc: 'Every deal, every client, every day — honesty is non-negotiable. No hidden fees, no shortcuts.' },
            { icon: '🏆', iconBg: '#FEE2E2', title: 'Excellence Always', desc: 'From the first call to final handover, every interaction must exceed client expectations.' },
            { icon: '🌍', iconBg: '#FEF3C7', title: 'Community Impact', desc: 'Real estate is about building communities and generational wealth for Nigerians.' },
          ].map(item => (
            <div key={item.title} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: item.iconBg, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: '#111827', marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <Link href="/contact"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', background: 'linear-gradient(135deg,#0F5E36,#1B9954)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, borderRadius: '1.5rem', padding: 16, boxShadow: '0 8px 24px rgba(15,94,54,.4)', textDecoration: 'none', marginBottom: 12 }}>
          📅 Book a Meeting with the CEO
        </Link>
        <a href="https://wa.me/2347035374592?text=Hello%20Alhaji%20Sheu%2C%20I%20found%20you%20on%20Al-Wajud%20Properties." target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', background: '#25D366', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, borderRadius: '1.5rem', padding: 16, boxShadow: '0 8px 24px rgba(37,211,102,.4)', textDecoration: 'none' }}>
          WhatsApp the CEO Directly
        </a>
      </div>

      <Footer />
    </>
  );
}
