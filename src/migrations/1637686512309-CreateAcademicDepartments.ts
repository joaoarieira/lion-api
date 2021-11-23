import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAcademicDepartments1637686512309
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'academic_departments',
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
            name: 'campus_id',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
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
      'academic_departments',
      new TableForeignKey({
        columnNames: ['campus_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'campuses',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('academic_departments');

    await queryRunner.dropForeignKey(
      'academic_departments',
      table.foreignKeys.find((fk) => fk.columnNames.indexOf('campus_id') != -1),
    );

    await queryRunner.dropTable('academic_departments');
  }
}
