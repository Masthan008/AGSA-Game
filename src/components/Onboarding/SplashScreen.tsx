import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFade(true);
    }, 1400);

    const timer2 = setTimeout(() => {
      onFinish();
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#000000',
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: fade ? 0 : 1,
      transition: 'opacity 0.4s ease-out',
      pointerEvents: fade ? 'none' : 'auto',
      fontFamily: 'var(--font-main)'
    }}>
      {/* Centered App Icon & Brand Title */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        transform: 'scale(1)',
        animation: 'fade-in-up 0.6s cubic-bezier(0.33, 1, 0.68, 1)'
      }}>
        <div style={{
          width: 84,
          height: 84,
          borderRadius: 24,
          background: '#FFFFFF',
          padding: 4,
          boxShadow: '0 12px 32px rgba(255, 255, 255, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <img
            src="/icon.png"
            alt="ADSA Quest Icon"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 20 }}
            onError={(e) => {
              // Fallback styling if image is loading
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#FFFFFF' }}>
            ADSA QUEST
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 500, letterSpacing: '0.04em', marginTop: 4, textTransform: 'uppercase' }}>
            Master Algorithms Visually
          </p>
        </div>
      </div>

      {/* Loading Indicator Pill */}
      <div style={{
        position: 'absolute',
        bottom: 60,
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
        <div style={{
          width: 140,
          height: 4,
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: 2,
          overflow: 'hidden'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: '#FFFFFF',
            borderRadius: 2,
            animation: 'splashProgress 1.4s cubic-bezier(0.33, 1, 0.68, 1) forwards'
          }} />
        </div>
      </div>

      <style>{`
        @keyframes splashProgress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
};
