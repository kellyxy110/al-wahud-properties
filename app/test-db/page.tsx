import { notFound } from 'next/navigation';

// This debug page is disabled in production.
// To re-enable locally: set NEXT_PUBLIC_ENABLE_DEBUG=true in .env.local
export default function TestDbPage() {
  if (process.env.NEXT_PUBLIC_ENABLE_DEBUG !== 'true') {
    notFound();
  }
  return null;
}
