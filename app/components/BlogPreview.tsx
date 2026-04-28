import Link from 'next/link';
import { createClient } from '@/app/lib/supabase/server';
import { formatDate, type BlogPost } from '@/app/lib/supabase/types';
import { BLOG_POSTS, type BlogPost as StaticBlogPost } from '@/app/lib/data';

function SupabaseBlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div
        className="bg-white rounded-[20px] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
        style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}
      >
        <div
          className="w-full h-[180px]"
          style={{
            backgroundImage: post.image ? `url(${post.image}), ${post.gradient}` : post.gradient,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="p-5">
          <span
            className="inline-block text-[10px] font-semibold px-2.5 py-0.5 rounded-full mb-2.5"
            style={{ fontFamily: 'var(--font-inter)', background: '#ECFDF5', color: 'var(--primary)' }}
          >
            {post.category}
          </span>
          <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '15px', color: 'var(--dark-text)', lineHeight: 1.4, marginBottom: '8px' }}>
            {post.title}
          </h3>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--gray)', lineHeight: 1.6, marginBottom: '14px' }}>
            {post.excerpt.slice(0, 110)}{post.excerpt.length > 110 ? '…' : ''}
          </p>
          <div className="flex items-center justify-between">
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--gray)' }}>
              {formatDate(post.created_at)} · {post.read_time}
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
}

function StaticBlogCard({ post }: { post: StaticBlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div
        className="bg-white rounded-[20px] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
        style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}
      >
        <div
          className="w-full h-[180px]"
          style={{
            backgroundImage: post.img ? `url(${post.img}), ${post.gradient}` : post.gradient,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="p-5">
          <span
            className="inline-block text-[10px] font-semibold px-2.5 py-0.5 rounded-full mb-2.5"
            style={{ fontFamily: 'var(--font-inter)', background: '#ECFDF5', color: 'var(--primary)' }}
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
}

export default async function BlogPreview() {
  const supabase = await createClient();
  let posts: unknown[] | null = null;
  try {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3);
    posts = data;
  } catch {
    // network/config error — fall through to static fallback below
  }

  const hasSupabaseData = posts && posts.length > 0;

  return (
    <section className="py-20 px-4 lg:px-16" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 600, color: 'var(--primary)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>
              Knowledge Hub
            </div>
            <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 'clamp(28px,4vw,36px)', color: 'var(--dark-text)', lineHeight: 1.2 }}>
              Latest <span style={{ color: 'var(--primary)' }}>Insights</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '15px', color: 'var(--gray)', maxWidth: '440px', marginTop: '10px', lineHeight: 1.7 }}>
              Expert guides on Nigerian property law, investment hotspots and diaspora buying.
            </p>
          </div>
          <Link
            href="/blog"
            className="self-start sm:self-auto font-bold text-[13px] px-6 py-2.5 rounded-full flex-shrink-0 transition-opacity hover:opacity-90"
            style={{ fontFamily: 'var(--font-poppins)', background: 'none', border: '2px solid var(--primary)', color: 'var(--primary)' }}
          >
            All Articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hasSupabaseData
            ? (posts as BlogPost[]).map(post => <SupabaseBlogCard key={post.id} post={post} />)
            : BLOG_POSTS.map(post => <StaticBlogCard key={post.id} post={post} />)
          }
        </div>
      </div>
    </section>
  );
}
