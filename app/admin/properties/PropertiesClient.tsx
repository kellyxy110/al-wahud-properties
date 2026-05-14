'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, Plus, Search, Eye, Edit3, Star, Play, CheckCircle, XCircle } from 'lucide-react';
import type { PropertyRow } from './page';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const row = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

const STATUS_COLORS: Record<string, string> = {
  'FOR SALE': '#10B981', 'FOR RENT': '#3B82F6', 'SHORT LET': '#F59E0B',
  'OFF-PLAN': '#8B5CF6', 'LAND FOR SALE': '#14B8A6',
};

const INP: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10, padding: '9px 14px', color: '#fff',
  fontFamily: 'var(--font-inter)', fontSize: 13, outline: 'none',
};

function formatPrice(n: number) {
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `₦${(n / 1_000).toFixed(0)}K`;
  return `₦${n}`;
}

function Badge({ color, label }: { color: string; label: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700,
      color, background: `${color}18`, border: `1px solid ${color}30`,
      padding: '3px 8px', borderRadius: 99, letterSpacing: '0.5px', whiteSpace: 'nowrap',
    }}>{label}</span>
  );
}

export default function PropertiesClient({ properties }: { properties: PropertyRow[] }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'featured' | 'tours'>('all');

  const filtered = useMemo(() => {
    let list = properties;
    if (filter === 'published') list = list.filter(p => p.published);
    if (filter === 'featured')  list = list.filter(p => p.featured);
    if (filter === 'tours')     list = list.filter(p => p.featured_tour);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q));
    }
    return list;
  }, [properties, filter, search]);

  const tabs: { key: typeof filter; label: string; count: number }[] = [
    { key: 'all',       label: 'All',       count: properties.length },
    { key: 'published', label: 'Published', count: properties.filter(p => p.published).length },
    { key: 'featured',  label: 'Featured',  count: properties.filter(p => p.featured).length },
    { key: 'tours',     label: 'Tours',     count: properties.filter(p => p.featured_tour).length },
  ];

  return (
    <div className="px-4 lg:px-8" style={{ paddingTop: 24, paddingBottom: 48 }}>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)' }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search properties…"
            style={{ ...INP, width: '100%', paddingLeft: 36 }}
          />
        </div>
        <Link href="/admin/add-property" style={{ textDecoration: 'none' }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg,#10B981,#059669)',
            border: 'none', borderRadius: 10, padding: '10px 18px',
            color: '#fff', fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 700,
            cursor: 'pointer', boxShadow: '0 4px 16px rgba(16,185,129,0.3)', whiteSpace: 'nowrap',
          }}>
            <Plus size={15} /> Add Property
          </button>
        </Link>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', paddingBottom: 2 }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setFilter(t.key)} style={{
            padding: '7px 16px', borderRadius: 99, cursor: 'pointer', whiteSpace: 'nowrap',
            fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: filter === t.key ? 700 : 500,
            background: filter === t.key ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)',
            color: filter === t.key ? '#10B981' : 'rgba(255,255,255,0.5)',
            border: filter === t.key ? '1px solid rgba(16,185,129,0.3)' : '1px solid transparent',
          }}>
            {t.label} <span style={{ opacity: 0.7 }}>({t.count})</span>
          </button>
        ))}
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          { label: 'Total', value: properties.length, color: '#10B981', Icon: Building2 },
          { label: 'Published', value: properties.filter(p => p.published).length, color: '#3B82F6', Icon: CheckCircle },
          { label: 'Featured', value: properties.filter(p => p.featured).length, color: '#F59E0B', Icon: Star },
          { label: 'Tours', value: properties.filter(p => p.featured_tour).length, color: '#EF4444', Icon: Play },
        ].map(s => (
          <div key={s.label} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 16px', borderRadius: 12,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <s.Icon size={14} style={{ color: s.color }} />
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 700, color: '#fff' }}>{s.value}</span>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 0' }}>
          <Building2 size={48} style={{ color: 'rgba(255,255,255,0.1)', marginBottom: 16, margin: '0 auto 16px' }} />
          <p style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>
            {search ? 'No results found' : 'No properties yet'}
          </p>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,0.25)', marginTop: 8 }}>
            {search ? 'Try a different search term' : 'Add your first property to get started'}
          </p>
          {!search && (
            <Link href="/admin/add-property" style={{ display: 'inline-block', marginTop: 20, textDecoration: 'none' }}>
              <button style={{ background: 'linear-gradient(135deg,#10B981,#059669)', border: 'none', borderRadius: 10, padding: '10px 24px', color: '#fff', fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                Add Property
              </button>
            </Link>
          )}
        </div>
      ) : (
        <motion.div variants={container} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(p => {
            const thumb = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null;
            const statusColor = STATUS_COLORS[p.status] ?? '#fff';
            return (
              <motion.div key={p.id} variants={row}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 18px', borderRadius: 16,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                  flexWrap: 'wrap',
                }}>
                  {/* Thumbnail */}
                  <div style={{
                    width: 52, height: 52, borderRadius: 10, flexShrink: 0, overflow: 'hidden',
                    background: p.gradient ?? 'linear-gradient(135deg,#10B981,#059669)',
                  }}>
                    {thumb && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 14, color: '#fff', marginBottom: 3 }}>
                      {p.title}
                    </div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                      {p.location}
                    </div>
                  </div>

                  {/* Badges */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                    <Badge color={statusColor} label={p.status} />
                    <Badge color="#94A3B8" label={p.property_type} />
                    {p.featured && <Badge color="#F59E0B" label="⭐ Featured" />}
                    {p.featured_tour && <Badge color="#EF4444" label="▶ Tour" />}
                  </div>

                  {/* Price */}
                  <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: '#10B981', minWidth: 80, textAlign: 'right' }}>
                    {formatPrice(p.price)}
                  </div>

                  {/* Published indicator */}
                  <div title={p.published ? 'Published' : 'Draft'}>
                    {p.published
                      ? <CheckCircle size={16} style={{ color: '#10B981' }} />
                      : <XCircle size={16} style={{ color: 'rgba(255,255,255,0.2)' }} />}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 6 }}>
                    <Link href={`/properties/${p.id}`} target="_blank" title="View on site" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>
                      <Eye size={14} />
                    </Link>
                    <Link href={`/admin/add-property?edit=${p.id}`} title="Edit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10B981', textDecoration: 'none' }}>
                      <Edit3 size={14} />
                    </Link>
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
