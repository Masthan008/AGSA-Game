import { QuizQuestion, TreeBalancePuzzle } from '../types';

// Every level in LEVEL_TOPICS has dedicated questions keyed by its level id.
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1-avl-1',
    levelId: 'level-1-avl',
    difficulty: 'beginner',
    xpReward: 20,
    question: 'Keys 10 and 20 were inserted into an empty AVL tree (tree below). You now insert 30 — it lands as the right child of 20 and the root becomes imbalanced. Which single rotation restores balance?',
    options: [
      'Left Rotation (RR case)',
      'Right Rotation (LL case)',
      'Left-Right Double Rotation (LR case)',
      'Right-Left Double Rotation (RL case)',
    ],
    correctAnswerIndex: 0,
    explanation: 'Root 10 now has balance factor −2 (right-heavy) and 30 sits in the right-right chain 10 → 20 → 30. The RR case needs exactly ONE left rotation: 20 rises to the root, 10 drops to its left child and 30 becomes its right child. The tree stays perfectly balanced at height 2.',
    hint: 'Check the balance factor of the root after 30 is inserted: BF = −2 means right-heavy. Which subtree did 30 enter?',
    treeData: {
      nodes: [
        { id: 'q1-node-10', value: 10, x: 300, y: 50, balanceFactor: -1 },
        { id: 'q1-node-20', value: 20, x: 420, y: 120, balanceFactor: 0 },
      ],
      edges: [{ from: 'q1-node-10', to: 'q1-node-20' }],
    },
    resultTree: {
      nodes: [
        { id: 'q1-r-node-20', value: 20, x: 300, y: 50, balanceFactor: 0 },
        { id: 'q1-r-node-10', value: 10, x: 180, y: 120, balanceFactor: 0 },
        { id: 'q1-r-node-30', value: 30, x: 420, y: 120, balanceFactor: 0 },
      ],
      edges: [
        { from: 'q1-r-node-20', to: 'q1-r-node-10' },
        { from: 'q1-r-node-20', to: 'q1-r-node-30' },
      ],
    },
  },
  {
    id: 'q1-avl-2',
    levelId: 'level-1-avl',
    difficulty: 'medium',
    xpReward: 30,
    question: 'Keys 30, 10, 20 were inserted in that order. After 20 lands, the tree below became unbalanced: node 30 has balance factor +2 but its left child 10 is right-heavy (BF = −1). Which rotation sequence rebalances the tree?',
    options: [
      'Single Right Rotation',
      'Single Left Rotation',
      'Left-Right (LR) Double Rotation',
      'Right-Left (RL) Double Rotation',
    ],
    correctAnswerIndex: 2,
    explanation: 'BF = +2 at 30 means the imbalance is on the left side, but the heavy child 10 leans the OPPOSITE way (BF = −1). A single right rotation cannot fix this — rotate the child LEFT first (10 → 20), then rotate the parent RIGHT (30 → 20). This LR double rotation brings 20 to the root with 10 on the left and 30 on the right.',
    hint: 'The parent is left-heavy (+2) but its left child is right-heavy (−1) — opposite directions always mean a double rotation.',
    treeData: {
      nodes: [
        { id: 'q2-node-30', value: 30, x: 300, y: 50, balanceFactor: 2 },
        { id: 'q2-node-10', value: 10, x: 180, y: 120, balanceFactor: -1 },
        { id: 'q2-node-20', value: 20, x: 246, y: 190, balanceFactor: 0 },
      ],
      edges: [
        { from: 'q2-node-30', to: 'q2-node-10' },
        { from: 'q2-node-10', to: 'q2-node-20' },
      ],
    },
    resultTree: {
      nodes: [
        { id: 'q2-r-node-20', value: 20, x: 300, y: 50, balanceFactor: 0 },
        { id: 'q2-r-node-10', value: 10, x: 180, y: 120, balanceFactor: 0 },
        { id: 'q2-r-node-30', value: 30, x: 420, y: 120, balanceFactor: 0 },
      ],
      edges: [
        { from: 'q2-r-node-20', to: 'q2-r-node-10' },
        { from: 'q2-r-node-20', to: 'q2-r-node-30' },
      ],
    },
  },
  {
    id: 'q1-avl-3',
    levelId: 'level-1-avl',
    difficulty: 'mastery',
    xpReward: 50,
    question: 'Keys 10, 20, 30, 40, 50 are inserted in order. After the final insert, node 30 becomes imbalanced (BF = −2) and its right child 40 also leans right (BF = −1). Which rotation fixes node 30, and what is the resulting tree?',
    options: [
      'Left Rotation at 30 — 40 rises; the root stays 20 with right subtree 40 → (30, 50)',
      'Right Rotation at 30 — the new root becomes 40',
      'Left-Right Double Rotation at 30',
      'Right-Left Double Rotation at 30',
    ],
    correctAnswerIndex: 0,
    explanation: 'Node 30\u2019s heavy chain is right-right (30 → 40 → 50) and its child 40 leans the SAME direction (right), so a single LEFT rotation at 30 fixes it: 40 rises to 20\u2019s right child, 30 drops to 40\u2019s left child, and 50 stays on 40\u2019s right. Height stays 3 for 5 keys — O(log N) guarantees for any insert sequence.',
    hint: 'Both node 30 and its right child lean right — a same-direction chain means a single rotation. Which direction?',
    treeData: {
      nodes: [
        { id: 'q3-node-20', value: 20, x: 300, y: 50, balanceFactor: -2 },
        { id: 'q3-node-10', value: 10, x: 180, y: 120, balanceFactor: 0 },
        { id: 'q3-node-30', value: 30, x: 420, y: 120, balanceFactor: -2 },
        { id: 'q3-node-40', value: 40, x: 486, y: 190, balanceFactor: -1 },
        { id: 'q3-node-50', value: 50, x: 522.3, y: 260, balanceFactor: 0 },
      ],
      edges: [
        { from: 'q3-node-20', to: 'q3-node-10' },
        { from: 'q3-node-20', to: 'q3-node-30' },
        { from: 'q3-node-30', to: 'q3-node-40' },
        { from: 'q3-node-40', to: 'q3-node-50' },
      ],
    },
    resultTree: {
      nodes: [
        { id: 'q3-r-node-20', value: 20, x: 300, y: 50, balanceFactor: -1 },
        { id: 'q3-r-node-10', value: 10, x: 180, y: 120, balanceFactor: 0 },
        { id: 'q3-r-node-40', value: 40, x: 420, y: 120, balanceFactor: 0 },
        { id: 'q3-r-node-30', value: 30, x: 354, y: 190, balanceFactor: 0 },
        { id: 'q3-r-node-50', value: 50, x: 486, y: 190, balanceFactor: 0 },
      ],
      edges: [
        { from: 'q3-r-node-20', to: 'q3-r-node-10' },
        { from: 'q3-r-node-20', to: 'q3-r-node-40' },
        { from: 'q3-r-node-40', to: 'q3-r-node-30' },
        { from: 'q3-r-node-40', to: 'q3-r-node-50' },
      ],
    },
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
    id: 'q2-avl-3',
    levelId: 'level-2-avl',
    question: 'What is the balance factor of a node whose left subtree has height 3 and right subtree has height 1?',
    options: ['+2', '-2', '0', '+1'],
    correctAnswerIndex: 0,
    explanation: 'Balance Factor = Height(Left) - Height(Right) = 3 - 1 = +2, which violates the AVL constraint.',
    hint: 'BF = height(left) - height(right).'
  },
  {
    id: 'q2-avl-4',
    levelId: 'level-2-avl',
    question: 'After inserting 30, 20, 10 into an empty AVL tree, which rotation rebalances the root?',
    options: ['Right rotation (LL case)', 'Left rotation (RR case)', 'LR double rotation', 'RL double rotation'],
    correctAnswerIndex: 0,
    explanation: 'The left-left chain 30→20→10 has BF +2 with left child BF +1 — a single right rotation makes 20 the root.',
    hint: 'Both the root and its left child lean left.'
  },
  {
    id: 'q2-avl-5',
    levelId: 'level-2-avl',
    question: 'An AVL tree with N nodes guarantees a height of at most:',
    options: ['1.44 log₂(N+1)', 'log₂(N)', '2N', 'N/2'],
    correctAnswerIndex: 0,
    explanation: 'The AVL balance constraint bounds height to about 1.44 log₂(N+1), keeping search O(log N).',
    hint: 'Compare with the worst-case skew of a plain BST.'
  },
  {
    id: 'q2-avl-6',
    levelId: 'level-2-avl',
    question: 'In a double rotation (LR case), which node ends up as the new subtree root?',
    options: ['The child of the pivot\u2019s left child (the "grandchild")', 'The original pivot', 'The leftmost leaf', 'The right child of the pivot'],
    correctAnswerIndex: 0,
    explanation: 'The middle value (grandchild) rises: rotate left on the child, then right on the pivot.',
    hint: 'The middle key becomes the root of the rotated subtree.'
  },
  {
    id: 'q2-avl-7',
    levelId: 'level-2-avl',
    question: 'What is the worst-case time complexity of search, insert, and delete in an AVL tree?',
    options: ['O(log N) each', 'O(N) each', 'O(1) each', 'O(N log N) each'],
    correctAnswerIndex: 0,
    explanation: 'Height is O(log N) and rotations are constant-time, so all three operations are O(log N).',
    hint: 'Bounded height.'
  },
  {
    id: 'q2-avl-8',
    levelId: 'level-2-avl',
    question: 'Deleting a node in an AVL tree may require how many rotations to fix?',
    options: ['Up to O(log N) rotations up the path', 'At most one', 'Exactly two', 'Zero always'],
    correctAnswerIndex: 0,
    explanation: 'Deletion can rebalance one level then cascade upward, potentially O(log N) rotations.',
    hint: 'Unlike insertion, the imbalance can propagate.'
  },
  {
    id: 'q2-avl-9',
    levelId: 'level-2-avl',
    question: 'Which traversal of an AVL tree always yields sorted order?',
    options: ['In-order', 'Pre-order', 'Post-order', 'Level-order'],
    correctAnswerIndex: 0,
    explanation: 'AVL is a BST, so in-order (Left, Root, Right) outputs keys in sorted order.',
    hint: 'The same property as any BST.'
  },
  {
    id: 'q2-avl-10',
    levelId: 'level-2-avl',
    question: 'After a left rotation at node X, which statement is true?',
    options: ['X becomes the left child of its former right child', 'X stays the root', 'The subtree height always decreases by 2', 'The right child is deleted'],
    correctAnswerIndex: 0,
    explanation: 'In a left rotation, X\u2019s right child rises and X attaches as its left child (the right child\u2019s left subtree reattaches to X\u2019s right).',
    hint: 'The rising node takes the old pivot as its left child.'
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
  },
  {
    id: 'q25-toposort-1',
    levelId: 'level-25-toposort',
    question: 'On which graph does Topological Sort apply?',
    options: ['Directed Acyclic Graphs (DAG)', 'Undirected graphs', 'Cyclic directed graphs', 'Any weighted graph'],
    correctAnswerIndex: 0,
    explanation: 'A cycle means no valid linear ordering exists, so Topological Sort requires a DAG.',
    hint: 'Think about the "DAG" acronym.'
  },
  {
    id: 'q25-toposort-2',
    levelId: 'level-25-toposort',
    question: 'Kahn\u2019s algorithm processes vertices in which order?',
    options: ['In-degree 0 first', 'Out-degree 0 first', 'Random order', 'Reverse of insertion'],
    correctAnswerIndex: 0,
    explanation: 'Kahn\u2019s algorithm repeatedly extracts vertices with no incoming edges (in-degree 0).',
    hint: 'A vertex with no prerequisites can be placed immediately.'
  },
  {
    id: 'q25-toposort-3',
    levelId: 'level-25-toposort',
    question: 'If Kahn\u2019s algorithm finishes without visiting all vertices, what does that prove?',
    options: ['The graph contains a cycle', 'The graph is a tree', 'The graph is disconnected only', 'The graph is complete'],
    correctAnswerIndex: 0,
    explanation: 'Unvisited vertices have unresolved in-degrees, meaning a cycle traps them.',
    hint: 'Only a cycle can keep in-degrees permanently above zero.'
  },
  {
    id: 'q25-toposort-4',
    levelId: 'level-25-toposort',
    question: 'How many valid topological orderings can a DAG have?',
    options: ['Possibly more than one', 'Exactly one', 'Exactly zero', 'Always two'],
    correctAnswerIndex: 0,
    explanation: 'Any DAG has at least one ordering; many have several (e.g., independent branches).',
    hint: 'Swap two unrelated vertices to get another valid order.'
  },
  {
    id: 'q25-toposort-5',
    levelId: 'level-25-toposort',
    question: 'What is the time complexity of Kahn\u2019s algorithm with adjacency lists?',
    options: ['O(V + E)', 'O(V²)', 'O(E log V)', 'O(V log V)'],
    correctAnswerIndex: 0,
    explanation: 'Each vertex is dequeued once and each edge relaxes an in-degree once: O(V + E).',
    hint: 'Count how many times each edge is touched.'
  },
  {
    id: 'q25-toposort-6',
    levelId: 'level-25-toposort',
    question: 'Which classic application uses Topological Sort?',
    options: ['Task scheduling / course prerequisites', 'Finding shortest path in trees only', 'Sorting integers', 'Matrix multiplication'],
    correctAnswerIndex: 0,
    explanation: 'Build systems and course planners order tasks so every prerequisite precedes its dependents.',
    hint: 'Think "make" or "build order".'
  },
  {
    id: 'q25-toposort-7',
    levelId: 'level-25-toposort',
    question: 'In the DFS-based topological sort, vertices are output in which order?',
    options: ['Reverse of DFS finishing times', 'Order of first discovery', 'Sorted by value', 'Level order'],
    correctAnswerIndex: 0,
    explanation: 'A vertex finishes only after all descendants, so the reverse finishing order is topological.',
    hint: 'Stack the finished vertices and pop.'
  },
  {
    id: 'q25-toposort-8',
    levelId: 'level-25-toposort',
    question: 'What data structure does Kahn\u2019s algorithm primarily use?',
    options: ['Queue (or set) of in-degree 0 vertices', 'Priority queue of weights', 'Stack of cycles', 'Linked list of values'],
    correctAnswerIndex: 0,
    explanation: 'A queue seeds with in-degree 0 vertices; processing one can unlock new ones.',
    hint: 'FIFO fits "process in the order they become free".'
  },
  {
    id: 'q25-toposort-9',
    levelId: 'level-25-toposort',
    question: 'Does Topological Sort on a DAG with 5 vertices always produce 5 vertices in the output?',
    options: ['Yes, if no cycle exists', 'No, only 4 max', 'Only for complete graphs', 'Only if weights are zero'],
    correctAnswerIndex: 0,
    explanation: 'A DAG of N vertices always admits a full topological order of length N.',
    hint: 'Every vertex eventually reaches in-degree 0.'
  },
  {
    id: 'q25-toposort-10',
    levelId: 'level-25-toposort',
    question: 'A "prerequisite" relation defines which graph property?',
    options: ['DAG (no cyclic dependencies)', 'Undirected tree', 'Bipartite graph', 'Complete graph'],
    correctAnswerIndex: 0,
    explanation: 'A valid prerequisite system cannot contain circular dependencies, hence a DAG.',
    hint: 'Circular prerequisites are impossible in practice.'
  },
  {
    id: 'q26-hashing-1',
    levelId: 'level-26-hashing',
    question: 'What is the expected time complexity of search in a hash table with good hashing and low load factor?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correctAnswerIndex: 0,
    explanation: 'With uniform hashing, expected probe/collision counts are constant, giving O(1) average search.',
    hint: 'The hash directly locates the bucket.'
  },
  {
    id: 'q26-hashing-2',
    levelId: 'level-26-hashing',
    question: 'Separate chaining resolves collisions by:',
    options: ['Storing colliding keys in a linked list per bucket', 'Moving to the next empty slot', 'Rehashing the whole table', 'Ignoring the collision'],
    correctAnswerIndex: 0,
    explanation: 'Each bucket holds a chain (list/tree) of all keys that hash to it.',
    hint: 'The chain hangs off the bucket.'
  },
  {
    id: 'q26-hashing-3',
    levelId: 'level-26-hashing',
    question: 'In linear probing, when a slot is occupied we:',
    options: ['Try the next consecutive slot', 'Try slots at squared offsets', 'Rehash the key', 'Abort insertion'],
    correctAnswerIndex: 0,
    explanation: 'Linear probing scans (h(k) + i) mod m for i = 0, 1, 2, …',
    hint: 'Move one step at a time.'
  },
  {
    id: 'q26-hashing-4',
    levelId: 'level-26-hashing',
    question: 'What does load factor α = n/m measure?',
    options: ['Average number of keys per slot', 'Hash function speed', 'Table size in bytes', 'Number of hash functions'],
    correctAnswerIndex: 0,
    explanation: 'α = keys/slots; high α raises collision probability, so tables resize near α = 0.75.',
    hint: 'n keys into m slots.'
  },
  {
    id: 'q26-hashing-5',
    levelId: 'level-26-hashing',
    question: 'Which property makes a hash function good?',
    options: ['Keys spread uniformly across slots', 'It always returns 0', 'It sorts the keys', 'It compresses data'],
    correctAnswerIndex: 0,
    explanation: 'Uniform distribution minimizes collisions regardless of input patterns.',
    hint: 'Avoid clustering.'
  },
  {
    id: 'q26-hashing-6',
    levelId: 'level-26-hashing',
    question: 'Primary clustering is a problem of which technique?',
    options: ['Linear probing', 'Separate chaining', 'Double hashing only', 'Universal hashing'],
    correctAnswerIndex: 0,
    explanation: 'Linear probing builds long contiguous occupied runs, degrading search time.',
    hint: 'Consecutive slots fill together.'
  },
  {
    id: 'q26-hashing-7',
    levelId: 'level-26-hashing',
    question: 'Double hashing avoids clustering by using:',
    options: ['A second hash function for the probe step', 'Two linked lists per bucket', 'Sorting before probing', 'Bigger slots'],
    correctAnswerIndex: 0,
    explanation: 'Probe sequence is (h1(k) + i·h2(k)) mod m, varying the step per key.',
    hint: 'A second hash decides the step size.'
  },
  {
    id: 'q26-hashing-8',
    levelId: 'level-26-hashing',
    question: 'When α of a hash table reaches the threshold, the standard fix is:',
    options: ['Rehash into a larger table', 'Disallow new inserts', 'Switch to linear search', 'Delete all colliding keys'],
    correctAnswerIndex: 0,
    explanation: 'Resizing (typically doubling) and rehashing restores a low load factor.',
    hint: 'Grow and redistribute.'
  },
  {
    id: 'q26-hashing-9',
    levelId: 'level-26-hashing',
    question: 'A cryptographic hash differs from a table hash because it must:',
    options: ['Be one-way and collision resistant', 'Be faster than O(1)', 'Sort its input', 'Always return even numbers'],
    correctAnswerIndex: 0,
    explanation: 'Table hashes optimize distribution; cryptographic hashes add security properties.',
    hint: 'Think of password storage.'
  },
  {
    id: 'q26-hashing-10',
    levelId: 'level-26-hashing',
    question: 'In open addressing, deleted slots are marked "tombstone" because:',
    options: ['Probe chains must not be broken', 'They are faster', 'Memory is freed', 'The hash changes'],
    correctAnswerIndex: 0,
    explanation: 'Removing an entry naively would stop later probes from finding keys past the gap.',
    hint: 'The probe sequence continues through the gap.'
  },
  {
    id: 'q27-fenwick-1',
    levelId: 'level-27-fenwick',
    question: 'Which operation on a Fenwick tree costs O(log N) and tracks prefix sums?',
    options: ['Update a single index and query prefix sums', 'Range updates in O(1)', 'Find the median in O(1)', 'Delete arbitrary elements'],
    correctAnswerIndex: 0,
    explanation: 'Point update + prefix query both walk O(log N) lowbit jumps in the BIT array.',
    hint: 'lowbit(i) = i & -i.'
  },
  {
    id: 'q27-fenwick-2',
    levelId: 'level-27-fenwick',
    question: 'What is lowbit(i)?',
    options: ['The lowest set bit of i, i & -i', 'The highest bit of i', 'i mod 2', 'i / 2'],
    correctAnswerIndex: 0,
    explanation: 'lowbit extracts the least significant 1-bit, the core of BIT index arithmetic.',
    hint: 'i & -i isolates the rightmost 1.'
  },
  {
    id: 'q27-fenwick-3',
    levelId: 'level-27-fenwick',
    question: 'A Fenwick tree is stored as:',
    options: ['A 1-indexed array where tree[i] covers a range ending at i', 'A 2D matrix', 'A linked list', 'A sorted array'],
    correctAnswerIndex: 0,
    explanation: 'tree[i] aggregates the range (i - lowbit(i) + 1) ... i.',
    hint: 'Index i stores a local summary.'
  },
  {
    id: 'q27-fenwick-4',
    levelId: 'level-27-fenwick',
    question: 'A Fenwick tree can answer which query in O(log N)?',
    options: ['Prefix sum up to index i', 'Minimum in a range only', 'The K-th largest with updates in O(1)', 'Only full array sum'],
    correctAnswerIndex: 0,
    explanation: 'Prefix(i) is the fundamental query; range sums follow by difference.',
    hint: 'prefix(r) - prefix(l-1).'
  },
  {
    id: 'q27-fenwick-5',
    levelId: 'level-27-fenwick',
    question: 'Compared to a Segment Tree for prefix sums with point updates, a Fenwick tree:',
    options: ['Uses less memory and is simpler', 'Supports lazy range updates natively', 'Is always faster asymptotically', 'Handles non-invertible ops'],
    correctAnswerIndex: 0,
    explanation: 'BIT needs only an N+1 array and trivial code, at the cost of some generality.',
    hint: 'Size and simplicity.'
  },
  {
    id: 'q27-fenwick-6',
    levelId: 'level-27-fenwick',
    question: 'For a range-sum query [l, r], the correct computation is:',
    options: ['prefix(r) - prefix(l-1)', 'prefix(r) + prefix(l)', 'prefix(r) - prefix(l)', 'prefix(l) - prefix(r)'],
    correctAnswerIndex: 0,
    explanation: 'Subtract the prefix before l from the prefix at r.',
    hint: 'Inclusion-exclusion over prefixes.'
  },
  {
    id: 'q27-fenwick-7',
    levelId: 'level-27-fenwick',
    question: 'Building a BIT from an array of size N costs:',
    options: ['O(N) with a linear build trick', 'O(N log N) always', 'O(N²)', 'O(log N)'],
    correctAnswerIndex: 0,
    explanation: 'Adding arr[i] into tree[i] and its ancestors once each totals O(N).',
    hint: 'Each index propagates once per level.'
  },
  {
    id: 'q27-fenwick-8',
    levelId: 'level-27-fenwick',
    question: 'The index you add to when updating position i is:',
    options: ['i += lowbit(i)', 'i *= 2', 'i -= lowbit(i)', 'i = i + 1 only'],
    correctAnswerIndex: 0,
    explanation: 'Updates climb: i → i + lowbit(i) until past N.',
    hint: 'Opposite direction of the query walk.'
  },
  {
    id: 'q27-fenwick-9',
    levelId: 'level-27-fenwick',
    question: 'Can a Fenwick tree be extended to answer range minimum queries?',
    options: ['Only with restrictions (no overlap-safe), unlike segment trees', 'Yes, exactly like sums', 'No, impossible ever', 'Only for sorted arrays'],
    correctAnswerIndex: 0,
    explanation: 'Min is not invertible, so BIT min-queries need careful overlap handling; segment trees are preferred.',
    hint: 'Subtraction works for sums, not min.'
  },
  {
    id: 'q27-fenwick-10',
    levelId: 'level-27-fenwick',
    question: 'An application of Fenwick trees is:',
    options: ['Counting inversions in O(N log N)', 'Pattern matching in O(1)', 'Sorting in O(N)', 'Finding cycles'],
    correctAnswerIndex: 0,
    explanation: 'Scan left to right, using BIT prefix counts to count greater elements before each item.',
    hint: 'Inversion = greater element earlier in the array.'
  },
  {
    id: 'q28-editdistance-1',
    levelId: 'level-28-editdistance',
    question: 'What is the edit distance between "cat" and "car"?',
    options: ['1 (substitute t → r)', '2', '3', '0'],
    correctAnswerIndex: 0,
    explanation: 'Only the last character differs, so one substitution suffices.',
    hint: 'Compare the strings position by position.'
  },
  {
    id: 'q28-editdistance-2',
    levelId: 'level-28-editdistance',
    question: 'The three allowed operations in Levenshtein distance are:',
    options: ['Insert, delete, substitute', 'Swap, reverse, sort', 'Rotate, shift, merge', 'Encode, decode, compress'],
    correctAnswerIndex: 0,
    explanation: 'Insertion, deletion, and substitution (each costing 1) define Levenshtein distance.',
    hint: 'Two are length-changing, one is not.'
  },
  {
    id: 'q28-editdistance-3',
    levelId: 'level-28-editdistance',
    question: 'If S1[i] == S2[j], the DP cell is:',
    options: ['dp[i-1][j-1] (no extra cost)', '1 + dp[i-1][j-1]', 'dp[i][j-1] + 1', 'min of all plus 1'],
    correctAnswerIndex: 0,
    explanation: 'Matching characters cost nothing; the answer inherits the diagonal subproblem.',
    hint: 'Equal characters are free.'
  },
  {
    id: 'q28-editdistance-4',
    levelId: 'level-28-editdistance',
    question: 'For mismatched characters the recurrence is:',
    options: ['1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])', 'dp[i-1][j] only', 'dp[i-1][j-1] * 2', 'max(dp[i-1][j], dp[i][j-1])'],
    correctAnswerIndex: 0,
    explanation: 'Delete, insert, or substitute — the cheapest of the three plus one.',
    hint: 'Take the minimum of three neighbors.'
  },
  {
    id: 'q28-editdistance-5',
    levelId: 'level-28-editdistance',
    question: 'The time and space complexity of the classic 2D edit distance DP is:',
    options: ['O(N·M) time, O(N·M) space', 'O(N) time, O(1) space', 'O(N log M)', 'O(N²·M²)'],
    correctAnswerIndex: 0,
    explanation: 'Filling an N×M grid gives quadratic time; the full grid needs quadratic space.',
    hint: 'Two strings of lengths N and M.'
  },
  {
    id: 'q28-editdistance-6',
    levelId: 'level-28-editdistance',
    question: 'Space can be reduced to O(min(N, M)) by:',
    options: ['Keeping only the previous DP row', 'Sorting both strings', 'Hashing substrings', 'Using a trie'],
    correctAnswerIndex: 0,
    explanation: 'Each row depends only on the previous row, so rolling arrays suffice.',
    hint: 'Drop older rows.'
  },
  {
    id: 'q28-editdistance-7',
    levelId: 'level-28-editdistance',
    question: 'Edit distance between "" (empty) and "abc" is:',
    options: ['3 (three insertions)', '0', '1', '6'],
    correctAnswerIndex: 0,
    explanation: 'Every character of "abc" must be inserted, costing 3.',
    hint: 'Base case: empty prefix needs full length insertions.'
  },
  {
    id: 'q28-editdistance-8',
    levelId: 'level-28-editdistance',
    question: 'A real-world use of edit distance is:',
    options: ['Spell-check suggestions', 'Image compression', 'Database indexing', 'CPU scheduling'],
    correctAnswerIndex: 0,
    explanation: 'Spell checkers rank corrections by edit distance from the misspelled word.',
    hint: 'Which word is closest?'
  },
  {
    id: 'q28-editdistance-9',
    levelId: 'level-28-editdistance',
    question: 'If substitution costs 2 instead of 1, the variant is called:',
    options: ['OSA-style with weighted costs', 'LCS with substitution', 'Hamming distance', 'Needleman-Wunsch'],
    correctAnswerIndex: 0,
    explanation: 'Weighted edit distance generalizes Levenshtein by assigning arbitrary costs per operation.',
    hint: 'Weights per operation.'
  },
  {
    id: 'q28-editdistance-10',
    levelId: 'level-28-editdistance',
    question: 'LCS (Longest Common Subsequence) relates to edit distance by allowing:',
    options: ['Only insertions and deletions, no substitutions', 'Only substitutions', 'Reversals', 'Any combination of two ops'],
    correctAnswerIndex: 0,
    explanation: 'Without substitution, edit distance = N + M - 2·LCS length.',
    hint: 'What can you build with only insert/delete?'
  },
  {
    id: 'q29-bitmaskdp-1',
    levelId: 'level-29-bitmaskdp',
    question: 'What is the complexity of Held-Karp (bitmask TSP) for N cities?',
    options: ['O(2^N · N²)', 'O(N!)', 'O(N³)', 'O(2^N · N)'],
    correctAnswerIndex: 0,
    explanation: 'There are 2^N subsets and N endpoints, each transitioned over N predecessors: O(2^N · N²).',
    hint: 'Subsets times endpoints times predecessors.'
  },
  {
    id: 'q29-bitmaskdp-2',
    levelId: 'level-29-bitmaskdp',
    question: 'In bitmask DP, a subset of N items is represented by:',
    options: ['An N-bit integer where bit i marks inclusion', 'A string of N characters', 'A sorted array', 'A polynomial'],
    correctAnswerIndex: 0,
    explanation: 'State (mask, i) stores the optimal value of visiting exactly the set mask ending at i.',
    hint: 'Binary representation of a number.'
  },
  {
    id: 'q29-bitmaskdp-3',
    levelId: 'level-29-bitmaskdp',
    question: 'Setting bit j in mask is done by:',
    options: ['mask | (1 << j)', 'mask & (1 << j)', 'mask ^ j', 'mask + j'],
    correctAnswerIndex: 0,
    explanation: 'OR-ing with 1 << j switches bit j on without touching others.',
    hint: 'Bitwise OR.'
  },
  {
    id: 'q29-bitmaskdp-4',
    levelId: 'level-29-bitmaskdp',
    question: 'Testing whether city j is already visited in mask is:',
    options: ['(mask >> j) & 1 === 1', 'mask % j === 0', 'mask === j', 'mask * j > 0'],
    correctAnswerIndex: 0,
    explanation: 'Shift bit j to position 0 and AND with 1.',
    hint: 'Shift right then mask.'
  },
  {
    id: 'q29-bitmaskdp-5',
    levelId: 'level-29-bitmaskdp',
    question: 'Why is Held-Karp dramatically faster than brute-force TSP for N = 20?',
    options: ['2^20·20² ≈ 400M vs 20! ≈ 2.4·10^18', 'It is exponential too but smaller exponent', 'It is polynomial', 'It skips cities'],
    correctAnswerIndex: 0,
    explanation: 'Brute force explores (N-1)! permutations; Held-Karp collapses permutations into subset states.',
    hint: 'Compare orders of magnitude.'
  },
  {
    id: 'q29-bitmaskdp-6',
    levelId: 'level-29-bitmaskdp',
    question: 'Subset-sum DP with N items and target T using bitmasks needs:',
    options: ['2^N states (or O(N·T) with sums)', 'T² states', 'N! states', 'No states'],
    correctAnswerIndex: 0,
    explanation: 'Mask tracks which items are used; alternative is classic O(N·T) DP on sums.',
    hint: 'Either masks or target values.'
  },
  {
    id: 'q29-bitmaskdp-7',
    levelId: 'level-29-bitmaskdp',
    question: 'A typical bitmask DP transition adds:',
    options: ['One item per step, extending mask with the item\u2019s bit', 'Two items at once', 'No changes to mask', 'Random bits'],
    correctAnswerIndex: 0,
    explanation: 'Transitions grow the subset one element at a time: newMask = mask | (1 << next).',
    hint: 'Grow the set incrementally.'
  },
  {
    id: 'q29-bitmaskdp-8',
    levelId: 'level-29-bitmaskdp',
    question: 'N = 30 with 2^N states is usually:',
    options: ['Too large (~10^9 states) for typical time limits', 'Trivial', 'Optimal', 'Impossible to code'],
    correctAnswerIndex: 0,
    explanation: 'About a billion states is infeasible; N ≤ 20 is the practical bound for bitmask DP.',
    hint: 'Count the states.'
  },
  {
    id: 'q29-bitmaskdp-9',
    levelId: 'level-29-bitmaskdp',
    question: 'The classic NP-Hard problem solved by Held-Karp bitmask DP is:',
    options: ['Travelling Salesman Problem', 'Binary search', 'MST', 'KMP'],
    correctAnswerIndex: 0,
    explanation: 'Held-Karp gives the exact TSP in O(2^N · N²) instead of factorial time.',
    hint: 'Tour through all cities.'
  },
  {
    id: 'q29-bitmaskdp-10',
    levelId: 'level-29-bitmaskdp',
    question: 'In bitmask DP for matching problems, a full mask (1 << N) - 1 means:',
    options: ['All N items are selected', 'No items selected', 'Half selected', 'An error'],
    correctAnswerIndex: 0,
    explanation: 'N ones in binary — the complete subset used to collect the final answer.',
    hint: 'All bits set.'
  },
  {
    id: 'q30-maxflow-1',
    levelId: 'level-30-maxflow',
    question: 'What does the Max-Flow Min-Cut theorem state?',
    options: ['Max flow equals min cut capacity', 'Max flow equals graph density', 'Min cut equals number of edges', 'Flow can exceed cut capacity'],
    correctAnswerIndex: 0,
    explanation: 'The maximum amount of flow from source to sink equals the capacity of the smallest cut separating them.',
    hint: 'The bottleneck cut bounds the flow.'
  },
  {
    id: 'q30-maxflow-2',
    levelId: 'level-30-maxflow',
    question: 'An augmenting path is:',
    options: ['A path from source to sink with remaining capacity on every edge', 'The longest path in the graph', 'Any cycle', 'A cut'],
    correctAnswerIndex: 0,
    explanation: 'Augmenting paths push more flow along edges with unused capacity (in the residual graph).',
    hint: 'Unsaturated path to the sink.'
  },
  {
    id: 'q30-maxflow-3',
    levelId: 'level-30-maxflow',
    question: 'A residual edge of capacity 0 means:',
    options: ['The edge is saturated; flow may only be canceled, not added', 'The edge has infinite capacity', 'The edge is deleted', 'The edge reverses direction permanently'],
    correctAnswerIndex: 0,
    explanation: 'Zero residual capacity means no more forward flow; only backward cancellation is possible.',
    hint: 'Fully used capacity.'
  },
  {
    id: 'q30-maxflow-4',
    levelId: 'level-30-maxflow',
    question: 'Ford-Fulkerson using BFS for augmenting paths is called:',
    options: ['Edmonds-Karp', 'Kruskal', 'Bellman-Ford', 'Floyd-Warshall'],
    correctAnswerIndex: 0,
    explanation: 'BFS (shortest augmenting path) gives the Edmonds-Karp bound of O(V·E²).',
    hint: 'Name of the BFS variant.'
  },
  {
    id: 'q30-maxflow-5',
    levelId: 'level-30-maxflow',
    question: 'The flow conservation property states:',
    options: ['For every internal vertex, inflow = outflow', 'Inflow > outflow always', 'Flow must be integer', 'Each edge carries max capacity'],
    correctAnswerIndex: 0,
    explanation: 'Internal nodes neither produce nor consume flow.',
    hint: 'Mass conservation.'
  },
  {
    id: 'q30-maxflow-6',
    levelId: 'level-30-maxflow',
    question: 'A cut (S, T) is:',
    options: ['A partition of vertices with source in S and sink in T', 'A single edge', 'A cycle', 'A path'],
    correctAnswerIndex: 0,
    explanation: 'Cuts separate source and sink; cut capacity is the sum of capacities from S to T.',
    hint: 'Partition the graph in two.'
  },
  {
    id: 'q30-maxflow-7',
    levelId: 'level-30-maxflow',
    question: 'Maximum Bipartite Matching can be solved as:',
    options: ['Max flow with unit-capacity edges and a super source/sink', 'A shortest path problem', 'A sorting problem', 'An MST problem'],
    correctAnswerIndex: 0,
    explanation: 'Connect a source to left nodes, left to right, right to a sink; max flow = max matching.',
    hint: 'Unit capacities.'
  },
  {
    id: 'q30-maxflow-8',
    levelId: 'level-30-maxflow',
    question: 'The complexity of Edmonds-Karp is:',
    options: ['O(V·E²)', 'O(V²)', 'O(E log V)', 'O(V·E)'],
    correctAnswerIndex: 0,
    explanation: 'O(E) BFS per augmentation, at most O(V·E) augmentations.',
    hint: 'V times E BFS each costing E.'
  },
  {
    id: 'q30-maxflow-9',
    levelId: 'level-30-maxflow',
    question: 'If no augmenting path exists in the residual graph, then:',
    options: ['The current flow is maximal', 'Add more capacity', 'Remove edges', 'Restart the algorithm'],
    correctAnswerIndex: 0,
    explanation: 'No augmenting path implies a saturated cut — flow equals cut capacity, hence maximum.',
    hint: 'Termination condition.'
  },
  {
    id: 'q30-maxflow-10',
    levelId: 'level-30-maxflow',
    question: 'Project selection and network reliability are applications of:',
    options: ['Max flow / min cut', 'Hash tables', 'Radix sort', 'Splay trees'],
    correctAnswerIndex: 0,
    explanation: 'Both reduce to cut problems: choosing projects vs. identifying the weakest edges.',
    hint: 'Which tool handles capacities?'
  },
  {
    id: 'q31-skiplist-1',
    levelId: 'level-31-skiplist',
    question: 'What is the expected search complexity in a Skip List with p = 1/2 promotion?',
    options: ['O(log N)', 'O(N)', 'O(1)', 'O(N log N)'],
    correctAnswerIndex: 0,
    explanation: 'With roughly log N levels, each level halves the search space, giving O(log N) expected time.',
    hint: 'Level count is logarithmic.'
  },
  {
    id: 'q31-skiplist-2',
    levelId: 'level-31-skiplist',
    question: 'A skip list is built on top of:',
    options: ['Sorted linked lists with extra "express" levels', 'A binary tree', 'An unsorted array', 'A hash table'],
    correctAnswerIndex: 0,
    explanation: 'Base level holds all elements sorted; higher levels skip over subranges.',
    hint: 'Express lanes over local lanes.'
  },
  {
    id: 'q31-skiplist-3',
    levelId: 'level-31-skiplist',
    question: 'The height of a new node is decided by:',
    options: ['Flipping coins (random promotion)', 'The node value', 'Insertion order only', 'The table size'],
    correctAnswerIndex: 0,
    explanation: 'Each node is promoted to the next level with probability p, giving randomized height.',
    hint: 'Randomized algorithm.'
  },
  {
    id: 'q31-skiplist-4',
    levelId: 'level-31-skiplist',
    question: 'A skip list with p = 1/2 has approximately how many levels for N elements?',
    options: ['log₂ N', 'N', 'N²', 'sqrt(N)'],
    correctAnswerIndex: 0,
    explanation: 'Expected level count is log₁/ₚ N, i.e., log₂ N for p = 1/2.',
    hint: 'Exponential decay of node counts per level.'
  },
  {
    id: 'q31-skiplist-5',
    levelId: 'level-31-skiplist',
    question: 'The expected space usage of a skip list is:',
    options: ['O(N) (2N total pointers on average)', 'O(N²)', 'O(N log N)', 'O(2^N)'],
    correctAnswerIndex: 0,
    explanation: 'Each node averages 1/(1-p) = 2 pointers for p = 1/2.',
    hint: 'Sum of a geometric series.'
  },
  {
    id: 'q31-skiplist-6',
    levelId: 'level-31-skiplist',
    question: 'Compared to a balanced BST, a skip list\u2019s main practical advantage is:',
    options: ['Simplicity and easy lock-based concurrency', 'Guaranteed O(1) search', 'Deterministic height', 'Smaller asymptotics'],
    correctAnswerIndex: 0,
    explanation: 'No rotations needed; levels are just pointers, and range queries are trivial to implement.',
    hint: 'Implementation effort.'
  },
  {
    id: 'q31-skiplist-7',
    levelId: 'level-31-skiplist',
    question: 'Deletion in a skip list:',
    options: ['Unlinks the node at every level it appears', 'Rebuilds the whole list', 'Shifts all elements left', 'Uses rotations'],
    correctAnswerIndex: 0,
    explanation: 'The node\u2019s predecessors at each level skip over it — O(log N) expected.',
    hint: 'Fix all pointers pointing to it.'
  },
  {
    id: 'q31-skiplist-8',
    levelId: 'level-31-skiplist',
    question: 'Searching a skip list starts:',
    options: ['At the top-left and moves down/right', 'At the bottom-left only', 'At random nodes', 'From the end'],
    correctAnswerIndex: 0,
    explanation: 'Start at the highest level and descend whenever the next node exceeds the target.',
    hint: 'Top-down approach.'
  },
  {
    id: 'q31-skiplist-9',
    levelId: 'level-31-skiplist',
    question: 'What is the expected insertion complexity?',
    options: ['O(log N)', 'O(N)', 'O(1)', 'O(N log N)'],
    correctAnswerIndex: 0,
    explanation: 'Search for position plus constant pointer rewiring at each of O(log N) levels.',
    hint: 'Search dominates.'
  },
  {
    id: 'q31-skiplist-10',
    levelId: 'level-31-skiplist',
    question: 'A real system that famously used skip lists is:',
    options: ['Redis (sorted sets)', 'MySQL (B-tree only)', 'Git', 'Linux scheduler only'],
    correctAnswerIndex: 0,
    explanation: 'Redis implements Sorted Sets with skip lists for O(log N) rank operations.',
    hint: 'In-memory key-value store.'
  },
  {
    id: 'q32-splay-1',
    levelId: 'level-32-splay',
    question: 'What is the amortized complexity of each operation in a Splay tree?',
    options: ['O(log N) amortized', 'O(N) worst case only', 'O(1) always', 'O(N log N) amortized'],
    correctAnswerIndex: 0,
    explanation: 'Splay trees guarantee O(log N) amortized via the potential method, despite O(N) worst-case single ops.',
    hint: 'Amortized vs worst case.'
  },
  {
    id: 'q32-splay-2',
    levelId: 'level-32-splay',
    question: 'After accessing a node in a splay tree, the node:',
    options: ['Becomes the new root', 'Stays in place', 'Is deleted', 'Moves to the deepest leaf'],
    correctAnswerIndex: 0,
    explanation: 'Splaying rotates the accessed node to the root, speeding up future accesses to it.',
    hint: 'Self-adjusting behavior.'
  },
  {
    id: 'q32-splay-3',
    levelId: 'level-32-splay',
    question: 'The zig-zig rotation is applied when:',
    options: ['Node and its parent are both left (or both right) children', 'Node is left, parent is right', 'Node is the root', 'Tree is empty'],
    correctAnswerIndex: 0,
    explanation: 'Two consecutive single rotations in the same direction (LL or RR pattern).',
    hint: 'Same-direction grandparent-parent-child.'
  },
  {
    id: 'q32-splay-4',
    levelId: 'level-32-splay',
    question: 'Zig-zag rotation handles which shape?',
    options: ['Node and parent are in opposite directions (LR or RL)', 'LL shape', 'RR shape', 'A straight chain'],
    correctAnswerIndex: 0,
    explanation: 'Double rotation in opposite directions, like an AVL double rotation.',
    hint: 'Opposite-side children.'
  },
  {
    id: 'q32-splay-5',
    levelId: 'level-32-splay',
    question: 'A plain zig (single rotation) is used when:',
    options: ['The node\u2019s parent is the root', 'The tree is deeper than 2', 'The node is a leaf', 'The node is the root'],
    correctAnswerIndex: 0,
    explanation: 'One rotation suffices to bring the node to the root.',
    hint: 'Parent is the root.'
  },
  {
    id: 'q32-splay-6',
    levelId: 'level-32-splay',
    question: 'Why is a splay tree called "self-adjusting"?',
    options: ['It reorganizes itself based on access patterns', 'It auto-sorts values', 'It fixes hash collisions', 'It compresses itself'],
    correctAnswerIndex: 0,
    explanation: 'Frequently accessed nodes rise to the top, adapting to the access distribution.',
    hint: 'It learns what you access often.'
  },
  {
    id: 'q32-splay-7',
    levelId: 'level-32-splay',
    question: 'Splay trees can maintain which operations in O(log N) amortized?',
    options: ['Search, insert, delete, and split/merge', 'Only search', 'Only min extraction', 'Only range queries with lazy tags'],
    correctAnswerIndex: 0,
    explanation: 'All BST operations plus split/merge, making them versatile for dynamic sequences.',
    hint: 'Full BST toolkit.'
  },
  {
    id: 'q32-splay-8',
    levelId: 'level-32-splay',
    question: 'Inserting into a splay tree:',
    options: ['Inserts normally then splays the new node', 'Rebuilds the tree', 'Ignores order', 'Requires rebalancing via colors'],
    correctAnswerIndex: 0,
    explanation: 'Standard BST insert followed by splay brings the inserted key to the root.',
    hint: 'BST insert + splay.'
  },
  {
    id: 'q32-splay-9',
    levelId: 'level-32-splay',
    question: 'A single worst-case splay operation can cost:',
    options: ['O(N)', 'O(1)', 'O(log N) always', 'O(N log N)'],
    correctAnswerIndex: 0,
    explanation: 'A skewed tree can force a deep rotation chain — but amortized across operations it is O(log N).',
    hint: 'Worst case, not amortized.'
  },
  {
    id: 'q32-splay-10',
    levelId: 'level-32-splay',
    question: 'Splaying a missing key during search splays:',
    options: ['The last node visited before failure', 'The root', 'Nothing', 'The leftmost leaf'],
    correctAnswerIndex: 0,
    explanation: 'The final node on the failed search path is splayed to root, keeping locality benefits.',
    hint: 'Splay the deepest touched node.'
  },
  {
    id: 'q33-radixsort-1',
    levelId: 'level-33-radixsort',
    question: 'What is the time complexity of Radix Sort on N numbers with d digits?',
    options: ['O(d · N)', 'O(N log N)', 'O(N²)', 'O(d² · N)'],
    correctAnswerIndex: 0,
    explanation: 'Each of the d digit passes is a linear counting sort over N elements.',
    hint: 'Linear passes times digits.'
  },
  {
    id: 'q33-radixsort-2',
    levelId: 'level-33-radixsort',
    question: 'Radix sort processes digits in which order?',
    options: ['Least significant digit first (LSD)', 'Most significant first always', 'Random order', 'No order matters'],
    correctAnswerIndex: 0,
    explanation: 'LSD radix sort uses stable passes so later passes override earlier ones correctly.',
    hint: 'Stable LSD passes.'
  },
  {
    id: 'q33-radixsort-3',
    levelId: 'level-33-radixsort',
    question: 'Each radix pass relies on which underlying stable sort?',
    options: ['Counting sort', 'Insertion sort', 'Quick sort', 'Merge sort'],
    correctAnswerIndex: 0,
    explanation: 'Counting sort over a small digit range (0–9 or 0–255) is linear per pass.',
    hint: 'Linear by digit range.'
  },
  {
    id: 'q33-radixsort-4',
    levelId: 'level-33-radixsort',
    question: 'Why must each pass be stable?',
    options: ['To preserve previous-digit ordering', 'To save memory', 'To avoid comparisons', 'To be in-place'],
    correctAnswerIndex: 0,
    explanation: 'Stability carries the ordering from earlier digits into later passes.',
    hint: 'Order must survive across passes.'
  },
  {
    id: 'q33-radixsort-5',
    levelId: 'level-33-radixsort',
    question: 'Counting sort runs in O(N + k) where k is:',
    options: ['The range of key values', 'The number of digits', 'The number of passes', 'The array size squared'],
    correctAnswerIndex: 0,
    explanation: 'k = max value range; a count array of size k is scanned linearly.',
    hint: 'Size of the count array.'
  },
  {
    id: 'q33-radixsort-6',
    levelId: 'level-33-radixsort',
    question: 'Radix sort is best when:',
    options: ['Keys have few digits and a small digit range', 'Keys are huge floating points', 'N is tiny', 'Comparison is cheap and range huge'],
    correctAnswerIndex: 0,
    explanation: 'A small fixed number of passes makes radix sort beat comparison sorts.',
    hint: 'Few passes over small buckets.'
  },
  {
    id: 'q33-radixsort-7',
    levelId: 'level-33-radixsort',
    question: 'Radix sort cannot directly sort which kind of data without preprocessing?',
    options: ['Negative numbers / floats', 'Strings', 'Small integers', 'Pairs of integers'],
    correctAnswerIndex: 0,
    explanation: 'Sign and mantissa layouts require offsetting or bit manipulation first.',
    hint: 'Sign bit handling.'
  },
  {
    id: 'q33-radixsort-8',
    levelId: 'level-33-radixsort',
    question: 'For 32-bit integers with 8-bit passes, the number of passes is:',
    options: ['4', '32', '8', '16'],
    correctAnswerIndex: 0,
    explanation: '32 bits / 8 bits per pass = 4 counting-sort passes.',
    hint: 'Divide bit width by pass width.'
  },
  {
    id: 'q33-radixsort-9',
    levelId: 'level-33-radixsort',
    question: 'The space complexity of counting sort is:',
    options: ['O(k) auxiliary (plus output array)', 'O(1)', 'O(N log N)', 'O(k²)'],
    correctAnswerIndex: 0,
    explanation: 'The count array of size k plus the output array of size N.',
    hint: 'Count buckets + output.'
  },
  {
    id: 'q33-radixsort-10',
    levelId: 'level-33-radixsort',
    question: 'Which comparison-based lower bound does radix sort bypass?',
    options: ['Ω(N log N)', 'Ω(N²)', 'Ω(N)', 'Ω(2^N)'],
    correctAnswerIndex: 0,
    explanation: 'Radix sort is not comparison-based, so the N log N decision-tree bound does not apply.',
    hint: 'Information-theoretic bound.'
  },
  {
    id: 'q34-zalgo-1',
    levelId: 'level-34-zalgo',
    question: 'What does Z[i] represent in the Z-array of a string?',
    options: ['Length of longest substring starting at i that is also a prefix', 'Number of occurrences of char i', 'Length of the string', 'Suffix array position'],
    correctAnswerIndex: 0,
    explanation: 'Z[i] = longest common prefix length between the string and its suffix starting at i.',
    hint: 'Prefix-suffix overlap at i.'
  },
  {
    id: 'q34-zalgo-2',
    levelId: 'level-34-zalgo',
    question: 'The Z-array is computed in:',
    options: ['O(N) using the [l, r] window trick', 'O(N²)', 'O(N log N)', 'O(M·N)'],
    correctAnswerIndex: 0,
    explanation: 'The maintained Z-box [l, r] lets later values copy earlier ones when inside the box.',
    hint: 'Linear with a sliding window.'
  },
  {
    id: 'q34-zalgo-3',
    levelId: 'level-34-zalgo',
    question: 'For pattern matching, the Z-algorithm concatenates:',
    options: ['pattern + "$" + text', 'text + "$" + pattern', 'pattern + pattern', 'text + text'],
    correctAnswerIndex: 0,
    explanation: 'A separator (not in the alphabet) prevents cross-boundary matches; Z[i] = M marks a match.',
    hint: 'Separator char.'
  },
  {
    id: 'q34-zalgo-4',
    levelId: 'level-34-zalgo',
    question: 'In the concatenated string, a match occurs wherever:',
    options: ['Z[i] == length(pattern)', 'Z[i] == 0', 'Z[i] == 1', 'Z[i] == i'],
    correctAnswerIndex: 0,
    explanation: 'A prefix-length match starting at i means the pattern appears at that offset.',
    hint: 'Compare against pattern length.'
  },
  {
    id: 'q34-zalgo-5',
    levelId: 'level-34-zalgo',
    question: 'If S = "aaaaa", what is Z[2]?',
    options: ['3 (the suffix "aaa" matches the prefix)', '2', '0', '5'],
    correctAnswerIndex: 0,
    explanation: 'Suffix starting at index 2 is "aaa", sharing length 3 with the prefix.',
    hint: 'Count the overlap.'
  },
  {
    id: 'q34-zalgo-6',
    levelId: 'level-34-zalgo',
    question: 'When i is inside the Z-box [l, r], Z[i] is initialized to:',
    options: ['min(Z[i - l], r - i + 1)', '0', 'Z[l]', 'r'],
    correctAnswerIndex: 0,
    explanation: 'Mirroring the value at i - l, capped by the remaining box width.',
    hint: 'Mirror index capped by box.'
  },
  {
    id: 'q34-zalgo-7',
    levelId: 'level-34-zalgo',
    question: 'The Z-algorithm finds all occurrences of a pattern in time:',
    options: ['O(N + M)', 'O(N·M)', 'O(N log M)', 'O(M²)'],
    correctAnswerIndex: 0,
    explanation: 'Linear Z-array computation over the concatenated string of length N + M + 1.',
    hint: 'Linear overall.'
  },
  {
    id: 'q34-zalgo-8',
    levelId: 'level-34-zalgo',
    question: 'What is Z[0] conventionally set to?',
    options: ['0 (or the full length by definition)', 'The string length', '1', 'Undefined error'],
    correctAnswerIndex: 0,
    explanation: 'The whole string trivially matches itself, so Z[0] is defined as 0 for convenience.',
    hint: 'Exclude self-match.'
  },
  {
    id: 'q34-zalgo-9',
    levelId: 'level-34-zalgo',
    question: 'Which algorithm is functionally similar to the Z-algorithm?',
    options: ['KMP with its LPS array', 'Binary search', 'Boyer-Moore only', 'Radix sort'],
    correctAnswerIndex: 0,
    explanation: 'Both precompute prefix-overlap information to skip redundant comparisons.',
    hint: 'LPS vs Z-array.'
  },
  {
    id: 'q34-zalgo-10',
    levelId: 'level-34-zalgo',
    question: 'The Z-box [l, r] tracks:',
    options: ['The rightmost prefix-matching segment found so far', 'The longest suffix', 'All palindromes', 'Character frequencies'],
    correctAnswerIndex: 0,
    explanation: 'l and r bound the farthest-reaching prefix match, enabling O(1) copying.',
    hint: 'Farthest match boundary.'
  },
  {
    id: 'q35-manacher-1',
    levelId: 'level-35-manacher',
    question: "What is the time complexity of Manacher's algorithm?",
    options: ['O(N)', 'O(N²)', 'O(N log N)', 'O(N³)'],
    correctAnswerIndex: 0,
    explanation: 'The palindrome radius array is built with linear amortized work per character.',
    hint: 'Linear time palindrome finder.'
  },
  {
    id: 'q35-manacher-2',
    levelId: 'level-35-manacher',
    question: "Manacher's algorithm finds:",
    options: ['The longest palindromic substring in linear time', 'All anagrams', 'The shortest path', 'The longest repeated sequence'],
    correctAnswerIndex: 0,
    explanation: 'It computes palindrome radii around every center in O(N) total.',
    hint: 'Palindromes in a string.'
  },
  {
    id: 'q35-manacher-3',
    levelId: 'level-35-manacher',
    question: 'To handle even-length palindromes, Manacher:',
    options: ['Inserts separators between characters', 'Reverses the string', 'Sorts characters', 'Splits at every center'],
    correctAnswerIndex: 0,
    explanation: 'A transformed string with sentinels (e.g., "#") makes every palindrome have a single center.',
    hint: 'Sentinel characters.'
  },
  {
    id: 'q35-manacher-4',
    levelId: 'level-35-manacher',
    question: 'The mirror of index i inside the current palindrome is:',
    options: ['2·center - i', 'center + i', 'i - center', 'center - i'],
    correctAnswerIndex: 0,
    explanation: 'Mirroring across the current center reuses already-computed radii.',
    hint: 'Symmetric reflection.'
  },
  {
    id: 'q35-manacher-5',
    levelId: 'level-35-manacher',
    question: 'The answer radius R in the transformed string maps to a real palindrome length of:',
    options: ['R (or 2R per definition variant)', 'R/2', '2R + 1 always', 'R + 1'],
    correctAnswerIndex: 0,
    explanation: 'With the "#" transformation, the radius in the transformed string equals the substring length of the palindrome.',
    hint: 'Radius equals real length.'
  },
  {
    id: 'q35-manacher-6',
    levelId: 'level-35-manacher',
    question: 'The center C and right boundary R are maintained because:',
    options: ['Radii inside [C-R, C+R] can be copied via mirrors', 'They sort the array', 'They track hash values', 'They count characters'],
    correctAnswerIndex: 0,
    explanation: 'Inside the current palindrome, every center\u2019s radius mirrors the opposite side.',
    hint: 'Reuse computed work.'
  },
  {
    id: 'q35-manacher-7',
    levelId: 'level-35-manacher',
    question: 'A naive expansion around each center costs:',
    options: ['O(N²) total', 'O(N)', 'O(N log N)', 'O(N³)'],
    correctAnswerIndex: 0,
    explanation: 'N centers each expanding O(N) gives quadratic time; Manacher avoids re-expansion.',
    hint: 'Before optimization.'
  },
  {
    id: 'q35-manacher-8',
    levelId: 'level-35-manacher',
    question: 'Manacher works on which input type?',
    options: ['Any string (and can be adapted to arrays)', 'Only numbers', 'Only sorted strings', 'Only lowercase letters'],
    correctAnswerIndex: 0,
    explanation: 'It only needs equality comparisons, so any sequence works.',
    hint: 'Equality is enough.'
  },
  {
    id: 'q35-manacher-9',
    levelId: 'level-35-manacher',
    question: 'A common interview application of Manacher is:',
    options: ['Counting all palindromic substrings in linear time', 'Detecting cycles', 'Topological ordering', 'Computing hashes'],
    correctAnswerIndex: 0,
    explanation: 'Summing the radii gives the exact count of distinct palindromes centered per index.',
    hint: 'Sum the radii.'
  },
  {
    id: 'q35-manacher-10',
    levelId: 'level-35-manacher',
    question: 'The space complexity of Manacher\u2019s algorithm is:',
    options: ['O(N) for the radius array', 'O(1)', 'O(N²)', 'O(log N)'],
    correctAnswerIndex: 0,
    explanation: 'One radius array of length 2N+1 over the transformed string.',
    hint: 'Linear auxiliary space.'
  },
  {
    id: 'q36-bloomfilter-1',
    levelId: 'level-36-bloomfilter',
    question: 'What is the key property of a Bloom filter answer?',
    options: ['No false negatives, possible false positives', 'No false positives, possible false negatives', 'Always exact', 'Only works for numbers'],
    correctAnswerIndex: 0,
    explanation: 'Bloom filters never say "not present" for an inserted item, but may claim an absent item is present.',
    hint: 'One-sided error.'
  },
  {
    id: 'q36-bloomfilter-2',
    levelId: 'level-36-bloomfilter',
    question: 'A Bloom filter is implemented with:',
    options: ['A bit array and k hash functions', 'A balanced tree', 'A sorted array', 'A single hash table'],
    correctAnswerIndex: 0,
    explanation: 'Insertion sets k bits; membership checks all k bits.',
    hint: 'Bits + hashes.'
  },
  {
    id: 'q36-bloomfilter-3',
    levelId: 'level-36-bloomfilter',
    question: 'The false-positive probability grows with:',
    options: ['More items inserted (higher occupancy)', 'Fewer items', 'More bits per item', 'Fewer hash functions always'],
    correctAnswerIndex: 0,
    explanation: 'As more bits turn to 1, random checks increasingly collide.',
    hint: 'Occupancy matters.'
  },
  {
    id: 'q36-bloomfilter-4',
    levelId: 'level-36-bloomfilter',
    question: 'The optimal number of hash functions k for m bits and n items is:',
    options: ['(m/n) · ln 2', 'n/m', 'm', '1 always'],
    correctAnswerIndex: 0,
    explanation: 'This minimizes the false-positive rate for a fixed m/n ratio.',
    hint: 'Minimizes the error formula.'
  },
  {
    id: 'q36-bloomfilter-5',
    levelId: 'level-36-bloomfilter',
    question: 'Can elements be removed from a standard Bloom filter?',
    options: ['No, without risk of breaking other entries', 'Yes, always', 'Only even ones', 'Yes, if reinserted'],
    correctAnswerIndex: 0,
    explanation: 'Clearing bits could destroy evidence of other elements; counting filters fix this.',
    hint: 'Shared bits.'
  },
  {
    id: 'q36-bloomfilter-6',
    levelId: 'level-36-bloomfilter',
    question: 'A Counting Bloom filter replaces bits with:',
    options: ['Counters (allowing deletion)', 'Pointers', 'Strings', 'Secondary filters'],
    correctAnswerIndex: 0,
    explanation: 'Each slot counts how many elements set it; decrementing safely deletes.',
    hint: 'Decrement to delete.'
  },
  {
    id: 'q36-bloomfilter-7',
    levelId: 'level-36-bloomfilter',
    question: 'The space benefit of Bloom filters over hash sets is:',
    options: ['Constant bits per item regardless of key size', 'Zero bits', 'N² bits', 'It stores full keys'],
    correctAnswerIndex: 0,
    explanation: 'Only hash-derived bits are stored, not the keys themselves.',
    hint: 'Keys never stored.'
  },
  {
    id: 'q36-bloomfilter-8',
    levelId: 'level-36-bloomfilter',
    question: 'A classic use of Bloom filters is:',
    options: ['Database cache "maybe present" checks', 'Sorting numbers', 'Finding cycles', 'Computing GCD'],
    correctAnswerIndex: 0,
    explanation: 'Caches and spell checkers use them to avoid expensive lookups for definitely-absent keys.',
    hint: 'Fast pre-check before disk I/O.'
  },
  {
    id: 'q36-bloomfilter-9',
    levelId: 'level-36-bloomfilter',
    question: 'The false-positive rate formula for optimal k is approximately:',
    options: ['(1 - e^(-kn/m))^k', 'k/m', 'n/k', '1/n'],
    correctAnswerIndex: 0,
    explanation: 'The standard probability model of k independent hash probes.',
    hint: 'Exponential occupancy model.'
  },
  {
    id: 'q36-bloomfilter-10',
    levelId: 'level-36-bloomfilter',
    question: 'When a Bloom filter answers "definitely no", it means:',
    options: ['The item was never inserted', 'The item may still exist', 'An error occurred', 'The filter is full'],
    correctAnswerIndex: 0,
    explanation: 'If any required bit is 0, the item cannot have been inserted.',
    hint: 'Certainty of absence.'
  },
  {
    id: 'q37-sparsetable-1',
    levelId: 'level-37-sparsetable',
    question: 'What are the build and query complexities of a Sparse Table?',
    options: ['Build O(N log N), query O(1)', 'Build O(N), query O(log N)', 'Build O(N log N), query O(log N)', 'Build O(N²), query O(1)'],
    correctAnswerIndex: 0,
    explanation: 'N log N intervals are precomputed, and overlapping two intervals answers any range in O(1).',
    hint: 'Power-of-two intervals.'
  },
  {
    id: 'q37-sparsetable-2',
    levelId: 'level-37-sparsetable',
    question: 'A sparse table only works when:',
    options: ['The array is static (no updates)', 'Updates are frequent', 'Values are strings', 'N is tiny'],
    correctAnswerIndex: 0,
    explanation: 'Recomputing after updates would break the O(1) query advantage, so it suits immutable data.',
    hint: 'Immutable input.'
  },
  {
    id: 'q37-sparsetable-3',
    levelId: 'level-37-sparsetable',
    question: 'The idempotent requirement means the operation must satisfy:',
    options: ['f(f(a,b), b) = f(a,b) (e.g., min, max, gcd)', 'f(a,b) != f(b,a)', 'f has inverses', 'f is non-associative'],
    correctAnswerIndex: 0,
    explanation: 'Overlapping intervals are allowed only for idempotent operations like min/max/gcd.',
    hint: 'Overlap safety.'
  },
  {
    id: 'q37-sparsetable-4',
    levelId: 'level-37-sparsetable',
    question: 'For query [l, r], the two overlapping intervals are:',
    options: ['Both of length 2^k where k = floor(log2(r - l + 1))', 'One of length r', 'Arbitrary lengths', 'None'],
    correctAnswerIndex: 0,
    explanation: 'Intervals [l, l+2^k) and [r-2^k+1, r] fully cover [l, r].',
    hint: 'Two maximal power-of-two spans.'
  },
  {
    id: 'q37-sparsetable-5',
    levelId: 'level-37-sparsetable',
    question: 'Range sum queries on a sparse table:',
    options: ['Need log N time (sum is not idempotent)', 'Are also O(1)', 'Are impossible', 'Take O(N²)'],
    correctAnswerIndex: 0,
    explanation: 'Sum cannot overlap intervals, so queries decompose into O(log N) disjoint segments.',
    hint: 'Overlap would double-count.'
  },
  {
    id: 'q37-sparsetable-6',
    levelId: 'level-37-sparsetable',
    question: 'The value st[i][k] stores:',
    options: ['The aggregate of the interval [i, i + 2^k - 1]', 'The aggregate of [0, k]', 'The k-th smallest', 'The sum of the whole array'],
    correctAnswerIndex: 0,
    explanation: 'Each cell represents a power-of-two length interval starting at i.',
    hint: 'Length 2^k from i.'
  },
  {
    id: 'q37-sparsetable-7',
    levelId: 'level-37-sparsetable',
    question: 'The recurrence building the table is:',
    options: ['st[i][k] = min(st[i][k-1], st[i + 2^(k-1)][k-1])', 'st[i][k] = st[i][k-1] + 1', 'st[i][k] = st[i-1][k]', 'st[i][k] = k'],
    correctAnswerIndex: 0,
    explanation: 'Halve each interval and combine the two halves.',
    hint: 'Split in half.'
  },
  {
    id: 'q37-sparsetable-8',
    levelId: 'level-37-sparsetable',
    question: 'The total memory of a sparse table is:',
    options: ['O(N log N)', 'O(N)', 'O(log N)', 'O(N²)'],
    correctAnswerIndex: 0,
    explanation: 'N rows × log N levels of power-of-two intervals.',
    hint: 'Row times levels.'
  },
  {
    id: 'q37-sparsetable-9',
    levelId: 'level-37-sparsetable',
    question: 'Common applications of sparse tables include:',
    options: ['Static RMQ, LCA via Euler tour, and GCD queries', 'Dynamic updates', 'Persistent databases', 'Pattern matching'],
    correctAnswerIndex: 0,
    explanation: 'Any idempotent static range query benefits from O(1) lookup.',
    hint: 'Static range problems.'
  },
  {
    id: 'q37-sparsetable-10',
    levelId: 'level-37-sparsetable',
    question: 'LCA on a tree uses a sparse table over which array?',
    options: ['The Euler tour (first occurrences + RMQ)', 'The inorder traversal', 'The sorted values', 'The edge weights'],
    correctAnswerIndex: 0,
    explanation: 'The Euler tour turns LCA into an RMQ over depths, answered in O(1).',
    hint: 'Tour + depth min.'
  },
  {
    id: 'q38-nqueens-1',
    levelId: 'level-38-nqueens',
    question: 'How many solutions exist for the 4-Queens problem?',
    options: ['2', '4', '8', '1'],
    correctAnswerIndex: 0,
    explanation: 'The 4x4 board admits exactly 2 distinct solution placements.',
    hint: 'Try placing queens row by row.'
  },
  {
    id: 'q38-nqueens-2',
    levelId: 'level-38-nqueens',
    question: 'N-Queens is a classic example of which technique?',
    options: ['Backtracking with pruning', 'Divide and conquer only', 'Greedy only', 'Dynamic programming only'],
    correctAnswerIndex: 0,
    explanation: 'It explores partial placements and abandons (prunes) conflicts early.',
    hint: 'Undo and retry.'
  },
  {
    id: 'q38-nqueens-3',
    levelId: 'level-38-nqueens',
    question: 'Two queens attack along the same diagonal when:',
    options: ['|row1 - row2| == |col1 - col2|', 'row1 == row2', 'col1 == col2', 'row1 + col1 == 0'],
    correctAnswerIndex: 0,
    explanation: 'Diagonal conflict means equal row and column differences.',
    hint: 'Slope of ±1.'
  },
  {
    id: 'q38-nqueens-4',
    levelId: 'level-38-nqueens',
    question: 'The most efficient pruning tracks attacks using:',
    options: ['Booleans for columns and the two diagonals (r+c, r-c)', 'A full N×N grid scan', 'Sorting queens', 'A priority queue'],
    correctAnswerIndex: 0,
    explanation: 'O(1) conflict checks: col[c], diag1[r+c], diag2[r-c+N-1].',
    hint: 'Constant-time checks.'
  },
  {
    id: 'q38-nqueens-5',
    levelId: 'level-38-nqueens',
    question: 'The worst-case time complexity of N-Queens is:',
    options: ['Exponential (O(N!) with pruning)', 'O(N²)', 'O(N log N)', 'O(N³)'],
    correctAnswerIndex: 0,
    explanation: 'Branching factor shrinks as rows fill, but worst case remains factorial without strong pruning.',
    hint: 'Permutations of columns.'
  },
  {
    id: 'q38-nqueens-6',
    levelId: 'level-38-nqueens',
    question: 'Each row gets exactly how many queens in any valid N-Queens solution?',
    options: ['One', 'Two', 'Zero or one', 'N'],
    correctAnswerIndex: 0,
    explanation: 'Two queens per row would attack horizontally, so each row holds exactly one.',
    hint: 'Row constraint.'
  },
  {
    id: 'q38-nqueens-7',
    levelId: 'level-38-nqueens',
    question: 'The key idea of backtracking is:',
    options: ['Undo the last choice when it leads to a dead end', 'Never undo', 'Always pick the first option', 'Randomly restart'],
    correctAnswerIndex: 0,
    explanation: 'Explore, and on conflict, revert to the previous state and try the next option.',
    hint: 'Back up and branch again.'
  },
  {
    id: 'q38-nqueens-8',
    levelId: 'level-38-nqueens',
    question: 'How many solutions does the 8-Queens problem have?',
    options: ['92', '8', '64', '1024'],
    correctAnswerIndex: 0,
    explanation: 'The classic 8x8 board has exactly 92 distinct solutions.',
    hint: 'Famous number.'
  },
  {
    id: 'q38-nqueens-9',
    levelId: 'level-38-nqueens',
    question: 'Backtracking is best suited for problems with:',
    options: ['A search space with many partial solutions and cheap conflict checks', 'Only one solution', 'Small input always', 'No constraints'],
    correctAnswerIndex: 0,
    explanation: 'Pruning early invalid branches is what makes backtracking practical.',
    hint: 'Prune early.'
  },
  {
    id: 'q38-nqueens-10',
    levelId: 'level-38-nqueens',
    question: 'Besides N-Queens, backtracking classically solves:',
    options: ['Sudoku, Hamiltonian paths, and maze solving', 'Only sorting', 'Only shortest paths', 'Only matrix ops'],
    correctAnswerIndex: 0,
    explanation: 'Constraint satisfaction problems are its natural home.',
    hint: 'Constraint puzzles.'
  }
];

export const TREE_BALANCE_PUZZLES: TreeBalancePuzzle[] = [
  {
    id: 'rot-1',
    levelId: 'level-2-avl',
    title: 'LL: Single Right Rotation',
    targetRotation: 'LL',
    initialTreeNodes: [{"id":10,"value":10,"x":80,"y":285,"balanceFactor":0},{"id":20,"value":20,"x":190,"y":205,"balanceFactor":1},{"id":30,"value":30,"x":300,"y":125,"balanceFactor":1,"state":"warning"},{"id":40,"value":40,"x":410,"y":205,"balanceFactor":0},{"id":60,"value":60,"x":520,"y":45,"balanceFactor":3,"state":"error"}],
    initialEdges: [{"from":60,"to":30},{"from":30,"to":20},{"from":30,"to":40},{"from":20,"to":10}],
    rotatedTreeNodes: [{"id":10,"value":10,"x":80,"y":205,"balanceFactor":0},{"id":20,"value":20,"x":190,"y":125,"balanceFactor":1},{"id":40,"value":40,"x":410,"y":205,"balanceFactor":0},{"id":60,"value":60,"x":520,"y":125,"balanceFactor":1},{"id":30,"value":30,"x":300,"y":45,"balanceFactor":0}],
    rotatedEdges: [{"from":30,"to":20},{"from":20,"to":10},{"from":30,"to":60},{"from":60,"to":40}],
    hint: 'The root 60 leans left and its left child 30 also leans left \u2014 one right rotation around 60 fixes it.',
    explanation: 'LL case: rotate right at the root. 30 rises to the root, 60 becomes its right child, and 40 reattaches as 60\u2019s left child.',
  },
  {
    id: 'rot-2',
    levelId: 'level-2-avl',
    title: 'RR: Single Left Rotation',
    targetRotation: 'RR',
    initialTreeNodes: [{"id":10,"value":10,"x":80,"y":45,"balanceFactor":-3,"state":"error"},{"id":20,"value":20,"x":190,"y":205,"balanceFactor":0},{"id":30,"value":30,"x":300,"y":125,"balanceFactor":-1,"state":"warning"},{"id":40,"value":40,"x":410,"y":205,"balanceFactor":0},{"id":50,"value":50,"x":520,"y":285,"balanceFactor":0}],
    initialEdges: [{"from":10,"to":30},{"from":30,"to":20},{"from":30,"to":40},{"from":40,"to":50}],
    rotatedTreeNodes: [{"id":20,"value":20,"x":190,"y":205,"balanceFactor":0},{"id":10,"value":10,"x":80,"y":125,"balanceFactor":-1},{"id":50,"value":50,"x":520,"y":205,"balanceFactor":0},{"id":40,"value":40,"x":410,"y":125,"balanceFactor":-1},{"id":30,"value":30,"x":300,"y":45,"balanceFactor":0}],
    rotatedEdges: [{"from":30,"to":10},{"from":10,"to":20},{"from":30,"to":40},{"from":40,"to":50}],
    hint: 'The root 10 leans right and its right child 30 also leans right \u2014 one left rotation around 10 fixes it.',
    explanation: 'RR case: rotate left at the root. 30 rises to the root, 10 becomes its left child, and 20 reattaches as 10\u2019s right child.',
  },
  {
    id: 'rot-3',
    levelId: 'level-2-avl',
    title: 'LR: Left-Right Double Rotation',
    targetRotation: 'LR',
    initialTreeNodes: [{"id":10,"value":10,"x":80,"y":125,"balanceFactor":-2,"state":"error"},{"id":20,"value":20,"x":190,"y":285,"balanceFactor":0},{"id":30,"value":30,"x":300,"y":205,"balanceFactor":0,"state":"warning"},{"id":40,"value":40,"x":410,"y":285,"balanceFactor":0},{"id":50,"value":50,"x":520,"y":45,"balanceFactor":3,"state":"error"}],
    initialEdges: [{"from":50,"to":10},{"from":10,"to":30},{"from":30,"to":20},{"from":30,"to":40}],
    rotatedTreeNodes: [{"id":20,"value":20,"x":190,"y":205,"balanceFactor":0},{"id":10,"value":10,"x":80,"y":125,"balanceFactor":-1},{"id":40,"value":40,"x":410,"y":205,"balanceFactor":0},{"id":50,"value":50,"x":520,"y":125,"balanceFactor":1},{"id":30,"value":30,"x":300,"y":45,"balanceFactor":0}],
    rotatedEdges: [{"from":30,"to":10},{"from":10,"to":20},{"from":30,"to":50},{"from":50,"to":40}],
    hint: 'The left subtree 10 is right-heavy (its chain hangs to the right) \u2014 rotate left at 10, then right at the root 50.',
    explanation: 'LR case: rotate left at 10, then rotate right at 50. 30 becomes the new root with 10 and 50 as children.',
  },
  {
    id: 'rot-4',
    levelId: 'level-2-avl',
    title: 'RL: Right-Left Double Rotation',
    targetRotation: 'RL',
    initialTreeNodes: [{"id":50,"value":50,"x":80,"y":45,"balanceFactor":-3,"state":"error"},{"id":70,"value":70,"x":190,"y":285,"balanceFactor":0},{"id":80,"value":80,"x":300,"y":205,"balanceFactor":0,"state":"warning"},{"id":75,"value":75,"x":410,"y":285,"balanceFactor":0},{"id":90,"value":90,"x":520,"y":125,"balanceFactor":2,"state":"error"}],
    initialEdges: [{"from":50,"to":90},{"from":90,"to":80},{"from":80,"to":70},{"from":80,"to":75}],
    rotatedTreeNodes: [{"id":70,"value":70,"x":190,"y":205,"balanceFactor":0},{"id":50,"value":50,"x":80,"y":125,"balanceFactor":-1},{"id":75,"value":75,"x":410,"y":205,"balanceFactor":0},{"id":90,"value":90,"x":520,"y":125,"balanceFactor":1},{"id":80,"value":80,"x":300,"y":45,"balanceFactor":0}],
    rotatedEdges: [{"from":80,"to":50},{"from":50,"to":70},{"from":80,"to":90},{"from":90,"to":75}],
    hint: 'The right subtree 90 is left-heavy \u2014 rotate right at 90, then rotate left at the root 50.',
    explanation: 'RL case: rotate right at 90, then left at 50. 80 becomes the new root with 50 and 90 as children.',
  },
  {
    id: 'rot-5',
    levelId: 'level-2-avl',
    title: 'LL with Reattachment',
    targetRotation: 'LL',
    initialTreeNodes: [{"id":20,"value":20,"x":80,"y":285,"balanceFactor":0},{"id":30,"value":30,"x":190,"y":205,"balanceFactor":1},{"id":40,"value":40,"x":300,"y":125,"balanceFactor":1,"state":"warning"},{"id":45,"value":45,"x":410,"y":205,"balanceFactor":0},{"id":50,"value":50,"x":520,"y":45,"balanceFactor":3,"state":"error"}],
    initialEdges: [{"from":50,"to":40},{"from":40,"to":30},{"from":40,"to":45},{"from":30,"to":20}],
    rotatedTreeNodes: [{"id":20,"value":20,"x":80,"y":205,"balanceFactor":0},{"id":30,"value":30,"x":190,"y":125,"balanceFactor":1},{"id":45,"value":45,"x":410,"y":205,"balanceFactor":0},{"id":50,"value":50,"x":520,"y":125,"balanceFactor":1},{"id":40,"value":40,"x":300,"y":45,"balanceFactor":0}],
    rotatedEdges: [{"from":40,"to":30},{"from":30,"to":20},{"from":40,"to":50},{"from":50,"to":45}],
    hint: '40 and its left child 30 both lean left \u2014 a single right rotation at 50; watch where 45 reattaches.',
    explanation: 'LL case: rotate right at 50. 40 rises, 50 becomes its right child, and 45 reattaches as 50\u2019s left child.',
  },
  {
    id: 'rot-6',
    levelId: 'level-2-avl',
    title: 'RR with Reattachment',
    targetRotation: 'RR',
    initialTreeNodes: [{"id":10,"value":10,"x":80,"y":45,"balanceFactor":-3,"state":"error"},{"id":15,"value":15,"x":190,"y":205,"balanceFactor":0},{"id":20,"value":20,"x":300,"y":125,"balanceFactor":-1,"state":"warning"},{"id":30,"value":30,"x":410,"y":205,"balanceFactor":0},{"id":40,"value":40,"x":520,"y":285,"balanceFactor":0}],
    initialEdges: [{"from":10,"to":20},{"from":20,"to":15},{"from":20,"to":30},{"from":30,"to":40}],
    rotatedTreeNodes: [{"id":15,"value":15,"x":190,"y":205,"balanceFactor":0},{"id":10,"value":10,"x":80,"y":125,"balanceFactor":-1},{"id":40,"value":40,"x":520,"y":205,"balanceFactor":0},{"id":30,"value":30,"x":410,"y":125,"balanceFactor":-1},{"id":20,"value":20,"x":300,"y":45,"balanceFactor":0}],
    rotatedEdges: [{"from":20,"to":10},{"from":10,"to":15},{"from":20,"to":30},{"from":30,"to":40}],
    hint: '20 and its right child 30 both lean right \u2014 a single left rotation at 10; watch where 15 reattaches.',
    explanation: 'RR case: rotate left at 10. 20 rises, 10 becomes its left child, and 15 reattaches as 10\u2019s right child.',
  },
  {
    id: 'rot-7',
    levelId: 'level-2-avl',
    title: 'LR: 4-Node Classic',
    targetRotation: 'LR',
    initialTreeNodes: [{"id":10,"value":10,"x":135,"y":125,"balanceFactor":-2,"state":"error"},{"id":20,"value":20,"x":245,"y":205,"balanceFactor":-1,"state":"warning"},{"id":30,"value":30,"x":355,"y":285,"balanceFactor":0},{"id":40,"value":40,"x":465,"y":45,"balanceFactor":3,"state":"error"}],
    initialEdges: [{"from":40,"to":10},{"from":10,"to":20},{"from":20,"to":30}],
    rotatedTreeNodes: [{"id":10,"value":10,"x":135,"y":125,"balanceFactor":0},{"id":30,"value":30,"x":355,"y":205,"balanceFactor":0},{"id":40,"value":40,"x":465,"y":125,"balanceFactor":1},{"id":20,"value":20,"x":245,"y":45,"balanceFactor":-1}],
    rotatedEdges: [{"from":20,"to":10},{"from":20,"to":40},{"from":40,"to":30}],
    hint: '10 hangs to the right inside a left-heavy root 40 \u2014 left rotation at 10, then right rotation at 40.',
    explanation: 'LR case: rotate left at 10, then right at 40. 20 becomes the root with 10 and 40 as children.',
  },
  {
    id: 'rot-8',
    levelId: 'level-2-avl',
    title: 'RL: 4-Node Classic',
    targetRotation: 'RL',
    initialTreeNodes: [{"id":10,"value":10,"x":135,"y":45,"balanceFactor":-3,"state":"error"},{"id":20,"value":20,"x":245,"y":285,"balanceFactor":0},{"id":30,"value":30,"x":355,"y":205,"balanceFactor":1,"state":"warning"},{"id":40,"value":40,"x":465,"y":125,"balanceFactor":2,"state":"error"}],
    initialEdges: [{"from":10,"to":40},{"from":40,"to":30},{"from":30,"to":20}],
    rotatedTreeNodes: [{"id":20,"value":20,"x":245,"y":205,"balanceFactor":0},{"id":10,"value":10,"x":135,"y":125,"balanceFactor":-1},{"id":40,"value":40,"x":465,"y":125,"balanceFactor":0},{"id":30,"value":30,"x":355,"y":45,"balanceFactor":1}],
    rotatedEdges: [{"from":30,"to":10},{"from":10,"to":20},{"from":30,"to":40}],
    hint: '40 hangs to the left inside a right-heavy root 10 \u2014 right rotation at 40, then left rotation at 10.',
    explanation: 'RL case: rotate right at 40, then left at 10. 30 becomes the root with 10 and 40 as children.',
  },
  {
    id: 'rot-9',
    levelId: 'level-2-avl',
    title: 'LL: Deep Left Chain',
    targetRotation: 'LL',
    initialTreeNodes: [{"id":20,"value":20,"x":25,"y":285,"balanceFactor":0},{"id":30,"value":30,"x":135,"y":205,"balanceFactor":0},{"id":35,"value":35,"x":245,"y":285,"balanceFactor":0},{"id":40,"value":40,"x":355,"y":125,"balanceFactor":1,"state":"warning"},{"id":50,"value":50,"x":465,"y":205,"balanceFactor":0},{"id":70,"value":70,"x":575,"y":45,"balanceFactor":3,"state":"error"}],
    initialEdges: [{"from":70,"to":40},{"from":40,"to":30},{"from":40,"to":50},{"from":30,"to":20},{"from":30,"to":35}],
    rotatedTreeNodes: [{"id":20,"value":20,"x":25,"y":205,"balanceFactor":0},{"id":35,"value":35,"x":245,"y":205,"balanceFactor":0},{"id":30,"value":30,"x":135,"y":125,"balanceFactor":0},{"id":50,"value":50,"x":465,"y":205,"balanceFactor":0},{"id":70,"value":70,"x":575,"y":125,"balanceFactor":1},{"id":40,"value":40,"x":355,"y":45,"balanceFactor":0}],
    rotatedEdges: [{"from":40,"to":30},{"from":30,"to":20},{"from":30,"to":35},{"from":40,"to":70},{"from":70,"to":50}],
    hint: 'Both 70 and its left child 40 lean left \u2014 one right rotation at 70 rebalances the whole tree.',
    explanation: 'LL case: rotate right at 70. 40 rises to the root, 70 becomes its right child, and 50 reattaches as 70\u2019s left child.',
  },
  {
    id: 'rot-10',
    levelId: 'level-2-avl',
    title: 'RR: Deep Right Chain',
    targetRotation: 'RR',
    initialTreeNodes: [{"id":10,"value":10,"x":25,"y":45,"balanceFactor":-3,"state":"error"},{"id":50,"value":50,"x":135,"y":205,"balanceFactor":0},{"id":60,"value":60,"x":245,"y":125,"balanceFactor":-1,"state":"warning"},{"id":75,"value":75,"x":355,"y":285,"balanceFactor":0},{"id":70,"value":70,"x":465,"y":205,"balanceFactor":0},{"id":80,"value":80,"x":575,"y":285,"balanceFactor":0}],
    initialEdges: [{"from":10,"to":60},{"from":60,"to":70},{"from":60,"to":50},{"from":70,"to":80},{"from":70,"to":75}],
    rotatedTreeNodes: [{"id":50,"value":50,"x":135,"y":205,"balanceFactor":0},{"id":10,"value":10,"x":25,"y":125,"balanceFactor":-1},{"id":75,"value":75,"x":355,"y":205,"balanceFactor":0},{"id":80,"value":80,"x":575,"y":205,"balanceFactor":0},{"id":70,"value":70,"x":465,"y":125,"balanceFactor":0},{"id":60,"value":60,"x":245,"y":45,"balanceFactor":0}],
    rotatedEdges: [{"from":60,"to":10},{"from":10,"to":50},{"from":60,"to":70},{"from":70,"to":75},{"from":70,"to":80}],
    hint: 'Both 10 and its right child 60 lean right \u2014 one left rotation at 10 rebalances the whole tree.',
    explanation: 'RR case: rotate left at 10. 60 rises to the root, 10 becomes its left child, and 50 reattaches as 10\u2019s right child.',
  },
  {
    id: 'rot-11',
    levelId: 'level-2-avl',
    title: 'LR: 6-Node Double Rotation',
    targetRotation: 'LR',
    initialTreeNodes: [{"id":10,"value":10,"x":25,"y":205,"balanceFactor":0},{"id":20,"value":20,"x":135,"y":125,"balanceFactor":-1,"state":"warning"},{"id":30,"value":30,"x":245,"y":285,"balanceFactor":0},{"id":40,"value":40,"x":355,"y":205,"balanceFactor":0},{"id":50,"value":50,"x":465,"y":285,"balanceFactor":0},{"id":60,"value":60,"x":575,"y":45,"balanceFactor":3,"state":"error"}],
    initialEdges: [{"from":60,"to":20},{"from":20,"to":10},{"from":20,"to":40},{"from":40,"to":30},{"from":40,"to":50}],
    rotatedTreeNodes: [{"id":10,"value":10,"x":25,"y":205,"balanceFactor":0},{"id":30,"value":30,"x":245,"y":205,"balanceFactor":0},{"id":20,"value":20,"x":135,"y":125,"balanceFactor":0},{"id":50,"value":50,"x":465,"y":205,"balanceFactor":0},{"id":60,"value":60,"x":575,"y":125,"balanceFactor":1},{"id":40,"value":40,"x":355,"y":45,"balanceFactor":0}],
    rotatedEdges: [{"from":40,"to":20},{"from":20,"to":10},{"from":20,"to":30},{"from":40,"to":60},{"from":60,"to":50}],
    hint: '20 is right-heavy inside a left-heavy root 60 \u2014 rotate left at 20 first, then right at the root 60.',
    explanation: 'LR case: rotate left at 20, then right at 60. 40 becomes the new root with 20 and 60 as children.',
  },
  {
    id: 'rot-12',
    levelId: 'level-2-avl',
    title: 'RL: 6-Node Double Rotation',
    targetRotation: 'RL',
    initialTreeNodes: [{"id":40,"value":40,"x":25,"y":45,"balanceFactor":-3,"state":"error"},{"id":50,"value":50,"x":135,"y":285,"balanceFactor":0},{"id":60,"value":60,"x":245,"y":205,"balanceFactor":0},{"id":70,"value":70,"x":355,"y":285,"balanceFactor":0},{"id":80,"value":80,"x":465,"y":125,"balanceFactor":1,"state":"warning"},{"id":90,"value":90,"x":575,"y":205,"balanceFactor":0}],
    initialEdges: [{"from":40,"to":80},{"from":80,"to":60},{"from":80,"to":90},{"from":60,"to":50},{"from":60,"to":70}],
    rotatedTreeNodes: [{"id":50,"value":50,"x":135,"y":205,"balanceFactor":0},{"id":40,"value":40,"x":25,"y":125,"balanceFactor":-1},{"id":70,"value":70,"x":355,"y":205,"balanceFactor":0},{"id":90,"value":90,"x":575,"y":205,"balanceFactor":0},{"id":80,"value":80,"x":465,"y":125,"balanceFactor":0},{"id":60,"value":60,"x":245,"y":45,"balanceFactor":0}],
    rotatedEdges: [{"from":60,"to":40},{"from":40,"to":50},{"from":60,"to":80},{"from":80,"to":70},{"from":80,"to":90}],
    hint: '80 is left-heavy inside a right-heavy root 40 \u2014 rotate right at 80 first, then left at the root 40.',
    explanation: 'RL case: rotate right at 80, then left at 40. 60 becomes the new root with 40 and 80 as children.',
  },
];

export function getQuizQuestionsForLevel(levelId?: string): QuizQuestion[] {
  if (!levelId) return QUIZ_QUESTIONS;
  const filtered = QUIZ_QUESTIONS.filter(q => q.levelId === levelId);
  return filtered.length > 0 ? filtered : QUIZ_QUESTIONS;
}
