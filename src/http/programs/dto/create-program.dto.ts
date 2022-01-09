import { IsString, IsUUID, Validate } from 'class-validator';
import { Campus } from '../../campuses/entities/campus.entity';
import { IsValidFK } from '../../../validators/is-valid-fk';

export class CreateProgramDto {
  @IsString()
  name: string;

  @Validate(IsValidFK, [Campus])
  @IsUUID()
  campus_id: string;
}
