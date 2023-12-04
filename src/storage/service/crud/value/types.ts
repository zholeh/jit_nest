import { TypeOf, ZodDate, ZodEffects, ZodObject, ZodRawShape } from 'zod';

export type ValueObjectCommonFields = {
  createdAt: ZodEffects<ZodDate, Date, unknown>;
};
export type ValueObjectSchema = ZodObject<ZodRawShape & ValueObjectCommonFields>;
export type ValueObjectType<Value extends ValueObjectSchema> = TypeOf<Value>;
export type KeyofValueObject<Value extends ValueObjectSchema> = keyof ValueObjectType<Value>;
export type ColumnsValueObjectType<Value extends ValueObjectSchema> = {
  db: Map<KeyofValueObject<Value>, string>;
  entity: Map<string, KeyofValueObject<Value>>;
};
