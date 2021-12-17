import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleModulePermissionDto } from './dto/create-role-module-permission.dto';
import { UpdateRoleModulePermissionDto } from './dto/update-role-module-permission.dto';
import { RoleModulePermission } from './entities/role-module-permission.entity';

@Injectable()
export class RoleModulePermissionsService {
  constructor(
    @InjectRepository(RoleModulePermission)
    private readonly roleModulePermissionRepository: Repository<RoleModulePermission>,
  ) {}
  async create(
    createRoleModulePermissionDto: CreateRoleModulePermissionDto,
  ): Promise<RoleModulePermission> {
    const newRoleModulePermission =
      await this.roleModulePermissionRepository.save(
        createRoleModulePermissionDto,
      );
    const { id } = newRoleModulePermission;
    return this.roleModulePermissionRepository.findOne(id, {
      relations: ['role', 'db_module', 'permission'],
    });
  }

  findAll(): Promise<RoleModulePermission[]> {
    return this.roleModulePermissionRepository.find({
      relations: ['role', 'db_module', 'permission'],
    });
  }

  findOne(id: string) {
    return this.roleModulePermissionRepository.findOneOrFail(id, {
      relations: ['role', 'db_module', 'permission'],
    });
  }

  async update(
    id: string,
    updateRoleModulePermissionDto: UpdateRoleModulePermissionDto,
  ): Promise<RoleModulePermission> {
    await this.roleModulePermissionRepository.findOneOrFail(id);
    await this.roleModulePermissionRepository.update(
      id,
      updateRoleModulePermissionDto,
    );
    return this.roleModulePermissionRepository.findOne(id, {
      relations: ['role', 'db_module', 'permission'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.roleModulePermissionRepository.findOneOrFail(id);
    await this.roleModulePermissionRepository.delete(id);
  }
}
