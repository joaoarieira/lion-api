import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(createModuleDto: CreateRoleDto): Promise<Role> {
    const role = new Role();
    role.name = createModuleDto.name;

    return this.rolesRepository.save(role);
  }

  findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  findOne(id: string): Promise<Role> {
    return this.rolesRepository.findOneOrFail(id);
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    await this.rolesRepository.findOneOrFail(id);
    await this.rolesRepository.update(id, updateRoleDto);
    return this.rolesRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.rolesRepository.findOneOrFail(id);
    await this.rolesRepository.delete(id);
  }
}
