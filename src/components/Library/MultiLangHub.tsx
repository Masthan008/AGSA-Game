import React, { useState } from 'react';
import { CODE_TEMPLATES } from '../../data/codeTemplates';
import { MultiLangCodeViewer } from '../Visualizer/MultiLangCodeViewer';
import { Clock, HardDrive, Search } from 'lucide-react';

export const MultiLangHub: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('avl');
  const [filter, setFilter] = useState('');
  const snippet = CODE_TEMPLATES[selectedTopic] || CODE_TEMPLATES['avl'];

  const entries = Object.entries(CODE_TEMPLATES).filter(([key, tpl]) =>
    key.toLowerCase().includes(filter.toLowerCase()) ||
    tpl.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 className="section-title">Code Hub</h2>
        <p className="section-subtitle">
          {Object.keys(CODE_TEMPLATES).length} production-grade algorithm implementations in C++, Java, Python & JavaScript with Time/Space complexity.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 260px) 1fr', gap: 16 }}>
        {/* Sidebar */}
        <div className="panel" style={{ padding: 12 }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', padding: '8px 10px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Algorithms ({entries.length})
          </span>
          <div style={{ position: 'relative', padding: '0 10px 8px' }}>
            <Search size={13} style={{ position: 'absolute', left: 18, top: 9, color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              placeholder="Search algorithm..."
              style={{ width: '100%', padding: '6px 10px 6px 28px', fontSize: '0.8rem', border: '1.5px solid var(--border-hairline)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-main)' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 'calc(100vh - 260px)', overflowY: 'auto', paddingRight: 2 }}>
            {entries.map(([key, tpl]) => (
              <button key={key} style={{
                padding: '10px 14px', borderRadius: 'var(--radius-md)', textAlign: 'left', border: 'none',
                background: selectedTopic === key ? '#000' : 'transparent',
                color: selectedTopic === key ? '#fff' : 'var(--text-body)',
                fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                fontFamily: 'var(--font-main)', transition: 'all 0.15s ease',
              }} onClick={() => setSelectedTopic(key)}>
                {tpl.title}
              </button>
            ))}
            {entries.length === 0 && (
              <div style={{ padding: 16, fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center' }}>No algorithms match "{filter}"</div>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Complexity Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="card-black" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16 }}>
              <Clock size={22} color="var(--accent-gold)" />
              <div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Time</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>{snippet.timeComplexity}</div>
              </div>
            </div>
            <div className="card-black" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16 }}>
              <HardDrive size={22} color="var(--accent-gold)" />
              <div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Space</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>{snippet.spaceComplexity}</div>
              </div>
            </div>
          </div>

          <div className="card-grey" style={{ padding: 16 }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.55 }}>{snippet.explanationText}</p>
          </div>

          <div style={{ height: 440 }}>
            <MultiLangCodeViewer codeSnippet={snippet} />
          </div>
        </div>
      </div>
    </div>
  );
};
