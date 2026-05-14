'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import {
  Building2, CheckCircle, PlayCircle, FileText, FolderOpen, Eye,
  PlusSquare, ImageIcon, UserCircle, BarChart3, Sparkles,
  Activity, Database, HardDrive, Clock,
} from 'lucide-react';
import { format } from 'date-fns';

export interface DashboardStats {
  totalProperties  : number;
  featuredTours    : number;
  publishedListings: number;
  blogPosts        : number;
  mediaFiles?      : number;
  totalViews?      : number;
}

/* ── Animated counter ─────────────────────────────────────────────── */
function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (target === 0) { ref.current.textContent = '0'; return; }
    const dur = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      if (ref.current) ref.current.textContent = String(Math.round(ease * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return <span ref={ref}>{target}</span>;
}

/* ── Glass card ───────────────────────────────────────────────────── */
function GlassCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 20,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ── Animation variants ───────────────────────────────────────────── */
const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

/* ── Greeting helper ──────────────────────────────────────────────── */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

/* ── Mock activity feed ───────────────────────────────────────────── */
const ACTIVITY = [
  { label: 'Property listing published',       time: '2 minutes ago', color: '#10B981', Icon: Building2   },
  { label: 'New TikTok tour linked',           time: '1 hour ago',    color: '#EF4444', Icon: PlayCircle  },
  { label: 'Blog post "Investing in Lagos"',   time: '3 hours ago',   color: '#8B5CF6', Icon: FileText    },
  { label: 'Media files uploaded to vault',    time: '5 hours ago',   color: '#14B8A6', Icon: ImageIcon   },
  { label: 'Admin session started',            time: '6 hours ago',   color: '#F59E0B', Icon: Activity    },
  { label: 'CEO profile photo updated',        time: 'Yesterday',     color: '#10B981', Icon: UserCircle  },
];

/* ── Quick launch items ───────────────────────────────────────────── */
const QUICK = [
  { href: '/admin/add-property', label: 'Add Property',   Icon: PlusSquare,  color: '#10B981' },
  { href: '/admin/blog/new',     label: 'New Blog Post',  Icon: FileText,    color: '#8B5CF6' },
  { href: '/admin/media',        label: 'Media Vault',    Icon: ImageIcon,   color: '#14B8A6' },
  { href: '/admin/profile',      label: 'Edit Profile',   Icon: UserCircle,  color: '#F59E0B' },
  { href: '/admin/tours',        label: 'Featured Tours', Icon: PlayCircle,  color: '#EF4444' },
  { href: '/admin/analytics',    label: 'Analytics',      Icon: BarChart3,   color: '#10B981' },
];

/* ── Stat card config ─────────────────────────────────────────────── */
function buildStats(s: DashboardStats) {
  return [
    {
      label: 'Total Properties', value: s.totalProperties, sub: 'In database',
      gradient: 'linear-gradient(135deg,#10B981,#059669)', glow: 'rgba(16,185,129,0.3)', Icon: Building2,
    },
    {
      label: 'Published Listings', value: s.publishedListings, sub: 'Visible to visitors',
      gradient: 'linear-gradient(135deg,#14B8A6,#0D9488)', glow: 'rgba(20,184,166,0.3)', Icon: CheckCircle,
    },
    {
      label: 'Featured Tours', value: s.featuredTours, sub: 'With TikTok embed',
      gradient: 'linear-gradient(135deg,#EF4444,#DC2626)', glow: 'rgba(239,68,68,0.3)', Icon: PlayCircle,
    },
    {
      label: 'Blog Posts', value: s.blogPosts, sub: 'In editorial studio',
      gradient: 'linear-gradient(135deg,#8B5CF6,#7C3AED)', glow: 'rgba(139,92,246,0.3)', Icon: FileText,
    },
    {
      label: 'Media Files', value: s.mediaFiles ?? 0, sub: 'In storage vault',
      gradient: 'linear-gradient(135deg,#3B82F6,#2563EB)', glow: 'rgba(59,130,246,0.3)', Icon: FolderOpen,
    },
    {
      label: 'Total Views', value: s.totalViews ?? 0, sub: 'Estimated impressions',
      gradient: 'linear-gradient(135deg,#F59E0B,#D97706)', glow: 'rgba(245,158,11,0.3)', Icon: Eye,
    },
  ];
}

/* ── Simple sparkline bars (recharts-free) ────────────────────────── */
function SparkBars({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 32 }}>
      {data.map((v, i) => (
        <div key={i} style={{
          flex: 1, borderRadius: 3,
          background: color,
          height: `${(v / max) * 100}%`,
          opacity: 0.5 + (i / data.length) * 0.5,
        }} />
      ))}
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────── */
export default function DashboardClient({ stats }: { stats: DashboardStats }) {
  const [now, setNow] = useState(new Date());
  const statCards = buildStats(stats);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="px-4 lg:px-8" style={{ paddingTop: 28, paddingBottom: 48 }}>

      {/* ── Hero greeting ─────────────────────────────────────────── */}
      <motion.div variants={item} style={{ marginBottom: 32 }}>
        <GlassCard style={{ padding: '28px 32px', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden style={{
            position: 'absolute', top: -40, right: -40, width: 200, height: 200,
            borderRadius: '50%', background: 'rgba(16,185,129,0.08)', filter: 'blur(60px)',
            pointerEvents: 'none',
          }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8 }}>
                Al-Wajud Properties
              </div>
              <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 'clamp(20px,3vw,28px)', color: '#fff', margin: 0, letterSpacing: '-0.5px' }}>
                {getGreeting()}, <span style={{ color: '#10B981' }}>Admin</span>
              </h2>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 6 }}>
                Your command center is fully operational.
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 28, color: '#fff', lineHeight: 1 }}>
                {format(now, 'HH:mm')}
              </div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                {format(now, 'EEEE, MMMM d, yyyy')}
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* ── Metric grid ───────────────────────────────────────────── */}
      <div style={{ fontFamily: 'var(--font-inter)', fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.22)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 14 }}>
        METRICS OVERVIEW
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14, marginBottom: 36 }}>
        {statCards.map((card, idx) => (
          <motion.div key={card.label} variants={item}>
            <GlassCard style={{ padding: 22, position: 'relative', overflow: 'hidden' }}>
              <div aria-hidden style={{ position: 'absolute', top: -24, right: -16, width: 80, height: 80, borderRadius: '50%', background: card.glow, filter: 'blur(24px)', pointerEvents: 'none' }} />
              <div style={{ width: 42, height: 42, borderRadius: 12, background: card.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, boxShadow: `0 6px 16px ${card.glow}` }}>
                <card.Icon size={20} color="#fff" />
              </div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 34, color: '#fff', lineHeight: 1, letterSpacing: '-1px' }}>
                <Counter target={card.value} />
              </div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 6, fontWeight: 500 }}>
                {card.label}
              </div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,0.28)', marginTop: 4 }}>
                {card.sub}
              </div>
              <div style={{ marginTop: 14 }}>
                <SparkBars
                  data={[3,5,4,8,6,idx+2,card.value > 0 ? card.value : 1]}
                  color={card.gradient.includes('10B981') ? '#10B981' : card.gradient.includes('14B8A6') ? '#14B8A6' : card.gradient.includes('EF4444') ? '#EF4444' : card.gradient.includes('8B5CF6') ? '#8B5CF6' : card.gradient.includes('3B82F6') ? '#3B82F6' : '#F59E0B'}
                />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* ── Quick launch ──────────────────────────────────────────── */}
      <motion.div variants={item} style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: 'var(--font-inter)', fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.22)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 14 }}>
          QUICK LAUNCH
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {QUICK.map(({ href, label, Icon, color }) => (
            <Link key={href} href={href} style={{ textDecoration: 'none', flexShrink: 0 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 16px', borderRadius: 12,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#fff', cursor: 'pointer', transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}>
                <Icon size={15} style={{ color }} />
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600 }}>{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* ── Two-column section ────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginTop: 28 }}>

        {/* Recent Activity */}
        <motion.div variants={item}>
          <GlassCard style={{ padding: 24, height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Activity size={15} style={{ color: '#10B981' }} />
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                Recent Activity
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {ACTIVITY.map((a, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '11px 0',
                  borderBottom: i < ACTIVITY.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: `${a.color}18`, border: `1px solid ${a.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <a.Icon size={13} style={{ color: a.color }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>{a.label}</div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,0.28)', marginTop: 3 }}>{a.time}</div>
                  </div>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: a.color, marginTop: 4, flexShrink: 0, boxShadow: `0 0 6px ${a.color}` }} />
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* System Status */}
        <motion.div variants={item}>
          <GlassCard style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Database size={15} style={{ color: '#10B981' }} />
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                System Status
              </span>
            </div>

            {/* Supabase */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981', display: 'inline-block' }} />
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>Supabase</span>
                </div>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#10B981', fontWeight: 600 }}>Connected</span>
              </div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.28)', paddingLeft: 16 }}>
                abynlxbyoeqe***.supabase.co
              </div>
            </div>

            {/* Storage */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <HardDrive size={13} style={{ color: '#14B8A6' }} />
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>Storage</span>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>2.4 GB / 5 GB</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }} animate={{ width: '48%' }} transition={{ duration: 1, delay: 0.5 }}
                  style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg,#14B8A6,#10B981)' }}
                />
              </div>
            </div>

            {/* Tables */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.75)', marginBottom: 10 }}>
                Active Tables
              </div>
              {['properties', 'blog_posts', 'media_uploads'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{t}</span>
                </div>
              ))}
            </div>

            {/* Last publish */}
            <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={12} style={{ color: '#10B981' }} />
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                  Last publish: <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Today, 10:34 AM</span>
                </span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* ── Status bar ────────────────────────────────────────────── */}
      <motion.div variants={item} style={{ marginTop: 24 }}>
        <GlassCard style={{ padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>Supabase Connected</span>
          </div>
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.08)' }} />
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            Al-Wajud Properties · Real Estate Media Operating System
          </span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/admin/analytics" style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
              Analytics →
            </Link>
            <Link href="/test-db" style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
              DB Health →
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
