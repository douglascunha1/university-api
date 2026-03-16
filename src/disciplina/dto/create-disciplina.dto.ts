import { IsString, MaxLength, IsInt, Min, IsOptional } from "class-validator";

export class CreateDisciplinaDto {
  @IsInt()
  @IsOptional()
  id_curso?: number;

  @IsInt()
  id_tipo_disciplina: number;

  @IsString()
  @MaxLength(10)
  tx_sigla: string;

  @IsString()
  @MaxLength(150)
  tx_descricao: string;

  @IsInt()
  @Min(1)
  in_periodo: number;

  @IsInt()
  @Min(40)
  in_carga_horaria: number;
}
