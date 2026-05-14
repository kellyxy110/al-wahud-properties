import type { Metadata } from 'next';
import AdminShell from '../_components/AdminShell';
import PropertiesClient from './PropertiesClient';
import { getSupabaseAdmin } from '@/app/lib/supabase/admin';

export const metadata: Metadata = {
  title: 'Property Studio | Al-Wajud Admin',
  robots: { index: false, follow: false },
};

export interface PropertyRow {
  id: string;
  title: string;
  location: string;
  price: number;
  status: string;
  property_type: string;
  published: boolean;
  featured: boolean;
  featured_tour: boolean;
  images: string[] | null;
  gradient: string | null;
  created_at: string;
}

async function fetchProperties(): Promise<PropertyRow[]> {
  try {
    const db = getSupabaseAdmin();
    const { data } = await db
      .from('properties')
      .select('id,title,location,price,status,property_type,published,featured,featured_tour,images,gradient,created_at')
      .order('created_at', { ascending: false });
    return (data as PropertyRow[]) ?? [];
  } catch {
    return [];
  }
}

export default async function PropertiesPage() {
  const properties = await fetchProperties();
  return (
    <AdminShell title="Property Studio" subtitle="Manage all listings and media">
      <PropertiesClient properties={properties} />
    </AdminShell>
  );
}
