import React, { useState } from 'react';
import { LEVEL_TOPICS } from '../../data/levelsData';
import { CODE_TEMPLATES } from '../../data/codeTemplates';
import { TreeSvgCanvas } from '../Visualizer/TreeSvgCanvas';
import { DpMatrixCanvas } from '../Visualizer/DpMatrixCanvas';
import { ControlBar } from '../Visualizer/ControlBar';
import { ExplanationPanel } from '../Visualizer/ExplanationPanel';
import { generateAVLTreeFrames } from '../../algorithms/avlTreeEngine';
import { generateDijkstraFrames } from '../../algorithms/dijkstraEngine';
import { generateKnapsackFrames } from '../../algorithms/knapsackEngine';
import { generateTrieFrames } from '../../algorithms/trieEngine';
import { AnimationFrame } from '../../types';
import { Play, Shuffle } from 'lucide-react';

export const PracticePlayground: React.FC = () => {
  const [selectedAlgo, setSelectedAlgo] = useState('avl');
  const [customInput, setCustomInput] = useState('10, 20, 30, 40, 50, 25');
  const [frames, setFrames] = useState<AnimationFrame[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const currentFrame = frames[stepIndex] || null;

  const handleRun = () => {
    let generated: AnimationFrame[] = [];
    if (selectedAlgo === 'avl' || selectedAlgo === 'bst') {
      const nums = customInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
      generated = generateAVLTreeFrames(nums.length > 0 ? nums : [10, 20, 30]);
    } else if (selectedAlgo === 'dijkstra') {
      generated = generateDijkstraFrames();
    } else if (selectedAlgo === 'knapsack') {
      generated = generateKnapsackFrames();
    } else if (selectedAlgo === 'trie') {
      const words = customInput.split(',').map(s => s.trim()).filter(Boolean);
      generated = generateTrieFrames(words.length > 0 ? words : ['cat', 'car', 'dot']);
    } else {
      generated = generateAVLTreeFrames([15, 25, 35, 45]);
    }
    setFrames(generated);
    setStepIndex(0);
    setIsPlaying(false);
  };

  const handleRandomize = () => {
    if (selectedAlgo === 'trie') {
      const wordList = ['apple', 'app', 'ape', 'bat', 'ball', 'cat', 'car', 'can', 'dog', 'dot'];
      const count = 3 + Math.floor(Math.random() * 4);
      const shuffled = wordList.sort(() => Math.random() - 0.5).slice(0, count);
      setCustomInput(shuffled.join(', '));
    } else {
      const count = 5 + Math.floor(Math.random() * 4);
      const nums = Array.from({ length: count }, () => Math.floor(Math.random() * 90) + 10);
      setCustomInput(nums.join(', '));
    }
  };

  // Auto-play timer
  React.useEffect(() => {
    let timer: any = null;
    if (isPlaying && frames.length > 0) {
      timer = setInterval(() => {
        setStepIndex(prev => {
          if (prev + 1 < frames.length) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 1500 / speed);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [isPlaying, frames, speed]);

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 16px' }}>
      <h2 className="section-title" style={{ marginBottom: 4 }}>Practice Playground</h2>
      <p className="section-subtitle" style={{ marginBottom: 20 }}>Enter custom input and watch any algorithm step-by-step.</p>

      {/* Input Area */}
      <div className="card-light" style={{ padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
          <select value={selectedAlgo} onChange={e => setSelectedAlgo(e.target.value)}
            style={{ flex: '0 0 180px', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-hairline)', fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.88rem' }}>
            <option value="avl">AVL Tree</option>
            <option value="bst">Binary Search Tree</option>
            <option value="trie">Trie</option>
            <option value="dijkstra">Dijkstra</option>
            <option value="knapsack">0/1 Knapsack</option>
          </select>

          <input type="text" value={customInput} onChange={e => setCustomInput(e.target.value)}
            placeholder="Enter comma-separated values..."
            style={{ flex: 1, minWidth: 200 }}
          />

          <button className="btn btn-secondary btn-sm" onClick={handleRandomize} title="Randomize Input">
            <Shuffle size={15} /> Random
          </button>
          <button className="btn btn-primary" onClick={handleRun}>
            <Play size={15} /> Run
          </button>
        </div>
      </div>

      {/* Visualizer */}
      {frames.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
          <div>
            {selectedAlgo === 'knapsack' ? (
              <DpMatrixCanvas dpMatrix={currentFrame?.dpMatrix} />
            ) : (
              <TreeSvgCanvas nodes={currentFrame?.nodes || []} edges={currentFrame?.edges || []} />
            )}
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
          <ExplanationPanel currentFrame={currentFrame || undefined} />
        </div>
      )}
    </div>
  );
};
