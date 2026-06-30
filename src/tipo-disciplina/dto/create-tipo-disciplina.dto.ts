import { IsString, MaxLength } from "class-validator";

export class CreateTipoDisciplinaDto {
  @IsString()
  @MaxLength(150)
  tx_descricao: string;
}
