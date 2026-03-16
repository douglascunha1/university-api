import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTipoDisciplinaDto } from "./dto/create-tipo-disciplina.dto";
import { UpdateTipoDisciplinaDto } from "./dto/update-tipo-disciplina.dto";
import { Prisma } from "../../generated/prisma/client";

@Injectable()
export class TipoDisciplinaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTipoDisciplinaDto) {
    try {
      return await this.prisma.client.tipoDisciplina.create({ data: dto });
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
    return this.prisma.client.tipoDisciplina.findMany({
      orderBy: { id_tipo_disciplina: "asc" },
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.client.tipoDisciplina.findUnique({
      where: { id_tipo_disciplina: id },
    });
    if (!record) throw new NotFoundException(`Registro #${id} não encontrado.`);
    return record;
  }

  async update(id: number, dto: UpdateTipoDisciplinaDto) {
    await this.findOne(id);
    try {
      return await this.prisma.client.tipoDisciplina.update({
        where: { id_tipo_disciplina: id },
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
    return this.prisma.client.tipoDisciplina.delete({
      where: { id_tipo_disciplina: id },
    });
  }
}
