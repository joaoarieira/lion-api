import { Module } from '@nestjs/common';
import { AcademicDepartmentsService } from './academic-departments.service';
import { AcademicDepartmentsController } from './academic-departments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicDepartment } from './entities/academic-department.entity';
import { CampusesModule } from '../campuses/campuses.module';

@Module({
  imports: [TypeOrmModule.forFeature([AcademicDepartment]), CampusesModule],
  controllers: [AcademicDepartmentsController],
  providers: [AcademicDepartmentsService],
})
export class AcademicDepartmentsModule {}
