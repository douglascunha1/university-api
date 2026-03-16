import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateInstituicaoDto } from "./dto/create-instituicao.dto";
import { UpdateInstituicaoDto } from "./dto/update-instituicao.dto";
import { Prisma } from "../../generated/prisma/client";

@Injectable()
export class InstituicaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateInstituicaoDto) {
    try {
      return await this.prisma.client.instituicao.create({ data: dto });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        throw new ConflictException("Sigla ou descrição já cadastrada.");
      }
      throw e;
    }
  }

  findAll() {
    return this.prisma.client.instituicao.findMany({
      orderBy: { id_instituicao: "asc" },
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.client.instituicao.findUnique({
      where: { id_instituicao: id },
    });
    if (!record)
      throw new NotFoundException(`Instituição #${id} não encontrada.`);
    return record;
  }

  async update(id: number, dto: UpdateInstituicaoDto) {
    await this.findOne(id);
    try {
      return await this.prisma.client.instituicao.update({
        where: { id_instituicao: id },
        data: dto,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        throw new ConflictException("Sigla ou descrição já cadastrada.");
      }
      throw e;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.client.instituicao.delete({ where: { id_instituicao: id } });
  }
}
