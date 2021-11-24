import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
import { Campus } from './entities/campus.entity';

@Injectable()
export class CampusesService {
  constructor(
    @InjectRepository(Campus)
    private readonly campusesRepository: Repository<Campus>,
  ) {}

  async create(createCampusDto: CreateCampusDto): Promise<Campus> {
    const campus = new Campus();
    campus.name = createCampusDto.name;
    return this.campusesRepository.save(campus);
  }

  findAll(): Promise<Campus[]> {
    return this.campusesRepository.find();
  }

  findOne(id: string): Promise<Campus> {
    return this.campusesRepository.findOne(id);
  }

  update(id: string, updateCampusDto: UpdateCampusDto) {
    return this.campusesRepository.update(id, updateCampusDto);
  }

  async remove(id: string): Promise<void> {
    await this.campusesRepository.delete(id);
  }
}
