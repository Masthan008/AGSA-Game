import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { clerkClient, clerkMiddleware, getAuth } from '@clerk/express';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Admin access is granted ONLY to the Clerk e-mail addresses listed in the
// ADMIN_EMAILS env var (comma separated, e.g. ADMIN_EMAILS=teacher@college.edu).
// If ADMIN_EMAILS is left unset the API runs in dev mode (any signed-in e-mail
// passes) so the dashboard can be tested — secure it before going live.
const adminEmails = (process.env.ADMIN_EMAILS || '')
  .split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
const isAdminEmail = (email?: string): boolean => {
  if (!email) return false;
  if (adminEmails.length === 0) return false;
  return adminEmails.includes(email.trim().toLowerCase());
};
const TOTAL_LEVELS = 38;

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',').map(value => value.trim()).filter(Boolean);
const clerkConfigured = Boolean(process.env.CLERK_SECRET_KEY && process.env.CLERK_PUBLISHABLE_KEY);

app.disable('x-powered-by');
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin is not allowed'));
  },
}));
app.use(express.json({ limit: '256kb' }));
if (clerkConfigured) app.use(clerkMiddleware());

app.use('/api/v1', (req: any, res, next) => {
  if (!clerkConfigured) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(503).json({ error: 'Authentication is not configured' });
    }
    return next();
  }
  const auth = getAuth(req);
  if (!auth.userId) return res.status(401).json({ error: 'Authentication required' });
  req.authenticatedUserId = auth.userId;
  if (!req.path.startsWith('/admin') && req.body && typeof req.body === 'object') {
    req.body.userId = auth.userId;
  }
  const legacyOwnerPath = req.path.match(/^\/(notes|bookmarks|completions)\/([^/]+)/);
  if (legacyOwnerPath && (req.method === 'GET' || legacyOwnerPath[1] === 'completions')) {
    // Preserve old client URLs during migration while making the verified
    // token authoritative. Express performs route matching after this rewrite.
    req.url = req.url.replace(
      `/${legacyOwnerPath[1]}/${legacyOwnerPath[2]}`,
      `/${legacyOwnerPath[1]}/${encodeURIComponent(auth.userId)}`,
    );
  }
  next();
});

const requestOwnerId = (req: any, fallback?: string): string | undefined =>
  req.authenticatedUserId || fallback;

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'ADSA Quest Express Backend with PostgreSQL', timestamp: new Date().toISOString() });
});

// User Sync Endpoint (Prisma PostgreSQL — real DB only)
app.post('/api/v1/user/sync', async (req, res) => {
  const { userId, username, email, xp, levelUnlocked } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    let trustedEmail = email || undefined;
    let trustedUsername = username || 'Student';
    if (clerkConfigured) {
      const clerkUser = await clerkClient.users.getUser(userId);
      trustedEmail = clerkUser.emailAddresses.find(item => item.id === clerkUser.primaryEmailAddressId)?.emailAddress;
      trustedUsername = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || trustedEmail || 'Student';
    }
    const bootstrapAdmin = isAdminEmail(trustedEmail);
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: {
        username: trustedUsername,
        email: trustedEmail,
        role: bootstrapAdmin ? 'admin' : undefined,
        xp: !clerkConfigured && xp !== undefined ? { set: Math.max(xp, 0) } : undefined,
        levelUnlocked: !clerkConfigured && levelUnlocked !== undefined ? { set: Math.max(levelUnlocked, 1) } : undefined,
      },
      create: {
        id: userId,
        username: trustedUsername,
        email: trustedEmail,
        role: bootstrapAdmin ? 'admin' : 'student',
        xp: xp || 0,
        levelUnlocked: levelUnlocked || 1,
      },
      include: {
        progress: true,
        bookmarks: true,
        notes: true,
      }
    });

    return res.json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ error: 'Database unavailable — cannot sync user' });
  }
});

app.get('/api/v1/me', async (req: any, res) => {
  const userId = requestOwnerId(req);
  if (!userId) return res.status(401).json({ error: 'Authentication required' });
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { progress: true, tasks: { orderBy: { assignedAt: 'desc' } }, bookmarks: true, notes: true },
    });
    if (!user) return res.status(404).json({ error: 'Profile not found' });
    return res.json({ user });
  } catch {
    return res.status(500).json({ error: 'Database unavailable — cannot load profile' });
  }
});

app.get('/api/v1/me/tasks', async (req: any, res) => {
  const userId = requestOwnerId(req);
  if (!userId) return res.status(401).json({ error: 'Authentication required' });
  try {
    const tasks = await prisma.task.findMany({ where: { userId }, orderBy: { assignedAt: 'desc' } });
    return res.json({ tasks });
  } catch {
    return res.status(500).json({ error: 'Database unavailable — cannot load assignments' });
  }
});

// Level Completion Endpoint (Prisma PostgreSQL)
app.post('/api/v1/progress/level-complete', async (req, res) => {
  const { userId, levelId, stars } = req.body;

  if (!userId || !levelId) {
    return res.status(400).json({ error: 'userId and levelId are required' });
  }

  try {
    // Record or update level progress in DB
    const awardedStars = Math.min(3, Math.max(Number(stars) || 1, 1));
    const existing = await prisma.levelProgress.findUnique({ where: { userId_levelId: { userId, levelId } } });
    const improvedStars = Math.max(existing?.stars || 0, awardedStars);
    const progress = await prisma.levelProgress.upsert({
      where: { userId_levelId: { userId, levelId } },
      update: { stars: improvedStars },
      create: { userId, levelId, stars: awardedStars },
    });

    // Auto-complete any task (assigned level) the student was given
    try {
      const task = await prisma.task.updateMany({
        where: { userId, levelId, completedAt: null },
        data: { completedAt: new Date() },
      });
      void task;
    } catch { /* task table may not exist yet — ignore */ }

    // Update user total XP and unlock status
    const currentUser = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
    const now = new Date();
    const previousDay = currentUser.lastActiveAt
      ? Date.UTC(currentUser.lastActiveAt.getUTCFullYear(), currentUser.lastActiveAt.getUTCMonth(), currentUser.lastActiveAt.getUTCDate())
      : null;
    const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const dayGap = previousDay === null ? null : Math.round((today - previousDay) / 86400000);
    const streakDays = dayGap === 0 ? currentUser.streakDays : dayGap === 1 ? currentUser.streakDays + 1 : 1;
    const starGain = improvedStars - (existing?.stars || 0);
    const xpGain = existing ? starGain * 10 : awardedStars * 25;
    const levelNumber = Number(levelId.match(/^level-(\d+)-/)?.[1] || 0);
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: xpGain },
        levelUnlocked: levelNumber > 0 ? Math.max(currentUser.levelUnlocked, Math.min(TOTAL_LEVELS, levelNumber + 1)) : currentUser.levelUnlocked,
        streakDays,
        longestStreak: Math.max(currentUser.longestStreak, streakDays),
        lastActiveAt: now,
      },
      include: { progress: true }
    });

    return res.json({ success: true, progress, user: updatedUser });
  } catch (err) {
    return res.status(500).json({ error: 'Database unavailable — cannot record level progress' });
  }
});

// Leaderboard Endpoint (Prisma PostgreSQL)
app.get('/api/v1/leaderboard', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      take: 50,
      orderBy: { xp: 'desc' },
      include: { progress: true }
    });

    const leaderboard = users.map((u, idx) => ({
      rank: idx + 1,
      id: u.id,
      username: u.username,
      xp: u.xp,
      stars: u.progress.reduce((acc, p) => acc + p.stars, 0)
    }));

    return res.json({ leaderboard });
  } catch (err) {
    return res.status(500).json({ error: 'Database unavailable — cannot load leaderboard' });
  }
});

// User Notes API Endpoints
app.get('/api/v1/notes/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const notes = await prisma.userNote.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' }
    });
    res.json({ notes });
  } catch (err) {
    res.json({ notes: [] });
  }
});

app.post('/api/v1/notes', async (req, res) => {
  const { userId, topicId, topicTitle, content } = req.body;
  if (!userId || !topicId || !content) {
    return res.status(400).json({ error: 'userId, topicId, content required' });
  }
  try {
    const note = await prisma.userNote.create({
      data: { userId, topicId, topicTitle: topicTitle || topicId, content }
    });
    res.json({ success: true, note });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create note' });
  }
});

app.delete('/api/v1/notes/:id', async (req: any, res) => {
  const { id } = req.params;
  try {
    const userId = requestOwnerId(req);
    const result = await prisma.userNote.deleteMany({ where: { id, ...(userId ? { userId } : {}) } });
    if (result.count === 0) return res.status(404).json({ error: 'Note not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

app.put('/api/v1/notes/:id', async (req: any, res) => {
  const { id } = req.params;
  const { topicTitle, content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'content required' });
  }
  try {
    const userId = requestOwnerId(req);
    const owned = await prisma.userNote.findFirst({ where: { id, ...(userId ? { userId } : {}) } });
    if (!owned) return res.status(404).json({ error: 'Note not found' });
    const note = await prisma.userNote.update({
      where: { id },
      data: { topicTitle: topicTitle || undefined, content }
    });
    res.json({ success: true, note });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// User Bookmarks API Endpoints
app.get('/api/v1/bookmarks/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ bookmarks });
  } catch (err) {
    res.json({ bookmarks: [] });
  }
});

app.post('/api/v1/bookmarks', async (req, res) => {
  const { userId, topicId, topicTitle, note } = req.body;
  if (!userId || !topicId) {
    return res.status(400).json({ error: 'userId and topicId required' });
  }
  try {
    const bookmark = await prisma.bookmark.create({
      data: { userId, topicId, topicTitle: topicTitle || topicId, note }
    });
    res.json({ success: true, bookmark });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create bookmark' });
  }
});

app.delete('/api/v1/bookmarks/:id', async (req: any, res) => {
  const { id } = req.params;
  try {
    const userId = requestOwnerId(req);
    const result = await prisma.bookmark.deleteMany({ where: { id, ...(userId ? { userId } : {}) } });
    if (result.count === 0) return res.status(404).json({ error: 'Bookmark not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete bookmark' });
  }
});

// Puzzle / Question / Flashcard Completion Tracking
app.get('/api/v1/completions/:userId', async (req, res) => {
  const { userId } = req.params;
  const { type } = req.query;
  try {
    const completions = await prisma.puzzleCompletion.findMany({
      where: { userId, ...(type ? { puzzleType: String(type) } : {}) },
      orderBy: { completedAt: 'asc' }
    });
    res.json({ completions });
  } catch (err) {
    res.json({ completions: [] });
  }
});

app.post('/api/v1/completions', async (req, res) => {
  const { userId, puzzleId, puzzleType } = req.body;
  if (!userId || !puzzleId) {
    return res.status(400).json({ error: 'userId and puzzleId required' });
  }
  try {
    const completion = await prisma.puzzleCompletion.upsert({
      where: { userId_puzzleId: { userId, puzzleId } },
      update: {},
      create: { userId, puzzleId, puzzleType: puzzleType || 'quiz' }
    });
    res.json({ success: true, completion });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record completion' });
  }
});

app.delete('/api/v1/completions/:userId/:puzzleId', async (req, res) => {
  const { userId, puzzleId } = req.params;
  try {
    await prisma.puzzleCompletion.deleteMany({ where: { userId, puzzleId } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove completion' });
  }
});

// ============================================================================
// ADMIN API — reachable only via the direct /#/admin URL in the app. Access is
// granted when the signed-in e-mail is in the ADMIN_EMAILS allow-list OR the
// account's stored role is "admin" (set at sign-up via the role picker).
// All data comes straight from PostgreSQL — no mock data is ever returned.
// ============================================================================

const adminGate = async (req: any, res: any): Promise<boolean> => {
  if (!clerkConfigured) {
    res.status(503).json({ error: 'Admin authentication is not configured' });
    return false;
  }
  const auth = getAuth(req);
  if (!auth.userId) {
    res.status(401).json({ error: 'Authentication required' });
    return false;
  }
  try {
    const user = await prisma.user.findUnique({ where: { id: auth.userId } });
    if (user && (user.role === 'admin' || isAdminEmail(user.email || undefined))) return true;
  } catch { /* DB down — fall through to deny */ }
  res.status(403).json({ error: 'Access denied — admin account required', code: 'ADMIN_ROLE_REQUIRED' });
  return false;
};

const buildStudentRow = (u: any) => {
  const completions = u.completions || [];
  const quizItems = completions.filter((c: any) => c.puzzleType === 'quiz');
  const practiceItems = completions.filter((c: any) => c.puzzleType === 'practice');
  const flashItems = completions.filter((c: any) => c.puzzleType === 'flashcard');
  const tasks = u.tasks || [];
  const done = tasks.filter((t: any) => t.completedAt).length;
  return {
    id: u.id,
    username: u.username || 'Student',
    email: u.email || null,
    role: u.role || 'student',
    imageUrl: u.imageUrl || null,
    xp: u.xp || 0,
    levelUnlocked: u.levelUnlocked || 1,
    streakDays: u.streakDays || 0,
    createdAt: u.createdAt,
    levels: {
      total: TOTAL_LEVELS,
      completed: (u.progress || []).length,
      stars: (u.progress || []).reduce((a: number, p: any) => a + (p.stars || 0), 0),
      progress: u.progress || [],
    },
    quizzes: {
      completed: quizItems.length,
      items: quizItems.map((c: any) => ({ puzzleId: c.puzzleId, completedAt: c.completedAt })),
    },
    practice: {
      sessions: practiceItems.length,
      items: practiceItems.map((c: any) => ({ puzzleId: c.puzzleId, completedAt: c.completedAt })),
      flashcards: flashItems.length,
    },
    tasks: {
      given: tasks.length,
      completed: done,
      pending: tasks.length - done,
      items: tasks.map((t: any) => ({ id: t.id, levelId: t.levelId, assignedAt: t.assignedAt, completedAt: t.completedAt })),
    },
    notes: (u.notes || []).length,
    bookmarks: (u.bookmarks || []).length,
  };
};

// Full student overview for the admin dashboard (live PostgreSQL data)
app.get('/api/v1/admin/students', async (req, res) => {
  if (!(await adminGate(req, res))) return;
  try {
    const users = await prisma.user.findMany({
      include: { progress: true, completions: true, tasks: true, bookmarks: true, notes: true },
      orderBy: { xp: 'desc' },
    });
    const students = users.map(buildStudentRow);
    const allTasks = students.reduce((a: any, s: any) => a.concat(s.tasks.items), []);
    return res.json({
      success: true,
      devMode: adminEmails.length === 0,
      totalLevels: TOTAL_LEVELS,
      totals: {
        students: students.length,
        tasksGiven: allTasks.length,
        tasksCompleted: allTasks.filter((t: any) => t.completedAt).length,
        tasksPending: allTasks.filter((t: any) => !t.completedAt).length,
        quizCompletions: students.reduce((a: any, s: any) => a + s.quizzes.completed, 0),
        practiceSessions: students.reduce((a: any, s: any) => a + s.practice.sessions, 0),
        levelsCompleted: students.reduce((a: any, s: any) => a + s.levels.completed, 0),
      },
      students,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Database unavailable — cannot load student data' });
  }
});

// Assign levels as tasks to a student (upsert per user+level)
app.post('/api/v1/admin/tasks', async (req, res) => {
  if (!(await adminGate(req, res))) return;
  const { userId, levelIds } = req.body;
  if (!userId || !Array.isArray(levelIds) || levelIds.length === 0) {
    return res.status(400).json({ error: 'userId and levelIds[] required' });
  }
  try {
    const created: any[] = [];
    for (const levelId of levelIds) {
      const task = await prisma.task.upsert({
        where: { userId_levelId: { userId, levelId } },
        update: {},
        create: { userId, levelId },
      });
      created.push(task);
    }
    res.json({ success: true, tasks: created });
  } catch (err) {
    return res.status(500).json({ error: 'Database unavailable — cannot assign tasks' });
  }
});

// All tasks across students (optionally filtered by student)
app.get('/api/v1/admin/tasks', async (req, res) => {
  if (!(await adminGate(req, res))) return;
  const { userId } = req.query;
  try {
    const tasks = await prisma.task.findMany({
      where: userId ? { userId: String(userId) } : {},
      orderBy: { assignedAt: 'desc' },
    });
    res.json({ success: true, tasks });
  } catch (err) {
    return res.status(500).json({ error: 'Database unavailable — cannot load tasks' });
  }
});

app.delete('/api/v1/admin/tasks/:id', async (req, res) => {
  if (!(await adminGate(req, res))) return;
  const { id } = req.params;
  try {
    await prisma.task.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove task' });
  }
});

app.listen(PORT, () => {
  console.log(`⚡ ADSA Quest Backend Server with PostgreSQL running on http://localhost:${PORT}`);
});
