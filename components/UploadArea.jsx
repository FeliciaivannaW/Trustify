'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import { useLang } from '../lib/lang';

export default function UploadArea({ onFile, file, accept = '*', label }) {
  const { t } = useLang();
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  };

  const handleChange = (e) => {
    const f = e.target.files[0];
    if (f) onFile(f);
  };

  return (
    <div>
      {file ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 20px', borderRadius: 16, background: 'var(--primary-glow)',
            border: '2px solid var(--primary)', gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>📎</span>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>{file.name}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <button onClick={() => onFile(null)} style={{
            width: 28, height: 28, borderRadius: 8, border: '1px solid var(--border)',
            background: 'var(--surface)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-secondary)',
          }}>
            <X size={14} />
          </button>
        </motion.div>
      ) : (
        <div
          className="upload-area"
          onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }}
          onDragLeave={(e) => e.currentTarget.classList.remove('drag-over')}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{ padding: '40px 24px', textAlign: 'center', cursor: 'pointer' }}
        >
          <Upload size={36} color="var(--primary)" style={{ marginBottom: 12 }} />
          <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
            {label || t('upload.title')}
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 4 }}>
            {t('upload.desc')}
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>{t('upload.supported')}</p>
          <input ref={inputRef} type="file" accept={accept} onChange={handleChange} style={{ display: 'none' }} />
        </div>
      )}
    </div>
  );
}
