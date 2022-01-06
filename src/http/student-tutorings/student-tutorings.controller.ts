import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StudentTutoringsService } from './student-tutorings.service';
import { CreateStudentTutoringDto } from './dto/create-student-tutoring.dto';
import { UpdateStudentTutoringDto } from './dto/update-student-tutoring.dto';
import { RolesCanAccess } from 'src/decorators/roles-can-access.decorator';
import { RoleName } from '../roles/entities/role-name.enum';
import { Public } from 'src/auth/jwt-auth.guard';

@Controller('student-tutorings')
export class StudentTutoringsController {
  constructor(
    private readonly studentTutoringsService: StudentTutoringsService,
  ) {}

  @RolesCanAccess(RoleName.ADMIN)
  @Post()
  create(@Body() createStudentTutoringDto: CreateStudentTutoringDto) {
    return this.studentTutoringsService.create(createStudentTutoringDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.studentTutoringsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentTutoringsService.findOne(id);
  }

  @RolesCanAccess(RoleName.ADMIN)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentTutoringDto: UpdateStudentTutoringDto,
  ) {
    return this.studentTutoringsService.update(id, updateStudentTutoringDto);
  }

  @RolesCanAccess(RoleName.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentTutoringsService.remove(id);
  }
}
