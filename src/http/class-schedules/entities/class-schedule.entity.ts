import { StudentTutoringTutor } from '../../student-tutoring-tutors/entities/student-tutoring-tutor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('class_schedules')
export class ClassSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  student_tutoring_tutor_id: string;

  @Column()
  note: string;

  /**
   * 0=Sunday, 1=Monday, 2=Tuesday, ... 6=Saturday
   */
  @Column({ nullable: false })
  day_of_the_week: number;

  /**
   * HH:MM
   */
  @Column({ type: 'time' })
  starts_at: string;

  /**
   * HH:MM
   */
  @Column({ type: 'time' })
  ends_at: string;

  @Column({ nullable: false })
  meeting_place: string;

  @Column()
  meeting_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(
    () => StudentTutoringTutor,
    (studentTutoringTutor) => studentTutoringTutor.class_schedules,
  )
  @JoinColumn({ name: 'student_tutoring_tutor_id', referencedColumnName: 'id' })
  student_tutoring_tutor: StudentTutoringTutor;
}
