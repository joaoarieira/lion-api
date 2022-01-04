import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityTarget, getRepository } from 'typeorm';

interface IsAvaibleArguments<E> extends ValidationArguments {
  constraints: [EntityTarget<E>];
}

@ValidatorConstraint({ name: 'isAvaible', async: true })
export class IsAvaible implements ValidatorConstraintInterface {
  public async validate<E>(value: string, args: IsAvaibleArguments<E>) {
    const [entity, findCondition = args.property] = args.constraints;
    const isAvaible =
      (await getRepository(entity).count({
        where: {
          [findCondition]: value,
        },
      })) <= 0;
    return isAvaible;
  }

  public defaultMessage() {
    return '$property is already being used!';
  }
}
