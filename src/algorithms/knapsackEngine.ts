import { AnimationFrame } from '../types';

export function generateKnapsackFrames(weights: number[] = [2, 3, 4, 5], values: number[] = [3, 4, 5, 6], capacity: number = 5): AnimationFrame[] {
  const frames: AnimationFrame[] = [];
  const n = weights.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  const rowLabels = ['0 (None)', ...weights.map((w, i) => `Item ${i + 1} (w:${w}, v:${values[i]})`)];
  const colLabels = Array.from({ length: capacity + 1 }, (_, c) => `W=${c}`);

  function makeFrame(title: string, action: string, reason: string, formula: string, activeCell?: [number, number]): AnimationFrame {
    // Deep clone dp matrix for visualization frame
    const matrixData = dp.map(row => [...row]);

    return {
      stepIndex: frames.length + 1,
      totalSteps: 0,
      title,
      explanation: { action, reason, formula },
      highlightCodeLines: {
        cpp: [10, 11, 12],
        java: [9, 10],
        python: [7, 8],
        javascript: [8, 9]
      },
      nodes: [],
      dpMatrix: {
        rows: rowLabels,
        cols: colLabels,
        data: matrixData,
        activeCell
      },
      variableWatch: {
        'Capacity W': capacity,
        'Item Count N': n,
        'Current Cell': activeCell ? `row ${activeCell[0]}, col ${activeCell[1]}` : 'None'
      }
    };
  }

  // Frame 1: Init Matrix
  frames.push(makeFrame(
    'Initialize DP Table with 0s',
    'Base Cases: 0 items or 0 capacity yields 0 profit',
    'dp[0][w] = 0 and dp[i][0] = 0 as base boundary conditions.',
    'dp[i][w] = 0 for i=0 or w=0'
  ));

  for (let i = 1; i <= n; i++) {
    const wt = weights[i - 1];
    const val = values[i - 1];

    for (let w = 0; w <= capacity; w++) {
      if (wt <= w) {
        const includeVal = val + dp[i - 1][w - wt];
        const excludeVal = dp[i - 1][w];
        dp[i][w] = Math.max(excludeVal, includeVal);

        frames.push(makeFrame(
          `Compute dp[Item ${i}][Capacity ${w}]`,
          `Item weight ${wt} <= capacity ${w}: Choice to Include or Exclude`,
          `Include item (${val} + dp[${i-1}][${w-wt}]) vs Exclude item (dp[${i-1}][${w}]). Pick max = ${dp[i][w]}.`,
          `dp[${i}][${w}] = max(${excludeVal}, ${val} + ${dp[i-1][w-wt]}) = ${dp[i][w]}`,
          [i, w]
        ));
      } else {
        dp[i][w] = dp[i - 1][w];
        frames.push(makeFrame(
          `Compute dp[Item ${i}][Capacity ${w}]`,
          `Item weight ${wt} > capacity ${w}: Cannot Include Item`,
          `Item is too heavy. Copy profit from cell directly above (dp[${i-1}][${w}] = ${dp[i][w]}).`,
          `dp[${i}][${w}] = dp[${i-1}][${w}] = ${dp[i][w]}`,
          [i, w]
        ));
      }
    }
  }

  // Final Optimal Value Frame
  frames.push(makeFrame(
    'Knapsack DP Matrix Complete!',
    `Maximum Profit Achievable = $${dp[n][capacity]}`,
    `Optimal subset value is found at lower-right corner dp[${n}][${capacity}] = ${dp[n][capacity]}.`,
    `Final Answer = ${dp[n][capacity]}`
  ));

  const total = frames.length;
  frames.forEach(f => f.totalSteps = total);
  return frames;
}
