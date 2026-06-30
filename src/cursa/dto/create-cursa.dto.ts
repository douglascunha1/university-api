import { IsInt, IsBoolean, IsNumber, IsOptional, Min } from "class-validator";

export class CreateCursaDto {
  @IsInt()
  id_aluno: number;

  @IsInt()
  id_disciplina: number;

  @IsInt()
  in_ano: number;

  @IsInt()
  @Min(1)
  in_semestre: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  in_faltas?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  nm_nota1?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  nm_nota2?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  nm_nota3?: number;

  @IsBoolean()
  @IsOptional()
  bl_aprovado?: boolean;
}
