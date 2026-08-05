import React, { useState } from 'react';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { X, Shield, User as UserIcon } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginAsGuest: (name: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginAsGuest }) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'guest'>('signin');
  const [guestName, setGuestName] = useState('');
  const { isSignedIn, user } = useUser();

  if (!isOpen) return null;

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestName.trim()) {
      onLoginAsGuest(guestName.trim());
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9995,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      fontFamily: 'var(--font-main)',
      overflowY: 'auto'
    }}>
      <div className="card-light fade-in" style={{
        maxWidth: 480,
        width: '100%',
        padding: 24,
        position: 'relative',
        boxShadow: 'var(--shadow-lg)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: '#000000',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 10px'
          }}>
            <Shield size={22} />
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#000000' }}>
            ADSA Quest Authentication
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 2 }}>
            Real-time Clerk Auth for Web & Android
          </p>
        </div>

        <p style={{ padding: '9px 12px', borderRadius: 9, background: 'var(--bg-light)', color: 'var(--text-secondary)', fontSize: '.74rem', lineHeight: 1.5, marginBottom: 18, textAlign: 'center' }}>
          Every new account starts as a learner. Teacher access is provisioned securely by the institution—never selected in the browser.
        </p>

        {/* Mode Selector Tabs */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-light)',
          padding: 4,
          borderRadius: 'var(--radius-pill)',
          marginBottom: 20
        }}>
          <button
            style={{
              flex: 1,
              padding: '7px',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              background: mode === 'signin' ? '#000000' : 'transparent',
              color: mode === 'signin' ? '#FFFFFF' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.78rem',
              cursor: 'pointer'
            }}
            onClick={() => setMode('signin')}
          >
            Clerk Sign In
          </button>

          <button
            style={{
              flex: 1,
              padding: '7px',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              background: mode === 'signup' ? '#000000' : 'transparent',
              color: mode === 'signup' ? '#FFFFFF' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.78rem',
              cursor: 'pointer'
            }}
            onClick={() => setMode('signup')}
          >
            Clerk Sign Up
          </button>

          <button
            style={{
              flex: 1,
              padding: '7px',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              background: mode === 'guest' ? '#000000' : 'transparent',
              color: mode === 'guest' ? '#FFFFFF' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.78rem',
              cursor: 'pointer'
            }}
            onClick={() => setMode('guest')}
          >
            Guest
          </button>
        </div>

        {/* Real Clerk Auth Components */}
        {mode === 'signin' && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SignIn routing="virtual" appearance={{
              elements: {
                card: { boxShadow: 'none', background: 'transparent' },
                formButtonPrimary: { backgroundColor: '#000000', borderRadius: '100px' }
              }
            }} />
          </div>
        )}

        {mode === 'signup' && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SignUp routing="virtual" appearance={{
              elements: {
                card: { boxShadow: 'none', background: 'transparent' },
                formButtonPrimary: { backgroundColor: '#000000', borderRadius: '100px' }
              }
            }} />
          </div>
        )}

        {/* Guest Mode Option */}
        {mode === 'guest' && (
          <form onSubmit={handleGuestSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
              Test locally without creating a Clerk account.
            </p>
            <input
              type="text"
              placeholder="Enter your student name..."
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              style={{ width: '100%' }}
              required
            />
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <UserIcon size={16} /> Continue as Guest
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
