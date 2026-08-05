<div align="center">

# ADSA QUEST

### See it. Trace it. Build it. Explain it. Master it.

**An interactive learning world for Data Structures & Algorithms** — a guided campaign of visual explanations, synchronized code, deliberate practice, quizzes, and progress feedback on the web and Android.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=for-the-badge)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vite.dev)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white&style=for-the-badge)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white&style=for-the-badge)](https://www.postgresql.org)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white&style=for-the-badge)](https://www.prisma.io)
[![Clerk](https://img.shields.io/badge/Clerk-5-6C47FF?logo=clerk&logoColor=white&style=for-the-badge)](https://clerk.com)
[![Capacitor](https://img.shields.io/badge/Capacitor-8-119EFF?logo=capacitor&logoColor=white&style=for-the-badge)](https://capacitorjs.com)

**v3.0.0** — Campaign · Visualizer · Quiz Arena · Sandbox · Tree Lab · Study Vault · Teacher Console

</div>

---

## Table of Contents

- [What is ADSA Quest](#what-is-adsa-quest)
- [The Learning Pipeline](#the-learning-pipeline)
- [Product Tour](#product-tour)
- [Project Analysis](#project-analysis)
- [API Reference](#api-reference)
- [Technology Stack](#technology-stack)
- [Quick Start](#quick-start)
- [Command Reference](#command-reference)
- [Creating or Updating a Topic](#creating-or-updating-a-topic)
- [Security Model](#security-model)
- [Quality Gate & CI](#quality-gate--ci)
- [Android Build](#android-build)
- [Roadmap & Status](#roadmap--status)
- [Contributing](#contributing)
- [License](#license)

---

## What is ADSA Quest

ADSA Quest turns abstract CS theory into a **coherent mental model per topic**: a guided sequence of visual explanations, synchronized code across eight languages, hands-on practice, and mastery assessment. Progress is server-owned, synced to PostgreSQL, and synchronized to Android via Capacitor.

Every published topic teaches one mental model through eight checkpoints:

| # | Stage | What the learner gets |
|---|-------|-----------------------|
| 1 | **Purpose first** | What problem the structure or algorithm solves |
| 2 | **Pin-to-pin theory** | Definitions, invariants, complexity, edge cases, real uses |
| 3 | **Worked example** | A small input explained *before* the animation starts |
| 4 | **Step visualizer** | One meaningful state change per frame, with reason + variable watch |
| 5 | **Synchronized code** | The same semantic step highlighted in C++, Java, Python, JS, C#, Go, Rust, C |
| 6 | **Hands-on practice** | Safe custom inputs, operations, reset, replay |
| 7 | **Tiered assessment** | Beginner, medium, and mastery questions with helpful feedback |
| 8 | **Review loop** | Notes, bookmarks, flashcards, mistakes, assignments, progress |

**The quality bar:** a learner should never see an unrelated animation, an unexplained state change, or a reward that does not reflect their work.

---

## Product Tour

| Experience | What learners can do |
|---|---|
| **Campaign** | Move through 38 sequenced ADSA levels, unlock topics, earn stars, continue where they stopped |
| **Visualizer** | Play, pause, step, rewind, change speed, inspect explanations, interact with supported algorithms |
| **Theory** | Definitions, invariants, complexities, use cases, edge cases, and worked steps |
| **Code tracer** | Follow the visual step in 8 languages where available |
| **Challenge arena** | Answer tiered questions, use hints, inspect explanations, prove mastery |
| **Sandbox** | Custom inputs across tree, graph, DP, and string algorithms |
| **Tree Lab** | Step-by-step tree operation laboratory with assignment submission and replay |
| **Study vault** | Create, edit, search, pin, organize notes and bookmarks |
| **Flashcards** | Spaced-repetition review in small repeatable sessions |
| **Dashboard** | XP, stars, streaks, badges, category progress, weak-skill analysis |
| **Teacher console** | Classrooms, enrollments, assignments with due dates, per-student reports, CSV export |
| **Admin console** | Student overview, task management, server-owned role administration |

---

## Project Analysis

### Architecture

```text
┌─────────────────────────────┐        ┌──────────────────────────────────┐
│         Web Client          │        │        Android Client            │
│   React 18 + Vite :3000     │        │   Capacitor 8 (same codebase)    │
│   Clerk UI (Sign-in/Sign-up)│        │   webDir: dist, https scheme     │
└──────────────┬──────────────┘        └──────────────┬───────────────────┘
               │   fetch + Bearer (Clerk session)     │
               ▼                                      ▼
        ┌────────────────────────────────────────────────────┐
        │                 Express API  :5000                 │
        │  clerkMiddleware → auth.userId (server-owned ID)   │
        │  zod validation · rate limit · helmet · CORS       │
        │  idempotency keys · audit log · request IDs        │
        └───────────────────────┬────────────────────────────┘
                                │ Prisma ORM
                                ▼
                    ┌─────────────────────────┐
                    │     PostgreSQL 15       │
                    │   18 models · 9 migrations│
                    └─────────────────────────┘
```

### Codebase at a glance

| Metric | Value |
|---|---|
| Campaign levels | 38 (each with a registered topic-specific engine) |
| Quiz entries | 394 validated, globally unique IDs, checked answer indexes |
| Algorithm engines | 15 deterministic frame generators in `src/algorithms/` |
| Frontend modules | 20 component surfaces under `src/components/` |
| Frontend code | ~19.5k lines TypeScript/TSX |
| API endpoints | 36 across `/api/v1` |
| Database | 18 Prisma models, 9 committed migrations |
| Tests | 37 deterministic engine tests + 10 backend API/engine tests (all passing) |
| CI | GitHub Actions quality workflow (`quality.yml`) |
| Production JS | ~406 KB minified / ~126 KB gzip, no Vite chunk warning |

### Module inventory (`src/`)

| Module | Responsibility |
|---|---|
| `algorithms/` | 15 deterministic animation-frame engines + engine test suite |
| `components/Visualizer/` | Renderers, step scrubber, code tracer, variable watch (7 files) |
| `components/Campaign/` | Level map, unlock logic, star collection |
| `components/QuizArena` → `components/Practice/` | Tiered question flow, hints, feedback |
| `components/Sandbox/` | Custom-input algorithm playground |
| `components/TreeLab/` | Tree operation lab, submission + replay |
| `components/Notes/` | Study vault: notes, bookmarks, search, pin, compose |
| `components/Flashcards/` | Spaced-repetition review sessions |
| `components/Dashboard/` | XP, stars, streaks, badges, weak skills |
| `components/Teacher/` (`Admin`, `Assignments`, `Social`) | Classroom management, reports, leaderboard |
| `data/` | `levelsData.ts` (38 levels), `quizData.ts` (394 entries), theory, comparisons, code templates |
| `services/` | Authenticated API client, offline mutation queue, guest import |
| `types/` | Shared frontend contracts |

### Database models (`backend/prisma/schema.prisma`)

`User` · `LevelProgress` · `UserAchievement` · `PuzzleCompletion` · `Bookmark` · `UserNote` · `FlashcardReview` · `QuizAttempt` · `Task` · `Classroom` · `ClassroomMember` · `TreeAssignment` · `TreeSubmission` · `TreeOperationStep` · `LessonCheckpoint` · `StudentSkillMastery` · `IdempotencyRecord` · `AuditLog`

### Curriculum map

- **Trees** — BST, AVL, Red-Black, Heap, B-Tree, Segment/Fenwick/Splay trees
- **Graphs** — BFS/DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, MST, Tarjan, topo sort, max flow
- **Dynamic programming** — Knapsack, LCS, Matrix Chain, Edit Distance, Bitmask DP, N-Queens
- **Strings** — Trie, KMP, Suffix Array, Z Algorithm, Manacher
- **Advanced** — DSU, hashing, skip lists, bloom filters, sparse tables

---

## API Reference

All endpoints are under `/api/v1` and require a verified Clerk `Authorization: Bearer <token>`. Identity is derived from the verified token subject — never from the body or headers. Owner-scoped reads/writes enforce ownership server-side.

| Area | Endpoints |
|---|---|
| Health | `GET /health` |
| Identity | `GET /me` · `POST /user/sync` · `POST /me/import-guest-progress` |
| Progress | `POST /progress/level-complete` (idempotent) · `POST /completions` · `GET|DELETE /completions/:userId/:puzzleId` |
| Notes | `GET|POST /notes` · `GET /notes/:userId` · `PUT|DELETE /notes/:id` |
| Bookmarks | `GET /bookmarks/:userId` · `POST /bookmarks` · `DELETE /bookmarks/:id` |
| Quizzes & mistakes | `POST /me/quiz-attempts` · `GET /me/mistakes` |
| Flashcards | `GET|POST /me/flashcard-reviews` (spaced repetition) |
| Tasks | `GET /me/tasks` |
| Tree Lab | `GET /me/tree-assignments` · `POST /me/tree-assignments/:id/submit` · `POST /me/lesson-checkpoints` |
| Teacher | `POST|GET /teacher/classrooms` · `POST /teacher/classrooms/:id/members` · `POST /teacher/classrooms/:id/assignments` · `GET /teacher/classrooms/:id/report` · `GET /teacher/students/:id/weak-skills` · `GET /teacher/submissions/:id/replay` · `POST /teacher/tree-assignments` |
| Leaderboard | `GET /leaderboard` |
| Admin (role-gated) | `GET|POST /admin/tasks` · `DELETE /admin/tasks/:id` · `GET /admin/students` |

---

## Technology Stack

| Surface | Stack |
|---|---|
| Frontend | React 18, TypeScript 5.2, Vite 8 (port **3000**) |
| Authentication | Clerk (`@clerk/clerk-react`) |
| API | Express 5, TypeScript, tsx watch |
| Database | PostgreSQL 15, Prisma ORM |
| Mobile | Capacitor 8, Gradle 8.13, Android SDK 36 |
| Visuals | SVG/DOM renderers, frame-based engines, Lucide icons, canvas-confetti |
| Quality | Vitest, Playwright + axe-core, ESLint, Prettier |

---

## Quick Start

### Prerequisites

- Node.js 20.19+ (22/24 supported), npm 10+
- PostgreSQL 15+
- A Clerk application (publishable + secret keys)
- Android Studio + JDK 21 only when building Android

### 1. Install packages

```powershell
npm install
npm --prefix backend install
```

### 2. Configure the frontend

```powershell
Copy-Item .env.example .env
```

```dotenv
VITE_CLERK_PUBLISHABLE_KEY="pk_test_..."
VITE_API_URL="http://localhost:5000"
```

### 3. Configure the API

```powershell
Copy-Item backend/.env.example backend/.env
```

```dotenv
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/adsa_quest?schema=public"
CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:5173,capacitor://localhost"
ADMIN_EMAILS="you@example.com"
```

> **Note:** the Vite dev server runs on **port 3000**, and `ALLOWED_ORIGINS` must include it. Never use `*` in production. Keep `.env` files private — only `.env.example` belongs in Git.

### 4. Create the database

```powershell
npm --prefix backend run prisma:generate
npm --prefix backend run prisma:deploy
```

For local schema development use `prisma:migrate` and commit the generated migration — never edit the database without one.

### 5. Start both applications

Terminal 1 — API (must run via tsx, not plain `node`):

```powershell
npm --prefix backend run dev
```

Terminal 2 — web app:

```powershell
npm run dev
```

Open `http://localhost:3000`. API health check: `http://localhost:5000/health`.

---

## Command Reference

### Frontend (run from project root)

| Command | Purpose |
|---|---|
| `npm run dev` | Vite dev server on `http://localhost:3000` |
| `npm run typecheck` | TypeScript check without emitting (`tsc --noEmit`) |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run validate:content` | Audit level/question references and content coverage |
| `npm run test` | Deterministic algorithm-engine test suite (Vitest) |
| `npm run check` | Full gate: content + typecheck + tests + build + backend check |

### Backend (prefix with `npm --prefix backend run`)

| Command | Purpose |
|---|---|
| `dev` | Start API on :5000 in watch mode (tsx) |
| `test` | Protected API integration tests (Vitest) |
| `typecheck` | Backend TypeScript check |
| `build` | Compile backend to `dist/` |
| `start` | Run compiled `dist/server.js` in production |
| `check` | Backend gate: typecheck + tests + build |
| `prisma:generate` | Regenerate the Prisma client |
| `prisma:migrate` | Create/apply a new dev migration |
| `prisma:deploy` | Apply committed migrations to any environment |
| `prisma:studio` | Visual database editor |
| `prisma:seed` | Run the seed script |

### Mobile / Android

| Command | Purpose |
|---|---|
| `npm run cap:sync` | Build web assets + sync native projects |
| `npm run cap:open:android` | Open the Android project in Android Studio |

### CI (`quality.yml`)

`validate:content` → `typecheck` → `test` → frontend build → backend `check`, then `git diff --check`.

---

## Creating or Updating a Topic

A topic is complete only when its pieces agree with each other.

1. Add/update level metadata in `src/data/levelsData.ts`.
2. Add globally unique tiered questions in `src/data/quizData.ts`.
3. Add theory in `src/data/theoryData.ts` (definitions, invariants, complexity, worked steps, applications, edge cases).
4. Add code templates in `src/data/codeTemplates/`.
5. Register a compatible visualizer engine + renderer — never an unrelated fallback.
6. Add deterministic examples and tests for final state, invariants, and semantic code steps.
7. Run `npm run validate:content` then `npm run check`.
8. Manually verify theory, canvas, explanation, variables, code, and quiz feedback tell the same story.

### Content writing rubric

- Short sentences before formal terminology; define every symbol.
- Explain *why* an operation is performed, not only what changed.
- One visual state change per step.
- Best/average/worst cases where meaningful; failure cases and misconceptions.
- Examples small enough to calculate by hand.
- End with a retrieval question: *"Could the learner reproduce this without the animation?"*

---

## Security Model

- Authenticated identity always derives from a **verified Clerk token** — never a username, email header, or request body.
- Roles, XP, and rewards are **server-owned**; a client can never promote itself or choose its reward.
- Every user-owned read/write enforces ownership (token subject scoping).
- Strict zod body validation, rate limiting, helmet headers, request IDs, and an explicit CORS allow-list.
- `IdempotencyRecord` protects level completions and tree submissions from replay; `AuditLog` records privileged actions.
- Database changes require a **committed Prisma migration**.
- Never commit `.env`, credentials, generated clients, build output, or `node_modules`.

The admin gate requires a Clerk session **plus** a DB role of `admin` (or membership in `ADMIN_EMAILS`). With `CLERK_SECRET_KEY` unset, the API runs in a secure unauthenticated mode (503 for admin routes) — it never becomes permissive.

---

## Quality Gate & CI

Before opening a PR or producing an Android build:

```powershell
npm run check
git diff --check
```

Also verify:
- the changed topic has no fallback visualizer;
- keyboard focus and reduced motion remain usable;
- mobile layout works at 360 px width;
- offline/API failure is visible and recoverable (mutation queue flushes on `online`);
- quiz rewards are not duplicated by replay or retry (idempotency);
- no secret or generated dependency is staged.

---

## Android Build

```powershell
npm run cap:sync
npm run cap:open:android
```

Use Java 21 and Android SDK 36; `ANDROID_HOME` must be set before `android\gradlew.bat assembleDebug`. Test authentication, resume, back behavior, safe areas, keyboard input, network loss, and deep links on a real device before release.

---

## Roadmap & Status

The authoritative implementation sequence, risk register, API direction, acceptance criteria, and test plan live in [PROJECT_UPDATE_PLAN.md](./PROJECT_UPDATE_PLAN.md).

**Implemented baseline (verified 5 August 2026):** 38 campaign levels · 394 quiz entries · topic-specific visualizers for all levels · server-owned identity/rewards/unlocks/streaks/achievements · guest migration · quiz attempts + mistake review + offline completion queue + spaced-repetition flashcards · classroom-scoped assignments/reports/CSV export · tree learning lab with submissions and replay · lazy-loaded surfaces (~406 KB minified / ~126 KB gzip) · 37 engine tests + 10 backend integration tests · CI workflow · passing frontend/backend/Android builds.

**Remaining release work:** browser E2E + automated accessibility coverage, transactional/idempotency hardening, observability/privacy operations, real-device Android smoke testing, removal of generated artifacts from version control.

---

## Contributing

Keep changes focused and reviewable; preserve learner-facing correctness over visual novelty. A feature is done when it has error/loading states, tests proportional to risk, documentation, accessible interaction, and a trustworthy persistence path — not when the happy path first renders.

When reporting a content defect, include the level, input, expected steps, actual steps, language/template, and a screenshot or frame number.

---

## License

No license declared yet. Add an explicit license before accepting external contributions or distributing beyond intended private use.
