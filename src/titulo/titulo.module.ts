import { Module } from "@nestjs/common";
import { TituloService } from "./titulo.service";
import { TituloController } from "./titulo.controller";

@Module({
  controllers: [TituloController],
  providers: [TituloService],
})
export class TituloModule {}
