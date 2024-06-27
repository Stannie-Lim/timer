-- CreateEnum
CREATE TYPE "Reason" AS ENUM ('MANUAL', 'AUTOMATIC');

-- AlterTable
ALTER TABLE "counter" ADD COLUMN     "reason" "Reason" NOT NULL DEFAULT 'MANUAL';
