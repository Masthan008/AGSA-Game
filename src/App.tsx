import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { UserProgress, LevelTopic, AnimationFrame } from './types';
import { LEVEL_TOPICS } from './data/levelsData';
import { CODE_TEMPLATES } from './data/codeTemplates';
import { THEORY_DATA } from './data/theoryData';

import { Header } from './components/Header';
import { BottomNavMobile } from './components/BottomNavMobile';
import { LevelMap } from './components/Campaign/LevelMap';

import { TreeSvgCanvas } from './components/Visualizer/TreeSvgCanvas';
import { DpMatrixCanvas } from './components/Visualizer/DpMatrixCanvas';
import { ControlBar } from './components/Visualizer/ControlBar';
import { ExplanationPanel } from './components/Visualizer/ExplanationPanel';
import { MultiLangCodeViewer } from './components/Visualizer/MultiLangCodeViewer';
import { TheoryTab } from './components/Visualizer/TheoryTab';
import { NodeControlPanel } from './components/Visualizer/NodeControlPanel';

import { QuizArena } from './components/Games/QuizArena';
import { TreeBalanceGame } from './components/Games/TreeBalanceGame';
import { MultiLangHub } from './components/Library/MultiLangHub';
import { ProgressDashboard } from './components/Dashboard/ProgressDashboard';
import { AlgoCompare } from './components/Comparison/AlgoCompare';
import { PracticePlayground } from './components/Practice/PracticePlayground';
import { Leaderboard } from './components/Social/Leaderboard';

import { NotesPage } from './components/Notes/NotesPage';
import { SandboxPage } from './components/Sandbox/SandboxPage';
import { FlashcardPage } from './components/Flashcards/FlashcardPage';
import { ProfilePage } from './components/Profile/ProfilePage';

import { SplashScreen } from './components/Onboarding/SplashScreen';
import { OnboardingScreens } from './components/Onboarding/OnboardingScreens';
import { AuthModal } from './components/Auth/AuthModal';

import { syncUserProfile, recordLevelCompletion } from './services/api';

import { generateAVLTreeFrames } from './algorithms/avlTreeEngine';
import { generateDijkstraFrames } from './algorithms/dijkstraEngine';
import { generateKnapsackFrames } from './algorithms/knapsackEngine';
import { generateTrieFrames } from './algorithms/trieEngine';
import {
  generateEmptyTreeFrame,
  generateInteractiveInsertFrames,
  generateInteractiveDeleteFrames,
  generateInteractiveSearchFrames
} from './algorithms/interactiveTreeEngine';
import { resolveCodeHighlights } from './algorithms/codeLineResolver';
import { BookOpen, PlayCircle, Code2 } from 'lucide-react';

type Tab = 'campaign' | 'visualizer' | 'arena' | 'library' | 'dashboard' | 'compare' | 'notes' | 'sandbox' | 'flashcards' | 'profile';
type VisualizerMode = 'canvas' | 'theory' | 'code';

const TREE_LEVEL_KEYS = ['avl', 'bst', 'redblack', 'btree', 'segment', 'heap'];

function isTreeLevel(key: string): boolean {
  return TREE_LEVEL_KEYS.includes(key);
}

// Fresh User Progress starts at 0 XP & 0 Stars
const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  levelUnlocked: 1,
  starsPerLevel: {},
  completedLevels: [],
  badges: [],
  streakDays: 1,
  bookmarks: [],
  notes: [],
  username: 'Student',
};

export const App: React.FC = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [activeTab, setActiveTab] = useState<Tab>('campaign');
  const [visualizerMode, setVisualizerMode] = useState<VisualizerMode>('canvas');
  const [currentLevel, setCurrentLevel] = useState<LevelTopic>(LEVEL_TOPICS[0]);

  // Splash, Onboarding & Auth Modal States
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('adsa_quest_v2_onboarded');
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Progress — localStorage & Live PostgreSQL Sync
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('adsa_quest_v2_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_PROGRESS, ...parsed };
      } catch {}
    }
    return DEFAULT_PROGRESS;
  });

  // Dynamic values list for interactive node insertion/deletion.
  // Starts empty so students insert nodes themselves and watch in real time.
  const [treeValues, setTreeValues] = useState<number[]>([]);

  // Sync Clerk User Details when signed in
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const clerkName = user.fullName || user.firstName || user.primaryEmailAddress?.emailAddress || 'Student';
      if (userProgress.username !== clerkName) {
        setUserProgress(prev => ({ ...prev, username: clerkName }));
      }
    }
  }, [isLoaded, isSignedIn, user]);

  // Sync with backend API on progress change
  useEffect(() => {
    localStorage.setItem('adsa_quest_v2_progress', JSON.stringify(userProgress));
    syncUserProfile(userProgress);
  }, [userProgress]);

  // Animation State
  const [frames, setFrames] = useState<AnimationFrame[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  // Bumped on every new operation/level change. Auto-play ticks from an old
  // sequence are ignored once the generation changes, so a queued timer tick
  // can never skip frames of a freshly loaded animation.
  const animGenRef = useRef(0);

  // Build a step-by-step demo by inserting values one at a time through the
  // interactive engine, so every comparison and rotation is narrated.
  const buildSequentialDemo = (input: number[], balancing: boolean): AnimationFrame[] => {
    let values: number[] = [];
    const all: AnimationFrame[] = [];
    for (const v of input) {
      const r = generateInteractiveInsertFrames(values, v, { balancing });
      values = r.updatedValues;
      all.push(...r.frames);
    }
    return all.map((f, i) => ({ ...f, stepIndex: i + 1, totalSteps: all.length }));
  };

  const buildTreeDemoFrames = (key: string, input: number[]): AnimationFrame[] => {
    if (key === 'avl') return buildSequentialDemo(input, true);
    if (key === 'bst') return buildSequentialDemo(input, false);
    return generateAVLTreeFrames(input);
  };

  // Generate frames for current level
  useEffect(() => {
    animGenRef.current += 1;
    let generated: AnimationFrame[] = [];
    const key = currentLevel.algorithmKey;
    if (isTreeLevel(key)) {
      setTreeValues([]);
      generated = [generateEmptyTreeFrame(currentLevel.title)];
    } else if (key === 'dijkstra' || key === 'bellmanford' || key === 'mst' || key === 'tarjan' || key === 'bfsdfs' || key === 'floydwarshall') {
      generated = generateDijkstraFrames();
    } else if (key === 'knapsack' || key === 'lcs' || key === 'matrixchain') {
      generated = generateKnapsackFrames();
    } else if (key === 'trie' || key === 'kmp' || key === 'suffixarray') {
      const words = Array.isArray(currentLevel.defaultInput) && typeof currentLevel.defaultInput[0] === 'string'
        ? currentLevel.defaultInput as string[]
        : ['cat', 'car', 'dot'];
      generated = generateTrieFrames(words);
    } else {
      generated = generateAVLTreeFrames([15, 25, 35, 45]);
    }
    setFrames(generated);
    setStepIndex(0);
    setIsPlaying(false);
  }, [currentLevel]);

  // Auto-play timer — guarded by the animation generation so stale ticks from
  // a previous sequence can never advance the new one.
  useEffect(() => {
    let timer: any = null;
    if (isPlaying && frames.length > 0) {
      const gen = animGenRef.current;
      timer = setInterval(() => {
        if (animGenRef.current !== gen) {
          setIsPlaying(false);
          return;
        }
        setStepIndex(prev => {
          if (prev + 1 < frames.length) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 1100 / playbackSpeed);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [isPlaying, frames, playbackSpeed]);

  const currentFrame = frames[stepIndex] || frames[0];
  const codeSnippet = CODE_TEMPLATES[currentLevel.algorithmKey] || CODE_TEMPLATES['avl'];
  const currentTheory = THEORY_DATA[currentLevel.algorithmKey] || THEORY_DATA['avl'];

  // Live code-highlight lines: resolved from the frame's semantic step against
  // the actual displayed template, so canvas and code tracer stay in sync.
  const activeCodeLines = currentFrame?.codeStep
    ? resolveCodeHighlights(currentFrame.codeStep, codeSnippet)
    : currentFrame?.highlightCodeLines || {};

  const unlockedLevels = LEVEL_TOPICS.filter(l => l.levelNumber <= userProgress.levelUnlocked);
  const currentLevelUnlocked = unlockedLevels.some(l => l.id === currentLevel.id);

  // Interactive Node Handlers (Insert, Delete, Search) — step-by-step with
  // AVL balancing when the current level teaches AVL rotations.
  const handleInsertNode = (val: number) => {
    animGenRef.current += 1;
    const { frames: newFrames, updatedValues } = generateInteractiveInsertFrames(
      treeValues, val, { balancing: currentLevel.algorithmKey === 'avl' }
    );
    setTreeValues(updatedValues);
    setFrames(newFrames);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const handleDeleteNode = (val: number) => {
    animGenRef.current += 1;
    const { frames: newFrames, updatedValues } = generateInteractiveDeleteFrames(
      treeValues, val, { balancing: currentLevel.algorithmKey === 'avl' }
    );
    setTreeValues(updatedValues);
    setFrames(newFrames);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const handleSearchNode = (val: number) => {
    animGenRef.current += 1;
    const searchFrames = generateInteractiveSearchFrames(treeValues, val);
    setFrames(searchFrames);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const handleSampleTree = () => {
    animGenRef.current += 1;
    const input = Array.isArray(currentLevel.defaultInput) && typeof currentLevel.defaultInput[0] === 'number'
      ? currentLevel.defaultInput as number[]
      : [10, 20, 30, 40, 50, 25];
    setTreeValues(input);
    setFrames(buildTreeDemoFrames(currentLevel.algorithmKey, input));
    setStepIndex(0);
    setIsPlaying(true);
  };

  const handleRandomizeTree = () => {
    animGenRef.current += 1;
    const count = 5 + Math.floor(Math.random() * 4);
    const nums = Array.from({ length: count }, () => Math.floor(Math.random() * 90) + 10);
    setTreeValues(nums);
    setFrames(buildTreeDemoFrames(currentLevel.algorithmKey, nums));
    setStepIndex(0);
    setIsPlaying(false);
  };

  const handleResetTree = () => {
    animGenRef.current += 1;
    setTreeValues([]);
    setFrames([generateEmptyTreeFrame(currentLevel.title)]);
    setStepIndex(0);
    setIsPlaying(false);
  };

  const handleSelectLevel = (level: LevelTopic) => {
    setCurrentLevel(level);
    setActiveTab('visualizer');
    setVisualizerMode('canvas');
  };

  const handleStartQuiz = (level: LevelTopic) => {
    setCurrentLevel(level);
    setActiveTab('arena');
  };

  const handleCompleteQuiz = (earnedStars: number, earnedXp: number) => {
    setUserProgress(prev => ({
      ...prev,
      xp: prev.xp + earnedXp,
      levelUnlocked: Math.max(prev.levelUnlocked, currentLevel.levelNumber + 1),
      starsPerLevel: {
        ...prev.starsPerLevel,
        [currentLevel.id]: Math.max(prev.starsPerLevel[currentLevel.id] || 0, earnedStars),
      },
      completedLevels: Array.from(new Set([...prev.completedLevels, currentLevel.id])),
    }));

    // Record in backend database
    recordLevelCompletion(userProgress.username || 'Student', currentLevel.id, earnedStars, earnedXp);
  };

  const handleUpdateUsername = (name: string) => {
    setUserProgress(prev => ({ ...prev, username: name }));
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all learning progress?')) {
      setUserProgress(DEFAULT_PROGRESS);
      localStorage.removeItem('adsa_quest_v2_progress');
    }
  };

  const handleCompleteOnboarding = () => {
    localStorage.setItem('adsa_quest_v2_onboarded', 'true');
    setShowOnboarding(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      {/* 1. Splash Screen Overlay */}
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}

      {/* 2. Onboarding Screens Overlay */}
      {!showSplash && showOnboarding && (
        <OnboardingScreens onComplete={handleCompleteOnboarding} />
      )}

      {/* 3. Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginAsGuest={handleUpdateUsername}
      />

      {/* 4. Main App Navigation & Pages */}
      <Header
        userProgress={userProgress}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      <main style={{ flex: 1, paddingBottom: 80 }}>
        {/* CAMPAIGN */}
        {activeTab === 'campaign' && (
          <LevelMap userProgress={userProgress} onSelectLevel={handleSelectLevel} onStartQuiz={handleStartQuiz} />
        )}

        {/* VISUALIZER & THEORY */}
        {activeTab === 'visualizer' && (
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '20px 16px' }}>
            {/* Topic Banner */}
            <div className="card-light" style={{
              padding: '16px 20px', marginBottom: 16,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10,
            }}>
              <div>
                <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Level {currentLevel.levelNumber} • {currentLevel.category}
                </span>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#000' }}>{currentLevel.title}</h2>
              </div>
              <select value={currentLevel.id}
                onChange={e => {
                  const t = LEVEL_TOPICS.find(l => l.id === e.target.value);
                  if (t && t.levelNumber <= userProgress.levelUnlocked) setCurrentLevel(t);
                }}
                style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-hairline)', fontWeight: 600, fontSize: '0.85rem', fontFamily: 'var(--font-main)' }}
              >
                {!currentLevelUnlocked && (
                  <option value={currentLevel.id} disabled>🔒 L{currentLevel.levelNumber}: {currentLevel.title} (locked)</option>
                )}
                {unlockedLevels.map(l => <option key={l.id} value={l.id}>L{l.levelNumber}: {l.title}</option>)}
              </select>
            </div>

            {/* Visualizer Mode Selector Switch */}
            <div style={{
              display: 'flex', background: 'var(--bg-light)', padding: 4, borderRadius: 'var(--radius-pill)', marginBottom: 16
            }}>
              <button
                className="btn btn-sm"
                style={{ flex: 1, background: visualizerMode === 'canvas' ? '#000000' : 'transparent', color: visualizerMode === 'canvas' ? '#FFFFFF' : 'var(--text-secondary)', border: 'none', gap: 6 }}
                onClick={() => setVisualizerMode('canvas')}
              >
                <PlayCircle size={15} /> Visualizer Canvas
              </button>
              <button
                className="btn btn-sm"
                style={{ flex: 1, background: visualizerMode === 'theory' ? '#000000' : 'transparent', color: visualizerMode === 'theory' ? '#FFFFFF' : 'var(--text-secondary)', border: 'none', gap: 6 }}
                onClick={() => setVisualizerMode('theory')}
              >
                <BookOpen size={15} /> Pin-to-Pin Theory & Concept
              </button>
              <button
                className="btn btn-sm"
                style={{ flex: 1, background: visualizerMode === 'code' ? '#000000' : 'transparent', color: visualizerMode === 'code' ? '#FFFFFF' : 'var(--text-secondary)', border: 'none', gap: 6 }}
                onClick={() => setVisualizerMode('code')}
              >
                <Code2 size={15} /> 8-Lang Code Tracer
              </button>
            </div>

            {/* VIEW 1: THEORY MODE */}
            {visualizerMode === 'theory' && (
              <TheoryTab theory={currentTheory} />
            )}

            {/* VIEW 2: CODE TRACER MODE */}
            {visualizerMode === 'code' && (
              <div style={{ height: 520 }}>
                <MultiLangCodeViewer codeSnippet={codeSnippet} activeLineNumbers={activeCodeLines} />
              </div>
            )}

            {/* VIEW 3: CANVAS & INTERACTIVE NODE CONTROLS */}
            {visualizerMode === 'canvas' && (
              <div>
                {/* Node Insert / Delete Control Bar */}
                {(currentLevel.category === 'Trees' || currentLevel.algorithmKey === 'avl' || currentLevel.algorithmKey === 'bst') && (
                  <NodeControlPanel
                    onInsertNode={handleInsertNode}
                    onDeleteNode={handleDeleteNode}
                    onSearchNode={handleSearchNode}
                    onRandomizeTree={handleRandomizeTree}
                    onResetTree={handleResetTree}
                    onSampleTree={handleSampleTree}
                  />
                )}

                {/* Split Canvas + Explanation */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.4fr) minmax(280px, 1fr)', gap: 16 }}>
                  <div>
                    {currentLevel.algorithmKey === 'knapsack' || currentLevel.algorithmKey === 'lcs' || currentLevel.algorithmKey === 'matrixchain'
                      ? <DpMatrixCanvas dpMatrix={currentFrame?.dpMatrix} />
                      : <TreeSvgCanvas nodes={currentFrame?.nodes || []} edges={currentFrame?.edges || []} />
                    }
                    <ControlBar
                      currentStep={stepIndex + 1} totalSteps={frames.length}
                      isPlaying={isPlaying} playbackSpeed={playbackSpeed}
                      onPlayPause={() => setIsPlaying(!isPlaying)}
                      onStepBack={() => setStepIndex(prev => Math.max(0, prev - 1))}
                      onStepForward={() => setStepIndex(prev => Math.min(frames.length - 1, prev + 1))}
                      onReset={() => { setStepIndex(0); setIsPlaying(false); }}
                      onSpeedChange={setPlaybackSpeed}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ height: 250 }}><ExplanationPanel currentFrame={currentFrame} /></div>
                    <div style={{ flex: 1, minHeight: 250 }}>
                      <MultiLangCodeViewer codeSnippet={codeSnippet} activeLineNumbers={activeCodeLines} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ARENA */}
        {activeTab === 'arena' && (
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '20px 16px' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h2 className="section-title">Challenge Arena</h2>
              <p className="section-subtitle">Test your knowledge with quizzes and interactive puzzles.</p>
            </div>
            <QuizArena currentLevel={currentLevel} userId={userProgress.username || 'Student'} onCompleteQuiz={handleCompleteQuiz} onBackToCampaign={() => setActiveTab('campaign')} />
            <div style={{ marginTop: 32 }}><TreeBalanceGame currentLevel={currentLevel} userId={userProgress.username || 'Student'} /></div>
          </div>
        )}

        {/* CODE HUB */}
        {activeTab === 'library' && <MultiLangHub />}

        {/* STUDY NOTES & BOOKMARKS */}
        {activeTab === 'notes' && <NotesPage userProgress={userProgress} />}

        {/* CODE SANDBOX */}
        {activeTab === 'sandbox' && <SandboxPage />}

        {/* ADSA FLASHCARDS */}
        {activeTab === 'flashcards' && <FlashcardPage userId={userProgress.username || 'Student'} />}

        {/* DASHBOARD */}
        {activeTab === 'dashboard' && <ProgressDashboard userProgress={userProgress} />}

        {/* COMPARE */}
        {activeTab === 'compare' && <AlgoCompare />}

        {/* PROFILE & SETTINGS */}
        {activeTab === 'profile' && (
          <ProfilePage
            userProgress={userProgress}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onResetProgress={handleResetProgress}
          />
        )}
      </main>

      <BottomNavMobile activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
