import { Module } from "@nestjs/common";
import { CursaService } from "./cursa.service";
import { CursaController } from "./cursa.controller";

@Module({
  controllers: [CursaController],
  providers: [CursaService],
})
export class CursaModule {}
