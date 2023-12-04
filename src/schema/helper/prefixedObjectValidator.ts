import { object, z, ZodObject, ZodRawShape } from 'zod';

type PrefixedType<Entity extends ZodObject<ZodRawShape>, Prefix extends Readonly<string>> = ZodObject<{
  [P in keyof Entity['shape'] as P extends string ? `${Prefix}_${P}` : never]: Entity['shape'][P];
}>;

export function buildPrefixedObjectZodSchema<T extends z.ZodObject<z.ZodRawShape>, P extends Readonly<string>>(
  zod: T,
  prefix: P,
): PrefixedType<T, P> {
  const obj = Object.entries(zod.shape).reduce((acc, [key, value]) => {
    const property = object({
      [`${prefix}_${key}`]: value,
    });
    return acc.merge(property);
  }, object({}));

  return obj as unknown as PrefixedType<T, P>;
}
