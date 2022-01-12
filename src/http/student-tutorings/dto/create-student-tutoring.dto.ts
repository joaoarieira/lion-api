import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Validate,
  ValidateIf,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { IsValidFK } from 'src/validators/is-valid-fk';
import { IsAvaible } from 'src/validators/is-avaible';
import { StudentTutoring } from '../entities/student-tutoring.entity';
import { IsRole } from 'src/validators/is-role';
import { RoleName } from '../../roles/entities/role-name.enum';
import { Program } from '../../programs/entities/program.entity';

export class CreateStudentTutoringDto {
  @Validate(IsRole, [RoleName.PROFESSOR])
  @Validate(IsValidFK, [User])
  @IsUUID()
  @IsOptional()
  professor_id: string;

  @Validate(IsAvaible, [StudentTutoring, 'course_code'])
  @Length(6)
  @IsString()
  course_code: string;

  @IsString()
  course_name: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @Validate(IsValidFK, [Program], { each: true })
  @IsUUID(4, { each: true })
  @ArrayNotEmpty()
  @IsArray()
  programs_ids: string[];

  @Validate(IsRole, [RoleName.STUDENT_TUTOR], { each: true })
  @Validate(IsValidFK, [User], { each: true })
  @IsUUID(4, { each: true })
  @ValidateIf((o) => {
    console.log(o);
    console.log(o.tutors_ids.length > 0);
    return o.tutors_ids.length > 0;
  })
  @IsArray()
  @IsOptional()
  tutors_ids: string[];
}
