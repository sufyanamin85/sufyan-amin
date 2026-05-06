'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquareText,
  BrainCircuit,
  FileBarChart,
  Megaphone,
  Container,
  MapPin,
  Sparkles,
  X,
  ArrowUpRight,
  Check,
  Zap,
} from 'lucide-react';

// ─── Project Data ─────────────────────────────────────────────────────────────
const projects = [
  {
    id: 'prisphere',
    title: 'Prisphere',
    category: 'AI SaaS Platform',
    tagline: 'WhatsApp-native AI that runs your entire back office.',
    year: '2026',
    company: 'Strevio.ai',
    role: 'Full-Stack & AI Engineer',
    stack: ['Next.js', 'Node.js', 'Flask', 'MongoDB', 'Whisper', 'WHAPI', 'AWS EC2'],
    highlights: [
      'WhatsApp AI assistant giving clients instant access to invoices, renewals, CDD & tax records via interactive quick-reply buttons',
      'Real-time data integration across 11+ Google Sheets / Drive datasets for context-aware AI responses',
      'Multi-currency invoice automation (EUR, HKD, SGD) with scheduled billing and escalating payment reminders',
      'Voice-to-text pipeline built on Whisper + FFmpeg for audio-driven AI interaction',
      'AI-based task detection & assignment directly from WhatsApp group messages',
    ],
    impact: 'Replaced manual client ops with end-to-end AI workflows, cutting operational overhead to near zero.',
    from: '#7c3aed',
    to: '#4f46e5',
    glow: 'rgba(124,58,237,0.35)',
    Icon: MessageSquareText,
  },
  {
    id: 'ashford',
    title: 'Ashford Benjamin',
    category: 'AI Recruitment Intelligence',
    tagline: 'Hybrid RAG search across 54K+ legal candidates.',
    year: '2026',
    company: 'Strevio.ai',
    role: 'Full-Stack & AI Engineer',
    stack: ['Next.js', 'Flask', 'MongoDB', 'Embeddings', 'Vector Search', 'PSE API'],
    highlights: [
      'RAG architecture with embeddings + vector relevance scoring for intelligent candidate matching',
      'Hybrid search across internal 54K+ candidate dataset, LinkedIn profiles, and law firm websites',
      'Automated weekly pipeline syncing, processing, and enriching candidate datasets',
      'Recruiter workflow tools: notes, shortlisting, flagging, contact tracking & real-time progress',
    ],
    impact: 'Dramatically cut manual sourcing time and lifted recruiter throughput across global legal markets.',
    from: '#0ea5e9',
    to: '#0284c7',
    glow: 'rgba(14,165,233,0.3)',
    Icon: BrainCircuit,
  },
  {
    id: 'strevio-audit',
    title: 'Strevio AI Audit',
    category: 'Decision Intelligence Platform',
    tagline: 'Consulting-grade audit reports in minutes, not days.',
    year: '2025',
    company: 'Strevio.ai',
    role: 'Full-Stack & AI Engineer',
    stack: ['Next.js', 'Node.js', 'Flask', 'MongoDB', 'Firebase', 'Vercel'],
    highlights: [
      'Token-based, time-bound secure client submission flow with role-based authentication',
      '66-question diagnostic framework covering workflows, systems, data, and operational readiness',
      'AI analysis engine identifying bottlenecks, revenue leakage, and scalability risks',
      'Automated generation of PDF audit reports, presentation slides, diagrams, and ROI models',
      'Auditability layer with full execution logs and traceable AI decision outputs',
    ],
    impact: 'Replaced manual audit consulting cycles — report generation reduced from days to under 10 minutes.',
    from: '#f59e0b',
    to: '#d97706',
    glow: 'rgba(245,158,11,0.3)',
    Icon: FileBarChart,
  },
  {
    id: 'starsia',
    title: 'Strasia Marketing',
    category: 'Marketing Intelligence Platform',
    tagline: 'Real-time trend analysis & AI content at scale.',
    year: '2025',
    company: 'Strevio.ai',
    role: 'Full-Stack & AI Engineer',
    stack: ['Next.js', 'Flask', 'OpenRouter', 'Firebase', 'Google Cloud', 'PSE'],
    highlights: [
      'Intelligent content engine generating platform-specific posts for YouTube, LinkedIn, Instagram, TikTok & Facebook',
      'Topic Research System identifying trending global topics for cross-platform content strategy',
      'Content Planner generating 10-day posting calendars with scheduling and platform-specific ideas',
      'Trending Analysis Dashboard with KPIs, engagement predictions, and real-time news sourcing',
    ],
    impact: 'Delivered a fully automated marketing ecosystem eliminating manual trend research and content creation.',
    from: '#10b981',
    to: '#059669',
    glow: 'rgba(16,185,129,0.3)',
    Icon: Megaphone,
  },
  {
    id: 'wolfgang',
    title: 'Wolfgang Platform',
    category: 'Supply Chain Intelligence',
    tagline: 'Global logistics innovation, automated weekly at scale.',
    year: '2025',
    company: 'Strevio.ai',
    role: 'Full-Stack & AI Engineer',
    stack: ['Next.js', 'Flask', 'OpenRouter', 'PSE API', 'MongoDB'],
    highlights: [
      'AI-powered reporting platform publishing global supply chain and logistics innovations',
      'Automated intelligent scraping via Programmable Search Engine with caching & rate-limit optimization',
      'OpenRouter-powered summaries, insights, and content enhancement pipeline',
      'Responsive frontend with weekly report publishing and structured content delivery',
    ],
    impact: 'Generated 25–30 innovation case studies weekly with zero manual effort from the research team.',
    from: '#64748b',
    to: '#334155',
    glow: 'rgba(100,116,139,0.3)',
    Icon: Container,
  },
  {
    id: 'tripwaly',
    title: 'TripWaly',
    category: 'Web & Mobile Booking Platform',
    tagline: 'Multi-role tour booking — web and native mobile.',
    year: '2024',
    company: 'Devenue',
    role: 'Full-Stack Developer',
    stack: ['Next.js', 'React Native', 'Node.js', 'Express', 'MongoDB', 'Docker', 'JWT'],
    highlights: [
      'Multi-role dashboards for Users, Companies, and Admins with JWT authentication',
      'React Native mobile app (Expo) with full REST API integration',
      'MongoDB schemas for users, bookings, tours, and reviews',
      'Dockerized microservices architecture for deployment and testing',
    ],
    impact: 'Shipped a production-ready booking ecosystem — web and mobile — end to end.',
    from: '#06b6d4',
    to: '#0891b2',
    glow: 'rgba(6,182,212,0.3)',
    Icon: MapPin,
  },
];

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  .pf-root {
    --brand:        #ef0454;
    --brand-dim:    rgba(239,4,84,0.10);
    --brand-border: rgba(239,4,84,0.25);
    --surface:      #0a0a0f;
    --surface-2:    #111118;
    --surface-3:    #18181f;
    --surface-4:    #1f1f28;
    --border:       rgba(255,255,255,0.06);
    --border-h:     rgba(255,255,255,0.12);
    --text-1:       #f0f0f5;
    --text-2:       #9090a8;
    --text-3:       #58586a;
    font-family: 'DM Sans', sans-serif;
    background: var(--surface);
    color: var(--text-1);
    padding: 90px 24px 110px;
    min-height: 100vh;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }

  .pf-root::before {
    content: '';
    position: absolute;
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 500px;
    background: radial-gradient(ellipse at center, rgba(239,4,84,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .pf-inner { max-width: 1160px; margin: 0 auto; position: relative; }

  .pf-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--brand-border);
    background: var(--brand-dim);
    padding: 5px 14px;
    border-radius: 999px;
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--brand);
    margin-bottom: 22px;
  }

  .pf-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(34px, 5vw, 56px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.025em;
    color: var(--text-1);
    margin: 0 0 18px;
  }

  .pf-title em {
    font-style: italic;
    background: linear-gradient(100deg, var(--brand) 0%, #ff6b9d 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .pf-subtitle {
    font-size: 15.5px;
    color: var(--text-2);
    max-width: 500px;
    line-height: 1.7;
    margin: 0;
    font-weight: 400;
  }

  .pf-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    margin-top: 64px;
  }

  @media (max-width: 1024px) { .pf-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 640px)  { .pf-grid { grid-template-columns: 1fr; gap: 14px; } }

  .pf-card {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 18px;
    overflow: hidden;
    cursor: pointer;
    transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
    position: relative;
    text-align: left;
    width: 100%;
    display: block;
    padding: 0;
  }

  .pf-card:hover {
    border-color: var(--border-h);
    transform: translateY(-5px);
  }

  .pf-card-header {
    height: 172px;
    position: relative;
    overflow: hidden;
  }

  .pf-noise {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
    mix-blend-mode: overlay;
    opacity: 0.4;
    pointer-events: none;
  }

  .pf-icon-wrap {
    position: absolute;
    top: 18px;
    left: 18px;
    width: 42px;
    height: 42px;
    background: rgba(255,255,255,0.14);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.22);
    border-radius: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  .pf-year {
    position: absolute;
    top: 18px;
    right: 18px;
    background: rgba(0,0,0,0.28);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 999px;
    padding: 3px 11px;
    font-size: 10.5px;
    font-weight: 600;
    color: rgba(255,255,255,0.8);
    letter-spacing: 0.04em;
  }

  .pf-card-header-text {
    position: absolute;
    bottom: 18px;
    left: 18px;
    right: 18px;
  }

  .pf-cat {
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.65);
    margin: 0 0 5px;
  }

  .pf-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    margin: 0;
    line-height: 1.15;
  }

  .pf-card-body { padding: 18px 20px 20px; }

  .pf-tagline {
    font-size: 13px;
    color: var(--text-2);
    line-height: 1.6;
    margin: 0 0 14px;
    font-weight: 400;
  }

  .pf-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 16px;
  }

  .pf-tag {
    background: var(--surface-4);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 3px 9px;
    font-size: 10.5px;
    font-weight: 500;
    color: var(--text-3);
    letter-spacing: 0.02em;
  }

  .pf-divider {
    height: 1px;
    background: var(--border);
    margin-bottom: 16px;
  }

  .pf-cta {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12.5px;
    font-weight: 600;
    color: var(--brand);
    letter-spacing: 0.01em;
    transition: gap 0.2s;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .pf-card:hover .pf-cta { gap: 8px; }

  .pf-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(0,0,0,0.72);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 0;
  }

  @media (min-width: 640px) { .pf-backdrop { align-items: center; padding: 24px; } }

  .pf-modal {
    background: #14141c;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 22px 22px 0 0;
    width: 100%;
    max-width: 700px;
    max-height: 92vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 40px 100px rgba(0,0,0,0.6);
  }

  @media (min-width: 640px) { .pf-modal { border-radius: 22px; } }

  .pf-modal::-webkit-scrollbar { width: 4px; }
  .pf-modal::-webkit-scrollbar-track { background: transparent; }
  .pf-modal::-webkit-scrollbar-thumb { background: var(--surface-4); border-radius: 4px; }

  .pf-modal-hero {
    height: 220px;
    position: relative;
    overflow: hidden;
    border-radius: 22px 22px 0 0;
  }

  @media (min-width: 640px) { .pf-modal-hero { height: 260px; } }

  .pf-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 34px;
    height: 34px;
    background: rgba(0,0,0,0.32);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: rgba(255,255,255,0.85);
    transition: background 0.2s, color 0.2s;
    z-index: 2;
  }

  .pf-close:hover { background: rgba(0,0,0,0.55); color: #fff; }

  .pf-modal-content { padding: 28px 28px 44px; }

  @media (min-width: 640px) { .pf-modal-content { padding: 36px 40px 52px; } }

  .pf-modal-tagline {
    font-size: 17px;
    font-weight: 400;
    color: #e8e8f0;
    line-height: 1.6;
    margin: 0 0 6px;
  }

  .pf-modal-meta {
    font-size: 12.5px;
    color: rgba(255,255,255,0.35);
    margin: 0 0 30px;
    letter-spacing: 0.01em;
  }

  .pf-section-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.28);
    margin-bottom: 14px;
  }

  .pf-highlights {
    list-style: none;
    padding: 0;
    margin: 0 0 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .pf-highlight-item {
    display: flex;
    gap: 11px;
    align-items: flex-start;
    font-size: 13.5px;
    color: #c8c8dc;
    line-height: 1.6;
  }

  .pf-bullet {
    flex-shrink: 0;
    width: 19px;
    height: 19px;
    border-radius: 50%;
    background: var(--brand-dim);
    border: 1px solid var(--brand-border);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
  }

  .pf-modal-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin-bottom: 30px;
  }

  .pf-stack-chip {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 7px;
    padding: 5px 12px;
    font-size: 11.5px;
    font-weight: 500;
    color: #b0b0c8;
  }

  .pf-impact-box {
    background: linear-gradient(135deg, rgba(239,4,84,0.18) 0%, rgba(239,4,84,0.08) 100%);
    border: 1px solid rgba(239,4,84,0.45);
    border-radius: 14px;
    padding: 20px 22px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
    box-shadow: 0 0 28px rgba(239,4,84,0.1), inset 0 1px 0 rgba(255,255,255,0.06);
  }

  .pf-impact-icon {
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    background: rgba(239,4,84,0.25);
    border: 1px solid rgba(239,4,84,0.5);
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff4d8f;
    margin-top: 1px;
  }

  .pf-impact-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #ff6ba3;
    margin-bottom: 7px;
  }

  .pf-impact-text {
    font-size: 14px;
    font-weight: 500;
    color: #f5f5fa;
    line-height: 1.6;
    margin: 0;
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [active]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <style>{css}</style>

      <section className="pf-root" id="portfolio">
        <div className="pf-inner">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div className="pf-badge">
              <Sparkles size={11} />
              Selected Work
            </div>
            <h2 className="pf-title">
              Products I've shipped,{' '}
              <em>end to end.</em>
            </h2>
            <p className="pf-subtitle">
              AI platforms, SaaS products, and full-stack systems built from
              idea to production. Click any card to see the full story.
            </p>
          </motion.div>

          <div className="pf-grid">
            {projects.map((p, i) => (
              <motion.button
                key={p.id}
                className="pf-card"
                onClick={() => setActive(p)}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{
                  boxShadow: active?.id === p.id
                    ? `0 0 0 2px ${p.from}, 0 20px 50px ${p.glow}`
                    : 'none',
                }}
                aria-label={`View ${p.title} case study`}
              >
                <div
                  className="pf-card-header"
                  style={{ background: `linear-gradient(140deg, ${p.from} 0%, ${p.to} 100%)` }}
                >
                  <div className="pf-noise" />
                  <div className="pf-icon-wrap">
                    <p.Icon size={19} />
                  </div>
                  <div className="pf-year">{p.year}</div>
                  <div className="pf-card-header-text">
                    <p className="pf-cat">{p.category}</p>
                    <h3 className="pf-card-title">{p.title}</h3>
                  </div>
                </div>

                <div className="pf-card-body">
                  <p className="pf-tagline">{p.tagline}</p>
                  <div className="pf-tags">
                    {p.stack.slice(0, 4).map((s) => (
                      <span key={s} className="pf-tag">{s}</span>
                    ))}
                    {p.stack.length > 4 && (
                      <span className="pf-tag" style={{ color: 'var(--text-3)' }}>
                        +{p.stack.length - 4}
                      </span>
                    )}
                  </div>
                  <div className="pf-divider" />
                  <span className="pf-cta">
                    View case study <ArrowUpRight size={13} />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            className="pf-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="pf-modal"
              initial={{ y: 50, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="pf-modal-hero"
                style={{ background: `linear-gradient(140deg, ${active.from} 0%, ${active.to} 100%)` }}
              >
                <div className="pf-noise" />
                <button className="pf-close" onClick={() => setActive(null)} aria-label="Close">
                  <X size={15} />
                </button>
                <div className="pf-icon-wrap" style={{ top: 24, left: 24, width: 50, height: 50, borderRadius: 13 }}>
                  <active.Icon size={22} />
                </div>
                <div style={{ position: 'absolute', bottom: 24, left: 24, right: 60 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', margin: '0 0 5px' }}>
                    {active.category} · {active.year}
                  </p>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.1 }}>
                    {active.title}
                  </h3>
                </div>
              </div>

              <div className="pf-modal-content">
                <p className="pf-modal-tagline">{active.tagline}</p>
                <p className="pf-modal-meta">{active.role} · {active.company}</p>

                <p className="pf-section-label">What I Built</p>
                <ul className="pf-highlights">
                  {active.highlights.map((h, i) => (
                    <li key={i} className="pf-highlight-item">
                      <span className="pf-bullet">
                        <Check size={10} color="var(--brand)" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>

                <p className="pf-section-label">Tech Stack</p>
                <div className="pf-modal-stack">
                  {active.stack.map((s) => (
                    <span key={s} className="pf-stack-chip">{s}</span>
                  ))}
                </div>

                <div className="pf-impact-box">
                  <div className="pf-impact-icon">
                    <Zap size={16} />
                  </div>
                  <div>
                    <p className="pf-impact-label">Impact</p>
                    <p className="pf-impact-text">{active.impact}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}