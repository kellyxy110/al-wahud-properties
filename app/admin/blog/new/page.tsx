import type { Metadata } from 'next';
import AdminShell from '../../_components/AdminShell';
import BlogPostEditor from '../BlogPostEditor';

export const metadata: Metadata = {
  title: 'New Blog Post | Al-Wajud Admin',
  robots: { index: false, follow: false },
};

export default function NewBlogPage() {
  return (
    <AdminShell title="New Blog Post" subtitle="Editorial Studio — Write and publish">
      <BlogPostEditor />
    </AdminShell>
  );
}
