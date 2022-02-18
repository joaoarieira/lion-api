import { Module } from '@nestjs/common';
import { StudentTutoringTutorsService } from './student-tutoring-tutors.service';
import { StudentTutoringTutorsController } from './student-tutoring-tutors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentTutoringTutor } from './entities/student-tutoring-tutor.entity';
import { ClassSchedulesModule } from '../class-schedules/class-schedules.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentTutoringTutor]),
    ClassSchedulesModule,
  ],
  controllers: [StudentTutoringTutorsController],
  providers: [StudentTutoringTutorsService],
  exports: [StudentTutoringTutorsService],
})
export class StudentTutoringTutorsModule {}
