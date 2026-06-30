import { PartialType } from "@nestjs/mapped-types";
import { CreateTipoCursoDto } from "./create-tipo-curso.dto";

export class UpdateTipoCursoDto extends PartialType(CreateTipoCursoDto) {}
