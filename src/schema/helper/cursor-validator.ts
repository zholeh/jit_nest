import { ZodObject, ZodRawShape, ZodType, object, z } from 'zod';
import { OrderDirection } from '../../helper/types';

type CursorValueType<Value> = ZodObject<{
  value: ZodType<Value>;
  order: z.ZodNativeEnum<typeof OrderDirection>;
}>;

type CursorType<Entity extends ZodRawShape> = ZodObject<{
  [P in keyof Entity]-?: CursorValueType<Entity[P]>;
}>;

export function buildCursorZodSchema<Entity extends ZodObject<ZodRawShape>>(zod: Entity): CursorType<z.infer<Entity>> {
  const obj = Object.entries(zod.shape).reduce((acc, [key, value]) => {
    const property = object({
      [key]: z.object({
        value: value,
        order: z.nativeEnum(OrderDirection),
      }),
    });
    return acc.merge(property);
  }, object({}));

  return obj as unknown as CursorType<z.infer<Entity>>;
}
