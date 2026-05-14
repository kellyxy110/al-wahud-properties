import type { Metadata } from 'next';
import AdminShell from '../_components/AdminShell';
import AIAssistant from './AIAssistant';

export const metadata: Metadata = {
  title: 'AI Assistant | Al-Wajud Admin',
  robots: { index: false, follow: false },
};

export default function AIPage() {
  return (
    <AdminShell title="AI Assistant" subtitle="Intelligent content generation for your listings">
      <AIAssistant />
    </AdminShell>
  );
}
