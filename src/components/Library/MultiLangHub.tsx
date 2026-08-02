import React, { useState, useMemo } from 'react';
import { CODE_TEMPLATES } from '../../data/codeTemplates';
import { MultiLangCodeViewer } from '../Visualizer/MultiLangCodeViewer';
import { Clock, HardDrive, Search, GitBranch, Network, Layers, Type, Zap, ChevronRight, BookOpen } from 'lucide-react';

type CategoryKey = 'trees' | 'graphs' | 'dp' | 'strings' | 'advanced';

const CATEGORIES: { key: CategoryKey | 'all'; label: string; color: string; icon: React.ElementType }[] = [
  { key: 'all', label: 'All Algorithms', color: '#000000', icon: BookOpen },
  { key: 'trees', label: 'Trees', color: '#FF3B30', icon: GitBranch },
  { key: 'graphs', label: 'Graphs', color: '#007AFF', icon: Network },
  { key: 'dp', label: 'Dynamic Programming', color: '#34C759', icon: Layers },
  { key: 'strings', label: 'Strings', color: '#FFB800', icon: Type },
  { key: 'advanced', label: 'Advanced', color: '#9B51E0', icon: Zap },
];

const KEY_CATEGORY: Record<string, CategoryKey> = {
  bst: 'trees', avl: 'trees', redblack: 'trees', heap: 'trees', btree: 'trees', segment: 'trees',
  treap: 'trees', splay: 'trees', fenwick: 'trees', rbtdelete: 'trees',
  bfsdfs: 'graphs', dijkstra: 'graphs', bellmanford: 'graphs', mst: 'graphs', tarjan: 'graphs',
  floydwarshall: 'graphs', dsu: 'graphs', astar: 'graphs', hld: 'graphs', maxflow: 'graphs',
  knapsack: 'dp', lcs: 'dp', matrixchain: 'dp', bitmaskdp: 'dp',
  trie: 'strings', kmp: 'strings', suffixarray: 'strings', rabinkarp: 'strings', boyermoore: 'strings', suffixautomaton: 'strings',
  fibonacci: 'advanced', convexhull: 'advanced', grandmaster: 'advanced',
};

const categoryOf = (key: string): CategoryKey => KEY_CATEGORY[key] || 'advanced';
const categoryMeta = (key: string) => CATEGORIES.find(c => c.key === categoryOf(key)) || CATEGORIES[4];
const totalAlgorithms = Object.keys(CODE_TEMPLATES).length;

export const MultiLangHub: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('avl');
  const [filter, setFilter] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryKey | 'all'>('all');
  const snippet = CODE_TEMPLATES[selectedTopic] || CODE_TEMPLATES['avl'];

  const filtered = useMemo(() => {
    return Object.entries(CODE_TEMPLATES).filter(([key, tpl]) => {
      const matchesText =
        key.toLowerCase().includes(filter.toLowerCase()) ||
        tpl.title.toLowerCase().includes(filter.toLowerCase());
      const matchesCat = activeCategory === 'all' || categoryOf(key) === activeCategory;
      return matchesText && matchesCat;
    });
  }, [filter, activeCategory]);

  const grouped = useMemo(() => {
    const groups: { cat: CategoryKey; items: [string, typeof CODE_TEMPLATES[string]][] }[] = [];
    (CATEGORIES.slice(1) as { key: CategoryKey }[]).forEach(c => {
      const items = filtered.filter(([key]) => categoryOf(key) === c.key);
      if (items.length > 0) groups.push({ cat: c.key, items });
    });
    return groups;
  }, [filtered]);

  const selectedMeta = categoryMeta(selectedTopic);

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 16px' }}>
      {/* Hero */}
      <div className="panel" style={{ position: 'relative', overflow: 'hidden', padding: '28px 28px', marginBottom: 20 }}>
        <div className="cmp-hero-orb" style={{ position: 'absolute', top: -60, right: 40, width: 220, height: 220, background: 'radial-gradient(circle, #9B51E0, transparent 70%)', animationDelay: '1s' }} />
        <div className="cmp-hero-orb" style={{ position: 'absolute', bottom: -80, left: 120, width: 180, height: 180, background: 'radial-gradient(circle, #FFB800, transparent 70%)', animationDelay: '2s' }} />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <h2 className="section-title" style={{ marginBottom: 8 }}>
              Multi-Language <span style={{ background: 'linear-gradient(90deg, #007AFF, #9B51E0, #FF9500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Code Hub</span>
            </h2>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>
              {totalAlgorithms} production-grade implementations in C++, Java, Python, JavaScript, C#, Go, Rust & C — with verified complexity analysis.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div className="card-black cmp-pop-up" style={{ padding: '12px 18px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{totalAlgorithms}</div>
              <div style={{ fontSize: '0.66rem', color: 'rgba(255,255,255,0.55)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Algorithms</div>
            </div>
            <div className="card-black cmp-pop-up" style={{ padding: '12px 18px', textAlign: 'center', animationDelay: '0.08s' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>8</div>
              <div style={{ fontSize: '0.66rem', color: 'rgba(255,255,255,0.55)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Languages</div>
            </div>
            <div className="card-black cmp-pop-up" style={{ padding: '12px 18px', textAlign: 'center', animationDelay: '0.16s' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-green)', lineHeight: 1 }}>5</div>
              <div style={{ fontSize: '0.66rem', color: 'rgba(255,255,255,0.55)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Categories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Chips */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => {
          const Icon = cat.icon;
          const active = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: '100px',
                background: active ? '#000000' : 'transparent',
                border: `1.5px solid ${active ? '#000' : 'var(--border-hairline)'}`,
                color: active ? '#fff' : 'var(--text-body)',
                fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer',
                fontFamily: 'var(--font-main)', transition: 'all 0.15s ease'
              }}
            >
              <Icon size={14} color={active ? cat.color : cat.color} />
              {cat.label}
              <span style={{
                background: active ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.06)',
                borderRadius: 100, padding: '1px 7px', fontSize: '0.68rem', fontWeight: 800
              }}>
                {cat.key === 'all' ? totalAlgorithms : Object.keys(CODE_TEMPLATES).filter(k => categoryOf(k) === cat.key).length}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 300px) 1fr', gap: 16 }}>
        {/* Sidebar */}
        <div className="panel" style={{ padding: 12 }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', padding: '8px 10px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Algorithms ({filtered.length})
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 'calc(100vh - 240px)', overflowY: 'auto', paddingRight: 2 }}>
            {grouped.map(group => {
              const meta = CATEGORIES.find(c => c.key === group.cat)!;
              return (
                <div key={group.cat}>
                  <div style={{
                    fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em',
                    color: meta.color, padding: '8px 12px 4px', display: 'flex', alignItems: 'center', gap: 5
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: 6, background: meta.color, display: 'inline-block' }} />
                    {meta.label}
                    <span style={{ color: 'var(--text-muted)', marginLeft: 'auto' }}>{group.items.length}</span>
                  </div>
                  {group.items.map(([key, tpl]) => {
                    const active = selectedTopic === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedTopic(key)}
                        style={{
                          width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', textAlign: 'left', border: 'none',
                          background: active ? '#000' : 'transparent',
                          color: active ? '#fff' : 'var(--text-body)',
                          fontWeight: 600, fontSize: '0.84rem', cursor: 'pointer',
                          fontFamily: 'var(--font-main)', transition: 'all 0.15s ease',
                          display: 'flex', alignItems: 'center', gap: 8,
                          borderLeft: active ? `3px solid ${meta.color}` : '3px solid transparent',
                        }}
                      >
                        <span style={{ flex: 1 }}>{tpl.title}</span>
                        <span style={{
                          fontSize: '0.62rem', fontWeight: 800, fontFamily: 'var(--font-code)',
                          color: active ? 'rgba(255,255,255,0.55)' : 'var(--text-muted)', whiteSpace: 'nowrap'
                        }}>
                          {tpl.timeComplexity.split('•')[0].trim()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div style={{ padding: 16, fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                No algorithms match "{filter}"
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div key={selectedTopic} className="cmp-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7, padding: '6px 12px', borderRadius: 100,
              background: `${selectedMeta.color}18`, border: `1px solid ${selectedMeta.color}40`, fontSize: '0.72rem', fontWeight: 800, color: selectedMeta.color
            }}>
              <selectedMeta.icon size={13} /> {selectedMeta.label}
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: 0 }}>{snippet.title}</h3>
            <ChevronRight size={16} color="var(--text-muted)" />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>{selectedTopic}</span>
          </div>

          {/* Complexity Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="card-black" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16 }}>
              <Clock size={22} color="var(--accent-gold)" />
              <div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Time Complexity</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>{snippet.timeComplexity}</div>
              </div>
            </div>
            <div className="card-black" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16 }}>
              <HardDrive size={22} color="var(--accent-gold)" />
              <div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Space Complexity</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>{snippet.spaceComplexity}</div>
              </div>
            </div>
          </div>

          <div className="card-grey" style={{ padding: 16, borderLeft: `3px solid ${selectedMeta.color}` }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.55, margin: 0 }}>{snippet.explanationText}</p>
          </div>

          <div style={{ height: 520 }}>
            <MultiLangCodeViewer codeSnippet={snippet} />
          </div>
        </div>
      </div>
    </div>
  );
};
