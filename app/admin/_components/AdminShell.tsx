'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid, Building2, PlusSquare, FileText, ImageIcon, UserCircle,
  PlayCircle, Users, BarChart3, Sparkles, Settings, LogOut,
  ExternalLink, Menu, X, ChevronRight,
} from 'lucide-react';

/* ── Nav configuration ───────────────────────────────────────────────── */
const NAV_ITEMS = [
  { href: '/admin',              label: 'Dashboard',        exact: true,  group: 'main',    Icon: LayoutGrid  },
  { href: '/admin/properties',   label: 'Properties',       exact: false, group: 'content', Icon: Building2   },
  { href: '/admin/add-property', label: 'Add Property',     exact: false, group: 'content', Icon: PlusSquare  },
  { href: '/admin/blog',         label: 'Editorial Studio', exact: false, group: 'content', Icon: FileText    },
  { href: '/admin/media',        label: 'Media Vault',      exact: false, group: 'content', Icon: ImageIcon   },
  { href: '/admin/profile',      label: 'Exec Profile',     exact: false, group: 'content', Icon: UserCircle  },
  { href: '/admin/tours',        label: 'Featured Tours',   exact: false, group: 'studio',  Icon: PlayCircle  },
  { href: '/admin/leads',        label: 'Client Leads',     exact: false, group: 'studio',  Icon: Users       },
  { href: '/admin/analytics',    label: 'Analytics',        exact: false, group: 'studio',  Icon: BarChart3   },
  { href: '/admin/ai',           label: 'AI Assistant',     exact: false, group: 'studio',  Icon: Sparkles    },
  { href: '/admin/settings',     label: 'Settings',         exact: false, group: 'system',  Icon: Settings    },
] as const;

const GROUP_LABELS: Record<string, string> = {
  content: 'CONTENT',
  studio:  'STUDIO',
  system:  'SYSTEM',
};

const MOB_NAV = NAV_ITEMS.slice(0, 5);

interface Props {
  children : React.ReactNode;
  title?   : string;
  subtitle?: string;
}

/* ── Logout button ───────────────────────────────────────────────────── */
function LogoutBtn({ compact = false }: { compact?: boolean }) {
  async function go() {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  }
  return (
    <button
      onClick={go}
      title="Logout"
      aria-label="Logout"
      style={{
        width: compact ? 32 : undefined,
        height: compact ? 32 : undefined,
        padding: compact ? 0 : '6px 12px',
        borderRadius: compact ? '50%' : 8,
        background: 'rgba(239,68,68,0.1)',
        border: '1px solid rgba(239,68,68,0.2)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: compact ? 0 : 6,
        color: 'rgba(239,68,68,0.7)',
        fontFamily: 'var(--font-inter)',
        fontSize: 12,
        fontWeight: 600,
        transition: 'all 0.2s',
        flexShrink: 0,
      }}
    >
      <LogOut size={13} />
      {!compact && <span>Logout</span>}
    </button>
  );
}

/* ── Sidebar nav item ─────────────────────────────────────────────────── */
function NavItem({ href, label, Icon, exact, onClick }: {
  href: string; label: string; Icon: React.ElementType;
  exact: boolean; onClick?: () => void;
}) {
  const pathname = usePathname();
  const on = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href} onClick={onClick} style={{ textDecoration: 'none', display: 'block', marginBottom: 2 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '9px 12px', borderRadius: 10,
        background: on ? 'rgba(16,185,129,0.12)' : 'transparent',
        borderLeft: on ? '2px solid #10B981' : '2px solid transparent',
        color: on ? '#fff' : 'rgba(255,255,255,0.45)',
        transition: 'all 0.15s',
        position: 'relative',
      }}>
        {on && (
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 10,
            boxShadow: 'inset 0 0 20px rgba(16,185,129,0.08)',
            pointerEvents: 'none',
          }} />
        )}
        <span style={{ color: on ? '#10B981' : 'rgba(255,255,255,0.28)', flexShrink: 0, display: 'flex' }}>
          <Icon size={16} />
        </span>
        <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: on ? 600 : 400, lineHeight: 1, flex: 1 }}>
          {label}
        </span>
        {on && (
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', flexShrink: 0, boxShadow: '0 0 6px rgba(16,185,129,0.8)' }} />
        )}
      </div>
    </Link>
  );
}

/* ── Sidebar content ─────────────────────────────────────────────────── */
function SidebarContent({ onNavClick }: { onNavClick?: () => void }) {
  let lastGroup = '';

  return (
    <>
      {/* Logo */}
      <div style={{ padding: '24px 20px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 22, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1 }}>
            Al-Waj<span style={{ color: '#F59E0B' }}>ud</span>
          </div>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.28)', letterSpacing: '3px', textTransform: 'uppercase', marginTop: 5 }}>
            COMMAND CENTER
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '14px 10px', overflowY: 'auto' }}>
        {NAV_ITEMS.map(({ href, label, exact, group, Icon }) => {
          const showGroupHeader = group !== 'main' && group !== lastGroup;
          if (showGroupHeader) lastGroup = group;
          const header = showGroupHeader ? (
            <div key={`gh-${group}`} style={{
              fontFamily: 'var(--font-inter)', fontSize: 9, fontWeight: 700,
              color: 'rgba(255,255,255,0.2)', letterSpacing: '2.5px', textTransform: 'uppercase',
              marginTop: 18, marginBottom: 8, paddingLeft: 14,
            }}>
              {GROUP_LABELS[group]}
            </div>
          ) : null;

          return (
            <div key={href}>
              {header}
              <NavItem href={href} label={label} Icon={Icon} exact={exact} onClick={onNavClick} />
            </div>
          );
        })}

        {/* Divider + live site */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '16px 2px' }} />
        <Link href="/properties" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10,
            color: 'rgba(255,255,255,0.35)', transition: 'color 0.15s',
          }}>
            <ExternalLink size={14} style={{ color: 'rgba(255,255,255,0.22)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 12 }}>View Live Site</span>
            <ChevronRight size={12} style={{ marginLeft: 'auto', opacity: 0.4 }} />
          </div>
        </Link>
      </nav>

      {/* User card */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', borderRadius: 12,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg,#10B981,#059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            boxShadow: '0 0 12px rgba(16,185,129,0.3)',
          }}>
            <UserCircle size={16} color="#fff" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-poppins)', fontSize: 12, fontWeight: 600, color: '#fff', lineHeight: 1 }}>Admin</div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>Al-Wajud Staff</div>
          </div>
          <LogoutBtn compact />
        </div>
      </div>
    </>
  );
}

/* ── Main shell ───────────────────────────────────────────────────────── */
export default function AdminShell({ children, title, subtitle }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  function active(href: string, exact?: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <div style={{ height: '100vh', background: '#050A0F', display: 'flex', overflow: 'hidden', position: 'relative' }}>

      {/* Ambient glow */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `
          radial-gradient(ellipse 60% 40% at 10% 10%, rgba(16,185,129,0.06) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 90% 90%, rgba(20,184,166,0.04) 0%, transparent 70%)
        `,
      }} />

      {/* ── Desktop sidebar ─────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex"
        style={{
          width: 240, flexShrink: 0, flexDirection: 'column',
          background: 'rgba(3,6,14,0.99)',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          position: 'relative', zIndex: 10, overflow: 'hidden',
        }}
      >
        <SidebarContent />
      </aside>

      {/* ── Mobile overlay + drawer ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden"
              style={{ position: 'fixed', inset: 0, zIndex: 45, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            />
            <motion.aside
              key="drawer"
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden"
              style={{
                position: 'fixed', top: 0, left: 0, bottom: 0, width: 260, zIndex: 50,
                display: 'flex', flexDirection: 'column',
                background: 'rgba(3,6,14,0.99)',
                borderRight: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div style={{ position: 'absolute', top: 14, right: 14 }}>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer', color: 'rgba(255,255,255,0.6)', display: 'flex' }}
                >
                  <X size={16} />
                </button>
              </div>
              <SidebarContent onNavClick={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main column ─────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', position: 'relative', zIndex: 1, minWidth: 0 }}>

        {/* Mobile top bar */}
        <header className="lg:hidden" style={{
          position: 'sticky', top: 0, zIndex: 40, height: 56,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 16px',
          background: 'rgba(3,6,14,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          flexShrink: 0,
        }}>
          <button
            onClick={() => setMobileOpen(true)}
            style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer', color: 'rgba(255,255,255,0.6)', display: 'flex' }}
          >
            <Menu size={18} />
          </button>
          <Link href="/admin" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 18, color: '#fff' }}>
              Al-Waj<span style={{ color: '#F59E0B' }}>ud</span>
            </span>
          </Link>
          <LogoutBtn compact />
        </header>

        {/* Page header */}
        {(title || subtitle) && (
          <div className="px-4 lg:px-8" style={{ paddingTop: 32, flexShrink: 0 }}>
            {title && (
              <motion.h1
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 'clamp(22px,3vw,30px)', color: '#fff', marginBottom: 6, letterSpacing: '-0.5px' }}
              >
                {title}
              </motion.h1>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }}
                style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}

        {/* Content */}
        <main style={{ flex: 1, paddingBottom: 80 }}>
          {children}
        </main>
      </div>

      {/* ── Mobile bottom nav ─────────────────────────────────────────── */}
      <nav className="lg:hidden" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40,
        height: 62, display: 'flex', alignItems: 'stretch',
        background: 'rgba(3,6,14,0.98)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}>
        {MOB_NAV.map(({ href, label, exact, Icon }) => {
          const on = active(href, exact);
          return (
            <Link key={href} href={href} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 3, padding: '6px 0',
              textDecoration: 'none', position: 'relative',
              color: on ? '#10B981' : 'rgba(255,255,255,0.35)',
            }}>
              {on && (
                <span style={{
                  position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                  width: 28, height: 2, background: '#10B981', borderRadius: 99,
                  boxShadow: '0 0 8px rgba(16,185,129,0.8)',
                }} />
              )}
              <Icon size={18} />
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: 9, fontWeight: on ? 700 : 400, letterSpacing: '0.3px' }}>
                {label.split(' ')[0]}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
