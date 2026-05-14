import type { Metadata } from 'next';
import AdminShell from '../_components/AdminShell';
import AnalyticsClient from './AnalyticsClient';
import { getSupabaseAdmin } from '@/app/lib/supabase/admin';

export const metadata: Metadata = {
  title: 'Analytics Center | Al-Wajud Admin',
  robots: { index: false, follow: false },
};

export interface AnalyticsData {
  totalProperties: number;
  publishedProperties: number;
  totalBlogPosts: number;
  byLocation: { location_key: string; count: number }[];
  byType: { property_type: string; count: number }[];
  recentProperties: { title: string; location: string; created_at: string }[];
}

async function fetchAnalytics(): Promise<AnalyticsData> {
  try {
    const db = getSupabaseAdmin();
    const [total, published, blogCount, allProps] = await Promise.allSettled([
      db.from('properties').select('id', { count: 'exact', head: true }),
      db.from('properties').select('id', { count: 'exact', head: true }).eq('published', true),
      db.from('blog_posts').select('id', { count: 'exact', head: true }),
      db.from('properties').select('location_key,property_type,title,location,created_at').order('created_at', { ascending: false }),
    ]);

    const props = allProps.status === 'fulfilled' ? (allProps.value.data ?? []) : [];

    const byLoc: Record<string, number> = {};
    const byType: Record<string, number> = {};
    for (const p of props as { location_key: string; property_type: string }[]) {
      if (p.location_key) byLoc[p.location_key] = (byLoc[p.location_key] ?? 0) + 1;
      if (p.property_type) byType[p.property_type] = (byType[p.property_type] ?? 0) + 1;
    }

    return {
      totalProperties:   total.status     === 'fulfilled' ? (total.value.count   ?? 0) : 0,
      publishedProperties: published.status === 'fulfilled' ? (published.value.count ?? 0) : 0,
      totalBlogPosts:    blogCount.status  === 'fulfilled' ? (blogCount.value.count ?? 0) : 0,
      byLocation: Object.entries(byLoc).map(([k, v]) => ({ location_key: k, count: v })),
      byType:     Object.entries(byType).map(([k, v]) => ({ property_type: k, count: v })),
      recentProperties: (props as { title: string; location: string; created_at: string }[]).slice(0, 5),
    };
  } catch {
    return { totalProperties: 0, publishedProperties: 0, totalBlogPosts: 0, byLocation: [], byType: [], recentProperties: [] };
  }
}

export default async function AnalyticsPage() {
  const data = await fetchAnalytics();
  return (
    <AdminShell title="Analytics Center" subtitle="Performance insights and portfolio metrics">
      <AnalyticsClient data={data} />
    </AdminShell>
  );
}
