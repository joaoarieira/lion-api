import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentTutoringDto } from './create-student-tutoring.dto';

export class UpdateStudentTutoringDto extends PartialType(
  CreateStudentTutoringDto,
) {}
