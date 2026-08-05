CREATE TABLE "TreeAssignment" (
  "id" TEXT NOT NULL, "studentId" TEXT NOT NULL, "teacherId" TEXT NOT NULL, "classroomId" TEXT,
  "topic" TEXT NOT NULL, "operation" TEXT NOT NULL, "initialState" JSONB NOT NULL, "targetState" JSONB,
  "btreeDegree" INTEGER, "difficulty" TEXT NOT NULL DEFAULT 'beginner', "instructions" TEXT,
  "dueAt" TIMESTAMP(3), "maxAttempts" INTEGER NOT NULL DEFAULT 3, "hintsAllowed" BOOLEAN NOT NULL DEFAULT true,
  "requiredScore" INTEGER NOT NULL DEFAULT 70, "xpReward" INTEGER NOT NULL DEFAULT 40,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "TreeAssignment_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "TreeSubmission" (
  "id" TEXT NOT NULL, "assignmentId" TEXT NOT NULL, "studentId" TEXT NOT NULL, "status" TEXT NOT NULL DEFAULT 'in_progress',
  "finalState" JSONB, "score" INTEGER NOT NULL DEFAULT 0, "hintsUsed" INTEGER NOT NULL DEFAULT 0,
  "durationMs" INTEGER NOT NULL DEFAULT 0, "attemptNumber" INTEGER NOT NULL DEFAULT 1, "feedback" JSONB,
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "submittedAt" TIMESTAMP(3),
  CONSTRAINT "TreeSubmission_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "TreeOperationStep" (
  "id" TEXT NOT NULL, "submissionId" TEXT NOT NULL, "sequence" INTEGER NOT NULL, "operation" TEXT NOT NULL,
  "payload" JSONB NOT NULL, "stateAfter" JSONB NOT NULL, "correct" BOOLEAN, "skillKey" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "TreeOperationStep_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "LessonCheckpoint" (
  "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "topic" TEXT NOT NULL, "checkpointKey" TEXT NOT NULL,
  "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "LessonCheckpoint_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "StudentSkillMastery" (
  "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "topic" TEXT NOT NULL, "skillKey" TEXT NOT NULL,
  "attempts" INTEGER NOT NULL DEFAULT 0, "correct" INTEGER NOT NULL DEFAULT 0, "hintsUsed" INTEGER NOT NULL DEFAULT 0,
  "mastery" DOUBLE PRECISION NOT NULL DEFAULT 0, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "StudentSkillMastery_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "TreeAssignment_studentId_dueAt_idx" ON "TreeAssignment"("studentId", "dueAt");
CREATE INDEX "TreeAssignment_teacherId_createdAt_idx" ON "TreeAssignment"("teacherId", "createdAt");
CREATE INDEX "TreeAssignment_classroomId_idx" ON "TreeAssignment"("classroomId");
CREATE UNIQUE INDEX "TreeSubmission_assignmentId_studentId_attemptNumber_key" ON "TreeSubmission"("assignmentId", "studentId", "attemptNumber");
CREATE INDEX "TreeSubmission_studentId_submittedAt_idx" ON "TreeSubmission"("studentId", "submittedAt");
CREATE UNIQUE INDEX "TreeOperationStep_submissionId_sequence_key" ON "TreeOperationStep"("submissionId", "sequence");
CREATE UNIQUE INDEX "LessonCheckpoint_userId_topic_checkpointKey_key" ON "LessonCheckpoint"("userId", "topic", "checkpointKey");
CREATE UNIQUE INDEX "StudentSkillMastery_userId_topic_skillKey_key" ON "StudentSkillMastery"("userId", "topic", "skillKey");
CREATE INDEX "StudentSkillMastery_userId_mastery_idx" ON "StudentSkillMastery"("userId", "mastery");
ALTER TABLE "TreeAssignment" ADD CONSTRAINT "TreeAssignment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TreeAssignment" ADD CONSTRAINT "TreeAssignment_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TreeAssignment" ADD CONSTRAINT "TreeAssignment_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "TreeSubmission" ADD CONSTRAINT "TreeSubmission_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "TreeAssignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TreeSubmission" ADD CONSTRAINT "TreeSubmission_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TreeOperationStep" ADD CONSTRAINT "TreeOperationStep_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "TreeSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LessonCheckpoint" ADD CONSTRAINT "LessonCheckpoint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudentSkillMastery" ADD CONSTRAINT "StudentSkillMastery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
