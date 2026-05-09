'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Shield, Wifi, Search, BarChart } from 'lucide-react';
import { useLang } from '../lib/lang';

export default function HelpModal() {
  const { t } = useLang();
  const [isOpen, setIsOpen] = useState(false);

  const guides = [
    { icon: <Shield size={18} />, title: "ScamShield", desc: t('help.scamshield_guide') || "Masukkan nomor WA, rekening, atau link mencurigakan untuk melihat skor risikonya." },
    { icon: <Wifi size={18} />, title: "WiFiSecure", desc: t('help.wifisecure_guide') || "Masukkan nama WiFi publik (SSID) sebelum Anda terhubung untuk mendeteksi potensi penyadapan." },
    { icon: <Search size={18} />, title: "HoaxLens", desc: t('help.hoaxlens_guide') || "Salin dan tempel pesan broadcast atau artikel berita untuk dicek kebenarannya." },
    { icon: <BarChart size={18} />, title: "TrustScore", desc: t('help.trustscore_guide') || "TrustScore adalah rata-rata skor keamanan Anda. Semakin tinggi skor, semakin aman." },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          width: 36, height: 36, borderRadius: 10, border: '1px solid var(--border)',
          background: 'var(--surface)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--text-secondary)', transition: 'all 0.2s'
        }}
        title="Panduan"
      >
        <HelpCircle size={18} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card"
              style={{
                width: '100%', maxWidth: 480, background: 'var(--surface)',
                overflow: 'hidden', border: '1px solid var(--border)'
              }}
            >
              <div style={{
                padding: '20px 24px', borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'var(--surface-2)'
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <HelpCircle size={20} color="var(--primary)" />
                  {t('help.title') || "Panduan Penggunaan"}
                </h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 16, maxHeight: '60vh', overflowY: 'auto' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 8 }}>
                  {t('help.desc') || "Cara menggunakan fitur-fitur keamanan di Trustify:"}
                </p>

                {guides.map((g, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 16, padding: 16, borderRadius: 12,
                    background: 'var(--surface-2)', border: '1px solid var(--border)'
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, background: 'var(--primary-glow)',
                      color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                      {g.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{g.title}</h4>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{g.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
