import { NextRequest, NextResponse } from 'next/server';

const COOKIE  = 'aw_admin_token';
const MAX_AGE = 60 * 60 * 8; // 8 hours

async function makeToken(u: string, p: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(`${u}:${p}:aw_admin_2026`),
  );
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as Record<string, string>;
  const { username = '', password = '' } = body;

  const expectedUser = process.env.ADMIN_USERNAME ?? '';
  const expectedPass = process.env.ADMIN_PASSWORD ?? '';

  if (!username || !password || username !== expectedUser || password !== expectedPass) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = await makeToken(username, password);
  const res   = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, token, {
    httpOnly : true,
    secure   : process.env.NODE_ENV === 'production',
    sameSite : 'lax',
    maxAge   : MAX_AGE,
    path     : '/',
  });
  return res;
}
