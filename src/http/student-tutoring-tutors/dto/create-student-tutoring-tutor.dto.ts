import { IsUUID, Validate } from 'class-validator';
import { StudentTutoring } from '../../student-tutorings/entities/student-tutoring.entity';
import { User } from '../../users/entities/user.entity';
import { IsValidFK } from '../../../validators/is-valid-fk';
import { IsRole } from 'src/validators/is-role';
import { RoleName } from 'src/http/roles/entities/role-name.enum';

export class CreateStudentTutoringTutorDto {
  @Validate(IsValidFK, [StudentTutoring])
  @IsUUID()
  student_tutoring_id: string;

  @Validate(IsRole, [RoleName.STUDENT_TUTOR])
  @Validate(IsValidFK, [User])
  @IsUUID()
  tutor_id: string;
}
