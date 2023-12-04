import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';

export class TestFill1698933145913 implements MigrationInterface {
  id = 1;
  fakeData() {
    const data = {
      id: this.id++,
      created_at: faker.date.anytime(),
      call_uuid: faker.string.uuid(),
      user_uuid: faker.string.uuid(),
      department_uuid: faker.string.uuid(),
    };

    return Object.keys(data).map((key) => data[key]);
  }
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('COMMIT');
    for (let index = 0; index < 1_000; index++) {
      let i = 1;
      // for (let index = 0; index < 1; index++) {
      const data = [];
      for (let index2 = 0; index2 < 10_000; index2++) {
        //   for (let index2 = 0; index2 < 2; index2++) {
        data.push(this.fakeData());
      }

      await queryRunner.query(
        `
        INSERT INTO 
            test_experiment (
                id,created_at,call_uuid,user_uuid,department_uuid
            ) 
        VALUES ${data.map((v) => {
          return `(${v.map(() => `$${i++}`).join(',')})`;
        })}
      `,
        data.flat(),
      );
    }
    queryRunner.query('START TRANSACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
