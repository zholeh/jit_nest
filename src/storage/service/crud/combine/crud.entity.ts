import { Knex } from 'nestjs-knex';
import { BaseEntityCrud } from './base';
import { Read } from './read';
import { EntitySchema } from './types';

type GConstructor<T = object> = new (knex: Knex) => T;

type FactoryType<Entity extends EntitySchema, ME extends EntitySchema> = GConstructor<Read<Entity, ME>>;

export function CrudCombineFactory<Entity extends EntitySchema, ME extends EntitySchema>() {
  class Empty {}
  const arr: unknown[] = [BaseEntityCrud, Read];
  applyMixins(Empty, arr);
  return Empty as unknown as FactoryType<Entity, ME>;
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
