import { createClient } from '@/app/lib/supabase/server';
import type { Property } from '@/app/lib/supabase/types';

export const metadata = { title: 'DB Test — Al-Wajud' };

function formatPrice(price: number, period: string) {
  return '₦' + price.toLocaleString('en-NG') + period;
}

export default async function TestDbPage() {
  const supabase = await createClient();

  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .eq('published', true)
    .limit(3);

  return (
    <div style={{ fontFamily: 'monospace', padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
        /test-db — Supabase Connection Test
      </h1>
      <p style={{ color: '#666', marginBottom: '2rem', fontSize: '0.875rem' }}>
        Delete this page before going to production.
      </p>

      {error ? (
        <div style={{ background: '#fee2e2', border: '1px solid #ef4444', padding: '1rem', borderRadius: 8 }}>
          <strong>Error:</strong> {error.message}
          <br />
          <span style={{ fontSize: '0.8rem', color: '#666' }}>Code: {error.code}</span>
        </div>
      ) : (
        <>
          <div style={{ background: '#dcfce7', border: '1px solid #22c55e', padding: '1rem', borderRadius: 8, marginBottom: '2rem' }}>
            <strong>Connected</strong> — fetched {properties?.length ?? 0} propert{properties?.length === 1 ? 'y' : 'ies'} from Supabase.
          </div>

          {properties && properties.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(properties as Property[]).map((p) => (
                <div
                  key={p.id}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    padding: '1rem',
                    background: '#f9fafb',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>
                    {p.title}
                  </div>
                  <div style={{ color: '#1B9954', fontWeight: 600, marginBottom: 4 }}>
                    {formatPrice(p.price, p.price_period)}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#374151', marginBottom: 4 }}>
                    {p.location} &middot; {p.status} &middot; {p.property_type}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                    {p.bedrooms > 0 && <>{p.bedrooms} bed &middot; </>}
                    {p.bathrooms > 0 && <>{p.bathrooms} bath &middot; </>}
                    {p.sqm > 0 && <>{p.sqm} sqm &middot; </>}
                    {p.images.length} image{p.images.length !== 1 ? 's' : ''}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: 4 }}>
                    id: {p.id} &middot; featured: {String(p.featured)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#6b7280' }}>
              No properties found. Run the seed data in the Supabase SQL editor.
            </p>
          )}

          <details style={{ marginTop: '2rem' }}>
            <summary style={{ cursor: 'pointer', color: '#6b7280', fontSize: '0.85rem' }}>
              Raw JSON response
            </summary>
            <pre style={{
              background: '#111827',
              color: '#d1fae5',
              padding: '1rem',
              borderRadius: 8,
              overflow: 'auto',
              fontSize: '0.75rem',
              marginTop: '0.5rem',
            }}>
              {JSON.stringify(properties, null, 2)}
            </pre>
          </details>
        </>
      )}
    </div>
  );
}
