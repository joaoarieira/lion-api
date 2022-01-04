import { SetMetadata } from '@nestjs/common';
import { RoleName } from '../http/roles/entities/role-name.enum';

export const ROLES_CAN_ACCESS_KEY = 'roles_can_access';

export const RolesCanAccess = (...rolesNames: RoleName[]) =>
  SetMetadata(ROLES_CAN_ACCESS_KEY, rolesNames);
