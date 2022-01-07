import { IsBoolean, IsUUID, Validate } from 'class-validator';
import { DbModule } from '../../db-modules/entities/db-module.entity';
import { Permission } from '../../permissions/entities/permission.entity';
import { Role } from '../../roles/entities/role.entity';
import { IsValidFK } from '../../../validators/is-valid-fk';

export class CreateRoleModulePermissionDto {
  @IsBoolean()
  allow: boolean;

  @IsUUID()
  @Validate(IsValidFK, [Role])
  role_id: string;

  @IsUUID()
  @Validate(IsValidFK, [DbModule])
  db_module_id: string;

  @IsUUID()
  @Validate(IsValidFK, [Permission])
  permission_id: string;
}
