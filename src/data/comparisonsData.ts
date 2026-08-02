import { AlgorithmComparison } from '../types';

export const COMPARISONS_DATA: AlgorithmComparison[] = [
  {
    id: 'comp-avl-redblack',
    title: 'AVL Tree vs Red-Black Tree',
    category: 'Trees',
    algoA: {
      name: 'AVL Tree',
      timeComplexity: { search: 'O(log N)', insert: 'O(log N)', delete: 'O(log N)' },
      spaceComplexity: 'O(N)',
      pros: ['Strict height balance (h ≤ 1.44 log N)', 'Faster search lookups than Red-Black'],
      cons: ['More frequent rotations on insertion/deletion'],
      bestFor: 'Lookup-heavy workloads (read-intensive databases)'
    },
    algoB: {
      name: 'Red-Black Tree',
      timeComplexity: { search: 'O(log N)', insert: 'O(log N)', delete: 'O(log N)' },
      spaceComplexity: 'O(N)',
      pros: ['Fewer rotations during insert/delete (max 3 rotations)', 'Faster writes'],
      cons: ['Slightly taller tree height (h ≤ 2 log N)'],
      bestFor: 'Write-heavy workloads (C++ std::map, Java TreeMap)'
    },
    recommendation: 'Use AVL Trees for read-intensive lookups; use Red-Black Trees when frequent insertions and deletions occur.'
  },
  {
    id: 'comp-dijkstra-bellman',
    title: 'Dijkstra vs Bellman-Ford Algorithm',
    category: 'Graphs',
    algoA: {
      name: "Dijkstra's Algorithm",
      timeComplexity: { search: 'O((V+E) log V)', insert: 'O(V log V)', delete: 'O(V)' },
      spaceComplexity: 'O(V + E)',
      pros: ['Fast O((V+E) log V) with Min-Heap', 'Optimal for road networks'],
      cons: ['Fails on negative edge weights'],
      bestFor: 'Non-negative weighted single-source routing'
    },
    algoB: {
      name: 'Bellman-Ford Algorithm',
      timeComplexity: { search: 'O(V × E)', insert: 'O(V E)', delete: 'O(V E)' },
      spaceComplexity: 'O(V)',
      pros: ['Handles negative edge weights', 'Detects negative weight cycles'],
      cons: ['Slower O(V × E) time complexity'],
      bestFor: 'Graphs with negative edge weights and financial arbitrage detection'
    },
    recommendation: 'Use Dijkstra when edge weights are positive; use Bellman-Ford when negative weights or cycle detection are required.'
  },
  {
    id: 'comp-bfs-dfs',
    title: 'Breadth-First Search (BFS) vs Depth-First Search (DFS)',
    category: 'Graphs',
    algoA: {
      name: 'Breadth-First Search (BFS)',
      timeComplexity: { search: 'O(V + E)', insert: 'O(V)', delete: 'O(V)' },
      spaceComplexity: 'O(V)',
      pros: ['Guarantees shortest path in unweighted graphs', 'Level-order exploration'],
      cons: ['Higher memory usage for wide graphs (Queue storage)'],
      bestFor: 'Shortest path in unweighted graphs & Social network connections'
    },
    algoB: {
      name: 'Depth-First Search (DFS)',
      timeComplexity: { search: 'O(V + E)', insert: 'O(V)', delete: 'O(V)' },
      spaceComplexity: 'O(h)',
      pros: ['Low memory footprint O(h recursion stack)', 'Ideal for maze solving & topological sort'],
      cons: ['Does not guarantee shortest path'],
      bestFor: 'Topological Sorting, Cycle Detection, and Backtracking'
    },
    recommendation: 'Use BFS for shortest path queries on unweighted graphs; use DFS for structural graph traversal, topological sorting, and cycle detection.'
  },
  {
    id: 'comp-trie-hashtable',
    title: 'Trie (Prefix Tree) vs Hash Table',
    category: 'Strings',
    algoA: {
      name: 'Trie (Prefix Tree)',
      timeComplexity: { search: 'O(L)', insert: 'O(L)', delete: 'O(L)' },
      spaceComplexity: 'O(N × L × Alphabet)',
      pros: ['Prefix matching auto-complete lookups', 'No hash collisions'],
      cons: ['Higher memory overhead per node pointer'],
      bestFor: 'Auto-complete suggestions, Spell Checkers, Longest Prefix Matching'
    },
    algoB: {
      name: 'Hash Table',
      timeComplexity: { search: 'O(1) average', insert: 'O(1) average', delete: 'O(1) average' },
      spaceComplexity: 'O(N)',
      pros: ['Instant O(1) average key lookups', 'Memory efficient for generic keys'],
      cons: ['Cannot perform prefix matching queries', 'Hash collisions worst-case O(N)'],
      bestFor: 'Exact key-value lookups without prefix order'
    },
    recommendation: 'Use Trie when prefix searches and auto-complete are required; use Hash Table for exact key-value storage.'
  },
  {
    id: 'comp-segment-fenwick',
    title: 'Segment Tree vs Fenwick Tree (BIT)',
    category: 'Trees',
    algoA: {
      name: 'Segment Tree',
      timeComplexity: { search: 'O(log N)', insert: 'O(log N)', delete: 'O(log N)' },
      spaceComplexity: 'O(4N)',
      pros: ['Supports arbitrary range queries (Sum, Min, Max, GCD)', 'Supports Lazy Propagation'],
      cons: ['Larger memory overhead (4N nodes)', 'More complex implementation'],
      bestFor: 'Complex range query problems with range updates'
    },
    algoB: {
      name: 'Fenwick Tree (BIT)',
      timeComplexity: { search: 'O(log N)', insert: 'O(log N)', delete: 'O(log N)' },
      spaceComplexity: 'O(N)',
      pros: ['Minimal memory footprint (1D array N)', 'Extremely fast bitwise operations i & (-i)'],
      cons: ['Limited to invertible range operations (Sum, XOR)'],
      bestFor: 'Range sum queries and frequency counting with low memory overhead'
    },
    recommendation: 'Use Fenwick Tree for simple range sums due to minimal code and memory; use Segment Tree when Range Min/Max or Range Updates are needed.'
  },
  {
    id: 'comp-knapsack-fractional',
    title: '0/1 Knapsack (DP) vs Fractional Knapsack (Greedy)',
    category: 'DynamicProgramming',
    algoA: {
      name: '0/1 Knapsack (DP)',
      timeComplexity: { search: 'O(N × W)', insert: 'O(N W)', delete: 'O(N W)' },
      spaceComplexity: 'O(N × W)',
      pros: ['Exact optimal solution for discrete item choices', 'Handles non-divisible items'],
      cons: ['Pseudo-polynomial time complexity dependent on capacity W'],
      bestFor: 'Discrete item selection problems (cannot break items)'
    },
    algoB: {
      name: 'Fractional Knapsack (Greedy)',
      timeComplexity: { search: 'O(N log N)', insert: 'O(N log N)', delete: 'O(N log N)' },
      spaceComplexity: 'O(1)',
      pros: ['Fast O(N log N) greedy sorting by value/weight ratio', 'Always optimal for divisible items'],
      cons: ['Only works when items can be split into fractions'],
      bestFor: 'Continuous resource allocation (fluids, gold dust, bandwidth)'
    },
    recommendation: 'Use 0/1 Knapsack (DP) when items are atomic; use Fractional Knapsack (Greedy) when items can be divided into fractions.'
  },
  {
    id: 'comp-prim-kruskal',
    title: "Prim's MST vs Kruskal's MST Algorithm",
    category: 'Graphs',
    algoA: {
      name: "Prim's MST Algorithm",
      timeComplexity: { search: 'O((V+E) log V)', insert: 'O(E log V)', delete: 'O(E log V)' },
      spaceComplexity: 'O(V + E)',
      pros: ['Faster on dense graphs (high E/V ratio)'],
      cons: ['Requires connected graph representation'],
      bestFor: 'Dense graph Minimum Spanning Trees'
    },
    algoB: {
      name: "Kruskal's MST Algorithm",
      timeComplexity: { search: 'O(E log E)', insert: 'O(E log E)', delete: 'O(E log E)' },
      spaceComplexity: 'O(V + E)',
      pros: ['Faster on sparse graphs', 'Uses Disjoint Set Union (DSU)'],
      cons: ['Slower on dense graphs due to edge sorting'],
      bestFor: 'Sparse graph Minimum Spanning Trees'
    },
    recommendation: "Use Prim's for dense graphs; use Kruskal's for sparse graphs."
  },
  {
    id: 'comp-kmp-naive',
    title: 'KMP Pattern Search vs Naive String Matcher',
    category: 'Strings',
    algoA: {
      name: 'Knuth-Morris-Pratt (KMP)',
      timeComplexity: { search: 'O(N + M)', insert: 'O(M)', delete: 'O(M)' },
      spaceComplexity: 'O(M)',
      pros: ['Guaranteed linear O(N + M) worst-case time', 'No backtracking in text'],
      cons: ['Requires LPS preprocessing array'],
      bestFor: 'Large text processing and DNA sequence matching'
    },
    algoB: {
      name: 'Naive String Matcher',
      timeComplexity: { search: 'O(N × M)', insert: 'O(1)', delete: 'O(1)' },
      spaceComplexity: 'O(1)',
      pros: ['Zero additional space overhead', 'Simple implementation'],
      cons: ['Pathological O(N × M) worst-case time on repetitive patterns'],
      bestFor: 'Short text matching'
    },
    recommendation: 'Use KMP when searching repetitive patterns in large text files.'
  },
  {
    id: 'comp-floyd-johnson',
    title: "Floyd-Warshall vs Johnson's All-Pairs Algorithm",
    category: 'Graphs',
    algoA: {
      name: 'Floyd-Warshall Algorithm',
      timeComplexity: { search: 'O(V³)', insert: 'O(V³)', delete: 'O(V³)' },
      spaceComplexity: 'O(V²)',
      pros: ['Extremely simple 3 nested loops implementation'],
      cons: ['Always runs in O(V³) time regardless of edge count'],
      bestFor: 'Dense All-Pairs Shortest Path graphs'
    },
    algoB: {
      name: "Johnson's Algorithm",
      timeComplexity: { search: 'O(V² log V + V E)', insert: 'O(V E)', delete: 'O(V E)' },
      spaceComplexity: 'O(V + E)',
      pros: ['Significantly faster on sparse graphs than Floyd-Warshall'],
      cons: ['Combines Bellman-Ford reweighting with Dijkstra'],
      bestFor: 'Sparse All-Pairs Shortest Path graphs with negative edges'
    },
    recommendation: "Use Floyd-Warshall for simple implementation on dense graphs; use Johnson's for sparse graphs."
  },
  {
    id: 'comp-btree-lsm',
    title: 'B-Tree vs LSM-Tree (Log-Structured Merge)',
    category: 'Trees',
    algoA: {
      name: 'B-Tree',
      timeComplexity: { search: 'O(log N)', insert: 'O(log N)', delete: 'O(log N)' },
      spaceComplexity: 'O(N)',
      pros: ['In-place random read efficiency', 'Optimal point lookups'],
      cons: ['Random write I/O amplification on SSDs'],
      bestFor: 'Relational SQL Databases (PostgreSQL, MySQL InnoDB)'
    },
    algoB: {
      name: 'LSM-Tree (Log-Structured Merge)',
      timeComplexity: { search: 'O(log N)', insert: 'O(1) append', delete: 'O(1) tombstone' },
      spaceComplexity: 'O(N)',
      pros: ['Sequential append-only write performance', 'No random disk writes'],
      cons: ['Slower point reads due to multiple SSTable merges'],
      bestFor: 'NoSQL Write-Heavy Databases (RocksDB, Cassandra, LevelDB)'
    },
    recommendation: 'Use B-Tree for relational read-heavy systems; use LSM-Tree for append-only write-heavy storage engines.'
  },
  {
    id: 'comp-topo-kahn-dfs',
    title: 'Kahn\u2019s Algorithm vs DFS Topological Sort',
    category: 'Graphs',
    algoA: {
      name: 'Kahn\u2019s Algorithm (BFS)',
      timeComplexity: { search: 'O(V + E)', insert: 'O(V + E)', delete: 'O(V + E)' },
      spaceComplexity: 'O(V)',
      pros: ['Detects cycles via the count of processed nodes', 'Iterative — no recursion stack overflow risk'],
      cons: ['Needs an in-degree array precomputation pass'],
      bestFor: 'Course scheduling, build systems with dependency checks'
    },
    algoB: {
      name: 'DFS Topological Sort',
      timeComplexity: { search: 'O(V + E)', insert: 'O(V + E)', delete: 'O(V + E)' },
      spaceComplexity: 'O(V) recursion stack',
      pros: ['Very concise recursive implementation', 'Can be combined with cycle detection DFS'],
      cons: ['Recursion depth O(V) can overflow on huge graphs'],
      bestFor: 'Small graphs and interview-style dependency ordering'
    },
    recommendation: 'Prefer Kahn\u2019s algorithm for cycle detection and production build systems; use DFS topo-sort for simplicity in small graphs.'
  },
  {
    id: 'comp-lcs-editdist',
    title: 'Longest Common Subsequence vs Edit Distance',
    category: 'DynamicProgramming',
    algoA: {
      name: 'LCS (Longest Common Subsequence)',
      timeComplexity: { search: 'O(N × M)', insert: 'O(N × M)', delete: 'O(N × M)' },
      spaceComplexity: 'O(min(N, M)) optimized',
      pros: ['Foundation for diff tools (git) and version control', 'Only adds/deletes — no substitution'],
      cons: ['Does not model substitution costs (3 operations)'],
      bestFor: 'File diffing, plagiarism detection, DNA alignment'
    },
    algoB: {
      name: 'Edit Distance (Levenshtein)',
      timeComplexity: { search: 'O(N × M)', insert: 'O(N × M)', delete: 'O(N × M)' },
      spaceComplexity: 'O(min(N, M)) optimized',
      pros: ['Models insert + delete + substitution (3 operations)', 'Supports weighted operation costs'],
      cons: ['Does not output the alignment itself without extra backtracking'],
      bestFor: 'Spell checkers, fuzzy string matching, OCR error correction'
    },
    recommendation: 'Use LCS when only insert/delete matter (diffing); use Edit Distance when substitutions must be scored.'
  },
  {
    id: 'comp-manacher-naive',
    title: 'Manacher vs Naive Palindrome Detection',
    category: 'Strings',
    algoA: {
      name: 'Manacher\u2019s Algorithm',
      timeComplexity: { search: 'O(N)', insert: 'O(N)', delete: 'O(N)' },
      spaceComplexity: 'O(N)',
      pros: ['Linear-time for ALL palindrome substrings', 'Mirror optimization reuses earlier radii'],
      cons: ['Complex index juggling with transformed string #a#b#a#'],
      bestFor: 'Longest palindromic substring on large strings'
    },
    algoB: {
      name: 'Naive Center Expansion',
      timeComplexity: { search: 'O(N²)', insert: 'O(N)', delete: 'O(N)' },
      spaceComplexity: 'O(1)',
      pros: ['Simple two-pointer symmetry check', 'No extra memory'],
      cons: ['O(N²) worst case on long repetitive strings'],
      bestFor: 'Short strings and simple interview answers'
    },
    recommendation: 'Use Manacher for production-grade longest-palindrome queries; naive expansion is fine for short inputs.'
  },
  {
    id: 'comp-suffixtree-trie',
    title: 'Suffix Tree vs Trie (Prefix Tree)',
    category: 'Strings',
    algoA: {
      name: 'Suffix Tree',
      timeComplexity: { search: 'O(M) substring query', insert: 'O(N) build', delete: 'O(N) build' },
      spaceComplexity: 'O(N) with compressed edges (Ukkonen)',
      pros: ['Exact substring search in O(M) regardless of N', 'Enables longest repeated substring in O(N)'],
      cons: ['Complex Ukkonen construction — huge implementation effort'],
      bestFor: 'Genome analysis, plagiarism detection, bioinformatics'
    },
    algoB: {
      name: 'Trie (Prefix Tree)',
      timeComplexity: { search: 'O(L) prefix lookup', insert: 'O(L)', delete: 'O(L)' },
      spaceComplexity: 'O(total characters × alphabet)',
      pros: ['Simple node-array or map implementation', 'Great for auto-complete and prefix counting'],
      cons: ['Substring (not prefix) queries need extra work'],
      bestFor: 'Autocomplete, spell check, IP longest-prefix-match'
    },
    recommendation: 'Use a Trie when you need prefix queries and autocomplete; use a Suffix Tree when arbitrary substring search must be O(M).'
  },
  {
    id: 'comp-bfs-dijkstra',
    title: 'BFS vs Dijkstra (Shortest Path)',
    category: 'Graphs',
    algoA: {
      name: 'Breadth-First Search',
      timeComplexity: { search: 'O(V + E)', insert: 'O(V + E)', delete: 'O(V + E)' },
      spaceComplexity: 'O(V) queue',
      pros: ['Shortest path in unweighted graphs', 'Simplest possible level-order implementation'],
      cons: ['BFS layer count ≠ distance once weights vary'],
      bestFor: 'Unweighted graphs: mazes, social networks, word ladders'
    },
    algoB: {
      name: 'Dijkstra (Min-Heap)',
      timeComplexity: { search: 'O((V + E) log V)', insert: 'O(E log V)', delete: 'O(V log V)' },
      spaceComplexity: 'O(V + E)',
      pros: ['Handles arbitrary non-negative weights', 'Edge relaxations are greedy and optimal'],
      cons: ['Fails on negative weights; heap adds log factor'],
      bestFor: 'Weighted routing: maps, network latency, flight graphs'
    },
    recommendation: 'Use BFS when all edges cost the same; switch to Dijkstra the moment edges get different weights.'
  },
  {
    id: 'comp-knapsack-01-unbounded',
    title: '0/1 Knapsack vs Unbounded Knapsack',
    category: 'DynamicProgramming',
    algoA: {
      name: '0/1 Knapsack',
      timeComplexity: { search: 'O(N × W)', insert: 'O(N × W)', delete: 'O(N × W)' },
      spaceComplexity: 'O(W) optimized',
      pros: ['Each item used at most once — classic binary choice'],
      cons: ['Iterating items in the outer loop is mandatory'],
      bestFor: 'Portfolio selection, one-of-each resource allocation'
    },
    algoB: {
      name: 'Unbounded Knapsack',
      timeComplexity: { search: 'O(N × W)', insert: 'O(N × W)', delete: 'O(N × W)' },
      spaceComplexity: 'O(W)',
      pros: ['Items can be reused unlimited times', 'Iterate capacity in the outer loop'],
      cons: ['Same pseudo-polynomial bound in W'],
      bestFor: 'Coin change (minimum coins), cutting-stock, unlimited inventory'
    },
    recommendation: 'Loop items outside for 0/1; loop capacity outside for unbounded. Same table, different traversal order.'
  },
  {
    id: 'comp-binary-linear',
    title: 'Binary Search vs Linear Search',
    category: 'Search',
    algoA: {
      name: 'Binary Search',
      timeComplexity: { search: 'O(log N)', insert: 'O(log N)', delete: 'O(log N)' },
      spaceComplexity: 'O(1) iterative',
      pros: ['Exponentially faster on large sorted data'],
      cons: ['Requires sorted array; no duplicates ambiguity'],
      bestFor: 'Sorted arrays, databases, libraries (STL lower_bound)'
    },
    algoB: {
      name: 'Linear Search',
      timeComplexity: { search: 'O(N)', insert: 'O(1)', delete: 'O(1)' },
      spaceComplexity: 'O(1)',
      pros: ['Works on unsorted data — no preprocessing'],
      cons: ['Linear scan on big datasets'],
      bestFor: 'Small arrays, unsorted lists, single-pass checks'
    },
    recommendation: 'Sort once then binary search when query count is high; keep linear for tiny or unsorted collections.'
  },
  {
    id: 'comp-quick-merge',
    title: 'Quick Sort vs Merge Sort',
    category: 'Sorting',
    algoA: {
      name: 'Quick Sort',
      timeComplexity: { search: 'O(N log N)', insert: 'O(N log N)', delete: 'O(N log N)' },
      spaceComplexity: 'O(log N) stack',
      pros: ['In-place partitioning — cache friendly', 'Fastest in practice on random data'],
      cons: ['Worst case O(N²) on bad pivots'],
      bestFor: 'General-purpose in-memory sorting (Arrays.sort)'
    },
    algoB: {
      name: 'Merge Sort',
      timeComplexity: { search: 'O(N log N)', insert: 'O(N log N)', delete: 'O(N log N)' },
      spaceComplexity: 'O(N) auxiliary',
      pros: ['Stable sort — preserves equal-key order', 'Guaranteed O(N log N) for every input'],
      cons: [''],
      bestFor: 'Linked lists, external/disk sorting, stable ordering'
    },
    recommendation: 'Use Quick Sort in memory; use Merge Sort when stability or worst-case guarantees matter.'
  },
  {
    id: 'comp-greedy-dp',
    title: 'Greedy vs Dynamic Programming',
    category: 'DynamicProgramming',
    algoA: {
      name: 'Greedy Strategy',
      timeComplexity: { search: 'O(N log N) typical', insert: 'O(N log N)', delete: 'O(N log N)' },
      spaceComplexity: 'O(1) often',
      pros: ['Simple, fast, low memory', 'Optimal when the greedy choice property holds'],
      cons: [''],
      bestFor: 'Activity selection, Huffman coding, fractional knapsack, MST'
    },
    algoB: {
      name: 'Dynamic Programming',
      timeComplexity: { search: 'O(states × transitions)', insert: 'O(states × transitions)', delete: 'O(states × transitions)' },
      spaceComplexity: 'Depends on state table',
      pros: ['Guaranteed optimal via exhaustive state exploration'],
      cons: [''],
      bestFor: '0/1 knapsack, LCS, edit distance, shortest paths'
    },
    recommendation: 'Verify the greedy choice property first; if the best local pick can ever be suboptimal, switch to DP.'
  },
  {
    id: 'comp-hashmap-bstmap',
    title: 'Hash Map vs Balanced BST Map',
    category: 'AdvancedSets',
    algoA: {
      name: 'Hash Map',
      timeComplexity: { search: 'O(1) average', insert: 'O(1) average', delete: 'O(1) average' },
      spaceComplexity: 'O(N) + table overhead',
      pros: ['Constant-time lookups', 'Simple buckets + collision chains'],
      cons: [''],
      bestFor: 'Caches, deduplication, frequency counting'
    },
    algoB: {
      name: 'Balanced BST Map (TreeMap)',
      timeComplexity: { search: 'O(log N)', insert: 'O(log N)', delete: 'O(log N)' },
      spaceComplexity: 'O(N)',
      pros: ['Ordered keys: min/max, range scans, predecessor'],
      cons: [''],
      bestFor: 'Order statistics, nearest neighbors, sorted iteration'
    },
    recommendation: 'Hash when you only need lookup; BST map when you need sorted traversal, ranges, or order statistics.'
  }
];
