'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserCircle, Camera, Plus, Trash2, Copy, Check, Save, Link as LinkIcon } from 'lucide-react';
import SupabaseUploader from '../_components/SupabaseUploader';

const INP: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12, padding: '11px 14px', color: '#fff',
  fontFamily: 'var(--font-inter)', fontSize: 13, outline: 'none', boxSizing: 'border-box',
};
const LABEL: React.CSSProperties = {
  fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 700,
  color: 'rgba(255,255,255,0.45)', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: 7,
};
const SECTION: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 20, padding: 24, marginBottom: 20,
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function ProfileStudio() {
  const [photoUrl, setPhotoUrl] = useState('/images/profileimage.jpeg');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [quote, setQuote] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [email, setEmail] = useState('');
  const [achievements, setAchievements] = useState(['', '', '']);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  function addAchievement() { setAchievements(a => [...a, '']); }
  function removeAchievement(i: number) { setAchievements(a => a.filter((_, idx) => idx !== i)); }
  function updateAchievement(i: number, v: string) { setAchievements(a => a.map((x, idx) => idx === i ? v : x)); }

  function buildJson() {
    return JSON.stringify({
      name, title, bio, quote,
      photo: photoUrl,
      social: { whatsapp, instagram, linkedin, email },
      achievements: achievements.filter(Boolean),
    }, null, 2);
  }

  function copyJson() {
    navigator.clipboard.writeText(buildJson());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="px-4 lg:px-8" style={{ paddingTop: 24, paddingBottom: 60 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }} className="xl:grid-cols-[1fr_300px] xl:gap-6">

        {/* FORM */}
        <div>
          {/* Photo upload */}
          <motion.div variants={item} style={SECTION}>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: '#10B981', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Camera size={12} /> Profile Photo
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(16,185,129,0.4)', boxShadow: '0 0 30px rgba(16,185,129,0.15)', flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoUrl} alt="CEO" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).src = ''; }} />
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <SupabaseUploader
                  bucket="media"
                  folder="ceo"
                  label="Upload new CEO photo"
                  onDone={(result) => setPhotoUrl(result.url)}
                />
              </div>
            </div>
          </motion.div>

          {/* Identity */}
          <motion.div variants={item} style={SECTION}>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: '#10B981', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 18 }}>Identity</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={LABEL}>Full Name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Dr. Fatima Al-Wajud" style={INP} />
              </div>
              <div>
                <label style={LABEL}>Title / Position</label>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. CEO & Managing Director" style={INP} />
              </div>
            </div>
          </motion.div>

          {/* Biography */}
          <motion.div variants={item} style={SECTION}>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: '#10B981', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 18 }}>Biography</div>
            <label style={LABEL}>Full Biography</label>
            <textarea value={bio} onChange={e => setBio(e.target.value)} rows={8}
              placeholder="Write the CEO's professional biography here…"
              style={{ ...INP, resize: 'vertical', lineHeight: 1.8 }} />
            <div style={{ marginTop: 16 }}>
              <label style={LABEL}>Featured Quote</label>
              <textarea value={quote} onChange={e => setQuote(e.target.value)} rows={3}
                placeholder='"Real estate is not just property — it is legacy."'
                style={{ ...INP, resize: 'vertical', fontStyle: 'italic' }} />
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={item} style={SECTION}>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: '#10B981', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 6 }}>
              <LinkIcon size={12} /> Social Links
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { label: 'WhatsApp Number', val: whatsapp, set: setWhatsapp, ph: '+234 800 000 0000' },
                { label: 'Instagram', val: instagram, set: setInstagram, ph: '@alwajudproperties' },
                { label: 'LinkedIn', val: linkedin, set: setLinkedin, ph: 'linkedin.com/in/…' },
                { label: 'Email', val: email, set: setEmail, ph: 'ceo@alwajud.com' },
              ].map(({ label, val, set, ph }) => (
                <div key={label}>
                  <label style={LABEL}>{label}</label>
                  <input value={val} onChange={e => set(e.target.value)} placeholder={ph} style={INP} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div variants={item} style={SECTION}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: '#10B981', letterSpacing: '2px', textTransform: 'uppercase' }}>Achievements</div>
              <button onClick={addAchievement} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, padding: '6px 12px', color: '#10B981', fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                <Plus size={12} /> Add
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {achievements.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 8 }}>
                  <input value={a} onChange={e => updateAchievement(i, e.target.value)}
                    placeholder={`Achievement ${i + 1}`}
                    style={{ ...INP, flex: 1 }} />
                  <button onClick={() => removeAchievement(i)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444', cursor: 'pointer', flexShrink: 0 }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div variants={item} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#10B981,#059669)', border: 'none', borderRadius: 10, padding: '12px 24px', color: '#fff', fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(16,185,129,0.3)' }}>
              {saved ? <Check size={15} /> : <Save size={15} />} {saved ? 'Saved!' : 'Save Profile'}
            </button>
            <button onClick={copyJson} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '12px 24px', color: '#fff', fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              {copied ? <Check size={15} style={{ color: '#10B981' }} /> : <Copy size={15} />} {copied ? 'Copied!' : 'Copy JSON'}
            </button>
          </motion.div>
        </div>

        {/* PREVIEW */}
        <div className="hidden xl:block">
          <div style={{ position: 'sticky', top: 90 }}>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14 }}>Live Preview</div>
            <div style={{ borderRadius: 20, overflow: 'hidden', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '28px 24px', textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px', border: '3px solid rgba(16,185,129,0.5)' }}>
                {photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photoUrl} alt="CEO" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).src = ''; }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#10B981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <UserCircle size={36} color="#fff" />
                  </div>
                )}
              </div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 18, color: '#fff', marginBottom: 4 }}>{name || 'CEO Name'}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#10B981', marginBottom: 16 }}>{title || 'Position'}</div>
              {quote && (
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', lineHeight: 1.6, padding: '0 8px' }}>
                  &ldquo;{quote}&rdquo;
                </div>
              )}
              {achievements.filter(Boolean).length > 0 && (
                <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {achievements.filter(Boolean).slice(0, 3).map((a, i) => (
                    <div key={i} style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 6, textAlign: 'left' }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', flexShrink: 0 }} /> {a}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Link href="/ceo" target="_blank" style={{ display: 'block', marginTop: 12, textAlign: 'center', fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
              View CEO Page →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
