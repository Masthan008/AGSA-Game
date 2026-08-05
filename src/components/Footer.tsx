import React from 'react';
import { ArrowUpRight, Github, GraduationCap } from 'lucide-react';

const LINKS = [
  { key: 'library', label: 'Code Hub' }, { key: 'notes', label: 'Notes' },
  { key: 'flashcards', label: 'Flashcards' }, { key: 'sandbox', label: 'Sandbox' },
  { key: 'leaderboard', label: 'Leaderboard' }, { key: 'compare', label: 'Compare' },
  { key: 'review', label: 'Mistake Review' }, { key: 'about', label: 'About' },
];

export const Footer: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => (
  <footer className="site-footer">
    <div className="footer-inner">
      <div className="footer-brand"><div className="footer-mark"><GraduationCap size={24} /></div><div><strong>ADSA Quest</strong><p>Visualize. Practise. Master.</p></div></div>
      <div className="footer-links" aria-label="Quick links"><span>Quick links</span>{LINKS.map(link => <button key={link.key} onClick={() => onNavigate(link.key)}>{link.label}<ArrowUpRight size={12} /></button>)}</div>
      <div className="footer-meta"><span>Built for curious learners.</span><span><Github size={14} /> Interactive DSA education</span></div>
    </div>
    <div className="footer-bottom">© {new Date().getFullYear()} ADSA Quest. Learning progress, made visible.</div>
  </footer>
);
