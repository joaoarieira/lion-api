import { IsString } from 'class-validator';

export class CreateDbModuleDto {
  @IsString()
  name: string;
}
