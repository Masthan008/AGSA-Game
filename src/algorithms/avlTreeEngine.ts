import { AnimationFrame, NodePosition, EdgeConnection } from '../types';

interface InternalAVLNode {
  id: number;
  val: number;
  height: number;
  left: InternalAVLNode | null;
  right: InternalAVLNode | null;
  x?: number;
  y?: number;
}

export function generateAVLTreeFrames(values: number[]): AnimationFrame[] {
  const frames: AnimationFrame[] = [];
  let root: InternalAVLNode | null = null;

  // Helper to convert internal tree to visual nodes & edges
  function computeCoordinates(node: InternalAVLNode | null, x: number, y: number, offset: number, nodes: NodePosition[], edges: EdgeConnection[], activeVal?: number, rotatedVal?: number) {
    if (!node) return;
    node.x = x;
    node.y = y;

    const leftH = node.left ? node.left.height : 0;
    const rightH = node.right ? node.right.height : 0;
    const bf = leftH - rightH;

    let state: NodePosition['state'] = 'default';
    if (activeVal !== undefined && node.val === activeVal) state = 'active';
    if (rotatedVal !== undefined && node.val === rotatedVal) state = 'success';
    if (Math.abs(bf) > 1) state = 'error';

    nodes.push({
      id: `node-${node.val}`,
      value: node.val,
      x,
      y,
      height: node.height,
      balanceFactor: bf,
      state
    });

    if (node.left) {
      const lx = x - offset;
      const ly = y + 70;
      edges.push({
        from: `node-${node.val}`,
        to: `node-${node.left.val}`,
        highlighted: activeVal === node.left.val
      });
      computeCoordinates(node.left, lx, ly, offset * 0.55, nodes, edges, activeVal, rotatedVal);
    }

    if (node.right) {
      const rx = x + offset;
      const ry = y + 70;
      edges.push({
        from: `node-${node.val}`,
        to: `node-${node.right.val}`,
        highlighted: activeVal === node.right.val
      });
      computeCoordinates(node.right, rx, ry, offset * 0.55, nodes, edges, activeVal, rotatedVal);
    }
  }

  function getSnapshot(title: string, action: string, reason: string, formula: string, codeStep: string, activeVal?: number, rotatedVal?: number): AnimationFrame {
    const nodes: NodePosition[] = [];
    const edges: EdgeConnection[] = [];
    computeCoordinates(root, 300, 50, 120, nodes, edges, activeVal, rotatedVal);

    return {
      stepIndex: frames.length + 1,
      totalSteps: 0,
      title,
      explanation: { action, reason, formula },
      codeStep,
      nodes,
      edges,
      variableWatch: {
        'Tree Size': nodes.length,
        'Root Key': root ? root.val : 'NULL',
        'Current Node': activeVal ?? 'None'
      }
    };
  }

  function getHeight(n: InternalAVLNode | null): number {
    return n ? n.height : 0;
  }

  function getBalance(n: InternalAVLNode | null): number {
    return n ? getHeight(n.left) - getHeight(n.right) : 0;
  }

  function rotateRight(y: InternalAVLNode): InternalAVLNode {
    const x = y.left!;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
    x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
    return x;
  }

  function rotateLeft(x: InternalAVLNode): InternalAVLNode {
    const y = x.right!;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
    y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
    return y;
  }

  function insert(node: InternalAVLNode | null, val: number): InternalAVLNode {
    if (!node) {
      const newNode = { id: val, val, height: 1, left: null, right: null };
      return newNode;
    }

    if (val < node.val) {
      node.left = insert(node.left, val);
    } else if (val > node.val) {
      node.right = insert(node.right, val);
    } else {
      return node;
    }

    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
    const balance = getBalance(node);

    // Record check snapshot
    return node;
  }

  // Initial Empty Frame
  frames.push({
    stepIndex: 1,
    totalSteps: 0,
    title: 'Initialize Empty AVL Tree',
    explanation: {
      action: 'Start AVL Tree Session',
      reason: 'AVL trees are self-balancing binary search trees.',
      formula: 'Balance Factor = Height(Left) - Height(Right) ∈ {-1, 0, 1}'
    },
    codeStep: 'insert:compare',
    nodes: [],
    edges: []
  });

  // Execute insertions with frames
  for (const val of values) {
    frames.push(getSnapshot(
      `Inserting Key ${val}`,
      `Traversing Binary Search Tree to place ${val}`,
      `Comparing ${val} with current nodes to locate insertion position.`,
      `Key ${val} < current node => go Left, else go Right`,
      'insert:compare',
      val
    ));

    // Build tree iteratively/recursively
    function insertAndFrame(curr: InternalAVLNode | null, key: number): InternalAVLNode {
      if (!curr) return { id: key, val: key, height: 1, left: null, right: null };

      if (key < curr.val) curr.left = insertAndFrame(curr.left, key);
      else if (key > curr.val) curr.right = insertAndFrame(curr.right, key);
      else return curr;

      curr.height = 1 + Math.max(getHeight(curr.left), getHeight(curr.right));
      const bf = getBalance(curr);

      // LL Case
      if (bf > 1 && key < curr.left!.val) {
        frames.push(getSnapshot(
          `Imbalance Detected at Node ${curr.val} (BF = +2)`,
          `Left-Left (LL) Imbalance`,
          `Node ${curr.val} balance factor is +2. Left child ${curr.left!.val} is left-heavy. Performing Right Rotation.`,
          `Rotate Right around Node ${curr.val}`,
          'avl:imbalance',
          curr.val
        ));
        const rotated = rotateRight(curr);
        return rotated;
      }

      // RR Case
      if (bf < -1 && key > curr.right!.val) {
        frames.push(getSnapshot(
          `Imbalance Detected at Node ${curr.val} (BF = -2)`,
          `Right-Right (RR) Imbalance`,
          `Node ${curr.val} balance factor is -2. Right child ${curr.right!.val} is right-heavy. Performing Left Rotation.`,
          `Rotate Left around Node ${curr.val}`,
          'avl:imbalance',
          curr.val
        ));
        const rotated = rotateLeft(curr);
        return rotated;
      }

      // LR Case
      if (bf > 1 && key > curr.left!.val) {
        frames.push(getSnapshot(
          `Imbalance Detected at Node ${curr.val} (BF = +2)`,
          `Left-Right (LR) Double Imbalance`,
          `Performing initial Left Rotation on child ${curr.left!.val}, followed by Right Rotation on parent ${curr.val}.`,
          `Rotate Left(${curr.left!.val}) -> Rotate Right(${curr.val})`,
          'avl:imbalance',
          curr.val
        ));
        curr.left = rotateLeft(curr.left!);
        return rotateRight(curr);
      }

      // RL Case
      if (bf < -1 && key < curr.right!.val) {
        frames.push(getSnapshot(
          `Imbalance Detected at Node ${curr.val} (BF = -2)`,
          `Right-Left (RL) Double Imbalance`,
          `Performing initial Right Rotation on child ${curr.right!.val}, followed by Left Rotation on parent ${curr.val}.`,
          `Rotate Right(${curr.right!.val}) -> Rotate Left(${curr.val})`,
          'avl:imbalance',
          curr.val
        ));
        curr.right = rotateRight(curr.right!);
        return rotateLeft(curr);
      }

      return curr;
    }

    root = insertAndFrame(root, val);

    frames.push(getSnapshot(
      `Insertion Completed for Key ${val}`,
      `Tree Balanced Successfully`,
      `Key ${val} is inserted. All node balance factors satisfy |BF| <= 1.`,
      `Height = ${root ? root.height : 0}`,
      'insert:done',
      undefined,
      val
    ));
  }

  // Update total steps count
  const total = frames.length;
  frames.forEach(f => f.totalSteps = total);

  return frames;
}
