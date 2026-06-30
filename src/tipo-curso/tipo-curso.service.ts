import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTipoCursoDto } from "./dto/create-tipo-curso.dto";
import { UpdateTipoCursoDto } from "./dto/update-tipo-curso.dto";
import { Prisma } from "../../generated/prisma/client";

@Injectable()
export class TipoCursoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTipoCursoDto) {
    try {
      return await this.prisma.client.tipoCurso.create({ data: dto });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        throw new ConflictException("Registro duplicado.");
      }
      throw e;
    }
  }

  findAll() {
    return this.prisma.client.tipoCurso.findMany({
      orderBy: { id_tipo_curso: "asc" },
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.client.tipoCurso.findUnique({
      where: { id_tipo_curso: id },
    });
    if (!record) throw new NotFoundException(`Registro #${id} não encontrado.`);
    return record;
  }

  async update(id: number, dto: UpdateTipoCursoDto) {
    await this.findOne(id);
    try {
      return await this.prisma.client.tipoCurso.update({
        where: { id_tipo_curso: id },
        data: dto,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        throw new ConflictException("Registro duplicado.");
      }
      throw e;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.client.tipoCurso.delete({ where: { id_tipo_curso: id } });
  }
}
