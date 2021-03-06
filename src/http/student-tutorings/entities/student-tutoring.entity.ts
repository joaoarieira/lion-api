import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudentTutoringTutor } from '../../student-tutoring-tutors/entities/student-tutoring-tutor.entity';
import { StudentTutoringProgram } from '../../student-tutoring-programs/entities/student-tutoring-program.entity';

@Entity('student_tutorings')
export class StudentTutoring {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(
    () => StudentTutoringTutor,
    (studentTutoringTutor) => studentTutoringTutor.student_tutoring,
  )
  student_tutorings_tutors: User[];

  @OneToMany(
    () => StudentTutoringProgram,
    (studentTutoringProgram) => studentTutoringProgram.student_tutoring,
  )
  student_tutoring_programs: StudentTutoringProgram[];
}
