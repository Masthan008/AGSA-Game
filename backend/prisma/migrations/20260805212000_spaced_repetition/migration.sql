CREATE TABLE "FlashcardReview" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "cardId" TEXT NOT NULL,
  "intervalDays" INTEGER NOT NULL DEFAULT 0,
  "ease" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
  "nextReviewAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "reviewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "lastRating" TEXT NOT NULL DEFAULT 'new',
  CONSTRAINT "FlashcardReview_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "FlashcardReview_userId_cardId_key" ON "FlashcardReview"("userId", "cardId");
CREATE INDEX "FlashcardReview_userId_nextReviewAt_idx" ON "FlashcardReview"("userId", "nextReviewAt");
ALTER TABLE "FlashcardReview" ADD CONSTRAINT "FlashcardReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
