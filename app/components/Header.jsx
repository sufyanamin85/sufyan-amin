'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaFacebookF, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { Sparkles } from 'lucide-react';

// ─── Typed roles ──────────────────────────────────────────────────────────────
const ROLES = [
  'Full-Stack Engineer',
  'AI Systems Builder',
  'SaaS Product Developer',
  'Automation Architect',
];

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  .hr-root {
    --brand: #ef0454;
    --brand-dim: rgba(239,4,84,0.12);
    --brand-border: rgba(239,4,84,0.3);
    --surface: #0f0f11;
    --surface-2: #17171b;
    --surface-4: #26262e;
    --border: rgba(255,255,255,0.07);
    --border-h: rgba(255,255,255,0.14);
    --t1: #f5f5f7;
    --t2: #a0a0b0;
    --t3: #6b6b7e;
    font-family: 'DM Sans', sans-serif;
    background: var(--surface);
    color: var(--t1);
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  /* ── Background image — right side, full color, fades left ── */
  .hr-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: url('/backgroundimage.png') no-repeat right center;
    background-size: 60% auto;
    -webkit-mask-image: linear-gradient(
      to left,
      rgba(0,0,0,1) 0%,
      rgba(0,0,0,0.9) 28%,
      rgba(0,0,0,0.15) 56%,
      transparent 70%
    );
    mask-image: linear-gradient(
      to left,
      rgba(0,0,0,1) 0%,
      rgba(0,0,0,0.9) 28%,
      rgba(0,0,0,0.15) 56%,
      transparent 70%
    );
    opacity: 0.88;
    pointer-events: none;
  }

  /* Soft left overlay so text stays readable */
  .hr-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
      100deg,
      #0f0f11 36%,
      rgba(15,15,17,0.7) 52%,
      transparent 72%
    );
    pointer-events: none;
  }

  /* Subtle noise grain */
  .hr-grain {
    position: absolute;
    inset: 0;
    z-index: 1;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    pointer-events: none;
  }

  /* ── Layout ── */
  .hr-inner {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 100px 24px 80px 90px;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    .hr-inner { padding: 100px 24px 80px 24px; }
    .hr-bg { display: none; }
  }

  /* ── Social sidebar ── */
  .hr-sidebar {
    position: absolute;
    left: 24px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  @media (max-width: 768px) { .hr-sidebar { display: none; } }

  .hr-sidebar-line {
    width: 1px;
    height: 44px;
    background: linear-gradient(to bottom, transparent, var(--brand));
  }

  .hr-sidebar-line.bottom {
    background: linear-gradient(to bottom, var(--brand), transparent);
  }

  .hr-follow {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--brand);
    writing-mode: vertical-rl;
  }

  .hr-social-icon {
    color: var(--t3);
    font-size: 16px;
    transition: color 0.2s, transform 0.2s;
    text-decoration: none;
    display: flex;
  }

  .hr-social-icon:hover { color: var(--brand); transform: scale(1.25); }

  /* ── Badge ── */
  .hr-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    border: 1px solid var(--brand-border);
    background: var(--brand-dim);
    padding: 6px 16px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--brand);
    margin-bottom: 24px;
    width: fit-content;
    animation: hr-bounce 2.5s ease-in-out infinite;
  }

  @keyframes hr-bounce {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-5px); }
  }

  /* ── Greeting ── */
  .hr-greeting {
    font-size: 18px;
    font-weight: 400;
    color: var(--t2);
    margin: 0 0 6px;
    letter-spacing: 0.02em;
  }

  /* ── Main heading ── */
  .hr-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(46px, 6vw, 76px);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.025em;
    color: var(--t1);
    margin: 0 0 4px;
  }

  /* ── Typed role ── */
  .hr-role-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 52px;
    margin-bottom: 24px;
  }

  .hr-role {
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px, 3.2vw, 38px);
    font-weight: 600;
    font-style: italic;
    background: linear-gradient(90deg, var(--brand) 0%, #ff6b9d 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hr-cursor {
    width: 3px;
    height: clamp(24px, 3vw, 38px);
    background: var(--brand);
    border-radius: 2px;
    animation: hr-blink 1s step-end infinite;
    flex-shrink: 0;
  }

  @keyframes hr-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  /* ── Description ── */
  .hr-desc {
    font-size: 16px;
    color: var(--t2);
    line-height: 1.75;
    max-width: 520px;
    margin: 0 0 36px;
  }

  /* ── Buttons ── */
  .hr-buttons {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
  }

  .hr-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    background: var(--brand);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 14px 26px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 24px rgba(239,4,84,0.3);
  }

  .hr-btn-primary:hover {
    background: #c7033e;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(239,4,84,0.45);
  }

  .hr-wa-pulse {
    animation: hr-pulse 1.8s ease-in-out infinite;
    font-size: 18px;
  }

  @keyframes hr-pulse {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.25); }
  }

  .hr-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: var(--surface-2);
    color: var(--t1);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 13px 22px;
    border-radius: 12px;
    border: 1px solid var(--border);
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
  }

  .hr-btn-ghost:hover {
    border-color: var(--brand-border);
    background: var(--surface-4);
    transform: translateY(-2px);
  }

  .hr-yt-icon { color: #ff0000; font-size: 26px; }

  .hr-btn-sub {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }

  .hr-btn-sub small {
    font-size: 11px;
    font-weight: 400;
    color: var(--t3);
  }

  /* ── Scroll indicator ── */
  .hr-scroll {
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  .hr-scroll-text {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--t3);
  }

  .hr-scroll-dot {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, var(--brand), transparent);
    animation: hr-scroll-anim 1.8s ease-in-out infinite;
  }

  @keyframes hr-scroll-anim {
    0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
    50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
    100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
  }

  /* ── Modal ── */
  .hr-modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .hr-modal {
    background: #ffffff;
    border-radius: 24px;
    padding: 48px 36px 40px;
    max-width: 440px;
    width: 100%;
    text-align: center;
    position: relative;
    box-shadow: 0 24px 80px rgba(0,0,0,0.5);
  }

  .hr-modal-close {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 34px;
    height: 34px;
    background: #f1f1f1;
    border: 1px solid #e0e0e0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #666;
    font-size: 18px;
    transition: background 0.2s;
  }

  .hr-modal-close:hover { background: #e5e5e5; color: var(--brand); }

  .hr-modal-emoji { font-size: 48px; margin-bottom: 16px; }

  .hr-modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: #111;
    margin: 0 0 10px;
  }

  .hr-modal-title em {
    font-style: italic;
    background: linear-gradient(90deg, var(--brand), #ff6b9d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hr-modal-desc {
    font-size: 14px;
    color: #555;
    line-height: 1.65;
    margin: 0;
  }
`;

// ─── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx((w) => (w + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const role = useTypewriter(ROLES);

  const WA_LINK = 'https://wa.me/923002672786';

  const socials = [
    { href: 'https://github.com/sufyanamin85',                                                         icon: <FaGithub /> },
    { href: 'https://www.linkedin.com/in/sufyan-amin-73a14834a/',                                      icon: <FaLinkedin /> },
    { href: 'https://www.facebook.com/share/thZsBC3DKGtMPbjX/',                                       icon: <FaFacebookF /> },
    { href: 'https://www.instagram.com/sufyanamin77/profilecard/?igsh=MThsandqbzloeG52bA==',           icon: <FaInstagram /> },
  ];

  return (
    <>
      <style>{css}</style>

      <section className="hr-root" id="home">
        {/* Background image — fades into dark */}
        <div className="hr-bg" />
        <div className="hr-overlay" />
        <div className="hr-grain" />

        {/* Social sidebar */}
        <div className="hr-sidebar">
          <div className="hr-sidebar-line" />
          <span className="hr-follow">Follow</span>
          <div className="hr-sidebar-line" />
          {socials.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="hr-social-icon">
              {s.icon}
            </a>
          ))}
          <div className="hr-sidebar-line bottom" />
        </div>

        {/* Main content */}
        <div className="hr-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Bouncing badge */}
            <div className="hr-badge">
              <Sparkles size={11} />
              Available for new projects
            </div>

            {/* Greeting + Name */}
            <p className="hr-greeting">Hello, I'm</p>
            <h1 className="hr-name">Sufyan Amin</h1>

            {/* Typewriter role */}
            <div className="hr-role-wrap">
              <span className="hr-role">{role}</span>
              <span className="hr-cursor" aria-hidden="true" />
            </div>

            {/* Description */}
            <p className="hr-desc">
              Full-Stack & AI-Enabled Engineer with 2.5+ years of experience shipping SaaS platforms,
              RAG-powered search engines, WhatsApp AI assistants, and intelligent automation systems
              that cut manual operations to near zero.
            </p>

            {/* Buttons */}
            <div className="hr-buttons">
              <Link href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hr-btn-primary">
                Say Hello
                <FaWhatsapp className="hr-wa-pulse" />
              </Link>

              <button className="hr-btn-ghost" onClick={() => setShowModal(true)}>
                <FaYoutube className="hr-yt-icon" />
                <span className="hr-btn-sub">
                  <small>Watch</small>
                  How I Work
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="hr-scroll" aria-hidden="true">
          <span className="hr-scroll-text">Scroll</span>
          <div className="hr-scroll-dot" />
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="hr-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="hr-modal"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="hr-modal-close" onClick={() => setShowModal(false)} aria-label="Close">
                <IoClose />
              </button>
              <div className="hr-modal-emoji">🎥✨</div>
              <h2 className="hr-modal-title">Coming <em>Soon!</em></h2>
              <p className="hr-modal-desc">
                A detailed video showcasing how I build AI systems and full-stack products
                will be available soon. Stay tuned!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}