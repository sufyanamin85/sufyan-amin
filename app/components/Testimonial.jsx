'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// ─── Testimonial Data (aligned with Sufyan's actual resume) ──────────────────
const testimonials = [
  {
    id: 1,
    name: 'James Hartley',
    designation: 'Managing Director',
    company: 'Strevio.ai',
    location: 'Hong Kong',
    avatar: '/avatars/james.jpg',
    initials: 'JH',
    accentColor: '#ef0454',
    accentDim: 'rgba(239,4,84,0.12)',
    accentBorder: 'rgba(239,4,84,0.28)',
    project: 'Prisphere AI Platform',
    rating: 5,
    quote:
      "Sufyan didn't just build what we asked for — he understood the business problems we were trying to solve. The WhatsApp AI assistant he built replaced an entire operations team's manual work. Invoices, reminders, client data access — all automated. The ROI was visible within the first two weeks.",
  },
  {
    id: 2,
    name: 'Rebecca Lawson',
    designation: 'Head of Recruitment',
    company: 'Ashford Benjamin Legal',
    location: 'London, UK',
    avatar: '/avatars/rebecca.jpg',
    initials: 'RL',
    accentColor: '#7c3aed',
    accentDim: 'rgba(124,58,237,0.12)',
    accentBorder: 'rgba(124,58,237,0.28)',
    project: 'AI Recruitment Intelligence Platform',
    rating: 5,
    quote:
      'Our team used to spend days sourcing candidates manually across LinkedIn and internal databases. Sufyan built us a hybrid AI search system over 54,000 candidates that now finds the right matches in seconds. The RAG architecture he implemented is genuinely impressive — it understands context, not just keywords.',
  },
  {
    id: 3,
    name: 'Daniel Voss',
    designation: 'CEO & Co-Founder',
    company: 'Devenue',
    location: 'Lahore, Pakistan',
    avatar: '/avatars/daniel.jpg',
    initials: 'DV',
    accentColor: '#0ea5e9',
    accentDim: 'rgba(14,165,233,0.12)',
    accentBorder: 'rgba(14,165,233,0.28)',
    project: 'TripWaly Web & Mobile Platform',
    rating: 5,
    quote:
      'Sufyan delivered TripWaly end-to-end — web dashboard, backend APIs, and a React Native mobile app — all in one project. His code is clean, well-structured, and actually maintainable. He handled every technical decision confidently and brought real product thinking to the table, not just implementation.',
  },
  {
    id: 4,
    name: 'Amara Chen',
    designation: 'Operations Lead',
    company: 'Strevio.ai',
    location: 'Singapore',
    avatar: '/avatars/amara.jpg',
    initials: 'AC',
    accentColor: '#10b981',
    accentDim: 'rgba(16,185,129,0.12)',
    accentBorder: 'rgba(16,185,129,0.28)',
    project: 'Strevio AI Audit Platform',
    rating: 5,
    quote:
      "What used to take our consulting team three days now takes under ten minutes. Sufyan built the entire audit platform — from the diagnostic framework to AI-generated PDF reports and slide decks. He understood what we needed before we even fully articulated it, and the result is a product we're proud to put in front of clients.",
  },
];

// ─── Star Rating ──────────────────────────────────────────────────────────────
const StarRating = ({ count, color }) => (
  <div style={{ display: 'flex', gap: 3 }}>
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

// ─── Styles ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  .tm-root {
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
    overflow: hidden;
  }

  .tm-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ── Header ── */
  .tm-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 60px;
    gap: 0;
  }

  @media (min-width: 768px) {
    .tm-header {
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
    }
  }

  .tm-badge {
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

  .tm-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(34px, 5vw, 54px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--t1);
    margin: 0 0 14px;
  }

  .tm-title em {
    font-style: italic;
    background: linear-gradient(90deg, var(--brand) 0%, #ff6b9d 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .tm-subtitle {
    font-size: 15px;
    color: var(--t2);
    max-width: 420px;
    line-height: 1.65;
    margin: 0;
  }

  /* ── Controls (right side of header) ── */
  .tm-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 24px;
    flex-shrink: 0;
  }

  @media (min-width: 768px) {
    .tm-controls { margin-top: 0; }
  }

  .tm-nav-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid var(--border-h);
    background: var(--surface-2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--t2);
    transition: border-color 0.2s, background 0.2s, color 0.2s, transform 0.2s;
  }

  .tm-nav-btn:hover {
    border-color: var(--brand-border);
    background: var(--brand-dim);
    color: var(--brand);
    transform: scale(1.05);
  }

  .tm-counter {
    font-family: 'Playfair Display', serif;
    font-size: 13px;
    font-weight: 600;
    color: var(--t3);
    min-width: 48px;
    text-align: center;
    letter-spacing: 0.05em;
  }

  /* ── Main Layout ── */
  .tm-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    align-items: start;
  }

  @media (min-width: 900px) {
    .tm-layout {
      grid-template-columns: 340px 1fr;
    }
  }

  /* ── Sidebar thumbnails ── */
  .tm-sidebar {
    display: none;
    flex-direction: column;
    gap: 10px;
  }

  @media (min-width: 900px) {
    .tm-sidebar { display: flex; }
  }

  .tm-thumb {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: border-color 0.25s, background 0.25s, transform 0.2s;
    position: relative;
    overflow: hidden;
  }

  .tm-thumb::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: var(--thumb-accent, var(--brand));
    opacity: 0;
    transition: opacity 0.25s;
  }

  .tm-thumb.active {
    border-color: var(--thumb-accent-border, var(--brand-border));
    background: var(--thumb-accent-dim, var(--brand-dim));
  }

  .tm-thumb.active::before { opacity: 1; }

  .tm-thumb:not(.active):hover {
    border-color: var(--border-h);
    transform: translateX(4px);
  }

  .tm-thumb-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
    font-family: 'Playfair Display', serif;
  }

  .tm-thumb-info { flex: 1; min-width: 0; }

  .tm-thumb-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--t1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.3;
  }

  .tm-thumb-role {
    font-size: 11px;
    color: var(--t3);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 2px;
  }

  /* ── Main card ── */
  .tm-card {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 24px;
    overflow: hidden;
    position: relative;
    min-height: 420px;
  }

  /* Gradient top accent bar */
  .tm-card-accent {
    height: 3px;
    width: 100%;
    transition: background 0.4s ease;
  }

  .tm-card-body {
    padding: 36px 36px 32px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  @media (max-width: 600px) {
    .tm-card-body { padding: 24px 22px 22px; }
  }

  /* ── Quote icon ── */
  .tm-quote-icon {
    margin-bottom: 22px;
    opacity: 0.9;
  }

  /* ── Quote text ── */
  .tm-quote {
    font-family: 'Playfair Display', serif;
    font-size: clamp(17px, 2.5vw, 22px);
    font-weight: 600;
    line-height: 1.6;
    color: #eeeef5;
    margin: 0 0 32px;
    font-style: italic;
    letter-spacing: -0.01em;
  }

  /* ── Project tag ── */
  .tm-project-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.05em;
    margin-bottom: 24px;
    width: fit-content;
  }

  .tm-project-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }

  /* ── Author row ── */
  .tm-author {
    display: flex;
    align-items: center;
    gap: 14px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
    margin-top: auto;
  }

  .tm-author-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
    font-family: 'Playfair Display', serif;
    border: 2px solid rgba(255,255,255,0.1);
  }

  .tm-author-info { flex: 1; }

  .tm-author-name {
    font-size: 15px;
    font-weight: 600;
    color: var(--t1);
    line-height: 1.3;
    margin-bottom: 2px;
  }

  .tm-author-role {
    font-size: 12px;
    color: var(--t3);
    line-height: 1.4;
  }

  .tm-author-company {
    font-size: 12px;
    font-weight: 600;
    margin-top: 2px;
  }

  .tm-author-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 5px;
  }

  /* ── Progress dots ── */
  .tm-dots {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 28px;
  }

  @media (min-width: 900px) {
    .tm-dots { display: none; }
  }

  .tm-dot {
    height: 3px;
    border-radius: 999px;
    background: var(--border-h);
    transition: width 0.3s, background 0.3s;
    cursor: pointer;
  }

  .tm-dot.active {
    background: var(--brand);
  }

  /* ── Stats strip ── */
  .tm-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 24px;
  }

  @media (max-width: 500px) {
    .tm-stats { grid-template-columns: 1fr 1fr; }
  }

  .tm-stat {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 18px 20px;
    text-align: center;
  }

  .tm-stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--t1);
    line-height: 1;
    margin-bottom: 5px;
  }

  .tm-stat-label {
    font-size: 12px;
    color: var(--t3);
    line-height: 1.4;
  }

  /* ── Decorative bg element ── */
  .tm-bg-glow {
    position: absolute;
    top: -100px;
    right: -150px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    filter: blur(120px);
    pointer-events: none;
    z-index: 0;
    transition: background 0.5s;
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function Testimonial() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const autoRef = useRef(null);

  const active = testimonials[current];

  const go = (idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
    resetAuto();
  };

  const next = () => go((current + 1) % testimonials.length);
  const prev = () => go((current - 1 + testimonials.length) % testimonials.length);

  const resetAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 6000);
  };

  useEffect(() => {
    resetAuto();
    return () => clearInterval(autoRef.current);
  }, []);

  const variants = {
    enter: (d) => ({ x: d * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d * -40, opacity: 0 }),
  };

  return (
    <>
      <style>{css}</style>
      <section className="tm-root">
        <div className="tm-inner" style={{ position: 'relative' }}>

          {/* Decorative glow */}
          <div
            className="tm-bg-glow"
            style={{ background: `${active.accentColor}18` }}
          />

          {/* ── Header ── */}
          <motion.div
            className="tm-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="tm-badge">
                <Sparkles size={11} />
                Client Feedback
              </div>
              <h2 className="tm-title">
                Words from those <em>I've built for.</em>
              </h2>
              <p className="tm-subtitle">
                Real feedback from founders, recruiters, and operators I've worked with on production AI systems and SaaS platforms.
              </p>
            </div>

            {/* Nav controls */}
            <div className="tm-controls">
              <button className="tm-nav-btn" onClick={prev} aria-label="Previous">
                <ChevronLeft size={18} strokeWidth={2} />
              </button>
              <span className="tm-counter">
                {String(current + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
              </span>
              <button className="tm-nav-btn" onClick={next} aria-label="Next">
                <ChevronRight size={18} strokeWidth={2} />
              </button>
            </div>
          </motion.div>

          {/* ── Main Layout ── */}
          <div className="tm-layout">

            {/* Sidebar — desktop only */}
            <div className="tm-sidebar">
              {testimonials.map((t, i) => (
                <motion.button
                  key={t.id}
                  className={`tm-thumb ${i === current ? 'active' : ''}`}
                  style={{
                    '--thumb-accent': t.accentColor,
                    '--thumb-accent-border': t.accentBorder,
                    '--thumb-accent-dim': t.accentDim,
                  }}
                  onClick={() => go(i)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div
                    className="tm-thumb-avatar"
                    style={{ background: `linear-gradient(135deg, ${t.accentColor}cc, ${t.accentColor}66)` }}
                  >
                    {t.initials}
                  </div>
                  <div className="tm-thumb-info">
                    <div className="tm-thumb-name">{t.name}</div>
                    <div className="tm-thumb-role">{t.company} · {t.location}</div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Main card */}
            <div style={{ position: 'relative' }}>
              <div className="tm-card">
                {/* Accent bar */}
                <div
                  className="tm-card-accent"
                  style={{ background: `linear-gradient(90deg, ${active.accentColor}, ${active.accentColor}44)` }}
                />

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current}
                    className="tm-card-body"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    {/* Quote icon */}
                    <div className="tm-quote-icon">
                      <Quote size={28} color={active.accentColor} strokeWidth={1.5} />
                    </div>

                    {/* Project tag */}
                    <div
                      className="tm-project-tag"
                      style={{
                        background: active.accentDim,
                        border: `1px solid ${active.accentBorder}`,
                        color: active.accentColor,
                      }}
                    >
                      <div className="tm-project-dot" style={{ background: active.accentColor }} />
                      {active.project}
                    </div>

                    {/* Quote */}
                    <p className="tm-quote">"{active.quote}"</p>

                    {/* Author */}
                    <div className="tm-author">
                      <div
                        className="tm-author-avatar"
                        style={{
                          background: `linear-gradient(135deg, ${active.accentColor}cc, ${active.accentColor}55)`,
                          borderColor: active.accentBorder,
                        }}
                      >
                        {active.initials}
                      </div>
                      <div className="tm-author-info">
                        <div className="tm-author-name">{active.name}</div>
                        <div className="tm-author-role">{active.designation}</div>
                        <div className="tm-author-company" style={{ color: active.accentColor }}>
                          {active.company}
                        </div>
                      </div>
                      <div className="tm-author-right">
                        <StarRating count={active.rating} color={active.accentColor} />
                        <span style={{ fontSize: 11, color: 'var(--t3)' }}>{active.location}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Mobile dots */}
              <div className="tm-dots">
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    className={`tm-dot ${i === current ? 'active' : ''}`}
                    style={{ width: i === current ? 24 : 8 }}
                    onClick={() => go(i)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Stats strip ── */}
          <motion.div
            className="tm-stats"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[
              { num: '2.5+', label: 'Years of\nExperience' },
              { num: '10+', label: 'Production\nSystems Shipped' },
              { num: '100%', label: 'Client\nSatisfaction' },
            ].map((s, i) => (
              <div className="tm-stat" key={i}>
                <div className="tm-stat-num">{s.num}</div>
                <div className="tm-stat-label" style={{ whiteSpace: 'pre-line' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>
    </>
  );
}