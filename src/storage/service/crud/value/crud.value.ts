import { Knex } from 'nestjs-knex';
import { ZodObject, ZodRawShape, z } from 'zod';
import { Create } from './create';
import { Read } from './read';
import { ValueObjectSchema } from './types';
import { BaseValueObjectCrud } from './base';

type GConstructor<T = object> = new (knex: Knex) => T;

type FactoryType<
  ValueObject extends ValueObjectSchema,
  ValueObjectCreate extends ZodObject<ZodRawShape> | false,
> = GConstructor<
  Read<ValueObject> &
    (ValueObjectCreate extends false
      ? BaseValueObjectCrud<ValueObject>
      : Create<ValueObject, z.infer<Exclude<ValueObjectCreate, false>>>)
>;

export function CrudValueObjectFactory<
  ValueObject extends ValueObjectSchema,
  ValueObjectCreate extends ZodObject<ZodRawShape> | false,
>(options: {
  valueObject: ValueObject;
  create: ValueObjectCreate | false;
}): FactoryType<ValueObject, ValueObjectCreate> {
  class Empty {}
  const arr: unknown[] = [BaseValueObjectCrud, Read];
  if (options.create) arr.push(Create);
  applyMixins(Empty, arr);
  return Empty as unknown as FactoryType<ValueObject, ValueObjectCreate>;
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
