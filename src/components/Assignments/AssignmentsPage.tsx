import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Circle, ClipboardList, Clock3, PlayCircle, RefreshCw } from 'lucide-react';
import { LEVEL_TOPICS } from '../../data/levelsData';
import { fetchMyTasks } from '../../services/api';
import { LevelTopic } from '../../types';

interface Assignment {
  id: string;
  levelId: string;
  assignedAt: string;
  completedAt: string | null;
  dueAt?: string | null;
  instructions?: string | null;
}

interface AssignmentsPageProps {
  onStartLevel: (level: LevelTopic) => void;
}

export const AssignmentsPage: React.FC<AssignmentsPageProps> = ({ onStartLevel }) => {
  const [tasks, setTasks] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetchMyTasks().then(setTasks).finally(() => setLoading(false));
  };

  useEffect(load, []);
  const pending = useMemo(() => tasks.filter(task => !task.completedAt), [tasks]);
  const completed = useMemo(() => tasks.filter(task => task.completedAt), [tasks]);

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 16px' }}>
      <div className="card-black" style={{ padding: '28px 24px', marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <span style={{ color: 'var(--accent-gold)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.08em' }}>MY LEARNING PLAN</span>
            <h2 style={{ color: '#fff', fontSize: '1.65rem', margin: '5px 0' }}>Teacher assignments</h2>
            <p style={{ color: 'rgba(255,255,255,.62)', margin: 0 }}>Learn the concept, explore its steps, then prove your understanding.</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="btn" style={{ background: '#fff', color: '#000' }}>{pending.length} pending</span>
            <span className="btn" style={{ background: 'rgba(52,199,89,.18)', color: '#7CFF9B' }}>{completed.length} done</span>
          </div>
        </div>
      </div>

      {loading && <div role="status" className="card-light" style={{ padding: 30, textAlign: 'center' }}>Loading your learning plan…</div>}
      {!loading && tasks.length === 0 && (
        <div className="card-light" style={{ padding: 36, textAlign: 'center' }}>
          <ClipboardList size={36} style={{ marginBottom: 10 }} />
          <h3>No assignments yet</h3>
          <p style={{ color: 'var(--text-muted)' }}>Your teacher’s assigned topics will appear here. You can continue the Campaign anytime.</p>
          <button className="btn btn-secondary" onClick={load}><RefreshCw size={15} /> Refresh</button>
        </div>
      )}

      {!loading && tasks.length > 0 && (
        <div style={{ display: 'grid', gap: 10 }}>
          {[...pending, ...completed].map(task => {
            const level = LEVEL_TOPICS.find(item => item.id === task.levelId);
            if (!level) return null;
            const done = Boolean(task.completedAt);
            return (
              <article key={task.id} className="card-light" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, borderLeft: `4px solid ${done ? '#34C759' : '#FF9500'}` }}>
                {done ? <CheckCircle2 color="#34C759" /> : <Circle color="#FF9500" />}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Level {level.levelNumber} · {level.category}</div>
                  <h3 style={{ fontSize: '1rem', margin: '3px 0' }}>{level.title}</h3>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', display: 'inline-flex', gap: 5, alignItems: 'center' }}>
                    <Clock3 size={12} /> {done ? `Completed ${new Date(task.completedAt!).toLocaleDateString()}` : task.dueAt ? `Due ${new Date(task.dueAt).toLocaleDateString()}` : `Assigned ${new Date(task.assignedAt).toLocaleDateString()}`}
                  </span>
                  {task.instructions && <p style={{ margin: '6px 0 0', fontSize: '.78rem', color: 'var(--text-secondary)' }}>{task.instructions}</p>}
                </div>
                <button className={done ? 'btn btn-secondary btn-sm' : 'btn btn-primary btn-sm'} onClick={() => onStartLevel(level)}>
                  <PlayCircle size={15} /> {done ? 'Review' : 'Start'}
                </button>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
