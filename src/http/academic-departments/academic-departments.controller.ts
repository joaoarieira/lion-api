import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, Public } from 'src/auth/jwt-auth.guard';
import { AcademicDepartmentsService } from './academic-departments.service';
import { CreateAcademicDepartmentDto } from './dto/create-academic-department.dto';
import { UpdateAcademicDepartmentDto } from './dto/update-academic-department.dto';

@Controller('academic-departments')
export class AcademicDepartmentsController {
  constructor(
    private readonly academicDepartmentsService: AcademicDepartmentsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAcademicDepartmentDto: CreateAcademicDepartmentDto) {
    return this.academicDepartmentsService.create(createAcademicDepartmentDto);
  }

  @Public()
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
