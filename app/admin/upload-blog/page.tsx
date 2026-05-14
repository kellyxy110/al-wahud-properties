import type { Metadata } from 'next';
import AdminShell from '@/app/admin/_components/AdminShell';
import BlogUploadForm from './BlogUploadForm';

export const metadata: Metadata = {
  title : 'Blog CMS | Al-Wajud Admin',
  robots: { index: false, follow: false },
};

export default function BlogUploadPage() {
  return (
    <AdminShell
      title="Blog CMS"
      subtitle="Upload blog post cover images to Supabase Storage and manage post records."
    >
      <div className="px-4 lg:px-8" style={{ paddingTop: 28, paddingBottom: 40, maxWidth: 720 }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 24,
          padding: 'clamp(20px, 4vw, 36px)',
        }}>
          <BlogUploadForm />
        </div>

        {/* How-to callout */}
        <div style={{
          marginTop: 20,
          background: 'rgba(27,153,84,0.08)',
          border: '1px solid rgba(27,153,84,0.2)',
          borderRadius: 16,
          padding: '16px 20px',
        }}>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>
            How to use the URL in your blog posts:
          </p>
          <ol style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 2, paddingLeft: 18, margin: 0 }}>
            <li>Upload image above and copy the public URL</li>
            <li>Open <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 6px', borderRadius: 4, color: 'rgba(255,255,255,0.7)' }}>app/lib/data.ts</code></li>
            <li>Find the blog post and update its <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 6px', borderRadius: 4, color: 'rgba(255,255,255,0.7)' }}>img</code> field</li>
          </ol>
        </div>
      </div>
    </AdminShell>
  );
}
