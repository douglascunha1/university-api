import { IsString, MaxLength, IsInt } from "class-validator";

export class CreateCursoDto {
  @IsInt()
  id_instituicao: number;

  @IsInt()
  id_tipo_curso: number;

  @IsString()
  @MaxLength(150)
  tx_descricao: string;
}
