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
import { IsAvaible } from 'src/validators/is-avaible';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  @Validate(IsAvaible, [User, 'email'])
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsUUID()
  @Validate(IsValidFK, [Role, 'id'])
  role_id: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
