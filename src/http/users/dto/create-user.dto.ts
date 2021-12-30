import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  Validate,
} from 'class-validator';
import { Role } from '../../roles/entities/role.entity';
import { IsValidFK } from 'src/validators/is-valid-fk';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @Validate(IsValidFK, [Role, 'id'])
  @IsUUID()
  role_id: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
