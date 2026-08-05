import React, { useState } from 'react';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { X, Shield, User as UserIcon, GraduationCap } from 'lucide-react';
import { AccountRole } from '../../services/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginAsGuest: (name: string) => void;
  role: AccountRole;
  onRoleChange: (role: AccountRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginAsGuest, role, onRoleChange }) => {
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

        {/* Account Type — the sign-up/login flow asks who you are */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginBottom: 7, textAlign: 'center' }}>
            I am signing in as a…
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <button
              onClick={() => onRoleChange('student')}
              style={{
                padding: '10px 12px', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontFamily: 'var(--font-main)',
                border: role === 'student' ? '2px solid #000' : '1.5px solid var(--border-hairline)',
                background: role === 'student' ? '#000' : '#fff',
                color: role === 'student' ? '#fff' : 'var(--text-body)',
                display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center',
                fontSize: '0.8rem', fontWeight: 700, transition: 'all 0.12s ease',
              }}
            >
              <UserIcon size={15} /> Student
            </button>
            <button
              onClick={() => onRoleChange('admin')}
              style={{
                padding: '10px 12px', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontFamily: 'var(--font-main)',
                border: role === 'admin' ? '2px solid #FF3B30' : '1.5px solid var(--border-hairline)',
                background: role === 'admin' ? '#FF3B30' : '#fff',
                color: role === 'admin' ? '#fff' : 'var(--text-body)',
                display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center',
                fontSize: '0.8rem', fontWeight: 700, transition: 'all 0.12s ease',
              }}
            >
              <GraduationCap size={15} /> Teacher / Admin
            </button>
          </div>
          {role === 'admin' && (
            <p style={{ fontSize: '0.72rem', color: '#FF3B30', textAlign: 'center', marginTop: 7, fontWeight: 600 }}>
              Admin access is granted to allow-listed e-mails (see your teacher). The dashboard lives at /#/admin.
            </p>
          )}
        </div>

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
