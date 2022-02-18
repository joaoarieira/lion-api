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

  @Validate(IsAvaible, [User, 'email'])
  @IsEmail()
  email: string;

  @MinLength(8)
  @IsString()
  password: string;

  @Validate(IsValidFK, [Role])
  @IsUUID()
  role_id: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
