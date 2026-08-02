import React, { useState } from 'react';
import { LeaderboardEntry, UserProgress } from '../../types';
import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardProps {
  userProgress: UserProgress;
  onUpdateUsername: (name: string) => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ userProgress, onUpdateUsername }) => {
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(userProgress.username || 'Student');

  // Simulated leaderboard (local + sample data)
  const totalStars = Object.values(userProgress.starsPerLevel).reduce((a, b) => a + b, 0);

  const entries: LeaderboardEntry[] = [
    { username: userProgress.username || 'Student', xp: userProgress.xp, rank: 0, stars: totalStars },
    { username: 'AlgoMaster', xp: 1200, rank: 0, stars: 28 },
    { username: 'TreeWizard', xp: 980, rank: 0, stars: 22 },
    { username: 'DPKnight', xp: 750, rank: 0, stars: 18 },
    { username: 'GraphRunner', xp: 600, rank: 0, stars: 14 },
    { username: 'CodeNewbie', xp: 200, rank: 0, stars: 5 },
  ].sort((a, b) => b.xp - a.xp).map((e, i) => ({ ...e, rank: i + 1 }));

  const RANK_ICON: Record<number, React.ReactNode> = {
    1: <Trophy size={20} color="var(--accent-gold)" />,
    2: <Medal size={20} color="#C0C0C0" />,
    3: <Award size={20} color="#CD7F32" />,
  };

  const handleSaveName = () => {
    onUpdateUsername(nameInput);
    setEditingName(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 16px' }}>
      <h2 className="section-title" style={{ marginBottom: 4 }}>Leaderboard</h2>
      <p className="section-subtitle" style={{ marginBottom: 20 }}>Compete for the top spot.</p>

      {/* Username Editor */}
      <div className="card-light" style={{ padding: 16, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '1rem' }}>
          {(userProgress.username || 'Y')[0].toUpperCase()}
        </div>
        {editingName ? (
          <div style={{ flex: 1, display: 'flex', gap: 8 }}>
            <input value={nameInput} onChange={e => setNameInput(e.target.value)} style={{ flex: 1 }} placeholder="Your name" />
            <button className="btn btn-primary btn-sm" onClick={handleSaveName}>Save</button>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{userProgress.username || 'Set your name'}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{userProgress.xp} XP • {totalStars} Stars</div>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => setEditingName(true)}>Edit</button>
          </div>
        )}
      </div>

      {/* Rankings */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {entries.map((entry) => {
          const isUser = entry.username === (userProgress.username || 'You');
          return (
            <div key={entry.rank}
              className={isUser ? 'card-black' : 'card-light'}
              style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}
            >
              {/* Rank */}
              <div style={{ width: 32, textAlign: 'center' }}>
                {RANK_ICON[entry.rank] || (
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: isUser ? '#fff' : 'var(--text-muted)' }}>{entry.rank}</span>
                )}
              </div>

              {/* Avatar */}
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: isUser ? 'var(--accent-gold)' : 'var(--bg-grey)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: isUser ? '#000' : 'var(--text-secondary)', fontWeight: 800, fontSize: '0.85rem',
              }}>
                {entry.username[0].toUpperCase()}
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{entry.username}</div>
                <div style={{ fontSize: '0.72rem', color: isUser ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)' }}>
                  {entry.stars} ★
                </div>
              </div>

              {/* XP */}
              <div style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em' }}>
                {entry.xp}
                <span style={{ fontSize: '0.65rem', fontWeight: 600, marginLeft: 3, color: isUser ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)' }}>XP</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
