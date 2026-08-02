import React, { useState } from 'react';
import { COMPARISONS_DATA } from '../../data/comparisonsData';
import { ArrowLeftRight, CheckCircle2, XCircle, Sparkles, Scale, Zap, Gauge } from 'lucide-react';

export const AlgoCompare: React.FC = () => {
  const [selectedCompId, setSelectedCompId] = useState(COMPARISONS_DATA[0].id);

  const activeComp = COMPARISONS_DATA.find(c => c.id === selectedCompId) || COMPARISONS_DATA[0];

  const complexityWeight = (value: string): number => {
    if (/O\(1\)|O\(α|O\(L\)|O\(M\)/i.test(value)) return 1;
    if (/log/i.test(value) && !/V\^3|N\^3|N\^2|N \\times M|N × M/i.test(value)) return 2;
    if (/N \* M|N × M|V \\times E|V × E|N\\times M|N\\cdot/i.test(value)) return 4;
    if (/N\^2|V\^2|O\(V²\)|O\(N²\)/i.test(value)) return 5;
    if (/N\^3|V\^3|O\(V³\)|O\(N³\)/i.test(value)) return 7;
    if (/2\^n|2\^N|2\^|n!|N!/i.test(value)) return 9;
    return 3;
  };

  const renderComplexityBar = (value: string) => {
    const w = Math.min(100, complexityWeight(value) * 14);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', width: 130, flexShrink: 0 }}>Search / Lookup</span>
        <div style={{ flex: 1, height: 10, background: 'var(--bg-grey)', borderRadius: 100, overflow: 'hidden' }}>
          <div className="complexity-bar" style={{ width: `${w}%`, background: 'linear-gradient(90deg, #FF3B30, #FF9500)' }} />
        </div>
        <strong style={{ fontFamily: 'var(--font-code)', fontSize: '0.8rem', width: 90, textAlign: 'right', flexShrink: 0 }}>{value}</strong>
      </div>
    );
  };

  const renderAlgoCard = (algo: any, side: 'A' | 'B') => {
    const accent = side === 'A' ? 'var(--accent-red)' : 'var(--accent-blue)';
    const gradient = side === 'A' ? 'linear-gradient(90deg, #FF3B30, #FF9500)' : 'linear-gradient(90deg, #007AFF, #5AC8FA)';
    return (
      <div className={`compare-card fade-in-up`} style={{ animationDelay: `${side === 'A' ? 60 : 140}ms`, borderTop: `4px solid ${accent}` }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: accent, textTransform: 'uppercase', marginBottom: 4 }}>
          OPTION {side}
        </div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: 16 }}>{algo.name}</h3>

        <div style={{ background: 'var(--bg-light)', padding: 12, borderRadius: 'var(--radius-md)', marginBottom: 14 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Gauge size={12} /> TIME COMPLEXITIES
          </div>
          {renderComplexityBar(algo.timeComplexity.search)}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 3 }}>
            <span>Insertion:</span> <strong style={{ fontFamily: 'var(--font-code)' }}>{algo.timeComplexity.insert}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 3 }}>
            <span>Deletion:</span> <strong style={{ fontFamily: 'var(--font-code)' }}>{algo.timeComplexity.delete}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span>Space Complexity:</span> <strong style={{ fontFamily: 'var(--font-code)' }}>{algo.spaceComplexity}</strong>
          </div>
        </div>

        <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Scale size={14} /> Best For
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: 14, padding: '10px 12px', background: `linear-gradient(135deg, ${side === 'A' ? 'rgba(255,59,48,0.06)' : 'rgba(0,122,255,0.06)'}, transparent)`, borderRadius: 'var(--radius-md)' }}>
          {algo.bestFor}
        </p>

        <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--accent-green)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
          <CheckCircle2 size={14} /> Advantages & Strengths
        </h4>
        <ul style={{ paddingLeft: 16, fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: 14 }}>
          {algo.pros.map((p: string, i: number) => <li key={i} className="fade-in-up" style={{ animationDelay: `${180 + i * 80}ms` }}>{p}</li>)}
        </ul>

        <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--accent-red)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
          <XCircle size={14} /> Disadvantages & Drawbacks
        </h4>
        <ul style={{ paddingLeft: 16, fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
          {algo.cons.map((c: string, i: number) => <li key={i} className="fade-in-up" style={{ animationDelay: `${240 + i * 80}ms` }}>{c}</li>)}
        </ul>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2 className="section-title">Side-by-Side Algorithm Comparison Engine ({COMPARISONS_DATA.length} Pairs)</h2>
        <p className="section-subtitle">Compare time complexities, space constraints, and real-world trade-offs between key algorithm pairs.</p>
      </div>

      {/* Comparison Selector Pills */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 24, paddingBottom: 8 }}>
        {COMPARISONS_DATA.map((comp, i) => (
          <button
            key={comp.id}
            onClick={() => setSelectedCompId(comp.id)}
            className="fade-in-up"
            style={{
              background: selectedCompId === comp.id ? '#000000' : 'var(--bg-light)',
              color: selectedCompId === comp.id ? '#FFFFFF' : 'var(--text-secondary)',
              border: `1px solid ${selectedCompId === comp.id ? '#000000' : 'var(--border-hairline)'}`,
              borderRadius: '100px', padding: '8px 16px', fontSize: '0.8rem', fontWeight: 700,
              cursor: 'pointer', fontFamily: 'var(--font-main)', transition: 'all 0.25s ease', whiteSpace: 'nowrap',
              animationDelay: `${i * 30}ms`,
              boxShadow: selectedCompId === comp.id ? '0 4px 14px rgba(0,0,0,0.2)' : 'none',
              transform: selectedCompId === comp.id ? 'translateY(-1px)' : 'none',
            }}
          >
            {comp.title}
          </button>
        ))}
      </div>

      {/* Hero Recommendation Card — animated glow */}
      <div className="verdict-card fade-in-up" key={`verdict-${activeComp.id}`} style={{ padding: 22, marginBottom: 24, borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #FFCC00, #FF9500, #FFCC00)', backgroundSize: '200% 100%', animation: 'gradient-slide 3s linear infinite' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: 8 }}>
          <Sparkles size={14} /> ADSA VERDICT & RECOMMENDATION
        </div>
        <p style={{ fontSize: '1.02rem', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.55 }}>
          <span className="verdict-glow">🏆</span> {activeComp.recommendation}
        </p>
        <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, background: 'rgba(255,255,255,0.12)', color: '#fff', padding: '4px 12px', borderRadius: 100 }}>
            <Zap size={11} style={{ marginRight: 4, verticalAlign: -1 }} /> {activeComp.algoA.name}
          </span>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, background: 'rgba(255,255,255,0.12)', color: '#fff', padding: '4px 12px', borderRadius: 100 }}>
            vs {activeComp.algoB.name}
          </span>
        </div>
      </div>

      {/* 2-Column Side-by-Side Comparison Cards */}
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }} key={`cards-${activeComp.id}`}>
        {renderAlgoCard(activeComp.algoA, 'A')}
        <div style={{
          position: 'absolute', top: '42%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2,
        }} className="fade-in-up">
          <div style={{
            width: 56, height: 56, borderRadius: '50%', background: '#000', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            border: '3px solid #fff',
          }}>
            <ArrowLeftRight size={24} />
          </div>
        </div>
        {renderAlgoCard(activeComp.algoB, 'B')}
      </div>
    </div>
  );
};
