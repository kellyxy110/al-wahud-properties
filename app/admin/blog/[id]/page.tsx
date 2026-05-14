import type { Metadata } from 'next';
import AdminShell from '../../_components/AdminShell';
import BlogPostEditor, { type PostData } from '../BlogPostEditor';
import { getSupabaseAdmin } from '@/app/lib/supabase/admin';

export const metadata: Metadata = {
  title: 'Edit Post | Al-Wajud Admin',
  robots: { index: false, follow: false },
};

async function fetchPost(id: string): Promise<PostData | null> {
  try {
    const db = getSupabaseAdmin();
    const { data } = await db.from('blog_posts').select('*').eq('id', id).single();
    return data as PostData | null;
  } catch {
    return null;
  }
}

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await fetchPost(id);

  return (
    <AdminShell title={post ? `Edit: ${post.title?.slice(0, 40)}…` : 'Edit Post'} subtitle="Editorial Studio">
      <BlogPostEditor initial={post ?? { id }} />
    </AdminShell>
  );
}
