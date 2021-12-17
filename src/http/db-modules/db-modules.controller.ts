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

@Controller('db-modules')
export class DbModulesController {
  constructor(private readonly dbModulesService: DbModulesService) {}

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

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDbModuleDto: UpdateDbModuleDto,
  ) {
    return this.dbModulesService.update(id, updateDbModuleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.dbModulesService.remove(id);
  }
}
