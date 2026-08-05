import React, { useState, useEffect } from 'react';
import { useUser, SignIn, UserButton } from '@clerk/clerk-react';
import { Users, CheckCircle2, Circle, BookOpen, Zap, GraduationCap, Swords, ShieldCheck, ShieldAlert, ChevronDown, ChevronUp, Search, Trash2, ListChecks, BarChart3 } from 'lucide-react';
import { fetchAdminStudents, assignTasks, removeTask } from '../../services/api';
import { LEVEL_TOPICS } from '../../data/levelsData';

// ============================================================================
// ADMIN DASHBOARD — reachable ONLY via the direct URL: /#/admin
// (no navigation link exists). Gated by a Clerk signed-in e-mail that must be
// in the backend ADMIN_EMAILS allow-list. Shows every student's practice
// activity, quiz completions, level progress and assigned-task status.
// ============================================================================

interface StudentTask {
  id: string;
  levelId: string;
  assignedAt: string;
  completedAt: string | null;
}

interface StudentRow {
  id: string;
  username: string;
  email: string | null;
  role: string;
  xp: number;
  levelUnlocked: number;
  streakDays: number;
  createdAt: string;
  levels: { total: number; completed: number; stars: number; progress: { levelId: string; stars: number; completedAt: string }[] };
  quizzes: { completed: number; items: { puzzleId: string; completedAt: string }[] };
  practice: { sessions: number; items: { puzzleId: string; completedAt: string }[]; flashcards: number };
  tasks: { given: number; completed: number; pending: number; items: StudentTask[] };
  notes: number;
  bookmarks: number;
}

interface AdminData {
  devMode: boolean;
  totalLevels: number;
  totals: {
    students: number;
    tasksGiven: number;
    tasksCompleted: number;
    tasksPending: number;
    quizCompletions: number;
    practiceSessions: number;
    levelsCompleted: number;
  };
  students: StudentRow[];
}

const levelTitle = (levelId: string) => {
  const l = LEVEL_TOPICS.find(x => x.id === levelId);
  return l ? `L${l.levelNumber} · ${l.title}` : levelId;
};

const formatDate = (iso: string | null) => {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return '—';
  }
};

export const AdminPage: React.FC = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [data, setData] = useState<AdminData | null>(null);
  const [status, setStatus] = useState<'loading' | 'ok' | 'denied' | 'error'>('loading');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [assignStudent, setAssignStudent] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [assignMsg, setAssignMsg] = useState('');

  const adminEmail = user?.primaryEmailAddress?.emailAddress || '';

  const load = async () => {
    if (!adminEmail) return;
    setStatus('loading');
    const res = await fetchAdminStudents(adminEmail);
    if (!res || res.error) {
      setStatus('denied');
      return;
    }
    setData(res);
    setStatus('ok');
    if (!res.devMode && assignStudent === '') setAssignStudent(res.students[0]?.id || '');
  };

  useEffect(() => { if (isSignedIn) load(); }, [isSignedIn, adminEmail]);

  // Live data — poll the database every 30s so new students, tasks and
  // completions appear on the dashboard without a manual page reload.
  useEffect(() => {
    if (!isSignedIn) return;
    const timer = setInterval(() => { load(); }, 30000);
    return () => clearInterval(timer);
  }, [isSignedIn, adminEmail]);

  if (!isLoaded) {
    return <div className="cmp-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid var(--bg-grey)', borderTopColor: '#000', animation: 'spin 0.8s linear infinite' }} />
    </div>;
  }

  if (!isSignedIn) {
    return (
      <div className="cmp-fade-in" style={{ maxWidth: 460, margin: '60px auto', padding: 24 }}>
        <div className="card-black" style={{ padding: 28, textAlign: 'center' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', margin: '0 auto 14px',
            background: 'linear-gradient(135deg, #FF3B30, #FF9500)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 24px rgba(255,80,50,0.4)',
          }}>
            <ShieldAlert size={32} color="#fff" />
          </div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff', marginBottom: 6 }}>Admin Access Required</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: 18 }}>
            This dashboard is restricted to the admin e-mail address.
            Sign in with your Clerk account below — only allow-listed e-mails can enter.
          </p>
          <SignIn routing="virtual" />
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', marginTop: 16 }}>
            Protected URL: <strong style={{ fontFamily: 'var(--font-code)' }}>/#/admin</strong> — not linked anywhere in the app.
          </p>
        </div>
      </div>
    );
  }

  if (status === 'denied') {
    return (
      <div className="cmp-fade-in" style={{ maxWidth: 460, margin: '60px auto', padding: 24 }}>
        <div className="card-black" style={{ padding: 28, textAlign: 'center' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', margin: '0 auto 14px',
            background: 'linear-gradient(135deg, #FF3B30, #FF6B4A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ShieldAlert size={32} color="#fff" />
          </div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff', marginBottom: 6 }}>Access Denied</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: 16 }}>
            Signed in as <strong style={{ color: '#fff' }}>{adminEmail}</strong> — this e-mail is not in the admin
            allow-list. Ask the administrator to add it to <strong style={{ fontFamily: 'var(--font-code)' }}>ADMIN_EMAILS</strong> in the backend environment.
          </p>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    );
  }

  if (status === 'error' || !data) {
    return (
      <div style={{ maxWidth: 460, margin: '60px auto', padding: 24, textAlign: 'center' }} className="card-light cmp-fade-in">
        <h2 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: 8 }}>Could not load student data</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 14 }}>
          The backend may be offline. Start the server and reload the page.
        </p>
        <button className="btn btn-primary" onClick={load}>Retry</button>
      </div>
    );
  }

  const { totals } = data;
  const filtered = data.students.filter(s =>
    s.username.toLowerCase().includes(search.toLowerCase()) ||
    (s.email || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleAssign = async () => {
    if (!assignStudent || selectedLevels.length === 0) return;
    const res = await assignTasks(adminEmail, assignStudent, selectedLevels);
    if (res && res.success) {
      setAssignMsg(`Assigned ${selectedLevels.length} task(s) to ${data.students.find(s => s.id === assignStudent)?.username || assignStudent}.`);
      setSelectedLevels([]);
      load();
      setTimeout(() => setAssignMsg(''), 4000);
    } else {
      setAssignMsg('Assignment failed — check the backend.');
    }
  };

  const handleRemoveTask = async (studentId: string, taskId: string) => {
    const res = await removeTask(adminEmail, taskId);
    if (res && res.success) load();
  };

  const statCards = [
    { label: 'Students', value: totals.students, icon: Users, color: '#007AFF' },
    { label: 'Tasks Given', value: totals.tasksGiven, icon: ListChecks, color: '#FFB800' },
    { label: 'Tasks Completed', value: totals.tasksCompleted, icon: CheckCircle2, color: '#34C759' },
    { label: 'Tasks Pending', value: totals.tasksPending, icon: Circle, color: '#FF3B30' },
    { label: 'Quiz Completions', value: totals.quizCompletions, icon: Swords, color: '#9B51E0' },
    { label: 'Practice Sessions', value: totals.practiceSessions, icon: BarChart3, color: '#FF9500' },
    { label: 'Levels Completed', value: totals.levelsCompleted, icon: GraduationCap, color: '#00C7BE' },
  ];

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div className="cmp-hero" style={{ padding: '24px 28px', marginBottom: 20 }}>
        <div className="cmp-hero-orb cmp-hero-orb-a" />
        <div className="cmp-hero-orb cmp-hero-orb-b" />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
          <div>
            <div className="cmp-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={13} /> ADMIN CONSOLE
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', margin: 0 }}>Student Performance Dashboard</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', margin: '6px 0 0' }}>
              Practice activity · quiz completions · level progress · task assignments — every student at a glance.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.08)', padding: '8px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>{adminEmail}</span>
            <button
              onClick={load}
              title="Refresh live data from the database"
              style={{
                background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)',
                color: '#fff', borderRadius: 'var(--radius-pill)', padding: '5px 12px',
                fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer', fontFamily: 'var(--font-main)',
              }}
            >
              ⟳ Refresh
            </button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
        {data.devMode && (
          <div style={{
            position: 'relative', marginTop: 14, padding: '8px 14px', borderRadius: 'var(--radius-md)',
            background: 'rgba(255,184,0,0.12)', border: '1px solid rgba(255,184,0,0.35)',
            color: '#FFD84D', fontSize: '0.75rem', fontWeight: 600,
          }}>
            ⚠ DEV MODE — the backend <strong>ADMIN_EMAILS</strong> allow-list is not configured, so any signed-in e-mail can access this page.
            Set it in <strong style={{ fontFamily: 'var(--font-code)' }}>backend/.env</strong> (comma-separated) to restrict access.
          </div>
        )}
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 20 }}>
        {statCards.map((c, i) => (
          <div key={c.label} className="card-black cmp-pop-up" style={{ padding: '16px 14px', animationDelay: `${i * 0.05}s` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `${c.color}22`, border: `1px solid ${c.color}55`,
              }}>
                <c.icon size={18} color={c.color} />
              </span>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>{c.value}</div>
                <div style={{ fontSize: '0.64rem', color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Assign tasks */}
      <div className="card-light" style={{ padding: 20, marginBottom: 20 }}>
        <h3 style={{ fontSize: '1.02rem', fontWeight: 900, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 7 }}>
          <Zap size={17} color="#FFB800" /> Assign Level Tasks to Students
        </h3>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 14 }}>
          Pick a student and tick the levels (tasks) they must complete. A task auto-completes the moment the student finishes that level — you can see the status live below.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 280px) 1fr', gap: 16, marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, display: 'block', marginBottom: 6 }}>Student</label>
            <select
              value={assignStudent}
              onChange={e => setAssignStudent(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', fontSize: '0.85rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-hairline)', fontFamily: 'var(--font-main)' }}
            >
              {data.students.map(s => (
                <option key={s.id} value={s.id}>{s.username}{s.email ? ` (${s.email})` : ''}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
            <button
              className="btn btn-primary"
              onClick={handleAssign}
              disabled={!assignStudent || selectedLevels.length === 0}
              style={{ gap: 6 }}
            >
              <Zap size={15} /> Assign {selectedLevels.length > 0 ? `${selectedLevels.length} Task(s)` : 'Task'}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => { setSelectedLevels([]); setAssignMsg(''); }}
            >
              Clear
            </button>
          </div>
        </div>
        {assignMsg && (
          <div style={{ marginBottom: 10, padding: '8px 12px', borderRadius: 'var(--radius-md)', background: 'rgba(52,199,89,0.1)', border: '1px solid rgba(52,199,89,0.35)', color: '#1B7F37', fontSize: '0.8rem', fontWeight: 700 }}>
            {assignMsg}
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 6, maxHeight: 230, overflowY: 'auto', paddingRight: 4 }}>
          {LEVEL_TOPICS.map(l => {
            const checked = selectedLevels.includes(l.id);
            return (
              <button
                key={l.id}
                onClick={() => setSelectedLevels(prev => checked ? prev.filter(x => x !== l.id) : [...prev, l.id])}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 'var(--radius-md)',
                  border: `1.5px solid ${checked ? '#000' : 'var(--border-hairline)'}`,
                  background: checked ? '#000' : '#fff',
                  color: checked ? '#fff' : 'var(--text-body)',
                  fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', textAlign: 'left',
                  fontFamily: 'var(--font-main)', transition: 'all 0.12s ease',
                }}
              >
                <span style={{
                  width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${checked ? '#fff' : '#C7C7CC'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: checked ? '#34C759' : 'transparent', flexShrink: 0,
                }}>
                  {checked && <span style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 900 }}>✓</span>}
                </span>
                L{l.levelNumber} · {l.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Students table */}
      <div className="card-light" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
          <h3 style={{ fontSize: '1.02rem', fontWeight: 900, margin: 0, display: 'flex', alignItems: 'center', gap: 7 }}>
            <Users size={17} color="#007AFF" /> Students ({filtered.length})
          </h3>
          <div style={{ position: 'relative', marginLeft: 'auto', minWidth: 220 }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: 9, color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search name or email..."
              style={{ width: '100%', padding: '7px 10px 7px 30px', fontSize: '0.82rem', border: '1.5px solid var(--border-hairline)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-main)' }}
            />
          </div>
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: 30, textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            No students found. Students appear here after they open the app (progress syncs to the backend automatically).
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(s => {
            const open = expanded === s.id;
            const pct = Math.round((s.levels.completed / s.levels.total) * 100);
            return (
              <div key={s.id} style={{
                border: `1.5px solid ${open ? '#000' : 'var(--border-hairline)'}`,
                borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#fff', transition: 'all 0.15s ease',
              }}>
                <button
                  onClick={() => setExpanded(open ? null : s.id)}
                  style={{
                    width: '100%', padding: '12px 14px', background: 'transparent', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', textAlign: 'left', fontFamily: 'var(--font-main)',
                  }}
                >
                  <span style={{
                    width: 36, height: 36, borderRadius: '50%', background: '#000', color: '#fff', fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0,
                  }}>
                    {s.username.slice(0, 2).toUpperCase()}
                  </span>
                  <div style={{ minWidth: 150, flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#000', display: 'flex', alignItems: 'center', gap: 6 }}>
                      {s.username}
                      {s.role === 'admin' && (
                        <span style={{ fontSize: '0.6rem', fontWeight: 800, padding: '2px 8px', borderRadius: 100, background: 'rgba(255,59,48,0.1)', border: '1px solid rgba(255,59,48,0.35)', color: '#FF3B30', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Admin
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>{s.email || 'no email'}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, minWidth: 70 }}>
                    <Zap size={13} color="#FFB800" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 900 }}>{s.xp} XP</span>
                  </div>
                  <div style={{ minWidth: 130 }}>
                    <div style={{ fontSize: '0.66rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>
                      Levels {s.levels.completed}/{s.levels.total}
                    </div>
                    <div style={{ height: 7, borderRadius: 4, background: 'var(--bg-grey)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #34C759, #00C7BE)', borderRadius: 4, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '3px 9px', borderRadius: 100, background: 'rgba(155,81,224,0.1)', color: '#9B51E0' }}>
                      {s.quizzes.completed} quizzes
                    </span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '3px 9px', borderRadius: 100, background: 'rgba(255,149,0,0.1)', color: '#FF9500' }}>
                      {s.practice.sessions} practice
                    </span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '3px 9px', borderRadius: 100, background: s.tasks.pending > 0 ? 'rgba(255,59,48,0.1)' : 'rgba(52,199,89,0.1)', color: s.tasks.pending > 0 ? '#FF3B30' : '#1B7F37' }}>
                      {s.tasks.completed}/{s.tasks.given} tasks
                    </span>
                  </div>
                  {open ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                </button>

                {open && (
                  <div className="cmp-fade-in" style={{ padding: '14px 16px', borderTop: '1px solid var(--border-hairline)', background: '#FAFAFA' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
                      {/* Tasks */}
                      <div>
                        <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                          Assigned Tasks ({s.tasks.given} given · {s.tasks.completed} done · {s.tasks.pending} pending)
                        </div>
                        {s.tasks.items.length === 0 && <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>No tasks assigned yet.</div>}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                          {s.tasks.items.map(t => (
                            <div key={t.id} style={{
                              display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 'var(--radius-md)',
                              background: '#fff', border: `1px solid ${t.completedAt ? 'rgba(52,199,89,0.4)' : 'rgba(255,59,48,0.25)'}`, fontSize: '0.76rem',
                            }}>
                              {t.completedAt
                                ? <CheckCircle2 size={14} color="#34C759" style={{ flexShrink: 0 }} />
                                : <Circle size={14} color="#FF3B30" style={{ flexShrink: 0 }} />}
                              <span style={{ fontWeight: 700, flex: 1 }}>{levelTitle(t.levelId)}</span>
                              <span style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>
                                {t.completedAt ? `done ${formatDate(t.completedAt)}` : `assigned ${formatDate(t.assignedAt)}`}
                              </span>
                              <button
                                onClick={() => handleRemoveTask(s.id, t.id)}
                                title="Remove task"
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FF3B30', padding: 2 }}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Level progress */}
                      <div>
                        <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                          Level Progress ({s.levels.completed}/{s.levels.total} · {s.levels.stars} ★)
                        </div>
                        {s.levels.progress.length === 0 && <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>No levels completed yet.</div>}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                          {s.levels.progress.map(p => (
                            <span key={p.levelId} style={{
                              fontSize: '0.7rem', fontWeight: 700, padding: '3px 9px', borderRadius: 100,
                              background: 'rgba(52,199,89,0.1)', border: '1px solid rgba(52,199,89,0.35)', color: '#1B7F37',
                            }}>
                              {levelTitle(p.levelId)} ★{p.stars}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Quiz + practice completions */}
                      <div>
                        <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                          Quiz & Practice Activity ({s.quizzes.completed} quizzes · {s.practice.sessions} practice · {s.practice.flashcards} cards)
                        </div>
                        {s.quizzes.items.length === 0 && s.practice.items.length === 0 && (
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>No quiz or practice completions yet.</div>
                        )}
                        {s.quizzes.items.length > 0 && (
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-body)' }}>
                            <strong style={{ color: '#9B51E0' }}>Quizzes ({s.quizzes.completed}):</strong>{' '}
                            {s.quizzes.items.map(i => i.puzzleId).join(', ')}
                          </div>
                        )}
                        {s.practice.items.length > 0 && (
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-body)', marginTop: 4 }}>
                            <strong style={{ color: '#FF9500' }}>Practice ({s.practice.sessions}):</strong>{' '}
                            {s.practice.items.map(i => i.puzzleId.replace(/^practice-/, '')).join(', ')}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 12, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      <span>Joined: <strong>{formatDate(s.createdAt)}</strong></span>
                      <span>Level Unlocked: <strong>L{s.levelUnlocked}</strong></span>
                      <span>Streak: <strong>{s.streakDays}d</strong></span>
                      <span>Notes: <strong>{s.notes}</strong></span>
                      <span>Bookmarks: <strong>{s.bookmarks}</strong></span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 24, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
        <BookOpen size={12} style={{ verticalAlign: -2 }} /> Admin console — live data straight from the PostgreSQL database
        (quizzes, practice sessions, level completions, task status). Auto-refreshes every 30 seconds.
      </div>
    </div>
  );
};
