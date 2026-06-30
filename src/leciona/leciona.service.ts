import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateLecionaDto } from "./dto/create-leciona.dto";
import { Prisma } from "../../generated/prisma/client";

@Injectable()
export class LecionaService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly include = {
    professor: true,
    disciplina: true,
  };

  async create(dto: CreateLecionaDto) {
    try {
      return await this.prisma.client.leciona.create({
        data: dto,
        include: this.include,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002")
          throw new ConflictException("Professor já leciona essa disciplina.");
        if (e.code === "P2003")
          throw new BadRequestException(
            "id_professor ou id_disciplina não encontrado.",
          );
      }
      throw e;
    }
  }

  findAll() {
    return this.prisma.client.leciona.findMany({ include: this.include });
  }

  findByProfessor(idProfessor: number) {
    return this.prisma.client.leciona.findMany({
      where: { id_professor: idProfessor },
      include: this.include,
    });
  }

  async findOne(idProfessor: number, idDisciplina: number) {
    const record = await this.prisma.client.leciona.findUnique({
      where: {
        id_professor_id_disciplina: {
          id_professor: idProfessor,
          id_disciplina: idDisciplina,
        },
      },
      include: this.include,
    });
    if (!record)
      throw new NotFoundException(
        `Leciona [professor=${idProfessor}, disciplina=${idDisciplina}] não encontrado.`,
      );
    return record;
  }

  async remove(idProfessor: number, idDisciplina: number) {
    await this.findOne(idProfessor, idDisciplina);
    return this.prisma.client.leciona.delete({
      where: {
        id_professor_id_disciplina: {
          id_professor: idProfessor,
          id_disciplina: idDisciplina,
        },
      },
    });
  }
}
