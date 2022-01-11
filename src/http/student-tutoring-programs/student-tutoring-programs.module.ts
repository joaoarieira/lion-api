import { Module } from '@nestjs/common';
import { StudentTutoringProgramsService } from './student-tutoring-programs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentTutoringProgram } from './entities/student-tutoring-program.entity';
import { ProgramsModule } from '../programs/programs.module';

@Module({
  imports: [TypeOrmModule.forFeature([StudentTutoringProgram]), ProgramsModule],
  providers: [StudentTutoringProgramsService],
  exports: [StudentTutoringProgramsService],
})
export class StudentTutoringProgramsModule {}
