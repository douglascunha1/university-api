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
import { CursaService } from "./cursa.service";
import { CreateCursaDto } from "./dto/create-cursa.dto";
import { UpdateCursaDto } from "./dto/update-cursa.dto";

@Controller("cursa")
export class CursaController {
  constructor(private readonly service: CursaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateCursaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get("aluno/:idAluno")
  findByAluno(@Param("idAluno", ParseIntPipe) idAluno: number) {
    return this.service.findByAluno(idAluno);
  }

  @Get(":idAluno/:idDisciplina/:ano/:semestre")
  findOne(
    @Param("idAluno", ParseIntPipe) idAluno: number,
    @Param("idDisciplina", ParseIntPipe) idDisciplina: number,
    @Param("ano", ParseIntPipe) ano: number,
    @Param("semestre", ParseIntPipe) semestre: number,
  ) {
    return this.service.findOne({
      id_aluno: idAluno,
      id_disciplina: idDisciplina,
      in_ano: ano,
      in_semestre: semestre,
    });
  }

  @Patch(":idAluno/:idDisciplina/:ano/:semestre")
  update(
    @Param("idAluno", ParseIntPipe) idAluno: number,
    @Param("idDisciplina", ParseIntPipe) idDisciplina: number,
    @Param("ano", ParseIntPipe) ano: number,
    @Param("semestre", ParseIntPipe) semestre: number,
    @Body() dto: UpdateCursaDto,
  ) {
    return this.service.update(
      {
        id_aluno: idAluno,
        id_disciplina: idDisciplina,
        in_ano: ano,
        in_semestre: semestre,
      },
      dto,
    );
  }

  @Delete(":idAluno/:idDisciplina/:ano/:semestre")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param("idAluno", ParseIntPipe) idAluno: number,
    @Param("idDisciplina", ParseIntPipe) idDisciplina: number,
    @Param("ano", ParseIntPipe) ano: number,
    @Param("semestre", ParseIntPipe) semestre: number,
  ) {
    return this.service.remove({
      id_aluno: idAluno,
      id_disciplina: idDisciplina,
      in_ano: ano,
      in_semestre: semestre,
    });
  }
}
