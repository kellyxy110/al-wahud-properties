import Link from 'next/link';

export default function HomeAbout() {
  return (
    <section id="about" className="py-20 px-4 lg:px-[60px]" style={{ background: '#fff' }}>
      <div>
        <div className="hidden lg:grid lg:grid-cols-2 gap-[72px] items-center">
          {/* Visual */}
          <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', height: '520px', background: "url('/images/business info.jpeg') center/cover, linear-gradient(135deg,#2D7A76,#0F5E36)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', background: 'rgba(255,255,255,.95)', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg,#FFB703,#E63946)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: '14px', color: '#fff', flexShrink: 0 }}>CEO</div>
              <div>
                <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '13px', color: '#111827' }}>Al-Wajud Founder</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: '#6B7280' }}>14+ Years Premium Real Estate</div>
                <div style={{ color: '#FFB703', fontSize: '12px', marginTop: '2px' }}>★★★★★ 5.0 Rating</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 600, color: 'var(--primary)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Who We Are</div>
            <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: '36px', color: 'var(--dark-text)', lineHeight: 1.2, marginBottom: '20px' }}>
              Nigeria&apos;s Most <span style={{ color: 'var(--primary)' }}>Trusted</span> Property Company
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'var(--gray)', lineHeight: 1.8, marginBottom: '16px' }}>
              Al-Wajud Properties is a premium real estate firm committed to connecting Nigerians and diaspora investors with the finest properties across the country. We operate with integrity, transparency and excellence.
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'var(--gray)', lineHeight: 1.8, marginBottom: '28px' }}>
              Our team of certified professionals provides end-to-end property services — from search and valuation to legal documentation and post-purchase support.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
              {[
                { val: '500+', lbl: 'Happy Clients & Investors' },
                { val: '₦50B+', lbl: 'Properties Transacted' },
                { val: '14+', lbl: 'Years of Excellence' },
                { val: '3', lbl: 'States of Operation' },
              ].map(({ val, lbl }) => (
                <div key={val} style={{ background: '#F9FAFB', borderRadius: '16px', padding: '20px', borderLeft: '4px solid var(--primary)' }}>
                  <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: '24px', color: 'var(--dark)' }}>{val}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--gray)', marginTop: '4px' }}>{lbl}</div>
                </div>
              ))}
            </div>
            <Link href="/about"
              className="inline-block text-white font-bold text-sm px-8 py-4 rounded-full transition-transform hover:-translate-y-0.5"
              style={{ fontFamily: 'var(--font-poppins)', background: 'linear-gradient(135deg,var(--accent),#FF6B9D)', boxShadow: '0 8px 24px rgba(230,57,70,.4)' }}>
              Read Our Full Story →
            </Link>
          </div>
        </div>

        {/* Mobile about */}
        <div className="lg:hidden">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', fontWeight: 600, color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Who We Are</div>
            <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: '22px', color: 'var(--dark-text)' }}>Nigeria&apos;s Most <span style={{ color: 'var(--primary)' }}>Trusted</span></div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--gray)', marginTop: '6px' }}>Property Company</div>
          </div>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,.06)' }}>
            <div style={{ height: '160px', background: "url('/images/business info.jpeg') center/cover, linear-gradient(135deg,#2D7A76,#0F5E36)", borderRadius: '16px', marginBottom: '16px' }} />
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#6B7280', lineHeight: 1.7, marginBottom: '14px' }}>
              Al-Wajud Properties is Nigeria&apos;s premier real estate firm. We connect buyers, sellers and investors with verified, premium properties across the country.
            </p>
            <div className="grid grid-cols-2 gap-2.5" style={{ marginBottom: '16px' }}>
              {[['500+', 'Happy Clients', '#1B9954'], ['₦50B+', 'Transacted', '#FFB703'], ['14+', 'Years', '#E63946'], ['3', 'States', '#2D7A76']].map(([v, l, c]) => (
                <div key={l} style={{ background: '#F9FAFB', borderRadius: '12px', padding: '14px', borderLeft: `3px solid ${c}` }}>
                  <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: '20px', color: 'var(--dark)' }}>{v}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: '#6B7280' }}>{l}</div>
                </div>
              ))}
            </div>
            <Link href="/about"
              className="inline-block text-white font-bold text-sm px-6 py-3 rounded-full"
              style={{ fontFamily: 'var(--font-poppins)', background: 'linear-gradient(135deg,var(--accent),#FF6B9D)' }}>
              Read Our Story →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
