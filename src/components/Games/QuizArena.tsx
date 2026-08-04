import React, { useState, useEffect } from 'react';
import { QuizQuestion, LevelTopic } from '../../types';
import { QUIZ_QUESTIONS, getQuizQuestionsForLevel } from '../../data/quizData';
import { LEVEL_TOPICS } from '../../data/levelsData';
import { CheckCircle2, XCircle, RotateCcw, Lightbulb, Trophy, ListOrdered, Lock, PartyPopper, Zap, Target, GraduationCap } from 'lucide-react';
import { fetchUserCompletions, recordCompletion, removeCompletion } from '../../services/api';
import { TreeSvgCanvas } from '../Visualizer/TreeSvgCanvas';
import { LevelIntroFlow } from './LevelIntroFlow';
import confetti from 'canvas-confetti';

interface QuizArenaProps {
  currentLevel?: LevelTopic;
  userId?: string;
  levelUnlocked?: number;
  onCompleteQuiz: (earnedStars: number, earnedXp: number) => void;
  onBackToCampaign: () => void;
  onOpenVisualizer?: () => void;
  onOpenRotationGame?: () => void;
}

const TIER_META: Record<string, { label: string; color: string; bg: string }> = {
  beginner: { label: 'Beginner', color: '#34C759', bg: 'rgba(52,199,89,0.1)' },
  medium: { label: 'Medium', color: '#FF9500', bg: 'rgba(255,149,0,0.1)' },
  mastery: { label: 'Mastery', color: '#9B51E0', bg: 'rgba(155,81,224,0.1)' },
};

const TIER_ORDER = ['beginner', 'medium', 'mastery'];

const isGradedQuestion = (q: QuizQuestion) => TIER_ORDER.includes(q.difficulty || '');

export const QuizArena: React.FC<QuizArenaProps> = ({ currentLevel, userId, levelUnlocked, onCompleteQuiz, onBackToCampaign, onOpenVisualizer, onOpenRotationGame }) => {
  const unlockedLevels = LEVEL_TOPICS.filter(l => l.levelNumber <= (levelUnlocked ?? 1));
  const firstUnlockedId = unlockedLevels[0]?.id || LEVEL_TOPICS[0].id;
  const [topicId, setTopicId] = useState<string>(() => {
    if (currentLevel && currentLevel.levelNumber <= (levelUnlocked ?? 1)) return currentLevel.id;
    return firstUnlockedId;
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [justCompleted, setJustCompleted] = useState(false);
  const [earnedXpFlash, setEarnedXpFlash] = useState(0);
  const [introSeen, setIntroSeen] = useState(() => localStorage.getItem('adsa_arena_intro_seen_level1') === '1');

  const questions = getQuizQuestionsForLevel(topicId);
  const activeTopic = LEVEL_TOPICS.find(l => l.id === topicId) || LEVEL_TOPICS[0];
  const isGraded = questions.some(isGradedQuestion);
  const showIntro = activeTopic.id === 'level-1-avl' && isGraded && !introSeen && !quizFinished;

  useEffect(() => {
    const locked = LEVEL_TOPICS.find(l => l.id === topicId && l.levelNumber > (levelUnlocked ?? 1));
    if (locked) setTopicId(firstUnlockedId);
  }, [topicId, levelUnlocked, firstUnlockedId]);

  useEffect(() => {
    setLoading(true);
    setQuizFinished(false);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setJustCompleted(false);
    if (userId) {
      fetchUserCompletions(userId, 'quiz').then(cs => {
        setCompletedIds(cs.map((c: any) => c.puzzleId));
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [topicId, userId]);

  const completedSet = new Set(completedIds);
  const remaining = questions.filter(q => !completedSet.has(q.id));
  const allDone = questions.length > 0 && remaining.length === 0;
  const currentQ = remaining[currentIndex % remaining.length] || questions[0];
  const score = completedIds.filter(id => questions.some(q => q.id === id)).length;

  const handleTopicChange = (id: string) => setTopicId(id);

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQ.correctAnswerIndex && userId) {
      recordCompletion(userId, currentQ.id, 'quiz').then(() => {
        setCompletedIds(prev => (prev.includes(currentQ.id) ? prev : [...prev, currentQ.id]));
      });
      setJustCompleted(true);
      if (!completedSet.has(currentQ.id)) {
        setEarnedXpFlash(currentQ.xpReward || 0);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setEarnedXpFlash(0);
    const wasCorrect = justCompleted;
    setJustCompleted(false);
    const remainingAfter = questions.filter(q => {
      if (q.id === currentQ.id) return !wasCorrect;
      return !completedSet.has(q.id);
    });
    if (remainingAfter.length === 0) {
      setQuizFinished(true);
      const stars = 3;
      confetti({ particleCount: 140, spread: 90, origin: { y: 0.6 } });
      setTimeout(() => confetti({ particleCount: 80, spread: 60, origin: { y: 0.4 } }), 350);
      onCompleteQuiz(stars, 100);
      return;
    }
    setCurrentIndex(prev => (wasCorrect || !isGraded) ? (prev + 1) % remaining.length : prev);
  };

  const handleResetTopic = async () => {
    if (!userId) return;
    for (const id of completedIds) {
      await removeCompletion(userId, id);
    }
    setCompletedIds([]);
    setCurrentIndex(0);
    setQuizFinished(false);
  };

  if (loading) {
    return (
      <div className="card-light" style={{ maxWidth: 650, margin: '20px auto', padding: 40, textAlign: 'center' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid var(--bg-grey)', borderTopColor: '#000', margin: '0 auto 14px', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Loading your arena progress…</p>
      </div>
    );
  }

  if (showIntro) {
    return (
      <div>
        <div style={{ maxWidth: 780, margin: '14px auto 0', textAlign: 'center' }}>
          <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', margin: 0 }}>
            <GraduationCap size={13} style={{ verticalAlign: -2 }} /> Step 1: Learn AVL → Step 2: Practice or take the quiz — complete all 3 graded questions
            (Beginner → Medium → Mastery) to finish Level 1 and unlock Level 2.
          </p>
        </div>
        <LevelIntroFlow
          onOpenVisualizer={() => onOpenVisualizer && onOpenVisualizer()}
          onOpenRotationGame={() => {
            if (onOpenRotationGame) onOpenRotationGame();
            else document.getElementById('tree-balance-game')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onContinue={() => {
            setIntroSeen(true);
            localStorage.setItem('adsa_arena_intro_seen_level1', '1');
          }}
        />
      </div>
    );
  }

  if (quizFinished || allDone) {
    return (
      <div style={{ maxWidth: 550, margin: '40px auto', padding: 24 }} className="card-black fade-in-up">
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #FFCC00, #FF9500)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', boxShadow: '0 0 24px rgba(255,215,0,0.45)',
          }}>
            <PartyPopper size={38} color="#000" />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', marginBottom: 6, letterSpacing: '-0.03em' }}>
            {isGraded ? 'Level Cleared — All Tiers Mastered!' : 'Topic Cleared!'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>
            <strong style={{ color: '#fff' }}>{score}</strong> / {questions.length} questions mastered
          </p>
          {isGraded && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
              {questions.map(q => (
                <span key={q.id} style={{
                  fontSize: '0.7rem', fontWeight: 800, padding: '3px 10px', borderRadius: 100,
                  background: TIER_META[q.difficulty || 'beginner'].bg,
                  color: TIER_META[q.difficulty || 'beginner'].color,
                  border: `1px solid ${TIER_META[q.difficulty || 'beginner'].color}55`,
                }}>
                  {TIER_META[q.difficulty || 'beginner'].label} ✓
                </span>
              ))}
            </div>
          )}
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', marginBottom: 20 }}>
            Topic: <strong style={{ color: 'var(--accent-gold)' }}>{activeTopic.title}</strong>
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 24 }}>
            {[1, 2, 3].map(s => (
              <span key={s} style={{
                fontSize: '2rem', color: s <= 3 ? 'var(--accent-gold)' : 'rgba(255,255,255,0.2)',
                filter: 'drop-shadow(0 0 6px rgba(255,215,0,0.5))',
              }}>★</span>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: 20, maxWidth: 420, margin: '0 auto 20px' }}>
            All questions marked as <strong style={{ color: '#fff' }}>done</strong>. New questions for this topic unlock later —
            your progress is saved permanently.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={handleResetTopic}>
              <RotateCcw size={16} /> Reset Topic Progress
            </button>
            <button className="btn" style={{ background: '#fff', color: '#000', fontWeight: 700 }} onClick={onBackToCampaign}>
              Campaign →
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progressPct = ((score + (isAnswered ? 1 : 0)) / questions.length) * 100;

  return (
    <div style={{ maxWidth: 650, margin: '20px auto', padding: 24 }}>
      {/* Topic Selector — animated pills */}
      <div className="card-light" style={{ padding: 14, marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-red)', textTransform: 'uppercase', marginBottom: 10 }}>
          <ListOrdered size={14} /> CHOOSE A TOPIC TO CHALLENGE
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {LEVEL_TOPICS.map(l => {
            const topicDone = l.id !== topicId && getQuizQuestionsForLevel(l.id).length > 0 &&
              getQuizQuestionsForLevel(l.id).every(q => completedSet.has(q.id));
            const active = l.id === topicId;
            const locked = l.levelNumber > (levelUnlocked ?? 1);
            return (
              <button
                key={l.id}
                onClick={locked ? undefined : () => handleTopicChange(l.id)}
                title={locked ? `Complete Level ${l.levelNumber - 1} to unlock this quiz` : `Level ${l.levelNumber}: ${l.title}`}
                style={{
                  padding: '8px 14px', borderRadius: 100, whiteSpace: 'nowrap',
                  fontSize: '0.78rem', fontWeight: 800,
                  background: active ? 'linear-gradient(135deg, #000, #1C1C1E)' : locked ? 'var(--bg-light)' : 'var(--bg-light)',
                  color: active ? '#fff' : locked ? 'var(--text-muted)' : 'var(--text-secondary)',
                  border: active ? '1.5px solid #000' : locked ? '1.5px dashed var(--border-light)' : `1.5px solid ${topicDone ? 'var(--accent-green)' : 'var(--border-hairline)'}`,
                  cursor: locked ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-main)', transition: 'all 0.2s ease',
                  display: 'inline-flex', alignItems: 'center', gap: 5, opacity: locked ? 0.6 : 1,
                }}
              >
                {locked && <Lock size={12} />}
                L{l.levelNumber} {!locked && topicDone && <CheckCircle2 size={12} color="var(--accent-green)" />}
              </button>
            );
          })}
        </div>
        {unlockedLevels.length < LEVEL_TOPICS.length && (
          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
            <Lock size={12} />
            Complete Level {unlockedLevels.length} to unlock more quizzes
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#000' }}>{activeTopic.title}</span>
          <span style={{
            marginLeft: 'auto', fontSize: '0.72rem', fontWeight: 800,
            background: allDone ? 'var(--accent-green)' : '#000', color: '#fff',
            padding: '4px 12px', borderRadius: '100px', display: 'inline-flex', alignItems: 'center', gap: 5,
          }}>
            <Target size={12} /> {score}/{questions.length} mastered
          </span>
        </div>
      </div>

      {/* Progress with mastery segments */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#000', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Question {remaining.indexOf(currentQ) + 1} / {remaining.length} remaining
        </span>
        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-orange)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Zap size={13} /> {score} done
        </span>
      </div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
        {questions.map(q => {
          const done = completedSet.has(q.id);
          const active = q.id === currentQ.id;
          const meta = q.difficulty ? TIER_META[q.difficulty] : null;
          return (
            <div key={q.id} style={{
              flex: 1, height: 8, borderRadius: 4, overflow: 'hidden',
              background: done ? 'var(--accent-green)' : 'var(--bg-grey)',
              outline: active ? '2px solid #000' : 'none', outlineOffset: 1,
              transition: 'all 0.3s ease', position: 'relative',
            }} title={meta ? `${meta.label} tier` : undefined}>
              {meta && !done && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `repeating-linear-gradient(45deg, ${meta.color}40 0 4px, transparent 4px 8px)`,
                }} />
              )}
            </div>
          );
        })}
      </div>
      {isGraded && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 14 }}>
          <Lock size={11} />
          Graded level — tiers unlock in order: Beginner → Medium → Mastery. Complete all 3 to finish the level.
        </div>
      )}

      {/* Hint Toggle */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
        <button style={{
          background: 'none', border: 'none', color: 'var(--accent-orange)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.82rem', fontWeight: 600, fontFamily: 'var(--font-main)',
        }} onClick={() => setShowHint(!showHint)}>
          <Lightbulb size={15} /> {showHint ? 'Hide Hint' : 'Hint'}
        </button>
      </div>

      {showHint && (
        <div className="fade-in-up" style={{
          padding: 12, background: 'rgba(255,149,0,0.08)', border: '1px solid rgba(255,149,0,0.2)',
          borderRadius: 'var(--radius-md)', marginBottom: 14, fontSize: '0.85rem', color: 'var(--accent-orange)',
        }}>
          💡 {currentQ.hint || 'Think about the core algorithm concept for this topic.'}
        </div>
      )}

      {/* Question */}
      <div className="card-black fade-in-up" key={`q-${currentQ.id}`} style={{ padding: 20, marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #FF9500, #FFCC00)', opacity: 0.8 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Challenge {questions.findIndex(q => q.id === currentQ.id) + 1} of {questions.length}
          </span>
          {currentQ.difficulty && (
            <span style={{
              fontSize: '0.66rem', fontWeight: 800, padding: '3px 10px', borderRadius: 100,
              background: TIER_META[currentQ.difficulty].bg, color: TIER_META[currentQ.difficulty].color,
              border: `1px solid ${TIER_META[currentQ.difficulty].color}55`,
            }}>
              {TIER_META[currentQ.difficulty].label} TIER
            </span>
          )}
          {currentQ.xpReward && (
            <span style={{
              fontSize: '0.66rem', fontWeight: 800, padding: '3px 10px', borderRadius: 100,
              background: 'rgba(255,204,0,0.12)', color: 'var(--accent-gold)',
              border: '1px solid rgba(255,204,0,0.4)',
            }}>
              <Zap size={11} style={{ verticalAlign: -2 }} /> +{currentQ.xpReward} XP
            </span>
          )}
        </div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.4, color: '#fff' }}>{currentQ.question}</h3>

        {currentQ.treeData && (
          <div style={{ marginTop: 14, background: '#0D0D0F', borderRadius: 'var(--radius-md)', padding: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.62rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 6px' }}>
              Current Tree
            </div>
            <TreeSvgCanvas nodes={currentQ.treeData.nodes} edges={currentQ.treeData.edges} minHeight={230} />
          </div>
        )}
      </div>

      {/* Options — staggered entrance */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {currentQ.options.map((opt, idx) => {
          let bg = '#fff', border = 'var(--border-hairline)', color = '#000';
          if (isAnswered && idx === currentQ.correctAnswerIndex) { bg = 'rgba(52,199,89,0.08)'; border = '#34C759'; color = '#1B7F37'; }
          else if (isAnswered && idx === selectedOption) { bg = 'rgba(255,59,48,0.06)'; border = '#FF3B30'; color = '#CC2D25'; }

          return (
            <button
              key={idx}
              className="arena-option"
              style={{
                background: bg, border: `1.5px solid ${border}`, color,
                padding: '14px 18px', borderRadius: 'var(--radius-md)', textAlign: 'left',
                fontSize: '0.92rem', fontWeight: 600, cursor: isAnswered ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'all 0.2s ease', fontFamily: 'var(--font-main)',
                animationDelay: `${idx * 70}ms`,
              }} onClick={() => handleSelectOption(idx)}>
              <span>{opt}</span>
              {isAnswered && idx === currentQ.correctAnswerIndex && <CheckCircle2 size={18} color="#34C759" className="pop-in" />}
              {isAnswered && idx === selectedOption && idx !== currentQ.correctAnswerIndex && <XCircle size={18} color="#FF3B30" className="shake" />}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="fade-in-up" style={{
          padding: 14, background: 'var(--bg-light)', borderLeft: '3px solid #000',
          borderRadius: '0 8px 8px 0', marginBottom: 16, fontSize: '0.88rem', lineHeight: 1.5,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
            <strong>{selectedOption === currentQ.correctAnswerIndex ? 'Correct! ' : 'Not quite — '}</strong>
            {selectedOption === currentQ.correctAnswerIndex && earnedXpFlash > 0 && (
              <span style={{
                fontSize: '0.75rem', fontWeight: 900, color: 'var(--accent-gold)',
                background: 'rgba(255,204,0,0.12)', border: '1px solid rgba(255,204,0,0.4)',
                padding: '2px 10px', borderRadius: 100, display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>
                <Zap size={12} /> +{earnedXpFlash} XP
              </span>
            )}
          </div>
          <p style={{ margin: 0 }}>{currentQ.explanation}</p>
          {selectedOption === currentQ.correctAnswerIndex && currentQ.resultTree && (
            <div style={{ marginTop: 10, background: '#fff', borderRadius: 'var(--radius-md)', padding: 8, border: '1px solid var(--border-hairline)' }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 6px' }}>
                ✓ Balanced result — matches the question base exactly
              </div>
              <TreeSvgCanvas nodes={currentQ.resultTree.nodes} edges={currentQ.resultTree.edges} minHeight={200} />
            </div>
          )}
        </div>
      )}

      {isAnswered && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Lock size={12} /> Correct answers are saved permanently.
          </span>
          <button className="btn btn-primary" onClick={handleNextQuestion}>
            {justCompleted && remaining.length === 1 ? (isGraded ? 'Finish Level →' : 'Finish Arena') : 'Next →'}
          </button>
        </div>
      )}
    </div>
  );
};
