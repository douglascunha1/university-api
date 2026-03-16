import { Module } from "@nestjs/common";
import { TipoDisciplinaService } from "./tipo-disciplina.service";
import { TipoDisciplinaController } from "./tipo-disciplina.controller";

@Module({
  controllers: [TipoDisciplinaController],
  providers: [TipoDisciplinaService],
})
export class TipoDisciplinaModule {}
