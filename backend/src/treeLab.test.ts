import { describe, expect, it } from 'vitest';
import { assessAvl, assessBTree } from './treeLab.js';

describe('tree lab invariant assessment', () => {
  it('accepts a valid AVL tree', () => expect(assessAvl({ key: 20, left: { key: 10 }, right: { key: 30 } }).valid).toBe(true));
  it('detects AVL ordering and balance errors', () => {
    const result = assessAvl({ key: 20, left: { key: 30, left: { key: 25 } } });
    expect(result.valid).toBe(false); expect(result.skills['bst-ordering']).toBe(false); expect(result.skills['balance-factor']).toBe(false);
  });
  it('accepts a valid minimum-degree-two B-tree', () => expect(assessBTree({ keys: [20], children: [{ keys: [5, 10] }, { keys: [25, 30] }] }, 2).valid).toBe(true));
  it('detects B-tree capacity and leaf-depth errors', () => {
    const result = assessBTree({ keys: [20], children: [{ keys: [] }, { keys: [25], children: [{ keys: [22] }, { keys: [28] }] }] }, 2);
    expect(result.valid).toBe(false); expect(result.skills['node-capacity']).toBe(false); expect(result.skills['uniform-leaf-depth']).toBe(false);
  });
});
