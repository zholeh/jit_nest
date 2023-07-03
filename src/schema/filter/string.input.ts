import { z } from 'zod';

export const StringInput = z.object({
  eq: z.string().optional(),
  notEq: z.string().optional(),
  contains: z.string().optional(),
  notContains: z.string().optional(),
  startsWith: z.string().optional(),
  notStartsWith: z.string().optional(),
  endsWith: z.string().optional(),
  notEndsWith: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  isNull: z.boolean().optional(),
  isNotNull: z.boolean().optional(),
});
