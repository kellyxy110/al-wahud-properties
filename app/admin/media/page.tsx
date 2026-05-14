import type { Metadata } from 'next';
import AdminShell from '@/app/admin/_components/AdminShell';
import MediaClient from './MediaClient';

export const metadata: Metadata = {
  title : 'Media Library | Al-Wajud Admin',
  robots: { index: false, follow: false },
};

export default function MediaPage() {
  return (
    <AdminShell
      title="Media Library"
      subtitle="Browse, copy, preview, and manage all uploaded files from Supabase Storage."
    >
      <MediaClient />
    </AdminShell>
  );
}
