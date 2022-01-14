import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Public } from 'src/auth/jwt-auth.guard';
import { RolesCanAccess } from 'src/decorators/roles-can-access.decorator';
import { RoleName } from '../roles/entities/role-name.enum';
import { ClassSchedulesService } from './class-schedules.service';
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto';
import { UpdateClassScheduleDto } from './dto/update-class-schedule.dto';

@Controller('class-schedules')
export class ClassSchedulesController {
  constructor(private readonly classSchedulesService: ClassSchedulesService) {}

  @RolesCanAccess(RoleName.ADMIN, RoleName.STUDENT_TUTOR)
  @Post()
  create(@Body() createClassScheduleDto: CreateClassScheduleDto) {
    return this.classSchedulesService.create(createClassScheduleDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.classSchedulesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.classSchedulesService.findOne(id);
  }

  @RolesCanAccess(RoleName.ADMIN, RoleName.STUDENT_TUTOR)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateClassScheduleDto: UpdateClassScheduleDto,
  ) {
    return this.classSchedulesService.update(id, updateClassScheduleDto);
  }

  @RolesCanAccess(RoleName.ADMIN, RoleName.STUDENT_TUTOR)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.classSchedulesService.remove(id);
  }
}
