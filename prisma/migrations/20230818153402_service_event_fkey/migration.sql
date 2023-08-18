/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Services` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "Events_serviceId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Services_id_key" ON "Services"("id");

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
