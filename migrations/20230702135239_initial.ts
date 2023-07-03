import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

  await knex.raw(`
    CREATE TABLE "user" (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      created_at timestamp NOT NULL DEFAULT now(),
      updated_at timestamp NULL,
      deleted_at timestamp NULL,
      "name" varchar(255) NULL,
      description varchar(1024) NULL,
      last_name varchar(255) NOT NULL,
      email varchar(255) NOT NULL,
      phone varchar(255) NOT NULL,
      PRIMARY KEY ("id")
    );
  `);

  await knex.raw(`
    CREATE TABLE "currency" (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      created_at timestamp NOT NULL DEFAULT now(),
      updated_at timestamp NULL,
      deleted_at timestamp NULL,
      "name" varchar(255) NULL,
      description varchar(1024) NULL,
      code int NOT NULL,
      short_name varchar(255) NOT NULL,
      PRIMARY KEY ("id")
    );
  `);

  await knex.raw(`
    CREATE TABLE "team" (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      created_at timestamp NOT NULL DEFAULT now(),
      updated_at timestamp NULL,
      deleted_at timestamp NULL,
      "name" varchar(255) NULL,
      description varchar(1024) NULL,
      currency_id uuid NOT NULL,
      referral_id uuid NOT NULL,
      PRIMARY KEY ("id"),
      CONSTRAINT team_referral_id_fk FOREIGN KEY (referral_id) REFERENCES "user"(id),
      CONSTRAINT team_currency_id_fk FOREIGN KEY (currency_id) REFERENCES currency(id)
    );
  `);

  await knex.raw(`
    CREATE TYPE "team_mate_role" AS ENUM (
      'super_mate', 
      'mate' 
    );
  `);

  await knex.raw(`
    CREATE TABLE "team_mate" (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      created_at timestamp NOT NULL DEFAULT now(),
      updated_at timestamp NULL,
      deleted_at timestamp NULL,
      user_id uuid NULL,
      team_id uuid NULL,
      role team_mate_role NOT NULL DEFAULT 'super_mate',
      PRIMARY KEY ("id"),
      CONSTRAINT team_mate_user_id_fk FOREIGN KEY (user_id) REFERENCES "user"(id),
      CONSTRAINT team_mate_team_id_fk FOREIGN KEY (team_id) REFERENCES team(id)
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS "team_mate";`);
  await knex.raw(`DROP TYPE IF EXISTS "team_mate_role";`);
  await knex.raw(`DROP TABLE IF EXISTS "team";`);
  await knex.raw(`DROP TABLE IF EXISTS "currency";`);
  await knex.raw(`DROP TABLE IF EXISTS "user";`);
}
