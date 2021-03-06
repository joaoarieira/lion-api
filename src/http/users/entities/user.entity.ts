import { Role } from '../../roles/entities/role.entity';
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
import { StudentTutoringTutor } from '../../student-tutoring-tutors/entities/student-tutoring-tutor.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role_id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password_hash?: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role;

  @OneToMany(
    () => StudentTutoringTutor,
    (studentTutoringTutor) => studentTutoringTutor.tutor,
  )
  student_tutoring_tutors: StudentTutoringTutor[];

  @OneToMany(
    () => StudentTutoringTutor,
    (studentTutoringTutor) => studentTutoringTutor.professor,
  )
  student_tutoring_professors: StudentTutoringTutor[];
}
