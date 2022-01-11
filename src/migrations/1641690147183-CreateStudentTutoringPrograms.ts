import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateStudentTutoringPrograms1641690147183
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'student_tutoring_programs',
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
            name: 'program_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'student_tutoring_id',
            type: 'uuid',
            isPrimary: true,
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

    await queryRunner.createForeignKeys('student_tutoring_programs', [
      new TableForeignKey({
        columnNames: ['program_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'programs',
      }),
      new TableForeignKey({
        columnNames: ['student_tutoring_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'student_tutorings',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('student_tutoring_programs');
  }
}
