import type { Metadata } from 'next';
import AdminShell from '@/app/admin/_components/AdminShell';
import CeoUploadForm from './CeoUploadForm';

export const metadata: Metadata = {
  title : 'CEO Content | Al-Wajud Admin',
  robots: { index: false, follow: false },
};

export default function CeoUploadPage() {
  return (
    <AdminShell
      title="CEO Content"
      subtitle="Upload and manage the CEO profile photo displayed across the site."
    >
      <div className="px-4 lg:px-8" style={{ paddingTop: 28, paddingBottom: 40, maxWidth: 680 }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 24,
          padding: 'clamp(20px, 4vw, 36px)',
        }}>
          <CeoUploadForm />
        </div>

        <div style={{
          marginTop: 20,
          background: 'rgba(27,153,84,0.08)',
          border: '1px solid rgba(27,153,84,0.2)',
          borderRadius: 16,
          padding: '16px 20px',
        }}>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>
            How to apply the CEO photo:
          </p>
          <ol style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 2, paddingLeft: 18, margin: 0 }}>
            <li>Upload photo above and copy the URL</li>
            <li>Open <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 6px', borderRadius: 4, color: 'rgba(255,255,255,0.7)' }}>app/ceo/page.tsx</code></li>
            <li>Replace the profile image <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 6px', borderRadius: 4, color: 'rgba(255,255,255,0.7)' }}>src</code> with the copied URL</li>
          </ol>
        </div>
      </div>
    </AdminShell>
  );
}
