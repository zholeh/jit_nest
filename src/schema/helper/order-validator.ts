import { OrderDirection } from '../../helper/types';
import { z } from 'zod';

type KeyofFields<T extends z.ZodType> = keyof z.TypeOf<T> extends string ? keyof z.TypeOf<T> : never;
type FieldsTuple<T extends z.ZodType> = [KeyofFields<T>, ...KeyofFields<T>[]];

const OrderZodEnum = z.nativeEnum(OrderDirection);

export function buildOrderZodSchema<T extends z.ZodObject<z.ZodRawShape>>(fields: FieldsTuple<T>) {
  const fieldsEnum = z.enum(fields);
  return z.object({
    column: fieldsEnum,
    order: OrderZodEnum.describe('Order'),
  });
}
