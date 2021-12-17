import { IsBoolean, IsUUID, Validate } from 'class-validator';
import { DbModule } from 'src/http/db-modules/entities/db-module.entity';
import { Permission } from 'src/http/permissions/entities/permission.entity';
import { Role } from 'src/http/roles/entities/role.entity';
import { IsValidFK } from 'src/validators/is-valid-fk';

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
