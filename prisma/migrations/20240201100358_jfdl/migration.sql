-- DropForeignKey
ALTER TABLE "Faq" DROP CONSTRAINT "Faq_instituteId_fkey";

-- AlterTable
ALTER TABLE "Faq" ALTER COLUMN "instituteId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Faq" ADD CONSTRAINT "Faq_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE SET NULL ON UPDATE CASCADE;
