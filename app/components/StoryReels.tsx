'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '@/app/lib/supabase/client';

const TIKTOK_PROFILE = 'https://www.tiktok.com/@alwajudproperties';

interface Reel {
  label: string;
  img: string;
  gradient: string;
  videoId: string | null;
}

const FALLBACK_REELS: Reel[] = [
  { label: 'Ikeja Duplex', img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=120&h=120&fit=crop', gradient: 'linear-gradient(135deg,#2D7A76,#0F5E36)', videoId: null },
  { label: 'Lekki Penthouse', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=120&h=120&fit=crop', gradient: 'linear-gradient(135deg,#FFB703,#E63946)', videoId: null },
  { label: 'VI Apartment', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=120&h=120&fit=crop', gradient: 'linear-gradient(135deg,#2D7A76,#FFB703)', videoId: null },
  { label: 'Abuja Home', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=120&h=120&fit=crop', gradient: 'linear-gradient(135deg,#0F5E36,#2D7A76)', videoId: null },
  { label: 'PH Terrace', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=120&h=120&fit=crop', gradient: 'linear-gradient(135deg,#FBC598,#FFB703)', videoId: null },
  { label: 'Banana Island', img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=120&h=120&fit=crop', gradient: 'linear-gradient(135deg,#7C3AED,#2D7A76)', videoId: null },
  { label: 'Gwarinpa Estate', img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=120&h=120&fit=crop', gradient: 'linear-gradient(135deg,#1B9954,#0F5E36)', videoId: null },
  { label: 'Maitama Villa', img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=120&h=120&fit=crop', gradient: 'linear-gradient(135deg,#2D7A76,#0F5E36)', videoId: null },
];

export default function StoryReels() {
  const [reels, setReels] = useState<Reel[]>(FALLBACK_REELS);
  const [modal, setModal] = useState<{ title: string; videoId: string | null } | null>(null);
  const [embedError, setEmbedError] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('properties')
      .select('title, tiktok_id, images, gradient')
      .not('tiktok_id', 'is', null)
      .neq('tiktok_id', '')
      .eq('published', true)
      .order('id')
      .limit(8)
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setReels(
            (data as Array<{ title: string; tiktok_id: string; images: string[]; gradient: string }>).map((p) => ({
              label: p.title,
              img: Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : '',
              gradient: p.gradient || 'linear-gradient(135deg,#2D7A76,#0F5E36)',
              videoId: p.tiktok_id || null,
            })),
          );
        }
      });
  }, []);

  const openStory = (title: string, videoId: string | null) => {
    setModal({ title, videoId });
    setEmbedError(false);
    setIframeLoaded(false);
    document.body.style.overflow = 'hidden';
  };

  const closeStory = () => {
    setModal(null);
    setEmbedError(false);
    setIframeLoaded(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <div className="story-row">
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '70px', paddingRight: '8px', borderRight: '1px solid #F3F4F6', marginRight: '4px', flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '13px', color: '#111827' }}>Property</div>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: '#6B7280' }}>Tour Reels</div>
        </div>
        {reels.map((reel, i) => (
          <div key={`${reel.label}-${i}`} className="story-reel" onClick={() => openStory(reel.label, reel.videoId)}>
            <div className="story-ring">
              <div className="story-inner" style={!reel.img ? { background: reel.gradient } : undefined}>
                {reel.img ? (
                  <Image src={reel.img} alt={reel.label} fill sizes="72px" style={{ objectFit: 'cover' }} />
                ) : (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                )}
                <div className="story-play">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                </div>
              </div>
            </div>
            <span className="story-label">{reel.label}</span>
          </div>
        ))}
      </div>

      {modal && (
        <div
          className="story-modal open"
          onClick={(e) => { if (e.target === e.currentTarget) closeStory(); }}
        >
          <div className="story-modal-inner">
            <button className="story-modal-close" onClick={closeStory}>✕</button>
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', overflow: 'hidden' }}>
              {modal.videoId && !embedError ? (
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                  {!iframeLoaded && (
                    <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.6)' }}>
                      <div className="story-spinner" />
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11 }}>Loading…</span>
                    </div>
                  )}
                  <iframe
                    src={`https://www.tiktok.com/embed/v2/${modal.videoId}`}
                    style={{
                      width: 'min(325px, 85vw)',
                      height: 'min(580px, 68vh)',
                      borderRadius: 12,
                      display: 'block',
                      border: 'none',
                      opacity: iframeLoaded ? 1 : 0,
                      transition: 'opacity 0.3s',
                    }}
                    allow="autoplay;encrypted-media"
                    allowFullScreen
                    onLoad={() => setIframeLoaded(true)}
                    onError={() => setEmbedError(true)}
                  />
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#fff', padding: '24px' }}>
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="rgba(255,255,255,.6)">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.54V6.78a4.84 4.84 0 01-1.07-.09z" />
                  </svg>
                  <p style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '15px', margin: '12px 0 6px' }}>{modal.title}</p>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', opacity: 0.7, marginBottom: '20px' }}>TikTok Property Tour</p>
                  <a
                    href={TIKTOK_PROFILE}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: '#E63946', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '13px', padding: '12px 28px', borderRadius: '99px', textDecoration: 'none', display: 'inline-block' }}
                  >
                    Watch on TikTok →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
