import { Campus } from '../../campuses/entities/campus.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('academic_departments')
export class AcademicDepartment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  campus_id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Campus, (campus) => campus.academic_departments, {
    primary: true,
    cascade: true,
  })
  @JoinColumn({ name: 'campus_id', referencedColumnName: 'id' })
  campus: Campus;
}
