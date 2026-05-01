import type { Metadata } from 'next';
import { Suspense } from 'react';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title  : 'Admin Login | Al-Wajud Properties',
  robots : { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>

      <header
        className="flex items-center px-6 lg:px-12 h-[60px]"
        style={{ background: '#0F5E36', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}
      >
        <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 18, color: '#fff' }}>
          Al-Waj<span style={{ color: '#FFB703' }}>ud</span>
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginLeft: 10 }}>Admin</span>
        </span>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {/* useSearchParams() must be inside Suspense */}
        <Suspense>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}
