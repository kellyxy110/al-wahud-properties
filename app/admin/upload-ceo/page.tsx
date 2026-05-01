import type { Metadata } from 'next';
import Link from 'next/link';
import LogoutButton from '@/app/admin/_components/LogoutButton';
import CeoUploadForm from './CeoUploadForm';

export const metadata: Metadata = {
  title : 'CEO Upload | Al-Wajud Admin',
  robots: { index: false, follow: false },
};

export default function CeoUploadPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>

      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-12 h-[60px]"
        style={{ background: '#0F5E36', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}
      >
        <div className="flex items-center gap-4">
          <Link href="/" style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 18, color: '#fff' }}>
            Al-Waj<span style={{ color: '#FFB703' }}>ud</span>
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }}>/</span>
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
            CEO Upload
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin"
            style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.1)', borderRadius: 999, padding: '6px 16px' }}>
            Dashboard
          </Link>
          <LogoutButton />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: 'var(--primary)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 8 }}>
            Admin Panel
          </div>
          <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 'clamp(22px,4vw,28px)', color: 'var(--dark-text)', marginBottom: 6 }}>
            CEO Profile Image Upload
          </h1>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: 'var(--gray)', lineHeight: 1.6 }}>
            Upload the CEO&apos;s profile photo to Supabase Storage. Copy the generated URL and
            update <code style={{ background: '#F3F4F6', padding: '1px 6px', borderRadius: 4, fontSize: 12 }}>app/ceo/page.tsx</code>.
          </p>
        </div>

        <div className="bg-white rounded-[24px] p-6 lg:p-8" style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.07)' }}>
          <CeoUploadForm />
        </div>
      </main>
    </div>
  );
}
