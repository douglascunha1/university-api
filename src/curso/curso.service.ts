import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCursoDto } from "./dto/create-curso.dto";
import { UpdateCursoDto } from "./dto/update-curso.dto";
import { Prisma } from "../../generated/prisma/client";

@Injectable()
export class CursoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCursoDto) {
    try {
      return await this.prisma.client.curso.create({
        data: dto,
        include: { instituicao: true, tipo_curso: true },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002")
          throw new ConflictException(
            "Curso duplicado para essa instituição e tipo.",
          );
        if (e.code === "P2003")
          throw new BadRequestException(
            "id_instituicao ou id_tipo_curso não encontrado.",
          );
      }
      throw e;
    }
  }

  findAll() {
    return this.prisma.client.curso.findMany({
      orderBy: { id_curso: "asc" },
      include: { instituicao: true, tipo_curso: true },
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.client.curso.findUnique({
      where: { id_curso: id },
      include: { instituicao: true, tipo_curso: true, disciplinas: true },
    });
    if (!record) throw new NotFoundException(`Curso #${id} não encontrado.`);
    return record;
  }

  async update(id: number, dto: UpdateCursoDto) {
    await this.findOne(id);
    try {
      return await this.prisma.client.curso.update({
        where: { id_curso: id },
        data: dto,
        include: { instituicao: true, tipo_curso: true },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002")
          throw new ConflictException(
            "Curso duplicado para essa instituição e tipo.",
          );
        if (e.code === "P2003")
          throw new BadRequestException(
            "id_instituicao ou id_tipo_curso não encontrado.",
          );
      }
      throw e;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.client.curso.delete({ where: { id_curso: id } });
  }
}
