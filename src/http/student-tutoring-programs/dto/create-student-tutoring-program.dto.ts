import { IsUUID, Validate } from 'class-validator';
import { IsValidFK } from 'src/validators/is-valid-fk';
import { Program } from '../../programs/entities/program.entity';
import { StudentTutoring } from '../../student-tutorings/entities/student-tutoring.entity';

export class CreateStudentTutoringProgramDto {
  @Validate(IsValidFK, [StudentTutoring])
  @IsUUID()
  student_tutoring_id: string;

  @Validate(IsValidFK, [Program])
  @IsUUID()
  program_id: string;
}
