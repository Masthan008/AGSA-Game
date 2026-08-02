import React from 'react';
import { TopicTheory } from '../../data/theoryData';
import { BookOpen, Sparkles, Calculator, CheckCircle2, AlertTriangle, Layers, Clock, HardDrive } from 'lucide-react';

interface TheoryTabProps {
  theory?: TopicTheory;
}

export const TheoryTab: React.FC<TheoryTabProps> = ({ theory }) => {
  if (!theory) {
    return (
      <div className="card-grey" style={{ textAlign: 'center', padding: 40 }}>
        <BookOpen size={32} color="var(--text-muted)" style={{ marginBottom: 12 }} />
        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>Select a Topic</h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Choose any topic to view detailed pin-to-pin theory and concept breakdown.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Overview & Definition */}
      <div className="card-black" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
          <Sparkles size={14} /> PIN-TO-PIN THEORY LESSON
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.03em', marginBottom: 8 }}>
          {theory.title}
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.55, marginBottom: 16 }}>
          {theory.overview}
        </p>
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '14px 18px', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--accent-gold)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase', display: 'block', marginBottom: 2 }}>DEFINITION</span>
          <p style={{ fontSize: '0.88rem', color: '#FFFFFF', fontWeight: 500, lineHeight: 1.5 }}>{theory.definition}</p>
        </div>
      </div>

      {/* Complexities Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        <div className="card-light" style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
            <Clock size={15} color="var(--accent-red)" /> Time Complexity
          </div>
          {theory.timeComplexities.map((tc: any, i: number) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: 4 }}>
              <span style={{ color: 'var(--text-secondary)' }}>{tc.operation}:</span>
              <strong style={{ fontFamily: 'var(--font-code)', color: '#000000' }}>{tc.worst}</strong>
            </div>
          ))}
        </div>

        <div className="card-light" style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
            <HardDrive size={15} color="var(--accent-blue)" /> Space Complexity
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#000000', fontFamily: 'var(--font-code)', marginBottom: 4 }}>
            {theory.spaceComplexity.split('.')[0]}
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{theory.spaceComplexity}</p>
        </div>
      </div>

      {/* Key Properties */}
      <div className="card-light" style={{ padding: 20 }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Layers size={16} /> Key Mathematical Properties
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {theory.keyProperties.map((prop: string, idx: number) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
              <CheckCircle2 size={16} color="var(--accent-green)" style={{ marginTop: 2, flexShrink: 0 }} />
              <span>{prop}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pin-to-Pin Step Breakdown */}
      <div className="card-light" style={{ padding: 20 }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 6 }}>
          <BookOpen size={16} /> Pin-to-Pin Execution Steps
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {theory.pinToPinSteps.map((step: any) => (
            <div key={step.stepNumber} style={{ background: 'var(--bg-light)', padding: 14, borderRadius: 'var(--radius-md)', borderLeft: '3px solid #000000' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#000000', marginBottom: 4, textTransform: 'uppercase' }}>
                Step {step.stepNumber}: {step.title}
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: step.formula ? 8 : 0 }}>
                {step.explanation}
              </p>
              {step.formula && (
                <div style={{ background: '#FFFFFF', padding: '6px 12px', borderRadius: 6, border: '1px solid var(--border-hairline)' }}>
                  <code style={{ fontFamily: 'var(--font-code)', fontSize: '0.82rem', color: 'var(--accent-red)' }}>
                    <Calculator size={12} style={{ display: 'inline', marginRight: 4 }} /> {step.formula}
                  </code>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Real World Applications & Edge Cases */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
        <div className="card-light" style={{ padding: 18 }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: 10, color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <CheckCircle2 size={16} /> Real-World Applications
          </h4>
          <ul style={{ paddingLeft: 18, fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
            {theory.realWorldApplications.map((app: string, i: number) => <li key={i}>{app}</li>)}
          </ul>
        </div>

        <div className="card-light" style={{ padding: 18 }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: 10, color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <AlertTriangle size={16} /> Edge Cases & Gotchas
          </h4>
          <ul style={{ paddingLeft: 18, fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
            {theory.edgeCases.map((ec: string, i: number) => <li key={i}>{ec}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};
