import { PartialType } from '@nestjs/mapped-types';
import { DbCreateModuleDto } from './create-db-module.dto';

export class DbUpdateModuleDto extends PartialType(DbCreateModuleDto) {}
