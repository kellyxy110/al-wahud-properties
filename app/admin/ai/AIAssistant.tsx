'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Copy, Check, Zap, FileText, Hash, MessageSquare, Building2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  ts: Date;
  copying?: boolean;
}

const QUICK_ACTIONS = [
  { label: 'Generate Property Description', icon: Building2, color: '#10B981', prompt: 'Generate a luxury property description for a 4-bedroom duplex in Lekki Phase 1, Lagos, with a private pool, fitted kitchen, and 24/7 security. Price: ₦85,000,000.' },
  { label: 'Write Blog Post Outline',       icon: FileText,   color: '#8B5CF6', prompt: 'Write a compelling blog post outline for: "5 Reasons to Invest in Lagos Real Estate in 2026"' },
  { label: 'Create Social Caption',         icon: MessageSquare, color: '#F59E0B', prompt: 'Create a premium Instagram caption for a luxury 3-bedroom apartment listing in Victoria Island, Lagos, priced at ₦65M. Include relevant hashtags.' },
  { label: 'SEO Metadata',                  icon: Hash,       color: '#14B8A6', prompt: 'Generate SEO metadata (title tag + meta description) for a property listing: "Luxury 5-Bed Penthouse, Eko Atlantic City, Lagos. Price: ₦350M"' },
  { label: 'WhatsApp Message',              icon: MessageSquare, color: '#25D366', prompt: 'Write a professional WhatsApp follow-up message for a client who inquired about a 3-bedroom apartment in Abuja GRA.' },
  { label: 'Market Analysis',              icon: Zap,        color: '#EF4444', prompt: 'Write a short market analysis paragraph for the Lekki-Epe corridor real estate market in 2026, highlighting investment opportunities.' },
];

const AI_RESPONSES: Record<string, string> = {
  'Generate Property Description': `**Luxurious 4-Bedroom Duplex | Lekki Phase 1, Lagos**

Welcome to an extraordinary lifestyle opportunity in the heart of Lekki Phase 1. This meticulously crafted 4-bedroom duplex represents the pinnacle of contemporary Nigerian luxury living.

**About This Property:**
Nestled within an exclusive residential enclave, this stunning residence offers a seamless blend of architectural brilliance and functional elegance. Each of the four generously proportioned bedrooms is designed as a private sanctuary, featuring en-suite bathrooms with premium fixtures and floor-to-ceiling windows that flood the spaces with natural light.

**Key Features:**
- Grand entrance foyer with double-height ceilings
- Private swimming pool with integrated LED lighting
- State-of-the-art fitted kitchen with imported granite countertops
- Expansive open-plan living and dining areas
- Smart home automation system
- Three-car garage with automated gates
- 24/7 professional security and CCTV surveillance
- Uninterrupted power supply and treated water

This is more than a home — it is a statement of achievement. Priced at ₦85,000,000.

*Contact us on WhatsApp to arrange a private viewing.*`,

  'Write Blog Post Outline': `# 5 Reasons to Invest in Lagos Real Estate in 2026

## Introduction
- Brief overview of Lagos as Africa's economic powerhouse
- Why now is the optimal moment to invest

## Reason 1: Infrastructure Renaissance
- Lekki-Epe Expressway expansion
- The Dangote Refinery effect on Ibeju-Lekki
- New airport development impact

## Reason 2: Rising Diaspora Investment
- UK, US, and Canadian Nigerian investors returning capital
- Mortgage reforms making ownership accessible
- Currency arbitrage advantages for dollar-earners

## Reason 3: Supply-Demand Imbalance
- Lagos housing deficit: 2.5 million units
- Population growth outpacing construction
- Rental yield premiums of 8-15%

## Reason 4: Luxury Market Boom
- Eko Atlantic as West Africa's Manhattan
- Short-let market growing 40% year-on-year
- High-net-worth Nigerian buyer pool expanding

## Reason 5: NIESV-Certified Legal Security
- Improved land title registration
- Governor's Consent reforms
- Digital deed verification system

## Conclusion + Call to Action
- Invitation to book a consultation with Al-Wajud Properties`,

  'Create Social Caption': `✨ **Island Living, Elevated.** ✨

Step into this breathtaking 3-bedroom apartment in the heart of Victoria Island, Lagos — where every detail whispers luxury.

🏙️ Panoramic city views from your private balcony
🛋️ Designer interiors with Italian marble finishes
🔐 24/7 concierge & smart security
💎 Premium fitted kitchen & wine cellar

This is not just a home. This is a lifestyle statement.

Listed at **₦65,000,000** — available now.

Slide into our DMs or tap the link in bio to book your exclusive viewing. 📲

#LagosRealEstate #VictoriaIsland #LuxuryLiving #AlWajudProperties #NigeriaProperty #LagosHomes #PropertyNigeria #LuxuryApartment #RealEstateNigeria #LagosLifestyle #PremiumProperty #PropertyForSale`,

  'SEO Metadata': `**SEO Title (58 characters):**
Luxury 5-Bed Penthouse Eko Atlantic Lagos | Al-Wajud

**Meta Description (155 characters):**
Discover this extraordinary 5-bedroom penthouse at Eko Atlantic City, Lagos. Ocean views, premium finishes, 24/7 security. Priced at ₦350M. Book your private tour today.

**Recommended Keywords:**
- Primary: "penthouse Lagos", "Eko Atlantic apartment"
- Secondary: "luxury real estate Lagos", "5 bedroom penthouse Nigeria"
- Long-tail: "buy penthouse Eko Atlantic City Lagos"

**Open Graph Title:**
Luxury Ocean-View Penthouse at Eko Atlantic | ₦350M

**Open Graph Description:**
West Africa's most prestigious address. 5-bedroom luxury penthouse with panoramic Atlantic Ocean views in Eko Atlantic City. Fully fitted, 24/7 concierge service.`,

  'WhatsApp Message': `Hello [Client Name],

I hope this message finds you well! 🏠

I'm reaching out from *Al-Wajud Properties* regarding your recent inquiry about the 3-bedroom apartment in Abuja GRA.

I wanted to personally follow up and share some exciting news — we've just updated the listing with new photos and additional details that I think you'll love.

Here's a quick summary:
✅ 3 Bedrooms, 3 Bathrooms (All en-suite)
✅ 24/7 Security & CCTV
✅ Fitted kitchen & dedicated parking
✅ Flexible payment terms available

I'd love to arrange a private viewing at your convenience. We can do in-person or a virtual tour if you're currently abroad.

When would work best for you this week? 📅

Warm regards,
*Al-Wajud Properties Team*
📞 [Phone Number]`,

  'Market Analysis': `**Lekki-Epe Corridor: Market Intelligence Report — 2026**

The Lekki-Epe real estate corridor continues to command exceptional investor attention, driven by a confluence of infrastructure development, diaspora capital flows, and Nigeria's most aggressive urban expansion in a generation.

Property values along the Lekki-Epe Expressway have appreciated 18-27% year-on-year (2024-2026), outpacing Lagos Island's traditional premium zones. The Dangote Refinery's operational status has catalysed industrial and residential demand in the Ibeju-Lekki sub-market, with off-plan investments offering projected yields of 12-18% upon completion.

The corridor's dual appeal — lifestyle luxury in established Lekki Phase 1/2 and frontier investment in emerging Epe communities — positions it as Al-Wajud Properties' highest-demand portfolio segment. Buyers are advised to act decisively, as premium inventory absorption is currently at 73% of supply within 90 days of listing.`,
};

function getResponse(prompt: string, quickLabel?: string): string {
  if (quickLabel && AI_RESPONSES[quickLabel]) return AI_RESPONSES[quickLabel];
  const lower = prompt.toLowerCase();
  if (lower.includes('description') || lower.includes('property')) return AI_RESPONSES['Generate Property Description'];
  if (lower.includes('blog') || lower.includes('article') || lower.includes('outline')) return AI_RESPONSES['Write Blog Post Outline'];
  if (lower.includes('caption') || lower.includes('instagram') || lower.includes('social')) return AI_RESPONSES['Create Social Caption'];
  if (lower.includes('seo') || lower.includes('metadata') || lower.includes('meta')) return AI_RESPONSES['SEO Metadata'];
  if (lower.includes('whatsapp') || lower.includes('message') || lower.includes('follow')) return AI_RESPONSES['WhatsApp Message'];
  if (lower.includes('market') || lower.includes('analysis') || lower.includes('invest')) return AI_RESPONSES['Market Analysis'];
  return `Thank you for your request! I'm Al-Wajud's AI Assistant, powered by advanced language intelligence.

I can help you with:
• **Property Descriptions** — Luxury, detailed, conversion-optimised
• **Blog Post Outlines** — SEO-friendly editorial content
• **Social Media Captions** — Engagement-driven Instagram & WhatsApp content
• **SEO Metadata** — Title tags, meta descriptions, schema markup
• **Market Analysis** — Data-driven investment insights
• **Client Communications** — Professional WhatsApp & email templates

Please try one of the quick action buttons above, or ask me a specific question about your listing or content needs. I'm here to elevate your real estate brand! 🏡✨`;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0', role: 'ai', ts: new Date(),
      text: `Welcome to your **AI Content Assistant**!

I specialize in luxury real estate content for the Nigerian market. Use the quick action buttons below to instantly generate property descriptions, blog outlines, social captions, SEO metadata, and more.

Or simply type your request and I'll craft it for you. ✨`,
    }
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [context, setContext] = useState({ propertyTitle: '', location: '', price: '', type: '' });
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function sendMessage(text: string, quickLabel?: string) {
    if (!text.trim() || thinking) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: text.trim(), ts: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setThinking(true);
    setTimeout(() => {
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', text: getResponse(text, quickLabel), ts: new Date() };
      setMessages(prev => [...prev, aiMsg]);
      setThinking(false);
    }, 1200 + Math.random() * 800);
  }

  function copyText(id: string, text: string) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  function renderText(text: string) {
    return text.split('\n').map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <p key={i} style={{ margin: '4px 0', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: bold || '&nbsp;' }} />;
    });
  }

  return (
    <div className="px-4 lg:px-8" style={{ paddingTop: 24, paddingBottom: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }} className="xl:grid-cols-[1fr_280px]">

        {/* CHAT PANEL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Quick actions */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {QUICK_ACTIONS.map(({ label, icon: Icon, color, prompt }) => (
              <button key={label} onClick={() => sendMessage(prompt, label)} style={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '8px 14px',
                borderRadius: 10, border: `1px solid ${color}30`,
                background: `${color}10`, color, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 600,
                transition: 'all 0.15s',
              }}>
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 20, minHeight: 420, maxHeight: 560, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <AnimatePresence initial={false}>
              {messages.map(msg => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                  style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: 10, alignItems: 'flex-start' }}>
                  {msg.role === 'ai' && (
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#10B981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 12px rgba(16,185,129,0.4)' }}>
                      <Sparkles size={15} color="#fff" />
                    </div>
                  )}
                  <div style={{ maxWidth: '78%' }}>
                    <div style={{
                      padding: '12px 16px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      background: msg.role === 'user' ? 'linear-gradient(135deg,#10B981,#059669)' : 'rgba(255,255,255,0.06)',
                      border: msg.role === 'ai' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                      color: '#fff', fontFamily: 'var(--font-inter)', fontSize: 13, lineHeight: 1.6,
                    }}>
                      {renderText(msg.text)}
                    </div>
                    {msg.role === 'ai' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                        <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>
                          {msg.ts.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <button onClick={() => copyText(msg.id, msg.text)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600 }}>
                          {copied === msg.id ? <Check size={10} style={{ color: '#10B981' }} /> : <Copy size={10} />}
                          {copied === msg.id ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {thinking && (
                <motion.div key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#10B981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Sparkles size={15} color="#fff" />
                  </div>
                  <div style={{ padding: '12px 16px', borderRadius: '18px 18px 18px 4px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }}
                        style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
              placeholder="Ask me to generate property descriptions, blog posts, social captions…"
              style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '13px 18px', color: '#fff', fontFamily: 'var(--font-inter)', fontSize: 13, outline: 'none' }}
            />
            <button onClick={() => sendMessage(input)} disabled={!input.trim() || thinking} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg,#10B981,#059669)', border: 'none', cursor: 'pointer', flexShrink: 0, boxShadow: '0 4px 16px rgba(16,185,129,0.35)', opacity: !input.trim() || thinking ? 0.5 : 1 }}>
              <Send size={18} color="#fff" />
            </button>
          </div>
        </div>

        {/* CONTEXT PANEL */}
        <div className="hidden xl:block">
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Zap size={14} style={{ color: '#F59E0B' }} />
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Property Context</span>
            </div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 16, lineHeight: 1.6 }}>
              Fill in property details to give the AI better context for generated content.
            </p>
            {[
              { label: 'Property Title', key: 'propertyTitle', ph: 'Luxury 4-Bed Duplex' },
              { label: 'Location', key: 'location', ph: 'Lekki Phase 1, Lagos' },
              { label: 'Price', key: 'price', ph: '₦85,000,000' },
              { label: 'Property Type', key: 'type', ph: 'Duplex / Apartment / Land' },
            ].map(({ label, key, ph }) => (
              <div key={key} style={{ marginBottom: 14 }}>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
                <input
                  value={(context as Record<string, string>)[key]}
                  onChange={e => setContext(prev => ({ ...prev, [key]: e.target.value }))}
                  placeholder={ph}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '9px 12px', color: '#fff', fontFamily: 'var(--font-inter)', fontSize: 12, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            ))}
            <div style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.12)', marginTop: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <Sparkles size={12} style={{ color: '#10B981' }} />
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 700, color: '#10B981' }}>Powered by Claude</span>
              </div>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>
                AI responses are generated by Anthropic&apos;s Claude. Connect your Claude API key in Settings to enable live AI generation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
