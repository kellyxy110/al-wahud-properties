'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Eye, EyeOff, ShieldCheck, Fingerprint, Zap } from 'lucide-react';

/* ─── Particle ────────────────────────────────────────────────────── */
interface Particle { id: number; x: number; y: number; size: number; opacity: number; dur: number; delay: number; }
function useParticles(count: number): Particle[] {
  const [p, setP] = useState<Particle[]>([]);
  useEffect(() => {
    setP(Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.4 + 0.05,
      dur: Math.random() * 8 + 6,
      delay: Math.random() * 4,
    })));
  }, [count]);
  return p;
}

/* ─── Animated input field ────────────────────────────────────────── */
function Field({
  type, value, onChange, placeholder, icon: Icon, autoComplete,
}: {
  type: string; value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon: React.ElementType;
  autoComplete: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      {/* Glow ring */}
      <motion.div
        animate={{ opacity: focused ? 1 : 0, scale: focused ? 1 : 0.96 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute', inset: -1, borderRadius: 15,
          background: 'linear-gradient(135deg, rgba(16,185,129,0.5), rgba(20,184,166,0.3))',
          filter: 'blur(6px)', pointerEvents: 'none', zIndex: 0,
        }}
      />
      {/* Icon */}
      <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}>
        <motion.div animate={{ color: focused ? '#10B981' : 'rgba(255,255,255,0.3)' }} transition={{ duration: 0.2 }}>
          <Icon size={16} />
        </motion.div>
      </div>
      {/* Input */}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        style={{
          position: 'relative', zIndex: 1,
          width: '100%', padding: '14px 16px 14px 44px',
          borderRadius: 14, boxSizing: 'border-box',
          background: focused ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${focused ? 'rgba(16,185,129,0.5)' : 'rgba(255,255,255,0.1)'}`,
          color: '#fff', fontFamily: 'var(--font-inter)', fontSize: 14, outline: 'none',
          transition: 'background 0.2s, border-color 0.2s',
          boxShadow: focused ? '0 0 0 3px rgba(16,185,129,0.1)' : 'none',
        }}
      />
    </div>
  );
}

/* ─── Shimmer button ──────────────────────────────────────────────── */
function ShimmerBtn({ busy }: { busy: boolean }) {
  return (
    <motion.button
      type="submit"
      disabled={busy}
      whileHover={{ scale: busy ? 1 : 1.02, y: busy ? 0 : -2 }}
      whileTap={{ scale: busy ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      style={{
        width: '100%', padding: '15px', borderRadius: 14,
        border: 'none', cursor: busy ? 'not-allowed' : 'pointer',
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #10B981 0%, #059669 50%, #0D9488 100%)',
        boxShadow: busy ? 'none' : '0 8px 32px rgba(16,185,129,0.4), 0 0 60px rgba(16,185,129,0.15)',
        opacity: busy ? 0.7 : 1,
        fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        transition: 'box-shadow 0.3s, opacity 0.2s',
      }}
    >
      {/* Shimmer overlay */}
      {!busy && (
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', repeatDelay: 1 }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            pointerEvents: 'none',
          }}
        />
      )}
      {busy ? (
        <>
          <motion.div
            animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
          />
          Authenticating…
        </>
      ) : (
        <>
          <Lock size={16} />
          Access Command Center
        </>
      )}
    </motion.button>
  );
}

/* ─── Main component ──────────────────────────────────────────────── */
export default function LoginForm() {
  const router  = useRouter();
  const params  = useSearchParams();
  const [user,  setUser]  = useState('');
  const [pass,  setPass]  = useState('');
  const [show,  setShow]  = useState(false);
  const [error, setError] = useState('');
  const [busy,  setBusy]  = useState(false);
  const [shake, setShake] = useState(false);
  const particles = useParticles(28);
  const cardRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');

    const res = await fetch('/api/admin/login', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ username: user.trim(), password: pass }),
    });
    setBusy(false);

    if (res.ok) {
      const from = params.get('from') ?? '/admin';
      router.push(from);
      router.refresh();
    } else {
      setError('Invalid credentials. Access denied.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  }

  /* Magnetic card tilt */
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `perspective(1000px) rotateY(${dx * 3}deg) rotateX(${-dy * 3}deg)`;
  }
  function handleMouseLeave() {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
  }

  const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } } };
  const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } } };

  return (
    <div style={{ minHeight: '100vh', background: '#050A0F', display: 'flex', overflow: 'hidden', position: 'relative' }}>

      {/* ── Global ambient glow ──────────────────────────────── */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `
          radial-gradient(ellipse 70% 60% at 20% 50%, rgba(16,185,129,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 80% 50%, rgba(20,184,166,0.05) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 50% 100%, rgba(16,185,129,0.04) 0%, transparent 50%)
        `,
      }} />

      {/* ── Floating particles ───────────────────────────────── */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          aria-hidden
          animate={{ y: [0, -30, 0], opacity: [p.opacity, p.opacity * 1.5, p.opacity] }}
          transition={{ repeat: Infinity, duration: p.dur, delay: p.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size, borderRadius: '50%',
            background: 'rgba(16,185,129,0.6)', zIndex: 0, pointerEvents: 'none',
            boxShadow: '0 0 6px rgba(16,185,129,0.4)',
          }}
        />
      ))}

      {/* ══════════════════════════════════════════════════════
          LEFT PANEL — Branding & Property Visual
      ══════════════════════════════════════════════════════ */}
      <motion.div
        className="hidden lg:flex"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ flex: '0 0 58%', position: 'relative', overflow: 'hidden', zIndex: 1 }}
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80&fit=crop"
          alt=""
          aria-hidden
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.25) saturate(0.8)' }}
        />

        {/* Gradient overlays */}
        <div aria-hidden style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(5,10,15,0.7) 0%, rgba(5,10,15,0.4) 50%, rgba(16,185,129,0.08) 100%)',
        }} />
        <div aria-hidden style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, transparent 60%, #050A0F 100%)',
        }} />

        {/* Animated emerald sweep */}
        <motion.div
          aria-hidden
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
            background: 'linear-gradient(to top, rgba(16,185,129,0.12) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', padding: '48px 52px' }}>

          {/* Logo */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 28, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1 }}>
              Al-Waj<span style={{ color: '#F59E0B' }}>ud</span>
            </div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '3.5px', textTransform: 'uppercase', marginTop: 6 }}>
              PROPERTIES
            </div>
          </motion.div>

          {/* Main headline — centered vertically */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Eyebrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <motion.div
                  animate={{ width: ['0px', '40px'] }} transition={{ delay: 0.8, duration: 0.6 }}
                  style={{ height: 1.5, background: 'linear-gradient(90deg, #10B981, transparent)' }}
                />
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: '#10B981', letterSpacing: '3px', textTransform: 'uppercase' }}>
                  Command Center
                </span>
              </div>

              <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 'clamp(32px,4vw,48px)', color: '#fff', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 20 }}>
                Luxury Real Estate<br />
                <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #10B981, #F59E0B)' }}>
                  Media Control
                </span>
                <br />Center
              </h1>

              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 380 }}>
                Your cinematic real estate operating system. Manage listings, tours, editorial content, and client intelligence from one premium interface.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              style={{ display: 'flex', gap: 32, marginTop: 48 }}
            >
              {[
                { value: '500+', label: 'Happy Families' },
                { value: '12+', label: 'Years Active'   },
                { value: '₦B+', label: 'In Transactions' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 22, color: '#fff', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom badges */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.6 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            {[
              { Icon: ShieldCheck, label: 'Encrypted Access' },
              { Icon: Fingerprint, label: 'Staff Only'        },
              { Icon: Zap,         label: 'Live System'        },
            ].map(({ Icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 99,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
              }}>
                <Icon size={11} style={{ color: '#10B981' }} />
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════
          RIGHT PANEL — Login Card
      ══════════════════════════════════════════════════════ */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', position: 'relative', zIndex: 1 }}>

        {/* Mobile logo (shown only on small screens) */}
        <div className="lg:hidden" style={{ position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 22, color: '#fff' }}>
            Al-Waj<span style={{ color: '#F59E0B' }}>ud</span>
          </div>
        </div>

        {/* Glass card */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{
            width: '100%', maxWidth: 420,
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 28,
            padding: '40px 36px',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)',
            transition: 'transform 0.1s ease',
          }}
        >
          {/* Card glow blob */}
          <div aria-hidden style={{ position: 'absolute', top: -60, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(16,185,129,0.08)', filter: 'blur(50px)', pointerEvents: 'none' }} />
          <div aria-hidden style={{ position: 'absolute', bottom: -40, left: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(20,184,166,0.06)', filter: 'blur(40px)', pointerEvents: 'none' }} />

          <motion.div variants={stagger} initial="hidden" animate="show">

            {/* Header */}
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 36 }}>
              {/* Lock icon with glow */}
              <div style={{ margin: '0 auto 20px', width: 56, height: 56, borderRadius: 18,
                background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(20,184,166,0.1))',
                border: '1px solid rgba(16,185,129,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 30px rgba(16,185,129,0.2)',
              }}>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                >
                  <Lock size={22} style={{ color: '#10B981' }} />
                </motion.div>
              </div>

              <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 22, color: '#fff', letterSpacing: '-0.5px', marginBottom: 6 }}>
                Restricted Access
              </h2>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
                Al-Wajud Properties — Staff Portal
              </p>

              {/* Divider */}
              <div style={{ margin: '20px 0 0', height: 1, background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)' }} />
            </motion.div>

            {/* Error banner */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  style={{ marginBottom: 20, overflow: 'hidden' }}
                >
                  <div style={{
                    padding: '11px 16px', borderRadius: 12,
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', boxShadow: '0 0 8px #EF4444', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#FCA5A5', fontWeight: 500 }}>
                      {error}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >

              {/* Username */}
              <motion.div variants={fadeUp}>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>
                  Username
                </div>
                <Field
                  type="text"
                  value={user}
                  onChange={setUser}
                  placeholder="Enter your username"
                  icon={User}
                  autoComplete="username"
                />
              </motion.div>

              {/* Password */}
              <motion.div variants={fadeUp} style={{ position: 'relative' }}>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>
                  Password
                </div>
                <div style={{ position: 'relative' }}>
                  <Field
                    type={show ? 'text' : 'password'}
                    value={pass}
                    onChange={setPass}
                    placeholder="Enter your password"
                    icon={Lock}
                    autoComplete="current-password"
                  />
                  {/* Eye toggle */}
                  <button
                    type="button"
                    onClick={() => setShow(s => !s)}
                    aria-label={show ? 'Hide password' : 'Show password'}
                    style={{
                      position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'rgba(255,255,255,0.3)', padding: 4, zIndex: 3,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'color 0.2s',
                    }}
                  >
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </motion.div>

              {/* Submit */}
              <motion.div variants={fadeUp} style={{ marginTop: 8 }}>
                <ShimmerBtn busy={busy} />
              </motion.div>

            </motion.form>

            {/* Security badges */}
            <motion.div variants={fadeUp} style={{ marginTop: 28, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { Icon: ShieldCheck, label: 'AES-256 Encrypted' },
                { Icon: Fingerprint, label: 'Restricted Staff'  },
              ].map(({ Icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 99,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                }}>
                  <Icon size={10} style={{ color: 'rgba(255,255,255,0.25)' }} />
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,0.25)', fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </motion.div>

            {/* Footer */}
            <motion.p variants={fadeUp} style={{ textAlign: 'center', marginTop: 20, fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.18)', lineHeight: 1.5 }}>
              Unauthorized access is strictly prohibited<br />and subject to legal action.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
