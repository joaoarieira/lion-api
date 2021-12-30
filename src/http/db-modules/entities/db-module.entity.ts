import { RoleModulePermission } from '../../role-module-permissions/entities/role-module-permission.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('db_modules')
export class DbModule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => RoleModulePermission,
    (roleModulePermission) => roleModulePermission.db_module,
  )
  roleModulePermissions: RoleModulePermission[];
}
