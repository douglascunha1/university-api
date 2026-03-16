import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { TipoDisciplinaService } from "./tipo-disciplina.service";
import { CreateTipoDisciplinaDto } from "./dto/create-tipo-disciplina.dto";
import { UpdateTipoDisciplinaDto } from "./dto/update-tipo-disciplina.dto";

@Controller("tipos-disciplina")
export class TipoDisciplinaController {
  constructor(private readonly service: TipoDisciplinaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTipoDisciplinaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateTipoDisciplinaDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
