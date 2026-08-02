import { UserProgress } from '../types';

const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';

export async function checkServerHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch (err) {
    return { status: 'offline' };
  }
}

export async function syncUserProfile(userProgress: UserProgress) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/user/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userProgress.username || 'guest_user',
        username: userProgress.username,
        xp: userProgress.xp,
        levelUnlocked: userProgress.levelUnlocked,
        starsPerLevel: userProgress.starsPerLevel,
        completedLevels: userProgress.completedLevels,
      }),
    });
    return await res.json();
  } catch (err) {
    console.warn('Backend sync warning:', err);
    return null;
  }
}

export async function recordLevelCompletion(userId: string, levelId: string, stars: number, earnedXp: number) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/progress/level-complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, levelId, stars, earnedXp }),
    });
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function fetchUserCompletions(userId: string, type?: 'rotation' | 'quiz' | 'flashcard') {
  try {
    const url = type
      ? `${API_BASE}/api/v1/completions/${encodeURIComponent(userId)}?type=${type}`
      : `${API_BASE}/api/v1/completions/${encodeURIComponent(userId)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.completions || [];
  } catch (err) {
    return [];
  }
}

export async function recordCompletion(userId: string, puzzleId: string, puzzleType: 'rotation' | 'quiz' | 'flashcard') {
  try {
    const res = await fetch(`${API_BASE}/api/v1/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, puzzleId, puzzleType }),
    });
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function removeCompletion(userId: string, puzzleId: string) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/completions/${encodeURIComponent(userId)}/${encodeURIComponent(puzzleId)}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function fetchLeaderboard() {
  try {
    const res = await fetch(`${API_BASE}/api/v1/leaderboard`);
    const data = await res.json();
    return data.leaderboard || [];
  } catch (err) {
    return [];
  }
}

export async function fetchUserNotes(userId: string) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/notes/${encodeURIComponent(userId)}`);
    const data = await res.json();
    return data.notes || [];
  } catch (err) {
    return [];
  }
}

export async function createNote(userId: string, topicId: string, topicTitle: string, content: string) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, topicId, topicTitle, content }),
    });
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function deleteNote(noteId: string) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/notes/${noteId}`, { method: 'DELETE' });
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function updateNote(noteId: string, topicTitle: string, content: string) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/notes/${noteId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicTitle, content }),
    });
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function fetchUserBookmarks(userId: string) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/bookmarks/${encodeURIComponent(userId)}`);
    const data = await res.json();
    return data.bookmarks || [];
  } catch (err) {
    return [];
  }
}

export async function createBookmark(userId: string, topicId: string, topicTitle: string, note?: string) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/bookmarks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, topicId, topicTitle, note }),
    });
    return await res.json();
  } catch (err) {
    return null;
  }
}
