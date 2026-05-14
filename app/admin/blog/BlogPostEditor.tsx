'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Send, Eye, Clock, FileText } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';

export interface PostData {
  id?: string;
  title?: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  content?: string;
  cover_image?: string;
  author?: string;
  published?: boolean;
  featured?: boolean;
}

const CATEGORIES = ['Investment', 'Legal Guide', 'Diaspora', 'Market News', 'Lifestyle', 'Tips'];

const INP: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12, padding: '11px 14px', color: '#fff',
  fontFamily: 'var(--font-inter)', fontSize: 13, outline: 'none', boxSizing: 'border-box',
};
const LABEL: React.CSSProperties = {
  fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 700,
  color: 'rgba(255,255,255,0.45)', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: 7,
};

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function readTime(text: string) {
  const words = countWords(text);
  const mins = Math.ceil(words / 200);
  return `${mins} min read`;
}

export default function BlogPostEditor({ initial = {} }: { initial?: PostData }) {
  const router = useRouter();
  const isEdit = !!initial.id;

  const [title, setTitle] = useState(initial.title ?? '');
  const [slug, setSlug] = useState(initial.slug ?? '');
  const [slugEdited, setSlugEdited] = useState(!!initial.slug);
  const [category, setCategory] = useState(initial.category ?? 'Investment');
  const [excerpt, setExcerpt] = useState(initial.excerpt ?? '');
  const [content, setContent] = useState(initial.content ?? '');
  const [coverImage, setCoverImage] = useState(initial.cover_image ?? '');
  const [author, setAuthor] = useState(initial.author ?? 'Al-Wajud Team');
  const [published, setPublished] = useState(initial.published ?? false);
  const [featured, setFeatured] = useState(initial.featured ?? false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!slugEdited) setSlug(slugify(title));
  }, [title, slugEdited]);

  async function save(publish: boolean) {
    if (!title.trim()) { setMsg({ type: 'error', text: 'Title is required' }); return; }
    if (!slug.trim()) { setMsg({ type: 'error', text: 'Slug is required' }); return; }

    setSaving(true);
    const db = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      category,
      excerpt: excerpt.trim() || null,
      content: content.trim() || null,
      cover_image: coverImage.trim() || null,
      author: author.trim() || 'Al-Wajud Team',
      published: publish,
      featured,
      read_time: readTime(content),
    };

    let error;
    if (isEdit) {
      ({ error } = await db.from('blog_posts').update(payload).eq('id', initial.id!));
    } else {
      ({ error } = await db.from('blog_posts').insert([payload]));
    }

    setSaving(false);
    if (error) {
      setMsg({ type: 'error', text: error.message });
    } else {
      setMsg({ type: 'success', text: isEdit ? 'Post updated!' : 'Post created!' });
      setTimeout(() => router.push('/admin/blog'), 1200);
    }
  }

  return (
    <div className="px-4 lg:px-8" style={{ paddingTop: 24, paddingBottom: 60 }}>

      {/* Back + breadcrumb */}
      <Link href="/admin/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-inter)', fontSize: 13, marginBottom: 24 }}>
        <ArrowLeft size={14} /> Back to Editorial Studio
      </Link>

      {/* Status banner */}
      {msg && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} style={{
          padding: '12px 18px', borderRadius: 12, marginBottom: 20,
          background: msg.type === 'success' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
          border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
          fontFamily: 'var(--font-inter)', fontSize: 13, color: msg.type === 'success' ? '#6EE7B7' : '#FCA5A5',
        }}>
          {msg.text}
        </motion.div>
      )}

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }} className="xl:grid-cols-[1fr_300px]">

        {/* FORM */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

          {/* Title */}
          <div>
            <label style={LABEL}>Title *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter a compelling title…" style={{ ...INP, fontFamily: 'var(--font-poppins)', fontSize: 18, fontWeight: 700 }} />
          </div>

          {/* Slug */}
          <div>
            <label style={LABEL}>Slug (URL)</label>
            <input value={slug} onChange={e => { setSlug(e.target.value); setSlugEdited(true); }}
              placeholder="auto-generated-from-title"
              style={{ ...INP, fontFamily: 'monospace', fontSize: 12 }} />
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 5 }}>
              URL: /blog/{slug || 'your-post-slug'}
            </p>
          </div>

          {/* Category + Author */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={LABEL}>Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} style={INP}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={LABEL}>Author</label>
              <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Al-Wajud Team" style={INP} />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label style={LABEL}>Cover Image URL</label>
            <input value={coverImage} onChange={e => setCoverImage(e.target.value)} placeholder="https://…" style={INP} />
            {coverImage && (
              <div style={{ marginTop: 10, borderRadius: 12, overflow: 'hidden', height: 160 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
              <label style={{ ...LABEL, marginBottom: 0 }}>Excerpt</label>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: excerpt.length > 180 ? '#EF4444' : 'rgba(255,255,255,0.25)' }}>
                {excerpt.length}/200
              </span>
            </div>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value.slice(0, 200))} rows={3}
              placeholder="Short summary of the post (shown in blog cards)…"
              style={{ ...INP, resize: 'vertical' }} />
          </div>

          {/* Content */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
              <label style={{ ...LABEL, marginBottom: 0 }}>Content</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
                <Clock size={11} /> {readTime(content)} · {countWords(content)} words
              </div>
            </div>
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={18}
              placeholder={`Write your article here. Supports basic formatting:\n\n**Bold text** → Bold\n*Italic text* → Italic\n\n## Heading 2\n### Heading 3\n\n- List item 1\n- List item 2`}
              style={{ ...INP, resize: 'vertical', lineHeight: 1.8, fontFamily: 'var(--font-inter)', fontSize: 14 }} />
          </div>

          {/* Toggles */}
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { label: 'Published', value: published, set: setPublished, color: '#10B981' },
              { label: 'Featured',  value: featured,  set: setFeatured,  color: '#F59E0B' },
            ].map(({ label, value, set, color }) => (
              <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <div onClick={() => set(!value)} style={{
                  width: 42, height: 24, borderRadius: 99,
                  background: value ? color : 'rgba(255,255,255,0.12)',
                  position: 'relative', transition: 'background 0.2s', cursor: 'pointer', flexShrink: 0,
                }}>
                  <div style={{ position: 'absolute', top: 4, left: value ? 22 : 4, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
                </div>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: value ? color : 'rgba(255,255,255,0.5)' }}>{label}</span>
              </label>
            ))}
          </div>

          {/* Submit buttons */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => save(false)} disabled={saving} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 10, padding: '12px 24px', color: '#fff',
              fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              opacity: saving ? 0.6 : 1,
            }}>
              <Save size={15} /> Save Draft
            </button>
            <button onClick={() => save(true)} disabled={saving} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg,#8B5CF6,#7C3AED)',
              border: 'none', borderRadius: 10, padding: '12px 24px', color: '#fff',
              fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(139,92,246,0.35)', opacity: saving ? 0.6 : 1,
            }}>
              <Send size={15} /> {isEdit ? 'Update & Publish' : 'Publish Post'}
            </button>
          </div>
        </div>

        {/* LIVE PREVIEW */}
        <div className="hidden xl:block">
          <div style={{ position: 'sticky', top: 90 }}>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Eye size={12} /> Live Preview
            </div>
            {/* Blog card preview */}
            <div style={{ borderRadius: 16, overflow: 'hidden', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ height: 140, background: 'linear-gradient(135deg,#8B5CF6,#7C3AED)', position: 'relative', overflow: 'hidden' }}>
                {coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={coverImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
                {!coverImage && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3 }}>
                    <FileText size={40} color="#fff" />
                  </div>
                )}
                {category && (
                  <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', color: '#fff', fontFamily: 'var(--font-inter)', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 99, letterSpacing: '1px' }}>
                    {category.toUpperCase()}
                  </div>
                )}
              </div>
              <div style={{ padding: '16px 18px' }}>
                <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 8, lineHeight: 1.4 }}>
                  {title || <span style={{ color: 'rgba(255,255,255,0.2)' }}>Blog post title</span>}
                </div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
                  {excerpt || <span style={{ color: 'rgba(255,255,255,0.15)' }}>Excerpt will appear here…</span>}
                </div>
                <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{author || 'Author'}</span>
                  <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{readTime(content)}</span>
                </div>
              </div>
            </div>
            {/* SEO preview */}
            <div style={{ marginTop: 16, padding: '16px 18px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 10 }}>SEO Preview</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#3B82F6', marginBottom: 4 }}>alwajudproperties.com/blog/{slug || 'your-post-slug'}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>{title || 'Post Title'}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.4 }}>{excerpt ? excerpt.slice(0, 120) : 'Meta description from excerpt…'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
