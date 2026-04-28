import { TESTIMONIALS } from '@/app/lib/data';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 600, color: 'var(--primary)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>
            Client Stories
          </div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 'clamp(28px,4vw,36px)', color: 'var(--dark-text)', lineHeight: 1.2, marginBottom: '12px' }}>
            What Our <span style={{ color: 'var(--primary)' }}>Clients</span> Say
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '15px', color: 'var(--gray)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Real reviews from buyers, sellers and investors who trusted Al-Wajud Properties.
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

        {/* Google rating strip */}
        <div className="mt-10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: 'linear-gradient(135deg,var(--primary),var(--dark))' }}>
          <div className="flex items-center gap-4">
            <div className="text-5xl font-black text-white" style={{ fontFamily: 'var(--font-poppins)' }}>5.0</div>
            <div>
              <div style={{ color: '#FFB703', fontSize: '22px' }}>★★★★★</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>Average client rating</div>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '18px', color: '#fff' }}>500+ Reviews</div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Across Google, WhatsApp & referrals</div>
          </div>
          <a href="https://wa.me/2347035374592?text=I%20would%20like%20to%20share%20my%20feedback%20on%20Al-Wajud%20Properties."
            target="_blank" rel="noopener"
            className="text-white font-bold text-sm px-7 py-3 rounded-full flex-shrink-0 transition-opacity hover:opacity-90"
            style={{ fontFamily: 'var(--font-poppins)', background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.4)' }}>
            Leave a Review →
          </a>
        </div>
      </div>
    </section>
  );
}
