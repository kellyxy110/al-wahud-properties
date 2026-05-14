import type { Metadata } from 'next';
import AdminShell from '@/app/admin/_components/AdminShell';
import AddPropertyForm from './AddPropertyForm';

export const metadata: Metadata = {
  title : 'Property Studio | Al-Wajud Admin',
  robots: { index: false, follow: false },
};

export default function AddPropertyPage() {
  return (
    <AdminShell
      title="Property Studio"
      subtitle="Create a new property listing with images, TikTok tour, and full details."
    >
      <div className="px-4 lg:px-8" style={{ paddingTop: 28, paddingBottom: 40 }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 24,
          padding: 'clamp(20px, 4vw, 40px)',
        }}>
          <AddPropertyForm />
        </div>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 20 }}>
          Data written via Supabase service role (server-only) · Not visible to the public
        </p>
      </div>
    </AdminShell>
  );
}
