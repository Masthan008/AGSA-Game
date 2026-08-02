import React from 'react';
import { LevelTopic, UserProgress } from '../../types';
import { LEVEL_TOPICS } from '../../data/levelsData';
import { Lock, Star, Play, Zap } from 'lucide-react';

interface LevelMapProps {
  userProgress: UserProgress;
  onSelectLevel: (level: LevelTopic) => void;
  onStartQuiz: (level: LevelTopic) => void;
}

const DIFFICULTY_CHIP: Record<string, { bg: string; color: string }> = {
  Beginner: { bg: 'rgba(52,199,89,0.1)', color: '#34C759' },
  Intermediate: { bg: 'rgba(0,122,255,0.1)', color: '#007AFF' },
  Advanced: { bg: 'rgba(255,149,0,0.1)', color: '#FF9500' },
  Master: { bg: 'rgba(255,59,48,0.1)', color: '#FF3B30' },
};

export const LevelMap: React.FC<LevelMapProps> = ({ userProgress, onSelectLevel, onStartQuiz }) => {
  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 16px' }}>
      {/* Hero Banner */}
      <div className="card-black" style={{ padding: '36px 28px', marginBottom: 32 }}>
        <span style={{
          display: 'inline-block', padding: '3px 10px', borderRadius: 'var(--radius-pill)',
          background: 'rgba(255,255,255,0.15)', color: '#fff',
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12,
        }}>
          CAMPAIGN MODE
        </span>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#fff', marginBottom: 8 }}>
          Master ADSA<br />Level by Level
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', maxWidth: 550 }}>
          20 progressive levels covering Trees, Graphs, Dynamic Programming & String algorithms.
          Watch pin-to-pin animations, study multi-language code, and earn stars.
        </p>
      </div>

      {/* Level Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 16,
      }}>
        {LEVEL_TOPICS.map((level) => {
          const isUnlocked = level.levelNumber <= userProgress.levelUnlocked;
          const stars = userProgress.starsPerLevel[level.id] || 0;
          const isCompleted = userProgress.completedLevels.includes(level.id);
          const diffStyle = DIFFICULTY_CHIP[level.difficulty] || DIFFICULTY_CHIP.Beginner;

          return (
            <div
              key={level.id}
              className={isUnlocked ? 'card-light' : 'card-grey'}
              style={{
                opacity: isUnlocked ? 1 : 0.55,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div>
                {/* Top Row: Level # + Stars + Difficulty */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{
                    fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.06em',
                    color: isUnlocked ? '#000' : 'var(--text-light)', lineHeight: 1,
                  }}>
                    {String(level.levelNumber).padStart(2, '0')}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {/* Stars */}
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[1, 2, 3].map((s) => (
                        <Star
                          key={s} size={16}
                          fill={s <= stars ? 'var(--accent-gold)' : 'transparent'}
                          color={s <= stars ? 'var(--accent-gold)' : 'var(--border-light)'}
                          strokeWidth={s <= stars ? 0 : 1.5}
                        />
                      ))}
                    </div>

                    {/* Difficulty Chip */}
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 700, padding: '3px 8px',
                      borderRadius: 'var(--radius-pill)',
                      background: diffStyle.bg, color: diffStyle.color,
                      textTransform: 'uppercase', letterSpacing: '0.04em',
                    }}>
                      {level.difficulty}
                    </span>
                  </div>
                </div>

                {/* Title & Desc */}
                <h3 style={{
                  fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em',
                  color: isUnlocked ? '#000' : 'var(--text-muted)', marginBottom: 6,
                }}>
                  {level.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16 }}>
                  {level.description}
                </p>
              </div>

              {/* Footer */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Zap size={13} color="var(--accent-orange)" /> +{level.xpReward} XP
                  </span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    {level.category}
                  </span>
                </div>

                {isUnlocked ? (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => onSelectLevel(level)}>
                      <Play size={14} /> Visualize
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => onStartQuiz(level)}>
                      Quiz
                    </button>
                  </div>
                ) : (
                  <div style={{
                    padding: '8px 14px', background: 'var(--bg-grey)', borderRadius: 'var(--radius-pill)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600,
                  }}>
                    <Lock size={14} /> Complete Level {level.levelNumber - 1}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
