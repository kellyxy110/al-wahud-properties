import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { createClient } from '@/app/lib/supabase/server';
import type { Property } from '@/app/lib/supabase/types';
import PropertyDetailClient from './PropertyDetailClient';

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from('properties')
    .select('title, location, description')
    .eq('id', Number(id))
    .single();

  if (!data) return { title: 'Property Not Found – Al-Wajud Properties' };
  return {
    title: `${data.title} | Al-Wajud Properties`,
    description: data.description || `${data.title} in ${data.location}. Contact Al-Wajud Properties for details.`,
  };
}

export default async function PropertyDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: property }, { data: allProps }] = await Promise.all([
    supabase.from('properties').select('*').eq('id', Number(id)).eq('published', true).single(),
    supabase.from('properties').select('*').eq('published', true).order('featured', { ascending: false }).limit(8),
  ]);

  if (!property) notFound();

  const similar = ((allProps ?? []) as Property[])
    .filter((p) => p.id !== property.id)
    .slice(0, 4);

  return (
    <>
      <Navbar />
      <main>
        <PropertyDetailClient property={property as Property} similar={similar} />
      </main>
      <Footer />
    </>
  );
}
