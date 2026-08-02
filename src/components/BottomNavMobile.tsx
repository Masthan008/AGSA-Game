import React from 'react';
import { Map, PlayCircle, Swords, Code2, LayoutDashboard, FileText, User } from 'lucide-react';

interface BottomNavMobileProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const TABS = [
  { key: 'campaign', label: 'Campaign', Icon: Map },
  { key: 'visualizer', label: 'Visualizer', Icon: PlayCircle },
  { key: 'arena', label: 'Arena', Icon: Swords },
  { key: 'library', label: 'Code', Icon: Code2 },
  { key: 'notes', label: 'Notes', Icon: FileText },
  { key: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { key: 'profile', label: 'Profile', Icon: User },
];

export const BottomNavMobile: React.FC<BottomNavMobileProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="mobile-only" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: 'var(--bottom-nav-height)',
      zIndex: 1000,
      background: '#FFFFFF',
      borderTop: '1px solid var(--border-hairline)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0 2px',
    }}>
      {TABS.map(({ key, label, Icon }) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              fontSize: '0.6rem',
              fontWeight: isActive ? 700 : 500,
              color: isActive ? '#000000' : 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px 0',
              fontFamily: 'var(--font-main)',
              letterSpacing: '0.02em',
            }}
            onClick={() => setActiveTab(key)}
          >
            <Icon
              size={19}
              strokeWidth={isActive ? 2.5 : 1.5}
              color={isActive ? '#000000' : '#999999'}
            />
            {label}
          </button>
        );
      })}
    </nav>
  );
};
