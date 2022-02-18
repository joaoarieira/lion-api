import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { IsAvaible } from 'src/validators/is-avaible';
import { User } from '../entities/user.entity';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @Validate(IsAvaible, [User, 'email'])
  @IsEmail()
  @IsOptional()
  email: string;

  @MinLength(8)
  @IsString()
  @IsOptional()
  password: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
