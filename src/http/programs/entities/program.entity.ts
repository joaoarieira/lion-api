import { Campus } from '../../campuses/entities/campus.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudentTutoringProgram } from '../../student-tutoring-programs/entities/student-tutoring-program.entity';

@Entity('programs')
export class Program {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  campus_id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Campus, (campus) => campus.programs)
  @JoinColumn({ name: 'campus_id', referencedColumnName: 'id' })
  campus: Campus;

  @OneToMany(
    () => StudentTutoringProgram,
    (studentTutoringPrograms) => studentTutoringPrograms.program,
  )
  student_tutoring_programs: StudentTutoringProgram[];
}
