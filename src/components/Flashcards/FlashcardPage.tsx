import React, { useState, useEffect } from 'react';
import { CheckCircle2, ChevronRight, ChevronLeft, HelpCircle, Sparkles, Filter, Shuffle } from 'lucide-react';
import { fetchFlashcardReviews, fetchUserCompletions, rateFlashcard, recordCompletion, removeCompletion } from '../../services/api';

interface FlashcardPageProps {
  userId?: string;
}

interface Flashcard {
  id: string;
  category: 'Trees' | 'Graphs' | 'DynamicProgramming' | 'StringAndTrie' | 'AdvancedSets';
  question: string;
  answer: string;
  formula?: string;
}

const CARDS: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'Trees',
    question: 'What is the balance factor condition for any node in an AVL Tree?',
    answer: 'Balance Factor = Height(Left Subtree) - Height(Right Subtree) ∈ {-1, 0, 1}. If |BF| > 1, tree rotation is required.',
    formula: 'BalanceFactor = Height(Left) - Height(Right)'
  },
  {
    id: 'fc-2',
    category: 'Trees',
    question: 'When is a Left-Right (LR) double rotation performed in an AVL Tree?',
    answer: 'When a node has balance factor +2 (Left-heavy) and its left child has balance factor -1 (Right-heavy). Rotate Left on child, then Rotate Right on parent.',
    formula: 'BF(Node) = +2 and BF(LeftChild) = -1'
  },
  {
    id: 'fc-3',
    category: 'Graphs',
    question: "What is the time complexity of Dijkstra's algorithm with a Binary Min-Heap?",
    answer: 'O((V + E) log V), where V is the number of vertices and E is the number of edges.',
    formula: 'O((V + E) log V)'
  },
  {
    id: 'fc-4',
    category: 'DynamicProgramming',
    question: 'What is the state transition formula for 0/1 Knapsack problem?',
    answer: 'dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]]) if wt[i-1] <= w, else dp[i-1][w].',
    formula: 'dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]])'
  },
  {
    id: 'fc-5',
    category: 'StringAndTrie',
    question: 'What is the lookup time complexity of a Trie (Prefix Tree)?',
    answer: 'O(L), where L is the length of the string being searched. Lookup time is independent of total number of stored words.',
    formula: 'O(L)'
  },
  {
    id: 'fc-6',
    category: 'Trees',
    question: 'What is the Black-Height Property of a Red-Black Tree?',
    answer: 'Every simple path from a node to any descendant null leaf contains the exact same number of Black nodes.',
    formula: 'BlackHeight(path_1) == BlackHeight(path_2)'
  },
  {
    id: 'fc-7',
    category: 'Graphs',
    question: 'How does Bellman-Ford detect negative weight cycles?',
    answer: 'If any edge relaxation condition dist[u] + weight < dist[v] succeeds on the V-th pass, a negative cycle exists.',
    formula: 'V-th Pass: dist[u] + w < dist[v] => Negative Cycle'
  },
  {
    id: 'fc-8',
    category: 'AdvancedSets',
    question: 'What is the amortized complexity of DSU operations with Path Compression & Union by Rank?',
    answer: 'O(α(N)) per operation, where α(N) is the Inverse Ackermann function (effectively O(1) for all practical N).',
    formula: 'Time = O(α(N)) ≈ O(1)'
  },
  {
    id: 'fc-9',
    category: 'DynamicProgramming',
    question: 'What is the space complexity to find Longest Common Subsequence (LCS)?',
    answer: 'O(N × M) for full 2D DP grid, optimizable to O(min(N, M)) using 2 rows.',
    formula: 'Space = O(min(N, M))'
  },
  {
    id: 'fc-10',
    category: 'Trees',
    question: 'What operation does a Fenwick Tree (Binary Indexed Tree) perform using i & (-i)?',
    answer: 'i & (-i) isolates the lowest set bit, allowing range sum query and point update in O(log N).',
    formula: 'LowBit(i) = i & (-i)'
  },
  {
    id: 'fc-11',
    category: 'Graphs',
    question: 'What is the Max-Flow Min-Cut Theorem?',
    answer: 'The maximum amount of flow passing from source to sink in a network equals the minimum capacity of edges separating source from sink.',
    formula: 'MaxFlow = MinCut'
  },
  {
    id: 'fc-12',
    category: 'StringAndTrie',
    question: 'What is the purpose of the Longest Prefix Suffix (LPS) array in KMP algorithm?',
    answer: 'LPS[i] stores the length of the longest proper prefix of pattern[0..i] that is also a suffix of pattern[0..i], preventing redundant re-comparisons.',
    formula: 'LPS[i] = Length of matching prefix-suffix'
  },
  {
    id: 'fc-13',
    category: 'DynamicProgramming',
    question: 'How many subset states are evaluated in Bitmask DP for N items?',
    answer: '2^N states, where bit i is 1 if item i is included in subset and 0 if excluded.',
    formula: 'Total States = 2^N'
  },
  {
    id: 'fc-14',
    category: 'Trees',
    question: 'What is the maximum height of a B-Tree of minimum degree t?',
    answer: 'h ≤ log_t ((N + 1) / 2), keeping height extremely low for disk block efficiency.',
    formula: 'Height <= log_t(N)'
  },
  {
    id: 'fc-15',
    category: 'Graphs',
    question: 'What is an admissible heuristic in A* Search?',
    answer: 'A heuristic h(n) that never overestimates the true remaining cost to reach the goal node.',
    formula: 'h(n) <= h*(n)'
  },
  {
    id: 'fc-16',
    category: 'Trees',
    question: 'What is a Splay Tree Zig-Zig operation?',
    answer: 'Performed when node x and parent p are both left children (or both right children). Rotates p around g, then x around p.',
    formula: 'Zig-Zig: Rotate(Grandparent), Rotate(Parent)'
  },
  {
    id: 'fc-17',
    category: 'Trees',
    question: 'How does a Treap maintain randomized balance?',
    answer: 'Assigns a random priority to each key during insertion and uses tree rotations to maintain Min-Heap priority property.',
    formula: 'Key = BST Order, Priority = Min-Heap Order'
  },
  {
    id: 'fc-18',
    category: 'Graphs',
    question: "What is Tarjan's Low-Link Value in SCC detection?",
    answer: 'low[u] is the lowest node discovery time reachable from u via u\'s DFS subtree, including at most one back-edge.',
    formula: 'low[u] = min(disc[u], disc[w])'
  },
  {
    id: 'fc-19',
    category: 'DynamicProgramming',
    question: 'What is the matrix chain multiplication DP state definition?',
    answer: 'm[i][j] represents minimum scalar multiplications needed to compute matrix product A_i...A_j.',
    formula: 'm[i][j] = min(m[i][k] + m[k+1][j] + p_{i-1} p_k p_j)'
  },
  {
    id: 'fc-20',
    category: 'StringAndTrie',
    question: 'What is the number of states in a Suffix Automaton for string length N?',
    answer: 'At most 2N - 1 states and 3N - 4 transitions.',
    formula: 'States <= 2N - 1'
  },
  {
    id: 'fc-21',
    category: 'AdvancedSets',
    question: 'Why is Path Compression used in Union-Find?',
    answer: 'Flattens tree structure during find operations by making every visited node point directly to root.',
    formula: 'parent[x] = find(parent[x])'
  },
  {
    id: 'fc-22',
    category: 'Trees',
    question: 'What is the maximum number of light edges on any path in Heavy-Light Decomposition (HLD)?',
    answer: 'At most log₂ N light edges, because crossing a light edge at least doubles the subtree size.',
    formula: 'LightEdges <= log2(N)'
  },
  {
    id: 'fc-23',
    category: 'Graphs',
    question: "What is the time complexity of Floyd-Warshall All-Pairs Shortest Path?",
    answer: 'O(V³) using 3 nested loops for intermediate node k, source i, and target j.',
    formula: 'Time = O(V^3)'
  },
  {
    id: 'fc-24',
    category: 'DynamicProgramming',
    question: 'What is optimal substructure property in Dynamic Programming?',
    answer: 'An optimal solution to the overall problem contains optimal solutions to its sub-problems.',
    formula: 'OPT(Problem) = Combine(OPT(Subproblems))'
  },
  {
    id: 'fc-25',
    category: 'StringAndTrie',
    question: 'What is the time complexity to build a Suffix Array using Prefix Doubling?',
    answer: 'O(N log² N) basic or O(N log N) optimized using radix sort.',
    formula: 'Time = O(N log N)'
  },
  {
    id: 'fc-26',
    category: 'Trees',
    question: 'What is the query time complexity of a Segment Tree?',
    answer: 'O(log N) per range query (sum, min, max, gcd...) and O(log N) per point update, since each query visits at most 2·log N nodes.',
    formula: 'Query = Update = O(log N)'
  },
  {
    id: 'fc-27',
    category: 'Trees',
    question: 'How does a Fenwick Tree (BIT) perform a point update?',
    answer: 'Update the index i, then walk upward through i += i & (-i) until exceeding N, adding the delta at each visited node.',
    formula: 'i += i & (-i)'
  },
  {
    id: 'fc-28',
    category: 'Graphs',
    question: 'What is the time complexity of Prim\u2019s MST algorithm with a Binary Min-Heap?',
    answer: 'O(E log V) — each vertex is extracted once and every edge may trigger a decrease-key.',
    formula: 'Time = O(E log V)'
  },
  {
    id: 'fc-29',
    category: 'Graphs',
    question: 'What is the time complexity of Kruskal\u2019s MST algorithm?',
    answer: 'O(E log E) for sorting edges, plus near O(1) amortized DSU union/find for each edge.',
    formula: 'Time = O(E log E)'
  },
  {
    id: 'fc-30',
    category: 'DynamicProgramming',
    question: 'What is the time complexity of Longest Increasing Subsequence using patience sorting?',
    answer: 'O(N log N) using binary search on the tails array (lower bound of the current value).',
    formula: 'Time = O(N log N)'
  },
  {
    id: 'fc-31',
    category: 'DynamicProgramming',
    question: 'What is the transition for the minimum-coin-change DP?',
    answer: 'dp[a] = min over all coins c of (dp[a - c] + 1), where dp[0] = 0 and dp[a] = ∞ initially for unreachable amounts.',
    formula: 'dp[a] = min_c(dp[a - c] + 1)'
  },
  {
    id: 'fc-32',
    category: 'DynamicProgramming',
    question: 'What is the Edit Distance (Levenshtein) DP transition?',
    answer: 'If characters match, dp[i][j] = dp[i-1][j-1]; otherwise take the minimum of insert, delete, and replace: 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]).',
    formula: 'dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])'
  },
  {
    id: 'fc-33',
    category: 'StringAndTrie',
    question: 'What does Z[i] represent in the Z-algorithm?',
    answer: 'Z[i] is the length of the longest substring starting at position i that is also a prefix of the whole string. Pattern matching runs in O(N + M).',
    formula: 'Z[i] = LCP(s, s[i..])'
  },
  {
    id: 'fc-34',
    category: 'StringAndTrie',
    question: 'What is the time complexity of Manacher\u2019s algorithm for palindrome detection?',
    answer: 'O(N) — it finds all palindrome radii using the mirror property of palindromes inside the current rightmost center.',
    formula: 'Time = O(N)'
  },
  {
    id: 'fc-35',
    category: 'AdvancedSets',
    question: 'How does Union by Rank work in DSU?',
    answer: 'Attach the smaller tree (by rank/depth) under the root of the larger tree during union, keeping trees shallow.',
    formula: 'rank[a] < rank[b] => parent[a] = b'
  },
  {
    id: 'fc-36',
    category: 'Trees',
    question: 'Which rotation fixes an RR imbalance in an AVL Tree?',
    answer: 'A Single Left Rotation on the unbalanced node: the right child becomes the new root, the old root becomes its left child.',
    formula: 'RR => RotateLeft(Node)'
  },
  {
    id: 'fc-37',
    category: 'Graphs',
    question: 'What is the time complexity of the Bellman-Ford algorithm?',
    answer: 'O(V · E) — V-1 relaxation passes over all E edges, with one extra pass to detect negative cycles.',
    formula: 'Time = O(V * E)'
  },
  {
    id: 'fc-38',
    category: 'AdvancedSets',
    question: 'What is the optimal block size in Sqrt Decomposition?',
    answer: 'About √N elements per block, giving O(√N) worst case per range query and per point update.',
    formula: 'BlockSize ≈ √N'
  },
  {
    id: 'fc-39',
    category: 'StringAndTrie',
    question: 'What is the space complexity of a Trie with S strings of total length L?',
    answer: 'O(L · alphabetSize) in the array-of-children representation, or O(L) with hash maps; independent of number of distinct strings.',
    formula: 'Space = O(total characters)'
  },
  {
    id: 'fc-40',
    category: 'Trees',
    question: 'What is the maximum height of a Red-Black Tree with N nodes?',
    answer: 'At most 2·log₂(N + 1), because the red-black property caps the ratio between the longest and shortest root-to-leaf paths at 2:1.',
    formula: 'Height <= 2 * log2(N + 1)'
  }
];

export const FlashcardPage: React.FC<FlashcardPageProps> = ({ userId }) => {
  const [selectedCat, setSelectedCat] = useState<string>('ALL');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [order, setOrder] = useState<Flashcard[]>(CARDS);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    if (userId) {
      Promise.all([fetchUserCompletions(userId, 'flashcard'), fetchFlashcardReviews()]).then(([cs, schedule]) => {
        setMasteredIds(cs.map((c: any) => c.puzzleId));
        setReviews(schedule.reviews || []);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [userId]);

  const filteredCards = selectedCat === 'ALL'
    ? order
    : order.filter(c => c.category === selectedCat);

  const card = filteredCards[currentIndex % filteredCards.length] || CARDS[0];
  const isMastered = masteredIds.includes(card.id);
  const dueCount = CARDS.filter(item => {
    const review = reviews.find(entry => entry.cardId === item.id);
    return !review || new Date(review.nextReviewAt) <= new Date();
  }).length;

  const handleRating = async (rating: 'again'|'hard'|'good'|'easy') => {
    const review = await rateFlashcard(card.id, rating);
    if (review) setReviews(previous => [review, ...previous.filter(item => item.cardId !== card.id)]);
    if ((rating === 'good' || rating === 'easy') && userId && !isMastered) {
      await recordCompletion(userId, card.id, 'flashcard');
      setMasteredIds(previous => previous.includes(card.id) ? previous : [...previous, card.id]);
    }
    handleNext();
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    const shuffled = [...order].sort(() => Math.random() - 0.5);
    setOrder(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const toggleMastered = () => {
    if (!userId) return;
    if (isMastered) {
      removeCompletion(userId, card.id).then(() => {
        setMasteredIds(prev => prev.filter(id => id !== card.id));
      });
    } else {
      recordCompletion(userId, card.id, 'flashcard').then(() => {
        setMasteredIds(prev => (prev.includes(card.id) ? prev : [...prev, card.id]));
      });
    }
  };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h2 className="section-title">ADSA Memory Flashcards ({CARDS.length} Cards)</h2>
        <p className="section-subtitle">Spaced-repetition memory review for complexities, formulas, and rotation rules.</p>
        <span style={{ display: 'inline-block', marginTop: 8, padding: '4px 10px', borderRadius: 100, background: 'rgba(255,149,0,.12)', color: '#B45F00', fontSize: '.75rem', fontWeight: 800 }}>{dueCount} due now</span>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 20, paddingBottom: 4 }}>
        {[
          { key: 'ALL', label: 'All Cards' },
          { key: 'Trees', label: 'Trees' },
          { key: 'Graphs', label: 'Graphs' },
          { key: 'DynamicProgramming', label: 'DP' },
          { key: 'StringAndTrie', label: 'Strings & Trie' },
          { key: 'AdvancedSets', label: 'Advanced' },
        ].map(cat => (
          <button
            key={cat.key}
            onClick={() => { setSelectedCat(cat.key); setCurrentIndex(0); setIsFlipped(false); }}
            style={{
              background: selectedCat === cat.key ? '#000000' : 'var(--bg-light)',
              color: selectedCat === cat.key ? '#FFFFFF' : 'var(--text-secondary)',
              border: '1px solid var(--border-hairline)', borderRadius: '100px',
              padding: '6px 14px', fontSize: '0.78rem', fontWeight: 700,
              cursor: 'pointer', fontFamily: 'var(--font-main)', transition: 'all 0.2s ease', whiteSpace: 'nowrap'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Counter & Mastered Stats */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          CARD {(currentIndex % filteredCards.length) + 1} OF {filteredCards.length}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <CheckCircle2 size={14} /> {masteredIds.length} Mastered
            {loading && <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600 }}>(syncing…)</span>}
          </span>
          <button
            onClick={handleShuffle}
            aria-label="Shuffle cards"
            title="Shuffle deck"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px',
              borderRadius: 100, border: '1.5px solid var(--border-hairline)', background: 'var(--bg-light)',
              fontSize: '0.75rem', fontWeight: 800, color: '#000000', cursor: 'pointer', transition: 'all 0.2s ease'
            }}
          >
            <Shuffle size={13} /> Shuffle
          </button>
        </span>
      </div>

      {/* Progress Bar */}
      <div style={{ height: 6, borderRadius: 100, background: 'var(--bg-grey)', overflow: 'hidden', marginBottom: 18 }}>
        <div
          style={{
            height: '100%',
            borderRadius: 100,
            background: 'linear-gradient(90deg, #007AFF, #5AC8FA)',
            width: `${(((currentIndex % filteredCards.length) + 1) / filteredCards.length) * 100}%`,
            transition: 'width 0.4s cubic-bezier(0.33, 1, 0.68, 1)'
          }}
        />
      </div>

      {/* Main Interactive Flashcard — 3D Flip */}
      <div
        className={`flashcard-scene ${isFlipped ? 'is-flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
        key={card.id}
        style={{ marginBottom: 24, cursor: 'pointer' }}
      >
        {/* Front face — question */}
        <div className="flashcard-face flashcard-front card-light">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontSize: '0.7rem', fontWeight: 800, padding: '4px 10px', borderRadius: '100px',
              background: 'var(--bg-grey)', color: '#000000', textTransform: 'uppercase', letterSpacing: '0.06em'
            }}>
              {card.category}
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <HelpCircle size={14} /> Tap to reveal answer
            </span>
          </div>

          <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', flex: 1 }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, lineHeight: 1.4, color: '#000000' }}>
              {card.question}
            </h3>
          </div>

          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'right' }}>
            Question View
          </div>
        </div>

        {/* Back face — answer */}
        <div className="flashcard-face flashcard-back card-black">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontSize: '0.7rem', fontWeight: 800, padding: '4px 10px', borderRadius: '100px',
              background: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.06em'
            }}>
              Answer • {card.category}
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <HelpCircle size={14} /> Tap to view question
            </span>
          </div>

          <div style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
            <p style={{ fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.55, color: '#FFFFFF', marginBottom: 14 }}>
              {card.answer}
            </p>
            {card.formula && (
              <code style={{
                fontFamily: 'var(--font-code)',
                fontSize: '0.85rem',
                color: 'var(--accent-gold)',
                background: 'rgba(255,255,255,0.12)',
                padding: '6px 14px',
                borderRadius: 6,
                display: 'inline-block'
              }}>
                {card.formula}
              </code>
            )}
          </div>

          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textAlign: 'right' }}>
            Answer Revealed
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button className="btn btn-secondary" onClick={handlePrev}>
          <ChevronLeft size={18} /> Prev
        </button>

        <button
          className={`btn ${isMastered ? 'btn-success' : 'btn-secondary'}`}
          onClick={toggleMastered}
        >
          <CheckCircle2 size={16} /> {isMastered ? 'Mastered' : 'Mark Mastered'}
        </button>

        <button className="btn btn-primary" onClick={handleNext}>
          Next <ChevronRight size={18} />
        </button>
      </div>
      {isFlipped && <div aria-label="Rate recall quality" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 7, marginTop: 12 }}>
        <button className="btn btn-secondary btn-sm" onClick={() => handleRating('again')}>Again · 10m</button>
        <button className="btn btn-secondary btn-sm" onClick={() => handleRating('hard')}>Hard · 1d</button>
        <button className="btn btn-secondary btn-sm" onClick={() => handleRating('good')}>Good · 2d+</button>
        <button className="btn btn-primary btn-sm" onClick={() => handleRating('easy')}>Easy · 4d+</button>
      </div>}
    </div>
  );
};
