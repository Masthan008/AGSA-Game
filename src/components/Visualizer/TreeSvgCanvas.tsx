import React, { useState, useRef } from 'react';
import { NodePosition, EdgeConnection } from '../../types';
import { ZoomIn, ZoomOut, Maximize2, ArrowDownLeft, ArrowDownRight, ArrowUpLeft, ArrowUpRight } from 'lucide-react';

interface TreeSvgCanvasProps {
  nodes: NodePosition[];
  edges?: EdgeConnection[];
  minHeight?: number | string;
}

export const TreeSvgCanvas: React.FC<TreeSvgCanvasProps> = ({ nodes, edges = [], minHeight = 380 }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.4));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Balance analysis — shown for trees that carry balance factors.
  const bfNodes = nodes.filter(n => n.balanceFactor !== undefined);
  const showMeter = bfNodes.length > 0;
  const maxAbsBF = bfNodes.reduce((m, n) => Math.max(m, Math.abs(n.balanceFactor || 0)), 0);
  const isBalanced = maxAbsBF <= 1;
  const childIds = new Set(edges.map(e => String(e.to)));
  const root = nodes.find(n => !childIds.has(String(n.id)) && n.balanceFactor !== undefined);
  const rootBF = root ? (root.balanceFactor || 0) : (bfNodes[0]?.balanceFactor || 0);
  const bubbleOffset = Math.max(-30, Math.min(30, rootBF * -13));

  // Auto-fit ViewBox: bounds the actual node layout with padding, so heavy
  // inputs (deep BSTs, long KMP strings, wide tries) never clip or overflow.
  const PAD = 60;
  let baseW = 600;
  let baseH = 400;
  let fitCx = 300;
  let fitCy = 200;
  if (nodes.length > 0) {
    const xs = nodes.map(n => n.x);
    const ys = nodes.map(n => n.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    baseW = Math.max(320, maxX - minX + PAD * 2);
    baseH = Math.max(240, maxY - minY + PAD * 2);
    fitCx = (minX + maxX) / 2;
    fitCy = (minY + maxY) / 2;
  }
  const vW = baseW / zoomLevel;
  const vH = baseH / zoomLevel;
  const vX = fitCx - vW / 2 - pan.x / zoomLevel;
  const vY = fitCy - vH / 2 - pan.y / zoomLevel;
  const viewBoxStr = `${vX} ${vY} ${vW} ${vH}`;

  return (
    <div
      style={{
        width: '100%', height: '100%', minHeight,
        background: '#FAFAFA', borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-hairline)',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Zoom / Pan Floating Control Toolbar */}
      <div style={{
        position: 'absolute', top: 12, right: 12, zIndex: 10,
        display: 'flex', gap: 4, background: '#FFFFFF', padding: 4,
        borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-hairline)',
        boxShadow: 'var(--shadow-xs)'
      }}>
        <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', minHeight: 26 }} onClick={handleZoomIn} title="Zoom In">
          <ZoomIn size={14} />
        </button>
        <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', minHeight: 26 }} onClick={handleZoomOut} title="Zoom Out">
          <ZoomOut size={14} />
        </button>
        <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', minHeight: 26 }} onClick={handleResetZoom} title="Reset View">
          <Maximize2 size={14} /> Fit
        </button>
      </div>

      {/* Balance Status — spirit-level meter + converging/diverging arrows */}
      {showMeter && (
        <div key={`bal-${isBalanced}-${maxAbsBF}`} style={{
          position: 'absolute', top: 12, left: 12, zIndex: 10,
          display: 'flex', flexDirection: 'column', gap: 6, pointerEvents: 'none',
          animation: 'cmp-fade-in 0.3s ease both',
        }}>
          <div className={isBalanced ? 'bal-badge bal-badge-ok' : 'bal-badge bal-badge-bad'}>
            <div className="bal-arrows">
              {isBalanced ? (
                <>
                  <ArrowDownLeft size={15} className="bal-arrow-in bal-arrow-l" />
                  <ArrowDownRight size={15} className="bal-arrow-in bal-arrow-r" />
                </>
              ) : (
                <>
                  <ArrowUpLeft size={15} className="bal-arrow-out bal-arrow-l" />
                  <ArrowUpRight size={15} className="bal-arrow-out bal-arrow-r" />
                </>
              )}
            </div>
            <span>
              {isBalanced ? 'BALANCED' : `UNBALANCED · BF ${rootBF > 0 ? '+' : ''}${maxAbsBF}`}
            </span>
          </div>

          <div className={isBalanced ? 'bal-meter bal-meter-ok' : 'bal-meter bal-meter-bad'}>
            <div className="bal-track">
              <span className="bal-track-mark" style={{ left: '25%' }} />
              <span className="bal-track-mark" style={{ left: '50%' }} />
              <span className="bal-track-mark" style={{ left: '75%' }} />
              <div
                className={isBalanced ? 'bal-bubble' : 'bal-bubble bal-bubble-bad'}
                style={{ left: `calc(50% + ${bubbleOffset}px)` }}
              />
            </div>
            <span className="bal-side">
              {isBalanced ? 'EVEN' : rootBF > 0 ? 'LEFT-HEAVY' : 'RIGHT-HEAVY'}
            </span>
          </div>
        </div>
      )}

      {nodes.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 32 }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#000', marginBottom: 4 }}>Empty Canvas</p>
          <p style={{ fontSize: '0.85rem' }}>Use the "+ Insert Node" button above to add numbers to the tree</p>
        </div>
      ) : (
        <svg
          viewBox={viewBoxStr}
          style={{ width: '100%', height: '100%', maxHeight: 450, touchAction: 'none' }}
        >
          {/* Edges */}
          {edges.map((edge, idx) => {
            const from = nodes.find(n => n.id === edge.from);
            const to = nodes.find(n => n.id === edge.to);
            if (!from || !to) return null;
            return (
              <line
                key={`e-${idx}`}
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke={edge.highlighted ? 'var(--accent-red)' : '#CCCCCC'}
                strokeWidth={edge.highlighted ? 2.5 : 1.5}
                className="tree-edge"
              />
            );
          })}

          {/* Edge Labels */}
          {edges.map((edge, idx) => {
            const from = nodes.find(n => n.id === edge.from);
            const to = nodes.find(n => n.id === edge.to);
            if (!from || !to || edge.label === undefined) return null;
            return (
              <text
                key={`el-${idx}`}
                x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 6}
                fill="var(--text-secondary)" fontSize="10" fontWeight="700" textAnchor="middle"
                fontFamily="var(--font-main)"
              >
                {edge.label}
              </text>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isActive = node.state === 'active';
            const isSuccess = node.state === 'success';
            const isError = node.state === 'error';
            const isWarning = node.state === 'warning';
            const isComparing = node.state === 'comparing';
            const isPivot = node.state === 'pivot';

            // Multi-key node (B-Tree, 2-3-4 tree …) — wide rounded cell row
            const nodeKeys = node.keys;
            if (nodeKeys && nodeKeys.length > 0) {
              const keyW = 34;
              const w = nodeKeys.length * keyW + 10;
              const fill = isError ? '#FF3B30' : isActive ? '#000000' : isSuccess ? '#34C759' : isWarning ? '#FF9500' : isPivot ? '#9B51E0' : isComparing ? '#007AFF' : '#1A1A1A';
              const stroke = isError ? '#FF3B30' : isActive ? '#007AFF' : isSuccess ? '#2DA44E' : isPivot ? '#9B51E0' : isComparing ? '#007AFF' : '#000000';
              return (
                <g key={`n-${node.id}`} className="tree-node" style={{ transform: `translate(${node.x}px, ${node.y}px)` }}>
                  <g className={isActive ? 'node-active' : undefined} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                    <rect x={-w / 2} y={-18} width={w} height={36} rx={10} fill={fill} stroke={stroke} strokeWidth={isActive || isPivot ? 2.5 : 1.5} />
                    {nodeKeys.map((k, ki) => (
                      <g key={ki}>
                        <text
                          x={-w / 2 + keyW * ki + keyW / 2} y={5.5}
                          fill="#fff" fontSize="13.5" fontWeight="800" textAnchor="middle" fontFamily="var(--font-main)"
                        >
                          {k}
                        </text>
                        {ki < nodeKeys.length - 1 && (
                          <line
                            x1={-w / 2 + keyW * (ki + 1)} y1={-10}
                            x2={-w / 2 + keyW * (ki + 1)} y2={10}
                            stroke="rgba(255,255,255,0.35)" strokeWidth="1"
                          />
                        )}
                      </g>
                    ))}
                    {node.label && (
                      <text x={0} y={-24} fill="#8A8A93" fontSize="9.5" fontWeight="700" textAnchor="middle" fontFamily="var(--font-code)">
                        {node.label}
                      </text>
                    )}
                  </g>
                </g>
              );
            }

            const fill = isError ? '#FF3B30' : isActive ? '#000000' : isSuccess ? '#34C759' : isWarning ? '#FF9500' : isPivot ? '#9B51E0' : isComparing ? '#007AFF' : '#1A1A1A';
            const stroke = isError ? '#FF3B30' : isActive ? '#007AFF' : isSuccess ? '#2DA44E' : isPivot ? '#9B51E0' : isComparing ? '#007AFF' : '#000000';

            return (
              // Outer <g> owns the position transform (inline CSS so the glide
              // transition animates it); the pulse animation lives on the inner
              // <g> so it can never override the node's position.
              <g key={`n-${node.id}`} className="tree-node" style={{ transform: `translate(${node.x}px, ${node.y}px)` }}>
                <g className={isActive ? 'node-active' : undefined} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                  <circle r="20" fill={fill} stroke={stroke} strokeWidth={isActive ? 3 : 2} />
                  <text fill="#fff" fontSize="12" fontWeight="700" textAnchor="middle" dy="4.5" fontFamily="var(--font-main)">
                    {node.value}
                  </text>

                  {/* Balance Factor Badge */}
                  {node.balanceFactor !== undefined && (
                    <g transform="translate(18, -16)">
                      <rect x="-7" y="-9" width="22" height="15" rx="4"
                        fill={Math.abs(node.balanceFactor) > 1 ? '#FF3B30' : '#FFFFFF'}
                        stroke={Math.abs(node.balanceFactor) > 1 ? '#FF3B30' : '#E5E5E5'}
                        strokeWidth="1"
                      />
                      <text
                        fill={Math.abs(node.balanceFactor) > 1 ? '#FFFFFF' : '#000000'}
                        fontSize="9" fontWeight="800" textAnchor="middle" dx="4" dy="3" fontFamily="var(--font-code)"
                      >
                        {node.balanceFactor > 0 ? `+${node.balanceFactor}` : node.balanceFactor}
                      </text>
                    </g>
                  )}
                </g>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
};
