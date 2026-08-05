import React from 'react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { Zap, Star, User, Compass, PlayCircle, Swords, Code2, LayoutDashboard, ArrowLeftRight, FileText, Layers, Terminal, Trophy, ClipboardList, RefreshCcw } from 'lucide-react';
import { UserProgress } from '../types';

interface HeaderProps {
  userProgress: UserProgress;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  onOpenAuthModal?: () => void;
}

const NAV_ITEMS = [
  { key: 'campaign', label: 'Campaign', icon: Compass },
  { key: 'assignments', label: 'Tasks', icon: ClipboardList },
  { key: 'review', label: 'Review', icon: RefreshCcw },
  { key: 'visualizer', label: 'Visualizer', icon: PlayCircle },
  { key: 'arena', label: 'Arena', icon: Swords },
  { key: 'library', label: 'Code Hub', icon: Code2 },
  { key: 'notes', label: 'Notes', icon: FileText },
  { key: 'sandbox', label: 'Sandbox', icon: Terminal },
  { key: 'flashcards', label: 'Cards', icon: Layers },
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'leaderboard', label: 'Ranks', icon: Trophy },
  { key: 'compare', label: 'Compare', icon: ArrowLeftRight },
];

export const Header: React.FC<HeaderProps> = ({ userProgress, activeTab, setActiveTab, onOpenAuthModal }) => {
  const totalStars = Object.values(userProgress.starsPerLevel).reduce((a, b) => a + b, 0);
  const { user } = useUser();

  return (
    <header style={{
      position: 'sticky',
      top: 12,
      zIndex: 100,
      maxWidth: 'var(--max-width)',
      margin: '0 auto 12px',
      padding: '0 16px',
      width: '100%'
    }}>
      <div style={{
        background: '#FFFFFF',
        border: '1.5px solid var(--border-hairline)',
        borderRadius: '100px',
        padding: '6px 16px',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60
      }}>
        {/* Compact home logo. The product name lives in the site footer. */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          onClick={() => setActiveTab('campaign')}
        >
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#000000',
            padding: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <img
              src="/icon.png"
              alt="ADSA Quest Logo"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
          </div>
          <span className="sr-only">Go to campaign</span>
        </div>

        {/* Desktop CRED Floating Pill Items */}
        <nav className="desktop-only" aria-label="Primary learning navigation" style={{ display: 'flex', gap: 2, background: 'var(--bg-light)', padding: 4, borderRadius: '100px', maxWidth: '62vw', overflowX: 'auto' }}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                style={{
                  background: isActive ? '#000000' : 'transparent',
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '100px',
                  padding: '6px 12px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-main)',
                  transition: 'all 0.2s cubic-bezier(0.33, 1, 0.68, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5
                }}
              >
                <Icon size={14} color={isActive ? '#FFFFFF' : 'var(--text-secondary)'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Stats Pills & Clerk User Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: '#000000', color: '#FFFFFF',
            padding: '4px 10px', borderRadius: '100px',
            fontSize: '0.78rem', fontWeight: 700,
          }}>
            <Zap size={13} color="var(--accent-gold)" /> {userProgress.xp}
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: 'var(--bg-light)', color: '#000000',
            padding: '4px 10px', borderRadius: '100px',
            fontSize: '0.78rem', fontWeight: 700,
          }}>
            <Star size={13} color="var(--accent-gold)" fill="var(--accent-gold)" /> {totalStars}
          </div>

          {/* Real Clerk User Button / Sign In */}
          <SignedIn>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 4 }}>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          <SignedOut>
            <button
              onClick={onOpenAuthModal}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                background: activeTab === 'profile' ? '#000000' : 'var(--bg-light)',
                border: '1px solid var(--border-hairline)',
                borderRadius: '100px',
                padding: '4px 12px',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: activeTab === 'profile' ? '#FFFFFF' : '#000000',
                cursor: 'pointer',
                fontFamily: 'var(--font-main)',
                transition: 'all 0.15s ease'
              }}
              title="Sign In with Clerk"
            >
              <User size={13} color={activeTab === 'profile' ? '#FFFFFF' : '#000000'} />
              <span>Sign In</span>
            </button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};
