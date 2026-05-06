'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ─── Icons (inline SVGs — no react-icons dependency needed) ──────────────────
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const ArrowUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const navLinks = [
  { label: 'Services',     href: '#services' },
  { label: 'Portfolio',    href: '#portfolio' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact',      href: '#contact' },
];

const socials = [
  { Icon: GithubIcon,    href: 'https://github.com/sufyanamin85',                                                    label: 'GitHub' },
  { Icon: LinkedInIcon,  href: 'https://www.linkedin.com/in/sufyan-amin-73a14834a/',                                 label: 'LinkedIn' },
  { Icon: InstagramIcon, href: 'https://www.instagram.com/sufyanamin77/profilecard/?igsh=MThsandqbzloeG52bA==',     label: 'Instagram' },
  { Icon: FacebookIcon,  href: 'https://www.facebook.com/share/thZsBC3DKGtMPbjX/?mibextid=qi2Omg',                  label: 'Facebook' },
];

// ─── Token constants ───────────────────────────────────────────────────────────
const C = {
  surface:     '#0f0f11',
  surface2:    '#17171b',
  surface3:    '#1e1e24',
  border:      'rgba(255,255,255,0.07)',
  borderH:     'rgba(255,255,255,0.13)',
  brand:       '#ef0454',
  brandDim:    'rgba(239,4,84,0.1)',
  brandBorder: 'rgba(239,4,84,0.28)',
  t1:          '#f5f5f7',
  t2:          '#a0a0b0',
  t3:          '#6b6b7e',
};

// ─── Hover-aware social button ────────────────────────────────────────────────
const SocialBtn = ({ Icon, href, label }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 42,
        height: 42,
        borderRadius: '50%',
        border: `1px solid ${hovered ? C.brandBorder : C.border}`,
        background: hovered ? C.brandDim : C.surface2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: hovered ? C.brand : C.t3,
        transition: 'all 0.22s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        textDecoration: 'none',
        flexShrink: 0,
      }}
    >
      <Icon />
    </Link>
  );
};

// ─── Hover-aware nav link ─────────────────────────────────────────────────────
const NavLink = ({ href, label }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 13,
        fontWeight: 500,
        color: hovered ? C.t1 : C.t3,
        textDecoration: 'none',
        transition: 'color 0.2s',
        letterSpacing: '0.02em',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {label}
    </Link>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Footer() {
  const [backHovered, setBackHovered] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>

      <footer style={{
        background: C.surface,
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* ── Top separator line with glow ── */}
        <div style={{
          height: 1,
          background: `linear-gradient(90deg, transparent 0%, ${C.brand}55 40%, ${C.brand}55 60%, transparent 100%)`,
        }} />

        {/* ── Ambient glow ── */}
        <div style={{
          position: 'absolute',
          bottom: -80,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 300,
          borderRadius: '50%',
          background: `${C.brand}0a`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '60px 24px 36px',
          position: 'relative',
          zIndex: 1,
        }}>

          {/* ── Top section ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 40,
            }}
          >
            {/* ── Brand + CTA row ── */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 32,
            }}>

              {/* Brand block */}
              <div style={{ maxWidth: 380 }}>
                {/* Logo wordmark */}
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 28,
                  fontWeight: 700,
                  color: C.t1,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  marginBottom: 14,
                }}>
                  Sufyan <span style={{
                    background: `linear-gradient(90deg, ${C.brand} 0%, #ff6b9d 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontStyle: 'italic',
                  }}>Amin</span>
                </div>

                <p style={{
                  fontSize: 14,
                  color: C.t2,
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  Full-Stack & AI Engineer building scalable SaaS platforms, intelligent automation systems, and production-grade AI products.
                </p>

                {/* Availability badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  marginTop: 18,
                  padding: '6px 14px',
                  borderRadius: 999,
                  border: `1px solid rgba(16,185,129,0.3)`,
                  background: 'rgba(16,185,129,0.08)',
                }}>
                  <span style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#10b981',
                    boxShadow: '0 0 8px rgba(16,185,129,0.7)',
                    animation: 'pulse 2s infinite',
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#10b981', letterSpacing: '0.05em' }}>
                    Available for new projects
                  </span>
                </div>
              </div>

              {/* Right: nav + socials */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 24,
              }}>

                {/* Nav links */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 28px' }}>
                  {navLinks.map((l) => (
                    <NavLink key={l.href} href={l.href} label={l.label} />
                  ))}
                </div>

                {/* Socials */}
                <div style={{ display: 'flex', gap: 10 }}>
                  {socials.map((s) => (
                    <SocialBtn key={s.label} {...s} />
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <Link
                  href="https://wa.me/923002672786"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: '#25d366',
                    color: '#fff',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    padding: '10px 20px',
                    borderRadius: 999,
                    textDecoration: 'none',
                    transition: 'opacity 0.2s, transform 0.2s',
                    letterSpacing: '0.02em',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.836L.057 23.213a.75.75 0 0 0 .92.92l5.377-1.466A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.92 0-3.72-.515-5.264-1.412l-.376-.22-3.896 1.062 1.062-3.896-.22-.376A9.943 9.943 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Let's Talk
                </Link>
              </div>
            </div>

            {/* ── Divider ── */}
            <div style={{
              height: 1,
              background: C.border,
            }} />

            {/* ── Bottom bar ── */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
            }}>
              <p style={{
                fontSize: 12,
                color: C.t3,
                margin: 0,
                lineHeight: 1.5,
                letterSpacing: '0.02em',
              }}>
                © {new Date().getFullYear()} All rights reserved — Designed & developed by{' '}
                <span style={{ color: C.t2, fontWeight: 600 }}>Sufyan Amin</span>
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <span style={{ fontSize: 12, color: C.t3 }}>
                  sufyanamin85@gmail.com
                </span>

                {/* Back to top */}
                <button
                  onClick={scrollToTop}
                  onMouseEnter={() => setBackHovered(true)}
                  onMouseLeave={() => setBackHovered(false)}
                  aria-label="Back to top"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: `1px solid ${backHovered ? C.brandBorder : C.border}`,
                    background: backHovered ? C.brandDim : C.surface2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: backHovered ? C.brand : C.t3,
                    cursor: 'pointer',
                    transition: 'all 0.22s ease',
                    transform: backHovered ? 'translateY(-3px)' : 'translateY(0)',
                  }}
                >
                  <ArrowUpIcon />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pulse animation for availability dot */}
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(0.82); }
          }
        `}</style>
      </footer>
    </>
  );
}