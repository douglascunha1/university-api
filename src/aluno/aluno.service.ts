import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAlunoDto } from "./dto/create-aluno.dto";
import { UpdateAlunoDto } from "./dto/update-aluno.dto";

@Injectable()
export class AlunoService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateAlunoDto) {
    return this.prisma.client.aluno.create({
      data: { ...dto, dt_nascimento: new Date(dto.dt_nascimento) },
    });
  }

  findAll() {
    return this.prisma.client.aluno.findMany({ orderBy: { id_aluno: "asc" } });
  }

  async findOne(id: number) {
    const record = await this.prisma.client.aluno.findUnique({
      where: { id_aluno: id },
      include: { cursa: { include: { disciplina: true } } },
    });
    if (!record) throw new NotFoundException(`Aluno #${id} não encontrado.`);
    return record;
  }

  async update(id: number, dto: UpdateAlunoDto) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.dt_nascimento) data.dt_nascimento = new Date(dto.dt_nascimento);
    return this.prisma.client.aluno.update({ where: { id_aluno: id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.client.aluno.delete({ where: { id_aluno: id } });
  }
}
