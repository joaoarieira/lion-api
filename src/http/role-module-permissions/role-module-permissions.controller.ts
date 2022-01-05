import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { RoleModulePermissionsService } from './role-module-permissions.service';
import { CreateRoleModulePermissionDto } from './dto/create-role-module-permission.dto';
import { UpdateRoleModulePermissionDto } from './dto/update-role-module-permission.dto';
import { RolesCanAccess } from 'src/decorators/roles-can-access.decorator';
import { RoleName } from '../roles/entities/role-name.enum';

@Controller('role-module-permissions')
export class RoleModulePermissionsController {
  constructor(
    private readonly roleModulePermissionsService: RoleModulePermissionsService,
  ) {}

  @RolesCanAccess(RoleName.ADMIN)
  @Post()
  create(
    @Body() createRoleModulePermissionsDto: CreateRoleModulePermissionDto,
  ) {
    return this.roleModulePermissionsService.create(
      createRoleModulePermissionsDto,
    );
  }

  @Get()
  findAll() {
    return this.roleModulePermissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.roleModulePermissionsService.findOne(id);
  }

  @RolesCanAccess(RoleName.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoleModulePermissionDto: UpdateRoleModulePermissionDto,
  ) {
    return this.roleModulePermissionsService.update(
      id,
      updateRoleModulePermissionDto,
    );
  }

  @RolesCanAccess(RoleName.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.roleModulePermissionsService.remove(id);
  }
}
