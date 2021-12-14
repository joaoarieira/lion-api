import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityTarget, getRepository } from 'typeorm';

interface IsValidFKArguments<E> extends ValidationArguments {
  constraints: [EntityTarget<E>];
}

@ValidatorConstraint({ name: 'isValidFK', async: true })
export class IsValidFK implements ValidatorConstraintInterface {
  public async validate<E>(value: string, args: IsValidFKArguments<E>) {
    const [Entity] = args.constraints;
    const exists =
      (await getRepository(Entity).count({
        where: { id: value },
      })) > 0;
    return exists;
  }

  public defaultMessage() {
    return '$property does not exist!';
  }
}
