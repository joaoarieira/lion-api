import { IsString } from 'class-validator';

export class DbCreateModuleDto {
  @IsString()
  name: string;
}
