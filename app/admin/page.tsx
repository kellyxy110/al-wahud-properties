import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin | Al-Wajud Properties',
  robots: { index: false, follow: false },
};

const ACTIONS = [
  {
    href: '/admin/add-property',
    emoji: '🏠',
    label: 'Add Property',
    desc: 'Create a new property listing and publish it to the site.',
    cta: 'Open Form →',
    gradient: 'linear-gradient(135deg,#1B9954,#0F5E36)',
  },
  {
    href: '/properties',
    emoji: '👁',
    label: 'View Live Listings',
    desc: 'See all published properties as visitors see them.',
    cta: 'View →',
    gradient: 'linear-gradient(135deg,#2D7A76,#0F5E36)',
  },
  {
    href: '/test-db',
    emoji: '🔌',
    label: 'Database Health',
    desc: 'Confirm Supabase connection and preview raw property data.',
    cta: 'Check →',
    gradient: 'linear-gradient(135deg,#7C3AED,#2D7A76)',
  },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>

      {/* Top Bar */}
      <header
        className="flex items-center justify-between px-6 lg:px-12 h-[60px]"
        style={{ background: '#0F5E36', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}
      >
        <Link href="/"
          style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: '18px', color: '#fff' }}>
          Al-Waj<span style={{ color: '#FFB703' }}>ud</span>
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginLeft: '10px' }}>Admin</span>
        </Link>
        <Link href="/"
          className="text-[13px] font-semibold px-4 py-1.5 rounded-full"
          style={{ fontFamily: 'var(--font-inter)', color: '#fff', background: 'rgba(255,255,255,0.15)' }}>
          ← Main Site
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: '28px', color: 'var(--dark-text)', marginBottom: '6px' }}>
          Admin Dashboard
        </h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'var(--gray)', marginBottom: '36px' }}>
          Internal tools for managing Al-Wajud Properties content.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {ACTIONS.map(a => (
            <Link key={a.href} href={a.href} className="block group">
              <div
                className="bg-white rounded-[20px] p-6 h-full transition-transform duration-200 group-hover:-translate-y-1"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: a.gradient }}>
                  {a.emoji}
                </div>
                <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '16px', color: 'var(--dark-text)', marginBottom: '6px' }}>
                  {a.label}
                </h2>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--gray)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {a.desc}
                </p>
                <span style={{ fontFamily: 'var(--font-poppins)', fontSize: '13px', fontWeight: 700, color: 'var(--primary)' }}>
                  {a.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
