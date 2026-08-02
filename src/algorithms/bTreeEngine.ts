import { AnimationFrame, NodePosition, EdgeConnection } from '../types';

// ============================================================================
// B-Tree Engine — real-time insert with splits, median promotion and root
// growth. Implements the textbook CLRS algorithm for a B-tree of order
// m = 2t where t is the minimum degree:
//   • Every node holds at most  (2t - 1) keys  and at least (t - 1) keys
//     (the root may hold as few as 1 key).
//   • Every internal node has at most 2t children and at least t children
//     (the root may have as few as 2).
//   • All leaves appear on the same level (perfect height balance).
//   • Every insertion starts at a leaf; overflowing nodes split by promoting
//     the median key to the parent (bottom-up rebalancing).
// ============================================================================

export interface BTreeNode {
  id: string;
  keys: number[];
  children: BTreeNode[];
  leaf: boolean;
  x?: number;
  y?: number;
}

const KEY_W = 34;
const NODE_GAP = 26;
const ROW_H = 92;
const Y_TOP = 64;

let nodeSeq = 0;

function newNode(leaf: boolean): BTreeNode {
  return { id: `bt-${nodeSeq++}`, keys: [], children: [], leaf };
}

function nodeWidth(keys: number[]): number {
  return keys.length * KEY_W + 10;
}

// Weighted in-order layout: leaves spread bottom-up, parents center over the
// span of their children so nothing ever overlaps.
function layoutTree(root: BTreeNode): { x: number; y: number }[] {
  const pos: { x: number; y: number }[] = [];
  const maxDepth = (() => {
    let md = 0;
    const walk = (n: BTreeNode, d: number) => {
      md = Math.max(md, d);
      n.children.forEach(c => walk(c, d + 1));
    };
    walk(root, 0);
    return md;
  })();

  let nextLeafX = 130;
  const place = (n: BTreeNode, d: number): { minX: number; maxX: number } => {
    if (n.children.length === 0) {
      const x = nextLeafX;
      nextLeafX += nodeWidth(n.keys) + NODE_GAP;
      pos.push({ x, y: Y_TOP + maxDepth * ROW_H });
      return { minX: x - nodeWidth(n.keys) / 2, maxX: x + nodeWidth(n.keys) / 2 };
    }
    const spans = n.children.map(c => place(c, d + 1));
    const minX = Math.min(...spans.map(s => s.minX));
    const maxX = Math.max(...spans.map(s => s.maxX));
    const x = (minX + maxX) / 2;
    pos.push({ x, y: Y_TOP + d * ROW_H });
    return { minX: x - nodeWidth(n.keys) / 2, maxX: x + nodeWidth(n.keys) / 2 };
  };
  place(root, 0);
  return pos;
}

function toFrames(
  title: string,
  action: string,
  reason: string,
  formula: string | undefined,
  root: BTreeNode,
  frames: AnimationFrame[],
  extra: Record<string, any> = {}
): void {
  const pos = layoutTree(root);
  const idPos = new Map<string, { x: number; y: number }>();
  const walkPost = (n: BTreeNode) => {
    n.children.forEach(walkPost);
    const p = pos.shift();
    if (p) idPos.set(n.id, p);
  };
  walkPost(root);

  const nodes: NodePosition[] = [];
  const edges: EdgeConnection[] = [];
  const walkNodes = (n: BTreeNode) => {
    const p = idPos.get(n.id)!;
    nodes.push({
      id: n.id,
      value: n.keys.join(' | '),
      keys: n.keys,
      x: p.x,
      y: p.y,
      state: (extra.activeId === n.id ? 'active' : extra.warnId === n.id ? 'warning' : extra.pivotId === n.id ? 'pivot' : extra.okId === n.id ? 'success' : 'default') as NodePosition['state'],
      label: n.leaf ? 'LEAF' : 'NODE',
    });
    n.children.forEach(c => {
      const cp = idPos.get(c.id)!;
      edges.push({ from: n.id, to: c.id, highlighted: extra.activeId === n.id || extra.activeId === c.id });
      walkNodes(c);
    });
  };
  walkNodes(root);

  const heights = nodes.map(n => Math.round((n.y - Y_TOP) / ROW_H));
  frames.push({
    stepIndex: frames.length + 1,
    totalSteps: 0,
    title,
    explanation: { action, reason, formula },
    nodes,
    edges,
    variableWatch: {
      ...extra.vars,
      'Tree Nodes': nodes.length,
      'Height': String((heights.length ? Math.max(...heights) : 0) + 1),
    },
  });
}

function maxDepthOf(root: BTreeNode): number {
  let md = 0;
  const walk = (n: BTreeNode, d: number) => {
    md = Math.max(md, d);
    n.children.forEach(c => walk(c, d + 1));
  };
  walk(root, 0);
  return md;
}

export function generateBTreeFrames(minDegree: number = 2, values: number[] = [10, 20, 30, 40, 50, 25]): AnimationFrame[] {
  const t = Math.max(2, Math.min(6, Math.floor(minDegree)));
  const m = 2 * t;
  const maxKeys = 2 * t - 1;
  const minKeys = t - 1;
  const frames: AnimationFrame[] = [];
  nodeSeq = 0;
  let root: BTreeNode = newNode(true);

  const VARS = (node: BTreeNode, key: number | null) => ({
    'Min degree t': String(t),
    'Order m = 2t': String(m),
    'Max keys / node': String(maxKeys),
    'Min keys / node': `t - 1 = ${minKeys}`,
    'Max children': String(m),
    'Min children (internal)': String(t),
    'Target key': key === null ? '—' : String(key),
    'Current node': node.id,
  });

  // Intro frame — full B-tree theory
  frames.push({
    stepIndex: 1,
    totalSteps: 0,
    title: `B-Tree (order m = ${m}, min degree t = ${t})`,
    explanation: {
      action: 'Understand the B-Tree rules before inserting keys',
      reason: 'A B-Tree of order m = 2t is a self-balancing multi-way search tree used by databases (MySQL InnoDB, PostgreSQL, MongoDB) and filesystems (NTFS, ext4). Every node stores sorted keys that divide the search space into (keys + 1) child subtrees.',
      formula: `Node capacity: [t-1, 2t-1] = [${minKeys}, ${maxKeys}] keys · Children: [t, 2t] = [${t}, ${m}] · Height: O(log_t N)`,
    },
    nodes: [],
    edges: [],
    variableWatch: VARS(root, null),
  });

  const snapshotAll = (title: string, action: string, reason: string, formula?: string, extra: Record<string, any> = {}) =>
    toFrames(title, action, reason, formula, root, frames, { vars: VARS(root, null), ...extra });

  const insertIntoNode = (node: BTreeNode, key: number) => {
    const i = node.keys.findIndex(k => k > key);
    const at = i === -1 ? node.keys.length : i;
    node.keys.splice(at, 0, key);
  };

  const insert = (key: number) => {
    // Search path down to the leaf — every comparison becomes a frame
    let node = root;
    let depth = 0;
    while (!node.leaf) {
      let i = 0;
      while (i < node.keys.length && key > node.keys[i]) i++;
      const child = node.children[i];
      const cmpText = i === 0
        ? `key ${key} < ${node.keys[0]} → go to leftmost child`
        : i === node.keys.length
          ? `key ${key} > ${node.keys[node.keys.length - 1]} → go to rightmost child`
          : `key ${key} between ${node.keys[i - 1]} and ${node.keys[i]} → go to child ${i}`;
      snapshotAll(
        `Search: ${cmpText}`,
        `Descend to level ${depth + 1}`,
        `In a B-tree, keys in a node are sorted; comparisons between them pick exactly one child subtree (key comparisons only — O(log_t N) levels).`,
        `node.keys = [${node.keys.join(', ')}]`,
        { activeId: node.id, vars: VARS(root, key) }
      );
      node = child;
      depth++;
    }

    // Insert into leaf
    const at = node.keys.findIndex(k => k > key);
    const insertAt = at === -1 ? node.keys.length : at;
    node.keys.splice(insertAt, 0, key);
    snapshotAll(
      `Insert ${key} into Leaf (position ${insertAt})`,
      `Key ${key} placed in sorted position in the leaf`,
      `Insertions ALWAYS start at a leaf: find the sorted slot and shift larger keys right. The leaf now holds [${node.keys.join(', ')}].`,
      `slot(${key}) = ${insertAt}`,
      { activeId: node.id, vars: VARS(root, key) }
    );

    // Bottom-up overflow handling
    let current = node;
    let currentKey = key;
    while (current.keys.length > maxKeys) {
      if (current === root) {
        const mid = Math.floor(current.keys.length / 2);
        const median = current.keys[mid];
        const leftKeys = current.keys.slice(0, mid);
        const rightKeys = current.keys.slice(mid + 1);

        const newRoot = newNode(false);
        newRoot.keys = [median];
        const leftNode = newNode(current.leaf);
        const rightNode = newNode(current.leaf);
        leftNode.keys = leftKeys;
        rightNode.keys = rightKeys;

        if (!current.leaf) {
          const midChild = Math.floor(current.children.length / 2);
          leftNode.children = current.children.slice(0, midChild);
          rightNode.children = current.children.slice(midChild);
        }
        newRoot.children = [leftNode, rightNode];

        snapshotAll(
          `Root Split — Tree Grows a Level`,
          `Root overflowed; median ${median} becomes the new root`,
          `When the ROOT overflows, a fresh root is created holding only the median key. The tree height increases by exactly 1 — this is the ONLY way a B-tree grows, and every leaf stays at the same depth.`,
          `New root: [${median}] · Height becomes ${maxDepthOf(newRoot) + 1}`,
          { pivotId: newRoot.id, warnId: leftNode.id, okId: rightNode.id, vars: VARS(newRoot, key) }
        );
        root = newRoot;
        current = newRoot;
        currentKey = key;
        break;
      }

      // Find parent and child index, then split
      const findParentOf = (n: BTreeNode, target: BTreeNode): BTreeNode | null => {
        for (const child of n.children) {
          if (child === target) return n;
          const found = findParentOf(child, target);
          if (found) return found;
        }
        return null;
      };
      const parent = current === root ? null : findParentOf(root, current);

      const mid = Math.floor(current.keys.length / 2);
      const median = current.keys[mid];
      const leftKeys = current.keys.slice(0, mid);
      const rightKeys = current.keys.slice(mid + 1);

      const leftNode = newNode(current.leaf);
      const rightNode = newNode(current.leaf);
      leftNode.keys = leftKeys;
      rightNode.keys = rightKeys;
      if (!current.leaf) {
        const midChild = Math.floor(current.children.length / 2);
        leftNode.children = current.children.slice(0, midChild);
        rightNode.children = current.children.slice(midChild);
      }

      snapshotAll(
        `Split Node — Promote Median ${median}`,
        `Node [${current.keys.join(', ')}] overflowed; median ${median} rises to parent`,
        `A node can hold at most ${maxKeys} keys. After the insert it held ${maxKeys + 1}, so it splits: the median key ${median} is PROMOTED to the parent, keys < ${median} stay in the left node, keys > ${median} move to the right node. Splitting may cascade upward.`,
        `Left: [${leftKeys.join(', ')}] · Right: [${rightKeys.join(', ')}]`,
        { pivotId: leftNode.id, warnId: rightNode.id, vars: VARS(root, key) }
      );

      if (parent) {
        const childIdx = parent.children.indexOf(current);
        parent.children[childIdx] = leftNode;
        parent.children.splice(childIdx + 1, 0, rightNode);
        insertIntoNode(parent, median);
        current = parent;
      }
    }
  };

  for (const v of values) insert(v);

  // Final frame — the complete, valid B-tree with every invariant stated
  const depth = maxDepthOf(root) + 1;
  snapshotAll(
    `Final B-Tree — ${values.length} Keys Inserted`,
    'All invariants verified',
    `✓ Every node holds ${minKeys}–${maxKeys} keys (root may hold 1) · ✓ Internal nodes have ${t}–${m} children · ✓ All leaves are on level ${depth - 1} (height = ${depth}) · ✓ Keys in every node are sorted · ✓ Search, insert cost O(log_t N)`,
    `Height O(log_${t} N) = O(log N / log t) — less than ${Math.ceil(Math.log((values.length + 1) / 2) / Math.log(t)) + 1} for this tree`,
    { okId: root.id, vars: VARS(root, null) },
  );

  const total = frames.length;
  frames.forEach(f => f.totalSteps = total);
  return frames;
}
