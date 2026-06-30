import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { LecionaService } from "./leciona.service";
import { CreateLecionaDto } from "./dto/create-leciona.dto";

@Controller("leciona")
export class LecionaController {
  constructor(private readonly service: LecionaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateLecionaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get("professor/:idProfessor")
  findByProfessor(@Param("idProfessor", ParseIntPipe) idProfessor: number) {
    return this.service.findByProfessor(idProfessor);
  }

  @Get(":idProfessor/:idDisciplina")
  findOne(
    @Param("idProfessor", ParseIntPipe) idProfessor: number,
    @Param("idDisciplina", ParseIntPipe) idDisciplina: number,
  ) {
    return this.service.findOne(idProfessor, idDisciplina);
  }

  @Delete(":idProfessor/:idDisciplina")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param("idProfessor", ParseIntPipe) idProfessor: number,
    @Param("idDisciplina", ParseIntPipe) idDisciplina: number,
  ) {
    return this.service.remove(idProfessor, idDisciplina);
  }
}
