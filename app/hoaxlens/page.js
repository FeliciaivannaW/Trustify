'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, FileText, ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import Footer from '../../components/Footer';
import AnalysisResult from '../../components/AnalysisResult';
import LoadingAnalysis from '../../components/LoadingAnalysis';
import { analyzeText } from '../../lib/analysis';
import { useStore } from '../../lib/store';

export default function HoaxLens() {
  const { addScan } = useStore();
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (input.length < 10) return;
    setIsAnalyzing(true);
    setResult(null);

    const res = await analyzeText(input, 'hoax'); 
    if (res) addScan({ ...res, type: 'hoaxlens', snippet: input.substring(0, 30) });
    setResult(res);
    setIsAnalyzing(false);
  };

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
              width: 64, height: 64, borderRadius: 16, background: 'var(--primary-glow)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
            }}>
              <Search size={32} color="var(--primary)" />
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>HoaxLens</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
              Jangan gampang percaya pesan broadcast WhatsApp. Cek kebenaran fakta dan deteksi misinformasi dengan HoaxLens.
            </p>
          </div>

          <div className="glass-card" style={{ padding: 24, marginBottom: 32 }}>
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <FileText size={20} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: 16 }} />
              <textarea
                className="trustify-input"
                placeholder="Tempel teks pesan berantai atau link artikel berita di sini..."
                value={input}
                onChange={e => setInput(e.target.value)}
                style={{ paddingLeft: 48, minHeight: 140, resize: 'vertical', paddingTop: 16 }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--primary)', fontSize: 13, fontWeight: 600 }}>
                <span style={{ fontSize: 16 }}>📷</span> Upload Screenshot WA/Artikel
                <input type="file" style={{ display: 'none' }} accept="image/*,.pdf" onChange={(e) => { if (e.target.files[0]) alert('Simulasi: File ' + e.target.files[0].name + ' ditambahkan ke sesi analisis.'); }} />
              </label>
              <button className="btn-primary" onClick={handleAnalyze} disabled={isAnalyzing || input.length < 10}>
                Verifikasi Fakta <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isAnalyzing && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="glass-card"><LoadingAnalysis message="Menganalisa sentimen dan referensi silang data fakta..." /></div>
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
