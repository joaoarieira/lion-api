import { DbModule } from '../../db-modules/entities/db-module.entity';
import { Permission } from '../../permissions/entities/permission.entity';
import { Role } from '../../roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('role_module_permissions')
export class RoleModulePermission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role_id: string;

  @Column()
  db_module_id: string;

  @Column()
  permission_id: string;

  @Column({ default: false, nullable: false })
  allow: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Role, (role) => role.roleModulePermissions)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role;

  @ManyToOne(() => DbModule, (dbModule) => dbModule.roleModulePermissions)
  @JoinColumn({ name: 'db_module_id', referencedColumnName: 'id' })
  db_module: DbModule;

  @ManyToOne(() => Permission, (permission) => permission.roleModulePermissions)
  @JoinColumn({ name: 'permission_id', referencedColumnName: 'id' })
  permission: Permission;
}
