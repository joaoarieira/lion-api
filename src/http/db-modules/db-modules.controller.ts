import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DbModulesService } from './db-modules.service';
import { CreateDbModuleDto } from './dto/create-db-module.dto';
import { UpdateDbModuleDto } from './dto/update-db-module.dto';
import { RolesCanAccess } from '../../decorators/roles-can-access.decorator';
import { RoleName } from '../roles/entities/role-name.enum';

@Controller('db-modules')
export class DbModulesController {
  constructor(private readonly dbModulesService: DbModulesService) {}

  @RolesCanAccess(RoleName.ADMIN)
  @Post()
  create(@Body() createDbModuleDto: CreateDbModuleDto) {
    return this.dbModulesService.create(createDbModuleDto);
  }

  @Get()
  findAll() {
    return this.dbModulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.dbModulesService.findOne(id);
  }

  @RolesCanAccess(RoleName.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDbModuleDto: UpdateDbModuleDto,
  ) {
    return this.dbModulesService.update(id, updateDbModuleDto);
  }

  @RolesCanAccess(RoleName.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.dbModulesService.remove(id);
  }
}
