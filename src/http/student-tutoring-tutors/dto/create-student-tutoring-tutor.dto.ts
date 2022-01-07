import { IsUUID, Validate } from 'class-validator';
import { StudentTutoring } from '../../student-tutorings/entities/student-tutoring.entity';
import { User } from '../../users/entities/user.entity';
import { IsValidFK } from '../../../validators/is-valid-fk';
import { IsRole } from 'src/validators/is-role';
import { RoleName } from 'src/http/roles/entities/role-name.enum';

export class CreateStudentTutoringTutorDto {
  @IsUUID()
  @Validate(IsValidFK, [StudentTutoring])
  student_tutoring_id: string;

  @IsUUID()
  @Validate(IsValidFK, [User])
  @Validate(IsRole, [RoleName.STUDENT_TUTOR])
  tutor_id: string;
}
