import { IsOptional, IsString, IsUUID } from 'class-validator';

export class GetAllStudentTutoringTutorDto {
  @IsUUID()
  @IsString()
  @IsOptional()
  program_id?: string;

  @IsUUID()
  @IsString()
  @IsOptional()
  tutor_id?: string;

  @IsString()
  @IsOptional()
  query?: string;
}
