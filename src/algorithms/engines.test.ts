import { describe, expect, it } from 'vitest';
import { generateAVLTreeFrames } from './avlTreeEngine';
import { generateBTreeFrames } from './bTreeEngine';
import { generateKMPFrames } from './kmpEngine';
import { generateSegmentTreeFrames } from './segmentTreeEngine';

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
