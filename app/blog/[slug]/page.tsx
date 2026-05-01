import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { BLOG_POSTS } from '@/app/lib/data';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found – Al-Wajud Properties' };
  return {
    title: `${post.title} – Al-Wajud Properties Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== slug);

  return (
    <>
      <Navbar />

      {/* ── Hero (PC) ── */}
      <div
        className="hidden lg:flex items-end"
        style={{
          height: 420,
          background: post.img ? `url(${post.img}) center/cover` : post.gradient,
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,.7) 0%,rgba(0,0,0,.2) 60%,transparent 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 60px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Link href="/" style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,.4)' }}>›</span>
            <Link href="/blog" style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>Blog</Link>
            <span style={{ color: 'rgba(255,255,255,.4)' }}>›</span>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#fff' }}>{post.tag}</span>
          </div>
          <span style={{ display: 'inline-block', background: '#E63946', color: '#fff', fontFamily: 'var(--font-poppins)', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 99, marginBottom: 14 }}>{post.tag}</span>
          <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 38, color: '#fff', lineHeight: 1.2, maxWidth: 720, marginBottom: 16 }}>{post.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,.8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#1B9954,#2D7A76)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-poppins)', fontSize: 10, fontWeight: 700, color: '#fff' }}>AW</div>
              Al-Wajud Properties
            </div>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* ── Mobile Hero ── */}
      <div
        className="lg:hidden flex items-end"
        style={{
          height: 240,
          background: post.img ? `url(${post.img}) center/cover` : post.gradient,
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,.75) 0%,rgba(0,0,0,.15) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 16px 20px', width: '100%' }}>
          <span style={{ display: 'inline-block', background: '#E63946', color: '#fff', fontFamily: 'var(--font-poppins)', fontSize: 10, fontWeight: 700, padding: '3px 12px', borderRadius: 99, marginBottom: 10 }}>{post.tag}</span>
          <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 900, fontSize: 20, color: '#fff', lineHeight: 1.3, marginBottom: 8 }}>{post.title}</h1>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,.8)' }}>{post.date} · {post.readTime}</div>
        </div>
      </div>

      {/* ── PC Layout: Article + Sidebar ── */}
      <div className="hidden lg:grid" style={{ gridTemplateColumns: '1fr 320px', gap: 40, padding: '60px 60px 80px', alignItems: 'start', maxWidth: 1400, margin: '0 auto' }}>
        {/* Article */}
        <article>
          <div
            style={{ background: '#fff', borderRadius: 20, padding: '40px 48px', boxShadow: '0 4px 20px rgba(0,0,0,.06)', fontFamily: 'var(--font-inter)', fontSize: 15, color: '#374151', lineHeight: 1.9 }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA box */}
          <div style={{ background: 'linear-gradient(135deg,#0F5E36,#2D7A76)', borderRadius: 20, padding: 32, margin: '32px 0', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 22, color: '#fff', marginBottom: 10 }}>Ready to Invest?</h3>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: 'rgba(255,255,255,.85)', marginBottom: 20, lineHeight: 1.7 }}>
              Speak to our expert team today — free consultation, no obligation.
            </p>
            <a
              href="https://wa.me/2347035374592?text=Hello!%20I%20read%20your%20blog%20and%20would%20like%20a%20consultation."
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', background: 'linear-gradient(135deg,#E63946,#FF6B9D)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, padding: '14px 32px', borderRadius: 99, textDecoration: 'none', boxShadow: '0 8px 24px rgba(230,57,70,.4)' }}
            >
              Book Free Consultation →
            </a>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {[post.tag, 'Nigeria', 'Lagos', 'Real Estate'].map((t) => (
              <span key={t} style={{ background: '#F3F4F6', color: '#374151', fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 500, padding: '6px 14px', borderRadius: 99 }}>{t}</span>
            ))}
          </div>
        </article>

        {/* Sidebar */}
        <aside>
          {/* Author card */}
          <div style={{ background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 4px 16px rgba(0,0,0,.06)', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#1B9954,#2D7A76)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-poppins)', fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0 }}>AW</div>
              <div>
                <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: '#111827' }}>Al-Wajud Properties</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280' }}>NIESV Certified Real Estate Experts</div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.7 }}>
              Nigeria&apos;s trusted property advisers — 14+ years connecting buyers, sellers and investors with verified opportunities.
            </p>
          </div>

          {/* Related posts */}
          <div style={{ background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 4px 16px rgba(0,0,0,.06)', marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #F3F4F6' }}>Related Articles</div>
            {related.map((rp) => (
              <Link key={rp.id} href={`/blog/${rp.slug}`} style={{ textDecoration: 'none', display: 'flex', gap: 12, marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid #F9FAFB' }}>
                <div style={{ width: 60, height: 60, borderRadius: 12, flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                  <Image src={rp.img} alt="" fill sizes="60px" style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 12, color: '#111827', lineHeight: 1.4, marginBottom: 4 }}>{rp.title}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: '#6B7280' }}>{rp.date}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Share */}
          <div style={{ background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 4px 16px rgba(0,0,0,.06)', marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 14 }}>Share This Article</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { label: 'WhatsApp', bg: '#25D366', href: `https://wa.me/?text=${encodeURIComponent(post.title + ' — Al-Wajud Properties')}` },
                { label: 'Twitter/X', bg: '#000', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}` },
                { label: 'LinkedIn', bg: '#0A66C2', href: `https://www.linkedin.com/sharing/share-offsite/?url=https://alwajudproperties.com/blog/${post.slug}` },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: s.bg, color: '#fff', fontFamily: 'var(--font-poppins)', fontSize: 11, fontWeight: 700, borderRadius: 12, padding: '10px 0', textDecoration: 'none' }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div style={{ background: 'linear-gradient(135deg,#0F5E36,#2D7A76)', borderRadius: 20, padding: 24 }}>
            <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 10 }}>📬 Newsletter</div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,.8)', marginBottom: 16, lineHeight: 1.6 }}>
              Get weekly market updates and exclusive property deals.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input type="email" placeholder="Your email address" style={{ padding: '10px 14px', borderRadius: 12, border: '1.5px solid #4B8B5E', fontFamily: 'var(--font-inter)', fontSize: 13, outline: 'none', background: 'rgba(255,255,255,.9)' }} />
              <button style={{ background: 'linear-gradient(135deg,#E63946,#FF6B9D)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, border: 'none', borderRadius: 12, padding: 12, cursor: 'pointer' }}>Subscribe Free</button>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Mobile Layout ── */}
      <div className="lg:hidden" style={{ padding: '24px 16px 120px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, fontFamily: 'var(--font-inter)', fontSize: 11, color: '#6B7280' }}>
          <Link href="/" style={{ color: '#6B7280', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href="/blog" style={{ color: '#6B7280', textDecoration: 'none' }}>Blog</Link>
          <span>›</span>
          <span style={{ color: '#111827', fontWeight: 600 }}>{post.tag}</span>
        </div>

        {/* Article card */}
        <div
          style={{ background: '#fff', borderRadius: 20, padding: '24px 20px', boxShadow: '0 4px 16px rgba(0,0,0,.07)', marginBottom: 20, fontFamily: 'var(--font-inter)', fontSize: 14, color: '#374151', lineHeight: 1.8 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Mobile CTA */}
        <a
          href="https://wa.me/2347035374592?text=Hello!%20I%20read%20your%20blog%20and%20would%20like%20a%20consultation."
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', background: '#25D366', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, borderRadius: '1.5rem', padding: 16, boxShadow: '0 8px 24px rgba(37,211,102,.4)', textDecoration: 'none', marginBottom: 20 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Book Free Consultation
        </a>

        {/* Related posts mobile */}
        <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 14 }}>More Articles</div>
        {related.map((rp) => (
          <Link key={rp.id} href={`/blog/${rp.slug}`} style={{ textDecoration: 'none', display: 'flex', gap: 12, background: '#fff', borderRadius: 16, padding: 14, boxShadow: '0 2px 12px rgba(0,0,0,.06)', marginBottom: 10 }}>
            <div style={{ width: 56, height: 56, borderRadius: 12, flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
              <Image src={rp.img} alt="" fill sizes="56px" style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 12, color: '#111827', lineHeight: 1.4, marginBottom: 4 }}>{rp.title}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: '#6B7280' }}>{rp.readTime}</div>
            </div>
          </Link>
        ))}
      </div>

      <Footer />
    </>
  );
}
