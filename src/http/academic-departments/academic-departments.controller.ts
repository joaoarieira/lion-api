import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AcademicDepartmentsService } from './academic-departments.service';
import { CreateAcademicDepartmentDto } from './dto/create-academic-department.dto';
import { UpdateAcademicDepartmentDto } from './dto/update-academic-department.dto';

@Controller('academic-departments')
export class AcademicDepartmentsController {
  constructor(
    private readonly academicDepartmentsService: AcademicDepartmentsService,
  ) {}

  @Post()
  create(@Body() createAcademicDepartmentDto: CreateAcademicDepartmentDto) {
    return this.academicDepartmentsService.create(createAcademicDepartmentDto);
  }

  @Get()
  findAll() {
    return this.academicDepartmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.academicDepartmentsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAcademicDepartmentDto: UpdateAcademicDepartmentDto,
  ) {
    return this.academicDepartmentsService.update(
      id,
      updateAcademicDepartmentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.academicDepartmentsService.remove(id);
  }
}
