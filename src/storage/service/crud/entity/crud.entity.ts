import { Knex } from 'nestjs-knex';
import { TypeOf, ZodObject, ZodRawShape } from 'zod';
import { Create } from './create';
import { Delete } from './delete';
import { Read } from './read';
import { EntityIdSchema, EntitySchema } from './types';
import { Update } from './update';
import { BaseEntityCrud } from './base';

type GConstructor<T = object> = new (knex: Knex) => T;

type ZodCreate = ZodObject<ZodRawShape> | false;
type ZodUpdate = ZodObject<EntityIdSchema> | false;
type ZodDelete = ZodObject<EntityIdSchema> | false;

type FactoryType<
  Entity extends EntitySchema,
  EntityCreate extends ZodCreate,
  EntityUpdate extends ZodUpdate,
  EntityDelete extends ZodDelete,
> = GConstructor<
  Read<Entity> &
    (EntityCreate extends false ? object : Create<Entity, TypeOf<Exclude<EntityCreate, false>>>) &
    (EntityUpdate extends false ? object : Update<Entity, TypeOf<Exclude<EntityUpdate, false>>>) &
    (EntityDelete extends false ? object : Exclude<Delete<Entity>, false>)
>;

export function CrudEntityFactory<
  Entity extends EntitySchema,
  EntityCreate extends ZodCreate = false,
  EntityUpdate extends ZodUpdate = false,
  EntityDelete extends ZodDelete = false,
>(options: { entity: Entity; create?: EntityCreate; update?: EntityUpdate; delete?: EntityDelete }) {
  class Empty {}
  const arr: unknown[] = [BaseEntityCrud, Read];
  if (options.create) arr.push(Create);
  if (options.update) arr.push(Update);
  if (options.delete) arr.push(Delete);
  applyMixins(Empty, arr);
  return Empty as unknown as FactoryType<Entity, EntityCreate, EntityUpdate, EntityDelete>;
}

function applyMixins(derivedCtor: { prototype: unknown }, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null),
      );
    });
  });
}
