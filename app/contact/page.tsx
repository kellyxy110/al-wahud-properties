import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Contact – Al-Wajud Properties',
  description: "We're here to help you find your dream property. Free consultation — no obligation, no hidden fees.",
};

const PATTERN_BG = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E")`;

const FAQS = [
  { q: 'How do I start working with Al-Wajud Properties?', a: 'Simply contact us via WhatsApp, call or the form below. We\'ll schedule a free consultation at a time that suits you.' },
  { q: 'Do you charge any upfront fees?', a: 'No. Our property sales service is fully commission-based — you only pay when a deal is completed. Valuation services have a fixed fee quoted upfront.' },
  { q: 'Can I buy property in Nigeria from abroad?', a: 'Absolutely. Our diaspora desk handles everything remotely — title search, escrow, virtual tours and legal representation. We\'ve served clients in the UK, USA, Canada and Europe.' },
  { q: 'How long does a property transaction take?', a: 'Typically 4–12 weeks depending on the type of property and transaction. We\'ll give you a realistic timeline at your initial consultation.' },
  { q: 'Are your listings verified?', a: 'Yes. Every property on our platform is personally verified by our team — title check, site inspection and seller identity confirmed before listing.' },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      {/* ── Page Banner (PC) ── */}
      <div className="hidden lg:block" style={{ background: 'linear-gradient(135deg,#2D7A76 0%,#2D7A76 52%,#FBC598 52%,#FBC598 100%)', padding: '64px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: PATTERN_BG }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, position: 'relative', zIndex: 1 }}>
          <Link href="/" style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,.7)' }}>Home</Link>
          <span style={{ color: 'rgba(255,255,255,.4)' }}>›</span>
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#fff', fontWeight: 600 }}>Contact</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 44, color: '#fff', marginBottom: 10, position: 'relative', zIndex: 1 }}>Get In Touch</h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(255,255,255,.85)', position: 'relative', zIndex: 1, maxWidth: 560 }}>
          We&apos;re here to help you find your dream property. Free consultation — no obligation, no hidden fees.
        </p>
      </div>

      {/* ── Mobile Banner ── */}
      <div className="lg:hidden" style={{ background: 'linear-gradient(135deg,#2D7A76,#0F5E36)', padding: '24px 16px 32px' }}>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,.7)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 6 }}>Reach Us</p>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 24, color: '#fff', marginBottom: 8 }}>Get In Touch</h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,.8)' }}>Free consultation — no obligation required</p>
      </div>

      {/* ── Contact Layout (PC) ── */}
      <div className="hidden lg:grid" style={{ gridTemplateColumns: '1fr 480px', gap: 56, padding: '72px 60px', alignItems: 'start' }}>
        {/* Info side */}
        <div>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>Contact Details</div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 32, color: '#111827', lineHeight: 1.2, marginBottom: 14 }}>We&apos;d Love to <span style={{ color: '#1B9954' }}>Hear From You</span></h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#6B7280', lineHeight: 1.8, marginBottom: 32 }}>Whether you&apos;re buying, renting or investing — our team is ready to assist. Reach us via phone, WhatsApp, email or visit either of our Lagos offices.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
            {[
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.72A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14z"/></svg>, iconBg: 'linear-gradient(135deg,#1B9954,#0F5E36)', label: 'Call Us', value: '0703 537 4592', sub: '0701 672 7604' },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, iconBg: 'linear-gradient(135deg,#E63946,#FF6B9D)', label: 'Email Us', value: 'alwajudproperties75@gmail.com', sub: 'Reply within 24 hours', small: true },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, iconBg: 'linear-gradient(135deg,#FFB703,#2D7A76)', label: 'Head Office', value: '112, Adeniyi Jones, Ikeja, Lagos', sub: 'Branch: 27, Taiwo Oguntona Str, Ajala Ijaiye, Lagos', small: true },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, iconBg: 'linear-gradient(135deg,#2D7A76,#0F5E36)', label: 'Business Hours', value: 'Mon – Sat: 9:00 AM – 6:00 PM (WAT)', sub: 'Sunday: Closed', small: true },
            ].map(card => (
              <div key={card.label} style={{ background: '#fff', borderRadius: 18, padding: 20, display: 'flex', gap: 16, alignItems: 'flex-start', boxShadow: '0 4px 16px rgba(0,0,0,.06)', transition: 'transform .2s' }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{card.icon}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 600, color: '#1B9954', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>{card.label}</div>
                  <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: card.small ? 13 : 15, color: '#111827', marginBottom: 2 }}>{card.value}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280' }}>{card.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <a href="https://wa.me/2347035374592?text=Hello%20Al-Wajud%20Properties!%20I%20would%20like%20a%20free%20consultation." target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', background: '#25D366', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, borderRadius: 14, padding: 16, boxShadow: '0 8px 24px rgba(37,211,102,.4)', textDecoration: 'none', marginBottom: 24 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            📱 WhatsApp Now
          </a>

          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 12 }}>Find Us on Social Media</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="https://www.instagram.com/alwajudproperties" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 99, background: 'linear-gradient(135deg,#f09433,#dc2743,#bc1888)', color: '#fff', fontFamily: 'var(--font-poppins)', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/></svg>Instagram
            </a>
            <a href="https://www.tiktok.com/@alwajudproperties" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 99, background: '#010101', color: '#fff', fontFamily: 'var(--font-poppins)', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.54V6.78a4.84 4.84 0 01-1.07-.09z"/></svg>TikTok
            </a>
            <a href="https://wa.me/2347035374592" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 99, background: '#25D366', color: '#fff', fontFamily: 'var(--font-poppins)', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
              WhatsApp
            </a>
          </div>
        </div>

        {/* Form side */}
        <div style={{ background: '#fff', borderRadius: 24, padding: 36, boxShadow: '0 4px 32px rgba(0,0,0,.08)' }}>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 22, color: '#111827', marginBottom: 8 }}>Send Us a Message</div>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#6B7280', marginBottom: 24 }}>Fill the form below and we&apos;ll respond within 24 hours.</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
            <div>
              <label style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 6, display: 'block' }}>Full Name *</label>
              <input type="text" placeholder="Your full name" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151', background: '#F9FAFB', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 6, display: 'block' }}>Email Address *</label>
              <input type="email" placeholder="you@example.com" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151', background: '#F9FAFB', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
            <div>
              <label style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 6, display: 'block' }}>Phone Number</label>
              <input type="tel" placeholder="+234 000 000 0000" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151', background: '#F9FAFB', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 6, display: 'block' }}>Enquiry Type</label>
              <select style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151', background: '#F9FAFB', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}>
                <option>Select type</option>
                <option>Buying a Property</option>
                <option>Renting a Property</option>
                <option>Property Valuation</option>
                <option>Investment Advisory</option>
                <option>General Enquiry</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 6, display: 'block' }}>Budget Range</label>
            <select style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151', background: '#F9FAFB', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}>
              <option>Select budget</option>
              <option>Under ₦50M</option>
              <option>₦50M – ₦120M</option>
              <option>₦120M – ₦300M</option>
              <option>₦300M+</option>
            </select>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 6, display: 'block' }}>Message</label>
            <textarea placeholder="Tell us what you're looking for..." rows={4} style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151', background: '#F9FAFB', outline: 'none', resize: 'vertical', minHeight: 120, boxSizing: 'border-box' }} />
          </div>
          <a href="https://wa.me/2347035374592?text=Hello%20Al-Wajud%20Properties!%20I%20would%20like%20a%20free%20consultation." target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', background: 'linear-gradient(135deg,#E63946,#FF6B9D)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 14, padding: 16, cursor: 'pointer', boxShadow: '0 8px 24px rgba(230,57,70,.4)', textDecoration: 'none', marginTop: 4 }}>
            Send Message via WhatsApp
          </a>
        </div>
      </div>

      {/* ── Map Section (PC) ── */}
      <section className="hidden lg:block" style={{ padding: '0 60px 72px', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>Our Locations</div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 32, color: '#111827', lineHeight: 1.2 }}>Find <span style={{ color: '#1B9954' }}>Us</span></h2>
        </div>
        <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 32px rgba(0,0,0,.1)', height: 380, background: '#e8f5e9', position: 'relative' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.3524692913!2d3.3412!3d6.6018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93a1ae8cd001%3A0x94012fcb9a65d5df!2sAdeniyi%20Jones%20Ave%2C%20Ikeja%2C%20Lagos!5e0!3m2!1sen!2sng!4v1680000000000"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
          {[
            { label: 'Head Office', address: '112, Adeniyi Jones, Ikeja, Lagos', iconBg: 'linear-gradient(135deg,#1B9954,#0F5E36)' },
            { label: 'Branch Office', address: '27, Taiwo Oguntona Str, Ajala Ijaiye, Lagos', iconBg: 'linear-gradient(135deg,#E63946,#FF6B9D)' },
          ].map(loc => (
            <div key={loc.label} style={{ background: '#fff', borderRadius: 16, padding: '16px 20px', boxShadow: '0 2px 12px rgba(0,0,0,.06)', display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, background: loc.iconBg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: '#111827' }}>{loc.label}</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280' }}>{loc.address}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section style={{ padding: '72px 60px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>FAQs</div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 32, color: '#111827', lineHeight: 1.2 }}>Frequently Asked <span style={{ color: '#1B9954' }}>Questions</span></h2>
        </div>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map(faq => (
            <div key={faq.q} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,.06)', overflow: 'hidden' }}>
              <details style={{ cursor: 'pointer' }}>
                <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: '#111827', listStyle: 'none', userSelect: 'none' }}>
                  {faq.q}
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 16 }}>▾</span>
                </summary>
                <div style={{ padding: '0 24px 20px', fontFamily: 'var(--font-inter)', fontSize: 13, color: '#6B7280', lineHeight: 1.8 }}>{faq.a}</div>
              </details>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mobile Contact ── */}
      <div className="lg:hidden" style={{ padding: '24px 16px 120px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          {[
            { emoji: '📞', label: 'Call Us', value: '0703 537 4592', href: 'tel:07035374592' },
            { emoji: '💬', label: 'WhatsApp', value: 'Chat with us now', href: 'https://wa.me/2347035374592' },
            { emoji: '✉️', label: 'Email', value: 'alwajudproperties75@gmail.com', href: 'mailto:alwajudproperties75@gmail.com' },
            { emoji: '📍', label: 'Head Office', value: '112, Adeniyi Jones, Ikeja, Lagos', href: '#' },
          ].map(c => (
            <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ background: '#fff', borderRadius: 16, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 4px 14px rgba(0,0,0,.06)', textDecoration: 'none' }}>
              <span style={{ fontSize: 22 }}>{c.emoji}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, color: '#1B9954', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 2 }}>{c.label}</div>
                <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: '#111827' }}>{c.value}</div>
              </div>
            </a>
          ))}
        </div>
        <a href="https://wa.me/2347035374592?text=Hello%20Al-Wajud%20Properties!%20I%20would%20like%20a%20free%20consultation." target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', background: '#25D366', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, borderRadius: '1.5rem', padding: 16, boxShadow: '0 8px 24px rgba(37,211,102,.4)', textDecoration: 'none', marginBottom: 12 }}>
          WhatsApp Us Now
        </a>
        <a href="tel:07035374592" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', background: 'linear-gradient(135deg,#1B9954,#0F5E36)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, borderRadius: '1.5rem', padding: 16, textDecoration: 'none' }}>
          Call Us Directly
        </a>
      </div>

      <Footer />
    </>
  );
}
