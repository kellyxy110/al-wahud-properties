import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Legal – Al-Wajud Properties',
  description: 'Privacy Policy, Terms of Service, Cookie Policy and Disclaimer for Al-Wajud Properties.',
};

const PATTERN_BG = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E")`;

const SECTIONS = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    updated: 'January 2025',
    body: [
      { heading: 'What We Collect', text: 'We collect information you provide directly — name, email, phone number, and property preferences — when you contact us, use our search tools, or submit enquiry forms.' },
      { heading: 'How We Use It', text: 'Your information is used solely to respond to your enquiries, match you with suitable properties, and provide the services you requested. We do not sell or share your personal data with third parties without your consent.' },
      { heading: 'Data Security', text: 'We implement industry-standard security measures to protect your data. All data is stored securely and access is restricted to authorised team members only.' },
      { heading: 'Cookies', text: 'Our website uses essential cookies to ensure functionality. We do not use third-party tracking cookies without your explicit consent.' },
      { heading: 'Your Rights', text: 'You may request access to, correction of, or deletion of your personal data at any time by contacting us at alwajudproperties75@gmail.com.' },
    ],
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    updated: 'January 2025',
    body: [
      { heading: 'Acceptance', text: 'By using the Al-Wajud Properties website or engaging our services, you agree to these Terms of Service. If you do not agree, please do not use our services.' },
      { heading: 'Our Services', text: 'Al-Wajud Properties provides real estate agency services including property sales, lettings, valuation and investment advisory. All property listings are verified but pricing and availability are subject to change without notice.' },
      { heading: 'No Legal Advice', text: 'Information provided on this website is for general informational purposes only and does not constitute legal, financial or investment advice. Always consult a qualified professional before making property decisions.' },
      { heading: 'Limitation of Liability', text: 'Al-Wajud Properties shall not be held liable for any loss or damage arising from reliance on information on this website or from property transactions facilitated by our agency.' },
      { heading: 'Intellectual Property', text: 'All content on this website — including text, images, logos and design — is the property of Al-Wajud Properties Ltd and may not be reproduced without written permission.' },
    ],
  },
  {
    id: 'cookies',
    title: 'Cookie Policy',
    updated: 'January 2025',
    body: [
      { heading: 'What Are Cookies', text: 'Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and provide a better browsing experience.' },
      { heading: 'Cookies We Use', text: 'We use strictly necessary cookies for site functionality (e.g., session management). We do not currently use analytics or advertising cookies.' },
      { heading: 'Managing Cookies', text: 'You can control and delete cookies through your browser settings. Note that disabling certain cookies may affect the functionality of the website.' },
      { heading: 'Third-Party Cookies', text: 'Our site may embed content from third-party services (e.g., Google Maps, TikTok). These services may set their own cookies, governed by their respective privacy policies.' },
    ],
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer',
    updated: 'January 2025',
    body: [
      { heading: 'Property Information', text: 'All property details, prices and availability listed on this site are provided in good faith but may change without notice. Al-Wajud Properties makes no warranty as to the accuracy of third-party information.' },
      { heading: 'No Investment Guarantee', text: 'Real estate investment carries risk. Past transaction volumes and client testimonials are provided for informational purposes only and do not constitute a guarantee of future results.' },
      { heading: 'External Links', text: 'Our website may contain links to third-party websites. We are not responsible for the content, accuracy or privacy practices of those sites.' },
      { heading: 'Contact Us', text: 'If you have any questions about our legal policies, contact us at alwajudproperties75@gmail.com or visit our office at 112, Adeniyi Jones, Ikeja, Lagos.' },
    ],
  },
];

export default function LegalPage() {
  return (
    <>
      <Navbar />

      {/* ── Page Banner (PC) ── */}
      <div className="hidden lg:block" style={{ background: 'linear-gradient(135deg,#2D7A76 0%,#2D7A76 52%,#FBC598 52%,#FBC598 100%)', padding: '64px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: PATTERN_BG }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, position: 'relative', zIndex: 1 }}>
          <Link href="/" style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,.7)' }}>Home</Link>
          <span style={{ color: 'rgba(255,255,255,.4)' }}>›</span>
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#fff', fontWeight: 600 }}>Legal</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 44, color: '#fff', marginBottom: 10, position: 'relative', zIndex: 1 }}>Legal Information</h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(255,255,255,.85)', position: 'relative', zIndex: 1, maxWidth: 560 }}>
          Privacy Policy, Terms of Service, Cookie Policy and Disclaimer for Al-Wajud Properties Ltd.
        </p>
      </div>

      {/* ── Mobile Banner ── */}
      <div className="lg:hidden" style={{ background: 'linear-gradient(135deg,#2D7A76,#0F5E36)', padding: '24px 16px 32px' }}>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,.7)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 6 }}>Policies</p>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 24, color: '#fff', marginBottom: 8 }}>Legal Information</h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,.8)' }}>Privacy, Terms, Cookies &amp; Disclaimer</p>
      </div>

      {/* ── Quick Nav (PC) ── */}
      <div className="hidden lg:flex" style={{ padding: '24px 60px', background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', gap: 24 }}>
        {SECTIONS.map(s => (
          <a key={s.id} href={`#${s.id}`} style={{ fontFamily: 'var(--font-poppins)', fontSize: 13, fontWeight: 600, color: '#1B9954', textDecoration: 'none' }}>
            {s.title}
          </a>
        ))}
      </div>

      {/* ── Content ── */}
      <div style={{ padding: '60px 60px 80px', maxWidth: 900, margin: '0 auto' }} className="px-4 lg:px-16">
        {SECTIONS.map(section => (
          <section key={section.id} id={section.id} style={{ marginBottom: 64 }}>
            <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '2px solid #1B9954' }}>
              <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 28, color: '#111827', marginBottom: 4 }}>{section.title}</h2>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280' }}>Last updated: {section.updated}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {section.body.map(item => (
                <div key={item.heading}>
                  <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 6 }}>{item.heading}</h3>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#6B7280', lineHeight: 1.8 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div style={{ background: 'linear-gradient(135deg,#F0FDF4,#ECFDF5)', borderRadius: 20, padding: 32, border: '1px solid #D1FAE5', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 18, color: '#111827', marginBottom: 8 }}>Questions About Our Policies?</div>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#6B7280', marginBottom: 20 }}>Contact us at alwajudproperties75@gmail.com or via WhatsApp and we&apos;ll respond within 24 hours.</p>
          <Link href="/contact" style={{ display: 'inline-block', background: 'linear-gradient(135deg,#1B9954,#0F5E36)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, padding: '14px 28px', borderRadius: 99, textDecoration: 'none' }}>
            Contact Us
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
