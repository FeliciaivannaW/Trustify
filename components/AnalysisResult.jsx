'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, XCircle, Lightbulb, Flag } from 'lucide-react';
import TrustScoreMeter from './TrustScoreMeter';
import { useLang } from '../lib/lang';

export default function AnalysisResult({ result, onClear }) {
  const { t, lang } = useLang();
  if (!result) return null;

  const { score, riskLevel, redFlags, recommendations, summary, details } = result;

  const riskColors = { safe: 'var(--safe)', warning: 'var(--warning)', danger: 'var(--danger)' };
  const riskBgs = { safe: 'var(--safe-bg)', warning: 'var(--warning-bg)', danger: 'var(--danger-bg)' };
  const color = riskColors[riskLevel] || 'var(--primary)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      {/* Header result */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px', borderRadius: 16,
        background: riskBgs[riskLevel],
        border: `1px solid ${color}40`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {riskLevel === 'safe' ? <CheckCircle size={28} color="var(--safe)" /> :
           riskLevel === 'warning' ? <AlertTriangle size={28} color="var(--warning)" /> :
           <XCircle size={28} color="var(--danger)" />}
          <div>
            <p style={{ fontWeight: 700, color, fontSize: 16 }}>{t(`analysis.${riskLevel}`)}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{t('analysis.complete')}</p>
          </div>
        </div>
        <button onClick={onClear} style={{
          padding: '6px 14px', borderRadius: 8, border: '1px solid var(--border)',
          background: 'var(--surface)', color: 'var(--text-secondary)',
          cursor: 'pointer', fontSize: 13, fontFamily: 'inherit',
        }}>
          {t('common.clear')}
        </button>
      </div>

      {/* Score + details grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 20, alignItems: 'start' }}>
        <div style={{
          background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)',
          padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>
            {t('analysis.trust_score')}
          </p>
          <TrustScoreMeter score={score} size={140} lang={lang} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Summary */}
          {summary && (
            <div style={{
              background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)',
              padding: '16px 20px',
            }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                {t('analysis.summary')}
              </p>
              <p style={{ color: 'var(--text-primary)', fontSize: 14, lineHeight: 1.6 }}>{summary}</p>
            </div>
          )}

          {/* Red flags */}
          {redFlags && redFlags.length > 0 && (
            <div style={{
              background: 'var(--danger-bg)', borderRadius: 16, border: '1px solid rgba(239,68,68,0.2)',
              padding: '16px 20px',
            }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--danger)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Flag size={12} /> {t('analysis.red_flags')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {redFlags.map((flag, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--text-primary)' }}
                  >
                    <span style={{ color: 'var(--danger)', marginTop: 2, flexShrink: 0 }}>⚠</span>
                    {flag}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <div style={{
          background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)',
          padding: '16px 20px',
        }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Lightbulb size={12} /> {t('analysis.recommendations')}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recommendations.map((rec, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--text-primary)',
                  padding: '10px 14px', borderRadius: 10, background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                }}
              >
                <span style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }}>✓</span>
                {rec}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
