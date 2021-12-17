import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DbModule } from './entities/db-module.entity';
import { CreateDbModuleDto } from './dto/create-db-module.dto';
import { UpdateDbModuleDto } from './dto/update-db-module.dto';

@Injectable()
export class DbModulesService {
  constructor(
    @InjectRepository(DbModule)
    private readonly dbModulesRepository: Repository<DbModule>,
  ) {}

  async create(createModuleDto: CreateDbModuleDto): Promise<DbModule> {
    const dbModule = new DbModule();
    dbModule.name = createModuleDto.name;

    return this.dbModulesRepository.save(dbModule);
  }

  findAll(): Promise<DbModule[]> {
    return this.dbModulesRepository.find();
  }

  findOne(id: string): Promise<DbModule> {
    return this.dbModulesRepository.findOneOrFail(id);
  }

  async update(
    id: string,
    updateDbModuleDto: UpdateDbModuleDto,
  ): Promise<DbModule> {
    await this.dbModulesRepository.findOneOrFail(id);
    await this.dbModulesRepository.update(id, updateDbModuleDto);
    return this.dbModulesRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.dbModulesRepository.findOneOrFail(id);
    await this.dbModulesRepository.delete(id);
  }
}
