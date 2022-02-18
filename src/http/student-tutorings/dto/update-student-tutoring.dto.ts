import {
  ArrayNotEmpty,
  IsArray,
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
import { Program } from '../../../http/programs/entities/program.entity';

export class UpdateStudentTutoringDto {
  @Validate(IsRole, [RoleName.PROFESSOR])
  @Validate(IsValidFK, [User])
  @IsUUID()
  @IsOptional()
  professor_id: string;

  @Validate(IsAvaible, [StudentTutoring, 'course_code'])
  @Length(6)
  @IsString()
  @IsOptional()
  course_code: string;

  @IsString()
  @IsOptional()
  course_name: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @Validate(IsValidFK, [Program], { each: true })
  @IsUUID(4, { each: true })
  @ArrayNotEmpty()
  @IsArray()
  @IsOptional()
  programs_ids: string[];
}
