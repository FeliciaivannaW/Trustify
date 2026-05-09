'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Shield, Zap, Bell, Clock, ChevronRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import TrustScoreMeter from '../../components/TrustScoreMeter';
import { useLang } from '../../lib/lang';
import { useStore } from '../../lib/store';

export default function Dashboard() {
  const { t, lang } = useLang();
  const { scanHistory, trustScore } = useStore();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(t('dashboard.greeting_morning'));
    else if (hour < 18) setGreeting(t('dashboard.greeting_afternoon'));
    else setGreeting(t('dashboard.greeting_evening'));
  }, [lang, t]);

  // Derive average score or last score for overview
  const overviewScore = trustScore !== null ? trustScore : (scanHistory.length > 0 ? scanHistory[0].score : null);

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ paddingTop: 80, paddingBottom: 60, flex: 1, background: 'var(--background)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
              {greeting}, <span className="gradient-text">User</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>{t('dashboard.subtitle')}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
            
            {/* Main Content Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              {/* Universal Search Bar */}
              <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    className="trustify-input"
                    placeholder={t('dashboard.search_placeholder')}
                    style={{ paddingLeft: 48, fontSize: 16 }}
                  />
                </div>
                <Link href="/scamshield" style={{ textDecoration: 'none' }}>
                  <button className="btn-primary" style={{ padding: '14px 24px' }}>
                    {t('dashboard.search_btn')}
                  </button>
                </Link>
              </div>

              {/* Quick Actions Grid */}
              <div className="glass-card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Zap size={18} color="var(--primary)" /> {t('dashboard.quick_actions')}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {[
                    { k: 'scamshield', icon: '🛡️', path: '/scamshield' },
                    { k: 'wifisecure', icon: '📶', path: '/wifisecure' },
                    { k: 'imagetruth', icon: '🖼️', path: '/imagetruth' },
                    { k: 'reviewguard', icon: '⭐', path: '/reviewguard' },
                    { k: 'callalert', icon: '📞', path: '/callalert' },
                    { k: 'hoaxlens', icon: '🔍', path: '/hoaxlens' },
                    { k: 'pinjolcheck', icon: '💰', path: '/pinjolcheck' },
                    { k: 'lowonganaman', icon: '💼', path: '/lowonganaman' },
                    { k: 'trustscore', icon: '📊', path: '/trustscore' },
                  ].map(a => (
                    <Link key={a.k} href={a.path} style={{ textDecoration: 'none' }}>
                      <div style={{
                        padding: '16px 12px', borderRadius: 12, border: '1px solid var(--border)',
                        background: 'var(--surface-2)', textAlign: 'center', cursor: 'pointer',
                        transition: 'all 0.2s'
                      }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                        <div style={{ fontSize: 24, marginBottom: 8 }}>{a.icon}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{t(`nav.${a.k}`)}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent Scans */}
              <div className="glass-card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Clock size={18} color="var(--primary)" /> {t('dashboard.recent_scans')}
                </h3>
                {scanHistory.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
                    <Shield size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                    <p>{t('dashboard.no_scans')}</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {scanHistory.slice(0, 3).map((scan, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: 16, borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--border)'
                      }}>
                        <div>
                          <p style={{ fontWeight: 600, fontSize: 14 }}>{scan.type.toUpperCase()} Check</p>
                          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{new Date(scan.timestamp).toLocaleDateString()}</p>
                        </div>
                        <div className={`badge-${scan.riskLevel}`} style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                          {scan.score}/100
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Sidebar Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              {/* TrustScore Overview */}
              <div className="glass-card glow-blue" style={{ padding: 24, textAlign: 'center' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>{t('dashboard.trust_overview')}</h3>
                <TrustScoreMeter score={overviewScore} size={180} lang={lang} />
                <Link href="/trustscore" style={{ textDecoration: 'none', display: 'block', marginTop: 20 }}>
                  <button style={{
                    width: '100%', padding: '10px', background: 'var(--surface-2)',
                    border: '1px solid var(--border)', borderRadius: 10, cursor: 'pointer',
                    color: 'var(--primary)', fontWeight: 600, fontFamily: 'inherit',
                  }}>
                    {t('analysis.details')}
                  </button>
                </Link>
              </div>

              {/* Hot Alerts */}
              <div className="glass-card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Bell size={18} color="var(--accent)" /> {t('dashboard.hot_alerts')}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { title: "Penipuan Undangan Nikah APK", type: "Malware", color: "var(--danger)" },
                    { title: "Modus Kurir Paket J&T Palsu", type: "Phishing", color: "var(--warning)" },
                    { title: "Loker Freelance Like Youtube", type: "Scam", color: "var(--danger)" },
                    { title: "Bansos Rp 5 Juta Hoax", type: "Hoax", color: "var(--safe)" },
                    { title: "Telepon CS BCA Palsu", type: "Scam", color: "var(--danger)" }
                  ].map((alert, i) => (
                    <div key={i} style={{ padding: 12, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: alert.color, background: `${alert.color}20`, padding: '2px 6px', borderRadius: 4, marginBottom: 6, display: 'inline-block' }}>
                        {alert.type}
                      </span>
                      <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{alert.title}</p>
                    </div>
                  ))}
                  <Link href="/hotnews" style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, textAlign: 'center', display: 'block', marginTop: 8, textDecoration: 'none' }}>
                    {t('common.see_all')} <ChevronRight size={14} style={{ verticalAlign: 'middle' }} />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 900px) {
          main > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
