import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('student_tutorings')
export class StudentTutoring {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  professor_id: string;

  @Column()
  course_code: string;

  @Column()
  course_name: string;

  @Column()
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.student_tutorings_supervised)
  @JoinColumn({ name: 'professor_id', referencedColumnName: 'id' })
  professor: User;
}
