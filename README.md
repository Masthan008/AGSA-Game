# ADSA Quest

> **See it. Trace it. Build it. Explain it. Master it.**

ADSA Quest is an interactive learning world for data structures and algorithms. It turns abstract topics into a guided sequence of visual explanations, synchronized code, deliberate practice, quizzes, and progress feedback—on the web and Android.

---

## The learning experience

```text
Understand → Watch → Trace → Interact → Practise → Prove → Review
   theory    steps    code      input       sandbox     quiz    weak areas
```

Every published topic is expected to teach one coherent mental model:

1. **Purpose first** — what problem the structure or algorithm solves.
2. **Pin-to-pin theory** — definitions, invariants, complexity, edge cases, and real uses.
3. **Worked example** — a small input explained before animation begins.
4. **Step visualizer** — one meaningful state change per frame with a reason and variable watch.
5. **Synchronized code** — the same semantic step highlighted in up to eight languages.
6. **Hands-on practice** — safe custom inputs, operations, reset, and replay.
7. **Tiered assessment** — beginner, medium, and mastery questions with helpful feedback.
8. **Review loop** — notes, bookmarks, flashcards, mistakes, assignments, and progress.

The quality bar is simple: a learner should never see an unrelated animation, unexplained state change, or reward that does not reflect their work.

## Product tour

| Experience | What learners can do |
|---|---|
| Campaign | Move through 38 sequenced ADSA levels, unlock topics, earn stars, and continue where they stopped |
| Visualizer | Play, pause, step, rewind, change speed, inspect explanations, and interact with supported algorithms |
| Theory | Learn definitions, invariants, complexities, use cases, edge cases, and worked steps |
| Code tracer | Follow the visual step in C++, Java, Python, JavaScript, C#, Go, Rust, or C where available |
| Challenge arena | Answer tiered questions, use hints, inspect explanations, and demonstrate mastery |
| Sandbox | Try custom inputs across tree, graph, DP, and string algorithms |
| Study vault | Create, edit, search, pin, and organize notes and bookmarks |
| Flashcards | Review concepts in small repeatable sessions |
| Dashboard | Track XP, stars, completed levels, streaks, badges, and category progress |
| Teacher console | Create scoped classrooms, enroll learners, assign lessons with due dates, inspect progress, and export CSV reports |

## Curriculum map

The current catalog spans:

- Trees: BST, AVL, Red-Black, Heap, B-Tree, Segment/Fenwick/Splay trees and related structures
- Graphs: BFS/DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, MST, Tarjan, topological sort, and max flow
- Dynamic programming: Knapsack, LCS, Matrix Chain, Edit Distance, Bitmask DP, and N-Queens
- Strings and tries: Trie, KMP, Suffix Array, Z Algorithm, and Manacher
- Advanced structures and techniques: DSU, hashing, skip lists, bloom filters, sparse tables, and more

Every campaign level now declares a topic-specific engine in the visualizer registry. Run `npm run validate:content` after any curriculum change; it rejects missing theory, code, questions, or visualizer mappings.

## Technology

| Surface | Stack |
|---|---|
| Frontend | React 18, TypeScript, Vite 8 |
| Authentication UI | Clerk |
| API | Express, TypeScript |
| Database | PostgreSQL, Prisma |
| Mobile | Capacitor 8, Gradle 8.13, Android SDK 36 |
| Visuals | SVG/DOM renderers, frame-based algorithm engines, Lucide icons |

## Repository layout

```text
ADSA GAME/
├── src/
│   ├── algorithms/       # deterministic animation-frame generators
│   ├── components/       # learner, visualizer, study, profile, and admin UI
│   ├── data/             # levels, quizzes, theory, comparisons, code templates
│   ├── services/         # frontend API integration
│   └── types/            # shared frontend contracts
├── backend/
│   ├── prisma/           # schema and migrations
│   └── src/              # Express API
├── android/              # Capacitor Android host
├── public/               # app icons and splash assets
├── scripts/              # repository/content quality checks
└── PROJECT_UPDATE_PLAN.md
```

## Local setup

### Prerequisites

- Node.js 20.19 or newer (Node 22/24 supported)
- npm 10 or newer
- PostgreSQL 15 or newer
- A Clerk application for authenticated flows
- Android Studio and a supported JDK only when building Android

### 1. Install packages

```powershell
npm install
npm --prefix backend install
```

### 2. Configure the frontend

```powershell
Copy-Item .env.example .env
```

Set:

```dotenv
VITE_CLERK_PUBLISHABLE_KEY="pk_test_..."
VITE_API_URL="http://localhost:5000"
```

### 3. Configure the API

```powershell
Copy-Item backend/.env.example backend/.env
```

Provide a real PostgreSQL URL and Clerk keys. Keep `.env` files private; only the examples belong in Git.

### 4. Create the database

```powershell
npm --prefix backend run prisma:generate
npm --prefix backend run prisma:deploy
```

For local schema development, use `npm --prefix backend run prisma:migrate` and commit the generated migration.

### 5. Start both applications

Terminal one:

```powershell
npm --prefix backend run dev
```

Terminal two:

```powershell
npm run dev
```

Open `http://localhost:5173`. The API health endpoint is `http://localhost:5000/health`.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build the web app |
| `npm run validate:content` | Audit level/question references and content coverage |
| `npm run test` | Run deterministic algorithm-engine tests |
| `npm run check` | Run the complete content, type, test, and frontend/backend build gate |
| `npm --prefix backend run test` | Run protected API integration tests |
| `npm --prefix backend run dev` | Start the API in watch mode |
| `npm --prefix backend run prisma:deploy` | Apply committed migrations |
| `npm run cap:sync` | Build web assets and synchronize native projects |
| `npm run cap:open:android` | Open the Android project |

## Creating or updating a learning topic

A topic is complete only when its pieces agree with each other.

1. Add/update level metadata in `src/data/levelsData.ts`.
2. Add globally unique tiered questions in `src/data/quizData.ts`.
3. Add theory in `src/data/theoryData.ts` with definitions, invariants, complexity, worked steps, applications, and edge cases.
4. Add code templates in `src/data/codeTemplates/`.
5. Register a compatible visualizer engine and renderer; never rely on an unrelated fallback.
6. Add deterministic examples and tests for final state, invariants, and semantic code steps.
7. Run `npm run validate:content` and `npm run check`.
8. Manually verify the same story is told by theory, canvas, explanation, variables, code, and quiz feedback.

### Content writing rubric

- Use short sentences before formal terminology.
- Define every symbol before using it.
- Explain *why* an operation is performed, not only what changed.
- Use one visual state change per step.
- Include best, average, and worst cases where meaningful.
- Show failure/edge cases and common misconceptions.
- Keep examples small enough to calculate by hand.
- End with a retrieval question: “Could the learner reproduce this without the animation?”

## Data and security expectations

- The backend must derive authenticated identity from a verified Clerk token—not a username, email header, or request body.
- Roles and XP are server-owned. A client must never promote itself or choose its reward.
- Every user-owned read/write must enforce ownership.
- Production CORS must list known origins.
- Database changes require a committed Prisma migration.
- Do not commit `.env`, database credentials, Clerk secrets, generated clients, build output, or `node_modules`.

The API verifies Clerk bearer tokens, derives ownership from the verified subject, validates request bodies, rate-limits traffic, restricts CORS, and keeps roles and rewards server-owned. Production still requires real Clerk keys, an explicit origin allow-list, applied migrations, and a provisioned teacher/admin account.

## Quality gate

Before opening a pull request or producing an Android build:

```powershell
npm run check
git diff --check
```

Also verify:

- the changed topic has no fallback visualizer;
- keyboard focus and reduced motion remain usable;
- mobile layout works at 360 px width;
- offline/API failure is visible and recoverable;
- quiz rewards are not duplicated by replay or retry;
- no secret or generated dependency is staged.

## Android

```powershell
npm run cap:sync
npm run cap:open:android
```

Use Java 21 and Android SDK 36. `ANDROID_HOME` must point to the installed SDK before running `android\gradlew.bat assembleDebug`. Test authentication, app resume, Android back behavior, safe areas, keyboard input, network loss, and deep links on a real device before release.

## Roadmap and project status

The authoritative implementation sequence, risk register, API direction, acceptance criteria, test plan, and next sprint are in [PROJECT_UPDATE_PLAN.md](./PROJECT_UPDATE_PLAN.md).

Implemented baseline (verified 5 August 2026):

- 38 campaign levels
- 373 detailed quiz entries with validated answer indexes and unique IDs
- topic-specific visualizer registration for all 38 campaign levels
- server-owned identity, rewards, unlocks, streaks, achievements, and one-time guest migration
- quiz-attempt history, mistake review, offline completion queue, and spaced-repetition flashcards
- classroom-scoped assignments, due dates, teacher instructions, reports, and CSV export
- lazy-loaded learning surfaces; initial production JavaScript is about 406 KB minified / 125 KB gzip with no Vite chunk warning
- 37 deterministic engine tests, 4 protected API integration tests, and a CI quality workflow
- frontend and backend production builds plus Android debug assembly passing

Remaining release work is explicit in the plan: browser E2E and automated accessibility coverage, transactional/idempotency hardening, observability/privacy operations, real-device Android smoke testing, and removal of generated dependencies/build artifacts from version control.

## Contributing

Keep changes focused and reviewable. Preserve learner-facing correctness over visual novelty. A feature is done when it has error/loading states, tests proportional to risk, documentation, accessible interaction, and a trustworthy persistence path—not when the happy-path screen first renders.

When reporting a content defect, include the level, input, expected steps, actual steps, language/template, and a screenshot or frame number when possible.

## License

No license has been declared yet. Add an explicit license before accepting external contributions or distributing the project beyond its intended private use.
