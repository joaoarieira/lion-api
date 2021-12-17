import { PartialType } from '@nestjs/mapped-types';
import { CreateDbModuleDto } from './create-db-module.dto';

export class UpdateDbModuleDto extends PartialType(CreateDbModuleDto) {}
