import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1698932770298 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE test_experiment (
            "id"                   serial,
            "created_at"           timestamp(0)   NOT NULL DEFAULT now(),
            "call_uuid"            varchar(255)   NOT NULL,
            "user_uuid"            varchar(255)   NOT NULL,
            "department_uuid"      uuid   NOT NULL,
            PRIMARY KEY ("id")
          );
          CREATE INDEX test_experiment_created_at_idx 
            ON test_experiment (created_at);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE test_experiment
    `)
  }
}
