'use client';

import Link from 'next/link';
import { Shield, Mail, Lock, FileText, Phone } from 'lucide-react';
import { useLang } from '../lib/lang';

const FEATURE_LINKS = [
  { href: '/scamshield', icon: '🛡️', key: 'scamshield' },
  { href: '/hoaxlens', icon: '🔍', key: 'hoaxlens' },
  { href: '/pinjolcheck', icon: '💰', key: 'pinjolcheck' },
  { href: '/lowonganaman', icon: '💼', key: 'lowonganaman' },
  { href: '/imagetruth', icon: '🖼️', key: 'imagetruth' },
  { href: '/reviewguard', icon: '⭐', key: 'reviewguard' },
];

export default function Footer() {
  const { t } = useLang();

  return (
    <footer style={{
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      padding: '60px 24px 32px',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 48, marginBottom: 48,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, var(--primary), #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Shield size={20} color="white" />
              </div>
              <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>
                Trust<span style={{ color: 'var(--primary)' }}>ify</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, maxWidth: 220 }}>
              {t('footer.tagline')}
            </p>
            <p style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 600, marginTop: 12, fontStyle: 'italic' }}>
              "Cek dulu sebelum percaya."
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>
              {t('nav.features')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FEATURE_LINKS.map(f => (
                <Link key={f.href} href={f.href} style={{
                  display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none',
                  color: 'var(--text-secondary)', fontSize: 14, transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  <span>{f.icon}</span> {t(`nav.${f.key}`)}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>
              Trustify
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { href: '/dashboard', label: t('nav.dashboard') },
                { href: '/trustscore', label: t('nav.trustscore') },
                { href: '/hotnews', label: t('nav.hotnews') },
                { href: '/privacy', label: t('footer.privacy') },
                { href: '/terms', label: t('footer.terms') },
              ].map(l => (
                <Link key={l.href + l.label} href={l.href} style={{
                  textDecoration: 'none', color: 'var(--text-secondary)', fontSize: 14, transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>
              {t('footer.contact')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: <Mail size={14} />, text: 'fivanna21@gmail.com' },
                { icon: <Phone size={14} />, text: '+62 822-8238-7722' },
                { icon: <Lock size={14} />, text: 'OJK Registered & Compliant' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 14 }}>
                  <span style={{ color: 'var(--primary)' }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: 24, borderTop: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            &copy; 2026 Trustify Security. All rights reserved. <br/>
            <span style={{ fontSize: 12, opacity: 0.8 }}>Created by: Felicia Ivanna Widian</span>
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            {['🛡️ Security First', '🇮🇩 Made for Indonesia', '🤖 AI Powered'].map(tag => (
              <span key={tag} style={{
                fontSize: 12, color: 'var(--text-muted)',
                background: 'var(--surface-2)', padding: '4px 10px',
                borderRadius: 20, border: '1px solid var(--border)',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
