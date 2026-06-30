import { IsString, MaxLength } from "class-validator";

export class CreateTituloDto {
  @IsString()
  @MaxLength(150)
  tx_descricao: string;
}
