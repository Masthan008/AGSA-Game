import React from 'react';

interface DpMatrixCanvasProps {
  dpMatrix?: {
    rows: string[];
    cols: string[];
    data: (number | string)[][];
    activeCell?: [number, number];
  };
}

export const DpMatrixCanvas: React.FC<DpMatrixCanvasProps> = ({ dpMatrix }) => {
  if (!dpMatrix) return null;

  return (
    <div style={{
      width: '100%', height: '100%', minHeight: 380,
      background: '#FAFAFA', borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-hairline)',
      padding: 20, overflowX: 'auto',
    }}>
      <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#000', marginBottom: 16, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        DP State Table
      </h4>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', fontFamily: 'var(--font-code)' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px 12px', background: '#000', color: '#fff', border: '1px solid #333', textAlign: 'left', fontWeight: 700 }}>
              Items \ W
            </th>
            {dpMatrix.cols.map((col, i) => (
              <th key={i} style={{
                padding: '10px 12px',
                background: dpMatrix.activeCell && dpMatrix.activeCell[1] === i ? '#000' : '#1A1A1A',
                color: '#fff', border: '1px solid #333', textAlign: 'center', fontWeight: 700,
              }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dpMatrix.data.map((row, rIdx) => (
            <tr key={rIdx}>
              <td style={{
                padding: '10px 12px',
                background: dpMatrix.activeCell && dpMatrix.activeCell[0] === rIdx ? '#000' : '#F5F5F5',
                color: dpMatrix.activeCell && dpMatrix.activeCell[0] === rIdx ? '#fff' : '#000',
                border: '1px solid var(--border-hairline)', fontWeight: 700,
              }}>
                {dpMatrix.rows[rIdx]}
              </td>
              {row.map((val, cIdx) => {
                const isActive = dpMatrix.activeCell && dpMatrix.activeCell[0] === rIdx && dpMatrix.activeCell[1] === cIdx;
                return (
                  <td key={cIdx} style={{
                    padding: '10px 12px', textAlign: 'center',
                    background: isActive ? '#000' : rIdx % 2 === 0 ? '#fff' : '#FAFAFA',
                    color: isActive ? '#fff' : typeof val === 'number' && val > 0 ? '#000' : 'var(--text-muted)',
                    border: '1px solid var(--border-hairline)',
                    fontWeight: isActive ? 800 : 500,
                    transition: 'all 0.2s ease',
                  }}>
                    {val}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
