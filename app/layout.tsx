import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import SocialCluster from '@/app/components/SocialCluster';

const poppins = Poppins({
  weight: ['400', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const BASE_URL = 'https://alwajudproperties.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Al-Wajud Properties – Premium Real Estate Nigeria',
  description: 'Discover luxury properties across Lagos, Abuja, Port Harcourt and beyond. Trusted by 500+ happy families and investors. NIESV-certified, CAC-registered.',
  keywords: 'real estate Nigeria, Lagos property, Abuja property, luxury homes Nigeria',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: BASE_URL,
    siteName: 'Al-Wajud Properties',
    title: 'Al-Wajud Properties – Premium Real Estate Nigeria',
    description: 'Discover luxury properties across Lagos, Abuja, Port Harcourt and beyond. Trusted by 500+ happy families and investors.',
    images: [{ url: '/images/businessinfo2.jpeg', width: 1200, height: 630, alt: 'Al-Wajud Properties – Premium Real Estate Nigeria' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Al-Wajud Properties – Premium Real Estate Nigeria',
    description: 'Discover luxury properties across Lagos, Abuja, Port Harcourt and beyond. Trusted by 500+ happy families and investors.',
    images: ['/images/businessinfo2.jpeg'],
  },
};

// Runs synchronously before React hydrates — sets dark/light class based on local hour.
// Time rule always wins: dark 7 PM–5:59 AM, light 6 AM–6:59 PM.
// suppressHydrationWarning on <html> prevents React from complaining that the server
// rendered no "dark" class while the client script may have added one.
const themeScript = `
(function(){
  function isDarkHour(){var h=new Date().getHours();return h<6||h>=19;}
  function apply(){
    var dark=isDarkHour();
    document.documentElement.classList.toggle('dark',dark);
    try{localStorage.setItem('theme',dark?'dark':'light');}catch(e){}
  }
  apply();
  setInterval(apply,600000);
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
        <SocialCluster />
      </body>
    </html>
  );
}
