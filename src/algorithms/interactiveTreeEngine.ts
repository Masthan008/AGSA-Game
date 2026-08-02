import { AnimationFrame, NodePosition, EdgeConnection } from '../types';

interface TreeNodeData {
  value: number;
  height: number;
  balanceFactor: number;
  left: TreeNodeData | null;
  right: TreeNodeData | null;
}

interface InteractiveOptions {
  balancing?: boolean;
}

export function getTreeHeight(node: TreeNodeData | null): number {
  return node ? node.height : 0;
}

function getBF(node: TreeNodeData): number {
  return getTreeHeight(node.left) - getTreeHeight(node.right);
}

function updateNodeHeight(node: TreeNodeData): void {
  node.height = 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right));
  node.balanceFactor = getBF(node);
}

function rotateRight(y: TreeNodeData): TreeNodeData {
  const x = y.left!;
  const T2 = x.right;
  x.right = y;
  y.left = T2;
  updateNodeHeight(y);
  updateNodeHeight(x);
  return x;
}

function rotateLeft(x: TreeNodeData): TreeNodeData {
  const y = x.right!;
  const T2 = y.left;
  y.left = x;
  x.right = T2;
  updateNodeHeight(x);
  updateNodeHeight(y);
  return y;
}

function balanceAVL(node: TreeNodeData): TreeNodeData {
  updateNodeHeight(node);
  const bf = node.balanceFactor;

  if (bf > 1) {
    if (node.left && getBF(node.left) < 0) node.left = rotateLeft(node.left);
    return rotateRight(node);
  }
  if (bf < -1) {
    if (node.right && getBF(node.right) > 0) node.right = rotateRight(node.right);
    return rotateLeft(node);
  }
  return node;
}

// Build a tree from a list of values. With balancing=true the result is an AVL
// tree (used to reconstruct state after interactive operations).
function buildTreeFromValues(values: number[], balancing: boolean): TreeNodeData | null {
  let root: TreeNodeData | null = null;
  const insertInternal = (node: TreeNodeData | null, val: number): TreeNodeData => {
    if (!node) {
      const newNode: TreeNodeData = { value: val, height: 1, balanceFactor: 0, left: null, right: null };
      updateNodeHeight(newNode);
      return newNode;
    }
    if (val < node.value) node.left = insertInternal(node.left, val);
    else if (val > node.value) node.right = insertInternal(node.right, val);
    else return node;
    return balancing ? balanceAVL(node) : node;
  };

  for (const v of values) {
    root = insertInternal(root, v);
  }
  return root;
}

// Adaptive layout that avoids overlapping nodes.
function computeLayout(
  root: TreeNodeData | null,
  activeVal?: number,
  successVals?: number[],
  errorVal?: number,
  warningVal?: number,
  pathVals: number[] = []
): { nodes: NodePosition[]; edges: EdgeConnection[] } {
  const nodes: NodePosition[] = [];
  const edges: EdgeConnection[] = [];
  const successSet = new Set(successVals || []);
  const pathSet = new Set(pathVals);

  function walk(node: TreeNodeData, x: number, y: number, depth: number): void {
    let state: NodePosition['state'] = 'default';
    if (node.value === errorVal) state = 'error';
    else if (node.value === warningVal) state = 'warning';
    else if (node.value === activeVal) state = 'active';
    else if (successSet.has(node.value)) state = 'success';
    else if (pathSet.has(node.value)) state = 'comparing';

    nodes.push({
      id: `node-${node.value}`,
      value: node.value,
      x,
      y,
      height: node.height,
      balanceFactor: node.balanceFactor,
      state
    });

    const offset = 140 / Math.pow(1.35, depth);
    if (node.left) {
      edges.push({
        from: `node-${node.value}`,
        to: `node-${node.left.value}`,
        highlighted: (pathSet.has(node.value) && pathSet.has(node.left.value)) || node.value === activeVal
      });
      walk(node.left, x - offset, y + 65, depth + 1);
    }
    if (node.right) {
      edges.push({
        from: `node-${node.value}`,
        to: `node-${node.right.value}`,
        highlighted: (pathSet.has(node.value) && pathSet.has(node.right.value)) || node.value === activeVal
      });
      walk(node.right, x + offset, y + 65, depth + 1);
    }
  }

  if (root) walk(root, 300, 55, 0);
  return { nodes, edges };
}

interface FrameInput {
  title: string;
  action: string;
  reason: string;
  formula?: string;
  codeStep: string;
  activeVal?: number;
  successVals?: number[];
  errorVal?: number;
  warningVal?: number;
  pathVals?: number[];
  variableWatch?: Record<string, any>;
}

// Ready state shown before the student inserts any nodes.
export function generateEmptyTreeFrame(topicTitle: string): AnimationFrame {
  return {
    stepIndex: 1,
    totalSteps: 1,
    title: 'Tree Ready',
    explanation: {
      action: `Start your ${topicTitle} session`,
      reason:
        'The tree is empty. Type a number and press Insert (or Delete / Search) to see every comparison, pointer move and rotation explained step by step in real time.',
      formula: 'Insert / Search / Delete: O(log N) on a balanced tree'
    },
    codeStep: 'insert:compare',
    nodes: [],
    edges: []
  };
}

function makeFrame(root: TreeNodeData | null, input: FrameInput): AnimationFrame {
  const { nodes, edges } = computeLayout(root, input.activeVal, input.successVals, input.errorVal, input.warningVal, input.pathVals);
  return {
    stepIndex: 0,
    totalSteps: 0,
    title: input.title,
    explanation: { action: input.action, reason: input.reason, formula: input.formula },
    codeStep: input.codeStep,
    nodes,
    edges,
    variableWatch: input.variableWatch
  };
}

function renumber(frames: AnimationFrame[]): AnimationFrame[] {
  const total = frames.length;
  frames.forEach((f, i) => {
    f.stepIndex = i + 1;
    f.totalSteps = total;
  });
  return frames;
}

// ---------------------------------------------------------------------------
// INSERT — step by step: compare -> traverse left/right -> create node ->
// (AVL) detect imbalance -> rotate -> done
// ---------------------------------------------------------------------------
export function generateInteractiveInsertFrames(
  existingValues: number[],
  newValue: number,
  opts: InteractiveOptions = {}
): { frames: AnimationFrame[]; updatedValues: number[] } {
  const balancing = !!opts.balancing;
  if (existingValues.includes(newValue)) {
    return {
      frames: renumber([makeFrame(buildTreeFromValues(existingValues, balancing), {
        title: `Node ${newValue} Already Exists`,
        action: 'Duplicate key ignored',
        reason: `BST rule: left < node < right. A key equal to ${newValue} is already present, so nothing is inserted.`,
        formula: 'Equal keys are not inserted again',
        codeStep: 'search:found',
        warningVal: newValue
      })]),
      updatedValues: existingValues
    };
  }

  let root = buildTreeFromValues(existingValues, balancing);
  const frames: AnimationFrame[] = [];
  const path: TreeNodeData[] = [];

  const startFrame = makeFrame(root, {
    title: `Insert ${newValue} — Start at Root`,
    action: `Comparing ${newValue} with root`,
    reason: root
      ? `Begin at root (${root.value}). If ${newValue} < ${root.value} go left, else go right.`
      : 'The tree is empty, so this node becomes the root.',
    formula: `${newValue} < ${root ? root.value : '—'} ? go Left : go Right`,
    codeStep: 'insert:compare',
    activeVal: root?.value,
    pathVals: root ? [root.value] : [],
    variableWatch: { 'Inserting': newValue, 'Current Node': root ? root.value : 'NULL (empty tree)' }
  });
  frames.push(startFrame);

  let parent: TreeNodeData | null = null;
  let dir: 'left' | 'right' | null = null;
  let curr: TreeNodeData | null = root;

  while (curr) {
    path.push(curr);
    if (newValue === curr.value) break;

    if (newValue < curr.value) {
      parent = curr;
      dir = 'left';
      frames.push(makeFrame(root, {
        title: `${newValue} < ${curr.value} — Traverse Left`,
        action: `Moving to the left child of ${curr.value}`,
        reason: `Since ${newValue} is smaller than ${curr.value}, it belongs in the left subtree.`,
        formula: `${newValue} < ${curr.value}  =>  go Left`,
        codeStep: 'insert:goLeft',
        activeVal: curr.value,
        pathVals: path.map(n => n.value),
        variableWatch: { 'Inserting': newValue, 'Current Node': curr.value, 'Next': curr.left ? `left child ${curr.left.value}` : 'NULL (create here)' }
      }));
      curr = curr.left;
    } else {
      parent = curr;
      dir = 'right';
      frames.push(makeFrame(root, {
        title: `${newValue} > ${curr.value} — Traverse Right`,
        action: `Moving to the right child of ${curr.value}`,
        reason: `Since ${newValue} is larger than ${curr.value}, it belongs in the right subtree.`,
        formula: `${newValue} > ${curr.value}  =>  go Right`,
        codeStep: 'insert:goRight',
        activeVal: curr.value,
        pathVals: path.map(n => n.value),
        variableWatch: { 'Inserting': newValue, 'Current Node': curr.value, 'Next': curr.right ? `right child ${curr.right.value}` : 'NULL (create here)' }
      }));
      curr = curr.right;
    }
  }

  const node: TreeNodeData = { value: newValue, height: 1, balanceFactor: 0, left: null, right: null };
  if (dir === 'left' && parent) parent.left = node;
  else if (dir === 'right' && parent) parent.right = node;
  else root = node;

  const pathVals = path.map(n => n.value);
  frames.push(makeFrame(root, {
    title: `Create Node ${newValue}`,
    action: `New node ${newValue} attached ${dir ? `as ${dir} child of ${parent?.value}` : 'as the root'}`,
    reason: `The empty slot is found. Node ${newValue} is created with height 1 and no children.`,
    formula: `new Node(${newValue})  •  height = 1, left = NULL, right = NULL`,
    codeStep: 'insert:create',
    successVals: [newValue],
    pathVals: [...pathVals, newValue],
    variableWatch: { 'Inserting': newValue, 'Created': `Node(${newValue})`, 'Parent': parent ? parent.value : 'ROOT', 'Side': dir ? dir.toUpperCase() : '—' }
  }));

  // AVL rebalancing: walk the insertion path bottom-up.
  if (balancing) {
    for (let i = path.length - 1; i >= 0; i--) {
      const nodeOnPath = path[i];
      updateNodeHeight(nodeOnPath);
      const bf = nodeOnPath.balanceFactor;
      if (bf > 1 || bf < -1) {
        const caseName = bf > 1
          ? (nodeOnPath.left && getBF(nodeOnPath.left) < 0 ? 'LR' : 'LL')
          : (nodeOnPath.right && getBF(nodeOnPath.right) > 0 ? 'RL' : 'RR');
        frames.push(makeFrame(root, {
          title: `Imbalance at Node ${nodeOnPath.value} (BF = ${bf > 0 ? '+' : ''}${bf})`,
          action: `${caseName} Case Detected`,
          reason: `After inserting ${newValue}, node ${nodeOnPath.value} has balance factor ${bf}, violating the AVL invariant |BF| <= 1. A rotation fixes it.`,
          formula: `BF = ${bf} ${caseName === 'LL' || caseName === 'LR' ? '=> Right Rotation' : '=> Left Rotation'}`,
          codeStep: 'avl:imbalance',
          errorVal: nodeOnPath.value,
          pathVals,
          variableWatch: { 'Imbalanced Node': nodeOnPath.value, 'Balance Factor': bf, 'Case': caseName }
        }));

        if (bf > 1) {
          if (nodeOnPath.left && getBF(nodeOnPath.left) < 0) {
            nodeOnPath.left = rotateLeft(nodeOnPath.left);
          }
          const rotated = rotateRight(nodeOnPath);
          if (i === 0) root = rotated;
          else {
            const p = path[i - 1];
            if (p.left === nodeOnPath) p.left = rotated;
            else p.right = rotated;
          }
          frames.push(makeFrame(root, {
            title: `Right Rotation Around ${nodeOnPath.value}`,
            action: 'LL / LR fixed with Right Rotation',
            reason: `Rotating right moves the left child up and ${nodeOnPath.value} down. Height is recomputed and the subtree is balanced again.`,
            formula: `rightRotate(${nodeOnPath.value})`,
            codeStep: 'avl:rotateRight',
            successVals: [nodeOnPath.value, nodeOnPath.left?.value].filter(v => v !== undefined) as number[],
            pathVals,
            variableWatch: { 'Rotated Nodes': `${nodeOnPath.value} & ${nodeOnPath.left?.value}`, 'Result BF': `|BF| <= 1` }
          }));
        } else {
          if (nodeOnPath.right && getBF(nodeOnPath.right) > 0) {
            nodeOnPath.right = rotateRight(nodeOnPath.right);
          }
          const rotated = rotateLeft(nodeOnPath);
          if (i === 0) root = rotated;
          else {
            const p = path[i - 1];
            if (p.left === nodeOnPath) p.left = rotated;
            else p.right = rotated;
          }
          frames.push(makeFrame(root, {
            title: `Left Rotation Around ${nodeOnPath.value}`,
            action: 'RR / RL fixed with Left Rotation',
            reason: `Rotating left moves the right child up and ${nodeOnPath.value} down. Height is recomputed and the subtree is balanced again.`,
            formula: `leftRotate(${nodeOnPath.value})`,
            codeStep: 'avl:rotateLeft',
            successVals: [nodeOnPath.value, nodeOnPath.right?.value].filter(v => v !== undefined) as number[],
            pathVals,
            variableWatch: { 'Rotated Nodes': `${nodeOnPath.value} & ${nodeOnPath.right?.value}`, 'Result BF': `|BF| <= 1` }
          }));
        }
      }
    }
  }

  frames.push(makeFrame(root, {
    title: `Insertion of ${newValue} Complete`,
    action: balancing ? 'Tree Balanced Successfully' : 'BST Insertion Complete',
    reason: `Node ${newValue} is in its correct position. ${balancing ? 'Every node satisfies |BalanceFactor| <= 1.' : 'All nodes satisfy the BST ordering property.'}`,
    formula: balancing ? 'Height = O(log N)' : 'BST order: Left < Node < Right',
    codeStep: 'insert:done',
    successVals: [...pathVals, newValue],
    variableWatch: { 'Tree Size': frames.length > 0 ? countNodes(root) : 0 }
  }));

  const updatedValues = Array.from(new Set([...existingValues, newValue]));
  return { frames: renumber(frames), updatedValues };
}

// ---------------------------------------------------------------------------
// SEARCH — step by step: compare -> traverse left/right -> found / not found
// ---------------------------------------------------------------------------
export function generateInteractiveSearchFrames(existingValues: number[], targetValue: number): AnimationFrame[] {
  const root = buildTreeFromValues(existingValues, false);
  const frames: AnimationFrame[] = [];
  const path: TreeNodeData[] = [];

  frames.push(makeFrame(root, {
    title: `Search ${targetValue} — Start at Root`,
    action: `Comparing ${targetValue} with root`,
    reason: root
      ? `Begin at root (${root.value}). Compare ${targetValue} with the current node at every step.`
      : 'The tree is empty, so the key is not present.',
    formula: `${targetValue} == ${root ? root.value : '—'} ? Found : (${targetValue} < node ? Left : Right)`,
    codeStep: 'search:compare',
    activeVal: root?.value,
    pathVals: root ? [root.value] : [],
    variableWatch: { 'Searching': targetValue, 'Current Node': root ? root.value : 'NULL' }
  }));

  let curr = root;
  let found = false;
  while (curr) {
    path.push(curr);
    if (targetValue === curr.value) {
      found = true;
      break;
    }
    if (targetValue < curr.value) {
      frames.push(makeFrame(root, {
        title: `${targetValue} < ${curr.value} — Search Left`,
        action: `Moving to the left child of ${curr.value}`,
        reason: `${targetValue} is smaller than ${curr.value}, so it can only exist in the left subtree.`,
        formula: `${targetValue} < ${curr.value}  =>  go Left`,
        codeStep: 'search:goLeft',
        activeVal: curr.value,
        pathVals: path.map(n => n.value),
        variableWatch: { 'Searching': targetValue, 'Current Node': curr.value }
      }));
      curr = curr.left;
    } else {
      frames.push(makeFrame(root, {
        title: `${targetValue} > ${curr.value} — Search Right`,
        action: `Moving to the right child of ${curr.value}`,
        reason: `${targetValue} is larger than ${curr.value}, so it can only exist in the right subtree.`,
        formula: `${targetValue} > ${curr.value}  =>  go Right`,
        codeStep: 'search:goRight',
        activeVal: curr.value,
        pathVals: path.map(n => n.value),
        variableWatch: { 'Searching': targetValue, 'Current Node': curr.value }
      }));
      curr = curr.right;
    }
  }

  if (found) {
    frames.push(makeFrame(root, {
      title: `Found Node ${targetValue}`,
      action: 'Search Successful',
      reason: `Node ${targetValue} matches the current node after ${path.length} comparison${path.length > 1 ? 's' : ''}.`,
      formula: `Search Time: O(${path.length}) comparisons`,
      codeStep: 'search:found',
      successVals: [targetValue],
      pathVals: path.map(n => n.value),
      variableWatch: { 'Result': 'FOUND', 'Comparisons': path.length }
    }));
  } else {
    frames.push(makeFrame(root, {
      title: `Node ${targetValue} Not Present`,
      action: 'Search Failed',
      reason: 'A null child pointer was reached, meaning no node with this key exists in the tree.',
      formula: 'Reached NULL => key does not exist',
      codeStep: 'search:notfound',
      pathVals: path.map(n => n.value),
      variableWatch: { 'Result': 'NOT FOUND', 'Comparisons': path.length }
    }));
  }

  return renumber(frames);
}

// ---------------------------------------------------------------------------
// DELETE — step by step: search path -> remove -> (AVL) rebalance -> done
// ---------------------------------------------------------------------------
export function generateInteractiveDeleteFrames(
  existingValues: number[],
  targetValue: number,
  opts: InteractiveOptions = {}
): { frames: AnimationFrame[]; updatedValues: number[] } {
  const balancing = !!opts.balancing;
  let root = buildTreeFromValues(existingValues, balancing);
  const frames: AnimationFrame[] = [];
  const path: TreeNodeData[] = [];

  if (!existingValues.includes(targetValue)) {
    return {
      frames: renumber(generateInteractiveSearchFrames(existingValues, targetValue)),
      updatedValues: existingValues
    };
  }

  frames.push(makeFrame(root, {
    title: `Delete ${targetValue} — Locate Node`,
    action: 'Searching for the target node',
    reason: `Traverse from the root to node ${targetValue}, following the BST ordering rules.`,
    formula: `${targetValue} == node ? Delete : (${targetValue} < node ? Left : Right)`,
    codeStep: 'delete:compare',
    activeVal: root?.value,
    pathVals: root ? [root.value] : [],
    variableWatch: { 'Deleting': targetValue, 'Current Node': root ? root.value : 'NULL' }
  }));

  let curr = root;
  while (curr && curr.value !== targetValue) {
    path.push(curr);
    if (targetValue < curr.value) {
      frames.push(makeFrame(root, {
        title: `${targetValue} < ${curr.value} — Go Left`,
        action: `Moving to the left child of ${curr.value}`,
        reason: `The key being deleted is smaller than ${curr.value}.`,
        formula: `${targetValue} < ${curr.value}  =>  go Left`,
        codeStep: 'delete:goLeft',
        activeVal: curr.value,
        pathVals: path.map(n => n.value),
        variableWatch: { 'Deleting': targetValue, 'Current Node': curr.value }
      }));
      curr = curr.left;
    } else {
      frames.push(makeFrame(root, {
        title: `${targetValue} > ${curr.value} — Go Right`,
        action: `Moving to the right child of ${curr.value}`,
        reason: `The key being deleted is larger than ${curr.value}.`,
        formula: `${targetValue} > ${curr.value}  =>  go Right`,
        codeStep: 'delete:goRight',
        activeVal: curr.value,
        pathVals: path.map(n => n.value),
        variableWatch: { 'Deleting': targetValue, 'Current Node': curr.value }
      }));
      curr = curr.right;
    }
  }
  if (curr) path.push(curr);

  const target = curr;
  const childCount = (target?.left ? 1 : 0) + (target?.right ? 1 : 0);

  frames.push(makeFrame(root, {
    title: `Node ${targetValue} Located`,
    action: `Deleting node with ${childCount} child${childCount === 1 ? '' : 'ren'}`,
    reason:
      childCount === 0
        ? `Node ${targetValue} is a leaf, so it can be removed directly.`
        : childCount === 1
          ? `Node ${targetValue} has one child, which simply replaces it.`
          : `Node ${targetValue} has two children: copy the in-order successor (smallest key in the right subtree) and delete that successor instead.`,
    formula: childCount === 0 ? 'Case 1: delete leaf' : childCount === 1 ? 'Case 2: replace with child' : 'Case 3: copy in-order successor',
    codeStep: 'search:found',
    activeVal: targetValue,
    pathVals: path.map(n => n.value),
    variableWatch: { 'Deleting': targetValue, 'Children': childCount }
  }));

  if (childCount === 2 && target) {
    const pathVals = path.map(n => n.value);
    let succ = target.right!;
    frames.push(makeFrame(root, {
      title: `Find In-Order Successor of ${targetValue}`,
      action: 'Smallest key in the right subtree',
      reason: `Go right once from ${targetValue}, then keep going left until the minimum key is reached.`,
      formula: `successor = min(rightSubtree of ${targetValue})`,
      codeStep: 'delete:successor',
      activeVal: succ.value,
      pathVals,
      variableWatch: { 'Successor': succ.value }
    }));
    while (succ.left) {
      frames.push(makeFrame(root, {
        title: `${succ.value} Has a Left Child — Go Left`,
        action: 'Traversing to the minimum',
        reason: `The successor is the leftmost node in the right subtree.`,
        formula: 'successor = successor.left',
        codeStep: 'delete:successor',
        activeVal: succ.left.value,
        pathVals,
        variableWatch: { 'Successor': succ.left.value }
      }));
      succ = succ.left;
    }
    frames.push(makeFrame(root, {
      title: `Copy ${succ.value} Into Node ${targetValue}`,
      action: 'Overwrite + remove successor node',
      reason: `The successor value (${succ.value}) is copied over the deleted node's value, then the successor (a leaf or one-child node) is removed.`,
      formula: `node(${targetValue}) = ${succ.value}  =>  delete(${succ.value})`,
      codeStep: 'delete:remove',
      warningVal: succ.value,
      successVals: [targetValue],
      pathVals,
      variableWatch: { 'Copied Value': succ.value, 'Removed': succ.value }
    }));
  } else if (target) {
    frames.push(makeFrame(root, {
      title: `Remove Node ${targetValue}`,
      action: 'Unlink node from its parent',
      reason: childCount === 0
        ? `Node ${targetValue} has no children — the parent's pointer to it is simply set to NULL.`
        : `Node ${targetValue} has one child — the parent's pointer is redirected to that child.`,
      formula: childCount === 0 ? `parent->${targetValue} = NULL` : `parent->${targetValue} = ${targetValue}'s child`,
      codeStep: 'delete:remove',
      warningVal: targetValue,
      pathVals: path.map(n => n.value),
      variableWatch: { 'Removed': targetValue }
    }));
  }

  // Rebuild the final (correctly balanced) tree from the surviving values.
  const updatedValues = existingValues.filter(v => v !== targetValue);
  root = buildTreeFromValues(updatedValues, balancing);

  frames.push(makeFrame(root, {
    title: `Deletion of ${targetValue} Complete`,
    action: balancing ? 'Tree Rebalanced Successfully' : 'BST Deletion Complete',
    reason: `Node ${targetValue} has been removed. ${balancing ? 'Balance factors are recomputed along the path and rotations applied where needed.' : 'The BST ordering property is preserved.'}`,
    formula: balancing ? '|BalanceFactor| <= 1 for every node' : 'Left < Node < Right',
    codeStep: 'delete:remove',
    successVals: updatedValues,
    variableWatch: { 'Tree Size': updatedValues.length }
  }));

  return { frames: renumber(frames), updatedValues };
}

function countNodes(root: TreeNodeData | null): number {
  if (!root) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}
