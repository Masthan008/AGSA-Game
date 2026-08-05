import { UserProgress } from '../types';

const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';

// ============================================================================
// Authenticated API client — the backend requires a valid Clerk session on
// every /api/v1 call. The App component registers a token provider (Clerk's
// getToken()) and every request below attaches it automatically as a Bearer
// token. Server responses are normalized: { ok: true, ...data } on success,
// { ok: false, error } on failure.
// ============================================================================

type TokenProvider = () => Promise<string | null>;
let tokenProvider: TokenProvider | null = null;

export const setApiTokenProvider = (provider: TokenProvider | null) => {
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
  const headers = await withAuth({ ...((init.headers as Record<string, string>) || {}) });
  try {
    const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return { ok: false, status: res.status, error: data?.error || { code: `HTTP_${res.status}`, message: `Request failed (${res.status})` } };
    }
    if (data && typeof data === 'object') return { ...data, ok: true };
    return data;
  } catch (err) {
    console.warn('Backend request failed:', path, err);
    return { ok: false, error: { code: 'NETWORK_ERROR', message: 'Could not reach the backend' } };
  }
};

// ── Offline mutation queue ────────────────────────────────────────────────
// Mutations are appended to localStorage while offline and replayed when the
// browser goes back online (see App.tsx 'online' listener).
const QUEUE_KEY = 'adsa_quest_offline_queue';

export const enqueueOfflineMutation = (method: string, path: string, body?: unknown) => {
  try {
    const queue = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
    queue.push({ method, path, body });
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch { /* storage unavailable — drop the mutation */ }
};

export async function flushPendingMutations(): Promise<void> {
  let queue: any[] = [];
  try {
    queue = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
  } catch { return; }
  if (queue.length === 0) return;
  const remaining: any[] = [];
  for (const mutation of queue) {
    const result = await request(mutation.path, {
      method: mutation.method,
      headers: { 'Content-Type': 'application/json' },
      body: mutation.body ? JSON.stringify(mutation.body) : undefined,
    });
    if (!result?.ok) remaining.push(mutation);
  }
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
  } catch { /* ignore */ }
}

export async function checkServerHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch (err) {
    return { status: 'offline' };
  }
}

// ── Identity & progress ────────────────────────────────────────────────────

export async function syncUserProfile(userProgress: UserProgress, email?: string, role: 'student' | 'admin' = 'student') {
  return request('/api/v1/user/sync', {
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
}

export async function fetchMyProfile(): Promise<any | null> {
  const data = await request('/api/v1/me');
  return data?.ok ? data.user : null;
}

export async function importGuestProgress(userProgress: UserProgress): Promise<any | null> {
  const data = await request('/api/v1/me/import-guest-progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      starsPerLevel: userProgress.starsPerLevel,
      completedLevels: userProgress.completedLevels,
    }),
  });
  return data?.ok ? data : null;
}

export async function fetchMyTasks() {
  const data = await request('/api/v1/me/tasks');
  return data?.ok ? data.tasks : [];
}

export async function recordLevelCompletion(userId: string, levelId: string, stars: number, earnedXp: number) {
  return request('/api/v1/progress/level-complete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': `lc-${levelId}-${Date.now()}`,
    },
    body: JSON.stringify({ userId, levelId, stars, earnedXp }),
  });
}

export async function fetchLeaderboard() {
  const data = await request('/api/v1/leaderboard');
  return data?.ok ? data.leaderboard : [];
}

// ── Quiz attempts & mistakes ───────────────────────────────────────────────

export async function recordQuizAttempt(attempt: { puzzleId: string; levelId: string; selectedIndex: number; correct: boolean; hintUsed: boolean }) {
  return request('/api/v1/me/quiz-attempts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(attempt),
  });
}

export async function fetchMistakes() {
  const data = await request('/api/v1/me/mistakes');
  return data?.ok ? data.mistakes : [];
}

// ── Flashcard scheduling ───────────────────────────────────────────────────

export async function fetchFlashcardReviews() {
  const data = await request('/api/v1/me/flashcard-reviews');
  return data?.ok ? { reviews: data.reviews || [], dueCardIds: data.dueCardIds || [] } : { reviews: [], dueCardIds: [] };
}

export async function rateFlashcard(cardId: string, rating: 'again' | 'hard' | 'good' | 'easy') {
  const data = await request('/api/v1/me/flashcard-reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cardId, rating }),
  });
  return data?.ok ? data.review : null;
}

// ── Notes ──────────────────────────────────────────────────────────────────

export async function fetchUserNotes(userId: string) {
  const data = await request(`/api/v1/notes/${encodeURIComponent(userId)}`);
  return data?.ok ? data.notes : [];
}

export async function createNote(userId: string, topicId: string, topicTitle: string, content: string) {
  return request('/api/v1/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, topicId, topicTitle, content }),
  });
}

export async function deleteNote(noteId: string) {
  const data = await request(`/api/v1/notes/${noteId}`, { method: 'DELETE' });
  return data?.ok ? true : false;
}

export async function updateNote(noteId: string, topicTitle: string, content: string) {
  return request(`/api/v1/notes/${noteId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topicTitle, content }),
  });
}

// ── Bookmarks ──────────────────────────────────────────────────────────────

export async function fetchUserBookmarks(userId: string) {
  const data = await request(`/api/v1/bookmarks/${encodeURIComponent(userId)}`);
  return data?.ok ? data.bookmarks : [];
}

export async function createBookmark(userId: string, topicId: string, topicTitle: string, note?: string) {
  return request('/api/v1/bookmarks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, topicId, topicTitle, note }),
  });
}

export async function deleteBookmark(bookmarkId: string) {
  const data = await request(`/api/v1/bookmarks/${bookmarkId}`, { method: 'DELETE' });
  return data?.ok ? true : false;
}

// ── Completions (quiz / flashcard / practice) ──────────────────────────────

export type CompletionType = 'quiz' | 'flashcard' | 'practice';

export async function fetchUserCompletions(userId: string, type?: CompletionType) {
  const url = type
    ? `/api/v1/completions/${encodeURIComponent(userId)}?type=${type}`
    : `/api/v1/completions/${encodeURIComponent(userId)}`;
  const data = await request(url);
  return data?.ok ? data.completions : [];
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

// ── Admin dashboard ────────────────────────────────────────────────────────

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

// ── Teacher classrooms ─────────────────────────────────────────────────────

export async function createTeacherClassroom(name: string) {
  const data = await request('/api/v1/teacher/classrooms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  return data?.ok ? data : null;
}

export async function fetchTeacherClassrooms() {
  const data = await request('/api/v1/teacher/classrooms');
  return data?.ok ? data.classrooms : [];
}

export async function addClassroomMember(classroomId: string, userId: string) {
  const data = await request(`/api/v1/teacher/classrooms/${classroomId}/members`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  return data?.ok ? data : null;
}

export async function assignClassroomTasks(classroomId: string, levelIds: string[], dueAt?: string, instructions?: string) {
  const data = await request(`/api/v1/teacher/classrooms/${classroomId}/assignments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ levelIds, dueAt: dueAt || null, instructions }),
  });
  return data?.ok ? data : null;
}

export async function fetchClassroomReport(classroomId: string) {
  const data = await request(`/api/v1/teacher/classrooms/${classroomId}/report`);
  return data?.ok ? data : null;
}

export async function fetchStudentWeakSkills(studentId: string) {
  const data = await request(`/api/v1/teacher/students/${encodeURIComponent(studentId)}/weak-skills`);
  return data?.ok ? data : null;
}

export async function createTreeAssignment(payload: any) {
  const data = await request('/api/v1/teacher/tree-assignments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return data?.ok ? data : null;
}

// ── Tree learning lab (student side) ───────────────────────────────────────

export async function fetchMyTreeAssignments() {
  const data = await request('/api/v1/me/tree-assignments');
  return data?.ok ? data.assignments : [];
}

export async function submitTreeAssignment(assignmentId: string, finalState: unknown, hintsUsed: number, durationMs: number, steps: any[]) {
  const data = await request(`/api/v1/me/tree-assignments/${assignmentId}/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': `tree-${assignmentId}-${Date.now()}`,
    },
    body: JSON.stringify({ finalState, hintsUsed, durationMs, steps }),
  });
  if (!data?.ok) return { ok: false, error: data?.error || { message: 'Submission was not accepted' } };
  return { ok: true, submission: data.submission, assessment: data.assessment, xpAwarded: data.xpAwarded || 0 };
}
