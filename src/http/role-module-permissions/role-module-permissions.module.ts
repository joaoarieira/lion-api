import { Module } from '@nestjs/common';
import { RoleModulePermissionsService } from './role-module-permissions.service';
import { RoleModulePermissionsController } from './role-module-permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModulePermission } from './entities/role-module-permission.entity';
import { RolesModule } from '../roles/roles.module';
import { DbModule } from '../db-modules/entities/db-module.entity';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleModulePermission]),
    RolesModule,
    DbModule,
    PermissionsModule,
  ],
  controllers: [RoleModulePermissionsController],
  providers: [RoleModulePermissionsService],
})
export class RoleModulePermissionsModule {}
