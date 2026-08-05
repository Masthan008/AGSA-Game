import { UserProgress } from '../types';

const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';

type TokenProvider = () => Promise<string | null>;
let tokenProvider: TokenProvider | null = null;

/** Registered once by App from Clerk's useAuth hook. */
export function setApiTokenProvider(provider: TokenProvider | null) {
  tokenProvider = provider;
}

async function apiFetch(path: string, init: RequestInit = {}) {
  const token = tokenProvider ? await tokenProvider() : null;
  const headers = new Headers(init.headers);
  if (token) headers.set('Authorization', `Bearer ${token}`);
  return fetch(`${API_BASE}${path}`, { ...init, headers });
}

export async function checkServerHealth() {
  try {
    const res = await apiFetch('/health');
    return await res.json();
  } catch (err) {
    return { status: 'offline' };
  }
}

export type AccountRole = 'student' | 'admin';

export async function fetchMyProfile() {
  try {
    const res = await apiFetch('/api/v1/me');
    if (!res.ok) return null;
    return (await res.json()).user || null;
  } catch {
    return null;
  }
}

export async function fetchMyTasks() {
  try {
    const res = await apiFetch('/api/v1/me/tasks');
    if (!res.ok) return [];
    return (await res.json()).tasks || [];
  } catch {
    return [];
  }
}

export async function syncUserProfile(userProgress: UserProgress, email?: string, role: AccountRole = 'student') {
  try {
    const res = await apiFetch('/api/v1/user/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userProgress.username || 'guest_user',
        username: userProgress.username,
        email: email || null,
        role,
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
    const res = await apiFetch('/api/v1/progress/level-complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, levelId, stars, earnedXp }),
    });
    return await res.json();
  } catch (err) {
    return null;
  }
}

export type CompletionType = 'quiz' | 'flashcard' | 'practice';
export async function fetchUserCompletions(userId: string, type?: CompletionType) {
  try {
    const url = type
      ? `${API_BASE}/api/v1/completions/${encodeURIComponent(userId)}?type=${type}`
      : `${API_BASE}/api/v1/completions/${encodeURIComponent(userId)}`;
    const res = await apiFetch(url.replace(API_BASE, ''));
    const data = await res.json();
    return data.completions || [];
  } catch (err) {
    return [];
  }
}

export async function recordCompletion(userId: string, puzzleId: string, puzzleType: CompletionType) {
  try {
    const res = await apiFetch('/api/v1/completions', {
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
    const res = await apiFetch(`/api/v1/completions/${encodeURIComponent(userId)}/${encodeURIComponent(puzzleId)}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function fetchLeaderboard() {
  try {
    const res = await apiFetch('/api/v1/leaderboard');
    const data = await res.json();
    return data.leaderboard || [];
  } catch (err) {
    return [];
  }
}

export async function fetchUserNotes(userId: string) {
  try {
    const res = await apiFetch(`/api/v1/notes/${encodeURIComponent(userId)}`);
    const data = await res.json();
    return data.notes || [];
  } catch (err) {
    return [];
  }
}

export async function createNote(userId: string, topicId: string, topicTitle: string, content: string) {
  try {
    const res = await apiFetch('/api/v1/notes', {
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
    const res = await apiFetch(`/api/v1/notes/${noteId}`, { method: 'DELETE' });
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function updateNote(noteId: string, topicTitle: string, content: string) {
  try {
    const res = await apiFetch(`/api/v1/notes/${noteId}`, {
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
    const res = await apiFetch(`/api/v1/bookmarks/${encodeURIComponent(userId)}`);
    const data = await res.json();
    return data.bookmarks || [];
  } catch (err) {
    return [];
  }
}

export async function createBookmark(userId: string, topicId: string, topicTitle: string, note?: string) {
  try {
    const res = await apiFetch('/api/v1/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, topicId, topicTitle, note }),
    });
    return await res.json();
  } catch (err) {
    return null;
  }
}

// ============================================================================
// ADMIN — protected by an admin email allow-list (backend ADMIN_EMAILS env).
// Only reachable from the app via the direct /#/admin URL.
// ============================================================================

export async function fetchAdminStudents(adminEmail: string) {
  try {
    const res = await apiFetch('/api/v1/admin/students', {
      headers: { 'x-admin-email': adminEmail },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (err) {
    return null;
  }
}

export async function assignTasks(adminEmail: string, userId: string, levelIds: string[]) {
  try {
    const res = await apiFetch('/api/v1/admin/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-email': adminEmail },
      body: JSON.stringify({ userId, levelIds }),
    });
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function removeTask(adminEmail: string, taskId: string) {
  try {
    const res = await apiFetch(`/api/v1/admin/tasks/${encodeURIComponent(taskId)}`, {
      method: 'DELETE',
      headers: { 'x-admin-email': adminEmail },
    });
    return await res.json();
  } catch (err) {
    return null;
  }
}
