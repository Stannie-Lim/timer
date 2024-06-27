/*
  Warnings:

  - Added the required column `count` to the `changelog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "changelog" ADD COLUMN     "count" INTEGER NOT NULL;
