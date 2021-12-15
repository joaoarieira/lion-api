import { Injectable } from '@nestjs/common';
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
    return this.programsRepository.find({ relations: ['campus'] });
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
    await this.programsRepository.findOneOrFail(id);
    await this.programsRepository.delete(id);
  }
}
