import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from './entities/program.entity';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private readonly programsRepository: Repository<Program>,
  ) {}
  async create(createProgramDto: CreateProgramDto): Promise<Program> {
    const program = new Program();
    program.name = createProgramDto.name;
    program.campus_id = createProgramDto.campus_id;

    await this.programsRepository.save(program);
    return this.findOne(program.id);
  }

  findAll(): Promise<Program[]> {
    return this.programsRepository.find({
      relations: ['campus', 'student_tutoring_programs'],
    });
  }

  findOne(id: string): Promise<Program> {
    return this.programsRepository.findOneOrFail(id, { relations: ['campus'] });
  }

  async update(
    id: string,
    updateProgramDto: UpdateProgramDto,
  ): Promise<Program> {
    await this.programsRepository.findOneOrFail(id);
    await this.programsRepository.update(id, updateProgramDto);
    return this.programsRepository.findOne(id, { relations: ['campus'] });
  }

  async remove(id: string): Promise<void> {
    const program = await this.programsRepository.findOneOrFail(id, {
      relations: ['student_tutoring_programs'],
    });

    const canDelete =
      program.student_tutoring_programs.filter(
        (student_tutoring_program) =>
          student_tutoring_program.program_id === id,
      ).length <= 0;

    if (!canDelete) {
      throw new BadRequestException(
        'cannot delete a program that is related to a student_tutoring',
      );
    }

    await this.programsRepository.delete(id);
  }
}
