import React, { useState } from 'react';
import { ProgrammingLanguage, CodeSnippet } from '../../types';
import { Copy, Check, Terminal, Code2 } from 'lucide-react';

interface MultiLangCodeViewerProps {
  codeSnippet: CodeSnippet;
  activeLineNumbers?: number[] | Partial<Record<ProgrammingLanguage, number[]>>;
  variablesState?: Record<string, any>;
}

const LANGUAGES: { key: ProgrammingLanguage; label: string }[] = [
  { key: 'cpp', label: 'C++' },
  { key: 'java', label: 'Java' },
  { key: 'python', label: 'Python' },
  { key: 'javascript', label: 'JS' },
  { key: 'csharp', label: 'C#' },
  { key: 'go', label: 'Go' },
  { key: 'rust', label: 'Rust' },
  { key: 'c', label: 'C' },
];

export const MultiLangCodeViewer: React.FC<MultiLangCodeViewerProps> = ({
  codeSnippet,
  activeLineNumbers = [],
  variablesState,
}) => {
  const availableLanguages = LANGUAGES.filter(lang => typeof codeSnippet[lang.key] === 'string');
  const [selectedLang, setSelectedLang] = useState<ProgrammingLanguage>('cpp');

  const safeLang = codeSnippet[selectedLang] ? selectedLang : availableLanguages[0]?.key || 'cpp';
  const showInspector = variablesState && Object.keys(variablesState).length > 0;

  const [copied, setCopied] = useState(false);
  const rawCode = codeSnippet[safeLang] || '// Code snippet unavailable';
  const lines = rawCode.split('\n');

  const activeSet = Array.isArray(activeLineNumbers)
    ? new Set(activeLineNumbers)
    : new Set(activeLineNumbers?.[safeLang] || []);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card-black" style={{
      width: '100%', height: '100%', borderRadius: 'var(--radius-lg)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden'
    }}>
      {/* Top 8-Language Selector Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 14px', background: 'rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', gap: 4, overflowX: 'auto' }}>
          {availableLanguages.map(lang => (
            <button
              key={lang.key}
              onClick={() => setSelectedLang(lang.key)}
              style={{
                background: safeLang === lang.key ? '#FFFFFF' : 'transparent',
                color: safeLang === lang.key ? '#000000' : 'rgba(255,255,255,0.7)',
                border: 'none', borderRadius: '100px',
                padding: '4px 10px', fontSize: '0.74rem', fontWeight: 800,
                cursor: 'pointer', fontFamily: 'var(--font-code)'
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          style={{
            background: 'transparent', color: '#FFFFFF', border: 'none',
            fontSize: '0.74rem', fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4
          }}
        >
          {copied ? <Check size={14} color="var(--accent-green)" /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Code Text Window */}
      <div style={{ flex: 1, padding: '14px 16px', overflowY: 'auto', fontFamily: 'var(--font-code)', fontSize: '0.82rem', lineHeight: 1.6 }}>
        {lines.map((line: string, idx: number) => {
          const lineNum = idx + 1;
          const isActive = activeSet.has(lineNum);
          return (
            <div
              key={idx}
              style={{
                display: 'flex', gap: 14,
                background: isActive ? 'rgba(255, 59, 48, 0.25)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--accent-red)' : '3px solid transparent',
                padding: '1px 8px', borderRadius: 4
              }}
            >
              <span style={{ width: 22, color: 'rgba(255,255,255,0.3)', userSelect: 'none', textAlign: 'right' }}>{lineNum}</span>
              <span style={{ color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.85)', whiteSpace: 'pre-wrap' }}>{line}</span>
            </div>
          );
        })}
      </div>

      {/* Live Variable State Inspector Panel */}
      {showInspector && (
        <div style={{
          padding: '10px 14px', background: 'rgba(0,0,0,0.6)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
            <Terminal size={14} /> State Inspector:
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {Object.entries(variablesState || {}).map(([k, v]) => (
              <span key={k} style={{ fontSize: '0.75rem', fontFamily: 'var(--font-code)', background: 'rgba(255,255,255,0.12)', padding: '2px 8px', borderRadius: 4, color: '#FFFFFF' }}>
                <span style={{ color: 'var(--accent-gold)' }}>{k}</span>: <strong>{String(v)}</strong>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
