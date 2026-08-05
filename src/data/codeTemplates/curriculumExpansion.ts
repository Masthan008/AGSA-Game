import { CodeSnippet } from '../../types';

const code = (title: string, timeComplexity: string, spaceComplexity: string, explanationText: string, python: string): CodeSnippet => ({
  title, timeComplexity, spaceComplexity, explanationText, python,
});

export const CURRICULUM_EXPANSION_SNIPPETS: Record<string, CodeSnippet> = {
  toposort: code('Topological Sort — Kahn', 'O(V + E)', 'O(V)', 'Repeatedly emit vertices whose prerequisites are all satisfied.', `def topo(graph):
    indeg = [0] * len(graph)
    for u in range(len(graph)):
        for v in graph[u]: indeg[v] += 1
    queue = [u for u, d in enumerate(indeg) if d == 0]
    order = []
    for u in queue:
        order.append(u)
        for v in graph[u]:
            indeg[v] -= 1
            if indeg[v] == 0: queue.append(v)
    return order if len(order) == len(graph) else None`),
  hashing: code('Hash Table with Chaining', 'O(1) average, O(N) worst', 'O(N)', 'Hash to a bucket, then compare real keys inside that bucket.', `class HashTable:
    def __init__(self, size=16): self.buckets = [[] for _ in range(size)]
    def put(self, key, value):
        bucket = self.buckets[hash(key) % len(self.buckets)]
        for item in bucket:
            if item[0] == key: item[1] = value; return
        bucket.append([key, value])
    def get(self, key):
        for k, value in self.buckets[hash(key) % len(self.buckets)]:
            if k == key: return value
        raise KeyError(key)`),
  editdistance: code('Levenshtein Edit Distance', 'O(MN)', 'O(MN)', 'Each cell chooses the cheapest insert, delete, or replace operation.', `def edit_distance(a, b):
    dp = [[0] * (len(b)+1) for _ in range(len(a)+1)]
    for i in range(len(a)+1): dp[i][0] = i
    for j in range(len(b)+1): dp[0][j] = j
    for i in range(1, len(a)+1):
        for j in range(1, len(b)+1):
            cost = 0 if a[i-1] == b[j-1] else 1
            dp[i][j] = min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+cost)
    return dp[-1][-1]`),
  skiplist: code('Skip List Search', 'O(log N) expected', 'O(N) expected', 'Move right without overshooting, then drop one level.', `def search(head, target):
    node = head
    for level in range(head.level, -1, -1):
        while node.next[level] and node.next[level].key < target:
            node = node.next[level]
    node = node.next[0]
    return node if node and node.key == target else None`),
  radixsort: code('LSD Radix Sort', 'O(D(N + K))', 'O(N + K)', 'A stable counting pass processes one digit position at a time.', `def radix_sort(values):
    exp = 1
    while max(values, default=0) // exp:
        buckets = [[] for _ in range(10)]
        for value in values: buckets[(value // exp) % 10].append(value)
        values = [value for bucket in buckets for value in bucket]
        exp *= 10
    return values`),
  zalgo: code('Z Algorithm', 'O(N)', 'O(N)', 'Reuse the rightmost matching window and only compare beyond it.', `def z_values(s):
    z, left, right = [0] * len(s), 0, 0
    for i in range(1, len(s)):
        if i <= right: z[i] = min(right-i+1, z[i-left])
        while i+z[i] < len(s) and s[z[i]] == s[i+z[i]]: z[i] += 1
        if i+z[i]-1 > right: left, right = i, i+z[i]-1
    return z`),
  manacher: code('Manacher’s Algorithm', 'O(N)', 'O(N)', 'Mirror a known radius, expand, and update the farthest boundary.', `def palindrome_radii(text):
    s = '^#' + '#'.join(text) + '#$'
    p, center, right = [0] * len(s), 0, 0
    for i in range(1, len(s)-1):
        if i < right: p[i] = min(right-i, p[2*center-i])
        while s[i+p[i]+1] == s[i-p[i]-1]: p[i] += 1
        if i+p[i] > right: center, right = i, i+p[i]
    return p`),
  bloomfilter: code('Bloom Filter', 'O(K)', 'O(M) bits', 'All k bits must be present for a “possibly present” answer.', `class BloomFilter:
    def __init__(self, bits, hashes): self.bits, self.hashes = [False]*bits, hashes
    def add(self, item):
        for h in self.hashes: self.bits[h(item) % len(self.bits)] = True
    def might_contain(self, item):
        return all(self.bits[h(item) % len(self.bits)] for h in self.hashes)`),
  sparsetable: code('Sparse Table RMQ', 'O(N log N) build, O(1) query', 'O(N log N)', 'Two power-of-two blocks cover an idempotent range query.', `def range_min(table, logs, left, right):
    k = logs[right-left+1]
    return min(table[k][left], table[k][right-(1<<k)+1])`),
  nqueens: code('N-Queens Backtracking', 'O(N!)', 'O(N)', 'Try one safe column per row and undo each failed choice exactly.', `def solve_n_queens(n):
    out, cols, down, up = [], set(), set(), set()
    def place(row, board):
        if row == n: out.append(board[:]); return
        for col in range(n):
            if col in cols or row-col in down or row+col in up: continue
            cols.add(col); down.add(row-col); up.add(row+col); board.append(col)
            place(row+1, board)
            board.pop(); cols.remove(col); down.remove(row-col); up.remove(row+col)
    place(0, [])
    return out`),
};
