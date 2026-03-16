import { IsString, MaxLength } from "class-validator";

export class CreateTipoCursoDto {
  @IsString()
  @MaxLength(150)
  tx_descricao: string;
}
