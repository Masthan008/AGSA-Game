import React, { useState, useEffect } from 'react';
import { UserProgress } from '../../types';
import { fetchUserNotes, createNote, deleteNote, updateNote, fetchUserBookmarks } from '../../services/api';
import { Bookmark, FileText, Plus, Trash2, Search, Sparkles, Pin, Pencil, X, Check, Save, CalendarDays } from 'lucide-react';

interface NotesPageProps {
  userProgress: UserProgress;
}

const PIN_KEY = 'adsa-quest-pinned-notes';

export const NotesPage: React.FC<NotesPageProps> = ({ userProgress }) => {
  const [notes, setNotes] = useState<any[]>([]);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [deleteArmedId, setDeleteArmedId] = useState<string | null>(null);
  const [pinnedIds, setPinnedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(PIN_KEY) || '[]');
    } catch { return []; }
  });

  const userId = userProgress.username || 'Student';

  useEffect(() => {
    async function loadData() {
      const n = await fetchUserNotes(userId);
      const b = await fetchUserBookmarks(userId);
      setNotes(n);
      setBookmarks(b);
    }
    loadData();
  }, [userId]);

  const togglePin = (id: string) => {
    setPinnedIds(prev => {
      const next = prev.includes(id) ? prev.filter(p => p !== id) : [id, ...prev];
      try { localStorage.setItem(PIN_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim() || !newContent.trim()) return;

    const res = await createNote(userId, newTopicTitle.toLowerCase().replace(/\s+/g, '-'), newTopicTitle, newContent);
    if (res && res.note) {
      setNotes(prev => [res.note, ...prev]);
      setNewTopicTitle('');
      setNewContent('');
      setIsCreating(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (deleteArmedId !== id) {
      setDeleteArmedId(id);
      setTimeout(() => setDeleteArmedId(curr => (curr === id ? null : curr)), 2500);
      return;
    }
    await deleteNote(id);
    setNotes(prev => prev.filter(n => n.id !== id));
    setDeleteArmedId(null);
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
      setNotes(prev => prev.map(n => (n.id === id ? res.note : n)));
    }
    setEditingId(null);
  };

  const formatDate = (iso?: string) => {
    if (!iso) return '';
    try {
      return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch { return ''; }
  };

  const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

  const filteredNotes = notes
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

  const totalWords = notes.reduce((acc, n) => acc + wordCount(n.content || ''), 0);

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 16px' }}>
      {/* Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 className="section-title">Study Notes & Bookmarks</h2>
          <p className="section-subtitle">Your personal database-synced study notes and bookmarked algorithm steps.</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setIsCreating(!isCreating)}
        >
          <Plus size={16} /> {isCreating ? 'Cancel' : 'New Note'}
        </button>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Notes', value: notes.length },
          { label: 'Pinned', value: pinnedIds.filter(id => notes.some(n => n.id === id)).length },
          { label: 'Total Words', value: totalWords.toLocaleString() },
          { label: 'Bookmarks', value: bookmarks.length },
        ].map(stat => (
          <div key={stat.label} className="card-light" style={{ padding: '10px 18px', textAlign: 'center', minWidth: 110 }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>{stat.value}</div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* New Note Form */}
      {isCreating && (
        <form onSubmit={handleCreateNote} className="card-light fade-in" style={{ padding: 20, marginBottom: 24 }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: 14 }}>Create New Algorithm Note</h4>
          <input
            type="text"
            placeholder="Topic Title (e.g. AVL Left-Right Double Rotation)"
            value={newTopicTitle}
            onChange={e => setNewTopicTitle(e.target.value)}
            style={{ width: '100%', marginBottom: 12 }}
            required
          />
          <textarea
            placeholder="Write your detailed notes, code insights, or complexity breakdown..."
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            rows={4}
            style={{ width: '100%', marginBottom: 14, fontFamily: 'var(--font-main)' }}
            required
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {wordCount(newContent)} words
            </span>
            <button type="submit" className="btn btn-primary" style={{ minWidth: 120 }}>
              <Save size={15} style={{ marginRight: 5 }} /> Save Note
            </button>
          </div>
        </form>
      )}

      {/* Search Bar */}
      <div className="card-light" style={{ padding: '12px 16px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
        <Search size={18} color="var(--text-muted)" />
        <input
          type="text"
          placeholder="Search notes by topic or keyword..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ border: 'none', padding: 0, width: '100%', boxShadow: 'none' }}
        />
        {searchQuery && (
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#007AFF', whiteSpace: 'nowrap' }}>
            {filteredNotes.length} match{filteredNotes.length === 1 ? '' : 'es'}
          </span>
        )}
      </div>

      {/* Grid of Notes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {filteredNotes.length === 0 ? (
          <div className="card-grey" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 36 }}>
            <FileText size={32} color="var(--text-muted)" style={{ marginBottom: 12 }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>
              {notes.length === 0 ? 'No Study Notes Found' : 'No matching notes'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {notes.length === 0 ? 'Click "New Note" above to write your first note!' : 'Try a different search keyword.'}
            </p>
          </div>
        ) : (
          filteredNotes.map(note => (
            <div key={note.id} className={`card-light fade-in ${pinnedIds.includes(note.id) ? '' : ''}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: pinnedIds.includes(note.id) ? '1.5px solid rgba(255,204,0,0.55)' : undefined }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 5 }}>
                    {pinnedIds.includes(note.id) && <Pin size={12} color="var(--accent-gold)" />}
                    {pinnedIds.includes(note.id) ? 'PINNED NOTE' : 'STUDY NOTE'}
                  </span>
                  <span style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={() => togglePin(note.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: pinnedIds.includes(note.id) ? 'var(--accent-gold)' : 'var(--text-muted)' }}
                      title={pinnedIds.includes(note.id) ? 'Unpin note' : 'Pin note'}
                    >
                      <Pin size={15} />
                    </button>
                    <button
                      onClick={() => (editingId === note.id ? setEditingId(null) : startEdit(note))}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: editingId === note.id ? '#007AFF' : 'var(--text-muted)' }}
                      title="Edit note"
                    >
                      {editingId === note.id ? <X size={15} /> : <Pencil size={15} />}
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      style={{
                        background: deleteArmedId === note.id ? 'var(--accent-red)' : 'none',
                        border: 'none', cursor: 'pointer', color: deleteArmedId === note.id ? '#FFFFFF' : 'var(--text-muted)',
                        padding: '2px 6px', borderRadius: 6, transition: 'all 0.2s ease'
                      }}
                      title={deleteArmedId === note.id ? 'Click again to confirm delete' : 'Delete note'}
                    >
                      <Trash2 size={15} />
                    </button>
                  </span>
                </div>

                {editingId === note.id ? (
                  <div>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      style={{ width: '100%', marginBottom: 8, fontSize: '1rem', fontWeight: 800 }}
                    />
                    <textarea
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      rows={6}
                      style={{ width: '100%', marginBottom: 8, fontFamily: 'var(--font-main)', fontSize: '0.88rem' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{wordCount(editContent)} words</span>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-secondary" onClick={() => setEditingId(null)} style={{ padding: '6px 12px', fontSize: '0.78rem' }}>Cancel</button>
                        <button className="btn btn-primary" onClick={() => handleSaveEdit(note.id)} style={{ padding: '6px 14px', fontSize: '0.78rem' }}>
                          <Check size={14} style={{ marginRight: 4 }} /> Save
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 8, letterSpacing: '-0.02em' }}>
                      {note.topicTitle}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>
                      {note.content}
                    </p>
                  </>
                )}
              </div>

              <div style={{ marginTop: 14, paddingTop: 10, borderTop: '1px solid var(--border-hairline)', fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Sparkles size={12} color="var(--accent-gold)" /> Synced with PostgreSQL DB
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CalendarDays size={11} /> Updated {formatDate(note.updatedAt)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bookmarks strip */}
      {bookmarks.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Bookmark size={16} color="#007AFF" /> Bookmarked Algorithm Steps
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {bookmarks.map(bm => (
              <div key={bm.id} className="card-light" style={{ padding: 16 }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#007AFF', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Bookmark size={12} /> BOOKMARK
                </div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800, marginBottom: 6 }}>{bm.topicTitle}</h4>
                {bm.note && <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', lineHeight: 1.5 }}>{bm.note}</p>}
                <div style={{ marginTop: 8, fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  Saved {formatDate(bm.createdAt)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
