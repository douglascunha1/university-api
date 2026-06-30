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
import { TipoCursoService } from "./tipo-curso.service";
import { CreateTipoCursoDto } from "./dto/create-tipo-curso.dto";
import { UpdateTipoCursoDto } from "./dto/update-tipo-curso.dto";

@Controller("tipos-curso")
export class TipoCursoController {
  constructor(private readonly service: TipoCursoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTipoCursoDto) {
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
    @Body() dto: UpdateTipoCursoDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
