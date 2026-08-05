import React from 'react';
import { BookOpen, BrainCircuit, CheckCircle2, Code2, GraduationCap, ShieldCheck, Sparkles, Users } from 'lucide-react';

const FEATURES = [
  { icon: BrainCircuit, title: '38-level curriculum', text: 'A guided path from foundational arrays and trees through graphs, dynamic programming, strings, and advanced structures.' },
  { icon: Sparkles, title: 'Step-by-step visual learning', text: 'Deterministic algorithm frames keep the canvas, explanation, variable state, and highlighted code aligned.' },
  { icon: Code2, title: 'Code and theory together', text: 'Compare implementations across languages, study worked examples, and move directly from concepts into practice.' },
  { icon: GraduationCap, title: 'Active recall', text: 'Quizzes, flashcards, mistake review, assignments, and spaced repetition turn browsing into a repeatable learning routine.' },
  { icon: Users, title: 'Classroom support', text: 'Teachers can organize classrooms, assign lessons, review progress, and export learner data within their authorized scope.' },
  { icon: ShieldCheck, title: 'Trusted progress', text: 'Authenticated profiles, server-owned rewards, offline-safe synchronization, and protected APIs are designed to keep progress reliable.' },
];

export const AboutPage: React.FC<{ onExplore: () => void }> = ({ onExplore }) => (
  <section className="about-page" aria-labelledby="about-title">
    <div className="about-hero">
      <span className="about-eyebrow"><BookOpen size={15} /> ABOUT THE LEARNING PLATFORM</span>
      <h2 id="about-title">Algorithms become easier when every step is visible.</h2>
      <p>ADSA Quest is an interactive data structures and algorithms learning website built for students who want to understand how an algorithm changes state—not only memorize its final code.</p>
      <div className="about-actions">
        <button className="btn btn-primary" onClick={onExplore}>Explore the curriculum</button>
        <span><CheckCircle2 size={16} /> 38 lessons · 373 questions · 8-language code hub</span>
      </div>
    </div>
    <div className="about-grid">
      {FEATURES.map(({ icon: Icon, title, text }) => (
        <article className="about-card" key={title}>
          <div className="about-icon"><Icon size={22} /></div><h3>{title}</h3><p>{text}</p>
        </article>
      ))}
    </div>
    <div className="about-story">
      <div><span className="about-eyebrow">HOW IT WORKS</span><h3>Learn, observe, practise, and review.</h3></div>
      <ol>
        <li><strong>Choose a lesson.</strong><span>Follow the campaign or open an assignment.</span></li>
        <li><strong>Watch the algorithm.</strong><span>Move through semantic steps at your own speed.</span></li>
        <li><strong>Connect theory to code.</strong><span>Inspect complexity, explanations, and implementation details.</span></li>
        <li><strong>Prove and retain it.</strong><span>Complete quizzes, revisit mistakes, and schedule flashcard reviews.</span></li>
      </ol>
    </div>
  </section>
);
