import { Knex } from 'nestjs-knex';
import { ZodObject, ZodRawShape, z } from 'zod';
import { Create } from './create';
import { Read } from './read';
import { ValueSchema } from './types';
import { BaseValueCrud } from './base';

type GConstructor<T = object> = new (knex: Knex) => T;

type FactoryType<Value extends ValueSchema, ValueCreate extends ZodObject<ZodRawShape> | false> = GConstructor<
  Read<Value> & (ValueCreate extends false ? BaseValueCrud<Value> : Create<Value, z.infer<Exclude<ValueCreate, false>>>)
>;

export function crudValueObjectFactory<
  Value extends ValueSchema,
  ValueCreate extends ZodObject<ZodRawShape> | false,
>(options: { valueObject: Value; create: ValueCreate | false }): FactoryType<Value, ValueCreate> {
  class Empty {}
  const arr: unknown[] = [BaseValueCrud, Read];
  if (options.create) arr.push(Create);
  applyMixins(Empty, arr);
  return Empty as unknown as FactoryType<Value, ValueCreate>;
}

function applyMixins(derivedCtor: any, constructors: any[]) {
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
