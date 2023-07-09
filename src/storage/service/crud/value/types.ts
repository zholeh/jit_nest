import { TypeOf, ZodDate, ZodEffects, ZodObject, ZodRawShape } from 'zod';

export type ValueCommonFields = {
  createdAt: ZodEffects<ZodDate, Date, unknown>;
};
export type ValueSchema = ZodObject<ZodRawShape & ValueCommonFields>;
export type ValueType<Value extends ValueSchema> = TypeOf<Value>;
export type KeyofValue<Value extends ValueSchema> = keyof ValueType<Value>;
// export type ValueLink<Value extends ValueSchema> = Pick<TypeOf<Value>, 'id'>;
export type ColumnsValueType<Value extends ValueSchema> = {
  db: Map<KeyofValue<Value>, string>;
  valueObject: Map<string, KeyofValue<Value>>;
};
