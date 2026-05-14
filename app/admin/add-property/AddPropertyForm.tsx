'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { addProperty, type FormState } from './actions';
import ImageUploader from './ImageUploader';

const INITIAL_STATE: FormState = { status: 'idle', message: '' };

/* ── Design tokens ───────────────────────────────────────────────── */
const INPUT = {
  width: '100%', padding: '11px 14px', borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.1)',
  fontFamily: 'var(--font-inter)', fontSize: 13,
  color: '#fff', background: 'rgba(255,255,255,0.06)',
  outline: 'none', boxSizing: 'border-box' as const,
  transition: 'border-color 0.2s',
};
const LABEL = {
  fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 700 as const,
  color: 'rgba(255,255,255,0.45)', letterSpacing: '1.5px',
  textTransform: 'uppercase' as const, display: 'block' as const, marginBottom: 7,
};
const SECTION = {
  fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700 as const,
  color: 'rgba(27,153,84,0.9)', letterSpacing: '2px',
  textTransform: 'uppercase' as const, paddingBottom: 10,
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  gridColumn: '1 / -1' as const,
};

/* ── TikTok URL → ID extractor ───────────────────────────────────── */
function extractTikTokId(raw: string): string {
  const trimmed = raw.trim();
  const match = trimmed.match(/\/video\/(\d+)/);
  if (match) return match[1];
  if (/^\d{10,}$/.test(trimmed)) return trimmed;
  return trimmed;
}

/* ── WA text auto-builder ─────────────────────────────────────────── */
function buildWaText(title: string, location: string): string {
  const t = title.trim();
  const l = location.trim();
  if (!t && !l) return '';
  if (t && l)   return encodeURIComponent(`Hello! I am interested in ${t} located at ${l}.`);
  if (t)        return encodeURIComponent(`Hello! I am interested in ${t}.`);
  return              encodeURIComponent(`Hello! I am interested in a property located at ${l}.`);
}

/* ── Toggle component ─────────────────────────────────────────────── */
function Toggle({ name, label, desc, defaultChecked = false }: { name: string; label: string; desc: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', userSelect: 'none' }}>
      <input type="checkbox" name={name} checked={on} onChange={e => setOn(e.target.checked)} className="sr-only" />
      <div
        onClick={() => setOn(v => !v)}
        style={{
          width: 40, height: 22, borderRadius: 99, flexShrink: 0, marginTop: 2,
          background: on ? '#1B9954' : 'rgba(255,255,255,0.12)',
          position: 'relative', transition: 'background 0.2s', cursor: 'pointer',
        }}
      >
        <div style={{
          position: 'absolute', top: 3, left: on ? 21 : 3,
          width: 16, height: 16, borderRadius: '50%',
          background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
          transition: 'left 0.2s',
        }} />
      </div>
      <div>
        <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 13, color: '#fff', display: 'block', lineHeight: 1.2 }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4, display: 'block' }}>{desc}</span>
      </div>
    </label>
  );
}

/* ── Field wrapper ────────────────────────────────────────────────── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={LABEL}>{label}</label>
      {children}
    </div>
  );
}

/* ── Live property preview card ───────────────────────────────────── */
function LivePreview({ title, location, price, status, coverUrl, gradient }: {
  title: string; location: string; price: string; status: string; coverUrl: string; gradient: string;
}) {
  const hasContent = title || location || price;
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 20, padding: 20,
      position: 'sticky', top: 90,
    }}>
      <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14 }}>
        Live Preview
      </div>

      {/* Card */}
      <div style={{ borderRadius: 16, overflow: 'hidden', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {/* Image area */}
        <div style={{ height: 140, background: coverUrl ? 'transparent' : gradient || 'linear-gradient(135deg,#1B9954,#0F5E36)', position: 'relative', overflow: 'hidden' }}>
          {coverUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
          {!coverUrl && !hasContent && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.4 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
            </div>
          )}
          {status && (
            <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', color: '#fff', fontFamily: 'var(--font-inter)', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 99, letterSpacing: '1px' }}>
              {status}
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '14px 16px' }}>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 4, lineHeight: 1.3 }}>
            {title || <span style={{ color: 'rgba(255,255,255,0.2)' }}>Property Title</span>}
          </div>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>
            {location || <span style={{ color: 'rgba(255,255,255,0.15)' }}>Location, Lagos</span>}
          </div>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 15, color: '#1B9954' }}>
            {price ? `₦${Number(price).toLocaleString('en-NG')}` : <span style={{ color: 'rgba(255,255,255,0.15)' }}>₦ Price</span>}
          </div>
        </div>
      </div>

      <p style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 12 }}>
        Updates as you type
      </p>
    </div>
  );
}

/* ── Main form ────────────────────────────────────────────────────── */
export default function AddPropertyForm() {
  const [state, action, pending] = useActionState(addProperty, INITIAL_STATE);
  const formRef = useRef<HTMLFormElement>(null);

  const [title,       setTitle]       = useState('');
  const [location,    setLocation]    = useState('');
  const [price,       setPrice]       = useState('');
  const [status,      setStatus]      = useState('FOR SALE');
  const [waText,      setWaText]      = useState('');
  const [waEdited,    setWaEdited]    = useState(false);
  const [tiktokRaw,   setTiktokRaw]   = useState('');
  const [tiktokId,    setTiktokId]    = useState('');
  const [gradient,    setGradient]    = useState('linear-gradient(135deg,#1B9954,#0F5E36)');
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [uploading,    setUploading]    = useState(false);

  useEffect(() => {
    if (!waEdited) setWaText(buildWaText(title, location));
  }, [title, location, waEdited]);

  useEffect(() => {
    setTiktokId(extractTikTokId(tiktokRaw));
  }, [tiktokRaw]);

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset();
      setTitle(''); setLocation(''); setPrice(''); setStatus('FOR SALE');
      setWaText(''); setWaEdited(false);
      setTiktokRaw(''); setTiktokId('');
      setGradient('linear-gradient(135deg,#1B9954,#0F5E36)');
      setUploadedUrls([]); setUploading(false);
    }
  }, [state]);

  function handleWaChange(e: React.ChangeEvent<HTMLInputElement>) {
    setWaText(e.target.value);
    setWaEdited(e.target.value !== buildWaText(title, location));
  }

  const autoGenerated = !waEdited && waText === buildWaText(title, location);
  const coverUrl = uploadedUrls[0] ?? '';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }} className="xl:grid-cols-[1fr_280px] xl:gap-8">

      {/* ── FORM ─────────────────────────────────────────────────────── */}
      <form ref={formRef} action={action}>

        {/* Hidden inputs */}
        <input type="hidden" name="images" value={uploadedUrls.join(',')} />
        <input type="hidden" name="tiktok_id" value={tiktokId} />

        {/* Status banners */}
        {state.status === 'success' && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 14, padding: '14px 18px', marginBottom: 24, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>✅</span>
            <div>
              <p style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: '#4ADE80' }}>{state.message}</p>
              {state.propertyId && (
                <Link href={`/properties/${state.propertyId}`} style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#1B9954', display: 'inline-block', marginTop: 4 }}>
                  View property →
                </Link>
              )}
            </div>
          </motion.div>
        )}

        {state.status === 'error' && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 14, padding: '14px 18px', marginBottom: 24, display: 'flex', gap: 12 }}>
            <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>❌</span>
            <div style={{ fontFamily: 'var(--font-inter)', color: '#FCA5A5' }}>
              {state.message.split('\n').map((line, i) => (
                <p key={i} style={{ fontSize: i === 0 ? 14 : 12, fontWeight: i === 0 ? 600 : 400, marginTop: i > 0 ? 4 : 0, fontFamily: i > 0 ? 'monospace' : undefined, wordBreak: 'break-all' }}>{line}</p>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─ Section 1: Core Details ─────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 28 }} className="sm:grid-cols-2">
          <div style={SECTION}>Core Details</div>

          <Field label="Title *">
            <input name="title" type="text" required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Luxury 3-Bedroom Duplex in Lekki" style={INPUT} />
          </Field>

          <Field label="Description">
            <textarea name="description" rows={4} placeholder="Full property description…" style={{ ...INPUT, resize: 'vertical' }} />
          </Field>

          <Field label="Price (₦) *">
            <input name="price" type="number" required min="0" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. 120000000" style={INPUT} />
          </Field>

          <Field label="Price Period">
            <select name="price_period" style={INPUT}>
              <option value="">None (for sale / land)</option>
              <option value="/yr">/yr — per year</option>
              <option value="/month">/month — per month</option>
              <option value="/night">/night — short let</option>
            </select>
          </Field>

          <Field label="Status *">
            <select name="status" required value={status} onChange={e => setStatus(e.target.value)} style={INPUT}>
              <option value="FOR SALE">FOR SALE</option>
              <option value="FOR RENT">FOR RENT</option>
              <option value="SHORT LET">SHORT LET</option>
              <option value="OFF-PLAN">OFF-PLAN</option>
              <option value="LAND FOR SALE">LAND FOR SALE</option>
            </select>
          </Field>

          <Field label="Property Type *">
            <select name="property_type" required style={INPUT}>
              <option value="duplex">Duplex</option>
              <option value="apartment">Apartment</option>
              <option value="penthouse">Penthouse</option>
              <option value="bungalow">Bungalow</option>
              <option value="terrace">Terrace</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
            </select>
          </Field>
        </div>

        {/* ─ Section 2: Location ─────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 28 }} className="sm:grid-cols-2">
          <div style={SECTION}>Location</div>

          <Field label="Full Location *">
            <input name="location" type="text" required value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Lekki Phase 1, Lagos State" style={INPUT} />
          </Field>

          <Field label="Location Key *">
            <select name="location_key" required style={INPUT}>
              <option value="lagos">Lagos</option>
              <option value="abuja">Abuja</option>
              <option value="port-harcourt">Port Harcourt</option>
            </select>
          </Field>
        </div>

        {/* ─ Section 3: Specs ────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 28 }} className="sm:grid-cols-3">
          <div style={SECTION}>Property Specs</div>
          <Field label="Bedrooms"><input name="bedrooms" type="number" min="0" defaultValue={0} style={INPUT} /></Field>
          <Field label="Bathrooms"><input name="bathrooms" type="number" min="0" defaultValue={0} style={INPUT} /></Field>
          <Field label="Size (sqm)"><input name="sqm" type="number" min="0" defaultValue={0} style={INPUT} /></Field>
        </div>

        {/* ─ Section 4: Features ─────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 28 }} className="sm:grid-cols-2">
          <div style={SECTION}>Features &amp; Amenities</div>

          <Field label="Key Features (comma-separated)">
            <input name="features" type="text" placeholder="Fitted Kitchen, Boys Quarters, CCTV, Garden" style={INPUT} />
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 6 }}>Each comma-separated item becomes a bullet point.</p>
          </Field>

          <Field label="Amenities (comma-separated or JSON)">
            <textarea name="amenities" rows={3} placeholder={'Pool, Gym, Security\nor: [{"i":"🏊","l":"Pool"}]'} style={{ ...INPUT, resize: 'vertical', fontFamily: 'monospace', fontSize: 12 }} />
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 6 }}>Plain labels get 📌. Use JSON for custom emojis.</p>
          </Field>
        </div>

        {/* ─ Section 5: Media ────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 28 }}>
          <div style={SECTION}>Media &amp; Tour</div>

          <Field label="Property Images">
            <ImageUploader onChange={setUploadedUrls} onUploadingChange={setUploading} />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }} className="sm:grid-cols-2">
            <div>
              <Field label="TikTok URL or ID">
                <input
                  type="text"
                  value={tiktokRaw}
                  onChange={e => setTiktokRaw(e.target.value)}
                  placeholder="Paste full TikTok URL or raw video ID"
                  style={INPUT}
                />
              </Field>
              {tiktokRaw && tiktokId && (
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#1B9954', fontWeight: 600 }}>✦ Extracted ID:</span>
                  <code style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.07)', padding: '2px 8px', borderRadius: 6 }}>{tiktokId}</code>
                </div>
              )}
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 6 }}>
                Paste the full URL — the ID is extracted automatically.
              </p>
            </div>

            <Field label="Card Gradient (CSS)">
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: gradient, flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }} />
                <input name="gradient" type="text" value={gradient} onChange={e => setGradient(e.target.value)}
                  placeholder="linear-gradient(135deg,#1B9954,#0F5E36)" style={{ ...INPUT, fontFamily: 'monospace', fontSize: 11 }} />
              </div>
            </Field>
          </div>
        </div>

        {/* ─ Section 6: WhatsApp ─────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 28 }} className="sm:grid-cols-2">
          <div style={SECTION}>WhatsApp Message</div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={LABEL}>Pre-filled WhatsApp Message (URL-encoded)</label>
            <div style={{ position: 'relative' }}>
              <input name="whatsapp_text" type="text" value={waText} onChange={handleWaChange}
                placeholder="Auto-generated from title and location…"
                style={{ ...INPUT, fontFamily: 'monospace', fontSize: 11, paddingRight: waEdited ? 90 : 14 }} />
              {waEdited && (
                <button type="button" onClick={() => { setWaEdited(false); setWaText(buildWaText(title, location)); }}
                  style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 600, color: '#1B9954', background: 'rgba(27,153,84,0.15)', border: 'none', borderRadius: 8, padding: '4px 10px', cursor: 'pointer' }}>
                  ↺ Reset
                </button>
              )}
            </div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 11, marginTop: 6, color: autoGenerated && waText ? '#1B9954' : 'rgba(255,255,255,0.25)' }}>
              {autoGenerated && waText ? '✦ Auto-generated from title & location.' : waEdited ? '✎ Manually edited.' : 'Will generate once title/location is entered.'}
            </p>
          </div>
        </div>

        {/* ─ Section 7: Flags ────────────────────────────────────────── */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ ...SECTION, marginBottom: 20 }}>Visibility &amp; Feature Flags</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }} className="sm:grid-cols-2">
            <Toggle name="published"     label="Published"      desc="Visible to public visitors"            defaultChecked />
            <Toggle name="featured"      label="Featured"       desc="Shown on Homepage Featured Listings"   />
            <Toggle name="featured_tour" label="Featured Tour"  desc="Shown in TikTok Story Reels carousel"  />
            <Toggle name="homepage_hero" label="Homepage Hero"  desc="Large hero banner on homepage"         />
            <Toggle name="trending"      label="Trending"       desc="Marked as trending / hot property"     />
          </div>
        </div>

        {/* ─ Submit ──────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <button type="submit" disabled={pending || uploading} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15,
            color: '#fff', border: 'none', borderRadius: 999,
            padding: '14px 32px', cursor: pending || uploading ? 'not-allowed' : 'pointer',
            background: 'linear-gradient(135deg,#1B9954,#0F5E36)',
            boxShadow: '0 8px 24px rgba(27,153,84,0.35)',
            opacity: pending || uploading ? 0.7 : 1,
            transition: 'opacity 0.2s, transform 0.2s',
          }}>
            {uploading ? (
              <><Spinner />Uploading images…</>
            ) : pending ? (
              <><Spinner />Saving…</>
            ) : '＋ Add Property'}
          </button>

          <Link href="/properties" style={{ fontFamily: 'var(--font-inter)', fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
            ← Back to Properties
          </Link>
        </div>
      </form>

      {/* ── LIVE PREVIEW (PC sidebar) ─────────────────────────────────── */}
      <div className="hidden xl:block" style={{ marginTop: 0 }}>
        <LivePreview title={title} location={location} price={price} status={status} coverUrl={coverUrl} gradient={gradient} />
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
      <path d="M12 2a10 10 0 0110 10"/>
    </svg>
  );
}
