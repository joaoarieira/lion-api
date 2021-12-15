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
import { DbCreateModuleDto } from './dto/create-db-module.dto';
import { DbUpdateModuleDto } from './dto/update-db-module.dto';

@Controller('db-modules')
export class DbModulesController {
  constructor(private readonly dbModulesService: DbModulesService) {}

  @Post()
  create(@Body() createModuleDto: DbCreateModuleDto) {
    return this.dbModulesService.create(createModuleDto);
  }

  @Get()
  findAll() {
    return this.dbModulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.dbModulesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateModuleDto: DbUpdateModuleDto,
  ) {
    return this.dbModulesService.update(id, updateModuleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.dbModulesService.remove(id);
  }
}
