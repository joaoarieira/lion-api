import { IsString, IsUUID, Validate } from 'class-validator';
import { Campus } from 'src/http/campuses/entities/campus.entity';
import { IsValidFK } from 'src/validators/is-valid-fk';

export class CreateProgramDto {
  @IsString()
  name: string;

  @Validate(IsValidFK, [Campus, 'id'])
  @IsUUID()
  campus_id: string;
}
