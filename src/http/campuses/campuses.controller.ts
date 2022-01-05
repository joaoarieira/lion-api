import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Public } from 'src/auth/jwt-auth.guard';
import { RolesCanAccess } from '../../decorators/roles-can-access.decorator';
import { RoleName } from '../roles/entities/role-name.enum';
import { CampusesService } from './campuses.service';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';

@Controller('campuses')
export class CampusesController {
  constructor(private readonly campusesService: CampusesService) {}

  @RolesCanAccess(RoleName.ADMIN)
  @Post()
  create(@Body() createCampusDto: CreateCampusDto) {
    return this.campusesService.create(createCampusDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.campusesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.campusesService.findOne(id);
  }

  @RolesCanAccess(RoleName.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCampusDto: UpdateCampusDto,
  ) {
    return this.campusesService.update(id, updateCampusDto);
  }

  @RolesCanAccess(RoleName.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.campusesService.remove(id);
  }
}
