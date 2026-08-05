import { describe, expect, it } from 'vitest';
import { generateAVLTreeFrames } from './avlTreeEngine';
import { generateBTreeFrames } from './bTreeEngine';
import { generateKMPFrames } from './kmpEngine';
import { generateSegmentTreeFrames } from './segmentTreeEngine';
import { generateBellmanFordFrames, generateBfsDfsFrames, generateFloydWarshallFrames, generateMaxFlowFrames, generateMstFrames, generateTarjanFrames, generateTopologicalFrames } from './graphLearningEngines';
import { generateBitmaskDpFrames, generateEditDistanceFrames, generateLcsFrames, generateMatrixChainFrames, generateNQueensFrames } from './dpLearningEngines';
import { generateManacherFrames, generateSuffixArrayFrames, generateZFrames } from './stringLearningEngines';
import { generateAmortizedFrames, generateBloomFilterFrames, generateConvexHullFrames, generateDsuFrames, generateFenwickFrames, generateFibonacciHeapFrames, generateHashingFrames, generateHeapFrames, generateNpCompleteFrames, generateRabinKarpFrames, generateRadixSortFrames, generateRedBlackFrames, generateSkipListFrames, generateSparseTableFrames, generateSplayFrames } from './advancedStructureEngines';

const expectValidFrames = (frames: ReturnType<typeof generateAVLTreeFrames>) => {
  expect(frames.length).toBeGreaterThan(0);
  frames.forEach((frame, index) => {
    expect(frame.stepIndex).toBe(index + 1);
    expect(frame.totalSteps).toBe(frames.length);
    expect(frame.title.length).toBeGreaterThan(0);
    expect(frame.explanation.action.length).toBeGreaterThan(0);
  });
};

describe('published algorithm engines', () => {
  it('produces a narrated AVL rotation trace', () => {
    const frames = generateAVLTreeFrames([30, 20, 10]);
    expectValidFrames(frames);
    const finalFrame = frames[frames.length - 1];
    expect(finalFrame?.nodes.find(node => node.value === 20)?.y).toBeLessThan(
      finalFrame?.nodes.find(node => node.value === 10)?.y ?? Infinity,
    );
  });

  it('produces deterministic B-Tree split frames', () => {
    const first = generateBTreeFrames(2, [10, 20, 30, 40]);
    const second = generateBTreeFrames(2, [10, 20, 30, 40]);
    expectValidFrames(first);
    expect(second).toEqual(first);
  });

  it('builds a complete segment-tree trace', () => {
    const frames = generateSegmentTreeFrames([1, 3, 5, 7]);
    expectValidFrames(frames);
    expect(Math.max(...frames.map(frame => frame.nodes.length))).toBeGreaterThanOrEqual(7);
  });

  it('finds a KMP pattern without rescanning the text', () => {
    const frames = generateKMPFrames('ABABDABACDABABCABAB', 'ABABCABAB');
    expectValidFrames(frames);
    expect(frames.some(frame => /found|match/i.test(`${frame.title} ${frame.explanation.action}`))).toBe(true);
  });
});

describe('advanced data-structure engines', () => {
  it.each([
    ['Red-Black Tree', generateRedBlackFrames], ['Heap', generateHeapFrames], ['DSU', generateDsuFrames],
    ['Hashing', generateHashingFrames], ['Fenwick Tree', generateFenwickFrames], ['Skip List', generateSkipListFrames],
    ['Splay Tree', generateSplayFrames], ['Radix Sort', generateRadixSortFrames], ['Bloom Filter', generateBloomFilterFrames],
    ['Sparse Table', generateSparseTableFrames],
    ['Amortized analysis', generateAmortizedFrames], ['Fibonacci Heap', generateFibonacciHeapFrames],
    ['Rabin-Karp', generateRabinKarpFrames], ['Convex Hull', generateConvexHullFrames], ['NP-completeness', generateNpCompleteFrames],
  ] as const)('%s has dedicated educational frames', (_name, engine) => expectValidFrames(engine()));
  it('builds a valid min-heap', () => {
    const heap = generateHeapFrames([5,12,9,20,14,18,3]).slice(-1)[0].variableWatch?.Heap as string;
    const values = heap.split(', ').map(Number);
    values.forEach((value,index) => { if(index>0) expect(values[Math.floor((index-1)/2)]).toBeLessThanOrEqual(value); });
  });
});

describe('DP and string curriculum engines', () => {
  it.each([
    ['LCS', () => generateLcsFrames('ABC','AC')], ['Edit distance', () => generateEditDistanceFrames('horse','ros')],
    ['Matrix chain', () => generateMatrixChainFrames([10,20,30])], ['Bitmask DP', generateBitmaskDpFrames],
    ['N-Queens', () => generateNQueensFrames(4)], ['Suffix array', () => generateSuffixArrayFrames('banana')],
    ['Z algorithm', () => generateZFrames('aabcaabxaaaz')], ['Manacher', () => generateManacherFrames('racecar')],
  ] as const)('%s emits a complete narrated trace', (_name, engine) => expectValidFrames(engine()));
  it('computes the expected edit distance', () => {
    const matrix = generateEditDistanceFrames('horse','ros').slice(-1)[0].dpMatrix as number[][];
    expect(matrix[5][3]).toBe(3);
  });
});

describe('graph curriculum engines', () => {
  const engines = [
    ['BFS/DFS', generateBfsDfsFrames], ['Bellman-Ford', generateBellmanFordFrames], ['MST', generateMstFrames],
    ['Floyd-Warshall', generateFloydWarshallFrames], ['Topological', generateTopologicalFrames],
    ['Tarjan', generateTarjanFrames], ['Max Flow', generateMaxFlowFrames],
  ] as const;
  it.each(engines)('%s produces a coherent deterministic trace', (_name, engine) => {
    const frames = engine();
    expectValidFrames(frames);
    expect(engine()).toEqual(frames);
  });
  it('Floyd-Warshall finishes with a finite all-pairs matrix', () => {
    const matrix = generateFloydWarshallFrames().slice(-1)[0].dpMatrix as number[][];
    expect(matrix.flat().every(value => Number.isFinite(value) && value < 999)).toBe(true);
  });
});
