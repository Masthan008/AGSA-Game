import { CodeSnippet } from '../../types';

export const ADVANCED_SNIPPETS: Record<string, CodeSnippet> = {
  fibonacci: {
    title: 'Fibonacci Heap (Decrease-Key & Extract-Min)',
    timeComplexity: 'decrease-key O(1) amortized • extract-min O(log N)',
    spaceComplexity: 'O(N)',
    explanationText:
      'Fibonacci heaps are lazy binomial-heap forests. Decrease-key simply cuts the node and marks its parent (cascading cuts), costing O(1) amortized \u2014 which accelerates Dijkstra/Prim to O(E + V log V). Extract-min merges equal-degree roots with an O(log N) bound.',
    cpp: `#include <iostream>
#include <vector>
#include <cmath>
#include <climits>
using namespace std;

struct FibNode {
    int key;
    int degree = 0;
    bool marked = false;
    FibNode* parent = nullptr;
    FibNode* child = nullptr;
    FibNode* left = this;
    FibNode* right = this;

    FibNode(int k) : key(k) {}
};

class FibonacciHeap {
    FibNode* minNode = nullptr;
    int size = 0;

    void insertIntoList(FibNode* head, FibNode* node) {
        if (!head) { node->left = node->right = node; return; }
        node->right = head->right;
        node->left = head;
        head->right->left = node;
        head->right = node;
    }

    void removeFromList(FibNode* node) {
        node->left->right = node->right;
        node->right->left = node->left;
    }

    void link(FibNode* y, FibNode* x) {  // y becomes child of x
        removeFromList(y);
        y->parent = x;
        y->marked = false;
        if (!x->child) x->child = y;
        else insertIntoList(x->child, y);
        x->degree++;
    }

public:
    FibNode* insert(int key) {
        FibNode* node = new FibNode(key);
        if (!minNode) {
            minNode = node;
        } else {
            insertIntoList(minNode, node);
            if (node->key < minNode->key) minNode = node;
        }
        size++;
        return node;
    }

    int getMin() { return minNode->key; }

    void consolidate() {
        int maxDegree = (int)(log2(size)) + 2;
        vector<FibNode*> degreeTable(maxDegree, nullptr);
        vector<FibNode*> roots;
        FibNode* cur = minNode;
        do { roots.push_back(cur); cur = cur->right; } while (cur != minNode);

        for (FibNode* w : roots) {
            FibNode* x = w;
            int d = x->degree;
            while (degreeTable[d]) {
                FibNode* y = degreeTable[d];
                if (x->key > y->key) swap(x, y);
                link(y, x);
                degreeTable[d] = nullptr;
                d++;
            }
            degreeTable[d] = x;
        }

        minNode = nullptr;
        for (FibNode* root : degreeTable) {
            if (root) {
                if (!minNode) minNode = root;
                else {
                    insertIntoList(minNode, root);
                    if (root->key < minNode->key) minNode = root;
                }
            }
        }
    }

    int extractMin() {
        FibNode* z = minNode;
        if (!z) return -1;

        FibNode* child = z->child;
        for (int i = 0; i < z->degree; i++) {
            FibNode* next = child->right;
            child->parent = nullptr;
            insertIntoList(z, child);  // move child to root list
            child = next;
        }
        removeFromList(z);
        if (z->right == z) {
            minNode = nullptr;
        } else {
            minNode = z->right;
            consolidate();
        }
        size--;
        int result = z->key;
        delete z;
        return result;
    }

    void decreaseKey(FibNode* x, int newKey) {
        if (newKey > x->key) return;
        x->key = newKey;
        FibNode* p = x->parent;
        if (p && x->key < p->key) {
            cut(x, p);
            cascadingCut(p);
        }
        if (x->key < minNode->key) minNode = x;
    }

    void cut(FibNode* x, FibNode* p) {
        removeFromList(x);
        p->degree--;
        if (p->child == x) p->child = x->right == x ? nullptr : x->right;
        x->parent = nullptr;
        x->marked = false;
        insertIntoList(minNode, x);
    }

    void cascadingCut(FibNode* y) {
        FibNode* p = y->parent;
        if (p) {
            if (!y->marked) {
                y->marked = true;
            } else {
                cut(y, p);
                cascadingCut(p);
            }
        }
    }
};`,
    python: `import math

class FibNode:
    def __init__(self, key):
        self.key = key
        self.degree = 0
        self.marked = False
        self.parent = None
        self.child = None
        self.left = self
        self.right = self

class FibonacciHeap:
    def __init__(self):
        self.min_node = None
        self.size = 0

    def _insert_into_list(self, head, node):
        if head is None:
            node.left = node.right = node
            return
        node.right = head.right
        node.left = head
        head.right.left = node
        head.right = node

    def _remove_from_list(self, node):
        node.left.right = node.right
        node.right.left = node.left

    def insert(self, key):
        node = FibNode(key)
        if self.min_node is None:
            self.min_node = node
        else:
            self._insert_into_list(self.min_node, node)
            if node.key < self.min_node.key:
                self.min_node = node
        self.size += 1
        return node

    def _link(self, y, x):
        self._remove_from_list(y)
        y.parent = x
        y.marked = False
        if x.child is None:
            x.child = y
        else:
            self._insert_into_list(x.child, y)
        x.degree += 1

    def consolidate(self):
        max_degree = int(math.log2(self.size)) + 2
        table = [None] * max_degree
        roots = []
        cur = self.min_node
        while True:
            roots.append(cur)
            cur = cur.right
            if cur == self.min_node:
                break

        for w in roots:
            x = w
            d = x.degree
            while table[d]:
                y = table[d]
                if x.key > y.key:
                    x, y = y, x
                self._link(y, x)
                table[d] = None
                d += 1
            table[d] = x

        self.min_node = None
        for root in table:
            if root:
                if self.min_node is None:
                    self.min_node = root
                else:
                    self._insert_into_list(self.min_node, root)
                    if root.key < self.min_node.key:
                        self.min_node = root

    def extract_min(self):
        z = self.min_node
        if z is None:
            return None
        child = z.child
        for _ in range(z.degree):
            nxt = child.right
            child.parent = None
            self._insert_into_list(z, child)
            child = nxt
        self._remove_from_list(z)
        if z.right == z:
            self.min_node = None
        else:
            self.min_node = z.right
            self.consolidate()
        self.size -= 1
        return z.key

    def decrease_key(self, x, new_key):
        if new_key > x.key:
            return
        x.key = new_key
        p = x.parent
        if p and x.key < p.key:
            self._cut(x, p)
            self._cascading_cut(p)
        if x.key < self.min_node.key:
            self.min_node = x

    def _cut(self, x, p):
        self._remove_from_list(x)
        p.degree -= 1
        if p.child == x:
            p.child = None if x.right == x else x.right
        x.parent = None
        x.marked = False
        self._insert_into_list(self.min_node, x)

    def _cascading_cut(self, y):
        p = y.parent
        if p:
            if not y.marked:
                y.marked = True
            else:
                self._cut(y, p)
                self._cascading_cut(p)`,
    javascript: `class FibNode {
  constructor(key) {
    this.key = key;
    this.degree = 0;
    this.marked = false;
    this.parent = null;
    this.child = null;
    this.left = this;
    this.right = this;
  }
}

class FibonacciHeap {
  constructor() {
    this.minNode = null;
    this.size = 0;
  }

  insertIntoList(head, node) {
    if (!head) { node.left = node.right = node; return; }
    node.right = head.right;
    node.left = head;
    head.right.left = node;
    head.right = node;
  }

  removeFromList(node) {
    node.left.right = node.right;
    node.right.left = node.left;
  }

  insert(key) {
    const node = new FibNode(key);
    if (!this.minNode) this.minNode = node;
    else {
      this.insertIntoList(this.minNode, node);
      if (node.key < this.minNode.key) this.minNode = node;
    }
    this.size++;
    return node;
  }

  link(y, x) {
    this.removeFromList(y);
    y.parent = x;
    y.marked = false;
    if (!x.child) x.child = y;
    else this.insertIntoList(x.child, y);
    x.degree++;
  }

  consolidate() {
    const maxDegree = Math.floor(Math.log2(this.size)) + 2;
    const table = new Array(maxDegree).fill(null);
    const roots = [];
    let cur = this.minNode;
    do { roots.push(cur); cur = cur.right; } while (cur !== this.minNode);

    for (const w of roots) {
      let x = w;
      let d = x.degree;
      while (table[d]) {
        let y = table[d];
        if (x.key > y.key) [x, y] = [y, x];
        this.link(y, x);
        table[d] = null;
        d++;
      }
      table[d] = x;
    }

    this.minNode = null;
    for (const root of table) {
      if (root) {
        if (!this.minNode) this.minNode = root;
        else {
          this.insertIntoList(this.minNode, root);
          if (root.key < this.minNode.key) this.minNode = root;
        }
      }
    }
  }

  extractMin() {
    const z = this.minNode;
    if (!z) return null;

    let child = z.child;
    for (let i = 0; i < z.degree; i++) {
      const next = child.right;
      child.parent = null;
      this.insertIntoList(z, child);
      child = next;
    }
    this.removeFromList(z);
    if (z.right === z) this.minNode = null;
    else { this.minNode = z.right; this.consolidate(); }
    this.size--;
    return z.key;
  }

  decreaseKey(x, newKey) {
    if (newKey > x.key) return;
    x.key = newKey;
    const p = x.parent;
    if (p && x.key < p.key) {
      this.cut(x, p);
      this.cascadingCut(p);
    }
    if (x.key < this.minNode.key) this.minNode = x;
  }

  cut(x, p) {
    this.removeFromList(x);
    p.degree--;
    if (p.child === x) p.child = x.right === x ? null : x.right;
    x.parent = null;
    x.marked = false;
    this.insertIntoList(this.minNode, x);
  }

  cascadingCut(y) {
    const p = y.parent;
    if (p) {
      if (!y.marked) y.marked = true;
      else { this.cut(y, p); this.cascadingCut(p); }
    }
  }
}`
  },
  convexhull: {
    title: 'Convex Hull (Graham Scan)',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    explanationText:
      'Graham Scan sorts points by polar angle (O(N log N)), then walks the points with a monotone stack, popping any point whose turn is not counter-clockwise. The stack holds the hull vertices, so the scan itself is linear.',
    cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Point {
    long long x, y;
    bool operator<(const Point& p) const {
        return x < p.x || (x == p.x && y < p.y);
    }
};

long long cross(const Point& o, const Point& a, const Point& b) {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

vector<Point> convexHull(vector<Point> pts) {
    sort(pts.begin(), pts.end());
    int n = pts.size();
    if (n <= 1) return pts;

    vector<Point> hull(2 * n);
    int k = 0;

    for (int i = 0; i < n; i++) {              // lower hull
        while (k >= 2 && cross(hull[k - 2], hull[k - 1], pts[i]) <= 0) k--;
        hull[k++] = pts[i];
    }
    for (int i = n - 2, t = k + 1; i >= 0; i--) {  // upper hull
        while (k >= t && cross(hull[k - 2], hull[k - 1], pts[i]) <= 0) k--;
        hull[k++] = pts[i];
    }

    hull.resize(k - 1);
    return hull;
}`,
    java: `import java.util.*;

public class ConvexHull {
    static class Point {
        long x, y;
        Point(long x, long y) { this.x = x; this.y = y; }
    }

    static long cross(Point o, Point a, Point b) {
        return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
    }

    static List<Point> convexHull(List<Point> pts) {
        pts.sort((a, b) -> a.x != b.x ? Long.compare(a.x, b.x) : Long.compare(a.y, b.y));
        int n = pts.size();
        if (n <= 1) return pts;

        List<Point> hull = new ArrayList<>();
        for (Point p : pts) {                       // lower hull
            while (hull.size() >= 2 &&
                   cross(hull.get(hull.size() - 2), hull.get(hull.size() - 1), p) <= 0)
                hull.remove(hull.size() - 1);
            hull.add(p);
        }
        int lowerSize = hull.size();
        for (int i = n - 2; i >= 0; i--) {          // upper hull
            Point p = pts.get(i);
            while (hull.size() > lowerSize &&
                   cross(hull.get(hull.size() - 2), hull.get(hull.size() - 1), p) <= 0)
                hull.remove(hull.size() - 1);
            hull.add(p);
        }
        hull.remove(hull.size() - 1);
        return hull;
    }
}`,
    python: `def cross(o, a, b):
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

def convex_hull(points):
    points = sorted(points)
    if len(points) <= 1:
        return points

    lower = []
    for p in points:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)

    upper = []
    for p in reversed(points):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)

    return lower[:-1] + upper[:-1]`,
    javascript: `function cross(o, a, b) {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

function convexHull(points) {
  points.sort((a, b) => (a.x !== b.x ? a.x - b.x : a.y - b.y));
  const n = points.length;
  if (n <= 1) return points;

  const hull = [];
  for (const p of points) {  // lower hull
    while (hull.length >= 2 && cross(hull[hull.length - 2], hull[hull.length - 1], p) <= 0) {
      hull.pop();
    }
    hull.push(p);
  }
  const lowerSize = hull.length;
  for (let i = n - 2; i >= 0; i--) {  // upper hull
    const p = points[i];
    while (hull.length > lowerSize && cross(hull[hull.length - 2], hull[hull.length - 1], p) <= 0) {
      hull.pop();
    }
    hull.push(p);
  }
  hull.pop();
  return hull;
}`
  },
  grandmaster: {
    title: 'Longest Increasing Subsequence (O(N log N))',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    explanationText:
      'Instead of the O(N\u00b2) DP, maintain a patience-sorting array \u201ctails\u201d where tails[i] is the smallest tail of an increasing subsequence of length i+1. Binary search (upper_bound) finds the insertion spot, giving O(N log N) \u2014 the grandmaster classic.',
    cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int lengthOfLIS(const vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) {
            tails.push_back(x);
        } else {
            *it = x;
        }
    }
    return tails.size();
}`,
    java: `import java.util.*;

public class LIS {
    static int lengthOfLIS(int[] nums) {
        int[] tails = new int[nums.length];
        int len = 0;

        for (int x : nums) {
            int pos = Arrays.binarySearch(tails, 0, len, x);
            if (pos < 0) pos = -(pos + 1);
            tails[pos] = x;
            if (pos == len) len++;
        }
        return len;
    }
}`,
    python: `from bisect import bisect_left

def length_of_lis(nums):
    tails = []
    for x in nums:
        i = bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return len(tails)`,
    javascript: `function lengthOfLIS(nums) {
  const tails = [];
  for (const x of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {  // lower_bound
      const mid = Math.floor((lo + hi) / 2);
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    if (lo === tails.length) tails.push(x);
    else tails[lo] = x;
  }
  return tails.length;
}`
  }
};
