import Link from 'next/link';
import { BLOG_POSTS } from '@/app/lib/data';

const PINNED_SLUGS = [
  'nigerian-real-estate-uk-investors-2026',
  'buying-property-nigeria-from-usa',
  'top-locations-lagos-property-investment-2026',
];

const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  'Diaspora':    { bg: '#FCE7F3', color: '#9D174D' },
  'Buyer Guide': { bg: '#FEE2E2', color: '#991B1B' },
};

function tagStyle(tag: string) {
  return TAG_STYLES[tag] ?? { bg: '#ECFDF5', color: 'var(--primary)' };
}

export default function BlogPreview() {
  const posts = PINNED_SLUGS
    .map(slug => BLOG_POSTS.find(p => p.slug === slug))
    .filter(Boolean) as typeof BLOG_POSTS;

  return (
    <section className="py-8 px-4 lg:py-20 lg:px-[60px] bg-[var(--bg)]">
      <div>
        <div className="text-center mb-6 lg:mb-14">
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 600, color: 'var(--primary)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>
            Insights &amp; News
          </div>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 'clamp(28px,4vw,36px)', color: 'var(--dark-text)', lineHeight: 1.2 }}>
            From Our <span style={{ color: 'var(--primary)' }}>Blog</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '15px', color: 'var(--gray)', maxWidth: '560px', margin: '10px auto 0', lineHeight: 1.7 }}>
            Expert articles, market insights and investment tips from the Al-Wajud Properties team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map(post => {
            const ts = tagStyle(post.tag);
            return (
              <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                <div
                  className="bg-white rounded-[20px] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}
                >
                  <div
                    className="w-full h-[180px]"
                    style={{
                      backgroundImage: `url(${post.img})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className="p-5">
                    <span
                      className="inline-block text-[10px] font-semibold px-2.5 py-0.5 rounded-full mb-2.5"
                      style={{ fontFamily: 'var(--font-inter)', background: ts.bg, color: ts.color }}
                    >
                      {post.tag}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '15px', color: 'var(--dark-text)', lineHeight: 1.4, marginBottom: '8px' }}>
                      {post.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--gray)', lineHeight: 1.6, marginBottom: '14px' }}>
                      {post.excerpt.slice(0, 110)}{post.excerpt.length > 110 ? '…' : ''}
                    </p>
                    <div className="flex items-center justify-between">
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--gray)' }}>
                        {post.date} · {post.readTime}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-[12px]"
                        style={{ fontFamily: 'var(--font-poppins)', color: 'var(--primary)' }}>
                        Read
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-6 lg:mt-10">
          <Link
            href="/blog"
            className="inline-block font-bold rounded-full transition-transform hover:-translate-y-0.5"
            style={{ fontFamily: 'var(--font-poppins)', fontSize: '15px', padding: '16px 36px', background: 'linear-gradient(135deg,var(--accent),#FF6B9D)', color: '#fff', boxShadow: '0 8px 24px rgba(230,57,70,.4)' }}
          >
            View All Articles →
          </Link>
        </div>
      </div>
    </section>
  );
}
