import React, { useState } from 'react';
import { Plus, Minus, Search, Shuffle, RefreshCw, Layers } from 'lucide-react';

interface NodeControlPanelProps {
  onInsertNode: (val: number) => void;
  onDeleteNode: (val: number) => void;
  onSearchNode: (val: number) => void;
  onRandomizeTree: () => void;
  onResetTree: () => void;
  onSampleTree: () => void;
}

export const NodeControlPanel: React.FC<NodeControlPanelProps> = ({
  onInsertNode, onDeleteNode, onSearchNode, onRandomizeTree, onResetTree, onSampleTree
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(inputValue.trim());
    if (!isNaN(val)) {
      onInsertNode(val);
      setInputValue('');
    }
  };

  const handleDelete = () => {
    const val = parseInt(inputValue.trim());
    if (!isNaN(val)) {
      onDeleteNode(val);
      setInputValue('');
    }
  };

  const handleSearch = () => {
    const val = parseInt(inputValue.trim());
    if (!isNaN(val)) {
      onSearchNode(val);
    }
  };

  return (
    <div className="card-light" style={{ padding: '12px 18px', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
      {/* Node Input & Direct Actions */}
      <form onSubmit={handleInsert} style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 280 }}>
        <input
          type="number"
          placeholder="Enter number (e.g. 27)..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          style={{ width: 170, padding: '8px 12px', fontSize: '0.85rem' }}
        />
        <button type="submit" className="btn btn-primary btn-sm" style={{ gap: 4 }}>
          <Plus size={14} /> Insert
        </button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={handleDelete} style={{ gap: 4, color: 'var(--accent-red)' }}>
          <Minus size={14} /> Delete
        </button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={handleSearch} style={{ gap: 4 }}>
          <Search size={14} /> Search
        </button>
      </form>

      {/* Quick Tree Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <button className="btn btn-secondary btn-sm" onClick={onSampleTree} title="Load this level's default sample values step by step">
          <Layers size={14} /> Load Sample
        </button>
        <button className="btn btn-secondary btn-sm" onClick={onRandomizeTree} title="Generate Random Tree">
          <Shuffle size={14} /> Random Tree
        </button>
        <button className="btn btn-secondary btn-sm" onClick={onResetTree} title="Reset Tree">
          <RefreshCw size={14} /> Reset
        </button>
      </div>
    </div>
  );
};
