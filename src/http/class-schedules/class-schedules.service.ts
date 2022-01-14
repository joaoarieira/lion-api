import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto';
import { UpdateClassScheduleDto } from './dto/update-class-schedule.dto';
import { ClassSchedule } from './entities/class-schedule.entity';

@Injectable()
export class ClassSchedulesService {
  constructor(
    @InjectRepository(ClassSchedule)
    private readonly classSchedulesRepository: Repository<ClassSchedule>,
  ) {}

  async create(createClassScheduleDto: CreateClassScheduleDto) {
    const classSchedule = new ClassSchedule();
    classSchedule.note = createClassScheduleDto.note;
    classSchedule.day_of_the_week = createClassScheduleDto.day_of_the_week;
    classSchedule.starts_at = createClassScheduleDto.starts_at;
    classSchedule.ends_at = createClassScheduleDto.ends_at;
    classSchedule.meeting_place = createClassScheduleDto.meeting_place;
    classSchedule.student_tutoring_tutor_id =
      createClassScheduleDto.student_tutoring_tutor_id;

    await this.classSchedulesRepository.save(classSchedule);
    return this.classSchedulesRepository.findOne(classSchedule.id);
  }

  findAll() {
    return this.classSchedulesRepository.find({
      relations: ['student_tutoring_tutor'],
    });
  }

  findOne(id: string) {
    return this.classSchedulesRepository.findOneOrFail(id, {
      relations: ['student_tutoring_tutor'],
    });
  }

  async update(id: string, updateClassScheduleDto: UpdateClassScheduleDto) {
    await this.classSchedulesRepository.findOneOrFail(id);
    await this.classSchedulesRepository.update(id, updateClassScheduleDto);
    return this.classSchedulesRepository.findOne(id);
  }

  async remove(id: string) {
    await this.classSchedulesRepository.delete(id);
  }
}
