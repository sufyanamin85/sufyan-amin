'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Mail, Phone, Globe, Code2, Cpu, Layers } from 'lucide-react';

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '10+', label: 'Products Shipped' },
  { value: '5+', label: 'Happy Clients' },
  { value: '3', label: 'Countries Served' },
];

// ─── Details ──────────────────────────────────────────────────────────────────
const details = [
  { icon: <Globe size={13} />,   label: 'Location',    value: 'Islamabad, Pakistan' },
  { icon: <Mail size={13} />,    label: 'Email',       value: 'sufyanamin85@gmail.com' },
  { icon: <Phone size={13} />,   label: 'Phone',       value: '+92 300-2672786' },
  { icon: <Code2 size={13} />,   label: 'Experience',  value: '3+ Years' },
  { icon: <Layers size={13} />,  label: 'Freelance',   value: 'Available' },
  { icon: <Cpu size={13} />,     label: 'Speciality',  value: 'AI Systems & Full-Stack' },
];

// ─── Floating badges on image ─────────────────────────────────────────────────
const floatingBadges = [
  {
    id: 'exp',
    top: '12%', left: '-8%',
    accent: '#ef0454',
    accentDim: 'rgba(239,4,84,0.15)',
    accentBorder: 'rgba(239,4,84,0.35)',
    value: '3+',
    label: 'Yrs Exp.',
    delay: 0,
  },
  {
    id: 'ai',
    bottom: '18%', right: '-6%',
    accent: '#7c3aed',
    accentDim: 'rgba(124,58,237,0.15)',
    accentBorder: 'rgba(124,58,237,0.35)',
    value: 'AI',
    label: 'Systems',
    delay: 0.3,
  },
  {
    id: 'open',
    bottom: '4%', left: '10%',
    accent: '#10b981',
    accentDim: 'rgba(16,185,129,0.15)',
    accentBorder: 'rgba(16,185,129,0.35)',
    value: '✦',
    label: 'Open to Work',
    delay: 0.6,
  },
];

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  .ab-root {
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

  .ab-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  @media (max-width: 900px) {
    .ab-inner {
      grid-template-columns: 1fr;
      gap: 56px;
    }
  }

  /* ── Left — Image Column ── */
  .ab-img-col {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .ab-img-frame {
    position: relative;
    width: 100%;
    max-width: 420px;
  }

  /* Dark ellipse glow behind image */
  .ab-img-glow {
    position: absolute;
    inset: -20px;
    border-radius: 50%;
    background: radial-gradient(ellipse at center, rgba(239,4,84,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  /* Subtle grid overlay */
  .ab-img-grid {
    position: absolute;
    inset: 0;
    border-radius: 40% 60% 60% 40% / 50% 50% 50% 50%;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
  }

  /* The image itself — contained in a shaped container */
  .ab-img-wrap {
    position: relative;
    width: 100%;
    padding-bottom: 108%;
    border-radius: 38% 62% 58% 42% / 48% 52% 48% 52%;
    overflow: hidden;
    /* match the blush pink circle from the photo so it blends seamlessly */
    background: #f0d8d8;
    border: 1px solid var(--border);
    z-index: 1;
  }

  .ab-img-wrap img {
    position: absolute !important;
    inset: 0;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
    object-position: center top;
    transition: transform 0.6s ease;
  }

  .ab-img-wrap:hover img { transform: scale(1.04); }

  /* Dark vignette overlay so edges melt into the dark page */
  .ab-img-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
      ellipse at center,
      transparent 55%,
      rgba(15,15,17,0.55) 100%
    );
    pointer-events: none;
    z-index: 1;
  }

  /* Floating badge */
  .ab-badge-float {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 76px;
    height: 76px;
    border-radius: 50%;
    border: 1px solid;
    backdrop-filter: blur(10px);
    z-index: 2;
    text-align: center;
    cursor: default;
    animation: ab-float 3s ease-in-out infinite;
  }

  .ab-badge-float:nth-child(2) { animation-delay: -1s; }
  .ab-badge-float:nth-child(3) { animation-delay: -2s; }

  @keyframes ab-float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }

  .ab-badge-val {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    line-height: 1;
  }

  .ab-badge-lbl {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.04em;
    line-height: 1.3;
    margin-top: 2px;
    opacity: 0.85;
  }

  /* Decorative corner rings */
  .ab-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid var(--brand-border);
    pointer-events: none;
    opacity: 0.35;
    z-index: 0;
  }

  /* ── Right — Text Column ── */
  .ab-badge-pill {
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

  .ab-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 4vw, 50px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--t1);
    margin: 0 0 18px;
  }

  .ab-title em {
    font-style: italic;
    background: linear-gradient(90deg, var(--brand) 0%, #ff6b9d 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .ab-desc {
    font-size: 15px;
    color: var(--t2);
    line-height: 1.75;
    margin: 0 0 32px;
    max-width: 520px;
  }

  /* Details grid */
  .ab-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 40px;
  }

  @media (max-width: 480px) { .ab-details { grid-template-columns: 1fr; } }

  .ab-detail {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 12px 14px;
    transition: border-color 0.2s;
  }

  .ab-detail:hover { border-color: var(--border-h); }

  .ab-detail-icon {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: var(--brand-dim);
    border: 1px solid var(--brand-border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--brand);
    flex-shrink: 0;
    margin-top: 1px;
  }

  .ab-detail-label {
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--t3);
    margin-bottom: 2px;
  }

  .ab-detail-value {
    font-size: 13px;
    font-weight: 500;
    color: var(--t1);
    line-height: 1.3;
  }

  /* Stats bar */
  .ab-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
  }

  @media (max-width: 640px) { .ab-stats { grid-template-columns: repeat(2, 1fr); } }

  .ab-stat {
    padding: 18px 14px;
    text-align: center;
    border-right: 1px solid var(--border);
    background: var(--surface-2);
    transition: background 0.2s;
  }

  .ab-stat:last-child { border-right: none; }
  .ab-stat:hover { background: var(--surface-3); }

  @media (max-width: 640px) {
    .ab-stat:nth-child(2) { border-right: none; }
    .ab-stat:nth-child(3) { border-top: 1px solid var(--border); }
    .ab-stat:nth-child(4) { border-top: 1px solid var(--border); border-right: none; }
  }

  .ab-stat-val {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--brand);
    display: block;
    line-height: 1;
    margin-bottom: 5px;
  }

  .ab-stat-lbl {
    font-size: 11px;
    color: var(--t3);
    font-weight: 500;
    letter-spacing: 0.02em;
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function AboutMe() {
  return (
    <>
      <style>{css}</style>
      <section className="ab-root" id="about">
        <div className="ab-inner">

          {/* ── Left: Image ── */}
          <motion.div
            className="ab-img-col"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="ab-img-frame">
              {/* Glow + grid decoration */}
              <div className="ab-img-glow" />
              <div className="ab-img-grid" />

              {/* Decorative rings */}
              <div className="ab-ring" style={{ width: 460, height: 460, top: -30, left: -30 }} />
              <div className="ab-ring" style={{ width: 360, height: 360, top: 20, left: 20, opacity: 0.18 }} />

              {/* Profile image */}
              <div className="ab-img-wrap">
                <Image
                  src="/aboutme.png"
                  alt="Sufyan Amin — Full-Stack & AI Engineer"
                  fill
                  priority
                  sizes="(max-width: 900px) 80vw, 420px"
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>

              {/* Floating badges */}
              {floatingBadges.map((b) => (
                <div
                  key={b.id}
                  className="ab-badge-float"
                  style={{
                    top: b.top,
                    bottom: b.bottom,
                    left: b.left,
                    right: b.right,
                    background: b.accentDim,
                    borderColor: b.accentBorder,
                    color: b.accent,
                    animationDelay: `${b.delay * -1}s`,
                  }}
                >
                  <span className="ab-badge-val">{b.value}</span>
                  <span className="ab-badge-lbl">{b.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Text ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="ab-badge-pill">
              <Sparkles size={11} />
              About Me
            </div>

            <h2 className="ab-title">
              Full-Stack Engineer &amp; <em>AI Systems Builder.</em>
            </h2>

            <p className="ab-desc">
              I'm Sufyan Amin — a Full-Stack & AI-Enabled Engineer with 3+ years of experience
              shipping scalable SaaS platforms, intelligent automation systems, and production-grade
              AI products. From WhatsApp AI assistants to RAG-powered search engines and audit
              intelligence platforms — I build end-to-end systems that solve real business problems
              and cut manual operations to near zero.
            </p>

            {/* Details */}
            <div className="ab-details">
              {details.map((d) => (
                <motion.div
                  key={d.label}
                  className="ab-detail"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                >
                  <div className="ab-detail-icon">{d.icon}</div>
                  <div>
                    <p className="ab-detail-label">{d.label}</p>
                    <p className="ab-detail-value">{d.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              className="ab-stats"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {stats.map((s) => (
                <div key={s.label} className="ab-stat">
                  <span className="ab-stat-val">{s.value}</span>
                  <span className="ab-stat-lbl">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </section>
    </>
  );
}