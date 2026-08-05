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

const MUTATION_QUEUE_KEY = 'adsa_quest_pending_mutations';
interface PendingMutation { id: string; path: string; method: string; body?: string; createdAt: string }

function enqueueMutation(path: string, init: RequestInit) {
  if (typeof localStorage === 'undefined') return;
  try {
    const queue: PendingMutation[] = JSON.parse(localStorage.getItem(MUTATION_QUEUE_KEY) || '[]');
    queue.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, path, method: init.method || 'POST', body: typeof init.body === 'string' ? init.body : undefined, createdAt: new Date().toISOString() });
    localStorage.setItem(MUTATION_QUEUE_KEY, JSON.stringify(queue.slice(-100)));
  } catch { /* local storage can be unavailable in privacy mode */ }
}

export async function flushPendingMutations() {
  if (typeof localStorage === 'undefined' || !navigator.onLine) return 0;
  let queue: PendingMutation[] = [];
  try { queue = JSON.parse(localStorage.getItem(MUTATION_QUEUE_KEY) || '[]'); } catch { return 0; }
  const remaining: PendingMutation[] = [];
  let sent = 0;
  for (const item of queue) {
    try {
      const res = await apiFetch(item.path, { method: item.method, headers: { 'Content-Type': 'application/json', 'Idempotency-Key': item.id }, body: item.body });
      if (res.ok) sent += 1; else remaining.push(item);
    } catch { remaining.push(item); }
  }
  localStorage.setItem(MUTATION_QUEUE_KEY, JSON.stringify(remaining));
  return sent;
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

export async function importGuestProgress(progress: UserProgress) {
  try {
    const res = await apiFetch('/api/v1/me/import-guest-progress', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ starsPerLevel: progress.starsPerLevel, completedLevels: progress.completedLevels }),
    });
    return res.ok || res.status === 409;
  } catch {
    return false;
  }
}

export async function recordQuizAttempt(input: { puzzleId: string; levelId: string; selectedIndex: number; correct: boolean; hintUsed: boolean }) {
  try {
    const res = await apiFetch('/api/v1/me/quiz-attempts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) });
    return res.ok;
  } catch { return false; }
}

export async function fetchMistakes() {
  try {
    const res = await apiFetch('/api/v1/me/mistakes');
    return res.ok ? (await res.json()).mistakes || [] : [];
  } catch { return []; }
}

export async function fetchFlashcardReviews() {
  try { const res = await apiFetch('/api/v1/me/flashcard-reviews'); return res.ok ? await res.json() : { reviews: [], dueCardIds: [] }; }
  catch { return { reviews: [], dueCardIds: [] }; }
}

export async function rateFlashcard(cardId: string, rating: 'again'|'hard'|'good'|'easy') {
  try { const res = await apiFetch('/api/v1/me/flashcard-reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ cardId, rating }) }); return res.ok ? (await res.json()).review : null; }
  catch { return null; }
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
  const path = '/api/v1/progress/level-complete';
  const init: RequestInit = {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': crypto.randomUUID() }, body: JSON.stringify({ userId, levelId, stars, earnedXp }),
  };
  try {
    const res = await apiFetch(path, init);
    if (!res.ok) { if (res.status >= 500) enqueueMutation(path, init); return null; }
    return await res.json();
  } catch (err) {
    enqueueMutation(path, init);
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
  const path = '/api/v1/completions';
  const init: RequestInit = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, puzzleId, puzzleType }) };
  try {
    const res = await apiFetch(path, init);
    if (!res.ok) { if (res.status >= 500) enqueueMutation(path, init); return null; }
    return await res.json();
  } catch (err) {
    enqueueMutation(path, init);
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

export async function deleteBookmark(bookmarkId: string) {
  try {
    const res = await apiFetch(`/api/v1/bookmarks/${encodeURIComponent(bookmarkId)}`, { method: 'DELETE' });
    return res.ok;
  } catch {
    return false;
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

export async function fetchTeacherClassrooms() {
  try {
    const res = await apiFetch('/api/v1/teacher/classrooms');
    return res.ok ? (await res.json()).classrooms || [] : [];
  } catch { return []; }
}

export async function createTeacherClassroom(name: string) {
  try {
    const res = await apiFetch('/api/v1/teacher/classrooms', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) });
    return res.ok ? (await res.json()).classroom : null;
  } catch { return null; }
}

export async function addClassroomMember(classroomId: string, userId: string) {
  try {
    const res = await apiFetch(`/api/v1/teacher/classrooms/${encodeURIComponent(classroomId)}/members`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId }) });
    return res.ok;
  } catch { return false; }
}

export async function assignClassroomTasks(classroomId: string, levelIds: string[], dueAt?: string, instructions?: string) {
  try {
    const res = await apiFetch(`/api/v1/teacher/classrooms/${encodeURIComponent(classroomId)}/assignments`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ levelIds, dueAt: dueAt || null, instructions }),
    });
    return res.ok;
  } catch { return false; }
}

export async function fetchClassroomReport(classroomId: string) {
  try { const res = await apiFetch(`/api/v1/teacher/classrooms/${encodeURIComponent(classroomId)}/report`); return res.ok ? await res.json() : null; }
  catch { return null; }
}
