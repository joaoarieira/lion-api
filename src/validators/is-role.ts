import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Role } from '../http/roles/entities/role.entity';
import { User } from '../http/users/entities/user.entity';
import { getRepository } from 'typeorm';

interface IsRoleArguments extends ValidationArguments {
  constraints: [string];
}

@ValidatorConstraint({ name: 'isRole', async: true })
export class IsRole implements ValidatorConstraintInterface {
  public async validate(value: string, args: IsRoleArguments) {
    const [roleName] = args.constraints;
    const role = await getRepository(Role).findOne({
      where: { name: roleName },
    });
    const user = await getRepository(User).findOne(value, {
      where: { role_id: role.id },
    });

    const isRole = user !== undefined;

    return isRole;
  }

  public defaultMessage() {
    return `$property does not exist or belong to a user without permission`;
  }
}
