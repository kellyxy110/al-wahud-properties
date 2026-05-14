import type { Metadata } from 'next';
import AdminShell from './_components/AdminShell';
import DashboardClient, { type DashboardStats } from './_components/DashboardClient';
import { getSupabaseAdmin } from '@/app/lib/supabase/admin';

export const metadata: Metadata = {
  title : 'Command Center | Al-Wajud Admin',
  robots: { index: false, follow: false },
};

async function fetchStats(): Promise<DashboardStats> {
  try {
    const db = getSupabaseAdmin();

    const [total, tours, published, blog, media] = await Promise.allSettled([
      db.from('properties').select('id', { count: 'exact', head: true }),
      db.from('properties').select('id', { count: 'exact', head: true })
        .not('tiktok_id', 'is', null).eq('published', true),
      db.from('properties').select('id', { count: 'exact', head: true }).eq('published', true),
      db.from('blog_posts').select('id', { count: 'exact', head: true }),
      db.from('media_uploads').select('id', { count: 'exact', head: true }),
    ]);

    return {
      totalProperties  : total.status   === 'fulfilled' ? (total.value.count   ?? 0) : 0,
      featuredTours    : tours.status   === 'fulfilled' ? (tours.value.count   ?? 0) : 0,
      publishedListings: published.status === 'fulfilled' ? (published.value.count ?? 0) : 0,
      blogPosts        : blog.status    === 'fulfilled' ? (blog.value.count    ?? 0) : 0,
      mediaFiles       : media.status   === 'fulfilled' ? (media.value.count   ?? 0) : 0,
      totalViews       : 0,
    };
  } catch {
    return { totalProperties: 0, featuredTours: 0, publishedListings: 0, blogPosts: 0, mediaFiles: 0, totalViews: 0 };
  }
}

export default async function AdminPage() {
  const stats = await fetchStats();
  return (
    <AdminShell title="Command Center" subtitle="Real Estate Media Operating System">
      <DashboardClient stats={stats} />
    </AdminShell>
  );
}
