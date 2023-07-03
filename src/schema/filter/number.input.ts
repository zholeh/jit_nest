import { z } from 'zod';
import { NumberRangeInput } from './number-range.input';

export const NumberInput = z.object({
  eq: z.number().optional(),
  notEq: z.number().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  between: NumberRangeInput.optional(),
  notBetween: NumberRangeInput.optional(),
  isNull: z.boolean().optional(),
  isNotNull: z.boolean().optional(),
});
