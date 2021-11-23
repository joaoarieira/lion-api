import { AcademicDepartment } from '../../academic-departments/entities/academic-department.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('campuses')
export class Campus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => AcademicDepartment,
    (academicDepartment) => academicDepartment.campus,
  )
  @JoinColumn({ name: 'id' })
  academic_departments: AcademicDepartment[];
}
