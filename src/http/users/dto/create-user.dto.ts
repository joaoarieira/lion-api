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
import { Role } from '../../roles/entities/role.entity';
import { IsValidFK } from 'src/validators/is-valid-fk';
import { IsAvaible } from 'src/validators/is-avaible';
import { User } from '../entities/user.entity';
import { StudentTutoring } from '../../student-tutorings/entities/student-tutoring.entity';

export class CreateUserDto {
  @IsString()
  name: string;

  @Validate(IsAvaible, [User, 'email'])
  @IsEmail()
  email: string;

  @MinLength(8)
  @IsString()
  password: string;

  @Validate(IsValidFK, [Role])
  @IsUUID()
  role_id: string;

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
