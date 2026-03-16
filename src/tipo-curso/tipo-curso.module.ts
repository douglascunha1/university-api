import { Module } from "@nestjs/common";
import { TipoCursoService } from "./tipo-curso.service";
import { TipoCursoController } from "./tipo-curso.controller";

@Module({
  controllers: [TipoCursoController],
  providers: [TipoCursoService],
})
export class TipoCursoModule {}
