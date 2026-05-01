import type { Metadata } from 'next';
import Link from 'next/link';
import LogoutButton from './_components/LogoutButton';

export const metadata: Metadata = {
  title : 'Admin | Al-Wajud Properties',
  robots: { index: false, follow: false },
};

const ACTIONS = [
  {
    href    : '/admin/add-property',
    emoji   : '🏠',
    label   : 'Add Property',
    desc    : 'Create a new property listing with images, TikTok video and full details.',
    cta     : 'Open Form →',
    gradient: 'linear-gradient(135deg,#1B9954,#0F5E36)',
  },
  {
    href    : '/admin/upload-blog',
    emoji   : '📝',
    label   : 'Blog Image Upload',
    desc    : 'Upload a blog post cover image to Supabase Storage and get a public URL.',
    cta     : 'Upload →',
    gradient: 'linear-gradient(135deg,#2D7A76,#0F5E36)',
  },
  {
    href    : '/admin/upload-ceo',
    emoji   : '👤',
    label   : 'CEO Photo Upload',
    desc    : "Upload the CEO's profile photo to Supabase Storage and get a public URL.",
    cta     : 'Upload →',
    gradient: 'linear-gradient(135deg,#FFB703,#E63946)',
  },
  {
    href    : '/properties',
    emoji   : '👁',
    label   : 'View Live Listings',
    desc    : 'See all published properties as visitors see them.',
    cta     : 'View →',
    gradient: 'linear-gradient(135deg,#7C3AED,#2D7A76)',
  },
  {
    href    : '/test-db',
    emoji   : '🔌',
    label   : 'Database Health',
    desc    : 'Confirm Supabase connection and preview raw property data.',
    cta     : 'Check →',
    gradient: 'linear-gradient(135deg,#374151,#111827)',
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
          style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 18, color: '#fff' }}>
          Al-Waj<span style={{ color: '#FFB703' }}>ud</span>
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginLeft: 10 }}>Admin</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/"
            style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.1)', borderRadius: 999, padding: '6px 16px' }}>
            ← Main Site
          </Link>
          <LogoutButton />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 28, color: 'var(--dark-text)', marginBottom: 6 }}>
          Admin Dashboard
        </h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: 'var(--gray)', marginBottom: 36 }}>
          Internal tools for managing Al-Wajud Properties content.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACTIONS.map(a => (
            <Link key={a.href} href={a.href} className="block group">
              <div
                className="bg-white rounded-[20px] p-6 h-full transition-transform duration-200 group-hover:-translate-y-1"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: a.gradient }}
                >
                  {a.emoji}
                </div>
                <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 16, color: 'var(--dark-text)', marginBottom: 6 }}>
                  {a.label}
                </h2>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'var(--gray)', lineHeight: 1.6, marginBottom: 16 }}>
                  {a.desc}
                </p>
                <span style={{ fontFamily: 'var(--font-poppins)', fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>
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
