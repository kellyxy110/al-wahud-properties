import { NextResponse } from 'next/server';

// Health endpoint is disabled in production.
// To re-enable locally: set NEXT_PUBLIC_ENABLE_DEBUG=true in .env.local
export async function GET() {
  if (process.env.NEXT_PUBLIC_ENABLE_DEBUG !== 'true') {
    return NextResponse.json({ status: 'not found' }, { status: 404 });
  }

  const { createClient } = await import('@/app/lib/supabase/server');
  const supabase = await createClient();
  const { error } = await supabase.from('properties').select('id').limit(1);

  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }

  return NextResponse.json({ status: 'ok' });
}
