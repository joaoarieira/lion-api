import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentTutoringProgramDto } from '../student-tutoring-programs/dto/create-student-tutoring-program.dto';
import { StudentTutoringProgramsService } from '../student-tutoring-programs/student-tutoring-programs.service';
import { CreateStudentTutoringTutorDto } from '../student-tutoring-tutors/dto/create-student-tutoring-tutor.dto';
import { StudentTutoringTutorsService } from '../student-tutoring-tutors/student-tutoring-tutors.service';
import { CreateStudentTutoringDto } from './dto/create-student-tutoring.dto';
import { UpdateStudentTutoringDto } from './dto/update-student-tutoring.dto';
import { StudentTutoring } from './entities/student-tutoring.entity';

@Injectable()
export class StudentTutoringsService {
  constructor(
    @InjectRepository(StudentTutoring)
    private readonly studentTutoringsRepository: Repository<StudentTutoring>,
    private readonly studentTutoringProgramsService: StudentTutoringProgramsService,
    private readonly studentTutoringTutorsService: StudentTutoringTutorsService,
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

    const { id: student_tutoring_id } = newStudentTutoring;

    for (const program_id of createStudentTutoringDto.programs_ids) {
      const studentTutoringProgramDto = {
        student_tutoring_id,
        program_id,
      } as CreateStudentTutoringProgramDto;

      await this.studentTutoringProgramsService.create(
        studentTutoringProgramDto,
      );
    }

    for (const tutor_id of createStudentTutoringDto.tutors_ids) {
      const studentTutoringTutorDto = {
        student_tutoring_id,
        tutor_id,
      } as CreateStudentTutoringTutorDto;

      await this.studentTutoringTutorsService.create(studentTutoringTutorDto);
    }

    return await this.studentTutoringsRepository.findOne(student_tutoring_id, {
      relations: [
        'professor',
        'student_tutorings_tutors',
        'student_tutorings_tutors.tutor',
        'student_tutoring_programs',
        'student_tutoring_programs.program',
      ],
    });
  }

  findAll(): Promise<StudentTutoring[]> {
    return this.studentTutoringsRepository.find({
      relations: [
        'professor',
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
        'professor',
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

    const { programs_ids, tutors_ids, ...studentTutoring } =
      updateStudentTutoringDto;

    if (programs_ids !== undefined) {
      await this.studentTutoringProgramsService.removeAllByStudentTutoringId(
        id,
      );

      for (const program_id of programs_ids) {
        const studentTutoringProgramDto = {
          student_tutoring_id,
          program_id,
        } as CreateStudentTutoringProgramDto;

        await this.studentTutoringProgramsService.create(
          studentTutoringProgramDto,
        );
      }
    }

    if (tutors_ids !== undefined) {
      await this.studentTutoringTutorsService.removeAllByStudentTutoringId(
        student_tutoring_id,
      );

      for (const tutor_id of tutors_ids) {
        const studentTutoringTutorDto = {
          student_tutoring_id,
          tutor_id,
        } as CreateStudentTutoringTutorDto;

        await this.studentTutoringTutorsService.create(studentTutoringTutorDto);
      }
    }

    await this.studentTutoringsRepository.update(id, studentTutoring);

    return await this.studentTutoringsRepository.findOne(id, {
      relations: [
        'professor',
        'student_tutorings_tutors',
        'student_tutorings_tutors.tutor',
        'student_tutoring_programs',
        'student_tutoring_programs.program',
      ],
    });
  }

  async remove(id: string): Promise<void> {
    await this.studentTutoringsRepository.findOneOrFail(id);
    await this.studentTutoringProgramsService.removeAllByStudentTutoringId(id);
    await this.studentTutoringTutorsService.removeAllByStudentTutoringId(id);
    this.studentTutoringsRepository.delete(id);
  }
}
