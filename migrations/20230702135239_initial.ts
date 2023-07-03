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
      description varchar(1024) NOT NULL,
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
      "name" varchar(255) NOT NULL,
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
      "name" varchar(255) NOT NULL,
      description varchar(1024) NOT NULL,
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
      user_id uuid NOT NULL,
      team_id uuid NOT NULL,
      role team_mate_role NOT NULL DEFAULT 'super_mate',
      PRIMARY KEY ("id"),
      CONSTRAINT team_mate_user_id_fk FOREIGN KEY (user_id) REFERENCES "user"(id),
      CONSTRAINT team_mate_team_id_fk FOREIGN KEY (team_id) REFERENCES team(id)
    );
  `);

  await knex.raw(`
    CREATE TABLE "channel" (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      created_at timestamp NOT NULL DEFAULT now(),
      updated_at timestamp NULL,
      deleted_at timestamp NULL,
      "name" varchar(255) NOT NULL,
      description varchar(1024) NOT NULL,
      token varchar NOT NULL,
      team_id uuid NOT NULL,
      PRIMARY KEY ("id"),
      CONSTRAINT channel_team_id_fk FOREIGN KEY (team_id) REFERENCES team(id)
    );
  `);

  await knex.raw(`
    CREATE TABLE "member" (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      created_at timestamp NOT NULL DEFAULT now(),
      updated_at timestamp NULL,
      deleted_at timestamp NULL,
      "name" varchar(255) NOT NULL,
      description varchar(1024) NOT NULL,
      token varchar NOT NULL,
      range numeric(5, 2) NOT NULL,
      channel_id uuid NOT NULL,
      user_id uuid NULL,
      PRIMARY KEY ("id"),
      CONSTRAINT member_user_id_fk FOREIGN KEY (user_id) REFERENCES "user"(id),
      CONSTRAINT member_channel_id_fk FOREIGN KEY (channel_id) REFERENCES channel(id)
    );
  `);

  await knex.raw(`
    CREATE TABLE "member_notice" (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      created_at timestamp NOT NULL DEFAULT now(),
      updated_at timestamp NULL,
      deleted_at timestamp NULL,
      range numeric(5, 2) NOT NULL,
      channel_id uuid NOT NULL,
      mate_id uuid NOT NULL,
      member_id uuid NOT NULL,
      notice varchar(1024) NOT NULL,
      PRIMARY KEY ("id"),
      CONSTRAINT member_notice_channel_id_fk FOREIGN KEY (channel_id) REFERENCES "channel"(id),
      CONSTRAINT member_notice_team_mate_id_fk FOREIGN KEY (mate_id) REFERENCES team_mate(id),
      CONSTRAINT member_notice_member_id_fk FOREIGN KEY (member_id) REFERENCES member(id)
    );
  `);

  await knex.raw(`
    CREATE TABLE "message" (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      created_at timestamp NOT NULL DEFAULT now(),
      updated_at timestamp NULL,
      deleted_at timestamp NULL,
      text varchar(2048) NOT NULL,
      channel_id uuid NOT NULL,
      mate_id uuid NOT NULL,
      date timestamp NOT NULL,
      sent boolean NOT NULL,
      PRIMARY KEY ("id"),
      CONSTRAINT message_channel_id_fk FOREIGN KEY (channel_id) REFERENCES channel(id),
      CONSTRAINT message_team_mate_id_fk FOREIGN KEY (mate_id) REFERENCES team_mate(id)
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS "message";`);
  await knex.raw(`DROP TABLE IF EXISTS "member_notice";`);
  await knex.raw(`DROP TABLE IF EXISTS "member";`);
  await knex.raw(`DROP TABLE IF EXISTS "channel";`);
  await knex.raw(`DROP TABLE IF EXISTS "team_mate";`);
  await knex.raw(`DROP TYPE IF EXISTS "team_mate_role";`);
  await knex.raw(`DROP TABLE IF EXISTS "team";`);
  await knex.raw(`DROP TABLE IF EXISTS "currency";`);
  await knex.raw(`DROP TABLE IF EXISTS "user";`);
}
