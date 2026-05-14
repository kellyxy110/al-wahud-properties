import type { Metadata } from 'next';
import AdminShell from '@/app/admin/_components/AdminShell';
import { Settings, Shield, Database, Globe, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title : 'Settings | Al-Wajud Admin',
  robots: { index: false, follow: false },
};

const SETTINGS = [
  {
    group: 'Site Identity', Icon: Globe, color: '#10B981',
    items: [
      { label: 'Business Name',   value: 'Al-Wajud Properties Ltd',          desc: 'Displayed across the site and in metadata' },
      { label: 'WhatsApp Number', value: '2347035374592',                    desc: 'Used for all WhatsApp CTAs' },
      { label: 'Contact Email',   value: 'alwajudproperties75@gmail.com',    desc: 'Shown on the contact page' },
    ],
  },
  {
    group: 'Supabase Backend', Icon: Database, color: '#3B82F6',
    items: [
      { label: 'Project URL',     value: 'https://abynlxby***.supabase.co',  desc: 'Set in .env.local (masked for security)' },
      { label: 'Storage Bucket', value: 'media',                             desc: 'All uploads go to this bucket' },
      { label: 'Active Tables',   value: 'properties, blog_posts, media_uploads', desc: 'Main database tables' },
    ],
  },
  {
    group: 'Admin Security', Icon: Shield, color: '#F59E0B',
    items: [
      { label: 'Auth Method',      value: 'SHA-256 Cookie Token',            desc: 'Cookie: aw_admin_token (httpOnly, 8h TTL)' },
      { label: 'Protected Routes', value: '/admin/*',                         desc: 'All /admin routes require authentication' },
      { label: 'Middleware',       value: 'proxy.ts (Next.js 16)',             desc: 'Edge-compatible auth middleware' },
    ],
  },
  {
    group: 'AI Configuration', Icon: Zap, color: '#8B5CF6',
    items: [
      { label: 'AI Provider',     value: 'Anthropic Claude (not yet configured)', desc: 'Add ANTHROPIC_API_KEY to .env.local to enable' },
      { label: 'AI Route',        value: '/api/ai/generate',                 desc: 'Not yet created — AI responses are simulated' },
    ],
  },
];

export default function SettingsPage() {
  return (
    <AdminShell title="Settings" subtitle="System configuration and environment">
      <div className="px-4 lg:px-8" style={{ paddingTop: 28, paddingBottom: 48, maxWidth: 780 }}>

        {SETTINGS.map(section => (
          <div key={section.group} style={{ marginBottom: 24 }}>
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${section.color}20`, border: `1px solid ${section.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <section.Icon size={13} style={{ color: section.color }} />
              </div>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: section.color, letterSpacing: '2.5px', textTransform: 'uppercase' }}>
                {section.group}
              </span>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, overflow: 'hidden' }}>
              {section.items.map((it, idx) => (
                <div key={it.label} style={{
                  padding: '15px 22px',
                  borderBottom: idx < section.items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap',
                }}>
                  <div style={{ flex: '0 0 160px', minWidth: 120 }}>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>{it.label}</div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>{it.desc}</div>
                  </div>
                  <code style={{ flex: 1, fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: 8, wordBreak: 'break-all', display: 'block' }}>
                    {it.value}
                  </code>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Danger zone */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Settings size={13} style={{ color: '#EF4444' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: '#EF4444', letterSpacing: '2.5px', textTransform: 'uppercase' }}>Actions</span>
          </div>
          <div style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)', borderRadius: 18, padding: '18px 22px', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="/test-db" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
              Database Health Check
            </a>
            <a href="/admin/media" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
              Media Vault
            </a>
          </div>
        </div>

        {/* Config note */}
        <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 16, padding: '16px 20px' }}>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(245,158,11,0.85)', fontWeight: 600, marginBottom: 4 }}>Configuration Note</p>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
            Environment variables are managed in <code style={{ color: 'rgba(255,255,255,0.6)' }}>.env.local</code> for local development and synced to Vercel via the dashboard. To update, go to Vercel Project → Settings → Environment Variables, then redeploy.
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
