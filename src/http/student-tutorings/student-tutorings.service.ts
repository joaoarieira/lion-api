import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentTutoringDto } from './dto/create-student-tutoring.dto';
import { UpdateStudentTutoringDto } from './dto/update-student-tutoring.dto';
import { StudentTutoring } from './entities/student-tutoring.entity';

@Injectable()
export class StudentTutoringsService {
  constructor(
    @InjectRepository(StudentTutoring)
    private readonly studentTutoringsRepository: Repository<StudentTutoring>,
  ) {}

  async create(
    createStudentTutoringDto: CreateStudentTutoringDto,
  ): Promise<StudentTutoring> {
    const studentTutoring = new StudentTutoring();
    studentTutoring.course_code = createStudentTutoringDto.course_code;
    studentTutoring.course_name = createStudentTutoringDto.course_name;
    studentTutoring.professor_id = createStudentTutoringDto.professor_id;
    studentTutoring.is_active = createStudentTutoringDto.is_active ?? true;

    const newStudentTutoring = await this.studentTutoringsRepository.save(
      studentTutoring,
    );
    const { id } = newStudentTutoring;
    return this.studentTutoringsRepository.findOne(id, {
      relations: ['professor'],
    });
  }

  findAll(): Promise<StudentTutoring[]> {
    return this.studentTutoringsRepository.find({ relations: ['professor'] });
  }

  findOne(id: string): Promise<StudentTutoring> {
    return this.studentTutoringsRepository.findOneOrFail(id, {
      relations: ['professor'],
    });
  }

  async update(
    id: string,
    updateStudentTutoringDto: UpdateStudentTutoringDto,
  ): Promise<StudentTutoring> {
    await this.studentTutoringsRepository.findOneOrFail(id);
    await this.studentTutoringsRepository.update(id, updateStudentTutoringDto);
    return this.studentTutoringsRepository.findOne(id, {
      relations: ['professor'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.studentTutoringsRepository.findOneOrFail(id);
    this.studentTutoringsRepository.delete(id);
  }
}
