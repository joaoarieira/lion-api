import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Public } from 'src/auth/jwt-auth.guard';
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

  @Public()
  @Get()
  findAll() {
    return this.campusesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campusesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCampusDto: UpdateCampusDto) {
    return this.campusesService.update(id, updateCampusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.campusesService.remove(id);
  }
}
