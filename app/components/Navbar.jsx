'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Token constants ───────────────────────────────────────────────────────────
const C = {
  surface:     '#0f0f11',
  surface2:    '#17171b',
  border:      'rgba(255,255,255,0.07)',
  borderH:     'rgba(255,255,255,0.13)',
  brand:       '#ef0454',
  brandDim:    'rgba(239,4,84,0.1)',
  brandBorder: 'rgba(239,4,84,0.28)',
  t1:          '#f5f5f7',
  t2:          '#a0a0b0',
  t3:          '#6b6b7e',
};

// ─── Nav links data ────────────────────────────────────────────────────────────
const navLinks = [
  { label: 'Home',         href: '/' },
  { label: 'About',        href: '#about' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Services',     href: '#services' },
  { label: 'Portfolio',    href: '#portfolio' },
  { label: 'Work Flow',    href: '#workflow' },
  { label: 'Testimonials', href: '#testimonials' },
];

// ─── WhatsApp icon ─────────────────────────────────────────────────────────────
const WhatsAppIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.836L.057 23.213a.75.75 0 0 0 .92.92l5.377-1.466A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.92 0-3.72-.515-5.264-1.412l-.376-.22-3.896 1.062 1.062-3.896-.22-.376A9.943 9.943 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

// ─── Hamburger icon ────────────────────────────────────────────────────────────
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6"  x2="21" y2="6"  />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6"  x2="6"  y2="18" />
    <line x1="6"  y1="6"  x2="18" y2="18" />
  </svg>
);

// ─── Desktop NavLink with hover ────────────────────────────────────────────────
const DesktopNavLink = ({ href, label, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 13.5,
        fontWeight: 500,
        color: hovered ? C.t1 : C.t2,
        textDecoration: 'none',
        letterSpacing: '0.02em',
        fontFamily: "'DM Sans', sans-serif",
        transition: 'color 0.2s',
        position: 'relative',
        paddingBottom: 2,
      }}
    >
      {label}
      <span style={{
        position: 'absolute',
        bottom: -2,
        left: 0,
        width: hovered ? '100%' : '0%',
        height: 1.5,
        background: C.brand,
        borderRadius: 999,
        transition: 'width 0.25s ease',
        display: 'block',
      }} />
    </Link>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isOpen,    setIsOpen]    = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [btnHover,  setBtnHover]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes wapulse {
          0%,100% { transform: scale(1);   opacity: 1;   }
          50%      { transform: scale(1.3); opacity: 0.8; }
        }
      `}</style>

      {/* ── Navbar ──────────────────────────────────────────────────────────── */}
      <nav style={{
        position:        'fixed',
        top:             0,
        left:            0,
        right:           0,
        height:          84,
        zIndex:          999,
        background:      scrolled
          ? 'rgba(15,15,17,0.92)'
          : 'rgba(15,15,17,0.75)',
        backdropFilter:  'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom:    `1px solid ${scrolled ? C.borderH : C.border}`,
        transition:      'background 0.3s, border-color 0.3s',
        fontFamily:      "'DM Sans', sans-serif",
      }}>

        <div style={{
          maxWidth:      1200,
          margin:        '0 auto',
          height:        '100%',
          padding:       '0 24px',
          display:       'flex',
          alignItems:    'center',
          justifyContent:'space-between',
          gap:           24,
        }}>

          {/* ── Logo ── */}
          <Link href="/" style={{ flexShrink: 0, lineHeight: 0, textDecoration: 'none' }}>
           <Image
  src="/sufyan-amin.png"
  alt="Sufyan Amin"
  width={170}
  height={90}
  style={{ objectFit: 'contain', maxHeight: 80 }}
  priority
/>
          </Link>

          {/* ── Desktop Links ── */}
          <div
            style={{
              display:        'flex',
              alignItems:     'center',
              gap:            28,
              flex:           1,
              justifyContent: 'center',
            }}
            className="navbar-desktop-links"
          >
            {navLinks.map((l) => (
              <DesktopNavLink key={l.href} href={l.href} label={l.label} />
            ))}
          </div>

          {/* ── CTA + Hamburger ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>

            <Link
              href="https://wa.me/923002672786"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            8,
                background:     btnHover ? '#d10348' : C.brand,
                color:          '#fff',
                fontSize:       13,
                fontWeight:     600,
                padding:        '9px 18px',
                borderRadius:   999,
                textDecoration: 'none',
                transition:     'background 0.2s, transform 0.2s',
                transform:      btnHover ? 'translateY(-1px)' : 'translateY(0)',
                letterSpacing:  '0.02em',
                whiteSpace:     'nowrap',
              }}
            >
              Say Hello
              <span style={{ animation: 'wapulse 1.6s infinite ease-in-out', display: 'flex' }}>
                <WhatsAppIcon />
              </span>
            </Link>

            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-label="Toggle menu"
              style={{
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                width:           40,
                height:          40,
                borderRadius:    10,
                border:          `1px solid ${C.borderH}`,
                background:      C.surface2,
                color:           C.brand,
                cursor:          'pointer',
                flexShrink:      0,
              }}
              className="navbar-hamburger"
            >
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Spacer ── */}
      <div style={{ height: 84 }} />

      {/* ── Mobile Menu Overlay ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMenu}
              style={{
                position:   'fixed',
                inset:      0,
                zIndex:     998,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(4px)',
              }}
            />

            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              style={{
                position:        'fixed',
                top:             0,
                right:           0,
                bottom:          0,
                width:           '80%',
                maxWidth:        340,
                zIndex:          1000,
                background:      '#13131a',
                borderLeft:      `1px solid ${C.borderH}`,
                display:         'flex',
                flexDirection:   'column',
                padding:         '28px 28px 40px',
                boxSizing:       'border-box',
                overflowY:       'auto',
              }}
            >
              <div style={{
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'space-between',
                marginBottom:   40,
              }}>
                <span style={{
                  fontFamily:    "'Playfair Display', serif",
                  fontSize:      20,
                  fontWeight:    700,
                  color:         C.t1,
                  letterSpacing: '-0.01em',
                }}>
                  Menu
                </span>
                <button
                  onClick={closeMenu}
                  style={{
                    width:      36,
                    height:     36,
                    borderRadius: '50%',
                    border:     `1px solid ${C.borderH}`,
                    background: C.surface2,
                    color:      C.brand,
                    display:    'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor:     'pointer',
                  }}
                  aria-label="Close menu"
                >
                  <CloseIcon />
                </button>
              </div>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                {navLinks.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <MobileNavLink href={l.href} label={l.label} onClick={closeMenu} />
                  </motion.div>
                ))}
              </nav>

              <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
                <Link
                  href="https://wa.me/923002672786"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  style={{
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    gap:            8,
                    background:     C.brand,
                    color:          '#fff',
                    fontSize:       14,
                    fontWeight:     600,
                    padding:        '13px 20px',
                    borderRadius:   999,
                    textDecoration: 'none',
                    letterSpacing:  '0.02em',
                  }}
                >
                  Say Hello
                  <WhatsAppIcon />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Responsive ── */}
      <style>{`
        @media (min-width: 900px) {
          .navbar-hamburger { display: none !important; }
        }
        @media (max-width: 899px) {
          .navbar-desktop-links { display: none !important; }
        }
      `}</style>
    </>
  );
}

// ─── Mobile drawer link ────────────────────────────────────────────────────────
function MobileNavLink({ href, label, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'space-between',
        padding:         '13px 16px',
        borderRadius:    12,
        background:      hovered ? C.surface2 : 'transparent',
        border:          `1px solid ${hovered ? C.borderH : 'transparent'}`,
        color:           hovered ? C.t1 : C.t2,
        textDecoration:  'none',
        fontSize:        15,
        fontWeight:      500,
        fontFamily:      "'DM Sans', sans-serif",
        transition:      'all 0.2s',
        letterSpacing:   '0.02em',
      }}
    >
      {label}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.2s', color: C.brand }}>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </Link>
  );
}