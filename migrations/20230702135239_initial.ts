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
      referral_id uuid NOT NULL,
      PRIMARY KEY ("id")
    );
  `);

  await knex.raw(`
    ALTER TABLE "user" ADD CONSTRAINT user_referral_id_fk FOREIGN KEY (referral_id) REFERENCES "user"(id);
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

    CREATE INDEX team_referral_id_idx ON team (referral_id);
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
      "name" varchar(255) NOT NULL,
      description varchar(1024) NOT NULL,
      PRIMARY KEY ("id"),
      CONSTRAINT team_mate_user_id_fk FOREIGN KEY (user_id) REFERENCES "user"(id),
      CONSTRAINT team_mate_team_id_fk FOREIGN KEY (team_id) REFERENCES team(id)
    );

    CREATE INDEX team_mate_user_id_idx ON team_mate (user_id);
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

    CREATE INDEX channel_team_id_idx ON channel (team_id);
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

    CREATE INDEX member_user_id_idx ON member (user_id);
    CREATE INDEX member_channel_id_idx ON member (channel_id);
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

    CREATE INDEX member_notice_channel_id_idx ON member_notice (channel_id);
    CREATE INDEX member_notice_member_id_idx ON member_notice (member_id);
    CREATE INDEX member_notice_mate_id_idx ON member_notice (mate_id);
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

    CREATE INDEX message_channel_id_idx ON message (channel_id);
    CREATE INDEX message_mate_id_idx ON message (mate_id);
  `);

  await knex.raw(`
    CREATE TABLE "supply_category" (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      created_at timestamp NOT NULL DEFAULT now(),
      updated_at timestamp NULL,
      deleted_at timestamp NULL,
      "name" varchar(255) NOT NULL,
      description varchar(1024) NOT NULL,
      team_id uuid NOT NULL,
      time_after_service int4 NOT NULL,
      next_visit int4 NOT NULL,
      time_range int4 NOT NULL,
      PRIMARY KEY ("id"),
      CONSTRAINT supply_category_team_id_fk FOREIGN KEY (team_id) REFERENCES team(id)
    );

    CREATE INDEX supply_category_team_id_idx ON supply_category (team_id);
  `);

  await knex.raw(`
    CREATE TABLE "supply" (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      created_at timestamp NOT NULL DEFAULT now(),
      updated_at timestamp NULL,
      deleted_at timestamp NULL,
      "name" varchar(255) NOT NULL,
      description varchar(1024) NOT NULL,
      category_id uuid NOT NULL,
      time_after_service int4 NOT NULL,
      next_visit int4 NOT NULL,
      time_range int4 NOT NULL,
      PRIMARY KEY ("id"),
      CONSTRAINT supply_category_id_fk FOREIGN KEY (category_id) REFERENCES supply_category(id)
    );

    CREATE INDEX supply_category_id_idx ON supply (category_id);
  `);

  await knex.raw(`
    CREATE TABLE calendar (
      team_mate_id uuid NOT NULL,
      "date" date NOT NULL,
      time_ranges jsonb NOT NULL DEFAULT '{}'::jsonb,
      booked_times jsonb NOT NULL DEFAULT '{}'::jsonb,
      has_slot boolean NOT NULL DEFAULT true,
      CONSTRAINT calendar_pk PRIMARY KEY (team_mate_id,"date"),
      CONSTRAINT calendar_team_mate_id_fk FOREIGN KEY (team_mate_id) REFERENCES team_mate(id)
    );
  `);

  await knex.raw(`
    CREATE TABLE "order" (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      created_at timestamp NOT NULL DEFAULT now(),
      updated_at timestamp NULL,
      deleted_at timestamp NULL,
      member_id uuid NOT NULL,
      completed boolean NOT NULL,
      "date" timestamp with time zone NOT NULL,
      start_time timestamp with time zone NOT NULL,
      end_time timestamp with time zone NOT NULL,
      team_mate_id uuid NOT NULL,
      supplies jsonb NOT NULL DEFAULT '{}'::jsonb,
      completed_time timestamp with time zone NOT NULL,
      PRIMARY KEY ("id"),
      CONSTRAINT order_member_id_fk FOREIGN KEY (member_id) REFERENCES member(id),
      CONSTRAINT order_team_mate_id_fk FOREIGN KEY (team_mate_id) REFERENCES team_mate(id)
    );

    CREATE INDEX order_member_id_idx ON "order" (member_id);
    CREATE INDEX order_team_mate_id_idx ON "order" (team_mate_id);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS "order";`);
  await knex.raw(`DROP TABLE IF EXISTS "calendar";`);
  await knex.raw(`DROP TABLE IF EXISTS "supply";`);
  await knex.raw(`DROP TABLE IF EXISTS "supply_category";`);
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
