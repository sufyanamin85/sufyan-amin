'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

// ─── Skill Data ───────────────────────────────────────────────────────────────
const skillData = [
  {
    category: 'Frontend',
    accent: '#ef0454',
    accentDim: 'rgba(239,4,84,0.1)',
    accentBorder: 'rgba(239,4,84,0.25)',
    icon: '🖥',
    skills: [
      { name: 'Next.js', level: 'Expert', pct: 95 },
      { name: 'React.js', level: 'Expert', pct: 93 },
      { name: 'JavaScript (ES6+)', level: 'Expert', pct: 92 },
      { name: 'Tailwind CSS', level: 'Expert', pct: 91 },
      { name: 'Framer Motion', level: 'Advanced', pct: 85 },
      { name: 'Redux Toolkit', level: 'Advanced', pct: 84 },
      { name: 'React Native (Expo)', level: 'Advanced', pct: 82 },
    ],
  },
  {
    category: 'Backend',
    accent: '#7c3aed',
    accentDim: 'rgba(124,58,237,0.1)',
    accentBorder: 'rgba(124,58,237,0.25)',
    icon: '⚙️',
    skills: [
      { name: 'Node.js & Express', level: 'Expert', pct: 93 },
      { name: 'Python & Flask', level: 'Expert', pct: 90 },
      { name: 'REST APIs', level: 'Expert', pct: 94 },
      { name: 'JWT Auth & OAuth 2.0', level: 'Expert', pct: 90 },
      { name: 'Socket.io', level: 'Advanced', pct: 82 },
      { name: 'GraphQL', level: 'Advanced', pct: 78 },
      { name: 'CRON Jobs', level: 'Expert', pct: 88 },
    ],
  },
  {
    category: 'Database & Cloud',
    accent: '#0ea5e9',
    accentDim: 'rgba(14,165,233,0.1)',
    accentBorder: 'rgba(14,165,233,0.25)',
    icon: '🗄',
    skills: [
      { name: 'MongoDB & Atlas', level: 'Expert', pct: 92 },
      { name: 'MongoDB Aggregation', level: 'Expert', pct: 88 },
      { name: 'AWS EC2 & S3', level: 'Advanced', pct: 82 },
      { name: 'Firebase', level: 'Advanced', pct: 84 },
      { name: 'Docker', level: 'Advanced', pct: 80 },
      { name: 'PM2 & Vercel', level: 'Expert', pct: 90 },
    ],
  },
  {
    category: 'AI & LLMs',
    accent: '#f59e0b',
    accentDim: 'rgba(245,158,11,0.1)',
    accentBorder: 'rgba(245,158,11,0.25)',
    icon: '🤖',
    skills: [
      { name: 'OpenRouter & LLM APIs', level: 'Expert', pct: 92 },
      { name: 'RAG Pipelines', level: 'Expert', pct: 90 },
      { name: 'Vector Search & Embeddings', level: 'Expert', pct: 88 },
      { name: 'Langchain', level: 'Advanced', pct: 85 },
      { name: 'Ollama / Gemma 2', level: 'Advanced', pct: 83 },
      { name: 'Whisper + FFmpeg', level: 'Advanced', pct: 82 },
      { name: 'AI Report Generation', level: 'Expert', pct: 91 },
    ],
  },
  {
    category: 'Automation & Integrations',
    accent: '#10b981',
    accentDim: 'rgba(16,185,129,0.1)',
    accentBorder: 'rgba(16,185,129,0.25)',
    icon: '⚡',
    skills: [
      { name: 'WHAPI (WhatsApp API)', level: 'Expert', pct: 93 },
      { name: 'Puppeteer', level: 'Expert', pct: 90 },
      { name: 'Google Sheets & Drive API', level: 'Expert', pct: 91 },
      { name: 'Programmable Search Engine', level: 'Expert', pct: 88 },
      { name: 'Google OAuth 2.0', level: 'Expert', pct: 87 },
      { name: 'Web Scraping Pipelines', level: 'Advanced', pct: 85 },
    ],
  },
];

// ─── Level Badge Styles ───────────────────────────────────────────────────────
const levelStyle = {
  Expert:   { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', color: '#10b981' },
  Advanced: { bg: 'rgba(14,165,233,0.12)', border: 'rgba(14,165,233,0.3)', color: '#38bdf8' },
};

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  .sk-root {
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

  .sk-inner { max-width: 1200px; margin: 0 auto; }

  /* ── Header ── */
  .sk-badge {
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

  .sk-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(34px, 5vw, 54px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0 0 14px;
    color: var(--t1);
  }

  .sk-title em {
    font-style: italic;
    background: linear-gradient(90deg, var(--brand) 0%, #ff6b9d 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .sk-subtitle {
    font-size: 15px;
    color: var(--t2);
    max-width: 500px;
    line-height: 1.65;
    margin: 0;
  }

  /* ── Grid ── */
  .sk-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 60px;
  }

  @media (max-width: 1024px) { .sk-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 580px)  { .sk-grid { grid-template-columns: 1fr; } }

  /* ── Category Card ── */
  .sk-card {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 26px 24px 28px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
  }

  .sk-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: var(--card-accent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .sk-card:hover {
    border-color: var(--border-h);
    transform: translateY(-5px);
    box-shadow: 0 24px 60px rgba(0,0,0,0.45);
  }

  .sk-card:hover::before { opacity: 1; }

  .sk-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 22px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--border);
  }

  .sk-card-icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }

  .sk-card-cat {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--t1);
    margin: 0;
    line-height: 1.2;
  }

  /* ── Skill Rows ── */
  .sk-rows { display: flex; flex-direction: column; gap: 12px; }

  .sk-row { display: flex; flex-direction: column; gap: 6px; }

  .sk-row-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .sk-row-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--t1);
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .sk-level {
    flex-shrink: 0;
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid;
  }

  .sk-track {
    height: 4px;
    background: var(--surface-4);
    border-radius: 999px;
    overflow: hidden;
  }

  .sk-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 0.9s cubic-bezier(0.4, 0, 0.2, 1);
    width: 0%;
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function Skills() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{css}</style>
      <section className="sk-root">
        <div className="sk-inner">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="sk-badge">
              <Sparkles size={11} />
              Technical Stack
            </div>
            <h2 className="sk-title">
              The stack behind <em>every product.</em>
            </h2>
            <p className="sk-subtitle">
              Production-tested skills across the full spectrum — frontend, backend,
              cloud infrastructure, AI systems, and intelligent automation.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="sk-grid">
            {skillData.map((cat, ci) => (
              <motion.div
                key={cat.category}
                className="sk-card"
                style={{ '--card-accent': cat.accent }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: ci * 0.08 }}
              >
                {/* Header */}
                <div className="sk-card-header">
                  <div
                    className="sk-card-icon-wrap"
                    style={{ background: cat.accentDim, border: `1px solid ${cat.accentBorder}` }}
                  >
                    {cat.icon}
                  </div>
                  <p className="sk-card-cat">{cat.category}</p>
                </div>

                {/* Skill Rows */}
                <div className="sk-rows">
                  {cat.skills.map((skill, si) => {
                    const ls = levelStyle[skill.level];
                    return (
                      <div key={skill.name} className="sk-row">
                        <div className="sk-row-top">
                          <span className="sk-row-name">{skill.name}</span>
                          <span
                            className="sk-level"
                            style={{
                              background: ls.bg,
                              borderColor: ls.border,
                              color: ls.color,
                            }}
                          >
                            {skill.level}
                          </span>
                        </div>
                        <div className="sk-track">
                          <div
                            className="sk-fill"
                            style={{
                              width: animated ? `${skill.pct}%` : '0%',
                              background: `linear-gradient(90deg, ${cat.accent}, ${cat.accent}99)`,
                              transitionDelay: `${ci * 60 + si * 55}ms`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}