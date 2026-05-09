'use client';

import { motion } from 'framer-motion';
import { getRiskColor, getRiskClass } from '../lib/analysis';

export default function TrustScoreMeter({ score, size = 160, showLabel = true, lang = 'id' }) {
  const radius = (size / 2) - 16;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, score || 0));
  const offset = circumference - (progress / 100) * circumference;
  const color = getRiskColor(score);

  const riskClass = getRiskClass(score);
  const labels = {
    safe: { id: 'Aman', en: 'Safe', zh: '安全' },
    warning: { id: 'Peringatan', en: 'Warning', zh: '警告' },
    danger: { id: 'Berbahaya', en: 'Dangerous', zh: '危险' },
  };
  const label = labels[riskClass]?.[lang] || labels[riskClass]?.id || '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background track */}
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="var(--border)" strokeWidth={10}
          />
          {/* Progress arc */}
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke={color}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 8px ${color}60)` }}
          />
        </svg>
        {/* Center text */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            style={{ fontSize: size * 0.22, fontWeight: 800, color, lineHeight: 1 }}
          >
            {score !== null && score !== undefined ? Math.round(score) : '--'}
          </motion.span>
          <span style={{ fontSize: size * 0.1, color: 'var(--text-muted)', fontWeight: 500 }}>/100</span>
        </div>
      </div>

      {showLabel && score !== null && score !== undefined && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`badge-${riskClass}`}
          style={{ padding: '4px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}
        >
          {label}
        </motion.div>
      )}
    </div>
  );
}
