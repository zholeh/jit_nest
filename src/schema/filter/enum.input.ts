import { EnumLike, z, ZodNativeEnum } from 'zod';

export const EnumInput = z.object({
  eq: z.string().optional(),
  notEq: z.string().optional(),
  in: z.string().optional(),
  notIn: z.string().optional(),
  isNull: z.boolean().optional(),
  isNotNull: z.boolean().optional(),
});

export function buildEnumInput(nativeEnum: ZodNativeEnum<EnumLike>) {
  return z.object({
    eq: nativeEnum.optional(),
    notEq: nativeEnum.optional(),
    in: nativeEnum.array().optional(),
    notIn: nativeEnum.array().optional(),
    isNull: z.boolean().optional(),
    isNotNull: z.boolean().optional(),
  });
}
