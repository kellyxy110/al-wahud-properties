import Link from 'next/link';
import Image from 'next/image';

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'Services', href: '/services' },
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const PROPERTY_TYPES = [
  { label: 'Luxury Duplexes', href: '/properties' },
  { label: 'Apartments & Flats', href: '/properties' },
  { label: 'Commercial Spaces', href: '/properties' },
  { label: 'Land & Plots', href: '/properties' },
  { label: 'Short Let', href: '/properties' },
  { label: 'Off-plan Homes', href: '/properties' },
];

const CONTACT_INFO: { label: string; href: string | null }[] = [
  { label: '📞 0703 537 4592', href: 'tel:07035374592' },
  { label: '✉️ alwajudproperties75@gmail.com', href: 'mailto:alwajudproperties75@gmail.com' },
  { label: '📍 Ikeja, Lagos State', href: null },
  { label: '⏰ Mon–Sat: 8am – 6pm', href: null },
  { label: '💬 WhatsApp Us', href: 'https://wa.me/2347035374592' },
];

const WA_SVG = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Footer() {
  return (
    <>
    <div className="lg:hidden" style={{ textAlign: 'center', padding: '24px 16px 32px' }}>
      <h2 style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', fontWeight: 400, color: 'rgba(0,0,0,0.18)', letterSpacing: '1px' }}>Kellyxy builds it</h2>
    </div>
    <footer className="hidden lg:block" style={{ background: 'var(--dark)', color: '#fff' }}>
      <div className="px-4 lg:px-[60px] pt-16 pb-8">

        {/* Top grid: 2 cols mobile → 2fr 1fr 1fr 1fr desktop */}
        <div className="footer-top-grid grid grid-cols-2 gap-10 mb-12">
          <div
            className="col-span-2 lg:col-span-1"
            style={{ gridColumn: undefined }}
          >
            {/* Brand */}
            <Image
              src="/images/alwajudlogo.jpeg"
              alt="Al-Wajud Properties"
              width={127} height={38}
              style={{ height: '38px', width: 'auto', objectFit: 'contain', borderRadius: '4px', marginBottom: '16px', display: 'block' }}
            />
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: '280px', marginBottom: '20px' }}>
              Nigeria&apos;s premier real estate company connecting buyers, sellers and investors with the finest properties across Lagos, Abuja and Port Harcourt.
            </p>
            <div className="flex gap-2.5">
              {[
                { href: 'https://wa.me/2347035374592', label: 'WhatsApp', icon: WA_SVG },
                {
                  href: 'https://www.instagram.com/alwajudproperties',
                  label: 'Instagram',
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>,
                },
                {
                  href: 'https://www.tiktok.com/@alwajudproperties',
                  label: 'TikTok',
                  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.54V6.78a4.84 4.84 0 01-1.07-.09z"/></svg>,
                },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors hover:bg-[var(--primary)]"
                  style={{ background: 'rgba(255,255,255,0.1)' }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '14px', color: '#fff', marginBottom: '20px' }}>Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map(l => (
                <li key={l.label}>
                  <Link href={l.href}
                    style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }}
                    className="hover:text-[var(--gold)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '14px', color: '#fff', marginBottom: '20px' }}>Property Types</h4>
            <ul className="flex flex-col gap-2.5">
              {PROPERTY_TYPES.map(l => (
                <li key={l.label}>
                  <Link href={l.href}
                    style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }}
                    className="hover:text-[var(--gold)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us — spans 2 on mobile, 1 on desktop */}
          <div className="col-span-2 lg:col-span-1">
            <h4 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '14px', color: '#fff', marginBottom: '20px' }}>Contact Us</h4>
            <ul className="flex flex-col gap-2.5">
              {CONTACT_INFO.map(c => (
                <li key={c.label}>
                  {c.href ? (
                    <a href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener"
                      style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }}
                      className="hover:text-[var(--gold)]">
                      {c.label}
                    </a>
                  ) : (
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
            © {new Date().getFullYear()} Al-Wajud Properties. All rights reserved.
          </p>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.5px' }}>
            Kellyxy builds it
          </p>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
            Built with ❤️ for Nigerian Real Estate
          </p>
        </div>
      </div>
    </footer>
    </>
  );
}
