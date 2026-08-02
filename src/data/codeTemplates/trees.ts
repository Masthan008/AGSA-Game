import { CodeSnippet } from '../../types';

export const TREE_SNIPPETS: Record<string, CodeSnippet> = {
  bst: {
    title: 'Binary Search Tree (BST)',
    timeComplexity: 'O(log N) average • O(N) worst',
    spaceComplexity: 'O(N)',
    explanationText:
      'A BST keeps keys ordered so that every left subtree holds smaller keys and every right subtree holds larger keys. Search, insert and delete run in O(log N) on balanced trees, but degrade to O(N) on skewed trees.',
    cpp: `#include <iostream>
using namespace std;

struct Node {
    int key;
    Node *left, *right;
    Node(int k) : key(k), left(nullptr), right(nullptr) {}
};

Node* insert(Node* root, int key) {
    if (!root) return new Node(key);
    if (key < root->key) root->left = insert(root->left, key);
    else if (key > root->key) root->right = insert(root->right, key);
    return root;
}

bool search(Node* root, int key) {
    if (!root) return false;
    if (key == root->key) return true;
    return key < root->key ? search(root->left, key) : search(root->right, key);
}

Node* minValueNode(Node* node) {
    while (node && node->left) node = node->left;
    return node;
}

Node* deleteNode(Node* root, int key) {
    if (!root) return nullptr;
    if (key < root->key) root->left = deleteNode(root->left, key);
    else if (key > root->key) root->right = deleteNode(root->right, key);
    else {
        if (!root->left) { Node* t = root->right; delete root; return t; }
        if (!root->right) { Node* t = root->left; delete root; return t; }
        Node* succ = minValueNode(root->right);
        root->key = succ->key;
        root->right = deleteNode(root->right, succ->key);
    }
    return root;
}

void inorder(Node* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->key << " ";
    inorder(root->right);
}`,
    java: `public class BST {
    static class Node {
        int key;
        Node left, right;
        Node(int k) { key = k; }
    }

    Node insert(Node root, int key) {
        if (root == null) return new Node(key);
        if (key < root.key) root.left = insert(root.left, key);
        else if (key > root.key) root.right = insert(root.right, key);
        return root;
    }

    boolean search(Node root, int key) {
        if (root == null) return false;
        if (key == root.key) return true;
        return key < root.key ? search(root.left, key) : search(root.right, key);
    }

    Node minValueNode(Node n) {
        while (n != null && n.left != null) n = n.left;
        return n;
    }

    Node deleteNode(Node root, int key) {
        if (root == null) return null;
        if (key < root.key) root.left = deleteNode(root.left, key);
        else if (key > root.key) root.right = deleteNode(root.right, key);
        else {
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;
            Node succ = minValueNode(root.right);
            root.key = succ.key;
            root.right = deleteNode(root.right, succ.key);
        }
        return root;
    }
}`,
    python: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.key:
        root.left = insert(root.left, key)
    elif key > root.key:
        root.right = insert(root.right, key)
    return root

def search(root, key):
    if root is None:
        return False
    if key == root.key:
        return True
    return search(root.left, key) if key < root.key else search(root.right, key)

def min_value_node(node):
    while node and node.left:
        node = node.left
    return node

def delete_node(root, key):
    if root is None:
        return None
    if key < root.key:
        root.left = delete_node(root.left, key)
    elif key > root.key:
        root.right = delete_node(root.right, key)
    else:
        if root.left is None:
            return root.right
        if root.right is None:
            return root.left
        succ = min_value_node(root.right)
        root.key = succ.key
        root.right = delete_node(root.right, succ.key)
    return root`,
    javascript: `class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

function insert(root, key) {
  if (!root) return new Node(key);
  if (key < root.key) root.left = insert(root.left, key);
  else if (key > root.key) root.right = insert(root.right, key);
  return root;
}

function search(root, key) {
  if (!root) return false;
  if (key === root.key) return true;
  return key < root.key ? search(root.left, key) : search(root.right, key);
}

function minValueNode(node) {
  while (node && node.left) node = node.left;
  return node;
}

function deleteNode(root, key) {
  if (!root) return null;
  if (key < root.key) root.left = deleteNode(root.left, key);
  else if (key > root.key) root.right = deleteNode(root.right, key);
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    const succ = minValueNode(root.right);
    root.key = succ.key;
    root.right = deleteNode(root.right, succ.key);
  }
  return root;
}`
  },
  avl: {
    title: 'AVL Tree (Self-Balancing BST)',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(N)',
    explanationText:
      'An AVL tree keeps every node\u2019s balance factor (Height(left) \u2212 Height(right)) within { \u22121, 0, +1 }. When an insertion or deletion breaks this invariant, LL / RR / LR / RL rotations rebalance the tree in O(1), guaranteeing O(log N) operations.',
    cpp: `#include <iostream>
#include <algorithm>
using namespace std;

struct Node {
    int key;
    Node *left, *right;
    int height;
    Node(int k) : key(k), left(nullptr), right(nullptr), height(1) {}
};

int height(Node *n) { return n ? n->height : 0; }
int getBalance(Node *n) { return n ? height(n->left) - height(n->right) : 0; }

Node* rightRotate(Node *y) {
    Node *x = y->left;
    Node *T2 = x->right;
    x->right = y;
    y->left = T2;
    y->height = max(height(y->left), height(y->right)) + 1;
    x->height = max(height(x->left), height(x->right)) + 1;
    return x;
}

Node* leftRotate(Node *x) {
    Node *y = x->right;
    Node *T2 = y->left;
    y->left = x;
    x->right = T2;
    x->height = max(height(x->left), height(x->right)) + 1;
    y->height = max(height(y->left), height(y->right)) + 1;
    return y;
}

Node* insert(Node* node, int key) {
    if (!node) return new Node(key);
    if (key < node->key) node->left = insert(node->left, key);
    else if (key > node->key) node->right = insert(node->right, key);
    else return node;

    node->height = 1 + max(height(node->left), height(node->right));
    int balance = getBalance(node);

    if (balance > 1 && key < node->left->key) return rightRotate(node);
    if (balance < -1 && key > node->right->key) return leftRotate(node);
    if (balance > 1 && key > node->left->key) {
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }
    if (balance < -1 && key < node->right->key) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }
    return node;
}

bool search(Node* node, int key) {
    if (!node) return false;
    if (key == node->key) return true;
    return key < node->key ? search(node->left, key) : search(node->right, key);
}`,
    java: `public class AVLTree {
    static class Node {
        int key, height = 1;
        Node left, right;
        Node(int d) { key = d; }
    }

    int height(Node N) { return N == null ? 0 : N.height; }
    int getBalance(Node N) { return N == null ? 0 : height(N.left) - height(N.right); }

    Node rightRotate(Node y) {
        Node x = y.left;
        Node T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        return x;
    }

    Node leftRotate(Node x) {
        Node y = x.right;
        Node T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        return y;
    }

    Node insert(Node node, int key) {
        if (node == null) return new Node(key);
        if (key < node.key) node.left = insert(node.left, key);
        else if (key > node.key) node.right = insert(node.right, key);
        else return node;

        node.height = 1 + Math.max(height(node.left), height(node.right));
        int balance = getBalance(node);

        if (balance > 1 && key < node.left.key) return rightRotate(node);
        if (balance < -1 && key > node.right.key) return leftRotate(node);
        if (balance > 1 && key > node.left.key) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
        if (balance < -1 && key < node.right.key) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        return node;
    }

    boolean search(Node node, int key) {
        if (node == null) return false;
        if (key == node.key) return true;
        return key < node.key ? search(node.left, key) : search(node.right, key);
    }
}`,
    python: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.height = 1

def get_height(node):
    return node.height if node else 0

def get_balance(node):
    return get_height(node.left) - get_height(node.right) if node else 0

def right_rotate(y):
    x = y.left
    t2 = x.right
    x.right = y
    y.left = t2
    y.height = 1 + max(get_height(y.left), get_height(y.right))
    x.height = 1 + max(get_height(x.left), get_height(x.right))
    return x

def left_rotate(x):
    y = x.right
    t2 = y.left
    y.left = x
    x.right = t2
    x.height = 1 + max(get_height(x.left), get_height(x.right))
    y.height = 1 + max(get_height(y.left), get_height(y.right))
    return y

def insert(node, key):
    if node is None:
        return Node(key)
    if key < node.key:
        node.left = insert(node.left, key)
    elif key > node.key:
        node.right = insert(node.right, key)
    else:
        return node

    node.height = 1 + max(get_height(node.left), get_height(node.right))
    balance = get_balance(node)

    if balance > 1 and key < node.left.key:
        return right_rotate(node)
    if balance < -1 and key > node.right.key:
        return left_rotate(node)
    if balance > 1 and key > node.left.key:
        node.left = left_rotate(node.left)
        return right_rotate(node)
    if balance < -1 and key < node.right.key:
        node.right = right_rotate(node.right)
        return left_rotate(node)
    return node

def search(node, key):
    if node is None:
        return False
    if key == node.key:
        return True
    return search(node.left, key) if key < node.key else search(node.right, key)`,
    javascript: `class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

const getHeight = (n) => (n ? n.height : 0);
const getBalance = (n) => (n ? getHeight(n.left) - getHeight(n.right) : 0);

function rightRotate(y) {
  const x = y.left;
  const T2 = x.right;
  x.right = y;
  y.left = T2;
  y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right));
  x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right));
  return x;
}

function leftRotate(x) {
  const y = x.right;
  const T2 = y.left;
  y.left = x;
  x.right = T2;
  x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right));
  y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right));
  return y;
}

function insert(node, key) {
  if (!node) return new Node(key);
  if (key < node.key) node.left = insert(node.left, key);
  else if (key > node.key) node.right = insert(node.right, key);
  else return node;

  node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
  const balance = getBalance(node);

  if (balance > 1 && key < node.left.key) return rightRotate(node);
  if (balance < -1 && key > node.right.key) return leftRotate(node);
  if (balance > 1 && key > node.left.key) {
    node.left = leftRotate(node.left);
    return rightRotate(node);
  }
  if (balance < -1 && key < node.right.key) {
    node.right = rightRotate(node.right);
    return leftRotate(node);
  }
  return node;
}

function search(node, key) {
  if (!node) return false;
  if (key === node.key) return true;
  return key < node.key ? search(node.left, key) : search(node.right, key);
}`
  },
  redblack: {
    title: 'Red-Black Tree',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(N)',
    explanationText:
      'Red-Black trees balance using node colors: root is black, red nodes cannot have red children, and every root-to-leaf path has the same black height. Insertion recovers violations by recoloring and at most 2 rotations \u2014 fewer rotations than AVL, hence faster writes.',
    cpp: `#include <iostream>
using namespace std;

enum Color { RED, BLACK };

struct Node {
    int key;
    bool color;
    Node *left, *right, *parent;
    Node(int k) : key(k), color(RED), left(nullptr), right(nullptr), parent(nullptr) {}
};

class RedBlackTree {
public:
    Node* root;

    RedBlackTree() : root(nullptr) {}

    void rotateLeft(Node* x) {
        Node* y = x->right;
        x->right = y->left;
        if (y->left) y->left->parent = x;
        y->parent = x->parent;
        if (!x->parent) root = y;
        else if (x == x->parent->left) x->parent->left = y;
        else x->parent->right = y;
        y->left = x;
        x->parent = y;
    }

    void rotateRight(Node* x) {
        Node* y = x->left;
        x->left = y->right;
        if (y->right) y->right->parent = x;
        y->parent = x->parent;
        if (!x->parent) root = y;
        else if (x == x->parent->right) x->parent->right = y;
        else x->parent->left = y;
        y->right = x;
        x->parent = y;
    }

    void fixInsert(Node* z) {
        while (z->parent && z->parent->color == RED) {
            Node* gp = z->parent->parent;
            if (z->parent == gp->left) {
                Node* uncle = gp->right;
                if (uncle && uncle->color == RED) {
                    z->parent->color = BLACK;
                    uncle->color = BLACK;
                    gp->color = RED;
                    z = gp;
                } else {
                    if (z == z->parent->right) { z = z->parent; rotateLeft(z); }
                    z->parent->color = BLACK;
                    gp->color = RED;
                    rotateRight(gp);
                }
            } else {
                Node* uncle = gp->left;
                if (uncle && uncle->color == RED) {
                    z->parent->color = BLACK;
                    uncle->color = BLACK;
                    gp->color = RED;
                    z = gp;
                } else {
                    if (z == z->parent->left) { z = z->parent; rotateRight(z); }
                    z->parent->color = BLACK;
                    gp->color = RED;
                    rotateLeft(gp);
                }
            }
        }
        root->color = BLACK;
    }

    void insert(int key) {
        Node* z = new Node(key);
        Node* y = nullptr;
        Node* x = root;
        while (x) { y = x; x = (key < x->key) ? x->left : x->right; }
        z->parent = y;
        if (!y) root = z;
        else if (key < y->key) y->left = z;
        else y->right = z;
        fixInsert(z);
    }
};`,
    java: `public class RedBlackTree {
    static final boolean RED = true, BLACK = false;

    static class Node {
        int key;
        boolean color;
        Node left, right, parent;
        Node(int k) { key = k; color = RED; }
    }

    Node root;

    void rotateLeft(Node x) {
        Node y = x.right;
        x.right = y.left;
        if (y.left != null) y.left.parent = x;
        y.parent = x.parent;
        if (x.parent == null) root = y;
        else if (x == x.parent.left) x.parent.left = y;
        else x.parent.right = y;
        y.left = x;
        x.parent = y;
    }

    void rotateRight(Node x) {
        Node y = x.left;
        x.left = y.right;
        if (y.right != null) y.right.parent = x;
        y.parent = x.parent;
        if (x.parent == null) root = y;
        else if (x == x.parent.right) x.parent.right = y;
        else x.parent.left = y;
        y.right = x;
        x.parent = y;
    }

    void fixInsert(Node z) {
        while (z.parent != null && z.parent.color == RED) {
            Node gp = z.parent.parent;
            if (z.parent == gp.left) {
                Node uncle = gp.right;
                if (uncle != null && uncle.color == RED) {
                    z.parent.color = BLACK;
                    uncle.color = BLACK;
                    gp.color = RED;
                    z = gp;
                } else {
                    if (z == z.parent.right) { z = z.parent; rotateLeft(z); }
                    z.parent.color = BLACK;
                    gp.color = RED;
                    rotateRight(gp);
                }
            } else {
                Node uncle = gp.left;
                if (uncle != null && uncle.color == RED) {
                    z.parent.color = BLACK;
                    uncle.color = BLACK;
                    gp.color = RED;
                    z = gp;
                } else {
                    if (z == z.parent.left) { z = z.parent; rotateRight(z); }
                    z.parent.color = BLACK;
                    gp.color = RED;
                    rotateLeft(gp);
                }
            }
        }
        root.color = BLACK;
    }

    void insert(int key) {
        Node z = new Node(key);
        Node y = null, x = root;
        while (x != null) { y = x; x = key < x.key ? x.left : x.right; }
        z.parent = y;
        if (y == null) root = z;
        else if (key < y.key) y.left = z;
        else y.right = z;
        fixInsert(z);
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

class RedBlackTree:
    def __init__(self):
        self.root = None

    def rotate_left(self, x):
        y = x.right
        x.right = y.left
        if y.left:
            y.left.parent = x
        y.parent = x.parent
        if not x.parent:
            self.root = y
        elif x == x.parent.left:
            x.parent.left = y
        else:
            x.parent.right = y
        y.left = x
        x.parent = y

    def rotate_right(self, x):
        y = x.left
        x.left = y.right
        if y.right:
            y.right.parent = x
        y.parent = x.parent
        if not x.parent:
            self.root = y
        elif x == x.parent.right:
            x.parent.right = y
        else:
            x.parent.left = y
        y.right = x
        x.parent = y

    def fix_insert(self, z):
        while z.parent and z.parent.color == RED:
            gp = z.parent.parent
            if z.parent == gp.left:
                uncle = gp.right
                if uncle and uncle.color == RED:
                    z.parent.color = BLACK
                    uncle.color = BLACK
                    gp.color = RED
                    z = gp
                else:
                    if z == z.parent.right:
                        z = z.parent
                        self.rotate_left(z)
                    z.parent.color = BLACK
                    gp.color = RED
                    self.rotate_right(gp)
            else:
                uncle = gp.left
                if uncle and uncle.color == RED:
                    z.parent.color = BLACK
                    uncle.color = BLACK
                    gp.color = RED
                    z = gp
                else:
                    if z == z.parent.left:
                        z = z.parent
                        self.rotate_right(z)
                    z.parent.color = BLACK
                    gp.color = RED
                    self.rotate_left(gp)
        self.root.color = BLACK

    def insert(self, key):
        z = Node(key)
        y, x = None, self.root
        while x:
            y = x
            x = x.left if key < x.key else x.right
        z.parent = y
        if not y:
            self.root = z
        elif key < y.key:
            y.left = z
        else:
            y.right = z
        self.fix_insert(z)`,
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

class RedBlackTree {
  constructor() { this.root = null; }

  rotateLeft(x) {
    const y = x.right;
    x.right = y.left;
    if (y.left) y.left.parent = x;
    y.parent = x.parent;
    if (!x.parent) this.root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
    y.left = x;
    x.parent = y;
  }

  rotateRight(x) {
    const y = x.left;
    x.left = y.right;
    if (y.right) y.right.parent = x;
    y.parent = x.parent;
    if (!x.parent) this.root = y;
    else if (x === x.parent.right) x.parent.right = y;
    else x.parent.left = y;
    y.right = x;
    x.parent = y;
  }

  fixInsert(z) {
    while (z.parent && z.parent.color === RED) {
      const gp = z.parent.parent;
      if (z.parent === gp.left) {
        const uncle = gp.right;
        if (uncle && uncle.color === RED) {
          z.parent.color = BLACK;
          uncle.color = BLACK;
          gp.color = RED;
          z = gp;
        } else {
          if (z === z.parent.right) { z = z.parent; this.rotateLeft(z); }
          z.parent.color = BLACK;
          gp.color = RED;
          this.rotateRight(gp);
        }
      } else {
        const uncle = gp.left;
        if (uncle && uncle.color === RED) {
          z.parent.color = BLACK;
          uncle.color = BLACK;
          gp.color = RED;
          z = gp;
        } else {
          if (z === z.parent.left) { z = z.parent; this.rotateRight(z); }
          z.parent.color = BLACK;
          gp.color = RED;
          this.rotateLeft(gp);
        }
      }
    }
    this.root.color = BLACK;
  }

  insert(key) {
    const z = new Node(key);
    let y = null, x = this.root;
    while (x) { y = x; x = key < x.key ? x.left : x.right; }
    z.parent = y;
    if (!y) this.root = z;
    else if (key < y.key) y.left = z;
    else y.right = z;
    this.fixInsert(z);
  }
}`
  },
  heap: {
    title: 'Binary Heap / Priority Queue (Min-Heap)',
    timeComplexity: 'push O(log N) • pop O(log N) • peek O(1)',
    spaceComplexity: 'O(N)',
    explanationText:
      'A binary heap is a complete binary tree stored in an array. A min-heap guarantees parent <= children, maintained with sift-up (insertion) and sift-down (removal). It backs the standard Priority Queue used by Dijkstra and heap sort.',
    cpp: `#include <vector>
#include <stdexcept>
using namespace std;

class MinHeap {
    vector<int> h;

    int parent(int i) { return (i - 1) / 2; }
    int left(int i) { return 2 * i + 1; }
    int right(int i) { return 2 * i + 2; }

    void siftUp(int i) {
        while (i > 0 && h[i] < h[parent(i)]) {
            swap(h[i], h[parent(i)]);
            i = parent(i);
        }
    }

    void siftDown(int i) {
        int n = h.size();
        while (true) {
            int smallest = i;
            int l = left(i), r = right(i);
            if (l < n && h[l] < h[smallest]) smallest = l;
            if (r < n && h[r] < h[smallest]) smallest = r;
            if (smallest == i) break;
            swap(h[i], h[smallest]);
            i = smallest;
        }
    }

public:
    void push(int val) {
        h.push_back(val);
        siftUp(h.size() - 1);
    }

    int pop() {
        if (h.empty()) throw out_of_range("empty heap");
        int top = h[0];
        h[0] = h.back();
        h.pop_back();
        if (!h.empty()) siftDown(0);
        return top;
    }

    int peek() { return h[0]; }
    int size() { return h.size(); }
};`,
    java: `import java.util.*;

public class MinHeap {
    private List<Integer> h = new ArrayList<>();

    private int parent(int i) { return (i - 1) / 2; }
    private int left(int i) { return 2 * i + 1; }
    private int right(int i) { return 2 * i + 2; }

    private void siftUp(int i) {
        while (i > 0 && h.get(i) < h.get(parent(i))) {
            Collections.swap(h, i, parent(i));
            i = parent(i);
        }
    }

    private void siftDown(int i) {
        int n = h.size();
        while (true) {
            int smallest = i;
            int l = left(i), r = right(i);
            if (l < n && h.get(l) < h.get(smallest)) smallest = l;
            if (r < n && h.get(r) < h.get(smallest)) smallest = r;
            if (smallest == i) break;
            Collections.swap(h, i, smallest);
            i = smallest;
        }
    }

    public void push(int val) {
        h.add(val);
        siftUp(h.size() - 1);
    }

    public int pop() {
        int top = h.get(0);
        h.set(0, h.get(h.size() - 1));
        h.remove(h.size() - 1);
        if (!h.isEmpty()) siftDown(0);
        return top;
    }

    public int peek() { return h.get(0); }
}`,
    python: `class MinHeap:
    def __init__(self):
        self.h = []

    def _parent(self, i): return (i - 1) // 2
    def _left(self, i): return 2 * i + 1
    def _right(self, i): return 2 * i + 2

    def _sift_up(self, i):
        while i > 0 and self.h[i] < self.h[self._parent(i)]:
            self.h[i], self.h[self._parent(i)] = self.h[self._parent(i)], self.h[i]
            i = self._parent(i)

    def _sift_down(self, i):
        n = len(self.h)
        while True:
            smallest = i
            l, r = self._left(i), self._right(i)
            if l < n and self.h[l] < self.h[smallest]:
                smallest = l
            if r < n and self.h[r] < self.h[smallest]:
                smallest = r
            if smallest == i:
                break
            self.h[i], self.h[smallest] = self.h[smallest], self.h[i]
            i = smallest

    def push(self, val):
        self.h.append(val)
        self._sift_up(len(self.h) - 1)

    def pop(self):
        top = self.h[0]
        self.h[0] = self.h[-1]
        self.h.pop()
        if self.h:
            self._sift_down(0)
        return top

    def peek(self):
        return self.h[0]`,
    javascript: `class MinHeap {
  constructor() { this.h = []; }

  parent(i) { return Math.floor((i - 1) / 2); }
  left(i) { return 2 * i + 1; }
  right(i) { return 2 * i + 2; }

  siftUp(i) {
    while (i > 0 && this.h[i] < this.h[this.parent(i)]) {
      [this.h[i], this.h[this.parent(i)]] = [this.h[this.parent(i)], this.h[i]];
      i = this.parent(i);
    }
  }

  siftDown(i) {
    const n = this.h.length;
    while (true) {
      let smallest = i;
      const l = this.left(i), r = this.right(i);
      if (l < n && this.h[l] < this.h[smallest]) smallest = l;
      if (r < n && this.h[r] < this.h[smallest]) smallest = r;
      if (smallest === i) break;
      [this.h[i], this.h[smallest]] = [this.h[smallest], this.h[i]];
      i = smallest;
    }
  }

  push(val) {
    this.h.push(val);
    this.siftUp(this.h.length - 1);
  }

  pop() {
    const top = this.h[0];
    this.h[0] = this.h[this.h.length - 1];
    this.h.pop();
    if (this.h.length) this.siftDown(0);
    return top;
  }

  peek() { return this.h[0]; }
}`
  },
  btree: {
    title: 'B-Tree (Order 3 / 2-3 Tree)',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(N)',
    explanationText:
      'A B-Tree is a balanced multi-way search tree. Each node can hold up to M\u22121 keys and M children, which keeps height tiny and minimizes disk I/O \u2014 the reason databases and file systems use it. Here we build a minimal order-3 (2-3) tree.',
    cpp: `#include <iostream>
#include <vector>
using namespace std;

const int M = 3;

struct BTreeNode {
    vector<int> keys;
    vector<BTreeNode*> children;
    bool leaf;

    BTreeNode(bool l) : leaf(l) {}

    int findKey(int k) {
        int idx = 0;
        while (idx < keys.size() && keys[idx] < k) idx++;
        return idx;
    }
};

void traverse(BTreeNode* node) {
    if (!node) return;
    for (int i = 0; i < node->keys.size(); i++) {
        if (!node->leaf) traverse(node->children[i]);
        cout << node->keys[i] << " ";
    }
    if (!node->leaf) traverse(node->children.back());
}

BTreeNode* splitChild(BTreeNode* parent, int i) {
    BTreeNode* full = parent->children[i];
    BTreeNode* newNode = new BTreeNode(full->leaf);

    int mid = full->keys.size() / 2;
    int midKey = full->keys[mid];

    for (int j = mid + 1; j < full->keys.size(); j++)
        newNode->keys.push_back(full->keys[j]);
    full->keys.resize(mid);

    if (!full->leaf) {
        for (int j = mid + 1; j < full->children.size(); j++)
            newNode->children.push_back(full->children[j]);
        full->children.resize(mid + 1);
    }

    parent->children.insert(parent->children.begin() + i + 1, newNode);
    parent->keys.insert(parent->keys.begin() + i, midKey);
    return parent;
}

BTreeNode* insertNonFull(BTreeNode* node, int k) {
    int i = node->findKey(k);
    if (node->leaf) {
        node->keys.insert(node->keys.begin() + i, k);
        return node;
    }
    if (node->children[i]->keys.size() == M - 1) {
        node = splitChild(node, i);
        if (k > node->keys[i]) i++;
    }
    node->children[i] = insertNonFull(node->children[i], k);
    return node;
}

BTreeNode* insert(BTreeNode* root, int k) {
    if (!root) return new BTreeNode(true);
    if (root->keys.size() == M - 1) {
        BTreeNode* s = new BTreeNode(false);
        s->children.push_back(root);
        s = splitChild(s, 0);
        return insertNonFull(s, k);
    }
    return insertNonFull(root, k);
}`,
    java: `import java.util.*;

public class BTree {
    static final int M = 3;

    static class Node {
        List<Integer> keys = new ArrayList<>();
        List<Node> children = new ArrayList<>();
        boolean leaf;

        Node(boolean l) { leaf = l; }

        int findKey(int k) {
            int idx = 0;
            while (idx < keys.size() && keys.get(idx) < k) idx++;
            return idx;
        }
    }

    Node splitChild(Node parent, int i) {
        Node full = parent.children.get(i);
        Node newNode = new Node(full.leaf);
        int mid = full.keys.size() / 2;
        int midKey = full.keys.get(mid);

        for (int j = mid + 1; j < full.keys.size(); j++)
            newNode.keys.add(full.keys.get(j));
        full.keys.subList(mid, full.keys.size()).clear();

        if (!full.leaf) {
            for (int j = mid + 1; j < full.children.size(); j++)
                newNode.children.add(full.children.get(j));
            full.children.subList(mid + 1, full.children.size()).clear();
        }

        parent.children.add(i + 1, newNode);
        parent.keys.add(i, midKey);
        return parent;
    }

    Node insertNonFull(Node node, int k) {
        int i = node.findKey(k);
        if (node.leaf) {
            node.keys.add(i, k);
            return node;
        }
        if (node.children.get(i).keys.size() == M - 1) {
            node = splitChild(node, i);
            if (k > node.keys.get(i)) i++;
        }
        node.children.set(i, insertNonFull(node.children.get(i), k));
        return node;
    }

    Node insert(Node root, int k) {
        if (root == null) return new Node(true);
        if (root.keys.size() == M - 1) {
            Node s = new Node(false);
            s.children.add(root);
            s = splitChild(s, 0);
            return insertNonFull(s, k);
        }
        return insertNonFull(root, k);
    }
}`,
    python: `M = 3

class BTreeNode:
    def __init__(self, leaf):
        self.keys = []
        self.children = []
        self.leaf = leaf

    def find_key(self, k):
        idx = 0
        while idx < len(self.keys) and self.keys[idx] < k:
            idx += 1
        return idx

def split_child(parent, i):
    full = parent.children[i]
    new_node = BTreeNode(full.leaf)
    mid = len(full.keys) // 2
    mid_key = full.keys[mid]

    new_node.keys = full.keys[mid + 1:]
    full.keys = full.keys[:mid]

    if not full.leaf:
        new_node.children = full.children[mid + 1:]
        full.children = full.children[:mid + 1]

    parent.children.insert(i + 1, new_node)
    parent.keys.insert(i, mid_key)
    return parent

def insert_non_full(node, k):
    i = node.find_key(k)
    if node.leaf:
        node.keys.insert(i, k)
        return node
    if len(node.children[i].keys) == M - 1:
        node = split_child(node, i)
        if k > node.keys[i]:
            i += 1
    node.children[i] = insert_non_full(node.children[i], k)
    return node

def insert(root, k):
    if root is None:
        return BTreeNode(True)
    if len(root.keys) == M - 1:
        s = BTreeNode(False)
        s.children.append(root)
        s = split_child(s, 0)
        return insert_non_full(s, k)
    return insert_non_full(root, k)`,
    javascript: `const M = 3;

class BTreeNode {
  constructor(leaf) {
    this.keys = [];
    this.children = [];
    this.leaf = leaf;
  }

  findKey(k) {
    let idx = 0;
    while (idx < this.keys.length && this.keys[idx] < k) idx++;
    return idx;
  }
}

function splitChild(parent, i) {
  const full = parent.children[i];
  const newNode = new BTreeNode(full.leaf);
  const mid = Math.floor(full.keys.length / 2);
  const midKey = full.keys[mid];

  newNode.keys = full.keys.slice(mid + 1);
  full.keys = full.keys.slice(0, mid);

  if (!full.leaf) {
    newNode.children = full.children.slice(mid + 1);
    full.children = full.children.slice(0, mid + 1);
  }

  parent.children.splice(i + 1, 0, newNode);
  parent.keys.splice(i, 0, midKey);
  return parent;
}

function insertNonFull(node, k) {
  let i = node.findKey(k);
  if (node.leaf) {
    node.keys.splice(i, 0, k);
    return node;
  }
  if (node.children[i].keys.length === M - 1) {
    node = splitChild(node, i);
    if (k > node.keys[i]) i++;
  }
  node.children[i] = insertNonFull(node.children[i], k);
  return node;
}

function insert(root, k) {
  if (!root) return new BTreeNode(true);
  if (root.keys.length === M - 1) {
    const s = new BTreeNode(false);
    s.children.push(root);
    return insertNonFull(splitChild(s, 0), k);
  }
  return insertNonFull(root, k);
}`
  },
  segment: {
    title: 'Segment Tree (Range Sum)',
    timeComplexity: 'build O(N) • query O(log N) • update O(log N)',
    spaceComplexity: 'O(4N)',
    explanationText:
      'A segment tree stores aggregate information (sum, min, max, gcd) for intervals of an array. Each node covers a range; queries merge O(log N) interval nodes, and point updates propagate in O(log N). Perfect for range queries with mutations.',
    cpp: `#include <vector>
using namespace std;

class SegmentTree {
    vector<int> tree;
    int n;

    int build(const vector<int>& a, int node, int l, int r) {
        if (l == r) return tree[node] = a[l];
        int mid = (l + r) / 2;
        return tree[node] = build(a, 2 * node, l, mid)
                          + build(a, 2 * node + 1, mid + 1, r);
    }

public:
    SegmentTree(const vector<int>& a) {
        n = a.size();
        tree.assign(4 * n, 0);
        if (n > 0) build(a, 1, 0, n - 1);
    }

    int query(int node, int l, int r, int ql, int qr) {
        if (ql > r || qr < l) return 0;
        if (ql <= l && r <= qr) return tree[node];
        int mid = (l + r) / 2;
        return query(2 * node, l, mid, ql, qr)
             + query(2 * node + 1, mid + 1, r, ql, qr);
    }

    void update(int node, int l, int r, int idx, int val) {
        if (l == r) { tree[node] = val; return; }
        int mid = (l + r) / 2;
        if (idx <= mid) update(2 * node, l, mid, idx, val);
        else update(2 * node + 1, mid + 1, r, idx, val);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    int rangeSum(int l, int r) { return query(1, 0, n - 1, l, r); }
    void pointUpdate(int idx, int val) { update(1, 0, n - 1, idx, val); }
};`,
    java: `public class SegmentTree {
    int[] tree;
    int n;

    public SegmentTree(int[] a) {
        n = a.length;
        tree = new int[4 * n];
        if (n > 0) build(a, 1, 0, n - 1);
    }

    private int build(int[] a, int node, int l, int r) {
        if (l == r) return tree[node] = a[l];
        int mid = (l + r) / 2;
        return tree[node] = build(a, 2 * node, l, mid)
                          + build(a, 2 * node + 1, mid + 1, r);
    }

    private int query(int node, int l, int r, int ql, int qr) {
        if (ql > r || qr < l) return 0;
        if (ql <= l && r <= qr) return tree[node];
        int mid = (l + r) / 2;
        return query(2 * node, l, mid, ql, qr)
             + query(2 * node + 1, mid + 1, r, ql, qr);
    }

    private void update(int node, int l, int r, int idx, int val) {
        if (l == r) { tree[node] = val; return; }
        int mid = (l + r) / 2;
        if (idx <= mid) update(2 * node, l, mid, idx, val);
        else update(2 * node + 1, mid + 1, r, idx, val);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    public int rangeSum(int l, int r) { return query(1, 0, n - 1, l, r); }
    public void pointUpdate(int idx, int val) { update(1, 0, n - 1, idx, val); }
}`,
    python: `class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        if self.n > 0:
            self._build(arr, 1, 0, self.n - 1)

    def _build(self, arr, node, l, r):
        if l == r:
            self.tree[node] = arr[l]
            return self.tree[node]
        mid = (l + r) // 2
        self.tree[node] = self._build(arr, 2 * node, l, mid) \
                        + self._build(arr, 2 * node + 1, mid + 1, r)
        return self.tree[node]

    def _query(self, node, l, r, ql, qr):
        if ql > r or qr < l:
            return 0
        if ql <= l and r <= qr:
            return self.tree[node]
        mid = (l + r) // 2
        return self._query(2 * node, l, mid, ql, qr) \
             + self._query(2 * node + 1, mid + 1, r, ql, qr)

    def _update(self, node, l, r, idx, val):
        if l == r:
            self.tree[node] = val
            return
        mid = (l + r) // 2
        if idx <= mid:
            self._update(2 * node, l, mid, idx, val)
        else:
            self._update(2 * node + 1, mid + 1, r, idx, val)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def range_sum(self, l, r):
        return self._query(1, 0, self.n - 1, l, r)

    def point_update(self, idx, val):
        self._update(1, 0, self.n - 1, idx, val)`,
    javascript: `class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n).fill(0);
    if (this.n > 0) this.build(arr, 1, 0, this.n - 1);
  }

  build(arr, node, l, r) {
    if (l === r) return (this.tree[node] = arr[l]);
    const mid = Math.floor((l + r) / 2);
    return (this.tree[node] =
      this.build(arr, 2 * node, l, mid) +
      this.build(arr, 2 * node + 1, mid + 1, r));
  }

  query(node, l, r, ql, qr) {
    if (ql > r || qr < l) return 0;
    if (ql <= l && r <= qr) return this.tree[node];
    const mid = Math.floor((l + r) / 2);
    return this.query(2 * node, l, mid, ql, qr) +
           this.query(2 * node + 1, mid + 1, r, ql, qr);
  }

  update(node, l, r, idx, val) {
    if (l === r) { this.tree[node] = val; return; }
    const mid = Math.floor((l + r) / 2);
    if (idx <= mid) this.update(2 * node, l, mid, idx, val);
    else this.update(2 * node + 1, mid + 1, r, idx, val);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  rangeSum(l, r) { return this.query(1, 0, this.n - 1, l, r); }
  pointUpdate(idx, val) { this.update(1, 0, this.n - 1, idx, val); }
}`
  }
};
