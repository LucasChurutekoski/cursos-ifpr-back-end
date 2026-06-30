/*
  Warnings:

  - A unique constraint covering the columns `[alunoId,cursoId]` on the table `Matricula` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Matricula_alunoId_cursoId_key" ON "Matricula"("alunoId", "cursoId");
