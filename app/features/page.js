'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, ChevronRight, Zap, ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function FeaturesPage() {
  const features = [
    { k: 'scamshield', name: 'ScamShield', icon: '🛡️', path: '/scamshield', desc: 'Cek No. Rekening, No. WhatsApp, dan Tautan Phishing.' },
    { k: 'wifisecure', name: 'WiFiSecure', icon: '📶', path: '/wifisecure', desc: 'Analisa tingkat risiko jaringan WiFi publik (SSID/Captive Portal).' },
    { k: 'imagetruth', name: 'ImageTruth', icon: '🖼️', path: '/imagetruth', desc: 'Verifikasi manipulasi gambar/deepfake menggunakan AI.' },
    { k: 'reviewguard', name: 'ReviewGuard', icon: '⭐', path: '/reviewguard', desc: 'Deteksi review toko online palsu yang dibuat oleh bot.' },
    { k: 'callalert', name: 'CallAlert', icon: '📞', path: '/callalert', desc: 'Saring nomor telepon spam dan penipuan secara otomatis.' },
    { k: 'hoaxlens', name: 'HoaxLens', icon: '🔍', path: '/hoaxlens', desc: 'Cari tahu apakah berita broadcast WA adalah fakta atau hoaks.' },
    { k: 'pinjolcheck', name: 'PinjolCheck', icon: '💰', path: '/pinjolcheck', desc: 'Menganalisis legalitas OJK dan tingkat risiko pinjaman online.' },
    { k: 'lowonganaman', name: 'LowonganAman', icon: '💼', path: '/lowonganaman', desc: 'Deteksi lowongan kerja penipuan yang meminta biaya pendaftaran.' },
    { k: 'trustscore', name: 'TrustScore', icon: '📊', path: '/trustscore', desc: 'Pantau skor keamanan personal Anda secara real-time.' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ paddingTop: 80, paddingBottom: 60, flex: 1, background: 'var(--background)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
          
          <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', marginBottom: 32, textDecoration: 'none', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Kembali ke Dashboard
          </Link>

          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16, background: 'var(--primary-glow)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
            }}>
              <Zap size={32} color="var(--primary)" />
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Semua Fitur Trustify</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 600, margin: '0 auto' }}>
              Pilih alat keamanan yang Anda butuhkan untuk memeriksa potensi penipuan dan ancaman siber.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link href={f.path} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div className="glass-card glow-blue" style={{
                    padding: 24, height: '100%', display: 'flex', flexDirection: 'column', 
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}>
                    <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{f.name}</h3>
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5, flex: 1, marginBottom: 16 }}>
                      {f.desc}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontSize: 13, fontWeight: 700 }}>
                      Gunakan Fitur Ini <ChevronRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
