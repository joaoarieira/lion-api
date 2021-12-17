import { DbModule } from 'src/http/db-modules/entities/db-module.entity';
import { Permission } from 'src/http/permissions/entities/permission.entity';
import { Role } from 'src/http/roles/entities/role.entity';
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

  @ManyToOne(() => Role, (role) => role.roleModulePermission)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role;

  @ManyToOne(() => DbModule, (dbModule) => dbModule.roleModulePermission)
  @JoinColumn({ name: 'db_module_id', referencedColumnName: 'id' })
  db_module: DbModule;

  @ManyToOne(() => Permission, (permission) => permission.roleModulePermission)
  @JoinColumn({ name: 'permission_id', referencedColumnName: 'id' })
  permission: Permission;
}
