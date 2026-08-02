import { AnimationFrame, NodePosition, EdgeConnection } from '../types';

interface TrieNode {
  char: string;
  isEnd: boolean;
  children: { [char: string]: TrieNode };
  id: string;
}

export function generateTrieFrames(words: string[] = ['cat', 'car', 'dot']): AnimationFrame[] {
  const frames: AnimationFrame[] = [];
  const root: TrieNode = { char: 'ROOT', isEnd: false, children: {}, id: 'root' };

  let nodeIdCounter = 1;

  function buildVisualTree(node: TrieNode, x: number, y: number, offset: number, nodes: NodePosition[], edges: EdgeConnection[], activeId?: string) {
    nodes.push({
      id: node.id,
      value: node.char + (node.isEnd ? ' *' : ''),
      x,
      y,
      state: activeId === node.id ? 'active' : node.isEnd ? 'success' : 'default'
    });

    const childrenKeys = Object.keys(node.children);
    const count = childrenKeys.length;
    if (count === 0) return;

    const startX = x - ((count - 1) * offset) / 2;

    childrenKeys.forEach((char, idx) => {
      const child = node.children[char];
      const cx = startX + idx * offset;
      const cy = y + 70;

      edges.push({
        from: node.id,
        to: child.id,
        label: char,
        highlighted: activeId === child.id
      });

      buildVisualTree(child, cx, cy, offset * 0.6, nodes, edges, activeId);
    });
  }

  function makeFrame(title: string, action: string, reason: string, formula: string, activeId?: string): AnimationFrame {
    const nodes: NodePosition[] = [];
    const edges: EdgeConnection[] = [];
    buildVisualTree(root, 300, 50, 140, nodes, edges, activeId);

    return {
      stepIndex: frames.length + 1,
      totalSteps: 0,
      title,
      explanation: { action, reason, formula },
      highlightCodeLines: {
        cpp: [14, 15, 16],
        java: [11, 12],
        python: [10, 11],
        javascript: [12, 13]
      },
      nodes,
      edges,
      variableWatch: {
        'Word Count': words.length,
        'Root Character': 'ROOT'
      }
    };
  }

  // Frame 1: Init Root
  frames.push(makeFrame(
    'Initialize Trie Root Node',
    'Root represents empty prefix',
    'Trie begins with a dummy Root node.',
    'Trie Root -> Node(ROOT)'
  ));

  for (const word of words) {
    let curr = root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      if (!curr.children[char]) {
        const newChild: TrieNode = {
          char,
          isEnd: i === word.length - 1,
          children: {},
          id: `node-${nodeIdCounter++}`
        };
        curr.children[char] = newChild;
        curr = newChild;

        frames.push(makeFrame(
          `Inserting '${char}' for Word "${word}"`,
          `Branch Created: Character '${char}'`,
          `No existing node for '${char}' under parent. Allocated new Trie Node.`,
          `curr.children['${char}'] = new TrieNode()`,
          curr.id
        ));
      } else {
        curr = curr.children[char];
        if (i === word.length - 1) curr.isEnd = true;

        frames.push(makeFrame(
          `Traversing Existing Prefix '${char}' for Word "${word}"`,
          `Reusing Existing Branch for '${char}'`,
          `Character '${char}' already exists. Reusing prefix branch.`,
          `curr = curr.children['${char}']`,
          curr.id
        ));
      }
    }
  }

  // Final Completed Trie
  frames.push(makeFrame(
    'Trie Built Successfully!',
    `Inserted words: ${words.join(', ')}`,
    'Starred nodes indicate completed words. Prefix lookup operations now run in O(L) time.',
    'Time Complexity: O(L)'
  ));

  const total = frames.length;
  frames.forEach(f => f.totalSteps = total);
  return frames;
}
