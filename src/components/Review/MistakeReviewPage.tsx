import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, RefreshCw, RotateCcw } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/quizData';
import { LEVEL_TOPICS } from '../../data/levelsData';
import { fetchMistakes } from '../../services/api';
import { LevelTopic } from '../../types';

export const MistakeReviewPage: React.FC<{ onReviewLevel: (level: LevelTopic) => void }> = ({ onReviewLevel }) => {
  const [mistakes, setMistakes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const load = () => { setLoading(true); fetchMistakes().then(setMistakes).finally(() => setLoading(false)); };
  useEffect(() => { void load(); }, []);

  return <div style={{ maxWidth: 850, margin: '0 auto', padding: '24px 16px' }}>
    <div className="card-black" style={{ padding: 26, marginBottom: 18 }}>
      <span style={{ color: '#FF9F0A', fontWeight: 800, fontSize: '.7rem' }}>PERSONAL REVIEW QUEUE</span>
      <h2 style={{ color: '#fff', margin: '5px 0' }}>Turn mistakes into memory</h2>
      <p style={{ color: 'rgba(255,255,255,.62)', margin: 0 }}>Only your latest unresolved answers appear here. Answer correctly in the Arena to clear them.</p>
    </div>
    {loading && <div role="status" className="card-light" style={{ padding: 30, textAlign: 'center' }}>Building your review queue…</div>}
    {!loading && mistakes.length === 0 && <div className="card-light" style={{ padding: 34, textAlign: 'center' }}><CheckCircle2 size={38} color="#34C759" /><h3>Review queue cleared</h3><p style={{ color: 'var(--text-muted)' }}>No unresolved quiz mistakes. Keep practising deliberately.</p><button className="btn btn-secondary" onClick={load}><RefreshCw size={14} /> Refresh</button></div>}
    <div style={{ display: 'grid', gap: 12 }}>
      {mistakes.map(attempt => {
        const question = QUIZ_QUESTIONS.find(item => item.id === attempt.puzzleId);
        const level = LEVEL_TOPICS.find(item => item.id === attempt.levelId);
        if (!question || !level) return null;
        return <article key={attempt.id} className="card-light" style={{ padding: 18, borderLeft: '4px solid #FF3B30' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: '#C42B22', fontSize: '.72rem', fontWeight: 800 }}><AlertCircle size={14} /> LEVEL {level.levelNumber} · {level.title}</div>
          <h3 style={{ fontSize: '1rem', lineHeight: 1.5, margin: '8px 0' }}>{question.question}</h3>
          <p style={{ padding: 10, background: 'rgba(255,59,48,.06)', borderRadius: 8, fontSize: '.82rem' }}><strong>Your answer:</strong> {question.options[attempt.selectedIndex] || 'Unknown'}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '.84rem', lineHeight: 1.55 }}><strong>Why:</strong> {question.explanation}</p>
          <button className="btn btn-primary btn-sm" onClick={() => onReviewLevel(level)}><RotateCcw size={14} /> Relearn and retry</button>
        </article>;
      })}
    </div>
  </div>;
};
