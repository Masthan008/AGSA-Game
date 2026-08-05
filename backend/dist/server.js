import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { clerkClient, clerkMiddleware, getAuth } from '@clerk/express';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { z } from 'zod';
import { randomBytes, randomUUID } from 'node:crypto';
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
const isAdminEmail = (email) => {
    if (!email)
        return false;
    if (adminEmails.length === 0)
        return false;
    return adminEmails.includes(email.trim().toLowerCase());
};
const TOTAL_LEVELS = 38;
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
    .split(',').map(value => value.trim()).filter(Boolean);
const clerkConfigured = Boolean(process.env.CLERK_SECRET_KEY && process.env.CLERK_PUBLISHABLE_KEY);
app.disable('x-powered-by');
app.use((req, res, next) => {
    const supplied = req.header('x-request-id');
    const requestId = supplied && /^[a-zA-Z0-9._:-]{8,128}$/.test(supplied) ? supplied : randomUUID();
    req.requestId = requestId;
    res.setHeader('x-request-id', requestId);
    const startedAt = Date.now();
    res.on('finish', () => {
        const event = { level: res.statusCode >= 500 ? 'error' : 'info', requestId, method: req.method, path: req.path, status: res.statusCode, durationMs: Date.now() - startedAt };
        console.log(JSON.stringify(event));
    });
    next();
});
app.use((req, res, next) => {
    const sendJson = res.json.bind(res);
    res.json = ((body) => {
        if (res.statusCode >= 400 && body?.error) {
            if (typeof body.error === 'string')
                body = { error: { code: body.code || 'REQUEST_FAILED', message: body.error, requestId: req.requestId } };
            else if (!body.error.requestId)
                body = { ...body, error: { ...body.error, requestId: req.requestId } };
        }
        return sendJson(body);
    });
    next();
});
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin))
            return callback(null, true);
        return callback(new Error('Origin is not allowed'));
    },
}));
app.use(express.json({ limit: '256kb' }));
app.use('/api', rateLimit({
    windowMs: 60_000,
    limit: process.env.NODE_ENV === 'test' ? 10_000 : 180,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: { code: 'RATE_LIMITED', message: 'Too many requests. Please retry shortly.' } },
}));
if (clerkConfigured)
    app.use(clerkMiddleware());
app.use('/api/v1', (req, res, next) => {
    if (!clerkConfigured) {
        if (process.env.NODE_ENV === 'production') {
            return res.status(503).json({ error: 'Authentication is not configured' });
        }
        return next();
    }
    const auth = getAuth(req);
    if (!auth.userId)
        return res.status(401).json({ error: 'Authentication required' });
    req.authenticatedUserId = auth.userId;
    if (!req.path.startsWith('/admin') && !req.path.startsWith('/teacher') && req.body && typeof req.body === 'object') {
        req.body.userId = auth.userId;
    }
    const legacyOwnerPath = req.path.match(/^\/(notes|bookmarks|completions)\/([^/]+)/);
    if (legacyOwnerPath && (req.method === 'GET' || legacyOwnerPath[1] === 'completions')) {
        // Preserve old client URLs during migration while making the verified
        // token authoritative. Express performs route matching after this rewrite.
        req.url = req.url.replace(`/${legacyOwnerPath[1]}/${legacyOwnerPath[2]}`, `/${legacyOwnerPath[1]}/${encodeURIComponent(auth.userId)}`);
    }
    next();
});
const requestOwnerId = (req, fallback) => req.authenticatedUserId || fallback;
const apiError = (req, res, status, code, message, details) => res.status(status).json({ error: { code, message, requestId: req.requestId, ...(details === undefined ? {} : { details }) } });
const pageSize = (value, fallback = 25) => Math.min(100, Math.max(1, Number(value) || fallback));
const writeAudit = async (actorId, action, targetType, targetId, metadata, db = prisma) => {
    await db.auditLog.create({ data: { actorId, action, targetType, targetId, metadata } });
};
const validateBody = (schema) => (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            error: { code: 'INVALID_REQUEST', message: 'Request validation failed', details: parsed.error.flatten() },
        });
    }
    req.body = parsed.data;
    next();
};
const userSyncSchema = z.object({
    userId: z.string().min(1).max(200), username: z.string().trim().min(1).max(80).optional(),
    email: z.string().email().max(254).nullable().optional(), role: z.enum(['student', 'admin']).optional(),
    xp: z.number().int().min(0).max(10_000_000).optional(), levelUnlocked: z.number().int().min(1).max(TOTAL_LEVELS).optional(),
    starsPerLevel: z.record(z.string(), z.number().int().min(0).max(3)).optional(), completedLevels: z.array(z.string().max(100)).max(TOTAL_LEVELS).optional(),
});
const levelCompleteSchema = z.object({ userId: z.string().min(1).max(200), levelId: z.string().regex(/^level-\d+-[a-z0-9-]+$/), stars: z.number().int().min(1).max(3), earnedXp: z.number().optional() });
const noteSchema = z.object({ userId: z.string().min(1).max(200), topicId: z.string().trim().min(1).max(120), topicTitle: z.string().trim().max(160).optional(), content: z.string().trim().min(1).max(50_000) });
const noteUpdateSchema = noteSchema.pick({ topicTitle: true, content: true });
const bookmarkSchema = z.object({ userId: z.string().min(1).max(200), topicId: z.string().trim().min(1).max(120), topicTitle: z.string().trim().max(160).optional(), note: z.string().trim().max(2_000).optional() });
const completionSchema = z.object({ userId: z.string().min(1).max(200), puzzleId: z.string().trim().min(1).max(200), puzzleType: z.enum(['quiz', 'flashcard', 'practice']).default('quiz') });
const assignmentSchema = z.object({ userId: z.string().min(1).max(200), levelIds: z.array(z.string().regex(/^level-\d+-[a-z0-9-]+$/)).min(1).max(TOTAL_LEVELS) });
const guestProgressSchema = z.object({
    starsPerLevel: z.record(z.string().regex(/^level-\d+-[a-z0-9-]+$/), z.number().int().min(0).max(3)),
    completedLevels: z.array(z.string().regex(/^level-\d+-[a-z0-9-]+$/)).max(TOTAL_LEVELS),
});
const classroomSchema = z.object({ name: z.string().trim().min(2).max(100) });
const classroomMemberSchema = z.object({ userId: z.string().min(1).max(200) });
const classroomAssignmentSchema = z.object({
    levelIds: z.array(z.string().regex(/^level-\d+-[a-z0-9-]+$/)).min(1).max(TOTAL_LEVELS),
    dueAt: z.string().datetime().nullable().optional(), instructions: z.string().trim().max(2_000).optional(),
});
const quizAttemptSchema = z.object({
    puzzleId: z.string().trim().min(1).max(200), levelId: z.string().regex(/^level-\d+-[a-z0-9-]+$/),
    selectedIndex: z.number().int().min(0).max(10), correct: z.boolean(), hintUsed: z.boolean().default(false),
});
const flashcardReviewSchema = z.object({ cardId: z.string().regex(/^fc-\d+$/), rating: z.enum(['again', 'hard', 'good', 'easy']) });
const awardAchievements = async (userId, db = prisma) => {
    const user = await db.user.findUnique({ where: { id: userId }, include: { progress: true } });
    if (!user)
        return [];
    const badges = [];
    if (user.progress.length >= 1)
        badges.push('first-lesson');
    if (user.progress.some((item) => item.stars === 3))
        badges.push('perfect-score');
    if (user.progress.length >= 5)
        badges.push('five-levels');
    if (user.progress.length >= 10)
        badges.push('ten-levels');
    if (user.streakDays >= 3)
        badges.push('three-day-streak');
    if (user.streakDays >= 7)
        badges.push('week-warrior');
    await Promise.all(badges.map(badgeKey => db.userAchievement.upsert({
        where: { userId_badgeKey: { userId, badgeKey } }, update: {}, create: { userId, badgeKey },
    })));
    return db.userAchievement.findMany({ where: { userId }, orderBy: { unlockedAt: 'asc' } });
};
// Health Check Endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'ADSA Quest Express Backend with PostgreSQL', timestamp: new Date().toISOString(), requestId: req.requestId });
});
// User Sync Endpoint (Prisma PostgreSQL — real DB only)
app.post('/api/v1/user/sync', validateBody(userSyncSchema), async (req, res) => {
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
    }
    catch (err) {
        return res.status(500).json({ error: 'Database unavailable — cannot sync user' });
    }
});
app.get('/api/v1/me', async (req, res) => {
    const userId = requestOwnerId(req);
    if (!userId)
        return res.status(401).json({ error: 'Authentication required' });
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { progress: true, tasks: { orderBy: { assignedAt: 'desc' } }, bookmarks: true, notes: true, achievements: true },
        });
        if (!user)
            return res.status(404).json({ error: 'Profile not found' });
        return res.json({ user });
    }
    catch {
        return res.status(500).json({ error: 'Database unavailable — cannot load profile' });
    }
});
app.get('/api/v1/me/tasks', async (req, res) => {
    const userId = requestOwnerId(req);
    if (!userId)
        return res.status(401).json({ error: 'Authentication required' });
    try {
        const tasks = await prisma.task.findMany({ where: { userId }, orderBy: { assignedAt: 'desc' } });
        return res.json({ tasks });
    }
    catch {
        return res.status(500).json({ error: 'Database unavailable — cannot load assignments' });
    }
});
app.post('/api/v1/me/import-guest-progress', validateBody(guestProgressSchema), async (req, res) => {
    const userId = requestOwnerId(req);
    if (!userId)
        return res.status(401).json({ error: 'Authentication required' });
    try {
        const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
        if (user.guestMigratedAt)
            return res.status(409).json({ error: { code: 'ALREADY_IMPORTED', message: 'Guest progress was already imported' } });
        const completed = [...new Set(req.body.completedLevels)].slice(0, TOTAL_LEVELS);
        await prisma.$transaction(async (tx) => {
            for (const levelId of completed) {
                const stars = Math.min(3, Math.max(req.body.starsPerLevel[levelId] || 1, 1));
                await tx.levelProgress.upsert({
                    where: { userId_levelId: { userId, levelId } },
                    update: { stars: { set: stars } },
                    create: { userId, levelId, stars },
                });
            }
            const maxLevel = completed.reduce((max, id) => Math.max(max, Number(id.match(/^level-(\d+)-/)?.[1] || 0)), 0);
            const importedXp = completed.reduce((sum, id) => sum + Math.max(1, req.body.starsPerLevel[id] || 1) * 25, 0);
            await tx.user.update({
                where: { id: userId },
                data: {
                    xp: Math.max(user.xp, importedXp),
                    levelUnlocked: Math.max(user.levelUnlocked, Math.min(TOTAL_LEVELS, maxLevel + 1)),
                    guestMigratedAt: new Date(),
                },
            });
        });
        return res.json({ success: true });
    }
    catch {
        return res.status(500).json({ error: 'Unable to import guest progress' });
    }
});
app.post('/api/v1/me/quiz-attempts', validateBody(quizAttemptSchema), async (req, res) => {
    const userId = requestOwnerId(req);
    if (!userId)
        return res.status(401).json({ error: 'Authentication required' });
    const attempt = await prisma.quizAttempt.create({ data: { userId, ...req.body } });
    res.status(201).json({ attempt });
});
app.get('/api/v1/me/mistakes', async (req, res) => {
    const userId = requestOwnerId(req);
    if (!userId)
        return res.status(401).json({ error: 'Authentication required' });
    const attempts = await prisma.quizAttempt.findMany({ where: { userId }, orderBy: { attemptedAt: 'desc' }, take: 1000 });
    const latest = new Map();
    for (const attempt of attempts)
        if (!latest.has(attempt.puzzleId))
            latest.set(attempt.puzzleId, attempt);
    res.json({ mistakes: [...latest.values()].filter(attempt => !attempt.correct) });
});
app.get('/api/v1/me/flashcard-reviews', async (req, res) => {
    const userId = requestOwnerId(req);
    if (!userId)
        return res.status(401).json({ error: 'Authentication required' });
    const reviews = await prisma.flashcardReview.findMany({ where: { userId }, orderBy: { nextReviewAt: 'asc' } });
    res.json({ reviews, dueCardIds: reviews.filter(review => review.nextReviewAt <= new Date()).map(review => review.cardId) });
});
app.post('/api/v1/me/flashcard-reviews', validateBody(flashcardReviewSchema), async (req, res) => {
    const userId = requestOwnerId(req);
    if (!userId)
        return res.status(401).json({ error: 'Authentication required' });
    const previous = await prisma.flashcardReview.findUnique({ where: { userId_cardId: { userId, cardId: req.body.cardId } } });
    const rating = req.body.rating;
    const currentInterval = previous?.intervalDays || 0;
    const intervalDays = rating === 'again' ? 0 : rating === 'hard' ? Math.max(1, Math.round(currentInterval * 1.2) || 1) : rating === 'good' ? Math.max(2, Math.round(currentInterval * (previous?.ease || 2.5)) || 2) : Math.max(4, Math.round(currentInterval * 3) || 4);
    const ease = Math.max(1.3, Math.min(3, (previous?.ease || 2.5) + (rating === 'easy' ? .15 : rating === 'hard' ? -.15 : rating === 'again' ? -.25 : 0)));
    const now = new Date(), nextReviewAt = new Date(now.getTime() + (rating === 'again' ? 10 * 60_000 : intervalDays * 86_400_000));
    const review = await prisma.flashcardReview.upsert({
        where: { userId_cardId: { userId, cardId: req.body.cardId } },
        update: { intervalDays, ease, nextReviewAt, reviewedAt: now, lastRating: rating },
        create: { userId, cardId: req.body.cardId, intervalDays, ease, nextReviewAt, reviewedAt: now, lastRating: rating },
    });
    res.json({ review });
});
// Level Completion Endpoint (Prisma PostgreSQL)
app.post('/api/v1/progress/level-complete', validateBody(levelCompleteSchema), async (req, res) => {
    const { userId, levelId, stars } = req.body;
    const idempotencyKey = req.header('idempotency-key');
    if (!idempotencyKey || !/^[a-zA-Z0-9._:-]{8,128}$/.test(idempotencyKey))
        return apiError(req, res, 400, 'IDEMPOTENCY_KEY_REQUIRED', 'A valid Idempotency-Key header is required');
    try {
        const replay = await prisma.idempotencyRecord.findUnique({ where: { userId_key: { userId, key: idempotencyKey } } });
        if (replay)
            return res.status(replay.statusCode).json(replay.responseJson);
        const response = await prisma.$transaction(async (tx) => {
            // Record or update level progress in DB
            const awardedStars = Math.min(3, Math.max(Number(stars) || 1, 1));
            const existing = await tx.levelProgress.findUnique({ where: { userId_levelId: { userId, levelId } } });
            const improvedStars = Math.max(existing?.stars || 0, awardedStars);
            const progress = await tx.levelProgress.upsert({
                where: { userId_levelId: { userId, levelId } },
                update: { stars: improvedStars },
                create: { userId, levelId, stars: awardedStars },
            });
            // Auto-complete any task (assigned level) the student was given
            try {
                const task = await tx.task.updateMany({
                    where: { userId, levelId, completedAt: null },
                    data: { completedAt: new Date() },
                });
                void task;
            }
            catch { /* task table may not exist yet — ignore */ }
            // Update user total XP and unlock status
            const currentUser = await tx.user.findUniqueOrThrow({ where: { id: userId } });
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
            const updatedUser = await tx.user.update({
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
            const achievements = await awardAchievements(userId, tx);
            const result = { success: true, progress, user: { ...updatedUser, achievements } };
            await tx.idempotencyRecord.create({ data: { userId, key: idempotencyKey, operation: 'level-complete', responseJson: result, expiresAt: new Date(Date.now() + 7 * 86400000) } });
            return result;
        });
        return res.json(response);
    }
    catch (err) {
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
    }
    catch (err) {
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
    }
    catch (err) {
        res.json({ notes: [] });
    }
});
app.post('/api/v1/notes', validateBody(noteSchema), async (req, res) => {
    const { userId, topicId, topicTitle, content } = req.body;
    if (!userId || !topicId || !content) {
        return res.status(400).json({ error: 'userId, topicId, content required' });
    }
    try {
        const note = await prisma.userNote.create({
            data: { userId, topicId, topicTitle: topicTitle || topicId, content }
        });
        res.json({ success: true, note });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create note' });
    }
});
app.delete('/api/v1/notes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const userId = requestOwnerId(req);
        const result = await prisma.userNote.deleteMany({ where: { id, ...(userId ? { userId } : {}) } });
        if (result.count === 0)
            return res.status(404).json({ error: 'Note not found' });
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to delete note' });
    }
});
app.put('/api/v1/notes/:id', validateBody(noteUpdateSchema), async (req, res) => {
    const { id } = req.params;
    const { topicTitle, content } = req.body;
    if (!content) {
        return res.status(400).json({ error: 'content required' });
    }
    try {
        const userId = requestOwnerId(req);
        const owned = await prisma.userNote.findFirst({ where: { id, ...(userId ? { userId } : {}) } });
        if (!owned)
            return res.status(404).json({ error: 'Note not found' });
        const note = await prisma.userNote.update({
            where: { id },
            data: { topicTitle: topicTitle || undefined, content }
        });
        res.json({ success: true, note });
    }
    catch (err) {
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
    }
    catch (err) {
        res.json({ bookmarks: [] });
    }
});
app.post('/api/v1/bookmarks', validateBody(bookmarkSchema), async (req, res) => {
    const { userId, topicId, topicTitle, note } = req.body;
    if (!userId || !topicId) {
        return res.status(400).json({ error: 'userId and topicId required' });
    }
    try {
        const bookmark = await prisma.bookmark.create({
            data: { userId, topicId, topicTitle: topicTitle || topicId, note }
        });
        res.json({ success: true, bookmark });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create bookmark' });
    }
});
app.delete('/api/v1/bookmarks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const userId = requestOwnerId(req);
        const result = await prisma.bookmark.deleteMany({ where: { id, ...(userId ? { userId } : {}) } });
        if (result.count === 0)
            return res.status(404).json({ error: 'Bookmark not found' });
        res.json({ success: true });
    }
    catch (err) {
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
    }
    catch (err) {
        res.json({ completions: [] });
    }
});
app.post('/api/v1/completions', validateBody(completionSchema), async (req, res) => {
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
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to record completion' });
    }
});
app.delete('/api/v1/completions/:userId/:puzzleId', async (req, res) => {
    const { userId, puzzleId } = req.params;
    try {
        await prisma.puzzleCompletion.deleteMany({ where: { userId, puzzleId } });
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to remove completion' });
    }
});
// ============================================================================
// ADMIN API — reachable only via the direct /#/admin URL in the app. Access is
// granted when the signed-in e-mail is in the ADMIN_EMAILS allow-list OR the
// account's stored role is "admin" (set at sign-up via the role picker).
// All data comes straight from PostgreSQL — no mock data is ever returned.
// ============================================================================
const adminGate = async (req, res) => {
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
        if (user && (user.role === 'admin' || isAdminEmail(user.email || undefined)))
            return true;
    }
    catch { /* DB down — fall through to deny */ }
    res.status(403).json({ error: 'Access denied — admin account required', code: 'ADMIN_ROLE_REQUIRED' });
    return false;
};
const buildStudentRow = (u) => {
    const completions = u.completions || [];
    const quizItems = completions.filter((c) => c.puzzleType === 'quiz');
    const practiceItems = completions.filter((c) => c.puzzleType === 'practice');
    const flashItems = completions.filter((c) => c.puzzleType === 'flashcard');
    const tasks = u.tasks || [];
    const done = tasks.filter((t) => t.completedAt).length;
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
            stars: (u.progress || []).reduce((a, p) => a + (p.stars || 0), 0),
            progress: u.progress || [],
        },
        quizzes: {
            completed: quizItems.length,
            items: quizItems.map((c) => ({ puzzleId: c.puzzleId, completedAt: c.completedAt })),
        },
        practice: {
            sessions: practiceItems.length,
            items: practiceItems.map((c) => ({ puzzleId: c.puzzleId, completedAt: c.completedAt })),
            flashcards: flashItems.length,
        },
        tasks: {
            given: tasks.length,
            completed: done,
            pending: tasks.length - done,
            items: tasks.map((t) => ({ id: t.id, levelId: t.levelId, assignedAt: t.assignedAt, completedAt: t.completedAt })),
        },
        notes: (u.notes || []).length,
        bookmarks: (u.bookmarks || []).length,
    };
};
// Full student overview for the admin dashboard (live PostgreSQL data)
app.get('/api/v1/admin/students', async (req, res) => {
    if (!(await adminGate(req, res)))
        return;
    try {
        const limit = pageSize(req.query.limit);
        const cursor = typeof req.query.cursor === 'string' ? req.query.cursor : undefined;
        const search = typeof req.query.search === 'string' ? req.query.search.trim().slice(0, 80) : '';
        const users = await prisma.user.findMany({
            where: search ? { OR: [{ username: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }] } : undefined,
            include: { progress: true, completions: true, tasks: true, bookmarks: true, notes: true },
            orderBy: { id: 'asc' }, take: limit + 1, ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
        });
        const hasMore = users.length > limit;
        const page = hasMore ? users.slice(0, limit) : users;
        const students = page.map(buildStudentRow);
        const allTasks = students.reduce((a, s) => a.concat(s.tasks.items), []);
        return res.json({
            success: true,
            devMode: adminEmails.length === 0,
            totalLevels: TOTAL_LEVELS,
            totals: {
                students: students.length,
                tasksGiven: allTasks.length,
                tasksCompleted: allTasks.filter((t) => t.completedAt).length,
                tasksPending: allTasks.filter((t) => !t.completedAt).length,
                quizCompletions: students.reduce((a, s) => a + s.quizzes.completed, 0),
                practiceSessions: students.reduce((a, s) => a + s.practice.sessions, 0),
                levelsCompleted: students.reduce((a, s) => a + s.levels.completed, 0),
            },
            students,
            page: { limit, nextCursor: hasMore ? page.at(-1)?.id ?? null : null },
        });
    }
    catch (err) {
        return res.status(500).json({ error: 'Database unavailable — cannot load student data' });
    }
});
// Assign levels as tasks to a student (upsert per user+level)
app.post('/api/v1/admin/tasks', validateBody(assignmentSchema), async (req, res) => {
    if (!(await adminGate(req, res)))
        return;
    const { userId, levelIds } = req.body;
    if (!userId || !Array.isArray(levelIds) || levelIds.length === 0) {
        return res.status(400).json({ error: 'userId and levelIds[] required' });
    }
    try {
        const created = [];
        for (const levelId of levelIds) {
            const task = await prisma.task.upsert({
                where: { userId_levelId: { userId, levelId } },
                update: {},
                create: { userId, levelId },
            });
            created.push(task);
        }
        await writeAudit(requestOwnerId(req), 'tasks.assign', 'User', userId, { levelIds });
        res.json({ success: true, tasks: created });
    }
    catch (err) {
        return res.status(500).json({ error: 'Database unavailable — cannot assign tasks' });
    }
});
// All tasks across students (optionally filtered by student)
app.get('/api/v1/admin/tasks', async (req, res) => {
    if (!(await adminGate(req, res)))
        return;
    const { userId } = req.query;
    try {
        const limit = pageSize(req.query.limit);
        const tasks = await prisma.task.findMany({
            where: userId ? { userId: String(userId) } : {},
            orderBy: { assignedAt: 'desc' }, take: limit,
        });
        await writeAudit(requestOwnerId(req), 'tasks.read', 'Task', undefined, { userId: userId ? String(userId) : null, limit });
        res.json({ success: true, tasks });
    }
    catch (err) {
        return res.status(500).json({ error: 'Database unavailable — cannot load tasks' });
    }
});
app.delete('/api/v1/admin/tasks/:id', async (req, res) => {
    if (!(await adminGate(req, res)))
        return;
    const { id } = req.params;
    try {
        await prisma.task.delete({ where: { id } });
        await writeAudit(requestOwnerId(req), 'tasks.delete', 'Task', id);
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to remove task' });
    }
});
// Classroom-scoped teacher APIs. Platform-admin access is still required to
// create a teaching scope; every subsequent query is constrained by teacherId.
app.get('/api/v1/teacher/classrooms', async (req, res) => {
    if (!(await adminGate(req, res)))
        return;
    const teacherId = requestOwnerId(req);
    const classrooms = await prisma.classroom.findMany({
        where: { teacherId },
        include: { members: { include: { user: { select: { id: true, username: true, email: true, xp: true, levelUnlocked: true } } } }, _count: { select: { tasks: true } } },
        orderBy: { createdAt: 'desc' },
    });
    await writeAudit(teacherId, 'classrooms.read', 'Classroom');
    res.json({ classrooms });
});
app.post('/api/v1/teacher/classrooms', validateBody(classroomSchema), async (req, res) => {
    if (!(await adminGate(req, res)))
        return;
    const classroom = await prisma.classroom.create({
        data: { name: req.body.name, teacherId: requestOwnerId(req), joinCode: randomBytes(4).toString('hex').toUpperCase() },
    });
    await writeAudit(requestOwnerId(req), 'classrooms.create', 'Classroom', classroom.id);
    res.status(201).json({ classroom });
});
app.post('/api/v1/teacher/classrooms/:id/members', validateBody(classroomMemberSchema), async (req, res) => {
    if (!(await adminGate(req, res)))
        return;
    const classroom = await prisma.classroom.findFirst({ where: { id: req.params.id, teacherId: requestOwnerId(req) } });
    if (!classroom)
        return res.status(404).json({ error: 'Classroom not found' });
    const member = await prisma.classroomMember.upsert({
        where: { classroomId_userId: { classroomId: classroom.id, userId: req.body.userId } },
        update: {}, create: { classroomId: classroom.id, userId: req.body.userId },
    });
    await writeAudit(requestOwnerId(req), 'classrooms.member.add', 'Classroom', classroom.id, { userId: req.body.userId });
    res.status(201).json({ member });
});
app.post('/api/v1/teacher/classrooms/:id/assignments', validateBody(classroomAssignmentSchema), async (req, res) => {
    if (!(await adminGate(req, res)))
        return;
    const teacherId = requestOwnerId(req);
    const classroom = await prisma.classroom.findFirst({
        where: { id: req.params.id, teacherId }, include: { members: true },
    });
    if (!classroom)
        return res.status(404).json({ error: 'Classroom not found' });
    const tasks = [];
    for (const member of classroom.members) {
        for (const levelId of req.body.levelIds) {
            tasks.push(await prisma.task.upsert({
                where: { userId_levelId: { userId: member.userId, levelId } },
                update: { classroomId: classroom.id, assignedById: teacherId, dueAt: req.body.dueAt ? new Date(req.body.dueAt) : null, instructions: req.body.instructions },
                create: { userId: member.userId, levelId, classroomId: classroom.id, assignedById: teacherId, dueAt: req.body.dueAt ? new Date(req.body.dueAt) : null, instructions: req.body.instructions },
            }));
        }
    }
    await writeAudit(teacherId, 'classrooms.assign', 'Classroom', classroom.id, { levelIds: req.body.levelIds, learnerCount: classroom.members.length });
    res.status(201).json({ tasks });
});
app.get('/api/v1/teacher/classrooms/:id/report', async (req, res) => {
    if (!(await adminGate(req, res)))
        return;
    const classroom = await prisma.classroom.findFirst({
        where: { id: req.params.id, teacherId: requestOwnerId(req) },
        include: { members: { include: { user: { include: { progress: true, quizAttempts: true, tasks: true } } } } },
    });
    if (!classroom)
        return res.status(404).json({ error: 'Classroom not found' });
    const learners = classroom.members.map(({ user }) => ({
        id: user.id, username: user.username, email: user.email, xp: user.xp, streakDays: user.streakDays,
        levelsCompleted: user.progress.length, stars: user.progress.reduce((sum, item) => sum + item.stars, 0),
        quizAttempts: user.quizAttempts.length, quizAccuracy: user.quizAttempts.length ? user.quizAttempts.filter(item => item.correct).length / user.quizAttempts.length : null,
        tasksAssigned: user.tasks.filter(task => task.classroomId === classroom.id).length,
        tasksCompleted: user.tasks.filter(task => task.classroomId === classroom.id && task.completedAt).length,
    }));
    await writeAudit(requestOwnerId(req), 'classrooms.report.read', 'Classroom', classroom.id);
    res.json({ classroom: { id: classroom.id, name: classroom.name }, learners });
});
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'An unexpected server error occurred' } });
});
export { app };
if (process.env.NODE_ENV !== 'test')
    app.listen(PORT, () => {
        console.log(`⚡ ADSA Quest Backend Server with PostgreSQL running on http://localhost:${PORT}`);
    });
