'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/app/lib/data';

const CATEGORIES = ['All Posts', 'Market Insights', 'Investment Tips', 'Buyer Guides', 'Legal & Finance', 'Diaspora Buyers', 'Landlord Advice'];

const TAG_MAP: Record<string, string> = {
  'Market Insights': 'Market Insights',
  'Investment Tips': 'Investment',
  'Buyer Guides': 'Buyer Guide',
  'Legal & Finance': 'Legal Guide',
  'Diaspora Buyers': 'Diaspora',
  'Landlord Advice': 'Landlord',
};

const TAGS = ['Lagos', 'Abuja', 'Investment', 'Rental', 'Diaspora', 'C of O', 'Duplex', 'Land', 'Mortgage', 'Lekki'];

const CAT_COUNTS = CATEGORIES.filter(c => c !== 'All Posts').map(c => ({
  lbl: c,
  cnt: BLOG_POSTS.filter(p => p.tag === TAG_MAP[c]).length,
}));

export default function BlogClient() {
  const [activeCat, setActiveCat] = useState('All Posts');

  const filtered = activeCat === 'All Posts'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.tag === TAG_MAP[activeCat]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="hidden lg:grid" style={{ gridTemplateColumns: '1fr 320px', gap: 40, padding: '60px 60px', alignItems: 'start' }}>
      {/* Main */}
      <div>
        {/* Category filters */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              style={{
                padding: '8px 18px', borderRadius: 99,
                background: activeCat === cat ? '#1B9954' : '#fff',
                color: activeCat === cat ? '#fff' : '#374151',
                fontFamily: 'var(--font-poppins)', fontSize: 12,
                fontWeight: activeCat === cat ? 700 : 600,
                border: activeCat === cat ? 'none' : '1.5px solid #E5E7EB',
                cursor: 'pointer', transition: 'all .2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {featured ? (
          <>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#1B9954', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 10 }}>Editor&apos;s Pick</div>
            <Link href={`/blog/${featured.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,.08)', marginBottom: 32, cursor: 'pointer', transition: 'transform .3s' }}>
                <div style={{ height: 320, background: featured.gradient, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image src={featured.img} alt={featured.title} fill sizes="(max-width:1280px) 100vw, 700px" style={{ objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: 20, left: 20, background: '#E63946', color: '#fff', fontFamily: 'var(--font-poppins)', fontSize: 11, fontWeight: 700, padding: '5px 14px', borderRadius: 99 }}>{featured.tag}</span>
                </div>
                <div style={{ padding: '28px 32px' }}>
                  <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 24, color: '#111827', lineHeight: 1.3, marginBottom: 12 }}>{featured.title}</h3>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#6B7280', lineHeight: 1.8, marginBottom: 16 }}>{featured.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#1B9954,#2D7A76)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-poppins)', fontSize: 9, fontWeight: 700, color: '#fff' }}>AW</div>
                      Al-Wajud Team
                    </div>
                    <span>{featured.date}</span>
                    <span>{featured.readTime}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-poppins)', fontSize: 13, fontWeight: 700, color: '#1B9954', marginTop: 16 }}>Read Article →</div>
                </div>
              </div>
            </Link>
          </>
        ) : (
          <div style={{ padding: '60px 0', textAlign: 'center', fontFamily: 'var(--font-inter)', color: '#6B7280' }}>
            No posts in this category yet.
          </div>
        )}

        {/* Blog grid */}
        {rest.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {rest.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,.07)', cursor: 'pointer', transition: 'transform .3s' }}>
                  <div style={{ height: 170, background: post.gradient, position: 'relative' }}>
                    <Image src={post.img} alt={post.title} fill sizes="(max-width:1280px) 50vw, 300px" style={{ objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: 12, left: 12, fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: '#ECFDF5', color: '#1B9954' }}>{post.tag}</span>
                  </div>
                  <div style={{ padding: 18 }}>
                    <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: '#111827', lineHeight: 1.4, marginBottom: 8 }}>{post.title}</div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.6, marginBottom: 10 }}>{post.excerpt}</div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#6B7280', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{post.date} · {post.readTime}</span>
                      <span style={{ fontFamily: 'var(--font-poppins)', fontSize: 11, fontWeight: 700, color: '#1B9954' }}>Read →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div style={{ display: 'flex', gap: 8, marginTop: 32 }}>
          {['1', '2', '3', '→'].map((p, i) => (
            <button key={p} style={{ width: 40, height: 40, borderRadius: 10, border: '1.5px solid #E5E7EB', background: i === 0 ? '#1B9954' : '#fff', color: i === 0 ? '#fff' : '#374151', fontFamily: 'var(--font-poppins)', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <aside>
        <div style={{ background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 4px 16px rgba(0,0,0,.06)', marginBottom: 20 }}>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #F3F4F6' }}>Categories</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CAT_COUNTS.map(c => (
              <li key={c.lbl} onClick={() => setActiveCat(c.lbl)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-inter)', fontSize: 13, color: activeCat === c.lbl ? '#1B9954' : '#374151', cursor: 'pointer', padding: '8px 0', borderBottom: '1px solid #F9FAFB', fontWeight: activeCat === c.lbl ? 700 : 400 }}>
                {c.lbl}
                <span style={{ background: activeCat === c.lbl ? '#ECFDF5' : '#F3F4F6', color: activeCat === c.lbl ? '#1B9954' : '#6B7280', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99 }}>{c.cnt}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 4px 16px rgba(0,0,0,.06)', marginBottom: 20 }}>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #F3F4F6' }}>Recent Posts</div>
          {BLOG_POSTS.slice(0, 5).map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'flex', gap: 12, marginBottom: 14, cursor: 'pointer', paddingBottom: 14, borderBottom: '1px solid #F9FAFB' }}>
              <div style={{ width: 60, height: 60, borderRadius: 12, background: post.gradient, flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                <Image src={post.img} alt="" fill sizes="60px" style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 12, color: '#111827', lineHeight: 1.4, marginBottom: 4 }}>{post.title}</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: '#6B7280' }}>{post.date}</div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 4px 16px rgba(0,0,0,.06)', marginBottom: 20 }}>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #F3F4F6' }}>Popular Tags</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {TAGS.map(tag => (
              <span key={tag} style={{ background: '#F3F4F6', color: '#374151', fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 500, padding: '5px 12px', borderRadius: 99, cursor: 'pointer' }}>{tag}</span>
            ))}
          </div>
        </div>
        <div style={{ background: 'linear-gradient(135deg,#0F5E36,#2D7A76)', borderRadius: 20, padding: 24 }}>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 10 }}>📬 Newsletter</div>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,.8)', marginBottom: 16, lineHeight: 1.6 }}>Get weekly market updates and exclusive property deals delivered to your inbox.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input type="email" placeholder="Your email address" style={{ padding: '10px 14px', borderRadius: 12, border: '1.5px solid #4B8B5E', fontFamily: 'var(--font-inter)', fontSize: 13, outline: 'none', background: 'rgba(255,255,255,.9)' }} />
            <button style={{ background: 'linear-gradient(135deg,#E63946,#FF6B9D)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, border: 'none', borderRadius: 12, padding: 12, cursor: 'pointer' }}>Subscribe Free</button>
          </div>
        </div>
      </aside>
    </div>
  );
}
