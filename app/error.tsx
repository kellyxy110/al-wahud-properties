'use client';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[App Error]', error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--bg)' }}
    >
      <div className="text-center max-w-md">
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
        <h2
          style={{
            fontFamily: 'var(--font-poppins)',
            fontWeight: 800,
            fontSize: '22px',
            color: 'var(--dark-text)',
            marginBottom: '8px',
          }}
        >
          Something went wrong
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '14px',
            color: 'var(--gray)',
            marginBottom: '28px',
            lineHeight: 1.7,
          }}
        >
          We couldn&apos;t load this page. Please check your connection and try again.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={reset}
            style={{
              background: 'var(--primary)',
              color: '#fff',
              fontFamily: 'var(--font-poppins)',
              fontWeight: 700,
              fontSize: '14px',
              padding: '12px 28px',
              borderRadius: '99px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
          <a
            href="/"
            style={{
              background: 'transparent',
              color: 'var(--primary)',
              fontFamily: 'var(--font-poppins)',
              fontWeight: 700,
              fontSize: '14px',
              padding: '12px 28px',
              borderRadius: '99px',
              border: '2px solid var(--primary)',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
