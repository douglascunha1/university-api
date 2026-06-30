import {
  IsString,
  MaxLength,
  IsInt,
  IsIn,
  IsDateString,
} from "class-validator";

export class CreateProfessorDto {
  @IsInt()
  id_titulo: number;

  @IsString()
  @MaxLength(50)
  tx_nome: string;

  @IsString()
  @IsIn(["m", "f"])
  tx_sexo: string;

  @IsString()
  @IsIn(["s", "c", "d"])
  tx_estado_civil: string;

  @IsDateString()
  dt_nascimento: string;

  @IsString()
  @MaxLength(13)
  tx_telefone: string;
}
