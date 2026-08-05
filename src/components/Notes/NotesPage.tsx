import React, { useState, useEffect, useCallback } from 'react';
import { UserProgress } from '../../types';
import { fetchUserNotes, createNote, deleteNote, updateNote, fetchUserBookmarks } from '../../services/api';
import {
  NotebookPen, Pin, Pencil, Trash2, Search, Plus, X, Check, Save, CalendarDays,
  Bookmark, FileText, Sparkles, Clock, Layers, Type, GraduationCap, Flame, Loader2,
} from 'lucide-react';

interface NotesPageProps {
  userProgress: UserProgress;
}

const PIN_KEY = 'adsa-quest-pinned-notes';

// CRED-style animated counter — counts up when the target value changes.
const useCountUp = (target: number, duration = 800) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (target === 0) { setVal(0); return; }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
};

const NOTE_ACCENTS = [
  'linear-gradient(90deg, #000000, #4A4A4A)',
  'linear-gradient(90deg, #FF3B30, #FF9500)',
  'linear-gradient(90deg, #007AFF, #00C7BE)',
  'linear-gradient(90deg, #9B51E0, #FF3B30)',
  'linear-gradient(90deg, #34C759, #00C7BE)',
];

const StatTile = ({ label, value, icon, delay }: { label: string; value: number; icon: React.ReactNode; delay: number }) => {
  const n = useCountUp(value);
  return (
    <div className="note-glass-tile" style={{ animationDelay: `${delay}ms`, animation: 'cmp-fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span className="note-stat-num">{n.toLocaleString()}</span>
        <span style={{ opacity: 0.85 }}>{icon}</span>
      </div>
      <div className="note-stat-label">{label}</div>
    </div>
  );
};

const formatDate = (iso?: string) => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return ''; }
};

const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

export const NotesPage: React.FC<NotesPageProps> = ({ userProgress }) => {
  const [notes, setNotes] = useState<any[] | null>(null);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'pinned'>('all');
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [deleteArmedId, setDeleteArmedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [pinnedIds, setPinnedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(PIN_KEY) || '[]');
    } catch { return []; }
  });

  const userId = userProgress.username || 'Student';
  const toastTimerRef = React.useRef(0);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  useEffect(() => {
    let alive = true;
    async function loadData() {
      const [n, b] = await Promise.all([fetchUserNotes(userId), fetchUserBookmarks(userId)]);
      if (!alive) return;
      setNotes(n);
      setBookmarks(b);
    }
    loadData();
    return () => { alive = false; };
  }, [userId]);

  const togglePin = (id: string) => {
    setPinnedIds(prev => {
      const next = prev.includes(id) ? prev.filter(p => p !== id) : [id, ...prev];
      try { localStorage.setItem(PIN_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
    showToast(pinnedIds.includes(id) ? 'Note unpinned' : 'Note pinned to top');
  };

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim() || !newContent.trim()) return;
    const res = await createNote(userId, newTopicTitle.toLowerCase().replace(/\s+/g, '-'), newTopicTitle, newContent);
    if (res && res.note) {
      setNotes(prev => [res.note, ...(prev || [])]);
      setNewTopicTitle('');
      setNewContent('');
      setIsCreating(false);
      showToast('Note saved to database');
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (deleteArmedId !== id) {
      setDeleteArmedId(id);
      setTimeout(() => setDeleteArmedId(curr => (curr === id ? null : curr)), 2500);
      return;
    }
    await deleteNote(id);
    setNotes(prev => (prev || []).filter(n => n.id !== id));
    setDeleteArmedId(null);
    showToast('Note deleted');
  };

  const startEdit = (note: any) => {
    setEditingId(note.id);
    setEditTitle(note.topicTitle || '');
    setEditContent(note.content || '');
  };

  const handleSaveEdit = async (id: string) => {
    if (!editContent.trim()) return;
    const res = await updateNote(id, editTitle.trim() || 'Untitled', editContent);
    if (res && res.note) {
      setNotes(prev => (prev || []).map(n => (n.id === id ? res.note : n)));
      showToast('Changes saved');
    }
    setEditingId(null);
  };

  const filteredNotes = (notes || [])
    .filter(n => filterMode === 'all' || pinnedIds.includes(n.id))
    .filter(n =>
      (n.topicTitle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.content || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aPinned = pinnedIds.includes(a.id);
      const bPinned = pinnedIds.includes(b.id);
      if (aPinned !== bPinned) return aPinned ? -1 : 1;
      return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime();
    });

  const totalWords = (notes || []).reduce((acc, n) => acc + wordCount(n.content || ''), 0);
  const totalReadMins = Math.max(1, Math.round(totalWords / 200));
  const pinnedCount = pinnedIds.filter(id => (notes || []).some(n => n.id === id)).length;
  const isLoading = notes === null;

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 16px' }}>
      {/* ── HERO: dark gradient vault header with live count-up stats ── */}
      <div className="cmp-hero" style={{ padding: '32px 28px' }}>
        <div className="cmp-hero-orb cmp-hero-orb-a" />
        <div className="cmp-hero-orb cmp-hero-orb-b" />
        <div className="note-hero-grid" style={{ position: 'relative' }}>
          <div>
            <span className="cmp-eyebrow"><NotebookPen size={12} style={{ verticalAlign: -2 }} /> STUDY VAULT</span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#fff', margin: 0 }}>
              My Study Notes
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', margin: '8px 0 22px', maxWidth: 460, lineHeight: 1.6 }}>
              Your personal, database-synced knowledge bank — every note, algorithm insight and
              bookmarked step, safe in PostgreSQL and searchable in a heartbeat.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={() => setIsCreating(!isCreating)}
                style={{ background: '#fff', color: '#000', fontWeight: 800, boxShadow: '0 8px 24px rgba(0,0,0,0.35)', gap: 7, padding: '10px 20px' }}>
                <Plus size={15} /> {isCreating ? 'Cancel' : 'New Note'}
              </button>
              {notes && notes.length > 0 && (
                <span className="chip" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.18)', alignSelf: 'center' }}>
                  <Flame size={12} color="#FF9500" /> {totalReadMins} min read total
                </span>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <StatTile label="Total Notes" value={(notes || []).length} delay={0} icon={<Layers size={17} color="rgba(255,255,255,0.7)" />} />
            <StatTile label="Pinned" value={pinnedCount} delay={0.07} icon={<Pin size={17} color="#FFD700" />} />
            <StatTile label="Total Words" value={totalWords} delay={0.14} icon={<Type size={17} color="rgba(255,255,255,0.7)" />} />
            <StatTile label="Bookmarks" value={bookmarks.length} delay={0.21} icon={<Bookmark size={17} color="#0A84FF" />} />
          </div>
        </div>
      </div>

      {/* ── TOOLBAR: search + filter chips ── */}
      <div className="note-toolbar">
        <div className="note-search">
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search notes by topic or keyword..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ border: 'none', padding: 0, width: '100%', boxShadow: 'none', background: 'transparent', fontSize: '0.88rem' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setFilterMode('all')}
            className="cmp-chip"
            style={{
              background: filterMode === 'all' ? '#000' : 'var(--bg-light)',
              color: filterMode === 'all' ? '#fff' : 'var(--text-secondary)',
              border: filterMode === 'all' ? '1.5px solid #000' : '1.5px solid var(--border-hairline)',
            }}
          >
            <Layers size={13} /> All <span style={{ opacity: 0.6 }}>{notes ? notes.length : 0}</span>
          </button>
          <button
            onClick={() => setFilterMode('pinned')}
            className="cmp-chip"
            style={{
              background: filterMode === 'pinned' ? '#000' : 'var(--bg-light)',
              color: filterMode === 'pinned' ? '#fff' : 'var(--text-secondary)',
              border: filterMode === 'pinned' ? '1.5px solid #000' : '1.5px solid var(--border-hairline)',
            }}
          >
            <Pin size={13} color={filterMode === 'pinned' ? '#FFD700' : 'inherit'} /> Pinned <span style={{ opacity: 0.6 }}>{pinnedCount}</span>
          </button>
        </div>
        {searchQuery && (
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#007AFF', whiteSpace: 'nowrap', marginLeft: 'auto' }}>
            {filteredNotes.length} match{filteredNotes.length === 1 ? '' : 'es'}
          </span>
        )}
      </div>

      {/* ── GRID OF NOTES ── */}
      <div key={filterMode} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="note-card note-enter" style={{ animationDelay: `${i * 90}ms`, minHeight: 230 }}>
              <div style={{ padding: 20 }}>
                <div className="note-skeleton" style={{ width: '40%', height: 14, borderRadius: 6, marginBottom: 14 }} />
                <div className="note-skeleton" style={{ width: '85%', height: 20, borderRadius: 6, marginBottom: 12 }} />
                <div className="note-skeleton" style={{ width: '100%', height: 12, borderRadius: 6, marginBottom: 7 }} />
                <div className="note-skeleton" style={{ width: '92%', height: 12, borderRadius: 6, marginBottom: 7 }} />
                <div className="note-skeleton" style={{ width: '60%', height: 12, borderRadius: 6 }} />
              </div>
            </div>
          ))
        ) : filteredNotes.length === 0 ? (
          <div className="card-grey" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 48, border: '1.5px dashed var(--border-light)' }}>
            <div className="note-empty-float" style={{ width: 56, height: 56, margin: '0 auto 14px', borderRadius: 16, background: '#fff', boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={26} color="var(--text-muted)" />
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: 4 }}>
              {notes.length === 0 ? 'Your vault is empty' : 'No matching notes'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 16 }}>
              {notes.length === 0
                ? 'Capture your first algorithm insight — it will sync to the database instantly.'
                : 'Try a different keyword or switch the filter back to "All".'}
            </p>
            {notes.length === 0 && (
              <button className="btn btn-primary btn-sm" onClick={() => setIsCreating(true)}>
                <Plus size={14} /> Write First Note
              </button>
            )}
          </div>
        ) : (
          filteredNotes.map((note, i) => {
            const pinned = pinnedIds.includes(note.id);
            const editing = editingId === note.id;
            const armed = deleteArmedId === note.id;
            const accent = NOTE_ACCENTS[(pinnedIds.indexOf(note.id) >= 0 ? 0 : i) % NOTE_ACCENTS.length];
            return (
              <div
                key={note.id}
                className={`note-card note-enter ${pinned ? 'is-pinned' : ''} ${armed ? 'is-delete-armed' : ''}`}
                style={{ animationDelay: `${Math.min(i, 10) * 65}ms`, ['--note-accent' as any]: pinned ? 'linear-gradient(90deg, #FFD700, #FF9500)' : accent, border: pinned ? '1.5px solid rgba(255,204,0,0.55)' : undefined }}
              >
                <div style={{ padding: '18px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6, color: pinned ? '#C8A600' : 'var(--text-muted)' }}>
                    <Pin size={12} color={pinned ? '#FFD700' : 'var(--text-muted)'} style={pinned ? { filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.7))' } : undefined} />
                    {pinned ? 'Pinned' : 'Study Note'}
                  </span>
                  <span style={{ display: 'flex', gap: 4 }}>
                    <button
                      onClick={() => togglePin(note.id)}
                      style={{ width: 30, height: 30, borderRadius: 9, background: pinned ? 'rgba(255,204,0,0.14)' : 'transparent', border: 'none', cursor: 'pointer', color: pinned ? '#C8A600' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.18s ease' }}
                      title={pinned ? 'Unpin note' : 'Pin note'}
                    >
                      <Pin size={14} style={pinned ? { animation: 'pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' } : undefined} />
                    </button>
                    <button
                      onClick={() => (editing ? setEditingId(null) : startEdit(note))}
                      style={{ width: 30, height: 30, borderRadius: 9, background: editing ? 'rgba(0,122,255,0.12)' : 'transparent', border: 'none', cursor: 'pointer', color: editing ? '#007AFF' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.18s ease' }}
                      title={editing ? 'Cancel editing' : 'Edit note'}
                    >
                      {editing ? <X size={14} /> : <Pencil size={14} />}
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      style={{
                        width: armed ? 76 : 30, height: 30, borderRadius: 9,
                        background: armed ? '#FF3B30' : 'transparent', border: 'none', cursor: 'pointer',
                        color: armed ? '#fff' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: 5, transition: 'all 0.2s cubic-bezier(0.33, 1, 0.68, 1)', overflow: 'hidden',
                      }}
                      title={armed ? 'Click again to confirm delete' : 'Delete note'}
                    >
                      <Trash2 size={14} />
                      {armed && <span style={{ fontSize: '0.6rem', fontWeight: 900, whiteSpace: 'nowrap' }}>CONFIRM</span>}
                    </button>
                  </span>
                </div>

                <div style={{ padding: '0 20px 4px', flex: 1 }}>
                  {editing ? (
                    <div className="cmp-fade-in" style={{ animation: 'cmp-fade-up 0.3s cubic-bezier(0.22, 1, 0.36, 1) both' }}>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        placeholder="Note title"
                        style={{ width: '100%', marginBottom: 10, fontSize: '1rem', fontWeight: 800 }}
                        autoFocus
                      />
                      <textarea
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        rows={6}
                        placeholder="Write your note..."
                        style={{ width: '100%', marginBottom: 10, fontFamily: 'var(--font-main)', fontSize: '0.88rem', lineHeight: 1.55 }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{wordCount(editContent)} words</span>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button className="btn btn-secondary" onClick={() => setEditingId(null)} style={{ padding: '6px 12px', fontSize: '0.76rem' }}>Cancel</button>
                          <button className="btn btn-primary" onClick={() => handleSaveEdit(note.id)} style={{ padding: '6px 14px', fontSize: '0.76rem', gap: 5 }}>
                            <Save size={13} /> Save
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 style={{ fontSize: '1.08rem', fontWeight: 800, marginBottom: 8, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                        {note.topicTitle}
                      </h3>
                      <p className="note-clamp" style={{ fontSize: '0.87rem', color: 'var(--text-body)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                        {note.content}
                      </p>
                    </>
                  )}
                </div>

                <div style={{ marginTop: 12, padding: '12px 20px', borderTop: '1px solid var(--border-hairline)', fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4, background: 'var(--bg-light)', borderBottomLeftRadius: 'var(--radius-lg)', borderBottomRightRadius: 'var(--radius-lg)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Sparkles size={11} color="#FFD700" /> <span style={{ fontWeight: 700 }}>{wordCount(note.content)}</span> words
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Clock size={11} /> {Math.max(1, Math.round(wordCount(note.content) / 200))}m read
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <CalendarDays size={11} /> {formatDate(note.updatedAt)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── BOOKMARKS SECTION ── */}
      {!isLoading && bookmarks.length > 0 && (
        <div style={{ marginTop: 34 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ width: 34, height: 34, borderRadius: 11, background: 'rgba(0,122,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bookmark size={16} color="#007AFF" />
            </span>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '-0.02em' }}>Bookmarked Algorithm Steps</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Key concepts you saved while exploring the visualizer.</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
            {bookmarks.map((bm, i) => (
              <div key={bm.id} className="card-light bm-card note-enter" style={{ padding: 18, animationDelay: `${Math.min(i, 8) * 70}ms`, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #007AFF, #00C7BE)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                  <Bookmark size={13} color="#007AFF" />
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#007AFF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Bookmark</span>
                </div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800, marginBottom: 6, letterSpacing: '-0.01em' }}>{bm.topicTitle}</h4>
                {bm.note && <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', lineHeight: 1.55, marginBottom: 10 }}>{bm.note}</p>}
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CalendarDays size={11} /> Saved {formatDate(bm.createdAt)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── COMPOSER MODAL ── */}
      {isCreating && (
        <>
          <div className="cmp-scrim" onClick={() => setIsCreating(false)} />
          <div className="note-modal-card">
            <div style={{ padding: '22px 24px', borderBottom: '1px solid var(--border-hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 36, height: 36, borderRadius: 11, background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GraduationCap size={18} />
                </span>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 900, letterSpacing: '-0.02em' }}>Create Algorithm Note</h3>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Saved live to the PostgreSQL database.</p>
                </div>
              </div>
              <button onClick={() => setIsCreating(false)} className="cmp-close" title="Close">
                <X size={15} />
              </button>
            </div>
            <form onSubmit={handleCreateNote} style={{ padding: 22 }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Topic Title
              </label>
              <input
                type="text"
                placeholder="e.g. AVL Left-Right Double Rotation"
                value={newTopicTitle}
                onChange={e => setNewTopicTitle(e.target.value)}
                style={{ width: '100%', marginBottom: 14 }}
                required
                autoFocus
              />
              <label style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Notes
              </label>
              <textarea
                placeholder="Write your detailed notes, code insights, or complexity breakdown..."
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                rows={7}
                style={{ width: '100%', marginBottom: 14, fontFamily: 'var(--font-main)', lineHeight: 1.6, resize: 'vertical' }}
                required
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {wordCount(newContent)} words · {Math.max(1, Math.round(wordCount(newContent) / 200))} min read
                </span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsCreating(false)} style={{ padding: '9px 18px', fontSize: '0.8rem' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ padding: '9px 20px', fontSize: '0.8rem', gap: 6, minHeight: 40 }}>
                    <Save size={14} /> Save Note
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div className="note-toast">
          <Check size={15} color="#34C759" />
          {toast}
        </div>
      )}

      {isLoading && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 22, color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700 }}>
          <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> Loading from database…
        </div>
      )}
    </div>
  );
};
