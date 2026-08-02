export interface TopicTheory {
  topicKey: string;
  title: string;
  category: string;
  overview: string;
  definition: string;
  keyProperties: string[];
  timeComplexities: { operation: string; best: string; worst: string; average: string }[];
  spaceComplexity: string;
  pinToPinSteps: { stepNumber: number; title: string; explanation: string; formula?: string }[];
  realWorldApplications: string[];
  edgeCases: string[];
}

export const THEORY_DATA: Record<string, TopicTheory> = {
  bst: {
    topicKey: 'bst',
    title: 'Binary Search Tree (BST)',
    category: 'Trees',
    overview: 'A fundamental node-based binary tree data structure where keys in the left subtree are smaller than the node, and keys in the right subtree are larger.',
    definition: 'For every node N in a BST: (1) All nodes in N.left have value < N.value, (2) All nodes in N.right have value > N.value, (3) Both left and right subtrees must also be valid BSTs.',
    keyProperties: [
      'In-order traversal yields nodes in strictly sorted ascending order.',
      'Search, Insertion, and Deletion average O(log N) time.',
      'Worst-case height becomes O(N) when nodes are inserted in sorted order (skewed tree).'
    ],
    timeComplexities: [
      { operation: 'Search', best: 'O(1)', average: 'O(log N)', worst: 'O(N)' },
      { operation: 'Insertion', best: 'O(1)', average: 'O(log N)', worst: 'O(N)' },
      { operation: 'Deletion', best: 'O(1)', average: 'O(log N)', worst: 'O(N)' }
    ],
    spaceComplexity: 'O(N) for storing N nodes. Auxiliary recursion stack: O(h) where h is tree height.',
    pinToPinSteps: [
      {
        stepNumber: 1,
        title: 'Compare with Root Node',
        explanation: 'Start at root. If target value equals current node value, item is found.'
      },
      {
        stepNumber: 2,
        title: 'Traverse Left or Right Subtree',
        explanation: 'If target < current node value, move to left child. If target > current node value, move to right child.',
        formula: 'NextNode = (target < current.val) ? current.left : current.right'
      },
      {
        stepNumber: 3,
        title: 'Insert or Replace (For Mutating Operations)',
        explanation: 'For insertion, attach new node once null child pointer is reached. For deletion, handle 3 cases: (a) Leaf, (b) 1 Child, (c) 2 Children (replace with in-order successor).'
      }
    ],
    realWorldApplications: [
      'Database Indexing (B-Trees / BST variants)',
      'Expression evaluation and Symbol Tables in Compilers',
      'Auto-complete dictionary prefix lookups'
    ],
    edgeCases: [
      'Empty Tree (Root is null)',
      'Inserting duplicate values',
      'Deleting root node with 2 children',
      'Degenerate/Skewed linked-list tree'
    ]
  },
  avl: {
    topicKey: 'avl',
    title: 'AVL Tree (Self-Balancing BST)',
    category: 'Trees',
    overview: 'Invented by Adelson-Velsky and Landis, an AVL tree guarantees strict O(log N) operations by maintaining height balance across every node.',
    definition: 'An AVL tree is a self-balancing BST where the Balance Factor (BF) of every node N satisfies: BalanceFactor(N) = Height(N.left) - Height(N.right) ∈ {-1, 0, +1}.',
    keyProperties: [
      'Strictly balanced: Tree height is bounded by h ≤ 1.44 log₂(N).',
      'Imbalance detected when |BalanceFactor| > 1.',
      'Rebalanced instantly using 4 single/double rotations: LL, RR, LR, RL.'
    ],
    timeComplexities: [
      { operation: 'Search', best: 'O(1)', average: 'O(log N)', worst: 'O(log N)' },
      { operation: 'Insertion', best: 'O(1)', average: 'O(log N)', worst: 'O(log N)' },
      { operation: 'Deletion', best: 'O(1)', average: 'O(log N)', worst: 'O(log N)' }
    ],
    spaceComplexity: 'O(N) total space with O(1) balance factor stored per node.',
    pinToPinSteps: [
      {
        stepNumber: 1,
        title: 'Standard BST Insertion',
        explanation: 'Recursively insert the new value like a regular BST.'
      },
      {
        stepNumber: 2,
        title: 'Update Heights & Calculate Balance Factor',
        explanation: 'Backtrack up ancestors, updating node.height = 1 + max(height(left), height(right)) and computing BF.',
        formula: 'BalanceFactor = Height(Left) - Height(Right)'
      },
      {
        stepNumber: 3,
        title: 'Perform Tree Rotations if Unbalanced',
        explanation: 'If BF > +1 and val < left.val => Right Rotation (LL). If BF < -1 and val > right.val => Left Rotation (RR). Handle LR/RL double rotations accordingly.'
      }
    ],
    realWorldApplications: [
      'Database indexing where lookups are far more frequent than writes',
      'High-performance memory allocation allocators',
      'Geographic spatial queries and Range Trees'
    ],
    edgeCases: [
      'Double rotation (LR / RL) where inner subtree is unbalanced',
      'Cascade rebalancing during deletion from leaf up to root',
      'Inserting strictly increasing values'
    ]
  },
  redblack: {
    topicKey: 'redblack',
    title: 'Red-Black Tree Properties',
    category: 'Trees',
    overview: 'A self-balancing BST where every node is colored RED or BLACK, satisfying strict black-height invariant rules.',
    definition: 'Rules: (1) Every node is RED or BLACK, (2) Root is BLACK, (3) Leaves (null) are BLACK, (4) If a node is RED, both children are BLACK (no consecutive REDs), (5) Every simple path from a node to descendant null leaves contains the same number of BLACK nodes.',
    keyProperties: [
      'Tree height is bounded by h ≤ 2 log₂(N + 1).',
      'Faster insertion and deletion than AVL due to fewer rotations (max 3 rotations per delete).',
      'Used as standard C++ std::map and Java TreeMap implementation.'
    ],
    timeComplexities: [
      { operation: 'Search', best: 'O(1)', average: 'O(log N)', worst: 'O(log N)' },
      { operation: 'Insertion', best: 'O(1)', average: 'O(log N)', worst: 'O(log N)' },
      { operation: 'Deletion', best: 'O(1)', average: 'O(log N)', worst: 'O(log N)' }
    ],
    spaceComplexity: 'O(N) with 1 bit per node for color.',
    pinToPinSteps: [
      {
        stepNumber: 1,
        title: 'Insert RED Leaf Node',
        explanation: 'Always insert new key as a RED leaf node to preserve black-height.'
      },
      {
        stepNumber: 2,
        title: 'Check Double-Red Violation',
        explanation: 'If parent is RED, a double-red violation occurs. Check Uncle node color.'
      },
      {
        stepNumber: 3,
        title: 'Recolor or Rotate',
        explanation: 'If Uncle is RED => Recolor Parent, Uncle to BLACK, and Grandparent to RED. If Uncle is BLACK => Perform Tree Rotation (LL/RR/LR/RL).'
      }
    ],
    realWorldApplications: [
      'C++ STL std::map and std::set implementation',
      'Java java.util.TreeMap and java.util.TreeSet',
      'Linux Kernel Completely Fair Scheduler (CFS)'
    ],
    edgeCases: [
      'Double Black resolution during deletion',
      'Root recoloring to BLACK',
      'Uncle node null (treated as BLACK)'
    ]
  },
  dijkstra: {
    topicKey: 'dijkstra',
    title: "Dijkstra's Shortest Path Algorithm",
    category: 'Graphs',
    overview: 'Edgar Dijkstra\'s greedy algorithm finds the shortest path from a single source vertex to all other vertices in a non-negative weighted graph.',
    definition: 'Uses a priority queue (min-heap) to greedily select the unvisited vertex u with minimum tentative distance dist[u], then relaxes all outgoing edges (u, v, weight).',
    keyProperties: [
      'Greedy choice property: Shortest path to current min-distance node is finalized.',
      'Edge Relaxation Condition: If dist[u] + weight(u, v) < dist[v], update dist[v] = dist[u] + weight(u, v).',
      'Fails on negative edge weights (use Bellman-Ford for negative weights).'
    ],
    timeComplexities: [
      { operation: 'Min-Heap Dijkstra', best: 'O(V log V)', average: 'O((V + E) log V)', worst: 'O((V + E) log V)' },
      { operation: 'Array Dijkstra', best: 'O(V²)', average: 'O(V²)', worst: 'O(V²)' }
    ],
    spaceComplexity: 'O(V + E) for Graph Adjacency List and O(V) for Distances array & Min-Heap.',
    pinToPinSteps: [
      {
        stepNumber: 1,
        title: 'Initialize Distance Array',
        explanation: 'Set dist[source] = 0 and dist[v] = ∞ for all other vertices. Push (0, source) into Min-Heap.',
        formula: 'dist[src] = 0, dist[v] = ∞'
      },
      {
        stepNumber: 2,
        title: 'Extract Minimum Vertex',
        explanation: 'Pop (d, u) with minimum distance from Heap. If d > dist[u], skip duplicate.'
      },
      {
        stepNumber: 3,
        title: 'Relax Outgoing Edges',
        explanation: 'For each neighbor v with edge weight w: if dist[u] + w < dist[v], update dist[v] = dist[u] + w and insert (dist[v], v) into Heap.',
        formula: 'dist[v] = min(dist[v], dist[u] + weight(u, v))'
      }
    ],
    realWorldApplications: [
      'Google Maps & GPS Navigation systems (Road Network Routing)',
      'IP Routing Protocols (OSPF — Open Shortest Path First)',
      'Flight network connection optimization'
    ],
    edgeCases: [
      'Disconnected graph (some vertices remain distance ∞)',
      'Graph with 0-weight edges',
      'Self-loops or multiple edges between same pair of nodes'
    ]
  },
  knapsack: {
    topicKey: 'knapsack',
    title: '0/1 Knapsack Problem (Dynamic Programming)',
    category: 'DynamicProgramming',
    overview: 'Given items with weights and values, find the subset of items that maximizes total value without exceeding knapsack capacity W.',
    definition: 'Dynamic Programming tabular state dp[i][w] represents the maximum total value achievable using a subset of the first i items with weight capacity w.',
    keyProperties: [
      'Items cannot be broken into fractions (either taken completely 1 or left 0).',
      'Overlapping subproblems & Optimal substructure properties.',
      'State transition recurrence depends on whether item i-1 fits in capacity w.'
    ],
    timeComplexities: [
      { operation: 'DP Tabulation', best: 'O(N × W)', average: 'O(N × W)', worst: 'O(N × W)' },
      { operation: 'Recursive Brute Force', best: 'O(2ⁿ)', average: 'O(2ⁿ)', worst: 'O(2ⁿ)' }
    ],
    spaceComplexity: 'O(N × W) for 2D DP Table, optimizable to O(W) with 1D DP Array.',
    pinToPinSteps: [
      {
        stepNumber: 1,
        title: 'Define Base Cases',
        explanation: 'dp[0][w] = 0 (0 items available) and dp[i][0] = 0 (capacity is 0).',
        formula: 'dp[0][w] = 0, dp[i][0] = 0'
      },
      {
        stepNumber: 2,
        title: 'Evaluate Item Include / Exclude',
        explanation: 'For item i with weight wt[i-1] and value val[i-1]: If wt[i-1] ≤ w, choose max between excluding item (dp[i-1][w]) and including item (val[i-1] + dp[i-1][w - wt[i-1]]).',
        formula: 'dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]])'
      },
      {
        stepNumber: 3,
        title: 'Backtrack Optimal Item Subset',
        explanation: 'Start at dp[N][W]. If dp[i][w] ≠ dp[i-1][w], item i was included; subtract wt[i-1] from capacity and repeat.'
      }
    ],
    realWorldApplications: [
      'Resource Allocation & Financial Budgeting',
      'Cargo Loading Optimization in Shipping',
      'Bandwidth and Server Cache Memory Allocation'
    ],
    edgeCases: [
      'All item weights exceed knapsack capacity W (Result = 0)',
      'Item weights or values are zero',
      'Capacity W = 0'
    ]
  },
  trie: {
    topicKey: 'trie',
    title: 'Trie (Prefix Tree)',
    category: 'StringAndTrie',
    overview: 'An efficient tree-like data structure used for storing and searching strings where nodes represent shared character prefixes.',
    definition: 'Each node in a Trie contains an array/map of child pointers for every alphabet character and a boolean flag isEndOfWord indicating complete words.',
    keyProperties: [
      'Search & Insert time depends ONLY on word length L, not total words N.',
      'Shares common prefixes among words, saving redundant character storage.',
      'Ideal for prefix-matching auto-complete queries.'
    ],
    timeComplexities: [
      { operation: 'Word Search', best: 'O(L)', average: 'O(L)', worst: 'O(L)' },
      { operation: 'Prefix Search', best: 'O(L)', average: 'O(L)', worst: 'O(L)' },
      { operation: 'Word Insertion', best: 'O(L)', average: 'O(L)', worst: 'O(L)' }
    ],
    spaceComplexity: 'O(N × L × AlphabetSize) worst case, heavily compressed when words share prefixes.',
    pinToPinSteps: [
      {
        stepNumber: 1,
        title: 'Traverse Character by Character',
        explanation: 'Start at root. For each char c in word, check if node.children[c] exists.'
      },
      {
        stepNumber: 2,
        title: 'Create Missing Node Pointers',
        explanation: 'If child pointer for char c is null during insertion, instantiate a new TrieNode.'
      },
      {
        stepNumber: 3,
        title: 'Mark Word Termination',
        explanation: 'After reaching last character of word, set current.isEndOfWord = true.'
      }
    ],
    realWorldApplications: [
      'Search Engine Auto-complete suggestions',
      'Spell checkers & Dictionary lookups',
      'IP Router Longest Prefix Matching (LPM)'
    ],
    edgeCases: [
      'Searching empty string ""',
      'Inserting words that are prefixes of existing words (e.g., "cat" in "catalog")',
      'Case-sensitivity & non-ASCII characters'
    ]
  },
  heap: {
    topicKey: 'heap',
    title: 'Binary Heap & Priority Queue',
    category: 'Trees',
    overview: 'A complete binary tree stored in an array where every parent satisfies the heap property — used as the backbone of priority queues.',
    definition: 'Max-Heap: key(parent) ≥ key(child) for every node. Min-Heap: key(parent) ≤ key(child). Both are complete binary trees, so the array index of node i gives left child 2i+1 and right child 2i+2.',
    keyProperties: [
      'Insert and Extract-Max/Min both run in O(log N) via sift-up / sift-down.',
      'Build-Heap runs in O(N) using bottom-up heapify, not O(N log N).',
      'Always a complete tree: new nodes are added left-to-right at the deepest level.'
    ],
    timeComplexities: [
      { operation: 'Insert', best: 'O(1)', average: 'O(log N)', worst: 'O(log N)' },
      { operation: 'Extract Max/Min', best: 'O(1)', average: 'O(log N)', worst: 'O(log N)' },
      { operation: 'Build Heap', best: 'O(N)', average: 'O(N)', worst: 'O(N)' },
      { operation: 'Peek', best: 'O(1)', average: 'O(1)', worst: 'O(1)' }
    ],
    spaceComplexity: 'O(N) — stored implicitly in a flat array, no pointers needed.',
    pinToPinSteps: [
      { stepNumber: 1, title: 'Insert at Bottom', explanation: 'Place the new key in the next free slot (rightmost leaf) to keep the tree complete.' },
      { stepNumber: 2, title: 'Sift-Up (Bubble Up)', explanation: 'Compare with the parent. If the heap property is violated, swap with parent and repeat.', formula: 'while (a[i] > a[parent]) swap(i, parent)' },
      { stepNumber: 3, title: 'Extract Root', explanation: 'Remove the root, move the last element to the root, then sift-down: swap with the larger child until the heap property holds.' }
    ],
    realWorldApplications: [
      'Priority queues for task schedulers and Dijkstra/Prim',
      'Heap sort — O(N log N) in-place comparison sort',
      'K largest/smallest elements and median stream problems'
    ],
    edgeCases: [
      'Empty heap (extract must throw or return sentinel)',
      'Duplicates — heap does not enforce uniqueness',
      'Heapify with an array that is not complete'
    ]
  },
  btree: {
    topicKey: 'btree',
    title: 'B-Tree (Balanced Multi-Way Search Tree)',
    category: 'Trees',
    overview: 'A self-balancing multi-way search tree optimized for disk storage where each node holds multiple keys and pointers.',
    definition: 'A B-Tree of minimum degree t satisfies: (1) Every node holds at most 2t-1 keys, (2) Every non-root node holds at least t-1 keys, (3) All leaves are at the same depth, (4) A node with k keys has k+1 children.',
    keyProperties: [
      'Height stays O(log_t N) — extremely shallow for millions of records.',
      'A node spans one disk block, minimizing disk I/O per lookup.',
      'Splits when a node overflows (2t-1 keys) and merges/borrows when underflow occurs.'
    ],
    timeComplexities: [
      { operation: 'Search', best: 'O(1)', average: 'O(log_t N)', worst: 'O(log N)' },
      { operation: 'Insertion', best: 'O(log N)', average: 'O(log N)', worst: 'O(log N)' },
      { operation: 'Deletion', best: 'O(log N)', average: 'O(log N)', worst: 'O(log N)' }
    ],
    spaceComplexity: 'O(N) — plus one extra node slot per overflow during split.',
    pinToPinSteps: [
      { stepNumber: 1, title: 'Search Down the Tree', explanation: 'Binary-search the keys in the current node to decide which child pointer to follow.' },
      { stepNumber: 2, title: 'Insert & Split on Overflow', explanation: 'Insert key into a leaf; if the leaf reaches 2t-1 keys, split it into two nodes and promote the median to the parent.' },
      { stepNumber: 3, title: 'Propagate Splits Upward', explanation: 'If the parent also overflows, split it too — the tree grows only by a new root.' }
    ],
    realWorldApplications: [
      'PostgreSQL and MySQL InnoDB index implementation',
      'Filesystem directories (ext4 H-tree variant)',
      'Database range scans — in-order leaves are linked'
    ],
    edgeCases: [
      'Splitting the root creates a new root (tree height increases)',
      'Deletion from internal nodes requires successor borrowing',
      'Minimum degree t=2 is a 2-3-4 tree'
    ]
  },
  segment: {
    topicKey: 'segment',
    title: 'Segment Tree (Range Query Tree)',
    category: 'Trees',
    overview: 'A binary tree that stores aggregate information (sum, min, max, gcd) about intervals, enabling logarithmic range queries with point updates.',
    definition: 'Each node represents a contiguous interval [l, r]. The root covers [0, N-1]; a node with interval [l, r] has children [l, mid] and [mid+1, r]. Leaves are single elements.',
    keyProperties: [
      'Range query and point update both cost O(log N).',
      'Built in O(N) — total 4N array nodes are typical.',
      'Supports any associative aggregate: sum, min, max, gcd, XOR.'
    ],
    timeComplexities: [
      { operation: 'Range Query', best: 'O(1)', average: 'O(log N)', worst: 'O(log N)' },
      { operation: 'Point Update', best: 'O(1)', average: 'O(log N)', worst: 'O(log N)' },
      { operation: 'Build', best: 'O(N)', average: 'O(N)', worst: 'O(N)' }
    ],
    spaceComplexity: 'O(4N) using array storage — safe upper bound for recursive implementations.',
    pinToPinSteps: [
      { stepNumber: 1, title: 'Build Recursively', explanation: 'Combine child values: tree[i] = tree[2i+1] op tree[2i+2]. Leaves store the original array values.' },
      { stepNumber: 2, title: 'Range Query with 3 Cases', explanation: 'If node interval fully inside [l, r] → return its value. If fully outside → return neutral element. Else recurse on both children and combine.', formula: 'Query(l, r) = Combine(Query(left), Query(right))' },
      { stepNumber: 3, title: 'Point Update', explanation: 'Walk down to the leaf at position i, update it, then recompute every ancestor on the path back up.' }
    ],
    realWorldApplications: [
      'Competitive programming range sum / RMQ problems',
      'Stock price windows, sensor time-series aggregates',
      'With lazy propagation: range add / range assign updates'
    ],
    edgeCases: [
      'Zero-length queries and out-of-range bounds',
      'Neutral element choice per operation (0 for sum, +∞ for min)',
      '1-indexed vs 0-indexed array conventions'
    ]
  },
  bfsdfs: {
    topicKey: 'bfsdfs',
    title: 'Graph Traversal: BFS & DFS',
    category: 'Graphs',
    overview: 'The two fundamental graph traversal strategies — breadth-first (queue, level order) and depth-first (stack/recursion, go deep first).',
    definition: 'BFS explores all neighbors of a node before moving to the next level. DFS explores a branch completely before backtracking. Both visit every vertex and edge exactly once: O(V + E).',
    keyProperties: [
      'BFS finds the shortest path in unweighted graphs (number of edges).',
      'DFS produces spanning trees, detects cycles, and supports topological order.',
      'BFS uses a queue; DFS uses a stack (or recursion).'
    ],
    timeComplexities: [
      { operation: 'Traversal (BFS)', best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
      { operation: 'Traversal (DFS)', best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
      { operation: 'BFS Space (Queue)', best: 'O(1)', average: 'O(V)', worst: 'O(V)' },
      { operation: 'DFS Space (Stack)', best: 'O(1)', average: 'O(h)', worst: 'O(V)' }
    ],
    spaceComplexity: 'BFS: O(V) queue in the worst case. DFS: O(h) recursion stack where h is the longest path.',
    pinToPinSteps: [
      { stepNumber: 1, title: 'Mark Source Visited', explanation: 'BFS: enqueue source. DFS: push source (or call recursively).' },
      { stepNumber: 2, title: 'Explore Frontier / Descend', explanation: 'BFS: dequeue, process, enqueue all unvisited neighbors. DFS: pick first unvisited neighbor and recurse immediately.' },
      { stepNumber: 3, title: 'Repeat Until Exhausted', explanation: 'Continue until the queue/stack is empty. For disconnected graphs, restart from any unvisited vertex.' }
    ],
    realWorldApplications: [
      'BFS: social network friend-of-friend, GPS level expansion',
      'DFS: maze solving, cycle detection, connected components',
      'Both: web crawling, garbage collection marking'
    ],
    edgeCases: [
      'Disconnected graphs — need a loop over all vertices',
      'Graphs with cycles — visited set prevents infinite loops',
      'Self-loops and parallel edges'
    ]
  },
  bellmanford: {
    topicKey: 'bellmanford',
    title: 'Bellman-Ford Shortest Path Algorithm',
    category: 'Graphs',
    overview: 'A dynamic-programming shortest-path algorithm that relaxes all edges V-1 times, handling negative weights and detecting negative cycles.',
    definition: 'Relax every edge (u, v, w) repeatedly: if dist[u] + w < dist[v], update dist[v]. After V-1 full passes, all shortest paths are final; a V-th pass that still relaxes proves a negative cycle.',
    keyProperties: [
      'Works with negative edge weights — Dijkstra does not.',
      'O(V × E) time regardless of graph density.',
      'Detects negative weight cycles reachable from the source.'
    ],
    timeComplexities: [
      { operation: 'Shortest Paths', best: 'O(E)', average: 'O(V × E)', worst: 'O(V × E)' },
      { operation: 'Negative Cycle Detect', best: 'O(E)', average: 'O(V × E)', worst: 'O(V × E)' }
    ],
    spaceComplexity: 'O(V) for the distance array (adjacency list is input).',
    pinToPinSteps: [
      { stepNumber: 1, title: 'Initialize Distances', explanation: 'dist[source] = 0, all others ∞.' },
      { stepNumber: 2, title: 'Relax All Edges V-1 Times', explanation: 'In each pass, scan every edge and relax dist[v] = min(dist[v], dist[u] + w).', formula: 'dist[v] = min(dist[v], dist[u] + w(u,v))' },
      { stepNumber: 3, title: 'Check the V-th Pass', explanation: 'If any edge still relaxes on pass V, a negative cycle reachable from the source exists.' }
    ],
    realWorldApplications: [
      'Currency arbitrage detection (negative cycles in exchange graphs)',
      'Network routing protocols (RIP — Routing Information Protocol)',
      'Finance: detecting profitable trade loops'
    ],
    edgeCases: [
      'Negative cycle unreachable from source — not detected',
      'Early termination when a pass makes zero updates',
      'Overflow on ∞ distances with large weights'
    ]
  },
  mst: {
    topicKey: 'mst',
    title: 'Minimum Spanning Tree (Prim & Kruskal)',
    category: 'Graphs',
    overview: 'Two greedy algorithms that connect all vertices with the minimum total edge weight — the MST.',
    definition: 'MST: a spanning tree (V-1 edges, connected, acyclic) minimizing total edge weight. Prim grows a tree from a seed vertex using a min-priority queue; Kruskal sorts edges and greedily joins components with DSU.',
    keyProperties: [
      'Cut property: the cheapest edge crossing any cut belongs to some MST.',
      'Prim: O(E log V) with a binary heap — best on dense graphs.',
      'Kruskal: O(E log E) dominated by sorting — best on sparse graphs.'
    ],
    timeComplexities: [
      { operation: 'Prim (Heap)', best: 'O(E + V log V)', average: 'O(E log V)', worst: 'O(E log V)' },
      { operation: 'Kruskal', best: 'O(E log E)', average: 'O(E log E)', worst: 'O(E log E)' },
      { operation: 'DSU Phase (Kruskal)', best: 'O(E α(V))', average: 'O(E α(V))', worst: 'O(E α(V))' }
    ],
    spaceComplexity: 'O(V + E) for adjacency lists; O(V) for the heap/visited arrays.',
    pinToPinSteps: [
      { stepNumber: 1, title: 'Prim: Seed & Grow', explanation: 'Start from any vertex, push all its edges into a min-heap, and repeatedly take the cheapest edge leading to an unvisited vertex.' },
      { stepNumber: 2, title: 'Kruskal: Sort & Union', explanation: 'Sort edges by weight. Walk edges in order; add an edge only if its endpoints are in different DSU components.' },
      { stepNumber: 3, title: 'Stop at V-1 Edges', explanation: 'A tree needs exactly V-1 edges. If fewer are found, the graph is disconnected — no MST exists.' }
    ],
    realWorldApplications: [
      'Network design: laying cable/fiber between cities',
      'Cluster analysis via single-linkage (MST-based)',
      'Approximation for the Traveling Salesman Problem'
    ],
    edgeCases: [
      'Disconnected graph — MST undefined (minimum spanning FOREST)',
      'Equal-weight edges — multiple valid MSTs',
      'Complete graph with all edges equal'
    ]
  },
  tarjan: {
    topicKey: 'tarjan',
    title: "Tarjan's Strongly Connected Components",
    category: 'Graphs',
    overview: 'A single-pass DFS algorithm that partitions a directed graph into maximal strongly connected components (SCCs).',
    definition: 'An SCC is a maximal set of vertices where every vertex is reachable from every other. Tarjan uses two arrays: discovery time disc[u] and low-link low[u] = min reachable discovery time, plus an index stack.',
    keyProperties: [
      'Runs in O(V + E) — one DFS pass, no reverse graph needed.',
      'Each SCC is popped from the stack when low[u] == disc[u].',
      'Condensing SCCs yields a DAG — enabling topological reasoning.'
    ],
    timeComplexities: [
      { operation: 'SCC Detection', best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
      { operation: 'Topological Order of SCCs', best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' }
    ],
    spaceComplexity: 'O(V) for disc/low arrays, the stack, and the visited set.',
    pinToPinSteps: [
      { stepNumber: 1, title: 'DFS with Discovery Time', explanation: 'Assign disc[u] = low[u] = current counter and push u onto the index stack.' },
      { stepNumber: 2, title: 'Update Low-Link', explanation: 'For each neighbor v: if unvisited, recurse and set low[u] = min(low[u], low[v]). If v is on the stack, low[u] = min(low[u], disc[v]).', formula: 'low[u] = min(low[u], disc[v]) for back edges' },
      { stepNumber: 3, title: 'Pop the Component', explanation: 'When low[u] == disc[u], u is the root of an SCC — pop the stack until u, emitting one component.' }
    ],
    realWorldApplications: [
      'Social network community detection',
      'Compilers: build dependency analysis between modules',
      'Game theory: 2-SAT implication graph solutions'
    ],
    edgeCases: [
      'Self-loops — a vertex alone forms an SCC',
      'DAGs — every vertex is its own SCC',
      'Multiple roots — restart DFS from unvisited vertices'
    ]
  },
  lcs: {
    topicKey: 'lcs',
    title: 'Longest Common Subsequence (LCS)',
    category: 'DynamicProgramming',
    overview: 'The classic sequence-alignment DP that finds the longest subsequence present in both strings, preserving order but allowing gaps.',
    definition: 'dp[i][j] = length of LCS of prefixes X[0..i-1] and Y[0..j-1]. Transition: if X[i-1] == Y[j-1] then dp[i][j] = 1 + dp[i-1][j-1], else dp[i][j] = max(dp[i-1][j], dp[i][j-1]).',
    keyProperties: [
      'Optimal substructure: prefix LCS feeds full LCS.',
      'O(N × M) time; O(min(N, M)) space with rolling rows.',
      'Backtracking from dp[N][M] reconstructs the actual subsequence.'
    ],
    timeComplexities: [
      { operation: 'DP Table Fill', best: 'O(N × M)', average: 'O(N × M)', worst: 'O(N × M)' },
      { operation: 'Backtrack Reconstruction', best: 'O(N + M)', average: 'O(N + M)', worst: 'O(N + M)' }
    ],
    spaceComplexity: 'O(N × M) full table, O(min(N, M)) for length-only with rolling rows.',
    pinToPinSteps: [
      { stepNumber: 1, title: 'Base Cases', explanation: 'dp[0][j] = 0 and dp[i][0] = 0 — an empty prefix matches nothing.' },
      { stepNumber: 2, title: 'Match or Skip', explanation: 'If characters match, extend the diagonal. Otherwise keep the best of skipping one character from either string.', formula: 'dp[i][j] = 1 + dp[i-1][j-1] if match, else max(dp[i-1][j], dp[i][j-1])' },
      { stepNumber: 3, title: 'Backtrack', explanation: 'Walk from dp[N][M]; moving diagonally collects matched characters, horizontal/vertical moves are skips.' }
    ],
    realWorldApplications: [
      'git diff and version-control change detection',
      'DNA/protein sequence alignment in bioinformatics',
      'Plagiarism detection and similarity scoring'
    ],
    edgeCases: [
      'Empty string inputs — LCS length 0',
      'Identical strings — LCS is the whole string',
      'All characters distinct — LCS length 1'
    ]
  },
  floydwarshall: {
    topicKey: 'floydwarshall',
    title: 'Floyd-Warshall All-Pairs Shortest Paths',
    category: 'Graphs',
    overview: 'A dynamic-programming algorithm that computes shortest paths between every pair of vertices in O(V³) — elegantly simple, dense-friendly.',
    definition: 'dist[i][j] holds the shortest path from i to j. For each intermediate vertex k: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]). After V phases, all pairs are final.',
    keyProperties: [
      'Works with negative weights (no negative cycles).',
      'Only V nested iterations over three loops — tiny code.',
      'Path reconstruction via a next[][] matrix.'
    ],
    timeComplexities: [
      { operation: 'All-Pairs Shortest Paths', best: 'O(V³)', average: 'O(V³)', worst: 'O(V³)' },
      { operation: 'Negative Cycle Detection', best: 'O(V³)', average: 'O(V³)', worst: 'O(V³)' }
    ],
    spaceComplexity: 'O(V²) for the distance matrix.',
    pinToPinSteps: [
      { stepNumber: 1, title: 'Initialize Matrix', explanation: 'dist[i][i] = 0, dist[i][j] = w(i,j) for edges, else ∞.' },
      { stepNumber: 2, title: 'Relax Through k', explanation: 'For each ordered pair (i, j), try routing through vertex k and keep the minimum.', formula: 'dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])' },
      { stepNumber: 3, title: 'Check Negative Cycle', explanation: 'After all phases, if any dist[i][i] < 0, a negative cycle exists.' }
    ],
    realWorldApplications: [
      'Road networks: shortest route between all city pairs',
      'Transitive closure of reachability',
      'Sparse-to-dense: Johnson\'s algorithm wins on sparse graphs'
    ],
    edgeCases: [
      'Negative cycles — output is meaningless (dist[i][i] < 0)',
      'Disconnected pairs stay at ∞',
      'Large V — O(V³) quickly exceeds time limits'
    ]
  },
  matrixchain: {
    topicKey: 'matrixchain',
    title: 'Matrix Chain Multiplication (DP)',
    category: 'DynamicProgramming',
    overview: 'Finds the optimal parenthesization of a chain of matrices that minimizes total scalar multiplications.',
    definition: 'm[i][j] = minimum multiplications to compute product Aᵢ...Aⱼ. Split at k: m[i][j] = min over k of m[i][k] + m[k+1][j] + p[i-1]·p[k]·p[j], where p holds the dimensions.',
    keyProperties: [
      'Classic interval DP — the gap between i and j grows in each phase.',
      'Different parenthesizations give wildly different costs.',
      'O(N³) time, O(N²) space; optimal splits stored in s[i][j].'
    ],
    timeComplexities: [
      { operation: 'DP Fill', best: 'O(N³)', average: 'O(N³)', worst: 'O(N³)' },
      { operation: 'Reconstruction', best: 'O(N)', average: 'O(N)', worst: 'O(N)' }
    ],
    spaceComplexity: 'O(N²) for the m and s tables.',
    pinToPinSteps: [
      { stepNumber: 1, title: 'Base Cases', explanation: 'm[i][i] = 0 — a single matrix costs nothing to multiply.' },
      { stepNumber: 2, title: 'Try Every Split Point', explanation: 'For each interval length L from 2 to N, and each split k in [i, j): compute the cost and keep the minimum.', formula: 'm[i][j] = min_k(m[i][k] + m[k+1][j] + p_{i-1} p_k p_j)' },
      { stepNumber: 3, title: 'Reconstruct Parenthesization', explanation: 's[i][j] records the optimal k; recursively print the chain: (Aᵢ..Aₖ)(Aₖ₊₁..Aⱼ).' }
    ],
    realWorldApplications: [
      'Compilers: optimizing nested tensor operations',
      'Deep learning: optimal order of layer multiplications',
      'Sparse linear algebra pipeline planning'
    ],
    edgeCases: [
      'Single matrix (cost 0)',
      'Incompatible adjacent dimensions (p[i] mismatch)',
      'Large N — O(N³) with N > 1000 is infeasible'
    ]
  },
  dsu: {
    topicKey: 'dsu',
    title: 'Disjoint Set Union (Union-Find)',
    category: 'AdvancedSets',
    overview: 'The near-constant-time data structure for maintaining disjoint components under two operations: union(a, b) and find(a).',
    definition: 'Each component is a tree pointed to by a parent[] array. find(a) walks to the root (with path compression). union(a, b) attaches the smaller rank tree under the larger (union by rank).',
    keyProperties: [
      'O(α(N)) per operation — inverse Ackermann, effectively O(1).',
      'Path compression flattens trees during find.',
      'Union by rank keeps trees at logarithmic depth.'
    ],
    timeComplexities: [
      { operation: 'Find (with compression)', best: 'O(1)', average: 'O(α(N))', worst: 'O(α(N))' },
      { operation: 'Union', best: 'O(1)', average: 'O(α(N))', worst: 'O(α(N))' },
      { operation: 'Build (N elements)', best: 'O(N)', average: 'O(N)', worst: 'O(N)' }
    ],
    spaceComplexity: 'O(N) for parent and rank arrays.',
    pinToPinSteps: [
      { stepNumber: 1, title: 'Initialize', explanation: 'parent[i] = i and rank[i] = 0 for every element.' },
      { stepNumber: 2, title: 'Find with Path Compression', explanation: 'Recursively resolve the root and set every node on the path to point directly to it.', formula: 'parent[x] = find(parent[x])' },
      { stepNumber: 3, title: 'Union by Rank', explanation: 'Attach the root with the smaller rank under the larger root; ties increment rank by one.' }
    ],
    realWorldApplications: [
      'Kruskal\'s MST cycle detection',
      'Dynamic connectivity: are two friends in the same social circle?',
      'Image segmentation (connected pixel regions)'
    ],
    edgeCases: [
      'Union of already-connected elements — no-op',
      'Path compression on very deep trees (fixes amortized cost)',
      'Offline problems: reverse-delete order changes results'
    ]
  },
  kmp: {
    topicKey: 'kmp',
    title: 'KMP String Matching (Knuth-Morris-Pratt)',
    category: 'StringAndTrie',
    overview: 'The classic O(N + M) string-matching algorithm that never backs up in the text by using a prefix-suffix failure table (LPS).',
    definition: 'LPS[i] = length of the longest proper prefix of pattern[0..i] that is also a suffix. On a mismatch at j, the search resumes at LPS[j-1] instead of the start — the text pointer never moves back.',
    keyProperties: [
      'Linear O(N + M) worst case — immune to adversarial inputs.',
      'Text pointer strictly increases: each character compared once.',
      'LPS build itself is O(M) using the same technique.'
    ],
    timeComplexities: [
      { operation: 'LPS Preprocess', best: 'O(M)', average: 'O(M)', worst: 'O(M)' },
      { operation: 'Pattern Search', best: 'O(N)', average: 'O(N + M)', worst: 'O(N + M)' }
    ],
    spaceComplexity: 'O(M) for the LPS array.',
    pinToPinSteps: [
      { stepNumber: 1, title: 'Build the LPS Array', explanation: 'For each i, extend the current longest prefix-suffix; on mismatch fall back to LPS[prevLen-1].' },
      { stepNumber: 2, title: 'Scan Text with the Pattern Pointer', explanation: 'Compare text[i] with pattern[j]. Match → advance both. Mismatch and j > 0 → j = LPS[j-1] (no text backup).' },
      { stepNumber: 3, title: 'Record Matches', explanation: 'When j == M, a match ends at i; report it and set j = LPS[M-1] to find overlapping matches.' }
    ],
    realWorldApplications: [
      'Find-and-replace in text editors (linear guarantees)',
      'DNA and protein sequence search',
      'grep-style pattern scanning in large logs'
    ],
    edgeCases: [
      'Pattern longer than text',
      'All-identical characters ("aaaa" in "aaaaaa")',
      'Empty pattern — matches at every position'
    ]
  },
  suffixarray: {
    topicKey: 'suffixarray',
    title: 'Suffix Array & LCP Array',
    category: 'StringAndTrie',
    overview: 'The sorted array of all suffixes of a string — a compact alternative to the suffix tree enabling powerful string queries.',
    definition: 'Suffix array SA lists starting indices of all suffixes in lexicographic order. The LCP array stores longest common prefix lengths between consecutive suffixes; SA + LCP together answer most substring queries.',
    keyProperties: [
      'Built in O(N log N) via prefix doubling with radix sort.',
      'Pattern search via binary search on SA: O(M log N).',
      'LCP enables distinct-substring counting and longest repeated substring.'
    ],
    timeComplexities: [
      { operation: 'Build (Prefix Doubling)', best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N log N)' },
      { operation: 'Pattern Search', best: 'O(M)', average: 'O(M log N)', worst: 'O(M log N)' },
      { operation: 'LCP Construction (Kasai)', best: 'O(N)', average: 'O(N)', worst: 'O(N)' }
    ],
    spaceComplexity: 'O(N) for SA and LCP arrays.',
    pinToPinSteps: [
      { stepNumber: 1, title: 'Rank by Length-2^k Blocks', explanation: 'Sort suffixes by their first 2^k characters using the previous ranks as a pair.' },
      { stepNumber: 2, title: 'Double Until Sorted', explanation: 'Repeat k = 1, 2, 4... until all ranks are unique — at most log N rounds.' },
      { stepNumber: 3, title: 'Build LCP with Kasai', explanation: 'Using the SA order, reuse the previous suffix\'s LCP to compute the next in O(N) total.' }
    ],
    realWorldApplications: [
      'Genome assembly: longest common substring of reads',
      'Search engine suffix indexes for phrase search',
      'Plagiarism and near-duplicate document detection'
    ],
    edgeCases: [
      'Empty string and single-character strings',
      'All identical characters (N suffixes in N log N anyway)',
      'Sentinel character conventions to terminate suffixes'
    ]
  },
  rabinkarp: {
    topicKey: 'rabinkarp',
    title: 'Rabin-Karp String Matching (Rolling Hash)',
    category: 'StringAndTrie',
    overview: 'Uses a rolling polynomial hash to compare a pattern with every window of the text in O(N + M) expected time.',
    definition: 'Hash a window as a base-b integer: H = c₀·b^(M-1) + ... + c_{M-1} mod p. Slide the window: remove the leading character and append the next in O(1), then compare hashes before verifying character-by-character.',
    keyProperties: [
      'Expected O(N + M); worst case O(N × M) on hash collisions.',
      'O(1) per window shift with modular arithmetic.',
      'Double-hashing eliminates nearly all collisions.'
    ],
    timeComplexities: [
      { operation: 'Precompute Powers', best: 'O(M)', average: 'O(M)', worst: 'O(M)' },
      { operation: 'Match Search', best: 'O(N)', average: 'O(N + M)', worst: 'O(N × M)' }
    ],
    spaceComplexity: 'O(1) additional space beyond input.',
    pinToPinSteps: [
      { stepNumber: 1, title: 'Hash Pattern & First Window', explanation: 'Compute hash(pattern) and hash of text[0..M-1] with the same base and modulus.' },
      { stepNumber: 2, title: 'Roll the Window', explanation: 'Subtract text[i]·b^(M-1), multiply the rest by b, add text[i+M]: one O(1) update per step.', formula: 'h_new = ((h_old - c_old * b^(M-1)) * b + c_new) mod p' },
      { stepNumber: 3, title: 'Verify on Hash Match', explanation: 'When window hash == pattern hash, compare characters to confirm — collisions are rare but possible.' }
    ],
    realWorldApplications: [
      'Plagiarism detection with multiple patterns (multi-pattern variant)',
      'Finding repeated substrings in bioinformatics',
      'Same-filesystem deduplication (rolling hashes)'
    ],
    edgeCases: [
      'Pattern longer than text — no matches',
      'Modulus arithmetic with negative intermediate values',
      'Adversarial collisions if the base/modulus are known'
    ]
  }
};
