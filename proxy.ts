import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Fail-safe: if the env var is missing, block access entirely.
  if (!adminPassword) {
    return new NextResponse('Admin access is not configured.', { status: 503 });
  }

  const authHeader = req.headers.get('authorization') ?? '';

  if (authHeader.startsWith('Basic ')) {
    const base64 = authHeader.slice(6);
    try {
      const decoded = atob(base64);           // "username:password"
      const colonIdx = decoded.indexOf(':');
      if (colonIdx !== -1) {
        const password = decoded.slice(colonIdx + 1);
        if (password === adminPassword) {
          return NextResponse.next();
        }
      }
    } catch {
      // malformed base64 — fall through to 401
    }
  }

  // No valid credentials — challenge the browser to show its native login dialog.
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Al-Wajud Admin", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
