import {
  IsMilitaryTime,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateClassScheduleDto {
  @IsString()
  @IsOptional()
  note: string;

  @IsNumber()
  @Min(0) // Sunday
  @Max(6) // Saturday
  @IsOptional()
  day_of_the_week: number;

  @IsMilitaryTime()
  @IsOptional()
  starts_at: string;

  @IsMilitaryTime()
  @IsOptional()
  ends_at: string;

  @MinLength(3)
  @IsString()
  @IsOptional()
  meeting_place: string;

  @IsString()
  @IsOptional()
  meeting_url: string;
}
