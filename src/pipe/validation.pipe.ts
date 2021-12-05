import { ValidationError } from '@nestjs/common';
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

export function validationConfigs(): ValidationPipeOptions {
  return {
    stopAtFirstError: true,
    whitelist: true,
  };
}
