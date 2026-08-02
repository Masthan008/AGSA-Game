import React from 'react';
import { AnimationFrame } from '../../types';
import { Activity, HelpCircle, Calculator, Eye } from 'lucide-react';

interface ExplanationPanelProps {
  currentFrame?: AnimationFrame;
}

export const ExplanationPanel: React.FC<ExplanationPanelProps> = ({ currentFrame }) => {
  if (!currentFrame) return null;
  const { explanation, variableWatch } = currentFrame;

  return (
    <div className="panel" style={{ padding: 20, height: '100%', overflowY: 'auto' }}>
      <h3 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#000', marginBottom: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        📌 Step Explanation
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Action */}
        <div className="card-black" style={{ padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <Activity size={13} /> Action
          </div>
          <p style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff' }}>{explanation.action}</p>
        </div>

        {/* Reason */}
        <div style={{
          background: 'var(--bg-light)', borderLeft: '3px solid #000',
          padding: '12px 14px', borderRadius: '0 8px 8px 0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <HelpCircle size={13} /> Why
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.55 }}>{explanation.reason}</p>
        </div>

        {/* Formula */}
        {explanation.formula && (
          <div style={{
            background: 'var(--bg-light)', borderLeft: '3px solid var(--accent-red)',
            padding: '12px 14px', borderRadius: '0 8px 8px 0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-red)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              <Calculator size={13} /> Formula
            </div>
            <code style={{ fontFamily: 'var(--font-code)', fontSize: '0.82rem', color: '#000', display: 'block' }}>
              {explanation.formula}
            </code>
          </div>
        )}

        {/* Variable Watch */}
        {variableWatch && Object.keys(variableWatch).length > 0 && (
          <div style={{ background: 'var(--bg-light)', padding: '12px 14px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              <Eye size={13} /> Variables
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {Object.entries(variableWatch).map(([key, val]) => (
                <div key={key} style={{ fontSize: '0.78rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{key}: </span>
                  <strong style={{ color: '#000' }}>{String(val)}</strong>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
