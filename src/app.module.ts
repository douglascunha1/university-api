import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { TituloModule } from "./titulo/titulo.module";
import { TipoCursoModule } from "./tipo-curso/tipo-curso.module";
import { TipoDisciplinaModule } from "./tipo-disciplina/tipo-disciplina.module";
import { InstituicaoModule } from "./instituicao/instituicao.module";
import { ProfessorModule } from "./professor/professor.module";
import { CursoModule } from "./curso/curso.module";
import { DisciplinaModule } from "./disciplina/disciplina.module";
import { LecionaModule } from "./leciona/leciona.module";
import { AlunoModule } from "./aluno/aluno.module";
import { CursaModule } from "./cursa/cursa.module";

@Module({
  imports: [
    PrismaModule,
    TituloModule,
    TipoCursoModule,
    TipoDisciplinaModule,
    InstituicaoModule,
    ProfessorModule,
    CursoModule,
    DisciplinaModule,
    LecionaModule,
    AlunoModule,
    CursaModule,
  ],
})
export class AppModule {}
