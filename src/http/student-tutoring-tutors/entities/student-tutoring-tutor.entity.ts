import { StudentTutoring } from '../../student-tutorings/entities/student-tutoring.entity';
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

@Entity('student_tutoring_tutors')
export class StudentTutoringTutor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  student_tutoring_id: string;

  @Column()
  tutor_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(
    () => StudentTutoring,
    (studentTutoring) => studentTutoring.student_tutorings_tutors,
  )
  @JoinColumn({ name: 'student_tutoring_id', referencedColumnName: 'id' })
  student_tutoring: StudentTutoring;

  @ManyToOne(() => User, (user) => user.student_tutoring_tutors)
  @JoinColumn({ name: 'tutor_id', referencedColumnName: 'id' })
  tutor: User;
}
