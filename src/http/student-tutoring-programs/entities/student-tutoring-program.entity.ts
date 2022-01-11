import { Program } from '../../programs/entities/program.entity';
import { StudentTutoring } from '../../student-tutorings/entities/student-tutoring.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('student_tutoring_programs')
export class StudentTutoringProgram {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  program_id: string;

  @Column()
  student_tutoring_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Program, (program) => program.student_tutoring_programs)
  @JoinColumn({ name: 'program_id', referencedColumnName: 'id' })
  program: Program;

  @ManyToOne(
    () => StudentTutoring,
    (studentTutoring) => studentTutoring.student_tutoring_programs,
  )
  @JoinColumn({ name: 'student_tutoring_id', referencedColumnName: 'id' })
  student_tutoring: StudentTutoring;
}
