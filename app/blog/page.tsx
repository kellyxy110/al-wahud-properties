import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { BLOG_POSTS } from '@/app/lib/data';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog – Al-Wajud Properties',
  description: 'Expert advice for investors & buyers — market trends, legal guides, and investment tips from the Al-Wajud Properties team.',
};

const PATTERN_BG = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E")`;

export default function BlogPage() {

  return (
    <>
      <Navbar />

      {/* ── Page Banner (PC) ── */}
      <div className="hidden lg:block" style={{ background: 'linear-gradient(135deg,#2D7A76 0%,#2D7A76 52%,#FBC598 52%,#FBC598 100%)', padding: '64px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: PATTERN_BG }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, position: 'relative', zIndex: 1 }}>
          <Link href="/" style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,.7)' }}>Home</Link>
          <span style={{ color: 'rgba(255,255,255,.4)' }}>›</span>
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#fff', fontWeight: 600 }}>Blog</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 44, color: '#fff', marginBottom: 10, position: 'relative', zIndex: 1 }}>Real Estate Insights</h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(255,255,255,.85)', position: 'relative', zIndex: 1, maxWidth: 560 }}>
          Expert advice for investors &amp; buyers — market trends, legal guides, and investment tips from the Al-Wajud Properties team.
        </p>
      </div>

      {/* ── Mobile Banner ── */}
      <div className="lg:hidden" style={{ background: 'linear-gradient(135deg,#2D7A76,#0F5E36)', padding: '24px 16px 32px' }}>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,.7)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 6 }}>Knowledge Hub</p>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 24, color: '#fff', marginBottom: 8 }}>Real Estate<br />Insights</h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,.8)' }}>Expert guides from our NIESV-certified team</p>
      </div>

      {/* ── Blog Layout (PC): Main + Sidebar — interactive filtering via client component ── */}
      <BlogClient />

      {/* ── Mobile Blog ── */}
      <div className="lg:hidden" style={{ padding: '24px 16px 120px' }}>
        {BLOG_POSTS.map(post => (
          <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 14 }}>
          <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 14px rgba(0,0,0,.07)' }}>
            <div style={{ height: 180, background: post.gradient, position: 'relative' }}>
              <Image src={post.img} alt={post.title} fill sizes="100vw" style={{ objectFit: 'cover' }} />
              <span style={{ position: 'absolute', top: 10, left: 10, background: '#ECFDF5', color: '#1B9954', fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 99 }}>{post.tag}</span>
            </div>
            <div style={{ padding: '16px 18px' }}>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: '#111827', lineHeight: 1.4, marginBottom: 8 }}>{post.title}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#6B7280' }}>{post.date} · {post.readTime}</div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontSize: 12, fontWeight: 700, color: '#1B9954', marginTop: 10 }}>Read Article →</div>
            </div>
          </div>
          </Link>
        ))}
        <a href="https://wa.me/2347035374592?text=Hello!%20Please%20add%20me%20to%20your%20property%20update%20list." target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', background: '#25D366', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, borderRadius: '1.5rem', padding: 16, boxShadow: '0 8px 24px rgba(37,211,102,.4)', textDecoration: 'none', marginTop: 8 }}>
          Join Our WhatsApp Update List
        </a>
      </div>

      <Footer />
    </>
  );
}
