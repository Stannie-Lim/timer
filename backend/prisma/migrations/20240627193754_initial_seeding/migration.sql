/*
  Warnings:

  - The values [MANUAL,AUTOMATIC] on the enum `Reason` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Reason_new" AS ENUM ('MANUALLY', 'AUTOMATICALLY');
ALTER TABLE "changelog" ALTER COLUMN "reason" DROP DEFAULT;
ALTER TABLE "changelog" ALTER COLUMN "reason" TYPE "Reason_new" USING ("reason"::text::"Reason_new");
ALTER TYPE "Reason" RENAME TO "Reason_old";
ALTER TYPE "Reason_new" RENAME TO "Reason";
DROP TYPE "Reason_old";
ALTER TABLE "changelog" ALTER COLUMN "reason" SET DEFAULT 'MANUALLY';
COMMIT;

-- AlterTable
ALTER TABLE "changelog" ALTER COLUMN "reason" SET DEFAULT 'MANUALLY';
