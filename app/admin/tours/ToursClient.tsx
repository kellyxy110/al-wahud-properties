'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PlayCircle, Plus, ExternalLink, CheckCircle, XCircle } from 'lucide-react';
import type { TourProperty } from './page';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const card = { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1, transition: { duration: 0.4 } } };

export default function ToursClient({ tours }: { tours: TourProperty[] }) {
  const active = tours.filter(t => t.featured_tour && t.published);

  return (
    <div className="px-4 lg:px-8" style={{ paddingTop: 24, paddingBottom: 60 }}>

      {/* Header stats */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {[
            { label: 'Total Tours', value: tours.length, color: '#EF4444' },
            { label: 'Active', value: active.length, color: '#10B981' },
            { label: 'Drafts', value: tours.filter(t => !t.published).length, color: '#F59E0B' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: 16, fontWeight: 800, color: s.color }}>{s.value}</span>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{s.label}</span>
            </div>
          ))}
        </div>
        <Link href="/admin/add-property" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#EF4444,#DC2626)', border: 'none', borderRadius: 10, padding: '10px 18px', color: '#fff', fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(239,68,68,0.3)' }}>
            <Plus size={15} /> Add Tour
          </button>
        </Link>
      </div>

      {tours.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <PlayCircle size={56} style={{ color: 'rgba(255,255,255,0.1)', display: 'block', margin: '0 auto 16px' }} />
          <p style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 20, color: 'rgba(255,255,255,0.35)' }}>No TikTok tours linked yet</p>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,0.25)', marginTop: 8 }}>Add a TikTok URL when uploading a property to create a featured tour.</p>
          <Link href="/admin/add-property" style={{ display: 'inline-block', marginTop: 20, textDecoration: 'none' }}>
            <button style={{ background: 'linear-gradient(135deg,#EF4444,#DC2626)', border: 'none', borderRadius: 10, padding: '10px 24px', color: '#fff', fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              Add Property with Tour
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.22)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 16 }}>
            TIKTOK TOUR LIBRARY
          </div>
          <motion.div variants={container} initial="hidden" animate="show"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {tours.map(tour => {
              const thumb = Array.isArray(tour.images) && tour.images.length > 0 ? tour.images[0] : null;
              return (
                <motion.div key={tour.id} variants={card}>
                  <div style={{ borderRadius: 20, overflow: 'hidden', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
                    {/* Thumbnail area */}
                    <div style={{ height: 200, background: tour.gradient ?? 'linear-gradient(135deg,#EF4444,#DC2626)', position: 'relative', overflow: 'hidden' }}>
                      {thumb && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                      {/* TikTok play overlay */}
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.3)' }}>
                          <PlayCircle size={28} color="#fff" />
                        </div>
                      </div>
                      {/* TikTok badge */}
                      <div style={{ position: 'absolute', top: 12, left: 12, background: '#010101', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.54V6.78a4.84 4.84 0 01-1.07-.09z"/></svg>
                        <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: '#fff' }}>TikTok</span>
                      </div>
                      {/* Status indicator */}
                      <div style={{ position: 'absolute', top: 12, right: 12 }}>
                        {tour.featured_tour && tour.published
                          ? <CheckCircle size={18} style={{ color: '#10B981', filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.8))' }} />
                          : <XCircle size={18} style={{ color: 'rgba(255,255,255,0.4)' }} />}
                      </div>
                    </div>

                    {/* Info */}
                    <div style={{ padding: '16px 18px' }}>
                      <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 14, color: '#fff', marginBottom: 4 }}>
                        {tour.title}
                      </div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}>
                        {tour.location}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <code style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: 6 }}>
                          {tour.tiktok_id}
                        </code>
                        <a href={`https://www.tiktok.com/video/${tour.tiktok_id}`} target="_blank" rel="noopener noreferrer"
                          style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
                          <ExternalLink size={11} /> View
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </>
      )}
    </div>
  );
}
