export type AvlNode = { key: number; left?: AvlNode | null; right?: AvlNode | null };
export type BTreeNode = { keys: number[]; children?: BTreeNode[] };

export type TreeAssessment = { valid: boolean; score: number; skills: Record<string, boolean>; errors: string[] };

export function assessAvl(root: AvlNode | null): TreeAssessment {
  const errors: string[] = [];
  let ordering = true, balance = true;
  const visit = (node: AvlNode | null | undefined, min = -Infinity, max = Infinity): number => {
    if (!node) return 0;
    if (!Number.isFinite(node.key) || node.key <= min || node.key >= max) { ordering = false; errors.push(`Key ${node.key} violates BST ordering.`); }
    const left = visit(node.left, min, node.key), right = visit(node.right, node.key, max);
    if (Math.abs(left - right) > 1) { balance = false; errors.push(`Key ${node.key} has balance factor ${left - right}.`); }
    return Math.max(left, right) + 1;
  };
  visit(root);
  const skills = { 'bst-ordering': ordering, 'balance-factor': balance, 'avl-invariants': ordering && balance };
  const score = Math.round(Object.values(skills).filter(Boolean).length / Object.keys(skills).length * 100);
  return { valid: ordering && balance, score, skills, errors };
}

export function assessBTree(root: BTreeNode, minimumDegree = 2): TreeAssessment {
  const errors: string[] = [];
  let sorted = true, capacity = true, ranges = true, leafDepth = true;
  const depths = new Set<number>();
  const walk = (node: BTreeNode, depth: number, min = -Infinity, max = Infinity, isRoot = false) => {
    const keys = node.keys || [];
    if (keys.some((key, i) => i > 0 && key <= keys[i - 1])) { sorted = false; errors.push('Keys inside a node must be strictly sorted.'); }
    if (keys.some(key => key <= min || key >= max)) { ranges = false; errors.push('A key is outside its parent separator range.'); }
    const minimum = isRoot ? 1 : minimumDegree - 1, maximum = 2 * minimumDegree - 1;
    if (keys.length < minimum || keys.length > maximum) { capacity = false; errors.push(`Node key count must be between ${minimum} and ${maximum}.`); }
    const children = node.children || [];
    if (!children.length) depths.add(depth);
    else {
      if (children.length !== keys.length + 1) { capacity = false; errors.push('Internal child count must equal key count plus one.'); }
      children.forEach((child, index) => walk(child, depth + 1, index === 0 ? min : keys[index - 1], index === keys.length ? max : keys[index], false));
    }
  };
  walk(root, 0, -Infinity, Infinity, true);
  leafDepth = depths.size <= 1;
  if (!leafDepth) errors.push('All B-tree leaves must have the same depth.');
  const skills = { 'sorted-keys': sorted, 'node-capacity': capacity, 'search-ranges': ranges, 'uniform-leaf-depth': leafDepth };
  const score = Math.round(Object.values(skills).filter(Boolean).length / Object.keys(skills).length * 100);
  return { valid: Object.values(skills).every(Boolean), score, skills, errors };
}

export function assessTree(topic: string, state: unknown, degree?: number): TreeAssessment {
  return topic === 'avl' ? assessAvl(state as AvlNode | null) : assessBTree(state as BTreeNode, degree || 2);
}
