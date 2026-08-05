CREATE TABLE "QuizAttempt" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "puzzleId" TEXT NOT NULL,
  "levelId" TEXT NOT NULL,
  "selectedIndex" INTEGER NOT NULL,
  "correct" BOOLEAN NOT NULL,
  "hintUsed" BOOLEAN NOT NULL DEFAULT false,
  "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "QuizAttempt_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "QuizAttempt_userId_attemptedAt_idx" ON "QuizAttempt"("userId", "attemptedAt");
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
