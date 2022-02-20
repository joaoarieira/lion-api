import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StudentTutoringTutorsService } from './student-tutoring-tutors.service';
import { CreateStudentTutoringTutorDto } from './dto/create-student-tutoring-tutor.dto';
import { UpdateStudentTutoringTutorDto } from './dto/update-student-tutoring-tutor.dto';
import { RolesCanAccess } from 'src/decorators/roles-can-access.decorator';
import { RoleName } from '../roles/entities/role-name.enum';
import { Public } from 'src/auth/jwt-auth.guard';
import { GetAllStudentTutoringTutorDto } from './dto/get-all-student-tutoring-tutor.dto';

@Controller('student-tutoring-tutors')
export class StudentTutoringTutorsController {
  constructor(
    private readonly studentTutoringTutorsService: StudentTutoringTutorsService,
  ) {}

  @RolesCanAccess(RoleName.ADMIN)
  @Post()
  create(@Body() createStudentTutoringTutorDto: CreateStudentTutoringTutorDto) {
    return this.studentTutoringTutorsService.create(
      createStudentTutoringTutorDto,
    );
  }

  @Public()
  @Get()
  findAll(@Query() query: GetAllStudentTutoringTutorDto = {}) {
    return this.studentTutoringTutorsService.findAll(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentTutoringTutorsService.findOne(id);
  }

  @RolesCanAccess(RoleName.ADMIN)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentTutoringTutorDto: UpdateStudentTutoringTutorDto,
  ) {
    return this.studentTutoringTutorsService.update(
      id,
      updateStudentTutoringTutorDto,
    );
  }

  @RolesCanAccess(RoleName.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentTutoringTutorsService.remove(id);
  }
}
