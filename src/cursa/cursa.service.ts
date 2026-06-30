import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCursaDto } from "./dto/create-cursa.dto";
import { UpdateCursaDto } from "./dto/update-cursa.dto";
import { Prisma } from "../../generated/prisma/client";

type CursaPK = {
  id_aluno: number;
  id_disciplina: number;
  in_ano: number;
  in_semestre: number;
};

@Injectable()
export class CursaService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly include = { aluno: true, disciplina: true };

  async create(dto: CreateCursaDto) {
    try {
      return await this.prisma.client.cursa.create({
        data: dto,
        include: this.include,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002")
          throw new ConflictException(
            "Matrícula já existente para esse aluno, disciplina, ano e semestre.",
          );
        if (e.code === "P2003")
          throw new BadRequestException(
            "id_aluno ou id_disciplina não encontrado.",
          );
      }
      throw e;
    }
  }

  findAll() {
    return this.prisma.client.cursa.findMany({ include: this.include });
  }

  findByAluno(idAluno: number) {
    return this.prisma.client.cursa.findMany({
      where: { id_aluno: idAluno },
      include: this.include,
    });
  }

  async findOne(pk: CursaPK) {
    const record = await this.prisma.client.cursa.findUnique({
      where: { id_aluno_id_disciplina_in_ano_in_semestre: pk },
      include: this.include,
    });
    if (!record) throw new NotFoundException(`Matrícula não encontrada.`);
    return record;
  }

  async update(pk: CursaPK, dto: UpdateCursaDto) {
    await this.findOne(pk);
    return this.prisma.client.cursa.update({
      where: { id_aluno_id_disciplina_in_ano_in_semestre: pk },
      data: dto,
      include: this.include,
    });
  }

  async remove(pk: CursaPK) {
    await this.findOne(pk);
    return this.prisma.client.cursa.delete({
      where: { id_aluno_id_disciplina_in_ano_in_semestre: pk },
    });
  }
}
