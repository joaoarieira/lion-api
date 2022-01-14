import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateClassSchedules1642130260477 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'class_schedules',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
            isUnique: true,
          },
          {
            name: 'student_tutoring_tutor_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'day_of_the_week',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'note',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'starts_at',
            type: 'time',
            isNullable: true,
          },
          {
            name: 'ends_at',
            type: 'time',
            isNullable: true,
          },
          {
            name: 'meeting_place',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'meeting_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'class_schedules',
      new TableForeignKey({
        columnNames: ['student_tutoring_tutor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'student_tutoring_tutors',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('class_schedules');
  }
}
