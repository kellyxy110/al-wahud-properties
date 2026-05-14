'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, Plus, Search, Edit3, Trash2, Eye, Star, CheckCircle } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import type { BlogRow } from './page';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const row = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

const CAT_COLORS: Record<string, string> = {
  Investment: '#10B981', 'Legal Guide': '#3B82F6', Diaspora: '#F59E0B',
  'Market News': '#EF4444', Lifestyle: '#8B5CF6', Tips: '#14B8A6',
};
const CATEGORIES = ['All', 'Investment', 'Legal Guide', 'Diaspora', 'Market News', 'Lifestyle', 'Tips'];

const INP: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10, padding: '9px 14px', color: '#fff',
  fontFamily: 'var(--font-inter)', fontSize: 13, outline: 'none',
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function BlogListClient({ posts: initialPosts }: { posts: BlogRow[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = posts;
    if (category !== 'All') list = list.filter(p => p.category === category);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || (p.excerpt ?? '').toLowerCase().includes(q));
    }
    return list;
  }, [posts, category, search]);

  async function deletePost(id: string) {
    if (!confirm('Delete this blog post permanently?')) return;
    setDeleting(id);
    const db = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const { error } = await db.from('blog_posts').delete().eq('id', id);
    if (!error) setPosts(p => p.filter(x => x.id !== id));
    setDeleting(null);
  }

  return (
    <div className="px-4 lg:px-8" style={{ paddingTop: 24, paddingBottom: 48 }}>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts…" style={{ ...INP, width: '100%', paddingLeft: 36 }} />
        </div>
        <Link href="/admin/blog/new" style={{ textDecoration: 'none' }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg,#8B5CF6,#7C3AED)',
            border: 'none', borderRadius: 10, padding: '10px 18px',
            color: '#fff', fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 700,
            cursor: 'pointer', boxShadow: '0 4px 16px rgba(139,92,246,0.3)', whiteSpace: 'nowrap',
          }}>
            <Plus size={15} /> New Post
          </button>
        </Link>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, overflowX: 'auto', paddingBottom: 2 }}>
        {CATEGORIES.map(c => {
          const color = c === 'All' ? '#fff' : CAT_COLORS[c];
          return (
            <button key={c} onClick={() => setCategory(c)} style={{
              padding: '6px 14px', borderRadius: 99, cursor: 'pointer', whiteSpace: 'nowrap',
              fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: category === c ? 700 : 500,
              background: category === c ? `${color}20` : 'rgba(255,255,255,0.05)',
              color: category === c ? color : 'rgba(255,255,255,0.45)',
              border: category === c ? `1px solid ${color}40` : '1px solid transparent',
            }}>{c}</button>
          );
        })}
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Posts', value: posts.length, color: '#8B5CF6', Icon: FileText },
          { label: 'Published', value: posts.filter(p => p.published).length, color: '#10B981', Icon: CheckCircle },
          { label: 'Featured', value: posts.filter(p => p.featured).length, color: '#F59E0B', Icon: Star },
        ].map(s => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <s.Icon size={14} style={{ color: s.color }} />
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 700, color: '#fff' }}>{s.value}</span>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Post list */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 0' }}>
          <FileText size={48} style={{ color: 'rgba(255,255,255,0.1)', display: 'block', margin: '0 auto 16px' }} />
          <p style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>
            {search || category !== 'All' ? 'No results found' : 'No blog posts yet'}
          </p>
          {!search && category === 'All' && (
            <Link href="/admin/blog/new" style={{ display: 'inline-block', marginTop: 20, textDecoration: 'none' }}>
              <button style={{ background: 'linear-gradient(135deg,#8B5CF6,#7C3AED)', border: 'none', borderRadius: 10, padding: '10px 24px', color: '#fff', fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                Write First Post
              </button>
            </Link>
          )}
        </div>
      ) : (
        <motion.div variants={container} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(post => {
            const catColor = CAT_COLORS[post.category] ?? '#fff';
            return (
              <motion.div key={post.id} variants={row}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderRadius: 16,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', flexWrap: 'wrap',
                }}>
                  {/* Cover */}
                  <div style={{
                    width: 64, height: 48, borderRadius: 10, flexShrink: 0, overflow: 'hidden',
                    background: `${catColor}20`, border: `1px solid ${catColor}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {post.cover_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.cover_image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : <FileText size={20} style={{ color: catColor, opacity: 0.5 }} />}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: catColor, background: `${catColor}18`, padding: '2px 8px', borderRadius: 99 }}>
                        {post.category}
                      </span>
                      {post.featured && <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: '#F59E0B' }}>⭐ Featured</span>}
                    </div>
                    <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 14, color: '#fff', marginBottom: 3 }}>
                      {post.title}
                    </div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                      {post.excerpt ? post.excerpt.slice(0, 80) + (post.excerpt.length > 80 ? '…' : '') : 'No excerpt'}
                    </div>
                  </div>

                  {/* Meta */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{
                      display: 'inline-block', padding: '3px 10px', borderRadius: 99,
                      background: post.published ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.07)',
                      fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700,
                      color: post.published ? '#10B981' : 'rgba(255,255,255,0.35)',
                      marginBottom: 6,
                    }}>{post.published ? 'Published' : 'Draft'}</div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>
                      {formatDate(post.created_at)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 6 }}>
                    <Link href={`/blog/${post.slug}`} target="_blank" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>
                      <Eye size={14} />
                    </Link>
                    <Link href={`/admin/blog/${post.id}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', color: '#8B5CF6', textDecoration: 'none' }}>
                      <Edit3 size={14} />
                    </Link>
                    <button
                      onClick={() => deletePost(post.id)}
                      disabled={deleting === post.id}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444', cursor: 'pointer', opacity: deleting === post.id ? 0.5 : 1 }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
