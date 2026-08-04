import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Puzzle, Rocket, GraduationCap, ArrowRight } from 'lucide-react';

// ============================================================================
// Level 1 — AVL Trees: pictorial + theory introduction
// Four slides teach the concepts visually, then the player can practice
// (visualizer / rotation puzzles) or jump straight into the graded quiz.
// ============================================================================

interface MiniTreeProps {
  nodes: { x: number; y: number; label: string; bf?: number; fill?: string }[];
  edges: [number, number][];
  width?: number;
  height?: number;
  title?: string;
}

const MiniTree: React.FC<MiniTreeProps> = ({ nodes, edges, width = 300, height = 240, title }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      {title && <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{title}</div>}
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', maxHeight: 220 }}>
        {edges.map(([a, b], i) => {
          const na = nodes[a];
          const nb = nodes[b];
          return (
            <line
              key={i}
              x1={na.x} y1={na.y + 24} x2={nb.x} y2={nb.y - 24}
              stroke="#C7C7CC" strokeWidth="2"
            />
          );
        })}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={24} fill={n.fill || '#1A1A1A'} />
            <text x={n.x} y={n.y + 5} fill="#fff" fontSize="15" fontWeight="800" textAnchor="middle" fontFamily="var(--font-main)">
              {n.label}
            </text>
            {n.bf !== undefined && (
              <text x={n.x} y={n.y - 30} fill={Math.abs(n.bf) > 1 ? '#FF3B30' : '#34C759'} fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="var(--font-code)">
                BF {n.bf > 0 ? '+' : ''}{n.bf}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

interface RotationDiagramProps {
  label: string;
  before: { nodes: MiniTreeProps['nodes']; edges: MiniTreeProps['edges'] };
  after: { nodes: MiniTreeProps['nodes']; edges: MiniTreeProps['edges'] };
  caption: string;
}

const RotationDiagram: React.FC<RotationDiagramProps> = ({ label, before, after, caption }) => {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-md)', padding: 12 }}>
      <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#007AFF', textAlign: 'center', marginBottom: 6, letterSpacing: '0.04em' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <MiniTree nodes={before.nodes} edges={before.edges} width={210} height={200} title="Before" />
        </div>
        <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#34C759' }}>→</div>
        <div style={{ flex: 1 }}>
          <MiniTree nodes={after.nodes} edges={after.edges} width={210} height={200} title="After" />
        </div>
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 6 }}>{caption}</div>
    </div>
  );
};

interface LevelIntroFlowProps {
  onOpenVisualizer: () => void;
  onOpenRotationGame: () => void;
  onContinue: () => void;
}

interface Slide {
  eyebrow: string;
  title: string;
  theory: string;
  bullets: string[];
  body: React.ReactNode;
}

export const LevelIntroFlow: React.FC<LevelIntroFlowProps> = ({ onOpenVisualizer, onOpenRotationGame, onContinue }) => {
  const [slide, setSlide] = useState(0);

  const slides: Slide[] = [
    {
      eyebrow: 'Slide 1 · What is an AVL Tree?',
      title: 'An AVL Tree is a self-balancing Binary Search Tree',
      theory:
        'Inserting keys into a plain BST can create a tall, skewed chain — search then degrades from O(log N) to O(N). AVL trees fix this by enforcing a strict height rule after EVERY insertion: they are named after their inventors Adelson-Velsky and Landis (1962).',
      bullets: [
        'Every node stores keys in BST order: Left < Node < Right.',
        'The tree automatically REBALANCES itself after every insert or delete.',
        'Guaranteed height = O(log N) — searching 1 million keys needs ~20 comparisons.',
      ],
      body: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <MiniTree
            title="Plain BST — insert 10, 20, 30"
            nodes={[
              { x: 150, y: 40, label: '10', bf: -2, fill: '#8E8E93' },
              { x: 150, y: 130, label: '20', bf: -1, fill: '#8E8E93' },
              { x: 150, y: 220, label: '30', bf: 0, fill: '#8E8E93' },
            ]}
            edges={[[0, 1], [1, 2]]}
          />
          <MiniTree
            title="AVL Tree — same keys, rebalanced"
            nodes={[
              { x: 150, y: 40, label: '20', bf: 0, fill: '#1A1A1A' },
              { x: 70, y: 140, label: '10', bf: 0, fill: '#1A1A1A' },
              { x: 230, y: 140, label: '30', bf: 0, fill: '#1A1A1A' },
            ]}
            edges={[[0, 1], [0, 2]]}
          />
        </div>
      ),
    },
    {
      eyebrow: 'Slide 2 · Balance Factor',
      title: 'Balance Factor = Height(left) − Height(right)',
      theory:
        'Each node remembers its height (longest path down to a leaf). The Balance Factor (BF) compares the heights of the two subtrees. An AVL tree accepts only BF ∈ {−1, 0, +1} at every node; the moment a BF reaches +2 or −2, a rotation restores the rule.',
      bullets: [
        'BF = 0 → left and right subtrees have equal height.',
        'BF = +1 → left subtree is one level taller; BF = −1 → right subtree is one taller.',
        'BF = +2 or −2 → imbalance → the tree performs a ROTATION immediately.',
      ],
      body: (
        <div>
          <MiniTree
            title="Valid AVL tree — every BF is −1, 0 or +1"
            nodes={[
              { x: 170, y: 40, label: '40', bf: 1 },
              { x: 90, y: 140, label: '20', bf: 0 },
              { x: 250, y: 140, label: '60', bf: -1 },
              { x: 330, y: 140, label: '80', bf: 0 },
            ]}
            edges={[[0, 1], [0, 2], [2, 3]]}
          />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 10, flexWrap: 'wrap' }}>
            {['BF 0 = balanced', 'BF +1 = left taller', 'BF −1 = right taller', 'BF ±2 = rotate!'].map(t => (
              <span key={t} style={{ fontSize: '0.72rem', fontWeight: 800, background: 'var(--bg-light)', padding: '4px 10px', borderRadius: 100, color: 'var(--text-secondary)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      eyebrow: 'Slide 3 · The Four Rotations',
      title: 'LL, RR, LR, RL — two single rotations and two double rotations',
      theory:
        'When a node violates the balance rule, the shape of the heavy chain decides the fix. Same-direction chains (LL, RR) need a single rotation; opposite-direction chains (LR, RL) need a double rotation: rotate the child first, then the parent. Rotations move nodes but preserve BST ordering.',
      bullets: [
        'LL (left-heavy chain) → single RIGHT rotation.',
        'RR (right-heavy chain) → single LEFT rotation.',
        'LR (left-right bend) → rotate child LEFT, then parent RIGHT.',
        'RL (right-left bend) → rotate child RIGHT, then parent LEFT.',
      ],
      body: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <RotationDiagram
            label="LL — Right Rotation"
            caption="Heavy left chain: 30 → 20 → 10. Rotate right at 30."
            before={{
              nodes: [
                { x: 110, y: 30, label: '30' },
                { x: 70, y: 110, label: '20' },
                { x: 30, y: 185, label: '10' },
              ],
              edges: [[0, 1], [1, 2]],
            }}
            after={{
              nodes: [
                { x: 100, y: 30, label: '20' },
                { x: 40, y: 110, label: '10' },
                { x: 160, y: 110, label: '30' },
              ],
              edges: [[0, 1], [0, 2]],
            }}
          />
          <RotationDiagram
            label="RR — Left Rotation"
            caption="Heavy right chain: 10 → 20 → 30. Rotate left at 10."
            before={{
              nodes: [
                { x: 110, y: 30, label: '10' },
                { x: 150, y: 110, label: '20' },
                { x: 190, y: 185, label: '30' },
              ],
              edges: [[0, 1], [1, 2]],
            }}
            after={{
              nodes: [
                { x: 100, y: 30, label: '20' },
                { x: 40, y: 110, label: '10' },
                { x: 160, y: 110, label: '30' },
              ],
              edges: [[0, 1], [0, 2]],
            }}
          />
          <RotationDiagram
            label="LR — Left-Right Double Rotation"
            caption="Bend at 30 → 10 → 20: rotate 10 left, then 30 right."
            before={{
              nodes: [
                { x: 120, y: 30, label: '30' },
                { x: 50, y: 110, label: '10' },
                { x: 90, y: 185, label: '20' },
              ],
              edges: [[0, 1], [1, 2]],
            }}
            after={{
              nodes: [
                { x: 100, y: 30, label: '20' },
                { x: 40, y: 110, label: '10' },
                { x: 160, y: 110, label: '30' },
              ],
              edges: [[0, 1], [0, 2]],
            }}
          />
          <RotationDiagram
            label="RL — Right-Left Double Rotation"
            caption="Bend at 10 → 30 → 20: rotate 30 right, then 10 left."
            before={{
              nodes: [
                { x: 100, y: 30, label: '10' },
                { x: 170, y: 110, label: '30' },
                { x: 130, y: 185, label: '20' },
              ],
              edges: [[0, 1], [1, 2]],
            }}
            after={{
              nodes: [
                { x: 100, y: 30, label: '20' },
                { x: 40, y: 110, label: '10' },
                { x: 160, y: 110, label: '30' },
              ],
              edges: [[0, 1], [0, 2]],
            }}
          />
        </div>
      ),
    },
    {
      eyebrow: 'Slide 4 · Rules, Complexity & Practice',
      title: 'One rule keeps every operation at O(log N)',
      theory:
        'After every insertion, walk back up the path to the root and check the balance factor of each ancestor. The first node with |BF| = 2 is fixed with the matching rotation, and the rebalanced subtree stays connected to the tree — nothing else changes.',
      bullets: [
        'Search: O(log N) worst case — guaranteed by the height bound.',
        'Insert / Delete: O(log N) — at most ONE rebalancing rotation per level on the path.',
        'Used in real life: memory allocators, database index caches, and set/map containers in C++, Java, Rust.',
      ],
      body: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              ['Search', 'O(log N)'],
              ['Insert', 'O(log N)'],
              ['Delete', 'O(log N)'],
              ['Space', 'O(N)'],
            ].map(([op, c]) => (
              <div key={op} className="card-black" style={{ padding: '10px 18px', textAlign: 'center', minWidth: 110 }}>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.55)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{op}</div>
                <div style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--accent-gold)', fontFamily: 'var(--font-code)' }}>{c}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={onOpenVisualizer} style={{ gap: 6 }}>
              <Play size={16} /> Practice in Visualizer
            </button>
            <button className="btn btn-secondary" onClick={onOpenRotationGame} style={{ gap: 6 }}>
              <Puzzle size={16} /> Rotation Puzzle Game
            </button>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Practice is optional — the graded quiz below is what completes the level.
          </div>
        </div>
      ),
    },
  ];

  const current = slides[slide];
  const isLast = slide === slides.length - 1;

  return (
    <div className="cmp-fade-up" style={{ maxWidth: 780, margin: '20px auto' }}>
      <div className="card-light" style={{ padding: 24, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 100, background: '#007AFF18', border: '1px solid #007AFF40', color: '#007AFF', fontWeight: 800, fontSize: '0.75rem' }}>
            <GraduationCap size={14} /> LEVEL 1 · LEARN
          </span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            AVL Trees — Concepts & Theory
          </span>
          <button
            onClick={onContinue}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-main)', textDecoration: 'underline' }}
          >
            Skip intro →
          </button>
        </div>

        {/* Slide indicator */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {slides.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 5, borderRadius: 3,
              background: i <= slide ? 'linear-gradient(90deg, #007AFF, #9B51E0)' : 'var(--bg-grey)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>

        <div key={slide} className="cmp-fade-up" style={{ minHeight: 420 }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#007AFF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
            {current.eyebrow}
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: 10, lineHeight: 1.3 }}>{current.title}</h3>

          <div className="card-grey" style={{ padding: '14px 16px', marginBottom: 16, borderLeft: '3px solid #007AFF' }}>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, margin: 0, color: 'var(--text-body)' }}>{current.theory}</p>
          </div>

          {current.body}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
            {current.bullets.map(b => (
              <div key={b} style={{
                display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: '0.8rem', fontWeight: 600,
                background: 'var(--bg-light)', padding: '8px 12px', borderRadius: 'var(--radius-md)', color: 'var(--text-body)',
                flex: '1 1 45%',
              }}>
                <span style={{ color: '#34C759', fontWeight: 900 }}>✓</span> {b}
              </div>
            ))}
          </div>
        </div>

        {/* Footer nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
          <button
            className="btn btn-secondary"
            onClick={() => setSlide(Math.max(0, slide - 1))}
            disabled={slide === 0}
            style={{ gap: 6, opacity: slide === 0 ? 0.4 : 1, cursor: slide === 0 ? 'not-allowed' : 'pointer' }}
          >
            <ChevronLeft size={16} /> Back
          </button>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>
            {slide + 1} / {slides.length}
          </span>
          {isLast ? (
            <button className="btn btn-primary" onClick={onContinue} style={{ gap: 6 }}>
              Take the Graded Quiz <Rocket size={16} />
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => setSlide(slide + 1)} style={{ gap: 6 }}>
              Next <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
