import { RoleModulePermission } from 'src/http/role-module-permissions/entities/role-module-permission.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('roles')
export class Role {
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
    (roleModulePermission) => roleModulePermission.role,
  )
  roleModulePermission: RoleModulePermission[];
}
