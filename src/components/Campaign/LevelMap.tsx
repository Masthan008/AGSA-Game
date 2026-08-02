import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LevelTopic, UserProgress } from '../../types';
import { LEVEL_TOPICS } from '../../data/levelsData';
import {
  Lock, Star, Play, Zap, Search, LayoutGrid, Map, CheckCircle2,
  Crown, Medal, Rocket, Trophy, X, Sparkles, Flame, Swords,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LevelMapProps {
  userProgress: UserProgress;
  onSelectLevel: (level: LevelTopic) => void;
  onStartQuiz: (level: LevelTopic) => void;
}

const CATEGORY_META: Record<string, { color: string; label: string }> = {
  Trees: { color: '#FF3B30', label: 'Trees' },
  Graphs: { color: '#007AFF', label: 'Graphs' },
  DynamicProgramming: { color: '#34C759', label: 'Dynamic Programming' },
  StringAndTrie: { color: '#FFB800', label: 'Strings & Trie' },
  AdvancedSets: { color: '#9B51E0', label: 'Advanced' },
};

const DIFFICULTY_CHIP: Record<string, { bg: string; color: string }> = {
  Beginner: { bg: 'rgba(52,199,89,0.12)', color: '#1F9A46' },
  Easy: { bg: 'rgba(52,199,89,0.12)', color: '#1F9A46' },
  Intermediate: { bg: 'rgba(0,122,255,0.12)', color: '#0A6FE0' },
  Medium: { bg: 'rgba(0,122,255,0.12)', color: '#0A6FE0' },
  Advanced: { bg: 'rgba(255,149,0,0.12)', color: '#E08600' },
  Hard: { bg: 'rgba(255,149,0,0.12)', color: '#E08600' },
  Master: { bg: 'rgba(255,59,48,0.12)', color: '#E02E24' },
};

const RANKS = [
  { min: 0, name: 'Rookie', icon: 'seed' },
  { min: 300, name: 'Apprentice', icon: 'flame' },
  { min: 800, name: 'Explorer', icon: 'compass' },
  { min: 1500, name: 'Strategist', icon: 'swords' },
  { min: 2500, name: 'Master', icon: 'trophy' },
  { min: 4000, name: 'Algo Legend', icon: 'crown' },
];

const RANK_ICON: Record<string, React.ReactNode> = {
  seed: <Sparkles size={18} color="#FFD700" />,
  flame: <Flame size={18} color="#FF9500" />,
  compass: <Zap size={18} color="#007AFF" />,
  swords: <Swords size={18} color="#9B51E0" />,
  trophy: <Trophy size={18} color="#FFD700" />,
  crown: <Crown size={18} color="#FFD700" />,
};

const PATH_X = [150, 500, 850];
const PATH_ROW_H = 240;
const PATH_Y0 = 130;
const NODE_R = 34;

function pathPosition(index: number): { x: number; y: number } {
  const row = Math.floor(index / 3);
  const colPos = index % 3;
  const col = row % 2 === 0 ? colPos : 2 - colPos;
  return { x: PATH_X[col], y: PATH_Y0 + row * PATH_ROW_H };
}

function buildPathD(count: number): string {
  const pts = Array.from({ length: count }, (_, i) => pathPosition(i));
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const cx = (a.x + b.x) / 2;
    d += ` C ${cx} ${a.y}, ${cx} ${b.y}, ${b.x} ${b.y}`;
  }
  return d;
}

const xpForLevel = (l: LevelTopic) => l.xpReward ?? (l.estimatedMinutes ?? 5) * 10;

export const LevelMap: React.FC<LevelMapProps> = ({ userProgress, onSelectLevel, onStartQuiz }) => {
  const [view, setView] = useState<'path' | 'grid'>('path');
  const [category, setCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [xpAnimated, setXpAnimated] = useState(false);
  const [selectedNode, setSelectedNode] = useState<LevelTopic | null>(null);
  const [celebration, setCelebration] = useState<LevelTopic | null>(null);
  const prevCompletedRef = useRef<string[]>(userProgress.completedLevels);

  useEffect(() => {
    const t = setTimeout(() => setXpAnimated(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const prev = prevCompletedRef.current;
    const fresh = userProgress.completedLevels.filter(id => !prev.includes(id));
    if (fresh.length > 0) {
      const lvl = LEVEL_TOPICS.find(l => l.id === fresh[fresh.length - 1]);
      if (lvl) {
        setCelebration(lvl);
        confetti({ particleCount: 160, spread: 100, origin: { y: 0.55 } });
        setTimeout(() => confetti({ particleCount: 90, spread: 70, origin: { y: 0.4 } }), 400);
        const close = setTimeout(() => setCelebration(null), 3800);
        return () => clearTimeout(close);
      }
    }
    prevCompletedRef.current = userProgress.completedLevels;
  }, [userProgress.completedLevels]);

  const rank = useMemo(() => {
    const xp = userProgress.xp;
    let cur = RANKS[0];
    let next: (typeof RANKS)[0] | null = null;
    for (let i = 0; i < RANKS.length; i++) {
      if (xp >= RANKS[i].min) { cur = RANKS[i]; next = RANKS[i + 1] || null; }
    }
    const span = next ? next.min - cur.min : 1;
    const progress = next ? Math.min(1, (xp - cur.min) / span) : 1;
    return { cur, next, progress, xp };
  }, [userProgress.xp]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return LEVEL_TOPICS.filter(l => {
      const catOk = category === 'All' || l.category === category;
      const searchOk = q === '' || l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q);
      return catOk && searchOk;
    });
  }, [category, search]);

  const activeIds = useMemo(() => new Set(filtered.map(l => l.id)), [filtered]);
  const pathD = useMemo(() => buildPathD(LEVEL_TOPICS.length), []);
  const totalXp = userProgress.xp;
  const completedCount = userProgress.completedLevels.length;
  const pathH = PATH_Y0 + Math.ceil(LEVEL_TOPICS.length / 3) * PATH_ROW_H + 140;

  const catColor = (c: string) => CATEGORY_META[c]?.color || '#8E8E93';

  const renderLevelState = (level: LevelTopic) => {
    const isUnlocked = level.levelNumber <= userProgress.levelUnlocked;
    const isCompleted = userProgress.completedLevels.includes(level.id);
    const stars = userProgress.starsPerLevel[level.id] || 0;
    if (isCompleted) return { tag: 'done' as const, isUnlocked, isCompleted, stars };
    if (isUnlocked) return { tag: 'open' as const, isUnlocked, isCompleted, stars };
    return { tag: 'locked' as const, isUnlocked, isCompleted, stars };
  };

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 16px' }}>
      {/* ================= HERO + XP PROGRESS ================= */}
      <div className="cmp-hero">
        <div className="cmp-hero-orb cmp-hero-orb-a" />
        <div className="cmp-hero-orb cmp-hero-orb-b" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="cmp-eyebrow">CAMPAIGN MODE</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#fff', margin: '4px 0 6px' }}>
            Master ADSA<br />Level by Level
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', maxWidth: 560, marginBottom: 18 }}>
            {LEVEL_TOPICS.length} progressive levels across Trees, Graphs, Dynamic Programming, Strings & Advanced sets.
            Watch pin-to-pin animations, study multi-language code, and earn stars.
          </p>

          <div className="cmp-xpbar-wrap">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, gap: 10, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="cmp-rank-badge">{RANK_ICON[rank.cur.icon] || <Medal size={16} />}</span>
                <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>{rank.cur.name}</span>
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>
                  {completedCount} / {LEVEL_TOPICS.length} levels cleared
                </span>
              </div>
              <span style={{ fontWeight: 800, color: '#FFD700', fontSize: '0.95rem' }}>
                {rank.next ? `${totalXp} / ${rank.next.min} XP` : `${totalXp} XP • Max Rank!`}
              </span>
            </div>
            <div className="cmp-xpbar">
              <div
                className="cmp-xpbar-fill"
                style={{
                  width: xpAnimated ? `${rank.progress * 100}%` : '0%',
                  background: `linear-gradient(90deg, #FFD700, #FF9500${rank.progress === 1 ? ', #FF3B30' : ''})`,
                }}
              >
                <span className="cmp-xpbar-shimmer" />
              </div>
            </div>
            {rank.next && (
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: 6, fontWeight: 600 }}>
                <Rocket size={11} style={{ verticalAlign: '-2px', marginRight: 4 }} />
                {rank.next.min - rank.xp} XP until <b style={{ color: 'rgba(255,255,255,0.85)' }}>{rank.next.name}</b>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= CONTROLS ================= */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', background: 'var(--bg-light)', padding: 4, borderRadius: 'var(--radius-pill)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)' }}>
          <button
            className="btn btn-sm cmp-view-btn"
            style={view === 'path' ? { background: '#000', color: '#fff', border: 'none', gap: 6 } : { border: 'none', gap: 6 }}
            onClick={() => setView('path')}
          >
            <Map size={14} /> Path Map
          </button>
          <button
            className="btn btn-sm cmp-view-btn"
            style={view === 'grid' ? { background: '#000', color: '#fff', border: 'none', gap: 6 } : { border: 'none', gap: 6 }}
            onClick={() => setView('grid')}
          >
            <LayoutGrid size={14} /> Grid
          </button>
        </div>

        <div className="cmp-search">
          <Search size={14} style={{ flexShrink: 0 }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search levels…"
            style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.85rem', fontWeight: 600, width: 150, fontFamily: 'var(--font-main)' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['All', 'Trees', 'Graphs', 'DynamicProgramming', 'StringAndTrie', 'AdvancedSets'].map(c => (
            <button
              key={c}
              className="cmp-chip"
              onClick={() => setCategory(c)}
              style={{
                background: category === c ? catColor(c) : 'var(--bg-light)',
                color: category === c ? '#fff' : 'var(--text-secondary)',
                boxShadow: category === c ? `0 4px 14px ${catColor(c)}55` : 'none',
              }}
            >
              {category === c && <CheckCircle2 size={12} />}
              {CATEGORY_META[c]?.label || 'All Topics'}
            </button>
          ))}
        </div>
      </div>

      {/* ================= PATH MAP VIEW ================= */}
      {view === 'path' && (
        <div className="cmp-path-wrap fade-in-up">
          <svg viewBox={`0 0 1000 ${pathH}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
            <defs>
              <linearGradient id="cmpPathGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF3B30" />
                <stop offset="33%" stopColor="#FF9500" />
                <stop offset="66%" stopColor="#34C759" />
                <stop offset="100%" stopColor="#007AFF" />
              </linearGradient>
              <filter id="cmpNodeGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="cmpDoneGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34C759" />
                <stop offset="100%" stopColor="#1F9A46" />
              </linearGradient>
            </defs>

            <path d={pathD} fill="none" stroke="url(#cmpPathGrad)" strokeWidth={10} strokeLinecap="round" className="cmp-path-line" />

            {LEVEL_TOPICS.map((level, i) => {
              const { x, y } = pathPosition(i);
              const s = renderLevelState(level);
              const isMilestone = (level.levelNumber % 5 === 0) || level.levelNumber === LEVEL_TOPICS.length;
              const dimmed = !activeIds.has(level.id);
              const c = catColor(level.category);

              return (
                <g
                  key={level.id}
                  className="cmp-node-g"
                  opacity={dimmed ? 0.22 : 1}
                  style={{ cursor: s.isUnlocked ? 'pointer' : 'not-allowed' }}
                  onClick={() => {
                    if (!s.isUnlocked) return;
                    setSelectedNode(level);
                  }}
                >
                  {s.isUnlocked && s.tag === 'open' && (
                    <circle cx={x} cy={y} r={NODE_R + 10} fill="none" stroke={c} strokeWidth={3} className="cmp-node-pulse" opacity={0.7} />
                  )}
                  {isMilestone && (
                    <circle cx={x} cy={y} r={NODE_R + 12} fill="none" stroke="rgba(255,215,0,0.55)" strokeWidth={2} strokeDasharray="4 5" className="cmp-milestone-ring" />
                  )}
                  <circle
                    cx={x} cy={y} r={NODE_R}
                    fill={s.tag === 'done' ? 'url(#cmpDoneGrad)' : s.tag === 'open' ? '#fff' : '#E9E9EE'}
                    stroke={s.tag === 'done' ? 'transparent' : s.tag === 'open' ? c : '#C7C7CE'}
                    strokeWidth={4}
                    filter={s.tag === 'done' ? 'url(#cmpNodeGlow)' : undefined}
                  />
                  {s.tag === 'done' ? (
                    <CheckCircle2 x={x - 11} y={y - 11} size={22} color="#fff" strokeWidth={3} />
                  ) : (
                    <text
                      x={x} y={y + 6}
                      textAnchor="middle"
                      fontSize={isMilestone ? 15 : 17}
                      fontWeight={800}
                      fill={s.tag === 'open' ? '#000' : '#9A9AA2'}
                    >
                      {level.levelNumber}
                    </text>
                  )}
                  {isMilestone && s.tag !== 'done' && (
                    <text x={x} y={y + NODE_R + 22} textAnchor="middle" fontSize={10} fontWeight={800} fill="#C8A600" letterSpacing={2}>
                      {s.tag === 'locked' ? '◆ MILESTONE' : '★ MILESTONE'}
                    </text>
                  )}
                  <title>{`${s.tag === 'locked' ? '🔒 ' : s.tag === 'done' ? '✅ ' : '▶ '}${level.levelNumber}. ${level.title} — ${level.description}`}</title>
                </g>
              );
            })}
          </svg>
        </div>
      )}

      {/* ================= GRID VIEW ================= */}
      {view === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {filtered.map((level, i) => {
            const s = renderLevelState(level);
            const diffStyle = DIFFICULTY_CHIP[level.difficulty] || DIFFICULTY_CHIP.Easy;
            const c = catColor(level.category);
            const xp = xpForLevel(level);

            return (
              <div
                key={level.id}
                className={s.isUnlocked ? 'card-light cmp-card' : 'card-grey cmp-card'}
                style={{
                  opacity: s.isUnlocked ? 1 : 0.55,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  animation: `cmp-fade-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) both`,
                  animationDelay: `${Math.min(i, 14) * 45}ms`,
                  borderTop: `4px solid ${c}`,
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.06em', color: s.isUnlocked ? '#000' : 'var(--text-light)', lineHeight: 1 }}>
                      {String(level.levelNumber).padStart(2, '0')}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {s.tag === 'done' && (
                        <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#34C759', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CheckCircle2 size={14} color="#fff" />
                        </span>
                      )}
                      <div style={{ display: 'flex', gap: 2 }}>
                        {[1, 2, 3].map(st => (
                          <Star key={st} size={16} fill={st <= s.stars ? 'var(--accent-gold)' : 'transparent'} color={st <= s.stars ? 'var(--accent-gold)' : 'var(--border-light)'} strokeWidth={st <= s.stars ? 0 : 1.5} />
                        ))}
                      </div>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '3px 8px', borderRadius: 'var(--radius-pill)', background: diffStyle.bg, color: diffStyle.color, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {level.difficulty}
                      </span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em', color: s.isUnlocked ? '#000' : 'var(--text-muted)', marginBottom: 6 }}>
                    {level.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16 }}>
                    {level.description}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Zap size={13} color="var(--accent-orange)" /> +{xp} XP
                    </span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, color: c }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block' }} />
                      {CATEGORY_META[level.category]?.label || level.category}
                    </span>
                  </div>

                  {s.isUnlocked ? (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => onSelectLevel(level)}>
                        <Play size={14} /> Visualize
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => onStartQuiz(level)}>
                        Quiz
                      </button>
                    </div>
                  ) : (
                    <div style={{ padding: '8px 14px', background: 'var(--bg-grey)', borderRadius: 'var(--radius-pill)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>
                      <Lock size={14} /> Complete Level {level.levelNumber - 1}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="card-light" style={{ gridColumn: '1 / -1', padding: 40, textAlign: 'center', color: 'var(--text-secondary)', fontWeight: 600 }}>
              No levels match your search.
            </div>
          )}
        </div>
      )}

      {/* ================= FLOATING LEVEL CARD ================= */}
      {selectedNode && (
        <>
          <div className="cmp-scrim" onClick={() => setSelectedNode(null)} />
          <div className="cmp-float-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
              <div>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em', color: catColor(selectedNode.category), textTransform: 'uppercase' }}>
                  Level {selectedNode.levelNumber} • {CATEGORY_META[selectedNode.category]?.label}
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '3px 0 4px' }}>{selectedNode.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{selectedNode.description}</p>
              </div>
              <button className="cmp-close" onClick={() => setSelectedNode(null)} aria-label="Close">
                <X size={16} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => { setSelectedNode(null); onSelectLevel(selectedNode); }}>
                <Play size={14} /> Visualize
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => { setSelectedNode(null); onStartQuiz(selectedNode); }}>
                Quiz
              </button>
            </div>
          </div>
        </>
      )}

      {/* ================= CELEBRATION OVERLAY ================= */}
      {celebration && (
        <div className="cmp-celebrate">
          <div className="cmp-celebrate-inner">
            <div className="cmp-celebrate-ring">
              <Trophy size={30} color="#000" />
            </div>
            <div style={{ marginTop: 14 }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', marginBottom: 4 }}>
                Level {celebration.levelNumber} Cleared!
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                {celebration.title}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 3, marginTop: 12 }}>
              {[1, 2, 3].map(s => (
                <Star key={s} size={22} fill="#FFD700" color="#FFD700" strokeWidth={0} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
