import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface ControlBarProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  playbackSpeed: number;
  onPlayPause: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  currentStep, totalSteps, isPlaying, playbackSpeed,
  onPlayPause, onStepBack, onStepForward, onReset, onSpeedChange,
}) => {
  return (
    <div className="card-light" style={{
      padding: '12px 20px', marginTop: 12,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
    }}>
      {/* Playback */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <button className="btn btn-secondary btn-icon btn-sm" onClick={onReset} title="Reset">
          <RotateCcw size={16} />
        </button>
        <button className="btn btn-secondary btn-icon btn-sm" onClick={onStepBack}
          disabled={currentStep <= 1} style={{ opacity: currentStep <= 1 ? 0.3 : 1 }} title="Back">
          <SkipBack size={16} />
        </button>
        <button className="btn btn-primary" onClick={onPlayPause} style={{ minWidth: 100, gap: 6 }}>
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button className="btn btn-secondary btn-icon btn-sm" onClick={onStepForward}
          disabled={currentStep >= totalSteps} style={{ opacity: currentStep >= totalSteps ? 0.3 : 1 }} title="Forward">
          <SkipForward size={16} />
        </button>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          <strong style={{ color: '#000' }}>{currentStep}</strong> / {totalSteps}
        </span>
        <div style={{ width: 120, height: 6, background: 'var(--bg-grey)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{
            width: `${totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0}%`,
            height: '100%', background: '#000', borderRadius: 3, transition: 'width 0.2s ease',
          }} />
        </div>
      </div>

      {/* Speed */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginRight: 4 }}>Speed</span>
        {[0.5, 1, 2, 3].map(spd => (
          <button key={spd} style={{
            padding: '3px 8px', borderRadius: 'var(--radius-pill)', fontSize: '0.72rem', fontWeight: 700,
            background: playbackSpeed === spd ? '#000' : 'var(--bg-light)',
            color: playbackSpeed === spd ? '#fff' : 'var(--text-secondary)',
            border: 'none', cursor: 'pointer', fontFamily: 'var(--font-main)',
          }} onClick={() => onSpeedChange(spd)}>
            {spd}×
          </button>
        ))}
      </div>
    </div>
  );
};
