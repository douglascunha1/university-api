import { PartialType } from "@nestjs/mapped-types";
import { CreateTipoDisciplinaDto } from "./create-tipo-disciplina.dto";

export class UpdateTipoDisciplinaDto extends PartialType(
  CreateTipoDisciplinaDto,
) {}
