// ADSA Quest v2 — Type Definitions

export type TopicCategory = 'Trees' | 'Graphs' | 'DynamicProgramming' | 'StringAndTrie' | 'AdvancedSets';

export type ProgrammingLanguage = 'cpp' | 'java' | 'python' | 'javascript' | 'csharp' | 'go' | 'rust' | 'c';

export type AlgorithmKey =
  | 'avl' | 'redblack' | 'btree' | 'segment' | 'trie'
  | 'dijkstra' | 'tarjan' | 'knapsack' | 'dsu'
  | 'bst' | 'heap' | 'bfsdfs' | 'mst' | 'bellmanford'
  | 'floydwarshall' | 'lcs' | 'matrixchain' | 'kmp' | 'suffixarray';

export interface CodeSnippet {
  title: string;
  timeComplexity: string;
  spaceComplexity: string;
  explanationText: string;
  cpp?: string;
  java?: string;
  python?: string;
  javascript?: string;
  csharp?: string;
  go?: string;
  rust?: string;
  c?: string;
}

export type MultiLangCodeSnippet = CodeSnippet;

export interface LevelTopic {
  id: string;
  levelNumber: number;
  title: string;
  category: TopicCategory;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master' | 'Easy' | 'Medium' | 'Hard';
  estimatedMinutes?: number;
  xpReward?: number;
  iconName?: string;
  prerequisiteId?: string;
  algorithmKey: AlgorithmKey | string;
  defaultInput: number[] | string[] | string | any;
  quizQuestions?: any[];
}

export interface NodePosition {
  id: string | number;
  value: any;
  x: number;
  y: number;
  state?: 'default' | 'active' | 'comparing' | 'sorted' | 'swapping' | 'visited' | 'pivot' | 'error' | 'warning' | 'success';
  label?: string;
  color?: string;
  height?: number;
  balanceFactor?: number;
}

export interface EdgeConnection {
  from: string | number;
  to: string | number;
  weight?: number;
  highlighted?: boolean;
  label?: string | number | any;
}

export interface StepExplanation {
  action: string;
  reason: string;
  formula?: string;
  variables?: Record<string, any>;
}

export interface AnimationFrame {
  stepIndex: number;
  totalSteps: number;
  title: string;
  explanation: StepExplanation;
  highlightCodeLines?: Partial<Record<ProgrammingLanguage, number[]>>;
  codeStep?: string;
  nodes: NodePosition[];
  edges?: EdgeConnection[];
  arrayState?: any;
  dpMatrix?: any;
  variableWatch?: any;
}

export interface UserProgress {
  xp: number;
  levelUnlocked: number;
  starsPerLevel: Record<string, number>;
  completedLevels: string[];
  badges: string[];
  streakDays: number;
  bookmarks: string[];
  notes: UserNote[];
  username?: string;
}

export interface UserNote {
  id: string;
  topicId: string;
  title: string;
  content: string;
  updatedAt: string;
}

export interface ComparisonAlgoDetail {
  name: string;
  timeComplexity: { search: string; insert: string; delete: string };
  spaceComplexity: string;
  pros: string[];
  cons: string[];
  bestFor: string;
}

export interface AlgorithmComparison {
  id: string;
  title: string;
  category?: string;
  algoA: ComparisonAlgoDetail;
  algoB: ComparisonAlgoDetail;
  recommendation: string;
}

export interface QuizQuestion {
  id: string;
  levelId?: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  hint?: string;
}

export interface LeaderboardEntry {
  id?: string;
  username: string;
  xp: number;
  stars: number;
  completedCount?: number;
  rank: number;
}

export interface TreeBalancePuzzle {
  id: string;
  levelId?: string;
  title: string;
  description?: string;
  unbalancedNodes?: NodePosition[];
  initialTreeNodes?: NodePosition[];
  initialEdges?: EdgeConnection[];
  rotatedTreeNodes?: NodePosition[];
  rotatedEdges?: EdgeConnection[];
  unbalancedNodeValue?: number;
  targetRotation?: 'LL' | 'RR' | 'LR' | 'RL';
  correctRotation?: 'LL' | 'RR' | 'LR' | 'RL';
  explanation?: string;
  hint?: string;
}
