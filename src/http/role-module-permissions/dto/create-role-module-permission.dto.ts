import { IsBoolean, IsUUID, Validate } from 'class-validator';
import { DbModule } from '../../db-modules/entities/db-module.entity';
import { Permission } from '../../permissions/entities/permission.entity';
import { Role } from '../../roles/entities/role.entity';
import { IsValidFK } from '../../../validators/is-valid-fk';

export class CreateRoleModulePermissionDto {
  @IsBoolean()
  allow: boolean;

  @Validate(IsValidFK, [Role, 'id'])
  @IsUUID()
  role_id: string;

  @Validate(IsValidFK, [DbModule, 'id'])
  @IsUUID()
  db_module_id: string;

  @Validate(IsValidFK, [Permission, 'id'])
  @IsUUID()
  permission_id: string;
}
