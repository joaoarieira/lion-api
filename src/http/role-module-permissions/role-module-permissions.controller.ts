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

@Controller('role-module-permissions')
export class RoleModulePermissionsController {
  constructor(
    private readonly roleModulePermissionsService: RoleModulePermissionsService,
  ) {}

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

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.roleModulePermissionsService.remove(id);
  }
}
