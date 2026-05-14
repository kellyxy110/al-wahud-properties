import type { Metadata } from 'next';
import AdminShell from '../_components/AdminShell';
import BlogListClient from './BlogListClient';
import { getSupabaseAdmin } from '@/app/lib/supabase/admin';

export const metadata: Metadata = {
  title: 'Editorial Studio | Al-Wajud Admin',
  robots: { index: false, follow: false },
};

export interface BlogRow {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  published: boolean;
  featured: boolean;
  cover_image: string | null;
  author: string | null;
  created_at: string;
}

async function fetchPosts(): Promise<BlogRow[]> {
  try {
    const db = getSupabaseAdmin();
    const { data } = await db
      .from('blog_posts')
      .select('id,title,slug,category,excerpt,published,featured,cover_image,author,created_at')
      .order('created_at', { ascending: false });
    return (data as BlogRow[]) ?? [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await fetchPosts();
  return (
    <AdminShell title="Editorial Studio" subtitle="Create and manage blog content">
      <BlogListClient posts={posts} />
    </AdminShell>
  );
}
