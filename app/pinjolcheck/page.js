'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, ArrowRight, Search, ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import Footer from '../../components/Footer';
import AnalysisResult from '../../components/AnalysisResult';
import LoadingAnalysis from '../../components/LoadingAnalysis';
import { analyzeText } from '../../lib/analysis';
import { useStore } from '../../lib/store';

export default function PinjolCheck() {
  const { addScan } = useStore();
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (input.length < 3) return;
    setIsAnalyzing(true);
    setResult(null);

    const res = await analyzeText(input, 'loan'); 
    if (res) addScan({ ...res, type: 'pinjolcheck', snippet: input.substring(0, 30) });
    setResult(res);
    setIsAnalyzing(false);
  };

  const examples = ["Dana Kilat Fast", "RupiahMaju OJK", "https://pinjamcepat.com"];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ paddingTop: 80, paddingBottom: 60, flex: 1, background: 'var(--background)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
          
          <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', marginBottom: 32, textDecoration: 'none', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Kembali ke Dashboard
          </Link>

          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16, background: 'var(--danger-bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
            }}>
              <DollarSign size={32} color="var(--danger)" />
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>PinjolCheck</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
              Hindari teror debt collector dan bunga mencekik. Pastikan aplikasi pinjaman online yang Anda gunakan resmi terdaftar di OJK.
            </p>
          </div>

          <div className="glass-card" style={{ padding: 24, marginBottom: 32 }}>
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="trustify-input"
                placeholder="Ketik nama aplikasi pinjol atau link website..."
                value={input}
                onChange={e => setInput(e.target.value)}
                style={{ paddingLeft: 48, fontSize: 16 }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Contoh:</span>
                {examples.map((ex, i) => (
                  <span key={i} onClick={() => setInput(ex)} style={{
                    fontSize: 12, padding: '4px 10px', borderRadius: 20, background: 'var(--surface-2)',
                    border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--primary)'
                  }}>
                    {ex}
                  </span>
                ))}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--primary)', fontSize: 13, fontWeight: 600 }}>
                  <span style={{ fontSize: 16 }}>📷</span> Upload Flyer/Banner Pinjol
                  <input type="file" style={{ display: 'none' }} accept="image/*,.pdf" onChange={(e) => { if (e.target.files[0]) alert('Simulasi: File ' + e.target.files[0].name + ' ditambahkan ke sesi analisis.'); }} />
                </label>
                <button className="btn-primary" onClick={handleAnalyze} disabled={isAnalyzing || input.length < 3}>
                  Cek Legalitas OJK <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isAnalyzing && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="glass-card"><LoadingAnalysis message="Memverifikasi ke database resmi OJK..." /></div>
              </motion.div>
            )}
            {!isAnalyzing && result && (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <AnalysisResult result={result} onClear={() => { setResult(null); setInput(''); }} />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
      <Footer />
    </div>
  );
}
