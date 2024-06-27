/*
  Warnings:

  - You are about to drop the column `reason` on the `counter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "counter" DROP COLUMN "reason";

-- CreateTable
CREATE TABLE "changelog" (
    "id" SERIAL NOT NULL,
    "reason" "Reason" NOT NULL DEFAULT 'MANUAL',
    "counterId" INTEGER NOT NULL,

    CONSTRAINT "changelog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "changelog" ADD CONSTRAINT "changelog_counterId_fkey" FOREIGN KEY ("counterId") REFERENCES "counter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
