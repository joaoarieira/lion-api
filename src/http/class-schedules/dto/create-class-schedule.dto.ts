import {
  IsMilitaryTime,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Max,
  Min,
  MinLength,
  Validate,
} from 'class-validator';
import { StudentTutoringTutor } from '../../student-tutoring-tutors/entities/student-tutoring-tutor.entity';
import { IsValidFK } from 'src/validators/is-valid-fk';

export class CreateClassScheduleDto {
  @Validate(IsValidFK, [StudentTutoringTutor])
  @IsUUID()
  student_tutoring_tutor_id: string;

  @IsString()
  @IsOptional()
  note: string;

  @IsNumber()
  @Min(1) // Monday
  @Max(5) // Friday
  day_of_the_week: number;

  @IsMilitaryTime()
  @IsOptional()
  starts_at: string;

  @IsMilitaryTime()
  @IsOptional()
  ends_at: string;

  @MinLength(3)
  @IsString()
  meeting_place: string;

  @IsUrl()
  @IsOptional()
  meeting_url: string;
}
