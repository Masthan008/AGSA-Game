# Backend production operations

## Required release configuration

Set `NODE_ENV=production`, a TLS-protected PostgreSQL `DATABASE_URL`, Clerk keys from one production instance, an explicit `ALLOWED_ORIGINS` list, and a reviewed `ADMIN_EMAILS` bootstrap list. Store values in the hosting provider's secret manager, never in Git.

Before every deployment run `npm ci`, `npm run check`, `npx prisma validate`, and `npx prisma migrate deploy`. Deploy application code only after the database migration succeeds.

## Health, logging, and alerts

Monitor `GET /health` every minute from outside the hosting network. Alert after three consecutive failures or a five-minute error rate above 2%. Every response includes `x-request-id`; server logs are one-line JSON containing request ID, method, path, status, and duration. Forward logs to the chosen provider with a 30-day default retention and redact authorization headers, notes, answers, and request bodies.

## Backup and restore

- Enable encrypted daily PostgreSQL snapshots with 30-day retention and point-in-time recovery when supported.
- Once per month, restore the newest backup into an isolated non-production database.
- Run `npx prisma migrate status`, compare table counts, and execute the API integration suite against the restored database.
- Record restore duration, snapshot identifier, operator, and validation outcome. Delete the isolated restore after verification.

## Migration rollback

Migrations are forward-only. Before destructive schema changes, take an on-demand snapshot and ship expand/migrate/contract changes across separate releases. If deployment fails, roll application code back to the last compatible build. Use `prisma migrate resolve` only after the database state has been manually verified; never edit an applied migration.

## Retention, export, and deletion

Keep active learning records while the account exists. Purge expired idempotency records daily and audit records after 180 days unless policy or law requires longer. An account export must include the user profile, progress, attempts, achievements, notes, bookmarks, classroom memberships, assignments, and flashcard reviews as JSON. Account deletion must verify recent authentication, export first when requested, then delete the `User`; cascading foreign keys remove owned learning data. Remove the corresponding Clerk identity separately and record only a non-identifying deletion receipt.

## Incident checklist

1. Identify affected requests using `x-request-id` and structured logs.
2. Disable writes or roll back application code if progress integrity is at risk.
3. Preserve relevant audit records and database snapshots.
4. Correct and verify in staging, then deploy through the normal migration gate.
5. Document impact, timeline, remediation, and any required learner notification.
