import type { Metadata } from 'next';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { createClient } from '@/app/lib/supabase/server';
import type { Property } from '@/app/lib/supabase/types';
import PropertiesClient from './PropertiesClient';

export const metadata: Metadata = {
  title: 'Properties | Al-Wajud Properties',
  description: 'Browse verified properties for sale, rent and short-let across Lagos, Abuja and Port Harcourt.',
};

export default async function PropertiesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('published', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  const properties: Property[] = (data ?? []) as Property[];

  return (
    <>
      <Navbar />
      <main>
        {error ? (
          <div className="min-h-screen flex items-center justify-center" style={{ fontFamily: 'var(--font-inter)', color: 'var(--gray)' }}>
            <div className="text-center">
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚠️</div>
              <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--dark-text)', marginBottom: '6px' }}>Failed to load properties</p>
              <p style={{ fontSize: '14px' }}>Unable to load listings. Please try again later.</p>
            </div>
          </div>
        ) : (
          <PropertiesClient initialProperties={properties} />
        )}
      </main>
      <div className="hidden lg:block"><Footer /></div>
    </>
  );
}
