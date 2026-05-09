'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X, Sun, Moon, ChevronDown, Zap } from 'lucide-react';
import { useLang } from '../lib/lang';
import { useTheme } from '../lib/theme';
import HelpModal from './HelpModal';

const LANGS = [
  { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

const FEATURES = [
  { href: '/scamshield', icon: '🛡️', key: 'scamshield' },
  { href: '/wifisecure', icon: '📶', key: 'wifisecure' },
  { href: '/imagetruth', icon: '🖼️', key: 'imagetruth' },
  { href: '/reviewguard', icon: '⭐', key: 'reviewguard' },
  { href: '/callalert', icon: '📞', key: 'callalert' },
  { href: '/hoaxlens', icon: '🔍', key: 'hoaxlens' },
  { href: '/pinjolcheck', icon: '💰', key: 'pinjolcheck' },
  { href: '/lowonganaman', icon: '💼', key: 'lowonganaman' },
];

export default function Navbar() {
  const { t, lang, changeLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featureOpen, setFeatureOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const currentLang = LANGS.find(l => l.code === lang) || LANGS[0];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'var(--surface-glass)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, var(--primary), #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px var(--primary-glow)',
            }}>
              <Shield size={20} color="white" />
            </div>
            <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              Trust<span style={{ color: 'var(--primary)' }}>ify</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
            <Link href="/dashboard" style={navLinkStyle(pathname === '/dashboard')}>
              <Zap size={14} /> {t('nav.dashboard')}
            </Link>

            {/* Features dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => { setFeatureOpen(!featureOpen); setLangOpen(false); }}
                style={{ ...navLinkStyle(false), cursor: 'pointer', border: 'none', background: 'transparent' }}
              >
                {t('nav.features')} <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: featureOpen ? 'rotate(180deg)' : 'none' }} />
              </button>
              <AnimatePresence>
                {featureOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    style={{
                      position: 'absolute', top: '100%', left: 0, marginTop: 8,
                      background: 'var(--surface)', border: '1px solid var(--border)',
                      borderRadius: 16, padding: 8, boxShadow: 'var(--shadow-md)',
                      minWidth: 200, zIndex: 100,
                    }}
                  >
                    {FEATURES.map(f => (
                      <Link key={f.href} href={f.href} onClick={() => setFeatureOpen(false)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
                          borderRadius: 10, textDecoration: 'none', color: 'var(--text-primary)',
                          fontSize: 14, transition: 'all 0.2s',
                          background: pathname === f.href ? 'var(--primary-glow)' : 'transparent',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-glow)'}
                        onMouseLeave={e => e.currentTarget.style.background = pathname === f.href ? 'var(--primary-glow)' : 'transparent'}
                      >
                        <span>{f.icon}</span> {t(`nav.${f.key}`)}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/hotnews" style={navLinkStyle(pathname === '/hotnews')}>
              🔥 {t('nav.hotnews')}
            </Link>
            <Link href="/trustscore" style={navLinkStyle(pathname === '/trustscore')}>
              {t('nav.trustscore')}
            </Link>
          </div>

          {/* Right side controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Language switcher */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => { setLangOpen(!langOpen); setFeatureOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 10, cursor: 'pointer', color: 'var(--text-primary)',
                  fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
                }}
              >
                <span>{currentLang.flag}</span>
                <span>{currentLang.code.toUpperCase()}</span>
                <ChevronDown size={12} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    style={{
                      position: 'absolute', top: '100%', right: 0, marginTop: 8,
                      background: 'var(--surface)', border: '1px solid var(--border)',
                      borderRadius: 12, padding: 6, boxShadow: 'var(--shadow-md)',
                      minWidth: 140, zIndex: 100,
                    }}
                  >
                    {LANGS.map(l => (
                      <button key={l.code}
                        onClick={() => { changeLang(l.code); setLangOpen(false); }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                          padding: '8px 12px', borderRadius: 8, border: 'none',
                          background: lang === l.code ? 'var(--primary-glow)' : 'transparent',
                          color: lang === l.code ? 'var(--primary)' : 'var(--text-primary)',
                          cursor: 'pointer', fontSize: 13, fontWeight: lang === l.code ? 600 : 400,
                          fontFamily: 'inherit', textAlign: 'left',
                        }}
                      >
                        <span>{l.flag}</span> {l.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <HelpModal />

            {/* Theme toggle */}
            <button onClick={toggleTheme}
              style={{
                width: 36, height: 36, borderRadius: 10, border: '1px solid var(--border)',
                background: 'var(--surface)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-secondary)', transition: 'all 0.2s',
              }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* CTA */}
            <Link href="/dashboard" style={{ textDecoration: 'none' }} className="desktop-cta">
              <button className="btn-primary" style={{ padding: '8px 18px', fontSize: 14 }}>
                {t('hero.cta_start')}
              </button>
            </Link>

            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                width: 36, height: 36, borderRadius: 10, border: '1px solid var(--border)',
                background: 'var(--surface)', cursor: 'pointer',
                display: 'none', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-secondary)',
              }}
              className="mobile-menu-btn"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'var(--surface-glass)', backdropFilter: 'blur(16px)',
              borderTop: '1px solid var(--border)', padding: '16px 24px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { href: '/dashboard', label: t('nav.dashboard'), icon: '⚡' },
                { href: '/scamshield', label: t('nav.scamshield'), icon: '🛡️' },
                { href: '/hoaxlens', label: t('nav.hoaxlens'), icon: '🔍' },
                { href: '/pinjolcheck', label: t('nav.pinjolcheck'), icon: '💰' },
                { href: '/lowonganaman', label: t('nav.lowonganaman'), icon: '💼' },
                { href: '/hotnews', label: t('nav.hotnews'), icon: '🔥' },
                { href: '/trustscore', label: t('nav.trustscore'), icon: '📊' },
              ].map(item => (
                <Link key={item.href} href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 14px', borderRadius: 12, textDecoration: 'none',
                    color: pathname === item.href ? 'var(--primary)' : 'var(--text-primary)',
                    background: pathname === item.href ? 'var(--primary-glow)' : 'transparent',
                    fontWeight: 500,
                  }}
                >
                  <span>{item.icon}</span> {item.label}
                </Link>
              ))}
              <div style={{ paddingTop: 8, borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
                {LANGS.map(l => (
                  <button key={l.code}
                    onClick={() => { changeLang(l.code); setMobileOpen(false); }}
                    style={{
                      flex: 1, padding: '8px', borderRadius: 10, border: '1px solid var(--border)',
                      background: lang === l.code ? 'var(--primary)' : 'var(--surface)',
                      color: lang === l.code ? 'white' : 'var(--text-primary)',
                      cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', fontWeight: 500,
                    }}
                  >
                    {l.flag} {l.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

function navLinkStyle(active) {
  return {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '6px 12px', borderRadius: 10, textDecoration: 'none',
    color: active ? 'var(--primary)' : 'var(--text-secondary)',
    fontWeight: active ? 600 : 500, fontSize: 14,
    background: active ? 'var(--primary-glow)' : 'transparent',
    transition: 'all 0.2s',
  };
}
