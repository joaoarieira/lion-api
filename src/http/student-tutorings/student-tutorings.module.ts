import { Module } from '@nestjs/common';
import { StudentTutoringsService } from './student-tutorings.service';
import { StudentTutoringsController } from './student-tutorings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentTutoring } from './entities/student-tutoring.entity';
import { StudentTutoringProgramsModule } from '../student-tutoring-programs/student-tutoring-programs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentTutoring]),
    StudentTutoringProgramsModule,
  ],
  controllers: [StudentTutoringsController],
  providers: [StudentTutoringsService],
})
export class StudentTutoringsModule {}
