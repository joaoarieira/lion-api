import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/auth/jwt-auth.guard';
import { RolesAccessGuard } from 'src/auth/roles-access.guard';
import { RolesCanAccess } from '../../decorators/roles-can-access.decorator';
import { RoleName } from '../roles/entities/role-name.enum';
import { CampusesService } from './campuses.service';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';

@Controller('campuses')
export class CampusesController {
  constructor(private readonly campusesService: CampusesService) {}

  @Post()
  create(@Body() createCampusDto: CreateCampusDto) {
    return this.campusesService.create(createCampusDto);
  }

  // TODO: pensar sobre esse guard ser global
  @RolesCanAccess(RoleName.STUDENT_TUTOR)
  @UseGuards(RolesAccessGuard)
  @Get()
  findAll() {
    return this.campusesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.campusesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCampusDto: UpdateCampusDto,
  ) {
    return this.campusesService.update(id, updateCampusDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.campusesService.remove(id);
  }
}
