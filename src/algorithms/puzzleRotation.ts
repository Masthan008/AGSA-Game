import { NodePosition, EdgeConnection } from '../types';

export type RotationType = 'LL' | 'RR' | 'LR' | 'RL';

export interface RotationResult {
  nodes: NodePosition[];
  edges: EdgeConnection[];
  balanced: boolean;
  rootValue: number | null;
}

interface TreeNode {
  id: number;
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function buildTree(nodes: NodePosition[], edges: EdgeConnection[]): TreeNode | null {
  if (nodes.length === 0) return null;
  const byId = new Map<number, TreeNode>();
  const xOf = new Map<number, number>();
  nodes.forEach(n => {
    byId.set(Number(n.id), { id: Number(n.id), value: n.value, left: null, right: null });
    xOf.set(Number(n.id), n.x);
  });
  const hasParent = new Set<number>();
  edges.forEach(e => {
    const parent = byId.get(Number(e.from));
    const child = byId.get(Number(e.to));
    if (parent && child) {
      const childIsLeft = (xOf.get(child.id) ?? 0) < (xOf.get(parent.id) ?? 0);
      if (childIsLeft) parent.left = child;
      else parent.right = child;
      hasParent.add(child.id);
    }
  });
  const root = nodes.find(n => !hasParent.has(Number(n.id)));
  return root ? byId.get(Number(root.id))! : byId.get(Number(nodes[0].id))!;
}

function rotateLeft(x: TreeNode): TreeNode {
  const r = x.right;
  if (!r) return x;
  x.right = r.left;
  r.left = x;
  return r;
}

function rotateRight(x: TreeNode): TreeNode {
  const l = x.left;
  if (!l) return x;
  x.left = l.right;
  l.right = x;
  return l;
}

export function applyRotationToTree(
  nodes: NodePosition[],
  edges: EdgeConnection[],
  rotation: RotationType
): RotationResult {
  const root = buildTree(nodes, edges);
  if (!root) return { nodes: [], edges: [], balanced: false, rootValue: null };

  let newRoot = root;
  switch (rotation) {
    case 'LL':
      newRoot = rotateRight(root);
      break;
    case 'RR':
      newRoot = rotateLeft(root);
      break;
    case 'LR':
      if (root.left) root.left = rotateLeft(root.left);
      newRoot = rotateRight(root);
      break;
    case 'RL':
      if (root.right) root.right = rotateRight(root.right);
      newRoot = rotateLeft(root);
      break;
  }

  const heights = new Map<number, number>();
  const heightsOf = (n: TreeNode | null): number => {
    if (!n) return 0;
    const cached = heights.get(n.id);
    if (cached !== undefined) return cached;
    const h = 1 + Math.max(heightsOf(n.left), heightsOf(n.right));
    heights.set(n.id, h);
    return h;
  };
  const balanceOf = (n: TreeNode): number => heightsOf(n.left) - heightsOf(n.right);

  const all: TreeNode[] = [];
  const inorder: TreeNode[] = [];
  (function walk(n: TreeNode) {
    if (n.left) walk(n.left);
    inorder.push(n);
    if (n.right) walk(n.right);
    all.push(n);
  })(newRoot);

  const n = inorder.length;
  const xFor = new Map<number, number>();
  inorder.forEach((node, idx) => xFor.set(node.id, 300 + (idx - (n - 1) / 2) * 110));

  const depthOf = new Map<number, number>();
  (function assignDepth(n: TreeNode, d: number) {
    depthOf.set(n.id, d);
    if (n.left) assignDepth(n.left, d + 1);
    if (n.right) assignDepth(n.right, d + 1);
  })(newRoot, 0);

  const balanced = all.every(node => Math.abs(balanceOf(node)) <= 1);
  const unbalancedRoots = all.filter(node => Math.abs(balanceOf(node)) > 1);

  const resultNodes: NodePosition[] = all.map(node => {
    const bf = balanceOf(node);
    const isUnbalanced = Math.abs(bf) > 1;
    let state: NodePosition['state'] = balanced ? 'success' : 'default';
    if (isUnbalanced) state = 'error';
    else if (!balanced && unbalancedRoots.some(u => u.left === node || u.right === node)) state = 'warning';
    return {
      id: node.id,
      value: node.value,
      x: xFor.get(node.id)!,
      y: 45 + depthOf.get(node.id)! * 80,
      balanceFactor: bf,
      state
    };
  });

  const resultEdges: EdgeConnection[] = [];
  (function collectEdges(n: TreeNode) {
    if (n.left) {
      resultEdges.push({ from: n.id, to: n.left.id });
      collectEdges(n.left);
    }
    if (n.right) {
      resultEdges.push({ from: n.id, to: n.right.id });
      collectEdges(n.right);
    }
  })(newRoot);

  return { nodes: resultNodes, edges: resultEdges, balanced, rootValue: newRoot.value };
}
