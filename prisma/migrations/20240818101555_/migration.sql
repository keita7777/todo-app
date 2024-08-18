/*
  Warnings:

  - Added the required column `statusId` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusName` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "statusId" TEXT NOT NULL,
ADD COLUMN     "statusName" TEXT NOT NULL;
