import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { ClassSchedulesService } from '../class-schedules/class-schedules.service';
import { CreateStudentTutoringTutorDto } from './dto/create-student-tutoring-tutor.dto';
import { GetAllStudentTutoringTutorDto } from './dto/get-all-student-tutoring-tutor.dto';
import { UpdateStudentTutoringTutorDto } from './dto/update-student-tutoring-tutor.dto';
import { StudentTutoringTutor } from './entities/student-tutoring-tutor.entity';

@Injectable()
export class StudentTutoringTutorsService {
  constructor(
    @InjectRepository(StudentTutoringTutor)
    private readonly studentTutoringTutorsRepository: Repository<StudentTutoringTutor>,
    private readonly classSchedulesService: ClassSchedulesService,
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
      relations: ['student_tutoring', 'professor', 'tutor'],
    });
  }

  async findAll(
    query?: GetAllStudentTutoringTutorDto,
  ): Promise<StudentTutoringTutor[]> {
    if (query.program_id) {
      const studentTutoringTutors =
        await this.studentTutoringTutorsRepository.find({
          relations: [
            'student_tutoring',
            'student_tutoring.student_tutoring_programs',
            'student_tutoring.student_tutoring_programs.program',
            'professor',
            'tutor',
          ],
        });

      const filteredValues = studentTutoringTutors.filter((value) =>
        value.student_tutoring.student_tutoring_programs.some(
          (item) => item.program_id === query.program_id,
        ),
      );

      return filteredValues;
    }

    if (query.tutor_id) {
      const studentTutoringTutors =
        await this.studentTutoringTutorsRepository.find({
          relations: [
            'student_tutoring',
            'student_tutoring.student_tutoring_programs',
            'student_tutoring.student_tutoring_programs.program',
            'professor',
            'tutor',
          ],
        });

      const filteredValues = studentTutoringTutors.filter(
        (value) => value.tutor_id === query.tutor_id,
      );

      return filteredValues;
    }

    if (query.query) {
      const studentTutoringTutors =
        await this.studentTutoringTutorsRepository.find({
          relations: [
            'student_tutoring',
            'student_tutoring.student_tutoring_programs',
            'student_tutoring.student_tutoring_programs.program',
            'professor',
            'tutor',
          ],
          where: [
            {
              student_tutoring: {
                course_name: ILike(`%${query.query}%`),
              },
            },
            {
              student_tutoring: {
                course_code: ILike(`%${query.query}%`),
              },
            },
          ],
        });

      return studentTutoringTutors;
    }

    return this.studentTutoringTutorsRepository.find({
      relations: ['student_tutoring', 'professor', 'tutor'],
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

  findAllByProfessorId(id: string) {
    return this.studentTutoringTutorsRepository.find({
      where: { professor_id: id },
    });
  }

  findOne(id: string): Promise<StudentTutoringTutor> {
    return this.studentTutoringTutorsRepository.findOneOrFail(id, {
      relations: [
        'student_tutoring',
        'student_tutoring.student_tutoring_programs',
        'student_tutoring.student_tutoring_programs.program',
        'tutor',
        'professor',
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
      relations: ['student_tutoring', 'professor', 'tutor'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.studentTutoringTutorsRepository.findOneOrFail(id);
    await this.studentTutoringTutorsRepository.delete(id);
  }

  async removeAllByTutorId(id: string) {
    const records = await this.findAllByTutorId(id);
    for (const student_tutoring_tutor of records) {
      await this.classSchedulesService.removeAllByStudentTutoringTutorId(
        student_tutoring_tutor.id,
      );
    }
    return this.studentTutoringTutorsRepository.remove(records);
  }

  async removeAllByProfessorId(id: string) {
    const records = await this.findAllByProfessorId(id);
    for (const student_tutoring_tutor of records) {
      await this.classSchedulesService.removeAllByStudentTutoringTutorId(
        student_tutoring_tutor.id,
      );
    }
    return this.studentTutoringTutorsRepository.remove(records);
  }

  async removeAllByStudentTutoringId(id: string) {
    const records = await this.findAllByStudentTutoringId(id);
    for (const student_tutoring_tutor of records) {
      await this.classSchedulesService.removeAllByStudentTutoringTutorId(
        student_tutoring_tutor.id,
      );
    }
    return this.studentTutoringTutorsRepository.remove(records);
  }
}
