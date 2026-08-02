import React, { useState, useEffect } from 'react';
import { TreeBalancePuzzle, LevelTopic } from '../../types';
import { TREE_BALANCE_PUZZLES } from '../../data/quizData';
import { TreeSvgCanvas } from '../Visualizer/TreeSvgCanvas';
import { applyRotationToTree, RotationResult, RotationType } from '../../algorithms/puzzleRotation';
import { fetchUserCompletions, recordCompletion } from '../../services/api';
import { CheckCircle2, XCircle, RefreshCw, Sparkles, Info, HelpCircle, RotateCcw, Wand2, Lock, PartyPopper } from 'lucide-react';

interface TreeBalanceGameProps {
  currentLevel?: LevelTopic;
  userId?: string;
}

const ROTATION_GUIDE = [
  { rot: 'LL' as const, name: 'Single Right Rotation', when: 'Left child is also left-heavy (BF > 0). One right rotation fixes it.' },
  { rot: 'RR' as const, name: 'Single Left Rotation', when: 'Right child is also right-heavy (BF < 0). One left rotation fixes it.' },
  { rot: 'LR' as const, name: 'Left-Right Double Rotation', when: 'Left child is right-heavy (BF < 0). Rotate left on the child, then right on the parent.' },
  { rot: 'RL' as const, name: 'Right-Left Double Rotation', when: 'Right child is left-heavy (BF > 0). Rotate right on the child, then left on the parent.' },
];

const LEGEND = [
  { color: 'var(--accent-red)', label: 'Unbalanced node (|BF| > 1)' },
  { color: 'var(--accent-amber)', label: 'Heavy child — shows which side caused it' },
  { color: 'var(--accent-green)', label: 'Balanced / newly inserted node' },
  { color: '#007AFF', label: 'Active / being examined' },
];

export const TreeBalanceGame: React.FC<TreeBalanceGameProps> = ({ currentLevel, userId }) => {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [selectedRotation, setSelectedRotation] = useState<RotationType | null>(null);
  const [applied, setApplied] = useState<RotationResult | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const levelPuzzles = currentLevel
    ? TREE_BALANCE_PUZZLES.filter(p => p.levelId === currentLevel.id)
    : [];
  const puzzles = levelPuzzles.length > 0 ? levelPuzzles : TREE_BALANCE_PUZZLES;
  const puzzle = puzzles[currentPuzzleIndex % puzzles.length] || TREE_BALANCE_PUZZLES[0];
  const target: RotationType = (puzzle.correctRotation || puzzle.targetRotation || 'LL') as RotationType;
  const isCompleted = completedIds.includes(puzzle.id);
  const completedCount = puzzles.filter(p => completedIds.includes(p.id)).length;
  const allCompleted = completedCount > 0 && completedCount === puzzles.length;

  const initialNodes = puzzle.initialTreeNodes || puzzle.unbalancedNodes || [];
  const initialEdges = puzzle.initialEdges || [];

  useEffect(() => {
    setCurrentPuzzleIndex(0);
    setSelectedRotation(null);
    setApplied(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
    if (userId) {
      fetchUserCompletions(userId, 'rotation').then(cs => {
        setCompletedIds(cs.map((c: any) => c.puzzleId));
      });
    }
  }, [currentLevel?.id, userId]);

  const resetRound = (nextIndex?: number) => {
    setSelectedRotation(null);
    setApplied(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
    if (nextIndex !== undefined) setCurrentPuzzleIndex(nextIndex);
  };

  const handleSelectRotation = (rot: RotationType) => {
    if (isSubmitted) return;
    setSelectedRotation(rot);
    setApplied(null);
    setShowHint(false);
  };

  const handleApplyRotation = () => {
    if (!selectedRotation) return;
    setApplied(applyRotationToTree(initialNodes, initialEdges, selectedRotation));
  };

  const handleSubmit = () => {
    if (!selectedRotation) return;
    // Recompute from the current selection: any rotation that actually
    // balances the tree is correct (e.g. on a pure left chain, LL and LR
    // both produce the same balanced tree).
    const result = applyRotationToTree(initialNodes, initialEdges, selectedRotation);
    setIsSubmitted(true);
    const correct = result.balanced;
    setIsCorrect(correct);
    if (correct && userId) {
      recordCompletion(userId, puzzle.id, 'rotation').then(() => {
        setCompletedIds(prev => (prev.includes(puzzle.id) ? prev : [...prev, puzzle.id]));
      });
    }
    if (!correct) setShakeKey(k => k + 1);
  };

  const handleNextPuzzle = () => {
    setShowGuide(false);
    let next = (currentPuzzleIndex + 1) % puzzles.length;
    if (allCompleted) return;
    const firstIncomplete = puzzles.findIndex((p, i) => i > currentPuzzleIndex && !completedIds.includes(p.id));
    const wrapIncomplete = puzzles.findIndex(p => !completedIds.includes(p.id));
    if (firstIncomplete !== -1) next = firstIncomplete;
    else if (wrapIncomplete !== -1) next = wrapIncomplete;
    resetRound(next);
  };

  const currentNodes = applied ? applied.nodes : initialNodes;
  const currentEdges = applied ? applied.edges : initialEdges;

  return (
    <div className="card-light" style={{ padding: 24, borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden' }}>
      {/* Animated top accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #FF3B30, #FF9500, #FFCC00, #34C759, #007AFF)', backgroundSize: '300% 100%', animation: 'gradient-slide 6s linear infinite' }} />

      {allCompleted ? (
        <div className="fade-in-up" style={{ textAlign: 'center', padding: '28px 16px' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%', margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #FFCC00, #FF9500)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 24px rgba(255,204,0,0.5)',
          }}>
            <PartyPopper size={36} color="#000" />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: 6 }}>All Rotation Puzzles Completed!</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto 18px' }}>
            You mastered all {puzzles.length} rotation puzzles in this arena. New puzzles are being prepared —
            check back later for the next challenge.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            {puzzles.map(p => (
              <span key={p.id} style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--accent-green)' }} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-red)', textTransform: 'uppercase', marginBottom: 6 }}>
            <Sparkles size={14} /> INTERACTIVE TREE ROTATION PUZZLE • {puzzle.id.replace('puzzle-', 'PUZZLE ')}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: 8, color: '#000000' }}>
              {puzzle.title}
            </h3>
            <span style={{
              fontSize: '0.75rem', fontWeight: 800, background: '#000', color: '#fff',
              padding: '5px 12px', borderRadius: 100, whiteSpace: 'nowrap'
            }}>
              {completedCount} / {puzzles.length} solved
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
            {puzzle.description || puzzle.explanation}
          </p>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14 }}>
            {puzzles.map((p, i) => {
              const done = completedIds.includes(p.id);
              const active = i === currentPuzzleIndex;
              return (
                <button
                  key={p.id}
                  onClick={() => { if (!done && !isSubmitted) resetRound(i); }}
                  aria-label={`Puzzle ${i + 1}`}
                  style={{
                    width: 14, height: 14, borderRadius: '50%', padding: 0, cursor: done || isSubmitted ? 'default' : 'pointer',
                    background: active ? '#000000' : (done ? 'var(--accent-green)' : 'var(--bg-light)'),
                    border: active ? 'none' : `1.5px solid ${done ? 'var(--accent-green)' : 'var(--border-hairline)'}`,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.25s ease'
                  }}
                />
              );
            })}
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', marginLeft: 4 }}>
              {currentPuzzleIndex + 1} / {puzzles.length}
            </span>
          </div>

          {/* How to solve */}
          <div style={{ marginBottom: 14 }}>
            <button
              onClick={() => setShowGuide(g => !g)}
              style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.78rem', fontWeight: 800, color: '#007AFF', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5, textDecoration: 'underline' }}
            >
              <HelpCircle size={14} /> {showGuide ? 'Hide' : 'How to solve'} — rotation guide
            </button>
            {showGuide && (
              <div style={{ marginTop: 8, padding: '12px 14px', background: 'rgba(0,122,255,0.06)', border: '1px solid rgba(0,122,255,0.18)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 8 }}>
                  {ROTATION_GUIDE.map(g => (
                    <div key={g.rot} style={{ fontSize: '0.78rem', lineHeight: 1.45, color: 'var(--text-secondary)' }}>
                      <strong style={{ color: '#000000', fontFamily: 'var(--font-code)' }}>{g.rot}</strong> — {g.name}: {g.when}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Color legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 14, padding: '10px 14px', background: 'var(--bg-light)', borderRadius: 'var(--radius-md)' }}>
            {LEGEND.map(item => (
              <span key={item.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: item.color, display: 'inline-block' }} />
                {item.label}
              </span>
            ))}
          </div>

          {levelPuzzles.length === 0 && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', marginBottom: 14,
              background: 'rgba(0,122,255,0.08)', border: '1px solid rgba(0,122,255,0.2)',
              borderRadius: 'var(--radius-md)', fontSize: '0.82rem', color: '#007AFF', fontWeight: 600,
            }}>
              <Info size={15} />
              Rotation puzzles are for AVL Tree levels. Showing the full AVL puzzle set here.
            </div>
          )}

          {/* Completed banner for this puzzle */}
          {isCompleted && !isSubmitted && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', marginBottom: 14,
              background: 'rgba(52,199,89,0.1)', border: '1px solid rgba(52,199,89,0.35)',
              borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: '#1B7F37', fontWeight: 700,
            }}>
              <Lock size={15} /> Solved — locked permanently. Move to the next puzzle to keep earning.
            </div>
          )}

          {/* Canvases: current state + expected result */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 10, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 260px', minWidth: 240, opacity: isCompleted && !isSubmitted ? 0.55 : 1 }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: applied ? '#007AFF' : 'var(--accent-red)', marginBottom: 4 }}>
                {isCompleted && !isSubmitted ? '✓ Solved tree' : (applied ? '↻ After your rotation' : '⚠ Unbalanced tree')}
              </div>
              <div key={`canvas-${puzzle.id}-${applied ? applied.rootValue : 'init'}-${shakeKey}`}
                className={isSubmitted && !isCorrect ? 'shake-wrong' : undefined}
                style={{ height: 240, overflow: 'hidden' }}>
                <TreeSvgCanvas nodes={isCompleted && !isSubmitted ? puzzle.rotatedTreeNodes || initialNodes : currentNodes}
                  edges={isCompleted && !isSubmitted ? puzzle.rotatedEdges || initialEdges : currentEdges}
                  minHeight={240} />
              </div>
              {applied && !isSubmitted && !isCompleted && (
                <div className="fade-in-up" style={{ marginTop: 6, textAlign: 'center' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 100,
                    fontSize: '0.78rem', fontWeight: 800,
                    background: applied.balanced ? 'rgba(52,199,89,0.12)' : 'rgba(255,59,48,0.1)',
                    color: applied.balanced ? 'var(--accent-green)' : 'var(--accent-red)',
                    border: `1px solid ${applied.balanced ? 'rgba(52,199,89,0.4)' : 'rgba(255,59,48,0.35)'}`
                  }}>
                    {applied.balanced ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                    {applied.balanced ? 'Tree is balanced after this rotation!' : `Still unbalanced — ${selectedRotation} alone doesn\u2019t fix it`}
                  </span>
                </div>
              )}
            </div>
            {isSubmitted && (
              <div style={{ flex: '1 1 260px', minWidth: 240 }} className="fade-in-up">
                <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: isCorrect ? 'var(--accent-green)' : 'var(--accent-amber)', marginBottom: 4 }}>
                  {isCorrect ? '✓ Balanced after rotation' : '✗ Expected result'}
                </div>
                <div style={{ height: 240, overflow: 'hidden' }}>
                  <TreeSvgCanvas
                    nodes={puzzle.rotatedTreeNodes || puzzle.initialTreeNodes || []}
                    edges={puzzle.rotatedEdges || puzzle.initialEdges || []}
                    minHeight={240}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Hint */}
          {!isSubmitted && !isCompleted && (
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
              <button
                onClick={() => setShowHint(h => !h)}
                style={{ background: 'none', border: 'none', fontSize: '0.78rem', fontWeight: 800, color: '#007AFF', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5, textDecoration: 'underline' }}
              >
                <HelpCircle size={14} /> {showHint ? 'Hide hint' : 'Need a hint?'}
              </button>
              {showHint && puzzle.hint && (
                <p className="fade-in-up" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: 560, margin: '8px auto 0', background: 'rgba(255,204,0,0.1)', border: '1px solid rgba(255,204,0,0.35)', padding: '10px 14px', borderRadius: 'var(--radius-md)' }}>
                  💡 {puzzle.hint}
                </p>
              )}
            </div>
          )}

          {/* Rotation Option Pills + Apply */}
          {!isCompleted && (
            <div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 10, alignItems: 'center' }}>
                {(['LL', 'RR', 'LR', 'RL'] as const).map(rot => (
                <button
                  key={rot}
                  onClick={() => handleSelectRotation(rot)}
                  disabled={isSubmitted}
                  style={{
                    padding: '10px 24px', borderRadius: '100px', fontSize: '0.9rem', fontWeight: 800,
                    background: selectedRotation === rot ? '#000000' : 'var(--bg-light)',
                    color: selectedRotation === rot ? '#FFFFFF' : '#000000',
                    border: selectedRotation === rot ? '2px solid #000000' : '1.5px solid var(--border-hairline)',
                    cursor: isSubmitted ? 'default' : 'pointer', fontFamily: 'var(--font-code)', transition: 'all 0.2s ease',
                    opacity: isSubmitted ? (rot === target ? 1 : 0.45) : 1,
                    boxShadow: selectedRotation === rot ? '0 4px 14px rgba(0,0,0,0.15)' : 'none',
                  }}
                >
                  {rot} Rotation
                </button>
              ))}
              </div>
              <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 12 }}>
                Any rotation that balances the tree is accepted — Apply Rotation previews the result first.
              </p>
            </div>
          )}

          {/* Submit / Feedback */}
          <div style={{ textAlign: 'center' }}>
            {isCompleted && !isSubmitted ? (
              <button className="btn btn-primary" onClick={handleNextPuzzle} style={{ gap: 6 }}>
                {allCompleted ? 'Finish' : 'Next Puzzle'} <RefreshCw size={14} />
              </button>
            ) : !isSubmitted ? (
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-secondary" onClick={handleApplyRotation} disabled={!selectedRotation} style={{ gap: 6 }}>
                  <Wand2 size={15} /> Apply Rotation
                </button>
                <button className="btn btn-primary" onClick={handleSubmit} disabled={!selectedRotation}>
                  Submit Balance Fix
                </button>
              </div>
            ) : (
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: '100px',
                  background: isCorrect ? 'var(--accent-green)' : 'var(--accent-red)', color: '#FFFFFF',
                  fontWeight: 800, fontSize: '0.9rem', marginBottom: 10
                }}>
                  {isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                  {isCorrect ? 'Correct! The tree is balanced — puzzle solved.' : `Not quite — that rotation didn't balance the tree. Expected ${target}.`}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: 520, margin: '0 auto 12px' }}>
                  {puzzle.explanation}
                </p>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {!isCorrect && (
                    <button className="btn btn-secondary" onClick={() => resetRound()}>
                      <RotateCcw size={14} style={{ marginRight: 4 }} /> Try Again
                    </button>
                  )}
                  <button className="btn btn-primary" onClick={handleNextPuzzle}>
                    {isCorrect ? (allCompleted ? 'Finish' : 'Next Puzzle') : 'Skip'} <RefreshCw size={14} style={{ marginLeft: 4 }} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
