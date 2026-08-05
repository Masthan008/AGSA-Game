# ADSA Quest — Project Analysis and Feature Update Plan

**Prepared:** 5 August 2026  
**Repository version:** frontend `3.0.0`, backend `1.0.0`  
**Planning horizon:** 12–16 weeks  
**Status:** Proposed implementation roadmap

## 1. Executive summary

ADSA Quest is a gamified data structures and algorithms learning application built as a React/Vite web app, packaged for Android with Capacitor, and supported by an Express/Prisma/PostgreSQL API. It already has a broad learning catalog (38 campaign levels and approximately 373 quiz records), multiple study modes, multilingual code examples, local progress, Clerk-based sign-in UI, notes, flashcards, a sandbox, and a teacher/admin dashboard.

The product currently has more content breadth than implementation depth. Many distinct algorithm levels display one of four generic visualization engines, several visible product promises (streaks, badges, leaderboard, and bookmarks) are incomplete or disconnected, and the backend trusts client-supplied user identifiers and roles. The highest-value update is therefore not simply adding more screens. The next release should first make identity, progress, content mapping, and testing reliable; then complete the learning loop; and only then add social and adaptive-learning features.

### Recommended release objective

Deliver **ADSA Quest 4.0: Trusted Learning Progress** with:

1. secure Clerk-authenticated APIs and role-based admin access;
2. a single server-owned progress model with guest migration and offline-safe sync;
3. accurate, topic-specific visualizations for the highest-priority algorithms;
4. assignments visible to students, scoring that reflects performance, streaks, badges, and a real leaderboard;
5. automated tests, CI, accessibility, performance, and release documentation.

## 2. Current architecture

| Layer | Current implementation | Notes |
|---|---|---|
| Web client | React 18, TypeScript, Vite 5 | One large `App.tsx` controls navigation and most global state. No router or state/query library. |
| UI | Custom CSS and inline styles, Lucide icons | Broad component library, but responsive and accessibility behavior is not systematically tested. |
| Authentication | Clerk React UI | Sign-in exists, but API requests do not send or verify Clerk session tokens. |
| API | Express 4 + TypeScript | REST endpoints for users, progress, completions, notes, bookmarks, leaderboard, and admin tasks. |
| Persistence | Prisma 5 + PostgreSQL | Models: User, LevelProgress, PuzzleCompletion, Bookmark, UserNote, Task. No migrations are checked into the repository. |
| Local persistence | `localStorage` | Onboarding, role, progress, note pins, and intro state are stored independently. |
| Learning engine | Frame-generating TypeScript algorithms | Dedicated engines exist for AVL, interactive trees, Dijkstra, Knapsack, Trie, Segment Tree, KMP, and B-Tree. |
| Mobile | Capacitor + Android project | Android shell/assets exist; Capacitor major versions are inconsistent across packages. |
| Delivery quality | TypeScript production builds | No lint, unit tests, integration tests, end-to-end tests, CI, error monitoring, or analytics. |

## 3. Present feature inventory

### 3.1 Implemented and usable

| Area | Present behavior | Maturity |
|---|---|---|
| Onboarding | Splash screen, onboarding slides, remembered completion | Functional |
| Campaign | 38 sequential levels, locking, search/filter, stars and XP display | Functional, mainly client-owned |
| Quiz arena | Large question bank, hints/explanations, tier labels, completion tracking, confetti | Functional with scoring/progress defects |
| Visualizer | Step playback, explanation panel, speed controls, code-line highlighting | Strong foundation, incomplete topic accuracy |
| Interactive trees | Insert, delete, search, reset, sample, and random input for BST/AVL-style trees | Functional |
| Code library | Up to eight languages for algorithm templates | Broad content coverage |
| Theory | Topic explanations and complexity information | Functional with fallback content |
| Sandbox | Eight selectable modes with custom inputs and frame playback | Functional |
| Notes | Create, edit, delete, search, pin locally, word/read-time stats | Functional when API is available |
| Flashcards | Study cards and backend completion records | Functional |
| Dashboard/profile | XP, stars, progress, streak, badges, settings | UI exists; some values never update |
| Algorithm comparison | Static side-by-side comparison content | Functional |
| Admin console | Student overview, assignments, progress/activity details, task removal, periodic refresh | Newly implemented; authorization needs redesign |
| Mobile wrapper | Android Capacitor project and assets | Build/release readiness not established |

### 3.2 Present but incomplete or disconnected

| Feature | Evidence/gap | Required update |
|---|---|---|
| Leaderboard | Component and API exist, but the component is not rendered from `App.tsx`; component also contains static entries. | Add navigation, use API-only results, paging/current-user rank, empty/error states. |
| Practice playground | Imported but not rendered; sandbox overlaps it. | Merge it into Sandbox or expose it deliberately; remove dead import/code. |
| Bookmarks | Read/create API functions exist; delete API endpoint exists without client function; no clear learning-flow action creates bookmarks. | Add bookmark actions to theory/code views and full CRUD in Study Vault. |
| Streaks | Initialized to one and displayed, but no daily activity calculation updates it. | Calculate on server from dated learning activity. |
| Badges | Profile UI reads `badges`, but no award engine exists. | Add achievement definitions, server evaluation, unlock notifications. |
| Admin assignments | Teacher can assign levels, but the student experience does not fetch or display assigned tasks. | Add “My assignments,” due dates, status, and deep links. |
| Account roles | User chooses student/admin locally and sends the role to the API. | Remove self-service admin privilege; roles must be server-controlled. |
| Signed-in identity | Username is used as `userId`; name changes can split records and users can request other users’ data. | Use Clerk subject (`sub`) from a verified token for all ownership. |
| Guest mode | Common names such as `Student` or `guest_user` can collide. | Generate a device UUID and offer authenticated account migration. |
| Progress sync | Client pushes an entire local snapshot on every progress change; no initial server hydration or conflict policy. | Add versioned server state, pull-on-login, mutation endpoints, and retry queue. |
| Level visualization | Red-Black, Heap, B-Tree, Segment Tree, Bellman-Ford, MST, Tarjan, BFS/DFS, Floyd-Warshall, LCS, Matrix Chain, KMP, Suffix Array, and many later levels reuse unrelated generic engines in the main visualizer. | Map each topic to a compatible renderer/engine and explicitly mark content-only topics until implemented. |
| Quiz rewards | Completing a topic always grants three stars and 100 XP; repeat/reset paths can grant progress again. | Calculate rewards from accuracy, hints, attempts, and first-completion rules on the server. |
| Error handling | Most API helpers swallow failures and return empty arrays/null, which makes outages look like empty data. | Use typed results, visible retry/error states, and centralized logging. |
| Character encoding | Source/output contains mojibake sequences for punctuation and symbols. | Normalize source files to UTF-8 and add a validation check. |

## 4. Critical findings and update priorities

### P0 — Security and data integrity (must be fixed before public release)

1. **The API does not authenticate normal user requests.** Any caller can supply a `userId`, read notes/completions, change progress, or delete records.
2. **Admin authorization trusts an email header and becomes open when `ADMIN_EMAILS` is empty.** The direct hash URL is not a security boundary.
3. **A client-selected role can be persisted as admin.** Admin promotion must never originate from an untrusted client field.
4. **Ownership checks are absent.** Note, bookmark, completion, and task mutations are performed by IDs without verifying the authenticated owner.
5. **CORS accepts every origin.** Production must use an explicit allow-list.
6. **Progress and XP are client-authoritative.** A caller can submit arbitrary XP, unlock values, stars, and rewards.
7. **User creation defaults to 150 XP on the server while the client starts at 0.** This creates inconsistent state.

### P1 — Core learning correctness

1. Ensure every selectable visualizer has the correct engine and renderer.
2. Make quiz IDs globally unique and rewards idempotent.
3. Replace generic theory/code/visualization fallbacks with explicit “not yet available” handling.
4. Consolidate local and server progress, including reliable guest-to-account migration.
5. Surface assigned tasks to students and connect them to level completion.

### P2 — Product completeness

1. Implement real streaks, badge awards, bookmarks, and leaderboard navigation.
2. Add review queues, spaced repetition, weak-topic recommendations, and richer teacher reporting.
3. Improve offline/mobile behavior, accessibility, and loading/error feedback.

### P3 — Scale and polish

1. Add content authoring/validation tools.
2. Add analytics and error monitoring with privacy controls.
3. Introduce classrooms, cohorts, due dates, notifications, and exportable reports.

## 5. Proposed target architecture

### 5.1 Frontend

- Introduce React Router with route guards for student/admin screens and deep links to levels.
- Split `App.tsx` into route layouts and domain hooks: authentication, progress, animation session, and learning content.
- Add TanStack Query (or a small equivalent query layer) for request caching, retries, invalidation, and explicit loading/error states.
- Add a lightweight state store only for client session state; keep server entities in the query cache.
- Lazy-load major routes and large content modules to reduce the current ~857 KB initial JavaScript bundle.
- Define a visualizer registry: each algorithm declares its engine, renderer, supported operations, sample input validator, code template, and theory entry.
- Replace broad `any` fields with discriminated types for tree, graph, DP matrix, string, and array frames.

### 5.2 Backend

- Verify Clerk bearer tokens with backend middleware and derive `userId`, email, and role from verified claims/database state.
- Organize Express into routes, controllers, services, validation schemas, and error middleware.
- Make all XP, stars, unlocks, streaks, and badges server-owned and transactionally awarded.
- Add request validation (for example Zod), consistent error envelopes, rate limiting, security headers, and environment validation.
- Add database migrations and seed scripts; never commit generated Prisma client files.
- Use cursor pagination for leaderboard/admin lists and aggregate queries for reporting.

### 5.3 Proposed data model additions

| Model/change | Purpose |
|---|---|
| `User.lastActiveDate`, `longestStreak`, `timezone` | Reliable daily streak calculation |
| `LearningEvent` | Append-only audit of quiz attempts, practice, flashcards, and level completions |
| `QuizAttempt` | Score, answers, hints, duration, attempt number, and earned reward |
| `Achievement` + `UserAchievement` | Badge definitions and idempotent awards |
| `Classroom` + `ClassroomMember` | Teacher-to-student grouping without global admin access |
| Extend `Task` with `classroomId`, `assignedById`, `dueAt`, `instructions` | Useful, auditable assignments |
| `UserSettings` | Accessibility, animation, language, notification, and privacy preferences |
| Unique bookmark constraint on `(userId, topicId)` | Prevent duplicate bookmarks |
| Completion uniqueness on `(userId, puzzleId, puzzleType)` | Avoid collisions across completion types |

## 6. Detailed phased roadmap

### Phase 0 — Baseline and repository hygiene (week 1)

**Goal:** make the current state reproducible and measurable.

Tasks:

- Write `README.md` with prerequisites, frontend/backend setup, PostgreSQL/Clerk configuration, Android workflow, and troubleshooting.
- Add `backend/.env.example` with `DATABASE_URL`, `PORT`, `CLERK_SECRET_KEY`, `ALLOWED_ORIGINS`, and admin bootstrap guidance.
- Add ESLint, Prettier, type-check scripts, and consistent Node/package-manager requirements.
- Align Capacitor packages on one supported major version.
- Remove tracked/generated `backend/node_modules`, backend build output, and generated Prisma client artifacts from version control in a dedicated cleanup commit.
- Create and commit an initial Prisma migration plus deterministic development seed.
- Normalize all project text to UTF-8 and repair mojibake.
- Add a content audit script that checks 38 unique level numbers/IDs, globally unique question IDs, valid answer indexes, valid prerequisites, and presence of theory/code/visualizer capability declarations.

Acceptance criteria:

- A new developer can run web, API, and database from documentation.
- `npm run check` passes in both packages.
- Clean checkout does not depend on generated artifacts.
- Content audit returns no duplicate IDs or broken references.

### Phase 1 — Secure identity and API boundaries (weeks 2–3)

**Goal:** no user or role can be impersonated through request data.

Tasks:

- Add Clerk token acquisition to the frontend API client and `Authorization: Bearer` headers.
- Add backend authentication middleware; derive the user from the verified Clerk subject.
- Replace user-scoped URL/body IDs with `/api/v1/me/...` endpoints where possible.
- Enforce record ownership for notes, bookmarks, completions, progress, and settings.
- Replace global “admin” self-selection with server-controlled `teacher` membership/role.
- Fail closed when admin configuration is absent; remove permissive dev behavior from production mode.
- Restrict CORS, configure Helmet, rate limits, payload limits, structured errors, and environment validation.
- Add audit records for role changes, assignment changes, and administrative reads.
- Rotate/remove any fallback Clerk publishable key embedded in source; require configured environment values.

Acceptance criteria:

- Unauthenticated requests receive 401; unauthorized cross-user/admin requests receive 403.
- Changing request IDs, email headers, or local role cannot expose or mutate another account.
- Security integration tests cover every protected route.

### Phase 2 — Reliable progress and assessment (weeks 4–5)

**Goal:** progress is consistent across devices and cannot be duplicated or inflated.

Tasks:

- Add `GET /api/v1/me/profile` hydration at app start and a clear offline state.
- Replace snapshot sync-on-every-render with discrete mutations: attempt submitted, level completed, activity recorded, preference changed.
- Award XP/stars/unlocks in a database transaction and only on eligible first/best completions.
- Add quiz attempts with accuracy, hints, time, retry count, and per-question results.
- Define scoring rules, for example: 1–3 stars from accuracy; XP reduced by hints/retries; best score retained; retries allowed without duplicate base rewards.
- Generate a stable UUID for guests and migrate local progress after sign-in with a documented merge policy.
- Add offline mutation queue/retry for mobile; show sync state and conflict outcome.
- Derive the total level count from catalog metadata rather than hard-coding `38` in the backend.

Acceptance criteria:

- The same learner sees the same progress on two devices.
- Replaying/resetting a completed quiz cannot repeatedly grant base XP.
- Interrupted/offline completion eventually syncs once and only once.

### Phase 3 — Visualizer and curriculum correctness (weeks 5–8, parallel content track)

**Goal:** every advertised interactive topic accurately demonstrates its algorithm.

Create the registry and then implement in priority batches:

| Batch | Algorithms | Required interaction |
|---|---|---|
| A | Heap, Segment Tree, B-Tree, KMP | Build/insert/query or scan with algorithm-specific rendering |
| B | BFS, DFS, MST, Bellman-Ford, Floyd-Warshall | Editable graph/source, traversal/relaxation steps, distances/parents |
| C | LCS, Matrix Chain, Edit Distance | Custom inputs, recurrence visualization, reconstruction |
| D | Red-Black Tree, Fenwick Tree, DSU, Topological Sort | Correct invariants and operation-specific controls |
| E | Tarjan, Max Flow, Suffix Array, Z, Manacher | Advanced step traces and state panels |
| F | Remaining advanced levels | Dedicated renderer or clearly labeled theory/quiz-only status |

For every algorithm:

- define input schema and validation;
- produce deterministic frames with semantic code-step identifiers;
- add theory, complexity, real-world use, and at least one worked example;
- validate every provided language template against the semantic highlight map;
- add engine unit tests for invariants and known examples;
- add visualizer controls suited to the algorithm rather than showing tree controls generically.

Acceptance criteria:

- No topic silently falls back to an unrelated algorithm.
- Every interactive level passes engine correctness and frame-schema tests.
- Canvas, explanation, variable watch, and code highlight describe the same step.

### Phase 4 — Complete the learner loop (weeks 8–10)

**Goal:** turn existing partial features into a coherent daily learning experience.

Tasks:

- Add a home dashboard with “Continue learning,” assigned tasks, daily goal, weak topics, and recent activity.
- Add a student assignments route with due date, teacher instructions, status, and direct start action.
- Implement server-calculated streaks using the user’s timezone and a defined grace policy.
- Add badges for first level, topic mastery, category completion, streak milestones, perfect quizzes, and practice volume.
- Connect bookmark buttons to theory, code, and explanations; add remove/edit behavior in Study Vault.
- Expose the live leaderboard with weekly/all-time scopes and current-user rank; remove static entries.
- Consolidate Practice Playground and Sandbox into one deliberate practice experience.
- Add spaced-repetition flashcard scheduling and a “Review mistakes” queue from quiz attempts.
- Show visible offline/error/retry states instead of treating failed requests as empty lists.

Acceptance criteria:

- Every dashboard metric has a real update path.
- Teacher assignment → student completion → teacher status is a tested end-to-end flow.
- Learners can resume an unfinished activity and review prior mistakes.

### Phase 5 — Teacher experience and insight (weeks 10–12)

**Goal:** make classroom use actionable rather than purely observational.

Tasks:

- Introduce classrooms and invitation/join codes.
- Add due dates, bulk assignment by classroom, reassignment, and completion filters.
- Add mastery views by algorithm/category, attempt accuracy, hint usage, time-on-task, and inactive learners.
- Add CSV export and printable progress reports.
- Add safe pagination, sorting, filtering, and empty/error states to admin tables.
- Replace polling where beneficial with manual refresh plus sensible cache invalidation; consider server-sent events only after measuring need.
- Ensure teachers can see only their classrooms unless they hold a separately provisioned platform-admin role.

Acceptance criteria:

- Teacher data access is scoped by classroom membership.
- A teacher can identify weak topics and assign remediation in under three actions.

### Phase 6 — Quality, accessibility, performance, and mobile release (weeks 11–14)

**Goal:** establish a production-quality release gate.

Tasks:

- Add Vitest + React Testing Library for components/hooks and Supertest for API integration.
- Add Playwright end-to-end flows for guest onboarding, sign-in, quiz completion, notes, assignments, and authorization failures.
- Add CI for install, content audit, lint, type-check, tests, production builds, Prisma migration checks, and secret scanning.
- Lazy-load routes/content, split vendor bundles, and establish budgets for initial JS, LCP, CLS, and interaction latency.
- Audit keyboard navigation, focus management, labels, color contrast, reduced motion, screen-reader announcements, and SVG alternatives.
- Test layouts at mobile/tablet/desktop widths and on supported Android versions.
- Add an error boundary, API request correlation IDs, privacy-conscious error monitoring, and uptime/health checks.
- Define backup, migration rollback, data retention, account deletion/export, privacy policy, and release checklist.

Acceptance criteria:

- Critical user journeys pass in CI.
- No critical/high accessibility violations in automated scans plus manual keyboard review.
- Initial bundle no longer triggers the current large-chunk warning or has an approved measured exception.
- Android release candidate installs, authenticates, works offline as designed, and passes smoke tests.

## 7. Proposed new features after stabilization

These features should begin only after Phases 1–4 are stable:

1. **Adaptive learning path:** recommend the next lesson from quiz accuracy, attempts, and review history.
2. **Daily challenge:** one rotating mixed-topic challenge with an idempotent daily reward.
3. **Mistake notebook:** automatically collect incorrect answers with explanations and retry scheduling.
4. **Custom algorithm inputs:** graph editor, DP inputs, string pattern/text inputs, and importable examples.
5. **Shareable visualizer sessions:** encode a safe input and step in a URL without exposing user data.
6. **Classroom tournaments:** opt-in, time-bounded leaderboards with anti-cheat rules and teacher controls.
7. **Localization:** externalize UI/content strings after encoding is fixed; start with English plus the audience’s priority language.
8. **Content authoring console:** draft, validate, preview, version, and publish levels without editing application source.

## 8. Suggested file-level implementation map

| Area | Files/modules to create or update |
|---|---|
| Routing/layout | Split `src/App.tsx`; add `src/routes/`, student/admin layouts, protected routes, lazy imports |
| Auth/API | Replace ad hoc calls in `src/services/api.ts` with authenticated client, typed errors, domain modules, and query hooks |
| Progress | Add `src/features/progress/`; server progress service/controller; guest migration and sync queue |
| Visualizers | Add `src/visualizers/registry.ts`; per-algorithm engine, renderer, input control, and tests |
| Content quality | Add `scripts/validate-content.ts`; schema for levels/questions/theory/templates; CI command |
| Quiz | Refactor `QuizArena.tsx` into session, question, results, and review components; persist attempts server-side |
| Student tasks | Add `src/components/Assignments/`; authenticated `/api/v1/me/tasks` endpoints |
| Achievements/streaks | Add Prisma models, backend award/activity services, frontend celebration/history components |
| Admin/classrooms | Refactor `AdminPage.tsx`; classroom-scoped routes/services and paginated reports |
| Tests | Add colocated `*.test.ts(x)`, `backend/src/**/*.test.ts`, and `e2e/` Playwright specs |
| Operations/docs | Add `README.md`, `CONTRIBUTING.md`, architecture decision records, CI workflow, deployment/runbook docs |

## 9. API direction

Proposed authenticated routes:

```text
GET    /api/v1/me
PATCH  /api/v1/me/settings
GET    /api/v1/me/progress
POST   /api/v1/me/quiz-attempts
POST   /api/v1/me/learning-events
GET    /api/v1/me/assignments
GET    /api/v1/me/notes
POST   /api/v1/me/notes
PATCH  /api/v1/me/notes/:noteId
DELETE /api/v1/me/notes/:noteId
GET    /api/v1/me/bookmarks
POST   /api/v1/me/bookmarks
DELETE /api/v1/me/bookmarks/:bookmarkId
GET    /api/v1/leaderboard?period=weekly&cursor=...

GET    /api/v1/teacher/classrooms
POST   /api/v1/teacher/classrooms
POST   /api/v1/teacher/classrooms/:id/assignments
GET    /api/v1/teacher/classrooms/:id/report
```

All mutation requests should support an idempotency key where retries could duplicate rewards or events. Errors should have a consistent shape such as `{ error: { code, message, requestId, details? } }`.

## 10. Test strategy

### Unit tests

- Algorithm invariants and expected final states.
- Code-highlight resolver mappings.
- Scoring, streak, badge, unlock, and merge policies.
- Content schema and uniqueness validation.

### Integration tests

- Authentication and ownership on every endpoint.
- Transactional/idempotent quiz and level completion.
- Task assignment auto-completion.
- Prisma constraints, migration, and seed behavior.

### End-to-end tests

- New guest completes onboarding and first level.
- Guest signs in and merges progress.
- Student receives and completes an assignment.
- Teacher views only an authorized classroom.
- Offline attempt queues and syncs after reconnect.
- Notes/bookmarks CRUD and error recovery.

### Manual verification

- Algorithm explanation/code/canvas alignment.
- Keyboard and screen-reader flows.
- Android lifecycle, back button, safe areas, network loss, resume, and deep links.

## 11. Product metrics and release gates

Track only with clear consent and avoid collecting code/note contents unnecessarily.

| Outcome | Suggested metric |
|---|---|
| Activation | Onboarding → first visualizer → first quiz completion |
| Learning | First-attempt accuracy and improvement on review |
| Engagement | Weekly active learners, levels/week, review completion |
| Retention | D1/D7/D30 returning learners |
| Reliability | API error rate, sync failures, crash-free sessions |
| Performance | LCP, INP, CLS, initial JS, API p95 latency |
| Teacher value | Assignment completion and weekly active classrooms |

Release blockers:

- any P0 authorization/data-integrity issue;
- duplicate reward or progress-loss defect;
- unrelated algorithm shown for a published interactive lesson;
- failing critical E2E flow;
- inaccessible core flow or unsupported Android startup/auth failure.

## 12. Delivery order and ownership suggestion

| Workstream | Primary scope | Dependency |
|---|---|---|
| Platform/API | Auth, schema, progress, CI, operations | Starts immediately |
| Learning engine | Registry, algorithm correctness, tests | Starts after content audit |
| Learner experience | Home, assignments, achievements, review | Depends on progress APIs |
| Teacher experience | Classrooms, reporting, exports | Depends on secure roles and events |
| Content | Theory/code/questions, QA rubric | Runs continuously with validation |
| Mobile/quality | Accessibility, performance, Android release | Continuous; final gate after core flows |

For a small team, execute Phases 0–2 sequentially, then run visualizer/content and learner-experience work in parallel. Do not build competitive/social features ahead of secure, trustworthy progress.

## 13. Immediate next sprint (recommended 10 working days)

1. Add setup documentation, backend environment template, formatting/linting, and content validation.
2. Create the first Prisma migration and seed; stop tracking generated dependencies/artifacts.
3. Implement verified Clerk auth middleware and authenticated API client.
4. Convert notes and completions to `/me` endpoints with ownership tests.
5. Remove client-controlled admin role and fail-open admin behavior.
6. Define the visualizer registry and mark current capability truthfully for all 38 levels.
7. Fix UTF-8 text and remove disconnected imports/components or place them in the roadmap explicitly.
8. Add CI with frontend/backend builds plus the first security and engine tests.

### Sprint definition of done

- Both builds, lint, content checks, and tests pass from one documented command.
- No API accepts a user identity or admin privilege solely from client-controlled data.
- The UI never silently displays the wrong visualization for a level.
- Changes include migrations, tests, documentation, and rollback notes.

## 14. Current validation snapshot

At the time of this analysis:

- frontend TypeScript/Vite production build: **passes**;
- backend TypeScript build: **passes**;
- frontend output: approximately **857 KB JavaScript minified / 233 KB gzip**, with a Vite large-chunk warning;
- catalog: **38 campaign levels**, approximately **373 quiz entries**, plus one inline introductory question per level;
- automated project tests: **none found**;
- project README, CI workflow, committed Prisma migrations, and backend environment example: **not found**.

This snapshot should be captured again after every phase so the roadmap remains measurable and current.
