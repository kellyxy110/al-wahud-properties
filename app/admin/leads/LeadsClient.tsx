'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Search, MessageCircle, Phone, X, ChevronDown, ChevronUp } from 'lucide-react';

type Status = 'New' | 'Contacted' | 'Negotiation' | 'Inspection' | 'Closed';

interface Lead {
  id: string;
  name: string;
  phone: string;
  interest: string;
  status: Status;
  date: string;
  notes: string;
  budget: string;
}

const MOCK_LEADS: Lead[] = [
  { id: '1', name: 'Adewale Okonkwo',    phone: '+234 801 234 5678', interest: '3-Bed Duplex, Lekki Phase 1',     status: 'New',         date: '2026-05-14', notes: '',                         budget: '₦45M' },
  { id: '2', name: 'Fatima Bello',        phone: '+234 802 345 6789', interest: 'Short Let, Victoria Island',      status: 'Contacted',   date: '2026-05-13', notes: 'Interested in monthly deals', budget: '₦2M/yr' },
  { id: '3', name: 'Chukwuemeka Eze',    phone: '+234 803 456 7890', interest: 'Commercial Space, Ikeja',         status: 'Negotiation', date: '2026-05-12', notes: 'Viewing scheduled May 20',   budget: '₦120M' },
  { id: '4', name: 'Aminat Lawal',        phone: '+234 804 567 8901', interest: 'Land, Ibeju-Lekki',              status: 'Inspection',  date: '2026-05-11', notes: 'Wants to inspect next week',  budget: '₦28M' },
  { id: '5', name: 'Olumide Adebayo',    phone: '+234 805 678 9012', interest: 'Penthouse, Eko Atlantic',         status: 'Closed',      date: '2026-05-10', notes: 'Deal closed! 🎉',             budget: '₦250M' },
  { id: '6', name: 'Ngozi Okafor',       phone: '+234 806 789 0123', interest: '4-Bed Duplex, Abuja',            status: 'New',         date: '2026-05-14', notes: '',                         budget: '₦85M' },
  { id: '7', name: 'Emmanuel Igwe',      phone: '+234 807 890 1234', interest: 'Apartment, Port Harcourt GRA',   status: 'Contacted',   date: '2026-05-13', notes: 'Diaspora client, UK-based',   budget: '₦35M' },
  { id: '8', name: 'Bukola Adeleke',     phone: '+234 808 901 2345', interest: 'Bungalow, Ikorodu',              status: 'Negotiation', date: '2026-05-11', notes: 'Price negotiation ongoing',   budget: '₦18M' },
];

const STATUS_CONFIG: Record<Status, { color: string; bg: string; border: string }> = {
  New:         { color: '#3B82F6', bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.25)' },
  Contacted:   { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)' },
  Negotiation: { color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)' },
  Inspection:  { color: '#14B8A6', bg: 'rgba(20,184,166,0.12)', border: 'rgba(20,184,166,0.25)' },
  Closed:      { color: '#10B981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.25)' },
};
const STATUSES: Status[] = ['New', 'Contacted', 'Negotiation', 'Inspection', 'Closed'];

const INP: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10, padding: '9px 14px', color: '#fff',
  fontFamily: 'var(--font-inter)', fontSize: 13, outline: 'none',
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const row = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export default function LeadsClient() {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [filterStatus, setFilterStatus] = useState<Status | 'All'>('All');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newLead, setNewLead] = useState<Partial<Lead>>({ status: 'New' });
  const [notes, setNotes] = useState<Record<string, string>>({});

  const filtered = leads.filter(l => {
    const matchStatus = filterStatus === 'All' || l.status === filterStatus;
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.interest.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  function addLead() {
    if (!newLead.name || !newLead.phone) return;
    const lead: Lead = {
      id: Date.now().toString(),
      name: newLead.name ?? '',
      phone: newLead.phone ?? '',
      interest: newLead.interest ?? '',
      status: (newLead.status as Status) ?? 'New',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      budget: newLead.budget ?? '',
    };
    setLeads(prev => [lead, ...prev]);
    setNewLead({ status: 'New' });
    setShowAdd(false);
  }

  function updateStatus(id: string, status: Status) {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  }

  function saveNote(id: string) {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, notes: notes[id] ?? l.notes } : l));
  }

  return (
    <div className="px-4 lg:px-8" style={{ paddingTop: 24, paddingBottom: 60 }}>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leads…" style={{ ...INP, width: '100%', paddingLeft: 36 }} />
        </div>
        <button onClick={() => setShowAdd(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#3B82F6,#2563EB)', border: 'none', borderRadius: 10, padding: '10px 18px', color: '#fff', fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(59,130,246,0.3)', whiteSpace: 'nowrap' }}>
          <Plus size={15} /> Add Lead
        </button>
      </div>

      {/* Status tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
        {(['All', ...STATUSES] as const).map(s => {
          const cfg = s !== 'All' ? STATUS_CONFIG[s] : null;
          return (
            <button key={s} onClick={() => setFilterStatus(s)} style={{
              padding: '6px 14px', borderRadius: 99, cursor: 'pointer', whiteSpace: 'nowrap',
              fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: filterStatus === s ? 700 : 500,
              background: filterStatus === s ? (cfg?.bg ?? 'rgba(255,255,255,0.12)') : 'rgba(255,255,255,0.05)',
              color: filterStatus === s ? (cfg?.color ?? '#fff') : 'rgba(255,255,255,0.45)',
              border: filterStatus === s ? `1px solid ${cfg?.border ?? 'rgba(255,255,255,0.2)'}` : '1px solid transparent',
            }}>
              {s} <span style={{ opacity: 0.7 }}>({s === 'All' ? leads.length : leads.filter(l => l.status === s).length})</span>
            </button>
          );
        })}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 12, marginBottom: 28 }}>
        {STATUSES.map(s => {
          const cfg = STATUS_CONFIG[s];
          const count = leads.filter(l => l.status === s).length;
          return (
            <div key={s} style={{ padding: '14px 16px', borderRadius: 14, background: cfg.bg, border: `1px solid ${cfg.border}`, textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 22, color: cfg.color, lineHeight: 1 }}>{count}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: cfg.color, opacity: 0.8, marginTop: 4 }}>{s}</div>
            </div>
          );
        })}
      </div>

      {/* Lead list */}
      <motion.div variants={container} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(lead => {
          const cfg = STATUS_CONFIG[lead.status];
          const expanded = expandedId === lead.id;
          return (
            <motion.div key={lead.id} variants={row}>
              <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                {/* Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', flexWrap: 'wrap', cursor: 'pointer' }} onClick={() => setExpandedId(expanded ? null : lead.id)}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: cfg.bg, border: `1px solid ${cfg.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Users size={16} style={{ color: cfg.color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 14, color: '#fff' }}>{lead.name}</div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{lead.interest}</div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: '#10B981' }}>{lead.budget}</span>
                  <span style={{ padding: '4px 12px', borderRadius: 99, fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 700, color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`, whiteSpace: 'nowrap' }}>
                    {lead.status}
                  </span>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{lead.date}</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <a href={`https://wa.me/${lead.phone.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)', color: '#25D366', textDecoration: 'none' }}>
                      <MessageCircle size={14} />
                    </a>
                    <a href={`tel:${lead.phone}`} onClick={e => e.stopPropagation()}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#3B82F6', textDecoration: 'none' }}>
                      <Phone size={14} />
                    </a>
                  </div>
                  {expanded ? <ChevronUp size={14} style={{ color: 'rgba(255,255,255,0.35)', flexShrink: 0 }} /> : <ChevronDown size={14} style={{ color: 'rgba(255,255,255,0.35)', flexShrink: 0 }} />}
                </div>

                {/* Expanded */}
                <AnimatePresence>
                  {expanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '16px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        {/* Change status */}
                        <div>
                          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 10 }}>Change Status</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {STATUSES.map(s => {
                              const c = STATUS_CONFIG[s];
                              return (
                                <button key={s} onClick={() => updateStatus(lead.id, s)} style={{ padding: '5px 12px', borderRadius: 99, border: `1px solid ${c.border}`, background: lead.status === s ? c.bg : 'transparent', color: c.color, fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                                  {s}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        {/* Notes */}
                        <div>
                          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 10 }}>Notes</div>
                          <textarea
                            defaultValue={lead.notes}
                            onChange={e => setNotes(prev => ({ ...prev, [lead.id]: e.target.value }))}
                            rows={3}
                            placeholder="Add note…"
                            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '8px 12px', color: '#fff', fontFamily: 'var(--font-inter)', fontSize: 12, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                          />
                          <button onClick={() => saveNote(lead.id)} style={{ marginTop: 6, padding: '6px 14px', borderRadius: 8, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10B981', fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                            Save Note
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Add Lead modal */}
      <AnimatePresence>
        {showAdd && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAdd(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', zIndex: 100 }} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 101, width: 'min(480px, 90vw)', background: '#0C1420', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 24, padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 18, color: '#fff' }}>Add New Lead</span>
                <button onClick={() => setShowAdd(false)} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer', color: 'rgba(255,255,255,0.55)', display: 'flex' }}>
                  <X size={16} />
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'Full Name *', key: 'name', ph: 'Adewale Okonkwo' },
                  { label: 'Phone *', key: 'phone', ph: '+234 800 000 0000' },
                  { label: 'Property Interest', key: 'interest', ph: '3-Bed Duplex, Lekki Phase 1' },
                  { label: 'Budget', key: 'budget', ph: '₦45M' },
                ].map(({ label, key, ph }) => (
                  <div key={key}>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
                    <input value={(newLead as Record<string, string>)[key] ?? ''} onChange={e => setNewLead(prev => ({ ...prev, [key]: e.target.value }))} placeholder={ph} style={{ ...INP, width: '100%', boxSizing: 'border-box' }} />
                  </div>
                ))}
                <div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 6 }}>Initial Status</div>
                  <select value={newLead.status} onChange={e => setNewLead(prev => ({ ...prev, status: e.target.value as Status }))} style={{ ...INP, width: '100%', boxSizing: 'border-box' }}>
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <button onClick={addLead} style={{ background: 'linear-gradient(135deg,#3B82F6,#2563EB)', border: 'none', borderRadius: 12, padding: '13px 0', color: '#fff', fontFamily: 'var(--font-inter)', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 8 }}>
                  Add Lead
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
