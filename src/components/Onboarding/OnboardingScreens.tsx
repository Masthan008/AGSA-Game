import React, { useState } from 'react';
import { PlayCircle, Code2, ArrowRight, CheckCircle2, ChevronRight, Award } from 'lucide-react';

interface OnboardingScreensProps {
  onComplete: () => void;
}

const SLIDES = [
  {
    id: 'slide-1',
    badge: 'PROGRESSIVE CAMPAIGN',
    title: 'Master 20 ADSA Levels',
    subtitle: 'From AVL Trees and Red-Black Trees to Dijkstra Shortest Path and 0/1 Knapsack DP.',
    description: 'Unlock levels sequentially, earn up to 3 stars per topic, collect XP points, and track your daily learning streak.',
    icon: Award,
    color: '#000000',
    highlightStats: ['20 Levels', '3-Star System', 'Streak Tracker']
  },
  {
    id: 'slide-2',
    badge: 'ANIMATED VISUALIZER',
    title: 'Pin-to-Pin Clear Explanations',
    subtitle: 'Watch tree rotations, graph edge relaxations, and DP table populating step-by-step.',
    description: 'Control speed, step backward or forward, and read pin-to-pin mathematical formulas for every single step.',
    icon: PlayCircle,
    color: '#000000',
    highlightStats: ['Step Forward/Back', 'Live Formula Trace', 'Variable Watch']
  },
  {
    id: 'slide-3',
    badge: 'MULTI-LANGUAGE & ARENA',
    title: 'Code Tracing & Quizzes',
    subtitle: 'Study clean code snippets in C++, Java, Python, and JavaScript.',
    description: 'Test your understanding with conceptual quizzes, interactive tree rotation puzzles, side-by-side algorithm comparison, and custom practice playground.',
    icon: Code2,
    color: '#000000',
    highlightStats: ['4 Languages', 'Algorithm Compare', 'Custom Playground']
  }
];

export const OnboardingScreens: React.FC<OnboardingScreensProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = SLIDES[currentSlide];
  const IconComponent = slide.icon;

  const handleNext = () => {
    if (currentSlide + 1 < SLIDES.length) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9990,
      background: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px 20px 36px',
      maxWidth: 600,
      margin: '0 auto',
      fontFamily: 'var(--font-main)'
    }}>
      {/* Top Bar: Logo & Skip Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '0.9rem'
          }}>
            A
          </div>
          <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', color: '#000000' }}>
            ADSA Quest
          </span>
        </div>

        <button
          onClick={onComplete}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
            padding: '6px 12px'
          }}
        >
          Skip
        </button>
      </div>

      {/* Main Slide Card */}
      <div className="fade-in" key={slide.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: '20px 0' }}>
        {/* Large Visual Circle */}
        <div className="card-black" style={{
          width: 110,
          height: 110,
          borderRadius: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 28,
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)'
        }}>
          <IconComponent size={52} color="#FFFFFF" strokeWidth={1.5} />
        </div>

        {/* Badge */}
        <span style={{
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: 'var(--radius-pill)',
          background: 'var(--bg-grey)',
          color: 'var(--text-black)',
          fontSize: '0.7rem',
          fontWeight: 800,
          letterSpacing: '0.06em',
          marginBottom: 12
        }}>
          {slide.badge}
        </span>

        {/* Title & Subtitle */}
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.2, color: '#000000', marginBottom: 8 }}>
          {slide.title}
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.45, maxWidth: 460, marginBottom: 16 }}>
          {slide.subtitle}
        </p>

        {/* Detailed Paragraph */}
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, maxWidth: 460, marginBottom: 24 }}>
          {slide.description}
        </p>

        {/* Highlights Chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {slide.highlightStats.map((stat, idx) => (
            <span key={idx} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '6px 12px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--bg-light)',
              border: '1px solid var(--border-hairline)',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#000000'
            }}>
              <CheckCircle2 size={13} color="var(--accent-green)" /> {stat}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Controls: Indicators & Next Button */}
      <div>
        {/* Indicator Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
          {SLIDES.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: currentSlide === idx ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: currentSlide === idx ? '#000000' : 'var(--border-hairline)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.33, 1, 0.68, 1)'
              }}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          className="btn btn-primary"
          style={{ width: '100%', padding: '16px', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          onClick={handleNext}
        >
          {currentSlide + 1 < SLIDES.length ? (
            <>
              Next <ChevronRight size={18} />
            </>
          ) : (
            <>
              Get Started <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
