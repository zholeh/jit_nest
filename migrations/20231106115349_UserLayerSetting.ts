import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE "user_view_layer" (
      created_at timestamp NOT NULL DEFAULT now(),
      "user_id" uuid NOT NULL,
      layer varchar(255) NOT NULL,
      setting jsonb NOT NULL
    );
    CREATE UNIQUE INDEX user_view_layer_user_id_layer_idx ON user_view_layer (user_id,layer);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE "user_view_layer"
  `);
}
