import React, { useState, useEffect, useRef } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { UserProgress, LevelTopic, AnimationFrame } from './types';
import { LEVEL_TOPICS } from './data/levelsData';

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


import { SplashScreen } from './components/Onboarding/SplashScreen';
import { OnboardingScreens } from './components/Onboarding/OnboardingScreens';
import { AuthModal } from './components/Auth/AuthModal';

import { createBookmark, deleteBookmark, fetchUserBookmarks, fetchMyProfile, flushPendingMutations, importGuestProgress, syncUserProfile, recordLevelCompletion, recordCompletion, setApiTokenProvider } from './services/api';

import { generateAVLTreeFrames } from './algorithms/avlTreeEngine';
import { generateDijkstraFrames } from './algorithms/dijkstraEngine';
import { generateKnapsackFrames } from './algorithms/knapsackEngine';
import { generateTrieFrames } from './algorithms/trieEngine';
import { generateSegmentTreeFrames } from './algorithms/segmentTreeEngine';
import { generateKMPFrames } from './algorithms/kmpEngine';
import { generateBTreeFrames } from './algorithms/bTreeEngine';
import { generateBellmanFordFrames, generateBfsDfsFrames, generateFloydWarshallFrames, generateMaxFlowFrames, generateMstFrames, generateTarjanFrames, generateTopologicalFrames } from './algorithms/graphLearningEngines';
import { generateBitmaskDpFrames, generateEditDistanceFrames, generateLcsFrames, generateMatrixChainFrames, generateNQueensFrames } from './algorithms/dpLearningEngines';
import { generateManacherFrames, generateSuffixArrayFrames, generateZFrames } from './algorithms/stringLearningEngines';
import { generateAmortizedFrames, generateBloomFilterFrames, generateConvexHullFrames, generateDsuFrames, generateFenwickFrames, generateFibonacciHeapFrames, generateHashingFrames, generateHeapFrames, generateNpCompleteFrames, generateRabinKarpFrames, generateRadixSortFrames, generateRedBlackFrames, generateSkipListFrames, generateSparseTableFrames, generateSplayFrames } from './algorithms/advancedStructureEngines';
import { hasDedicatedVisualizer, usesMatrixRenderer } from './algorithms/visualizerRegistry';
import {
  generateEmptyTreeFrame,
  generateInteractiveInsertFrames,
  generateInteractiveDeleteFrames,
  generateInteractiveSearchFrames
} from './algorithms/interactiveTreeEngine';
import { resolveCodeHighlights } from './algorithms/codeLineResolver';
import { Bookmark, BookmarkCheck, BookOpen, PlayCircle, Code2 } from 'lucide-react';
import type { CodeSnippet } from './types';
import type { TopicTheory } from './data/theoryData';
import { Footer } from './components/Footer';

const MultiLangHub = React.lazy(() => import('./components/Library/MultiLangHub').then(module => ({ default: module.MultiLangHub })));
const ProgressDashboard = React.lazy(() => import('./components/Dashboard/ProgressDashboard').then(module => ({ default: module.ProgressDashboard })));
const AlgoCompare = React.lazy(() => import('./components/Comparison/AlgoCompare').then(module => ({ default: module.AlgoCompare })));
const Leaderboard = React.lazy(() => import('./components/Social/Leaderboard').then(module => ({ default: module.Leaderboard })));
const NotesPage = React.lazy(() => import('./components/Notes/NotesPage').then(module => ({ default: module.NotesPage })));
const SandboxPage = React.lazy(() => import('./components/Sandbox/SandboxPage').then(module => ({ default: module.SandboxPage })));
const FlashcardPage = React.lazy(() => import('./components/Flashcards/FlashcardPage').then(module => ({ default: module.FlashcardPage })));
const ProfilePage = React.lazy(() => import('./components/Profile/ProfilePage').then(module => ({ default: module.ProfilePage })));
const AdminPage = React.lazy(() => import('./components/Admin/AdminPage').then(module => ({ default: module.AdminPage })));
const AssignmentsPage = React.lazy(() => import('./components/Assignments/AssignmentsPage').then(module => ({ default: module.AssignmentsPage })));
const QuizArena = React.lazy(() => import('./components/Games/QuizArena').then(module => ({ default: module.QuizArena })));
const MistakeReviewPage = React.lazy(() => import('./components/Review/MistakeReviewPage').then(module => ({ default: module.MistakeReviewPage })));
const AboutPage = React.lazy(() => import('./components/About/AboutPage').then(module => ({ default: module.AboutPage })));
const TreeLearningLab = React.lazy(() => import('./components/TreeLab/TreeLearningLab').then(module => ({ default: module.TreeLearningLab })));

const PageLoader = () => <div role="status" style={{ minHeight: 240, display: 'grid', placeItems: 'center', color: 'var(--text-muted)', fontWeight: 700 }}>Loading learning space…</div>;

type Tab = 'campaign' | 'assignments' | 'review' | 'tree-lab' | 'visualizer' | 'arena' | 'library' | 'dashboard' | 'compare' | 'notes' | 'sandbox' | 'flashcards' | 'leaderboard' | 'profile' | 'about';
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
  const { getToken } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    setApiTokenProvider(() => getToken());
    const flush = () => { void flushPendingMutations(); };
    window.addEventListener('online', flush);
    flush();
    return () => { window.removeEventListener('online', flush); setApiTokenProvider(null); };
  }, [getToken]);
  const [activeTab, setActiveTab] = useState<Tab>('campaign');
  const [visualizerMode, setVisualizerMode] = useState<VisualizerMode>('canvas');
  const [currentLevel, setCurrentLevel] = useState<LevelTopic>(LEVEL_TOPICS[0]);
  const [codeSnippet, setCodeSnippet] = useState<CodeSnippet | null>(null);
  const [currentTheory, setCurrentTheory] = useState<TopicTheory | null>(null);
  const [currentBookmarkId, setCurrentBookmarkId] = useState<string | null>(null);

  // Splash, Onboarding & Auth Modal States
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('adsa_quest_v2_onboarded');
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Admin route — reachable ONLY via the direct URL /#/admin (no nav link).
  const [isAdminRoute, setIsAdminRoute] = useState(() => window.location.hash === '#/admin');
  useEffect(() => {
    const onHash = () => setIsAdminRoute(window.location.hash === '#/admin');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

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

  // Keep a local offline snapshot. Server progress remains authoritative for
  // authenticated learners and is hydrated after Clerk identity is ready.
  useEffect(() => {
    localStorage.setItem('adsa_quest_v2_progress', JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;
    let active = true;
    syncUserProfile(userProgress, user.primaryEmailAddress?.emailAddress)
      .then(async () => {
        const migrationKey = `adsa_quest_guest_migrated_${user.id}`;
        if (!localStorage.getItem(migrationKey) && userProgress.completedLevels.length > 0) {
          const imported = await importGuestProgress(userProgress);
          if (imported) localStorage.setItem(migrationKey, '1');
        }
      })
      .then(() => fetchMyProfile())
      .then(profile => {
        if (!active || !profile) return;
        const starsPerLevel = Object.fromEntries(profile.progress.map((item: any) => [item.levelId, item.stars]));
        setUserProgress(prev => ({
          ...prev,
          username: profile.username || prev.username,
          xp: profile.xp,
          streakDays: profile.streakDays,
          levelUnlocked: profile.levelUnlocked,
          starsPerLevel,
          completedLevels: profile.progress.map((item: any) => item.levelId),
          badges: (profile.achievements || []).map((item: any) => item.badgeKey),
        }));
      });
    return () => { active = false; };
  }, [isLoaded, isSignedIn, user?.id]);

  // Code-practice session tracker (shown in the admin dashboard)
  const recordPracticeSession = (kind: string) => {
    recordCompletion(userProgress.username || 'Student', `practice-${kind}-${Date.now()}`, 'practice');
  };

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
    if (key === 'avl' || key === 'bst') {
      setTreeValues([]);
      generated = [generateEmptyTreeFrame(currentLevel.title)];
    } else if (key === 'btree') {
      generated = generateBTreeFrames(2, currentLevel.defaultInput as number[]);
    } else if (key === 'segment') {
      generated = generateSegmentTreeFrames(currentLevel.defaultInput as number[]);
    } else if (key === 'redblack') {
      generated = generateRedBlackFrames();
    } else if (key === 'heap') {
      generated = generateHeapFrames(currentLevel.defaultInput as number[]);
    } else if (key === 'dsu') {
      generated = generateDsuFrames();
    } else if (key === 'hashing') {
      generated = generateHashingFrames(currentLevel.defaultInput as number[]);
    } else if (key === 'fenwick') {
      generated = generateFenwickFrames(currentLevel.defaultInput as number[]);
    } else if (key === 'skiplist') {
      generated = generateSkipListFrames();
    } else if (key === 'splay') {
      generated = generateSplayFrames();
    } else if (key === 'radixsort') {
      generated = generateRadixSortFrames(currentLevel.defaultInput as number[]);
    } else if (key === 'bloomfilter') {
      generated = generateBloomFilterFrames(currentLevel.defaultInput as string[]);
    } else if (key === 'sparsetable') {
      generated = generateSparseTableFrames(currentLevel.defaultInput as number[]);
    } else if (key === 'amortized') {
      generated = generateAmortizedFrames();
    } else if (key === 'fibonacci') {
      generated = generateFibonacciHeapFrames();
    } else if (key === 'rabinkarp') {
      const input = currentLevel.defaultInput as string[]; generated = generateRabinKarpFrames(input[0], input[1]);
    } else if (key === 'convexhull') {
      generated = generateConvexHullFrames();
    } else if (key === 'npcomplete') {
      generated = generateNpCompleteFrames();
    } else if (key === 'dijkstra') {
      generated = generateDijkstraFrames();
    } else if (key === 'bfsdfs') {
      generated = generateBfsDfsFrames();
    } else if (key === 'bellmanford') {
      generated = generateBellmanFordFrames();
    } else if (key === 'mst') {
      generated = generateMstFrames();
    } else if (key === 'floydwarshall') {
      generated = generateFloydWarshallFrames();
    } else if (key === 'tarjan') {
      generated = generateTarjanFrames();
    } else if (key === 'toposort') {
      generated = generateTopologicalFrames();
    } else if (key === 'maxflow') {
      generated = generateMaxFlowFrames();
    } else if (key === 'knapsack') {
      generated = generateKnapsackFrames();
    } else if (key === 'lcs') {
      const input = currentLevel.defaultInput as string[]; generated = generateLcsFrames(input[0], input[1]);
    } else if (key === 'matrixchain') {
      generated = generateMatrixChainFrames(currentLevel.defaultInput as number[]);
    } else if (key === 'editdistance') {
      const input = currentLevel.defaultInput as string[]; generated = generateEditDistanceFrames(input[0], input[1]);
    } else if (key === 'bitmaskdp') {
      generated = generateBitmaskDpFrames();
    } else if (key === 'nqueens') {
      generated = generateNQueensFrames(Number((currentLevel.defaultInput as number[])[0]) || 4);
    } else if (key === 'trie') {
      const words = Array.isArray(currentLevel.defaultInput) && typeof currentLevel.defaultInput[0] === 'string'
        ? currentLevel.defaultInput as string[]
        : ['cat', 'car', 'dot'];
      generated = generateTrieFrames(words);
    } else if (key === 'kmp') {
      const input = typeof currentLevel.defaultInput === 'string' ? currentLevel.defaultInput : 'ABABDABACDABABCABAB';
      generated = generateKMPFrames(input, 'ABABCABAB');
    } else if (key === 'suffixarray') {
      generated = generateSuffixArrayFrames((currentLevel.defaultInput as string[])[0]);
    } else if (key === 'zalgo') {
      const input = currentLevel.defaultInput as string[]; generated = generateZFrames(`${input[1]}$${input[0]}`);
    } else if (key === 'manacher') {
      generated = generateManacherFrames((currentLevel.defaultInput as string[])[0]);
    } else {
      generated = [{
        stepIndex: 1, totalSteps: 1,
        title: `${currentLevel.title}: guided concept mode`,
        explanation: {
          action: 'Study the theory and code before the interactive lab is published.',
          reason: 'ADSA Quest never substitutes an unrelated algorithm animation. This topic remains fully available in Theory, Code, and Quiz modes.',
        },
        nodes: [], edges: [],
      }];
    }
    setFrames(generated);
    setStepIndex(0);
    setIsPlaying(false);
  }, [currentLevel]);

  useEffect(() => {
    let active = true;
    Promise.all([import('./data/codeTemplates'), import('./data/theoryData')]).then(([codes, theories]) => {
      if (!active) return;
      setCodeSnippet(codes.CODE_TEMPLATES[currentLevel.algorithmKey] || null);
      setCurrentTheory(theories.THEORY_DATA[currentLevel.algorithmKey] || null);
    });
    return () => { active = false; };
  }, [currentLevel.algorithmKey]);

  useEffect(() => {
    let active = true;
    fetchUserBookmarks(userProgress.username || 'Student').then(items => {
      if (active) setCurrentBookmarkId(items.find((item: any) => item.topicId === currentLevel.id)?.id || null);
    });
    return () => { active = false; };
  }, [currentLevel.id, userProgress.username]);

  const toggleCurrentBookmark = async () => {
    if (!isSignedIn) {
      setIsAuthModalOpen(true);
      return;
    }
    if (currentBookmarkId) {
      if (await deleteBookmark(currentBookmarkId)) setCurrentBookmarkId(null);
      return;
    }
    const result = await createBookmark(userProgress.username || 'Student', currentLevel.id, currentLevel.title);
    if (result?.bookmark?.id) setCurrentBookmarkId(result.bookmark.id);
  };

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
  // Live code-highlight lines: resolved from the frame's semantic step against
  // the actual displayed template, so canvas and code tracer stay in sync.
  const activeCodeLines = currentFrame?.codeStep && codeSnippet
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
    recordPracticeSession('visualizer-insert');
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
    recordPracticeSession('visualizer-sample');
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

  const handleCompleteQuiz = async (earnedStars: number, earnedXp: number) => {
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
    const result = await recordLevelCompletion(userProgress.username || 'Student', currentLevel.id, earnedStars, earnedXp);
    if (result?.user) {
      const starsPerLevel = Object.fromEntries(result.user.progress.map((item: any) => [item.levelId, item.stars]));
      setUserProgress(prev => ({
        ...prev,
        xp: result.user.xp,
        streakDays: result.user.streakDays,
        levelUnlocked: result.user.levelUnlocked,
        starsPerLevel,
        completedLevels: result.user.progress.map((item: any) => item.levelId),
        badges: (result.user.achievements || []).map((item: any) => item.badgeKey),
      }));
    }
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

  // Admin console renders standalone (no header/bottom-nav) — direct URL only.
  if (isAdminRoute) {
    return (
      <div style={{ minHeight: '100vh', background: '#fff' }}>
        <React.Suspense fallback={<PageLoader />}><AdminPage /></React.Suspense>
      </div>
    );
  }

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
      <a className="skip-link" href="#main-content">Skip to learning content</a>
      <Header
        userProgress={userProgress}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      <main id="main-content" tabIndex={-1} style={{ flex: 1, paddingBottom: 80 }}>
        <React.Suspense fallback={<PageLoader />}>
        {/* CAMPAIGN */}
        {activeTab === 'campaign' && (
          <LevelMap userProgress={userProgress} onSelectLevel={handleSelectLevel} onStartQuiz={handleStartQuiz} />
        )}

        {activeTab === 'assignments' && <AssignmentsPage onStartLevel={handleSelectLevel} />}
        {activeTab === 'review' && <MistakeReviewPage onReviewLevel={handleStartQuiz} />}
        {activeTab === 'tree-lab' && <TreeLearningLab />}

        {/* VISUALIZER & THEORY */}
        {activeTab === 'visualizer' && (
          <div className="quiz-arena-shell" style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '20px 16px' }}>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button className="btn btn-secondary btn-sm" onClick={toggleCurrentBookmark} aria-pressed={Boolean(currentBookmarkId)} title={currentBookmarkId ? 'Remove bookmark' : 'Save topic to Study Vault'}>
                {currentBookmarkId ? <BookmarkCheck size={15} color="#34C759" /> : <Bookmark size={15} />} {currentBookmarkId ? 'Saved' : 'Save'}
              </button>
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
              currentTheory ? <TheoryTab theory={currentTheory} /> : <PageLoader />
            )}

            {/* VIEW 2: CODE TRACER MODE */}
            {visualizerMode === 'code' && (
              <div style={{ height: 520 }}>
                {codeSnippet ? <MultiLangCodeViewer codeSnippet={codeSnippet} activeLineNumbers={activeCodeLines} /> : <PageLoader />}
              </div>
            )}

            {/* VIEW 3: CANVAS & INTERACTIVE NODE CONTROLS */}
            {visualizerMode === 'canvas' && (
              <div>
                {!hasDedicatedVisualizer(currentLevel.algorithmKey) && (
                  <div role="status" className="card-light" style={{ padding: '16px 18px', marginBottom: 16, borderLeft: '4px solid #007AFF' }}>
                    <strong style={{ display: 'block', marginBottom: 4 }}>Guided concept mode</strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.55 }}>
                      This topic’s dedicated interactive lab is being validated. Use Pin-to-Pin Theory, the 8-language Code Tracer, and the Challenge Arena now—an unrelated animation will never be shown in its place.
                    </span>
                  </div>
                )}
                {/* Node Insert / Delete Control Bar */}
                {(currentLevel.algorithmKey === 'avl' || currentLevel.algorithmKey === 'bst') && (
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
                    {usesMatrixRenderer(currentLevel.algorithmKey)
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
                      {codeSnippet ? <MultiLangCodeViewer codeSnippet={codeSnippet} activeLineNumbers={activeCodeLines} /> : <PageLoader />}
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
            <QuizArena currentLevel={currentLevel} userId={userProgress.username || 'Student'} levelUnlocked={userProgress.levelUnlocked} onCompleteQuiz={handleCompleteQuiz} onBackToCampaign={() => setActiveTab('campaign')} onOpenVisualizer={() => setActiveTab('visualizer')} />
          </div>
        )}

        {/* CODE HUB */}
        {activeTab === 'library' && <MultiLangHub />}

        {/* STUDY NOTES & BOOKMARKS */}
        {activeTab === 'notes' && <NotesPage userProgress={userProgress} />}

        {/* CODE SANDBOX */}
        {activeTab === 'sandbox' && <SandboxPage userId={userProgress.username || 'Student'} />}

        {/* ADSA FLASHCARDS */}
        {activeTab === 'flashcards' && <FlashcardPage userId={userProgress.username || 'Student'} />}

        {/* DASHBOARD */}
        {activeTab === 'dashboard' && <ProgressDashboard userProgress={userProgress} />}

        {/* LIVE LEADERBOARD */}
        {activeTab === 'leaderboard' && <Leaderboard userProgress={userProgress} onUpdateUsername={handleUpdateUsername} />}

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
        {activeTab === 'about' && <AboutPage onExplore={() => setActiveTab('campaign')} />}
        </React.Suspense>
      </main>

      <Footer onNavigate={(tab) => setActiveTab(tab as Tab)} />

      <BottomNavMobile activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
