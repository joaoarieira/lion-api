import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentTutoringTutorDto } from './create-student-tutoring-tutor.dto';

export class UpdateStudentTutoringTutorDto extends PartialType(
  CreateStudentTutoringTutorDto,
) {}
