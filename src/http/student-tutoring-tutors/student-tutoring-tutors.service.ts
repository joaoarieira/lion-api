import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentTutoringTutorDto } from './dto/create-student-tutoring-tutor.dto';
import { UpdateStudentTutoringTutorDto } from './dto/update-student-tutoring-tutor.dto';
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
      relations: ['student_tutoring', 'student_tutoring.professor', 'tutor'],
    });
  }

  findAll(): Promise<StudentTutoringTutor[]> {
    return this.studentTutoringTutorsRepository.find({
      relations: ['student_tutoring', 'student_tutoring.professor', 'tutor'],
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
      relations: [
        'student_tutoring',
        'student_tutoring.professor',
        'student_tutoring.student_tutoring_programs',
        'student_tutoring.student_tutoring_programs.program',
        'tutor',
        'class_schedules',
      ],
    });
  }

  async update(
    id: string,
    updateStudentTutoringTutorDto: UpdateStudentTutoringTutorDto,
  ): Promise<StudentTutoringTutor> {
    await this.studentTutoringTutorsRepository.findOneOrFail(id);
    await this.studentTutoringTutorsRepository.update(
      id,
      updateStudentTutoringTutorDto,
    );
    return this.studentTutoringTutorsRepository.findOne(id, {
      relations: ['student_tutoring', 'student_tutoring.professor', 'tutor'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.studentTutoringTutorsRepository.findOneOrFail(id);
    await this.studentTutoringTutorsRepository.delete(id);
  }

  async removeAllByTutorId(id: string) {
    const records = await this.findAllByTutorId(id);
    return this.studentTutoringTutorsRepository.remove(records);
  }

  async removeAllByStudentTutoringId(id: string) {
    const records = await this.findAllByStudentTutoringId(id);
    return this.studentTutoringTutorsRepository.remove(records);
  }
}
