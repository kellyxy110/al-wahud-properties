import type { Metadata } from 'next';
import AdminShell from '../_components/AdminShell';
import ProfileStudio from './ProfileStudio';

export const metadata: Metadata = {
  title: 'Executive Profile Studio | Al-Wajud Admin',
  robots: { index: false, follow: false },
};

export default function ProfilePage() {
  return (
    <AdminShell title="Executive Profile Studio" subtitle="Manage CEO presence and biography">
      <ProfileStudio />
    </AdminShell>
  );
}
