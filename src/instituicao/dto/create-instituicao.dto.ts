import { IsString, MaxLength } from "class-validator";

export class CreateInstituicaoDto {
  @IsString()
  @MaxLength(15)
  tx_sigla: string;

  @IsString()
  @MaxLength(150)
  tx_descricao: string;
}
