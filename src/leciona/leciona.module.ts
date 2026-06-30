import { Module } from "@nestjs/common";
import { LecionaService } from "./leciona.service";
import { LecionaController } from "./leciona.controller";

@Module({
  controllers: [LecionaController],
  providers: [LecionaService],
})
export class LecionaModule {}
