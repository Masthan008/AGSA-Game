import { QuizQuestion, TreeBalancePuzzle } from '../types';

// Every level in LEVEL_TOPICS has dedicated questions keyed by its level id.
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1-bst-1',
    levelId: 'level-1-bst',
    question: 'Which traversal of a BST outputs elements in sorted ascending order?',
    options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
    correctAnswerIndex: 1,
    explanation: 'In-order traversal visits (Left, Root, Right), which outputs keys in strictly sorted order.',
    hint: 'Think about the ordering of Left, Root, Right.'
  },
  {
    id: 'q1-bst-2',
    levelId: 'level-1-bst',
    question: 'What is the worst-case time complexity of searching in a BST that has become skewed?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correctAnswerIndex: 2,
    explanation: 'If nodes are inserted in sorted order the BST degrades to a linked list, making search O(N).',
    hint: 'Consider the height of a degenerate tree.'
  },
  {
    id: 'q2-avl-1',
    levelId: 'level-2-avl',
    question: 'What is the balance factor constraint for every node in an AVL tree?',
    options: ['Height(left) - Height(right) ∈ {-1, 0, 1}', 'Height <= 5', 'Left child count = Right child count', 'Balance Factor = 0 strictly'],
    correctAnswerIndex: 0,
    explanation: 'AVL trees enforce |Balance Factor| ≤ 1 across all nodes.',
    hint: 'Balance Factor = Height(Left) - Height(Right).'
  },
  {
    id: 'q2-avl-2',
    levelId: 'level-2-avl',
    question: 'A node has balance factor +2 and its left child has balance factor -1. Which rotation sequence fixes it?',
    options: ['Single Left Rotation', 'Single Right Rotation', 'Left-Right (LR) Double Rotation', 'No rotation needed'],
    correctAnswerIndex: 2,
    explanation: 'Left child is right-heavy, so rotate left on the child first, then rotate right on the parent (LR case).',
    hint: 'The imbalance is on the Left child\u2019s Right subtree.'
  },
  {
    id: 'q3-redblack-1',
    levelId: 'level-3-redblack',
    question: 'Can a Red node have a Red child in a Red-Black tree?',
    options: ['Yes, always', 'No, Red nodes must have Black children', 'Only at root', 'Only if leaf is black'],
    correctAnswerIndex: 1,
    explanation: 'No two consecutive Red nodes are allowed on any path (Red Property).',
    hint: 'Consecutive reds violate one of the five properties.'
  },
  {
    id: 'q3-redblack-2',
    levelId: 'level-3-redblack',
    question: 'If a Red-Black tree has N nodes, what is the guaranteed upper bound on its height?',
    options: ['h ≤ log₂(N)', 'h ≤ 2 log₂(N + 1)', 'h ≤ 1.44 log₂(N)', 'h ≤ N'],
    correctAnswerIndex: 1,
    explanation: 'Black height keeps the tree balanced: h ≤ 2·log₂(N+1), slightly taller than AVL but with fewer rotations.',
    hint: 'Compare with AVL height bound 1.44 log₂(N).'
  },
  {
    id: 'q4-heap-1',
    levelId: 'level-4-heap',
    question: 'For a 0-indexed heap array, what is the left child index of node i?',
    options: ['2i', '2i + 1', '2i + 2', 'i / 2'],
    correctAnswerIndex: 1,
    explanation: 'In 0-indexed arrays, left child = 2i + 1 and right child = 2i + 2.',
    hint: 'Children of root index 0 are 1 and 2.'
  },
  {
    id: 'q4-heap-2',
    levelId: 'level-4-heap',
    question: 'What is the time complexity of inserting into a binary heap?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correctAnswerIndex: 1,
    explanation: 'Push adds at the end then sift-up travels at most the tree height, O(log N).',
    hint: 'The heap is a complete binary tree of height log N.'
  },
  {
    id: 'q5-btree-1',
    levelId: 'level-5-btree',
    question: 'Why are B-Trees preferred over AVL trees for disk storage?',
    options: ['They use less memory', 'They minimize disk I/O reads by having large branching factors', 'They are binary trees', 'They never split nodes'],
    correctAnswerIndex: 1,
    explanation: 'High branching factor reduces tree height, minimizing disk block reads.',
    hint: 'Each node can store many keys and many children.'
  },
  {
    id: 'q5-btree-2',
    levelId: 'level-5-btree',
    question: 'In an order-m B-Tree, how many keys can an internal node store at most?',
    options: ['m', 'm - 1', 'm / 2', '2m'],
    correctAnswerIndex: 1,
    explanation: 'An internal node with m children stores at most m - 1 keys.',
    hint: 'Children count = keys count + 1.'
  },
  {
    id: 'q6-segment-1',
    levelId: 'level-6-segment',
    question: 'What is the time complexity to query a range sum in a Segment Tree?',
    options: ['O(N)', 'O(log N)', 'O(1)', 'O(N log N)'],
    correctAnswerIndex: 1,
    explanation: 'Segment tree range query decomposes into at most 2 log N subsegment nodes.',
    hint: 'Each level contributes at most 2 node visits.'
  },
  {
    id: 'q6-segment-2',
    levelId: 'level-6-segment',
    question: 'What is the space complexity of a standard recursive Segment Tree on N elements?',
    options: ['O(N)', 'O(4N)', 'O(N²)', 'O(log N)'],
    correctAnswerIndex: 1,
    explanation: 'The recursive tree allocates 4N nodes to safely cover every interval.',
    hint: 'The array size is typically 4 × N.'
  },
  {
    id: 'q7-trie-1',
    levelId: 'level-7-trie',
    question: 'What is the search time complexity for a word of length L in a Trie?',
    options: ['O(N)', 'O(L)', 'O(N log L)', 'O(2^L)'],
    correctAnswerIndex: 1,
    explanation: 'Search depends strictly on length L of target word.',
    hint: 'Only the word length matters, not the dictionary size.'
  },
  {
    id: 'q7-trie-2',
    levelId: 'level-7-trie',
    question: 'What is the worst-case space used by a trie storing N words of average length L over an alphabet of size K?',
    options: ['O(N)', 'O(N × L × K)', 'O(L)', 'O(N × K)'],
    correctAnswerIndex: 1,
    explanation: 'Each of the up to N×L nodes holds up to K child pointers, so O(N × L × K) worst case.',
    hint: 'Count nodes and pointers per node.'
  },
  {
    id: 'q8-bfsdfs-1',
    levelId: 'level-8-bfsdfs',
    question: 'Which data structure is used to implement Breadth-First Search (BFS)?',
    options: ['Stack', 'Queue', 'Priority Queue', 'Array'],
    correctAnswerIndex: 1,
    explanation: 'BFS processes vertices in FIFO order using a Queue.',
    hint: 'FIFO order = first in, first out.'
  },
  {
    id: 'q8-bfsdfs-2',
    levelId: 'level-8-bfsdfs',
    question: 'BFS guarantees the shortest path in which type of graph?',
    options: ['Weighted graphs', 'Unweighted graphs', 'Directed acyclic graphs only', 'Trees only'],
    correctAnswerIndex: 1,
    explanation: 'BFS explores by hop count, so the first time it reaches a node is via the fewest edges.',
    hint: 'All edges have equal cost.'
  },
  {
    id: 'q9-dijkstra-1',
    levelId: 'level-9-dijkstra',
    question: "Does Dijkstra's algorithm work with negative edge weights?",
    options: ['Yes, always', 'No, it can get stuck in cycles or yield incorrect results', 'Only if graph is a tree', 'Only for directed graphs'],
    correctAnswerIndex: 1,
    explanation: 'Dijkstra assumes distances only increase; negative edges break greedy choice.',
    hint: 'Think about the greedy finalization of a node.'
  },
  {
    id: 'q9-dijkstra-2',
    levelId: 'level-9-dijkstra',
    question: 'What is the time complexity of Dijkstra using a binary min-heap?',
    options: ['O(V²)', 'O((V + E) log V)', 'O(V + E)', 'O(V × E)'],
    correctAnswerIndex: 1,
    explanation: 'Each of V extract-mins and E relaxations costs O(log V) in the heap.',
    hint: 'Count heap operations for vertices and edges.'
  },
  {
    id: 'q10-bellmanford-1',
    levelId: 'level-10-bellmanford',
    question: 'How many edge relaxation passes does Bellman-Ford run?',
    options: ['V - 1 passes', 'V passes', 'E passes', 'log V passes'],
    correctAnswerIndex: 0,
    explanation: 'A simple shortest path can have at most V-1 edges, so V-1 relaxations suffice.',
    hint: 'A path without cycles uses at most V-1 edges.'
  },
  {
    id: 'q10-bellmanford-2',
    levelId: 'level-10-bellmanford',
    question: 'How does Bellman-Ford detect a negative weight cycle?',
    options: ['A relaxation still improves a distance in the (V)-th pass', 'The queue becomes empty', 'A node is visited twice by DFS', 'Distances become negative'],
    correctAnswerIndex: 0,
    explanation: 'If any edge relaxes successfully after V-1 passes, a negative cycle exists.',
    hint: 'Try one extra relaxation pass after V-1.'
  },
  {
    id: 'q11-mst-1',
    levelId: 'level-11-mst',
    question: "What data structure makes Kruskal's MST algorithm efficient?",
    options: ['Disjoint Set Union (DSU)', 'BST', 'Trie', 'Hash Table'],
    correctAnswerIndex: 0,
    explanation: 'DSU with path compression checks cycle formation in near O(1) time.',
    hint: 'We need fast cycle detection while adding edges.'
  },
  {
    id: 'q11-mst-2',
    levelId: 'level-11-mst',
    question: "What is the time complexity of Kruskal's MST algorithm on E edges?",
    options: ['O(E log E)', 'O(V × E)', 'O(E)', 'O(V²)'],
    correctAnswerIndex: 0,
    explanation: 'Sorting E edges dominates: O(E log E); DSU operations are nearly O(1) each.',
    hint: 'Which step dominates — sorting or scanning?'
  },
  {
    id: 'q12-tarjan-1',
    levelId: 'level-12-tarjan',
    question: "What is the time complexity of Tarjan's SCC algorithm?",
    options: ['O(V + E)', 'O(V²)', 'O(V E)', 'O(V log V)'],
    correctAnswerIndex: 0,
    explanation: 'Tarjan runs a single DFS traversal visiting every vertex and edge once.',
    hint: 'It is essentially one DFS pass.'
  },
  {
    id: 'q12-tarjan-2',
    levelId: 'level-12-tarjan',
    question: 'In Tarjan\u2019s algorithm, when is a vertex u the root of a new SCC?',
    options: ['When low[u] == disc[u]', 'When low[u] < disc[u]', 'When u is a leaf', 'When u has no outgoing edges'],
    correctAnswerIndex: 0,
    explanation: 'If no descendant can reach back above u (low[u] == disc[u]), u roots a new SCC.',
    hint: 'Compare the low-link value with discovery time.'
  },
  {
    id: 'q13-knapsack-1',
    levelId: 'level-13-knapsack',
    question: 'What is the recurrence relation for 0/1 Knapsack?',
    options: ['dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w-wt[i-1]])', 'dp[i][w] = dp[i-1][w] + val[i]', 'dp[i] = dp[i-1]', 'dp[i] = min(wt[i])'],
    correctAnswerIndex: 0,
    explanation: 'Max of excluding item (dp[i-1][w]) or including item (val + dp[i-1][w-wt]).',
    hint: 'Decide include vs exclude for each item.'
  },
  {
    id: 'q13-knapsack-2',
    levelId: 'level-13-knapsack',
    question: 'The 0/1 Knapsack DP table has dimensions (N+1) × (W+1). What is its time complexity?',
    options: ['O(N × W)', 'O(2^N)', 'O(N log W)', 'O(N + W)'],
    correctAnswerIndex: 0,
    explanation: 'Every cell is filled in O(1) and there are N × W cells.',
    hint: 'Count the cells in the table.'
  },
  {
    id: 'q14-lcs-1',
    levelId: 'level-14-lcs',
    question: 'If characters match at S1[i] and S2[j], what is the DP state update?',
    options: ['1 + dp[i-1][j-1]', 'dp[i-1][j]', 'dp[i][j-1]', 'max(dp[i-1][j], dp[i][j-1])'],
    correctAnswerIndex: 0,
    explanation: 'Matching character extends previous sub-problem length by 1.',
    hint: 'Both strings advance together.'
  },
  {
    id: 'q14-lcs-2',
    levelId: 'level-14-lcs',
    question: 'What is the time complexity of LCS for strings of length N and M?',
    options: ['O(N × M)', 'O(N + M)', 'O(N log M)', 'O(2^(N+M))'],
    correctAnswerIndex: 0,
    explanation: 'The DP grid has N × M cells, each computed in O(1).',
    hint: 'It fills a 2D table.'
  },
  {
    id: 'q15-floydwarshall-1',
    levelId: 'level-15-floydwarshall',
    question: 'What is the time complexity of Floyd-Warshall algorithm?',
    options: ['O(V³)', 'O(V²)', 'O(V E)', 'O(V log V)'],
    correctAnswerIndex: 0,
    explanation: 'Uses 3 nested loops iterating through intermediate vertex k, source i, and dest j.',
    hint: 'Three nested loops over V.'
  },
  {
    id: 'q15-floydwarshall-2',
    levelId: 'level-15-floydwarshall',
    question: 'What does the outer loop variable k represent in Floyd-Warshall?',
    options: ['The intermediate vertex allowed in paths', 'The source vertex', 'The destination vertex', 'The number of edges'],
    correctAnswerIndex: 0,
    explanation: 'dp[i][j] after loop k = shortest path from i to j using intermediate vertices {0..k}.',
    hint: 'It gradually allows more intermediate vertices.'
  },
  {
    id: 'q16-matrixchain-1',
    levelId: 'level-16-matrixchain',
    question: 'Matrix Chain Multiplication DP solves which problem optimization?',
    options: ['Parenthesization ordering to minimize scalar multiplications', 'Matrix inversion', 'Eigenvalue decomposition', 'Determinant sum'],
    correctAnswerIndex: 0,
    explanation: 'Matrix multiplication is associative; choice of parentheses drastically changes operations.',
    hint: 'Order of multiplication, not the product.'
  },
  {
    id: 'q16-matrixchain-2',
    levelId: 'level-16-matrixchain',
    question: 'What is the time complexity of Matrix Chain Multiplication for N matrices?',
    options: ['O(N³)', 'O(N²)', 'O(N log N)', 'O(2^N)'],
    correctAnswerIndex: 0,
    explanation: 'The table has O(N²) subproblems and each tries O(N) splits.',
    hint: 'N² subproblems × N split choices.'
  },
  {
    id: 'q17-dsu-1',
    levelId: 'level-17-dsu',
    question: 'What is the amortized time complexity per find operation with Path Compression?',
    options: ['O(α(N)) near O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
    correctAnswerIndex: 0,
    explanation: 'Path compression + rank union yields Inverse Ackermann function α(N) ≈ O(1).',
    hint: 'It is effectively constant.'
  },
  {
    id: 'q17-dsu-2',
    levelId: 'level-17-dsu',
    question: 'Which two optimizations make Union-Find nearly O(1) per operation?',
    options: ['Path Compression and Union by Rank', 'Balancing and Sorting', 'Hashing and Caching', 'Memoization and Recursion'],
    correctAnswerIndex: 0,
    explanation: 'Path compression flattens trees; union by rank keeps them shallow.',
    hint: 'One flattens, the other keeps depth small.'
  },
  {
    id: 'q18-kmp-1',
    levelId: 'level-18-kmp',
    question: 'What is the worst-case time complexity of KMP algorithm?',
    options: ['O(N + M)', 'O(N * M)', 'O(N log M)', 'O(N²)'],
    correctAnswerIndex: 0,
    explanation: 'LPS preprocessing takes O(M) and text search takes O(N).',
    hint: 'The text pointer never moves backwards.'
  },
  {
    id: 'q18-kmp-2',
    levelId: 'level-18-kmp',
    question: 'What does the LPS array store at index i?',
    options: ['Length of longest proper prefix that is also a suffix of pattern[0..i]', 'Number of matches so far', 'The last occurrence of each character', 'Hash value of the prefix'],
    correctAnswerIndex: 0,
    explanation: 'LPS[i] = length of the longest proper prefix of the pattern that is also a suffix of pattern[0..i].',
    hint: 'Proper prefix = prefix shorter than the whole string.'
  },
  {
    id: 'q19-suffixarray-1',
    levelId: 'level-19-suffixarray',
    question: 'How fast can substring binary search be performed using a Suffix Array of length N?',
    options: ['O(M log N)', 'O(N * M)', 'O(N²)', 'O(N log N)'],
    correctAnswerIndex: 0,
    explanation: 'Binary search on N sorted suffixes for pattern length M takes O(M log N).',
    hint: 'Each comparison costs O(M).'
  },
  {
    id: 'q19-suffixarray-2',
    levelId: 'level-19-suffixarray',
    question: 'What is the time complexity of building a suffix array using the doubling technique?',
    options: ['O(N log N)', 'O(N²)', 'O(N)', 'O(N log² N)'],
    correctAnswerIndex: 0,
    explanation: 'log N doubling rounds each sorting N elements → O(N log N).',
    hint: 'Count the doubling rounds.'
  },
  {
    id: 'q20-amortized-1',
    levelId: 'level-20-amortized',
    question: 'Which amortized method assigns pre-paid credit (tokens) to early operations to pay for later expensive operations?',
    options: ['Accounting Method', 'Aggregate Method', 'Potential Method', 'Brute Force'],
    correctAnswerIndex: 0,
    explanation: 'The Accounting Method charges overcharges early operations to store credit for costly operations.',
    hint: 'Tokens stored for future expensive steps.'
  },
  {
    id: 'q20-amortized-2',
    levelId: 'level-20-amortized',
    question: 'In the Potential Method, the potential function Φ is chosen so that...',
    options: ['Total amortized cost is an upper bound on total actual cost', 'Φ always decreases', 'Φ is always zero', 'Φ equals the number of operations'],
    correctAnswerIndex: 0,
    explanation: 'Amortized cost = actual cost + ΔΦ, and with Φ_final ≥ Φ_initial the sum bounds the real cost.',
    hint: 'Think about ΔΦ between states.'
  },
  {
    id: 'q21-fibonacci-1',
    levelId: 'level-21-fibonacci',
    question: 'What is the amortized time complexity of Decrease-Key in a Fibonacci Heap?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correctAnswerIndex: 0,
    explanation: 'Fibonacci Heaps achieve O(1) amortized Decrease-Key via lazy tree consolidation.',
    hint: 'Cascading cuts make it lazy and cheap on average.'
  },
  {
    id: 'q21-fibonacci-2',
    levelId: 'level-21-fibonacci',
    question: 'Which algorithm benefits from a Fibonacci Heap\u2019s O(1) Decrease-Key?',
    options: ['Dijkstra\u2019s shortest path', 'Quick Sort', 'Binary Search', 'Floyd-Warshall'],
    correctAnswerIndex: 0,
    explanation: 'Dijkstra\u2019s does V Decrease-Key calls, so O(E + V log V) total with a Fibonacci heap.',
    hint: 'It has E decrease-key operations.'
  },
  {
    id: 'q22-rabinkarp-1',
    levelId: 'level-22-rabinkarp',
    question: 'What technique allows Rabin-Karp to compute pattern hash values in O(1) per shift?',
    options: ['Rolling Hash Function', 'Binary Search', 'LPS Array', 'Prefix Tree'],
    correctAnswerIndex: 0,
    explanation: 'Rolling hash subtracts leading char hash and adds trailing char hash in O(1).',
    hint: 'It reuses the previous window\u2019s hash.'
  },
  {
    id: 'q22-rabinkarp-2',
    levelId: 'level-22-rabinkarp',
    question: 'What is the worst-case time complexity of Rabin-Karp on hash collisions?',
    options: ['O(N × M)', 'O(N + M)', 'O(N log M)', 'O(M)'],
    correctAnswerIndex: 0,
    explanation: 'If many windows collide, each is verified by O(M) string comparison.',
    hint: 'Verification is expensive on bad hashes.'
  },
  {
    id: 'q23-convexhull-1',
    levelId: 'level-23-convexhull',
    question: "What is the time complexity of Graham's Scan Convex Hull algorithm?",
    options: ['O(N log N)', 'O(N²)', 'O(N³)', 'O(2^N)'],
    correctAnswerIndex: 0,
    explanation: "Sorting points by polar angle takes O(N log N); linear stack scan takes O(N).",
    hint: 'Which step dominates — sorting or scanning?'
  },
  {
    id: 'q23-convexhull-2',
    levelId: 'level-23-convexhull',
    question: 'In Graham Scan, a point is popped from the hull stack when its turn is...',
    options: ['Not counter-clockwise (collinear or clockwise)', 'Counter-clockwise', 'Exactly 180° only', 'Any angle'],
    correctAnswerIndex: 0,
    explanation: 'Points creating a non-CCW turn cannot be hull vertices and are popped.',
    hint: 'The hull boundary must turn counter-clockwise.'
  },
  {
    id: 'q24-npcomplete-1',
    levelId: 'level-24-npcomplete',
    question: 'What approximation ratio does the Greedy Vertex Cover algorithm guarantee?',
    options: ['2-Approximation (Result <= 2 * OPT)', '1.5-Approximation', 'Polynomial Exact', 'No bound'],
    correctAnswerIndex: 0,
    explanation: 'Greedy maximal matching picks both endpoints of un-covered edges, guaranteeing ≤ 2 * OPT.',
    hint: 'Pick both endpoints of unmatched edges.'
  },
  {
    id: 'q24-npcomplete-2',
    levelId: 'level-24-npcomplete',
    question: 'Which statement about NP-complete problems is TRUE?',
    options: [
      'If any NP-complete problem has a polynomial algorithm, all NP problems do',
      'NP-complete problems are known to require exponential time',
      'NP-complete problems cannot be verified in polynomial time',
      'P ≠ NP is proven'
    ],
    correctAnswerIndex: 0,
    explanation: 'NP-completeness means every NP problem reduces to it; one polynomial solution solves all of NP.',
    hint: 'Reductions link every NP problem to NP-complete ones.'
  },
  {
    id: 'q1-bst-3',
    levelId: 'level-1-bst',
    question: 'Insert 50, 30, 70, 20, 40 (in that order) into an empty BST. What is the in-order traversal?',
    options: ['20, 30, 40, 50, 70', '50, 30, 20, 40, 70', '20, 40, 30, 70, 50', '30, 20, 40, 50, 70'],
    correctAnswerIndex: 0,
    explanation: 'In-order visits Left, Root, Right, so a BST always yields keys in sorted order.',
    hint: 'In-order means Left, Root, Right.'
  },
  {
    id: 'q1-bst-4',
    levelId: 'level-1-bst',
    question: 'A BST contains keys 50, 30, 70, 20, 40. Which node holds the minimum key?',
    options: ['20', '30', '40', '70'],
    correctAnswerIndex: 0,
    explanation: 'The minimum key is always the leftmost node: keep following left children from the root.',
    hint: 'Follow left children until there is no left child.'
  },
  {
    id: 'q1-bst-5',
    levelId: 'level-1-bst',
    question: 'The BST property says every key in a node\u2019s left subtree is...',
    options: ['smaller than the node\u2019s key', 'larger than the node\u2019s key', 'equal to the node\u2019s key', 'stored in random order'],
    correctAnswerIndex: 0,
    explanation: 'Left subtree keys are strictly smaller; right subtree keys are strictly larger.',
    hint: 'Left < Node < Right.'
  },
  {
    id: 'q1-bst-6',
    levelId: 'level-1-bst',
    question: 'Inserting keys 1, 2, 3, 4, 5 in ascending order into an empty BST produces...',
    options: ['a skewed right chain of height 5', 'a perfectly balanced tree of height 2', 'a full binary tree', 'an impossible insertion sequence'],
    correctAnswerIndex: 0,
    explanation: 'Each key becomes the right child of the previous one, creating a degenerate chain.',
    hint: 'Every new key is larger than the last one inserted.'
  },
  {
    id: 'q1-bst-7',
    levelId: 'level-1-bst',
    question: 'In a balanced BST with 1,000,000 keys, one search needs at most about how many comparisons?',
    options: ['~20', '~1,000', '~500,000', '~1,000,000'],
    correctAnswerIndex: 0,
    explanation: 'log₂(1,000,000) ≈ 20 — the search halves the remaining range each step.',
    hint: 'Use log base 2 of the number of keys.'
  },
  {
    id: 'q1-bst-8',
    levelId: 'level-1-bst',
    question: 'Deleting a BST node that has two children typically replaces it with...',
    options: ['its in-order successor (or predecessor)', 'a random node from the tree', 'its parent node', 'the leftmost leaf of the whole tree'],
    correctAnswerIndex: 0,
    explanation: 'The successor keeps the BST ordering intact when copied into the deleted slot.',
    hint: 'Pick the smallest key larger than the node being deleted.'
  },
  {
    id: 'q1-bst-9',
    levelId: 'level-1-bst',
    question: 'BST root is 50, left child is 30, and 30\u2019s right child is 40. What is the in-order successor of 40?',
    options: ['50', '30', '40', 'none — it has no successor'],
    correctAnswerIndex: 0,
    explanation: 'The successor is the smallest key greater than 40 — that is the ancestor 50, since 40 has no right child.',
    hint: 'Climb up until you take a right turn.'
  },
  {
    id: 'q1-bst-10',
    levelId: 'level-1-bst',
    question: 'For a BST of height h, the worst-case time to search is...',
    options: ['O(h)', 'O(log n)', 'O(n)', 'O(1)'],
    correctAnswerIndex: 0,
    explanation: 'Search follows one root-to-leaf path of length h; with h = n the tree is degenerate.',
    hint: 'Express it in terms of the height, not the node count.'
  },
  {
    id: 'q3-redblack-3',
    levelId: 'level-3-redblack',
    question: 'In a Red-Black tree, every path from a node to a descendant leaf contains the same number of...',
    options: ['black nodes', 'red nodes', 'total nodes', 'null references'],
    correctAnswerIndex: 0,
    explanation: 'Equal black-height on every path keeps the tree approximately balanced.',
    hint: 'The property is named after this color.'
  },
  {
    id: 'q3-redblack-4',
    levelId: 'level-3-redblack',
    question: 'What color is the root of every Red-Black tree?',
    options: ['Black', 'Red', 'Depends on the insertion order', 'Transparent'],
    correctAnswerIndex: 0,
    explanation: 'The root must be black by the root property of Red-Black trees.',
    hint: 'Red nodes can only have black children — a red root is never allowed.'
  },
  {
    id: 'q3-redblack-5',
    levelId: 'level-3-redblack',
    question: 'The NULL leaves (sentinels) of a Red-Black tree are treated as...',
    options: ['black', 'red', 'transparent', 'gray'],
    correctAnswerIndex: 0,
    explanation: 'Sentinels are black so every root-to-NULL path has a consistent black-height.',
    hint: 'They must not break the black-height invariant.'
  },
  {
    id: 'q3-redblack-6',
    levelId: 'level-3-redblack',
    question: 'Right after insertion, a new node is initially colored...',
    options: ['red', 'black', 'blue', 'green'],
    correctAnswerIndex: 0,
    explanation: 'Inserting red keeps black-heights unchanged; fix-ups handle any double-red violations.',
    hint: 'Only this color avoids changing the black-height.'
  },
  {
    id: 'q3-redblack-7',
    levelId: 'level-3-redblack',
    question: 'A double-red violation with a BLACK uncle is fixed by...',
    options: ['rotating and recoloring', 'recoloring only', 'splitting the node into two', 'rebuilding the entire tree'],
    correctAnswerIndex: 0,
    explanation: 'With a black uncle, a rotation restructures the tree, then colors are fixed up.',
    hint: 'The uncle\u2019s color decides between recolor and rotate.'
  },
  {
    id: 'q3-redblack-8',
    levelId: 'level-3-redblack',
    question: 'A double-red violation with a RED uncle is fixed by...',
    options: ['recoloring parent, uncle, and grandparent', 'rotating the grandparent', 'swapping colors with the left child', 'deleting the new node'],
    correctAnswerIndex: 0,
    explanation: 'Recoloring pushes the red conflict upward; the fix may cascade toward the root.',
    hint: 'No rotation is needed when the uncle is red.'
  },
  {
    id: 'q3-redblack-9',
    levelId: 'level-3-redblack',
    question: 'The maximum height of a Red-Black tree with n internal nodes is about...',
    options: ['2·log₂(n+1)', 'log₂(n+1)', 'n/2', '√n'],
    correctAnswerIndex: 0,
    explanation: 'At most half of any path can be red, bounding height by 2·log₂(n+1).',
    hint: 'Doubles the pure binary height bound.'
  },
  {
    id: 'q3-redblack-10',
    levelId: 'level-3-redblack',
    question: 'The black-height of a node is the number of black nodes on any path from it to a leaf...',
    options: ['excluding the node itself, counting the black sentinel', 'including the node itself', 'counting only red nodes', 'counting all internal nodes'],
    correctAnswerIndex: 0,
    explanation: 'Black-height measures the node\u2019s contribution downward, sentinels included.',
    hint: 'Sentinels are black and are counted.'
  },
  {
    id: 'q4-heap-3',
    levelId: 'level-4-heap',
    question: 'In the 0-indexed min-heap array [2, 5, 7, 8, 9], where is the minimum value stored?',
    options: ['index 0 (the root)', 'index 1', 'index 2', 'the last index'],
    correctAnswerIndex: 0,
    explanation: 'A heap stores its extreme value at the root, array index 0.',
    hint: 'The root is always the minimum of a min-heap.'
  },
  {
    id: 'q4-heap-4',
    levelId: 'level-4-heap',
    question: 'Insert 1 into the min-heap [2, 5, 7, 8, 9] with sift-up. What is the new root?',
    options: ['1', '2', '5', '9'],
    correctAnswerIndex: 0,
    explanation: '1 bubbles up past 7 and 2, landing at the root: [1, 2, 7, 8, 9, 5].',
    hint: 'Swap upward while the new node is smaller than its parent.'
  },
  {
    id: 'q4-heap-5',
    levelId: 'level-4-heap',
    question: 'Extract-min from the min-heap [2, 5, 7, 8, 9]. After sift-down, what is the new root?',
    options: ['5', '7', '8', '9'],
    correctAnswerIndex: 0,
    explanation: '9 moves to the root and sinks: [5, 8, 7, 9]. The new root is 5.',
    hint: 'Remove 2, move 9 to the root, then sink it.'
  },
  {
    id: 'q4-heap-6',
    levelId: 'level-4-heap',
    question: 'In a 0-indexed heap array, the right child of the node at index 3 is at index...',
    options: ['8', '7', '6', '4'],
    correctAnswerIndex: 0,
    explanation: 'Right child of i is 2i + 2, so 2·3 + 2 = 8.',
    hint: 'Left child is 2i + 1; the right child is one more.'
  },
  {
    id: 'q4-heap-7',
    levelId: 'level-4-heap',
    question: 'Building a heap from an unsorted array of n elements using sift-down takes...',
    options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(n²)'],
    correctAnswerIndex: 0,
    explanation: 'Most nodes are near the leaves, so the total work of sift-down heapify is linear.',
    hint: 'Faster than inserting n elements one by one.'
  },
  {
    id: 'q4-heap-8',
    levelId: 'level-4-heap',
    question: 'Inserting one element into a binary heap takes...',
    options: ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'],
    correctAnswerIndex: 0,
    explanation: 'Sift-up climbs at most the tree height, O(log n).',
    hint: 'The height of a complete binary tree.'
  },
  {
    id: 'q4-heap-9',
    levelId: 'level-4-heap',
    question: 'Heapsort sorts n elements in...',
    options: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'],
    correctAnswerIndex: 0,
    explanation: 'n extract-min operations at O(log n) each give O(n log n).',
    hint: 'Multiply the number of extractions by extraction cost.'
  },
  {
    id: 'q4-heap-10',
    levelId: 'level-4-heap',
    question: 'A complete binary tree with 7 nodes has how many leaves?',
    options: ['4', '3', '5', '7'],
    correctAnswerIndex: 0,
    explanation: 'Nodes 3, 4, 5, 6 are leaves (0-indexed) — all internal nodes sit in the first 3 levels.',
    hint: 'Every node in the bottom level and its neighbors without children.'
  },
  {
    id: 'q5-btree-3',
    levelId: 'level-5-btree',
    question: 'A B-tree of order m allows each node to hold at most...',
    options: ['m children and m − 1 keys', 'm − 1 children and m keys', 'm keys and m children', '2m keys and no children'],
    correctAnswerIndex: 0,
    explanation: 'An order-m node has up to m child pointers and m − 1 separator keys.',
    hint: 'Keys separate children, so keys = children − 1.'
  },
  {
    id: 'q5-btree-4',
    levelId: 'level-5-btree',
    question: 'In a B-tree of order 5, the maximum number of keys inside one node is...',
    options: ['4', '5', '6', '3'],
    correctAnswerIndex: 0,
    explanation: 'Max keys = m − 1 = 4 for an order-5 B-tree.',
    hint: 'One less than the order.'
  },
  {
    id: 'q5-btree-5',
    levelId: 'level-5-btree',
    question: 'When a B-tree node overflows, the tree fixes it by...',
    options: ['splitting the node and promoting the median key', 'rotating the parent node', 'doubling the order', 'always creating a new root'],
    correctAnswerIndex: 0,
    explanation: 'The median key moves up into the parent; the node splits into two halves.',
    hint: 'The middle key travels upward.'
  },
  {
    id: 'q5-btree-6',
    levelId: 'level-5-btree',
    question: 'In a B+ tree, all data values (or value pointers) are stored in the...',
    options: ['leaves', 'internal nodes', 'root only', 'every level equally'],
    correctAnswerIndex: 0,
    explanation: 'Internal B+ tree nodes keep only keys; leaves hold the actual records, linked in order.',
    hint: 'Internal nodes are pure index routers.'
  },
  {
    id: 'q5-btree-7',
    levelId: 'level-5-btree',
    question: 'A B-tree with minimum degree t = 2 requires at least how many keys in a non-root node?',
    options: ['1', '2', '3', '0'],
    correctAnswerIndex: 0,
    explanation: 'Non-root nodes must hold at least t − 1 = 1 key (and t = 2 children).',
    hint: 'Minimum keys = t − 1.'
  },
  {
    id: 'q5-btree-8',
    levelId: 'level-5-btree',
    question: 'Searching one key in a B-tree with N keys and order m reads about how many disk blocks?',
    options: ['O(log_m N)', 'O(N)', 'O(m)', 'O(N·m)'],
    correctAnswerIndex: 0,
    explanation: 'The height of a B-tree is log_m N, and one block read occurs per level.',
    hint: 'The height of a tree with branching factor m.'
  },
  {
    id: 'q5-btree-9',
    levelId: 'level-5-btree',
    question: 'Why do databases prefer B-trees over binary search trees for disk storage?',
    options: ['a much smaller height means fewer disk block reads', 'B-trees fit entirely in RAM', 'binary trees cannot be stored on disk', 'B-trees never need balancing'],
    correctAnswerIndex: 0,
    explanation: 'A large branching factor keeps the tree shallow, minimizing slow disk I/O.',
    hint: 'Disk reads are expensive; count the levels.'
  },
  {
    id: 'q5-btree-10',
    levelId: 'level-5-btree',
    question: 'All leaves of a B-tree are located at...',
    options: ['the same depth', 'different depths', 'the top level', 'random levels depending on inserts'],
    correctAnswerIndex: 0,
    explanation: 'B-tree growth happens only at the root, so every leaf stays at equal depth.',
    hint: 'Splits push upward, never downward.'
  },
  {
    id: 'q6-segment-3',
    levelId: 'level-6-segment',
    question: 'A point update on a segment tree over n elements takes...',
    options: ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'],
    correctAnswerIndex: 0,
    explanation: 'An update recomputes only the nodes on the root-to-leaf path, O(log n) of them.',
    hint: 'Count the levels above one leaf.'
  },
  {
    id: 'q6-segment-4',
    levelId: 'level-6-segment',
    question: 'For an array of 5 elements, a classic iterative-free segment tree (next power of two leaves) uses an array of size...',
    options: ['16', '10', '8', '32'],
    correctAnswerIndex: 0,
    explanation: 'Next power of two ≥ 5 is 8 leaves; doubling gives 16 total cells.',
    hint: 'Pad 5 up to a power of two, then double it.'
  },
  {
    id: 'q6-segment-5',
    levelId: 'level-6-segment',
    question: 'A range query in a segment tree is answered by combining at most how many node values?',
    options: ['O(log n) nodes', 'O(n) nodes', 'exactly 2 nodes', 'every leaf'],
    correctAnswerIndex: 0,
    explanation: 'The query interval decomposes into at most 2·log n canonical segments.',
    hint: 'Same order as a single root-to-leaf path.'
  },
  {
    id: 'q6-segment-6',
    levelId: 'level-6-segment',
    question: 'Lazy propagation in a segment tree...',
    options: ['defers updates to child nodes until they are actually visited', 'updates every element immediately', 'rebuilds the whole tree on each update', 'stores the array twice'],
    correctAnswerIndex: 0,
    explanation: 'Pending range-update marks stay at higher nodes; children are updated only when needed.',
    hint: 'Postpone work that may never be needed.'
  },
  {
    id: 'q6-segment-7',
    levelId: 'level-6-segment',
    question: 'Which operation is NOT naturally supported by a basic segment tree?',
    options: ['inserting new elements into arbitrary positions', 'range sum queries', 'range minimum queries', 'point updates'],
    correctAnswerIndex: 0,
    explanation: 'A segment tree is fixed to the array size; insertions that shift indices are not natural.',
    hint: 'Its index space is static.'
  },
  {
    id: 'q6-segment-8',
    levelId: 'level-6-segment',
    question: 'Building a segment tree bottom-up from n elements takes...',
    options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(n²)'],
    correctAnswerIndex: 0,
    explanation: 'Each array element is combined once into its parents — linear total work.',
    hint: 'Every leaf contributes to O(1) merges overall.'
  },
  {
    id: 'q6-segment-9',
    levelId: 'level-6-segment',
    question: 'Each leaf of a segment tree represents...',
    options: ['a single element of the array', 'a pair of elements', 'the whole array', 'a range minimum'],
    correctAnswerIndex: 0,
    explanation: 'Leaves hold single elements; internal nodes aggregate their children.',
    hint: 'The finest granularity of the range.'
  },
  {
    id: 'q6-segment-10',
    levelId: 'level-6-segment',
    question: 'With the array [1, 3, 5, 7], what does a range-sum query on indices 1..2 return?',
    options: ['8', '4', '9', '12'],
    correctAnswerIndex: 0,
    explanation: '3 + 5 = 8. Segment trees answer this by merging two node values.',
    hint: 'Add elements at positions 1 and 2 only.'
  },
  {
    id: 'q7-trie-3',
    levelId: 'level-7-trie',
    question: 'In a trie, the longest common prefix of "cat" and "car" is...',
    options: ['"ca"', '"c"', '"cat"', '"ar"'],
    correctAnswerIndex: 0,
    explanation: 'Both words share the path c → a, then diverge at t vs r.',
    hint: 'Shared path from the root.'
  },
  {
    id: 'q7-trie-4',
    levelId: 'level-7-trie',
    question: 'A trie stores {cat, car, cart, dog}. How many words have the prefix "ca"?',
    options: ['3', '2', '4', '1'],
    correctAnswerIndex: 0,
    explanation: 'cat, car, and cart all begin with "ca".',
    hint: 'Count every word starting with c-a.'
  },
  {
    id: 'q7-trie-5',
    levelId: 'level-7-trie',
    question: 'Excluding the root, how many nodes are in a trie storing exactly {cat, car, cart}?',
    options: ['5', '4', '6', '3'],
    correctAnswerIndex: 0,
    explanation: 'Nodes: c, a, t (end of cat), r (end of car), t (end of cart) = 5.',
    hint: 'Shared prefixes reuse the same nodes.'
  },
  {
    id: 'q7-trie-6',
    levelId: 'level-7-trie',
    question: 'Searching for a word of length L in a trie takes...',
    options: ['O(L)', 'O(N)', 'O(L log N)', 'O(N log L)'],
    correctAnswerIndex: 0,
    explanation: 'The search walks exactly L characters down the trie — independent of dictionary size.',
    hint: 'Depends only on the word length.'
  },
  {
    id: 'q7-trie-7',
    levelId: 'level-7-trie',
    question: 'Compared to a hash map, a trie uses...',
    options: ['more memory for short keys, but supports ordered prefix queries', 'less memory always', 'the same memory always', 'no memory for shared prefixes'],
    correctAnswerIndex: 0,
    explanation: 'Node-per-character costs more space, but enables prefix traversal and sorting.',
    hint: 'Trades space for prefix power.'
  },
  {
    id: 'q7-trie-8',
    levelId: 'level-7-trie',
    question: 'Deleting a word from a trie removes nodes only while they are...',
    options: ['not shared and not marking another word', 'marked as the end of a word', 'at the root', 'red'],
    correctAnswerIndex: 0,
    explanation: 'Shared prefixes and terminal markers for other words must stay intact.',
    hint: 'Stop deleting when another word depends on the node.'
  },
  {
    id: 'q7-trie-9',
    levelId: 'level-7-trie',
    question: 'A flag marking a node as the end of a stored word is needed because...',
    options: ['one word can be a prefix of another', 'tries cannot store short words otherwise', 'nodes are always empty', 'the root needs a flag'],
    correctAnswerIndex: 0,
    explanation: 'Without a terminal flag, "in" and "inn" would be indistinguishable.',
    hint: 'Words that are prefixes of other words.'
  },
  {
    id: 'q7-trie-10',
    levelId: 'level-7-trie',
    question: 'Sorting n strings stored in a trie (via DFS) takes...',
    options: ['O(total number of characters)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctAnswerIndex: 0,
    explanation: 'A pre-order DFS visits characters in sorted order — linear in total size.',
    hint: 'Tries give sorted order for free.'
  },
  {
    id: 'q8-bfsdfs-3',
    levelId: 'level-8-bfsdfs',
    question: 'Graph: 0–1, 0–2, 1–3, 2–3. Starting BFS at 0 with adjacency [1, 2], the visit order is...',
    options: ['0, 1, 2, 3', '0, 1, 3, 2', '0, 2, 1, 3', '3, 2, 1, 0'],
    correctAnswerIndex: 0,
    explanation: 'BFS explores all neighbors of 0 first (1, 2), then their neighbors (3).',
    hint: 'Level by level, FIFO queue.'
  },
  {
    id: 'q8-bfsdfs-4',
    levelId: 'level-8-bfsdfs',
    question: 'Same graph 0–1, 0–2, 1–3, 2–3. Starting DFS at 0, a possible visit order is...',
    options: ['0, 1, 3, 2', '0, 1, 2, 3', '3, 2, 1, 0', '2, 3, 1, 0'],
    correctAnswerIndex: 0,
    explanation: 'DFS dives along 0→1→3, then backtracks to visit 2.',
    hint: 'Go as deep as possible before backtracking.'
  },
  {
    id: 'q8-bfsdfs-5',
    levelId: 'level-8-bfsdfs',
    question: 'On an unweighted graph, BFS from s finds the shortest path to every reachable vertex in terms of...',
    options: ['number of edges', 'total edge weight', 'vertices revisited', 'memory used'],
    correctAnswerIndex: 0,
    explanation: 'BFS visits vertices in order of hop distance, giving fewest-edges paths.',
    hint: 'It only counts hops, not weights.'
  },
  {
    id: 'q8-bfsdfs-6',
    levelId: 'level-8-bfsdfs',
    question: 'Which data structures power BFS and DFS respectively?',
    options: ['queue and stack', 'stack and queue', 'priority queue and queue', 'array and linked list'],
    correctAnswerIndex: 0,
    explanation: 'BFS is FIFO (queue); DFS is LIFO (stack, explicit or recursion).',
    hint: 'FIFO for level order, LIFO for depth.'
  },
  {
    id: 'q8-bfsdfs-7',
    levelId: 'level-8-bfsdfs',
    question: 'To detect a cycle in an undirected graph with DFS, you track...',
    options: ['visited nodes plus the parent of each node', 'only the number of edges', 'edge weights', 'vertex degrees'],
    correctAnswerIndex: 0,
    explanation: 'An edge to an already-visited node that is not the parent indicates a cycle.',
    hint: 'Going back to your parent is not a cycle.'
  },
  {
    id: 'q8-bfsdfs-8',
    levelId: 'level-8-bfsdfs',
    question: 'BFS and DFS on a graph with V vertices and E edges both run in...',
    options: ['O(V + E)', 'O(V²)', 'O(V·E)', 'O(log V)'],
    correctAnswerIndex: 0,
    explanation: 'Each vertex is enqueued once and each edge examined once.',
    hint: 'Linear in the size of the graph.'
  },
  {
    id: 'q8-bfsdfs-9',
    levelId: 'level-8-bfsdfs',
    question: 'A topological ordering of a graph exists if and only if the graph is...',
    options: ['a directed acyclic graph (DAG)', 'connected', 'complete', 'weighted'],
    correctAnswerIndex: 0,
    explanation: 'Cycles make an ordering impossible; every DAG has at least one topological order.',
    hint: 'No cycles allowed.'
  },
  {
    id: 'q8-bfsdfs-10',
    levelId: 'level-8-bfsdfs',
    question: 'On a weighted graph, plain BFS...',
    options: ['may not find the cheapest path because it ignores weights', 'always finds the cheapest path', 'fails on directed graphs', 'needs a stack'],
    correctAnswerIndex: 0,
    explanation: 'BFS optimizes hop count; weights require algorithms like Dijkstra.',
    hint: 'Weights break the level-order assumption.'
  },
  {
    id: 'q9-dijkstra-3',
    levelId: 'level-9-dijkstra',
    question: 'Edges: 0–1 = 4, 0–2 = 1, 2–1 = 2, 1–3 = 5, 2–3 = 6. What is Dijkstra\u2019s shortest distance from 0 to 3?',
    options: ['7', '9', '8', '11'],
    correctAnswerIndex: 0,
    explanation: 'Path 0→2 (1) + 2→3 (6) = 7 beats 0→1→3 = 9 and 0→2→1→3 = 8.',
    hint: 'Try the route through node 2.'
  },
  {
    id: 'q9-dijkstra-4',
    levelId: 'level-9-dijkstra',
    question: 'Dijkstra\u2019s algorithm requires edge weights to be...',
    options: ['non-negative', 'integers', 'positive primes', 'increasing'],
    correctAnswerIndex: 0,
    explanation: 'Negative edges can invalidate the greedy choice once a node is finalized.',
    hint: 'Relaxation must never produce improving cycles.'
  },
  {
    id: 'q9-dijkstra-5',
    levelId: 'level-9-dijkstra',
    question: 'With a binary min-heap, Dijkstra\u2019s total time on V vertices and E edges is...',
    options: ['O((V + E) log V)', 'O(V²)', 'O(E log E)', 'O(V + E)'],
    correctAnswerIndex: 0,
    explanation: 'Each vertex extraction is O(log V) and each edge relaxation is O(log V).',
    hint: 'Combine extraction and relaxation costs.'
  },
  {
    id: 'q9-dijkstra-6',
    levelId: 'level-9-dijkstra',
    question: 'Dijkstra\u2019s algorithm is best classified as...',
    options: ['a greedy algorithm', 'a divide-and-conquer algorithm', 'a backtracking algorithm', 'an exhaustive search'],
    correctAnswerIndex: 0,
    explanation: 'It greedily finalizes the closest unsettled vertex at every step.',
    hint: 'Always take the locally cheapest frontier node.'
  },
  {
    id: 'q9-dijkstra-7',
    levelId: 'level-9-dijkstra',
    question: 'A vertex is finalized (its distance is certain) in Dijkstra exactly when...',
    options: ['it is popped from the priority queue', 'it is first relaxed', 'it is discovered by BFS', 'the graph is fully read'],
    correctAnswerIndex: 0,
    explanation: 'Non-negative weights guarantee the popped distance can never improve afterwards.',
    hint: 'The heap order guarantees the minimum is popped first.'
  },
  {
    id: 'q9-dijkstra-8',
    levelId: 'level-9-dijkstra',
    question: 'The very first vertex Dijkstra finalizes when starting at source s is...',
    options: ['s itself with distance 0', 'the closest neighbor of s', 'the highest-degree vertex', 'a random vertex'],
    correctAnswerIndex: 0,
    explanation: 's is popped first with distance 0, then its neighbors are relaxed.',
    hint: 'The initial distance of the source.'
  },
  {
    id: 'q9-dijkstra-9',
    levelId: 'level-9-dijkstra',
    question: 'If all edge weights are identical, Dijkstra behaves like...',
    options: ['BFS', 'DFS', 'merge sort', 'Floyd-Warshall'],
    correctAnswerIndex: 0,
    explanation: 'With unit weights, the heap pops in FIFO order — exactly BFS level order.',
    hint: 'Level-by-level exploration.'
  },
  {
    id: 'q9-dijkstra-10',
    levelId: 'level-9-dijkstra',
    question: 'Why does Dijkstra fail with a negative edge?',
    options: ['a finalized node could still be improved via a negative edge', 'negative values overflow the heap', 'the priority queue cannot store negatives', 'it needs an undirected graph'],
    correctAnswerIndex: 0,
    explanation: 'A negative edge can lower a finalized distance, breaking the greedy invariant.',
    hint: 'Finalization assumes distances only grow.'
  },
  {
    id: 'q10-bellmanford-3',
    levelId: 'level-10-bellmanford',
    question: 'Bellman-Ford detects a negative-weight cycle by running...',
    options: ['a V-th relaxation pass and checking for any distance improvement', 'a BFS from every vertex', 'Dijkstra twice', 'a topological sort'],
    correctAnswerIndex: 0,
    explanation: 'If distances still improve on the V-th pass, a negative cycle is reachable.',
    hint: 'After V − 1 passes, nothing should change.'
  },
  {
    id: 'q10-bellmanford-4',
    levelId: 'level-10-bellmanford',
    question: 'The total time complexity of Bellman-Ford on V vertices and E edges is...',
    options: ['O(V·E)', 'O(V + E)', 'O(V²)', 'O(E log V)'],
    correctAnswerIndex: 0,
    explanation: 'V − 1 passes, each relaxing all E edges.',
    hint: 'Multiply passes by edges per pass.'
  },
  {
    id: 'q10-bellmanford-5',
    levelId: 'level-10-bellmanford',
    question: 'Unlike Dijkstra, Bellman-Ford...',
    options: ['handles negative edge weights correctly', 'is faster on dense graphs', 'needs a priority queue', 'only works on trees'],
    correctAnswerIndex: 0,
    explanation: 'Repeated relaxation propagates improvements even from negative edges.',
    hint: 'The weakness of greedy finalization is not present here.'
  },
  {
    id: 'q10-bellmanford-6',
    levelId: 'level-10-bellmanford',
    question: 'A shortest path in a graph without negative cycles contains at most...',
    options: ['V − 1 edges', 'V edges', 'E edges', 'log V edges'],
    correctAnswerIndex: 0,
    explanation: 'Any longer path would repeat a vertex and could be shortened by removing the cycle.',
    hint: 'Simple paths never repeat vertices.'
  },
  {
    id: 'q10-bellmanford-7',
    levelId: 'level-10-bellmanford',
    question: 'Bellman-Ford initializes the source distance to 0 and all others to...',
    options: ['infinity', '0', 'the largest edge weight', 'the number of vertices'],
    correctAnswerIndex: 0,
    explanation: 'Unknown distances start at infinity so the first relaxation sets them.',
    hint: 'Unreachable until proven otherwise.'
  },
  {
    id: 'q10-bellmanford-8',
    levelId: 'level-10-bellmanford',
    question: 'If a reachable negative cycle exists, the shortest path is...',
    options: ['undefined — distances decrease forever', 'still well-defined', 'the largest positive path', 'computed by BFS'],
    correctAnswerIndex: 0,
    explanation: 'Looping the negative cycle keeps lowering the distance without bound.',
    hint: 'Distances never stabilize.'
  },
  {
    id: 'q10-bellmanford-9',
    levelId: 'level-10-bellmanford',
    question: 'A single relaxation step for edge (u, v) with weight w updates dist[v] to...',
    options: ['min(dist[v], dist[u] + w)', 'dist[u] + w', 'dist[v] − w', 'max(dist[v], dist[u] + w)'],
    correctAnswerIndex: 0,
    explanation: 'Relaxation keeps the cheaper of the current value and the route through u.',
    hint: 'Take the better of the two candidate distances.'
  },
  {
    id: 'q10-bellmanford-10',
    levelId: 'level-10-bellmanford',
    question: 'Why are V − 1 passes sufficient?',
    options: ['a simple shortest path has at most V − 1 edges, one pass propagates it per edge', 'all edge weights are positive', 'the graph is a tree', 'each pass doubles the covered distance'],
    correctAnswerIndex: 0,
    explanation: 'The k-th pass finalizes all paths with up to k edges; V − 1 covers every simple path.',
    hint: 'Paths stop growing beyond V − 1 edges.'
  },
  {
    id: 'q11-mst-3',
    levelId: 'level-11-mst',
    question: 'Kruskal\u2019s algorithm builds an MST by...',
    options: ['sorting edges by weight and adding them if they do not create a cycle', 'growing one tree from a start vertex', 'running BFS on the complement', 'doubling edges repeatedly'],
    correctAnswerIndex: 0,
    explanation: 'The global minimum edge is tried first; DSU rejects edges forming cycles.',
    hint: 'Think globally sorted edges.'
  },
  {
    id: 'q11-mst-4',
    levelId: 'level-11-mst',
    question: 'Prim\u2019s algorithm grows the MST from a start vertex by repeatedly...',
    options: ['adding the cheapest edge crossing the current cut', 'sorting all edges once', 'removing the heaviest cycle edge', 'merging two forests randomly'],
    correctAnswerIndex: 0,
    explanation: 'Prim expands a single tree using the minimum-weight edge to an outside vertex.',
    hint: 'One connected component from the start.'
  },
  {
    id: 'q11-mst-5',
    levelId: 'level-11-mst',
    question: 'An MST of a graph with V vertices always contains exactly...',
    options: ['V − 1 edges', 'V edges', 'E edges', 'V/2 edges'],
    correctAnswerIndex: 0,
    explanation: 'A spanning tree on V vertices is minimally connected with V − 1 edges.',
    hint: 'One less than the vertex count.'
  },
  {
    id: 'q11-mst-6',
    levelId: 'level-11-mst',
    question: 'The cut property states that the minimum-weight edge crossing any cut is...',
    options: ['safe to include in some MST', 'never in any MST', 'always in every MST', 'irrelevant to MSTs'],
    correctAnswerIndex: 0,
    explanation: 'The lightest crossing edge is part of at least one minimum spanning tree.',
    hint: 'The foundation of Kruskal and Prim correctness.'
  },
  {
    id: 'q11-mst-7',
    levelId: 'level-11-mst',
    question: 'After sorting, Kruskal\u2019s algorithm runs in...',
    options: ['O(E log E)', 'O(V²)', 'O(V + E)', 'O(E log V + V log V) for the DSU part only — sorting dominates'],
    correctAnswerIndex: 0,
    explanation: 'Sorting the E edges dominates the near-linear DSU processing.',
    hint: 'The sort decides the total cost.'
  },
  {
    id: 'q11-mst-8',
    levelId: 'level-11-mst',
    question: 'Prim\u2019s algorithm with a binary heap runs in...',
    options: ['O(E log V)', 'O(V²)', 'O(E log E)', 'O(V + E)'],
    correctAnswerIndex: 0,
    explanation: 'Each of the E edges relaxes a heap key in O(log V).',
    hint: 'Heap operations per edge.'
  },
  {
    id: 'q11-mst-9',
    levelId: 'level-11-mst',
    question: 'The cycle property states that the heaviest edge on any cycle is...',
    options: ['never part of any MST', 'always part of every MST', 'the first edge chosen by Kruskal', 'irrelevant'],
    correctAnswerIndex: 0,
    explanation: 'Removing the heaviest cycle edge always yields a cheaper spanning tree.',
    hint: 'A heaviest cycle edge can be safely deleted.'
  },
  {
    id: 'q11-mst-10',
    levelId: 'level-11-mst',
    question: 'Edges: 0–1 = 1, 1–2 = 2, 0–2 = 3, 1–3 = 4. What is the total weight of the MST?',
    options: ['7', '6', '10', '8'],
    correctAnswerIndex: 0,
    explanation: 'Kruskal picks 1 (0–1), 2 (1–2), then skips 3 (0–2 forms a cycle) and takes 4 (1–3): total 7.',
    hint: 'Skip the edge that closes a cycle.'
  },
  {
    id: 'q12-tarjan-3',
    levelId: 'level-12-tarjan',
    question: 'A Strongly Connected Component (SCC) is a maximal set of vertices where...',
    options: ['every vertex is reachable from every other vertex', 'all vertices have equal degree', 'no vertex has outgoing edges', 'every pair shares an edge'],
    correctAnswerIndex: 0,
    explanation: 'Mutual reachability within the set defines an SCC.',
    hint: 'Mutually reachable, both directions.'
  },
  {
    id: 'q12-tarjan-4',
    levelId: 'level-12-tarjan',
    question: 'Tarjan\u2019s algorithm finds SCCs using...',
    options: ['one DFS with discovery times and low-link values', 'repeated BFS passes', 'edge sorting', 'Dijkstra with modified weights'],
    correctAnswerIndex: 0,
    explanation: 'Disc numbers and low-links let Tarjan pop SCCs during a single DFS.',
    hint: 'A single pass over the graph.'
  },
  {
    id: 'q12-tarjan-5',
    levelId: 'level-12-tarjan',
    question: 'In a DAG, how many SCCs are there?',
    options: ['one per vertex', 'exactly one', 'as many as edges', 'zero'],
    correctAnswerIndex: 0,
    explanation: 'With no cycles, no two vertices are mutually reachable.',
    hint: 'Every SCC needs a cycle.'
  },
  {
    id: 'q12-tarjan-6',
    levelId: 'level-12-tarjan',
    question: 'The condensation graph (SCCs as super-vertices) is always...',
    options: ['a DAG', 'strongly connected', 'a tree', 'complete'],
    correctAnswerIndex: 0,
    explanation: 'A cycle between SCCs would merge them into a single SCC.',
    hint: 'Cycles among components are impossible.'
  },
  {
    id: 'q12-tarjan-7',
    levelId: 'level-12-tarjan',
    question: 'Tarjan\u2019s algorithm runs in...',
    options: ['O(V + E)', 'O(V²)', 'O(V·E)', 'O(E log V)'],
    correctAnswerIndex: 0,
    explanation: 'Every vertex and edge is touched once during the single DFS.',
    hint: 'Linear in graph size.'
  },
  {
    id: 'q12-tarjan-8',
    levelId: 'level-12-tarjan',
    question: 'A vertex v is the root of an SCC when...',
    options: ['low[v] equals discovery time of v', 'low[v] is maximal', 'v has no outgoing edges', 'v is visited last'],
    correctAnswerIndex: 0,
    explanation: 'When the low-link cannot climb higher, v roots the component being popped.',
    hint: 'The low-link bottoms out at v.'
  },
  {
    id: 'q12-tarjan-9',
    levelId: 'level-12-tarjan',
    question: 'The graph 0 → 1 → 2 → 0 (a single directed cycle) contains how many SCCs?',
    options: ['1', '2', '3', '0'],
    correctAnswerIndex: 0,
    explanation: 'All three vertices are mutually reachable around the cycle.',
    hint: 'Every vertex can reach every other.'
  },
  {
    id: 'q12-tarjan-10',
    levelId: 'level-12-tarjan',
    question: 'Tarjan outputs SCCs in an order that is...',
    options: ['the reverse of a topological order of the condensation DAG', 'a random order', 'sorted by vertex degree', 'sorted by edge weight'],
    correctAnswerIndex: 0,
    explanation: 'The first completed SCCs have no incoming edges in the condensation, giving reverse topo order.',
    hint: 'First finished = sink component.'
  },
  {
    id: 'q13-knapsack-3',
    levelId: 'level-13-knapsack',
    question: 'Items (weight, value): (2, 3), (3, 4), (4, 5) with capacity 5. What is the maximum 0/1 value?',
    options: ['7', '5', '9', '6'],
    correctAnswerIndex: 0,
    explanation: 'Items 1 + 2 (weight 5) give 3 + 4 = 7; item 3 alone gives only 5.',
    hint: 'Try the two lightest items together.'
  },
  {
    id: 'q13-knapsack-4',
    levelId: 'level-13-knapsack',
    question: 'The "0/1" in 0/1 Knapsack means each item can be taken...',
    options: ['at most once (take or leave)', 'any number of times', 'only half of it', 'only with its neighbor'],
    correctAnswerIndex: 0,
    explanation: 'Each item is either fully included or fully excluded.',
    hint: 'Binary decision per item.'
  },
  {
    id: 'q13-knapsack-5',
    levelId: 'level-13-knapsack',
    question: 'The unbounded knapsack variant differs by allowing...',
    options: ['unlimited copies of each item', 'fractional items', 'negative weights', 'no capacity limit'],
    correctAnswerIndex: 0,
    explanation: 'Unbounded reuses items across the DP, unlike the 0/1 restriction.',
    hint: 'Items are available in infinite supply.'
  },
  {
    id: 'q13-knapsack-6',
    levelId: 'level-13-knapsack',
    question: 'The classic 0/1 knapsack DP table for n items and capacity W has dimensions...',
    options: ['(n + 1) × (W + 1)', 'n × W', '(n − 1) × W', 'n × n'],
    correctAnswerIndex: 0,
    explanation: 'Rows track item prefix, columns track capacity.',
    hint: 'Both indices plus a zero row and column.'
  },
  {
    id: 'q13-knapsack-7',
    levelId: 'level-13-knapsack',
    question: 'Why is greedy (highest value/weight ratio first) wrong for 0/1 knapsack?',
    options: ['an item that looks efficient may block two better light items', 'weights are always negative', 'greedy only works on trees', 'capacities are infinite'],
    correctAnswerIndex: 0,
    explanation: '0/1 indivisibility means local ratio choices miss global optima.',
    hint: 'Fractional knapsack is greedy; 0/1 is not.'
  },
  {
    id: 'q13-knapsack-8',
    levelId: 'level-13-knapsack',
    question: 'The 0/1 knapsack DP runs in O(n·W), which is called...',
    options: ['pseudo-polynomial (polynomial in the input value W, not its bit-length)', 'fully polynomial', 'exponential always', 'linear in n only'],
    correctAnswerIndex: 0,
    explanation: 'W is a number, not input size; log W bits encode it.',
    hint: 'Depends on the magnitude of W.'
  },
  {
    id: 'q13-knapsack-9',
    levelId: 'level-13-knapsack',
    question: 'In the 0/1 recurrence, the option that skips item i is expressed as...',
    options: ['dp[i − 1][w]', 'dp[i][w − 1]', 'dp[i − 1][w − wt]', 'dp[0][w]'],
    correctAnswerIndex: 0,
    explanation: 'Skipping means the best value for items 1..i−1 at the same capacity.',
    hint: 'Previous row, same capacity.'
  },
  {
    id: 'q13-knapsack-10',
    levelId: 'level-13-knapsack',
    question: 'Three items each of weight 1 with values 5, 7, 9, and capacity 3. The maximum value is...',
    options: ['21', '12', '16', '9'],
    correctAnswerIndex: 0,
    explanation: 'All three fit (total weight 3): 5 + 7 + 9 = 21.',
    hint: 'Take everything — it all fits.'
  },
  {
    id: 'q14-lcs-3',
    levelId: 'level-14-lcs',
    question: 'The length of the LCS of "ABCBDAB" and "BDCABA" is...',
    options: ['4', '5', '3', '6'],
    correctAnswerIndex: 0,
    explanation: 'A longest common subsequence such as "BCBA" or "BDAB" has length 4.',
    hint: 'Try "B-C-B-A" or "B-D-A-B".'
  },
  {
    id: 'q14-lcs-4',
    levelId: 'level-14-lcs',
    question: 'The LCS of "ABC" and "DEF" has length...',
    options: ['0', '1', '2', '3'],
    correctAnswerIndex: 0,
    explanation: 'The two strings share no common characters at all.',
    hint: 'No character appears in both strings.'
  },
  {
    id: 'q14-lcs-5',
    levelId: 'level-14-lcs',
    question: 'The two-row DP trick reduces the LCS memory from O(m·n) to...',
    options: ['O(min(m, n)) space (two rows)', 'O(m·n) still', 'O(m + n)²', 'O(1) always'],
    correctAnswerIndex: 0,
    explanation: 'Each cell only needs the previous row, so two rows suffice.',
    hint: 'Only the last row matters.'
  },
  {
    id: 'q14-lcs-6',
    levelId: 'level-14-lcs',
    question: 'When S1[i] and S2[j] differ, the DP update is...',
    options: ['max(dp[i − 1][j], dp[i][j − 1])', '1 + dp[i − 1][j − 1]', 'dp[i − 1][j − 1]', 'dp[i][j] + 1'],
    correctAnswerIndex: 0,
    explanation: 'One of the characters cannot extend the subsequence, so we keep the better prefix result.',
    hint: 'Best of dropping either character.'
  },
  {
    id: 'q14-lcs-7',
    levelId: 'level-14-lcs',
    question: 'The LCS DP runs in O(m·n) time for strings of lengths m and n. This is because...',
    options: ['every pair of positions is combined once', 'a single loop over the longer string', 'binary search per character', 'only matching pairs are visited'],
    correctAnswerIndex: 0,
    explanation: 'The table of m×n cells is filled cell by cell with O(1) work each.',
    hint: 'Count the table cells.'
  },
  {
    id: 'q14-lcs-8',
    levelId: 'level-14-lcs',
    question: 'The length of the LCS of "AGGTAB" and "GXTXAYB" is...',
    options: ['4', '5', '6', '3'],
    correctAnswerIndex: 0,
    explanation: 'A longest common subsequence is "GTAB", length 4.',
    hint: 'G-T-A-B appears in both in order.'
  },
  {
    id: 'q14-lcs-9',
    levelId: 'level-14-lcs',
    question: 'Reconstructing the actual LCS sequence follows...',
    options: ['the diagonal (match) and top/left (max) moves backwards from the last cell', 'the first row left to right', 'a random walk', 'the largest values only'],
    correctAnswerIndex: 0,
    explanation: 'Backtracking records diagonal moves as matched characters.',
    hint: 'Diagonal = take the character.'
  },
  {
    id: 'q14-lcs-10',
    levelId: 'level-14-lcs',
    question: 'The LCS of "abc" and "abc" has length...',
    options: ['3', '2', '1', '0'],
    correctAnswerIndex: 0,
    explanation: 'Identical strings share the whole string as a common subsequence.',
    hint: 'The strings are equal.'
  },
  {
    id: 'q15-floydwarshall-3',
    levelId: 'level-15-floydwarshall',
    question: 'Edges: 0–1 = 3, 0–2 = 8, 1–2 = 2. What is the shortest distance from 0 to 2?',
    options: ['5', '8', '13', '3'],
    correctAnswerIndex: 0,
    explanation: 'Going through vertex 1: 3 + 2 = 5 beats the direct edge of 8.',
    hint: 'Route through the intermediate vertex.'
  },
  {
    id: 'q15-floydwarshall-4',
    levelId: 'level-15-floydwarshall',
    question: 'Floyd-Warshall detects a negative-weight cycle when, after the algorithm, ...',
    options: ['any dist[i][i] becomes negative', 'all dist[i][j] are negative', 'dist[i][j] equals infinity', 'the diagonal stays zero'],
    correctAnswerIndex: 0,
    explanation: 'A negative cycle lets some vertex reach itself with negative cost.',
    hint: 'Check the diagonal of the final matrix.'
  },
  {
    id: 'q15-floydwarshall-5',
    levelId: 'level-15-floydwarshall',
    question: 'Floyd-Warshall runs in O(V³) time and uses...',
    options: ['O(V²) space', 'O(V³) space', 'O(E) space', 'O(log V) space'],
    correctAnswerIndex: 0,
    explanation: 'One V×V distance matrix (plus an optional next matrix) is stored.',
    hint: 'All-pairs table size.'
  },
  {
    id: 'q15-floydwarshall-6',
    levelId: 'level-15-floydwarshall',
    question: 'Path reconstruction after Floyd-Warshall is done with...',
    options: ['a next[i][j] matrix recording the first vertex on each path', 'a separate BFS tree', 'the distance matrix alone', 'a suffix array'],
    correctAnswerIndex: 0,
    explanation: 'The next matrix is updated whenever a path is improved through k.',
    hint: 'Remember who leads into j from i.'
  },
  {
    id: 'q15-floydwarshall-7',
    levelId: 'level-15-floydwarshall',
    question: 'Floyd-Warshall handles negative edge weights as long as...',
    options: ['there are no negative-weight cycles', 'all weights are even', 'the graph is undirected', 'V is small'],
    correctAnswerIndex: 0,
    explanation: 'Negative edges are fine; only negative cycles break shortest paths.',
    hint: 'Same condition as Bellman-Ford.'
  },
  {
    id: 'q15-floydwarshall-8',
    levelId: 'level-15-floydwarshall',
    question: 'The intermediate-vertex loop (k) in Floyd-Warshall must be...',
    options: ['the outermost loop', 'the innermost loop', 'replaced by a queue', 'run in reverse order'],
    correctAnswerIndex: 0,
    explanation: 'All pairs must consider k before k + 1 to keep distances consistent.',
    hint: 'Order of the three loops matters.'
  },
  {
    id: 'q15-floydwarshall-9',
    levelId: 'level-15-floydwarshall',
    question: 'The core recurrence of Floyd-Warshall is...',
    options: ['dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])', 'dist[i][j] = dist[i][j] + dist[k][k]', 'dist[i][j] = max(dist[i][k], dist[k][j])', 'dist[i][j] = dist[k][i] − dist[j][k]'],
    correctAnswerIndex: 0,
    explanation: 'Every pair may improve by routing through intermediate k.',
    hint: 'Combine two halves through k.'
  },
  {
    id: 'q15-floydwarshall-10',
    levelId: 'level-15-floydwarshall',
    question: 'After the algorithm, the final distance matrix contains...',
    options: ['shortest distances for all V² vertex pairs', 'distances for the current level only', 'only direct edges', 'MST edge weights'],
    correctAnswerIndex: 0,
    explanation: 'All-pairs output: one row and column per vertex.',
    hint: 'Every ordered pair gets an entry.'
  },
  {
    id: 'q16-matrixchain-3',
    levelId: 'level-16-matrixchain',
    question: 'Multiplying a 10×20 matrix by a 20×30 matrix needs how many scalar multiplications?',
    options: ['6000', '200', '300', '600'],
    correctAnswerIndex: 0,
    explanation: '10·20·30 = 6000 multiplications for the resulting 10×30 product.',
    hint: 'Multiply the three dimensions.'
  },
  {
    id: 'q16-matrixchain-4',
    levelId: 'level-16-matrixchain',
    question: 'A = 10×30, B = 30×5, C = 5×60. What is the minimum cost to multiply the chain?',
    options: ['4500', '27000', '9000', '18000'],
    correctAnswerIndex: 0,
    explanation: '(AB)C costs 1500 + 3000 = 4500; A(BC) costs 9000 + 18000 = 27000.',
    hint: 'Compute both parenthesizations and compare.'
  },
  {
    id: 'q16-matrixchain-5',
    levelId: 'level-16-matrixchain',
    question: 'The matrix-chain recurrence is dp[i][j] = min over k of...',
    options: ['dp[i][k] + dp[k+1][j] + p[i−1]·p[k]·p[j]', 'dp[i][k] + dp[k+1][j]', 'p[i−1]·p[k]·p[j]', 'dp[i][j−1] + p[i]·p[j]'],
    correctAnswerIndex: 0,
    explanation: 'Split at k, solve both halves, then pay the cost of combining the products.',
    hint: 'Split, solve, combine — with dimensions p.'
  },
  {
    id: 'q16-matrixchain-6',
    levelId: 'level-16-matrixchain',
    question: 'A chain of n matrices must be split into how many pairs of sub-chains at each split?',
    options: ['n − 1 possible split positions (k = 1..n−1)', 'n positions', 'exactly 2', 'n/2 positions'],
    correctAnswerIndex: 0,
    explanation: 'The chain can be cut after any of the first n − 1 matrices.',
    hint: 'One fewer split point than matrices.'
  },
  {
    id: 'q16-matrixchain-7',
    levelId: 'level-16-matrixchain',
    question: 'The matrix-chain DP table size is...',
    options: ['n × n', 'n × n × n', '2n × 2n', '(n−1) × (n−1)'],
    correctAnswerIndex: 0,
    explanation: 'One cell per (i, j) interval of the chain.',
    hint: 'All intervals of matrices.'
  },
  {
    id: 'q16-matrixchain-8',
    levelId: 'level-16-matrixchain',
    question: 'Matrix-chain multiplication DP runs in...',
    options: ['O(n³)', 'O(n²)', 'O(n log n)', 'O(2^n)'],
    correctAnswerIndex: 0,
    explanation: 'n² intervals, each scanning up to n split positions.',
    hint: 'Intervals × split points.'
  },
  {
    id: 'q16-matrixchain-9',
    levelId: 'level-16-matrixchain',
    question: 'Why can two parenthesizations of the same chain differ hugely in cost?',
    options: ['matrix multiplication is associative but the number of scalar multiplications is not', 'matrices do not exist otherwise', 'dimensions change after multiplication', 'only square matrices can be multiplied'],
    correctAnswerIndex: 0,
    explanation: '(AB)C and A(BC) give the same product but different inner dimensions.',
    hint: 'The intermediate matrix size changes the cost.'
  },
  {
    id: 'q16-matrixchain-10',
    levelId: 'level-16-matrixchain',
    question: 'The optimal k recorded for each interval enables...',
    options: ['reconstructing the optimal parenthesization', 'sorting the matrices', 'inverting the product', 'estimating memory'],
    correctAnswerIndex: 0,
    explanation: 'Tracing the recorded split points yields the full parenthesization.',
    hint: 'Each cell remembers its best split.'
  },
  {
    id: 'q17-dsu-3',
    levelId: 'level-17-dsu',
    question: 'Path compression in DSU makes find()...',
    options: ['point every node on the path directly to the root', 'double the tree height', 'merge two roots', 'swap the ranks'],
    correctAnswerIndex: 0,
    explanation: 'Flattening keeps future finds nearly O(1).',
    hint: 'Flatten the path during the climb.'
  },
  {
    id: 'q17-dsu-4',
    levelId: 'level-17-dsu',
    question: 'Union by rank attaches...',
    options: ['the smaller tree under the larger tree', 'the larger tree under the smaller one', 'both roots together randomly', 'every node to the first root'],
    correctAnswerIndex: 0,
    explanation: 'Keeping trees shallow prevents tall chains.',
    hint: 'Short tree under tall tree.'
  },
  {
    id: 'q17-dsu-5',
    levelId: 'level-17-dsu',
    question: 'The two classic DSU optimizations are...',
    options: ['path compression and union by rank', 'path splitting and heap ordering', 'binary lifting and memoization', 'red-black rebalancing and rotation'],
    correctAnswerIndex: 0,
    explanation: 'Together they achieve nearly constant amortized operations.',
    hint: 'One flattens, one keeps trees short.'
  },
  {
    id: 'q17-dsu-6',
    levelId: 'level-17-dsu',
    question: 'With N = 5, after union(0,1), union(2,3), union(1,2), how many disjoint sets remain?',
    options: ['2', '3', '4', '5'],
    correctAnswerIndex: 0,
    explanation: '{0,1,2,3} forms one set; {4} is alone: 2 sets total.',
    hint: 'Chain the unions together.'
  },
  {
    id: 'q17-dsu-7',
    levelId: 'level-17-dsu',
    question: 'The find(x) operation returns...',
    options: ['the representative (root) of x\u2019s set', 'the parent of x', 'the size of x\u2019s set', 'the depth of x'],
    correctAnswerIndex: 0,
    explanation: 'The root identifies the set; all members share it.',
    hint: 'The unique set identifier.'
  },
  {
    id: 'q17-dsu-8',
    levelId: 'level-17-dsu',
    question: 'DSU is the key structure that makes which algorithm efficient?',
    options: ['Kruskal\u2019s MST', 'Dijkstra\u2019s shortest path', 'merge sort', 'KMP pattern search'],
    correctAnswerIndex: 0,
    explanation: 'DSU answers the cycle question for each candidate edge in near O(1).',
    hint: 'Cycle detection in edge processing.'
  },
  {
    id: 'q17-dsu-9',
    levelId: 'level-17-dsu',
    question: 'After k successful unions among N isolated elements (no merges within a set), the number of sets is...',
    options: ['N − k', 'N + k', 'k', 'N'],
    correctAnswerIndex: 0,
    explanation: 'Each union merges two distinct sets, reducing the count by one.',
    hint: 'Each union removes one set.'
  },
  {
    id: 'q17-dsu-10',
    levelId: 'level-17-dsu',
    question: 'The amortized cost of find() with both optimizations is...',
    options: ['O(α(N)) — effectively O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
    correctAnswerIndex: 0,
    explanation: 'The inverse Ackermann function grows so slowly it is constant in practice.',
    hint: 'Tiny, tiny growth rate.'
  },
  {
    id: 'q18-kmp-3',
    levelId: 'level-18-kmp',
    question: 'The LPS array of the pattern "AAAA" is...',
    options: ['[0, 1, 2, 3]', '[0, 0, 0, 0]', '[1, 1, 1, 1]', '[0, 1, 1, 1]'],
    correctAnswerIndex: 0,
    explanation: 'Each prefix "A", "AA", "AAA", "AAAA" is its own longest border.',
    hint: 'Every prefix is a prefix of itself.'
  },
  {
    id: 'q18-kmp-4',
    levelId: 'level-18-kmp',
    question: 'The LPS array of the pattern "ABAB" is...',
    options: ['[0, 0, 1, 2]', '[0, 1, 2, 3]', '[0, 0, 0, 0]', '[1, 0, 1, 0]'],
    correctAnswerIndex: 0,
    explanation: 'LPS(3) = 2 because "AB" is both prefix and suffix of "ABAB".',
    hint: 'Longest proper prefix that is also a suffix.'
  },
  {
    id: 'q18-kmp-5',
    levelId: 'level-18-kmp',
    question: 'When text[i] mismatches pattern[j], KMP continues with...',
    options: ['j = lps[j − 1] (no backtracking in the text)', 'j = 0 and i = i + 1', 'i = i − 1', 'j = pattern.length'],
    correctAnswerIndex: 0,
    explanation: 'The failure function reuses the matched prefix instead of rescanning.',
    hint: 'The text pointer never moves back.'
  },
  {
    id: 'q18-kmp-6',
    levelId: 'level-18-kmp',
    question: 'After finding a full match at text[i], KMP continues searching for overlapping matches with...',
    options: ['j = lps[j − 1]', 'j = 0', 'i = i + j', 'j = j − 1'],
    correctAnswerIndex: 0,
    explanation: 'The border of the full pattern enables overlapping occurrences.',
    hint: 'The failure function again.'
  },
  {
    id: 'q18-kmp-7',
    levelId: 'level-18-kmp',
    question: 'KMP preprocesses the pattern in O(M) and scans the text in O(N), giving total...',
    options: ['O(N + M)', 'O(N·M)', 'O(N log M)', 'O(N²)'],
    correctAnswerIndex: 0,
    explanation: 'The text is scanned exactly once with the LPS array doing the work.',
    hint: 'Linear in both inputs.'
  },
  {
    id: 'q18-kmp-8',
    levelId: 'level-18-kmp',
    question: 'LPS[i] is defined as the length of the longest proper prefix of pattern[0..i] that is also a...',
    options: ['suffix of pattern[0..i]', 'prefix of pattern[0..i−1]', 'substring of the text', 'palindrome'],
    correctAnswerIndex: 0,
    explanation: 'The border is a prefix that also ends the substring.',
    hint: 'Same string at both ends.'
  },
  {
    id: 'q18-kmp-9',
    levelId: 'level-18-kmp',
    question: 'For the pattern "AAACAAAA", lps[7] (the last character) equals...',
    options: ['3', '2', '4', '0'],
    correctAnswerIndex: 0,
    explanation: 'The longest border of "AAACAAAA" is "AAA" (length 3).',
    hint: 'Suffix "AAA" matches the prefix "AAA".'
  },
  {
    id: 'q18-kmp-10',
    levelId: 'level-18-kmp',
    question: 'A key property of KMP is that the text pointer i...',
    options: ['never moves backwards', 'moves back to i − lps[j]', 'restarts at each match', 'moves twice per character'],
    correctAnswerIndex: 0,
    explanation: 'Linear scanning is guaranteed because i only ever increments.',
    hint: 'One forward pass over the text.'
  },
  {
    id: 'q19-suffixarray-3',
    levelId: 'level-19-suffixarray',
    question: 'The suffixes of "banana" sorted lexicographically start with...',
    options: ['"a", "ana", "anana", "banana", "na", "nana"', '"banana", "anana", "nana", "ana", "na", "a"', '"a", "na", "ana", "nana", "anana", "banana"', '"banana", "a", "ana", "anana", "na", "nana"'],
    correctAnswerIndex: 0,
    explanation: 'Lexicographic order: single "a" first, then longer a-suffixes, etc.',
    hint: 'Sort like words in a dictionary.'
  },
  {
    id: 'q19-suffixarray-4',
    levelId: 'level-19-suffixarray',
    question: 'For "banana", the suffix array (start indices in sorted order) begins with index...',
    options: ['5 (suffix "a")', '0 (suffix "banana")', '4 (suffix "na")', '2 (suffix "nana")'],
    correctAnswerIndex: 0,
    explanation: 'The smallest suffix is the last character "a" at index 5.',
    hint: 'The smallest suffix starts with the smallest character.'
  },
  {
    id: 'q19-suffixarray-5',
    levelId: 'level-19-suffixarray',
    question: 'The LCP array stores, for consecutive suffixes in the suffix array, ...',
    options: ['the length of their longest common prefix', 'the distance between their start indices', 'their total length', 'the number of shared characters at the end'],
    correctAnswerIndex: 0,
    explanation: 'LCP[i] = length of the common prefix of SA[i−1] and SA[i].',
    hint: 'Shared beginning length of neighbors.'
  },
  {
    id: 'q19-suffixarray-6',
    levelId: 'level-19-suffixarray',
    question: 'With a suffix array of length N, searching a pattern of length M takes...',
    options: ['O(M log N)', 'O(N + M)', 'O(N·M)', 'O(log N)'],
    correctAnswerIndex: 0,
    explanation: 'Binary search compares the pattern with suffixes, each comparison O(M).',
    hint: 'Binary search with a per-comparison cost.'
  },
  {
    id: 'q19-suffixarray-7',
    levelId: 'level-19-suffixarray',
    question: 'The number of distinct substrings of a string of length N can be computed as...',
    options: ['N(N+1)/2 − sum(LCP array)', 'N(N+1)/2', 'sum of the suffix array', 'N² − LCP[0]'],
    correctAnswerIndex: 0,
    explanation: 'Subtracting shared prefix lengths removes the duplicates among all suffixes.',
    hint: 'All substrings minus repeated prefixes.'
  },
  {
    id: 'q19-suffixarray-8',
    levelId: 'level-19-suffixarray',
    question: 'Suffix arrays are typically built in...',
    options: ['O(N log N) with the doubling method', 'O(N²) always', 'O(2^N)', 'O(N log² N) only for palindromes'],
    correctAnswerIndex: 0,
    explanation: 'The doubling algorithm sorts suffixes by 1, 2, 4, ... character ranks in O(N log N).',
    hint: 'Sort by powers of two lengths.'
  },
  {
    id: 'q19-suffixarray-9',
    levelId: 'level-19-suffixarray',
    question: 'For "banana", the LCP of the consecutive suffixes "ana" and "anana" is...',
    options: ['3', '2', '1', '0'],
    correctAnswerIndex: 0,
    explanation: 'Both share the full prefix "ana".',
    hint: 'Compare character by character.'
  },
  {
    id: 'q19-suffixarray-10',
    levelId: 'level-19-suffixarray',
    question: 'The suffix array combined with the LCP array is the classic tool for finding...',
    options: ['the longest repeated substring', 'the shortest unique prefix only', 'MST weights', 'sorted BST output'],
    correctAnswerIndex: 0,
    explanation: 'The maximum value in the LCP array gives the longest repeated substring.',
    hint: 'The biggest shared prefix of neighbors.'
  },
  {
    id: 'q20-amortized-3',
    levelId: 'level-20-amortized',
    question: 'The amortized cost per append to a dynamically resizing (doubling) array is...',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswerIndex: 0,
    explanation: 'A resize costing O(n) is paid for by n cheap appends — O(1) per operation on average.',
    hint: 'Aggregate the total over n operations.'
  },
  {
    id: 'q20-amortized-4',
    levelId: 'level-20-amortized',
    question: 'The Potential Method defines a potential function Φ such that...',
    options: ['amortized cost = actual cost + ΔΦ', 'amortized cost = actual cost − ΔΦ', 'Φ must be negative', 'Φ equals the operation count'],
    correctAnswerIndex: 0,
    explanation: 'The change in potential stores "saved work" from cheap operations to pay for future ones.',
    hint: 'The potential bank account.'
  },
  {
    id: 'q20-amortized-5',
    levelId: 'level-20-amortized',
    question: 'The Accounting Method works by...',
    options: ['overcharging cheap operations so the surplus pays for rare expensive ones', 'undercharging all operations equally', 'running each operation twice', 'precomputing all costs'],
    correctAnswerIndex: 0,
    explanation: 'Credit accumulated on cheap operations funds the expensive ones later.',
    hint: 'Pre-paid tokens.'
  },
  {
    id: 'q20-amortized-6',
    levelId: 'level-20-amortized',
    question: 'The Aggregate Method computes...',
    options: ['total worst-case cost of n operations divided by n', 'the cost of the most expensive operation', 'the median operation cost', 'the sum of all input sizes'],
    correctAnswerIndex: 0,
    explanation: 'Averaging the total over all operations gives the amortized bound.',
    hint: 'Divide the grand total by the operation count.'
  },
  {
    id: 'q20-amortized-7',
    levelId: 'level-20-amortized',
    question: 'A stack supporting push, pop, and multipop has amortized cost...',
    options: ['O(1) per operation', 'O(n) per operation', 'O(log n) per operation', 'O(n²) per operation'],
    correctAnswerIndex: 0,
    explanation: 'Each element is pushed once and popped once — total work is O(n) for n operations.',
    hint: 'Every pop removes an element that was pushed.'
  },
  {
    id: 'q20-amortized-8',
    levelId: 'level-20-amortized',
    question: 'Incrementing a binary counter n times flips at most...',
    options: ['2n bits total', 'n² bits', 'n log n bits', 'n bits total'],
    correctAnswerIndex: 0,
    explanation: 'Each increment flips all trailing 1s and the next 0 — bit i flips every 2^i increments, summing to ≤ 2n.',
    hint: 'Sum the flip frequencies across bits.'
  },
  {
    id: 'q20-amortized-9',
    levelId: 'level-20-amortized',
    question: 'Amortized analysis is...',
    options: ['a worst-case bound averaged over a sequence, not an average-case analysis', 'the same as average-case analysis', 'an upper bound on a single operation', 'a randomized expectation'],
    correctAnswerIndex: 0,
    explanation: 'It is worst-case over the sequence — no probability involved.',
    hint: 'Deterministic, but over many operations.'
  },
  {
    id: 'q20-amortized-10',
    levelId: 'level-20-amortized',
    question: 'If Φ starts at 0 and never drops below 0, then total amortized cost...',
    options: ['is an upper bound on total actual cost', 'is lower than the actual cost', 'is unrelated to actual cost', 'must equal actual cost'],
    correctAnswerIndex: 0,
    explanation: 'Since Σ(actual) = Σ(amortized) − (Φ_final − Φ_0) ≤ Σ(amortized).',
    hint: 'The potential bookkeeping never understates work.'
  },
  {
    id: 'q21-fibonacci-3',
    levelId: 'level-21-fibonacci',
    question: 'Cascading cuts in a Fibonacci heap stop when...',
    options: ['a parent is not marked (or the root is reached)', 'every node is marked', 'the heap size doubles', 'the minimum is deleted'],
    correctAnswerIndex: 0,
    explanation: 'Cuts cascade while parents are marked; an unmarked parent absorbs the loss and stops the chain.',
    hint: 'The chain breaks at the first unmarked node.'
  },
  {
    id: 'q21-fibonacci-4',
    levelId: 'level-21-fibonacci',
    question: 'The amortized cost of extract-min in a Fibonacci heap is...',
    options: ['O(log n)', 'O(1)', 'O(n)', 'O(n log n)'],
    correctAnswerIndex: 0,
    explanation: 'Consolidation merges trees by degree; the number of roots stays O(log n).',
    hint: 'The tree-degree bound drives this.'
  },
  {
    id: 'q21-fibonacci-5',
    levelId: 'level-21-fibonacci',
    question: 'Which Fibonacci heap operation is NOT O(1) amortized?',
    options: ['extract-min', 'insert', 'merge (union)', 'decrease-key'],
    correctAnswerIndex: 0,
    explanation: 'Extract-min needs consolidation across the root list; the rest are constant amortized.',
    hint: 'The one that removes the minimum.'
  },
  {
    id: 'q21-fibonacci-6',
    levelId: 'level-21-fibonacci',
    question: 'When decrease-key cuts a node, its parent becomes...',
    options: ['marked (if not already)', 'unmarked', 'the new root', 'a leaf'],
    correctAnswerIndex: 0,
    explanation: 'The parent is marked to remember it lost a child, triggering cascading cuts later.',
    hint: 'A flag that records the lost child.'
  },
  {
    id: 'q21-fibonacci-7',
    levelId: 'level-21-fibonacci',
    question: 'Compared to a binary heap, a Fibonacci heap wins when...',
    options: ['decrease-key operations are frequent (e.g. Dijkstra)', 'memory is extremely limited', 'only insert and extract-min are used', 'keys are all equal'],
    correctAnswerIndex: 0,
    explanation: 'O(1) decrease-key amortized beats the binary heap\u2019s O(log n).',
    hint: 'Look at what Dijkstra does constantly.'
  },
  {
    id: 'q21-fibonacci-8',
    levelId: 'level-21-fibonacci',
    question: 'The maximum degree of any node in a Fibonacci heap with n elements is...',
    options: ['O(log n)', 'O(n)', 'O(1)', 'O(√n)'],
    correctAnswerIndex: 0,
    explanation: 'The marking bound makes tree sizes grow at least Fibonacci-like with degree.',
    hint: 'The name of the heap gives a hint.'
  },
  {
    id: 'q21-fibonacci-9',
    levelId: 'level-21-fibonacci',
    question: 'Dijkstra\u2019s algorithm with a Fibonacci heap runs in...',
    options: ['O(E + V log V)', 'O((V + E) log V)', 'O(V²)', 'O(E log V)'],
    correctAnswerIndex: 0,
    explanation: 'E decrease-keys at O(1) plus V extract-mins at O(log V).',
    hint: 'Count the two heap operation kinds.'
  },
  {
    id: 'q21-fibonacci-10',
    levelId: 'level-21-fibonacci',
    question: 'Consolidation in extract-min combines trees...',
    options: ['with equal degree into one tree', 'with equal key values', 'randomly', 'with unequal heights only'],
    correctAnswerIndex: 0,
    explanation: 'A degree-indexed array merges pairs of trees having the same root degree.',
    hint: 'Like binary addition of tree sizes.'
  },
  {
    id: 'q22-rabinkarp-3',
    levelId: 'level-22-rabinkarp',
    question: 'The rolling hash updates the window hash in...',
    options: ['O(1)', 'O(M)', 'O(N)', 'O(log M)'],
    correctAnswerIndex: 0,
    explanation: 'Subtract the outgoing character, shift, add the incoming one.',
    hint: 'One subtraction, one multiplication, one addition.'
  },
  {
    id: 'q22-rabinkarp-4',
    levelId: 'level-22-rabinkarp',
    question: 'A large prime is used as the modulus in Rabin-Karp to...',
    options: ['reduce hash collisions', 'speed up string comparison', 'allow negative hashes', 'make the pattern shorter'],
    correctAnswerIndex: 0,
    explanation: 'A big modulus spreads hashes, so collisions — and O(M) verifications — are rare.',
    hint: 'Fewer false matches.'
  },
  {
    id: 'q22-rabinkarp-5',
    levelId: 'level-22-rabinkarp',
    question: 'When a window hash equals the pattern hash, Rabin-Karp...',
    options: ['verifies the window with an actual string comparison', 'accepts it without checking', 'rehashes the pattern', 'shifts by two characters'],
    correctAnswerIndex: 0,
    explanation: 'Hashes can collide, so equality must be confirmed character by character.',
    hint: 'Trust but verify.'
  },
  {
    id: 'q22-rabinkarp-6',
    levelId: 'level-22-rabinkarp',
    question: 'Rabin-Karp\u2019s average time is O(N + M) but the worst case is...',
    options: ['O(N·M) when many windows collide', 'O(N²)', 'O(2^N)', 'O(N log M)'],
    correctAnswerIndex: 0,
    explanation: 'If every window hash matches, each is verified in O(M).',
    hint: 'Pathological hash collisions.'
  },
  {
    id: 'q22-rabinkarp-7',
    levelId: 'level-22-rabinkarp',
    question: 'Shifting the window from position i to i + 1 (length M, base d, modulus q) computes the new hash as...',
    options: ['h = ((h − old_char·d^(M−1))·d + new_char) mod q', 'h = (h + new_char) mod q', 'h = (h − old_char) mod q', 'h = old_char·new_char mod q'],
    correctAnswerIndex: 0,
    explanation: 'Remove the leading contribution, scale, add the new trailing character.',
    hint: 'Slide out, shift, slide in.'
  },
  {
    id: 'q22-rabinkarp-8',
    levelId: 'level-22-rabinkarp',
    question: 'Increasing the alphabet base d generally...',
    options: ['reduces collision probability (with a large modulus)', 'increases collision probability', 'changes nothing', 'breaks the rolling property'],
    correctAnswerIndex: 0,
    explanation: 'Larger bases spread distinct strings across more hash values.',
    hint: 'More diversity in hash values.'
  },
  {
    id: 'q22-rabinkarp-9',
    levelId: 'level-22-rabinkarp',
    question: 'A strong use case for Rabin-Karp is...',
    options: ['searching for multiple patterns in one pass', 'searching one pattern in one pass with lower constants than KMP', 'building suffix arrays', 'sorting strings'],
    correctAnswerIndex: 0,
    explanation: 'All pattern hashes can be tested against each window simultaneously.',
    hint: 'One window, many pattern hashes.'
  },
  {
    id: 'q22-rabinkarp-10',
    levelId: 'level-22-rabinkarp',
    question: 'Rabin-Karp preprocesses the pattern by...',
    options: ['computing its hash value once', 'building its LPS array', 'sorting its characters', 'reversing it'],
    correctAnswerIndex: 0,
    explanation: 'The pattern hash is compared with every window hash.',
    hint: 'A single O(M) hash.'
  },
  {
    id: 'q23-convexhull-3',
    levelId: 'level-23-convexhull',
    question: 'The cross product (b − a) × (c − a) being positive means the turn at b is...',
    options: ['counter-clockwise', 'clockwise', 'collinear', 'undefined'],
    correctAnswerIndex: 0,
    explanation: 'A positive cross product indicates a left (counter-clockwise) turn from a→b→c.',
    hint: 'Positive = left turn.'
  },
  {
    id: 'q23-convexhull-4',
    levelId: 'level-23-convexhull',
    question: 'A cross product of exactly zero means the three points are...',
    options: ['collinear', 'forming a right angle', 'counter-clockwise', 'the triangle is equilateral'],
    correctAnswerIndex: 0,
    explanation: 'Zero area means the points lie on one straight line.',
    hint: 'No triangle area at all.'
  },
  {
    id: 'q23-convexhull-5',
    levelId: 'level-23-convexhull',
    question: 'Jarvis March (gift wrapping) runs in...',
    options: ['O(N·H) where H is the hull size', 'O(N log N)', 'O(N²) always', 'O(H log N)'],
    correctAnswerIndex: 0,
    explanation: 'Each hull vertex is found by scanning all N points.',
    hint: 'The complexity involves the output size.'
  },
  {
    id: 'q23-convexhull-6',
    levelId: 'level-23-convexhull',
    question: 'Graham Scan starts by sorting points by...',
    options: ['polar angle (after finding the lowest point)', 'their x coordinate only', 'their y coordinate only', 'their distance from the origin'],
    correctAnswerIndex: 0,
    explanation: 'Sorting by polar angle around the lowest point lets one stack pass build the hull.',
    hint: 'A circular order around a pivot.'
  },
  {
    id: 'q23-convexhull-7',
    levelId: 'level-23-convexhull',
    question: 'Andrew\u2019s monotone chain sorts points by...',
    options: ['(x, y) and builds the hull in two passes (lower + upper)', 'polar angle', 'random order', 'y, then angle'],
    correctAnswerIndex: 0,
    explanation: 'Two sweeps — left-to-right and right-to-left — build the lower and upper hulls.',
    hint: 'Sort once, sweep twice.'
  },
  {
    id: 'q23-convexhull-8',
    levelId: 'level-23-convexhull',
    question: 'In Graham Scan, a point is popped from the hull stack when it makes...',
    options: ['a non-counter-clockwise turn (including collinear)', 'a counter-clockwise turn', 'a 90° turn', 'any turn'],
    correctAnswerIndex: 0,
    explanation: 'Non-CCW turns break the convex boundary, so the middle point leaves.',
    hint: 'Hull boundary must turn strictly left.'
  },
  {
    id: 'q23-convexhull-9',
    levelId: 'level-23-convexhull',
    question: 'For N points all on a circle, the convex hull contains...',
    options: ['all N points (hull size = N)', 'only 3 points', 'N/2 points', '1 point'],
    correctAnswerIndex: 0,
    explanation: 'Every point on a circle is a hull vertex, so Graham Scan still runs in O(N log N).',
    hint: 'Nobody is inside the shape.'
  },
  {
    id: 'q23-convexhull-10',
    levelId: 'level-23-convexhull',
    question: 'The sign of the cross product decides whether a turn is left or right, which is used to...',
    options: ['decide whether a candidate point stays on the hull', 'compute the hull area', 'sort the input', 'find the centroid'],
    correctAnswerIndex: 0,
    explanation: 'Orientation tests drive both Graham Scan and Jarvis March.',
    hint: 'The orientation test is the core primitive.'
  },
  {
    id: 'q24-npcomplete-3',
    levelId: 'level-24-npcomplete',
    question: 'P is the class of problems...',
    options: ['solvable in polynomial time on a deterministic machine', 'verifiable in exponential time', 'unsolvable in principle', 'solvable only with randomness'],
    correctAnswerIndex: 0,
    explanation: 'P contains decision problems with polynomial-time algorithms.',
    hint: 'Polynomial-time solutions.'
  },
  {
    id: 'q24-npcomplete-4',
    levelId: 'level-24-npcomplete',
    question: 'NP is the class of problems whose solutions...',
    options: ['can be verified in polynomial time', 'can always be found in polynomial time', 'require exponential storage', 'have no certificates'],
    correctAnswerIndex: 0,
    explanation: 'A certificate (yes-instance witness) can be checked in polynomial time.',
    hint: 'Checking is easy, finding may be hard.'
  },
  {
    id: 'q24-npcomplete-5',
    levelId: 'level-24-npcomplete',
    question: 'A problem is NP-hard if...',
    options: ['every problem in NP reduces to it in polynomial time', 'it is in P', 'it can be solved by BFS', 'it has no decision version'],
    correctAnswerIndex: 0,
    explanation: 'NP-hard problems are at least as hard as every NP problem.',
    hint: 'NP problems can be translated into it.'
  },
  {
    id: 'q24-npcomplete-6',
    levelId: 'level-24-npcomplete',
    question: 'A problem is NP-complete if it is...',
    options: ['both NP-hard and in NP', 'only in NP', 'only NP-hard', 'in P'],
    correctAnswerIndex: 0,
    explanation: 'NP-complete = hardest problems of NP: NP-hard plus a polynomial certificate.',
    hint: 'Two conditions are required.'
  },
  {
    id: 'q24-npcomplete-7',
    levelId: 'level-24-npcomplete',
    question: 'Which problem is known to be NP-complete?',
    options: ['3-SAT', 'Shortest path in a DAG', 'Finding the minimum of an array', 'MST of a graph'],
    correctAnswerIndex: 0,
    explanation: '3-SAT was the first proved NP-complete problem (Cook-Levin).',
    hint: 'The classic reduction target.'
  },
  {
    id: 'q24-npcomplete-8',
    levelId: 'level-24-npcomplete',
    question: 'The decision version of the Traveling Salesman Problem is...',
    options: ['NP-complete', 'in P', 'solvable by Dijkstra', 'undecidable'],
    correctAnswerIndex: 0,
    explanation: '"Does a tour shorter than k exist?" is NP-complete; verifying a tour is easy.',
    hint: 'Tours are easy to check, hard to find.'
  },
  {
    id: 'q24-npcomplete-9',
    levelId: 'level-24-npcomplete',
    question: 'If P = NP, then...',
    options: ['every NP-complete problem has a polynomial-time algorithm', 'NP-complete problems still need exponential time', 'no problems remain in P', 'verification becomes exponential'],
    correctAnswerIndex: 0,
    explanation: 'A polynomial algorithm for one NP-complete problem would transfer to all via reductions.',
    hint: 'Reductions propagate the solution.'
  },
  {
    id: 'q24-npcomplete-10',
    levelId: 'level-24-npcomplete',
    question: 'Which problem is definitely in P (assuming P ≠ NP)?',
    options: ['Shortest path with non-negative weights (Dijkstra)', '3-SAT', 'Hamiltonian cycle', 'TSP decision'],
    correctAnswerIndex: 0,
    explanation: 'Dijkstra solves it in polynomial time, so it is in P, not NP-complete.',
    hint: 'The one with a known fast algorithm.'
  }
];

export function getQuizQuestionsForLevel(levelId?: string): QuizQuestion[] {
  if (!levelId) return QUIZ_QUESTIONS;
  const filtered = QUIZ_QUESTIONS.filter(q => q.levelId === levelId);
  return filtered.length > 0 ? filtered : QUIZ_QUESTIONS;
}

export const TREE_BALANCE_PUZZLES: TreeBalancePuzzle[] = [
  {
    id: 'puzzle-1',
    levelId: 'level-2-avl',
    title: 'Fix the LL Imbalance',
    description: 'Node 30 has balance factor +2 because its left child (20) has height 2 while the right subtree is empty. Which rotation rebalances the tree?',
    unbalancedNodeValue: 30,
    correctRotation: 'LL',
    explanation: 'The imbalance came from the Left child\u2019s Left subtree (LL case), so a Single Right Rotation on Node 30 fixes it.',
    hint: 'The RED node 30 is left-heavy (BF = +2) and its left child 20 is ALSO left-heavy. Both are on the LEFT-LEFT side. What single rotation turns the left child into the new root?',
    initialTreeNodes: [
      { id: 30, value: 30, x: 220, y: 50, balanceFactor: 2, state: 'error' },
      { id: 20, value: 20, x: 140, y: 120, balanceFactor: 1, state: 'warning' },
      { id: 10, value: 10, x: 70, y: 190, balanceFactor: 0, state: 'default' }
    ],
    initialEdges: [{ from: 30, to: 20 }, { from: 20, to: 10 }],
    rotatedTreeNodes: [
      { id: 20, value: 20, x: 220, y: 50, balanceFactor: 0, state: 'success' },
      { id: 10, value: 10, x: 140, y: 120, balanceFactor: 0, state: 'success' },
      { id: 30, value: 30, x: 300, y: 120, balanceFactor: 0, state: 'success' }
    ],
    rotatedEdges: [{ from: 20, to: 10 }, { from: 20, to: 30 }]
  },
  {
    id: 'puzzle-2',
    levelId: 'level-2-avl',
    title: 'Fix the RR Imbalance',
    description: 'Node 20 has balance factor -2 because its right child (30) is right-heavy. Which rotation balances the tree?',
    unbalancedNodeValue: 20,
    correctRotation: 'RR',
    explanation: 'The imbalance came from the Right child\u2019s Right subtree (RR case), so a Single Left Rotation on Node 20 fixes it.',
    hint: 'The RED node 20 is right-heavy (BF = -2) and its right child 30 is ALSO right-heavy. Both are on the RIGHT-RIGHT side. Which single rotation re-centers the right child?',
    initialTreeNodes: [
      { id: 20, value: 20, x: 220, y: 50, balanceFactor: -2, state: 'error' },
      { id: 30, value: 30, x: 300, y: 120, balanceFactor: -1, state: 'warning' },
      { id: 40, value: 40, x: 370, y: 190, balanceFactor: 0, state: 'default' }
    ],
    initialEdges: [{ from: 20, to: 30 }, { from: 30, to: 40 }],
    rotatedTreeNodes: [
      { id: 30, value: 30, x: 220, y: 50, balanceFactor: 0, state: 'success' },
      { id: 20, value: 20, x: 140, y: 120, balanceFactor: 0, state: 'success' },
      { id: 40, value: 40, x: 300, y: 120, balanceFactor: 0, state: 'success' }
    ],
    rotatedEdges: [{ from: 30, to: 20 }, { from: 30, to: 40 }]
  },
  {
    id: 'puzzle-3',
    levelId: 'level-2-avl',
    title: 'Fix the LR Double Imbalance',
    description: 'Node 30 has balance factor +2, but the heavy insertion happened in the Left child\u2019s Right subtree (node 20). A single rotation won\u2019t work. What is the correct fix?',
    unbalancedNodeValue: 30,
    correctRotation: 'LR',
    explanation: 'This is the Left-Right (LR) case: rotate left on the left child (10) first, then rotate right on the parent (30).',
    hint: 'The RED node 30 is left-heavy, but its left child 10 is right-heavy (BF = -1) — the weight is on the child\u2019s RIGHT side. That means TWO rotations: first on the child, then on the parent.',
    initialTreeNodes: [
      { id: 30, value: 30, x: 220, y: 50, balanceFactor: 2, state: 'error' },
      { id: 10, value: 10, x: 140, y: 120, balanceFactor: -1, state: 'warning' },
      { id: 20, value: 20, x: 190, y: 190, balanceFactor: 0, state: 'default' }
    ],
    initialEdges: [{ from: 30, to: 10 }, { from: 10, to: 20 }],
    rotatedTreeNodes: [
      { id: 20, value: 20, x: 220, y: 50, balanceFactor: 0, state: 'success' },
      { id: 10, value: 10, x: 140, y: 120, balanceFactor: 0, state: 'success' },
      { id: 30, value: 30, x: 300, y: 120, balanceFactor: 0, state: 'success' }
    ],
    rotatedEdges: [{ from: 20, to: 10 }, { from: 20, to: 30 }]
  },
  {
    id: 'puzzle-4',
    levelId: 'level-2-avl',
    title: 'Fix the RL Double Imbalance',
    description: 'Node 10 has balance factor -2, but the heavy insertion happened in the Right child\u2019s Left subtree (node 30). What is the correct fix?',
    unbalancedNodeValue: 10,
    correctRotation: 'RL',
    explanation: 'This is the Right-Left (RL) case: rotate right on the right child (40) first, then rotate left on the parent (10).',
    hint: 'The RED node 10 is right-heavy, but its right child 40 is left-heavy (BF = +1) — the weight is on the child\u2019s LEFT side. Two rotations: first on the child, then on the parent.',
    initialTreeNodes: [
      { id: 10, value: 10, x: 220, y: 50, balanceFactor: -2, state: 'error' },
      { id: 40, value: 40, x: 300, y: 120, balanceFactor: 1, state: 'warning' },
      { id: 30, value: 30, x: 250, y: 190, balanceFactor: 0, state: 'default' }
    ],
    initialEdges: [{ from: 10, to: 40 }, { from: 40, to: 30 }],
    rotatedTreeNodes: [
      { id: 30, value: 30, x: 220, y: 50, balanceFactor: 0, state: 'success' },
      { id: 10, value: 10, x: 140, y: 120, balanceFactor: 0, state: 'success' },
      { id: 40, value: 40, x: 300, y: 120, balanceFactor: 0, state: 'success' }
    ],
    rotatedEdges: [{ from: 30, to: 10 }, { from: 30, to: 40 }]
  },
  {
    id: 'puzzle-5',
    levelId: 'level-2-avl',
    title: 'LL Imbalance after Inserting 5',
    description: 'After inserting key 5 into this tree, node 50 became unbalanced with balance factor +2. Pick the rotation that restores balance.',
    unbalancedNodeValue: 50,
    correctRotation: 'LL',
    explanation: 'Key 5 was inserted in the Left child\u2019s Left subtree, so a Single Right Rotation on Node 50 restores the AVL property.',
    hint: 'New key 5 (GREEN) landed under 30, which is the LEFT child of RED node 50. The chain 50 -> 30 -> 5 is all on the LEFT side: pure LL case.',
    initialTreeNodes: [
      { id: 50, value: 50, x: 220, y: 50, balanceFactor: 2, state: 'error' },
      { id: 30, value: 30, x: 140, y: 120, balanceFactor: 1, state: 'warning' },
      { id: 5, value: 5, x: 70, y: 190, balanceFactor: 0, state: 'success' }
    ],
    initialEdges: [{ from: 50, to: 30 }, { from: 30, to: 5 }],
    rotatedTreeNodes: [
      { id: 30, value: 30, x: 220, y: 50, balanceFactor: 0, state: 'success' },
      { id: 5, value: 5, x: 140, y: 120, balanceFactor: 0, state: 'success' },
      { id: 50, value: 50, x: 300, y: 120, balanceFactor: 0, state: 'success' }
    ],
    rotatedEdges: [{ from: 30, to: 5 }, { from: 30, to: 50 }]
  },
  {
    id: 'puzzle-6',
    levelId: 'level-2-avl',
    title: 'RR Imbalance after Inserting 70',
    description: 'After inserting key 70, node 40 became unbalanced with balance factor -2. Pick the rotation that restores balance.',
    unbalancedNodeValue: 40,
    correctRotation: 'RR',
    explanation: 'Key 70 was inserted in the Right child\u2019s Right subtree, so a Single Left Rotation on Node 40 restores the AVL property.',
    hint: 'New key 70 (GREEN) landed under 60, which is the RIGHT child of RED node 40. The chain 40 -> 60 -> 70 is all on the RIGHT side: pure RR case.',
    initialTreeNodes: [
      { id: 40, value: 40, x: 220, y: 50, balanceFactor: -2, state: 'error' },
      { id: 60, value: 60, x: 300, y: 120, balanceFactor: -1, state: 'warning' },
      { id: 70, value: 70, x: 370, y: 190, balanceFactor: 0, state: 'success' }
    ],
    initialEdges: [{ from: 40, to: 60 }, { from: 60, to: 70 }],
    rotatedTreeNodes: [
      { id: 60, value: 60, x: 220, y: 50, balanceFactor: 0, state: 'success' },
      { id: 40, value: 40, x: 140, y: 120, balanceFactor: 0, state: 'success' },
      { id: 70, value: 70, x: 300, y: 120, balanceFactor: 0, state: 'success' }
    ],
    rotatedEdges: [{ from: 60, to: 40 }, { from: 60, to: 70 }]
  },
  {
    id: 'puzzle-7',
    levelId: 'level-2-avl',
    title: 'LL Imbalance on a 4-Node Chain',
    description: 'Inserting 40, 30, 20, 10 created a deep left chain. Node 40 has balance factor +2. Which single rotation restores balance?',
    unbalancedNodeValue: 40,
    correctRotation: 'LL',
    explanation: 'All four nodes sit on the left-left path, so a Single Right Rotation on Node 40 lifts 30 to the root and reattaches 40 as its right child — one rotation balances the whole chain.',
    hint: 'Follow the heavy path: 40 (RED) -> 30 -> 20 -> 10. Everything is on the LEFT side, so the left child of 40 becomes the new root in ONE rotation.',
    initialTreeNodes: [
      { id: 40, value: 40, x: 300, y: 45, balanceFactor: 2, state: 'error' },
      { id: 30, value: 30, x: 220, y: 115, balanceFactor: 1, state: 'warning' },
      { id: 20, value: 20, x: 150, y: 185, balanceFactor: 1, state: 'default' },
      { id: 10, value: 10, x: 90, y: 255, balanceFactor: 0, state: 'default' }
    ],
    initialEdges: [{ from: 40, to: 30 }, { from: 30, to: 20 }, { from: 20, to: 10 }],
    rotatedTreeNodes: [
      { id: 30, value: 30, x: 300, y: 45, balanceFactor: 0, state: 'success' },
      { id: 20, value: 20, x: 220, y: 115, balanceFactor: 1, state: 'success' },
      { id: 40, value: 40, x: 380, y: 115, balanceFactor: 0, state: 'success' },
      { id: 10, value: 10, x: 150, y: 185, balanceFactor: 0, state: 'success' }
    ],
    rotatedEdges: [{ from: 30, to: 20 }, { from: 30, to: 40 }, { from: 20, to: 10 }]
  },
  {
    id: 'puzzle-8',
    levelId: 'level-2-avl',
    title: 'RR Imbalance on a 4-Node Chain',
    description: 'Inserting 10, 20, 30, 40 created a deep right chain. Node 10 has balance factor -2. Which rotation fixes it?',
    unbalancedNodeValue: 10,
    correctRotation: 'RR',
    explanation: 'Everything sits on the right-right path, so a Single Left Rotation on Node 10 lifts 20 to the root and reattaches 10 as its left child — one rotation balances the chain.',
    hint: 'Follow the heavy path: 10 (RED) -> 20 -> 30 -> 40. All RIGHT side — rotate left on the root.',
    initialTreeNodes: [
      { id: 10, value: 10, x: 300, y: 45, balanceFactor: -2, state: 'error' },
      { id: 20, value: 20, x: 380, y: 115, balanceFactor: -1, state: 'warning' },
      { id: 30, value: 30, x: 450, y: 185, balanceFactor: -1, state: 'default' },
      { id: 40, value: 40, x: 520, y: 255, balanceFactor: 0, state: 'default' }
    ],
    initialEdges: [{ from: 10, to: 20 }, { from: 20, to: 30 }, { from: 30, to: 40 }],
    rotatedTreeNodes: [
      { id: 20, value: 20, x: 300, y: 45, balanceFactor: 0, state: 'success' },
      { id: 10, value: 10, x: 220, y: 115, balanceFactor: 0, state: 'success' },
      { id: 30, value: 30, x: 380, y: 115, balanceFactor: -1, state: 'success' },
      { id: 40, value: 40, x: 450, y: 185, balanceFactor: 0, state: 'success' }
    ],
    rotatedEdges: [{ from: 20, to: 10 }, { from: 20, to: 30 }, { from: 30, to: 40 }]
  },
  {
    id: 'puzzle-9',
    levelId: 'level-2-avl',
    title: 'LR Imbalance with 4 Nodes',
    description: 'Node 40 is left-heavy (+2) but its left child 10 is right-heavy (-1). Which sequence of rotations rebalances the tree?',
    unbalancedNodeValue: 40,
    correctRotation: 'LR',
    explanation: 'Left-Right case: first rotate left on the left child (10), bringing 20 up, then rotate right on the parent (40). Node 20 becomes the new root.',
    hint: 'The RED node 40 is left-heavy, but the weight is on the child 10\u2019s RIGHT side (20 -> 30). You must rotate the child first, THEN the parent.',
    initialTreeNodes: [
      { id: 40, value: 40, x: 300, y: 45, balanceFactor: 2, state: 'error' },
      { id: 10, value: 10, x: 210, y: 115, balanceFactor: -1, state: 'warning' },
      { id: 20, value: 20, x: 270, y: 185, balanceFactor: 0, state: 'default' },
      { id: 30, value: 30, x: 330, y: 255, balanceFactor: 0, state: 'default' }
    ],
    initialEdges: [{ from: 40, to: 10 }, { from: 10, to: 20 }, { from: 20, to: 30 }],
    rotatedTreeNodes: [
      { id: 20, value: 20, x: 300, y: 45, balanceFactor: 0, state: 'success' },
      { id: 10, value: 10, x: 210, y: 115, balanceFactor: 0, state: 'success' },
      { id: 40, value: 40, x: 390, y: 115, balanceFactor: 1, state: 'success' },
      { id: 30, value: 30, x: 320, y: 185, balanceFactor: 0, state: 'success' }
    ],
    rotatedEdges: [{ from: 20, to: 10 }, { from: 20, to: 40 }, { from: 40, to: 30 }]
  },
  {
    id: 'puzzle-10',
    levelId: 'level-2-avl',
    title: 'RL Imbalance with 4 Nodes',
    description: 'Node 10 is right-heavy (-2) but its right child 40 is left-heavy (+1). Which rotations restore balance?',
    unbalancedNodeValue: 10,
    correctRotation: 'RL',
    explanation: 'Right-Left case: first rotate right on the right child (40), bringing 30 up, then rotate left on the parent (10). Node 30 becomes the new root.',
    hint: 'The RED node 10 is right-heavy, but the weight is on the child 40\u2019s LEFT side (30 -> 20). Rotate the child first, then the parent.',
    initialTreeNodes: [
      { id: 10, value: 10, x: 300, y: 45, balanceFactor: -2, state: 'error' },
      { id: 40, value: 40, x: 390, y: 115, balanceFactor: 1, state: 'warning' },
      { id: 30, value: 30, x: 330, y: 185, balanceFactor: 0, state: 'default' },
      { id: 20, value: 20, x: 270, y: 255, balanceFactor: 0, state: 'default' }
    ],
    initialEdges: [{ from: 10, to: 40 }, { from: 40, to: 30 }, { from: 30, to: 20 }],
    rotatedTreeNodes: [
      { id: 30, value: 30, x: 300, y: 45, balanceFactor: 0, state: 'success' },
      { id: 10, value: 10, x: 210, y: 115, balanceFactor: 0, state: 'success' },
      { id: 40, value: 40, x: 390, y: 115, balanceFactor: 0, state: 'success' },
      { id: 20, value: 20, x: 250, y: 185, balanceFactor: 0, state: 'success' }
    ],
    rotatedEdges: [{ from: 30, to: 10 }, { from: 30, to: 40 }, { from: 10, to: 20 }]
  },
  {
    id: 'puzzle-11',
    levelId: 'level-2-avl',
    title: 'LL with Subtree Reattachment',
    description: 'Node 50 has balance factor +2 and its left child 30 is also left-heavy. The tricky part: 30\u2019s right subtree (40) must be reattached. Pick the correct rotation.',
    unbalancedNodeValue: 50,
    correctRotation: 'LL',
    explanation: 'Single Right Rotation on 50: 30 becomes root, its right child 40 becomes 50\u2019s new left child. One rotation rebalances everything.',
    hint: 'RED node 50 is left-heavy, child 30 is ALSO left-heavy: pure LL. When 30 rotates up, its right child 40 gets reattached to 50\u2019s left.',
    initialTreeNodes: [
      { id: 50, value: 50, x: 300, y: 45, balanceFactor: 2, state: 'error' },
      { id: 30, value: 30, x: 210, y: 115, balanceFactor: 1, state: 'warning' },
      { id: 20, value: 20, x: 140, y: 185, balanceFactor: 1, state: 'default' },
      { id: 40, value: 40, x: 290, y: 185, balanceFactor: 0, state: 'default' },
      { id: 10, value: 10, x: 80, y: 255, balanceFactor: 0, state: 'default' }
    ],
    initialEdges: [{ from: 50, to: 30 }, { from: 30, to: 20 }, { from: 20, to: 10 }, { from: 30, to: 40 }],
    rotatedTreeNodes: [
      { id: 30, value: 30, x: 300, y: 45, balanceFactor: 0, state: 'success' },
      { id: 20, value: 20, x: 210, y: 115, balanceFactor: 1, state: 'success' },
      { id: 50, value: 50, x: 390, y: 115, balanceFactor: 1, state: 'success' },
      { id: 10, value: 10, x: 140, y: 185, balanceFactor: 0, state: 'success' },
      { id: 40, value: 40, x: 330, y: 185, balanceFactor: 0, state: 'success' }
    ],
    rotatedEdges: [{ from: 30, to: 20 }, { from: 30, to: 50 }, { from: 20, to: 10 }, { from: 50, to: 40 }]
  },
  {
    id: 'puzzle-12',
    levelId: 'level-2-avl',
    title: 'RL Imbalance with 5 Nodes',
    description: 'Node 20 is right-heavy (-2) and its right child 60 is left-heavy (+1) with a 2-node subtree. Find the rotation sequence that balances this 5-node tree.',
    unbalancedNodeValue: 20,
    correctRotation: 'RL',
    explanation: 'Right-Left case: rotate right on 60 (lifting 40 up), then rotate left on 20. Node 40 becomes the new root with both sides perfectly balanced.',
    hint: 'RED node 20 is right-heavy, child 60 is left-heavy: RL. Rotate 60 right first (40 comes up), then rotate 20 left.',
    initialTreeNodes: [
      { id: 20, value: 20, x: 300, y: 45, balanceFactor: -2, state: 'error' },
      { id: 60, value: 60, x: 390, y: 115, balanceFactor: 1, state: 'warning' },
      { id: 40, value: 40, x: 330, y: 185, balanceFactor: 0, state: 'default' },
      { id: 30, value: 30, x: 270, y: 255, balanceFactor: 0, state: 'default' },
      { id: 50, value: 50, x: 390, y: 255, balanceFactor: 0, state: 'default' }
    ],
    initialEdges: [{ from: 20, to: 60 }, { from: 60, to: 40 }, { from: 40, to: 30 }, { from: 40, to: 50 }],
    rotatedTreeNodes: [
      { id: 40, value: 40, x: 300, y: 45, balanceFactor: 0, state: 'success' },
      { id: 20, value: 20, x: 210, y: 115, balanceFactor: -1, state: 'success' },
      { id: 60, value: 60, x: 390, y: 115, balanceFactor: 1, state: 'success' },
      { id: 30, value: 30, x: 260, y: 185, balanceFactor: 0, state: 'success' },
      { id: 50, value: 50, x: 340, y: 185, balanceFactor: 0, state: 'success' }
    ],
    rotatedEdges: [{ from: 40, to: 20 }, { from: 40, to: 60 }, { from: 20, to: 30 }, { from: 60, to: 50 }]
  }
];
