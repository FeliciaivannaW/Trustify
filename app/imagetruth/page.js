'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image as ImageIcon,
  ArrowRight,
  Upload,
  ArrowLeft,
} from 'lucide-react';

import Navbar from '../../components/Navbar';
import Link from 'next/link';
import Footer from '../../components/Footer';
import AnalysisResult from '../../components/AnalysisResult';
import LoadingAnalysis from '../../components/LoadingAnalysis';
import { useStore } from '../../lib/store';

export default function ImageTruth() {
  const { addScan } = useStore();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    // validasi size max 5MB
    if (selected.size > 5 * 1024 * 1024) {
      alert('Ukuran gambar maksimal 5MB');
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert('Pilih gambar terlebih dahulu');
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/imagetruth', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal menganalisa gambar');
      }

      addScan({
        ...data,
        type: 'imagetruth',
        snippet: file.name,
      });

      setResult(data);

    } catch (error) {
      console.error(error);

      alert(error.message || 'Terjadi kesalahan');
    }

    setIsAnalyzing(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />

      <main
        style={{
          paddingTop: 80,
          paddingBottom: 60,
          flex: 1,
          background: 'var(--background)',
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: '0 auto',
            padding: '0 24px',
          }}
        >
          <Link
            href="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--text-muted)',
              marginBottom: 32,
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            <ArrowLeft size={16} />
            Kembali ke Dashboard
          </Link>

          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: 'var(--primary-glow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <ImageIcon size={32} color="var(--primary)" />
            </div>

            <h1
              style={{
                fontSize: 32,
                fontWeight: 800,
                marginBottom: 12,
              }}
            >
              ImageTruth
            </h1>

            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: 16,
                maxWidth: 500,
                margin: '0 auto',
              }}
            >
              Unggah gambar screenshot transfer atau bukti resi
              untuk mengecek apakah gambar tersebut hasil editan palsu.
            </p>
          </div>

          <div
            className="glass-card"
            style={{
              padding: 40,
              marginBottom: 32,
              textAlign: 'center',
              borderStyle: 'dashed',
            }}
          >
            <Upload
              size={48}
              color="var(--text-muted)"
              style={{ margin: '0 auto 16px' }}
            />

            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Upload Gambar
            </h3>

            <p
              style={{
                color: 'var(--text-secondary)',
                marginBottom: 24,
              }}
            >
              Format didukung: JPG, PNG, WEBP (Maks 5MB)
            </p>

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFileChange}
              style={{ marginBottom: 24 }}
            />

            {preview && (
              <div style={{ marginBottom: 24 }}>
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: 300,
                    borderRadius: 16,
                    objectFit: 'cover',
                  }}
                />
              </div>
            )}

            <button
              className="btn-primary"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? 'Menganalisa...' : 'Analisa Gambar'}

              <ArrowRight size={18} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {isAnalyzing && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="glass-card">
                  <LoadingAnalysis message="Menganalisa gambar dengan AI..." />
                </div>
              </motion.div>
            )}

            {!isAnalyzing && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AnalysisResult
                  result={result}
                  onClear={() => {
                    setResult(null);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
