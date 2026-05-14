import type { Metadata } from 'next';
import AdminShell from '../_components/AdminShell';
import ToursClient from './ToursClient';
import { getSupabaseAdmin } from '@/app/lib/supabase/admin';

export const metadata: Metadata = {
  title: 'Featured Tours Studio | Al-Wajud Admin',
  robots: { index: false, follow: false },
};

export interface TourProperty {
  id: string;
  title: string;
  location: string;
  tiktok_id: string | null;
  featured_tour: boolean;
  published: boolean;
  images: string[] | null;
  gradient: string | null;
}

async function fetchTours(): Promise<TourProperty[]> {
  try {
    const db = getSupabaseAdmin();
    const { data } = await db
      .from('properties')
      .select('id,title,location,tiktok_id,featured_tour,published,images,gradient')
      .not('tiktok_id', 'is', null)
      .order('created_at', { ascending: false });
    return (data as TourProperty[]) ?? [];
  } catch {
    return [];
  }
}

export default async function ToursPage() {
  const tours = await fetchTours();
  return (
    <AdminShell title="Featured Tours Studio" subtitle="Cinematic TikTok property tours">
      <ToursClient tours={tours} />
    </AdminShell>
  );
}
