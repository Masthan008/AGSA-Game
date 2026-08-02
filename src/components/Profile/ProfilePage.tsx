import React from 'react';
import { UserProgress } from '../../types';
import { User, Shield, Trophy, Star, Zap, Flame, RotateCcw, Award, CheckCircle2 } from 'lucide-react';

interface ProfilePageProps {
  userProgress: UserProgress;
  onOpenAuthModal: () => void;
  onResetProgress: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ userProgress, onOpenAuthModal, onResetProgress }) => {
  const totalStars = Object.values(userProgress.starsPerLevel).reduce((a, b) => a + b, 0);

  return (
    <div style={{ maxWidth: 750, margin: '0 auto', padding: '24px 16px' }}>
      {/* Account Hero Header */}
      <div className="card-black" style={{ padding: 28, marginBottom: 24, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'var(--accent-gold)',
            color: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: '1.8rem'
          }}>
            {(userProgress.username || 'S')[0].toUpperCase()}
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              AUTHENTICATED USER
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
              {userProgress.username || 'Student'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: 2 }}>
              Rank {Math.floor(userProgress.xp / 500) + 1} • {userProgress.xp} XP • {totalStars} Stars Earned
            </p>
          </div>
        </div>

        <button
          className="btn"
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            background: 'rgba(255, 255, 255, 0.15)',
            color: '#FFFFFF',
            fontSize: '0.8rem',
            padding: '6px 14px',
            minHeight: 32
          }}
          onClick={onOpenAuthModal}
        >
          <Shield size={14} /> Account / Sign In
        </button>
      </div>

      {/* Stats Summary Grid */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.02em' }}>
        Account Learning Statistics
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 28 }}>
        <div className="card-light" style={{ textAlign: 'center', padding: 20 }}>
          <Zap size={22} color="var(--accent-gold)" style={{ marginBottom: 8 }} />
          <div className="stat-value">{userProgress.xp}</div>
          <div className="stat-label">Total XP</div>
        </div>

        <div className="card-light" style={{ textAlign: 'center', padding: 20 }}>
          <Star size={22} color="var(--accent-gold)" fill="var(--accent-gold)" style={{ marginBottom: 8 }} />
          <div className="stat-value">{totalStars}</div>
          <div className="stat-label">Stars Earned</div>
        </div>

        <div className="card-light" style={{ textAlign: 'center', padding: 20 }}>
          <Flame size={22} color="var(--accent-red)" style={{ marginBottom: 8 }} />
          <div className="stat-value">{userProgress.streakDays}</div>
          <div className="stat-label">Day Streak</div>
        </div>

        <div className="card-light" style={{ textAlign: 'center', padding: 20 }}>
          <Trophy size={22} color="var(--accent-green)" style={{ marginBottom: 8 }} />
          <div className="stat-value">{userProgress.completedLevels.length} / 20</div>
          <div className="stat-label">Levels Solved</div>
        </div>
      </div>

      {/* Badges Collection */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.02em' }}>
        Earned Achievements
      </h3>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
        {userProgress.badges.length === 0 ? (
          <div className="card-grey" style={{ width: '100%', padding: 20, textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Complete levels in Campaign Mode to earn achievement badges!
          </div>
        ) : (
          userProgress.badges.map((b, idx) => (
            <div key={idx} className="card-light" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px' }}>
              <Award size={18} color="var(--accent-gold)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#000000' }}>{b}</span>
            </div>
          ))
        )}
      </div>

      {/* Danger Zone / Reset */}
      <div className="card-light" style={{ padding: 20, border: '1.5px solid rgba(255, 59, 48, 0.2)' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-red)', marginBottom: 4 }}>
          Danger Zone
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 14 }}>
          Reset local progress, level stars, and local database cache.
        </p>
        <button className="btn btn-danger" onClick={onResetProgress}>
          <RotateCcw size={16} /> Reset All Learning Progress
        </button>
      </div>
    </div>
  );
};
