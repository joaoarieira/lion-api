import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentTutoringTutorDto } from './dto/create-student-tutoring-tutor.dto';
import { StudentTutoringTutor } from './entities/student-tutoring-tutor.entity';

@Injectable()
export class StudentTutoringTutorsService {
  constructor(
    @InjectRepository(StudentTutoringTutor)
    private readonly studentTutoringTutorsRepository: Repository<StudentTutoringTutor>,
  ) {}

  async create(
    createStudentTutoringTutorDto: CreateStudentTutoringTutorDto,
  ): Promise<StudentTutoringTutor> {
    const newStudentTutoringTutor =
      await this.studentTutoringTutorsRepository.save(
        createStudentTutoringTutorDto,
      );
    const { id } = newStudentTutoringTutor;
    return this.studentTutoringTutorsRepository.findOne(id, {
      relations: ['student_tutoring', 'tutor'],
    });
  }

  findAll(): Promise<StudentTutoringTutor[]> {
    return this.studentTutoringTutorsRepository.find({
      relations: ['student_tutoring', 'tutor'],
    });
  }

  findAllByStudentTutoringId(id: string) {
    return this.studentTutoringTutorsRepository.find({
      where: { student_tutoring_id: id },
    });
  }

  findAllByTutorId(id: string) {
    return this.studentTutoringTutorsRepository.find({
      where: { tutor_id: id },
    });
  }

  findOne(id: string): Promise<StudentTutoringTutor> {
    return this.studentTutoringTutorsRepository.findOneOrFail(id, {
      relations: ['student_tutoring', 'tutor'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.studentTutoringTutorsRepository.findOneOrFail(id);
    await this.studentTutoringTutorsRepository.delete(id);
  }

  async removeAllByTutorId(id: string) {
    const records = await this.findAllByTutorId(id);
    this.studentTutoringTutorsRepository.remove(records);
  }

  async removeAllByStudentTutoringId(id: string) {
    const records = await this.findAllByStudentTutoringId(id);
    this.studentTutoringTutorsRepository.remove(records);
  }
}
