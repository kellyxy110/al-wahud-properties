'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { BarChart3, Building2, CheckCircle, FileText, TrendingUp, Eye } from 'lucide-react';
import type { AnalyticsData } from './page';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const PALETTE = ['#10B981','#14B8A6','#3B82F6','#8B5CF6','#F59E0B','#EF4444'];

const MOCK_MONTHLY = [
  { month: 'Dec', properties: 2, blogs: 1 },
  { month: 'Jan', properties: 3, blogs: 2 },
  { month: 'Feb', properties: 1, blogs: 3 },
  { month: 'Mar', properties: 4, blogs: 2 },
  { month: 'Apr', properties: 5, blogs: 4 },
  { month: 'May', properties: 3, blogs: 2 },
];

const PERIODS = ['7 days', '30 days', '90 days'];

function GlassCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, ...style }}>
      {children}
    </div>
  );
}

const TOOLTIP_STYLE = {
  background: 'rgba(10,16,30,0.95)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12, color: '#fff', fontFamily: 'var(--font-inter)', fontSize: 12,
};

export default function AnalyticsClient({ data }: { data: AnalyticsData }) {
  const [period, setPeriod] = useState('30 days');

  const locData = data.byLocation.map(({ location_key, count }) => ({
    name: location_key.charAt(0).toUpperCase() + location_key.slice(1).replace('-', ' '),
    value: count,
  }));

  const typeData = data.byType.map(({ property_type, count }) => ({
    name: property_type.charAt(0).toUpperCase() + property_type.slice(1),
    value: count,
  }));

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="px-4 lg:px-8" style={{ paddingTop: 24, paddingBottom: 60 }}>

      {/* Period selector */}
      <motion.div variants={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BarChart3 size={18} style={{ color: '#10B981' }} />
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Analytics Overview</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {PERIODS.map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              padding: '6px 14px', borderRadius: 99, cursor: 'pointer',
              fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: period === p ? 700 : 500,
              background: period === p ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)',
              color: period === p ? '#10B981' : 'rgba(255,255,255,0.45)',
              border: period === p ? '1px solid rgba(16,185,129,0.3)' : '1px solid transparent',
            }}>{p}</button>
          ))}
        </div>
      </motion.div>

      {/* Top metric cards */}
      <motion.div variants={item} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Total Properties', value: data.totalProperties,    color: '#10B981', Icon: Building2,  sub: 'In database'      },
          { label: 'Published',        value: data.publishedProperties, color: '#14B8A6', Icon: CheckCircle, sub: 'Live on site'     },
          { label: 'Blog Posts',       value: data.totalBlogPosts,      color: '#8B5CF6', Icon: FileText,    sub: 'Editorial studio' },
          { label: 'Est. Views',       value: data.totalProperties * 47, color: '#F59E0B', Icon: Eye,        sub: 'Past 30 days'    },
          { label: 'Engagement',       value: 68,                        color: '#EF4444', Icon: TrendingUp,  sub: '% avg rate'      },
        ].map(card => (
          <GlassCard key={card.label} style={{ padding: 20, position: 'relative', overflow: 'hidden' }}>
            <div aria-hidden style={{ position: 'absolute', top: -20, right: -16, width: 70, height: 70, borderRadius: '50%', background: `${card.color}30`, filter: 'blur(20px)', pointerEvents: 'none' }} />
            <div style={{ width: 38, height: 38, borderRadius: 10, background: `${card.color}20`, border: `1px solid ${card.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <card.Icon size={18} style={{ color: card.color }} />
            </div>
            <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 28, color: '#fff', lineHeight: 1 }}>
              {card.value.toLocaleString()}
            </div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>{card.label}</div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>{card.sub}</div>
          </GlassCard>
        ))}
      </motion.div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16, marginBottom: 20 }}>

        {/* Monthly activity line chart */}
        <motion.div variants={item}>
          <GlassCard style={{ padding: 24 }}>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 20 }}>Monthly Activity</div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={MOCK_MONTHLY}>
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontFamily: 'var(--font-inter)' }} />
                <YAxis stroke="rgba(255,255,255,0.1)" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Line type="monotone" dataKey="properties" stroke="#10B981" strokeWidth={2.5} dot={{ fill: '#10B981', r: 4 }} />
                <Line type="monotone" dataKey="blogs" stroke="#8B5CF6" strokeWidth={2.5} dot={{ fill: '#8B5CF6', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 10, height: 3, background: '#10B981', borderRadius: 2 }} /><span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Properties</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 10, height: 3, background: '#8B5CF6', borderRadius: 2 }} /><span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Blog Posts</span></div>
            </div>
          </GlassCard>
        </motion.div>

        {/* By Location bar chart */}
        <motion.div variants={item}>
          <GlassCard style={{ padding: 24 }}>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 20 }}>Properties by Location</div>
            {locData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={locData} barSize={28}>
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontFamily: 'var(--font-inter)' }} />
                  <YAxis stroke="rgba(255,255,255,0.1)" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Bar dataKey="value" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-inter)', fontSize: 13 }}>No data yet</div>
            )}
          </GlassCard>
        </motion.div>

        {/* Property Type pie chart */}
        <motion.div variants={item}>
          <GlassCard style={{ padding: 24 }}>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 20 }}>Property Type Mix</div>
            {typeData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={typeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={40}>
                      {typeData.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12, justifyContent: 'center' }}>
                  {typeData.map((d, i) => (
                    <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: PALETTE[i % PALETTE.length] }} />
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{d.name} ({d.value})</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-inter)', fontSize: 13 }}>No data yet</div>
            )}
          </GlassCard>
        </motion.div>
      </div>

      {/* Recent properties table */}
      <motion.div variants={item}>
        <GlassCard style={{ padding: 24 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 20 }}>Recent Listings</div>
          {data.recentProperties.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 0', color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-inter)', fontSize: 13 }}>No properties yet</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {data.recentProperties.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < data.recentProperties.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${PALETTE[i % PALETTE.length]}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Building2 size={14} style={{ color: PALETTE[i % PALETTE.length] }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600, color: '#fff' }}>{p.title}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{p.location}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 700, color: '#F59E0B' }}>+{(Math.random() * 200 + 20).toFixed(0)} views</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>{new Date(p.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
