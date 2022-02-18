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
    studentTutoring.is_active = createStudentTutoringDto.is_active ?? true;

    const newStudentTutoring = await this.studentTutoringsRepository.save(
      studentTutoring,
    );

    return await this.studentTutoringsRepository.findOne(
      newStudentTutoring.id,
      {
        relations: [
          'student_tutorings_tutors',
          'student_tutorings_tutors.tutor',
          'student_tutoring_programs',
          'student_tutoring_programs.program',
        ],
      },
    );
  }

  findAll(): Promise<StudentTutoring[]> {
    return this.studentTutoringsRepository.find({
      relations: [
        'student_tutorings_tutors',
        'student_tutorings_tutors.tutor',
        'student_tutoring_programs',
        'student_tutoring_programs.program',
      ],
    });
  }

  findOne(id: string): Promise<StudentTutoring> {
    return this.studentTutoringsRepository.findOneOrFail(id, {
      relations: [
        'student_tutorings_tutors',
        'student_tutorings_tutors.tutor',
        'student_tutorings_tutors.class_schedules',
        'student_tutoring_programs',
        'student_tutoring_programs.program',
      ],
    });
  }

  async update(
    id: string,
    updateStudentTutoringDto: UpdateStudentTutoringDto,
  ): Promise<StudentTutoring> {
    const student_tutoring_id = id;
    await this.studentTutoringsRepository.findOneOrFail(student_tutoring_id);

    await this.studentTutoringsRepository.update(id, updateStudentTutoringDto);

    return await this.studentTutoringsRepository.findOne(id, {
      relations: [
        'student_tutorings_tutors',
        'student_tutorings_tutors.tutor',
        'student_tutoring_programs',
        'student_tutoring_programs.program',
      ],
    });
  }

  async remove(id: string): Promise<void> {
    await this.studentTutoringsRepository.findOneOrFail(id);
    this.studentTutoringsRepository.delete(id);
  }
}
