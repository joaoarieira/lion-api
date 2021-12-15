import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DbModule } from './entities/db-module.entity';
import { DbCreateModuleDto } from './dto/create-db-module.dto';
import { DbUpdateModuleDto } from './dto/update-db-module.dto';

@Injectable()
export class DbModulesService {
  constructor(
    @InjectRepository(DbModule)
    private readonly dbModulesRepository: Repository<DbModule>,
  ) {}

  async create(createModuleDto: DbCreateModuleDto): Promise<DbModule> {
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
    updateModuleDto: DbUpdateModuleDto,
  ): Promise<DbModule> {
    await this.dbModulesRepository.findOneOrFail(id);
    await this.dbModulesRepository.update(id, updateModuleDto);
    return this.dbModulesRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.dbModulesRepository.findOneOrFail(id);
    await this.dbModulesRepository.delete(id);
  }
}
