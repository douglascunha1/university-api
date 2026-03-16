import { PartialType } from "@nestjs/mapped-types";
import { CreateCursaDto } from "./create-cursa.dto";

export class UpdateCursaDto extends PartialType(CreateCursaDto) {}
