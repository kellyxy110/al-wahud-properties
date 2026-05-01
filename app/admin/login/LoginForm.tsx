'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const inputCls =
  'w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] outline-none ' +
  'focus:border-[#1B9954] focus:ring-2 focus:ring-[#1B995420] transition-all bg-white';

export default function LoginForm() {
  const router  = useRouter();
  const params  = useSearchParams();
  const [user,  setUser]    = useState('');
  const [pass,  setPass]    = useState('');
  const [error, setError]   = useState('');
  const [busy,  setBusy]    = useState(false);
  const [show,  setShow]    = useState(false);

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
      setError('Incorrect username or password. Please try again.');
    }
  }

  return (
    <div
      className="w-full"
      style={{ maxWidth: 400 }}
    >
      {/* Card */}
      <div
        className="bg-white rounded-[24px] p-8"
        style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.10)' }}
      >
        {/* Logo row */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div
            style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'linear-gradient(135deg,#1B9954,#0F5E36)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 14px',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </div>
          <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 20, color: '#111827', marginBottom: 4 }}>
            Admin Login
          </h1>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#6B7280' }}>
            Al-Wajud Properties — restricted access
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div
            style={{
              background: '#FEF2F2', border: '1px solid #FECACA',
              borderRadius: 12, padding: '10px 14px',
              marginBottom: 20, fontSize: 13, color: '#DC2626',
              fontFamily: 'var(--font-inter)', fontWeight: 500,
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label
              style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              Username
            </label>
            <input
              type="text"
              required
              autoComplete="username"
              value={user}
              onChange={e => setUser(e.target.value)}
              placeholder="Enter username"
              className={inputCls}
              style={{ fontFamily: 'var(--font-inter)' }}
            />
          </div>

          {/* Password */}
          <div>
            <label
              style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={show ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={pass}
                onChange={e => setPass(e.target.value)}
                placeholder="Enter password"
                className={inputCls}
                style={{ fontFamily: 'var(--font-inter)', paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 0,
                }}
                aria-label={show ? 'Hide password' : 'Show password'}
              >
                {show ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={busy}
            className="w-full font-bold text-white rounded-full transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            style={{
              fontFamily : 'var(--font-poppins)',
              fontSize   : 15,
              padding    : '14px',
              marginTop  : 8,
              background : 'linear-gradient(135deg,#1B9954,#0F5E36)',
              boxShadow  : '0 6px 20px rgba(27,153,84,0.35)',
              border     : 'none',
              cursor     : busy ? 'not-allowed' : 'pointer',
            }}
          >
            {busy ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                  <path d="M12 2a10 10 0 0110 10"/>
                </svg>
                Signing in…
              </span>
            ) : 'Sign In →'}
          </button>
        </form>
      </div>

      <p style={{ textAlign: 'center', marginTop: 20, fontFamily: 'var(--font-inter)', fontSize: 12, color: '#9CA3AF' }}>
        This area is restricted to Al-Wajud staff only.
      </p>
    </div>
  );
}
