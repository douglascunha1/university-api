import { IsInt } from "class-validator";

export class CreateLecionaDto {
  @IsInt()
  id_professor: number;

  @IsInt()
  id_disciplina: number;
}
