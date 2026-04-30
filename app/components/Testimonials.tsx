import { TESTIMONIALS } from '@/app/lib/data';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 lg:px-[60px] bg-white">
      <div>
        {/* Header */}
        <div className="text-center mb-14">
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 600, color: 'var(--primary)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>
            Client Stories
          </div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 'clamp(28px,4vw,36px)', color: 'var(--dark-text)', lineHeight: 1.2, marginBottom: '12px' }}>
            What Our <span style={{ color: 'var(--primary)' }}>Clients</span> Say
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '15px', color: 'var(--gray)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            Real reviews from real Nigerians who found their dream properties through Al-Wajud.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white rounded-[20px] p-7" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <div style={{ color: 'var(--gold)', fontSize: '16px', marginBottom: '14px' }}>★★★★★</div>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: '#374151', lineHeight: 1.75, marginBottom: '20px', fontStyle: 'italic' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                  style={{ background: t.gradient, fontFamily: 'var(--font-poppins)' }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '13px', color: 'var(--dark-text)' }}>{t.name}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--gray)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
