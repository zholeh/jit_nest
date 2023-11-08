import { Knex } from 'knex';
import { userAdmin } from '../src/constant';
export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    INSERT INTO "user" (
        id, 
        created_at, 
        updated_at, 
        deleted_at, 
        "name", 
        description, 
        last_name, 
        email, 
        phone, 
        referral_id
      ) 
      VALUES(
        '${userAdmin.id}'::uuid, 
        '${userAdmin.createdAt.toISOString()}', 
        ${userAdmin.updatedAt}, 
        ${userAdmin.deletedAt}, 
        '${userAdmin.name}', 
        '${userAdmin.description}', 
        '${userAdmin.lastName}', 
        '${userAdmin.email}', 
        '${userAdmin.phone}', 
        '${userAdmin.id}'::uuid
      );
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DELETE FROM "user" WHERE id='0267b27b-e64f-4ea8-8f64-0977fc91627c'::uuid
  `);
}
