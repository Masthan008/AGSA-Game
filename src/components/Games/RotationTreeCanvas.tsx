import React from 'react';
import { NodePosition, EdgeConnection } from '../../types';

interface RotationTreeCanvasProps {
  nodes: NodePosition[];
  edges?: EdgeConnection[];
  variant?: 'unbalanced' | 'applied' | 'solved';
  animateKey?: string | number;
  height?: number | string;
}

const STATE_STYLE: Record<string, { fill: string; stroke: string; halo: boolean }> = {
  error: { fill: 'url(#rotGradError)', stroke: '#FF3B30', halo: true },
  warning: { fill: 'url(#rotGradWarn)', stroke: '#FF9500', halo: false },
  success: { fill: 'url(#rotGradOk)', stroke: '#34C759', halo: true },
  default: { fill: 'url(#rotGradNode)', stroke: '#1C1C1E', halo: false },
};

export const RotationTreeCanvas: React.FC<RotationTreeCanvasProps> = ({
  nodes,
  edges = [],
  variant = 'unbalanced',
  animateKey,
  height = '100%',
}) => {
  return (
    <div
      className="rot-canvas"
      style={{ height, width: '100%', position: 'relative', overflow: 'hidden' }}
    >
      <svg
        key={animateKey}
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid meet"
        className="rot-svg"
      >
        <defs>
          <pattern id="rotGrid" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.3" fill="#D7DEE9" />
          </pattern>
          <radialGradient id="rotBg" cx="50%" cy="38%" r="75%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EEF2F8" />
          </radialGradient>
          <linearGradient id="rotGradNode" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2C2C31" />
            <stop offset="100%" stopColor="#111114" />
          </linearGradient>
          <linearGradient id="rotGradError" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF6B60" />
            <stop offset="100%" stopColor="#D92B21" />
          </linearGradient>
          <linearGradient id="rotGradWarn" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFB74D" />
            <stop offset="100%" stopColor="#E07C00" />
          </linearGradient>
          <linearGradient id="rotGradOk" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4CD964" />
            <stop offset="100%" stopColor="#1FA33D" />
          </linearGradient>
          <filter id="rotGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="600" height="400" fill="url(#rotBg)" />
        <rect width="600" height="400" fill="url(#rotGrid)" />

        {/* Ground line */}
        <line x1="40" y1="388" x2="560" y2="388" stroke="#DDE4EE" strokeWidth="1.5" strokeLinecap="round" />

        {/* Edges — draw-in animation */}
        {edges.map((edge, idx) => {
          const from = nodes.find(n => n.id === edge.from);
          const to = nodes.find(n => n.id === edge.to);
          if (!from || !to) return null;
          return (
            <line
              key={`re-${idx}`}
              className="rot-edge"
              style={{ animationDelay: `${0.08 + idx * 0.07}s` }}
              x1={from.x} y1={from.y + 14}
              x2={to.x} y2={to.y - 18}
              stroke="#B9C5D8"
              strokeWidth={2}
              strokeLinecap="round"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, idx) => {
          const isError = node.state === 'error';
          const isWarning = node.state === 'warning';
          const isSuccess = node.state === 'success' || variant === 'solved';
          const style = STATE_STYLE[isError ? 'error' : isWarning ? 'warning' : isSuccess ? 'success' : 'default'];
          const bf = node.balanceFactor;
          const showBf = bf !== undefined && bf !== null;

          return (
            <g
              key={`rn-${node.id}`}
              className="rot-glide"
              style={{ transform: `translate(${node.x}px, ${node.y}px)`, animationDelay: `${0.1 + idx * 0.06}s` }}
            >
              <g
                className={`rot-node${isError ? ' rot-node-error' : isWarning ? ' rot-node-warn' : isSuccess ? ' rot-node-ok' : ''}`}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              >
                {style.halo && <circle className="rot-halo" r="22" fill={isError ? 'rgba(255,59,48,0.35)' : 'rgba(52,199,89,0.35)'} />}

                <circle
                  r="20"
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth={isError || isWarning ? 3 : 2.5}
                  filter={isSuccess ? 'url(#rotGlow)' : undefined}
                />
                <text fill="#FFFFFF" fontSize="13" fontWeight="800" textAnchor="middle" dy="4.5" fontFamily="var(--font-main)">
                  {node.value}
                </text>

                {showBf && (
                  <g className="rot-badge" style={{ transformBox: 'fill-box', transformOrigin: 'center', animationDelay: `${0.35 + idx * 0.06}s` }} transform="translate(15, -14)">
                    <rect x="-8" y="-10" width="24" height="16" rx="5"
                      fill={Math.abs(bf) > 1 ? '#FF3B30' : isSuccess ? '#34C759' : '#FFFFFF'}
                      stroke={Math.abs(bf) > 1 ? '#FF3B30' : isSuccess ? '#34C759' : '#DDE3EE'}
                      strokeWidth="1.2" />
                    <text
                      fill={Math.abs(bf) > 1 || isSuccess ? '#FFFFFF' : '#1C1C1E'}
                      fontSize="9.5" fontWeight="900" textAnchor="middle" dx="4" dy="2.5" fontFamily="var(--font-code)"
                    >
                      {bf > 0 ? `+${bf}` : bf}
                    </text>
                  </g>
                )}
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
