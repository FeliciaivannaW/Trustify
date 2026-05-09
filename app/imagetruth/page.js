'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, ArrowRight, Upload, ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import Footer from '../../components/Footer';
import AnalysisResult from '../../components/AnalysisResult';
import LoadingAnalysis from '../../components/LoadingAnalysis';
import { analyzeText } from '../../lib/analysis';
import { useStore } from '../../lib/store';

export default function ImageTruth() {
  const { addScan } = useStore();
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (input.length < 5) return;
    setIsAnalyzing(true);
    setResult(null);

    const res = await analyzeText(input, 'scam'); 
    if (res) addScan({ ...res, type: 'imagetruth', snippet: input.substring(0, 30) });
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
              <ImageIcon size={32} color="var(--primary)" />
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>ImageTruth</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
              Unggah gambar screenshot transfer atau bukti resi untuk mengecek apakah gambar tersebut hasil editan palsu.
            </p>
          </div>

          <div className="glass-card" style={{ padding: 40, marginBottom: 32, textAlign: 'center', borderStyle: 'dashed' }}>
            <Upload size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Tarik & Lepas Gambar ke Sini</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Format didukung: JPG, PNG, WEBP (Maks 5MB)</p>
            <button className="btn-primary" onClick={handleAnalyze} disabled={isAnalyzing}>
              {isAnalyzing ? 'Menganalisa...' : 'Pilih Gambar'} <ArrowRight size={18} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {isAnalyzing && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="glass-card"><LoadingAnalysis message="Mengekstrak metadata gambar..." /></div>
              </motion.div>
            )}
            {!isAnalyzing && result && (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <AnalysisResult result={result} onClear={() => { setResult(null); }} />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
      <Footer />
    </div>
  );
}
