import { NextRequest, NextResponse } from 'next/server';

const COOKIE = 'aw_admin_token';

async function makeToken(u: string, p: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(`${u}:${p}:aw_admin_2026`),
  );
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Login page is always public — never block it (avoids redirect loop)
  if (path === '/admin/login') return NextResponse.next();

  const token    = req.cookies.get(COOKIE)?.value ?? '';
  const expected = await makeToken(
    process.env.ADMIN_USERNAME ?? '',
    process.env.ADMIN_PASSWORD ?? '',
  );

  if (token !== expected) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin/login';
    url.searchParams.set('from', path);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
