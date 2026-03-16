import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTituloDto } from "./dto/create-titulo.dto";
import { UpdateTituloDto } from "./dto/update-titulo.dto";
import { Prisma } from "../../generated/prisma/client";

@Injectable()
export class TituloService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTituloDto) {
    try {
      return await this.prisma.client.titulo.create({ data: dto });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        throw new ConflictException("Já existe um título com essa descrição.");
      }
      throw e;
    }
  }

  findAll() {
    return this.prisma.client.titulo.findMany({ orderBy: { id_titulo: "asc" } });
  }

  async findOne(id: number) {
    const titulo = await this.prisma.client.titulo.findUnique({
      where: { id_titulo: id },
    });
    if (!titulo) throw new NotFoundException(`Título #${id} não encontrado.`);
    return titulo;
  }

  async update(id: number, dto: UpdateTituloDto) {
    await this.findOne(id);
    try {
      return await this.prisma.client.titulo.update({
        where: { id_titulo: id },
        data: dto,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        throw new ConflictException("Já existe um título com essa descrição.");
      }
      throw e;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.client.titulo.delete({ where: { id_titulo: id } });
  }
}
