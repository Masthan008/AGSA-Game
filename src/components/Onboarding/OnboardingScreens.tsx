import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Award, CheckCircle2, Code2, PlayCircle, Sparkles } from 'lucide-react';

interface OnboardingScreensProps { onComplete: () => void; }

const SLIDES = [
  { eyebrow: 'YOUR LEARNING PATH', title: 'Turn complex algorithms into clear, visible steps.', description: 'Follow 38 guided levels from core data structures to advanced graph, string, and dynamic-programming techniques.', icon: Sparkles, accent: '#635BFF', stats: ['38 guided levels', 'Progress that follows you', 'Clear prerequisites'] },
  { eyebrow: 'INTERACTIVE VISUALIZERS', title: 'See every comparison, update, and decision.', description: 'Play, pause, rewind, and inspect the exact state behind tree rotations, graph relaxations, DP tables, and string scans.', icon: PlayCircle, accent: '#007AFF', stats: ['Semantic step playback', 'Live variable watch', 'Code-line highlights'] },
  { eyebrow: 'PRACTISE WITH PURPOSE', title: 'Move from watching to solving.', description: 'Use quizzes, flashcards, assignments, the sandbox, and mistake review to build recall—not just familiarity.', icon: Award, accent: '#FF7A00', stats: ['373 focused questions', 'Spaced repetition', 'Mistake review'] },
  { eyebrow: 'CODE WITH CONTEXT', title: 'Connect the concept to real implementation.', description: 'Compare language-specific code with theory, complexity analysis, worked examples, and a visual trace of the same algorithm.', icon: Code2, accent: '#20A464', stats: ['8-language code hub', 'Complexity breakdowns', 'Teacher-ready workflows'] },
] as const;

export const OnboardingScreens: React.FC<OnboardingScreensProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = SLIDES[currentSlide];
  const Icon = slide.icon;
  const last = currentSlide === SLIDES.length - 1;

  const next = () => last ? onComplete() : setCurrentSlide(value => value + 1);
  const previous = () => setCurrentSlide(value => Math.max(0, value - 1));

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'Enter') next();
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'Escape') onComplete();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentSlide]);

  return (
    <div className="onboarding-shell" style={{ '--slide-accent': slide.accent } as React.CSSProperties}>
      <div className="onboarding-orb onboarding-orb-one" aria-hidden="true" />
      <div className="onboarding-orb onboarding-orb-two" aria-hidden="true" />
      <header className="onboarding-header">
        <button className="onboarding-logo" onClick={() => setCurrentSlide(0)} aria-label="Return to the first onboarding screen"><img src="/icon.png" alt="" /><span>ADSA Quest</span></button>
        <button className="onboarding-skip" onClick={onComplete}>Skip introduction</button>
      </header>

      <main className="onboarding-stage" key={currentSlide}>
        <div className="onboarding-copy">
          <span className="onboarding-eyebrow"><span>{String(currentSlide + 1).padStart(2, '0')}</span>{slide.eyebrow}</span>
          <h1>{slide.title}</h1>
          <p>{slide.description}</p>
          <div className="onboarding-points">
            {slide.stats.map((stat, index) => <span key={stat} style={{ '--delay': `${index * 90 + 240}ms` } as React.CSSProperties}><CheckCircle2 size={17} />{stat}</span>)}
          </div>
        </div>

        <div className="onboarding-visual" aria-hidden="true">
          <div className="onboarding-ring ring-one" /><div className="onboarding-ring ring-two" />
          <div className="onboarding-icon-card"><Icon size={82} strokeWidth={1.25} /></div>
          <span className="floating-chip chip-top">LEARN</span><span className="floating-chip chip-right">BUILD</span><span className="floating-chip chip-bottom">MASTER</span>
        </div>
      </main>

      <footer className="onboarding-controls">
        <div className="onboarding-progress" role="tablist" aria-label="Onboarding progress">
          {SLIDES.map((item, index) => <button key={item.eyebrow} role="tab" aria-selected={index === currentSlide} aria-label={`Show step ${index + 1}: ${item.eyebrow}`} onClick={() => setCurrentSlide(index)}><span style={{ transform: index <= currentSlide ? 'scaleX(1)' : 'scaleX(0)' }} /></button>)}
        </div>
        <div className="onboarding-actions">
          <button className="onboarding-back" onClick={previous} disabled={currentSlide === 0}><ArrowLeft size={18} /> Back</button>
          <button className="onboarding-next" onClick={next}>{last ? 'Start learning' : 'Continue'} <ArrowRight size={19} /></button>
        </div>
      </footer>
    </div>
  );
};
