import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// In-memory fallback if Prisma DB connection is not initialized
const mockUsers: Record<string, any> = {};

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'ADSA Quest Express Backend with PostgreSQL', timestamp: new Date().toISOString() });
});

// User Sync Endpoint (Prisma PostgreSQL with fallback)
app.post('/api/v1/user/sync', async (req, res) => {
  const { userId, username, email, xp, levelUnlocked, starsPerLevel, completedLevels } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: {
        username: username || 'Student',
        email: email || undefined,
        xp: xp !== undefined ? { set: Math.max(xp, 0) } : undefined,
        levelUnlocked: levelUnlocked !== undefined ? { set: Math.max(levelUnlocked, 1) } : undefined,
      },
      create: {
        id: userId,
        username: username || 'Student',
        email: email || undefined,
        xp: xp || 150,
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
    // Fallback to in-memory store if DB is offline
    const existing = mockUsers[userId] || {};
    mockUsers[userId] = {
      ...existing,
      id: userId,
      username: username || existing.username || 'Student',
      email: email || existing.email,
      xp: Math.max(xp || 0, existing.xp || 0),
      levelUnlocked: Math.max(levelUnlocked || 1, existing.levelUnlocked || 1),
      starsPerLevel: { ...(existing.starsPerLevel || {}), ...(starsPerLevel || {}) },
      completedLevels: Array.from(new Set([...(existing.completedLevels || []), ...(completedLevels || [])]))
    };
    return res.json({ success: true, user: mockUsers[userId], fallback: true });
  }
});

// Level Completion Endpoint (Prisma PostgreSQL)
app.post('/api/v1/progress/level-complete', async (req, res) => {
  const { userId, levelId, stars, earnedXp } = req.body;

  if (!userId || !levelId) {
    return res.status(400).json({ error: 'userId and levelId are required' });
  }

  try {
    // Record or update level progress in DB
    const progress = await prisma.levelProgress.upsert({
      where: {
        userId_levelId: { userId, levelId }
      },
      update: {
        stars: Math.max(stars || 1, 1),
      },
      create: {
        userId,
        levelId,
        stars: stars || 1,
      }
    });

    // Update user total XP and unlock status
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: earnedXp || 50 },
      },
      include: { progress: true }
    });

    return res.json({ success: true, progress, user: updatedUser });
  } catch (err) {
    const user = mockUsers[userId] || {
      id: userId, username: 'Student', xp: 0, levelUnlocked: 1, starsPerLevel: {}, completedLevels: []
    };
    user.xp += (earnedXp || 50);
    user.starsPerLevel[levelId] = Math.max(user.starsPerLevel[levelId] || 0, stars || 1);
    if (!user.completedLevels.includes(levelId)) user.completedLevels.push(levelId);
    mockUsers[userId] = user;
    return res.json({ success: true, user, fallback: true });
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
    const list = Object.values(mockUsers)
      .sort((a, b) => (b.xp || 0) - (a.xp || 0))
      .slice(0, 50)
      .map((u, idx) => ({
        rank: idx + 1,
        id: u.id,
        username: u.username,
        xp: u.xp || 0,
        stars: Object.values(u.starsPerLevel || {}).reduce((acc: number, val: any) => acc + (Number(val) || 0), 0)
      }));
    return res.json({ leaderboard: list, fallback: true });
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

app.delete('/api/v1/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.userNote.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

app.put('/api/v1/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { topicTitle, content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'content required' });
  }
  try {
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

app.delete('/api/v1/bookmarks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.bookmark.delete({ where: { id } });
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
      create: { userId, puzzleId, puzzleType: puzzleType || 'rotation' }
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

app.listen(PORT, () => {
  console.log(`⚡ ADSA Quest Backend Server with PostgreSQL running on http://localhost:${PORT}`);
});
