'use client';

export default function LogoutButton() {
  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        fontFamily : 'var(--font-inter)',
        fontSize   : 13,
        fontWeight : 600,
        color      : '#fff',
        background : 'rgba(255,255,255,0.15)',
        border     : 'none',
        borderRadius: 999,
        padding    : '6px 16px',
        cursor     : 'pointer',
      }}
    >
      Logout
    </button>
  );
}
