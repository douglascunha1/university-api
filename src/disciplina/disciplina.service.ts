import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateDisciplinaDto } from "./dto/create-disciplina.dto";
import { UpdateDisciplinaDto } from "./dto/update-disciplina.dto";
import { Prisma } from "../../generated/prisma/client";

@Injectable()
export class DisciplinaService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly include = {
    curso: true,
    tipo_disciplina: true,
  };

  async create(dto: CreateDisciplinaDto) {
    try {
      return await this.prisma.client.disciplina.create({
        data: dto,
        include: this.include,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002")
          throw new ConflictException(
            "Sigla ou descrição de disciplina já cadastrada.",
          );
        if (e.code === "P2003")
          throw new BadRequestException(
            "id_curso ou id_tipo_disciplina não encontrado.",
          );
      }
      throw e;
    }
  }

  findAll() {
    return this.prisma.client.disciplina.findMany({
      orderBy: { id_disciplina: "asc" },
      include: this.include,
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.client.disciplina.findUnique({
      where: { id_disciplina: id },
      include: { ...this.include, leciona: { include: { professor: true } } },
    });
    if (!record)
      throw new NotFoundException(`Disciplina #${id} não encontrada.`);
    return record;
  }

  async update(id: number, dto: UpdateDisciplinaDto) {
    await this.findOne(id);
    try {
      return await this.prisma.client.disciplina.update({
        where: { id_disciplina: id },
        data: dto,
        include: this.include,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002")
          throw new ConflictException(
            "Sigla ou descrição de disciplina já cadastrada.",
          );
        if (e.code === "P2003")
          throw new BadRequestException(
            "id_curso ou id_tipo_disciplina não encontrado.",
          );
      }
      throw e;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.client.disciplina.delete({ where: { id_disciplina: id } });
  }
}
