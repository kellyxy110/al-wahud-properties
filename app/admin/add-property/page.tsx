import type { Metadata } from 'next';
import Link from 'next/link';
import AddPropertyForm from './AddPropertyForm';

export const metadata: Metadata = {
  title: 'Add Property | Al-Wajud Admin',
  robots: { index: false, follow: false },
};

export default function AddPropertyPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>

      {/* ── Admin Top Bar ── */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-12 h-[60px]"
        style={{ background: '#0F5E36', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}
      >
        <div className="flex items-center gap-4">
          <Link href="/"
            style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: '18px', color: '#fff', letterSpacing: '-0.3px' }}>
            Al-Waj<span style={{ color: '#FFB703' }}>ud</span>
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '18px' }}>/</span>
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
            Admin
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin"
            className="text-[13px] font-semibold px-4 py-1.5 rounded-full transition-colors"
            style={{ fontFamily: 'var(--font-inter)', color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.1)' }}>
            Dashboard
          </Link>
          <Link href="/properties"
            className="text-[13px] font-semibold px-4 py-1.5 rounded-full transition-colors"
            style={{ fontFamily: 'var(--font-inter)', color: '#fff', background: 'rgba(255,255,255,0.15)' }}>
            View Live Site →
          </Link>
        </div>
      </header>

      {/* ── Page Content ── */}
      <main className="max-w-4xl mx-auto px-4 lg:px-0 py-10">

        {/* Page heading */}
        <div className="mb-8">
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 600, color: 'var(--primary)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>
            Admin Panel
          </div>
          <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 'clamp(24px,4vw,32px)', color: 'var(--dark-text)', marginBottom: '6px' }}>
            Add New Property
          </h1>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'var(--gray)', lineHeight: 1.6 }}>
            Fill in the details below. Fields marked <span style={{ color: '#E63946' }}>*</span> are required.
            The property will be inserted directly into Supabase.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[24px] p-6 lg:p-10"
          style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.07)' }}>
          <AddPropertyForm />
        </div>

        {/* Footer note */}
        <p className="text-center mt-8 text-[12px]"
          style={{ fontFamily: 'var(--font-inter)', color: 'var(--gray)' }}>
          Data is written using the Supabase service role key (server-only). Not visible to the public.
        </p>
      </main>
    </div>
  );
}
