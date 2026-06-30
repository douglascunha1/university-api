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
import { TituloService } from "./titulo.service";
import { CreateTituloDto } from "./dto/create-titulo.dto";
import { UpdateTituloDto } from "./dto/update-titulo.dto";

@Controller("titulos")
export class TituloController {
  constructor(private readonly tituloService: TituloService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTituloDto) {
    return this.tituloService.create(dto);
  }

  @Get()
  findAll() {
    return this.tituloService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.tituloService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateTituloDto) {
    return this.tituloService.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.tituloService.remove(id);
  }
}
