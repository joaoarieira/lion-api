import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Validate,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { IsValidFK } from 'src/validators/is-valid-fk';
import { IsAvaible } from 'src/validators/is-avaible';
import { StudentTutoring } from '../entities/student-tutoring.entity';

export class CreateStudentTutoringDto {
  // TODO: validar se a id do usuário é de um professor
  @IsOptional()
  @IsUUID()
  @Validate(IsValidFK, [User, 'id'])
  professor_id: string;

  @IsString()
  @Length(6)
  @Validate(IsAvaible, [StudentTutoring, 'course_code'])
  course_code: string;

  @IsString()
  course_name: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
