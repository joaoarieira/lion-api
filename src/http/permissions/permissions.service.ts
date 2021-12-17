import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionsRepository: Repository<Permission>,
  ) {}

  async create(createModuleDto: CreatePermissionDto): Promise<Permission> {
    const permission = new Permission();
    permission.name = createModuleDto.name;

    return this.permissionsRepository.save(permission);
  }

  findAll(): Promise<Permission[]> {
    return this.permissionsRepository.find();
  }

  findOne(id: string): Promise<Permission> {
    return this.permissionsRepository.findOneOrFail(id);
  }

  async update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    await this.permissionsRepository.findOneOrFail(id);
    await this.permissionsRepository.update(id, updatePermissionDto);
    return this.permissionsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.permissionsRepository.findOneOrFail(id);
    await this.permissionsRepository.delete(id);
  }
}
