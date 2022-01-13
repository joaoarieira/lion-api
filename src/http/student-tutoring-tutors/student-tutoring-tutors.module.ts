import { forwardRef, Module } from '@nestjs/common';
import { StudentTutoringTutorsService } from './student-tutoring-tutors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentTutoringTutor } from './entities/student-tutoring-tutor.entity';
import { StudentTutoringsModule } from '../student-tutorings/student-tutorings.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentTutoringTutor]),
    forwardRef(() => StudentTutoringsModule),
    forwardRef(() => UsersModule),
  ],
  providers: [StudentTutoringTutorsService],
  exports: [StudentTutoringTutorsService],
})
export class StudentTutoringTutorsModule {}
