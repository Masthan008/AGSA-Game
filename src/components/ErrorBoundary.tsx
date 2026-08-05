import React from 'react';

interface State { error: Error | null }

export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { error: null };
  static getDerivedStateFromError(error: Error): State { return { error }; }
  componentDidCatch(error: Error, info: React.ErrorInfo) { console.error('ADSA Quest render failure', error, info); }
  render() {
    if (!this.state.error) return this.props.children;
    return <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <div className="card-light" role="alert" style={{ maxWidth: 520, padding: 28, textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.4rem' }}>This learning space needs a refresh</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Your saved progress is safe. Reload the app to restore this screen.</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Reload ADSA Quest</button>
      </div>
    </main>;
  }
}
