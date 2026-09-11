# Comprehensive Project README Template & Master Guide

This document serves as the **Pin-to-Pin Master README Template** for **ADSA Quest**. It provides a complete reference for project overview, directory structure, tech stack, database schema, API specification, environment configuration, command references, content authoring rubrics, security models, mobile build pipeline, testing & CI quality gates, and production operations.

---

<div align="center">

# [PROJECT NAME / ADSA QUEST]

### See it. Trace it. Build it. Explain it. Master it.

**An Interactive Learning World for Data Structures & Algorithms** — A guided campaign of visual explanations, synchronized code, deliberate practice, quizzes, and progress feedback across Web and Mobile (Android).

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=for-the-badge)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vite.dev)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white&style=for-the-badge)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white&style=for-the-badge)](https://www.postgresql.org)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma&logoColor=white&style=for-the-badge)](https://www.prisma.io)
[![Clerk](https://img.shields.io/badge/Clerk-5-6C47FF?logo=clerk&logoColor=white&style=for-the-badge)](https://clerk.com)
[![Capacitor](https://img.shields.io/badge/Capacitor-8-119EFF?logo=capacitor&logoColor=white&style=for-the-badge)](https://capacitorjs.com)

**v3.0.0 / v4.0.0 Release** — Campaign · Visualizer · Quiz Arena · Sandbox · Tree Lab · Study Vault · Teacher Console

</div>

---

## Table of Contents

1. [Executive Overview](#1-executive-overview)
2. [The 8-Checkpoint Learning Methodology](#2-the-8-checkpoint-learning-methodology)
3. [Full Repository Directory Structure](#3-full-repository-directory-structure)
4. [Technology Stack](#4-technology-stack)
5. [Curriculum Roadmap & Engine Registry](#5-curriculum-roadmap--engine-registry)
6. [Database Architecture & Data Models (18 Models)](#6-database-architecture--data-models-18-models)
7. [API Endpoint Catalog & Specifications](#7-api-endpoint-catalog--specifications)
8. [Environment Setup & Configuration](#8-environment-setup--configuration)
9. [Command Reference](#9-command-reference)
10. [Content Authoring & Topic Creation Rubric](#10-content-authoring--topic-creation-rubric)
11. [Security, Auth & RBAC Architecture](#11-security-auth--rbac-architecture)
12. [Mobile & Android Build Pipeline](#12-mobile--android-build-pipeline)
13. [Testing, Quality Gates & CI/CD](#13-testing-quality-gates--cicd)
14. [Production Operations & Operations Checklist](#14-production-operations--operations-checklist)
15. [Contributing & Licensing](#15-contributing--licensing)

---

## 1. Executive Overview

**ADSA Quest** turns abstract computer science theory into a **coherent mental model per topic**. It bridges the gap between passive reading and deep conceptual mastery through an integrated ecosystem:

- **Server-Owned Progress:** XP, streaks, level unlocks, and achievements are derived and validated on the backend.
- **Multilingual Code Sync:** Synchronized execution tracing across 8 programming languages (C++, Java, Python, JavaScript, C#, Go, Rust, C).
- **Cross-Platform Delivery:** PWA-ready web client built with React 18 & Vite 8, alongside a native Android build powered by Capacitor 8.
- **Classroom & Teacher Tooling:** Role-scoped teacher dashboards for classroom management, student skill mastery analysis, assignment tracking, and CSV reporting.

---

## 2. The 8-Checkpoint Learning Methodology

Every published topic teaches one mental model through an eight-stage progression checkpoint:

| Checkpoint | Stage Name | Learning Objective & Experience |
|---|---|---|
| **1** | **Purpose First** | Understand real-world trade-offs and the core problem solved by the structure/algorithm. |
| **2** | **Pin-to-Pin Theory** | Concrete definitions, structural invariants, asymptotic complexity, and edge cases. |
| **3** | **Worked Example** | Trace a small hand-calculated example before triggering automated animations. |
| **4** | **Step Visualizer** | Interactive canvas/SVG visualizer detailing one state change per frame with watch variables. |
| **5** | **Synchronized Code** | Dynamic line-by-line code tracing in 8 programming languages matching visual state. |
| **6** | **Hands-On Practice** | Safe custom inputs, interactive manipulation, step-by-step resets, and replay. |
| **7** | **Tiered Assessment** | Beginner, Intermediate, and Advanced/Mastery quizzes with immediate feedback loops. |
| **8** | **Review Loop** | Spaced-repetition flashcards, study notes, mistake tracking, and assignment submission. |

---

## 3. Full Repository Directory Structure

```text
.
├── .github/
│   └── workflows/
│       └── quality.yml         # CI/CD workflow running content validation, checks & builds
├── android/                    # Capacitor Android native project & Gradle scripts
├── backend/
│   ├── prisma/
│   │   ├── migrations/         # Committed PostgreSQL migrations
│   │   ├── schema.prisma       # 18 Prisma database models
│   │   └── seed.ts             # Seed data generator
│   ├── src/
│   │   ├── server.ts           # Express API server entrypoint & route handlers
│   │   ├── treeLab.ts          # Tree Lab assignment & submission engine
│   │   ├── server.test.ts      # API integration tests (Supertest + Vitest)
│   │   └── treeLab.test.ts     # Tree Lab operational logic tests
│   ├── OPERATIONS.md           # Backend production deployment & ops documentation
│   ├── package.json            # Backend dependencies and scripts
│   └── tsconfig.json           # Backend TypeScript configuration
├── public/                     # Static web assets & icons
├── scripts/
│   ├── repair-encoding.mjs     # UTF-8 encoding cleanup script
│   └── validate-content.mjs    # Content integrity auditor (levels, quiz entries, IDs)
├── src/
│   ├── algorithms/             # 15 Deterministic frame engines & visualizer registry
│   │   ├── advancedStructureEngines.ts
│   │   ├── avlTreeEngine.ts
│   │   ├── bTreeEngine.ts
│   │   ├── codeLineResolver.ts
│   │   ├── dijkstraEngine.ts
│   │   ├── dpLearningEngines.ts
│   │   ├── graphLearningEngines.ts
│   │   ├── interactiveTreeEngine.ts
│   │   ├── kmpEngine.ts
│   │   ├── knapsackEngine.ts
│   │   ├── segmentTreeEngine.ts
│   │   ├── stringLearningEngines.ts
│   │   ├── trieEngine.ts
│   │   ├── visualizerRegistry.ts
│   │   └── engines.test.ts     # Engine unit tests
│   ├── components/             # React surface modules
│   │   ├── About/              # About page & overview
│   │   ├── Admin/              # Admin console & student administration
│   │   ├── Assignments/        # Student task/assignment views
│   │   ├── Auth/               # Clerk user button & authentication controls
│   │   ├── Campaign/           # 38 Level map and campaign flow
│   │   ├── Comparison/         # Algorithm comparison surface
│   │   ├── Dashboard/          # XP, stats, streaks, weak-skills dashboard
│   │   ├── Flashcards/         # Spaced repetition flashcards module
│   │   ├── Games/              # Gamified mini-challenges
│   │   ├── Library/            # Multi-language code library
│   │   ├── Notes/              # Study Vault notes & bookmark editor
│   │   ├── Onboarding/         # Onboarding flow and slides
│   │   ├── Practice/ (Quiz)    # Tiered quiz arena & assessment
│   │   ├── Profile/            # User profile & badges
│   │   ├── Review/             # Mistake review surface
│   │   ├── Sandbox/            # Custom input playground
│   │   ├── Social/             # Leaderboard & social views
│   │   ├── TreeLab/            # Interactive Tree Operation Lab
│   │   └── Visualizer/         # Core step player, SVG canvas, code tracer
│   ├── data/                   # Content registries
│   │   ├── codeTemplates/      # Multi-language code implementations
│   │   ├── levelsData.ts       # 38 Campaign level definitions
│   │   ├── quizData.ts         # 394 Validated quiz items
│   │   └── theoryData.ts       # Topic theory, invariants, and edge cases
│   ├── services/               # Authenticated API client & offline mutation queue
│   ├── types/                  # Shared TypeScript models and interfaces
│   ├── App.tsx                 # Core App layout & route controller
│   ├── index.css               # Design system & Tailwind/CSS custom styles
│   └── main.tsx                # Client entrypoint
├── capacitor.config.ts         # Capacitor cross-platform runtime config
├── package.json                # Frontend root dependencies & scripts
├── README.md                   # Repository README
├── tsconfig.json               # Frontend TypeScript configuration
└── vite.config.ts              # Vite bundling & development server configuration
```

---

## 4. Technology Stack

| Layer | Primary Technology | Description / Usage |
|---|---|---|
| **Frontend Framework** | React 18.3 | Component-driven UI architecture |
| **Language** | TypeScript 5.2 / 5.4 | Strict type checking across client & server |
| **Build Tooling** | Vite 8.2 | Fast dev server and optimized production bundler |
| **Backend API** | Express 5.0 (via `tsx`) | RESTful API server with route handlers |
| **Database & ORM** | PostgreSQL 15 + Prisma 5.14 | Transactional relational storage & schema management |
| **Authentication** | Clerk (`@clerk/clerk-react` / `@clerk/express`) | Server-verified JWT identity & RBAC |
| **Mobile Runtime** | Capacitor 8.5 | Native Android container packaging `dist/` |
| **Testing & Quality** | Vitest 4.1 + Supertest 7.2 | Deterministic unit & API integration testing |
| **Linting & Validation**| Custom node scripts + ESLint 10 | Content auditing and code health enforcement |

---

## 5. Curriculum Roadmap & Engine Registry

### Curriculum Domains (38 Levels)
1. **Trees & Advanced Trees:** BST, AVL Trees, Red-Black Trees, Binary Heaps, B-Trees, Segment Trees, Fenwick Trees, Splay Trees.
2. **Graphs & Networks:** BFS/DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Prim/Kruskal MST, Tarjan's SCC, Topological Sorting, Max Flow (Edmonds-Karp).
3. **Dynamic Programming:** 0/1 Knapsack, Longest Common Subsequence (LCS), Matrix Chain Multiplication, Edit Distance, Bitmask DP, N-Queens.
4. **Strings & Pattern Matching:** Trie, KMP Pattern Matching, Suffix Array, Z-Algorithm, Manacher's Algorithm.
5. **Advanced Data Structures:** Disjoint Set Union (DSU), Hash Tables, Skip Lists, Bloom Filters, Sparse Tables.

---

## 6. Database Architecture & Data Models (18 Models)

The PostgreSQL database is managed via Prisma ORM (`backend/prisma/schema.prisma`). It consists of 18 models:

1. **`User`**: Central user entity containing Clerk subject ID, XP, streaks, level unlocks, role (`student` | `admin`), and timezone.
2. **`IdempotencyRecord`**: Stores idempotency keys for reward awards and progress operations to prevent replay attacks.
3. **`AuditLog`**: Audit trail recording administrative and sensitive user actions.
4. **`FlashcardReview`**: Spaced-repetition card review metadata (intervals, ease factors, next review timestamp).
5. **`QuizAttempt`**: Item-level attempt details (selected index, accuracy, hint utilization, timing).
6. **`UserAchievement`**: Unlocked badges and milestone key mappings per user.
7. **`PuzzleCompletion`**: Completion records per quiz/flashcard puzzle.
8. **`LevelProgress`**: Campaign level progress, star counts (1–3), and completion dates.
9. **`Bookmark`**: Bookmarked learning topics and user notes.
10. **`UserNote`**: User-authored study vault notes mapped to specific topics.
11. **`Task`**: Admin/teacher assigned level tasks per student with due dates and instructions.
12. **`Classroom`**: Grouping entity created by teachers with unique join codes.
13. **`ClassroomMember`**: Junction table mapping students to classrooms.
14. **`TreeAssignment`**: Detailed interactive Tree Lab assignments created by teachers.
15. **`TreeSubmission`**: Student submission records for Tree Lab assignments (scores, attempts, duration).
16. **`TreeOperationStep`**: Granular operation-by-operation step history for Tree Lab submission replays.
17. **`LessonCheckpoint`**: Checkpoint completion markers across individual lesson sub-stages.
18. **`StudentSkillMastery`**: Aggregated topic-by-topic and skill-by-skill mastery metrics (attempts, accuracy, hint penalty).

---

## 7. API Endpoint Catalog & Specifications

All endpoints are hosted under `/api/v1` and require `Authorization: Bearer <token>` (verified via Clerk middleware).

### Core & Identity
- `GET /health` — Health check endpoint.
- `GET /api/v1/me` — Fetch current authenticated user profile.
- `POST /api/v1/user/sync` — Sync or initialize user details upon sign-in.
- `POST /api/v1/me/import-guest-progress` — Merge guest progress UUID records into an authenticated user profile.

### Progress & Assessment
- `POST /api/v1/progress/level-complete` — Submit campaign level completion (Idempotent).
- `POST /api/v1/completions` — Submit puzzle completion.
- `GET|DELETE /api/v1/completions/:userId/:puzzleId` — Read or clear completion records.
- `POST /api/v1/me/quiz-attempts` — Log quiz question attempt details.
- `GET /api/v1/me/mistakes` — Fetch incorrect attempts for mistake review.

### Study Vault & Flashcards
- `GET|POST /api/v1/notes` — Read or create notes.
- `PUT|DELETE /api/v1/notes/:id` — Update or delete notes.
- `GET /api/v1/bookmarks/:userId` — Fetch user bookmarks.
- `POST /api/v1/bookmarks` · `DELETE /api/v1/bookmarks/:id` — Create/delete bookmarks.
- `GET|POST /api/v1/me/flashcard-reviews` — Retrieve or save spaced-repetition flashcard sessions.

### Tasks & Classrooms
- `GET /api/v1/me/tasks` — List student assignments.
- `GET /api/v1/me/tree-assignments` — Fetch assigned Tree Lab interactive tasks.
- `POST /api/v1/me/tree-assignments/:id/submit` — Submit a Tree Lab exercise.
- `POST /api/v1/teacher/classrooms` — Create a new classroom (Teacher/Admin).
- `GET /api/v1/teacher/classrooms/:id/report` — Export performance reports.

---

## 8. Environment Setup & Configuration

### Frontend Setup (`.env`)
```dotenv
VITE_CLERK_PUBLISHABLE_KEY="pk_test_..."
VITE_API_URL="http://localhost:5000"
```

### Backend Setup (`backend/.env`)
```dotenv
NODE_ENV="development"
PORT=5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/adsa_quest?schema=public"
CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:5173,capacitor://localhost"
ADMIN_EMAILS="teacher@example.com,admin@example.com"
```

---

## 9. Command Reference

### Frontend Commands (Root)
| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server on `http://localhost:3000` |
| `npm run typecheck` | Run TypeScript check (`tsc --noEmit`) |
| `npm run build` | Perform production bundle build (`dist/`) |
| `npm run validate:content` | Audit level references and quiz item uniqueness |
| `npm run test` | Run deterministic algorithm engine test suite |
| `npm run check` | Full Quality Gate: content audit + typecheck + tests + build + backend gate |

### Backend Commands (`backend/`)
| Command | Description |
|---|---|
| `npm --prefix backend run dev` | Start API server in watch mode (`tsx watch src/server.ts`) |
| `npm --prefix backend run test` | Run backend integration tests via Vitest & Supertest |
| `npm --prefix backend run check` | Run backend typecheck + tests + build |
| `npm --prefix backend run prisma:generate` | Regenerate Prisma client |
| `npm --prefix backend run prisma:migrate` | Run dev migrations |
| `npm --prefix backend run prisma:deploy` | Apply committed migrations to production DB |

---

## 10. Content Authoring & Topic Creation Rubric

When authoring a new algorithm or campaign level:

1. **Metadata:** Declare level definition in `src/data/levelsData.ts`.
2. **Theory:** Write comprehensive theory, invariants, complexity, and worked examples in `src/data/theoryData.ts`.
3. **Assessment:** Add globally unique question entries in `src/data/quizData.ts`.
4. **Code Templates:** Provide templates for all 8 languages in `src/data/codeTemplates/`.
5. **Engine & Registry:** Implement a frame engine in `src/algorithms/` and register it in `visualizerRegistry.ts`.
6. **Validation:** Run `npm run validate:content` and `npm run check`.

---

## 11. Security, Auth & RBAC Architecture

- **Token Scoping:** Identity is strictly derived from the verified Clerk JWT (`sub` claim). Requests cannot impersonate another `userId`.
- **Server-Owned Rewards:** XP, stars, streaks, and unlocks are transactionally evaluated on the backend.
- **Idempotency Safeguards:** Critical endpoints use `IdempotencyRecord` to prevent double-claiming rewards.
- **RBAC:** Roles (`student` | `admin`) are assigned server-side. Sensitive teacher/admin endpoints verify database roles.

---

## 12. Mobile & Android Build Pipeline

Powered by Capacitor 8:

```bash
# Build frontend web assets and sync with native Android container
npm run cap:sync

# Open native Android project in Android Studio
npm run cap:open:android
```

Requirements: JDK 21 and Android SDK 36.

---

## 13. Testing, Quality Gates & CI/CD

The project enforces a strict automated quality gate defined in `.github/workflows/quality.yml`:

```text
 validate:content ➔ typecheck ➔ test ➔ build ➔ backend check ➔ git diff check
```

---

## 14. Production Operations & Operations Checklist

Refer to `backend/OPERATIONS.md` for detailed production ops procedures:
- **Monitoring:** External health checks on `GET /health` with `x-request-id` tracking.
- **Backups:** Daily PostgreSQL encrypted snapshots with 30-day retention.
- **Deployments:** Forward-only migrations (`prisma migrate deploy`).

---

## 15. Contributing & Licensing

- **Code Style:** Clean TypeScript, strict typing, no unused variables.
- **License:** Proprietary / All Rights Reserved (Update as appropriate).
