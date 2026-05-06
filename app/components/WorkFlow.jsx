'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Discovery & Planning',
    desc: 'Deep-dive into your vision, define goals, map the tech stack, and architect a production-ready roadmap.',
    accent: '#ef0454',
    accentDim: 'rgba(239,4,84,0.1)',
    accentBorder: 'rgba(239,4,84,0.25)',
  },
  {
    num: '02',
    title: 'UI/UX Design',
    desc: 'Craft clean, user-centered interfaces with intuitive flows — built for both aesthetics and conversion.',
    accent: '#7c3aed',
    accentDim: 'rgba(124,58,237,0.1)',
    accentBorder: 'rgba(124,58,237,0.25)',
  },
  {
    num: '03',
    title: 'Development',
    desc: 'Build scalable full-stack products — Next.js, Node.js, Python Flask, MongoDB, AI integrations — clean architecture throughout.',
    accent: '#0ea5e9',
    accentDim: 'rgba(14,165,233,0.1)',
    accentBorder: 'rgba(14,165,233,0.25)',
  },
  {
    num: '04',
    title: 'Testing & QA',
    desc: 'Rigorous end-to-end testing across all layers — API, UI, auth flows, edge cases — zero bugs before launch.',
    accent: '#f59e0b',
    accentDim: 'rgba(245,158,11,0.1)',
    accentBorder: 'rgba(245,158,11,0.25)',
  },
  {
    num: '05',
    title: 'Launch & Growth',
    desc: 'Deploy to production on AWS/Vercel, monitor performance, and iterate with continuous improvements and support.',
    accent: '#10b981',
    accentDim: 'rgba(16,185,129,0.1)',
    accentBorder: 'rgba(16,185,129,0.25)',
  },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  .wf-root {
    --brand: #ef0454;
    --brand-dim: rgba(239,4,84,0.1);
    --brand-border: rgba(239,4,84,0.28);
    --surface: #0f0f11;
    --surface-2: #17171b;
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

  .wf-inner { max-width: 900px; margin: 0 auto; }

  .wf-badge {
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

  .wf-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(34px, 5vw, 54px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0 0 14px;
    color: var(--t1);
  }

  .wf-title em {
    font-style: italic;
    background: linear-gradient(90deg, var(--brand) 0%, #ff6b9d 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .wf-subtitle {
    font-size: 15px;
    color: var(--t2);
    line-height: 1.65;
    margin: 0 0 64px;
    max-width: 460px;
  }

  /* ── Timeline ── */
  .wf-timeline {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* Center vertical line */
  .wf-timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, transparent, var(--border) 8%, var(--border) 92%, transparent);
    transform: translateX(-50%);
    z-index: 0;
  }

  @media (max-width: 680px) {
    .wf-timeline::before { left: 20px; }
  }

  /* ── Each row ── */
  .wf-row {
    display: grid;
    grid-template-columns: 1fr 48px 1fr;
    align-items: center;
    gap: 0;
    position: relative;
    margin-bottom: 32px;
  }

  @media (max-width: 680px) {
    .wf-row {
      grid-template-columns: 40px 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }
  }

  /* Card on left side */
  .wf-card-left {
    grid-column: 1;
    padding-right: 32px;
  }

  /* Card on right side */
  .wf-card-right {
    grid-column: 3;
    padding-left: 32px;
  }

  /* Empty spacer for alternating layout */
  .wf-empty {
    grid-column: 1;
  }

  .wf-empty-right {
    grid-column: 3;
  }

  @media (max-width: 680px) {
    .wf-card-left,
    .wf-card-right {
      grid-column: 2;
      padding: 0;
    }
    .wf-empty,
    .wf-empty-right { display: none; }
  }

  /* ── Node (center dot) ── */
  .wf-node {
    grid-column: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    position: relative;
  }

  @media (max-width: 680px) {
    .wf-node {
      grid-column: 1;
      grid-row: 1;
    }
  }

  .wf-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid;
    background: var(--surface);
    flex-shrink: 0;
    position: relative;
    z-index: 2;
  }

  .wf-dot::after {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 1px solid;
    opacity: 0.25;
    border-color: inherit;
  }

  /* ── Card ── */
  .wf-card {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 22px 24px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
  }

  .wf-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: var(--step-accent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .wf-card:hover {
    border-color: var(--border-h);
    transform: translateY(-4px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.4);
  }

  .wf-card:hover::before { opacity: 1; }

  .wf-card-top {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .wf-step-num {
    font-family: 'Playfair Display', serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    padding: 2px 9px;
    border-radius: 999px;
    border: 1px solid;
  }

  .wf-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--t1);
    margin: 0 0 7px;
    line-height: 1.25;
  }

  .wf-card-desc {
    font-size: 13px;
    color: var(--t2);
    line-height: 1.65;
    margin: 0;
  }
`;

export default function WorkFlow() {
  return (
    <>
      <style>{css}</style>
      <section className="wf-root">
        <div className="wf-inner">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="wf-badge">
              <Sparkles size={11} />
              How I Work
            </div>
            <h2 className="wf-title">From idea to <em>production.</em></h2>
            <p className="wf-subtitle">
              A battle-tested process I follow on every project — from first conversation to live deployment.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="wf-timeline">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              const card = (
                <motion.div
                  className="wf-card"
                  style={{ '--step-accent': step.accent }}
                  initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className="wf-card-top">
                    <span
                      className="wf-step-num"
                      style={{
                        background: step.accentDim,
                        borderColor: step.accentBorder,
                        color: step.accent,
                      }}
                    >
                      {step.num}
                    </span>
                  </div>
                  <h3 className="wf-card-title">{step.title}</h3>
                  <p className="wf-card-desc">{step.desc}</p>
                </motion.div>
              );

              return (
                <div className="wf-row" key={step.num}>
                  {isLeft ? (
                    <>
                      <div className="wf-card-left">{card}</div>
                      <div className="wf-node">
                        <div className="wf-dot" style={{ borderColor: step.accent }} />
                      </div>
                      <div className="wf-empty-right" />
                    </>
                  ) : (
                    <>
                      <div className="wf-empty" />
                      <div className="wf-node">
                        <div className="wf-dot" style={{ borderColor: step.accent }} />
                      </div>
                      <div className="wf-card-right">{card}</div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}