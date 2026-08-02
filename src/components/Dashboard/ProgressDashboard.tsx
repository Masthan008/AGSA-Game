import React from 'react';
import { UserProgress } from '../../types';
import { LEVEL_TOPICS } from '../../data/levelsData';
import { Trophy, Star, Zap, Flame, Award, CheckCircle2, ChevronRight, Layers, Sparkles } from 'lucide-react';

interface ProgressDashboardProps {
  userProgress: UserProgress;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ userProgress }) => {
  const totalStars = Object.values(userProgress.starsPerLevel).reduce((a, b) => a + b, 0);
  const maxPossibleStars = LEVEL_TOPICS.length * 3;
  const progressPercent = Math.min(Math.round((userProgress.completedLevels.length / LEVEL_TOPICS.length) * 100), 100);

  // SVG Ring Math
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  // Category counts & ring data
  const categories = [
    { name: 'Trees', label: 'Trees & BSTs', color: 'var(--accent-red)' },
    { name: 'Graphs', label: 'Graph Paths', color: 'var(--accent-blue)' },
    { name: 'DynamicProgramming', label: 'Dynamic Prog', color: 'var(--accent-green)' },
    { name: 'StringAndTrie', label: 'Strings & Trie', color: 'var(--accent-gold)' },
    { name: 'AdvancedSets', label: 'Advanced Sets', color: '#9B51E0' },
  ];

  const categoryStats = categories.map(cat => {
    const total = LEVEL_TOPICS.filter(l => l.category === cat.name).length;
    const completed = LEVEL_TOPICS.filter(l => l.category === cat.name && userProgress.completedLevels.includes(l.id)).length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { ...cat, total, completed, pct };
  });

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 16px' }}>
      {/* Hero Master Summary Card */}
      <div className="card-black" style={{ padding: 28, marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4, display: 'inline-block' }}>
              REAL-TIME PROGRESS DASHBOARD
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              {userProgress.username || 'Student'}'s Learning Hub
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: 6 }}>
              Completed {userProgress.completedLevels.length} of 30 Advanced Algorithm Topics
            </p>
          </div>

          {/* Master SVG Progress Ring */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ position: 'relative', width: 120, height: 120 }}>
              <svg width="120" height="120" viewBox="0 0 130 130" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="65" cy="65" r={radius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
                <circle
                  cx="65" cy="65" r={radius} fill="none" stroke="var(--accent-gold)" strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>{progressPercent}%</span>
                <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase' }}>Done</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 24 }}>
        <div className="card-light" style={{ textAlign: 'center', padding: 20 }}>
          <Zap size={24} color="var(--accent-gold)" style={{ marginBottom: 8 }} />
          <div className="stat-value">{userProgress.xp}</div>
          <div className="stat-label">Total XP</div>
        </div>

        <div className="card-light" style={{ textAlign: 'center', padding: 20 }}>
          <Star size={24} color="var(--accent-gold)" fill="var(--accent-gold)" style={{ marginBottom: 8 }} />
          <div className="stat-value">{totalStars} / {maxPossibleStars}</div>
          <div className="stat-label">Stars Collected</div>
        </div>

        <div className="card-light" style={{ textAlign: 'center', padding: 20 }}>
          <Flame size={24} color="var(--accent-red)" style={{ marginBottom: 8 }} />
          <div className="stat-value">{userProgress.streakDays} Days</div>
          <div className="stat-label">Daily Streak</div>
        </div>

        <div className="card-light" style={{ textAlign: 'center', padding: 20 }}>
          <Trophy size={24} color="var(--accent-green)" style={{ marginBottom: 8 }} />
          <div className="stat-value">Rank {Math.floor(userProgress.xp / 500) + 1}</div>
          <div className="stat-label">Mastery Rank</div>
        </div>
      </div>

      {/* 5 Topic Category SVG Circular Progress Rings Section */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.02em' }}>
        Topic Category Breakdown (5 SVG Circular Rings)
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 28 }}>
        {categoryStats.map(cs => {
          const cR = 36;
          const cCirc = 2 * Math.PI * cR;
          const cOffset = cCirc - (cs.pct / 100) * cCirc;

          return (
            <div key={cs.name} className="card-light" style={{ padding: 18, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: 90, height: 90, marginBottom: 10 }}>
                <svg width="90" height="90" viewBox="0 0 90 90" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="45" cy="45" r={cR} fill="none" stroke="var(--bg-grey)" strokeWidth="7" />
                  <circle
                    cx="45" cy="45" r={cR} fill="none" stroke={cs.color} strokeWidth="7"
                    strokeDasharray={cCirc}
                    strokeDashoffset={cOffset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                  />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 900, color: '#000000' }}>{cs.pct}%</span>
                </div>
              </div>

              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#000000', marginBottom: 2 }}>
                {cs.label}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                {cs.completed} of {cs.total} Solved
              </span>
            </div>
          );
        })}
      </div>

      {/* 30 Levels Mastery Grid */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.02em' }}>
        30 Level Campaign Status
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10 }}>
        {LEVEL_TOPICS.map((level) => {
          const stars = userProgress.starsPerLevel[level.id] || 0;
          const isDone = userProgress.completedLevels.includes(level.id);
          const isUnlocked = level.levelNumber <= userProgress.levelUnlocked;

          return (
            <div
              key={level.id}
              className={isDone ? 'card-black' : isUnlocked ? 'card-light' : 'card-grey'}
              style={{
                padding: 12,
                borderRadius: 'var(--radius-md)',
                opacity: isUnlocked ? 1 : 0.6,
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: isDone ? 'var(--accent-gold)' : 'var(--text-muted)' }}>
                L{level.levelNumber}
              </div>
              <div style={{
                fontSize: '0.82rem', fontWeight: 700,
                color: isDone ? '#FFFFFF' : isUnlocked ? '#000000' : 'var(--text-muted)',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
              }}>
                {level.title.split(' ')[0]}
              </div>

              {/* Star Rating */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 6 }}>
                {[1, 2, 3].map(s => (
                  <Star
                    key={s}
                    size={11}
                    color={s <= stars ? 'var(--accent-gold)' : 'rgba(150,150,150,0.3)'}
                    fill={s <= stars ? 'var(--accent-gold)' : 'transparent'}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
