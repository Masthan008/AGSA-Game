import { UserProgress } from '../types';

const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';

// ============================================================================
// Authenticated API client — the backend (since v2) requires a valid Clerk
// session on every /api/v1 call. The App component registers a token provider
// (Clerk's getToken()) and every request below attaches it automatically.
// ============================================================================

type TokenProvider = () => Promise<string | null>;
let tokenProvider: TokenProvider | null = null;

export const setAuthTokenProvider = (provider: TokenProvider | null) => {
  tokenProvider = provider;
};

const withAuth = async (headers: Record<string, string> = {}): Promise<Record<string, string>> => {
  if (!tokenProvider) return headers;
  try {
    const token = await tokenProvider();
    if (token) return { ...headers, Authorization: `Bearer ${token}` };
  } catch { /* session not ready — backend will reject with 401 */ }
  return headers;
};

const request = async (path: string, init: RequestInit = {}): Promise<any> => {
  const headers = await withAuth({ ...(init.headers as Record<string, string> || {}) });
  try {
    const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      if (res.status === 401 || res.status === 403) return { error: data?.error?.code || 'UNAUTHORIZED' };
      return { error: data?.error?.message || `Request failed (${res.status})` };
    }
    return data;
  } catch (err) {
    console.warn('Backend request failed:', path, err);
    return null;
  }
};

export async function checkServerHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch (err) {
    return { status: 'offline' };
  }
}

export async function syncUserProfile(userProgress: UserProgress, email?: string, role: 'student' | 'admin' = 'student') {
  const data = await request('/api/v1/user/sync', {
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
  return data;
}

export async function recordLevelCompletion(userId: string, levelId: string, stars: number, earnedXp: number) {
  return request('/api/v1/progress/level-complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, levelId, stars, earnedXp }),
  });
}

export type CompletionType = 'quiz' | 'flashcard' | 'practice';
export async function fetchUserCompletions(userId: string, type?: CompletionType) {
  const url = type
    ? `/api/v1/completions/${encodeURIComponent(userId)}?type=${type}`
    : `/api/v1/completions/${encodeURIComponent(userId)}`;
  const data = await request(url);
  return data?.completions || [];
}

export async function recordCompletion(userId: string, puzzleId: string, puzzleType: CompletionType) {
  return request('/api/v1/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, puzzleId, puzzleType }),
  });
}

export async function removeCompletion(userId: string, puzzleId: string) {
  return request(`/api/v1/completions/${encodeURIComponent(userId)}/${encodeURIComponent(puzzleId)}`, { method: 'DELETE' });
}

export async function fetchLeaderboard() {
  const data = await request('/api/v1/leaderboard');
  return data?.leaderboard || [];
}

export async function fetchUserNotes(userId: string) {
  const data = await request(`/api/v1/notes/${encodeURIComponent(userId)}`);
  return data?.notes || [];
}

export async function createNote(userId: string, topicId: string, topicTitle: string, content: string) {
  return request('/api/v1/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, topicId, topicTitle, content }),
  });
}

export async function deleteNote(noteId: string) {
  return request(`/api/v1/notes/${noteId}`, { method: 'DELETE' });
}

export async function updateNote(noteId: string, topicTitle: string, content: string) {
  return request(`/api/v1/notes/${noteId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topicTitle, content }),
  });
}

export async function fetchUserBookmarks(userId: string) {
  const data = await request(`/api/v1/bookmarks/${encodeURIComponent(userId)}`);
  return data?.bookmarks || [];
}

export async function createBookmark(userId: string, topicId: string, topicTitle: string, note?: string) {
  return request('/api/v1/bookmarks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, topicId, topicTitle, note }),
  });
}

// ============================================================================
// ADMIN — token-scoped (admin role or ADMIN_EMAILS allow-list in backend).
// Only reachable from the app via the direct /#/admin URL.
// ============================================================================

export async function fetchAdminStudents(adminEmail: string) {
  return request('/api/v1/admin/students', { headers: { 'x-admin-email': adminEmail } });
}

export async function assignTasks(adminEmail: string, userId: string, levelIds: string[]) {
  return request('/api/v1/admin/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-admin-email': adminEmail },
    body: JSON.stringify({ userId, levelIds }),
  });
}

export async function removeTask(adminEmail: string, taskId: string) {
  return request(`/api/v1/admin/tasks/${encodeURIComponent(taskId)}`, {
    method: 'DELETE',
    headers: { 'x-admin-email': adminEmail },
  });
}
