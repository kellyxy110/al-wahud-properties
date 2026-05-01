'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/properties', label: 'Properties' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About Us' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const MOB_SIDEBAR_LINKS = [
  {
    href: '/', label: 'Home',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>,
  },
  {
    href: '/properties', label: 'Properties',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
  {
    href: '/services', label: 'Services',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>,
  },
  {
    href: '/about', label: 'About Us',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  },
  {
    href: '/blog', label: 'Blog',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2"/><path d="M2 12h10M2 17h6"/></svg>,
  },
  {
    href: '/contact', label: 'Contact',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  },
];

const WA_ICON_WHITE = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

type WavyItem = {
  href: string;
  label: string;
  icon: (color: string) => React.ReactNode;
  dot?: boolean;
};

const WAVY_NAV: WavyItem[] = [
  {
    href: '/', label: 'Home',
    icon: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    href: '/properties', label: 'Property',
    icon: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
  {
    href: '/about', label: 'About',
    icon: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  },
  {
    href: '/contact', label: 'Contact', dot: true,
    icon: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  },
  {
    href: '/blog', label: 'Blog',
    icon: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2"/><path d="M16 13H8M16 17H8"/></svg>,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* ── DESKTOP NAV ── */}
      <nav
        className="hidden lg:block sticky top-0 z-[200]"
        style={{ background: 'rgba(255,255,255,.97)', backdropFilter: 'blur(12px)', boxShadow: '0 1px 16px rgba(0,0,0,.08)' }}
      >
        <div className="h-[70px] flex items-center justify-between" style={{ padding: '0 60px' }}>
          <Link href="/">
            <Image src="/images/alwajudlogo.jpeg" alt="Al-Wajud Properties" width={140} height={42} style={{ height: '42px', width: 'auto', objectFit: 'contain', display: 'block' }} />
          </Link>

          <ul className="flex gap-7 list-none">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', fontWeight: 500, color: pathname === href ? 'var(--primary)' : '#374151', transition: 'color .2s' }}
                  className="hover:text-[var(--primary)]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className="flex gap-3 items-center">
              <a href="https://wa.me/2347035374592" target="_blank" rel="noopener" aria-label="WhatsApp"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--primary)] hover:text-white"
                style={{ background: '#F3F4F6', color: 'var(--primary)' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@wahjud24" target="_blank" rel="noopener" aria-label="TikTok"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--primary)] hover:text-white"
                style={{ background: '#F3F4F6', color: 'var(--primary)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.54V6.78a4.84 4.84 0 01-1.07-.09z"/></svg>
              </a>
            </div>
            <Link href="/legal"
              className="text-white text-sm font-bold px-6 py-2.5 rounded-full transition-transform hover:-translate-y-0.5"
              style={{ fontFamily: 'var(--font-poppins)', background: 'linear-gradient(135deg,var(--primary),var(--dark))', boxShadow: '0 4px 16px rgba(27,153,84,.3)' }}>
              Get a Free Consultation
            </Link>
          </div>
        </div>
      </nav>

      {/* ── MOBILE SIDEBAR OVERLAY ── */}
      <div
        className={`mob-sidebar-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ── MOBILE SIDEBAR ── */}
      <aside className={`mob-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="mob-sidebar-top">
          <div className="mob-sidebar-logo">
            <Image src="/images/alwajudlogo.jpeg" alt="Al-Wajud Properties" width={113} height={34} style={{ height: '34px', width: 'auto', objectFit: 'contain', borderRadius: '4px', display: 'block' }} />
          </div>
          <div className="mob-sidebar-tagline">Nigeria&apos;s Trusted Real Estate</div>
          <button className="mob-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <svg className="mob-sidebar-wave" viewBox="0 0 32 800" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 C20,100 0,200 20,300 C40,400 0,500 20,600 C40,700 10,750 0,800 L32,800 L32,0 Z" fill="#fff"/>
          </svg>
        </div>
        <nav className="mob-sidebar-nav">
          {MOB_SIDEBAR_LINKS.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`mob-sidebar-item${pathname === href ? ' active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              {icon}{label}
            </Link>
          ))}
        </nav>
        <div className="mob-sidebar-footer">
          <a href="https://wa.me/2347035374592?text=Hello%20Al-Wajud!" target="_blank" rel="noopener" className="mob-sidebar-wa">
            {WA_ICON_WHITE} WhatsApp Us
          </a>
        </div>
      </aside>

      {/* ── MOBILE HEADER ── */}
      <header className="mob-header lg:hidden">
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="https://www.tiktok.com/@wahjud24" target="_blank" rel="noopener" aria-label="TikTok">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1B9954">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.54V6.78a4.84 4.84 0 01-1.07-.09z"/>
            </svg>
          </a>
        </div>
        <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: '16px', color: 'var(--dark)', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          Al-Wajud Properties
        </span>
        <button className="mob-hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </header>

      {/* ── MOBILE WAVY BOTTOM NAV ── */}
      <nav className="wavy-nav">
        {WAVY_NAV.map(({ href, label, icon, dot }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link key={href} href={href} className={`nav-item${isActive ? ' active' : ''}`}>
              {isActive ? (
                <div className="nav-active-bubble">{icon('#fff')}</div>
              ) : dot ? (
                <div style={{ position: 'relative' }}>
                  {icon('#9CA3AF')}
                  <span className="pulse-ring" style={{ position: 'absolute', top: '-3px', right: '-3px', width: '8px', height: '8px', background: '#E63946', borderRadius: '50%', border: '2px solid #fff' }} />
                </div>
              ) : (
                icon('#9CA3AF')
              )}
              <span className="nav-label">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
