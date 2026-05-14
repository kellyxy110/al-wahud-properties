'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/app/lib/supabase/client';

interface MediaFile {
  name    : string;
  id      : string;
  url     : string;
  folder  : string;
  created : string;
  size    : number;
}

const FOLDERS = ['properties/images', 'blog', 'ceo'];
const BUCKET  = 'media';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1, transition: { duration: 0.3 } } };

function formatBytes(b: number): string {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(1)} MB`;
}

export default function MediaClient() {
  const [files,    setFiles]   = useState<MediaFile[]>([]);
  const [loading,  setLoading] = useState(true);
  const [search,   setSearch]  = useState('');
  const [filter,   setFilter]  = useState('all');
  const [preview,  setPreview] = useState<MediaFile | null>(null);
  const [copying,  setCopying] = useState('');
  const [deleting, setDeleting] = useState('');

  const loadFiles = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const all: MediaFile[] = [];

    for (const folder of FOLDERS) {
      const { data } = await supabase.storage.from(BUCKET).list(folder, {
        limit: 200, sortBy: { column: 'created_at', order: 'desc' },
      });
      if (data) {
        for (const f of data) {
          if (!f.name || f.name === '.emptyFolderPlaceholder') continue;
          const path = `${folder}/${f.name}`;
          const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
          all.push({
            name   : f.name,
            id     : f.id ?? path,
            url    : urlData.publicUrl,
            folder,
            created: f.created_at ?? '',
            size   : f.metadata?.size ?? 0,
          });
        }
      }
    }

    setFiles(all);
    setLoading(false);
  }, []);

  useEffect(() => { loadFiles(); }, [loadFiles]);

  async function handleDelete(file: MediaFile) {
    if (!window.confirm(`Delete "${file.name}"? This cannot be undone.`)) return;
    setDeleting(file.id);
    const supabase = createClient();
    await supabase.storage.from(BUCKET).remove([`${file.folder}/${file.name}`]);
    setFiles(prev => prev.filter(f => f.id !== file.id));
    if (preview?.id === file.id) setPreview(null);
    setDeleting('');
  }

  async function copyUrl(file: MediaFile) {
    await navigator.clipboard.writeText(file.url);
    setCopying(file.id);
    setTimeout(() => setCopying(''), 2000);
  }

  const filtered = files.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || f.folder === filter;
    return matchSearch && matchFilter;
  });

  const folderLabel = (folder: string) => {
    if (folder === 'properties/images') return 'Properties';
    if (folder === 'blog') return 'Blog';
    if (folder === 'ceo') return 'CEO';
    return folder;
  };

  const INPUT: React.CSSProperties = {
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12, padding: '10px 14px',
    fontFamily: 'var(--font-inter)', fontSize: 13, color: '#fff', outline: 'none',
  };

  return (
    <div className="px-4 lg:px-8" style={{ paddingTop: 28, paddingBottom: 40 }}>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text" placeholder="Search files…" value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ ...INPUT, flex: '1 1 200px', minWidth: 160 }}
        />
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ ...INPUT, cursor: 'pointer' }}>
          <option value="all">All Folders</option>
          <option value="properties/images">Properties</option>
          <option value="blog">Blog</option>
          <option value="ceo">CEO</option>
        </select>
        <button onClick={loadFiles} style={{
          ...INPUT, cursor: 'pointer', padding: '10px 18px', fontWeight: 600, fontSize: 13,
          color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)',
        }}>
          ↻ Refresh
        </button>
        <span style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,0.3)', marginLeft: 4 }}>
          {filtered.length} file{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)', fontSize: 14 }}>
          <div style={{ marginBottom: 12 }}>
            <svg className="animate-spin" style={{ display: 'inline-block' }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0110 10"/>
            </svg>
          </div>
          Loading media…
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-inter)', fontSize: 14 }}>
          No files found{search ? ` for "${search}"` : ''}.
        </div>
      ) : (
        <motion.div
          variants={container} initial="hidden" animate="show"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}
        >
          {filtered.map(file => (
            <motion.div key={file.id} variants={item}>
              <div
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: preview?.id === file.id ? '1px solid rgba(27,153,84,0.5)' : '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
                onClick={() => setPreview(f => f?.id === file.id ? null : file)}
              >
                {/* Thumbnail */}
                <div style={{ height: 110, background: 'rgba(255,255,255,0.04)', position: 'relative', overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={file.url} alt={file.name} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div style={{ position: 'absolute', top: 6, left: 6 }}>
                    <span style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-inter)', fontSize: 8, fontWeight: 600, padding: '2px 7px', borderRadius: 99, letterSpacing: '0.5px' }}>
                      {folderLabel(file.folder)}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 2 }}>
                    {file.name}
                  </div>
                  {file.size > 0 && (
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,0.28)' }}>
                      {formatBytes(file.size)}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                    <button type="button" onClick={e => { e.stopPropagation(); copyUrl(file); }}
                      style={{ flex: 1, fontSize: 10, fontWeight: 600, fontFamily: 'var(--font-inter)', padding: '5px 0', borderRadius: 8, border: 'none', cursor: 'pointer', background: copying === file.id ? 'rgba(27,153,84,0.3)' : 'rgba(255,255,255,0.08)', color: copying === file.id ? '#4ADE80' : 'rgba(255,255,255,0.6)', transition: 'all 0.2s' }}>
                      {copying === file.id ? '✓ Copied' : 'Copy URL'}
                    </button>
                    <button type="button" onClick={e => { e.stopPropagation(); handleDelete(file); }}
                      disabled={deleting === file.id}
                      style={{ width: 28, fontSize: 12, borderRadius: 8, border: 'none', cursor: 'pointer', background: 'rgba(239,68,68,0.12)', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: deleting === file.id ? 0.5 : 1 }}>
                      {deleting === file.id ? '…' : '×'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Preview panel */}
      {preview && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'fixed', bottom: 80, right: 24, zIndex: 60,
            background: 'rgba(4,8,18,0.97)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20,
            padding: 20, width: 280, boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }} className="lg:bottom-8 lg:right-8"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: '#fff' }}>Preview</div>
            <button onClick={() => setPreview(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview.url} alt={preview.name} style={{ width: '100%', borderRadius: 12, display: 'block', marginBottom: 10, maxHeight: 200, objectFit: 'contain', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.5)', wordBreak: 'break-all', marginBottom: 12, lineHeight: 1.5 }}>{preview.name}</div>
          <button onClick={() => copyUrl(preview)} style={{ width: '100%', padding: '10px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#1B9954,#0F5E36)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13 }}>
            {copying === preview.id ? '✓ Copied!' : 'Copy URL'}
          </button>
        </motion.div>
      )}
    </div>
  );
}
