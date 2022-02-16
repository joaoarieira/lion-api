import { forwardRef, Module } from '@nestjs/common';
import { StudentTutoringTutorsService } from './student-tutoring-tutors.service';
import { StudentTutoringTutorsController } from './student-tutoring-tutors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentTutoringTutor } from './entities/student-tutoring-tutor.entity';
import { StudentTutoringsModule } from '../student-tutorings/student-tutorings.module';
import { UsersModule } from '../users/users.module';
import { ClassSchedulesModule } from '../class-schedules/class-schedules.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentTutoringTutor]),
    forwardRef(() => StudentTutoringsModule),
    forwardRef(() => UsersModule),
    ClassSchedulesModule,
  ],
  controllers: [StudentTutoringTutorsController],
  providers: [StudentTutoringTutorsService],
  exports: [StudentTutoringTutorsService],
})
export class StudentTutoringTutorsModule {}
