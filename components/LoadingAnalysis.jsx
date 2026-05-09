'use client';

import { motion } from 'framer-motion';
import { Shield, Cpu, Scan } from 'lucide-react';
import { useLang } from '../lib/lang';

export default function LoadingAnalysis({ message }) {
  const { t } = useLang();

  const dots = [0, 1, 2];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 24, padding: '48px 24px', textAlign: 'center',
      }}
    >
      {/* Animated scanner */}
      <div style={{ position: 'relative', width: 100, height: 100 }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: 'var(--primary)',
            borderRightColor: 'var(--primary-light)',
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', inset: 12, borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: '#7c3aed',
            borderLeftColor: '#7c3aed',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Shield size={28} color="var(--primary)" />
          </motion.div>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>
            {message || t('analysis.analyzing')}
          </p>
          {dots.map(i => (
            <motion.span key={i}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
              style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }}
            />
          ))}
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          🤖 AI sedang menganalisa data...
        </p>
      </div>

      {/* Animated progress bar */}
      <div style={{ width: '100%', maxWidth: 320, height: 4, borderRadius: 2, background: 'var(--border)', overflow: 'hidden' }}>
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ height: '100%', width: '40%', borderRadius: 2, background: 'linear-gradient(90deg, transparent, var(--primary), transparent)' }}
        />
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        {['🔍 Scanning', '🧠 AI Analysis', '📊 Scoring'].map((step, i) => (
          <motion.div key={step}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
            style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500,
              background: 'var(--primary-glow)', color: 'var(--primary)',
              border: '1px solid rgba(26,111,255,0.3)',
            }}
          >
            {step}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
