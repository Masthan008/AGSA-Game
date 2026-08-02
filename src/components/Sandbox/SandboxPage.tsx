import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Terminal, Code2, Shuffle, Info } from 'lucide-react';
import { TreeSvgCanvas } from '../Visualizer/TreeSvgCanvas';
import { DpMatrixCanvas } from '../Visualizer/DpMatrixCanvas';
import { ExplanationPanel } from '../Visualizer/ExplanationPanel';
import { ControlBar } from '../Visualizer/ControlBar';
import { AnimationFrame } from '../../types';
import { generateAVLTreeFrames } from '../../algorithms/avlTreeEngine';
import { generateDijkstraFrames } from '../../algorithms/dijkstraEngine';
import { generateKnapsackFrames } from '../../algorithms/knapsackEngine';
import { generateTrieFrames } from '../../algorithms/trieEngine';
import { generateSegmentTreeFrames } from '../../algorithms/segmentTreeEngine';
import { generateKMPFrames } from '../../algorithms/kmpEngine';

type SandboxMode = 'avl' | 'bst' | 'dijkstra' | 'knapsack' | 'trie' | 'segment' | 'kmp';

const MODES: { key: SandboxMode; label: string; description: string }[] = [
  { key: 'avl', label: 'AVL Tree', description: 'Insert numbers one-by-one and watch rotations balance the tree.' },
  { key: 'bst', label: 'BST Insert', description: 'Insert numbers into a plain Binary Search Tree.' },
  { key: 'dijkstra', label: 'Dijkstra', description: 'Watch shortest distances relax edge by edge from source A.' },
  { key: 'knapsack', label: 'Knapsack', description: 'Fill the DP table cell by cell to find max profit.' },
  { key: 'trie', label: 'Trie', description: 'Insert words character by character into a prefix tree.' },
  { key: 'segment', label: 'Segment Tree', description: 'Build the range-sum tree node by node.' },
  { key: 'kmp', label: 'KMP String', description: 'Scan the text pointer step-by-step with LPS fallback.' },
];

const parseNumbers = (input: string): number[] =>
  input.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));

export const SandboxPage: React.FC = () => {
  const [mode, setMode] = useState<SandboxMode>('avl');

  // Inputs
  const [treeInput, setTreeInput] = useState('15, 10, 20, 8, 12, 17, 25');
  const [knapsackWeights, setKnapsackWeights] = useState('2, 3, 4, 5');
  const [knapsackValues, setKnapsackValues] = useState('3, 4, 5, 6');
  const [knapsackCapacity, setKnapsackCapacity] = useState('5');
  const [trieWords, setTrieWords] = useState('cat, car, cart, dog, dot');
  const [segmentArray, setSegmentArray] = useState('1, 3, 5, 7, 9, 11');
  const [kmpText, setKmpText] = useState('ABABDABACDABABCABAB');
  const [kmpPattern, setKmpPattern] = useState('ABABCABAB');

  // Execution state
  const [frames, setFrames] = useState<AnimationFrame[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] Sandbox ready. Pick a topic, enter input, press ▶ Play.'
  ]);
  const runIdRef = useRef(0);

  const currentFrame = frames[stepIndex] || null;
  const modeInfo = MODES.find(m => m.key === mode) || MODES[0];

  // Reset state whenever the topic changes
  useEffect(() => {
    runIdRef.current += 1;
    setFrames([]);
    setStepIndex(0);
    setIsPlaying(false);
    setLogs(['[SYSTEM] Sandbox ready. Pick a topic, enter input, press ▶ Play.']);
  }, [mode]);

  // Auto-play timer (generation-guarded: stale ticks from old runs are ignored)
  useEffect(() => {
    let timer: any = null;
    if (isPlaying && frames.length > 0) {
      const runId = runIdRef.current;
      timer = setInterval(() => {
        if (runIdRef.current !== runId) {
          setIsPlaying(false);
          return;
        }
        setStepIndex(prev => {
          if (runIdRef.current !== runId) {
            setIsPlaying(false);
            return prev;
          }
          if (prev + 1 < frames.length) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 1400 / speed);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [isPlaying, frames, speed]);

  // Append one log line per executed frame
  useEffect(() => {
    if (!currentFrame) return;
    setLogs(prev => {
      const line = `[STEP ${currentFrame.stepIndex}/${currentFrame.totalSteps}] ${currentFrame.title}`;
      return prev[prev.length - 1] === line ? prev : [...prev, line];
    });
  }, [currentFrame]);

  const generate = (m: SandboxMode): AnimationFrame[] => {
    switch (m) {
      case 'avl':
      case 'bst': {
        const nums = parseNumbers(treeInput);
        return generateAVLTreeFrames(nums.length > 0 ? nums : [10, 20, 30]);
      }
      case 'dijkstra':
        return generateDijkstraFrames();
      case 'knapsack': {
        const w = parseNumbers(knapsackWeights);
        const v = parseNumbers(knapsackValues);
        const cap = parseInt(knapsackCapacity) || 5;
        return generateKnapsackFrames(w, v, cap);
      }
      case 'trie': {
        const words = trieWords.split(',').map(s => s.trim()).filter(Boolean);
        return generateTrieFrames(words.length > 0 ? words : ['cat', 'car', 'dot']);
      }
      case 'segment': {
        const nums = parseNumbers(segmentArray);
        return generateSegmentTreeFrames(nums.length > 0 ? nums : [1, 3, 5, 7]);
      }
      case 'kmp': {
        const text = kmpText.trim() || 'ABABDABACDABABCABAB';
        const pat = kmpPattern.trim() || 'ABABCABAB';
        return generateKMPFrames(text, pat);
      }
    }
  };

  const handlePlay = () => {
    runIdRef.current += 1;
    const generated = generate(mode);
    setFrames(generated);
    setStepIndex(0);
    setIsPlaying(generated.length > 0);
    setLogs([
      `[SYSTEM] Generated ${generated.length} animation steps for ${modeInfo.label}.`,
      `[RUN] ${generated[0]?.title || 'Execution started'}`
    ]);
  };

  const handleRandomize = () => {
    runIdRef.current += 1;
    setIsPlaying(false);
    setFrames([]);
    setStepIndex(0);
    if (mode === 'trie') {
      const words = ['apple', 'app', 'ape', 'bat', 'ball', 'cat', 'car', 'can', 'dog', 'dot', 'data', 'dark'];
      const count = 3 + Math.floor(Math.random() * 4);
      setTrieWords([...words].sort(() => Math.random() - 0.5).slice(0, count).join(', '));
    } else if (mode === 'kmp') {
      const texts = ['ABABDABACDABABCABAB', 'AAAAABAAABA', 'ABCABCDABABCDABCDABDE'];
      const pats = ['ABABCABAB', 'ABA', 'ABCDABD'];
      setKmpText(texts[Math.floor(Math.random() * texts.length)]);
      setKmpPattern(pats[Math.floor(Math.random() * pats.length)]);
    } else {
      const count = 5 + Math.floor(Math.random() * 4);
      const nums = Array.from({ length: count }, () => Math.floor(Math.random() * 90) + 10);
      if (mode === 'avl' || mode === 'bst') setTreeInput(nums.join(', '));
      if (mode === 'segment') setSegmentArray(nums.join(', '));
    }
  };

  const isMatrixMode = mode === 'knapsack';

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h2 className="section-title">Visual Sandbox & Step-by-Step Execution Engine</h2>
        <p className="section-subtitle">Pick any topic, press Play, and watch the algorithm execute one number at a time on the canvas.</p>
      </div>

      {/* Mode Selector Tabs */}
      <div style={{
        display: 'flex', background: 'var(--bg-light)', padding: 4, borderRadius: '100px', marginBottom: 12, overflowX: 'auto'
      }}>
        {MODES.map(item => (
          <button
            key={item.key}
            onClick={() => setMode(item.key)}
            style={{
              flex: 1, minWidth: 110, padding: '8px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700,
              background: mode === item.key ? '#000000' : 'transparent',
              color: mode === item.key ? '#FFFFFF' : 'var(--text-secondary)',
              border: 'none', cursor: 'pointer', fontFamily: 'var(--font-main)', transition: 'all 0.2s ease', whiteSpace: 'nowrap'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Topic description */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', marginBottom: 16, background: 'rgba(0,122,255,0.07)', border: '1px solid rgba(0,122,255,0.18)', borderRadius: 'var(--radius-md)' }}>
        <Info size={15} color="#007AFF" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.85rem', color: '#007AFF', fontWeight: 600 }}>{modeInfo.description}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 1fr) minmax(340px, 1.6fr)', gap: 20 }}>
        {/* Left Column: Input Config + Play */}
        <div className="card-light" style={{ padding: 20, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.02rem', fontWeight: 800, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Code2 size={16} /> Configure Input
          </h3>

          {(mode === 'avl' || mode === 'bst') && (
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Node Keys (Comma Separated)</label>
              <input type="text" value={treeInput} onChange={e => setTreeInput(e.target.value)} style={{ width: '100%', padding: '8px 12px', fontSize: '0.85rem' }} />
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 6 }}>
                One number is inserted per step. AVL mode also shows balance factors and rotations.
              </p>
            </div>
          )}

          {mode === 'knapsack' && (
            <div>
              <div style={{ marginBottom: 10 }}><label style={{ fontSize: '0.78rem', fontWeight: 700 }}>Weights</label><input type="text" value={knapsackWeights} onChange={e => setKnapsackWeights(e.target.value)} style={{ width: '100%', padding: '6px 10px' }} /></div>
              <div style={{ marginBottom: 10 }}><label style={{ fontSize: '0.78rem', fontWeight: 700 }}>Values</label><input type="text" value={knapsackValues} onChange={e => setKnapsackValues(e.target.value)} style={{ width: '100%', padding: '6px 10px' }} /></div>
              <div style={{ marginBottom: 14 }}><label style={{ fontSize: '0.78rem', fontWeight: 700 }}>Capacity W</label><input type="number" value={knapsackCapacity} onChange={e => setKnapsackCapacity(e.target.value)} style={{ width: '100%', padding: '6px 10px' }} /></div>
            </div>
          )}

          {mode === 'trie' && (
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Words (Comma Separated)</label>
              <input type="text" value={trieWords} onChange={e => setTrieWords(e.target.value)} style={{ width: '100%', padding: '8px 12px', fontSize: '0.85rem' }} />
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 6 }}>Each character of every word is added to the canvas step-by-step.</p>
            </div>
          )}

          {mode === 'segment' && (
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Array Values (Comma Separated)</label>
              <input type="text" value={segmentArray} onChange={e => setSegmentArray(e.target.value)} style={{ width: '100%', padding: '8px 12px', fontSize: '0.85rem' }} />
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 6 }}>Leaf nodes are created first, then merged into internal range-sum nodes.</p>
            </div>
          )}

          {mode === 'kmp' && (
            <div>
              <div style={{ marginBottom: 10 }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>Text</label>
                <input type="text" value={kmpText} onChange={e => setKmpText(e.target.value)} style={{ width: '100%', padding: '6px 10px', fontFamily: 'var(--font-code)' }} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>Pattern</label>
                <input type="text" value={kmpPattern} onChange={e => setKmpPattern(e.target.value)} style={{ width: '100%', padding: '6px 10px', fontFamily: 'var(--font-code)' }} />
              </div>
            </div>
          )}

          <div style={{ marginTop: 'auto', paddingTop: 14, display: 'flex', gap: 10 }}>
            <button className="btn btn-secondary" style={{ gap: 6 }} onClick={handleRandomize} title="Randomize Input">
              <Shuffle size={16} /> Random
            </button>
            <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', gap: 6 }} onClick={handlePlay}>
              <Play size={16} /> Play Step-by-Step
            </button>
          </div>
        </div>

        {/* Right Column: Animation Canvas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ height: 400 }}>
            {frames.length === 0 ? (
              <div style={{
                width: '100%', height: '100%', minHeight: 380, background: '#FAFAFA',
                borderRadius: 'var(--radius-lg)', border: '1.5px dashed var(--border-hairline)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
                color: 'var(--text-muted)', textAlign: 'center', padding: 20
              }}>
                <Play size={32} color="var(--text-muted)" />
                <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#000' }}>Canvas is ready for {modeInfo.label}</p>
                <p style={{ fontSize: '0.8rem' }}>Enter your input and press <strong>Play Step-by-Step</strong> to start the animation.</p>
              </div>
            ) : isMatrixMode ? (
              <DpMatrixCanvas key={`dp-${runIdRef.current}`} dpMatrix={currentFrame?.dpMatrix} />
            ) : (
              <TreeSvgCanvas key={`tree-${runIdRef.current}`} nodes={currentFrame?.nodes || []} edges={currentFrame?.edges || []} />
            )}
          </div>

          <ControlBar
            currentStep={stepIndex + 1} totalSteps={frames.length}
            isPlaying={isPlaying} playbackSpeed={speed}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onStepBack={() => setStepIndex(prev => Math.max(0, prev - 1))}
            onStepForward={() => setStepIndex(prev => Math.min(frames.length - 1, prev + 1))}
            onReset={() => { setStepIndex(0); setIsPlaying(false); }}
            onSpeedChange={setSpeed}
          />
        </div>
      </div>

      {/* Step explanation + Console */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(300px, 1fr)', gap: 20, marginTop: 20 }}>
        <div style={{ minHeight: 240 }}>
          {currentFrame ? (
            <ExplanationPanel currentFrame={currentFrame} />
          ) : (
            <div className="panel" style={{ padding: 20, height: '100%', minHeight: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Step explanations will appear here while the algorithm runs.
            </div>
          )}
        </div>

        <div className="card-black" style={{ padding: 18, fontFamily: 'var(--font-code)', fontSize: '0.8rem', maxHeight: 320, overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, color: 'var(--accent-gold)', fontWeight: 700 }}>
            <Terminal size={14} /> LIVE EXECUTION LOGS
          </div>
          {logs.length === 0 && (
            <div style={{ color: 'rgba(255,255,255,0.5)' }}>No steps executed yet.</div>
          )}
          {logs.map((line, i) => (
            <div key={i} style={{
              color: line.startsWith('[STEP') ? 'var(--accent-green)' : line.startsWith('[RUN]') ? '#FFFFFF' : 'rgba(255,255,255,0.85)',
              marginBottom: 4
            }}>
              {line}
            </div>
          ))}
          {isPlaying && frames.length > 0 && (
            <div style={{ color: 'var(--accent-gold)', marginTop: 8 }}>
              ▶ Playing... step {stepIndex + 1} of {frames.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
