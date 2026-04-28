// Connection test endpoint — visit /api/health after adding real env vars.
// DELETE this file before going to production.
import { createClient } from '@/app/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();

    // Lightweight query that works on every Supabase project.
    const { error } = await supabase.from('properties').select('id').limit(1);

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = table doesn't exist yet — still means the connection works.
      return NextResponse.json(
        { status: 'error', message: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      status: 'ok',
      message: 'Supabase connection successful',
      note: error?.code === 'PGRST116'
        ? 'Connected — but the properties table does not exist yet'
        : 'Connected and properties table found',
    });
  } catch (err) {
    return NextResponse.json(
      { status: 'error', message: String(err) },
      { status: 500 },
    );
  }
}
