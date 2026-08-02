import { AnimationFrame, NodePosition } from '../types';

// Emulates KMP pattern matching on a text, animating the text pointer, pattern pointer,
// LPS fallback and final match highlights.
export function generateKMPFrames(text: string = 'ABABDABACDABABCABAB', pattern: string = 'ABABCABAB'): AnimationFrame[] {
  const frames: AnimationFrame[] = [];
  const n = text.length;
  const m = pattern.length;
  if (m === 0 || n === 0) return frames;

  // 1) Build LPS table
  const lps: number[] = new Array(m).fill(0);
  {
    let len = 0;
    for (let i = 1; i < m; i++) {
      while (len > 0 && pattern[i] !== pattern[len]) {
        len = lps[len - 1];
      }
      if (pattern[i] === pattern[len]) len++;
      lps[i] = len;
    }
  }

  function textCharW() { return Math.max(30, Math.min(48, 520 / n)); }
  function patternCharW() { return Math.max(30, Math.min(48, 520 / m)); }

  function makeTextNodes(i: number, matchedStart: number, matchedEnd: number): NodePosition[] {
    const nodes: NodePosition[] = [];
    const charW = textCharW();
    for (let idx = 0; idx < n; idx++) {
      let state: NodePosition['state'] = 'default';
      if (idx >= matchedStart && idx <= matchedEnd) state = 'success';
      else if (idx === i) state = 'active';
      nodes.push({
        id: `t-${idx}`,
        value: text[idx],
        x: 40 + idx * charW,
        y: 80,
        state
      });
    }
    return nodes;
  }

  function makePatternNodes(j: number, activeInPattern: number): NodePosition[] {
    const nodes: NodePosition[] = [];
    const charW = patternCharW();
    for (let idx = 0; idx < m; idx++) {
      let state: NodePosition['state'] = 'default';
      if (idx <= j && pattern[idx] === text[idx + (activeInPattern - j)]) state = 'success';
      if (idx === j) state = 'active';
      nodes.push({
        id: `p-${idx}`,
        value: pattern[idx],
        x: 40 + idx * charW,
        y: 200,
        state
      });
    }
    return nodes;
  }

  function snapshot(
    title: string,
    action: string,
    reason: string,
    formula: string,
    i: number,
    j: number,
    highlight: { start: number; end: number } | null
  ): AnimationFrame {
    const matched = highlight ? makeTextNodes(i, highlight.start, highlight.end) : makeTextNodes(i, -1, -2);
    const nodes = [...matched, ...makePatternNodes(j, i)];
    return {
      stepIndex: frames.length + 1,
      totalSteps: 0,
      title,
      explanation: { action, reason, formula },
      highlightCodeLines: { cpp: [28, 29, 30], java: [24, 25, 26], python: [24, 25, 26], javascript: [23, 24, 25] },
      nodes,
      edges: [],
      arrayState: [
        { label: 'Text Pointer i', values: [`${i} (char '${text[i] ?? 'END'}')`] },
        { label: 'Pattern Pointer j', values: [`${j} (char '${pattern[j] ?? 'END'}')`] }
      ],
      variableWatch: {
        'Text Length N': n,
        'Pattern Length M': m,
        'Text Pointer i': `${i}/${n}`,
        'Pattern Pointer j': `${j}/${m}`,
        'Matched Count': highlight ? (highlight.end - highlight.start + 1) : 0
      }
    };
  }

  // LPS frames
  for (let i = 0; i < m; i++) {
    const nodes: NodePosition[] = [];
    const charW = patternCharW();
    for (let idx = 0; idx < m; idx++) {
      nodes.push({
        id: `lps-${idx}`,
        value: pattern[idx],
        x: 40 + idx * charW,
        y: 80,
        state: idx === i ? 'active' : 'default'
      });
    }
    const lpsNodes: NodePosition[] = [];
    for (let idx = 0; idx < m; idx++) {
      lpsNodes.push({
        id: `lpsv-${idx}`,
        value: lps[idx],
        x: 40 + idx * charW,
        y: 200,
        state: idx === i ? 'success' : 'default'
      });
    }
    frames.push({
      stepIndex: frames.length + 1,
      totalSteps: 0,
      title: `Precompute LPS[${i}] = ${lps[i]}`,
      explanation: {
        action: `Longest Proper Prefix which is also Suffix of pattern[0..${i}]`,
        reason: `LPS helps the pattern pointer fall back without re-scanning matched text.`,
        formula: `LPS[${i}] = ${lps[i]}`
      },
      highlightCodeLines: { cpp: [8, 9, 10], java: [7, 8], python: [6, 7], javascript: [5, 6] },
      nodes: [...nodes, ...lpsNodes],
      edges: [],
      arrayState: [{ label: 'LPS Array', values: lps.map(String) }],
      variableWatch: {
        'Pattern': pattern,
        'LPS': lps.join(', '),
        'Current Index i': `${i}/${m - 1}`
      }
    });
  }

  // 2) Pattern search
  frames.push(snapshot(
    'Start KMP Search',
    'Initialize pointers',
    'Begin scanning text with i = 0, pattern pointer j = 0. Compare text[i] with pattern[j].',
    'i = 0, j = 0',
    0, 0, null
  ));

  let i = 0, j = 0;
  let firstMatchLogged = false;

  while (i < n) {
    if (text[i] === pattern[j]) {
      frames.push(snapshot(
        `Match: text[${i}] = '${text[i]}' = pattern[${j}]`,
        `Characters equal, advance both pointers`,
        `'${text[i]}' matches pattern position ${j}. Continue to next character.`,
        `i++ -> ${i + 1}, j++ -> ${j + 1}`,
        i, j, null
      ));
      i++;
      j++;
    }

    if (j === m) {
      const matchStart = i - m;
      frames.push(snapshot(
        `Pattern Found at Index ${matchStart}!`,
        `Full pattern matched`,
        `All ${m} pattern characters matched consecutively from text index ${matchStart} to ${i - 1}.`,
        `Match at text[${matchStart}..${i - 1}]`,
        i - 1, m - 1, { start: matchStart, end: i - 1 }
      ));
      firstMatchLogged = true;
      j = lps[j - 1];
    } else if (i < n && text[i] !== pattern[j]) {
      if (j !== 0) {
        frames.push(snapshot(
          `Mismatch at text[${i}] = '${text[i]}' vs pattern[${j}] = '${pattern[j]}'`,
          `Fall back using LPS`,
          `Use LPS[${j - 1}] = ${lps[j - 1]} to skip already-matched prefix instead of restarting.`,
          `j = lps[${j - 1}] = ${lps[j - 1]}`,
          i, j, null
        ));
        j = lps[j - 1];
      } else {
        frames.push(snapshot(
          `Mismatch at text[${i}] = '${text[i]}' vs pattern[0] = '${pattern[0]}'`,
          `No prefix to fall back to, advance text`,
          `j is already 0, so only the text pointer advances.`,
          `i++ -> ${i + 1}`,
          i, j, null
        ));
        i++;
      }
    }
  }

  frames.push(snapshot(
    'KMP Search Complete',
    firstMatchLogged ? 'All matches found' : 'No match found in text',
    'The text pointer i never moves backwards, guaranteeing linear O(N + M) performance.',
    `Time Complexity: O(${n} + ${m})`,
    i - 1, j, null
  ));

  const total = frames.length;
  frames.forEach(f => f.totalSteps = total);
  return frames;
}
