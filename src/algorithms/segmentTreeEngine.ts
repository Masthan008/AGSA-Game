import { AnimationFrame, NodePosition, EdgeConnection } from '../types';

interface SegNode {
  id: string;
  l: number;
  r: number;
  sum: number;
  left: SegNode | null;
  right: SegNode | null;
  x?: number;
  y?: number;
}

// Builds a segment tree for range-sum queries, emitting a frame for every node created.
export function generateSegmentTreeFrames(values: number[] = [1, 3, 5, 7, 9, 11]): AnimationFrame[] {
  const frames: AnimationFrame[] = [];
  const n = values.length;
  if (n === 0) return frames;

  function computeCoordinates(
    node: SegNode | null,
    x: number,
    y: number,
    offset: number,
    nodes: NodePosition[],
    edges: EdgeConnection[],
    activeId?: string
  ) {
    if (!node) return;
    node.x = x;
    node.y = y;

    nodes.push({
      id: node.id,
      value: node.sum,
      x,
      y,
      state: activeId === node.id ? 'active' : node.l === node.r ? 'success' : 'default',
      label: `[${node.l}..${node.r}]`
    });

    if (node.left) {
      edges.push({ from: node.id, to: node.left.id, label: `[${node.left.l}..${node.left.r}]`, highlighted: activeId === node.left.id });
      computeCoordinates(node.left, x - offset, y + 70, offset * 0.55, nodes, edges, activeId);
    }
    if (node.right) {
      edges.push({ from: node.id, to: node.right.id, label: `[${node.right.l}..${node.right.r}]`, highlighted: activeId === node.right.id });
      computeCoordinates(node.right, x + offset, y + 70, offset * 0.55, nodes, edges, activeId);
    }
  }

  let rootRef: { current: SegNode | null } = { current: null };

  function snapshot(title: string, action: string, reason: string, formula: string, activeId?: string): AnimationFrame {
    const nodes: NodePosition[] = [];
    const edges: EdgeConnection[] = [];
    computeCoordinates(rootRef.current, 300, 45, 130, nodes, edges, activeId);

    return {
      stepIndex: frames.length + 1,
      totalSteps: 0,
      title,
      explanation: { action, reason, formula },
      highlightCodeLines: { cpp: [10, 11, 12], java: [8, 9], python: [8, 9], javascript: [7, 8] },
      nodes,
      edges,
      variableWatch: {
        'Array': values.join(', '),
        'Current Node': activeId ?? 'None',
        'Tree Nodes': nodes.length
      }
    };
  }

  function build(l: number, r: number): SegNode {
    const id = `seg-${l}-${r}`;
    const node: SegNode = { id, l, r, sum: 0, left: null, right: null };
    rootRef.current = node;

    if (l === r) {
      node.sum = values[l];
      frames.push(snapshot(
        `Create Leaf Node [${l}..${l}] = ${values[l]}`,
        `Leaf stores original array value`,
        `Range [${l}..${l}] is a single element, so sum = array[${l}] = ${values[l]}.`,
        `tree[${l}..${l}] = a[${l}] = ${values[l]}`,
        id
      ));
      return node;
    }

    const mid = Math.floor((l + r) / 2);
    frames.push(snapshot(
      `Create Internal Node [${l}..${r}]`,
      `Splitting range into [${l}..${mid}] and [${mid + 1}..${r}]`,
      `Internal nodes aggregate their children. Build left half first, then right half.`,
      `mid = (${l} + ${r}) / 2 = ${mid}`,
      id
    ));

    node.left = build(l, mid);
    node.right = build(mid + 1, r);
    node.sum = node.left.sum + node.right.sum;

    frames.push(snapshot(
      `Merge Node [${l}..${r}] = ${node.sum}`,
      `Sum = left child + right child`,
      `node[${l}..${r}].sum = ${node.left.sum} + ${node.right.sum} = ${node.sum}.`,
      `sum[${l}..${r}] = sum[${l}..${mid}] + sum[${mid + 1}..${r}]`,
      id
    ));

    return node;
  }

  build(0, n - 1);

  // Range query demonstration: full range and a sub-range
  frames.push(snapshot(
    'Range Query [0..' + (n - 1) + ']',
    'Query entire array',
    'Full range matches the root node exactly, so the answer is the root sum.',
    `query(0, ${n - 1}) = ${rootRef.current!.sum}`,
    rootRef.current!.id
  ));

  const total = frames.length;
  frames.forEach(f => f.totalSteps = total);
  return frames;
}
