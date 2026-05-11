'use client';

import { useState } from 'react';

const PC_INTERESTS = [
  'Buying Property', 'Renting Property', 'Property Investment',
  'Listing My Property', 'Construction Services', 'Facility Management', 'Other',
];
const MOB_INTERESTS = ['Buying', 'Renting', 'Investment', 'Listing', 'Construction', 'Other'];
const WA_NUMBER = '2347035374592';

const BASE_INPUT: React.CSSProperties = {
  width: '100%',
  borderRadius: 12,
  border: '1.5px solid #E5E7EB',
  fontFamily: 'var(--font-inter)',
  fontSize: 13,
  color: '#374151',
  background: '#F9FAFB',
  outline: 'none',
  boxSizing: 'border-box',
};

const PC_INPUT: React.CSSProperties = { ...BASE_INPUT, padding: '12px 16px' };
const MOB_INPUT: React.CSSProperties = { ...BASE_INPUT, padding: '12px 14px' };

function buildWhatsAppText(
  name: string, email: string, phone: string, country: string,
  interests: string[], budget: string, message: string,
): string {
  const lines: string[] = [
    'Hello Al-Wajud Properties,',
    '',
    `My name is ${name.trim()}.`,
    `Email: ${email.trim()}`,
  ];
  if (phone.trim()) lines.push(`Phone: ${phone.trim()}`);
  lines.push(`Country: ${country}`, '', 'I am interested in:');
  interests.forEach(i => lines.push(`- ${i}`));
  lines.push('');
  if (budget) lines.push(`Budget Range: ${budget}`, '');
  lines.push('Message:', message.trim(), '', 'Please contact me.');
  return lines.join('\n');
}

export function ContactForm({ variant }: { variant: 'pc' | 'mobile' }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const INTERESTS = variant === 'pc' ? PC_INTERESTS : MOB_INTERESTS;

  function toggleInterest(opt: string) {
    setInterests(prev => prev.includes(opt) ? prev.filter(i => i !== opt) : [...prev, opt]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: string[] = [];
    if (!name.trim()) errs.push('Full name is required.');
    if (!email.trim()) errs.push('Email address is required.');
    if (!country) errs.push('Country is required.');
    if (interests.length === 0) errs.push('Please select at least one interest.');
    if (!message.trim()) errs.push('Message is required.');
    if (errs.length > 0) { setErrors(errs); return; }
    setErrors([]);
    const text = buildWhatsAppText(name, email, phone, country, interests, budget, message);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  }

  if (variant === 'pc') {
    return (
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 24, padding: 36, boxShadow: '0 4px 32px rgba(0,0,0,.08)' }}>
        <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 22, color: '#111827', marginBottom: 8 }}>Send Us a Message</div>
        <div style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#6B7280', marginBottom: 24 }}>Fill the form below and we&apos;ll respond within 24 hours.</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
          <div>
            <label style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 6, display: 'block' }}>Full Name *</label>
            <input type="text" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} style={PC_INPUT} />
          </div>
          <div>
            <label style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 6, display: 'block' }}>Email Address *</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} style={PC_INPUT} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
          <div>
            <label style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 6, display: 'block' }}>Phone Number</label>
            <input type="tel" placeholder="+234 000 000 0000" value={phone} onChange={e => setPhone(e.target.value)} style={PC_INPUT} />
          </div>
          <div>
            <label style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 6, display: 'block' }}>Country *</label>
            <select value={country} onChange={e => setCountry(e.target.value)} style={{ ...PC_INPUT, cursor: 'pointer' }}>
              <option value="">Select country...</option>
              <option>Nigeria</option>
              <option>United Kingdom</option>
              <option>United States</option>
              <option>Canada</option>
              <option>UAE</option>
              <option>Australia</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 6, display: 'block' }}>I&apos;m interested in: *</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 6 }}>
            {INTERESTS.map(opt => (
              <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-inter)', fontSize: 13, color: '#374151', cursor: 'pointer' }}>
                <input type="checkbox" checked={interests.includes(opt)} onChange={() => toggleInterest(opt)} style={{ accentColor: '#1B9954', width: 15, height: 15 }} /> {opt}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 6, display: 'block' }}>Budget Range</label>
          <select value={budget} onChange={e => setBudget(e.target.value)} style={{ ...PC_INPUT, cursor: 'pointer' }}>
            <option value="">Select budget...</option>
            <option>₦5M – ₦20M</option>
            <option>₦20M – ₦50M</option>
            <option>₦50M – ₦120M</option>
            <option>₦120M – ₦300M</option>
            <option>₦300M+</option>
          </select>
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 6, display: 'block' }}>Message *</label>
          <textarea placeholder="Tell us more about what you're looking for..." rows={4} value={message} onChange={e => setMessage(e.target.value)} style={{ ...PC_INPUT, resize: 'vertical', minHeight: 120 }} />
        </div>

        {errors.length > 0 && (
          <div style={{ background: '#FEE2E2', borderRadius: 10, padding: '10px 14px', marginBottom: 14 }}>
            {errors.map(err => (
              <div key={err} style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#DC2626' }}>{err}</div>
            ))}
          </div>
        )}

        <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', background: 'linear-gradient(135deg,#1B9954,#0F5E36)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 14, padding: 16, cursor: 'pointer', boxShadow: '0 8px 24px rgba(27,153,84,.4)', marginTop: 4 }}>
          Submit Message
        </button>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#9CA3AF', textAlign: 'center', marginTop: 12 }}>We&apos;ll respond within 24 hours · Your data is 100% secure</p>
      </form>
    );
  }

  // Mobile variant
  return (
    <form onSubmit={handleSubmit} style={{ background: '#fff', margin: '0 16px', borderRadius: 20, padding: 22, boxShadow: '0 4px 16px rgba(0,0,0,.06)' }}>
      <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 17, color: '#111827', marginBottom: 6 }}>Send a Message</div>
      <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', marginBottom: 18 }}>We&apos;ll respond within 24 hours</div>

      <input type="text" placeholder="Your Full Name *" value={name} onChange={e => setName(e.target.value)} style={{ ...MOB_INPUT, marginBottom: 12 }} />
      <input type="email" placeholder="Email Address *" value={email} onChange={e => setEmail(e.target.value)} style={{ ...MOB_INPUT, marginBottom: 12 }} />
      <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} style={{ ...MOB_INPUT, marginBottom: 12 }} />

      <select value={country} onChange={e => setCountry(e.target.value)} style={{ ...MOB_INPUT, cursor: 'pointer', marginBottom: 12 }}>
        <option value="">Select country...</option>
        <option>Nigeria</option><option>United Kingdom</option><option>United States</option>
        <option>Canada</option><option>UAE</option><option>Other</option>
      </select>

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 8 }}>I&apos;m interested in: *</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {INTERESTS.map(opt => (
            <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-inter)', fontSize: 12, color: '#374151' }}>
              <input type="checkbox" checked={interests.includes(opt)} onChange={() => toggleInterest(opt)} style={{ accentColor: '#1B9954' }} /> {opt}
            </label>
          ))}
        </div>
      </div>

      <select value={budget} onChange={e => setBudget(e.target.value)} style={{ ...MOB_INPUT, cursor: 'pointer', marginBottom: 12 }}>
        <option value="">Budget range...</option>
        <option>₦5M – ₦20M</option><option>₦20M – ₦50M</option><option>₦50M – ₦120M</option>
        <option>₦120M – ₦300M</option><option>₦300M+</option>
      </select>

      <textarea placeholder="Message... *" rows={4} value={message} onChange={e => setMessage(e.target.value)} style={{ ...MOB_INPUT, resize: 'vertical', minHeight: 90, marginBottom: 12 }} />

      {errors.length > 0 && (
        <div style={{ background: '#FEE2E2', borderRadius: 10, padding: '10px 14px', marginBottom: 12 }}>
          {errors.map(err => (
            <div key={err} style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#DC2626' }}>{err}</div>
          ))}
        </div>
      )}

      <button type="submit" style={{ display: 'block', width: '100%', background: 'linear-gradient(135deg,#1B9954,#0F5E36)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, border: 'none', borderRadius: 14, padding: 14, cursor: 'pointer', boxShadow: '0 6px 20px rgba(27,153,84,.4)' }}>
        Submit Message
      </button>
      <p style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#9CA3AF', textAlign: 'center', marginTop: 10 }}>We&apos;ll respond within 24 hours</p>
    </form>
  );
}
