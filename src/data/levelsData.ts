import { LevelTopic } from '../types';

export const LEVEL_TOPICS: LevelTopic[] = [
  {
    id: 'level-1-bst',
    levelNumber: 1,
    title: 'BST Basics & Insertions',
    category: 'Trees',
    description: 'Learn Binary Search Tree (BST) ordering property: Left < Node < Right.',
    algorithmKey: 'bst',
    difficulty: 'Easy',
    estimatedMinutes: 5,
    defaultInput: [15, 10, 20, 8, 12, 17, 25],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Which traversal of a BST outputs elements in sorted ascending order?',
        options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
        correctAnswerIndex: 1,
        explanation: 'In-order traversal visits (Left, Root, Right), which outputs keys in strictly sorted order.'
      }
    ]
  },
  {
    id: 'level-2-avl',
    levelNumber: 2,
    title: 'AVL Tree Rotations',
    category: 'Trees',
    description: 'Master self-balancing BST height balance conditions and LL/RR/LR/RL rotations.',
    algorithmKey: 'avl',
    difficulty: 'Medium',
    estimatedMinutes: 8,
    defaultInput: [10, 20, 30, 40, 50, 25],
    quizQuestions: [
      {
        id: 'q2',
        question: 'What is the balance factor constraint for every node in an AVL tree?',
        options: ['Height(left) - Height(right) ∈ {-1, 0, 1}', 'Height <= 5', 'Left child count = Right child count', 'Balance Factor = 0 strictly'],
        correctAnswerIndex: 0,
        explanation: 'AVL trees enforce |Balance Factor| ≤ 1 across all nodes.'
      }
    ]
  },
  {
    id: 'level-3-redblack',
    levelNumber: 3,
    title: 'Red-Black Tree Properties',
    category: 'Trees',
    description: 'Understand node coloring, black-height balance, and double red violations.',
    algorithmKey: 'redblack',
    difficulty: 'Medium',
    estimatedMinutes: 10,
    defaultInput: [10, 18, 7, 15, 16, 30],
    quizQuestions: [
      {
        id: 'q3',
        question: 'Can a Red node have a Red child in a Red-Black tree?',
        options: ['Yes, always', 'No, Red nodes must have Black children', 'Only at root', 'Only if leaf is black'],
        correctAnswerIndex: 1,
        explanation: 'No two consecutive Red nodes are allowed on any path (Red Property).'
      }
    ]
  },
  {
    id: 'level-4-heap',
    levelNumber: 4,
    title: 'Min & Max Heap Priority Queue',
    category: 'Trees',
    description: 'Explore complete binary trees, array representation, and sift-up/sift-down heapify.',
    algorithmKey: 'heap',
    difficulty: 'Easy',
    estimatedMinutes: 6,
    defaultInput: [5, 12, 9, 20, 14, 18, 3],
    quizQuestions: [
      {
        id: 'q4',
        question: 'For a 0-indexed heap array, what is the left child index of node i?',
        options: ['2i', '2i + 1', '2i + 2', 'i / 2'],
        correctAnswerIndex: 1,
        explanation: 'In 0-indexed arrays, left child = 2i + 1 and right child = 2i + 2.'
      }
    ]
  },
  {
    id: 'level-5-btree',
    levelNumber: 5,
    title: 'B-Tree & Database Indexing',
    category: 'Trees',
    description: 'Multi-way search tree used in OS filesystems and database indexing.',
    algorithmKey: 'btree',
    difficulty: 'Hard',
    estimatedMinutes: 12,
    defaultInput: [10, 20, 30, 40, 50, 60, 70],
    quizQuestions: [
      {
        id: 'q5',
        question: 'Why are B-Trees preferred over AVL trees for disk storage?',
        options: ['They use less memory', 'They minimize disk I/O reads by having large branching factors', 'They are binary trees', 'They never split nodes'],
        correctAnswerIndex: 1,
        explanation: 'High branching factor reduces tree height, minimizing disk block reads.'
      }
    ]
  },
  {
    id: 'level-6-segment',
    levelNumber: 6,
    title: 'Segment Tree Range Queries',
    category: 'Trees',
    description: 'Perform range sum and range minimum queries with point updates in O(log N).',
    algorithmKey: 'segment',
    difficulty: 'Hard',
    estimatedMinutes: 12,
    defaultInput: [1, 3, 5, 7, 9, 11],
    quizQuestions: [
      {
        id: 'q6',
        question: 'What is the time complexity to query a range sum in a Segment Tree?',
        options: ['O(N)', 'O(log N)', 'O(1)', 'O(N log N)'],
        correctAnswerIndex: 1,
        explanation: 'Segment tree range query decomposes into at most 2 log N subsegment nodes.'
      }
    ]
  },
  {
    id: 'level-7-trie',
    levelNumber: 7,
    title: 'Trie Prefix Search Engine',
    category: 'StringAndTrie',
    description: 'Build prefix search engines for dictionary lookups and auto-complete.',
    algorithmKey: 'trie',
    difficulty: 'Medium',
    estimatedMinutes: 8,
    defaultInput: ['cat', 'car', 'cart', 'dog', 'dot'],
    quizQuestions: [
      {
        id: 'q7',
        question: 'What is the search time complexity for a word of length L in a Trie?',
        options: ['O(N)', 'O(L)', 'O(N log L)', 'O(2^L)'],
        correctAnswerIndex: 1,
        explanation: 'Search depends strictly on length L of target word.'
      }
    ]
  },
  {
    id: 'level-8-bfsdfs',
    levelNumber: 8,
    title: 'BFS & DFS Graph Traversals',
    category: 'Graphs',
    description: 'Queue-based Breadth-First Search vs Stack-based Depth-First Search.',
    algorithmKey: 'bfsdfs',
    difficulty: 'Easy',
    estimatedMinutes: 6,
    defaultInput: [0, 1, 2, 3, 4],
    quizQuestions: [
      {
        id: 'q8',
        question: 'Which data structure is used to implement Breadth-First Search (BFS)?',
        options: ['Stack', 'Queue', 'Priority Queue', 'Array'],
        correctAnswerIndex: 1,
        explanation: 'BFS processes vertices in FIFO order using a Queue.'
      }
    ]
  },
  {
    id: 'level-9-dijkstra',
    levelNumber: 9,
    title: "Dijkstra's Shortest Path",
    category: 'Graphs',
    description: 'Greedy shortest path algorithm for non-negative weighted graphs.',
    algorithmKey: 'dijkstra',
    difficulty: 'Medium',
    estimatedMinutes: 10,
    defaultInput: [0, 1, 2, 3, 4],
    quizQuestions: [
      {
        id: 'q9',
        question: "Does Dijkstra's algorithm work with negative edge weights?",
        options: ['Yes, always', 'No, it can get stuck in cycles or yield incorrect results', 'Only if graph is a tree', 'Only for directed graphs'],
        correctAnswerIndex: 1,
        explanation: 'Dijkstra assumes distances only increase; negative edges break greedy choice.'
      }
    ]
  },
  {
    id: 'level-10-bellmanford',
    levelNumber: 10,
    title: 'Bellman-Ford Algorithm',
    category: 'Graphs',
    description: 'Single-source shortest path algorithm capable of detecting negative weight cycles.',
    algorithmKey: 'bellmanford',
    difficulty: 'Medium',
    estimatedMinutes: 10,
    defaultInput: [0, 1, 2, 3],
    quizQuestions: [
      {
        id: 'q10',
        question: 'How many edge relaxation passes does Bellman-Ford run?',
        options: ['V - 1 passes', 'V passes', 'E passes', 'log V passes'],
        correctAnswerIndex: 0,
        explanation: 'A simple shortest path can have at most V-1 edges, so V-1 relaxations suffice.'
      }
    ]
  },
  {
    id: 'level-11-mst',
    levelNumber: 11,
    title: "Prim's & Kruskal's MST",
    category: 'Graphs',
    description: 'Minimum Spanning Tree algorithms connecting graph nodes with minimum total weight.',
    algorithmKey: 'mst',
    difficulty: 'Medium',
    estimatedMinutes: 10,
    defaultInput: [0, 1, 2, 3, 4],
    quizQuestions: [
      {
        id: 'q11',
        question: "What data structure makes Kruskal's MST algorithm efficient?",
        options: ['Disjoint Set Union (DSU)', 'BST', 'Trie', 'Hash Table'],
        correctAnswerIndex: 0,
        explanation: 'DSU with path compression checks cycle formation in near O(1) time.'
      }
    ]
  },
  {
    id: 'level-12-tarjan',
    levelNumber: 12,
    title: "Tarjan's Strongly Connected Components",
    category: 'Graphs',
    description: 'Find all Strongly Connected Components (SCC) in a directed graph using DFS & low-links.',
    algorithmKey: 'tarjan',
    difficulty: 'Hard',
    estimatedMinutes: 14,
    defaultInput: [0, 1, 2, 3, 4, 5],
    quizQuestions: [
      {
        id: 'q12',
        question: "What is the time complexity of Tarjan's SCC algorithm?",
        options: ['O(V + E)', 'O(V²)', 'O(V E)', 'O(V log V)'],
        correctAnswerIndex: 0,
        explanation: 'Tarjan runs a single DFS traversal visiting every vertex and edge once.'
      }
    ]
  },
  {
    id: 'level-13-knapsack',
    levelNumber: 13,
    title: '0/1 Knapsack Problem (DP)',
    category: 'DynamicProgramming',
    description: 'Maximize value under knapsack capacity using 2D DP state tabulation.',
    algorithmKey: 'knapsack',
    difficulty: 'Medium',
    estimatedMinutes: 10,
    defaultInput: [10, 20, 30],
    quizQuestions: [
      {
        id: 'q13',
        question: 'What is the recurrence relation for 0/1 Knapsack?',
        options: ['dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w-wt[i-1]])', 'dp[i][w] = dp[i-1][w] + val[i]', 'dp[i] = dp[i-1]', 'dp[i] = min(wt[i])'],
        correctAnswerIndex: 0,
        explanation: 'Max of excluding item (dp[i-1][w]) or including item (val + dp[i-1][w-wt]).'
      }
    ]
  },
  {
    id: 'level-14-lcs',
    levelNumber: 14,
    title: 'Longest Common Subsequence (LCS)',
    category: 'DynamicProgramming',
    description: 'Find longest common sequence between two strings using DP grid.',
    algorithmKey: 'lcs',
    difficulty: 'Medium',
    estimatedMinutes: 10,
    defaultInput: ['ABCDGH', 'AEDFHR'],
    quizQuestions: [
      {
        id: 'q14',
        question: 'If characters match at S1[i] and S2[j], what is the DP state update?',
        options: ['1 + dp[i-1][j-1]', 'dp[i-1][j]', 'dp[i][j-1]', 'max(dp[i-1][j], dp[i][j-1])'],
        correctAnswerIndex: 0,
        explanation: 'Matching character extends previous sub-problem length by 1.'
      }
    ]
  },
  {
    id: 'level-15-floydwarshall',
    levelNumber: 15,
    title: 'Floyd-Warshall All-Pairs Shortest Path',
    category: 'DynamicProgramming',
    description: 'Find shortest paths between all pairs of vertices using triple loop DP.',
    algorithmKey: 'floydwarshall',
    difficulty: 'Hard',
    estimatedMinutes: 12,
    defaultInput: [0, 1, 2, 3],
    quizQuestions: [
      {
        id: 'q15',
        question: 'What is the time complexity of Floyd-Warshall algorithm?',
        options: ['O(V³)', 'O(V²)', 'O(V E)', 'O(V log V)'],
        correctAnswerIndex: 0,
        explanation: 'Uses 3 nested loops iterating through intermediate vertex k, source i, and dest j.'
      }
    ]
  },
  {
    id: 'level-16-matrixchain',
    levelNumber: 16,
    title: 'Matrix Chain Multiplication',
    category: 'DynamicProgramming',
    description: 'Find optimal scalar multiplication ordering for a chain of matrices.',
    algorithmKey: 'matrixchain',
    difficulty: 'Hard',
    estimatedMinutes: 14,
    defaultInput: [10, 20, 30, 40, 30],
    quizQuestions: [
      {
        id: 'q16',
        question: 'Matrix Chain Multiplication DP solves which problem optimization?',
        options: ['Parenthesization ordering to minimize scalar multiplications', 'Matrix inversion', 'Eigenvalue decomposition', 'Determinant sum'],
        correctAnswerIndex: 0,
        explanation: 'Matrix multiplication is associative; choice of parentheses drastically changes operations.'
      }
    ]
  },
  {
    id: 'level-17-dsu',
    levelNumber: 17,
    title: 'Disjoint Set Union (DSU)',
    category: 'AdvancedSets',
    description: 'Union-Find data structure with Path Compression and Rank optimization.',
    algorithmKey: 'dsu',
    difficulty: 'Medium',
    estimatedMinutes: 8,
    defaultInput: [0, 1, 2, 3, 4, 5],
    quizQuestions: [
      {
        id: 'q17',
        question: 'What is the amortized time complexity per find operation with Path Compression?',
        options: ['O(α(N)) near O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
        correctAnswerIndex: 0,
        explanation: 'Path compression + rank union yields Inverse Ackermann function α(N) ≈ O(1).'
      }
    ]
  },
  {
    id: 'level-18-kmp',
    levelNumber: 18,
    title: 'KMP Pattern Matching',
    category: 'StringAndTrie',
    description: 'Knuth-Morris-Pratt string matching using Longest Prefix Suffix (LPS) array.',
    algorithmKey: 'kmp',
    difficulty: 'Hard',
    estimatedMinutes: 12,
    defaultInput: ['ABABDABACDABABCABAB', 'ABABCABAB'],
    quizQuestions: [
      {
        id: 'q18',
        question: 'What is the worst-case time complexity of KMP algorithm?',
        options: ['O(N + M)', 'O(N * M)', 'O(N log M)', 'O(N²)'],
        correctAnswerIndex: 0,
        explanation: 'LPS preprocessing takes O(M) and text search takes O(N).'
      }
    ]
  },
  {
    id: 'level-19-suffixarray',
    levelNumber: 19,
    title: 'Suffix Array & LCP Array',
    category: 'StringAndTrie',
    description: 'Sorted array of all suffixes of a string for fast substring searching.',
    algorithmKey: 'suffixarray',
    difficulty: 'Hard',
    estimatedMinutes: 15,
    defaultInput: ['banana'],
    quizQuestions: [
      {
        id: 'q19',
        question: 'How fast can substring binary search be performed using a Suffix Array of length N?',
        options: ['O(M log N)', 'O(N * M)', 'O(N²)', 'O(N log N)'],
        correctAnswerIndex: 0,
        explanation: 'Binary search on N sorted suffixes for pattern length M takes O(M log N).'
      }
    ]
  },
  {
    id: 'level-20-amortized',
    levelNumber: 20,
    title: 'JNTUA Unit 1: Amortized Analysis Methods',
    category: 'Trees',
    description: 'Master Aggregate, Accounting, and Potential Methods for analyzing sequence operation bounds.',
    algorithmKey: 'avl',
    difficulty: 'Master',
    estimatedMinutes: 15,
    defaultInput: [10, 20, 30, 40],
    quizQuestions: [
      {
        id: 'q20',
        question: 'Which amortized method assigns pre-paid credit (tokens) to early operations to pay for later expensive operations?',
        options: ['Accounting Method', 'Aggregate Method', 'Potential Method', 'Brute Force'],
        correctAnswerIndex: 0,
        explanation: 'The Accounting Method charges overcharges early operations to store credit for costly operations.'
      }
    ]
  },
  {
    id: 'level-21-fibonacci',
    levelNumber: 21,
    title: 'JNTUA Unit 2: Fibonacci Heap Operations',
    category: 'Trees',
    description: 'Master Fibonacci Heap Decrease-Key in amortized O(1) time using cascading cuts.',
    algorithmKey: 'heap',
    difficulty: 'Master',
    estimatedMinutes: 15,
    defaultInput: [10, 20, 30, 40, 50],
    quizQuestions: [
      {
        id: 'q21',
        question: 'What is the amortized time complexity of Decrease-Key in a Fibonacci Heap?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
        correctAnswerIndex: 0,
        explanation: 'Fibonacci Heaps achieve O(1) amortized Decrease-Key via lazy tree consolidation.'
      }
    ]
  },
  {
    id: 'level-22-rabinkarp',
    levelNumber: 22,
    title: 'JNTUA Unit 3: Rabin-Karp & Boyer-Moore String Search',
    category: 'StringAndTrie',
    description: 'Explore Rolling Hash (Rabin-Karp) and Bad Character Heuristic (Boyer-Moore).',
    algorithmKey: 'kmp',
    difficulty: 'Hard',
    estimatedMinutes: 14,
    defaultInput: ['GEEKS FOR GEEKS', 'GEEK'],
    quizQuestions: [
      {
        id: 'q22',
        question: 'What technique allows Rabin-Karp to compute pattern hash values in O(1) per shift?',
        options: ['Rolling Hash Function', 'Binary Search', 'LPS Array', 'Prefix Tree'],
        correctAnswerIndex: 0,
        explanation: 'Rolling hash subtracts leading char hash and adds trailing char hash in O(1).'
      }
    ]
  },
  {
    id: 'level-23-convexhull',
    levelNumber: 23,
    title: 'JNTUA Unit 5: Convex Hull (Graham Scan & Jarvis March)',
    category: 'AdvancedSets',
    description: 'Find smallest convex polygon enclosing 2D points using cross-product orientation.',
    algorithmKey: 'segment',
    difficulty: 'Master',
    estimatedMinutes: 16,
    defaultInput: [0, 3, 1, 1, 2, 2, 4, 4, 0, 0, 1, 2, 3, 1, 3, 3],
    quizQuestions: [
      {
        id: 'q23',
        question: "What is the time complexity of Graham's Scan Convex Hull algorithm?",
        options: ['O(N log N)', 'O(N²)', 'O(N³)', 'O(2^N)'],
        correctAnswerIndex: 0,
        explanation: "Sorting points by polar angle takes O(N log N); linear stack scan takes O(N)."
      }
    ]
  },
  {
    id: 'level-24-npcomplete',
    levelNumber: 24,
    title: 'JNTUA Unit 5: NP-Completeness & Approximation',
    category: 'AdvancedSets',
    description: 'Learn P vs NP, 3-SAT reductions, Vertex Cover 2-approximation, and TSP limits.',
    algorithmKey: 'knapsack',
    difficulty: 'Master',
    estimatedMinutes: 18,
    defaultInput: [0, 1, 2, 3],
    quizQuestions: [
      {
        id: 'q24',
        question: 'What approximation ratio does the Greedy Vertex Cover algorithm guarantee?',
        options: ['2-Approximation (Result <= 2 * OPT)', '1.5-Approximation', 'Polynomial Exact', 'No bound'],
        correctAnswerIndex: 0,
        explanation: 'Greedy maximal matching picks both endpoints of un-covered edges, guaranteeing ≤ 2 * OPT.'
      }
    ]
  },
  {
    id: 'level-25-toposort',
    levelNumber: 25,
    title: 'Topological Sort (Kahn & DFS)',
    category: 'Graphs',
    description: 'Linear ordering of DAG vertices so every edge flows forward — with in-degree counting and DFS finishing times.',
    algorithmKey: 'toposort',
    difficulty: 'Medium',
    estimatedMinutes: 10,
    defaultInput: [0, 1, 2, 3, 4, 5],
    quizQuestions: [
      {
        id: 'q25',
        question: 'On which graph does Topological Sort apply?',
        options: ['Directed Acyclic Graphs (DAG)', 'Undirected graphs', 'Cyclic directed graphs', 'Any weighted graph'],
        correctAnswerIndex: 0,
        explanation: 'A cycle means no valid linear ordering exists, so Topological Sort requires a DAG.'
      }
    ]
  },
  {
    id: 'level-26-hashing',
    levelNumber: 26,
    title: 'Hash Tables: Chaining & Open Addressing',
    category: 'AdvancedSets',
    description: 'Hash functions, collision resolution via chaining and linear/quadratic probing, and load factors.',
    algorithmKey: 'hashing',
    difficulty: 'Medium',
    estimatedMinutes: 10,
    defaultInput: [10, 22, 31, 4, 15, 28, 17, 88, 59],
    quizQuestions: [
      {
        id: 'q26',
        question: 'What is the expected time complexity of search in a hash table with good hashing and low load factor?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
        correctAnswerIndex: 0,
        explanation: 'With uniform hashing, expected probe/collision counts are constant, giving O(1) average search.'
      }
    ]
  },
  {
    id: 'level-27-fenwick',
    levelNumber: 27,
    title: 'Binary Indexed Tree (Fenwick Tree)',
    category: 'Trees',
    description: 'Point updates and prefix sums in O(log N) using lowbit-indexed BIT arrays.',
    algorithmKey: 'fenwick',
    difficulty: 'Hard',
    estimatedMinutes: 12,
    defaultInput: [3, 2, -1, 6, 5, 4, -3, 3, 7, 2, 9],
    quizQuestions: [
      {
        id: 'q27',
        question: 'Which operation on a Fenwick tree costs O(log N) and tracks prefix sums?',
        options: ['Update a single index and query prefix sums', 'Range updates in O(1)', 'Find the median in O(1)', 'Delete arbitrary elements'],
        correctAnswerIndex: 0,
        explanation: 'Point update + prefix query both walk O(log N) lowbit jumps in the BIT array.'
      }
    ]
  },
  {
    id: 'level-28-editdistance',
    levelNumber: 28,
    title: 'Edit Distance (Levenshtein)',
    category: 'DynamicProgramming',
    description: 'Minimum insert/delete/substitute operations to convert one string into another via DP grid.',
    algorithmKey: 'editdistance',
    difficulty: 'Medium',
    estimatedMinutes: 10,
    defaultInput: ['horse', 'ros'],
    quizQuestions: [
      {
        id: 'q28',
        question: 'What is the edit distance between "cat" and "car"?',
        options: ['1 (substitute t → r)', '2', '3', '0'],
        correctAnswerIndex: 0,
        explanation: 'Only the last character differs, so one substitution suffices.'
      }
    ]
  },
  {
    id: 'level-29-bitmaskdp',
    levelNumber: 29,
    title: 'Bitmask DP (TSP & Subset Cover)',
    category: 'DynamicProgramming',
    description: 'DP over subsets encoded as bitmasks — the classic Held-Karp Travelling Salesman solution.',
    algorithmKey: 'bitmaskdp',
    difficulty: 'Master',
    estimatedMinutes: 14,
    defaultInput: [0, 1, 2, 3],
    quizQuestions: [
      {
        id: 'q29',
        question: 'What is the complexity of Held-Karp (bitmask TSP) for N cities?',
        options: ['O(2^N · N²)', 'O(N!)', 'O(N³)', 'O(2^N · N)'],
        correctAnswerIndex: 0,
        explanation: 'There are 2^N subsets and N endpoints, each transitioned over N predecessors: O(2^N · N²).'
      }
    ]
  },
  {
    id: 'level-30-maxflow',
    levelNumber: 30,
    title: 'Ford-Fulkerson & Max Flow',
    category: 'Graphs',
    description: 'Augmenting paths, residual networks, and the Max-Flow Min-Cut theorem.',
    algorithmKey: 'maxflow',
    difficulty: 'Hard',
    estimatedMinutes: 12,
    defaultInput: [0, 1, 2, 3, 4, 5],
    quizQuestions: [
      {
        id: 'q30',
        question: 'What does the Max-Flow Min-Cut theorem state?',
        options: ['Max flow equals min cut capacity', 'Max flow equals graph density', 'Min cut equals number of edges', 'Flow can exceed cut capacity'],
        correctAnswerIndex: 0,
        explanation: 'The maximum amount of flow from source to sink equals the capacity of the smallest cut separating them.'
      }
    ]
  },
  {
    id: 'level-31-skiplist',
    levelNumber: 31,
    title: 'Skip Lists & Randomized Indexing',
    category: 'AdvancedSets',
    description: 'Multi-level ordered linked lists with random promotion for O(log N) search.',
    algorithmKey: 'skiplist',
    difficulty: 'Medium',
    estimatedMinutes: 10,
    defaultInput: [30, 40, 50, 60, 70, 90, 110],
    quizQuestions: [
      {
        id: 'q31',
        question: 'What is the expected search complexity in a Skip List with p = 1/2 promotion?',
        options: ['O(log N)', 'O(N)', 'O(1)', 'O(N log N)'],
        correctAnswerIndex: 0,
        explanation: 'With roughly log N levels, each level halves the search space, giving O(log N) expected time.'
      }
    ]
  },
  {
    id: 'level-32-splay',
    levelNumber: 32,
    title: 'Splay Trees & Self-Adjusting BSTs',
    category: 'Trees',
    description: 'Move recently accessed nodes to the root via zig, zig-zig, and zig-zag rotations.',
    algorithmKey: 'splay',
    difficulty: 'Hard',
    estimatedMinutes: 12,
    defaultInput: [10, 20, 30, 40, 50, 25],
    quizQuestions: [
      {
        id: 'q32',
        question: 'What is the amortized complexity of each operation in a Splay tree?',
        options: ['O(log N) amortized', 'O(N) worst case only', 'O(1) always', 'O(N log N) amortized'],
        correctAnswerIndex: 0,
        explanation: 'Splay trees guarantee O(log N) amortized via the potential method, despite O(N) worst-case single ops.'
      }
    ]
  },
  {
    id: 'level-33-radixsort',
    levelNumber: 33,
    title: 'Radix Sort & Counting Sort',
    category: 'AdvancedSets',
    description: 'Linear-time integer sorting digit-by-digit with stable counting sort passes.',
    algorithmKey: 'radixsort',
    difficulty: 'Medium',
    estimatedMinutes: 10,
    defaultInput: [170, 45, 75, 90, 802, 24, 2, 66],
    quizQuestions: [
      {
        id: 'q33',
        question: 'What is the time complexity of Radix Sort on N numbers with d digits?',
        options: ['O(d · N)', 'O(N log N)', 'O(N²)', 'O(d² · N)'],
        correctAnswerIndex: 0,
        explanation: 'Each of the d digit passes is a linear counting sort over N elements.'
      }
    ]
  },
  {
    id: 'level-34-zalgo',
    levelNumber: 34,
    title: 'Z-Algorithm for Pattern Matching',
    category: 'StringAndTrie',
    description: 'Z-array longest common prefix computation powering linear-time substring search.',
    algorithmKey: 'zalgo',
    difficulty: 'Hard',
    estimatedMinutes: 10,
    defaultInput: ['aaabcxyzaaaabczaaczabbaaaaaabc', 'aaabc'],
    quizQuestions: [
      {
        id: 'q34',
        question: 'What does Z[i] represent in the Z-array of a string?',
        options: ['Length of longest substring starting at i that is also a prefix', 'Number of occurrences of char i', 'Length of the string', 'Suffix array position'],
        correctAnswerIndex: 0,
        explanation: 'Z[i] = longest common prefix length between the string and its suffix starting at i.'
      }
    ]
  },
  {
    id: 'level-35-manacher',
    levelNumber: 35,
    title: "Manacher's Palindromes",
    category: 'StringAndTrie',
    description: 'Linear-time longest palindromic substring using mirror indices and centers.',
    algorithmKey: 'manacher',
    difficulty: 'Hard',
    estimatedMinutes: 12,
    defaultInput: ['babad', 'cbbd', 'racecar'],
    quizQuestions: [
      {
        id: 'q35',
        question: "What is the time complexity of Manacher's algorithm?",
        options: ['O(N)', 'O(N²)', 'O(N log N)', 'O(N³)'],
        correctAnswerIndex: 0,
        explanation: 'The palindrome radius array is built with linear amortized work per character.'
      }
    ]
  },
  {
    id: 'level-36-bloomfilter',
    levelNumber: 36,
    title: 'Bloom Filters & Probabilistic Sets',
    category: 'AdvancedSets',
    description: 'Space-efficient membership testing with k hash functions and false-positive trade-offs.',
    algorithmKey: 'bloomfilter',
    difficulty: 'Medium',
    estimatedMinutes: 8,
    defaultInput: ['apple', 'banana', 'grape', 'mango'],
    quizQuestions: [
      {
        id: 'q36',
        question: 'What is the key property of a Bloom filter answer?',
        options: ['No false negatives, possible false positives', 'No false positives, possible false negatives', 'Always exact', 'Only works for numbers'],
        correctAnswerIndex: 0,
        explanation: 'Bloom filters never say "not present" for an inserted item, but may claim an absent item is present.'
      }
    ]
  },
  {
    id: 'level-37-sparsetable',
    levelNumber: 37,
    title: 'Sparse Table (Static RMQ)',
    category: 'Trees',
    description: 'O(1) range minimum queries over immutable arrays using power-of-two interval stabbing.',
    algorithmKey: 'sparsetable',
    difficulty: 'Hard',
    estimatedMinutes: 10,
    defaultInput: [4, 2, 3, 7, 1, 5, 3, 3, 9, 6, 7],
    quizQuestions: [
      {
        id: 'q37',
        question: 'What are the build and query complexities of a Sparse Table?',
        options: ['Build O(N log N), query O(1)', 'Build O(N), query O(log N)', 'Build O(N log N), query O(log N)', 'Build O(N²), query O(1)'],
        correctAnswerIndex: 0,
        explanation: 'N log N intervals are precomputed, and overlapping two intervals answers any range in O(1).'
      }
    ]
  },
  {
    id: 'level-38-nqueens',
    levelNumber: 38,
    title: 'N-Queens & Backtracking',
    category: 'DynamicProgramming',
    description: 'Constraint-based recursive search with pruning via row/column/diagonal attack sets.',
    algorithmKey: 'nqueens',
    difficulty: 'Hard',
    estimatedMinutes: 12,
    defaultInput: [4, 5, 6, 8],
    quizQuestions: [
      {
        id: 'q38',
        question: 'How many solutions exist for the 4-Queens problem?',
        options: ['2', '4', '8', '1'],
        correctAnswerIndex: 0,
        explanation: 'The 4x4 board admits exactly 2 distinct solution placements.'
      }
    ]
  }
];
