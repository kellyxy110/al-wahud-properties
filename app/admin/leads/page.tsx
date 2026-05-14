import type { Metadata } from 'next';
import AdminShell from '../_components/AdminShell';
import LeadsClient from './LeadsClient';

export const metadata: Metadata = {
  title: 'Client Leads CRM | Al-Wajud Admin',
  robots: { index: false, follow: false },
};

export default function LeadsPage() {
  return (
    <AdminShell title="Client Leads CRM" subtitle="Manage inquiries and close deals">
      <LeadsClient />
    </AdminShell>
  );
}
