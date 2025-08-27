/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "createdAt",
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
