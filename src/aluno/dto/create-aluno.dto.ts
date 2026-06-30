import { IsString, MaxLength, IsIn, IsDateString } from "class-validator";

export class CreateAlunoDto {
  @IsString()
  @MaxLength(100)
  tx_nome: string;

  @IsString()
  @IsIn(["m", "f"])
  tx_sexo: string;

  @IsDateString()
  dt_nascimento: string;
}
