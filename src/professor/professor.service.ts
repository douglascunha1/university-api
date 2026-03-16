import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProfessorDto } from "./dto/create-professor.dto";
import { UpdateProfessorDto } from "./dto/update-professor.dto";
import { Prisma } from "../../generated/prisma/client";

@Injectable()
export class ProfessorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProfessorDto) {
    try {
      return await this.prisma.client.professor.create({
        data: { ...dto, dt_nascimento: new Date(dto.dt_nascimento) },
        include: { titulo: true },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2003"
      ) {
        throw new BadRequestException("id_titulo não encontrado.");
      }
      throw e;
    }
  }

  findAll() {
    return this.prisma.client.professor.findMany({
      orderBy: { id_professor: "asc" },
      include: { titulo: true },
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.client.professor.findUnique({
      where: { id_professor: id },
      include: { titulo: true, leciona: { include: { disciplina: true } } },
    });
    if (!record)
      throw new NotFoundException(`Professor #${id} não encontrado.`);
    return record;
  }

  async update(id: number, dto: UpdateProfessorDto) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.dt_nascimento) data.dt_nascimento = new Date(dto.dt_nascimento);
    try {
      return await this.prisma.client.professor.update({
        where: { id_professor: id },
        data,
        include: { titulo: true },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2003"
      ) {
        throw new BadRequestException("id_titulo não encontrado.");
      }
      throw e;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.client.professor.delete({ where: { id_professor: id } });
  }
}
