import { IsString, IsUUID } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  name: string;

  @IsUUID()
  campus_id: string;
}
