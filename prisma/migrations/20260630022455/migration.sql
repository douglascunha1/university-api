-- RenameForeignKey
ALTER TABLE "cursa" RENAME CONSTRAINT "fk_cursa_aluno" TO "cursa_id_aluno_fkey";

-- RenameForeignKey
ALTER TABLE "cursa" RENAME CONSTRAINT "fk_cursa_disciplina" TO "cursa_id_disciplina_fkey";

-- RenameForeignKey
ALTER TABLE "curso" RENAME CONSTRAINT "fk_curso_instituicao" TO "curso_id_instituicao_fkey";

-- RenameForeignKey
ALTER TABLE "curso" RENAME CONSTRAINT "fk_curso_tipo_curso" TO "curso_id_tipo_curso_fkey";

-- RenameForeignKey
ALTER TABLE "disciplina" RENAME CONSTRAINT "fk_disciplina_curso" TO "disciplina_id_curso_fkey";

-- RenameForeignKey
ALTER TABLE "disciplina" RENAME CONSTRAINT "fk_disciplina_tipo" TO "disciplina_id_tipo_disciplina_fkey";

-- RenameForeignKey
ALTER TABLE "leciona" RENAME CONSTRAINT "fk_leciona_disciplina" TO "leciona_id_disciplina_fkey";

-- RenameForeignKey
ALTER TABLE "leciona" RENAME CONSTRAINT "fk_leciona_professor" TO "leciona_id_professor_fkey";

-- RenameForeignKey
ALTER TABLE "professor" RENAME CONSTRAINT "fk_professor_titulo" TO "professor_id_titulo_fkey";

-- RenameIndex
ALTER INDEX "uq_curso" RENAME TO "curso_id_instituicao_id_tipo_curso_tx_descricao_key";
