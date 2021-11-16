import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Campus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
