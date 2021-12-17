import { IsBoolean } from 'class-validator';

export class UpdateRoleModulePermissionDto {
  @IsBoolean()
  allow: boolean;
}
