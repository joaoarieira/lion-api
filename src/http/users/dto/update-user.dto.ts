import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  Validate,
  ValidateIf,
} from 'class-validator';
import { StudentTutoring } from 'src/http/student-tutorings/entities/student-tutoring.entity';
import { IsAvaible } from 'src/validators/is-avaible';
import { IsValidFK } from 'src/validators/is-valid-fk';
import { User } from '../entities/user.entity';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @Validate(IsAvaible, [User, 'email'])
  @IsEmail()
  @IsOptional()
  email: string;

  @MinLength(8)
  @IsString()
  @IsOptional()
  password: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @Validate(IsValidFK, [StudentTutoring], { each: true })
  @IsUUID(4, { each: true })
  @ValidateIf((o) => o.student_tutorings_ids?.length > 0)
  @IsArray()
  @IsOptional()
  student_tutorings_ids: string[];
}
