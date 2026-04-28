import { TRUST_BADGES } from '@/app/lib/data';

export default function TrustBadges() {
  return (
    <section className="py-10 px-4 lg:px-16" style={{ background: '#fff', borderBottom: '1px solid #F3F4F6' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {TRUST_BADGES.map((b) => (
            <div key={b.label} className="flex items-center gap-3 lg:gap-4 p-4 rounded-2xl" style={{ background: '#F9FAFB', border: '1px solid #F3F4F6' }}>
              <span className="text-3xl lg:text-4xl flex-shrink-0">{b.icon}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '13px', color: 'var(--dark-text)' }}>{b.label}</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--gray)', marginTop: '2px', lineHeight: 1.4 }}>{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
