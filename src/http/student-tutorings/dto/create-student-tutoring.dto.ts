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
import { IsRole } from 'src/validators/is-role';
import { RoleName } from '../../roles/entities/role-name.enum';

export class CreateStudentTutoringDto {
  // TODO: (bug) a validação IsValidFK está sendo executada mesmo se professor_id não for UUID
  // talvez esses decoratos IsValidFK e IsRole deverão desaparecer
  @IsUUID()
  @Validate(IsValidFK, [User])
  @Validate(IsRole, [RoleName.PROFESSOR])
  @IsOptional()
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
