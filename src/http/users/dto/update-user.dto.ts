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
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  @Validate(IsAvaible, [User, 'email'])
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
