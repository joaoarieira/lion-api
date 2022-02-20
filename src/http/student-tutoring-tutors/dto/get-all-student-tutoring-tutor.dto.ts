import { IsOptional, IsString, IsUUID } from 'class-validator';

export class GetAllStudentTutoringTutorDto {
  @IsUUID()
  @IsString()
  @IsOptional()
  program_id?: string;
}
