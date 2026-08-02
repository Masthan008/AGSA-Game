import { CodeSnippet } from '../../types';

export const GRAPH_SNIPPETS: Record<string, CodeSnippet> = {
  bfsdfs: {
    title: 'BFS & DFS Graph Traversal',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    explanationText:
      'BFS explores level by level using a queue, guaranteeing shortest paths in unweighted graphs. DFS dives deep using a stack (or recursion). Both visit every vertex and edge exactly once, giving O(V + E).',
    cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

void bfs(const vector<vector<int>>& adj, int start) {
    vector<bool> visited(adj.size(), false);
    queue<int> q;
    visited[start] = true;
    q.push(start);

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        cout << u << " ";
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}

void dfs(const vector<vector<int>>& adj, vector<bool>& visited, int u) {
    visited[u] = true;
    cout << u << " ";
    for (int v : adj[u]) {
        if (!visited[v]) dfs(adj, visited, v);
    }
}`,
    java: `import java.util.*;

public class GraphTraversal {
    static void bfs(List<List<Integer>> adj, int start) {
        boolean[] visited = new boolean[adj.size()];
        Queue<Integer> q = new LinkedList<>();
        visited[start] = true;
        q.add(start);
        while (!q.isEmpty()) {
            int u = q.poll();
            System.out.print(u + " ");
            for (int v : adj.get(u)) {
                if (!visited[v]) {
                    visited[v] = true;
                    q.add(v);
                }
            }
        }
    }

    static void dfs(List<List<Integer>> adj, boolean[] visited, int u) {
        visited[u] = true;
        System.out.print(u + " ");
        for (int v : adj.get(u)) {
            if (!visited[v]) dfs(adj, visited, v);
        }
    }
}`,
    python: `from collections import deque

def bfs(adj, start):
    visited = [False] * len(adj)
    queue = deque([start])
    visited[start] = True
    while queue:
        u = queue.popleft()
        print(u, end=" ")
        for v in adj[u]:
            if not visited[v]:
                visited[v] = True
                queue.append(v)

def dfs(adj, visited, u):
    visited[u] = True
    print(u, end=" ")
    for v in adj[u]:
        if not visited[v]:
            dfs(adj, visited, v)`,
    javascript: `function bfs(adj, start) {
  const visited = new Array(adj.length).fill(false);
  const queue = [start];
  visited[start] = true;
  while (queue.length) {
    const u = queue.shift();
    console.log(u);
    for (const v of adj[u]) {
      if (!visited[v]) {
        visited[v] = true;
        queue.push(v);
      }
    }
  }
}

function dfs(adj, visited, u) {
  visited[u] = true;
  console.log(u);
  for (const v of adj[u]) {
    if (!visited[v]) dfs(adj, visited, v);
  }
}`
  },
  dijkstra: {
    title: "Dijkstra's Shortest Path",
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V + E)',
    explanationText:
      'Dijkstra greedily extracts the unvisited vertex with the smallest tentative distance and relaxes its edges using a min-heap. The greedy choice is valid only for non-negative edge weights, giving O((V+E) log V).',
    cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

typedef pair<int, int> PII;

vector<int> dijkstra(int src, const vector<vector<PII>>& adj) {
    int n = adj.size();
    vector<int> dist(n, INT_MAX);
    dist[src] = 0;

    priority_queue<PII, vector<PII>, greater<PII>> pq;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;

        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
    java: `import java.util.*;

public class Dijkstra {
    public static int[] dijkstra(int src, List<List<int[]>> adj) {
        int n = adj.size();
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.add(new int[]{0, src});

        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            int d = top[0], u = top[1];
            if (d > dist[u]) continue;

            for (int[] edge : adj.get(u)) {
                int v = edge[0], w = edge[1];
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.add(new int[]{dist[v], v});
                }
            }
        }
        return dist;
    }
}`,
    python: `import heapq

def dijkstra(src, adj):
    n = len(adj)
    dist = [float("inf")] * n
    dist[src] = 0
    pq = [(0, src)]

    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
    return dist`,
    javascript: `function dijkstra(src, adj) {
  const n = adj.length;
  const dist = new Array(n).fill(Infinity);
  dist[src] = 0;

  const pq = [[0, src]];
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift();
    if (d > dist[u]) continue;

    for (const [v, w] of adj[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        pq.push([dist[v], v]);
      }
    }
  }
  return dist;
}`
  },
  bellmanford: {
    title: 'Bellman-Ford Shortest Path',
    timeComplexity: 'O(V × E)',
    spaceComplexity: 'O(V)',
    explanationText:
      'Bellman-Ford relaxes every edge V\u22121 times. Since any simple shortest path uses at most V\u22121 edges, this guarantees correctness even with negative weights \u2014 and a final relaxation pass detects negative cycles.',
    cpp: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

struct Edge { int u, v, w; };

vector<int> bellmanFord(int src, int V, const vector<Edge>& edges) {
    vector<int> dist(V, INT_MAX);
    dist[src] = 0;

    for (int i = 0; i < V - 1; i++) {
        bool updated = false;
        for (const Edge& e : edges) {
            if (dist[e.u] != INT_MAX && dist[e.u] + e.w < dist[e.v]) {
                dist[e.v] = dist[e.u] + e.w;
                updated = true;
            }
        }
        if (!updated) break;
    }

    for (const Edge& e : edges) {
        if (dist[e.u] != INT_MAX && dist[e.u] + e.w < dist[e.v])
            cout << "Negative weight cycle detected!" << endl;
    }
    return dist;
}`,
    java: `import java.util.*;

public class BellmanFord {
    static class Edge { int u, v, w; Edge(int a, int b, int c) { u = a; v = b; w = c; } }

    static int[] bellmanFord(int src, int V, List<Edge> edges) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;

        for (int i = 0; i < V - 1; i++) {
            boolean updated = false;
            for (Edge e : edges) {
                if (dist[e.u] != Integer.MAX_VALUE && dist[e.u] + e.w < dist[e.v]) {
                    dist[e.v] = dist[e.u] + e.w;
                    updated = true;
                }
            }
            if (!updated) break;
        }

        for (Edge e : edges) {
            if (dist[e.u] != Integer.MAX_VALUE && dist[e.u] + e.w < dist[e.v])
                System.out.println("Negative weight cycle detected!");
        }
        return dist;
    }
}`,
    python: `def bellman_ford(src, V, edges):
    dist = [float("inf")] * V
    dist[src] = 0

    for _ in range(V - 1):
        updated = False
        for u, v, w in edges:
            if dist[u] != float("inf") and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                updated = True
        if not updated:
            break

    for u, v, w in edges:
        if dist[u] != float("inf") and dist[u] + w < dist[v]:
            print("Negative weight cycle detected!")
    return dist`,
    javascript: `function bellmanFord(src, V, edges) {
  const dist = new Array(V).fill(Infinity);
  dist[src] = 0;

  for (let i = 0; i < V - 1; i++) {
    let updated = false;
    for (const [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        updated = true;
      }
    }
    if (!updated) break;
  }

  for (const [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      console.log('Negative weight cycle detected!');
    }
  }
  return dist;
}`
  },
  mst: {
    title: "Kruskal's MST Algorithm",
    timeComplexity: 'O(E log E)',
    spaceComplexity: 'O(V + E)',
    explanationText:
      "Kruskal's sorts all edges by weight and greedily adds an edge only if it doesn't form a cycle, tracked with Disjoint Set Union. Sorting dominates, giving O(E log E). Works best on sparse graphs.",
    cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Edge { int u, v, w; };

class DSU {
    vector<int> parent, rank;
public:
    DSU(int n) {
        parent.resize(n);
        rank.assign(n, 0);
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (rank[a] < rank[b]) swap(a, b);
        parent[b] = a;
        if (rank[a] == rank[b]) rank[a]++;
        return true;
    }
};

long long kruskal(int V, vector<Edge> edges) {
    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) {
        return a.w < b.w;
    });
    DSU dsu(V);
    long long total = 0;
    for (const Edge& e : edges) {
        if (dsu.unite(e.u, e.v)) total += e.w;
    }
    return total;
}`,
    java: `import java.util.*;

public class Kruskal {
    static class Edge implements Comparable<Edge> {
        int u, v, w;
        Edge(int a, int b, int c) { u = a; v = b; w = c; }
        public int compareTo(Edge o) { return this.w - o.w; }
    }

    static class DSU {
        int[] parent, rank;
        DSU(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) parent[i] = i;
        }
        int find(int x) {
            if (parent[x] != x) parent[x] = find(parent[x]);
            return parent[x];
        }
        boolean unite(int a, int b) {
            a = find(a); b = find(b);
            if (a == b) return false;
            if (rank[a] < rank[b]) { int t = a; a = b; b = t; }
            parent[b] = a;
            if (rank[a] == rank[b]) rank[a]++;
            return true;
        }
    }

    static long kruskal(int V, List<Edge> edges) {
        Collections.sort(edges);
        DSU dsu = new DSU(V);
        long total = 0;
        for (Edge e : edges) {
            if (dsu.unite(e.u, e.v)) total += e.w;
        }
        return total;
    }
}`,
    python: `class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def unite(self, a, b):
        a, b = self.find(a), self.find(b)
        if a == b:
            return False
        if self.rank[a] < self.rank[b]:
            a, b = b, a
        self.parent[b] = a
        if self.rank[a] == self.rank[b]:
            self.rank[a] += 1
        return True

def kruskal(V, edges):
    edges.sort(key=lambda e: e[2])
    dsu = DSU(V)
    total = 0
    for u, v, w in edges:
        if dsu.unite(u, v):
            total += w
    return total`,
    javascript: `class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }
  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }
  unite(a, b) {
    a = this.find(a); b = this.find(b);
    if (a === b) return false;
    if (this.rank[a] < this.rank[b]) [a, b] = [b, a];
    this.parent[b] = a;
    if (this.rank[a] === this.rank[b]) this.rank[a]++;
    return true;
  }
}

function kruskal(V, edges) {
  edges.sort((a, b) => a[2] - b[2]);
  const dsu = new DSU(V);
  let total = 0;
  for (const [u, v, w] of edges) {
    if (dsu.unite(u, v)) total += w;
  }
  return total;
}`
  },
  tarjan: {
    title: "Tarjan's Strongly Connected Components",
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    explanationText:
      'Tarjan\u2019s SCC algorithm runs a single DFS while tracking discovery times and \u201clow-link\u201d values. When low[u] == disc[u], u roots a new SCC. Every vertex and edge is visited once, so the total is O(V + E).',
    cpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

vector<vector<int>> sccs;
int timer = 0;

void tarjanDFS(int u, const vector<vector<int>>& adj,
               vector<int>& disc, vector<int>& low, vector<bool>& inStack, stack<int>& st) {
    disc[u] = low[u] = ++timer;
    st.push(u);
    inStack[u] = true;

    for (int v : adj[u]) {
        if (disc[v] == -1) {
            tarjanDFS(v, adj, disc, low, inStack, st);
            low[u] = min(low[u], low[v]);
        } else if (inStack[v]) {
            low[u] = min(low[u], disc[v]);
        }
    }

    if (low[u] == disc[u]) {
        vector<int> comp;
        while (true) {
            int v = st.top();
            st.pop();
            inStack[v] = false;
            comp.push_back(v);
            if (v == u) break;
        }
        sccs.push_back(comp);
    }
}

vector<vector<int>> tarjanSCC(int n, const vector<vector<int>>& adj) {
    vector<int> disc(n, -1), low(n, 0);
    vector<bool> inStack(n, false);
    stack<int> st;
    for (int i = 0; i < n; i++) {
        if (disc[i] == -1) tarjanDFS(i, adj, disc, low, inStack, st);
    }
    return sccs;
}`,
    java: `import java.util.*;

public class TarjanSCC {
    static int timer = 0;
    static List<List<Integer>> sccs = new ArrayList<>();
    static Stack<Integer> stack = new Stack<>();

    static void dfs(int u, List<List<Integer>> adj, int[] disc, int[] low, boolean[] inStack) {
        disc[u] = low[u] = ++timer;
        stack.push(u);
        inStack[u] = true;

        for (int v : adj.get(u)) {
            if (disc[v] == -1) {
                dfs(v, adj, disc, low, inStack);
                low[u] = Math.min(low[u], low[v]);
            } else if (inStack[v]) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }

        if (low[u] == disc[u]) {
            List<Integer> comp = new ArrayList<>();
            while (true) {
                int v = stack.pop();
                inStack[v] = false;
                comp.add(v);
                if (v == u) break;
            }
            sccs.add(comp);
        }
    }

    static List<List<Integer>> tarjanSCC(int n, List<List<Integer>> adj) {
        int[] disc = new int[n];
        Arrays.fill(disc, -1);
        int[] low = new int[n];
        boolean[] inStack = new boolean[n];
        for (int i = 0; i < n; i++) {
            if (disc[i] == -1) dfs(i, adj, disc, low, inStack);
        }
        return sccs;
    }
}`,
    python: `def tarjan_scc(n, adj):
    disc = [-1] * n
    low = [0] * n
    in_stack = [False] * n
    stack = []
    sccs = []
    timer = 0

    def dfs(u):
        nonlocal timer
        timer += 1
        disc[u] = low[u] = timer
        stack.append(u)
        in_stack[u] = True

        for v in adj[u]:
            if disc[v] == -1:
                dfs(v)
                low[u] = min(low[u], low[v])
            elif in_stack[v]:
                low[u] = min(low[u], disc[v])

        if low[u] == disc[u]:
            comp = []
            while True:
                v = stack.pop()
                in_stack[v] = False
                comp.append(v)
                if v == u:
                    break
            sccs.append(comp)

    for i in range(n):
        if disc[i] == -1:
            dfs(i)
    return sccs`,
    javascript: `function tarjanSCC(n, adj) {
  const disc = new Array(n).fill(-1);
  const low = new Array(n).fill(0);
  const inStack = new Array(n).fill(false);
  const stack = [];
  const sccs = [];
  let timer = 0;

  function dfs(u) {
    disc[u] = low[u] = ++timer;
    stack.push(u);
    inStack[u] = true;

    for (const v of adj[u]) {
      if (disc[v] === -1) {
        dfs(v);
        low[u] = Math.min(low[u], low[v]);
      } else if (inStack[v]) {
        low[u] = Math.min(low[u], disc[v]);
      }
    }

    if (low[u] === disc[u]) {
      const comp = [];
      let v;
      do {
        v = stack.pop();
        inStack[v] = false;
        comp.push(v);
      } while (v !== u);
      sccs.push(comp);
    }
  }

  for (let i = 0; i < n; i++) {
    if (disc[i] === -1) dfs(i);
  }
  return sccs;
}`
  },
  floydwarshall: {
    title: 'Floyd-Warshall All-Pairs Shortest Path',
    timeComplexity: 'O(V³)',
    spaceComplexity: 'O(V²)',
    explanationText:
      'Floyd-Warshall incrementally allows vertex k as an intermediate hop for every pair (i, j). Three nested loops over V vertices make it O(V\u00b3), which is best for dense graphs and detecting negative cycles.',
    cpp: `#include <iostream>
#include <vector>
using namespace std;

const int INF = 1e9;

vector<vector<int>> floydWarshall(vector<vector<int>> dist, int V) {
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] != INF && dist[k][j] != INF)
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
            }
        }
    }

    for (int i = 0; i < V; i++) {
        if (dist[i][i] < 0)
            cout << "Negative weight cycle detected!" << endl;
    }
    return dist;
}`,
    java: `import java.util.*;

public class FloydWarshall {
    static final int INF = 1_000_000_000;

    static int[][] floydWarshall(int[][] dist, int V) {
        for (int k = 0; k < V; k++) {
            for (int i = 0; i < V; i++) {
                for (int j = 0; j < V; j++) {
                    if (dist[i][k] != INF && dist[k][j] != INF)
                        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }

        for (int i = 0; i < V; i++) {
            if (dist[i][i] < 0)
                System.out.println("Negative weight cycle detected!");
        }
        return dist;
    }
}`,
    python: `def floyd_warshall(dist, V):
    INF = float("inf")
    for k in range(V):
        for i in range(V):
            for j in range(V):
                if dist[i][k] != INF and dist[k][j] != INF:
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])

    for i in range(V):
        if dist[i][i] < 0:
            print("Negative weight cycle detected!")
    return dist`,
    javascript: `function floydWarshall(dist, V) {
  for (let k = 0; k < V; k++) {
    for (let i = 0; i < V; i++) {
      for (let j = 0; j < V; j++) {
        if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
          dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
        }
      }
    }
  }
  for (let i = 0; i < V; i++) {
    if (dist[i][i] < 0) console.log('Negative weight cycle detected!');
  }
  return dist;
}`
  },
  dsu: {
    title: 'Disjoint Set Union (Union-Find)',
    timeComplexity: 'O(α(N)) ≈ O(1) amortized',
    spaceComplexity: 'O(N)',
    explanationText:
      'Union-Find tracks connected components. Path compression flattens trees during find, and union by rank keeps trees shallow. Together they yield the inverse-Ackermann O(\u03b1(N)) amortized bound \u2014 effectively constant.',
    cpp: `#include <vector>
using namespace std;

class DSU {
    vector<int> parent, rank;

public:
    DSU(int n) {
        parent.resize(n);
        rank.assign(n, 0);
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);  // path compression
        return parent[x];
    }

    bool unite(int a, int b) {
        a = find(a);
        b = find(b);
        if (a == b) return false;

        if (rank[a] < rank[b]) swap(a, b);  // union by rank
        parent[b] = a;
        if (rank[a] == rank[b]) rank[a]++;
        return true;
    }

    bool connected(int a, int b) { return find(a) == find(b); }
};`,
    java: `public class DSU {
    int[] parent, rank;

    public DSU(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }

    boolean unite(int a, int b) {
        a = find(a);
        b = find(b);
        if (a == b) return false;
        if (rank[a] < rank[b]) { int t = a; a = b; b = t; }
        parent[b] = a;
        if (rank[a] == rank[b]) rank[a]++;
        return true;
    }

    boolean connected(int a, int b) { return find(a) == find(b); }
}`,
    python: `class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def unite(self, a, b):
        a, b = self.find(a), self.find(b)
        if a == b:
            return False
        if self.rank[a] < self.rank[b]:
            a, b = b, a
        self.parent[b] = a
        if self.rank[a] == self.rank[b]:
            self.rank[a] += 1
        return True

    def connected(self, a, b):
        return self.find(a) == self.find(b)`,
    javascript: `class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }

  unite(a, b) {
    a = this.find(a);
    b = this.find(b);
    if (a === b) return false;
    if (this.rank[a] < this.rank[b]) [a, b] = [b, a];
    this.parent[b] = a;
    if (this.rank[a] === this.rank[b]) this.rank[a]++;
    return true;
  }

  connected(a, b) { return this.find(a) === this.find(b); }
}`
  },
  astar: {
    title: 'A* Search Algorithm',
    timeComplexity: 'O(E log V) typical',
    spaceComplexity: 'O(V)',
    explanationText:
      'A* extends Dijkstra with a heuristic h(n) that estimates the cost to the goal. Priority is f(n) = g(n) + h(n). With an admissible (never overestimating) heuristic, A* is guaranteed optimal and usually much faster than plain Dijkstra.',
    cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
#include <climits>
using namespace std;

typedef pair<int, int> PII;

int astar(int start, int goal,
          const vector<vector<PII>>& adj,
          unordered_map<int, int> heuristic) {
    priority_queue<PII, vector<PII>, greater<PII>> open;
    unordered_map<int, int> gScore;
    gScore[start] = 0;
    open.push({heuristic[start], start});

    while (!open.empty()) {
        auto [f, u] = open.top();
        open.pop();
        if (u == goal) return gScore[u];

        for (auto [v, w] : adj[u]) {
            int tentative = gScore[u] + w;
            if (gScore.find(v) == gScore.end() || tentative < gScore[v]) {
                gScore[v] = tentative;
                open.push({tentative + heuristic[v], v});
            }
        }
    }
    return -1;  // goal unreachable
}`,
    java: `import java.util.*;

public class AStar {
    static int astar(int start, int goal,
                     List<List<int[]>> adj, Map<Integer, Integer> heuristic) {
        PriorityQueue<int[]> open = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        Map<Integer, Integer> gScore = new HashMap<>();
        gScore.put(start, 0);
        open.add(new int[]{heuristic.get(start), start});

        while (!open.isEmpty()) {
            int[] top = open.poll();
            int f = top[0], u = top[1];
            if (u == goal) return gScore.get(u);

            for (int[] edge : adj.get(u)) {
                int v = edge[0], w = edge[1];
                int tentative = gScore.get(u) + w;
                if (!gScore.containsKey(v) || tentative < gScore.get(v)) {
                    gScore.put(v, tentative);
                    open.add(new int[]{tentative + heuristic.getOrDefault(v, 0), v});
                }
            }
        }
        return -1;
    }
}`,
    python: `import heapq

def astar(start, goal, adj, heuristic):
    g_score = {start: 0}
    open_set = [(heuristic(start), start)]

    while open_set:
        f, u = heapq.heappop(open_set)
        if u == goal:
            return g_score[u]

        for v, w in adj[u]:
            tentative = g_score[u] + w
            if v not in g_score or tentative < g_score[v]:
                g_score[v] = tentative
                heapq.heappush(open_set, (tentative + heuristic(v), v))
    return -1`,
    javascript: `function astar(start, goal, adj, heuristic) {
  const gScore = new Map([[start, 0]]);
  const open = [[heuristic(start), start]];

  while (open.length) {
    open.sort((a, b) => a[0] - b[0]);
    const [f, u] = open.shift();
    if (u === goal) return gScore.get(u);

    for (const [v, w] of adj[u]) {
      const tentative = gScore.get(u) + w;
      if (!gScore.has(v) || tentative < gScore.get(v)) {
        gScore.set(v, tentative);
        open.push([tentative + heuristic(v), v]);
      }
    }
  }
  return -1;
}`
  },
  hld: {
    title: 'Heavy-Light Decomposition',
    timeComplexity: 'O(log² N) per path query',
    spaceComplexity: 'O(N)',
    explanationText:
      'HLD splits a tree into \u201cheavy\u201d chains, mapping each chain to a contiguous segment in a segment tree or Fenwick tree. Any root-to-node path decomposes into O(log N) chains, so queries and updates run in O(log\u00b2 N).',
    cpp: `#include <iostream>
#include <vector>
using namespace std;

struct HLD {
    vector<vector<int>> adj;
    vector<int> parent, depth, heavy, head, pos, size;
    vector<int> tree;  // segment tree over positions
    int curPos;

    HLD(int n) : adj(n), parent(n, -1), depth(n), heavy(n, -1),
                 head(n), pos(n), size(n), tree(4 * n, 0), curPos(0) {}

    int dfsSize(int u) {
        int sz = 1, maxSub = 0;
        for (int v : adj[u]) {
            if (v == parent[u]) continue;
            parent[v] = u;
            depth[v] = depth[u] + 1;
            int sub = dfsSize(v);
            if (sub > maxSub) { maxSub = sub; heavy[u] = v; }
            sz += sub;
        }
        return size[u] = sz;
    }

    void decompose(int u, int h) {
        head[u] = h;
        pos[u] = curPos++;
        if (heavy[u] != -1) decompose(heavy[u], h);
        for (int v : adj[u]) {
            if (v != parent[u] && v != heavy[u]) decompose(v, v);
        }
    }

    void updateTree(int node, int l, int r, int idx, int val) {
        if (l == r) { tree[node] = val; return; }
        int mid = (l + r) / 2;
        if (idx <= mid) updateTree(2 * node, l, mid, idx, val);
        else updateTree(2 * node + 1, mid + 1, r, idx, val);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    int queryTree(int node, int l, int r, int ql, int qr) {
        if (ql > r || qr < l) return 0;
        if (ql <= l && r <= qr) return tree[node];
        int mid = (l + r) / 2;
        return queryTree(2 * node, l, mid, ql, qr) +
               queryTree(2 * node + 1, mid + 1, r, ql, qr);
    }

    int pathQuery(int u, int v) {
        int res = 0;
        while (head[u] != head[v]) {
            if (depth[head[u]] < depth[head[v]]) swap(u, v);
            res += queryTree(1, 0, curPos - 1, pos[head[u]], pos[u]);
            u = parent[head[u]];
        }
        if (depth[u] > depth[v]) swap(u, v);
        res += queryTree(1, 0, curPos - 1, pos[u], pos[v]);
        return res;
    }
};`,
    java: `import java.util.*;

public class HLD {
    List<List<Integer>> adj;
    int[] parent, depth, heavy, head, pos, size, tree;
    int curPos;

    HLD(int n) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        parent = new int[n]; depth = new int[n]; heavy = new int[n];
        head = new int[n]; pos = new int[n]; size = new int[n];
        tree = new int[4 * n];
        Arrays.fill(parent, -1);
        Arrays.fill(heavy, -1);
        curPos = 0;
    }

    int dfsSize(int u) {
        int sz = 1, maxSub = 0;
        for (int v : adj.get(u)) {
            if (v == parent[u]) continue;
            parent[v] = u;
            depth[v] = depth[u] + 1;
            int sub = dfsSize(v);
            if (sub > maxSub) { maxSub = sub; heavy[u] = v; }
            sz += sub;
        }
        size[u] = sz;
        return sz;
    }

    void decompose(int u, int h) {
        head[u] = h;
        pos[u] = curPos++;
        if (heavy[u] != -1) decompose(heavy[u], h);
        for (int v : adj.get(u)) {
            if (v != parent[u] && v != heavy[u]) decompose(v, v);
        }
    }
}`,
    python: `class HLD:
    def __init__(self, n):
        self.n = n
        self.adj = [[] for _ in range(n)]
        self.parent = [-1] * n
        self.depth = [0] * n
        self.heavy = [-1] * n
        self.head = [0] * n
        self.pos = [0] * n
        self.size = [0] * n
        self.cur_pos = 0

    def dfs_size(self, u):
        sz = 1
        max_sub = 0
        for v in self.adj[u]:
            if v == self.parent[u]:
                continue
            self.parent[v] = u
            self.depth[v] = self.depth[u] + 1
            sub = self.dfs_size(v)
            if sub > max_sub:
                max_sub = sub
                self.heavy[u] = v
            sz += sub
        self.size[u] = sz
        return sz

    def decompose(self, u, h):
        self.head[u] = h
        self.pos[u] = self.cur_pos
        self.cur_pos += 1
        if self.heavy[u] != -1:
            self.decompose(self.heavy[u], h)
        for v in self.adj[u]:
            if v != self.parent[u] and v != self.heavy[u]:
                self.decompose(v, v)`,
    javascript: `class HLD {
  constructor(n) {
    this.n = n;
    this.adj = Array.from({ length: n }, () => []);
    this.parent = new Array(n).fill(-1);
    this.depth = new Array(n).fill(0);
    this.heavy = new Array(n).fill(-1);
    this.head = new Array(n).fill(0);
    this.pos = new Array(n).fill(0);
    this.size = new Array(n).fill(0);
    this.curPos = 0;
  }

  dfsSize(u) {
    let sz = 1, maxSub = 0;
    for (const v of this.adj[u]) {
      if (v === this.parent[u]) continue;
      this.parent[v] = u;
      this.depth[v] = this.depth[u] + 1;
      const sub = this.dfsSize(v);
      if (sub > maxSub) { maxSub = sub; this.heavy[u] = v; }
      sz += sub;
    }
    this.size[u] = sz;
    return sz;
  }

  decompose(u, h) {
    this.head[u] = h;
    this.pos[u] = this.curPos++;
    if (this.heavy[u] !== -1) this.decompose(this.heavy[u], h);
    for (const v of this.adj[u]) {
      if (v !== this.parent[u] && v !== this.heavy[u]) this.decompose(v, v);
    }
  }
}`
  },
  maxflow: {
    title: 'Dinic\'s Max Flow Algorithm',
    timeComplexity: 'O(V²E) worst • O(E√V) unit capacities',
    spaceComplexity: 'O(V + E)',
    explanationText:
      'Dinic\u2019s algorithm repeatedly builds a level graph with BFS and sends blocking flow with DFS. Each blocking flow phase saturates at least one shortest path, so at most V phases run \u2014 giving O(V\u00b2E) worst case.',
    cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

struct Edge { int to, cap, flow; };

class Dinic {
    vector<vector<int>> g;
    vector<Edge> edges;
    vector<int> level, ptr;

public:
    Dinic(int n) : g(n), level(n), ptr(n) {}

    void addEdge(int u, int v, int cap) {
        g[u].push_back(edges.size());
        edges.push_back({v, cap, 0});
        g[v].push_back(edges.size());
        edges.push_back({u, 0, 0});
    }

    bool bfs(int s, int t) {
        fill(level.begin(), level.end(), -1);
        queue<int> q;
        level[s] = 0;
        q.push(s);
        while (!q.empty()) {
            int u = q.front();
            q.pop();
            for (int id : g[u]) {
                Edge& e = edges[id];
                if (e.cap - e.flow > 0 && level[e.to] == -1) {
                    level[e.to] = level[u] + 1;
                    q.push(e.to);
                }
            }
        }
        return level[t] != -1;
    }

    int dfs(int u, int t, int pushed) {
        if (pushed == 0 || u == t) return pushed;
        for (int& cid = ptr[u]; cid < g[u].size(); cid++) {
            int id = g[u][cid];
            Edge& e = edges[id];
            if (level[e.to] != level[u] + 1 || e.cap - e.flow == 0) continue;
            int tr = dfs(e.to, t, min(pushed, e.cap - e.flow));
            if (tr == 0) continue;
            e.flow += tr;
            edges[id ^ 1].flow -= tr;
            return tr;
        }
        return 0;
    }

    int maxFlow(int s, int t) {
        int flow = 0;
        while (bfs(s, t)) {
            fill(ptr.begin(), ptr.end(), 0);
            while (int pushed = dfs(s, t, INT_MAX)) flow += pushed;
        }
        return flow;
    }
};`,
    java: `import java.util.*;

public class Dinic {
    static class Edge { int to, cap, flow; Edge(int t, int c) { to = t; cap = c; } }

    List<Integer>[] g;
    List<Edge> edges = new ArrayList<>();
    int[] level, ptr;

    @SuppressWarnings("unchecked")
    Dinic(int n) {
        g = new List[n];
        for (int i = 0; i < n; i++) g[i] = new ArrayList<>();
        level = new int[n];
        ptr = new int[n];
    }

    void addEdge(int u, int v, int cap) {
        g[u].add(edges.size());
        edges.add(new Edge(v, cap));
        g[v].add(edges.size());
        edges.add(new Edge(u, 0));
    }

    boolean bfs(int s, int t) {
        Arrays.fill(level, -1);
        Queue<Integer> q = new LinkedList<>();
        level[s] = 0;
        q.add(s);
        while (!q.isEmpty()) {
            int u = q.poll();
            for (int id : g[u]) {
                Edge e = edges.get(id);
                if (e.cap - e.flow > 0 && level[e.to] == -1) {
                    level[e.to] = level[u] + 1;
                    q.add(e.to);
                }
            }
        }
        return level[t] != -1;
    }

    int dfs(int u, int t, int pushed) {
        if (pushed == 0 || u == t) return pushed;
        for (; ptr[u] < g[u].size(); ptr[u]++) {
            Edge e = edges.get(g[u].get(ptr[u]));
            if (level[e.to] != level[u] + 1 || e.cap - e.flow == 0) continue;
            int tr = dfs(e.to, t, Math.min(pushed, e.cap - e.flow));
            if (tr == 0) continue;
            e.flow += tr;
            edges.get(g[u].get(ptr[u]) ^ 1).flow -= tr;
            return tr;
        }
        return 0;
    }

    int maxFlow(int s, int t) {
        int flow = 0;
        while (bfs(s, t)) {
            Arrays.fill(ptr, 0);
            int pushed;
            while ((pushed = dfs(s, t, Integer.MAX_VALUE)) > 0) flow += pushed;
        }
        return flow;
    }
}`,
    python: `from collections import deque

class Dinic:
    def __init__(self, n):
        self.n = n
        self.g = [[] for _ in range(n)]
        self.edges = []

    def add_edge(self, u, v, cap):
        self.g[u].append(len(self.edges))
        self.edges.append([v, cap, 0])
        self.g[v].append(len(self.edges))
        self.edges.append([u, 0, 0])

    def bfs(self, s, t):
        self.level = [-1] * self.n
        self.level[s] = 0
        q = deque([s])
        while q:
            u = q.popleft()
            for eid in self.g[u]:
                v, cap, flow = self.edges[eid]
                if cap - flow > 0 and self.level[v] == -1:
                    self.level[v] = self.level[u] + 1
                    q.append(v)
        return self.level[t] != -1

    def dfs(self, u, t, pushed):
        if pushed == 0 or u == t:
            return pushed
        while self.ptr[u] < len(self.g[u]):
            eid = self.g[u][self.ptr[u]]
            v, cap, flow = self.edges[eid]
            if self.level[v] == self.level[u] + 1 and cap - flow > 0:
                tr = self.dfs(v, t, min(pushed, cap - flow))
                if tr > 0:
                    self.edges[eid][2] += tr
                    self.edges[eid ^ 1][2] -= tr
                    return tr
            self.ptr[u] += 1
        return 0

    def max_flow(self, s, t):
        flow = 0
        while self.bfs(s, t):
            self.ptr = [0] * self.n
            while True:
                pushed = self.dfs(s, t, float("inf"))
                if pushed == 0:
                    break
                flow += pushed
        return flow`,
    javascript: `class Dinic {
  constructor(n) {
    this.n = n;
    this.g = Array.from({ length: n }, () => []);
    this.edges = [];
  }

  addEdge(u, v, cap) {
    this.g[u].push(this.edges.length);
    this.edges.push([v, cap, 0]);
    this.g[v].push(this.edges.length);
    this.edges.push([u, 0, 0]);
  }

  bfs(s, t) {
    this.level = new Array(this.n).fill(-1);
    this.level[s] = 0;
    const q = [s];
    while (q.length) {
      const u = q.shift();
      for (const eid of this.g[u]) {
        const [v, cap, flow] = this.edges[eid];
        if (cap - flow > 0 && this.level[v] === -1) {
          this.level[v] = this.level[u] + 1;
          q.push(v);
        }
      }
    }
    return this.level[t] !== -1;
  }

  dfs(u, t, pushed) {
    if (pushed === 0 || u === t) return pushed;
    while (this.ptr[u] < this.g[u].length) {
      const eid = this.g[u][this.ptr[u]];
      const [v, cap, flow] = this.edges[eid];
      if (this.level[v] === this.level[u] + 1 && cap - flow > 0) {
        const tr = this.dfs(v, t, Math.min(pushed, cap - flow));
        if (tr > 0) {
          this.edges[eid][2] += tr;
          this.edges[eid ^ 1][2] -= tr;
          return tr;
        }
      }
      this.ptr[u]++;
    }
    return 0;
  }

  maxFlow(s, t) {
    let flow = 0;
    while (this.bfs(s, t)) {
      this.ptr = new Array(this.n).fill(0);
      let pushed;
      while ((pushed = this.dfs(s, t, Infinity)) > 0) flow += pushed;
    }
    return flow;
  }
}`
  }
};
