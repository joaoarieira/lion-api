import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentTutoringProgramDto } from './dto/create-student-tutoring-program.dto';
import { StudentTutoringProgram } from './entities/student-tutoring-program.entity';

@Injectable()
export class StudentTutoringProgramsService {
  constructor(
    @InjectRepository(StudentTutoringProgram)
    private readonly studentTutoringProgramsRepository: Repository<StudentTutoringProgram>,
  ) {}

  create(createStudentTutoringProgramDto: CreateStudentTutoringProgramDto) {
    const newStudentTutoringProgram = new StudentTutoringProgram();
    newStudentTutoringProgram.program_id =
      createStudentTutoringProgramDto.program_id;
    newStudentTutoringProgram.student_tutoring_id =
      createStudentTutoringProgramDto.student_tutoring_id;

    return this.studentTutoringProgramsRepository.save(
      newStudentTutoringProgram,
    );
  }

  findAll() {
    return this.studentTutoringProgramsRepository.find();
  }

  findAllByStudentTutoringId(id: string) {
    return this.studentTutoringProgramsRepository.find({
      where: { student_tutoring_id: id },
    });
  }

  findAllByProgramId(id: string) {
    return this.studentTutoringProgramsRepository.find({
      where: { program_id: id },
    });
  }

  findOne(studentTutoringId: string, programId: string) {
    return this.studentTutoringProgramsRepository.findOneOrFail({
      where: { student_tutoring_id: studentTutoringId, program_id: programId },
    });
  }

  async remove(studentTutoringId: string, programId: string) {
    const record = await this.findOne(studentTutoringId, programId);
    return this.studentTutoringProgramsRepository.remove(record);
  }

  async removeAllByStudentTutoringId(id: string) {
    const records = await this.findAllByStudentTutoringId(id);
    return this.studentTutoringProgramsRepository.remove(records);
  }

  async removeAllByProgramId(id: string) {
    const records = await this.findAllByProgramId(id);
    return this.studentTutoringProgramsRepository.remove(records);
  }
}
