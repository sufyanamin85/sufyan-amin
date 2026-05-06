'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Bot,
  Layers,
  Smartphone,
  Workflow,
  BarChart3,
  ArrowUpRight,
  Sparkles,
  X,
  MessageCircle,
  Check,
} from 'lucide-react';

// ─── Service Data ─────────────────────────────────────────────────────────────
const services = [
  {
    id: '1',
    title: 'Full-Stack Web Development',
    shortDesc:
      'End-to-end web applications built with Next.js, Node.js, Express, MongoDB, and Python Flask. Scalable, fast, and production-ready.',
    description:
      'I build complete web products from scratch — frontend, backend, database, and deployment. Whether it\'s a marketing site, a dashboard, or a complex multi-role platform, I handle every layer with clean architecture and maintainable code.',
    icon: Globe,
    accent: '#ef0454',
    accentDim: 'rgba(239,4,84,0.1)',
    accentBorder: 'rgba(239,4,84,0.25)',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'AWS'],
    highlights: [
      'Server-side rendering & static generation with Next.js',
      'RESTful APIs with Node.js + Express, deployed on AWS EC2',
      'MongoDB schema design, indexing, and Atlas cloud setup',
      'JWT authentication, role-based access, and secure session handling',
      'Vercel & Docker deployments with CI/CD-ready structure',
    ],
    deliverable: 'A fully deployed, production-grade web application.',
  },
  {
    id: '2',
    title: 'AI Systems & Automation',
    shortDesc:
      'Custom AI platforms integrating LLMs, RAG pipelines, embeddings, and vector search. I turn AI ideas into real production systems.',
    description:
      'I design and build practical AI systems that solve actual business problems — not demos. From WhatsApp-based AI assistants to audit engines and intelligent search platforms, I handle the full stack including AI integration, backend logic, and deployment.',
    icon: Bot,
    accent: '#7c3aed',
    accentDim: 'rgba(124,58,237,0.1)',
    accentBorder: 'rgba(124,58,237,0.25)',
    tags: ['LLMs', 'RAG', 'Whisper', 'OpenRouter'],
    highlights: [
      'RAG pipelines with embeddings, vector search, and relevance scoring',
      'WhatsApp AI assistants via WHAPI with quick-reply buttons',
      'Voice-to-text processing using Whisper + FFmpeg',
      'LLM integration via OpenRouter, Ollama, Gemma 2, and Langchain',
      'AI-generated reports, PDFs, slides, and ROI models',
    ],
    deliverable: 'An end-to-end AI system integrated into your existing workflows.',
  },
  {
    id: '3',
    title: 'SaaS Product Development',
    shortDesc:
      'Multi-tenant SaaS platforms with role-based auth, REST APIs, subscription flows, and cloud infrastructure built for scale.',
    description:
      'I build SaaS products that are architected to scale from day one. Multi-tenancy, subscription management, onboarding flows, admin dashboards — I\'ve shipped these end to end using the MERN stack with Python Flask microservices where needed.',
    icon: Layers,
    accent: '#0ea5e9',
    accentDim: 'rgba(14,165,233,0.1)',
    accentBorder: 'rgba(14,165,233,0.25)',
    tags: ['Multi-tenant', 'JWT Auth', 'REST APIs', 'Docker'],
    highlights: [
      'Multi-tenant architecture with isolated data per client',
      'Role-based access control (User, Admin, Super Admin)',
      'Subscription and billing flow integration',
      'Dockerized microservices for modular deployment',
      'Analytics dashboards and usage tracking per tenant',
    ],
    deliverable: 'A fully functional, scalable SaaS platform ready for real users.',
  },
  {
    id: '4',
    title: 'Mobile App Development',
    shortDesc:
      'Cross-platform mobile apps using React Native (Expo) with full API integration, native performance, and elegant UIs.',
    description:
      'I develop mobile apps that feel native on both iOS and Android. Using React Native with Expo, I build everything from authentication flows to complex data-heavy screens — all integrated with REST APIs and real-time features.',
    icon: Smartphone,
    accent: '#10b981',
    accentDim: 'rgba(16,185,129,0.1)',
    accentBorder: 'rgba(16,185,129,0.25)',
    tags: ['React Native', 'Expo', 'REST APIs', 'iOS & Android'],
    highlights: [
      'Cross-platform iOS & Android apps from a single codebase',
      'Full REST API integration with authentication and state management',
      'Push notifications, deep linking, and offline support',
      'Redux Toolkit for global state with clean component architecture',
      'App Store & Play Store deployment-ready builds',
    ],
    deliverable: 'A polished, deployable mobile app for iOS and Android.',
  },
  {
    id: '5',
    title: 'Business Process Automation',
    shortDesc:
      'Workflow automation using Puppeteer, CRON jobs, Google APIs, and WhatsApp integrations — replacing manual ops with intelligent pipelines.',
    description:
      'I automate the repetitive parts of your business — data syncing, report generation, content posting, reminders, document workflows. Using Puppeteer, CRON jobs, Google APIs, and WhatsApp API, I build pipelines that run reliably without human intervention.',
    icon: Workflow,
    accent: '#f59e0b',
    accentDim: 'rgba(245,158,11,0.1)',
    accentBorder: 'rgba(245,158,11,0.25)',
    tags: ['Puppeteer', 'WHAPI', 'Google APIs', 'CRON'],
    highlights: [
      'Google Sheets & Drive sync with real-time data pipelines',
      'Automated WhatsApp messaging, reminders, and escalation flows',
      'Puppeteer-based web scraping and content automation',
      'Scheduled CRON jobs for reports, invoices, and data processing',
      'OAuth 2.0 integrations with Google Workspace APIs',
    ],
    deliverable: 'A fully automated workflow that eliminates your manual operations.',
  },
  {
    id: '6',
    title: 'AI Analytics & Intelligence Platforms',
    shortDesc:
      'Real-time trend analysis, AI-generated reports, ROI modeling, and decision dashboards for businesses that run on insight.',
    description:
      'I build intelligence platforms that turn raw data into actionable insight. From real-time trend dashboards to automated consulting-grade audit reports — I combine AI processing with well-designed frontends so decision-makers always have what they need.',
    icon: BarChart3,
    accent: '#ef4444',
    accentDim: 'rgba(239,68,68,0.1)',
    accentBorder: 'rgba(239,68,68,0.25)',
    tags: ['AI Reports', 'Vector Search', 'Firebase', 'PSE'],
    highlights: [
      'AI-generated audit reports, PDF exports, and slide decks',
      'Real-time KPI dashboards with trend analysis and predictions',
      'ROI modeling with time savings, cost recovery, and payback periods',
      'Programmable Search Engine integration for live data sourcing',
      'Auditability layer with execution logs and traceable AI outputs',
    ],
    deliverable: 'An intelligence platform that gives your team data-driven clarity.',
  },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  .sv-root {
    --brand: #ef0454;
    --brand-dim: rgba(239,4,84,0.1);
    --brand-border: rgba(239,4,84,0.28);
    --surface: #0f0f11;
    --surface-2: #17171b;
    --surface-3: #1e1e24;
    --surface-4: #26262e;
    --border: rgba(255,255,255,0.07);
    --border-h: rgba(255,255,255,0.13);
    --t1: #f5f5f7;
    --t2: #a0a0b0;
    --t3: #6b6b7e;
    font-family: 'DM Sans', sans-serif;
    background: var(--surface);
    color: var(--t1);
    padding: 80px 24px 100px;
    box-sizing: border-box;
  }

  .sv-inner { max-width: 1200px; margin: 0 auto; }

  /* ── Header ── */
  .sv-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 64px;
  }
  @media (min-width: 768px) {
    .sv-header { flex-direction: row; align-items: flex-end; justify-content: space-between; }
  }

  .sv-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--brand-border);
    background: var(--brand-dim);
    padding: 5px 14px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--brand);
    margin-bottom: 18px;
  }

  .sv-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(34px, 5vw, 54px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--t1);
    margin: 0 0 14px;
  }
  .sv-title em {
    font-style: italic;
    background: linear-gradient(90deg, var(--brand) 0%, #ff6b9d 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .sv-subtitle {
    font-size: 15px;
    color: var(--t2);
    max-width: 440px;
    line-height: 1.65;
    margin: 0;
  }

  .sv-count {
    flex-shrink: 0;
    font-family: 'Playfair Display', serif;
    font-size: 72px;
    font-weight: 700;
    color: var(--surface-3);
    line-height: 1;
    letter-spacing: -0.04em;
    margin-top: 20px;
  }
  @media (min-width: 768px) { .sv-count { margin-top: 0; } }

  /* ── Grid ── */
  .sv-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  @media (max-width: 1024px) { .sv-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px)  { .sv-grid { grid-template-columns: 1fr; } }

  /* ── Card ── */
  .sv-card {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 28px;
    display: flex;
    flex-direction: column;
    transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    text-align: left;
    width: 100%;
  }
  .sv-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: var(--card-accent, var(--brand));
    opacity: 0;
    transition: opacity 0.3s;
  }
  .sv-card:hover { border-color: var(--border-h); transform: translateY(-5px); box-shadow: 0 24px 60px rgba(0,0,0,0.45); }
  .sv-card:hover::before { opacity: 1; }

  .sv-num {
    position: absolute;
    top: 22px; right: 24px;
    font-family: 'Playfair Display', serif;
    font-size: 13px; font-weight: 600;
    color: var(--t3);
    letter-spacing: 0.05em;
  }

  .sv-icon-wrap {
    width: 52px; height: 52px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 22px;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }
  .sv-card:hover .sv-icon-wrap { transform: scale(1.08) rotate(-4deg); }

  .sv-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 19px; font-weight: 700;
    color: var(--t1);
    margin: 0 0 10px;
    line-height: 1.25;
    padding-right: 32px;
  }

  .sv-card-desc {
    font-size: 13.5px;
    color: var(--t2);
    line-height: 1.65;
    margin: 0 0 20px;
    flex: 1;
  }

  .sv-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
  .sv-tag {
    border-radius: 6px;
    padding: 3px 9px;
    font-size: 10.5px; font-weight: 600;
    letter-spacing: 0.03em;
  }

  .sv-card-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 16px;
    border-top: 1px solid var(--border);
    margin-top: auto;
  }

  .sv-avail {
    display: flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 600;
    color: #10b981; letter-spacing: 0.03em;
  }
  .sv-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 6px rgba(16,185,129,0.6);
    animation: sv-pulse 2s infinite;
  }
  @keyframes sv-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.85); }
  }

  .sv-arrow {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: var(--surface-4);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s, border-color 0.2s, transform 0.2s;
    flex-shrink: 0;
  }
  .sv-card:hover .sv-arrow {
    border-color: var(--card-accent, var(--brand));
    transform: rotate(45deg);
  }

  /* ── Modal ── */
  .sv-backdrop {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(10px);
    display: flex; align-items: flex-end; justify-content: center;
    padding: 0;
  }
  @media (min-width: 640px) {
    .sv-backdrop { align-items: center; padding: 24px; }
  }

  .sv-modal {
    background: #1a1a20;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 24px 24px 0 0;
    width: 100%;
    max-width: 680px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }
  @media (min-width: 640px) { .sv-modal { border-radius: 24px; } }
  .sv-modal::-webkit-scrollbar { width: 3px; }
  .sv-modal::-webkit-scrollbar-thumb { background: var(--surface-4); border-radius: 3px; }

  .sv-modal-hero {
    height: 160px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    padding: 24px;
    box-sizing: border-box;
  }
  @media (min-width: 640px) { .sv-modal-hero { height: 180px; } }

  .sv-modal-hero-icon {
    width: 52px; height: 52px;
    border-radius: 14px;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.25);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 14px;
    position: absolute;
    top: 20px; left: 24px;
  }

  .sv-modal-close {
    position: absolute; top: 14px; right: 14px;
    width: 36px; height: 36px;
    background: rgba(0,0,0,0.35);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #fff;
    transition: background 0.2s;
  }
  .sv-modal-close:hover { background: rgba(0,0,0,0.55); }

  .sv-modal-hero-text { position: absolute; bottom: 20px; left: 24px; right: 24px; }
  .sv-modal-cat {
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(255,255,255,0.65);
    margin-bottom: 4px;
  }
  .sv-modal-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px, 3.5vw, 32px);
    font-weight: 700; color: #fff;
    line-height: 1.1; margin: 0;
  }

  .sv-modal-body { padding: 24px 28px 36px; }
  @media (min-width: 640px) { .sv-modal-body { padding: 28px 36px 44px; } }

  .sv-modal-desc {
    font-size: 15px; color: #d8d8e8;
    line-height: 1.65; margin: 0 0 28px;
  }

  .sv-modal-sec {
    font-size: 9px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 14px;
  }

  .sv-modal-highlights {
    list-style: none; padding: 0; margin: 0 0 28px;
    display: flex; flex-direction: column; gap: 10px;
  }
  .sv-modal-hi {
    display: flex; gap: 10px; align-items: flex-start;
    font-size: 13.5px; color: #d8d8e8; line-height: 1.55;
  }
  .sv-modal-bullet {
    flex-shrink: 0;
    width: 18px; height: 18px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin-top: 2px;
  }

  .sv-modal-stack { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 28px; }
  .sv-modal-chip {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 7px; padding: 5px 12px;
    font-size: 12px; font-weight: 500; color: #c8c8d8;
  }

  .sv-modal-deliverable {
    border-radius: 14px; padding: 18px 22px;
  }
  .sv-modal-del-label {
    font-size: 9px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    margin-bottom: 7px;
  }
  .sv-modal-del-text {
    font-size: 14.5px; font-weight: 500;
    color: #f0f0f5; line-height: 1.55; margin: 0;
  }

  .sv-modal-footer {
    display: flex; gap: 10px; margin-top: 24px; flex-wrap: wrap;
  }

  .sv-wa-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: #25d366; color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 600;
    padding: 11px 20px; border-radius: 999px;
    border: none; cursor: pointer;
    text-decoration: none;
    transition: opacity 0.2s, transform 0.2s;
    white-space: nowrap;
  }
  .sv-wa-btn:hover { opacity: 0.88; transform: translateY(-1px); }

  /* ── CTA Strip ── */
  .sv-strip {
    margin-top: 60px; padding: 28px 36px;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 20px;
    display: flex; flex-direction: column; gap: 16px; align-items: flex-start;
  }
  @media (min-width: 768px) {
    .sv-strip { flex-direction: row; align-items: center; justify-content: space-between; }
  }
  .sv-strip-text {
    font-family: 'Playfair Display', serif;
    font-size: 22px; font-weight: 700;
    color: var(--t1); margin: 0 0 4px;
  }
  .sv-strip-sub { font-size: 13px; color: var(--t2); margin: 0; }

  .sv-strip-btn {
    flex-shrink: 0;
    display: inline-flex; align-items: center; gap: 8px;
    background: #25d366; color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 600;
    padding: 12px 22px; border-radius: 999px;
    border: none; cursor: pointer;
    text-decoration: none;
    transition: opacity 0.2s, transform 0.2s;
    white-space: nowrap;
  }
  .sv-strip-btn:hover { opacity: 0.88; transform: translateY(-1px); }
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function Services() {
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

  const WA_LINK = 'https://wa.me/923002672786';

  return (
    <>
      <style>{css}</style>
      <section className="sv-root">
        <div className="sv-inner">

          {/* ── Header ── */}
          <motion.div
            className="sv-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="sv-badge">
                <Sparkles size={11} />
                What I Do
              </div>
              <h2 className="sv-title">
                Services built for <em>real impact.</em>
              </h2>
              <p className="sv-subtitle">
                From full-stack products to AI-powered automation — I build
                systems that solve real business problems and scale.
              </p>
            </div>
            <div className="sv-count" aria-hidden="true">0{services.length}</div>
          </motion.div>

          {/* ── Grid ── */}
          <div className="sv-grid">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.button
                  key={svc.id}
                  className="sv-card"
                  style={{ '--card-accent': svc.accent }}
                  onClick={() => setActive(svc)}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  aria-label={`Learn more about ${svc.title}`}
                >
                  <span className="sv-num">0{i + 1}</span>

                  <div
                    className="sv-icon-wrap"
                    style={{ background: svc.accentDim, border: `1px solid ${svc.accentBorder}` }}
                  >
                    <Icon size={22} color={svc.accent} strokeWidth={1.8} />
                  </div>

                  <h3 className="sv-card-title">{svc.title}</h3>
                  <p className="sv-card-desc">{svc.shortDesc}</p>

                  <div className="sv-tags">
                    {svc.tags.map((t) => (
                      <span
                        key={t}
                        className="sv-tag"
                        style={{ background: svc.accentDim, border: `1px solid ${svc.accentBorder}`, color: svc.accent }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="sv-card-footer">
                    <span className="sv-avail">
                      <span className="sv-dot" />
                      Available
                    </span>
                    <span className="sv-arrow">
                      <ArrowUpRight size={14} color="var(--t2)" strokeWidth={2} />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* ── CTA Strip ── */}
          <motion.div
            className="sv-strip"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <p className="sv-strip-text">Have a project in mind?</p>
              <p className="sv-strip-sub">
                Let's talk about how I can help build your next AI product or platform.
              </p>
            </div>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="sv-strip-btn">
              <MessageCircle size={15} strokeWidth={2.2} />
              Chat on WhatsApp
            </a>
          </motion.div>

        </div>
      </section>

      {/* ── Modal ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="sv-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="sv-modal"
              initial={{ y: 60, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Hero */}
              <div
                className="sv-modal-hero"
                style={{
                  background: `linear-gradient(140deg, ${active.accent}cc, ${active.accent}55)`,
                }}
              >
                <div className="sv-modal-hero-icon">
                  <active.icon size={24} color="#fff" strokeWidth={1.8} />
                </div>

                <button
                  className="sv-modal-close"
                  onClick={() => setActive(null)}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>

                <div className="sv-modal-hero-text">
                  <p className="sv-modal-cat">Service</p>
                  <h3 className="sv-modal-title">{active.title}</h3>
                </div>
              </div>

              {/* Body */}
              <div className="sv-modal-body">
                <p className="sv-modal-desc">{active.description}</p>

                <p className="sv-modal-sec">What's included</p>
                <ul className="sv-modal-highlights">
                  {active.highlights.map((h, i) => (
                    <li key={i} className="sv-modal-hi">
                      <span
                        className="sv-modal-bullet"
                        style={{ background: active.accentDim, border: `1px solid ${active.accentBorder}` }}
                      >
                        <Check size={10} color={active.accent} strokeWidth={2.5} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>

                <p className="sv-modal-sec">Tech stack</p>
                <div className="sv-modal-stack">
                  {active.tags.map((t) => (
                    <span
                      key={t}
                      className="sv-modal-chip"
                      style={{ borderColor: active.accentBorder, color: active.accent, background: active.accentDim }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div
                  className="sv-modal-deliverable"
                  style={{ background: active.accentDim, border: `1px solid ${active.accentBorder}` }}
                >
                  <p className="sv-modal-del-label" style={{ color: active.accent }}>
                    What you get
                  </p>
                  <p className="sv-modal-del-text">{active.deliverable}</p>
                </div>

                <div className="sv-modal-footer">
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sv-wa-btn"
                  >
                    <MessageCircle size={15} strokeWidth={2.2} />
                    Discuss on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}