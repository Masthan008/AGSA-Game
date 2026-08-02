import { CodeSnippet } from '../../types';

export const TREE_ADVANCED_SNIPPETS: Record<string, CodeSnippet> = {
  treap: {
    title: 'Treap (Randomized BST + Heap)',
    timeComplexity: 'O(log N) expected',
    spaceComplexity: 'O(N)',
    explanationText:
      'A treap combines a BST key ordering with a max-heap on random priorities. Rotations restore the heap property after insert/delete, so the tree stays balanced with high probability \u2014 no complicated rebalancing logic needed.',
    cpp: `#include <iostream>
using namespace std;

struct Node {
    int key, priority;
    Node *left, *right;
    Node(int k) : key(k), priority(rand()), left(nullptr), right(nullptr) {}
};

Node* rotateRight(Node* y) {
    Node* x = y->left;
    y->left = x->right;
    x->right = y;
    return x;
}

Node* rotateLeft(Node* x) {
    Node* y = x->right;
    x->right = y->left;
    y->left = x;
    return y;
}

Node* insert(Node* root, int key) {
    if (!root) return new Node(key);
    if (key < root->key) {
        root->left = insert(root->left, key);
        if (root->left->priority > root->priority)
            root = rotateRight(root);
    } else if (key > root->key) {
        root->right = insert(root->right, key);
        if (root->right->priority > root->priority)
            root = rotateLeft(root);
    }
    return root;
}

Node* erase(Node* root, int key) {
    if (!root) return nullptr;
    if (key < root->key) root->left = erase(root->left, key);
    else if (key > root->key) root->right = erase(root->right, key);
    else {
        if (!root->left) return root->right;
        if (!root->right) return root->left;
        if (root->left->priority > root->right->priority)
            root = rotateRight(root), root->right = erase(root->right, key);
        else
            root = rotateLeft(root), root->left = erase(root->left, key);
    }
    return root;
}

bool search(Node* root, int key) {
    if (!root) return false;
    if (key == root->key) return true;
    return key < root->key ? search(root->left, key) : search(root->right, key);
}`,
    java: `import java.util.Random;

public class Treap {
    static class Node {
        int key, priority;
        Node left, right;
        Node(int k) { key = k; priority = new Random().nextInt(); }
    }

    Node rotateRight(Node y) {
        Node x = y.left;
        y.left = x.right;
        x.right = y;
        return x;
    }

    Node rotateLeft(Node x) {
        Node y = x.right;
        x.right = y.left;
        y.left = x;
        return y;
    }

    Node insert(Node root, int key) {
        if (root == null) return new Node(key);
        if (key < root.key) {
            root.left = insert(root.left, key);
            if (root.left.priority > root.priority) root = rotateRight(root);
        } else if (key > root.key) {
            root.right = insert(root.right, key);
            if (root.right.priority > root.priority) root = rotateLeft(root);
        }
        return root;
    }

    Node erase(Node root, int key) {
        if (root == null) return null;
        if (key < root.key) root.left = erase(root.left, key);
        else if (key > root.key) root.right = erase(root.right, key);
        else {
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;
            if (root.left.priority > root.right.priority) {
                root = rotateRight(root);
                root.right = erase(root.right, key);
            } else {
                root = rotateLeft(root);
                root.left = erase(root.left, key);
            }
        }
        return root;
    }

    boolean search(Node root, int key) {
        if (root == null) return false;
        if (key == root.key) return true;
        return key < root.key ? search(root.left, key) : search(root.right, key);
    }
}`,
    python: `import random

class Node:
    def __init__(self, key):
        self.key = key
        self.priority = random.random()
        self.left = None
        self.right = None

def rotate_right(y):
    x = y.left
    y.left = x.right
    x.right = y
    return x

def rotate_left(x):
    y = x.right
    x.right = y.left
    y.left = x
    return y

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.key:
        root.left = insert(root.left, key)
        if root.left.priority > root.priority:
            root = rotate_right(root)
    elif key > root.key:
        root.right = insert(root.right, key)
        if root.right.priority > root.priority:
            root = rotate_left(root)
    return root

def erase(root, key):
    if root is None:
        return None
    if key < root.key:
        root.left = erase(root.left, key)
    elif key > root.key:
        root.right = erase(root.right, key)
    else:
        if root.left is None:
            return root.right
        if root.right is None:
            return root.left
        if root.left.priority > root.right.priority:
            root = rotate_right(root)
            root.right = erase(root.right, key)
        else:
            root = rotate_left(root)
            root.left = erase(root.left, key)
    return root

def search(root, key):
    if root is None:
        return False
    if key == root.key:
        return True
    return search(root.left, key) if key < root.key else search(root.right, key)`,
    javascript: `class Node {
  constructor(key) {
    this.key = key;
    this.priority = Math.random();
    this.left = null;
    this.right = null;
  }
}

function rotateRight(y) {
  const x = y.left;
  y.left = x.right;
  x.right = y;
  return x;
}

function rotateLeft(x) {
  const y = x.right;
  x.right = y.left;
  y.left = x;
  return y;
}

function insert(root, key) {
  if (!root) return new Node(key);
  if (key < root.key) {
    root.left = insert(root.left, key);
    if (root.left.priority > root.priority) root = rotateRight(root);
  } else if (key > root.key) {
    root.right = insert(root.right, key);
    if (root.right.priority > root.priority) root = rotateLeft(root);
  }
  return root;
}

function erase(root, key) {
  if (!root) return null;
  if (key < root.key) root.left = erase(root.left, key);
  else if (key > root.key) root.right = erase(root.right, key);
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    if (root.left.priority > root.right.priority) {
      root = rotateRight(root);
      root.right = erase(root.right, key);
    } else {
      root = rotateLeft(root);
      root.left = erase(root.left, key);
    }
  }
  return root;
}

function search(root, key) {
  if (!root) return false;
  if (key === root.key) return true;
  return key < root.key ? search(root.left, key) : search(root.right, key);
}`
  },
  splay: {
    title: 'Splay Tree',
    timeComplexity: 'O(log N) amortized',
    spaceComplexity: 'O(N)',
    explanationText:
      'A splay tree moves every accessed node to the root via zig, zig-zig and zig-zag rotations. Frequently accessed keys become cheap to reach \u2014 great for caching and access-locality workloads.',
    cpp: `struct Node {
    int key;
    Node *left, *right;
    Node(int k) : key(k), left(nullptr), right(nullptr) {}
};

Node* rightRotate(Node* x) {
    Node* y = x->left;
    x->left = y->right;
    y->right = x;
    return y;
}

Node* leftRotate(Node* x) {
    Node* y = x->right;
    x->right = y->left;
    y->left = x;
    return y;
}

Node* splay(Node* root, int key) {
    if (!root || root->key == key) return root;

    if (key < root->key) {
        if (!root->left) return root;
        if (key < root->left->key) {
            root->left->left = splay(root->left->left, key);
            root = rightRotate(root);
        } else if (key > root->left->key) {
            root->left->right = splay(root->left->right, key);
            if (root->left->right) root->left = leftRotate(root->left);
        }
        return root->left ? rightRotate(root) : root;
    } else {
        if (!root->right) return root;
        if (key > root->right->key) {
            root->right->right = splay(root->right->right, key);
            root = leftRotate(root);
        } else if (key < root->right->key) {
            root->right->left = splay(root->right->left, key);
            if (root->right->left) root->right = rightRotate(root->right);
        }
        return root->right ? leftRotate(root) : root;
    }
}

Node* insert(Node* root, int key) {
    if (!root) return new Node(key);
    root = splay(root, key);
    if (root->key == key) return root;

    Node* node = new Node(key);
    if (key < root->key) {
        node->right = root;
        node->left = root->left;
        root->left = nullptr;
    } else {
        node->left = root;
        node->right = root->right;
        root->right = nullptr;
    }
    return node;
}

Node* search(Node* root, int key) {
    return splay(root, key);
}`,
    java: `public class SplayTree {
    static class Node {
        int key;
        Node left, right;
        Node(int k) { key = k; }
    }

    Node rightRotate(Node x) {
        Node y = x.left;
        x.left = y.right;
        y.right = x;
        return y;
    }

    Node leftRotate(Node x) {
        Node y = x.right;
        x.right = y.left;
        y.left = x;
        return y;
    }

    Node splay(Node root, int key) {
        if (root == null || root.key == key) return root;
        if (key < root.key) {
            if (root.left == null) return root;
            if (key < root.left.key) {
                root.left.left = splay(root.left.left, key);
                root = rightRotate(root);
            } else if (key > root.left.key) {
                root.left.right = splay(root.left.right, key);
                if (root.left.right != null) root.left = leftRotate(root.left);
            }
            return root.left != null ? rightRotate(root) : root;
        } else {
            if (root.right == null) return root;
            if (key > root.right.key) {
                root.right.right = splay(root.right.right, key);
                root = leftRotate(root);
            } else if (key < root.right.key) {
                root.right.left = splay(root.right.left, key);
                if (root.right.left != null) root.right = rightRotate(root.right);
            }
            return root.right != null ? leftRotate(root) : root;
        }
    }

    Node insert(Node root, int key) {
        if (root == null) return new Node(key);
        root = splay(root, key);
        if (root.key == key) return root;
        Node node = new Node(key);
        if (key < root.key) {
            node.right = root;
            node.left = root.left;
            root.left = null;
        } else {
            node.left = root;
            node.right = root.right;
            root.right = null;
        }
        return node;
    }

    Node search(Node root, int key) {
        return splay(root, key);
    }
}`,
    python: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

def right_rotate(x):
    y = x.left
    x.left = y.right
    y.right = x
    return y

def left_rotate(x):
    y = x.right
    x.right = y.left
    y.left = x
    return y

def splay(root, key):
    if root is None or root.key == key:
        return root
    if key < root.key:
        if root.left is None:
            return root
        if key < root.left.key:
            root.left.left = splay(root.left.left, key)
            root = right_rotate(root)
        elif key > root.left.key:
            root.left.right = splay(root.left.right, key)
            if root.left.right:
                root.left = left_rotate(root.left)
        return right_rotate(root) if root.left else root
    else:
        if root.right is None:
            return root
        if key > root.right.key:
            root.right.right = splay(root.right.right, key)
            root = left_rotate(root)
        elif key < root.right.key:
            root.right.left = splay(root.right.left, key)
            if root.right.left:
                root.right = right_rotate(root.right)
        return left_rotate(root) if root.right else root

def insert(root, key):
    if root is None:
        return Node(key)
    root = splay(root, key)
    if root.key == key:
        return root
    node = Node(key)
    if key < root.key:
        node.right = root
        node.left = root.left
        root.left = None
    else:
        node.left = root
        node.right = root.right
        root.right = None
    return node

def search(root, key):
    return splay(root, key)`,
    javascript: `class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

function rightRotate(x) {
  const y = x.left;
  x.left = y.right;
  y.right = x;
  return y;
}

function leftRotate(x) {
  const y = x.right;
  x.right = y.left;
  y.left = x;
  return y;
}

function splay(root, key) {
  if (!root || root.key === key) return root;
  if (key < root.key) {
    if (!root.left) return root;
    if (key < root.left.key) {
      root.left.left = splay(root.left.left, key);
      root = rightRotate(root);
    } else if (key > root.left.key) {
      root.left.right = splay(root.left.right, key);
      if (root.left.right) root.left = leftRotate(root.left);
    }
    return root.left ? rightRotate(root) : root;
  } else {
    if (!root.right) return root;
    if (key > root.right.key) {
      root.right.right = splay(root.right.right, key);
      root = leftRotate(root);
    } else if (key < root.right.key) {
      root.right.left = splay(root.right.left, key);
      if (root.right.left) root.right = rightRotate(root.right);
    }
    return root.right ? leftRotate(root) : root;
  }
}

function insert(root, key) {
  if (!root) return new Node(key);
  root = splay(root, key);
  if (root.key === key) return root;
  const node = new Node(key);
  if (key < root.key) {
    node.right = root;
    node.left = root.left;
    root.left = null;
  } else {
    node.left = root;
    node.right = root.right;
    root.right = null;
  }
  return node;
}

function search(root, key) {
  return splay(root, key);
}`
  },
  fenwick: {
    title: 'Fenwick Tree (Binary Indexed Tree)',
    timeComplexity: 'query O(log N) • update O(log N)',
    spaceComplexity: 'O(N)',
    explanationText:
      'A Fenwick tree stores prefix aggregates in a flat array where index i covers a range of length lowbit(i) = i & (-i). Point updates and prefix queries both run in O(log N) using only a handful of bitwise operations \u2014 ideal for frequency counters.',
    cpp: `#include <vector>
using namespace std;

class FenwickTree {
    vector<int> bit;
    int n;

public:
    FenwickTree(int size) : n(size), bit(size + 1, 0) {}

    void add(int idx, int delta) {  // 1-indexed
        while (idx <= n) {
            bit[idx] += delta;
            idx += idx & (-idx);
        }
    }

    int prefixSum(int idx) {
        int sum = 0;
        while (idx > 0) {
            sum += bit[idx];
            idx -= idx & (-idx);
        }
        return sum;
    }

    int rangeSum(int l, int r) {
        return prefixSum(r) - prefixSum(l - 1);
    }
};`,
    java: `public class FenwickTree {
    int[] bit;
    int n;

    public FenwickTree(int size) {
        n = size;
        bit = new int[size + 1];
    }

    void add(int idx, int delta) {
        while (idx <= n) {
            bit[idx] += delta;
            idx += idx & (-idx);
        }
    }

    int prefixSum(int idx) {
        int sum = 0;
        while (idx > 0) {
            sum += bit[idx];
            idx -= idx & (-idx);
        }
        return sum;
    }

    int rangeSum(int l, int r) {
        return prefixSum(r) - prefixSum(l - 1);
    }
}`,
    python: `class FenwickTree:
    def __init__(self, size):
        self.n = size
        self.bit = [0] * (size + 1)

    def add(self, idx, delta):
        while idx <= self.n:
            self.bit[idx] += delta
            idx += idx & (-idx)

    def prefix_sum(self, idx):
        total = 0
        while idx > 0:
            total += self.bit[idx]
            idx -= idx & (-idx)
        return total

    def range_sum(self, l, r):
        return self.prefix_sum(r) - self.prefix_sum(l - 1)`,
    javascript: `class FenwickTree {
  constructor(size) {
    this.n = size;
    this.bit = new Array(size + 1).fill(0);
  }

  add(idx, delta) {
    while (idx <= this.n) {
      this.bit[idx] += delta;
      idx += idx & -idx;
    }
  }

  prefixSum(idx) {
    let sum = 0;
    while (idx > 0) {
      sum += this.bit[idx];
      idx -= idx & -idx;
    }
    return sum;
  }

  rangeSum(l, r) {
    return this.prefixSum(r) - this.prefixSum(l - 1);
  }
}`
  },
  rbtdelete: {
    title: 'Red-Black Tree Deletion (Fix-up)',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(N)',
    explanationText:
      'Deleting from a red-black tree may create a \u201cdouble black\u201d node when a black node is removed. The delete-fixup resolves it with recoloring and rotations, maintaining black height so the tree stays balanced at O(log N).',
    cpp: `#include <iostream>
using namespace std;

enum Color { RED, BLACK };

struct Node {
    int key;
    Color color;
    Node *left, *right, *parent;
    Node(int k) : key(k), color(RED), left(nullptr), right(nullptr), parent(nullptr) {}
};

Node* minimum(Node* x) {
    while (x->left) x = x->left;
    return x;
}

void transplant(Node*& root, Node* u, Node* v) {
    if (!u->parent) root = v;
    else if (u == u->parent->left) u->parent->left = v;
    else u->parent->right = v;
    if (v) v->parent = u->parent;
}

void fixDelete(Node*& root, Node* x) {
    while (x && x != root && x->color == BLACK) {
        if (x == x->parent->left) {
            Node* w = x->parent->right;
            if (w->color == RED) {
                w->color = BLACK;
                x->parent->color = RED;
                // leftRotate(x->parent) then reassign w
            }
            if ((!w->left || w->left->color == BLACK) &&
                (!w->right || w->right->color == BLACK)) {
                w->color = RED;
                x = x->parent;
            } else {
                if (!w->right || w->right->color == BLACK) {
                    if (w->left) w->left->color = BLACK;
                    w->color = RED;
                    // rightRotate(w); w = x->parent->right;
                }
                w->color = x->parent->color;
                x->parent->color = BLACK;
                if (w->right) w->right->color = BLACK;
                // leftRotate(x->parent);
                x = root;
            }
        } else { /* mirror image of the above */ }
    }
    if (x) x->color = BLACK;
}

void rbDelete(Node*& root, Node* z) {
    Node* y = z;
    Color yOriginal = y->color;
    Node* x;
    if (!z->left) {
        x = z->right;
        transplant(root, z, z->right);
    } else if (!z->right) {
        x = z->left;
        transplant(root, z, z->left);
    } else {
        y = minimum(z->right);
        yOriginal = y->color;
        x = y->right;
        if (y->parent == z) {
            if (x) x->parent = y;
        } else {
            transplant(root, y, y->right);
            y->right = z->right;
            y->right->parent = y;
        }
        transplant(root, z, y);
        y->left = z->left;
        y->left->parent = y;
        y->color = z->color;
    }
    delete z;
    if (yOriginal == BLACK) fixDelete(root, x);
}`,
    java: `public class RBDelete {
    static final boolean RED = true, BLACK = false;

    static class Node {
        int key;
        boolean color;
        Node left, right, parent;
        Node(int k) { key = k; color = RED; }
    }

    Node minimum(Node x) {
        while (x.left != null) x = x.left;
        return x;
    }

    void transplant(Node root, Node u, Node v) {
        if (u.parent == null) { /* set root = v externally */ }
        else if (u == u.parent.left) u.parent.left = v;
        else u.parent.right = v;
        if (v != null) v.parent = u.parent;
    }

    void rbDelete(Node root, Node z) {
        Node y = z;
        boolean yOriginal = y.color;
        Node x;
        if (z.left == null) { x = z.right; transplant(root, z, z.right); }
        else if (z.right == null) { x = z.left; transplant(root, z, z.left); }
        else {
            y = minimum(z.right);
            yOriginal = y.color;
            x = y.right;
            if (y.parent == z) {
                if (x != null) x.parent = y;
            } else {
                transplant(root, y, y.right);
                y.right = z.right;
                y.right.parent = y;
            }
            transplant(root, z, y);
            y.left = z.left;
            y.left.parent = y;
            y.color = z.color;
        }
        if (yOriginal == BLACK) fixDelete(root, x);
    }
}`,
    python: `RED, BLACK = True, False

class Node:
    def __init__(self, key):
        self.key = key
        self.color = RED
        self.left = None
        self.right = None
        self.parent = None

def minimum(x):
    while x.left:
        x = x.left
    return x

def transplant(root, u, v):
    if u.parent is None:
        root = v
    elif u == u.parent.left:
        u.parent.left = v
    else:
        u.parent.right = v
    if v:
        v.parent = u.parent
    return root

def fix_delete(root, x):
    while x and x != root and x.color == BLACK:
        if x == x.parent.left:
            w = x.parent.right
            if w.color == RED:
                w.color = BLACK
                x.parent.color = RED
                root = left_rotate(root, x.parent)
                w = x.parent.right
            if (w.left is None or w.left.color == BLACK) and \
               (w.right is None or w.right.color == BLACK):
                w.color = RED
                x = x.parent
            else:
                if w.right is None or w.right.color == BLACK:
                    if w.left:
                        w.left.color = BLACK
                    w.color = RED
                    root = right_rotate(root, w)
                    w = x.parent.right
                w.color = x.parent.color
                x.parent.color = BLACK
                if w.right:
                    w.right.color = BLACK
                root = left_rotate(root, x.parent)
                x = root
        else:
            w = x.parent.left
            if w.color == RED:
                w.color = BLACK
                x.parent.color = RED
                root = right_rotate(root, x.parent)
                w = x.parent.left
            if (w.right is None or w.right.color == BLACK) and \
               (w.left is None or w.left.color == BLACK):
                w.color = RED
                x = x.parent
            else:
                if w.left is None or w.left.color == BLACK:
                    if w.right:
                        w.right.color = BLACK
                    w.color = RED
                    root = left_rotate(root, w)
                    w = x.parent.left
                w.color = x.parent.color
                x.parent.color = BLACK
                if w.left:
                    w.left.color = BLACK
                root = right_rotate(root, x.parent)
                x = root
    if x:
        x.color = BLACK
    return root`,
    javascript: `const RED = true, BLACK = false;

class Node {
  constructor(key) {
    this.key = key;
    this.color = RED;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

function minimum(x) {
  while (x.left) x = x.left;
  return x;
}

function transplant(root, u, v) {
  if (!u.parent) root = v;
  else if (u === u.parent.left) u.parent.left = v;
  else u.parent.right = v;
  if (v) v.parent = u.parent;
  return root;
}

function fixDelete(root, x) {
  while (x && x !== root && x.color === BLACK) {
    if (x === x.parent.left) {
      let w = x.parent.right;
      if (w.color === RED) {
        w.color = BLACK;
        x.parent.color = RED;
        root = leftRotate(root, x.parent);
        w = x.parent.right;
      }
      if ((!w.left || w.left.color === BLACK) &&
          (!w.right || w.right.color === BLACK)) {
        w.color = RED;
        x = x.parent;
      } else {
        if (!w.right || w.right.color === BLACK) {
          if (w.left) w.left.color = BLACK;
          w.color = RED;
          root = rightRotate(root, w);
          w = x.parent.right;
        }
        w.color = x.parent.color;
        x.parent.color = BLACK;
        if (w.right) w.right.color = BLACK;
        root = leftRotate(root, x.parent);
        x = root;
      }
    } else {
      let w = x.parent.left;
      if (w.color === RED) {
        w.color = BLACK;
        x.parent.color = RED;
        root = rightRotate(root, x.parent);
        w = x.parent.left;
      }
      if ((!w.right || w.right.color === BLACK) &&
          (!w.left || w.left.color === BLACK)) {
        w.color = RED;
        x = x.parent;
      } else {
        if (!w.left || w.left.color === BLACK) {
          if (w.right) w.right.color = BLACK;
          w.color = RED;
          root = leftRotate(root, w);
          w = x.parent.left;
        }
        w.color = x.parent.color;
        x.parent.color = BLACK;
        if (w.left) w.left.color = BLACK;
        root = rightRotate(root, x.parent);
        x = root;
      }
    }
  }
  if (x) x.color = BLACK;
  return root;
}`
  }
};
