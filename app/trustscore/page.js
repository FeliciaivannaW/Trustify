'use client';

import { motion } from 'framer-motion';
import { BarChart2, ShieldCheck, History } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import TrustScoreMeter from '../../components/TrustScoreMeter';
import { useStore } from '../../lib/store';
import { useLang } from '../../lib/lang';

export default function TrustScore() {
  const { scanHistory, trustScore } = useStore();
  const { t, lang } = useLang();

  // If no trustScore, default to 100 for display purposes on fresh accounts
  const displayScore = trustScore !== null ? trustScore : 100;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ paddingTop: 80, paddingBottom: 60, flex: 1, background: 'var(--background)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16, background: 'var(--primary-glow)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
            }}>
              <BarChart2 size={32} color="var(--primary)" />
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Global TrustScore</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>
              Indeks skor kepercayaan digital Anda berdasarkan analisis riwayat pengecekan sebelumnya.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 24, alignItems: 'stretch' }}>
            
            {/* Main Score Meter */}
            <div className="glass-card glow-blue" style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <TrustScoreMeter score={displayScore} size={220} lang={lang} />
              <div style={{ marginTop: 24, textAlign: 'center' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>Status Keamanan: {displayScore >= 70 ? 'Optimal' : displayScore >= 40 ? 'Perlu Waspada' : 'Sangat Rentan'}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>Diperbarui secara real-time</p>
              </div>
            </div>

            {/* Stats Breakdown */}
            <div className="glass-card" style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                <ShieldCheck size={20} color="var(--primary)" /> Breakdown Skor
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Scam & Phishing Avoidance', val: displayScore >= 70 ? 92 : displayScore, color: 'var(--safe)' },
                  { label: 'Device & Connection Safety', val: displayScore >= 40 ? 88 : 30, color: 'var(--primary)' },
                  { label: 'Information Authenticity', val: 75, color: 'var(--warning)' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                      <span>{stat.label}</span>
                      <span>{stat.val}%</span>
                    </div>
                    <div style={{ width: '100%', height: 8, background: 'var(--surface-2)', borderRadius: 4, overflow: 'hidden' }}>
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${stat.val}%` }} 
                        transition={{ duration: 1, delay: i * 0.2 }}
                        style={{ height: '100%', background: stat.color, borderRadius: 4 }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          main > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
